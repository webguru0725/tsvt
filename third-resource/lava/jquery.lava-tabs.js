//基于jquery和bootstrap的tabs插件
var lavaTabs = {
	tabIndex:0,//标签页唯一标识
	timer:null,
	//初始化dom结构
	initDom:function(target){
		var that = this;
		var $target = $(target);
		$target.addClass("lava-tabs");
		var options = $(target).data("tabs").options;
		var $toolbar = $("<div class='lava-tabs-toolbar'></div>").appendTo($target);
		var $pre = $("<div class='lava-tabs-pre'><a href='javascript:;' class='lava-tabs-btn-pre'><span class='glyphicon glyphicon-backward'></span></a></div>").appendTo($toolbar);
		var $btnWrapper = $("<div class='lava-tabs-btn-wrapper'></div>").appendTo($toolbar);
		var $next = $("<div class='lava-tabs-next'><a href='javascript:;' class='lava-tabs-btn-next'><span class='glyphicon glyphicon-forward'></span></a></div>").appendTo($toolbar);
		var $btns = $("<div class='lava-tabs-btns'></div>").appendTo($btnWrapper);
		var width = $pre.width();
		$btnWrapper.css({"margin-left":width});
		that.bindEvent(target);
		that.setOption(target);
	},
	//添加tab标签页
	addTab:function(target, param){
		var that = lavaTabs;
		var $target = $(target);
		var $btns = $target.children(".lava-tabs-toolbar").find(".lava-tabs-btns");
		var options = $target.data("tabs").options;
		var hideType = param.hideType ? param.hideType : "hide";
		var $next = $target.children(".lava-tabs-toolbar").find(".lava-tabs-btn-next");
		$btns.find(".lava-tabs-btn-selected").removeClass("lava-tabs-btn-selected");
		var $btn = $("<a href='javascript:;' class='lava-tabs-btn lava-tabs-btn-selected' data-for='lava-tabs-"+(++that.tabIndex)+"' data-hidetype='" + hideType + "'>"+param.title+" </a>").appendTo($btns);
		if (param.closable !== false){
			$("<span class='glyphicon glyphicon-remove-sign'></span>").appendTo($btn);
		}
		// $target.children(".lava-tabs-tab").addClass("lava-tabs-tab-close");
		that.hideAll(target);
		var $tab = $("<div class='lava-tabs-tab' id='lava-tabs-"+that.tabIndex+"' data-hidetype='" + hideType + "'>"+param.content+"</div>").appendTo($target);
		if ($btn.offset().left + $btn.outerWidth() > $next.offset().left){
			$next.click();
		}
	},
	//选择标签页
	select:function(target, param){
		var $btn = null;
		var $toolbar = $(target).children(".lava-tabs-toolbar");
		var $btns = $toolbar.find(".lava-tabs-btn");
		for (var i=0;i<$btns.length;i++){
			if (param == i || param == $btns.eq(i).text()){
				$btn = $btns.eq(i);
				break;
			}
		}
		if ($btn){
			$btn.click();
			var $btnWrapper = $toolbar.children(".lava-tabs-btn-wrapper");
			var $btnDiv = $btnWrapper.children();
			var $next = $toolbar.find(".lava-tabs-btn-next");
			var left = $btnDiv.css("left").replace("px","");
			left = left ? parseInt(left) : 0;
			if ($btn.offset().left < $btnWrapper.offset().left){
				left += $btnWrapper.offset().left - $btn.offset().left;
				$btnDiv.animate({left:left},"fast");
			}else if($btn.offset().left + $btn.outerWidth() > $next.offset().left){
				left -= $btn.offset().left + $btn.outerWidth() - $next.offset().left;
				$btnDiv.animate({left:left},"fast");
			}
		}
	},
	//重设配置项，改变颜色
	setOption:function(target,param){
		var $target = $(target);
		var options = $target.data("tabs").options;
		if (param) $.extend(options,param);
		var $toolbar = $target.find(".lava-tabs-toolbar");
		var style = ["<style>"];
		if (options.bgColor){
			style.push(".lava-tabs-toolbar,.lava-tabs-btn-pre,.lava-tabs-btn-next{background-color:"+options.bgColor+";}");
		}
		if (options.color){
			style.push(".lava-tabs-btn,.lava-tabs-btn-pre,.lava-tabs-btn-next{color:"+options.color+";}");
		}
		if (options.borderColor){
			style.push(".lava-tabs-btn-pre,.lava-tabs-btn-next,.lava-tabs-btn{border-color:"+options.borderColor+";}")
			$toolbar.css({"border-bottom-color":options.borderColor});
		}
		if (options.activeColor){
			style.push(".lava-tabs-btn-pre:hover,.lava-tabs-btn-next:hover,.lava-tabs-btn:hover,.lava-tabs-btn-selected,.lava-tabs-btn:focus {"+"background-color:"+options.activeColor+";");
			style.push(options.color?"color:"+options.color+";}" : "}");
		}
		style.push("</style>");
		if ($target.data("tabs").style) $target.data("tabs").style.remove();
		var $style = $(style.join("\n")).insertAfter($target);
		$target.data("tabs").style = $style;
	},
	//事件绑定
	bindEvent:function(target){
		var that = this;
		var $target = $(target);
		var options = $target.data("tabs").options;
		var $toolbar = $target.children(".lava-tabs-toolbar");
		var $btnWrapper = $toolbar.children(".lava-tabs-btn-wrapper");
		var $btnDiv = $btnWrapper.children();
		var $prev = $toolbar.find(".lava-tabs-btn-pre");
		var $next = $toolbar.find(".lava-tabs-btn-next");
		$toolbar.delegate(".lava-tabs-btn","click",function(e){
			if (!$(this).hasClass("lava-tabs-btn-selected")){
				$toolbar.find(".lava-tabs-btn").removeClass("lava-tabs-btn-selected");
				$(this).addClass("lava-tabs-btn-selected");
				// $target.children(".lava-tabs-tab").addClass("lava-tabs-tab-close");
				that.hideAll(target);
				var tabId = $(this).attr("data-for");
				if ($(this).attr("data-hidetype") == "position") {
					$("#" + tabId).css({position: "relative", left: 0});
				} else {
					$("#"+tabId).removeClass("lava-tabs-tab-close");
				}
				if (options.onSelect){
					options.onSelect($.trim($(this).text()));
				}
			}
		});
		//移除标签页
		$toolbar.delegate(".glyphicon-remove-sign","click",function(e){
			var tabId = $(this).parent().attr("data-for");
			var $parent = $(this).parent();
			if ($parent.hasClass("lava-tabs-btn-selected")){
				if ($parent.next().length > 0){
					$parent.next().click();
				}else if ($parent.prev().length > 0){
					$parent.prev().click();
				}
			}
			if (options.onClose){
				options.onClose($.trim($parent.text()));
			}
			$parent.remove();
			$("#"+tabId).remove();
			return false;//阻止冒泡
		});
		//显示前面的标签按钮
		$prev.on("click",function(e){
			var $btns = $btnDiv.children();
			var $first = $btns.first();
			//如果第一个按钮左边界小于可视区域左边界,则显示前面的按钮
			if ($first.offset().left < $btnWrapper.offset().left){
				//找到可视区域第一个按钮，按钮组右移
				for (var i=0;i<$btns.length;i++){
					var $btn = $btns.eq(i);
					if ($btn.offset().left + $btn.outerWidth() >= $btnWrapper.offset().left){
						var left = $btnDiv.css("left").replace("px","");
						left = left ? parseInt(left) : 0;
						if ($btn.offset().left - $btnDiv.offset().left <= $next.offset().left - $btns.eq(i+1).offset().left){
							left = 0;
						}else{
							left += $next.offset().left - $btns.eq(i+1).offset().left;
						}
						$btnDiv.animate({left:left},"fast");
						break;
					}
				}
			}
		});
		//显示后面标签按钮
		$next.on("click",function(e){
			var $btns = $btnDiv.children();
			//如果最后一个按钮位置大于next按钮左边界，则显示后面的按钮
			if ($btns.last().offset().left + $btns.last().width() > $next.offset().left){
				//找到可视区域最后一个按钮位置,将按钮组左移
				for (var i=0;i<$btns.length;i++){
					var $btn = $btns.eq(i);
					if ($btn.offset().left + $btn.width() > $next.offset().left){
						var left = $btnDiv.css("left").replace("px","");
						left = left ? parseInt(left) : 0;
						if ($btns.last().offset().left + $btns.last().outerWidth()-$btn.offset().left < $btnWrapper.width()-$next.outerWidth()){
							left -= $btns.last().offset().left + $btns.last().outerWidth()-$next.offset().left;
						}else if ($btn.offset().left <= $next.offset().left) {
							left -= $btn.offset().left - $btnWrapper.offset().left;
						}else if ($btn.prev().length > 0){
							left -= $btn.prev().offset().left - $btnWrapper.offset().left;
						}
						$btnDiv.animate({left:left},"fast");
						break;
					}	
				}
			}
		});
		//窗口大小改变事件 IE8
		window.onresize = function(){
			if (/msie 8/.test(navigator.userAgent.toLowerCase())){
				if (that.timer) clearTimeout(that.timer);
				that.timer = setTimeout(function(){
					that.resizeDom(target);
				},10);
			}
		}
	},
	//隐藏所有标签页
	hideAll: function(target) {
		var that = this;
		var $target = $(target);
		var $tabs = $target.children(".lava-tabs-tab");
		for (var i = 0; i < $tabs.length; i++) {
			var $tab = $tabs.eq(i);
			if ($tab.attr("data-hidetype") == "position") {
				$tab.css({position: "absolute", left: -10000});
			} else {
				$tab.addClass("lava-tabs-tab-close");
			}
		}
	},
	//重新调整大小位置
	resizeDom:function(target){
		var that = this;
		var $target = $(target);
		var $toolbar = $target.children(".lava-tabs-toolbar");
		var $tab = $target.children(".lava-tabs-tab").not(".lava-tabs-tab-close");
		var height = $target.height() - $toolbar.height() - 2;
		$tab.css({height:height});
	}
};
$.fn.lavaTabs = function(options, param){
	if (typeof options == "string"){
		return $.fn.lavaTabs.methods[options](this,param);
	}else{
		return this.each(function(){
			var op = {};
			$.extend(op,$.fn.lavaTabs.defaults);
			$(this).data("tabs",{options:op});
			$.extend($(this).data("tabs").options,options);
			lavaTabs.initDom(this);
		});
	}
};
$.fn.lavaTabs.defaults = {
	fit:true,
	bgColor:"",
	color:"",
	borderColor:"",
	activeColor:"",
	//事件
	onClose: null,
	onSelect: null
};
$.fn.lavaTabs.methods = {
	add:function(target,param){
		lavaTabs.addTab(target,param);
	},
	select:function(target,param){
		lavaTabs["select"](target,param);
	},
	setOption:function(target,param){
		lavaTabs.setOption(target,param);
	}
};