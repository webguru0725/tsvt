var lavaPlayBar={init:function(a){var v=this,c=$(a),h=c.data("playbar").options;c.addClass("lava-playbar");var b=$("<div class='lava-playbar-head' style='background:"+h.headerBgColor+";border-bottom:1px solid "+h.headerColor+";'></div>").appendTo(c),y=$("<div class='lava-playbar-btns'></div>").appendTo(b),T=($("<canvas class='lava-playbar-zoomout' width='50' height='40'></canvas>").appendTo(y),$("<canvas class='lava-playbar-zoomin' width='50' height='40'></canvas>").appendTo(y),$("<div class='lava-playbar-time'></div>").appendTo(b)),g=$("<div class='lava-playbar-timewrapper'></div>").appendTo(T),L=$("<canvas width='1000' height='40'></canvas>").appendTo(g);c.data("playbar").timeCanvas=L;var z=$("<div class='lava-playbar-body' style='background:"+h.bgColor+";'></div>").appendTo(c),w=$("<div class='lava-playbar-channelwrapper' stylel='background:"+h.channelWrapperBgColor+";'></div>").appendTo(z),C=$("<div class='lava-playbar-datawrapper'></div>").appendTo(z),D=$("<div class='lava-playbar-channels'><div>").appendTo(w),W=$("<div class='lava-playbar-linenames' style='background:"+h.channelBgColor+";'></div>").appendTo(w);c.data("playbar").lineNames=W;var B=$("<div class='lava-playbar-lines'></div>").appendTo(C),k=$("<canvas></canvas>").appendTo(B);c.data("playbar").lineCanvas=k;{var S=$("<div class='lava-playbar-data'></div>").appendTo(C),I=$("<canvas></canvas>").appendTo(S),R=$("<div class='lava-playbar-rightrollbar' style='background:"+h.rollbarWrapperColor+";'><div>").appendTo(z);$("<div class='lava-playbar-up'></div>").appendTo(R),$("<div class='lava-playbar-down'></div>").appendTo(R),$("<div class='lava-playbar-rightbar' style='background:"+h.rollbarColor+";'></div>").appendTo(R)}I[0].width=T.width(),c.data("playbar").dataCanvas=I;var P=$("<div class='lava-playbar-bottomrollbar' style='background:"+h.rollbarWrapperColor+";'></div>").appendTo(c),F=($("<div class='lava-playbar-bottomprev'></div>").appendTo(P),$("<div class='lava-playbar-bottomnext'></div>").appendTo(P),$("<div class='lava-playbar-bottombar' style='background:"+h.rollbarColor+";'></div>").appendTo(P),"<style>.lava-playbar-up:before {border-color:transparent transparent "+h.rollbarAngleColor+" transparent;}\n.lava-playbar-down:before {border-color:"+h.rollbarAngleColor+" transparent transparent transparent;}\n.lava-playbar-bottomprev:before {border-color:transparent "+h.rollbarAngleColor+" transparent transparent;}\n.lava-playbar-bottomnext:before {border-color:transparent transparent transparent "+h.rollbarAngleColor+";}\n.lava-playbar-bottombar:hover,.lava-playbar-rightbar:hover {background:"+h.rollbarHoverColor+" !important;}\n</style>"),O=$(F).appendTo(c);c.data("playbar").style=O;var X=$("<div class='lava-playbar-line'></div>").appendTo(c);c.data("playbar").line=X;var N=$("<div class='lava-playbar-timelabel'></div>").appendTo(c),A=$("<canvas class='lava-playbar-timelabelcanvas' width='50' height='13' style='position:absolute;z-index:1;'></canvas>").appendTo(N);c.data("playbar").timeLabel=N,c.data("playbar").timeLabelCanvas=A;var E=$("<div class='lava-playbar-point'></div>").appendTo(c),M=$("<canvas width='150' height='95' class='lava-playbar-pointcanvas'></canvas>").appendTo(E);c.data("playbar").point=E,c.data("playbar").pointCanvas=M;for(var i=0;4>i;i++)D.append("<div class='lava-playbar-channel' style='background:"+h.channelBgColor+";color:"+h.channelColor+";'></div>");v.drawZoomBtn(a,"zoomout","mouseout"),v.drawZoomBtn(a,"zoomin","mouseout"),v.loadTimeLabel(a)},drawZoomBtn:function(a,v,c){var h=$(a),b=h.data("playbar").options,y=h.find(".lava-playbar-"+v)[0].getContext("2d");y.clearRect(0,0,50,40);var T="mouseout"==c?b.btnColor:"#fff";"mouseover"==c?(y.fillStyle=b.btnColor,y.fillRect(8,8,34,24)):(y.strokeStyle=b.btnColor,y.lineWidth=1,y.strokeRect(8.5,8.5,34,24)),y.strokeStyle=T,y.lineWidth=1.2,y.beginPath(),y.arc(19,19,7,0,2*Math.PI),y.stroke(),y.fillStyle=T,y.fillRect(15,19,8,1),"zoomout"==v&&y.fillRect(19,15,1,8),y.beginPath(),y.moveTo(24,23),y.lineTo(34,30),y.lineWidth=3,y.stroke()},loadData:function(a,v){var c=this,h=$(a),b=h.data("playbar").options,y=h.find(".lava-playbar-data"),T=h.find(".lava-playbar-linenames"),g=h.find(".lava-playbar-lines"),L=h.data("playbar").point;"channel"==b.type?b.data=v:b.lineData=v;var z=h.find(".lava-playbar-rightbar"),w=h.find(".lava-playbar-data"),C=h.find(".lava-playbar-channels");w.css({top:0}),z.css({top:15}).hide(),C.css({top:0}),"channel"==b.type?(v.length>4&&(z.css({height:4/v.length*65}).show(),setTimeout(function(){z.hide(),setTimeout(function(){z.show()},100)},100)),C.show(),y.show(),T.hide(),g.hide(),L.hide(),c.loadChannelNum(a),c.loadChannelData(a)):"line"==b.type&&(C.hide(),y.hide(),T.show(),g.show(),L.show(),c.loadLineType(a),c.loadLineData(a))},changeType:function(a,v){var c=this,h=$(a),b=h.find(".lava-playbar-channels"),y=h.find(".lava-playbar-data"),T=h.find(".lava-playbar-linenames"),g=h.find(".lava-playbar-lines"),L=h.data("playbar").point,z=h.data("playbar").options;if(v!=z.type)if("channel"==v)b.show(),y.show(),T.hide(),g.hide(),L.hide(),z.type=v,z.data&&(c.loadChannelNum(a),c.loadChannelData(a));else if("line"==v&&(T.show(),g.show(),b.hide(),y.hide(),h.find(".lava-playbar-rightbar").hide(),z.type=v,z.lineData)){c.loadLineType(a),c.loadLineData(a);var w=(z.currentTime-z.startTime)/864e5*z.zoomLevel*z.timeWidth+100;c.loadTimeLabel(a,w)}},loadLineType:function(a){var v=$(a),c=v.find(".lava-playbar-linenames"),h=v.find(".lava-playbar-data"),b=v.data("playbar").options,y=b.lineData;c.empty(),h.css({top:0});for(var i=0;i<y.length;i++)c.append("<div class='lava-playbar-linename' style='color:"+y[i].color+"'>"+y[i].name+"</div>")},loadLineData:function(a){var v=$(a),c=v.data("playbar").options,h=v.find(".lava-playbar-linenames"),b=h.children(),y=(v.find(".lava-playbar-lines"),v.data("playbar").lineCanvas[0]);y.width=c.timeWidth;var T=y.getContext("2d");T.lineWidth=1.5;for(var g=c.lineData,i=0;i<g.length;i++){for(var L=!1,z=0;z<b.length;z++)if(b.eq(z).text()==g[i].name&&b.eq(z).hasClass("lava-playbar-linename-disable")){L=!0;break}if(!L){var w=g[i].data;T.strokeStyle=g[i].color?g[i].color:"#fff",T.lineJoin="round";for(var C=c.startTime+864e5/c.zoomLevel,D=!1,W=864e5/c.zoomLevel,z=(Math.ceil(1*w.length/c.timeWidth/c.zoomLevel),0);z<w.length;z++){var B=w[z].time;if(0==z&&B>=c.startTime||B<=c.startTime&&w[z+1]&&w[z+1].time>c.startTime?(T.beginPath(),c.time=B,T.moveTo((B-c.startTime)/W*c.timeWidth,95-95*(w[z].value/120)),D=!0):(B>=c.startTime&&C>=B||B>C&&w[z-1]&&w[z-1].time<C)&&T.lineTo(parseInt((B-c.startTime)/W*c.timeWidth)+.5,95-95*(w[z].value/120)),D&&(B>=C&&w[z-1]&&w[z-1].time<C||z==w.length-1)){T.stroke();break}}}}},loadChannelNum:function(a){var v=$(a),c=v.data("playbar").options,h=c.data,b=v.find(".lava-playbar-channels");b.empty();for(var i=0;i<h.length;i++)b.append("<div class='lava-playbar-channel' style='background:"+c.channelBgColor+";color:"+c.channelColor+";'>"+h[i].name+"</div>");if(h.length<4)for(var i=0;i<4-h.length;i++)b.append("<div class='lava-playbar-channel' style='background:"+c.channelBgColor+";color:"+c.channelColor+";'></div>")},loadChannelData:function(a){var v=$(a),c=v.data("playbar").options,h=c.data,b=c.timeWidth,y=c.startTime+864e5/c.zoomLevel,T=v.data("playbar").dataCanvas[0],g=T.getContext("2d");if(h){T.height=24*h.length;for(var i=0;i<h.length;i++){var L=h[i].channel;g.clearRect(0,24*i+4,b,14);for(var z=0;z<L.length;z++)if(g.fillStyle="normal"==L[z].type?c.normalColor:c.alarmColor,L[z].startTime<=c.startTime&&L[z].endTime>c.startTime&&L[z].endTime<=y)g.fillRect(0,24*i+6,(L[z].endTime-c.startTime)/864e5*c.zoomLevel*b,12);else if(L[z].startTime>=c.startTime&&L[z].endTime<=y)g.fillRect((L[z].startTime-c.startTime)/864e5*c.zoomLevel*b,24*i+6,(L[z].endTime-L[z].startTime)/864e5*c.zoomLevel*b,12);else if(L[z].startTime>=c.startTime&&L[z].endTime>y)g.fillRect((L[z].startTime-c.startTime)/864e5*c.zoomLevel*b,24*i+6,(y-c.startTime)/864e5*c.zoomLevel*b,12);else if(L[z].startTime<c.startTime&&L[z].endTime>y)g.fillRect(0,24*i+6,b,12);else if(L[z].endTime<c.startTime&&L[z].startTime>y)break;g.fillStyle=c.channelSplitColor,g.fillRect(0,24*i+24,b,1)}}},drawTime:function(a){var v=this,c=a.data("playbar").options,h=a.find(".lava-playbar-time"),b=a.find(".lava-playbar-timewrapper"),y=a.find(".lava-playbar-bottombar"),T=b.children("canvas")[0],T=a.data("playbar").timeCanvas[0],g=h.width();c.timeWidth=g,b.css({width:g}),T.width=g,g*=c.zoomLevel;var L=0,z=0,w=T.getContext("2d");g-=1,1==c.zoomLevel?y.hide():y.show(),1==c.zoomLevel?(z=24,L=g/24):/^(2|4)$/.test(c.zoomLevel)?(z=144,L=g/144):8==c.zoomLevel?(z=720,L=g/720):24==c.zoomLevel?(z=1440,L=g/1440):48==c.zoomLevel?(z=2880,L=g/2880):144==c.zoomLevel?(z=8640,L=g/8640):288==c.zoomLevel?(z=8640,L=g/8640):1440==c.zoomLevel&&(z=43200,L=g/z),w.fillStyle=c.headerColor;var C=L-parseInt(c.startTime)%parseInt(864e5/z)/parseInt(864e5/z)*L;C=C==L?0:C;var $=parseInt(864e5/z)-parseInt(c.startTime)%parseInt(864e5/z);$=$==864e5/z?0:$;for(var i=0;90>=i;i++){var x=parseInt(C+i*L);if(w.fillRect(x,30,1,10),1==c.zoomLevel&&i%2==0&&i>0)w.fillText(v.round(i)+":00",24==i?x-28:x-14,28);else if(2==c.zoomLevel&&parseInt((10*i*60*1e3+c.startTime+$)/6e5)%6==0){var D=v.getTime(10*i*60*1e3+c.startTime+$);w.fillText(D,"24:00"==D?x-28:x-14,28)}else if(4==c.zoomLevel&&parseInt((10*i*60*1e3+c.startTime+$)/6e5)%6==0){var D=v.getTime(10*i*60*1e3+c.startTime+$);w.fillText(D,"24:00"==D?x-28:x-14,28)}else if(8==c.zoomLevel&&parseInt((2*i*60*1e3+c.startTime+$)/12e4)%10==0){var D=v.getTime(2*i*60*1e3+c.startTime+$);w.fillText(D,"24:00"==D?x-28:x-14,28)}else if(24==c.zoomLevel&&parseInt((60*i*1e3+c.startTime+$)/6e4)%6==0){var D=v.getTime(60*i*1e3+c.startTime+$);w.fillText(D,"24:00"==D?x-28:x-14,28)}else if(48==c.zoomLevel&&parseInt((30*i*1e3+c.startTime+$)/3e4)%6==0){var D=v.getTime(30*i*1e3+c.startTime+$);w.fillText(D,"24:00"==D?x-28:x-14,28)}else if(144==c.zoomLevel&&parseInt((10*i*1e3+c.startTime+$)/1e4)%6==0){var D=v.getTime(10*i*1e3+c.startTime+$);w.fillText(D,"24:00"==D?x-28:x-14,28)}else if(288==c.zoomLevel&&parseInt((10*i*1e3+c.startTime+$)/1e4)%6==0){var D=v.getTime(10*i*1e3+c.startTime+$);w.fillText(D,"24:00"==D?x-28:x-14,28)}else if(1440==c.zoomLevel)if(parseInt((2*i*1e3+c.startTime+$)/2e3)%30==0){var D=v.getTime(2*i*1e3+c.startTime+$);w.fillText(D,"24:00"==D?x-28:x-14,28)}else w.fillText(v.getSeconds(2*i*1e3+c.startTime+$),x,30)}v.drawBottomRollBar(a[0])},loadTimeLabel:function(a,v,c){var h=this,b=$(a),y=b.data("playbar").options,T=b.data("playbar").line,g=b.data("playbar").timeLabel,L=b.data("playbar").timeLabelCanvas[0],z=L.getContext("2d"),w=b.data("playbar").point,C=b.data("playbar").pointCanvas[0],D=C.getContext("2d"),W=b.data("playbar").lineNames.children();if(z.clearRect(0,0,50,14),z.fillStyle="#555",D.clearRect(0,0,150,95),v){if(c||(T.show(),g.show(),"line"==y.type&&w.show()),100>v?(v=100,c&&(T.hide(),g.hide(),"line"==y.type&&w.hide())):v>99+y.timeWidth?(v=99+y.timeWidth,c&&(T.hide(),g.hide(),"line"==y.type&&w.hide())):c&&(T.show(),g.show(),"line"==y.type&&w.show()),g.css(125>v?{left:100}:v>y.timeWidth+75?{left:y.timeWidth+50}:{left:v-25}),"line"==y.type&&y.lineData&&y.currentTime>=y.startTime&&y.currentTime<=y.startTime+864e5/y.zoomLevel){for(var B=20,i=0;i<y.lineData.length;i++){for(var k=!1,S=0;S<W.length;S++)if(W.eq(S).text()==y.lineData[i].name&&W.eq(S).hasClass("lava-playbar-linename-disable")){k=!0;break}if(!k){var I=y.lineData[i].data,R=null,P=0;if(!(0==I.length||y.currentTime<I[0].time||y.currentTime>I[I.length-1].time)){var F=h.quickSearch(I,y.currentTime);if(R=F.y,P=F.value,R){if(v>y.timeWidth-40){var O=D.createRadialGradient(140,R,2,140,R,12);O.addColorStop(0,y.lineData[i].color),O.addColorStop(1,"rgba(0,0,0,0)"),D.fillStyle=O,D.fillRect(130,R-10,20,20),D.fillStyle="rgba(0,0,0,0.53)",D.fillRect(0,B-12,130,16),D.fillStyle="#fff",D.font="11px arial",D.fillText(y.lineData[i].name+": "+P+y.lineData[i].unit,4,B)}else{var O=D.createRadialGradient(10,R,2,10,R,10);O.addColorStop(0,y.lineData[i].color),O.addColorStop(1,"rgba(85,85,85,0)"),D.fillStyle=O,D.fillRect(0,R-10,20,20),D.fillStyle="rgba(0,0,0,0.53)",D.fillRect(20,B-12,130,16),D.fillStyle="#fff",D.font="11px arial",D.fillText(y.lineData[i].name+": "+P+y.lineData[i].unit,24,B)}B+=16}}}}w.css(v>y.timeWidth-40?{left:v-140}:{left:v-10})}z.fillText(h.getTime(y.currentTime,!0),2,9),T.css({left:v})}else z.fillText("00:00:00",2,9)},quickSearch:function(a,v){var c=this;if(0==a.length)return{y:null,value:0};if(a.length%2==0)var h=a.length/2-1;else if(a.length%2==1)var h=(a.length-1)/2;return a[h].time==v?{y:95-95*(a[h].value/120),value:a[h].value}:a[h].time<v&&a[h+1]&&a[h+1].time>v?{y:95-95*(a[h].value/120),value:a[h].value}:a[h].time<v&&a[h+1]&&a[h+1].time<=v?c.quickSearch(a.slice(h+1),v):a[h].time>v?c.quickSearch(a.slice(0,h+1),v):void 0},drawBottomRollBar:function(a){var v=$(a),c=v.data("playbar").options,h=(v.find(".lava-playbar-time"),v.find(".lava-playbar-bottombar")),b=(v.width()-30)/c.zoomLevel;c.barWidth=50>b?50:b;var y=(v.width()-c.barWidth-30)*c.startTime/(864e5*(1-1/c.zoomLevel))+15;h.css({width:c.barWidth,left:y})},dragBottomRollBar:function(a,e){var v=this,c=$(a),h=c.find(".lava-playbar-bottomprev"),b=c.find(".lava-playbar-bottomrollbar"),y=c.find(".lava-playbar-bottombar"),T=(c.find(".lava-playbar-timewrapper"),c.data("playbar").options),x=e.clientX-T.lengthX-h.offset().left;15>x&&(x=15),x>b.width()-15-T.barWidth&&(x=b.width()-15-T.barWidth),y.css({left:x});var g=b.width()-30-T.barWidth;T.startTime=parseInt((x-15)/g*(864e5-864e5/T.zoomLevel)),v.drawTime(c),"channel"==T.type?v.loadChannelData(a):"line"==T.type&&v.loadLineData(a)},play:function(a,v){var c=this,h=$(a),b=h.data("playbar").options;b.currentTime=v,v<b.startTime&&(b.startTime=v,"channel"==b.type?c.loadChannelData(a):"line"==b.type&&c.loadLineData(a),c.drawTime(h)),v-b.startTime>864e5/b.zoomLevel&&(b.startTime=v-864e5/b.zoomLevel,"channel"==b.type?c.loadChannelData(a):"line"==b.type&&c.loadLineData(a),c.drawTime(h));var y=(v-b.startTime)/(864e5/b.zoomLevel)*b.timeWidth+100;c.loadTimeLabel(a,y)},getTime:function(a,v){var c=this;return v?c.round(parseInt(a/36e5))+":"+c.round(parseInt(a%36e5/6e4))+":"+c.round(parseInt(a%6e4/1e3)):c.round(parseInt(a/36e5))+":"+c.round(parseInt(a%36e5/6e4))},getSeconds:function(a){var v=this,c=new Date(a);return v.round(c.getSeconds())},round:function(a){return 10>a?"0"+a:a},zoomOutOrIn:function(a,v){{var c=this,h=$(a),b=h.data("playbar").options;b.zoomLevel}if("zoomout"==v){if(1440==b.zoomLevel)return;288==b.zoomLevel?(b.zoomLevel*=5,b.startTime+=.8*(b.currentTime-b.startTime)):48==b.zoomLevel||8==b.zoomLevel?(b.zoomLevel*=3,b.startTime+=(b.currentTime-b.startTime)*(2/3)):(b.zoomLevel*=2,b.startTime+=.5*(b.currentTime-b.startTime))}else if("zoomin"==v){if(1==b.zoomLevel)return;1440==b.zoomLevel?(b.zoomLevel=b.zoomLevel/5,b.startTime-=4*(b.currentTime-b.startTime)):144==b.zoomLevel||24==b.zoomLevel?(b.zoomLevel=b.zoomLevel/3,b.startTime-=2*(b.currentTime-b.startTime)):(b.zoomLevel=b.zoomLevel/2,b.startTime-=b.currentTime-b.startTime)}if(b.startTime<0){b.startTime=0;var y=(b.currentTime-b.startTime)/(864e5/b.zoomLevel)*b.timeWidth+100;c.loadTimeLabel(a,y)}else if(b.startTime>864e5-864e5/b.zoomLevel){b.startTime=864e5-864e5/b.zoomLevel;var y=(b.currentTime-b.startTime)/(864e5/b.zoomLevel)*b.timeWidth+100;c.loadTimeLabel(a,y)}c.drawTime(h),"channel"==b.type?c.loadChannelData(a):"line"==b.type&&c.loadLineData(a)},resize:function(a){var v=this,c=$(a),h=c.data("playbar").options;h.timeWidth=c.find(".lava-playbar-time").width(),v.drawTime(c),v.drawBottomRollBar(a);var b=(h.currentTime-h.startTime)/(864e5/h.zoomLevel)*h.timeWidth+100;v.loadTimeLabel(a,b,!0);var y=c.data("playbar").dataCanvas[0];y.width=h.timeWidth,"channel"==h.type?v.loadChannelData(a):"line"==h.type&&v.loadLineData(a)},bindEvent:function(a){var v=this,c=$(a),h=c.data("playbar").options,b=c.find(".lava-playbar-bottombar"),y=c.find(".lava-playbar-bottomrollbar"),T=c.find(".lava-playbar-rightbar"),g=c.find(".lava-playbar-rightrollbar"),L=c.find(".lava-playbar-channels"),z=c.find(".lava-playbar-data");y.on("mousedown",function(e){if(!b.is(":visible"))return!1;var c=e.clientX-$(this).offset().left-b.width()/2;15>c&&(c=15),c>$(this).width()-b.width()-15&&(c=$(this).width()-b.width()-15),b.css({left:c}),h.bottomDownFlag=!0,h.lengthX=e.clientX-b.offset().left,v.dragBottomRollBar(a,e);var y=(h.currentTime-h.startTime)/(864e5/h.zoomLevel)*h.timeWidth+100;return v.loadTimeLabel(a,y,!0),!1}),b.on("mousedown",function(e){return h.bottomDownFlag=!0,h.lengthX=e.clientX-$(this).offset().left,!1}),T.on("mousedown",function(e){return h.rightDownFlag=!0,h.lengthY=e.clientY-$(this).offset().top,!1}),c.find(".lava-playbar-time, .lava-playbar-datawrapper, .lava-playbar-timelabel, .lava-playbar-pointcanvas").on("click",function(e){var b=e.clientX-c.offset().left;return h.currentTime=h.startTime+(b-100)/(h.timeWidth*h.zoomLevel-h.zoomLevel)*864e5,v.loadTimeLabel(a,b),h.onPosition(h.currentTime),!1}),$("body").on("mousemove mouseup",function(e){if("mousemove"==e.type&&h.bottomDownFlag){v.dragBottomRollBar(a,e);var b=(h.currentTime-h.startTime)/(864e5/h.zoomLevel)*h.timeWidth+100;v.loadTimeLabel(a,b,!0)}else if("mousemove"==e.type&&h.bodyDownFlag){var b=e.clientX-c.offset().left;h.currentTime=h.startTime+(b-100)/(h.timeWidth*h.zoomLevel-h.zoomLevel)*864e5,h.currentTime>864e5&&(h.currentTime=864e5),v.loadTimeLabel(a,b),h.onPosition&&h.onPosition(h.currentTime)}else if("mousemove"==e.type&&h.rightDownFlag){var y=e.clientY-g.offset().top-h.lengthY;15>y&&(y=15),y>80-T.height()&&(y=80-T.height()),T.css({top:y});var w=-(y-15)/(65-T.height())*24*(h.data.length-4);L.css({top:w}),z.css({top:w})}else"mouseup"==e.type&&(h.bottomDownFlag=!1,h.bodyDownFlag=!1,h.rightDownFlag=!1)}),c.on("selectstart",function(){return!1}),a.addEventListener("mousewheel",function(e){if(e.wheelDelta>0)var c="zoomout";else var c="zoomin";return v.zoomOutOrIn(a,c),e.preventDefault(),e.stopPropagation(),!1}),a.addEventListener("DOMMouseScroll",function(e){if(e.detail<0)var c="zoomout";else var c="zoomin";return v.zoomOutOrIn(a,c),e.preventDefault(),e.stopPropagation(),!1}),c.find(".lava-playbar-zoomout,.lava-playbar-zoomin").on("mouseover mouseout click",function(e){var c=e.target.className.replace("lava-playbar-","");"mouseover"==e.type||"mouseout"==e.type?v.drawZoomBtn(a,c,e.type):v.zoomOutOrIn(a,c)}),c.delegate(".lava-playbar-linename","click",function(){$(this).toggleClass("lava-playbar-linename-disable"),v.loadLineData(a);var c=(h.currentTime-h.startTime)/(864e5/h.zoomLevel)*h.timeWidth+100;v.loadTimeLabel(a,c)}),$(window).on("resize",function(){v.resize(a)})}};$.fn.lavaPlayBar=function(a,v){return"string"==typeof a?$.fn.lavaPlayBar.methods[a](this,v):this.each(function(){var v={};$.extend(v,$.fn.lavaPlayBar.defaults),$(this).data("playbar",{options:v}),$.extend($(this).data("playbar").options,a),lavaPlayBar.init(this),lavaPlayBar.drawTime($(this)),lavaPlayBar.bindEvent(this)})},$.fn.lavaPlayBar.defaults={headerColor:"#999",headerBgColor:"#223",channelBgColor:"#222",channelColor:"#999",bgColor:"#000",channelWrapperBgColor:"#333",btnColor:"#32c5d2",rollbarWrapperColor:"#252525",rollbarColor:"#555",rollbarHoverColor:"#666",rollbarAngleColor:"#888",normalColor:"#00ad76",alarmColor:"#b74201",channelSplitColor:"#333",zoomLevel:1,startTime:0,currentTime:0,type:"channel",time:0,onPosition:function(){}},$.fn.lavaPlayBar.methods={loadData:function(a,v){return lavaPlayBar.loadData(a,v)},changeType:function(a,v){return lavaPlayBar.changeType(a,v)},play:function(a,v){return lavaPlayBar.play(a,v)},resize:function(a){lavaPlayBar.resize(a)},options:function(a){return $(a).data("playbar").options},getType:function(a){return $(a).data("playbar").options.type},getTime:function(a){return $(a).data("playbar").options.currentTime}};