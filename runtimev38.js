tagsList = new ht.List,
_playbacktagsList = new ht.List,
_playbackTags = "",
valuechangedcallback = null,
updatecallback = null,
ioerror = false,
_updating = false,
contextid = "",
_tagschanged = false,
_skipcount = 0,

_playbackstoped = true,
_currentPlaybackdata = null,
_playbackDataList = new ht.List,
_currentPlaybacktime = "",
_currentPlaybackIndex = 0,
_playbackPaused = false,
_playbackStart = 0,
_playbackEnd = 0,
db = new Array,
_scadacommand = -1;
_scadamessage = "";

sys_blink = false,
taginfoPane = null,
tagformPane = null;
// iframe初始值为false
var idAll = [];//存放有厂站号id，设备号id，信号id**
var idAllNode = []//存放有厂站号id，设备号id，信号id的图元**

function init() {
    updateList = new ht.List, 
    flashList = new ht.List, 
    dataModel = new ht.DataModel, 
    dm = dataModel, 
    dataModel.getSelectionModel().setSelectionMode("single"), 
    g2d = new ht.graph.GraphView(dataModel), 
    g2d.enableToolTip(), 
    g2d.getToolTip = function (a) {
        var e = g2d.getDataAt(a);
        if (e) {
            var t = e.a("ToolTip");
            if (null != t && "" != t) return t
        }
    }, 
    g2d.isMovable = function (a) {
        return isMovable
    },
     g2d.isPannable = function () {
        return isPannable
    }, 

    // isRectSelectable() | setRectSelectable(true) ，控制是否可框选
    g2d.setRectSelectable(false), 
    g2d.setLayers(layers), 
    view = g2d.getView(), 
    iframe && (g2d.setScrollBarVisible(false), //设置滚动条是否可见
    g2d.setScrollBarSize(0)), 

    view.className = "main",
    window.addEventListener("resize", function (a) {
        htconfig.autoSize && g2d.fitContent(false, 10)
    }, false);
    
    var a = ht.Default.isTouchable ? "touchend" : "mouseup";
    view.addEventListener(a, function (a) {
    //a.button=0鼠标mouseup左键被按下
        if (0 == a.button || ht.Default.isTouchable) {
            var e = g2d.getDataAt(a);
            if (e) {
                // enabled 是否启用(boolean) ，未启用的图元显示为灰色，通过isEnabled()获取值
                if (e instanceof ht.LiveNode && !e.isEnabled()) return;
                var t = window["fun_nclick_" + e.getId()];
                console.log(t)//编辑页面鼠标点击的脚本函数
                t && t(e, a, e.values)
            }
        }
    });
    var e = 0;
    // addPropertyChangeListener 简写 = mp
    if (g2d.mp(function (a) {
            if ("zoom" === a.property) {
                if (++e < 8) return;
                e = 0;
                for (var t in window.cacheCanvas) drawCanvas(window.cacheCanvas[t])
            }
        }), baiduMap) {
        var t = document.getElementById("allmap");
        g2d.handleScroll = function () {
        }, 
        g2d.handlePinch = function () {
        }, 
        t.firstChild.firstChild.appendChild(view)
    } else {
        document.body.appendChild(view);
    }

    // 文件名不为空，hightopo版本型号.v 初始化开始
    if ("" != filename && filejson.v) {
        dataModel.deserialize(filejson);
        var n, 
            l = new ht.List, //Html
            d = new ht.List, //iFrame alarm
            o = new ht.List, //Script 
            r = new ht.List, //LinkImg 链接画面
            s = "", //bclick  vchange  nclick
            c = "", //初始化脚本代码
            g = "", //全局脚本
            u = "",//动画脚本
            p = "", //dchange 数据更新脚本
            m = "";//数据更新脚本
        dataModel.each(function (a) {
            a instanceof ht.LinkImg && r.add(a)
        }), 
        // 链接画面
        r.each(function (a) {
            var e = a.getRect();//获取图元矩形区域
            dataModel.remove(a);
          
            var t = a.a("filename");
            if (t) {
                var n = "filejson_" + t;
                if (window[n]) {
                    var i = new ht.DataModel;
                    i.deserialize(window[n]);
                    var l = new ht.List;
                    i.each(function (a) {
                        var t = a.p();
                        t.x += e.x, t.y += e.y, a.p(t), l.add(a)
                    }), i.clear(), l.each(function (a) {
                        dm.add(a)
                    }), l.clear()
                }
            }
        }), 
        r.clear();
        dataModel.each(function (a) {
            a instanceof ht.LiveNode && null != a.a("Enabled") && (a.a("Enabled") || a.setEnabled(false));
            var e = a.a("station");

            // for循环开始
            // for (e && (e = e.toUpperCase(), a.a("station", e), tagsList.contains(e) || tagsList.add(e)),

            //     (e = a.a("vistagname")) && (e = e.toUpperCase(), a.a("vistagname", e), tagsList.contains(e) || tagsList.add(e)),

            //     (e = a.a("enbtagname")) && (e = e.toUpperCase(), a.a("enbtagname", e), tagsList.contains(e) || tagsList.add(e)),

            // (e = a.a("flashtagname")) && (e = e.toUpperCase(), a.a("flashtagname", e), tagsList.contains(e) || tagsList.add(e)), 

            // i = 1; 
            
            // i < 10; 
            
            // i++) (e = a.a("tagname" + i)) && (e = e.toUpperCase(), a.a("tagname" + i, e), tagsList.contains(e) || tagsList.add(e));
           
            e && (e = e.toUpperCase(), a.a("station", e), tagsList.contains(e) || tagsList.add(e));
            if (a instanceof ht.Script) o.add(a); 
            else if (a instanceof ht.Html) l.add(a); 
            else if (a instanceof ht.iFrame) d.add(a); 
            else if (a instanceof ht.alarm) d.add(a); 
            else if (a instanceof ht.LinkImg) ; 

            // 交互
  
            else if ((e = a.a("station")) && (a.values = [], a.a("dchange") && (p += "\r\nfunction fun_dchange_" + a.getId() + "(data){" + a.a("dchange") + "\r\n}\r\n")), a instanceof ht.LiveNode) {
                var t = a.a("bclick");
                t && (s += "\r\nfunction fun_nclick_" + a.getId() + "(data,e,values){" + t + "\r\n}\r\n");

                var n = a.a("vchange");
                n && (s += "\r\nfunction fun_vchange_" + a.getId() + "(data,value){" + n + "\r\n}\r\n", 
                a.onChanged = function (e) {
                    var t = window["fun_vchange_" + a.getId()];
                    t && t(this, e)
                })
                console.log(p)
            } else {
                var r = a.a("nclick");
                r && (s += "\r\nfunction fun_nclick_" + a.getId() + "(data,e,values){" + r + "\r\n}\r\n")
            }
            console.log(s)

            // 存放所有含有厂站号——设备号——信号的图元 
            if (a.a('faci_id') && a.a('faci_id') && a.a('signal_id')){
                var idA = {
                    station_id: a.a('station_id'),
                    equipment_id: a.a('faci_id'),
                    signal_id: a.a('signal_id')
                }
                idAllNode.push(a)//存放含有业务属性的图元
                idAll.push(idA)//存放含有业务属性的几个Id
            } 
        })
      
        o.each(function (a) {//ht.script，向导和扩展里面的都是这个类
            if (dataModel.remove(a), n = a.a("type") || "初始化脚本", "初始化脚本" == n ? c += "\r\n" + a.a("script") || "\r\n" : "动画脚本" == n ? u += "\r\n" + a.a("script") || "\r\n" : "全局脚本" == n ? g += "\r\n" + a.a("script") || "\r\n" : "数据更新脚本" == n && (m += "\r\n" + a.a("script") || "\r\n"), a.a("html")) {
                var e = a.getPosition(), 
                t = a.getWidth(), 
                i = a.getHeight(), 
                l = a.getTag(), 
                d = new ht.HtmlNode;
                d.setTag(l), 
                d.setWidth(t), 
                d.setHeight(i), 
                d.a("w", t), 
                d.a("h", i), 
                d.setPosition(e), 
                d.setPadding(0), 
                // scalable通过setScalable和getScalable操作，表示HTML内容是否可拉伸。值为boolean型(默认为true) ：
                // true表示当调整HtmlNode的宽高时，用transform样式调整HTML内容的缩放
                // false表示当调整HtmlNode的宽高时，改变HTML内容的第一个元素的with和height使其适应HtmlNode的尺寸。这意味着：如果此参数设为false，用户设置的
                // HTML内容应该只有一个根元素
                d.setScalable(false), 
                d.setHtml("<Div></Div>"), 
                d.setLayer(a.getLayer() || "nodeLayer"), 
                dataModel.add(d)
            }
        }), 

        baiduMap && lonLatNode && dataModel.each(function (a) {
            a.lonLat = map.pixelToPoint(a.getPosition())
        }), 

        l.each(function (a) {//ht.Html
            dataModel.remove(a);
            var e = a.a("html") || "<Div></Div>", 
            t = a.a("padding") || 6, 
            n = a.a("scalable") || false,
            i = a.getPosition(), 
            l = a.getWidth(), 
            d = a.getHeight(), 
            o = a.getTag(), 
            r = new ht.HtmlNode;
            r.a("w", l), 
            r.a("h", d), 
            r.setTag(o), 
            r.setWidth(l), 
            r.setHeight(d), 
            r.setPosition(i), 
            r.setPadding(t), 
            r.setScalable(n), 
            r.setHtml(e), 
            r.setLayer(a.getLayer() || "nodeLayer"), 
            dataModel.add(r)
        }), 
        d.each(function (a) {//ht.iFrame子画面  ht.alarm报警控件
            if (dataModel.remove(a), a instanceof ht.iFrame) {
                var e = a.a("filename") || "", //文件名称
                    t = a.a("param") || "", //参数名称
                    n = a.getPosition(), 
                    i = a.getWidth(),
                    l = a.getHeight(), 
                    d = a.getTag();
                if ((g = new ht.HtmlNode).setTag(d), g.setWidth(i), g.setHeight(l), g.setPosition(n), g.setLayer(a.getLayer() || "nodeLayer"), null != (u = document.createElement("iFrame")) && (u.id = d, u.name = d, u.width = i, u.height = l, u.marginHeight = 0, u.marginWidth = 0, u.scrolling = "no", u.frameBorder = 0, u.frameSpacing = 0, u.allowtransparency = true, g.setHtml(u), dataModel.add(g), window["iframe_" + d] = u, "" != e)) {
                    var o = "" == t ? "" : "&param=" + t;
                    u.src = "runview.aspx?iframe=1&filename=" + e + o
                    // console.log(u)
                }
            } else if (a instanceof ht.alarm) {
                var r = a.a("count") || 5, 
                    s = a.a("area") || 0, 
                    c = a.a("bordercolor"), 
                    n = a.getPosition(),
                    i = a.getWidth(), 
                    l = a.getHeight(), 
                    d = a.getTag(), 
                    g = new ht.HtmlNode;
                    g.setTag(d), 
                    g.setWidth(i), 
                    g.setHeight(l), 
                    g.setPosition(n), 
                    g.setLayer(a.getLayer() || "nodeLayer");
                var u = document.createElement("iFrame");
                null != u && (u.id = d, 
                u.name = d, 
                u.width = i, 
                u.height = l, 
                u.marginHeight = 0, 
                u.marginWidth = 0, 
                u.scrolling = "no", 
                u.frameBorder = 0, 
                u.frameSpacing = 0, 
                "" != c && (u.style.cssText = "border:1px solid " + c), 
                g.setHtml(u), 
                dataModel.add(g), 
                window["iframe_" + d] = u, 
                u.src = "alarmview.aspx?count=" + r.toString() + "&area=" + s.toString())
                // console.log(u)
            }
        }), 

        // 全局脚本
        "" != g && ((b = document.createElement("script")).type = "text/javascript", 
            b.text = g, document.body.appendChild(b)), 
        // dchange data
        "" != p && ((b = document.createElement("script")).type = "text/javascript", 
            b.text = p,console.log(b), document.body.appendChild(b)),
         //初始化脚本代码
        "" != c && ((b = document.createElement("script")).type = "text/javascript", 
            b.text = "function fun_data_load(){" + c + "\r\n}\r\n", 
            document.body.appendChild(b)),   
        //动画脚本
        "" != u && ((b = document.createElement("script")).type = "text/javascript", 
        b.text = "function fun_data_anim(){" + u + "\r\n}\r\n", 
        document.body.appendChild(b)), 
        //数据更新脚本
        "" != m && ((b = document.createElement("script")).type = "text/javascript", 
        b.text = "function fun_valueupdate(){" + m + "\r\n}\r\n", 
        document.body.appendChild(b));
       
        //f初始化脚本代码 s为bclick vchange nclick鼠标点击脚本
        var f = window.fun_data_load;
        if (f && f(), "" != s) {
            var b = document.createElement("script");
            b.type = "text/javascript", 
            b.text = s, 
            document.body.appendChild(b)
        }
        tagsList.isEmpty() || (tagsList.remove("IOERROR"), 
        tagsList.remove("PLAYBACKMODE"), 
        tagsList.remove("NORMALMODE"), 
        tags = tagsList.toArray().join(","), 
        tags = tags.toUpperCase()), 
        createLocalRuntimeTags(), 
        tagsList.each(function (a) {
            createTag(a)
        }), 

        // 百度地图展示情况下
        baiduMap ? view.style.backgroundColor = "" : view.style.backgroundColor = dataModel.a("background") || "#FFFFFF", 
        htconfig.autoSize && g2d.fitContent(false, 0), 
        dataModel.each(function (a) {
            a.a("flash") ? flashList.add(a) : a.a("flashtagname") && (a.s("shape.background") || a.s("shape.border.color")) && (flashList.add(a), a.background = a.s("shape.background"), a.bordercolor = a.s("shape.border.color")), (a.a("tagname") || a.a("vistagname") || a.a("enbtagname")) && updateList.add(a)
        }), 
        isRuning = true, 
            "" != tags && (update_scada(), updateTimerID = setInterval(update_scada, ht.dataRate)), 
        "" != tags && (current_value(), setInterval(current_value,5000)), 
        animTimerID = setInterval(anim_scada, htconfig.animRate), 
        window.orientation && (view_orient(), $(window).bind("orientationchange", function (a) {
            view_orient()
        }))
    }
    // 初始化结束
    iframe || (tagset_init(), taginfo_init()), iframe && (g2d.adjustZoom = function (a) {
        // adjustZoom(value)传入即将修改的缩放值，返回最终运行设置的缩放值，可重载进行自定义
        console.log(a)
        return 1 == a ? parent.zoomReset() : a > 1 ? parent.zoomIn(true) : parent.zoomOut(true), 1
    })
}

