 ;
 (function($) {
     //常量配置
     function custom() {
         return {
             $container: undefined, //容器
             containerHeight: 0, //容器高
             containerWidth: 0, //容器宽
             columnNum: 4, //容器划分列数
             borderSize: 2, //盒子边框大小(px)
             boxIndex: 0, //当前选择盒子索引
             pageIndex: 1, //当前页数
             pageSize: 4, //页面大小
             pageCount: 1, //页面数
             borderType: 'solid', //盒子边框类型(实线)
             maxCount: 16, //最大盒子数
             isMouseDown: false, //是否按下鼠标
             $box: $("<div out='true' style='position:relative;float:left;'><div style='height:20px;width:100%;'></div><div style='position:absolute;width:100%;top:20px;bottom:0;'></div></div>"), //盒子
             $moveBox: $("<div style='position:absolute;z-index:9;pointer-events:none;'></div>"), //盒子外框[ie9支持事件穿透]
             $focusBox: $("<div style='position:absolute;z-index:998;pointer-events:none;border:2px solid red;'></div>") //聚焦盒子外框[ie9支持事件穿透]
         };
     }
     //初始化
     function init(target) {
         var opts = $.data(target, 'lavaVideoLayout').options;
         var custom = $.data(target, 'lavaVideoLayout').custom;

         custom.$container = $(target);
         custom.containerHeight = $(target).height();
         custom.containerWidth = $(target).width();
         $(target).delegate('div[out="true"]', 'click', function() {
             var currentHeight = $(this).height();
             var currentWidth = $(this).width();
             var offset = $(this).offset();
             var index = $(this).attr('index');
             custom.$moveBox.width(currentWidth).height(currentHeight)
                 .css('top', offset.top - $(target).offset().top - 1)
                 .css('left', offset.left - $(target).offset().left - 1).show();
             custom.boxIndex = parseInt(index, 10); //记录当前选择盒子索引
             opts.click.call(this, index, $(this));
             return false;
         });
         $(target).delegate('div[out="true"]', 'dblclick', function() {
             if (custom.$container.children('div').length == 1) return;
             var index = parseInt($(this).attr('index'), 10);
             if ($(this).attr('zoom') === undefined) {
                 var style = $(this).attr('style');
                 /*$(this).width(custom.containerWidth - 2 * custom.borderSize)
                     .height(custom.containerHeight - 2 * custom.borderSize)
                     .attr('zoom', 'out')
                     .attr('oldStyle', style)
                     .siblings('div').hide();*/
                 $(this).width("99.7%")
                     .height("99.7%")
                     .attr('zoom', 'out')
                     .attr('oldStyle', style)
                     .siblings('div').hide();
                //  $(this).children('div').eq(1).height(custom.containerHeight - 2 * custom.borderSize - 20);
                 $(this).click(); //触发边框显示
                 opts.zoomOut.call(this, index, $(this));
             } else {
                 var oldStyle = $(this).attr('oldStyle');
                 $(this).attr('style', oldStyle)
                     .removeAttr('zoom')
                     .removeAttr('oldStyle');
                 $(target).lavaVideoLayout("to", $(target).data("lavaVideoLayout").custom.pageSize);
                //  $(this).children('div').eq(1).height($(this).height() - 20);
                 $(this).click(); //触发边框显示
                 opts.zoomIn.call(this, index, $(this));
             }
         });
         $(target).delegate('div[out="true"]', 'mouseenter', function() {
             var index = parseInt($(this).attr('index'), 10);
             if (custom.isMouseDown && index !== custom.boxIndex) {
                 var currentHeight = $(this).height();
                 var currentWidth = $(this).width();
                 var offset = $(this).offset();

                 custom.$focusBox.width(currentWidth).height(currentHeight)
                     .css('top', offset.top - custom.borderSize)
                     .css('left', offset.left - custom.borderSize).show();
             }
         });
         $(target).delegate('div[out="true"]', 'mouseleave', function() {
             if (custom.isMouseDown != custom.boxIndex) {
                 custom.$focusBox.hide();
             }
         });
         $(target).delegate('div[out="true"]', 'mousedown', function(e) {
             var index = parseInt($(this).attr('index'), 10);
             if (e.which === 3) { //鼠标右键
                 opts.rightClick.call(this, index, $(this));
             } else if (e.which === 1) { //鼠标左键
                 if (index === custom.boxIndex) {
                     custom.isMouseDown = true;
                     opts.dragStart.call(this, index, $(this));
                 }
             }
         });
         $(target).delegate('div[out="true"]', 'mouseup', function() {
             var index = parseInt($(this).attr('index'), 10);
             if (custom.isMouseDown) {
                 custom.isMouseDown = false;
                 custom.$focusBox.hide();
                 $(this).click().focus();
                 opts.dragEnd.call(this, index, $(this));
             }
         });
         custom.$moveBox.css('border', 1 + 'px ' + custom.borderType + ' ' + opts.borderColor).appendTo($(target).parent()).hide();
         custom.$focusBox.appendTo($("body")).hide();

         $(target).lavaVideoLayout('to', opts.defaultCount);
         return $(target);
     }
     $.fn.lavaVideoLayout = function(options, param) {
         if (typeof options == 'string') {
             return $.fn.lavaVideoLayout.methods[options](this, param);
         }
         options = options || {};
         return this.each(function() {
             var state = $.data(this, 'lavaVideoLayout');
             if (state) {
                 $.extend(state.options, options);
             } else {
                 $.data(this, 'lavaVideoLayout', {
                     options: $.extend({}, $.fn.lavaVideoLayout.defaults, options),
                     custom: custom()
                 });
                 $(this).data("lavaVideoLayout").custom.maxCount = options.maxLayout;
             }
             init(this);
         });
     };
     $.fn.lavaVideoLayout.methods = {
         options: function(jq) {
             return $.data(jq[0], 'lavaVideoLayout').options;
         },
         //增加工具项
         addTool: function(jq, param) {
             var obj = jq.lavaVideoLayout('getItem', param.index);
             var div = obj.children('div').eq(0);
             div.append(param.el);
         },
         //增加内容
         addContent: function(jq, param) {
             var obj = jq.lavaVideoLayout('getItem', param.index);
             var div = obj.children('div').eq(1);
             div.append(param.el);
         },
         //获取标题部分
         getTitlePanel: function(jq, indexN) {
             var result = jq.lavaVideoLayout('getItem', indexN);
             return result == null ? null : result.children('div').eq(0);
         },
         //获取内容部分
         getContentPanel: function(jq, indexN) {
             var result = jq.lavaVideoLayout('getItem', indexN);
             return result == null ? null : result.children('div').eq(1);
         },
         //获取选择项
         getItem: function(jq, indexN) {
             var custom = $.data(jq[0], 'lavaVideoLayout').custom;
             var $boxs = custom.$container.children("div");
             var result = null;
             indexN = parseInt(indexN, 10);
             $.each($boxs, function(index, ele) {
                 var indexNo = parseInt($(this).attr('index'), 10);
                 if (indexN === indexNo) {
                     result = $(ele);
                 }
             });
             return result;
         },
         //获取选择项的索引
         getSelectedIndex: function(jq, indexN) {
             var custom = $.data(jq[0], 'lavaVideoLayout').custom;
             return custom.boxIndex;
         },
         //设置选择项的索引
         setSelectedIndex: function(jq, index){
             $(jq).data("lavaVideoLayout").custom.boxIndex = index;
             $(jq).data("lavaVideoLayout").custom.pageSize = 1;
         },
         //上一页
         pre: function(jq) {
             var custom = $.data(jq[0], 'lavaVideoLayout').custom;
             if (custom.pageIndex > 1) {
                 custom.pageIndex--;
                 to(custom.pageSize);
             }
         },
         //下一页
         next: function(jq) {
             var custom = $.data(jq[0], 'lavaVideoLayout').custom;
             if (custom.pageIndex < custom.maxCount) {
                 custom.pageIndex++;
                 to(custom.pageSize);
             }
         },
         //隐藏选择框
         hideSelectedBorder: function(jq) {
             var custom = $.data(jq[0], 'lavaVideoLayout').custom;
             custom.$moveBox.hide();
         },
         //获取框个数
         getCount: function(jq) {
             var custom = $.data(jq[0], 'lavaVideoLayout').custom;
             var $boxs = custom.$container.children("div");
             return $boxs.length;
         },
         resize: function(jq) {
             var custom = $.data(jq[0], 'lavaVideoLayout').custom;
             custom.containerHeight = custom.$container.height();
             custom.containerWidth = custom.$container.width();
             jq.lavaVideoLayout('to', custom.pageSize);
         },
         /**
          * 切换布局
          * @number
          * @flag 是否将选中index重置为1
          */
         to: function(jq, number, flag) {
             var opts = $.data(jq[0], 'lavaVideoLayout').options;
             var custom = $.data(jq[0], 'lavaVideoLayout').custom;
             var $boxs = custom.$container.children("div");
             var length = $boxs.length;
             if (flag){
                 custom.boxIndex = 1;
             }
             custom.pageSize = number;
                //  custom.pageCount = Math.ceil(custom.maxCount / custom.pageSize);
             custom.pageCount = Math.ceil((length > number ? length : number) / custom.pageSize);
             custom.pageIndex = Math.ceil((custom.boxIndex === 0 ? custom.pageSize : custom.boxIndex) / custom.pageSize);
             var total = custom.pageSize * custom.pageCount;
             total = total > custom.maxCount ? custom.maxCount : total;
             for (var i = 0; i < total; i ++){
                 //将不在本页的盒子隐藏掉
                 if ($boxs.eq(i).length > 0 && (i < (custom.pageIndex - 1) * custom.pageSize || i >= custom.pageIndex * custom.pageSize)){
                     $boxs.eq(i).hide();
                 }else if ($boxs.eq(i).length > 0 && i >= (custom.pageIndex - 1) * custom.pageSize && i < custom.pageIndex * custom.pageSize){
                     $boxs.eq(i).show();
                 }else if ($boxs.eq(i).length == 0 && i >= (custom.pageIndex - 1) * custom.pageSize && i < custom.pageIndex * custom.pageSize){
                     var $box = custom.$box.css({
                         background: opts.bgColor,
                         marginTop: custom.borderSize,
                         marginLeft: custom.borderSize
                     });
                     var $clone = $box.clone().attr("index", i+1);
                     custom.$container.append($clone);
                     opts.addComplete(i+1, $clone);
                 }
             }
             $(".lp-layout.selected").removeClass("selected");
             $(".lp-layout" + number).addClass("selected");
             var cWidth = custom.$container.width();
             var layout1_1, layout2_1, layout3_1, layout3_2, layout4_1, layout4_2;
             /*if (cWidth < 593) {
                 layout1_1 = "99.1%";
                 layout2_1 = "49.39%";
                 layout3_1 = "32.79%";
                 layout3_2 = "65.9%";
                 layout4_1 = "24.49%";
                 layout4_2 = "49.32%";
             } else if (cWidth >= 593 && cWidth < 1360) {
                 layout1_1 = "99.66%";
                 layout2_1 = "49.66%";
                 layout3_1 = "32.996%";
                 layout3_2 = "66.05%";
                 layout4_1 = "24.662%";
                 layout4_2 = "49.66%";
             } else if (cWidth >= 1360) {
                 layout1_1 = "99.7%";
                 layout2_1 = "49.78%";
                 layout3_1 = "33.13%";
                 layout3_2 = "66.42%";
                 layout4_1 = "24.81%";
                 layout4_2 = "49.77%";
             }*/
             layout1_1 = "99.66%";
            layout2_1 = "49.66%";
            layout3_1 = "32.996%";
            layout3_2 = "66.05%";
            layout4_1 = "24.662%";
            layout4_2 = "49.66%";
            $.each(custom.$container.children("div"), function(index, el){
                var height = 0;
                var width = 0;
                if (index >= (custom.pageIndex - 1) * custom.pageSize && index < custom.pageIndex * custom.pageSize){
                    index = index - (custom.pageIndex - 1) * custom.pageSize;
                    switch (number) {
                        case 1 :
                            height = layout1_1;
                            width = layout1_1;
                            break;
                        case 2 :
                            height = layout1_1;
                            width = layout2_1;
                            break;
                        case 3 :
                            if (index == 0){
                                height = layout1_1;
                                width = layout2_1;
                            }else {
                                height = layout2_1;
                                width = layout2_1;
                            }
                            break;
                        case 4:
                            height = layout2_1;
                            width = layout2_1;
                            break;
                        case 6:
                            if (index == 0){
                                height = layout3_2;
                                width = layout3_2;
                            }else {
                                height = layout3_1;
                                width = layout3_1;
                            }
                            break;
                        case 9:
                            height = layout3_1;
                            width = layout3_1;
                            break;
                        case 10:
                            if (index < 2){
                                height = layout2_1;
                                width = layout2_1;
                            }else {
                                height = layout4_1;
                                width = layout4_1;
                            }
                            break;
                        case 12:
                            height = layout3_1;
                            width = layout4_1;
                            break;
                        case 16:
                            height = layout4_1;
                            width = layout4_1;
                            break;
                        case 25:
                            height = "19.59%";
                            width = "19.59%";
                            break;
                        case 36:
                            height = "16.26%";
                            width = "16.26%";
                            break;
                        case 64:
                            height = "12.12%";
                            width = "12.12%";
                            break;
                        default: break;
                    }
                    $(el).css({width: width, height: height});
                    var index = $(this).attr('index');
                    index = parseInt(index, 10);
                    if (index === custom.boxIndex) {
                        $(el).click();
                    }
                }
            });
             /*var height = (custom.containerHeight - (custom.columnNum + 1) * custom.borderSize) / custom.columnNum; //盒子高
             var width = (custom.containerWidth - (custom.columnNum + 1) * custom.borderSize) / custom.columnNum; //盒子宽
             var $box = custom.$box
                 .css('background', opts.bgColor)
                 .css('margin-top', custom.borderSize + "px")
                 .css('margin-left', custom.borderSize + "px")
                 .height(height)
                 .width(width);
             custom.pageSize = number;
             custom.pageCount = Math.ceil(custom.maxCount / custom.pageSize);
             custom.pageIndex = Math.ceil((custom.boxIndex === 0 ? custom.pageSize : custom.boxIndex) / custom.pageSize);

             $.each($boxs, function(index, ele) {
                 var indexNo = parseInt($(this).attr('index'), 10);
                 if (custom.pageIndex !== Math.ceil(indexNo / custom.pageSize)) { //移除除目标盒子以外的盒子
                     opts.removeComplete.call(this, indexNo, $(ele));
                    //  $(this).remove();
                    $(this).hide();
                 }
                 if ($(ele).attr('zoom') === 'out') {
                     $(ele).dblclick();
                 }
             });
             var addEventArray = [];
             if ($boxs.length === 0) {
                 custom.$container.append($box.clone().attr('index', 1));
                 $boxs = custom.$container.children("div");

                 addEventArray.push({
                     index: 1,
                     el: box
                 });
             }
             var firstNo = (custom.pageIndex - 1) * custom.pageSize + 1,
                 lastNo = custom.pageIndex * custom.pageSize;
             var firstBox = $boxs.first(),
                 lastBox = $boxs.last();
             for (var i = firstNo; i <= lastNo; i++) {
                 if (i > custom.maxCount) continue;
                 var box = $box.clone().attr('index', i);
                 var isHad = false;
                 $.each($boxs, function(index, ele) {
                     var index = parseInt($(this).attr('index'), 10);
                     if (i === index) {
                         isHad = true;
                     }
                 });
                 if (!isHad) {
                     if (i < parseInt(firstBox.attr('index'), 10)) {
                         firstBox.before(box);
                     }
                     if (i > parseInt(lastBox.attr('index'), 10)) {
                         custom.$container.append(box);
                     }
                     isHad = false;
                     addEventArray.push({
                         index: i,
                         el: box
                     });
                 }
             }
             $.each(custom.$container.children("div"), function(index, ele) {
                 var height = 0,
                     width = 0;
                 var c_height = custom.containerHeight,
                     c_width = custom.containerWidth,
                     c_bs = custom.borderSize;
                 switch (number) {
                     case 1:
                         height = c_height - 2 * c_bs;
                         width = c_width - 2 * c_bs;
                         break;
                     case 2:
                        height = c_height - 2 * c_bs;
                        width = (c_width - 3 * c_bs) / 2;
                        break;
                     case 3:
                         if (index == 0) {
                             height = c_height - 2 * c_bs;
                             width = (c_width - 3 * c_bs) / 2;
                         } else {
                             height = (c_height - 3 * c_bs) / 2;
                             width = (c_width - 3 * c_bs) / 2;
                         }
                         break;
                     case 4:
                         height = (c_height - 3 * c_bs) / 2;
                         width = (c_width - 3 * c_bs) / 2;
                         break;
                     case 6:
                         if (index == 0) {
                             height = Math.ceil((c_height - 3 * c_bs) * 2 / 3);
                             width = Math.ceil((c_width - 3 * c_bs) * 2 / 3);
                         } else {
                             height = (c_height - 4 * c_bs) / 3;
                             width = (c_width - 4 * c_bs) / 3;
                         }
                         break;
                     case 9:
                         height = (c_height - 4 * c_bs) / 3;
                         width = (c_width - 4 * c_bs) / 3;
                         break;
                     case 10:
                         if (index == 0 || index == 1) {
                             height = (c_height - 3 * c_bs) / 2;
                             width = (c_width - 3 * c_bs) / 2;
                         } else {
                             height = (c_height - 5 * c_bs) / 4;
                             width = (c_width - 5 * c_bs) / 4;
                         }
                         break;
                     case 12:
                         height = (c_height - 4 * c_bs) / 3;
                         width = (c_width - 5 * c_bs) / 4;
                         break;
                     case 16:
                         height = (c_height - 5 * c_bs) / 4;
                         width = (c_width - 5 * c_bs) / 4;
                         break;
                     case 25:
                         height = (c_height - 6 * c_bs) / 5;
                         width = (c_width - 6 * c_bs) / 5;
                         break;
                     case 36:
                        height = (c_height - 7 * c_bs) / 6;
                        width = (c_width - 7 * c_bs) / 6;
                        break;
                    case 64:
                        height = (c_height - 9 * c_bs) / 8;
                        width = (c_width - 9 * c_bs) / 8;
                        break;
                     default:
                         break;
                 }
                 $(ele).height(height).width(width);
                 $(ele).children('div').eq(1).height(height - 20);
                 var index = $(this).attr('index');
                 index = parseInt(index, 10);
                 if (index === custom.boxIndex) {
                     $(ele).click();
                 }
                 opts.resize.call(this, index, $(ele));
             });
             var length = addEventArray.length; //在元素添加变形完以后触发添加事件
             for (var i = 0; i < length; i++) {
                 var event = addEventArray.shift();
                 opts.addComplete.call(this, event.index, event.el);
             }*/
         }
     };
     $.fn.lavaVideoLayout.defaults = {
         defaultCount: 4, //默认窗口个数
         layout: 'square', //默认布局正方形 
         bgColor: 'black', //背景色   
         borderColor: "rgb(68,176,44)", //边框
         addComplete: function(i, e) {},
         removeComplete: function(i, e) {},
         zoomIn: function(i, e) {},
         zoomOut: function(i, e) {},
         click: function(i, e) {},
         rightClick: function(i, e) {},
         dragStart: function(i, e) {},
         dragEnd: function(i, e) {},
         resize: function(i, e) {},
         onBeforeRemove: function(video) {}
     };
 })(jQuery);