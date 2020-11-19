var lavaCalendar = {
	//初始化dom节点
	init:function(target){
		var that = this;
		var $target = $(target);
		var options = $target.data("calendar").options;
		var lang = $.fn.lavaCalendar.locales[options.lang];
		$target.addClass("lava-calendar");
		var $head = $("<div class='lava-calendar-header' style='background:"+options.color+";'></div>").appendTo($target);
		var $prev = $("<div class='lava-calendar-prev'>«</div>").appendTo($head);
		var $next = $("<div class='lava-calendar-next'>»</div>").appendTo($head);
		var $span = $("<span></span>").appendTo($head);
		var $table = $("<table class='lava-calendar-table'></table>").appendTo($target);
		var $thead = $("<thead class='lava-calendar-thead'></thead>").appendTo($table);
		var $tbody = $("<tbody class='lava-calendar-tbody'></tbody>").appendTo($table);
		var headHtml = ["<tr>"];
		for (var i=0;i<7;i++){
			headHtml.push("<th style='color:"+options.color+";'>"+lang[i]+"</th>");
		}
		headHtml.push("</tr>");
		var bodyHtml = [];
		for (var i=0;i<6;i++){
			var html = ["<tr>"];
			for (var j=0;j<7;j++){
				html.push("<td></td>");
			}
			html.push("</tr>");
			bodyHtml.push(html.join(""));
		}
		$thead.html(headHtml.join(""));
		$tbody.html(bodyHtml.join(""));
		that.loadDate(target);
		that.resize(target);
	},
	//加载日期
	loadDate:function(target){
		var that = this;
		var $target = $(target);
		var options = $target.data("calendar").options;
		var dateObj = options.currentDate;
		dateObj.setDate(1);
		var year = options.currentDate.getFullYear();
		var month = options.currentDate.getMonth();
		$target.find(".lava-calendar-header span").text(year + "-" + that.round(month + 1));
		var $td = $target.find("td");
		var first = dateObj.getDay();
		var dateObj2 = new Date(dateObj.getTime());
		dateObj2.setMonth(month+1);
		dateObj2.setTime(dateObj2.getTime()-24*60*60*1000);
		var days = dateObj2.getDate();
		$td.text("").removeAttr("data-date").prop("class","");
		for (var i=0;i<days;i++){
			$td.eq(i+first).text(i+1).attr("data-date",year+"/"+(month+1)+"/"+(i+1));
		}
		if (options.data) that.loadData(target);
	},
	//加载数据
	loadData:function(target){
		var that = this;
		var $target = $(target);
		var options = $target.data("calendar").options;
		var data = options.data;
		var $td = $target.find("td");
		$td.css({background:"transparent"});
		$td.prop("class","").removeAttr("data-type").removeAttr("data-blackbox").children().remove();
		for (var i=0;i<$td.length;i++){
			var dateStr = $td.eq(i).attr("data-date");
			if (!dateStr) continue;
			var year = dateStr.split("/")[0];
			var month = dateStr.split("/")[1];
			var date = dateStr.split("/")[2]
			for (var j=0;j<data.length;j++){
				var dateObj = data[j].date;
				if (dateObj.getFullYear() == year && (dateObj.getMonth()+1) == month && dateObj.getDate() == date){
					if (data[j].type == "normal"){
						$td.eq(i).addClass("lava-calendar-normal").attr("data-type","normal").css({background:options.normalColor});
					}else if (data[j].type == "alarm"){
						$td.eq(i).addClass("lava-calendar-alarm").attr("data-type","alarm").css({background:options.alarmColor});
					}
					if (data[j].blackbox){
						$td.eq(i).append("<div class='lava-calendar-blackbox'></div>").attr("data-blackbox",true);
					}
					if (data[j].device){
						$td.eq(i).append("<div class='lava-calendar-device'></div>");
					}
					if (data[j].server){
						$td.eq(i).append("<div class='lava-calendar-server'></div>");
					}
					break;
				}
			}
		}
	},
	//翻页
	gotoMonth:function(target, flag, value){
		var that = this;
		var $target = $(target);
		var options = $target.data("calendar").options;
		if (flag) {
			var month = options.currentDate.getMonth();
			options.currentDate.setMonth(flag == "next" ? month+1:month-1);
		} else if (value){
			options.currentDate = value;
		}
		that.loadDate(target);
		if (options.onMonthChange){
			var date = options.currentDate;
			var firstDate = new Date(date.getFullYear() + "/" + that.round(date.getMonth()+1) + "/" + that.round(date.getDate()) + " 00:00:00");
			var lastDate = new Date(firstDate.getTime());
			lastDate.setMonth(lastDate.getMonth()+1);
			lastDate.setTime(lastDate.getTime() - 1);
			options.onMonthChange(firstDate, lastDate);
		}
	},
	//重新调整大小
	resize:function(target){
		var $target = $(target);
		var height = $target.width() * 0.6 / 6;
		$target.find("td").css({height:height});
	},
	//补零
	round:function(value){
		return value < 10 ? "0"+value : value;
	},
	//事件绑定
	bindEvent:function(target){
		var that = this;
		var $target = $(target);
		var options = $target.data("calendar").options;
		$target.on("selectstart", function(e){
			return false;
		});
		$target.find(".lava-calendar-prev").on("click",function(e){
			that.gotoMonth(target,"prev");
		});
		$target.find(".lava-calendar-next").on("click",function(e){
			that.gotoMonth(target,"next");
		});
		$target.find("td").on("click dblclick",function(e){
			$target.find("td").children(".lava-calendar-active").remove();
			var width = $(this).width()+2;
			var height = $(this).height()+2;
			$(this).append("<div class='lava-calendar-active' style='width:"+width+"px;height:"+height+"px;'></div>");
			if (e.type == "click" && options.onClick && $(this).attr("data-date")) {
				var data = {date:new Date($(this).attr("data-date")),type:$(this).attr("data-type"),blackbox:$(this).attr("data-blackbox")};
				options.onClick(data);
			}
			if (e.type == "dblclick" && options.onDblclick && $(this).attr("data-date")) {
				var data = {date:new Date($(this).attr("data-date")),type:$(this).attr("data-type"),blackbox:$(this).attr("data-blackbox")};
				options.onDblclick(data);
			}
		});
	}
};
$.fn.lavaCalendar = function(options, param){
	if (typeof options == "string"){
		return $.fn.lavaCalendar.methods[options](this, param);
	}else{
		$.each(this,function(ele,value){
			var op = {};
			$.extend(op,$.fn.lavaCalendar.defaults);
			$(this).data("calendar",{options:op});
			$.extend($(this).data("calendar").options,options);
			//设置日历星期月份语言包
			$.extend($.fn.lavaCalendar.locales, $(this).data("calendar").options.weekMonth);
			lavaCalendar.init(this);
			lavaCalendar.bindEvent(this);
			if (options.data) lavaCalendar.loadData(this);
		});
	}
}
$.fn.lavaCalendar.defaults = {
	lang: "zh-CN",
	color:"#32c5d2",
	alarmColor:"#e26a6a",
	normalColor:"#26c281",
	currentDate:new Date(),
	weekMonth: {},
	//事件
	onClick:null,
	onDblclick:null,
	onMonthChange: null
};
$.fn.lavaCalendar.methods = {
	loadData:function(target,param){
		$(target).data("calendar").options.data = param;
		lavaCalendar.loadData(target);
	},
	getDate: function(target){
		return $(target).data("calendar").options.currentDate;
	},
	gotoMonth: function(target, param) {
		lavaCalendar.gotoMonth(target, "", param);
	}
};
$.fn.lavaCalendar.locales = {
	"zh-CN": ["日","一","二","三","四","五","六"],//简体中文
	"zh-TW": ["日","一","二","三","四","五","六"],//繁体中文
	"ar": "ح_ن_ث_ر_خ_ج_س".split("_"),//阿拉伯语
	"bo": "ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"),//藏语
	"de": "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),//德语
	"en-gb": "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),//英语(英国)
	"en-US": "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),//英语(美国)
	"fr": "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),//法语
	"it": "D_L_Ma_Me_G_V_S".split("_"),//意大利语
	"ja": "日_月_火_水_木_金_土".split("_"),//日语
	"ru": "вс_пн_вт_ср_чт_пт_сб".split("_"),//俄语
	"th-TH": "อา_จ_อ_พ_พฤ_ศ_ส".split("_"),//泰语
	"pt-BR": ["D","S","T","Q","Q","S","S", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]//新葡语
};