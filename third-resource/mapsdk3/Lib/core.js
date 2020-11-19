/*
Dis:地图核心类
Author:level
DateTime:2017.01.01
*/
function Map_CommonFun() {}
//方向到图标的转换
Map_CommonFun.prototype.convertDirectionToIcon = function (angle) {
    var intAngle = parseInt(angle);
    while (intAngle > 360) {
        intAngle = intAngle - 360;
    }
    return Math.floor((intAngle + 22) / 45);
};
/**
 * 打印
 */
Map_CommonFun.prototype.log = function (type, content) {
    if (window.console) {
        switch (type) {
            case 'log':
                window.console.log(content);
                break;
            case 'error':
                window.console.error(content);
                break;
            default:
                window.console.info(content);
                break;
        }
    }
};
/**
 * 获取图片路径
 */
Map_CommonFun.prototype.getImageSrc = function (direction, status, lock) {
    var png = '.png';
    if (lock) {
        png = '.l.png';
    }
    return window.CQRMMapRoot + '/Images/arrows/' + status + '/' + MapCommonFun.convertDirectionToIcon(direction) + png;
};
var MapCommonFun = new Map_CommonFun();
/**
 * 地图瓦片提供对象
 */
var Map_Providers = {
    TianDiTu: {
        Normal: {
            Map: 'http://t{s}.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}',
            Annotion: 'http://t{s}.tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}'
        },
        Satellite: {
            Map: 'http://t{s}.tianditu.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}',
            Annotion: 'http://t{s}.tianditu.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}'
        },
        Terrain: {
            Map: 'http://t{s}.tianditu.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}',
            Annotion: 'http://t{s}.tianditu.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}'
        },
        Subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
    },
    GaoDe: {
        key: '',
        Normal: {
            Map: 'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
        },
        Satellite: {
            Map: 'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
            Annotion: 'http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
        },
        Subdomains: ['1', '2', '3', '4']
    },
    //http://mt2.google.cn/vt/lyrs=m@258000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Ga
    GoogleCN: {
        key: '',
        Normal: {
            Map: 'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}'
        },
        Satellite: {
            Map: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'
        },
        Subdomains: []
    },
    GoogleEN: {
        key: '',
        Normal: {
            Map: 'https://mt{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}&hl=en'
        },
        Satellite: {
            Map: 'https://mt{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}'
        },
        Subdomains: [0, 1, 2, 3]
    },
    Geoq: {
        key: '',
        Normal: {
            Map: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
            Color: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetColor/MapServer/tile/{z}/{y}/{x}',
            PurplishBlue:
                'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
            Gray: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
            Warm: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}',
            Cold: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetCold/MapServer/tile/{z}/{y}/{x}'
        },
        Subdomains: []
    },

    Baidu: {
        key: '',
        Normal: {
            Map: 'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl&udt=20161216&scaler=1'
        },
        Subdomains: [0, 1, 2, 3, 4]
    },

    OpenStreatMap: {
        key: '',
        Normal: {
            //Map: "https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw"
            Map: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        },
        Subdomains: ['a', 'b', 'c']
    }
};
/***********************************
Interface:接口部分(地图接口部分)
***************************************/
/*
Class:地图
*/
function CqrmMap(divId) {
    this.divObject = document.getElementById(divId);
    this.mapObject = null;
}
/*
Method:创建地图
*/
CqrmMap.prototype.Map = function () {
    if (this.mapObject) {
        return null;
    }
    if (this.divObject) {
        var map = new Map_Map(this.divObject);
        this.mapObject = map.mapObject;
        return map;
    } else {
        MapCommonFun.log('error', new Error('DOM id is null'));
    }
};
/*
Method:创建地图icon
*/
CqrmMap.prototype.Icon = function () {
    return new Map_Icon(this.mapObject);
};
/*
Method:创建车辆icon
*/
CqrmMap.prototype.CarIcon = function () {
    return new Map_CarIcon(this.mapObject);
};
/**
 * CarIconList H5
 */
