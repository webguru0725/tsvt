function getConfigMK(cookie, key) {
    if (!document.cookie) return null;
    var reg = new RegExp(cookie + '\\=([{}0-9a-zA-Z%-_:]*)(;|$)');
    var matchArray = document.cookie.match(reg);
    if (matchArray) {
        if (matchArray[1]) {
            return JSON.parse(decodeURIComponent(matchArray[1]))[key];
        } else {
            return null;
        }
    } else {
        return null;
    }
}
function Map_Config(mapType, mapKey, callBack) {
    if (mapKey && typeof mapKey === 'function' && !callBack) {
        callBack = mapKey;
        this.mapKey = undefined;
    } else {
        this.mapKey = mapKey;
    }
    this.mapType = mapType || 'GMap';
    this.mapKey = this.mapKey;
    this.version = '3.0.0.0';
    this.path = '';
    var that = this;
    var scriptPathArray = document.getElementsByTagName('script');
    for (var i = 0; i < scriptPathArray.length; i++) {
        if (scriptPathArray[i].innerText == '') {
            var temp = scriptPathArray[i].src; //.getAttribute('src');
            if (temp.indexOf('config.js') > 0) {
                that.path = temp.substring(0, temp.length - 'config.js'.length);
                break;
            }
        }
    }
    that.loadScriptOrCss('link', that.path + '/Leaflet/leaflet.css', function () {
        that.loadScriptOrCss('script', that.path + '/Leaflet/leaflet.js', function () {
            that.loadScriptOrCss('script', that.path + '/Lib/core.js', function () {
                that.loadScriptOrCss('script', that.path + '/Plugins/Cookie/js.cookie.min.js', function () {
                    window.CQRMMapKey = window.CQRMMapKey || getConfigMK('wcms5c', 'MK');
                    that.loadPlugins();
                    if (that.mapType == 'BMap') {
                        that.loadScriptOrCss('script', that.path + '/BMap/proj4-compressed.js', function () {
                            that.loadScriptOrCss('script', that.path + '/BMap/proj4leaflet.js', function () {
                                callBack();
                            });
                        });
                    } else {
                        callBack();
                    }
                });
            });
        });
    });

    window.CQRMMapType = that.mapType;
    window.CQRMMapKey = that.mapKey;
    window.CQRMMapRoot = that.path;
}
Map_Config.prototype.loadPlugins = function () {
    var that = this;
    that.loadScriptOrCss('link', that.path + '/Plugins/BeautifyMarker/leaflet-beautify-marker-icon.css', function () {
        that.loadScriptOrCss(
            'script',
            that.path + '/Plugins/BeautifyMarker/leaflet-beautify-marker-icon.js',
            function () {
                that.loadScriptOrCss(
                    'script',
                    that.path + '/Plugins/BeautifyMarker/leaflet-beautify-marker.js',
                    function () {
                        return;
                    }
                );
            }
        );
    });
};
/**
 *
 */
Map_Config.prototype.loadScriptOrCss = function (type, url, callback) {
    var node = document.createElement(type);
    node.onload = node.onreadystatechange = function () {
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
};
