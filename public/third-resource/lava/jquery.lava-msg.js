var lavaMsg = {
	//提示框
	alert: function(message, type, timeout) {
		var id = "lavaMsg_alert_" + new Date().getTime();
		var icon = "";
		if (type == "success"){
			icon = "fa-check";
		}else if (type == "warning"){
			icon = "fa-warning";
		}else if (type == "info"){
			icon = "fa-info-circle";
		}else if (type == "danger"){
			icon = "fa-close";
		}
		var $alertWrapper = $("<div style='position:fixed;top:0;width:100%;z-index:20000;'></div>").appendTo("body");
		var $alert = $("<div class='modal-dialog modal-lg alert alert-"+type+" fade in' style='margin:auto;'><i class='fa fa-lg "+icon+"'></i> "+message+"</div>").appendTo($alertWrapper);
		var $close = $("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'></button>").appendTo($alert);
		setTimeout(function(){
			$alertWrapper.fadeOut(1000,function(){$alertWrapper.remove()});
		},timeout ? timeout : 3000);
	},
	//等待框
	loading:function(flag){
		var $loading = $(".lava-msg-loading");
		var $style = $(".lava-msg-style");
		if (flag && $loading.length == 0){
			var $modal = $("<div class='lava-msg-loading' style='position:fixed;top:0;left:0;z-index:2021;width:100%;height:100%;background:rgba(0,0,0,0.25);'></div>").appendTo("body");
			var $progress = $("<div class='progress progress-striped active' style='width:20%;margin:22% 40%;'></div>").appendTo($modal);
			var $bar = $("<div class='progress-bar progress-bar-success' style='width:100%;'></div>").appendTo($progress);
			$modal.click(function(){
				lavaMsg.loading(false);
			});
		}else if (!flag && $loading.length > 0){
			$loading.fadeOut(500,function(){$loading.remove()});
		}
	},
	//单条确认对话框
	singleConfirm:function(element,message,okLabel,cancelLabel,callback){
		var $el = $(element);
		var position = $el.offset().top < 90 ? "bottom" : "top";
		$el.addClass("lava-msg-singleconfirm");
		$(".lava-popover").fadeOut(300,function(){$(this).remove();});
		var $popover = $("<div class='popover lava-popover " + position + " in'><div class='arrow' style='left:50%;'></div></div>").appendTo("body").show();
		var $title = $("<h3 class='popover-title'>"+(message?message:"Are you sure ?")+"</h3>").appendTo($popover);
		var $content = $("<div class='popover-content text-center'></div>").appendTo($popover);
		var $ok = $("<button type='button' class='btn btn-sm btn-success'><i class='fa fa-check'></i> "+(okLabel?okLabel:"Yes")+"</button>").appendTo($content);
		var left = $el.offset().left + $el.width()/2 - $popover.width()/2 -1;
		var top = $el.offset().top - $popover.height() - 2;
		$popover.css({left:left,top:top});
		$ok.click(function(e){
			if (callback) callback(true);
			$popover.remove();
			e.stopPropagation();
		});
	},
	//确认对话框
	confirm:function(prompt,message,okLabel,callback){
		/*var $modal = $("<div style='position:fixed;top:0;left:0;right:0;bottom:0;z-index:10001;background:rgba(0,0,0,0.4);'></div>").appendTo("body");
		var $content = $("<div style='position:fixed;z-index:10020;padding:20px;background:#fff;text-align:center;opacity:0;'></div>").insertAfter($modal);
		var $icon = $("<i class='icon-question font-green-sharp' style='position:absolute;left:20px;top:45%;font-size:60px;'></i>").appendTo($content);
		var $message = $("<h2 style='font-size:20px;margin-left:60px;'>"+message+"<h2>").appendTo($content);
		var $cancel = $("<button type='button' class='btn btn-danger' style='margin-right:5px;margin-left:50px;'><i class='fa fa-remove'></i> "+cancelLabel+"</button>").appendTo($content);
		var $ok = $("<button type='button' class='btn btn-success' style='margin-left:5px;'><i class='fa fa-check'></i> "+okLabel+"</button>").appendTo($content);
		if ($(window).width() >= 768){
			$content.css({top:"50%",left:"50%",width:50,marginLeft:-25,marginTop:-100});
			$content.animate({opacity:1,width:600,marginLeft:-300},200);
			$content.animate({opacity:1,width:400,marginLeft:-200},200);
			$content.animate({opacity:1,width:478,marginLeft:-239},200);
		}else {
			$content.css({top:"50%",left:15,right:15,marginTop:-100,opacity:1});
		}
		$modal.click(function(){
			$modal.fadeOut(200,function(){$(this).remove();});
			$content.fadeOut(200,function(){$(this).remove();});
		});
		$cancel.click(function(e){
			if (callback) callback(false);
			$modal.click();
		});
		$ok.click(function(e){
			if (callback) callback(true);
			$modal.click();
		});*/
		var $modal = $("<div class='modal fade in lava-msg-confirm'></div>").appendTo("body");
		var $dialog = $("<div class='modal-dialog'></div>").appendTo($modal);
		var $content = $("<div class='modal-content'></div>").appendTo($dialog);
		var $header = $("<div class='modal-header'><h4 class='modal-title bold font-green'>"+prompt+"</h4></div>").appendTo($content);
		var $close = $("<button type='button' class='close' data-dismiss='modal' aria-hidden='true'></button>").prependTo($header);
		var $body = $("<div class='modal-body'>"+message+"</div>").appendTo($content);
		var $footer = $("<div class='modal-footer'></div>").appendTo($content);
		var $ok = $("<button type='button' class='btn green'><i class='fa fa-check'></i> "+okLabel+"</button>").appendTo($footer);
		$modal.modal("show");
		$ok.click(function(e){
 			if (callback) callback(true);
 			$modal.click();
		});
		$modal.click(function(e){
			setTimeout(function(){$modal.remove();},2000);
		});
		$dialog.click(function(e){
			e.stopPropagation();
		});
		$close.click(function(e){
			$modal.modal("hide");
			$modal.click();
		});
	},
	//事件绑定
	bindEvent:function(){
		$("body").delegate(".popover-title,.popover-content,.lava-msg-singleconfirm","click",function(e){
			e.stopPropagation();
		});
		$(document).on("click",function(e){
			if (!$(this).hasClass("popover-title") && !$(this).hasClass("popover-content") && !$(this).hasClass("lava-msg-singleconfirm")){
				$(".lava-popover").fadeOut(300,function(){$(this).remove()});
			}
		});
	}
};
$(function(){
	lavaMsg.bindEvent();
});