// 扩展里面的动画脚本
function anim_scada() {
    sys_blink = !sys_blink;
    var a = window.fun_data_anim;//动画脚本
    a && a(), 
    flashList.each(function (a) {
        var e, 
            t = false, 
            n = a.a("vistagname");
        
        n && (n = n.toUpperCase(), (e = db[n]) && a.s("2d.visible") != e.value && (a.s("2d.visible", e.value), t = true)),

        (n = a.a("flashtagname")) && (n = n.toUpperCase(), (e = db[n]) && (e.value ? sys_blink ? (a.s({
            "shape.background": a.s("background"),
            "shape.border.color": a.s("bordercolor")
        }), t = true) : (a.s({
            "shape.background": a.background,
            "shape.border.color": a.bordercolor
        }), t = true) : a.s("shape.background") == a.background && a.s("shape.border.color") == a.bordercolor || (a.s({
            "shape.background": a.background,
            "shape.border.color": a.bordercolor
        }), t = true))), 
     
        t || a.iv()
    })
}

// 变量设置面板
function tagset_init() {
    tagformPane = new ht.widget.FormPane, 
    tagformPane.getLabelFont = function (a) {
        return "bold 12px arial, sans-serif"
    }, 
    tagformPane.getLabelVAlign = function (a) {
        return "top"
    }, 
    tagformPane.addRow(["名称:", {
        id: "name",
        textField: {text: "", editable: false}
    }], [40, .1]),
     tagformPane.addRow(["标签:", {
        id: "tagname",
        textField: {text: "", editable: false}
    }], [40, .1]), 
    tagformPane.addRow(["数值:", {
        id: "tagvalue",
        textField: {text: ""}
    }], [40, .1]), 
    tagformPane.addRow([null, {
        button: {
            label: "设置", 
            onClicked: function () {
                var a = tagformPane.v("tagname"), 
                    e = tagformPane.v("tagvalue");
                "" != a && writetag(a, e), 
                tagPanel.getView().style.display = "none", 
                tagformPane.v({
                    name: "",
                    tagname: "",
                    tagvalue: ""
                })
            }
        }
    }, {
        button: {
            label: "关闭", 
            onClicked: function () {
                tagPanel.getView().style.display = "none"
            }
        }
    }], [.1, 65, 65]), 
    tagformPane.setWidth(200), 
    tagformPane.setHeight(120), 
    tagPanel = new ht.widget.Panel({
        id: "tagPanel",
        title: "变量设置",
        restoreToolTip: "变量设置",
        titleIcon: "",
        width: 200,
        contentHeight: 120,
        minimizable: false,
        content: tagformPane,
        expanded: true
    }), 
    tagPanel.setPositionRelativeTo("rightTop"), 
    tagPanel.setPosition(0, 0), 
    tagPanel.getView().style.display = "none", 
    document.body.appendChild(tagPanel.getView())
}