CqrmMap.prototype.CarIconList = function () {
    return new CarIconList(this.mapObject);
};
/*
Method:创建地图线路
*/
CqrmMap.prototype.Line = function () {
    return new Map_Line(this.mapObject);
};
/*
Method:创建地图围栏
*/
CqrmMap.prototype.Fence = function () {
    return new Map_Fence(this.mapObject);
};
/*
Method:创建地图圆形
*/
CqrmMap.prototype.Circle = function () {
    return new Map_Circle(this.mapObject);
};
/*
Method:创建地图矩形
*/
CqrmMap.prototype.Rectangle = function () {
    return new Map_Rectangle(this.mapObject);
};
/*---------------------------------------------------接口结束--------------------------------------------------------*/
/**************************************
Method:创建地图
[parms1]：地图div id
[parms2]：地图配置   http://blog.csdn.net/hdtrs2010/article/details/24963265
***************************************/
/*创建地图*/
function Map_Map(divId) {
    this.MAXZOOM = 10;
    this.MINZOOM = 0;
    this.DEFAULT_CENTER = L.latLng(30.322, 108.552);
    this.DEFAULT_ZOOM = 4;
    this.hadZoomInOut = false;
    var tileUrl = null;
    var subdomainsArray = [];
    var copyStr = '';
    var copyUrl = '';
    var crsObj = L.CRS.EPSG3857;
    var tmsFlag = false;
    switch (CQRMMapType) {
        case 'GMap_CN':
            this.MAXZOOM = 21;
            this.MINZOOM = 3;
            tileUrl = Map_Providers.GoogleCN.Normal.Map;
            subdomainsArray = Map_Providers.GoogleCN.Subdomains;
            copyStr = 'google map';
            copyUrl = 'http://www.google.cn/maps';
            break;
        case 'GMap_EN':
            this.MAXZOOM = 21;
            this.MINZOOM = 3;
            tileUrl = Map_Providers.GoogleEN.Normal.Map;
            subdomainsArray = Map_Providers.GoogleEN.Subdomains;
            copyStr = 'google map';
            copyUrl = 'http://www.google.com/maps';
            break;
        case 'BMap':
            this.MAXZOOM = 19;
            this.MINZOOM = 5;
            this.DEFAULT_ZOOM = 5;
            tileUrl = Map_Providers.Baidu.Normal.Map;
            subdomainsArray = Map_Providers.Baidu.Subdomains;
            copyStr = 'Baidu map';
            copyUrl = 'http://map.baidu.com/';
            tmsFlag = true;
            //http://www.cnblogs.com/cglNet/archive/2013/11/26/3443637.html
            //http://blog.csdn.net/u012087400/article/details/53744756  百度地图纠偏
            crsObj = new L.Proj.CRS(
                'EPSG:900913',
                '+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs',
                {
                    //crsObj = new L.Proj.CRS('EPSG:3395',
                    //   '+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs', {
                    resolutions: (function () {
                        var level = 19;
                        var res = [];
                        res[0] = Math.pow(2, 18);
                        for (var i = 1; i < level; i++) {
                            res[i] = Math.pow(2, 18 - i);
                        }
                        return res;
                    })(),
                    origin: [0, 0],
                    bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244])
                }
            );
            break;
        case 'OSMap':
            this.MAXZOOM = 18;
            this.MINZOOM = 0;
            tileUrl = Map_Providers.OpenStreatMap.Normal.Map;
            subdomainsArray = Map_Providers.OpenStreatMap.Subdomains;
            copyStr = 'OpenStreetMap';
            copyUrl = 'http://osm.org/copyright';
            break;
        default:
            break;
    }
    if (tileUrl) {
        this.mapObject = L.map(divId, {
            crs: crsObj,
            center: this.DEFAULT_CENTER,
            zoom: this.DEFAULT_ZOOM,
            zoomControl: false
        });
        L.tileLayer(tileUrl, {
            maxZoom: this.MAXZOOM,
            minZoom: this.MINZOOM,
            subdomains: subdomainsArray,
            attribution: 'Map data &copy; <a href="' + copyUrl + '" target="_blank">' + copyStr + '</a>',
            tms: tmsFlag,
            crossOrigin: true
        }).addTo(this.mapObject);
        L.control.scale().addTo(this.mapObject);
    } else {
        MapCommonFun.log('error', new Error('maptype error'));
    }
}
//为了兼容继续留下接口
Map_Map.prototype.setOptions = function () {
    return;
};
//获取地图中心
Map_Map.prototype.getCenter = function () {
    var center = this.mapObject.getCenter();
    return center.lat.toFixed(6) + ',' + center.lng.toFixed(6);
};
//设置地图中心
Map_Map.prototype.setCenter = function (lat, lng) {
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    var center = L.latLng(lat, lng);
    this.mapObject.panTo(center);
};
//获取地图缩放级别
Map_Map.prototype.getZoom = function () {
    return this.mapObject.getZoom();
};
//设置地图缩放级别
Map_Map.prototype.setZoom = function (number) {
    number = parseInt(number);
    if (number >= this.MINZOOM && number <= this.MAXZOOM) {
        this.mapObject.setZoom(number);
    }
};
//设置地图最大缩放级别
Map_Map.prototype.setMaxZoom = function (number) {
    number = parseInt(number);
    if (number >= this.MINZOOM && number <= this.MAXZOOM) {
        this.mapObject.setMaxZoom(number);
        this.MAXZOOM = number;
    }
};
//设置地图最小缩放级别
Map_Map.prototype.setMinZoom = function (number) {
    number = parseInt(number);
    if (number >= this.MINZOOM && number <= this.MAXZOOM) {
        this.mapObject.setMinZoom(number);
        this.MINZOOM = number;
    }
};
//监听地图事件
Map_Map.prototype.addEventListener = function (callBack) {
    this.mapObject.on('zoomend', function (e) {
        callBack('onzoomend', e);
    });
    this.mapObject.on('moveend', function (e) {
        callBack('ondragend', e);
    });
    this.mapObject.on('resize', function (e) {
        callBack('onresize', e);
    });
};
//经纬度转换为像素点
Map_Map.prototype.pointToPixel = function (lat, lng) {
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    var latLng = L.latLng(lat, lng);
    var point = this.mapObject.latLngToContainerPoint(latLng);
    return point.x + ',' + point.y;
};
//像素点转换为经纬度
Map_Map.prototype.pixelToPoint = function (x, y) {
    x = parseInt(x);
    y = parseInt(y);
    var point = L.point(x, y);
    var latLng = this.mapObject.containerPointToLatLng(point);
    return latLng.lat.toFixed(6) + ',' + latLng.lng.toFixed(6);
};
//地图容器改变[需要手动触发]
Map_Map.prototype.resize = function () {
    this.mapObject.invalidateSize({});
};
//获取地图区域东北点、西南点
Map_Map.prototype.getBounds = function () {
    var bound = this.mapObject.getBounds();
    var ne = bound.getNorthEast();
    var sw = bound.getSouthWest();
    return ne.lat.toFixed(6) + ',' + ne.lng.toFixed(6) + ';' + sw.lat.toFixed(6) + ',' + sw.lng.toFixed(6);
};
//https://geocoder.opencagedata.com/
//获取经纬度点的位置需要依赖第三方的
Map_Map.prototype.getPosition =
    (window.mapCommon && window.mapCommon.getPosition) ||
    function (lat, lng, fun) {
        var point = L.latLng(lat, lng);
        var api_key = '';
        var api_url = '';
        var req = null;
        if (CQRMMapType === 'BMap') {
            var callbackName = 'jsonp_' + new Date().getTime();
            api_key = 'K3yDzvlwWbDlvSQyvwCLd0l5';
            api_url =
                'http://api.map.baidu.com/geocoder/v2/?callback=' +
                callbackName +
                '&location=' +
                point.lat +
                ',' +
                point.lng +
                '&output=json&ak=' +
                api_key;
            var oHead = document.getElementsByTagName('head')[0];
            var oS = document.createElement('script');
            oHead.appendChild(oS);
            //创建jsonp回调函数
            window[callbackName] = function (response) {
                oHead.removeChild(oS);
                clearTimeout(oS.timer);
                window[callbackName] = null;
                if (response.status === 0) {
                    fun(response.result.formatted_address);
                } else {
                    fun(response.status);
                }
            };
            //发送请求
            oS.src = api_url;
            //超时处理
            oS.timer = setTimeout(function () {
                window[callbackName] = null;
                oHead.removeChild(oS);
                fun('timeout');
            }, 3000); //3s超时
        } else if (CQRMMapType == 'GMap' || CQRMMapType == 'GMap_CN' || CQRMMapType == 'GMap_EN') {
            api_key = window.CQRMMapKey || 'AIzaSyBcdRP1MKeic1gp_CT1Afd5Gew1IautTWk';
            api_url =
                'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
                point.lat +
                ',' +
                point.lng +
                '&key=' +
                api_key;
            req = new XMLHttpRequest() || new ActiveXObject('Msxml2.XMLHTTP') || new ActiveXObject('Microsoft.XMLHTTP');
            req.onload = function () {
                if (req.readyState == 4 && req.status == 200) {
                    var response = JSON.parse(this.responseText);
                    if (response.results.length > 0) {
                        fun(response.results[0].formatted_address);
                    } else {
                        fun(response.status);
                    }
                } else {
                    fun('');
                }
            };
            req.open('GET', api_url, true);
            req.send();
        } else if (CQRMMapType == 'OSMap') {
            // OSMap 地图地理位置查询接口
            api_url =
                'https://nominatim.openstreetmap.org/reverse?format=json' +
                '&lat=' +
                point.lat +
                '&lon=' +
                point.lng +
                '&zoom=18&addressdetails=2';
            req = new XMLHttpRequest() || new ActiveXObject('Msxml2.XMLHTTP') || new ActiveXObject('Microsoft.XMLHTTP');
            req.onload = function () {
                if (req.readyState == 4 && req.status == 200) {
                    var response = JSON.parse(this.responseText);
                    if (response.display_name.length > 0) {
                        fun(response.display_name);
                    } else {
                        fun('');
                    }
                } else {
                    fun('');
                }
            };
            req.open('GET', api_url, true);
            req.send();
        }
    };
