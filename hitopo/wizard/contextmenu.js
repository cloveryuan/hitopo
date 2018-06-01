//上下文菜单定义
function runtime_initContextMenu() {
    var _tagnameMenu = {
        label: "tagname",
        tagname: "",
        action: function () {
            showTagInfo(_tagnameMenu.tagname);
        }
    };

    var _tagsMenu = {
        label: "画面数据库",
        tags: "",
        action: function () {
            viewCurrentTags();
        }
    };

    var _trendMenu = {
        label: "实时趋势",
        tags: "",
        action: function () {
            openrealtrend("tags=" + _trendMenu.tags);
        }
    };

    var _histrendMenu = {
        label: "历史趋势",
        tags: "",
        action: function () {
            openhistrend("tags=" + _histrendMenu.tags);
        }
    };

    var _tagnameMenu1 = {
        label: "tagname",
        tagname: "",
        action: function () {
            showTagInfo(_tagnameMenu1.tagname);
        }
    };

    var _tagnameMenu2 = {
        label: "tagname",
        tagname: "",
        action: function () {
            showTagInfo(_tagnameMenu2.tagname);
        }
    };

    var _tagnameMenu3 = {
        label: "tagname",
        tagname: "",
        action: function () {
            showTagInfo(_tagnameMenu3.tagname);
        }
    };

    var _tagnameMenu4 = {
        label: "tagname",
        tagname: "",
        action: function () {
            showTagInfo(_tagnameMenu4.tagname);
        }
    };

    var _tagnameMenu5 = {
        label: "tagname",
        tagname: "",
        action: function () {
            showTagInfo(_tagnameMenu5.tagname);
        }
    };

    var _tagnameMenu6 = {
        label: "tagname",
        tagname: "",
        action: function () {
            showTagInfo(_tagnameMenu6.tagname);
        }
    };

    var _tagnameMenu7 = {
        label: "tagname",
        tagname: "",
        action: function () {
            showTagInfo(_tagnameMenu7.tagname);
        }
    };

    var _tagnameMenu8 = {
        label: "tagname",
        tagname: "",
        action: function () {
            showTagInfo(_tagnameMenu8.tagname);
        }
    };

    var _tagnameMenu9 = {
        label: "tagname",
        tagname: "",
        action: function () {
            showTagInfo(_tagnameMenu9.tagname);
        }
    };

    var _vistagnameMenu = {
        label: "tagname",
        tagname: "",
        action: function () {
            showTagInfo(_vistagnameMenu.tagname);
        }
    };


    var _zoominMenu = {
        label: "放大",
        action: function () {
            zoomIn();
        }
    };

    var _zoomoutMenu = {
        label: "缩小",
        action: function () {
            zoomOut();
        }
    };

    var _zoomresetMenu = {
        label: "还原缩放",
        action: function () {
            zoomReset();
        }
    };
    var _autofillMenu = {
        label: "自动适应画面",
        action: function () {
            fitContent();
        }
    };

    var _playbackMenu = {
        label: "历史回放",
        type: "check",
        selected: _playbackmode,
        action: function () {
            if (!_playbackmode)
                startplayback();
            else
                stopplayback();
        }
    };

    var _moveMenu = {
        label: "平移",
        type: "check",
        selected: isPannable,
        action: function () {
            isPannable = _moveMenu.selected;
        }
    };

    var _zorepostionMenu = {
        label: "还原坐标点",
        action: function () {
            moveToDefault();
        }
    };

    var _updateMenu = {
        label: "刷新",
        action: function () {
            invalidateAll();
        }
    };
    contextMenu = new ht.widget.ContextMenu();
    contextMenu.addTo(g2d.getView());
    contextMenu.afterShow = function () {
    };
    contextMenu.afterHide = function () {
    };
    contextMenu.beforeShow = function () {
        var slist = new ht.List();
        _playbackMenu.selected = _playbackmode;
        var l = dataModel.getSelectionModel().size();

        if (l == 0) {
            slist.add(_tagsMenu);//画面数据库
            slist.add(_zoominMenu);//放大
            slist.add(_zoomoutMenu);//缩小
            slist.add(_zoomresetMenu);//还原缩放
            slist.add(_autofillMenu);//自动适应
            slist.add(_zorepostionMenu);//还原坐标原点
            if (!iframe) {
                slist.add(_moveMenu);//平移
            }
            slist.add(_playbackMenu);//历史回放
            slist.add(_updateMenu);//刷新
        }
        if (l == 1) {
            var seldata = dataModel.getSelectionModel().getFirstData();
            if (seldata) {
                var tags = "";
                if (seldata.a("tagname")) {
                    var tag = seldata.a("tagname");
                    if (tag != "") {
                        var tagobj = db[tag];
                        if (tagobj) {
                            _tagnameMenu.label = tag + (tagobj.desc == "" ? "" : "(" + tagobj.desc + ")");
                            _tagnameMenu.tagname = tag;
                            slist.add(_tagnameMenu);
                            tags = tag;
                        }
                    }
                }
                

                if (seldata.a("vistagname")) {
                    var tag = seldata.a("vistagname");
                    if (tag != "") {
                        var tagobj = db[tag];
                        if (tagobj) {
                            _vistagnameMenu.label = tag + (tagobj.desc == "" ? "" : "(" + tagobj.desc + ")");
                            _vistagnameMenu.tagname = tag;
                            slist.add(_vistagnameMenu);
                            if (tags == "")
                                tags = tag;
                            else
                                tags += "," + tag;
                        }
                    }
                }


                for (var i = 1; i < 10; i++) {
                    if (seldata.a("tagname" + i.toString())) {
                        var tag = seldata.a("tagname" + i.toString());
                        if (tag != "") {
                            var tagobj = db[tag];
                            if (tagobj) {
                                var tmenu = eval("_tagnameMenu" + i.toString());
                                if (tmenu) {
                                    tmenu.label = tag + (tagobj.desc == "" ? "" : "(" + tagobj.desc + ")");
                                    tmenu.tagname = tag;
                                    slist.add(tmenu);
                                    if (tags == "")
                                        tags = tag;
                                    else
                                        tags += "," + tag;
                                }
                            }
                        }
                    }
                }

                if (tags != "") {
                    _trendMenu.tags = tags;
                    slist.add(_trendMenu);
                    _histrendMenu.tags = tags;
                    slist.add(_histrendMenu);
                }
            }
        }
        if (slist.size() == 0) {
            slist.add(_tagsMenu);
            slist.add(_zoominMenu);
            slist.add(_zoomoutMenu);
            slist.add(_zoomresetMenu);
            slist.add(_autofillMenu);
            slist.add(_zorepostionMenu);
            if (!iframe) {
                slist.add(_moveMenu);
            }
            slist.add(_playbackMenu);
            slist.add(_updateMenu);
        }
        contextMenu.setItems(slist.toArray());
    };
}

runtime_initContextMenu();