// 变量信息面板
function taginfo_init() {
    taginfoPane = new ht.widget.FormPane, 
    taginfoPane.tagname = "", 
    taginfoPane.getLabelFont = function (a) {
        return "bold 12px arial, sans-serif"
    }, 
    taginfoPane.getLabelVAlign = function (a) {
        return "top"
    }, 
    taginfoPane.addRow(["描述:", {
        id: "name",
        textField: {text: "", editable: false}
    }], [40, .1]), 
    taginfoPane.addRow(["全称:", {
        id: "tagname",
        textField: {text: "", editable: false}
    }], [40, .1]), 
    taginfoPane.addRow(["下限:", {
        id: "min",
        textField: {text: "", editable: false}
    }], [40, .1]), 
    taginfoPane.addRow(["上限:", {
        id: "max",
        textField: {text: "", editable: false}
    }], [40, .1]), 
    taginfoPane.addRow(["数值:", {
        id: "tagvalue",
        textField: {text: "", editable: false}
    }], [40, .1]), taginfoPane.addRow(["时间:", {
        id: "time",
        textField: {text: "", editable: false}
    }], [40, .1]), 
    taginfoPane.addRow(["单位:", {
        id: "unit",
        textField: {text: "", editable: false}
    }], [40, .1]), 
    taginfoPane.addRow(["报警:", {
        id: "atype",
        textField: {text: "", editable: false}
    }], [40, .1]), 
    taginfoPane.addRow(["低低:", {
        id: "all",
        textField: {text: "", editable: false}
    }], [40, .1]), 
    taginfoPane.addRow(["低报:", {
        id: "al",
        textField: {text: "", editable: false}
    }], [40, .1]), taginfoPane.addRow(["高报:", {
        id: "ah",
        textField: {text: "", editable: false}
    }], [40, .1]), 
    taginfoPane.addRow(["高高:", {
        id: "ahh",
        textField: {text: "", editable: false}
    }], [40, .1]), 
    taginfoPane.addRow([null, null, {
        button: {
            label: "关闭", onClicked: function () {
                taginfoPane.tagname = "", taginfoPanel.getView().style.display = "none"
            }
        }
    }], [.1, 65, 65]), 
    taginfoPane.setWidth(250), 
    taginfoPanel = new ht.widget.Panel({
        id: "taginfoPanel",
        title: "变量信息",
        restoreToolTip: "变量信息",
        titleIcon: "",
        width: 250,
        contentHeight: 350,
        minimizable: false,
        content: taginfoPane,
        expanded: true
    }), 
    taginfoPanel.setPositionRelativeTo("rightBottom"), 
    taginfoPanel.setPosition(0, 0), 
    taginfoPanel.getView().style.display = "none", 
    document.body.appendChild(taginfoPanel.getView())
}

