(function($){
	//初始化表格
	function initTable(target){
		var $target = $(target);
		$target.hide();
		var option = $(target).data("table").option;
		var height = $(target).parent().height() - (option.pagination ? 40 : 0);
		var cols = option.columns;
		var tableDiv = $("<div class='div-table' style='height:"+height+"px;'></div>").insertAfter($(target));
		$target.data("table").tableDiv = tableDiv;
		if (option.fit) tableDiv.css({overflow:"hidden"});
		if (option.frozenNumber == 0){//没有冻结列
			var headDiv = $("<div class='div-head' style='width:100%;overflow:hidden;'></div>").appendTo(tableDiv);
			var bodyDiv = $("<div class='div-body' style='width:100%;overflow:auto;'></div>").appendTo(tableDiv);
			var head = $("<div class='div-head-table' style='position:relative;'></div>").appendTo(headDiv);
			var body = $("<div class='div-body-table'></div>").appendTo(bodyDiv);
			var width = 0;
			for (var i=0;i<cols.length;i++){
				width += cols[i].width+1;
			}
			$target.data("table").headDiv = headDiv;
			$target.data("table").bodyDiv = bodyDiv;
			initHead(target,head);
			initBody(target,body);
		}else{
			var headDiv1 = $("<div class='div-head1' style='float:left;'></div>").appendTo(tableDiv);
			var headDiv2 = $("<div class='div-head2' style='float:left;'></div>").appendTo(tableDiv);
			var bodyDiv1 = $("<div class='div-body1' style='float:left;'></div>").appendTo(tableDiv);
			var bodyDiv2 = $("<div class='div-body2' style='float:left;'></div>").appendTo(tableDiv);
			var head1 = $("<div class='div-head-table1'></div>").appendTo(headDiv1);
			var head2 = $("<div class='div-head-table2'></div>").appendTo(headDiv2);
			var body1 = $("<div class='div-body-table1'></div>").appendTo(bodyDiv1);
			var body2 = $("<div class='div-body-table2'></div>").appendTo(bodyDiv2);
			var width1 = 0,width2 = 0,divWidth1 = 0,divWidth2 = 0,totalWidth=0;
			for (var i=option.checkbox?1:0;i<cols.length;i++){
				if (i<(option.checkbox?option.frozenNumber+1:option.frozenNumber)){
					width1 += cols[i].width;
					divWidth1 += cols[i].width;
				}else{
					width2 += cols[i].width;
				}
				totalWidth += cols[i].width;
			}
			if (option.checkbox) {
				width1 += 33;
				divWidth1 += 33;
			}
			width2 = width2 < tableDiv.width() - width1-20 ? tableDiv.width() - width1- 20 : width2;
			divWidth1 += 1;
			$target.data("table").option.frozenWidth = width1;
			divWidth2 = parseInt(tableDiv.width() - divWidth1);
			headDiv1.css({width:divWidth1,overflow:"hidden"});
			headDiv2.css({width:divWidth2,overflow:"hidden"});
			bodyDiv1.css({width:divWidth1,overflow:"hidden"});
			bodyDiv2.css({width:divWidth2,overflow:"auto"});
			head1.css({width:width1});
			head2.css({width:width2,left:-width1,position:"relative"});
			body1.css({width:width1,position:"relative"});
			// body2.css({width:width2,overflow:"auto"});
			$(target).data("table").headDiv1 = headDiv1;
			$(target).data("table").headDiv2 = headDiv2;
			$(target).data("table").bodyDiv1 = bodyDiv1;
			$(target).data("table").bodyDiv2 = bodyDiv2;
			initHead(target,head1,1);
			initHead(target,head2,2);
			initBody(target,body1,1);
			initBody(target,body2,2);
		}
		//初始化列显示切换列表
		if (option.columnToggle){
			var $toggle = $(option.columnToggle);
			$toggle.data("table",$(target));
			var $ul = $("<ul class='dropdown-menu pull-right'></ul>").appendTo($toggle.parent());
			var first = option.frozenNumber + (option.checkbox ? 1 : 0);
			for (var i=first;i<cols.length;i++){
				if (cols[i].field != "checkbox"){
					var html = $("th[data-field="+cols[i].field+"]").html();
					$ul.append("<li><a class='a-columntoggle' href='javascript:;' data-field='"+cols[i].field+"'><span class='span-checkbox span-checkbox-checked'></span>&nbsp;"+html+"</a></li>");
				}
			}
		}
		if (option.pagination) initPagination(target);
		if (option.url){
			remoteData(target);
		}else if (option.data){
			option.pageNumber = 1;
			option.firstPage = null;
			option.lastPage = null;
			if (option.frozenNumber == 0){
				loadData(target,body);
			}else{
				$target.data("table").bodyDiv1.children().children().find("tbody").empty();
				$target.data("table").bodyDiv2.children().children().find("tbody").empty();
				loadData(target,body1,1);
				loadData(target,body2,2);
			}
			if (option.pagination) loadPagination(target);
		}
		
		resize(target);
	}
	//初始化thead,num为1或2
	function initHead(target,head,num){
		var option = $(target).data("table").option;
		var cols = option.columns;
		var id = $(target).prop("id");
		var table = $("<table class='jq-table'></table>").appendTo(head);
		var thead = $("<thead></thead>").appendTo(table);
		var $thead = $(target).children("thead");
		thead.html($thead.html());
		var tr = thead.children();
		for (var i=0;i<tr.length;i++){
			var th = tr.eq(i).children();
			for (var j=0;j<th.length;j++){
				var field = th.eq(j).attr("data-field");
				if (field){
					//重写表头的html
					var html = "<div class='table-"+id+"-"+field+"'>"+th.eq(j).html();
					for (var k=0;k<cols.length;k++){
						//是否排序 orderType,defaultOrderColumn,order(true|false)
						if (cols[k].field == field && cols[k].order){
							//升序
							if (option.orderType == "asc"){
								if (field == option.defaultOrderColumn){
									html += "<div class='table-angle table-angle-up table-angle-active'></div>";
								}else{
									html += "<div class='table-angle table-angle-up'></div>";
								}
								th.eq(j).attr("data-ordertype",option.orderType);
							}else if (option.orderType == "desc"){//降序
								if (field == option.defaultOrderColumn){
									html += "<div class='table-angle table-angle-down table-angle-active'></div>";
								}else{
									html += "<div class='table-angle table-angle-down'></div>";
								}
								th.eq(j).attr("data-ordertype",option.orderType);
							}
						}
					}
					html += "</div>";
					th.eq(j).html(html);
				}
			}
		}
	}
	//初始化tbody
	function initBody(target,body,num){
		var option = $(target).data("table").option;
		var id = $(target).prop("id");
		var table = $("<table class='jq-table'></table>").appendTo(body);
		var tbody = $("<tbody></tbody>").appendTo(table);
		if (option.striped) table.addClass("table-striped");
	}
	//初始化分页组件pagination
	function initPagination(target){
		var $jtable = $(target);
		var lang = $jtable.data("table").option.lang;
		var pageDiv = $("<div style='width:100%;padding:5px 0 0 0;float:left;' class='div-pagination'></div>").insertAfter($jtable.data("table").tableDiv);
		var tipDiv = $("<div style='float:left;padding-top:5px;' class='div-pagination-tip'>"+language[lang].total+": <span class='span-total'></span>, "+language[lang].from+" <span class='span-first'></span> "+language[lang].to+" <span class='span-last'></span></div>").appendTo(pageDiv);
		var btnDiv = $("<div style='float:right;' class='div-pagination-btn'></div>").appendTo(pageDiv);
		var html = "<a href='javascript:;' class='page-first page-btn'>«</a>" + 
					"<a href='javascript:;' class='page-pre page-btn'>···</a>" +
					"<div style='float:left;' class='div-pagebtn'><a href='javascript:;' class='page-btn'>1</a>"+
					"<a href='javascript:;' class='page-btn'>2</a>"+
					"<a href='javascript:;' class='page-btn'>3</a>"+
					"<a href='javascript:;' class='page-btn'>4</a>"+
					"<a href='javascript:;' class='page-btn'>5</a></div>"+
					"<a href='javascript:;' class='page-next page-btn'>···</a>"+
					"<a href='javascript:;' class='page-last page-btn'>»</a>";
		btnDiv.html(html);
		$jtable.data("table").pageDiv = pageDiv;
	}
	function loadPagination(target){
		var $jtable = $(target);
		var option = $jtable.data("table").option;
		var data = option.data;
		var pageSize = option.pageSize;
		var pageNumber = option.pageNumber;
		var totalPage = data.total ? Math.ceil(data.total/pageSize) : 1;
		var pageDiv = $jtable.data("table").pageDiv;
		var btnDiv = pageDiv.find(".div-pagebtn");
		$jtable.data("table").option.totalPage = totalPage;
		pageDiv.find(".span-total").html(data.total);
		pageDiv.find(".span-first").html(data.total>0?(pageNumber-1)*pageSize+1:0);
		if (pageNumber < totalPage){
			pageDiv.find(".span-last").html(pageNumber*pageSize);
		}else{
			pageDiv.find(".span-last").html(data.total);
		}
		if (!option.firstPage || option.firstPage == 1){
			//设置分页组件的起止页
			$jtable.data("table").option.firstPage = 1;
			$jtable.data("table").option.lastPage = totalPage > 5 ? 5 : totalPage;
		}
		var firstPage = $jtable.data("table").option.firstPage;
		var lastPage = $jtable.data("table").option.lastPage;
		if (firstPage <= 1){
			pageDiv.find(".page-pre").hide();
		}
		if (lastPage >= totalPage){
			pageDiv.find(".page-next").hide();
		}
		if (firstPage > 1){
			pageDiv.find(".page-pre").show();
		}
		if (lastPage < totalPage){
			pageDiv.find(".page-next").show();
		}
		if (totalPage < 5){
			btnDiv.find(".page-btn").show();
			btnDiv.find(".page-btn").eq(totalPage-1).nextAll().hide();
		}else{
			btnDiv.find(".page-btn").show();
		}
		for (var i=0;i<lastPage-firstPage+1;i++){
			btnDiv.find(".page-btn").eq(i).data("table",{page:firstPage+i});
			btnDiv.find(".page-btn").eq(i).html(firstPage+i);
		}
		for (var i=0;i<lastPage-firstPage + 1;i++){
			if (btnDiv.find(".page-btn").eq(i).data("table").page == pageNumber){
				btnDiv.find(".page-btn").eq(i).addClass("page-select");
			}else{
				btnDiv.find(".page-btn").eq(i).removeClass("page-select");
			}
		}
	}
	//翻页
	function gotoPage(target,page){
		var $jtable = $(target);
		var option = $jtable.data("table").option;
		var pageNumber = option.pageNumber;
		var firstPage = option.firstPage;
		var lastPage = option.lastPage;
		var totalPage = option.totalPage;
		pageSpan = page - pageNumber;
		if (page == pageNumber) return;
		$jtable.data("table").option.pageNumber = page;
		if (totalPage > 5){
			var first = firstPage;
			var last = lastPage;
			if (page - firstPage > 2 && totalPage - lastPage == 1){//加页,总页只比按钮最后页多1
				first += 1;
				last += 1;
			}else if (totalPage - lastPage > 0 && page - firstPage == 3){//当前页的下一页
				first += 1;
				last += 1;
			}else if (totalPage - lastPage > 1 && page -firstPage == 4){//当前页的下两页
				first += 2;
				last += 2;
			}else if (page - firstPage < 3 && firstPage == 2){//减页，按钮第一页为2
				first -= 1;
				last -= 1;
			}else if (page - firstPage == 1 && firstPage > 0){//当前页的前一页
				first -= 1;
				last -= 1;
			}else if (page - firstPage == 0 && firstPage > 1){//当前页的前两页
				first -= 2;
				last -= 2;
			}
			$jtable.data("table").option.firstPage = first;
			$jtable.data("table").option.lastPage = last;
		}
		loadPagination(target);
		remoteData(target);
	}
	//第一页
	function firstPage(jtable){
		var $table = $(jtable);
		var option = $table.data("table").option;
		if (option.pageNumber == 1) return;
		if (option.totalPage > 5){
			$table.data("table").option.firstPage = 1;
			$table.data("table").option.lastPage = 5;
		}
		$table.data("table").option.pageNumber = 1;
		loadPagination(jtable);
		remoteData(jtable);
	}
	//最后一页
	function lastPage(jtable){
		var option = $(jtable).data("table").option;
		if (option.pageNumber == option.totalPage) return;
		if (option.totalPage > 5){
			$(jtable).data("table").option.firstPage = option.totalPage - 4;
			$(jtable).data("table").option.lastPage = option.totalPage;
		}
		$(jtable).data("table").option.pageNumber = option.totalPage;
		loadPagination(jtable);
		remoteData(jtable);
	}
	//显示前几页
	function prePages(jtable){
		var $jtable = $(jtable);
		var option = $jtable.data("table").option;
		var first = option.firstPage;
		$jtable.data("table").option.firstPage = option.firstPage > 6 ? (option.firstPage - 5) : 1;
		$jtable.data("table").option.lastPage = first > 6 ? (option.lastPage - 5) : (option.lastPage - first + 1);
		loadPagination(jtable); 
	}
	//显示后几页
	function nextPages(jtable){
		var $jtable = $(jtable);
		var option = $jtable.data("table").option;
		$jtable.data("table").option.firstPage = (option.totalPage - option.lastPage) >= 5 ? option.firstPage + 5 : (option.totalPage - 4);
		$jtable.data("table").option.lastPage = (option.totalPage - option.lastPage) >= 5 ? option.lastPage + 5 : option.totalPage;
		loadPagination(jtable); 
	}
	function loadData(jtable,body,num){
		var $table = $(jtable);
		var option = $table.data("table").option;
		var id = $table.prop("id");
		var data = option.data;
		var $headDiv = $table.siblings(".div-table").find(".div-head,.div-head1");
		var $tbody = body.children("tbody").empty();
		var rows = data.rows;
		if (!num){
			var cols = option.columns;
		}else if (num == 1){//左侧表格
			var cols = option.columns.slice(0,option.checkbox?option.frozenNumber+1:option.frozenNumber);
		}else if (num == 2){//右侧表格
			var cols = option.columns.slice(option.checkbox?option.frozenNumber+1:option.frozenNumber);
		}
		var thArray = $table.data("table").thArray;
		if (!thArray){
			thArray = [];
			for (var i = 0; i < cols.length; i++){
				thArray.push($headDiv.find("th[data-field="+cols[i].field+"]"));
			}
			$table.data("table").thArray = thArray;
		}
		//记录每一列的隐藏/显示状态
		var hiddenArray = [];
		for (i = 0; i < thArray.length; i++){
			hiddenArray.push(thArray[i].hasClass("column-hidden"));
		}
		var trArray = [];
		for (var i = 0; i < rows.length; i++){
			var tdArray = [];
			for (var j = 0; j < cols.length; j++){
				if (option.columnToggle){
					if (hiddenArray[j]){
						var td = "<td class='column-hidden'>";
					}else {
						var td = "<td>";
					}
				}else{
					var td = "<td>";
				}
				var html = "";
				if (cols[j].field == "checkbox"){
					html = "<span class='span-checkbox'></span>";
				}else if (cols[j].formatter){
					html = cols[j].formatter(rows[i][cols[j].field],rows[i],i);
				}else{
					html = rows[i][cols[j].field] ? rows[i][cols[j].field] : "";
				}
				td += "<div class='table-"+id+"-"+cols[j].field+"'>" + html + "</div></td>";
				tdArray.push(td);
			}
			trArray.push("<tr>" + tdArray.join("") + "</tr>");
		}
		$tbody.html(trArray.join(""));
		setTimeout(function(){
			resize(jtable);
		}, 1);
		if ((!num || num==2) && option.onLoadSuccess){
			option.onLoadSuccess(data);
		}
	}
	//远程获取数据
	function remoteData(jtable){
		var $table = $(jtable);
		var option = $table.data("table").option;
		if (option.onBeforeLoad){
			if (!option.onBeforeLoad()) return;
		}
		$table.data("table").option.formData[option.pageSizeField] = option.pageSize;
		$table.data("table").option.formData[option.pageNumberField] = option.pageNumber;
		if (option.showLoader){//是否显示加载层
			var $tableDiv = $table.data("table").tableDiv;
			var $loader = $("<div class='div-loader' style='width:100%;height:100%;'></div>").appendTo($tableDiv);
			var $modal = $("<div class='lava-table-modal'></div>").appendTo($loader);
			var $progress = $("<div class='progress progress-striped active lava-progress'><div class='progress-bar progress-bar-success'></div></div>").appendTo($loader);
			// $loader.css({top:$tableDiv.parent().offset().top,left:$tableDiv.offset().left,height:$tableDiv.parent().height(),width:$tableDiv.width()});
			$progress.css({left:$tableDiv.width() * 0.37, top:$tableDiv.parent().height() / 2 - 10});
		}
		$.ajax({
			url:option.url,
			type:option.method,
			dataType:"json",
			data:option.formData
		})
		.done(function(data){
			if (option.showLoader){
				$loader.remove();
			}
			if (option.loadFilter){
				$table.data("table").option.data = option.loadFilter(data);
			}else{
				$table.data("table").option.data = data;
			}
			if (option.frozenNumber == 0){
				loadData(jtable,$table.data("table").bodyDiv.children().children());
			}else{
				$table.data("table").bodyDiv1.children().children().find("tbody").empty();
				$table.data("table").bodyDiv2.children().children().find("tbody").empty();
				loadData(jtable,$table.data("table").bodyDiv1.children().children(),1);
				loadData(jtable,$table.data("table").bodyDiv2.children().children(),2);
			}
			if (option.pagination) loadPagination(jtable);
		})
		.fail(function(){
			if (option.showLoader){
				$loader.remove();
			}
			$table.data("table").option.data = {total:0,rows:[]};
			if (option.frozenNumber == 0){
				loadData(jtable,$table.data("table").bodyDiv.children().children());
			}else{
				$table.data("table").bodyDiv1.children().children().find("tbody").empty();
				$table.data("table").bodyDiv2.children().children().find("tbody").empty();
				loadData(jtable,$table.data("table").bodyDiv1.children().children(),1);
				loadData(jtable,$table.data("table").bodyDiv2.children().children(),2);
			}
			if (option.pagination) loadPagination(jtable);
		});
	}
	function resize(jtable){
		var option = $(jtable).data("table").option;
		var $jtable = $(jtable);
		if (option.frozenNumber == 0){
			if (option.fit){
				var parentHeight = $jtable.parent().height();
				var headHeight = $jtable.data("table").headDiv.height();
				var height = parentHeight - headHeight - (option.pagination ? 40 : 0);
				$jtable.data("table").tableDiv.css({height:parentHeight-(option.pagination?40:0)});
				$jtable.data("table").bodyDiv.css({height:height});
			}
			var css = "";
			var cols = option.columns;
			var headWidth = $jtable.data("table").bodyDiv.children().width();
			setTimeout(function(){
				var headWidth = $jtable.data("table").bodyDiv.children().width();
				$jtable.data("table").headDiv.css({width:headWidth - 1});
			},0);
			var totalWidth = 0,width=0;
			var id = $jtable.prop("id");
			for (var i=0;i<cols.length;i++){
				if (cols[i].field == "checkbox"){
					totalWidth += 33;
				}else{
					totalWidth += cols[i].width;
				}
			}
			for (var i=0;i<cols.length;i++){
				if (totalWidth < headWidth){
					width = parseInt(headWidth/totalWidth * cols[i].width)-17;
				}else{
					width = cols[i].width - 17;
				}
				css += ".table-"+id+"-"+cols[i].field+"{width:100%;width:"+width+"px;}";
			}
			if ($jtable.data("table").style) $jtable.data("table").style.remove();
			var style = $("<style type='text/css'>"+css+"</style>").insertAfter($jtable);
			$jtable.data("table").style = style;
			var bodyDiv = $jtable.data("table").bodyDiv;
			if (totalWidth < headWidth){
				bodyDiv.css({"overflow-x":"hidden"});
			}else{
				bodyDiv.css({"overflow-x":"auto"});
			}
		}else{
			if (option.fit){
				var parentHeight = $jtable.parent().height();
				var headHeight = $jtable.data("table").headDiv1.height();
				var height = parentHeight - headHeight - (option.pagination ? 40 : 0);
				$jtable.data("table").tableDiv.css({height:parentHeight-(option.pagination?40:0)});
				$jtable.data("table").bodyDiv1.css({height:height});
				$jtable.data("table").bodyDiv2.css({height:height});
			}
			var cols = option.columns;
			var width = 1;
			for (var i= 0;i<(option.checkbox ? option.frozenNumber + 1 : option.frozenNumber);i++){
				if (cols[i].field == "checkbox"){
					width += 33;
				}else{
					width += cols[i].width;
				}
			}
			$jtable.data("table").headDiv2.css({width:parseInt($jtable.data("table").tableDiv.width() - width)-1});
			$jtable.data("table").bodyDiv2.css({width:parseInt($jtable.data("table").tableDiv.width() - width)-1});
			var rows1 = $jtable.data("table").bodyDiv1.find("tr");
			var rows2 = $jtable.data("table").bodyDiv2.find("tr");
			if (rows2.length > 0){
				for (var i=0;i<rows1.length;i++){
					if (rows1.eq(i).outerHeight() > rows2.eq(i).outerHeight()){
						var height = Math.ceil(rows1.eq(i).outerHeight());
						rows1.eq(i).css({height:height});
						rows2.eq(i).css({height:height});
					}else if (rows2.eq(i).outerHeight() > rows1.eq(i).outerHeight()){
						var height = Math.ceil(rows2.eq(i).outerHeight());
						rows1.eq(i).css({height:height});
						rows2.eq(i).css({height:height});
					}
				}
			}


			var width=0, totalWidth = 0;
			var body = $jtable.data("table").bodyDiv2, id=$jtable.prop("id"), $head = $jtable.data("table").headDiv2.find("thead");
			var css = "<style type='text/css'>";
			var hideNum = $head.find(".column-hidden").length;

			if (option.frozenNumber > 0){
				var autoWidth = 0;
				for (var i=option.checkbox?option.frozenNumber+1:option.frozenNumber;i<cols.length;i++){
					if (!$head.find(".table-"+id+"-"+cols[i].field).parent().hasClass("column-hidden")) autoWidth += cols[i].width;
				}
			}
			for (var i=0;i<cols.length;i++){
				width = cols[i].width-17;
				if (autoWidth < body.width()- 18 && i >= (option.checkbox ? option.frozenNumber+1 : option.frozenNumber)){
					if (!$head.find(".table-"+id+"-"+cols[i].field).parent().hasClass("column-hidden")){
						width = parseInt((body.width()-18) / autoWidth * cols[i].width) - 17;
						totalWidth += width;
					}else{
						width = parseInt((body.width()-18) / autoWidth * cols[i].width) - 17;
					}
					
				}
				if (cols[i].field != "checkbox") css += ".table-"+id+"-"+cols[i].field+"{width:"+width+"px;}";
			}
			$jtable.data("table").headDiv2.children().css('width', totalWidth);
			css += "</style>";
			if ($jtable.data("table").style) $jtable.data("table").style.remove();
			var $style = $(css).insertAfter($jtable);
			$jtable.data("table").style = $style;
			$jtable.data("table").bodyDiv2.children().css({width:totalWidth-18});
			if (/msie|trident[\s\S]*rv/.test(navigator.userAgent.toLowerCase())){
				var bodyDiv2 = $jtable.data("table").bodyDiv2;
				bodyDiv2.scroll();
			}
		}
	}
	//显示列
	function showColumn(table,field){
		var $table = $(table);
		var id = $table.prop("id");
		// $table.siblings(".div-table").find(".table-"+id+"-"+field).parent().show();
		$table.siblings(".div-table").find(".table-"+id+"-"+field).parent().removeClass("column-hidden");
		resize(table);
	}
	//隐藏列
	function hideColumn(table,field){
		var $table = $(table);
		var id = $table.prop("id");
		// $table.siblings(".div-table").find(".table-"+id+"-"+field).parent().hide();
		$table.siblings(".div-table").find(".table-"+id+"-"+field).parent().addClass("column-hidden");
		resize(table);
	}
	//事件注册
	function bindEvent(jtable){
		$(window).resize(function(){
			setTimeout(function(){
				if (!$(jtable).parent().is(":visible")) return;
				resize(jtable);
			},100);
		});
		var $jtable = $(jtable);
		var option = $jtable.data("table").option;
		if ($(jtable).data("table").bodyDiv){
			var $bodyDiv = $(jtable).data("table").bodyDiv;
			$bodyDiv.on("scroll",function(){
				$jtable.data("table").headDiv.children().css({left:-$bodyDiv.scrollLeft()});
			});
		}
		if ($(jtable).data("table").bodyDiv2){
			var $bodyDiv1 = $jtable.data("table").bodyDiv1;
			var $bodyDiv2 = $jtable.data("table").bodyDiv2;
			var $headDiv2 = $jtable.data("table").headDiv2;
			var option = $jtable.data("table").option;
			$bodyDiv2.on("scroll",function(){
				$bodyDiv1.children().css({top:-$bodyDiv2.scrollTop()});
				// $bodyDiv1.scrollTop($bodyDiv2.scrollTop());
				$headDiv2.children().css({left:-$bodyDiv2.scrollLeft() - option.frozenWidth});
			});
		}
		if ($jtable.data("table").pageDiv){
			$jtable.data("table").pageDiv.find(".div-pagebtn").children().on("click",function(){
				if ($(this).data("table")) gotoPage(jtable,$(this).data("table").page);
			});
			$jtable.data("table").pageDiv.find(".page-first").on("click",function(){
				firstPage(jtable);
			});
			$jtable.data("table").pageDiv.find(".page-last").on("click",function(){
				lastPage(jtable);
			});
			$jtable.data("table").pageDiv.find(".page-pre").on("click",function(){
				prePages(jtable);
			});
			$jtable.data("table").pageDiv.find(".page-next").on("click",function(){
				nextPages(jtable);
			});
		}
		if (option.frozenNumber == 0){
			var headDiv = $jtable.data("table").headDiv;
			var bodyDiv = $jtable.data("table").bodyDiv;
		}else{
			// var headDiv = $jtable.data("table").headDiv1;
			var headDiv = $jtable.siblings(".div-table").find(".div-head1,.div-head2");
			var bodyDiv = $jtable.data("table").bodyDiv1;
		}
		if ($jtable.data("table").option.checkbox){
			
			
			//全选/全不选
			headDiv.find(".jq-table").find(".span-checkbox").on("click",function(){
				$(this).toggleClass("span-checkbox-checked");
				if (!$(this).hasClass("span-checkbox-checked")){
					bodyDiv.find(".span-checkbox").removeClass("span-checkbox-checked");
				}else{
					bodyDiv.find(".span-checkbox").addClass("span-checkbox-checked");
				}
			});
			bodyDiv.delegate(".span-checkbox","click",function(){
				var checkAll = true;
				$(this).toggleClass("span-checkbox-checked");
				var rows = bodyDiv.children().children().children().children();
				for (var i=0;i<rows.length;i++){
					var checkbox = rows.eq(i).find(".span-checkbox");
					if (!checkbox.hasClass("span-checkbox-checked")){
						checkAll = false;
						break;
					}
				}
				if (checkAll){
					headDiv.find(".jq-table").find(".span-checkbox").addClass("span-checkbox-checked");
				}else{
					headDiv.find(".jq-table").find(".span-checkbox").removeClass("span-checkbox-checked");
				}
			});
		}
		//列显示/隐藏
		$("body").delegate(".a-columntoggle","click",function(e){
			var $checkbox = $(this).children(".span-checkbox");
			//如果只剩一列，则不隐藏
			if ($checkbox.parent().parent().parent().find(".span-checkbox-checked").length == 1 && $checkbox.hasClass("span-checkbox-checked")){
				return false;
			}

			$checkbox.toggleClass("span-checkbox-checked");
			var field = $(this).attr("data-field");
			var $table = $(this).parent().parent().data("table");
			if ($checkbox.hasClass("span-checkbox-checked")){
				showColumn(jtable,field);
			}else{

				hideColumn(jtable,field);
			}
			return false;
		});
		//排序
		if (option.frozenNumber > 0) headDiv = $jtable.siblings(".div-table").find(".div-head1,.div-head2");
		headDiv.delegate("th[data-ordertype]","click",function(e){
			var $angle = $(this).find(".table-angle");
			var formData = $jtable.data("table").option.formData;
			var field = $(this).attr("data-field");
			if ($angle.hasClass("table-angle-up")){
				if (!$angle.hasClass("table-angle-active")){
					formData.orderType = "asc";
				}else{
					$angle.removeClass("table-angle-up").addClass("table-angle-down");
					formData.orderType = "desc";
				}
			}else if ($angle.hasClass("table-angle-down")){
				if (!$angle.hasClass("table-angle-active")){
					formData.orderType = "desc";
				}else{
					$angle.removeClass("table-angle-down").addClass("table-angle-up");
					formData.orderType = "asc";
				}
			}
			headDiv.find(".table-angle-active").removeClass("table-angle-active");
			$angle.addClass("table-angle-active");
			formData.orderField = field;
			remoteData(jtable);
		});
	}
	//打印
	function print(jtable) {
		if ($("div.page-content").length > 0) {
			if (!$("div.page-content").hasClass("div-noprint")) {
				$("div.page-content").addClass("div-noprint");
				$("body").append("<style>.div-print{display: none;} @media print {.div-noprint{display: none;} .div-print{display: block;}}.table-print{border-collapse:collapse;border-spacing:0;text-align:center;}.table-print td,.table-print th{border:1px solid #ddd;font-weight:normal;}</style>")
			}
		}
		if ($("div.container").length > 0) {
			if (!$("div.container").hasClass("div-noprint")) {
				$("div.container").addClass("div-noprint");
				$("body").append("<style>.div-print{display: none;} @media print {.div-noprint{display: none;} .div-print{display: block;}}.table-print{border-collapse:collapse;border-spacing:0;text-align:center;}.table-print td,.table-print th{border:1px solid #ddd;font-weight:normal;}</style>");
			}
		}
		var head = getHeader(jtable);
		var body = getBody(jtable);
		if ($(".div-print").length > 0) {
			$(".div-print").html("<table cellspacing='0' cellpadding='0' class='table-print' style='width:100%;font-size:12px;'>" + head + body + "</table>");
		} else {
			$("body").append("<div class='div-print'><table cellspacing='0' cellpadding='0' class='table-print' style='width:100%;font-size:12px;'>" + head + body + "</table></div>");
		}
		setTimeout(function(){
			window.print();
		}, 10);
	}
	function getHeader(jtable) {
		var $table = $(jtable).nextAll(".div-table");
		var $tablehead1 = $table.children(".div-head1");
		var $tablehead2 = $table.children(".div-head2");
		var tdArray = [];
		var trArray = [];
		if ($tablehead1.length > 0) {
			var $headth1 = $tablehead1.find("th");
			var $headth2 = $tablehead2.find("th");
			for (var i = 0; i < $headth1.length; i++) {
				if ($headth1.eq(i).is(":visible")) {
					var html = $headth1.eq(i).children("div").html();
					tdArray.push("<th>"+html+"</th>");
				}
			}
			if ($tablehead2.length > 0) {
				for (i; i < $headth2.length; i++) {
					if ($headth2.eq(i).is(":visible")) {
						var html = $headth2.eq(i).children("div").html();
						tdArray.push("<th>"+html+"</th>");
					}
				}
			}
		} else {
			var $tablehead = $table.children(".div-head");
			var $headth = $tablehead.find("th");
			for (var i = 0; i < $headth.length; i++) {
				if ($headth.eq(i).is(":visible")) {
					var html = $headth.eq(i).children("div").html();
					tdArray.push("<th>"+html+"</th>");
				}
			}
		}
		trArray.push("<tr>"+tdArray.join("")+"</tr>");
		return "<thead>"+trArray.join("")+"</thead>";
	}
	function getBody(jtable) {
		var trArray = [];
		var $table = $(jtable).nextAll(".div-table");
		var $divbody1 = $table.children(".div-body1");
		var $divbody2 = $table.children(".div-body2");
		var $divbody = $table.children(".div-body");
		if ($divbody1.length > 0) {
			var $tr1 = $divbody1.find("tr");
			var $tr2 = $divbody2.find("tr");
			for(var i = 0; i < $tr1.length; i++) {
				var tdArray = [];
				var $td1 = $tr1.eq(i).children("td");
				var $td2 = $tr2.eq(i).children("td");
				for (var j = 0; j < $td1.length; j++) {
					if ($td1.eq(j).is(":visible")) {
						var td1 = $td1.eq(j).children("div").html();
						tdArray.push("<td>" + td1 + "</td>");
					}
				}
				if ($td2.length > 0) {
					for (var j = 0; j < $td2.length; j++) {
						if ($td2.eq(j).is(":visible")) {
							var td2 = $td2.eq(j).children("div").html();
							tdArray.push("<td>" + td2 + "</td>");
						}
					}
				}
				trArray.push("<tr>" + tdArray.join("") + "</tr>");
			}
		} else {
			var $tr = $divbody.find("tr");
			for(var i = 0; i < $tr.length; i++) {
				var tdArray = [];
				var $td = $tr.eq(i).children("td");
				for (var j = 0; j < $td.length; j++) {
					if ($td.eq(j).is(":visible")) {
						var td = $td.eq(j).children("div").html();
						tdArray.push("<td>" + td + "</td>");
					}
				}
				trArray.push("<tr>" + tdArray.join("") + "</tr>");
			}
		}
		return "<tbody>"+trArray.join("")+"</tbody>";
	}
	$.fn.table = function(option,param){
		if (typeof option == "string"){
			return $.fn.table.methods[option](this,param);
		}else{
			return this.each(function(){
				$(this).data("table",{option:$.extend({},$.fn.table.defaults)});
				$.extend($(this).data("table").option,option);
				//表格分页语言包
				$.extend(language, $(this).data("table").option.footLanguage);
				initTable(this);
				bindEvent(this);
			});
		}
	};
	$.fn.table.defaults = {
		method: "post",
		pagination:true,
		pageSize:20,
		pageNumber:1,
		pageSizeField:"rows",
		pageNumberField:"page",
		footLanguage: {},
		nowrap:true,
		striped:true,
		rownumbers:false,
		formData:{},
		frozenNumber:0,
		lang:"zh-CN",
		fit:false,
		checkbox:false,
		showLoader:true,
		data:{total:0,rows:[]},
		//事件
		onBeforeLoad: null, //远程请求前触发，返回false则不发起请求
		onLoadSuccess: null //数据加载完成触发
	};
	$.fn.table.methods = {
		load:function(jq,param){
			var $jtable = $(jq);
			$jtable.data("table").option.formData = param;
			$jtable.data("table").option.pageNumber = 1;
			$jtable.data("table").option.firstPage = null;
			$jtable.data("table").option.lastPage = null;
			remoteData(jq);
		},
		reload:function(jq,param){
			remoteData(jq);
		},
		loadData:function(jq,param){
			var $jtable = $(jq);
			var option = $jtable.data("table").option;
			$jtable.data("table").option.data = param;
			$jtable.data("table").option.pageNumber = 1;
			$jtable.data("table").option.firstPage = null;
			$jtable.data("table").option.lastPage = null;
			if (option.frozenNumber == 0){
				loadData(jq,$jtable.data("table").bodyDiv.children().children());
			}else{
				$jtable.data("table").bodyDiv1.children().children().find("tbody").empty();
				$jtable.data("table").bodyDiv2.children().children().find("tbody").empty();
				loadData(jq,$jtable.data("table").bodyDiv1.children().children(),1);
				loadData(jq,$jtable.data("table").bodyDiv2.children().children(),2);
			}
			if (option.pagination) loadPagination(jq);
		},
		getChecked:function(jq){
			var tableDiv = jq.data("table").tableDiv;
			var data = jq.data("table").option.data.rows;
			var rows = [];
			var checkbox = tableDiv.find("td .span-checkbox");
			for (var i=0;i<data.length;i++){
				if (checkbox.eq(i).hasClass("span-checkbox-checked")){
					rows.push(data[checkbox.eq(i).parent().parent().parent().index()]);
				}
			}
			return rows;
		},
		options: function(jq){
			return $(jq).data("table").option;
		},
		resize:function(jq,param){
			resize(jq);
		},
		print: function(jq) {
			print(jq);
		}
	};
	var language = {
		"zh-CN":{
			total:"总共",
			from:"显示",
			to:"到"
		},
		"en-US":{
			total:"Total",
			from:"displaying from",
			to:"to"
		},
		"zh-TW":{
			total:"總共",
			from:"顯示",
			to:"到"
		},
		"th-TH":{
			total:"ทั้งหมด",
			from:"แสดง",
			to:"ถึง"
		},
		"pt-BR":{
			total: "Total",
			from: "Exibindo de",
			to: "até"
		}
	};
})(jQuery);