//通过位置定位地图
Map_Map.prototype.searchPosition = function (address, fun) {
    var api_key = 'AIzaSyBcdRP1MKeic1gp_CT1Afd5Gew1IautTWk';
    var api_url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + api_key;
    var req = new XMLHttpRequest() || new ActiveXObject('Msxml2.XMLHTTP') || new ActiveXObject('Microsoft.XMLHTTP');
    req.onload = function () {
        if (req.readyState === 4 && req.status === 200) {
            var response = JSON.parse(this.responseText);
            fun(response.results[0].geometry.location.lat + ',' + response.results[0].geometry.location.lng);
        } else {
            fun('');
        }
    };
    req.open('GET', api_url, true);
    req.send();
};
//拉宽放大或缩小
//in  放大
//out 缩小
Map_Map.prototype.boxZoomInOrZoomOut = function (arg) {
    if (this.hadZoomInOut) {
        return;
    }
    var option = {
        color: 'blue',
        opacity: 0.8,
        weight: 1,
        fillColor: '#FF0000',
        fillOpacity: 0.1
    };
    var rectangle = L.rectangle(L.latLngBounds([0, 0], [0, 0]), option).addTo(this.mapObject);
    var map = this.mapObject;
    var startPoint = {}; //记录起始点坐标
    var clickCount = 0; //点击次数
    var latlngs = [];
    var that = this;
    var moveEvent = function (e) {
        var endPoint = e.latlng;
        latlngs = [
            [startPoint.lat, startPoint.lng],
            [startPoint.lat, endPoint.lng],
            [endPoint.lat, endPoint.lng],
            [endPoint.lat, startPoint.lng]
        ];
        rectangle.setLatLngs(latlngs);
    };
    var rightclickEvent = function (e) {
        rectangle.remove();
        //右键取消所有操作
        map.off('click', clickEvent);
        map.off('mousemove', moveEvent);
        map.off('contextmenu', rightclickEvent);

        that.hadZoomInOut = false;
    };
    var clickEvent = function (e) {
        clickCount++;
        if (clickCount == 1) {
            startPoint = e.latlng;
            latlngs = [startPoint, startPoint, startPoint, startPoint];
            rectangle.setLatLngs(latlngs);
            map.on('mousemove', moveEvent);
        } else {
            var currentZoom = map.getZoom();
            var bounds = L.latLngBounds(latlngs[0], latlngs[2]);
            var newCenter = bounds.getCenter(); //矩形中心点
            currentZoom = arg.toLowerCase() == 'in' ? currentZoom + 1 : currentZoom - 1;
            map.setView(newCenter, currentZoom);

            rectangle.setLatLngs([
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0]
            ]);
            clickCount = 0;
            map.off('mousemove', moveEvent);
        }
    };
    map.on('click', clickEvent);
    map.on('contextmenu', rightclickEvent);
    that.hadZoomInOut = true;
};
//获取用户位置信息
Map_Map.prototype.getUserLocation = function (fun) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                fun(position.coords.latitude + ',' + position.coords.longitude);
            },
            function () {
                fun('');
            }
        );
    }
};
//点是否在多边形内
Map_Map.prototype.isPointInPolygon = function (latlng, latlngArray) {
    var j = 0;
    var oddNodes = false;
    var x = parseFloat(latlng.split(',')[1]); //116.2529
    var y = parseFloat(latlng.split(',')[0]); //39.5420

    for (var i = 0, length = latlngArray.length; i < length; i++) {
        j++;
        if (j == length) {
            j = 0;
        }
        var pointA = { lat: parseFloat(latlngArray[i].split(',')[0]), lng: parseFloat(latlngArray[i].split(',')[1]) };
        var pointB = { lat: parseFloat(latlngArray[j].split(',')[0]), lng: parseFloat(latlngArray[j].split(',')[1]) };
        if ((pointA.lat < y && pointB.lat >= y) || (pointB.lat < y && pointA.lat >= y)) {
            if (pointA.lng + ((y - pointA.lat) / (pointB.lat - pointA.lat)) * (pointB.lng - pointA.lng) < x) {
                oddNodes = !oddNodes;
            }
        }
    }
    return oddNodes;
};
/**
 * 地图移动到视窗
 */
function getViewport(latlngArray) {
    if (latlngArray.length === 0) {
        return null;
    }
    var minX = latlngArray[0].lat,
        minY = latlngArray[0].lng,
        maxX = latlngArray[0].lat,
        maxY = latlngArray[0].lng;
    for (var i = 1; i < latlngArray.length; i++) {
        var pt = latlngArray[i];
        if (pt.lat > maxX) {
            maxX = pt.lat;
        }

        if (pt.lat < minX) {
            minX = pt.lat;
        }

        if (pt.lng > maxY) {
            maxY = pt.lng;
        }

        if (pt.lng < minY) {
            minY = pt.lng;
        }
    }
    var nwPoint = L.latLng(minX, minY);
    var sePoint = L.latLng(maxX, maxY);
    var bounds = L.latLngBounds(nwPoint, sePoint);

    return bounds;
}
/**************************************
Method:创建小图标
[parms1]：地图对象
***************************************/
function Map_Icon(map) {
    this.marker = null;
    this.icon = null;
    this.infoWindow = null;
    this.map = map;
    this.center = null;
    this.id = null;
    this.closeEvent = null;
    this.content = null;
}
//获取icon位置
Map_Icon.prototype.getPosition = function () {
    return this.center.lat.toFixed(6) + ',' + this.center.lng.toFixed(6);
};
//获取Icon小图标
Map_Icon.prototype.getIcon = function () {
    return this.icon.options.iconUrl;
};
//设置icon位置
Map_Icon.prototype.setPosition = function (latlng) {
    var latlngS = latlng.split(',');
    var lat = parseFloat(latlngS[0]);
    var lng = parseFloat(latlngS[1]);
    this.center = L.latLng(lat, lng);
    this.marker.setLatLng(this.center);
};
//设置icon图标
Map_Icon.prototype.setIcon = function (path, size, anchor) {
    var obj = {
        iconUrl: path
    };
    if (size) {
        var point1 = size.split(',');
        var w = parseInt(point1[0]);
        var h = parseInt(point1[1]);
        obj.iconSize = [w, h];
    }
    if (anchor) {
        var point2 = anchor.split(',');
        var x = parseInt(point2[0]);
        var y = parseInt(point2[1]);
        obj.iconAnchor = [x, y];
    }
    this.icon = L.icon(obj);
    this.marker.setIcon(this.icon);
};
//移除Icon
Map_Icon.prototype.clear = function () {
    if (this.marker) {
        this.marker.remove();
    }
};
//添加标记
Map_Icon.prototype.drawSign = function (infoOptions) {
    var that = this;
    var clickEvent = function (e) {
        that.marker = L.marker(e.latlng, {
            icon: L.icon({ iconUrl: 'Images/flag_blue.png', iconAnchor: [8, 8] }),
            draggable: true
        }).addTo(that.map);
        if (infoOptions.content) {
            var popup = L.popup().setLatLng(e.latlng).setContent(infoOptions.content);
            that.content = infoOptions.content;
            that.marker.on('popupclose', function (e) {
                if (infoOptions.callBack) {
                    that.closeEvent = infoOptions.callBack;
                    infoOptions.callBack();
                }
            });
            that.marker.bindPopup(popup).openPopup();
        }
        that.map.off('click', clickEvent);
    };
    this.map.on('click', clickEvent);
};
//创建图标
Map_Icon.prototype.loadIcon = function (id, latlng, imgSrc, content, clickCallBack, size, anchor) {
    var latlngS = latlng.split(',');
    var lat = parseFloat(latlngS[0]);
    var lng = parseFloat(latlngS[1]);
    var obj = {
        iconUrl: imgSrc
    };
    if (size) {
        var point1 = size.split(',');
        var w = parseInt(point1[0]);
        var h = parseInt(point1[1]);
        obj.iconSize = [w, h];
    }
    if (anchor) {
        var point2 = anchor.split(',');
        var x = parseInt(point2[0]);
        var y = parseInt(point2[1]);
        obj.iconAnchor = [x, y];
    }
    this.id = id;
    this.center = L.latLng(lat, lng);
    this.icon = L.icon(obj);
    this.marker = L.marker(this.center, { icon: this.icon }).addTo(this.map);
    this.content = content;
    var that = this;
    this.marker.on('click', function () {
        if (clickCallBack) {
            clickCallBack(id);
        }
        if (content) {
            if (that.infoWindow === null) {
                that.infoWindow = L.popup().setLatLng(that.center).setContent(content);
                that.marker.bindPopup(that.infoWindow);
            } else {
                that.infoWindow.setContent(content);
            }
        }
    });
};
//设定气泡内容
Map_Icon.prototype.setInfoWindowContent = function (content) {
    this.content = content;
    if (this.infoWindow) {
        this.infoWindow.setContent(content);
    } else {
        this.infoWindow = L.popup().setLatLng(this.center).setContent(content);
        var that = this;
        this.infoWindow.on('popupclose', function () {
            if (that.closeEvent) {
                that.closeEvent(that.id);
            }
        });
    }
};
Map_Icon.prototype.openInfoWindow = function (flag) {
    if (flag) {
        if (this.infoWindow) {
            this.infoWindow.setContent(this.content);
        } else {
            this.infoWindow = L.popup().setLatLng(this.center).setContent(this.content);
        }
        this.marker.bindPopup(this.infoWindow).openPopup();
    } else {
        this.marker.closePopup();
    }
};
//监听气泡关闭事件
Map_Icon.prototype.addInfoWindowCloseListener = function (callBack) {
    this.closeEvent = callBack;
};
//创建图片并打开气泡
Map_Icon.prototype.loadIconAndOpenInfoWindow = function (id, latlng, imgSrc, content, clickCallBack, size, anchor) {
    var latlngS = latlng.split(',');
    var lat = parseFloat(latlngS[0]);
    var lng = parseFloat(latlngS[1]);
    var obj = {
        iconUrl: imgSrc
    };
    if (size) {
        var point1 = size.split(',');
        var w = parseInt(point1[0]);
        var h = parseInt(point1[1]);
        obj.iconSize = [w, h];
    }
    if (anchor) {
        var point2 = anchor.split(',');
        var x = parseInt(point2[0]);
        var y = parseInt(point2[1]);
        obj.iconAnchor = [x, y];
    }
    this.id = id;
    this.center = L.latLng(lat, lng);
    this.icon = L.icon(obj);
    this.marker = L.marker(this.center, { icon: this.icon }).addTo(this.map);
    var that = this;
    this.marker.on('click', function () {
        if (clickCallBack) {
            clickCallBack(id);
        }
        that.infoWindow = L.popup().setLatLng(that.center).setContent(content);
        that.marker.bindPopup(that.infoWindow).openPopup();
    });
    if (content) {
        if (that.infoWindow === null) {
            that.infoWindow = L.popup().setLatLng(that.center).setContent(content);
            that.marker.bindPopup(that.infoWindow).openPopup();
        }
    }
};
/**
 * 加载自定义Html的Icon
 */