// 右键历史回放
function playbackpane_init() {
    var a = new Date,
        e = a.getFullYear().toString() + "-" + ("0" + (a.getMonth() + 1).toString()).slice(-2) + "-" + ("0" + a.getDate().toString()).slice(-2),
        t = a.getHours().toString() + ":00:00", 
        n = a.getHours().toString() + ":30:00";
       
    playbackpane = new ht.widget.FormPane, 
    playbackpane.setRowHeight(25), 
    playbackpane.getLabelFont = function (a) {
        return "bold 12px arial, sans-serif"
    }, 
    playbackpane.getLabelVAlign = function (a) {
        return "top"
    }, 
    playbackpane.addRow([
        "开始时间:", 
        {
            id: "sdate", 
            textField: {type: "date", text: e, editable: true}
        }, 
        {
            id: "stime",
            textField: {type: "time", text: t, editable: true}
        }, 
        {}, 
        {}
    ], [60, .4, .28, .15, .15]), 
    playbackpane.addRow([
        "结束时间:", 
        {
            id: "edate",
            textField: {type: "date", text: e, editable: true}
        }, 
        {
            id: "etime", 
            textField: {type: "time", text: n, editable: true}
        }, 
        {
            id: "startbutton",
            button: {
                label: "启动", 
                disabled: "" == tags, 
                icon: "", 
                onClicked: function () {
                    if ("" != tags) {//disabled为false
                        var a = playbackpane.v("sdate"), 
                            e = playbackpane.v("stime"), 
                            t = playbackpane.v("edate"),
                            n = playbackpane.v("etime");
                        if (a && e && t && n) {
                            var i = a.replace(/-/g, "/") + " " + e, //拼接时间
                                l = t.replace(/-/g, "/") + " " + n, 
                                d = Date.parse(i),//开始时间毫秒数
                                o = Date.parse(l);//结束时间毫秒数

                            //o-d时间差＞600000毫秒 ，且小于4320000毫秒
                            if ((o - d) / 1e3 >= 600){
                                if ((o - d) / 1e3 > 43200){
                                    alert("结束时间设置不正确，最多设置12小时历史回放长度!"); 
                                } else{
                                    playbackpane.getItemById("startbutton").element.setDisabled(true), playbackpane.getItemById("pausebutton").element.setDisabled(false),
                                    playbackpane.getItemById("stopbutton").element.setDisabled(false),
                                    playbackpane.getItemById("sdate").element.setDisabled(true),
                                    playbackpane.getItemById("edate").element.setDisabled(true),
                                    playbackpane.getItemById("stime").element.setDisabled(true),
                                    playbackpane.getItemById("etime").element.setDisabled(true),
                                    showLoading(),
                                    _playbackDataList.clear(),
                                    _currentPlaybackIndex = 0,
                                    _currentPlaybackdata = null,
                                    _playbackstoped = false                                                          
                                    if (d + 6e5 >= o){//只有等于才满足
                                        _playbackStart = 0, 
                                        _playbackEnd = 0, 
                                        queryPlayData(_playbackTags, i, l, 1); //函数参数 tags，start，end，speed，调用后获取数据添加进_playbackDataList
                                    } else {
                                        _playbackStart = d + 6e5, 
                                        _playbackEnd = o;
                                        var r = new Date(_playbackStart),
                                            s = r.getFullYear().toString() + "/" + (r.getMonth() + 1).toString() + "/" + r.getDate().toString() + " " + r.getHours().toString() + ":" + r.getMinutes().toString() + ":" + r.getSeconds().toString();
                                        // queryPlayData(_playbackTags, i, s, 1)    
                                        queryPlayData(_playbackTags, i, l, 1)
                                    } 
                                }
                            }else{
                                alert("结束时间设置不正确，至少设置10分钟历史回放长度!")
                            } 
                        } else{
                            alert("开始和结束时间设置不正确!")
                        } 
                    }
                }
            }
        }, 
        {
            id: "pausebutton", 
            button: {
                label: "暂停", 
                disabled: true, 
                icon: "", 
                onClicked: function () {
                    _playbackPaused = !_playbackPaused;
                    var a = playbackpane.getItemById("pausebutton");
                    a.button.label = _playbackPaused ? "继续" : "暂停", 
                    a.element._label = a.button.label, 
                    playbackpane.iv()
                }
            }
        }
    ], [60, .4, .28, .15, .15]), 
    playbackpane.addRow([
        "播放速率:", 
        {
            id: "playRate",
            comboBox: {labels: ["1X", "2X", "4X", "5X", "10X", "20X"], values: [1e3, 500, 250, 200, 100, 50],  value: 1e3}
        }, 
        {}, 
        {
            id: "stopbutton", 
            button: {
                label: "停止", 
                disabled: true, 
                icon: "", 
                onClicked: function () {
                    updateTimerID >= 0 && (clearInterval(updateTimerID), updateTimerID = -1), 
                    _playbackstoped = true, 
                    _playbackDataList.clear(), 
                    _currentPlaybackIndex = 0, 
                    _currentPlaybackdata = null, 
                    _playbackStart = 0, 
                    _playbackEnd = 0, 
                    _updating = false, 
                    _playbackPaused = false, 
                    resetPlaybackView()
                }
            }
        }, {
            id: "closebutton", 
            button: {
                label: "关闭", 
                icon: "", 
                onClicked: function () {
                    updateTimerID >= 0 && (clearInterval(updateTimerID), updateTimerID = -1), 
                    _playbackstoped = true, 
                    _playbackDataList.clear(), 
                    _currentPlaybackIndex = 0, 
                    _currentPlaybackdata = null, 
                    _playbackStart = 0, 
                    _playbackEnd = 0, 
                    _updating = false, 
                    _playbackPaused = false, 
                    stopplayback()//停止播放
                }
            }
        }
    ], [60, .4, .28, .15, .15]), 
    playbackpane.setWidth(500), 
    playbackView = new ht.widget.Panel({
        titleBackground: "red",
        dialogButtonSelectBackground: "red",
        id: "playbackView",
        title: "历史回放控制",
        restoreToolTip: "历史回放控制",
        titleIcon: "",
        width: 500,
        contentHeight: 110,
        minimizable: false,
        content: playbackpane,
        expanded: true
    });
    var i = playbackpane.getItemById("playRate").element;
    i.onValueChanged = function (a) {
        var e = i.getValue();
        e && updateTimerID >= 0 && (clearInterval(updateTimerID), updateTimerID = setInterval(updatePlayback, e))
    }, 
    playbackView.setPositionRelativeTo("rightTop"), 
    playbackView.setPosition(0, 0), 
    document.body.appendChild(playbackView.getView())
}
// 回放标题设置
function updatePlaybackTitle(a) {
    // resetPlaybackView && (a ? playbackView.setTitle("历史回放时间:" + a) : playbackView.setTitle("历史回放控制"))
    if (resetPlaybackView){
        if(a){
            playbackView.setTitle("历史回放时间:" + a)
        } else {
            playbackView.setTitle("历史回放控制")
        }
    }
}

