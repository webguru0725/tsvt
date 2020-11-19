;
/*依赖于jquery.lava-videolayout.js*/
var lavaPlayer = {
	init:function(target){
		var that = this;
		var options = $(target).data("player").options;
		var flash = that.supportFlash();
		var playType = flash.f ? "flash" : "html5";
		if (options.playType) playType = options.playType;
		options.playType = playType;
		if (playType == "flash"){
			if (!flash.v){
				that.showPrompt(target, options.langObj.noFlash);
			} else if (flash.v < 24){
				that.showPrompt(target);
			} else {
				that.initFlash(target);
			}
		}else {
			/*var browser = that.checkBrowser();
			//IE或者edge下直通强制使用flash
			if (options.type == "flv" && (browser.msie || browser.edge)){
				that.showPrompt(target, options.langObj.noFlash);
			}else {*/
				that.initVideo(target);
			// }
		}
	},
	//初始化flash播放器
	initFlash: function(target){
		var that = this;
		var $target = $(target);
		var options = $target.data("player").options;
		var $flashDiv = $("<div id='div_flash'></div>").appendTo($target);
		that.loadScriptOrCss("script",options.swfObject,function(){
			var flashvars = {
				lang: options.lang,
				type: options.type == "flv" ? "live" : "playback",
				timeout: options.timeout,
				streamToggle: options.streamToggle ? "on" : "off"
			};
	        var params = {
	            menu: "false",
	            scale: "noScale",
	            allowFullscreen: "true",
	            allowScriptAccess: "always",
	            bgcolor: "",
	            wmode: "opaque" // can cause issues with FP settings & webcam
	        };
	        var attributes = {
	            id:"RTMPPlayer"
	        };
	        swfobject.embedSWF(options.swf, "div_flash", "100%", "100%", "24.0.0", options.installSwf, flashvars, params, attributes, function(data){
				var timer = setInterval(function(){
					try {
						var percent = Math.floor($("#RTMPPlayer")[0].PercentLoaded());
						if (Math.floor($("#RTMPPlayer")[0].PercentLoaded()) == 100){
							clearInterval(timer);
							if (options.onReady){
								options.onReady();
							}
						}
					} catch (err) {
						if (err) {
							that.showPrompt(target);
							clearInterval(timer);
							return;
						}
					}
					
				}, 1000);
			});
    	});
	},
	//显示提示信息，flash禁用或者版本过低
	showPrompt: function(target, prompt){
		var that = this;
		var $target = $(target);
		var options = $target.data("player").options;
		var lang = options.langObj;
		if (!prompt){
			$(target).append("<div class='lp-prompt'><a class='lp-a-flashplayer' href='https://get.adobe.com/flashplayer?promoid=KLXMF' target='_blank'><div class='lp-download'></div>Flash Player</a></div>");
		}else {
			var prompt = "<div class='lp-prompt'><h5>" + prompt + "</h5>";
			var browser = that.checkBrowser();
			prompt = prompt + "<p>1. " + lang.noInstallFlash + "<br /><a class='lp-a-flashplayer' href='https://get.adobe.com/flashplayer?promoid=KLXMF' target='_blank'>" + lang.clickHere + "</a><br />2. " + lang.installedFlash + "<br />";
			if (browser.msie){
				prompt += lang.iePrompt;
			} else if (browser.firefox){
				// prompt += "<a class='lp-a-flashplayer' href='javascript:;' data-href='about:addons'>" + lang.clickHere + "</a><br />";
				prompt += lang.firefoxPrompt;
			} else if (browser.chrome){
				// prompt += "<a class='lp-a-flashplayer' href='javascript:;' data-href='chrome://plugins'>" + lang.clickHere + "</a><br />";
				prompt += lang.chromePrompt;
			} else if (browser.opera){
				// prompt += "<a class='lp-a-flashplayer' href='javascript:;' data-href='opera://plugins'>" + lang.clickHere + "</a><br />";
				prompt += lang.operaPrompt;
			} else {
				prompt += lang.edgePrompt;
			}
			prompt += "</div>";
			$target.append(prompt);
		}
	},
	//检测浏览器类型
	checkBrowser: function(){
		var ua = navigator.userAgent.toLowerCase();
		return {
			msie: /msie|trident[\s\S]*rv/.test(ua),
			firefox: /firefox/.test(ua),
			chrome: /chrome/.test(ua) && !/opr/.test(ua),
			opera: /opr/.test(ua),
			edge: /edge/.test(ua)
		};
	},
	//初始化h5 video播放器
	initVideo: function(target){
		var that = this;
		var $target = $(target);
		$target.css({position: "relative"});
		var options = $(target).data("player").options;
		var lang = options.langObj;
		that.loadScriptOrCss("script", options.layoutUrl, function(){
			that.loadScriptOrCss("script", options[options.type], function(){
				var $container = $("<div class='lava-playercontainer' style='width:100%;'></div>").appendTo($target);
				var layoutArray = [2, 3, 4, 6, 9, 10, 12, 16];
				if (options.layout){
					var $toolbar = $("<div class='lava-playertoolbar'></div>").appendTo($target);
					var html = "<a href='javascript:;' class='btn lp-voice lp-voice-on'></a>" +
							"<a href='javascript:;' class='btn lp-capture'></a>" +
							"<a href='javascript:;' class='btn lp-screen lp-screen-on'></a>";
					var layoutHtml = [];
					for (var i = 0; i < layoutArray.length; i ++) {
						if (options.maxLayout >= layoutArray[i]) {
							layoutHtml.push("<a href='javascript:;' class='btn lp-layout lp-layout" + layoutArray[i] + "' data-count='" + layoutArray[i] + "'></a>");
						}
					}
					html += layoutHtml.join("");
					html += "<div class='lp-progressdiv'>"+
							"<canvas width='120' height='21' style='float:left;'></canvas>" +
							"<a href='javascript:;' class='btn-ignore'>" + lang.ignore + "</a>" + 
							"<a href='javascript:;' class='btn-noremind'>" + lang.noRemind + "</a>" +
							"</div>";
					$toolbar.html(html);
					$toolbar.find(".lp-layout"+options.layoutNum).addClass("lp-select");
				}else {
					$container.css({bottom: 0});
				}
				
				if (options.contextMenu){
					var $contextMenu = $("<ul class='lp-contextmenu'></ul>").appendTo($target);
					var html = "<li>"+lang.openVideo+"</li>" + 
								"<li>"+lang.openAllVideo+"</li>" + 
								"<li>"+lang.closeVideo+"</li>" + 
								"<li>"+lang.closeAllVideo+"</li>" + 
								"<li>"+lang.clearVideo+"</li>" + 
								"<li>" + lang.clearAllVideo + "</li>";
					if (options.streamToggle){
						html += "<li>"+lang.mainStream+"</li><li>"+lang.subStream+"</li>";
					}
					$contextMenu.html(html);
				}
				$container.lavaVideoLayout({
		            defaultCount: options.layoutNum,
					maxLayout: options.maxLayout,
		            addComplete: function(index, el) {
		                var indexEl = $('<span style="color:#FFFFFF;position:absolute;"></span>').clone();
		                var content = "<video width='100%' height='100%'></video><img src='"+options.loadingImg+"' style='position:absolute;z-index:1;left:50%;top:50%;margin: -13px 0 0 -24px;display:none;' />";
		                indexEl.text(index);
		                $container.lavaVideoLayout('addTool', { index: index, el: indexEl });
		                $container.lavaVideoLayout("addContent", {index: index, el: content});
		                /*that.videoElArray.push({
		                    no: index,
		                    video: null,
		                    hls: new Hls(),
		                    opened: false,
		                    deviceno: null,
		                    channel: null,
		                    bettyType: 1 //1 字码流  2 主码流
		                });
		                $(el).contextmenu({
		                    target: '#div_video_context_menu'
		                });*/
		            },
		            removeComplete: function(index, el) {
		                var $video = el.find("video");
						if ($video.data("video")){
							var hls = $video.data("video").hls;
							var flv = $video.data("video").flv;
							$video[0].pause();
							if (hls){
								hls.destroy();
							}
							if (flv){
								flv.destroy();
							}
						}
		            },
		            zoomOut: function(index, e) {
		                // that.resizeVideo(index);
		            },
		            zoomIn: function(index, e) {
		                // that.resizeVideo(index);
		            },
		            resize: function(index, e) {
		                // that.resizeVideo(index);
		            },
		            rightClick: function(index, e) {
		                // console.log('rightClick');
		            },
		            click: function(index, e) {
						that.openVoice(target, index);
		            }
		        });
				$target.data("player").container = $container;
				that.initEvent(target);
				if (options.onReady){
					options.onReady();
				}
			});
			
		});
		
	},
	//判断浏览器是否支持flash
	supportFlash:function(){
		var hasFlash = false; //是否安装了flash
	    var flashVersion = 0; //flash版本
		var newVersion = null;
	    if (document.all) {
	      var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
	      if (swf) {
	        hasFlash = true;
	        VSwf = swf.GetVariable("$version");
	        flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
	      }
	    } else {
	      if (navigator.plugins && navigator.plugins.length > 0) {
	        var swf = navigator.plugins["Shockwave Flash"];
	        if (swf) {
	          hasFlash = true;
	          var words = swf.description.split(" ");
	          for (var i = 0; i < words.length; ++i) {
	            if (isNaN(parseInt(words[i]))) continue;
	            flashVersion = parseInt(words[i]);
	          }
	        }
	      }
	    }
	    return { f: hasFlash, v: flashVersion };
	},
	//初始化事件
	initEvent: function(target){
		var that = this;
		var $target = $(target);
		var options = $target.data("player").options;
		var $container = $target.data("player").container;
		var screenType = "notfull";
		$target.delegate(".lp-voice, .lp-screen, .lp-layout, .lp-capture", "click", function(e){
			if ($(this).hasClass("lp-voice-on")){
				$(this).removeClass("lp-voice-on").addClass("lp-voice-off");
				that.voiceToggle(target, 0);
			}else if ($(this).hasClass("lp-voice-off")) {
				$(this).removeClass("lp-voice-off").addClass("lp-voice-on");
				that.voiceToggle(target, 1);
			}else if ($(this).hasClass("lp-screen-on")){
				$(this).removeClass("lp-screen-on").addClass("lp-screen-off");
				$target.css({position:"fixed",top:0,bottom:0});
				that.fullScreen(target);
			}else if ($(this).hasClass("lp-screen-off")){
				$(this).removeClass("lp-screen-off").addClass("lp-screen-on");
				that.exitFullScreen(target);
			}else if ($(this).attr("data-count")){
				$container.lavaVideoLayout("to", parseInt($(this).attr("data-count")));
			}else if ($(this).hasClass("lp-capture")){
				var index = $container.lavaVideoLayout("getSelectedIndex");
				if (index){
					var video = $container.lavaVideoLayout("getItem", index).find("video")[0];
					that.capture(video);
				}
			}
		});
		$target.delegate(".lava-playercontainer>div", "mousedown", function(e){
			if (e.which == 3){
				var left = $(this).offset().left - $target.offset().left + e.offsetX - 1;
				var top = $(this).offset().top - $target.offset().top + e.offsetY + 20;
				$target.find(".lp-contextmenu").show().css({left: left, top: top});
				$(this).click();
				options.selectBox = $(this);
			}else {
				$target.find(".lp-contextmenu").hide();
			}
			return false;
		});
		$target.find(".lp-contextmenu>li").on("click", function(e){
			var index = $(this).index();
			if (index == 0){
				//打开视频
				that.openVideo(options.selectBox.find("video")[0], options.onOpen);
				// that.setTimeout(target);
			}else if (index == 1){
				//打开所有视频
				that.openAll(target);
				that.setTimeout(target);
			}else if (index == 2){
				//关闭视频
				that.closeVideo(options.selectBox.find("video")[0], options.onClose);
			}else if (index == 3){
				//关闭所有视频
				that.closeAll(target);
			}else if (index == 4){
				//清除视频
				that.clearVideo(target, options.selectBox.find("video")[0]);
			}else if (index == 5){
				//清除所有视频
				that.clearAll(target);
			}else if (index == 6){
				//主码流
				that.toggleStream(options.selectBox.find("video")[0], 0);
			}else if (index == 7){
				//子码流
				that.toggleStream(options.selectBox.find("video")[0], 1);
			}
		});
		//忽略
		$target.find(".btn-ignore").on("click", function(e){
			that.setTimeout(target);
		});
		$target.find(".btn-noremind").on("click", function(e){
			that.clearTimeout(target, true);
			options.noRemind = true;
		});
		$(document).on("click", function(e){
			if (e.which != 3){
				$target.find(".lp-contextmenu").hide();
			}
			// if (e.which == 3) return false;
			
		});
		$(target)[0].oncontextmenu = function(){
			return false;
		};

		function fullScreenChange(e){
			if (screenType == "notfull"){
				screenType = "full";
				$target.find(".lp-screen").removeClass("lp-screen-on").addClass("lp-screen-off");
			}else {
				screenType = "notfull";
				$target.find(".lp-screen").removeClass("lp-screen-off").addClass("lp-screen-on");
				$target.css({position:"relative",top:"auto",bottom:"auto"});
			}
			setTimeout(function(){
				// $container.lavaVideoLayout("resize");
				var index = $container.lavaVideoLayout("getSelectedIndex");
				if (index){
					$container.lavaVideoLayout("getItem", index).click();
				}
			},50);
			
		}
		document.onwebkitfullscreenchange = fullScreenChange;
		document.onmozfullscreenchange = fullScreenChange;
		document.onmsfullscreenchange = fullScreenChange;
		document.fullscreenchange = fullScreenChange;
		document.addEventListener("fullscreenchange", fullScreenChange);
	},
	
	//全屏
	fullScreen: function(target){
		var that = this;
		var rfs = target.requestFullScreen || target.webkitRequestFullScreen || target.mozRequestFullScreen || target.msRequestFullscreen;
		if(typeof rfs != "undefined" && rfs) {
			rfs.call(target);
		} else if(typeof window.ActiveXObject != "undefined") {
			//for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
			var wscript = new ActiveXObject("WScript.Shell");
			if(wscript != null) {
			    wscript.SendKeys("{F11}");
			}
		}
	},
	//退出全屏
	exitFullScreen: function(target1){
		var that = this;
		var target = document;
		var cfs = target.cancelFullScreen || target.webkitCancelFullScreen || target.mozCancelFullScreen || target.exitFullScreen || target.msExitFullscreen;
		if(typeof cfs != "undefined" && cfs) {
			cfs.call(target);
		} else if(typeof window.ActiveXObject != "undefined") {
			//for IE，这里和fullScreen相同，模拟按下F11键退出全屏
			var wscript = new ActiveXObject("WScript.Shell");
			if(wscript != null) {
				wscript.SendKeys("{F11}");
			}
		}
	},
	//动态加载三方资源
	loadScriptOrCss:function(type, url, callback){
		var node = document.createElement(type);
        node.onload = node.onreadystatechange = function() {
            var rs = node.readyState;
            if ('undefined' === typeof rs || 'loaded' === rs || 'complete' === rs) {
                try {
                    callback();
                } finally {
                    node.onload = node.onreadystatechange = null;
                    node = null;
                }
            }
        };
        if (type === 'script') {
            node.async = true;
            node.charset = 'utf-8';
            node.src = url;
            (document.body || document.documentElement).appendChild(node);
        } else if (type === 'link') {
            node.rel = 'stylesheet';
            node.type = 'text/css';
            node.href = url;
            (document.head || document.documentElement).appendChild(node);
        }
	},
	//增加视频
	addVideo: function(target, param){
		var that = this;
		var $target = $(target);
		var options = $target.data("player").options;
		if (options.playType == "html5"){
			var $container = $target.data("player").container;
			// if (options.type == "hls") {
				var layout = $container.find("video").length == $("video[data-time]").length ? $container.find("video").length + 1 : $container.find("video").length;
				layout = layout > 16 ? 16 : layout;
				that.toLayout(target, layout);
			// }
			var $video = $container.find("video");
			var empty = false; //是否有空余的video
			for (var i=0; i < $video.length; i++){
				if (!$video.eq(i).attr("data-video")){
					empty = true;
					$video[i].src = param.url;
					$video.eq(i).parent().prev().append("<div class='lava-videotitle'>"+param.title+"[s]</div>");
					var $loading = $video.eq(i).next("img");
					$loading.show();
					if (options.type == "hls"){
						if (param.url && param.url != "test.m3u8"){
							var hls = new Hls();
							var channel = 100+i;
							hls.attachMedia($video[i]);
							hls.loadSource(param.url);
							hls.on(Hls.Events.MANIFEST_PARSED,function(){
								$video.eq(i).show();
								$loading.hide();
							});
							$video.eq(i).attr("data-video", true).data("video",{url: param.url, hls: hls});
						}else {
							$loading.hide();
							$video.eq(i).attr("data-video", true);
						}
					}else if (options.type == "flv"){
						if (flvjs.isSupported()) {
							var flvPlayer = flvjs.createPlayer({
								isLive: true,
								type: 'flv',
								url: param.url
							}, {enableStashBuffer: true});
							flvPlayer.attachMediaElement($video[i]);
							// var flvPlayer = liveplay($video[i], param.url);
							var timeSpan = new Date().getTime(); //以此判断是不是最早打开的通道
							var $vd = $video.eq(i);
							$vd.attr("data-video", true).attr("data-time", timeSpan).data("video", {url: param.url, flv: flvPlayer, stream: 1, param: param.param});
							flvPlayer.load();
							flvPlayer.play();
							//加载出错
							var playFlag = false; //是否开始播放
							var timer = null;
							flvPlayer.on(flvjs.Events.ERROR, function(err, errDetail){
								if (!playFlag){
									// that.closeVideo($vd[0]);
									$.extend($vd.data("video"), {connectCount: 1}); //重连次数
									var video = $vd[0];
									timer = setTimeout(function(){
										that.openVideo(video, null, true);
									}, 4000);
								}else if (playFlag && err == "NetworkError") {
									flvPlayer.unload();
									setTimeout(function() {
										flvPlayer.load();
										flvPlayer.play();
									}, 4000);
								} else if (playFlag && err == "MediaError") {
									var video = $vd[0];
									setTimeout(function(){
										flvPlayer.pause();
										flvPlayer.unload();
										flvPlayer.detachMediaElement();
										flvPlayer.destroy();
										flvPlayer = null;
										that.openVideo(video, null, true);
									}, 1000);
								}
							});
							//有媒体
							flvPlayer.on(flvjs.Events.MEDIA_INFO, function(){
								playFlag = true;
								clearTimeout(timer);
								$loading.hide();
								$vd.siblings("div").remove();
								if (options.onLoadSuccess){
									options.onLoadSuccess($video[i]);
								}
							});
							// $video[i].volume = 0;
							//触发盒子的点击事件
							$video.eq(i).parent().parent().click();
						}
					}
					if (options.onLoad){
						options.onLoad($video[i]);
					}
					break;
				}
			}
			//如果所有的video都在使用，则先清除最早的video,再添加
			if (!empty){
				var time = new Date().getTime();
				var $video = $target.find("video");
				var video = null;
				for (var i = 0; i < $video.length; i++){
					if ($video.eq(i).attr("data-time") < time){
						video = $video[i];
						time = $video.eq(i).attr("data-time");
					}
				}
				if (video){
					that.clearVideo(target, video);
					// setTimeout(function(){
						that.addVideo(target, param);
					// }, 10);
				}
			}
			that.setTimeout(target);
		}else {
			var player = document.getElementById("RTMPPlayer");
			try{
				player.open(param.url, param.title, param.param);
			}catch(err){
				console.log(err);
			}
		}
	},
	//关闭视频
	closeVideo: function(video, callback){
		if ($(playerTarget).data("player").options.playType == "html5") {
			var $video = $(video);
			if ($video.attr("data-video")){
				video.pause();
				if ($video.data("video") && $video.data("video").hls){
					$video.data("video").hls.destroy();
					$video.data("video").connectCount = 0;
				}else if ($video.data("video") && $video.data("video").flv && $video.attr("src")){
					var player = $video.data("video").flv;
					$video.data("video").connectCount = 0;
					player.pause();
					player.unload();
					player.detachMediaElement();
					player.destroy();
					$video.data("video").flv = null;
				}
				$video.siblings("div").remove();
				$video.next("img").hide();
				if (callback){
					var param = $video.data("video").param;
					param = param ? JSON.parse(param) : param;
					param.channel = $video.parent().parent().index() + 1;
					callback(video, param);
				}
				lavaPlayer.clearTimeout(playerTarget);
			}
		} else {
			try {
				$("#RTMPPlayer")[0].stop(video);
			} catch (err) {
				console.log(err);
			}
		}
	},
	//关闭所有视频
	closeAll: function(target){
		var that = this;
		var $video = $(target).find("video");
		var options = $(target).data("player").options;
		if (options.playType == "html5"){
			$.each($video, function(index, ele){
				that.closeVideo(this, options.onClose);
			});
		}else {
			var flash = $("#RTMPPlayer")[0];
			flash.closeAll();
		}
	},
	//打开视频
	/**
	 * 打开视频
	 * @video DOM
	 * @callback 回调
	 * @reconnect 是否是重连 true / false
	 */
	openVideo: function(video, callback, reconnect){
		var that = this;
		var $video = $(video);
		if ($video.data("video") && $video.data("video").flv && !reconnect){
			return;
		}
		if ($video.attr("data-video")){
			var $loading = $(video).next("img");
			var data = $video.data("video");
			var url = data.url;
			var type = data.stream;
			var player = data.flv;
			var param = data.param;
			var connectCount = data.connectCount;
			var flvPlayer = flvjs.createPlayer({
				isLive: true,
				type: 'flv',
				url: url
			}, {enableStashBuffer: true});
			
			$loading.show();
			$video.removeData("video");
			flvPlayer.attachMediaElement(video);
			flvPlayer.load();
			flvPlayer.play();
			//加载出错
			var playFlag = false;
			flvPlayer.on(flvjs.Events.ERROR, function(err, errDetail){
				var count = $video.data("video").connectCount;
				if (!playFlag && count > 6){
					$loading.hide();
					$video.parent().append("<div style='position:absolute;top:45%;left:50%;margin-left:-32px;color:#fff;'>Disconnect</div>");
				} else if (!playFlag && count <= 6) {
					setTimeout(function() {
						that.openVideo(video, callback, true);
						$video.data("video").connectCount = count + 1;
					}, 4000);
				} else if (playFlag && err == "NetworkError") {
					flvPlayer.unload();
					setTimeout(function() {
						flvPlayer.load();
						flvPlayer.play();
					}, 4000);
				} else if (playFlag && err == "MediaError") {
					flvPlayer.pause();
					flvPlayer.unload();
					flvPlayer.detachMediaElement();
					flvPlayer.destroy();
					flvPlayer = null;
					setTimeout(function(){
						that.openVideo(video, null, true);
					}, 1000);
				}
			});
			//有媒体
			flvPlayer.on(flvjs.Events.MEDIA_INFO, function(){
				playFlag = true;
				$loading.hide();
				$video.siblings("div").remove();
			});
			$video.data("video", {url: url, flv: flvPlayer, stream: type, param: param, connectCount: connectCount});
			if (!$video.is(":visible") && !reconnect){
				//触发盒子的点击事件
				$video.parent().parent().click();
				that.toLayout(playerTarget, $(playerTarget).data("player").options.layoutNum);
			}
			if (callback){
				var param = $video.data("video").param;
				param = param ? JSON.parse(param) : param;
				callback(video, param);
			}
			if (!reconnect) {
				that.setTimeout(playerTarget);
			}
		}
	},
	//打开所有视频
	openAll: function(target){
		var that = this;
		var $target = $(target);
		var $video = $target.find("video");
		var options = $target.data("player").options;
		$.each($video, function(index, ele){
			that.openVideo(this, options.onOpen);
		});
	},
	//暂停单个视频
	pause: function(target, index){
		var $target = $(target);
		var options = $target.data("player").options;
		if (options.playType == "html5"){
			var $video = $(that.el).find("video");
			var hls = $video.eq(index-1).data("video").hls;
			if (hls){
				hls.detachMedia();
				hls.destroy();
			}
		}else {
			/*var flash = $("#RTMPPlayer")[0];
			flash.pause(index);*/
		}
	},
	//暂停所有视频
	pauseAll: function(target){
		var $target = $(target);
		var options = $target.data("player").options;
		if (options.playType == "html5"){
			var $video = $target.find("video");
			for (var i = 0; i < $video.length; i++){
				if ($video.eq(i).attr("src")){
					$video[i].pause();
				}
			}
		}else {
			var flash = $("#RTMPPlayer")[0];
			try{
				flash.pauseAll();
			}catch(err){
				console.log(err);
			}
		}
	},
	//播放所有视频
	playAll: function(target){
		var that = this;
		var $target = $(target);
		var options = $target.data("player").options;
		if (options.playType == "html5"){
			var $video = $target.find("video");
			for (var i = 0; i < $video.length; i++){
				if ($video.eq(i).attr("src")){
					$video[i].play();
				}
			}
		}else {
			var flash = $("#RTMPPlayer")[0];
			flash.playAll();
		}
	},
	/**
	 * 清除视频
	 * @video video DOM
	 */
	clearVideo: function(target, video){
		var that = this;
		var $video = $(video);
		var options = $(target).data("player").options;
		if ($video.attr("data-video")){
			if (options.onBeforeClear) {
				options.onBeforeClear(video);
			}
			$video.removeAttr("data-video").removeAttr("data-port").removeAttr("data-channel").removeAttr("data-time");
			$video.parent().prev().children().eq(1).remove(); //移除标题
			video.pause();
			if ($video.data("video") && $video.data("video").hls){
				var hls = $video.data("video").hls;
				hls.detachMedia();
				hls.destroy();
				$video.data("video").connectCount = 0;
			}else if ($video.data("video") && $video.data("video").flv){
				var player = $video.data("video").flv;
				// player.pause();
				player.unload();
				player.detachMediaElement();
				player.destroy();
				$video.data("video").flv = null;
				$video.data("video").connectCount = 0;
			}
			$video.next("img").hide();
			$video.siblings("div").remove();
			if (options.onClear) {
				var param = $video.data("video").param;
				param = param ? JSON.parse(param) : param;
				options.onClear($video.parent().prev().children().eq(1).text(), param);
			}
			if ($video.data("video")) {
				$video.removeData("video");
			}
			that.clearTimeout(playerTarget);
		}
	},
	//清除所有视频
	clearAll: function(target){
		var that = this;
		var options = $(target).data("player").options;
		if (options.playType == "html5"){
			var $video = $(target).find("video");
			$.each($video, function(index, ele){
				that.clearVideo(target, this);
			});
		}else {
			var flash = $("#RTMPPlayer")[0];
			try{
				flash.clearAll();
			}catch(err){
				console.log(err);
			}
		}
	},
	//重新布局
	toLayout: function(target, num){
		var options = $(target).data("player").options;
		if (num == 1){
			num = 1;
		}else if (num <= 2){
			num = 2;
		}else if (num <= 3){
			num = 3;
		}else if (num <= 4){
			num = 4;
		}else if (num <= 6){
			num = 6;
		}else if (num <= 9){
			num = 9;
		}else if (num <= 10){
			num = 10;
		}else if (num <= 12){
			num = 12;
		}else if (num <= 16){
			num = 16;
		}else if (num <= 25){
			num = 25;
		}else if (num <= 36){
			num = 36;
		}else {
			num = 64;
		}
		options.layoutNum = num;
		if (options.playType == "html5"){
			$(target).data("player").container.lavaVideoLayout("to", num);
		} else {
			var player = $("#RTMPPlayer")[0];
			player.to(num);
		}
	},
	//截图
	capture: function(video){
		if ($(video).attr("data-video") && $(video).is(":visible")){
			if ($(".lp-div-capture").length == 0){
				var $div = $("<div class='lp-div-capture'><canvas style='display:none;'></canvas><img style='max-height:400px;max-width:500px;' /></div>").appendTo("body");
				var $close = $("<div class='lp-close'><i class='fa fa-remove'></i></div>").appendTo($div);
				$close.on("click", function(e){
					$div.hide();
				});
			}
			var $div = $(".lp-div-capture").show();
			var canvas = $div.find("canvas")[0];
			var context = canvas.getContext("2d");
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			if (!canvas.width){
				$div.hide();
				return;
			}
			context.drawImage(video, 0, 0, canvas.width, canvas.height);
			var url = canvas.toDataURL();
			$div.find("img").prop("src", url);
			$div.css({marginLeft: - 600, marginTop: - 250});
		}
	},
	//关闭/开启声音
	voiceToggle: function(target, flag){
		var that = this;
		var $target = $(target);
		$target.data("player").options.voice = flag;
		if (!flag){
			that.openVoice(target);
		} else {
			var index = $target.data("player").$container.lavaVideoLayout("getSelectedIndex");
			that.openVoice(target, index);
		}
	},
	//打开单通道的声音
	openVoice: function(target, index){
		var $target = $(target);
		var options = $target.data("player").options;
		var $video = $target.find("video");
		for (var i = 0; i < $video.length; i++){
			$video[i].volume = 0;
		}
		if (options.voice){
			if (index){
				$video[index - 1].volume = 1;
			}
		}
	},
	/**
	 * 码流切换
	 * @video DOM对象
	 * @type 码流类型 0-主码流 1-子码流
	 */
	toggleStream: function(video, type){
		var that = this;
		var $video = $(video);
		if ($video.attr("data-video")){
			var $loading = $(video).next("img");
			var data = $video.data("video");
			var $title = $video.parent().prev().children(".lava-videotitle");
			var title = $title.text();
			if (type == 1 && data.stream == 0){
				var url = data.url.replace("&st=0&", "&st=1&");
				$title.text(title.replace(/\[m\]$/, "[s]"));
			}else if (type == 0 && data.stream == 1) {
				var url = data.url.replace("&st=1&", "&st=0&");
				$title.text(title.replace(/\[s\]$/, "[m]"));
			}else {
				return;
			}
			
			var flvPlayer = flvjs.createPlayer({
				type: 'flv',
				url: url,
				isLive: true
			}, {enableStashBuffer: true});
			$loading.show();
			var param = data.param;
			var player = data.flv;
			player.pause();
			player.unload();
			player.detachMediaElement();
			player.destroy();
			$video.removeData("video");
			flvPlayer.attachMediaElement(video);
			flvPlayer.load();
			flvPlayer.play();
			//加载出错
			flvPlayer.on(flvjs.Events.ERROR, function(err, errDetail){
				$loading.hide();
				if (err == "MediaError"){
					that.closeVideo(video);
					setTimeout(function(){
						that.openVideo(video);
					}, 1000);
				} else if (err == "NetworkError") {
					flvPlayer.unload();
					setTimeout(function() {
						flvPlayer.load();
						flvPlayer.play();
					}, 4000);
				}
			});
			//有媒体
			flvPlayer.on(flvjs.Events.MEDIA_INFO, function(){
				$loading.hide();
			});
			$video.data("video", {url: url, flv: flvPlayer, stream: type, param: param});
			// console.log($video.data("video").flv);
			// $video.data("video").flv.changestream(type);
		}
	},
	/**
	 * 获取单通道已播放时长
	 * @channel 通道号
	 * @return time 秒
	 */
	getSeek: function(target, channel){
		var $target = $(target);
		var options = $target.data("player").options;
		if (options.playType == "html5"){
			var time = $target.find("video")[channel - 1].currentTime;
		}else {
			var time = $("#RTMPPlayer")[0].getSeek(channel);
		}
		return time;
	},
	/**
	 * 改变通道url
	 * @obj
	 */
	setUrl: function(target, obj){
		var flash = $("#RTMPPlayer")[0];
		try{
			flash.setUrl(obj.url, obj.channel);
		}catch(err){
			console.log(err);
		}
	},
	//设置延时，关闭视频
	setTimeout: function(target){
		var that = this;
		var $target = $(target);
		var options = $target.data("player").options;
		if (options.noRemind || options.type == "hls"){
			return;
		}
		var lang = options.langObj;
		var time = options.timeout ? options.timeout : 60;
		var $progress = $target.find(".lp-progressdiv");
		var context = $target.find(".lp-progressdiv>canvas")[0].getContext("2d");
		var color = "#080";
		$progress.show();
		context.fillStyle = color;
		context.strokeStyle = "#188be5";
		context.lineWidth = 1;
		if ($target.data("player").timer){
			clearInterval($target.data("player").timer);
		}
		$target.data("player").timer = setInterval(function(){
			if (time <= 10){
				context.fillStyle = "#a00";
			}else {
				context.fillStyle = "#080";
			}
			try {
				context.strokeRect(0, 0, 120, 21);
				context.fillRect(1, 1, 118,19)
				context.fillStyle = "#1b1918";
				context.fillRect(1, 1, parseInt((options.timeout-time)/options.timeout * 118), 19);
				context.font = "13px arial";
				context.fillStyle = "#fff";
				context.fillText(lang.closeVideoPrompt.replace("{0}", time), 5, 15);
			} catch (err) {
				
			}
			time --;
			if (time == -1){
				clearInterval($target.data("player").timer);
				$progress.hide();
				that.closeAll(target);
			}
		}, 1000);
	},
	//清除延时
	clearTimeout: function(target, clear){
		var $target = $(target);
		var options = $target.data("player").options;
		var $video = $target.find("video");
		var allClose = true;
		for (i = 0; i < $video.length; i++){
			if ($video.eq(i).attr("src")){
				allClose = false;
				break;
			}
		}
		if (allClose || clear){
			if ($target.data("player").timer){
				clearInterval($target.data("player").timer);
				$target.find(".lp-progressdiv").hide();
			}
		}
	},
	/**
	 * 设置音量大小
	 * @volume 0-1
	 */
	volumeToggle: function(target, volume){
		var $target = $(target);
		var options = $target.data("player").options;
		if (options.playType == "flash"){
			var flash = $("#RTMPPlayer")[0];
			volume = volume.toString();
			try{
				flash.volume(volume);

			} catch (err) {
				console.log(err);
			}
		}else {
			var $video = $target.find("video");
			for (i in $video){
				$video[i].volume = volume;
			}
		}
	},
	//设置选中框的索引
	setSelectedIndex: function(target, index){
		$(target).data("player").container.lavaVideoLayout("setSelectedIndex", index);
	},
	resize: function(target, index) {
		if ($(target).data("player").options.playType == "html5"){
			$(target).data("player").container.lavaVideoLayout("resize");
		}
	},
	/**
	 * 获取单通道图像数据
	 * @index 0开始
	 */
	getImageData: function(target, index) {
		var $target = $(target);
		var video = $target.find("video")[index];
		var canvas = document.createElement("canvas");
		var context = canvas.getContext("2d");
		context.drawImage($(target).find("video")[index], 0, 0, video.videoWidth, video.videoHeight);
		return context.toDataURL();
	}
};
$.fn.lavaPlayer = function(options, param){
	if (typeof options == "string"){
		return $.fn.lavaPlayer.methods[options](this, param);
	}else {
		playerTarget = this;
		$.each(this, function(index, value){
			var op = {};
			$.extend(op, $.fn.lavaPlayer.defaults);
			$.extend(op, options);
			$(this).data("player", {options: op});
			lavaPlayer.init(this);
		});
	}
};
$.fn.lavaPlayer.defaults = {
	lang: "zh-CN", //语言版本
	langObj: {
		openVideo: "open video",
		openAllVideo: "open all video",
		closeVideo: "close video",
		closeAllVideo: "close all video",
		clearVideo: "clear video",
		clearAllVideo: "clear all video",
		ignore: "ignore",
		noRemind: "no remind",
		mainStream: "main stream",
		subStream: "sub stream",
		closeVideoPrompt: "{0}s close video",
		noFlash: "The Flash Player has not been installed or is disabled.",
		noInstallFlash: "If you has not installed the Flash Player.",
		installedFlash: "If you installed the Flash Player.",
		clickHere: "Click here.",
		iePrompt: "Settings > Safty > Turn off ActiveX filtering.",
		firefoxPrompt: "Addons > Plugins > Turn on Shockwave Flash.",
		chromePrompt: "Open new window tab > Type \"chrome://plugins\" > Turn on Adobe Flash Player.",
		operaPrompt: "Open new window tab > Type \"opera://plugins\" > Turn on Adobe Flash Player.",
		edgePrompt: "Setting > Advanced setting > Turn on Adobe Flash Player."
    },//语言包
	type: "flv", //flv或者hls
	playType:"", //flash,html5,如果指定了，则不会判断浏览器是否支持flash
	swf: "/third-resource/lava-player/LavaPlayer.swf", //LavaPlayer.swf 的路径
	installSwf: "/third-resource/lava-player/expressinstall.swf",
	hls:"/third-resource/hls/hls0.5.41.js", 
	// hls:"/third-resource/hls/hls.min.js", 
	flv: "/third-resource/flv/flv20170504.min.js",
	swfObject:"/third-resource/lava-player/js/swfobject.js", //swfobject.js
	layoutUrl:"/third-resource/lava/jquery.lava-videolayout.js", //layout插件
	loadingImg: "/images/loading_video.gif", //加载动画
	layout:true, //是否需要布局
	streamToggle: false, //是否支持主子码流切换
	fullScreen: false,
	voice: true,
	layoutNum: 4, //默认窗口个数
	maxLayout: 16,
	contextMenu: true, //是否启用右键菜单
	timeout: 60, //自动关闭视频延时,
	//事件
	onBeforeClear: null, //单个视频被清除前触发(video)
	onClear: null, //单个视频被清除时触发
	onClose: null, //单个视频关闭时触发(video)
	onOpen: null, //单个视频打开时触发(video)
	onLoad: null, //单个视频添加时触发(video)
	onLoading: null, //视频加载时触发，用于flash (obj)
	onLoaded: null, //视频加载完成时触发，用于flash (obj)
	onLoadSuccess: null, //单个视频加载成功时触发(video)
	onBeforeRemove: null, //移除 
	onReady: null //播放器初始化完成
};
$.fn.lavaPlayer.methods = {
	addVideo: function(target, param){
		lavaPlayer.addVideo(target, param);
	},
	options: function(target){
		return $(target).data("player").options;
	},
	clearAll: function(target){
		lavaPlayer.clearAll(target);
	},
	close: function(target, param) {
		if ($(target).data("player").options.playType == "html5"){
			
		}else {
			$("#RTMPPlayer")[0].close(param);
		}
	},
	closeAll: function(target){
		lavaPlayer.closeAll(target);
	},
	open: function(target, param){
		if ($(target).data("player").options.playType == "html5"){
			lavaPlayer.setTimeout(target);
			lavaPlayer.openVideo($(target).find("video")[param - 1], $(target).data("player").options.onOpen);
		}else {
			$("#RTMPPlayer")[0].play(param.toString());
		}
	},
	resize: function(target){
		lavaPlayer.resize(target);
	},
	toLayout: function(target, param){
		lavaPlayer.toLayout(target, param);
	},
	playAll: function(target, param){
		lavaPlayer.playAll(target);
	},
	pause: function(target, param){
		lavaPlayer.pause(target, param);
	},
	pauseAll: function(target){
		lavaPlayer.pauseAll(target);
	},
	//获取单通道已播放时长
	getSeek: function(target, param){
		return lavaPlayer.getSeek(target, param);
	},
	setUrl: function(target, param){
		lavaPlayer.setUrl(target, param);
	},
	volumeToggle: function(target, param){
		lavaPlayer.volumeToggle(target, param);
	},
	setSelectedIndex: function(target, param){
		if ($(target).data("player").options.playType == "html5"){
			$(target).data("player").container.lavaVideoLayout("setSelectedIndex", param);
		}
	},
	fullScreen: function(target){
		lavaPlayer.fullScreen($(target)[0]);
	}
};

var playerTarget;
/**
 * flash回调
 * @eventName 事件名称
 * @title 通道标题
 * @param js传给flash的参数
 * @index 通道标号 from 1
 */
function swfCallBack(eventName, title, param, index){
	var options = $(playerTarget).data("player").options;
	if (param) {
		param = JSON.parse(param);
	}
	switch(eventName){
		case "loading" : 
			if (options.onLoading){
				options.onLoading(param);
			}
			break;
		case "loaded":
			if (options.onLoaded){
				options.onLoaded(param);
			}
			break;
		case "clearVideo":
			if (options.onClear){
				options.onClear(title, param);
			}
			break;
		case "closeVideo":
			if (options.onClose){
				param.channel = index;
				options.onClose(title, param);
			}
			break;
		case "playVideo":
			if (options.onOpen){
				options.onOpen(title, param);
			}
			break;
		default: break;
	}
}