Map_Icon.prototype.loadCustomIcon = function (latlng, customHtml, id, clickCallBack) {
    var latlngS = latlng.split(',');
    var lat = parseFloat(latlngS[0]);
    var lng = parseFloat(latlngS[1]);
    this.center = L.latLng(lat, lng);
    this.id = id;
    if (typeof customHtml == 'string') {
        var tempNode = document.createElement('div');
        tempNode.innerHTML = customHtml;
        customHtml = tempNode.firstChild;
    }
    var options = { borderStyle: 'none', backgroundColor: 'none', textColor: 'none', html: customHtml.outerHTML };
    this.marker = L.marker(this.center, { icon: L.BeautifyIcon.icon(options) }).addTo(this.map);
    this.marker.on('click', function () {
        if (clickCallBack) {
            clickCallBack(id);
        }
    });
};
/**
 * 车辆图表H5方式
 */
function CarIconList(map) {
    this.map = map; //地图
    this.imgSize_w = 24;
    this.imgSize_h = 24;
    this.iconImageCacheList = []; //图片缓存队列
    this.renderer = L.canvas().addTo(map); //渲染层
    this.ctx = this.renderer._ctx; //画布
    this.currentZoom = null; //当前层级
    this.dataList = []; //数据列表
    this._init();
}
/**
 * 初始化
 */
CarIconList.prototype._init = function () {
    var that = this;
    this.updateEvent = function (event) {
        that.currentZoom = that.map.getZoom();
        that._redraw();
    };
    this.clickEvent = function (mouseEvent) {
        var point = that.map.latLngToLayerPoint(mouseEvent.latlng);
        var index = that._isClickInCarIcon(point);
        if (index > -1) {
            var data = that.dataList[index];
            var latlng = L.latLng(data.GpsLat, data.GpsLng);
            if (data.popup) {
                //有气泡
                if (!data.popup.isOpen()) {
                    //未打开
                    data.popup.setLatLng(latlng).openOn(that.map);
                }
            } else {
                //没气泡
                var popup = L.popup().setLatLng(latlng).addTo(that.map);
                that.dataList[index].popup = popup;
            }
            if (that.dataList[index].onclickHandler) {
                that.dataList[index].onclickHandler(data);
            }
        }
    };
    this.popupCloseEvent = function (popupEvent) {
        var index = -1;
        for (var i = 0, l = that.dataList.length; i < l; i++) {
            if (that.dataList[i].popup == popupEvent.popup) {
                index = i;
                break;
            }
        }
        if (index > -1) {
            that.dataList[index].popupNeedOpen = false;
        }
    };
    this.map.on('popupclose', this.popupCloseEvent);
    this.renderer.on('update', this.updateEvent);
    this.map.on('click', this.clickEvent);
};
/**
 * 获取视窗大小
 */
CarIconList.prototype._getViewBounds = function () {
    var b = this.map.getBounds();
    var min = this.map.latLngToLayerPoint(b.getNorthWest());
    var max = this.map.latLngToLayerPoint(b.getSouthEast());
    var bounds = L.bounds([min.x, min.y], [max.x, max.y]);
    return bounds;
};
/**
 * 是否在图片上面点击
 */
CarIconList.prototype._isClickInCarIcon = function (point) {
    for (var i = 0, l = this.dataList.length; i < l; i++) {
        if (this.dataList[i].bounds.contains(point)) {
            return i;
        }
    }
    return -1;
};
/**
 * 绘制[已废弃]
 */
CarIconList.prototype._draw = function (oldData, index, data) {
    var bounds = this._getViewBounds();
    var that = this;
    var point = this.map.latLngToLayerPoint([data.GpsLat, data.GpsLng]);
    var imgSrc = MapCommonFun.getImageSrc(data.Direction, data.Status);
    var imgSize_w = 24;
    var imgSize_h = 24;

    if (oldData && oldData.onMap) {
        //已经绘制了
        var oldPoint = this.map.latLngToLayerPoint([oldData.GpsLat, oldData.GpsLng]);
        if (bounds.contains(point)) {
            //新点在视野
            if (data.GpsLat == oldData.GpsLat && data.GpsLng == oldData.GpsLng && data.Status == oldData.Status) {
                //新旧点没变化
                return;
            } else {
                //有变化
                this._getCacheImage(imgSrc, { op: oldPoint, p: point }, function (image, obj) {
                    if (image !== null) {
                        var x = obj.op.x - imgSize_w / 2;
                        var y = obj.op.y - imgSize_h / 2;
                        that.ctx.clearRect(x, y, imgSize_w, imgSize_h);
                        that.ctx.drawImage(image, x, y, imgSize_w, imgSize_h);
                    }
                });
                this.dataList[index].onMap = true;
            }
        } else {
            //不在视野移除旧点
            this.ctx.clearRect(oldPoint.x - imgSize_w / 2, oldPoint.y - imgSize_h / 2, imgSize_w, imgSize_h);
            this.dataList[index].onMap = false;
        }
    } else {
        //没有绘制
        if (bounds.contains(point)) {
            //在视野
            this._getCacheImage(imgSrc, { p: point }, function (image, obj) {
                if (image !== null) {
                    var x = obj.op.x - imgSize_w / 2;
                    var y = obj.op.y - imgSize_h / 2;
                    that.ctx.drawImage(image, x, y, imgSize_w, imgSize_h);
                }
            });
            this.dataList[index].onMap = true;
        } else {
            this.dataList[index].onMap = false;
        }
    }
};
/**
 * 清理画布
 */