//点击右键历史回放
function resetPlaybackView() {
    _playbackstoped = true;
    updatePlaybackTitle();
    if (playbackpane) {
        playbackpane.getItemById("startbutton").element.setDisabled(false), 
        playbackpane.getItemById("pausebutton").element.setDisabled(true), 
        playbackpane.getItemById("stopbutton").element.setDisabled(true);

        var a = playbackpane.getItemById("pausebutton");
        a.button.label = _playbackPaused ? "继续" : "暂停", 
        a.element._label = a.button.label, 
        playbackpane.getItemById("sdate").element.setDisabled(false), 
        playbackpane.getItemById("edate").element.setDisabled(false), 
        playbackpane.getItemById("stime").element.setDisabled(false), 
        playbackpane.getItemById("etime").element.setDisabled(false), 
        playbackpane.iv()
    }
}

// 更新数据
function update_scada() {
        
}

// 高级右键--画面数据库
function viewCurrentTags() {
    if (iframe) parent.viewCurrentTags(); 
    else if (null == tagsDialog) {
        var a = new ht.widget.Toolbar([{
            id: "tagname",
            label: "标签名称:",
            icon: "images/search.png",
            unfocusable: true,
            textField: {width: 150}
        }]), 
        e = new ht.widget.BorderPane;
        e.setTopView(a);
        var t = new ht.DataModel, 
            n = new ht.widget.TablePane(t);
        e.setCenterView(n), 
        t.getSelectionModel().setSelectionMode("single"), n.addColumns([{
            name: "index",
            width: 40,
            displayName: "序号",
            accessType: "attr",
            align: "left",
            valueType: "number"
        }, {name: "tagname", width: 300, displayName: "标签名称", accessType: "attr", align: "left"}, {
            name: "value",
            width: 80,
            displayName: "当前值",
            accessType: "attr",
            align: "left"
        }, {name: "type", width: 50, displayName: "类型", accessType: "attr", align: "left"}, {
            name: "status",
            width: 40,
            displayName: "状态",
            accessType: "attr",
            align: "left"
        }, {name: "time", width: 120, displayName: "时间", accessType: "attr", align: "left"}, {
            name: "desc",
            width: 150,
            displayName: "描述",
            accessType: "attr",
            align: "left"
        }]);
        var i = 1;
        for (var l in db) {
            r = db[l];
            (s = new ht.Data).a({
                index: i,
                tagname: l,
                status: r.status,
                value: r.value,
                type: r.type,
                desc: r.desc,
                time: r.time
            }), i++, t.add(s)
        }
        for (var d = 0; d < window.frames.length; d++) if (window.frames[d].db) for (var l in window.frames[d].db) {
            var o = false;
            if (t.each(function (a) {
                    a.a("tagname") != l || (o = true)
                }), !o) {
                var r = window.frames[d].db[l], s = new ht.Data;
                s.a({
                    index: i,
                    tagname: l,
                    status: r.status,
                    value: r.value,
                    type: r.type,
                    desc: r.desc,
                    time: r.time
                }), i++, t.add(s)
            }
        }
        var c = n.getTableHeader();
        c.setColumnLineColor("#C8C8C8"), 
        c.setInsertColor("#6DCDF3"), 
        c.getLabelFont = function (a) {
            return "bold 12px Arial"
        }, 
        c.getView().style.background = "#F1F1F1";
        var g = n.getTableView();
        g.setSelectBackground("#E1E1E1"), 
        g.setRowLineColor("#EDEDED"), 
        g.setColumnLineVisible(false), 
        g.setRowHeight(22), 
        g.setAutoHideScrollBar(false), 
        g.setLabelSelectColor("blue"), 
        g.drawRowBackground = function (a, e, t, n, i, l, d) {
            1 == e.a("status") ? a.fillStyle = "#FAFAFA" : a.fillStyle = "#FF00FF", a.beginPath(), a.rect(n, i, l, d), a.fill()
        }, 
        a.getView().style.background = "#E1E1E1";
        var u = a.getItemById("tagname").element;
        u.getElement().onkeyup = function (a) {
            27 === a.keyCode && (u.getElement().value = ""), g.invalidateModel()
        }, 
        g.isVisible = function (e) {
            if (e.isEmpty()) {
                var t = a.v("tagname"), n = true;
                if ("" != t) {
                    e.a("tagname");
                    n = e.a("tagname").toUpperCase().indexOf(t.toUpperCase()) >= 0
                }
            }
            return n
        }, 
        tagsDialog = new ht.widget.Panel({
            id: "tagsDialog",
            title: "页面标签浏览器",
            restoreToolTip: "页面标签浏览器",
            titleIcon: "",
            width: 800,
            contentHeight: 300,
            minimizable: false,
            content: e,
            expanded: true
        }), 
        tagsDialog.setPositionRelativeTo("rightTop"), 
        tagsDialog.setPosition(0, 0), 
        updatecallback = function (a, e) {
            tagsDialog && "" == tagsDialog.getView().style.display && (e ? t.each(function (t) {
                var n = t.a("tagname");
                if ("PLAYBACKMODE" == n || "IOERROR" == n || "NORMALMODE" == n) (i = e[n]) && t.a({
                    value: i.value,
                    time: i.time
                }); else if (a.contains(n)) {
                    var i = e[n];
                    i && t.a({value: i.value, time: i.time})
                }
            }) : t.each(function (e) {
                var t = e.a("tagname");
                if ("PLAYBACKMODE" == t || "IOERROR" == t || "NORMALMODE" == t) (n = db[t]) && e.a({
                    value: n.value,
                    time: n.time
                }); else if (a.contains(t)) {
                    var n = db[t];
                    n && e.a({value: n.value, time: n.time})
                }
            }))
        };
        var p = new ht.widget.ContextMenu;
        p.addTo(tagsDialog.getView()), 
        p.setItems([{
            label: "刷新", action: function () {
                g.iv()
            }
        }, {
            label: "关闭", action: function () {
                updatecallback = null, document.body.removeChild(tagsDialog.getView()), tagsDialog = null
            }
        }]), 
        document.body.appendChild(tagsDialog.getView())
    } else "" == tagsDialog.getView().style.display ? tagsDialog.getView().style.display = "none" : tagsDialog.getView().style.display = ""
}

function closeTagsViewDlg() {
    iframe ? parent.closeViewDlg() : null != tagsDialog && (updatecallback = null, document.body.removeChild(tagsDialog.getView()), tagsDialog = null)
}

function stopScada() {
    updateTimerID >= 0 && (clearInterval(updateTimerID), updateTimerID = -1, isRuning = false, contextid = ""), animTimerID >= 0 && (clearInterval(animTimerID), animTimerID = -1), g2d.iv()
}

function startScada() {
    updateTimerID < 0 && (isRuning = true, contextid = "", updateTimerID = setInterval(update_scada, htconfig.dataRate)), 
    animTimerID < 0 && (animTimerID = setInterval(anim_scada, htconfig.animRate)),
    g2d.iv()
}

function stopAll() {
    stopScada();
    for (var a = 0; a < window.frames.length; a++) window.frames[a].db && window.frames[a].stopScada()
}

