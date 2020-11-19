(function($, window) {
    var $body = $("body");
    var app = {
        ie8: /msie 8/.test(navigator.userAgent.toLowerCase()),
        init: function() {
            header.init();
            sidebar.init();
            button.init();
            tabs.init();
            modal.init();
            sideModal.init();
            checkbox.init();
            popover.init();
            layout.init();
            lavaWindow.init();
            lavaAlert.init();
        }
    };
    //header
    var header = {
        init: function() {
            $(".sidebar-toggle").on("click", function() {
                var $container = $(".page-container");
                $container.toggleClass("sidebar-collapsed");
                if ($container.hasClass("sidebar-collapsed")) {
                    $(".page-sidebar .sub-menu").hide();
                } else {
                    $(".page-sidebar .sub-menu").css({top: 0});
                    $(".page-sidebar .active").next(".sub-menu").show();
                }
                if (app.ie8) {
                    //触发 before, after 伪元素重绘
                    setTimeout(function() {
                        $(".page-sidebar .nav-toggle").focus();
                    }, 10);
                }
            });
        }
    };
    //侧边栏
    var sidebar = {
        init: function() {
            $(".page-sidebar").delegate(".nav-link", "click", function(e) {
                var $this = $(this);
                if (!$this.hasClass("nav-toggle")) {
                    $(".page-sidebar .active").removeClass("active");
                    $this.addClass("active");
                }
                    
                if ($this.parent().parent().hasClass("sub-menu")) {
                    $this.parent().parent().prev().addClass("active");
                }
                if (!$(".page-container").hasClass("sidebar-collapsed")) {
                    if ($this.hasClass("nav-toggle")) {
                        if ($this.hasClass("open")) {
                            $this.next("ul").slideToggle();
                        } else {
                            $(".page-sidebar .open").removeClass("open").next("ul").hide();
                            $this.next("ul").slideToggle();
                        }
                        $this.toggleClass("open");
                        if (app.ie8) {
                            $(".page-sidebar").hide();
                            $(".page-sidebar").show();
                        }
                    }
                }
            });
            $("html").delegate(".sidebar-collapsed .page-sidebar .nav-toggle", "mouseover mouseout", function(e) {
                var $ul = $(this).next("ul");
                if (e.type == "mouseover") {
                    var top = $(this).offset().top - $(".page-sidebar").offset().top;
                    $ul.show().css({top: top});
                } else {
                    $ul.hide();
                }
            });
            $("html").delegate(".sidebar-collapsed .page-sidebar .sub-menu", "mouseover mouseout", function(e) {
                if (e.type == "mouseover") {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
    };
    var button = {
        init: function() {
            $body.delegate(".dropdown-toggle", "click", function(e) {
                $(".btn-group.open").removeClass("open");
                $(this).parent().toggleClass("open");
                e.stopPropagation();
            });
            $(document).on("click", function(e) {
                $(".btn-group.open").removeClass("open");
            });
        }
    };
    var tabs = {
        init: function() {
            $body.delegate(".tabs>li>a", "click", function(e) {
                var $this = $(this);
                var $li = $this.parent();
                var $tab = $($this.attr("href"));
                if (!$li.hasClass("active")) {
                    $li.parent().children(".active").removeClass("active");
                    $tab.siblings(".active").removeClass("active");
                    $li.addClass("active");
                    $tab.addClass("active");
                }
                //只要点击tab标题就需要相应
                if ($this.parent().parent().attr("data-options")) {
                    var options = eval( "({" + $this.parent().parent().attr("data-options") + "})");
                    if (options.onSelect) {
                        eval("(" + options.onSelect + "('" + $this.attr("href") + "','" + $this.attr("id") + "'))");
                    }
                }
                e.preventDefault();
            });
        }
    };
    var modal = {
        //modal data-position:center leftTop rightTop centerTop leftBottom centerBottom rightBottom
        init: function() {
            var that = this;
            $.fn.modal = function(options, param) {
                that[options](this);
            };
            $body.delegate(".modal-header>.close, .modal, .modal-dialog", "click", function(e) {
                var $this = $(this);
                if ($this.hasClass("modal-dialog")) {
                    e.stopPropagation();
                } else if ($this.hasClass("close") && $this.attr("data-dismiss") == "modal") {
                    that.hide($this.closest(".modal"));
                } else if ($this.hasClass("modal") && !$this.hasClass("no-backdrop") && $this.attr("data-mask") !== "static") {
                    that.hide($this);
                }
            });
        },
        show: function(target) {
            var $target = $(target);
            if (!$target.hasClass("no-backdrop")) {
                if (!$target.data("backdrop")) {
                    var $backdrop = $("<div class='modal-backdrop'></div>").appendTo("body");
                    $target.data("backdrop", $backdrop);
                }
                var $backdrop = $target.data("backdrop");
                $backdrop.addClass("in");
            }
            $target.fadeIn();
            $target.addClass("in");
        },
        hide: function(target) {
            var $target = $(target);
            $target.fadeOut();
            $target.removeClass("in");
            var $backdrop = $target.data("backdrop");
            if ($backdrop) {
                $backdrop.removeClass("in");
            }
        }
    };
    var sideModal = {
        init: function() {
            var that = this;
            $.fn.sideModal = function(options, element, param) {
                that[options](this, element);
            };
            $body.delegate(".modal-side", "click", function(e) {
                that.hide('.modal-side');
            });
            $body.delegate(".modal-side-dialog", "click", function(e) {
                e.stopPropagation();
            });
        },
        show: function(target, element) {
            var $el = $(element);
            var $modal = $(target);
            var $target = $(target).children('.modal-side-dialog');
            var elHeight = $el.outerHeight();
            // $target.css({left: 'auto'});
            var left = $el.offset().left;
            var top = $el.offset().top;
            var targetWidth = $target.outerWidth();
            var targetHeight = $target.outerHeight();
            var $trangle = $target.children('.modal-side-trangle');
            var trangleWidth = $trangle.outerWidth();
            //计算top
            var targetTop = top - 50;
            var trangleTop = 50 + elHeight / 2 - trangleWidth / 2;
            //移除visibility属性
            $modal.addClass('hide').removeClass('modal-side-novisibiable').css({display: 'none'});
            $target.children('.modal-side-trangle').css({top: trangleTop});
            $target.css({left: (left - targetWidth - trangleWidth), top: targetTop});//offset是设置相对偏移，css是绝对偏移
            $modal.fadeIn();
        },
        hide: function(target) {
            var $target = $(target);
            $target.fadeOut('normal', function() {
                $target.addClass('modal-side-novisibiable').removeClass('hide').css({display: 'block'});
            });
        }
    };
    var checkbox = {
        init: function() {
            if (!/msie 8/.test(navigator.userAgent.toLowerCase())) {
                $body.delegate(".checkbox", "click", function(e) {
                    var $this = $(e.target);
                    if (!$this.hasClass("checkbox")) {
                       $this = $this.parent();
                    }
                    //如果不是禁用状态
                    if (!$(this).hasClass("checkbox-disabled") && !$(this).children("input").attr("disabled")) {
                        var $input = $(this).children("input[type=checkbox]");
                        if ($input.prop("checked")) {
                            $input.prop("checked", false);
                        } else {
                            $input.prop("checked", true);
                        }
                    }
                });
            }
        }
    };
    var popover = {
        init: function() {
            var that = this;
            $body.delegate("[data-toggle=popover]", "click mouseover mouseleave", function(e) {
                var $this = $(this);
                var title = $this.attr("data-title"),
                    content = $this.attr("data-content"),
                    trigger = $this.attr("data-trigger");
                if (!title && !content) return;
                if (trigger == "hover") {
                    if (e.type == "mouseover") {
                        that.show(this);
                    } else if (e.type == "mouseleave") {
                        that.hide(this);
                    }
                } else if (trigger == "click" && e.type == "click") {
                    if ($this.data("popover")) {
                        that.hide(this);
                    } else {
                        that.show(this);
                    }
                } else if (trigger == "focus" && e.type == "click") {
                    that.show(this);
                    e.stopPropagation();
                }
            });
            $body.on("click", function(e) {
                var $toggle = $("[data-toggle=popover]");
                for (var i = 0; i < $toggle.length; i++) {
                    if ($toggle.eq(i).attr("data-trigger") != "click") {
                        that.hide($toggle[i]);
                    }
                }
            });
            $.fn.popover = function(options, param) {
                if (typeof options == "string") {
                    that[options](this[0]);
                } else {
                    $.each(this, function(index, el) {
                        that.initPopover(this, options);
                    });
                }
            };
        },
        initPopover: function(target, options) {
            if (!options.title && !options.content) return;
            var $target = $(target);
            $target.attr({
                "data-toggle": "popover",
                "data-title": options.title,
                "data-content": options.content,
                "data-trigger": options.trigger,
                "data-placement": options.placement
            });
        },
        show: function(target) {
            var $target = $(target);
            var title = $target.attr("data-title"),
                content = $target.attr("data-content"),
                trigger = $target.attr("data-trigger"),
                placement = $target.attr("data-placement"),
                $container = $target.offsetParent(),
                left = target.offsetLeft,
                top = target.offsetTop,
                width = $target.outerWidth(),
                height = $target.outerHeight();
            if (!title && !content || $target.data("popover")) return;
            placement = placement ? placement : "left";
            var $popover = $("<div class='popover " + placement + "'><div class='popover-title'>" + title + "</div><div class='popover-content'>" + content + "</div><div class='arrow'></div></div>").appendTo($container);
            $target.data("popover", $popover);
            var popoverWidth = $popover.outerWidth(),
                popoverHeight = $popover.outerHeight();
            switch(placement) {
                case "top":
                    left = left + width / 2 - popoverWidth / 2;
                    top = top - popoverHeight - 10;
                    break;
                case "bottom":
                    left = left + width / 2 - popoverWidth / 2;
                    top = top + height + 10;
                    break;
                case "right":
                    left = left + width + 10;
                    top = top + height / 2 - popoverHeight / 2;
                    break;
                default: 
                    left = left - popoverWidth - 10;
                    top = top + height / 2 - popoverHeight / 2;
                    break;
            }
            $popover.css({left: left, top: top});
        },
        hide: function(target) {
            var $target = $(target);
            var $popover = $target.data("popover");
            if ($popover) {
                $popover.remove();
                $target.removeData("popover");
            }
        }
    };
    var layout = {
        init: function() {
            var that = this;
            $.fn.layout = function(callback) {
                that.initLayout(this, callback);
            };
        },
        initLayout: function(target, callback) {
            var that = this;
            var $target = $(target);
                $topPanel = $target.children(".layout-top"),
                $leftPanel = $target.children(".layout-left"),
                $centerPanel = $target.children(".layout-center"),
                $rightPanel = $target.children(".layout-right"),
                $bottomPanel = $target.children(".layout-bottom"),
                top1 = $topPanel.length > 0 ? $topPanel.outerHeight() + 12 : 12,
                left = $leftPanel.length > 0 ? $leftPanel.width() + 12 : 12,
                right = $rightPanel.length > 0 ? $rightPanel.width() + 12 : 12,
                bottom = $bottomPanel.length > 0 ? $bottomPanel.height() + 12 : 12;
            $leftPanel.css({top: top1, bottom: bottom});
            $rightPanel.css({top: top1, bottom: bottom});
            $centerPanel.css({top: top1, right: right, bottom: bottom, left: left});
            $target.addClass("layout");
            if ($topPanel.attr("data-close")) {
                $topPanel.append("<div class='close'></div>");
                $target.append("<div class='open open-top'></div>");
            }
            if ($leftPanel.attr("data-close")) {
                $leftPanel.append("<div class='close'></div>");
                $centerPanel.append("<div class='open open-left'></div>");
            }
            if ($rightPanel.attr("data-close")) {
                $rightPanel.append("<div class='close'></div>");
                $centerPanel.append("<div class='open open-right'></div>");
            }
            if ($bottomPanel.attr("data-close")) {
                $bottomPanel.append("<div class='close'></div>");
                $target.append("<div class='open open-bottom'></div>");
            }
            that.resize(target, callback);
            var param = {
                topPanel: $topPanel,
                rightPanel: $rightPanel,
                bottomPanel: $bottomPanel,
                leftPanel: $leftPanel,
                centerPanel: $centerPanel,
                top: top1,
                right: right,
                bottom: bottom,
                left: left
            };
            that.initEvent(target, param, callback);
        },
        resize: function(target, callback) {
            var $target = $(target);
            var $panels = $target.children(".panel");
            for (var i = 0; i < $panels.length; i++) {
                var $panel = $panels.eq(i);
                if (!$panel.is(":visible")) continue;
                var $header = $panel.children(".panel-header");
                var $body1 = $panel.children(".panel-body");
                $body1.css({height: $panel.height() - $header.height()});
            }
            if (callback) {
                callback();
            }
        },
        initEvent: function(target, param, callback) {
            var that = this,
                $target = $(target),
                $centerPanel = param.centerPanel;
            param.opentop = $target.children(".open-top");
            param.openright = $centerPanel.children(".open-right");
            param.openbottom = $target.children(".open-bottom");
            param.openleft = $centerPanel.children(".open-left");
            $target.children(".panel").children(".close").on("click", function(e) {
                var $close = $(this);
                var $panel = $close.parent();
                if (!$panel[0].className.match(/top|right|bottom|left/)) return;
                var position = $panel[0].className.match(/top|right|bottom|left/)[0];
                var style = {};
                var style1 = {};
                style[position] = 12;
                $centerPanel.css(style);
                if (/top|bottom/.test(position)) {
                    param.leftPanel.css(style);
                    param.rightPanel.css(style);
                    style1[position] = - param[position + "Panel"].height();
                } else {
                    style1[position] = - param[position + "Panel"].width();
                }
                param[position + "Panel"].animate(style1, function() {
                    param[position + "Panel"].hide();
                    param["open" + position].show();
                });
                that.resize(target, callback);
            });
            $target.find(".open").on("click", function(e) {
                var $open = $(this);
                if (!$open[0].className.match(/top|right|bottom|left/)) return;
                var position = $open[0].className.match(/top|right|bottom|left/)[0];
                var style = {}, style1 = {};
                style[position] = 0;
                param[position + "Panel"].show().animate(style, function() {
                    param["open" + position].hide();
                    if (/top|bottom/.test(position)) {
                        style1[position] = param[position + "Panel"].outerHeight() + 12;
                        param.leftPanel.css(style1);
                        param.rightPanel.css(style1);
                    } else {
                        style1[position] = param[position + "Panel"].width() + 12;
                    }
                    $centerPanel.css(style1);
                    that.resize(target, callback);
                });
            });
            $(window).on("resize", function(e) {
                that.resize(target, callback);
            });
        }
    };
    //window
    var lavaWindow = {
        init: function() {
            var that = this;
            $.fn.window = function(options, param) {
                if (typeof options == "string") {
                    that[options](this, param);
                } else {
                    $.each(this, function(index, el) {
                        var opt = {};
                        $.extend(opt, options);
                        $(this).data("window", {options: opt});
                        that.initWindow(this);
                    });
                }
            };
        },
        initWindow: function(target) {
            var that = this;
            var $target = $(target);
            var options = $target.data("window").options;
            var style = {};
            for (var i in options) {
                if (/^(top|right|bottom|left|width|height)$/.test(i)) {
                    style[i] = options[i];
                }
            }
            if (options.hidden) css.display = "none";
            $target.css(style).addClass("window");
            if (options.draggable) $target.addClass("draggable");
            if (options.closable) $target.children(".panel-header").append("<span class='close'>X</span>");
            options.oldTop = $target.offset().top;
            options.oldLeft = $target.offset().left;
            that.initEvent($target, options);
        },
        initEvent: function($target, options) {
            if (options.closable) {
                $target.children(".panel-header").children(".close").on("mousedown click", function(e) {
                    if (e.type == "mousedown") {
                        e.stopPropagation();
                    } else {
                        $target.hide();
                        e.stopPropagation();
                        if (options.onClose) options.onClose();
                    }
                });
            }
            if (options.draggable) {
                var $header = $target.children(".panel-header");
                var $parent = $target.offsetParent();
                var offsetX, offsetY, oldX, oldY, drag = false;
                // if ($parent[0].tagName.toUpperCase() == "HTML") $parent = $body;
                $header.on("mousedown", function(e) {
                    var $clone = $("<div class='window-clone'></div>").appendTo($body);
                    options.clone = $clone;
                    $clone.css({width: $target.width(), height: $target.height(), top: options.oldTop, left: options.oldLeft});
                    offsetX = e.offsetX;
                    offsetY = e.offsetY;
                    oldX = e.clientX;
                    oldY = e.clientY;
                    drag = true;
                });
                $body.on("mousemove mouseleave mouseup", function(e) {
                    // console.log(e);
                    if (drag && e.type == "mousemove") {
                        var left = e.clientX - offsetX;
                        var top = e.clientY - offsetY;
                        options.clone.css({top: top, left: left});
                    } else if (e.type == "mouseleave" || e.type == "mouseup") {
                        if (options.clone) {
                            drag = false;
                            options.clone.remove();
                            options.clone = null;
                            var leftSpan = e.clientX - oldX;
                            var topSpan = e.clientY - oldY;
                            $target.css({left: options.oldLeft + leftSpan, top: options.oldTop + topSpan});
                            options.oldLeft += leftSpan;
                            options.oldTop += topSpan;
                        }
                    }
                });
            }
        },
        show: function(target) {
            $(target).show();
        },
        hide: function(target) {
            $(target).hide();
        }
    };
    //alert 提示框
    var lavaAlert = {
        init: function() {
            $body.delegate(".alert>.close", "click", function(e) {
                $(this).parent().remove();
            });
        }
    };
    app.init();
})(jQuery, window);