CarIconList.prototype._clear = function () {
    var bounds = this._getViewBounds();
    this.ctx.clearRect(bounds.min.x, bounds.min.y, bounds.max.x, bounds.max.y);
};
/**
 * 重绘
 */
CarIconList.prototype._redraw = function () {
    var bounds = this._getViewBounds();
    var that = this;
    this._clear();
    for (var i = 0, l = this.dataList.length; i < l; i++) {
        var data = this.dataList[i];
        var point = this.map.latLngToLayerPoint([data.GpsLat, data.GpsLng]);
        if (bounds.contains(point)) {
            var imgSrc = MapCommonFun.getImageSrc(data.Direction, data.Status);
            //车辆图表
            this._getCacheImage(imgSrc, { op: point, i: i }, function (image, obj) {
                if (image !== null) {
                    var x = obj.op.x - that.imgSize_w / 2;
                    var y = obj.op.y - that.imgSize_h / 2;
                    that.dataList[obj.i].bounds = L.bounds([x, y], [x + that.imgSize_w, y + that.imgSize_h]);
                    that.ctx.drawImage(image, x, y, that.imgSize_w, that.imgSize_h);
                    //车牌号
                    var startX = obj.op.x;
                    var startY = obj.op.y - that.imgSize_h / 2;
                    var fontX = 0;
                    var fontY = 0;
                    that.ctx.moveTo(startX, startY);
                    that.ctx.lineWidth = 1;
                    that.ctx.stokeStyle = '#999999';
                    that.ctx.fillStyle = '#FFFFFF';
                    that.ctx.font = '14px Arial';

                    startX += 6;
                    startY -= 6;
                    that.ctx.lineTo(startX, startY);
                    startX += 34;
                    that.ctx.lineTo(startX, startY);
                    startY -= 20;
                    that.ctx.lineTo(startX, startY);
                    startX -= 80;

                    fontX = startX;
                    fontY = startY;

                    that.ctx.lineTo(startX, startY);
                    startY += 20;
                    that.ctx.lineTo(startX, startY);
                    startX += 34;
                    that.ctx.lineTo(startX, startY);
                    startX += 6;
                    startY += 6;
                    that.ctx.lineTo(startX, startY);
                    that.ctx.stroke();
                    that.ctx.globalCompositeOperation = 'source-over';
                    that.ctx.fill();
                    window.setTimeout(function () {
                        var text = that.dataList[obj.i].CarLicense;
                        var textWidth = that.ctx.measureText(text).width;
                        that.ctx.fillStyle = '#000000';
                        //that.ctx.globalCompositeOperation = 'source-over';
                        that.ctx.fillText(text, fontX + (80 - textWidth) / 2, fontY + 15);
                    }, 10); //加个延迟文字才不会被背景覆盖
                }
            });
            //重绘气泡
            if (data.popup) {
                if (data.popup.isOpen() || data.popupNeedOpen) {
                    var latlng = L.latLng(data.GpsLat, data.GpsLng);
                    data.popup.setLatLng(latlng).addTo(that.map);
                }
            }
        } else {
            //移除气泡
            if (data.popup) {
                if (data.popup.isOpen()) {
                    that.map.closePopup(data.popup);
                    data.popupNeedOpen = true;
                } else {
                    data.popup.remove();
                    data.popup = null;
                }
            }
        }
    }
};
//获取缓存图片
CarIconList.prototype._getCacheImage = function (id, obj, callBack) {
    var isHad = false;
    var that = this;
    for (var i = 0, l = that.iconImageCacheList.length; i < l; i++) {
        if (that.iconImageCacheList[i].id == id) {
            callBack(that.iconImageCacheList[i].image, obj);
            isHad = true;
            break;
        }
    }
    if (!isHad) {
        var icon = new Image();
        icon.src = id;
        icon.onload = function () {
            that.iconImageCacheList.push({
                id: id,
                image: icon
            });
            callBack(icon, obj);
        };
        icon.onerror = function () {
            callBack(null, obj);
        };
    }
};
/**
 * 确定车辆数据的索引
 */
CarIconList.prototype._getDataIndex = function (carlicense) {
    for (var i = 0, l = this.dataList.length; i < l; i++) {
        if (this.dataList[i].CarLicense == carlicense) {
            return i;
        }
    }
    return -1;
};
/**
 * 加载
 * @parm1 gps
 * @parm2 clickCallBack
 */
CarIconList.prototype.push = function (data) {
    data.popupNeedOpen = false;
    var index = this._getDataIndex(data.CarLicense);
    if (index > -1) {
        this.dataList[index] = data;
    } else {
        this.dataList.push(data);
    }
    this._redraw();
};
/**
 * 设定气泡内容
 */
CarIconList.prototype.setInfoWindowContent = function (carlicense, content) {
    var index = this._getDataIndex(carlicense);
    if (index > -1) {
        var data = this.dataList[index];
        if (data.popup) {
            data.popup.setContent(content);
        }
    }
};
/**
 * 移除某一个
 */
CarIconList.prototype.remove = function (carlicense) {
    var index = this._getDataIndex(carlicense);
    this.dataList.splice(index, 1);
    this._redraw();
};
/**
 * 清理
 */