function startAll() {
    startScada();
    for (var a = 0; a < window.frames.length; a++) window.frames[a].db && window.frames[a].startScada()
}

function _update_view(a) {
    var e = new ht.List, 
        t = new ht.List;
    updateList.each(function (n) {
        var i = false, 
            l = n.a("tagname");
        if (l) {
            l = l.toUpperCase(), 
            a && ("PLAYBACKMODE" != l && "NORMALMODE" != l || t.add(l)), 
            e.clear();
            var d = db[l];
            for (d ? (n.tag || (n.tag = d), e.add(d.value), d.changed && (i = true, d.changed = false)) : e.add(null), r = 1; r < 10; r++) (l = n.a("tagname" + r)) ? (l = l.toUpperCase(), (d = db[l]) ? (n["tag" + r] || (n["tag" + r] = d), e.add(d.value), d.changed && (i = true, d.changed = false)) : e.add(null)) : e.add(null);
            var o = e.toArray();
            if (!i) if (n.values) if (o.length == n.values.length) {
                for (var r = 0; r < o.length; r++) if (o[r] != n.values[r]) {
                    i = true;
                    break
                }
            } else i = true; else i = true;
            console.log(n.a("dchange"))
            if (i && (n.values = o, n.values.length > 1 ? n.a({
                    tagvalue: n.values[0],
                    values: o
                }) : n.a("tagvalue", n.values[0]), 
                n.a("dchange"))) {
                var s = window["fun_dchange_" + n.getId()];
                s && s(n)
            }
        }
        if ((l = n.a("vistagname")) && (l = l.toUpperCase(), db[l] && n.s("2d.visible") != db[l].value && n.s("2d.visible", db[l].value)), (l = n.a("enbtagname")) && (l = l.toUpperCase(), n instanceof ht.LiveNode)) {
            var c = db[l];
            c && n.isEnabled() != c.value && n.setEnabled(c.value)
        }
    }), updatecallback && updatecallback(t, null), iframe && parent.updatecallback && parent.updatecallback(t, db)
}

// 开始播放，
function startplayback() {
    if (iframe) parent.startplayback(); 
    else{
        if (_playbackmode) stopplayback();
        else {
            var a = isRuning;
            for (e = 0; e < window.frames.length; e++) {
                window.frames[e].db && (a = a && window.frames[e].isRuning);
            }
            if (!a) return void alert("子窗口控件还没有加载完成,请稍候!");
            if (null == playbackView) {
                var t = (new Date).Format("yyyy-MM-dd hh:mm:ss");
                db.PLAYBACKMODE.time = t,
                db.NORMALMODE.time = t,
                db.PLAYBACKMODE.value = true,
                db.PLAYBACKMODE.changed = true,
                db.NORMALMODE.value = false,
                db.NORMALMODE.changed = false,
                _playbackmode = true,
                _normalmode = false,
                stopAll(),
                _update_view(true),
                playbackpane_init(),
                _playbackTags = "",
                _playbacktagsList.clear(),
                _playbacktagsList.addAll(tagsList.toArray());
                for (e = 0; e < window.frames.length; e++) {
                    window.frames[e].db && (window.frames[e]._playbackmode = true, window.frames[e]._normalmode = false, window.frames[e].tagsList.each(function (a) {
                        _playbacktagsList.contains(a) || _playbacktagsList.add(a)
                    }))
                }
                console.log(_playbacktagsList.size().toString() + "个历史回放变量"),
                _playbackTags = _playbacktagsList.toArray().join(",")
                // console.log(_playbackTags)//几个厂站号，不能重名，算一个
            }
        }
    } 
}

function stopplayback() {
    if (null != playbackView) {
        _playbackmode = false, 
        _normalmode = true;
        for (var a = 0; a < window.frames.length; a++) window.frames[a].db && (window.frames[a]._playbackmode = false, window.frames[a]._normalmode = true);
        var e = (new Date).Format("yyyy-MM-dd hh:mm:ss");
        db.PLAYBACKMODE.time = e, db.NORMALMODE.time = e, db.PLAYBACKMODE.value = false, db.NORMALMODE.value = true, db.PLAYBACKMODE.changed = true, db.NORMALMODE.changed = true, document.body.removeChild(playbackView.getView()), playbackView = null, playbackpane = null, _playbackPaused = false, updateTimerID >= 0 && (clearInterval(updateTimerID), updateTimerID = -1), _playbackDataList.clear(), _playbackStart = 0, _playbackEnd = 0, _currentPlaybackIndex = 0, _currentPlaybackdata = null, _updating = false, _playbackstoped = true, startAll()
    }
}

function queryPlayData(a, e, t, n) {
    console.log("历史回放查询:" + e + " - " + t), 
    $.ajax({
        type: "POST",
        url: "server/scada/playbackquery.ashx",
        async: false,
        data: {tags: a, start: e, end: t, speed: n},
        success: function (a) {
            if (a.length > 0 && !_playbackstoped) {
                if (_playbackDataList.add(a), updateTimerID < 0) {
                    _updating = false, _playbackPaused = false;
                    var e = playbackpane.getItemById("playRate").element.getValue();
                    "number" == typeof e && (updateTimerID = setInterval(updatePlayback, e), animTimerID = setInterval(anim_scada, htconfig.animRate)), hideLoading()
                }
                if (_playbackEnd > _playbackStart) {
                    var t = _playbackStart + 6e5;
                    if (t >= _playbackEnd) {
                        var n = new Date(_playbackStart), i = new Date(_playbackEnd),
                            l = n.getFullYear().toString() + "/" + (n.getMonth() + 1).toString() + "/" + n.getDate().toString() + " " + n.getHours().toString() + ":" + n.getMinutes().toString() + ":" + n.getSeconds().toString(),
                            d = i.getFullYear().toString() + "/" + (i.getMonth() + 1).toString() + "/" + i.getDate().toString() + " " + i.getHours().toString() + ":" + i.getMinutes().toString() + ":" + i.getSeconds().toString();
                        _playbackStart = 0, _playbackEnd = 0, queryPlayData(_playbackTags, l, d, 1), console.log("历史回放查询结束")
                    } else {
                        var n = new Date(_playbackStart), i = new Date(t);
                        _playbackStart = t;
                        var l = n.getFullYear().toString() + "/" + (n.getMonth() + 1).toString() + "/" + n.getDate().toString() + " " + n.getHours().toString() + ":" + n.getMinutes().toString() + ":" + n.getSeconds().toString(),
                            d = i.getFullYear().toString() + "/" + (i.getMonth() + 1).toString() + "/" + i.getDate().toString() + " " + i.getHours().toString() + ":" + i.getMinutes().toString() + ":" + i.getSeconds().toString();
                        queryPlayData(_playbackTags, l, d, 1)
                    }
                }
            }
        },
        error: function () {
            _playbackStart = 0, _playbackEnd = 0, hideLoading(), alert("读取历史回放数据失败!")
        },
        complete: function () {
        },
        dataType: "json"
    })
}

