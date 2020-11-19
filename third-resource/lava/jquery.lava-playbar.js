var lavaPlayBar = {
	//初始化dom节点-
	init:function(target){
		var that = this;
		var $target = $(target);
		var options = $target.data("playbar").options;
		$target.addClass("lava-playbar");
		var $head = $("<div class='lava-playbar-head' style='background:"+options.headerBgColor+";border-bottom:1px solid "+options.headerColor+";'></div>").appendTo($target);
		var $btns = $("<div class='lava-playbar-btns'></div>").appendTo($head);
		var $zoomOut = $("<canvas class='lava-playbar-zoomout' width='50' height='40'></canvas>").appendTo($btns);
		var $zoomIn = $("<canvas class='lava-playbar-zoomin' width='50' height='40'></canvas>").appendTo($btns);
		var $time = $("<div class='lava-playbar-time'></div>").appendTo($head);
		var $timeWrapper = $("<div class='lava-playbar-timewrapper'></div>").appendTo($time);
		var $timeCanvas = $("<canvas width='1000' height='40'></canvas>").appendTo($timeWrapper);
		$target.data("playbar").timeCanvas = $timeCanvas;
		var $body = $("<div class='lava-playbar-body' style='background:"+options.bgColor+";'></div>").appendTo($target);
		var $channelWrapper = $("<div class='lava-playbar-channelwrapper' stylel='background:"+options.channelWrapperBgColor+";'></div>").appendTo($body);
		var $dataWrapper = $("<div class='lava-playbar-datawrapper'></div>").appendTo($body);
		var $channels = $("<div class='lava-playbar-channels'><div>").appendTo($channelWrapper);
		var $lineNames = $("<div class='lava-playbar-linenames' style='background:"+options.channelBgColor+";'></div>").appendTo($channelWrapper);
		$target.data("playbar").lineNames = $lineNames;
		var $lines = $("<div class='lava-playbar-lines'></div>").appendTo($dataWrapper);
		var $lineCanvas = $("<canvas></canvas>").appendTo($lines);
		$target.data("playbar").lineCanvas = $lineCanvas;
		var $data = $("<div class='lava-playbar-data'></div>").appendTo($dataWrapper);
		var $dataCanvas = $("<canvas></canvas>").appendTo($data);
		var $rightRollBar = $("<div class='lava-playbar-rightrollbar' style='background:"+options.rollbarWrapperColor+";'><div>").appendTo($body);
		var $up = $("<div class='lava-playbar-up'></div>").appendTo($rightRollBar);
		var $down = $("<div class='lava-playbar-down'></div>").appendTo($rightRollBar);
		var $rightBar = $("<div class='lava-playbar-rightbar' style='background:"+options.rollbarColor+";'></div>").appendTo($rightRollBar);
		$dataCanvas[0].width = $time.width();
		$target.data("playbar").dataCanvas = $dataCanvas;
		var $bottomRollBar = $("<div class='lava-playbar-bottomrollbar' style='background:"+options.rollbarWrapperColor+";'></div>").appendTo($target);
		var $prev = $("<div class='lava-playbar-bottomprev'></div>").appendTo($bottomRollBar);
		var $next = $("<div class='lava-playbar-bottomnext'></div>").appendTo($bottomRollBar);
		var $bottomBar = $("<div class='lava-playbar-bottombar' style='background:"+options.rollbarColor+";'></div>").appendTo($bottomRollBar);
		//滚动条三角颜色
		var style = "<style>"+
					".lava-playbar-up:before {border-color:transparent transparent "+options.rollbarAngleColor+" transparent;}\n"+
					".lava-playbar-down:before {border-color:"+options.rollbarAngleColor+" transparent transparent transparent;}\n"+
					".lava-playbar-bottomprev:before {border-color:transparent "+options.rollbarAngleColor+" transparent transparent;}\n"+
					".lava-playbar-bottomnext:before {border-color:transparent transparent transparent "+options.rollbarAngleColor+";}\n"+
					".lava-playbar-bottombar:hover,.lava-playbar-rightbar:hover {background:"+options.rollbarHoverColor+" !important;}\n"+
					"</style>";
		var $style = $(style).appendTo($target);
		$target.data("playbar").style = $style;
		//定位线
		var $line = $("<div class='lava-playbar-line'></div>").appendTo($target);
		$target.data("playbar").line = $line;
		//定位时间标签
		var $timeLabel = $("<div class='lava-playbar-timelabel'></div>").appendTo($target);
		var $timeLabelCanvas = $("<canvas class='lava-playbar-timelabelcanvas' width='50' height='13' style='position:absolute;z-index:1;'></canvas>").appendTo($timeLabel);
		$target.data("playbar").timeLabel = $timeLabel;
		$target.data("playbar").timeLabelCanvas = $timeLabelCanvas;
		//曲线定位点
		var $point = $("<div class='lava-playbar-point'></div>").appendTo($target);
		var $pointCanvas = $("<canvas width='150' height='95' class='lava-playbar-pointcanvas'></canvas>").appendTo($point);
		$target.data("playbar").point = $point;
		$target.data("playbar").pointCanvas = $pointCanvas;
		for (var i=0;i<4;i++){
			$channels.append("<div class='lava-playbar-channel' style='background:"+options.channelBgColor+";color:"+options.channelColor+";'></div>");
		}
		that.drawZoomBtn(target,"zoomout","mouseout");
		that.drawZoomBtn(target,"zoomin","mouseout");
		that.loadTimeLabel(target);
	},
	//绘制放大缩小按钮
	drawZoomBtn:function(target,type,mouseFlag){
		var $target = $(target);
		var options = $target.data("playbar").options;
		var context = $target.find(".lava-playbar-"+type)[0].getContext("2d");
		context.clearRect(0,0,50,40);
		var color = mouseFlag == "mouseout" ? options.btnColor : "#fff";
		if (mouseFlag == "mouseover"){
			context.fillStyle = options.btnColor;
			context.fillRect(8,8,34,24);
		}else{
			context.strokeStyle = options.btnColor;
			context.lineWidth = 1;
			context.strokeRect(8.5,8.5,34,24);
		}
		context.strokeStyle = color;
		context.lineWidth = 1.2;
		context.beginPath();
		context.arc(19,19,7,0,2*Math.PI);
		context.stroke();
		context.fillStyle = color;
		context.fillRect(15,19,8,1);
		if (type == "zoomout") context.fillRect(19,15,1,8);
		context.beginPath();
		context.moveTo(24,23);
		context.lineTo(34,30);
		context.lineWidth = 3;
		context.stroke();
	},
	//加载数据
	loadData:function(target,data){
		var that = this;
		var $target = $(target);
		var options = $target.data("playbar").options;
		if (options.type == "channel"){
			options.data = data;
		}else {
			options.lineData = data;
		}
		var $rightBar = $target.find(".lava-playbar-rightbar");
		var $dataDiv = $target.find(".lava-playbar-data");
		var $channels = $target.find(".lava-playbar-channels");
		$dataDiv.css({top: 0});
		$rightBar.css({top: 15}).hide();
		$channels.css({top: 0});
		if (options.type == "channel"){
			if (data.length > 4){
				$rightBar.css({height:4 / data.length * 65}).show();
				//for IE
				setTimeout(function(){
					$rightBar.hide();
					setTimeout(function(){
						$rightBar.show();
					}, 100);
				}, 100);
			}
			that.loadChannelNum(target);
			that.loadChannelData(target);
		}else if (options.type == "line"){
			that.loadLineType(target);
			that.loadLineData(target);
		}
	},
	//改变类型
	changeType:function(target,type){
		var that = this;
		var $target = $(target);
		var $channels = $target.find(".lava-playbar-channels");
		var $data = $target.find(".lava-playbar-data");
		var $lineNames = $target.find(".lava-playbar-linenames");
		var $lines = $target.find(".lava-playbar-lines");
		var $point = $target.data("playbar").point;
		var options = $target.data("playbar").options;
		if (type == options.type){
			return;
		}else if(type == "channel"){
			$channels.show();
			$data.show();
			$lineNames.hide();
			$lines.hide();
			$point.hide();
			options.type = type;
			if (options.data){
				that.loadChannelNum(target);
				that.loadChannelData(target);
			}
		}else if (type == "line"){
			$lineNames.show();
			$lines.show();
			$channels.hide();
			$data.hide();
			$target.find(".lava-playbar-rightbar").hide();
			options.type = type;
			if (options.lineData){
				that.loadLineType(target);
				that.loadLineData(target);
				var left = (options.currentTime-options.startTime)/(24*60*60*1000)*options.zoomLevel*options.timeWidth+100;
				that.loadTimeLabel(target,left);
			}
		}
	},
	//加载折线类型
	loadLineType:function(target){
		var $target = $(target);
		var $lineNames = $target.find(".lava-playbar-linenames");
		var $data = $target.find(".lava-playbar-data");
		var options = $target.data("playbar").options;
		var data = options.lineData;
		$lineNames.empty();
		$data.css({top:0});
		for (var i=0;i<data.length;i++){
			$lineNames.append("<div class='lava-playbar-linename' style='color:"+data[i].color+"'>"+data[i].name+"</div>");
		}
	},
	//加载折线数据
	loadLineData:function(target){
		var $target = $(target);
		var options = $target.data("playbar").options;
		var $lineNames = $target.find(".lava-playbar-linenames");
		var $lineName = $lineNames.children();
		var $lines = $target.find(".lava-playbar-lines");
		var canvas = $target.data("playbar").lineCanvas[0];
		canvas.width = options.timeWidth;
		var context = canvas.getContext("2d");
		context.lineWidth = 1.5;
		var data = options.lineData;
		for (var i=0;i<data.length;i++){
			var disable = false;
			for (var j=0;j<$lineName.length;j++){
				if ($lineName.eq(j).text() == data[i].name && $lineName.eq(j).hasClass("lava-playbar-linename-disable")){
					disable = true;
					break;
				}
			}
			if (disable){
				continue;
			}else{
				var value = data[i].data;
				context.strokeStyle = data[i].color ? data[i].color : "#fff";
				context.lineJoin = "round";
				var lastTime = options.startTime + 24*60*60*1000/options.zoomLevel;
				var startFlag = false;
				var timeSpan = 24*60*60*1000/options.zoomLevel;
				var numSpan = Math.ceil(value.length * 1/options.timeWidth/options.zoomLevel);
				// var numSpan = 1;
				var num = 0;
				/*for (var j=0;j<value.length;j++){
					var time = value[j].time;
					if (j == 0 && time >= options.startTime || time<=options.startTime && value[j+1] && value[j+1].time>options.startTime){
						context.beginPath();
						context.moveTo((time - options.startTime)/timeSpan*options.timeWidth,95 - 95*(value[j].value/120));
						startFlag = true;
					}else if (time >= options.startTime && time <= lastTime || time > lastTime && value[j-1] && value[j-1].time<lastTime){
						context.lineTo(parseInt((time - options.startTime)/timeSpan*options.timeWidth)+0.5,95 - 95*(value[j].value/120));
					}
					if (startFlag && (time >= lastTime && value[j-1] && value[j-1].time<lastTime || j==value.length-1)){
						context.stroke();
						break;
					}
				}*/
				for (var j=0;j<value.length;j++){
					var time = value[j].time;
					if (j == 0 && time >= options.startTime || time<=options.startTime && value[j+1] && value[j+1].time>options.startTime){
						context.beginPath();
						options.time = time;
						context.moveTo((time - options.startTime)/timeSpan*options.timeWidth,95 - 95*(value[j].value/120));
						startFlag = true;
					}else if (time >= options.startTime && time <= lastTime || time > lastTime && value[j-1] && value[j-1].time<lastTime){
						// if (num %numSpan == 0){
							context.lineTo(parseInt((time - options.startTime)/timeSpan*options.timeWidth)+0.5,95 - 95*(value[j].value/120));
						// }
						// num++;
					}
					if (startFlag && (time >= lastTime && value[j-1] && value[j-1].time<lastTime || j==value.length-1)){
						context.stroke();
						break;
					}
				}
			}
		}
	},
	//加载通道号
	loadChannelNum:function(target){
		var $target = $(target);
		var options = $target.data("playbar").options;
		var data = options.data;
		var $channels = $target.find(".lava-playbar-channels");
		$channels.empty();
		for (var i=0;i<data.length;i++){
			$channels.append("<div class='lava-playbar-channel' style='background:"+options.channelBgColor+";color:"+options.channelColor+";'>"+data[i].name+"</div>");
		}
		if (data.length < 4){
			for (var i=0;i<4-data.length;i++){
				$channels.append("<div class='lava-playbar-channel' style='background:"+options.channelBgColor+";color:"+options.channelColor+";'></div>");
			}
		}
	},
	//绘制通道数据
	loadChannelData:function(target){
		var $target = $(target);
		var options = $target.data("playbar").options;
		var data = options.data;
		var timeWidth = options.timeWidth;
		var lastTime = options.startTime + 24*60*60*1000 / options.zoomLevel;//可视区域的最后时间
		var dataCanvas = $target.data("playbar").dataCanvas[0];
		var context = dataCanvas.getContext("2d");
		if (!data) return;
		//重定义canvas高
		dataCanvas.height = data.length * 24;
		for (var i=0;i<data.length;i++){//通道数
			var channel = data[i].channel;
			
			context.clearRect(0, i*24+4,timeWidth,14);
			for (var j = 0;j<channel.length;j++){//视频段数
				// context.fillStyle = channel[j].type == "normal" ? "#0e8" : "#e70";
				context.fillStyle = channel[j].type == "normal" ? options.normalColor : options.alarmColor;
				if (channel[j].startTime <= options.startTime && channel[j].endTime > options.startTime && channel[j].endTime <= lastTime){
					context.fillRect(0, i*24+6,(channel[j].endTime - options.startTime)/(24*60*60*1000)*options.zoomLevel*timeWidth,12);
				}else if (channel[j].startTime >= options.startTime && channel[j].endTime <= lastTime){
					context.fillRect((channel[j].startTime - options.startTime)/(24*60*60*1000)*options.zoomLevel*timeWidth, i*24+6,(channel[j].endTime - channel[j].startTime)/(24*60*60*1000)*options.zoomLevel*timeWidth,12);
				}else if (channel[j].startTime >= options.startTime && channel[j].endTime > lastTime){
					context.fillRect((channel[j].startTime - options.startTime)/(24*60*60*1000)*options.zoomLevel*timeWidth, i*24+6,(lastTime - options.startTime)/(24*60*60*1000)*options.zoomLevel*timeWidth,12);
				}else if (channel[j].startTime < options.startTime && channel[j].endTime > lastTime){
					context.fillRect(0,i*24 + 6, timeWidth, 12);
				}else if (channel[j].endTime < options.startTime && channel[j].startTime > lastTime){
					break;
				}
			}
			context.fillStyle = "#eee";
			context.fillRect(0,i*24+24,timeWidth,1);
		}
	},
	//绘制时间轴,canvas标签宽度限制20000,每次缩放和拖动就重绘
	drawTime:function($target){
		var that = this;
		var options = $target.data("playbar").options;
		var $time = $target.find(".lava-playbar-time");
		var $timeWrapper = $target.find(".lava-playbar-timewrapper");
		var $bottomBar = $target.find(".lava-playbar-bottombar");
		var timeCanvas = $timeWrapper.children("canvas")[0];
		var timeCanvas = $target.data("playbar").timeCanvas[0];
		var width = $time.width();
		options.timeWidth = width;
		$timeWrapper.css({width:width});
		timeCanvas.width = width;
		width = width * options.zoomLevel;
		var spanWidth = 0,spanNum = 0,barWidth=0;
		var timeContext = timeCanvas.getContext("2d");
		width -= 1;//为了显示最后一条刻度线
		if (options.zoomLevel == 1){
			$bottomBar.hide();
		}else{
			$bottomBar.show();
		}
		if (options.zoomLevel == 1){
			spanNum = 24;
			spanWidth = width / 24;
		}else if (/^(2|4)$/.test(options.zoomLevel)){
			spanNum = 24 * 6;
			spanWidth = width / (24*6);
		}else if (options.zoomLevel == 8){
			spanNum = 24 * 30;
			spanWidth = width / (24 * 30);
		}else if (options.zoomLevel == 24){
			spanNum = 24 * 60;
			spanWidth = width / (24 * 60);
		}else if (options.zoomLevel == 48){
			spanNum = 24 * 60 * 2;
			spanWidth = width / (24*120);
		}else if (options.zoomLevel == 48 * 3){
			spanNum = 24 * 60 * 6;
			spanWidth = width / (24 * 120 * 3);
		}else if (options.zoomLevel == 48 * 6){
			spanNum = 24 * 60 * 6;
			spanWidth = width / (24 * 120 * 3);
		}else if (options.zoomLevel == 48 * 6 * 5){
			spanNum = 24 * 60 * 30;
			spanWidth = width / spanNum;
		}
		timeContext.fillStyle = options.headerColor;
		var firstWidth = spanWidth - parseInt(options.startTime) % parseInt(24*60*60*1000 / spanNum) / parseInt(24*60*60*1000 / spanNum) * spanWidth;
		firstWidth = firstWidth == spanWidth ? 0 :firstWidth;
		var firstTime = parseInt(24*60*60*1000 / spanNum) - parseInt(options.startTime) % parseInt(24*60*60*1000 / spanNum);
		firstTime = firstTime == 24*60*60*1000 / spanNum ? 0 : firstTime;
		//可见部分最大分段90
		for (var i=0;i<=90;i++){
			var x = parseInt(firstWidth + i*spanWidth);
			timeContext.fillRect(x,30,1,10);
			if (options.zoomLevel == 1 && i%2 == 0 && i>0){
				timeContext.fillText(that.round(i)+":00",i == 24 ? x-28 : x-14,28);
			}else if (options.zoomLevel == 2 && parseInt((i*10*60*1000 + options.startTime + firstTime)/(10*60*1000))%6==0){
				var time = that.getTime(i*10*60*1000 + options.startTime + firstTime);
				timeContext.fillText(time,time == "24:00"?x-28:x-14,28);
			}else if (options.zoomLevel == 4 && parseInt((i*10*60*1000 + options.startTime + firstTime)/(10*60*1000))%6==0){
				var time = that.getTime(i*10*60*1000 + options.startTime + firstTime);
				timeContext.fillText(time,time=="24:00"?x-28:x-14,28);
			}else if (options.zoomLevel == 8 && parseInt((i*2*60*1000 + options.startTime + firstTime)/(2*60*1000))%10==0){
				var time = that.getTime(i*2*60*1000 + options.startTime + firstTime);
				timeContext.fillText(time,time=="24:00"?x-28:x-14,28);
			}else if (options.zoomLevel == 24 && parseInt((i*60*1000 + options.startTime + firstTime)/(60*1000))%6==0){
				var time = that.getTime(i*60*1000 + options.startTime + firstTime);
				timeContext.fillText(time,time=="24:00"?x-28:x-14,28);
			}else if (options.zoomLevel == 48 && parseInt((i*30*1000 + options.startTime + firstTime)/(30*1000))%6==0){
				var time = that.getTime(i*30*1000 + options.startTime + firstTime);
				timeContext.fillText(time,time=="24:00"?x-28:x-14,28);
			}else if (options.zoomLevel == 144 && parseInt((i*10*1000 + options.startTime + firstTime)/(10*1000))%6==0){
				var time = that.getTime(i*10*1000 + options.startTime + firstTime);
				timeContext.fillText(time,time=="24:00"?x-28:x-14,28);
			}else if (options.zoomLevel == 288 && parseInt((i*10*1000 + options.startTime + firstTime)/(10*1000))%6==0){
				var time = that.getTime(i*10*1000 + options.startTime + firstTime);
				timeContext.fillText(time,time=="24:00"?x-28:x-14,28);
			}else if (options.zoomLevel == 48*30){
				if (parseInt((i*2*1000 + options.startTime + firstTime)/(2*1000))%30==0){
					var time = that.getTime(i*2*1000 + options.startTime + firstTime);
					timeContext.fillText(time,time=="24:00"?x-28:x-14,28);
				}else {
					timeContext.fillText(that.getSeconds(i*2*1000 + options.startTime + firstTime),x,30);
				}
			}
		}
		that.drawBottomRollBar($target[0]);
	},
	//绘制时间定位线和标签,定位点
	loadTimeLabel:function(target,left,bottomFlag){
		var that = this;
		var $target = $(target);
		var options = $target.data("playbar").options;
		var $line = $target.data("playbar").line;
		var $timeLabel = $target.data("playbar").timeLabel;
		var canvas = $target.data("playbar").timeLabelCanvas[0];
		var context = canvas.getContext("2d");
		var $point = $target.data("playbar").point;
		var pointCanvas = $target.data("playbar").pointCanvas[0];
		var pointContext = pointCanvas.getContext("2d");
		var $lineName = $target.data("playbar").lineNames.children();
		context.clearRect(0,0,50,14);
		context.fillStyle = "#555";
		pointContext.clearRect(0,0,150,95);
		if (!left){
			context.fillText("00:00:00",2,9);
		}else {
			if (!bottomFlag){
				$line.show();
				$timeLabel.show();
				if (options.type == "line") $point.show();
			}
			if (left < 100){
				left = 100;
				if (bottomFlag) {
					$line.hide();
					$timeLabel.hide();
					if (options.type == "line") $point.hide();
				}
			}else if (left > 99+options.timeWidth){
				left = 99 + options.timeWidth;
				if (bottomFlag) {
					$line.hide();
					$timeLabel.hide();
					if (options.type == "line") $point.hide();
				}
			}else if (bottomFlag){
				$line.show();
				$timeLabel.show();
				if (options.type == "line") $point.show();
			}
			if (left < 125){
				$timeLabel.css({left:100});
			}else if (left > options.timeWidth + 75){
				$timeLabel.css({left:options.timeWidth + 50});
			}else {
				$timeLabel.css({left:left - 25});
			}
			//绘制定位点
			if (options.type == "line" && options.lineData && options.currentTime >= options.startTime && options.currentTime <= options.startTime + 24*60*60*1000/options.zoomLevel){
				var oldY = 20;
				for (var i=0;i<options.lineData.length;i++){
					var disable = false;
					for (var j=0;j<$lineName.length;j++){
						if ($lineName.eq(j).text() == options.lineData[i].name && $lineName.eq(j).hasClass("lava-playbar-linename-disable")){
							disable = true;
							break;
						}
					}
					if (disable) continue;
					var data = options.lineData[i].data;
					var y = null, value=0;
					if (data.length == 0 || options.currentTime < data[0].time || options.currentTime > data[data.length-1].time) continue;
					var result = that.quickSearch(data,options.currentTime);
					y = result.y;
					value = result.value;
					if (y){
						if (left > options.timeWidth - 40){
							var grd = pointContext.createRadialGradient(140,y,2,140,y,12);
							grd.addColorStop(0,options.lineData[i].color);
							grd.addColorStop(1,"rgba(0,0,0,0)");
							pointContext.fillStyle = grd;
							pointContext.fillRect(130,y-10,20,20);
							pointContext.fillStyle = "rgba(0,0,0,0.53)";
							pointContext.fillRect(0,oldY-12,130,16);
							pointContext.fillStyle = "#fff";
							pointContext.font = "11px arial";
							pointContext.fillText(options.lineData[i].name + ": " + value+options.lineData[i].unit,4,oldY);
						}else{
							var grd = pointContext.createRadialGradient(10,y,2,10,y,10);
							grd.addColorStop(0,options.lineData[i].color);
							grd.addColorStop(1,"rgba(85,85,85,0)");
							pointContext.fillStyle = grd;
							pointContext.fillRect(0,y-10,20,20);
							pointContext.fillStyle = "rgba(0,0,0,0.53)";
							pointContext.fillRect(20,oldY-12,130,16);
							pointContext.fillStyle = "#fff";
							pointContext.font = "11px arial";
							pointContext.fillText(options.lineData[i].name + ": " + value+options.lineData[i].unit,24,oldY);
						}
						oldY += 16;
					}
				}
				if (left > options.timeWidth - 40){
					$point.css({left:left-140});
				}else{
					$point.css({left:left-10});
				}
			}
			context.fillText(that.getTime(options.currentTime,true),2,9);
			$line.css({left:left});
		}
	},
	//快速查找
	quickSearch:function(arr,value){
		var that = this;
		if (arr.length == 0) return {y:null,value:0};
		if (arr.length % 2 == 0){
			var index = arr.length / 2 - 1;
		}else if (arr.length % 2 == 1){
			var index = (arr.length - 1) / 2;
		}
		if (arr[index].time == value){
			return {y:95-95*(arr[index].value/120),value:arr[index].value};
		}else if (arr[index].time < value && arr[index+1] && arr[index+1].time > value){
			return {y:95-95*(arr[index].value/120),value:arr[index].value};
		}else if (arr[index].time < value && arr[index+1] && arr[index+1].time <= value){
			return that.quickSearch(arr.slice(index+1),value);
		}else if (arr[index].time > value){
			return that.quickSearch(arr.slice(0,index+1),value);
		}
	},
	//绘制底部滚动条
	drawBottomRollBar:function(target){
		var that = this;
		var $target = $(target);
		var options = $target.data("playbar").options;
		var $time = $target.find(".lava-playbar-time");
		var $bottomBar = $target.find(".lava-playbar-bottombar");
		var barWidth = ($target.width()-30) / options.zoomLevel;
		options.barWidth = barWidth < 50 ? 50 : barWidth;
		var left = ($target.width() - options.barWidth - 30) * options.startTime / (24*60*60*1000 * (1-1/options.zoomLevel))+15;
		$bottomBar.css({width:options.barWidth,left:left});
	},
	//拖动底部滚动条
	dragBottomRollBar:function(target,e){
		var that = this;
		var $target = $(target);
		var $prev = $target.find(".lava-playbar-bottomprev");
		var $bottomRollBar = $target.find(".lava-playbar-bottomrollbar");
		var $bottomBar = $target.find(".lava-playbar-bottombar");
		var $timeWrapper = $target.find(".lava-playbar-timewrapper");
		var options = $target.data("playbar").options;
		var x = e.clientX - options.lengthX - $prev.offset().left;
		if (x < 15) x = 15;
		if (x > $bottomRollBar.width() - 15 - options.barWidth) x = $bottomRollBar.width() - 15 - options.barWidth;
		$bottomBar.css({left:x});
		var useWidth = $bottomRollBar.width() - 30 - options.barWidth;
		options.startTime = parseInt((x - 15) / useWidth * (24*60*60*1000 - 24*60*60*1000/options.zoomLevel));
		that.drawTime($target);
		if (options.type == "channel"){
			that.loadChannelData(target);
		}else if (options.type == "line"){
			that.loadLineData(target);
		}
	},
	//播放
	play:function(target,time){
		var that = this;
		var $target = $(target);
		var options = $target.data("playbar").options;
		options.currentTime = time;
		if (time < options.startTime) {
			options.startTime = time;
			if (options.type == "channel"){
				that.loadChannelData(target);
			} else if (options.type == "line"){
				that.loadLineData(target);
			}
			that.drawTime($target);
		}
		if (time - options.startTime > 24*60*60*1000/options.zoomLevel){
			options.startTime = time - 24*60*60*1000 / options.zoomLevel;
			if (options.type == "channel"){
				that.loadChannelData(target);
			} else if (options.type == "line"){
				that.loadLineData(target);
			}
			that.drawTime($target);
		}
		var left = (time - options.startTime) / (24*60*60*1000/options.zoomLevel) * options.timeWidth + 100;
		that.loadTimeLabel(target,left);
		
	},
	//获取时间，参数毫秒
	getTime:function(value,showSeconds){
		var that = this;
		if (!showSeconds){
			return that.round(parseInt(value/(60*60*1000)))+":"+that.round(parseInt((value % (60*60*1000))/60000));
		}else {
			return that.round(parseInt(value/(60*60*1000)))+":"+that.round(parseInt((value % (60*60*1000))/60000))+":"+that.round(parseInt((value%60000)/1000));
		}
	},
	//获取秒
	getSeconds:function(value){
		var that = this;
		var dateObj = new Date(value);
		return that.round(dateObj.getSeconds());
	},
	//补零
	round:function(value){
		return value < 10 ? "0"+value : value;
	},
	//放大/缩小
	zoomOutOrIn:function(target,type){
		var that = this;
		var $target = $(target);
		var options = $target.data("playbar").options;
		var oldZoom = options.zoomLevel;
			if (type == "zoomout"){
				if (options.zoomLevel == 48*30){
					return;
				}else if (options.zoomLevel == 48*6){
					options.zoomLevel *= 5;
					options.startTime += (options.currentTime - options.startTime) * 0.8;
				}else if (options.zoomLevel == 48 || options.zoomLevel == 8){
					options.zoomLevel *= 3;
					options.startTime += (options.currentTime - options.startTime) * (2/3);
				}else {
					options.zoomLevel *= 2;
					options.startTime += (options.currentTime - options.startTime) * 0.5;
				}
			}else if(type == "zoomin"){//下滚缩小
				if (options.zoomLevel == 1){
					return;
				}else if (options.zoomLevel == 48*30){
					options.zoomLevel = options.zoomLevel / 5;
					options.startTime -= (options.currentTime - options.startTime) * 4;
				}else if (options.zoomLevel == 48*3 || options.zoomLevel == 24){
					options.zoomLevel = options.zoomLevel / 3;
					options.startTime -= (options.currentTime - options.startTime) * 2;
				}else {
					options.zoomLevel = options.zoomLevel / 2;
					options.startTime -= options.currentTime - options.startTime;
				}
			}
			if (options.startTime < 0) {
				options.startTime = 0;
				var left = (options.currentTime-options.startTime) / (24*60*60*1000/options.zoomLevel) * options.timeWidth + 100;
				that.loadTimeLabel(target,left);
			}else if (options.startTime > 24*60*60*1000-24*60*60*1000/options.zoomLevel){
				options.startTime = 24*60*60*1000-24*60*60*1000/options.zoomLevel;
				var left = (options.currentTime-options.startTime) / (24*60*60*1000/options.zoomLevel) * options.timeWidth + 100;
				that.loadTimeLabel(target,left);
			}
			
			that.drawTime($target);
			if (options.type == "channel"){
				that.loadChannelData(target);
			}else if (options.type == "line"){
				that.loadLineData(target);
			}
	},
	//重新调整大小位置
	resize:function(target){
		var that = this;
		var $target = $(target);
		var options = $target.data("playbar").options;
		options.timeWidth = $target.find(".lava-playbar-time").width();
		that.drawTime($target);
		that.drawBottomRollBar(target);
		var left = (options.currentTime - options.startTime) / (24*60*60*1000/options.zoomLevel) * options.timeWidth + 100;
		that.loadTimeLabel(target,left,true);
		var canvas = $target.data("playbar").dataCanvas[0];
		canvas.width = options.timeWidth;
		if (options.type == "channel"){
			that.loadChannelData(target);
		}else if (options.type == "line"){
			that.loadLineData(target);
		}
	},
	//事件绑定
	bindEvent:function(target){
		var that = this;
		var $target = $(target);
		var options = $target.data("playbar").options;
		var $bottomBar = $target.find(".lava-playbar-bottombar");
		var $bottomRollBar = $target.find(".lava-playbar-bottomrollbar");
		var $rightBar = $target.find(".lava-playbar-rightbar");
		var $rightRollBar = $target.find(".lava-playbar-rightrollbar");
		var $channels = $target.find(".lava-playbar-channels");
		var $data = $target.find(".lava-playbar-data");
		$bottomRollBar.on("mousedown",function(e){
			if (!$bottomBar.is(":visible")) return false;
			var left = e.clientX - $(this).offset().left - $bottomBar.width() / 2;
			if (left < 15) left = 15;
			if (left > $(this).width() - $bottomBar.width() - 15) left = $(this).width() - $bottomBar.width() - 15;
			$bottomBar.css({left:left});
			options.bottomDownFlag = true;
			options.lengthX = e.clientX - $bottomBar.offset().left;
			that.dragBottomRollBar(target,e);
			var left1 = (options.currentTime-options.startTime) / (24*60*60*1000/options.zoomLevel) * options.timeWidth + 100;
			that.loadTimeLabel(target,left1,true);
			return false;
		});
		$bottomBar.on("mousedown",function(e){
			options.bottomDownFlag = true;
			options.lengthX = e.clientX - $(this).offset().left;
			return false;
		});
		$rightBar.on("mousedown",function(e){
			options.rightDownFlag = true;
			options.lengthY = e.clientY - $(this).offset().top;
			return false;
		});
		$target.find(".lava-playbar-time, .lava-playbar-datawrapper, .lava-playbar-timelabel, .lava-playbar-pointcanvas").on("click",function(e){
			// options.bodyDownFlag = true;
			var left = e.clientX - $target.offset().left;
			options.currentTime = options.startTime+(left-100)/(options.timeWidth * options.zoomLevel-options.zoomLevel)*(24*60*60*1000);
			// if ((!/chrome/.test(navigator.userAgent.toLowerCase()) || /opr/.test(navigator.userAgent.toLowerCase())) && options.onPosition){
				that.loadTimeLabel(target,left);
				options.onPosition(options.currentTime);
			// }
			return false;
		});
		$("body").on("mousemove mouseup",function(e){
			if (e.type == "mousemove" && options.bottomDownFlag){
				that.dragBottomRollBar(target,e);
				var left = (options.currentTime-options.startTime) / (24*60*60*1000/options.zoomLevel) * options.timeWidth + 100;
				that.loadTimeLabel(target,left,true);
			}else if ( e.type == "mousemove" && options.bodyDownFlag) {
				var left = e.clientX - $target.offset().left;
				options.currentTime = options.startTime+(left-100)/(options.timeWidth * options.zoomLevel-options.zoomLevel)*(24*60*60*1000);
				if (options.currentTime > 24*60*60*1000) options.currentTime = 24*60*60*1000;
				that.loadTimeLabel(target,left);
				//触发时间定位事件
				if (options.onPosition) options.onPosition(options.currentTime);
			}else if (e.type == "mousemove" && options.rightDownFlag){
				var top = e.clientY - $rightRollBar.offset().top - options.lengthY;
				if (top < 15) top = 15;
				if (top > 80 - $rightBar.height()) top = 80 - $rightBar.height();
				$rightBar.css({top:top});
				var top1 = -(top-15)/(65-$rightBar.height())*24*(options.data.length-4);
				$channels.css({top:top1});
				$data.css({top:top1});
			}else if (e.type == "mouseup"){
				options.bottomDownFlag = false;
				options.bodyDownFlag = false;
				options.rightDownFlag = false;
			}
		});
		$target.on("selectstart",function(e){
			return false;
		});
		//鼠标滚轮事件
		//IE,Chrome
		target.addEventListener("mousewheel",function(e){
			if (e.wheelDelta > 0){
				var type = "zoomout";
			}else{
				var type = "zoomin";
			}
			that.zoomOutOrIn(target,type);
			e.preventDefault();  
			e.stopPropagation(); 
			return false;
		});
		//FireFox
		target.addEventListener("DOMMouseScroll",function(e){
			if (e.detail < 0){
				var type = "zoomout";
			}else{
				var type = "zoomin";
			}
			that.zoomOutOrIn(target,type);
			e.preventDefault();  
			e.stopPropagation(); 
			return false;
		});
		$target.find(".lava-playbar-zoomout,.lava-playbar-zoomin").on("mouseover mouseout click",function(e){
			var zoomType = e.target.className.replace("lava-playbar-","");
			if (e.type == "mouseover" || e.type == "mouseout"){
				that.drawZoomBtn(target,zoomType,e.type);
			}else{
				that.zoomOutOrIn(target,zoomType);
			}
		});
		$target.delegate(".lava-playbar-linename","click",function(e){
			$(this).toggleClass("lava-playbar-linename-disable");
			that.loadLineData(target);
			var left = (options.currentTime - options.startTime) / (24*60*60*1000/options.zoomLevel) * options.timeWidth + 100;
			that.loadTimeLabel(target,left);
		});
		window.onresize = function(){
			that.resize(targt);
		};
	}
};
$.fn.lavaPlayBar = function(options, param){
	if (typeof options == "string"){
		return $.fn.lavaPlayBar.methods[options](this,param);
	}else{
		return this.each(function(){
			var op = {};
			$.extend(op,$.fn.lavaPlayBar.defaults);
			$(this).data("playbar",{options:op});
			$.extend($(this).data("playbar").options,options);
			lavaPlayBar.init(this);
			lavaPlayBar.drawTime($(this));
			lavaPlayBar.bindEvent(this);
		});
	}
};
$.fn.lavaPlayBar.defaults = {
	headerColor:"#7ad",
	headerBgColor:"#fff",
	channelBgColor:"#f5f5f5",
	channelColor:"#567",
	bgColor:"#fff",
	channelWrapperBgColor:"#fff",
	btnColor:"#32c5d2",
	rollbarWrapperColor:"#f1f1f1",
	rollbarColor:"#c1c1c1",
	rollbarHoverColor:"#a9a9a9",
	rollbarAngleColor:"#888",
	normalColor:"#36d7b7",
	alarmColor:"#e26a6a",
	zoomLevel:1,
	startTime:0,
	currentTime:0,
	type:"channel",
	time:0,
	//事件
	onPosition:function(time){}
};
$.fn.lavaPlayBar.methods = {
	//加载数据
	loadData:function(target,data){
		return lavaPlayBar.loadData(target,data);
	},
	//改变类型
	changeType:function(target,type){
		return lavaPlayBar.changeType(target,type);
	},
	//定位控制条位置
	play:function(target,time){
		return lavaPlayBar.play(target,time);
	},
	//重新布局
	resize:function(target){
		lavaPlayBar.resize(target);
	},
	//获取配置项
	options: function(target){
		return $(target).data("playbar").options;
	},
	//获取当前类型
	getType: function(target){
		return $(target).data("playbar").options.type;
	},
	getTime: function(target){
		return $(target).data("playbar").options.currentTime;
	}
};