CarIconList.prototype.clear = function () {
    this.dataList.length = 0;
    this._clear();
};
/**************************************
Method:创建车辆图标
parm1:地图
parm2:数据
***************************************/
function Map_CarIcon(map) {
    this.map = map;
    this.marker = null;
    this.data = null;
    this.infoWindow = null;
    this.infoWindowIsOpen = false;
    this.center = null;
    this.tooltip = null;
    this.islock = false;
    this.carid = null;
    this.callback = null;
}
//加载
Map_CarIcon.prototype.load = function (gps, clickCallBack) {
    var imgSrc = MapCommonFun.getImageSrc(gps.Direction, gps.Status); //车辆图标
    var icon = L.icon({ iconUrl: imgSrc, iconAnchor: [12, 8] });
    this.data = gps;
    this.carid = gps.CarId;
    this.center = L.latLng(gps.GpsLat, gps.GpsLng);
    this.marker = L.marker(this.center, { icon: icon }).addTo(this.map);
    this.tooltip = L.tooltip({ permanent: true, direction: 'top' });
    this.marker.bindTooltip(this.tooltip).setTooltipContent(gps.CarLicense);
    this.callback = clickCallBack;
    var that = this;
    this.marker.on('click', function (e) {
        that.callback(gps.CarLicense);
    });
};
//设定气泡内容
Map_CarIcon.prototype.setInfoWindowContent = function (customInfoWindowContent) {
    if (!this.infoWindow) {
        this.infoWindow = L.popup().setLatLng(this.center).setContent(customInfoWindowContent);
        this.marker.on('popupclose', function () {
            this.infoWindowIsOpen = false;
        });
        this.marker.on('popupopen', function () {
            this.infoWindowIsOpen = true;
        });
        this.marker.bindPopup(this.infoWindow);
    } else {
        this.infoWindow.setContent(customInfoWindowContent);
    }
};
//清除
Map_CarIcon.prototype.clear = function () {
    this.tooltip.remove();
    this.infoWindow.remove();
    this.marker.remove();
};
//设定位置
Map_CarIcon.prototype.setPosition = function (gps) {
    if (gps) {
        this.data = gps;
        this.center = L.latLng(gps.GpsLat, gps.GpsLng);
        var icon = null;
        if (this.infoWindow) {
            this.infoWindow.setLatLng(this.center);
        }
        if (this.islock) {
            var imgSrc1 = MapCommonFun.getImageSrc(gps.Direction, gps.Status, true);
            icon = L.icon({ iconUrl: imgSrc1, iconAnchor: [28, 14] });
        } else {
            var imgSrc2 = MapCommonFun.getImageSrc(gps.Direction, gps.Status);
            icon = L.icon({ iconUrl: imgSrc2, iconAnchor: [12, 8] });
        }
        this.marker.setIcon(icon);
        this.marker.setLatLng(this.center);
        this.tooltip.setLatLng(this.center);
    }
};
//设定边框颜色
Map_CarIcon.prototype.setBorderColor = function (hexColor) {
    var border = this.tooltip._contentNode.style.getPropertyValue('border');
    if (border.length === 0 || border == 'none') {
        this.tooltip._contentNode.style.setProperty('border', '1px solid ' + hexColor);
    } else {
        this.tooltip._contentNode.style.setProperty('border', 'none');
    }
};
/**
 * 锁定
 */
Map_CarIcon.prototype.Lock = function () {
    var imgSrc = MapCommonFun.getImageSrc(this.data.Direction, this.data.Status, true);
    var icon = L.icon({ iconUrl: imgSrc, iconAnchor: [28, 14] });
    this.marker.setIcon(icon);
    this.islock = true;
    if (window.LockCarEvent) {
        //ceiba2的方法被之前的同事搞在sdk里面了为了兼容，只能留下来
        LockCarEvent(this.carid, 100);
    }
};
/**
 * 解除锁定
 */