function updatePlayback() {
    if (!_playbackPaused && !_updating && (null == _currentPlaybackdata && _playbackDataList.size() > 0 && (_currentPlaybackdata = _playbackDataList.get(0), _playbackDataList.removeAt(0)), null != _currentPlaybackdata)) if (_currentPlaybackIndex < _currentPlaybackdata.length) {
        var a = _currentPlaybackdata[_currentPlaybackIndex];
        playbackpane && updatePlaybackTitle(a.t), _updatePlaybackTag(a), _currentPlaybackIndex++
    } else _currentPlaybackIndex = 0, _currentPlaybackdata = null, 0 == _playbackDataList.size() && (updateTimerID >= 0 && stopAll(), resetPlaybackView())
}

function _updatePlaybackTag(a) {
    if (a) {
        _currentPlaybacktime = a.t;
        var e = "", t = null, n = null, i = new ht.List;
        for (var l in a.v) e = (t = a.v[l]).i.toUpperCase(), (n = db[e]) && (i.add(e), n.changed = false, n.value != t.v && (n.value = t.v, n.changed = true), n.status != t.s && (n.status = t.s, n.changed || (n.changed = true)), n.time != a.t && (n.time = a.t), iframe ? parent.taginfoPane && parent.taginfoPane.tagname == e && showTagInfo(e) : taginfoPane && taginfoPane.tagname == e && showTagInfo(e)), null != valuechangedcallback && valuechangedcallback(t);
        var d = window.fun_valueupdate;
        d && d();
        var o = new ht.List;
        updateList.each(function (a) {
            var e = a.a("tagname");
            if (e) {
                var t = false;
                for (e = e.toUpperCase(), o.clear(), (d = db[e]) ? (a.tag || (a.tag = d), o.add(d.value), d.changed && (t = true, d.changed = false)) : o.add(null), i = 1; i < 10; i++) (e = a.a("tagname" + i)) ? (e = e.toUpperCase(), (d = db[e]) ? (a["tag" + i] || (a["tag" + i] = d), o.add(d.value), d.changed && (t = true, d.changed = false)) : o.add(null)) : o.add(null);
                var n = o.toArray();
                if (!t) if (a.values) if (n.length == a.values.length) {
                    for (var i = 0; i < n.length; i++) if (n[i] != a.values[i]) {
                        t = true;
                        break
                    }
                } else t = true; else t = true;
                if (t && (a.values = n, a.values.length > 1 ? a.a({
                        tagvalue: a.values[0],
                        values: n
                    }) : a.a("tagvalue", a.values[0]), a.a("dchange"))) {
                    var l = window["fun_dchange_" + a.getId()];
                    l && l(a)
                }
            }
            if ((e = a.a("vistagname")) && (e = e.toUpperCase(), (d = db[e]) && a.s("2d.visible") != d.value && a.s("2d.visible", d.value)), (e = a.a("enbtagname")) && (e = e.toUpperCase(), a instanceof ht.LiveNode)) {
                var d = db[e];
                d && a.isEnabled() != d.value && a.setEnabled(d.value)
            }
        }), iframe ? parent.updatecallback && parent.updatecallback(i, db) : updatecallback && updatecallback(i)
    }
    _updating = false;
    for (l = 0; l < window.frames.length; l++) window.frames[l].db && window.frames[l]._updatePlaybackTag(a)
}

// 变量设置面板出现
function setTagForm(a, e, t) {
    if (iframe) parent.setTagForm(a, e, t); 
    else if (!_playbackmode && tagPanel) {
        if (e || (e = ""), "" == e) return;
        a || (a = "设置标签值"), tagformPane.v({
            name: a,
            tagname: e,
            tagvalue: t
        }), 
        "none" == tagPanel.getView().style.display && (tagPanel.getView().style.display = "", tagformPane.iv())
    }
}
// 变量信息面板出现
function viewTagInfo(a, e) {
    taginfoPane && e && (taginfoPane.tagname = a, taginfoPane.v({
        name: e.desc,
        tagname: a,
        tagvalue: e.value,
        unit: e.unit,
        max: e.max,
        min: e.min,
        time: e.time,
        atype: e.atype
    }),
    "AnalogAlarm" == e.atype ? taginfoPane.v({all: e.all, al: e.al, ah: e.ah, ahh: e.ahh}) : taginfoPane.v({
        all: "",
        al: "",
        ah: "",
        ahh: ""
    }), 
    "none" == taginfoPanel.getView().style.display ? (taginfoPanel.getView().style.display = "", taginfoPanel.iv()) : taginfoPanel.iv())
}

// 展示tagname
function showTagInfo(a) {
    if (iframe) (e = db[a]) && parent.viewTagInfo(a, e); else {
        var e = db[a];
        e && viewTagInfo(a, e)
    }
}

function popupView(a, e, t, n) {
    if (iframe) parent.popupView(a, e, t, n); 
    else if (!_playbackmode) {
        var i = "<iframe width='" + e + "px' height='" + t + "px' src='" + encodeURI("popview.aspx?filename=" + n) + "' frameborder='0' allowtransparency='true' style='background-color=transparent;' scrolling='no'></iframe>",
        l = new ht.widget.Dialog;
        l.setConfig({
            title: a,
            closable: true,
            draggable: true,
            contentPadding: 0,
            width: e,
            height: t,
            content: i
        }), 
        l.show()
    }
}

function display_child(a, e, t) {
    if (!_playbackmode && a) {
        var n = window["iframe_" + a];
        n && e && (closeTagsViewDlg(), 
        n.src = encodeURI("runview.aspx?iframe=1&filename=" + e + (t ? "&param=" + t : "")))
    }
}

function display_child_url(a, e) {
    if (!_playbackmode && a) {
        var t = window["iframe_" + a];
        t && (closeTagsViewDlg(), e && (t.src = encodeURI(e)))
    }
}

function getTag(a) {
    return null != a && "" != a ? (a = a.toUpperCase(), db[a]) : null
}

function getChannel(a) {
    return null != a && "" != a ? (a = a.toUpperCase(), db[a]) : null
}

function getTagValue(a) {
    return null != a && "" != a && (a = a.toUpperCase(), db[a]) ? db[a].value : null
}

function addTags(a) {
    console.log(a)
    if (!_playbackmode && "[object Array]" == Object.prototype.toString.call(a)) for (var e in a) addTag(a[e])
}

function updateChange() {
    _tagschanged = true
}


function createTag(a) {
    if (!_playbackmode && null != a && "" != a) {
        var e = a.toUpperCase();
        db[e] || (db[e] = {
            name: e,
            type: "",
            value: null,
            status: 0,
            alarm: 0,
            digcount: 0,
            desc: "",
            unit: "",
            time: "",
            min: 0,
            max: 0,
            atype: "",
            al: 0,
            all: 0,
            ah: 0,
            ahh: 0,
            ad: 0
        })
    }
}

