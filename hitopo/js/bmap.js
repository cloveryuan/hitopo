//var currentcity = "常州";
//var centerpoint = new BMap.Point(119.967494, 31.779641);
//var zoomlevel = 16;

var div = document.createElement("div");
div.id = "allmap";
document.body.appendChild(div);

//创建和初始化地图函数：
function initMap() {
    createMap();//创建地图
    setMapEvent();//设置地图事件
    addMapControl();//向地图添加控件
    addMarker();//向地图中添加marker
}

//创建地图函数：
function createMap() {
    var map = new BMap.Map("allmap",{enableMapClick:false});//在百度地图容器中创建一个地图      
    map.setMapStyle({ style: 'light' });//light midnight
    
    map.centerAndZoom(centerpoint, zoomlevel);  // 初始化地图,设置中心点坐标和地图级别
    if (currentcity) {
        map.setCurrentCity(currentcity);          // 设置地图显示的城市 此项是必须设置的
    }
    window.map = map;//将map变量存储在全局
    map.addEventListener("click", function (e) {
        window.status = e.point.lng + "," + e.point.lat;
    });
}

//地图事件设置函数：
function setMapEvent() {
    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard();//启用键盘上下左右键移动地图
}

//地图控件添加函数：
function addMapControl() {
    //向地图中添加缩放控件
    //var ctrl_nav = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE });
    //map.addControl(ctrl_nav);
    //向地图中添加缩略图控件
    //var ctrl_ove = new BMap.OverviewMapControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 1 });
    //map.addControl(ctrl_ove);
    //向地图中添加比例尺控件
    var ctrl_sca = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
    map.addControl(ctrl_sca);
}


//创建marker
function addMarker() {
    if (markerArr) {
        for (var i = 0; i < markerArr.length; i++) {
            var json = markerArr[i];
            var p0 = json.point.split("|")[0];
            var p1 = json.point.split("|")[1];
            var point = new BMap.Point(p0, p1);
            var marker = new BMap.Marker(point, { icon: json.icon });
            var iw = createInfoWindow(i);
            var label = new BMap.Label(json.title, { "offset": new BMap.Size(20, 0) });
            marker.setLabel(label);
            marker.setTitle(json.title);
            map.addOverlay(marker);
            label.setStyle({
                borderColor: "#808080",
                color: "#333",
                cursor: "pointer"
            });
            
            (function () {
                var _iw = iw;
                var _marker = marker;
                _marker.addEventListener("mouseover", function () {
                    var ss = _iw.title;
                    var tagname = "";
                    for (var i in _iw.tags) {
                        tagname = _iw.tags[i];
                        if (db[tagname]) {
                            ss += "\n" + db[tagname].desc + ":" + db[tagname].value + db[tagname].unit;
                        }
                    }
                    _marker.setTitle(ss);
                });

                _marker.addEventListener("click", function () {
                    if (_iw.filename != "") {
                        display(_iw.filename);
                    }
                    else {
                        this.openInfoWindow(_iw);
                        update();
                    }
                });

                _iw.addEventListener("open", function () {
                    _marker.getLabel().hide();
                    update();
                });

                _iw.addEventListener("close", function () {
                    _marker.getLabel().show();
                });

                label.addEventListener("click", function () {
                    if (_iw.filename != "") {
                        display(_iw.filename);
                    }
                    else {
                        _marker.openInfoWindow(_iw);
                    }
                });

               // if (!!json.isOpen) {
               //     label.hide();
               //     _marker.openInfoWindow(_iw);
               // }

                function update() {
                    var ss = "<div>" + _iw.title + "<br/>";
                    var tagname = "";
                    for (var i in _iw.tags) {
                        tagname = _iw.tags[i];
                        if (db[tagname]) {
                            ss += db[tagname].desc + ":" + db[tagname].value + db[tagname].unit + "<br/>";
                        }
                    }
                    ss += "</div>";
                    _iw.setContent(ss);
                }
            })();
        }
    }
}
//创建InfoWindow
function createInfoWindow(i) {
    if (markerArr) {
        var json = markerArr[i];
        var iw = new BMap.InfoWindow("");
        iw.title = json.title;//标题
        iw.content = json.content;//内容
        iw.tags = json.tags;//标签名称
        iw.tag = json.tag;//标识名称
        if (json.filename)
            iw.filename = json.filename;
        else
            iw.filename = "";
        return iw;
    }
    else
        return null;
}

initMap();//创建和初始化地图

function resetPosition(e) {
    g2d.tx(0);
    g2d.ty(0);
    var lonLat, position;
    dataModel.each(function (data) {       
        if (data instanceof ht.Node) {
            if (data.lonLat) {
                lonLat = data.lonLat;
                position = map.pointToPixel(lonLat);
                data.setPosition(position.x, position.y);
            }
        }
    });
}


map.addEventListener('movestart', function (e) {
    if (lonLatNode) {
        view.style.opacity = 0;
    }
});
map.addEventListener('moveend', function (e) {
    if (lonLatNode) {
        view.style.opacity = 1;
        resetPosition();
    }
});
map.addEventListener('dragstart', function (e) {
    if (lonLatNode) {
        view.style.opacity = 0;
    }
});
map.addEventListener('dragend', function (e) {
    if (lonLatNode) {
        view.style.opacity = 1;
        resetPosition();
    }
});
map.addEventListener('zoomstart', function (e) {
    if (lonLatNode) {
        view.style.opacity = 0;
    }
});
map.addEventListener('zoomend', function (e) {
    if (lonLatNode) {
        view.style.opacity = 1;
        resetPosition();
    }
});