Map_CarIcon.prototype.UnLock = function () {
    var imgSrc = MapCommonFun.getImageSrc(this.data.Direction, this.data.Status);
    var icon = L.icon({ iconUrl: imgSrc, iconAnchor: [16, 8] });
    this.marker.setIcon(icon);
    this.islock = false;
    if (window.UnLockCarEvent) {
        //ceiba2的方法被之前的同事搞在sdk里面了为了兼容，只能留下来
        UnLockCarEvent(this.carid, 101);
    }
};
Map_CarIcon.prototype.getPane = function () {
    return this.marker.getPane();
};
//设定显示层级
Map_CarIcon.prototype.setZIndex = function (value) {
    this.marker.setZIndexOffset(value);
    this.tooltip._contentNode.style.setProperty('z-index', value);
};
//获取图标的中心位置
Map_CarIcon.prototype.getCenter = function () {
    return this.center.lat.toFixed(6) + ',' + this.center.lng.toFixed(6);
};
/**************************************
Method:创建线路
[parms1]：地图对象
***************************************/
function Map_Line(map) {
    var option = {
        color: 'Red',
        opacity: 0.8,
        weight: 2
    };
    this.map = map;
    this.line = L.polyline([], option).addTo(map);
    this.eventArray = [];
    this.markArray = [];
    this.pointArray = [];
}
//增加回调函数
Map_Line.prototype.addHandlerEvent = function (name, callBack) {
    this.line.on(name, function (event) {
        callBack(event.latlng.lat.toFixed(6), event.latlng.lng.toFixed(6));
    });
    var event = { name: name, fun: callBack };
    this.eventArray.push(event);
};
//获取Line路径数组
Map_Line.prototype.getPath = function () {
    var result = [];
    var mvcArray = this.line.getLatLngs();
    for (var i = 0; i < mvcArray.length; i++) {
        result.push(mvcArray[i].lat.toFixed(6) + ',' + mvcArray[i].lng.toFixed(6));
    }
    return result.join(';');
};
//设置线路配置
Map_Line.prototype.setOptions = function (option) {
    option.color = option.strokeColor;
    option.weight = option.strokeWeight;
    option.opacity = option.strokeOpacity;
    this.line.setStyle(option);
};
//设置线路路径
Map_Line.prototype.setPath = function (latlngStr) {
    if (latlngStr === undefined || latlngStr === '') {
        return;
    }
    var latlngArray = latlngStr.split(';');
    var latlngArray2 = [];
    while (latlngArray.length > 0) {
        var temp = latlngArray.shift().split(',');
        if (temp.length < 2) {
            continue;
        }
        latlngArray2.push(L.latLng(temp[0], temp[1]));
    }
    this.line.setLatLngs(latlngArray2).addTo(this.map);
};
//清除线路
Map_Line.prototype.clear = function () {
    while (this.eventArray.length > 0) {
        var temp = this.eventArray.shift();
        this.map.off(temp.name, temp.fun); //清除所有事件
    }
    while (this.markArray.length > 0) {
        this.markArray.shift().remove();
    }
    this.line.remove();
};
//鼠标绘制线路
Map_Line.prototype.drawLine = function () {
    var pathArray = [];
    var markArray = [];
    var that = this;
    that.line.setLatLngs([]);
    var dragEvent = function (event) {
        for (var i = 0, length = markArray.length; i < length; i++) {
            if (markArray[i].getLatLng() == event.latlng) {
                pathArray.splice(i, 1, event.latlng);
                that.line.setLatLngs(pathArray).addTo(that.map);
                return;
            }
        }
    };
    var clickEvent = function (event) {
        var icon = L.icon({ iconUrl: 'Images/flag_blue.png', iconAnchor: [8, 16] });
        var mark = L.marker(event.latlng, { icon: icon, draggable: true }).addTo(that.map);
        mark.on('drag', dragEvent);
        markArray.push(mark);
        pathArray.push(event.latlng);
        that.line.setLatLngs(pathArray).addTo(that.map);
    };
    this.map.on('click', clickEvent);
    this.eventArray.push({ name: 'click', fun: clickEvent });
    this.markArray = markArray;
};
//获取距离
Map_Line.prototype.getDistance = function (unit) {
    var pathArray = [];
    var iconArray = [];
    var that = this;
    var distance = 0;
    this.line.setLatLngs([]);
    var clickEvent = function (event) {
        var icon = L.icon({ iconUrl: 'Images/flag_blue.png', iconAnchor: [8, 16] });
        var overLayerIcon = L.marker(event.latlng, { icon: icon }).addTo(that.map);
        iconArray.push(overLayerIcon);
        pathArray.push(event.latlng);
        that.line.setLatLngs(pathArray).addTo(that.map);
        if (pathArray.length == 1) {
            return;
        } else {
            distance += that.GetDistance(pathArray[pathArray.length - 1], pathArray[pathArray.length - 2]);
            var displayDistance = 0;
            var unitName = 'km';
            var mile = 0.6213712;
            if (unit && unit == 'm') {
                displayDistance = distance * mile;
                unitName = 'mi';
            } else {
                displayDistance = distance;
            }
            overLayerIcon.bindTooltip(displayDistance.toFixed(2) + unitName).openTooltip();
        }
    };
    var rightEvent = function (event) {
        that.clear();
    };
    that.map.on('click', clickEvent);
    that.map.on('rightclick', rightEvent);
    this.eventArray.push({ name: 'click', fun: clickEvent });
    this.eventArray.push({ name: 'rightclick', fun: rightEvent });
    this.markArray = iconArray;
};
//计算长度
Map_Line.prototype.GetDistance = function (startPoint, endPoint) {
    return this.map.distance(startPoint, endPoint) / 1000;
};
//加载线路
Map_Line.prototype.loadLine = function (latlngStr) {
    if (latlngStr === undefined || latlngStr === '') {
        return;
    }
    var latlngArray = latlngStr.split(';');
    var latlngArray2 = [];
    while (latlngArray.length > 0) {
        var temp = latlngArray.shift().split(',');
        if (temp.length < 2) {
            continue;
        }
        latlngArray2.push(L.latLng(temp[0], temp[1]));
    }
    this.line.setLatLngs(latlngArray2).addTo(this.map);
};
Map_Line.prototype.moveAndZoom = function () {
    var LatLngList = this.line.getLatLngs();
    var bounds = getViewport(LatLngList);
    this.map.panInsideBounds(bounds);
};
/**************************************
Method:创建多边形围栏
[parms1]：地图对象
***************************************/
function Map_Fence(map) {
    var option = {
        fillColor: 'blue',
        fileOpacity: 0.2,
        color: 'Red',
        opacity: 0.8,
        weight: 2
    };
    this.map = map;
    this.fence = L.polygon([], option).addTo(map);
    this.eventArray = [];
    this.markArray = [];
}
//获取Fence路径数组
Map_Fence.prototype.getPath = function () {
    var result = [];
    var mvcArray = this.fence.getLatLngs();
    for (var i = 0; i < mvcArray[0].length; i++) {
        result.push(mvcArray[0][i].lat.toFixed(6) + ',' + mvcArray[0][i].lng.toFixed(6));
    }
    return result.join(';');
};
//设置围栏配置
Map_Fence.prototype.setOptions = function (option) {
    option.color = option.strokeColor;
    option.weight = option.strokeWeight;
    option.opacity = option.strokeOpacity;
    option.fillColor = option.fillColor;
    option.fileOpacity = option.fileOpacity;
    this.fence.setStyle(option);
};
//设置围栏路径
Map_Fence.prototype.setPath = function (latlngStr) {
    if (latlngStr === undefined || latlngStr === '') {
        return;
    }
    var latlngArray = latlngStr.split(';');
    var latlngArray2 = [];
    var temp = [];
    while (latlngArray.length > 0) {
        temp = latlngArray.shift().split(',');
        if (temp.length < 2) {
            continue;
        }
        latlngArray2.push(L.latLng(temp[0], temp[1]));
    }
    this.fence.setLatLngs(latlngArray2).addTo(this.map);
};
//清除围栏
Map_Fence.prototype.clear = function () {
    while (this.eventArray.length > 0) {
        var temp = this.eventArray.shift();
        this.map.off(temp.name, temp.fun);
    }
    while (this.markArray.length > 0) {
        this.markArray.shift().remove();
    }

    this.fence.remove();
};
//鼠标绘制围栏
Map_Fence.prototype.drawFence = function () {
    var pathArray = [];
    var markArray = [];
    var that = this;
    this.fence.setLatLngs([]);
    var dragEvent = function (event) {
        for (var i = 0, length = markArray.length; i < length; i++) {
            if (markArray[i].getLatLng() == event.latlng) {
                pathArray.splice(i, 1, event.latlng);
                that.fence.setLatLngs(pathArray).addTo(that.map);
                return;
            }
        }
    };
    var clickEvent = function (event) {
        var icon = L.icon({ iconUrl: 'Images/flag_blue.png', iconAnchor: [16, 16] });
        var mark = L.marker(event.latlng, { icon: icon, draggable: true }).addTo(that.map);
        markArray.push(mark);
        pathArray.push(event.latlng);
        that.fence.setLatLngs(pathArray).addTo(that.map);
        mark.on('drag', dragEvent);
    };
    that.map.on('click', clickEvent);
    that.eventArray.push({ name: 'click', fun: clickEvent });
    that.markArray = markArray;
};
//加载围栏
Map_Fence.prototype.loadFence = function (latlngStr) {
    if (latlngStr === undefined || latlngStr === '') {
        return;
    }
    var latlngArray = latlngStr.split(';');
    var latlngArray2 = [];
    var temp = [];
    while (latlngArray.length > 0) {
        temp = latlngArray.shift().split(',');
        if (temp.length < 2) {
            continue;
        }
        latlngArray2.push(L.latLng(temp[0], temp[1]));
    }
    this.fence.setLatLngs(latlngArray2).addTo(this.map);
};
//加载并编辑围栏
Map_Fence.prototype.loadFenceAndEdit = function (latlngStr) {
    if (latlngStr === undefined || latlngStr === '') {
        return;
    }
    var latlngArray = latlngStr.split(';');
    var temp = [];
    var pathArray = [];
    var markArray = [];
    var that = this;
    while (latlngArray.length > 0) {
        temp = latlngArray.shift().split(',');
        if (temp.length < 2) {
            continue;
        }
        var icon = L.icon({ iconUrl: 'Images/flag_blue.png', iconAnchor: [16, 16] });
        var mark = L.marker(L.latLng(temp[0], temp[1]), { icon: icon, draggable: true }).addTo(this.map);
        mark.on('move', function (event) {
            var target = event.target;
            var latlng = target.getLatLng();
            for (var i = 0, length = markArray.length; i < length; i++) {
                if (markArray[i].getLatLng() == latlng) {
                    pathArray.splice(i, 1, latlng);
                    that.fence.setLatLngs(pathArray).addTo(that.map);
                    return;
                }
            }
        });
        markArray.push(mark);
        pathArray.push(L.latLng(temp[0], temp[1]));
    }
    that.fence.setLatLngs(pathArray).addTo(that.map);
    that.markArray = markArray;
};
Map_Fence.prototype.moveAndZoom = function () {
    var LatLngList = this.fence.getLatLngs();
    var bounds = getViewport(LatLngList);
    this.map.panInsideBounds(bounds);
};