// 创建本地运行模式
function createLocalRuntimeTags() {
    var a = (new Date).Format("yyyy-MM-dd hh:mm:ss");
    if (!iframe) {
        e = "PLAYBACKMODE";
        db[e] || (db[e] = {
            name: e,
            type: "Boolean",
            value: false,
            status: 1,
            alarm: 0,
            digcount: 0,
            desc: "历史回放模式",
            unit: "",
            time: a,
            min: 0,
            max: 1,
            atype: "",
            al: 0,
            all: 0,
            ah: 0,
            ahh: 0,
            ad: 0
        }), 
        e = "NORMALMODE", 
        db[e] || (db[e] = {
            name: e,
            type: "Boolean",
            value: true,
            status: 1,
            alarm: 0,
            digcount: 0,
            desc: "正常运行模式",
            unit: "",
            time: a,
            min: 0,
            max: 1,
            atype: "",
            al: 0,
            all: 0,
            ah: 0,
            ahh: 0,
            ad: 0
        })
    }
    var e = "IOERROR";
    db[e] || (db[e] = {
        name: e,
        type: "Boolean",
        value: false,
        status: 1,
        alarm: 0,
        digcount: 0,
        desc: "本地通讯故障",
        unit: "",
        time: a,
        min: 0,
        max: 1,
        atype: "",
        al: 0,
        all: 0,
        ah: 0,
        ahh: 0,
        ad: 0
    })
}

function addTag(a) {
    if (!_playbackmode && "string" == typeof a && "" != a) {
        var e = a.toUpperCase();
        tagsList.contains(e) || (isRuning ? (tagsList.add(e), tags += "," + e, db[e] = {
            name: e,
            type: "",
            value: null,
            status: 0,
            alarm: 0,
            digcount: 0,
            desc: "",
            unit: "",
            time: "",
            min: 0,
            max: 0,
            atype: "",
            al: 0,
            all: 0,
            ah: 0,
            ahh: 0,
            ad: 0
        }) : tagsList.add(e))
    }
}

function writetag(a, e, t) {
    if (!(iframe && parent._playbackmode || _playbackmode || isReadonly || null == a)) {
        if ("" == a) return;
        if (null == e) {
            var n = "0", 
                i = a.toUpperCase();
                db[i] && (n = db[i].value), 
                e = getinputvalue("Please input value", n)
        }
        if (null != e && "" != e) {
            var l = {command: "writetag", tagname: a, value: e};
            $.post("server/scada/command.ashx", l, function (a) {
                t && t(a)
            }, "json")
        }
    }
}

function addtagvalue(a, e, t) {
    if (!(iframe && parent._playbackmode || _playbackmode || isReadonly || null == a || null == e)) {
        if ("" == a) return;
        var n = {command: "addtagvalue", tagname: a, value: e};
        $.post("server/scada/command.ashx", n, function (a) {
            t && t(a)
        }, "json")
    }
}

function toggletag(a, e) {
    if (!(iframe && parent._playbackmode || _playbackmode || isReadonly || null == a)) {
        if ("" == a) return;
        var t = {command: "toggletag", tagname: a};
        $.post("server/scada/command.ashx", t, function (a) {
            e && e(a)
        }, "json")
    }
}

function sendcommand(a, e, t) {
    if (!_playbackmode && !isReadonly && null != tag) {
        if ("" == e) return;
        var n = {command: "usercommand", tagname: a, value: e};
        $.post("server/scada/command.ashx", n, function (a) {
            t && t(a)
        }, "json")
    }
}

function updateDBTag(a, e) {
    if (!_playbackmode && !isReadonly && null != a) {
        var t = {cmd: "updatetag", param1: a}, n = {command: "usercommand", tagname: "pdb", value: JSON.stringify(t)};
        $.post("server/scada/command.ashx", n, function (a) {
            e && e(a)
        }, "json")
    }
}

function sendExtCommand(a, e) {
    if (!_playbackmode && null != a) {
        var t = {cmd: "extcmd", param1: "AlarmMessage", param2: a},
            n = {command: "usercommand", tagname: "ioclient", value: JSON.stringify(t)};
        $.post("server/scada/command.ashx", n, function (a) {
            e && e(a)
        }, "json")
    }
}

function updateAlarmSetting(a, e, t, n, i, l) {
    if ("string" == typeof a && "number" == typeof t && "number" == typeof e && "number" == typeof n && "number" == typeof i) {
        var d = {tagname: a, ll: e, l: t, h: n, hh: i};
        $.post("server/scada/updateAlarmSetting.ashx", d, function (d) {
            if (0 == d.status) {
                var o = db[a];
                o && (o.all = e, o.al = t, o.ah = n, o.ahh = i)
            }
            l && l(d)
        }, "json")
    }
}

function changeAlarmType(a, e, t) {
    if ("string" == typeof a && "number" == typeof e) {
        var n = {tagname: a = a.toUpperCase(), value: e};
        $.post("server/scada/changeAlarmType.ashx", n, function (n) {
            if (0 == n.status) {
                var i = db[a];
                i && (0 == e ? i.atype = "NotAlarm" : 1 == e ? i.atype = "AnalogAlarm" : 2 == e ? i.atype = "TimeOutAlarm" : 3 == e ? i.atype = "OnAlarm" : 4 == e ? i.atype = "OffAlarm" : 5 == e && (i.atype = "ChangeAlarm"))
            }
            t && t(n)
        }, "json")
    }
}
// 高级-放大
function zoomIn() {
    iframe ? parent.zoomIn(true) : g2d.zoomIn(true)
}
// 高级-缩小
function zoomOut() {
    iframe ? parent.zoomOut(true) : g2d.zoomOut(true)
}
// 高级-复原
function zoomReset() {
    iframe ? parent.zoomReset(true) : g2d.zoomReset(true)
}
// 自动
function fitContent() {
    iframe ? parent.fitContent() : g2d.fitContent(false, 0)
}

// 高级-还原坐标点
function moveToDefault() {
    iframe ? isPannable ? g2d.setTranslate(0, 0) : parent.moveToDefault() : g2d.setTranslate(0, 0)
}

// 高级-刷新
function invalidateAll() {
    iframe ? (parent.invalidateAll(), invalidateAll()) : g2d.invalidateAll()
}

function queryLog(a, e, t, n) {
    if (t) {
        var i = {plug: "ioclient", start: "", end: "", type: t};
        $.post("server/scada/query_log.ashx", i, function (a) {
            if (n) n(a); 
            else if (a.length > 0) for (var e in a) console.log(JSON.stringify(a[e]))
        }, "json")
    }
}

// 更新数据
function current_value() {
    var data = new Date();
    var Msecond = data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate() + '-' + data.getHours() + '-' + data.getMinutes() + '-' + data.getSeconds();

    $.post('', {idAll:idAll},function(result){
        idAllNode.forEach(function(a){
            result.map(function(item){
                if (item.station_id == a.a('station_id') && item.equipment_id == a.a('faci_id') && item.signal_id == a.a('signal_id')) {
                    a.a('tagvalue', item.current_value)
                }
            })
        })
    })
}