/**************************************
Method:创建圆形围栏
[parms1]：地图对象
***************************************/
function Map_Circle(map) {
    this.map = map;
    this.radius = 100000; //默认半径,m
    this.dragHandle = null;
    this.centerHandle = null;
    this.center = null;
    this.eventArray = [];
    this.circle = L.circle([0, 0], {
        color: 'blue',
        opacity: 0.8,
        weight: 2,
        fillColor: 'Red',
        fillOpacity: 0.35,
        radius: this.radius
    });
}
//设置参数
Map_Circle.prototype.setOptions = function (option) {
    option.color = option.strokeColor;
    option.weight = option.strokeWeight;
    option.opacity = option.strokeOpacity;
    option.fillColor = option.fillColor;
    option.fileOpacity = option.fileOpacity;
    this.circle.setStyle(option);
};
/*
圆的绘制
*/
Map_Circle.prototype.drawCircle = function () {
    var that = this;
    var centerMoveEvent = function (event) {
        var target = event.target;
        var latlng = target.getLatLng();
        that.circle.setLatLng(latlng).addTo(that.map);
    };
    var dragMoveEvent = function (event) {
        var target = event.target;
        var latlng = target.getLatLng();
        var distance = that.map.distance(that.center, latlng);
        that.circle.setRadius(distance).addTo(that.map);
    };
    var circlePathMouseOver = function (mouseEvent) {
        var latlng = mouseEvent.latlng;
        if (that.dragHandle === null) {
            var icon = L.icon({
                iconUrl: 'Images/resizeArrow.png',
                iconSize: [25, 20],
                iconAnchor: [12, 20]
            });
            that.dragHandle = L.marker(latlng, { icon: icon, draggable: true }).addTo(that.map);
            that.dragHandle.on('move', dragMoveEvent);
        } else {
            that.dragHandle.remove();
            that.dragHandle = null;
        }
    };
    var mapClickEvent = function (event) {
        var icon = L.icon({
            iconUrl: 'Images/centerArrow.png',
            iconSize: [20, 20],
            iconAnchor: [10, 20]
        });
        that.center = event.latlng;
        that.centerHandle = L.marker(that.center, { icon: icon, draggable: true }).addTo(that.map);
        that.circle = L.circle(that.center, { radius: that.radius }).addTo(that.map);

        that.circle.on('mouseover', circlePathMouseOver);
        that.centerHandle.on('move', centerMoveEvent);
        that.map.off('click', mapClickEvent);
    };
    this.map.on('click', mapClickEvent);
    this.eventArray.push({ name: 'click', fun: mapClickEvent });
    this.eventArray.push({ name: 'move', fun: dragMoveEvent });
    this.eventArray.push({ name: 'mouseover', fun: circlePathMouseOver });
    this.eventArray.push({ name: 'move', fun: centerMoveEvent });
};
//获取圆形和半径
Map_Circle.prototype.getPath = function () {
    if (this.center) {
        var latlngStr = this.center.lat.toFixed(6) + ',' + this.center.lng.toFixed(6);
        return latlngStr + ';' + this.radius;
    }
};
//设置圆形和半径
Map_Circle.prototype.setPath = function (point, radius) {
    var latlng = point.split(',');
    this.radius = radius;
    this.center = L.latLng(latlng[0], latlng[1]);
    this.centerHandle.setLatLng(this.center);
    this.circle.setRadius(radius).addTo(this.map);
};
/*
圆的加载预览
*/
Map_Circle.prototype.loadCircle = function (point, radius) {
    var latlng = point.split(',');
    this.radius = radius;
    this.center = L.latLng(latlng[0], latlng[1]);
    this.circle.setLatLng(this.center).setRadius(radius).addTo(this.map);
};
/**
 *
 * 圆的删除
 *
 */
Map_Circle.prototype.clear = function () {
    if (this.circle) {
        this.circle.remove();
    }
    if (this.dragHandle) {
        this.dragHandle.remove();
    }

    if (this.centerHandle) {
        this.centerHandle.remove();
    }

    while (this.eventArray.length > 0) {
        var temp = this.eventArray.shift();
        this.map.off(temp.name, temp.fun); //清除所有事件
    }
};
Map_Circle.prototype.moveAndZoom = function () {
    var circle_bounds = this.circle.getBounds();
    var bounds = getViewport(circle_bounds);
    this.map.panInsideBounds(bounds);
};
/**************************************
Method:创建矩形区域
[parms1]：地图对象
***************************************/
function Map_Rectangle(map) {
    var option = {
        fillColor: 'Red',
        fillOpacity: 0.3,
        color: 'blue',
        opacity: 0.3
    };
    this.map = map;
    this.rectangle = L.rectangle(L.latLngBounds([0, 0], [0, 0]), option).addTo(map);
    this.eventArray = [];
    this.markArray = [];
}
//获取路径左上、右下
Map_Rectangle.prototype.getPath = function () {
    var temp = this.rectangle.getBounds();
    var ne = temp.getNorthEast();
    var sw = temp.getSouthWest();
    return sw.lat.toFixed(6) + ',' + sw.lng.toFixed(6) + ';' + ne.lat.toFixed(6) + ',' + ne.lng.toFixed(6);
};
//设置路径
Map_Rectangle.prototype.setPath = function (latlngStr) {
    var nesw = latlngStr.split(';');
    var temp = nesw[0].split(',');
    var nwPoint = L.latLng(temp[0], temp[1]);
    temp = nesw[1].split(',');
    var sePoint = L.latLng(temp[0], temp[1]);
    var bounds = L.latLngBounds(nwPoint, sePoint);
    this.rectangle.setBounds(bounds).addTo(this.map);
};
//设置配置
Map_Rectangle.prototype.setOptions = function (options) {
    options.color = options.strokeColor;
    options.weight = options.strokeWeight;
    options.opacity = options.strokeOpacity;
    this.rectangle.setStyle(options);
};
//清除矩形
Map_Rectangle.prototype.clear = function () {
    while (this.eventArray.length > 0) {
        var temp = this.eventArray.shift();
        this.map.off(temp.name, temp.fun);
    }
    while (this.markArray.length > 0) {
        this.markArray.shift().remove();
    }

    this.rectangle.remove();
};
//绘制矩形
Map_Rectangle.prototype.drawRectangle = function () {
    var that = this;
    var clickCount = 0;
    var points = [];
    var clickEvent = function (event) {
        points.push(event.latlng);
        var icon = L.icon({ iconUrl: 'Images/flag_blue.png', iconAnchor: [10, 10] });
        var mark = L.marker(event.latlng, { icon: icon, draggable: true }).addTo(that.map);
        that.markArray.push(mark);
        clickCount++;

        if (clickCount == 2) {
            if (points[0].lng < points[1].lng) {
                that.rectangle.setBounds(L.latLngBounds(points[0], points[1])).addTo(that.map);
            } else {
                that.rectangle.setBounds(L.latLngBounds(points[1], points[0])).addTo(that.map);
            }

            that.map.off('click', clickEvent);

            that.markArray[0].on('drag', function (event2) {
                if (parseFloat(event2.latlng.lng) > parseFloat(points[1].lng)) {
                    that.rectangle.setBounds(L.latLngBounds(points[1], event2.latlng)).addTo(that.map);
                } else {
                    that.rectangle.setBounds(L.latLngBounds(event2.latlng, points[1])).addTo(that.map);
                }

                points[0] = event2.latlng;
            });
            that.markArray[1].on('drag', function (event2) {
                if (parseFloat(event2.latlng.lng) < parseFloat(points[0].lng)) {
                    that.rectangle.setBounds(L.latLngBounds(event2.latlng, points[0])).addTo(that.map);
                } else {
                    that.rectangle.setBounds(L.latLngBounds(points[0], event2.latlng)).addTo(that.map);
                }

                points[1] = event2.latlng;
            });
        }
    };
    that.map.on('click', clickEvent);
    that.eventArray.push({ name: 'click', fun: clickEvent });
};
//加载矩形
Map_Rectangle.prototype.loadRectangle = function (latlngStr) {
    if (latlngStr === undefined || latlngStr === '') {
        return;
    }
    var latlngArray = latlngStr.split(';');
    var latlngArray2 = [];
    if (latlngArray.length == 2) {
        var point1 = latlngArray[0].split(',');
        var point2 = latlngArray[1].split(',');
        latlngArray2.push(L.latLng(point1[0], point1[1]));
        latlngArray2.push(L.latLng(point2[0], point2[1]));
    }
    this.rectangle.setBounds(L.latLngBounds(latlngArray2[0], latlngArray2[1])).addTo(this.map);
};
Map_Rectangle.prototype.moveAndZoom = function () {
    var LatLngList = this.rectangle.getLatLngs();
    var bounds = getViewport(LatLngList);
    this.map.panInsideBounds(bounds);
};
/*----------------------------------------------------------------------------核心类结束------------------------------------------------------------------------*/
