﻿function clearSelected(e) {
    console.log(e)
    viewstate = e,
        viewallMenu.selected = 0 == e,
        onlyscriptdMenu.selected = 2 == e,
        onlytagMenu.selected = 3 == e,
        onlynotvisibledMenu.selected = 1 == e,
        onlynotselectMenu.selected = 4 == e
}

function resettimer() {
    autoSaveTimer > 0 && window.clearInterval(autoSaveTimer),
        autoSaveTimer = window.setInterval("iead()", autoSaveInteval)
}

function datavisible(e) {
    // console.log(e)
    if (searchMode) {
        var t = !1;
        if (hastext) if (e instanceof ht.ButtonNode || e instanceof ht.ToggleButtonNode) {
            if (null != (a = e.s("live.label")) && "" != a) {
                n = searchname.toLowerCase();
                t = a.toLowerCase().indexOf(n) >= 0
            }
        } else if (null != (a = e.getName()) && "" != a) {
            n = searchname.toLowerCase();
            t = a.toLowerCase().indexOf(n) >= 0
        }
        if (!t && hashttag) {
            var a = e.getTag();
            t = a == searchname
        }
        if (!t && hastagname) {
            var n = searchname.toLowerCase(), o = e.a("tagname");
            for (o && (t = (o = o.toLowerCase()) == n), t || (o = e.a("vistagname")) && (t = (o = o.toLowerCase()) == n), t || (o = e.a("flashtagname")) && (t = (o = o.toLowerCase()) == n), t || (o = e.a("enbtagname")) && (t = (o = o.toLowerCase()) == n), i = 1; i < 10 && !((o = e.a("tagname" + i)) && (o = o.toLowerCase(), t = o == n)); i++);
        }
        return t
    }
    var r = e.getLayer();

    return !(r && !layersView[r]) && (1 == viewstate ? !e.s("2d.visible") : 2 == viewstate ? isScript(e) : 3 == viewstate ? e.a("tagname") : 4 == viewstate ? !e.s("2d.selectable") : e.s("2d.visible"))
}

function init() {
    autoSaveTimer = window.setInterval("iead()", autoSaveInteval),
        dataModel = new ht.DataModel,
        dm = dataModel,

        dataModel.onAdded = function (e) {
            //LiveNode交互图元
            // enabled 是否启用(boolean) ，未启用的图元显示为灰色，通过isEnabled()获取值、setEnabled(value)设置值
            // editable 是否可编辑(boolean) ，不可编辑的图元不能响应鼠标、键盘等事件，通过isEditable()获取值、setEditable(value)设置值
            //     e instanceof ht.LiveNode ? console.log(e instanceof ht.LiveNode && (e.isEditable() && e.setEditable(!1), null != e.a("Enabled") && (e.a("Enabled") || e.setEnabled(!1)))
            // ):console.log(4)
            e instanceof ht.LiveNode && (e.isEditable() && e.setEditable(!1), null != e.a("Enabled") && (e.a("Enabled") || e.setEnabled(!1)))
        },

        palette = new ht.widget.Palette,
        toolbar = new ht.widget.Toolbar(toolbar_options);
        var e = new ht.widget.ContextMenu;
        e.addTo(toolbar.getView()),//参数为HTML元素，使其支持右键菜单
        e.setItems([]),//setItems(json)设置菜单项，参数为JSON对象

        g2d = new ht.graph.GraphView(dataModel),
        g2d.isPannable = function () {
            var e = ht.Default.isShiftDown();//判断是否Shift键被按下
            // console.log(isPannable || e)
            return isPannable || e
        },
        g2d.getView().addEventListener("keydown", function (e) {
            27 == e.keyCode && g2d.dm().sm().cs()
            //    esc按下 或者 
        }),
        window.onkeydown = function (e) {
            27 == e.keyCode && drawing && resetDefault()
        },
        g2d.isVisible = datavisible,
        g2d.setLayers(layers),
        historyManager = new ht.HistoryManager(dataModel),
        treeView = new ht.widget.TreeView(dataModel),
        treeView.isVisible = datavisible,
        treeView.setIndent(16),
        propertyPane = new ht.widget.PropertyPane(dataModel);

        var t = new ht.widget.ContextMenu;
        t.addTo(propertyPane.getView()),
        t.setItems([]),
        propertyView = propertyPane.getPropertyView(),
        propertyView.enableToolTip(),
        t.beforeShow = function (e) {//beforeShow(event)菜单显示之前被调用，可以重写菜单项
            var a = propertyView.getCurrentData();//getCurrentData()获取当前显示对象
            if (a) {
                var n = propertyView.getPropertyAt(e);//getPropertyAt(event)返回event事件所在的行的属性信息
                n ? n._name.indexOf("tagname") >= 0 ? t.setItems([{
                    label: "设置标签", 
                    action: function () {
                        showTagsDialog(function (e) {
                            if (e.size() > 0) {
                                var t = e.get(0), i = "" == t.a("plug") ? t.a("id") : t.a("plug") + "." + t.a("id");
                                a.a(n._name, i)
                            }
                        }, !0)
                    }
                }, { label: "取消" }])          :         "filename" == n._name ? t.setItems([{
                    label: "选择文件", action: function () {
                        selectFileName(function (e) {
                            e && a.a(n._name, e)
                        })
                    }
                }, { label: "取消" }]) : "param" == n._name ? t.setItems([{
                    label: "选择替换文件", action: function () {
                        selectParamName(function (e) {
                            e && a.a(n._name, e)
                        })
                    }
                }, { label: "取消" }]) : t.setItems([]) : t.setItems([])
            } else t.setItems([])
        }, rulerFrame = new ht.widget.RulerFrame(g2d);
    var a = new ht.widget.ContextMenu;
    a.addTo(rulerFrame.getView()), a.setItems([]), 
    borderPane = new ht.widget.BorderPane,
    leftSplit = new ht.widget.SplitView(palette, borderPane, "h", 260),
    rightSplit = new ht.widget.SplitView(treeView, propertyPane, "v", .3), 
    mainSplit = new ht.widget.SplitView(leftSplit, rightSplit, "h", -260), 
    g2d.editing = !0;
    var n = createMenu(), i = new ht.widget.ContextMenu;
    i.addTo(n.getView()), i.setItems([]);
    var o = new ht.widget.SplitView(n, mainSplit, "v", 24);
    o.setDraggable(!1), toolbar.enableToolTip(), 
    borderPane.setTopView(toolbar), 
    borderPane.setCenterView(rulerFrame), initPalette(), initGraphView(), initContextMenu(), initTreeView(), initTreeContextMenu(), initPropertyView(), initpaletteContextMenu(), resetDefault(), view = o.getView(), view.className = "main", document.body.appendChild(view), window.addEventListener("resize", function (e) {
        o.invalidate()
    }, !1), "" != openfile ? openFile(openfile) : createFrameBorder(1024, 768), tagconfig_init(), updateToolbar(), 
    tagreplace_init(), textreplace_init()
}

function resetDefault() {
    defaultItem.selected ? (g2d.setEditable(!0), palette.sm().cs()) : (defaultItem.selected = !0, g2d.setEditable(!0), toolbar.iv(), palette.sm().cs()),
        drawing = !1
}

// 组件面板
function initPalette() {
    var e = !0;
    for (var t in palette_config) {
        var a = palette_config[t],
        n = new ht.Group;
        n.setName(a.name), 
        n.setTag(a.name), 
        n.setExpanded(e), 
        e = !1, 
        palette.dm().add(n), 
        a.items.forEach(function (e) {
            var t = new ht.Node;
            palette.dm().add(t), //节点同样也得添加到 palette 的数据容器中进行存储
            t.setName(e.name), 
            t.setImage(e.image), 
            t.item = e, 
            t.s({
                "image.stretch": e.stretch || "centerUniform",// 设置节点显示图片为填充的方式，这样不同比例的图片也不会因为拉伸而导致变形
                // draggable: void 0 === e.draggable || e.draggable,
                'draggable': e.draggable === undefined ? true : e.draggable// 设置节点是否可被拖拽
            }), 
            n.addChild(t) // 将节点设置为 group 组的孩子
        })
    }

    // 引入共享控件，用户图片显示在面板属性中
    if (clipGroup = new ht.Group, clipGroup.setName("共享控件"), clipGroup.setTag("共享控件"), clipGroup.setExpanded(!1), palette.dm().add(clipGroup), initclipGroup(), 

    imagegroup = new ht.Group, imagegroup.setName("用户图片"), imagegroup.setTag("用户图片"), imagegroup.inited = !1, imagegroup.updating = !1, imagegroup.setExpanded(!1), palette.dm().add(imagegroup), imagegroup.onPropertyChanged = function (e) {
        "expanded" == e.property && e.newValue && (this.inited || this.updating || (this.updating = !0, $.post("server/getuserimage.ashx", {}, function (e) {
            e.forEach(function (e) {
                var t = new ht.Node;
                palette.dm().add(t), t.setName(e),
                    // t.setImage("images/user/" + e),
                    t.setImage("./images/user/" + e),
                    t.item = t.getImage(), 
                    t.s({
                        "image.stretch": "centerUniform",
                        draggable: !0
                    }), 
                    imagegroup.addChild(t)
            }), imagegroup.inited = !0
        })))
    }, viewPicLib) for (var i in imagedir) {
        var o = new ht.Group;
        o.inited = !1, o.updating = !1, o.setName("图片-" + imagedir[i]), o.setTag(imagedir[i]), o.setExpanded(!1), palette.dm().add(o), o.onPropertyChanged = function (e) {
            if ("expanded" == e.property && e.newValue && !this.inited && !this.updating) {
                this.updating = !0;
                var t = this.getTag(), a = this;
                $.post("server/getimagefiles.ashx", { dir: t }, function (e) {
                    e.forEach(function (e) {
                        var n = new ht.Node;
                        palette.dm().add(n), 
                        n.setName(e),
                        n.setImage("images/control/" + t + "/" + e), 
                        n.item = n.getImage(), 
                        n.s({
                            "image.stretch": "centerUniform",
                            draggable: !0
                        }), a.addChild(n)
                    }), a.inited = !0
                })
            }
        }
    }
    palette.sm().ms(function () {
        var e = palette.dm().sm().ld();
        if (e) {
            var t = e.item;
            if (void 0 !== t.edgeType) return defaultItem.selected = !1, toolbar.iv(), void g2d.setInteractors([new CreateEdgeInteractor(g2d, t.edgeType), new ht.graph.DefaultInteractor(g2d)]);
            if (void 0 !== t.shapeType) return defaultItem.selected = !1, toolbar.iv(), void g2d.setInteractors([new CreateShapeInteractor(g2d, t.shapeType, t.line), new ht.graph.DefaultInteractor(g2d)]);
            if ("parent" === t.operation) return defaultItem.selected = !1, toolbar.iv(), void g2d.setInteractors([new ParentInteractor(g2d), new ht.graph.DefaultInteractor(g2d)]);
            if ("host" === t.operation) return defaultItem.selected = !1, toolbar.iv(), void g2d.setInteractors([new HostInteractor(g2d), new ht.graph.DefaultInteractor(g2d)]);
            if ("icon" === t.operation) return defaultItem.selected = !1, toolbar.iv(), void g2d.setInteractors([new IconInteractor(g2d), new ht.graph.DefaultInteractor(g2d)]);
            if (void 0 !== t.geometryType) return defaultItem.selected = !1, toolbar.iv(), void g2d.setInteractors([new GeometryInteractor(g2d, t.geometryType)])
        }
    })
}

function initclipGroup() {
    for (var e in clipcontrols) {
        var t = clipcontrols[e], 
        a = new ht.Node;
        palette.dm().add(a),
            a.setName(t.name),
            a.setImage("clipobject"),
            a.item = t.id, 
            a.setToolTip(t.name + "\r\n" + t.time), 
            a.s({
                "image.stretch": "centerUniform",
                draggable: !0
            }), 
            clipGroup.addChild(a)
    }
}
// 初始化拓扑图
function initGraphView() {
    g2d.enableToolTip(), g2d.addInteractorListener(function (e) {
        var t = g2d.sm().getSelection();
        "beginMove" === e.kind ? t.each(function (e) {
            e.s("select.width", 0), e.s("2d.editable", !1)
        }) : "endMove" === e.kind && t.each(function (e) {
            e.s("select.width", ht.Style["select.width"]), e.s("2d.editable", !0)
        })
    }), g2d.getNodeBorderColor = function () {
        return "rgba(0,0,0,0)"
    }, g2d.sm().ms(function () {
        if (updateToolbar(), !ht.Default.isShiftDown()) {
            var e = g2d.sm().ld();
            if (!e) return;
            var t = e.s("_groupId");
            t && g2d.dm().each(function (e) {
                e.s("_groupId") === t && g2d.sm().as(e)
            })
        }
    }), g2d.mi(function (e) {
        "beginEditRect" === e.kind || "beginEditRotation" === e.kind ? g2d.sm().each(function (e) {
            e.__host = e.getHost(), e.setHost(null)
        }) : "endEditRect" !== e.kind && "endEditRotation" !== e.kind || g2d.sm().each(function (e) {
            e.setHost(e.__host), delete e.__host
        })
    }), g2d.getToolTip = function (e) {
        var t = this.getDataAt(e);
        if (t) {
            var a = this.getIconInfoAt(e);
            return a ? a.name : t.getToolTip()
        }
        return null
    }, editInteractor = new ht.graph.XEditInteractor(g2d), editInteractor.onEdgeCreated = function (e, t) {
        t.setLayer("nodeLayer")
    }, g2d.setEditable = function (e) {
        var t = this, a = new NodeOperationInteractor(g2d);
        clip = a, e ? t.setInteractors(new ht.List([new ht.graph.SelectInteractor(t), editInteractor, new ht.graph.SnapMoveInteractor(t), new ht.graph.DefaultInteractor(t), new ht.graph.SnapTouchInteractor(t, { editable: !1 }), a])) : t.setInteractors(new ht.List([new ht.graph.SelectInteractor(t), new ht.graph.SnapMoveInteractor(t), new ht.graph.DefaultInteractor(t), new ht.graph.SnapTouchInteractor(t, { editable: !1 }), a])), snap && g2d.setSnapSpacing(gridSpace)
    }, ht.Default.isTouchable ? palette.handleDragAndDrop = function (e, t) {
        ht.Default.containedInView(e, g2d) && ("between" === t ? handleOver(e) : "end" === t && handleDrop(e))
    } : (g2d.getView().addEventListener("dragover", function (e) {
        e.dataTransfer.dropEffect = "copy", handleOver(e)
    }), g2d.getView().addEventListener("drop", function (e) {
        handleDrop(e)
    }));
    var e = ht.Default.isTouchable ? "touchend" : "mouseup";
    g2d.getView().addEventListener(e, function (e) {
        lastPt = g2d.getLogicalPoint(e), pannabling = !1
    }), startpoint = null, g2d.getView().addEventListener("mousedown", function (e) {
        1 == e.button && (startpoint = g2d.getLogicalPoint(e), pannabling = !0)
    }), g2d.getView().addEventListener("mousemove", function (e) {
        var t = g2d.getLogicalPoint(e), a = "X:" + t.x.toFixed(0) + " Y:" + t.y.toFixed(0);
        toolbar.getItemById("position").label = a, toolbar.redraw(), window.status = a, pannabling && g2d.setTranslate(g2d.tx() + t.x - startpoint.x, g2d.ty() + t.y - startpoint.y, !0)
    }), g2d.addBottomPainter(new ht.graph.GridPainter(g2d))
}

function initpaletteContextMenu() {
    var e = new ht.widget.ContextMenu;
    e.setItems([]), e.addTo(palette.getView())
}

function initContextMenu() {
    contextMenu = new ht.widget.ContextMenu, contextMenu.addTo(g2d.getView()), contextMenu.afterShow = function () {
        editInteractor._pause = !0
    }, contextMenu.afterHide = function () {
        editInteractor._pause = !1
    }, contextMenu.beforeShow = function (e) {
        if (lastPt = g2d.getLogicalPoint(e), editInteractor._hoverSegmentIndex >= 0) {
            var t = null, a = editInteractor._shape || editInteractor._edge;
            if (a instanceof ht.Shape) t = (n = a.getSegments() || editInteractor.getDefaultSegments(a)).get(editInteractor._hoverSegmentIndex); else if (a instanceof ht.Edge) {
                var n = a.s("edge.segments") || editInteractor.getDefaultSegments(a);
                t = n.get(editInteractor._hoverSegmentIndex)
            }
            contextMenuChangeToMove.selected = 1 === t, contextMenuChangeToLine.selected = 2 === t, contextMenuChangeToQuadratic.selected = 3 === t, contextMenuChangeToBezier.selected = 4 === t, contextMenu.setItems([contextMenuAddPoint, contextMenuChangeToMove, contextMenuChangeToLine, contextMenuChangeToQuadratic, contextMenuChangeToBezier])
        } else if (editInteractor._removePointIndex >= 0) contextMenu.setItems([contextMenuRemovePoint]); else {
            var i = new ht.List, o = dataModel.getSelectionModel().size();
            if (o > 0 && (1 == o ? dm.sm().fd() instanceof ht.Edge || (i.add(contextMenuCopy), i.add(contextMenuCut), i.add(contextMenuSave), i.add(copyMirrorMenu)) : (i.add(contextMenuCopy), i.add(contextMenuCut), i.add(contextMenuSave), i.add(copyMirrorMenu)), clip.clipboard && i.add(contextMenuPaste), i.add(contextMenuDelete), i.add(contextMenuPasteControl)), 0 == o && (clip.clipboard && i.add(contextMenuPaste), i.add(contextMenuPasteControl), i.add("separator"), i.add(viewallMenu), i.add(onlynotvisibledMenu), i.add(onlyscriptdMenu), i.add(onlytagMenu), i.add(onlynotselectMenu)), 1 == o) {
                var r = dataModel.getSelectionModel().getFirstData();
                r && (r instanceof ht.Script ? i.add(contextScript) : r instanceof ht.Html ? i.add(contextHtml) : r instanceof ht.Text ? (i.add(textEditMenu), i.add(contextMenuScript), i.add(contextNodeClickScript)) : (i.add(contextMenuScript), r instanceof ht.LiveNode ? r instanceof ht.ToggleButtonNode ? i.add(contexValueChangeScript) : r instanceof ht.ButtonNode ? i.add(contextButtonClickScript) : r instanceof ht.ProgressBarNode || i.add(contexValueChangeScript) : i.add(contextNodeClickScript)))
            } else o > 0 && (i.add(contextbathClickScript), i.add(contextbathMenuScript));
            contextMenu.setItems(i.toArray())
        }
    }
}

function updateToolbar() {
    var e = g2d.sm().size();
    1 == e && g2d.sm().ld().s("_gp") ? toolbar.getItemById("ungroup").disabled = !1 : toolbar.getItemById("ungroup").disabled = !0;
    var t = e < 2;
    toolbar.getItemById("group").disabled = t, toolbar.getItemById("align_left").disabled = t, toolbar.getItemById("align_horizontalcenter").disabled = t, toolbar.getItemById("align_right").disabled = t, toolbar.getItemById("align_top").disabled = t, toolbar.getItemById("align_verticalcenter").disabled = t, toolbar.getItemById("align_bottom").disabled = t, toolbar.getItemById("align_even_horizontal").disabled = t, toolbar.getItemById("align_even_vertical").disabled = t, toolbar.getItemById("samewidth").disabled = t, toolbar.getItemById("sameheight").disabled = t, toolbar.getItemById("run").disabled = "" == HT2dEditor.currScene.filename || isnew, toolbar.iv()
}

function initTreeContextMenu() {
    treecontextMenu = new ht.widget.ContextMenu, treecontextMenu.addTo(treeView.getView()), treecontextMenu.afterShow = function () {
        editInteractor._pause = !0
    }, treecontextMenu.afterHide = function () {
        editInteractor._pause = !1
    }, treecontextMenu.beforeShow = function (e) {
        var t = new ht.List, a = dataModel.getSelectionModel().size();
        if (a > 0 && (t.add(contextMenuCopy), t.add(contextMenuSave), t.add(contextMenuCut), t.add(contextMenuDelete), t.add(copyMirrorMenu)), 1 == a) {
            var n = dataModel.getSelectionModel().getFirstData();
            n && (n instanceof ht.Script ? t.add(contextScript) : n instanceof ht.Html ? t.add(contextHtml) : n instanceof ht.Text ? (t.add(textEditMenu), t.add(contextMenuScript), t.add(contextNodeClickScript)) : (t.add(contextMenuScript), n instanceof ht.LiveNode ? n instanceof ht.ToggleButtonNode ? t.add(contexValueChangeScript) : n instanceof ht.ButtonNode ? t.add(contextButtonClickScript) : n instanceof ht.ProgressBarNode || t.add(contexValueChangeScript) : t.add(contextNodeClickScript)))
        } else a > 0 && (t.add(contextbathClickScript), t.add(contextbathMenuScript));
        treecontextMenu.setItems(t.toArray())
    }
}

function initTreeView() {
    treeView.getLabel = function (e) {
        return e.getTag() || e.getName() || e.getId()
    }
}

function initPropertyView() {
    dataModel.sm().ms(function (e) {
        propertyView.setProperties(null);
        var t = dataModel.sm().ld();
        if (t ? (currentData = t, currentData instanceof ht.ButtonNode || currentData instanceof ht.ToggleButtonNode ? tagformPane.v("name", currentData.s("live.label") || "") : tagformPane.v("name", t.getName() || ""), tagformPane.v("tagname", t.a("tagname") || ""), tagformPane.v("tagname1", t.a("tagname1") || ""), tagformPane.v("tagname2", t.a("tagname2") || ""), tagformPane.v("tagname3", t.a("tagname3") || ""), tagformPane.v("tagname4", t.a("tagname4") || ""), tagformPane.v("tagname5", t.a("tagname5") || ""), tagformPane.v("tagname6", t.a("tagname6") || ""), tagformPane.v("tagname7", t.a("tagname7") || ""), tagformPane.v("tagname8", t.a("tagname8") || ""), tagformPane.v("tagname9", t.a("tagname9") || ""), tagformPane.v("vistagname", t.a("vistagname") || ""), tagformPane.v("flashtagname", t.a("flashtagname") || ""), t instanceof ht.Shape || t.s("shape") ? (tagformPane.getItemById("flashtagname").element.setDisabled(!1), tagformPane.getItemById("flashbutton").element.setDisabled(!1)) : (tagformPane.getItemById("flashtagname").element.setDisabled(!0), tagformPane.getItemById("flashbutton").element.setDisabled(!0)), "none" == tagPanel.getView().style.display && (tagPanel.getView().style.display = "")) : (currentData = null, tagformPane.v("name", ""), tagformPane.v("tagname", ""), tagformPane.v("tagname1", ""), tagformPane.v("tagname2", ""), tagformPane.v("tagname3", ""), tagformPane.v("tagname4", ""), tagformPane.v("tagname5", ""), tagformPane.v("tagname6", ""), tagformPane.v("tagname7", ""), tagformPane.v("tagname8", ""), tagformPane.v("tagname9", ""), tagformPane.v("vistagname", ""), tagformPane.v("flashtagname", ""), "none" != tagPanel.getView().style.display && (tagPanel.getView().style.display = "none")), t) {
            if (t.getImage) {
                var a = t.getImage();
                if ("string" == typeof a) {
                    window[a + "_properties"] && propertyView.addProperties(window[a + "_properties"]), "UserShape" == a && propertyView.addProperties(shape_properties);
                    var n = "usertag_" + a + "_properties";
                    window[n] ? propertyView.addProperties(window[n]) : propertyView.addProperties(tag_properties)
                } else propertyView.addProperties(tag_properties)
            } else propertyView.addProperties(tag_properties);
            t instanceof ht.Data && propertyView.addProperties(data_properties), t instanceof ht.Node && propertyView.addProperties(node_properties), t instanceof ht.Group && propertyView.addProperties(group_properties), t instanceof ht.Edge && propertyView.addProperties(edge_properties), t instanceof ht.Switch && propertyView.addProperties(swithc_properties), t instanceof ht.Shape ? propertyView.addProperties(shape_properties) : t.s("shape") && (propertyView.addProperties(shape_properties), "roundRect" == t.s("shape") ? propertyView.addProperties(RoundRect_properties) : "rect" == t.s("shape") ? propertyView.addProperties(Rect_properties) : "arc" == t.s("shape") && propertyView.addProperties(arc_properties)), t instanceof ht.Text ? propertyView.addProperties(Text_properties) : t instanceof ht.Script ? propertyView.addProperties(script_properties) : t instanceof ht.LiveNode ? (propertyView.addProperties(live_properties), t instanceof ht.ComboboxNode && propertyView.addProperties(combobox_properties)) : t instanceof ht.Image ? propertyView.addProperties(Image_properties) : t instanceof ht.Html ? propertyView.addProperties(Html_properties) : t instanceof ht.iFrame ? propertyView.addProperties(iFrame_properties) : t instanceof ht.LinkImg ? propertyView.addProperties(iFrame_properties) : t instanceof ht.alarm && propertyView.addProperties(alarm_properties)
        }
    })
}

function handleOver(e) {
    e.preventDefault(), isPannable && g2d.autoScroll(e);
    var t = palette.dm().sm().ld();
    if (t) {
        var a = t.item;
        (void 0 !== a.source || a.styleIcon) && g2d.sm().ss(g2d.getDataAt(e, null, 5))
    }
}

function handleDrop(e) {
    e.preventDefault();
    var t = !1, a = palette.dm().sm().ld();
    if (a) {
        var n = a.item, i = n.image, o = g2d.getDataAt(e, null, 5);
        if (void 0 !== n.source) (o instanceof ht.Edge || o instanceof ht.Polyline) && (n.source ? o.addStyleIcon("sourceArrow", {
            position: 15,
            keepOrien: !0,
            names: [i]
        }) : o.addStyleIcon("targetArrow", { position: 19, keepOrien: !0, names: [i] })); else if (n.styleIcon) {
            if (o) {
                var r, l = o.s("icons");
                (r = l && l.states ? l.states : {
                    width: 16,
                    height: 16,
                    position: o instanceof ht.Edge || o instanceof ht.Polyline ? 3 : 1,
                    names: []
                }).names.indexOf(i) < 0 && (r.names.push(i), o.addStyleIcon("states", r))
            }
        } else {
            var d;
            if ("string" == typeof n.type ? ((d = new ht[n.type + "Node"]).setEditable(!1), d.s("live.label", n.type), d.setItems) : "string" == typeof n ? (d = new ht.Image, (i = new Image).src = n, i.onload = function (e) {
                d && (d.setImage(n), d.setWidth(i.width), d.setHeight(i.height), d.setIcon("imgpng"))
            }, t = !0) : "number" == typeof n ? (d = null, lastPt = g2d.lp(e), snap && (lastPt.x = Math.round(lastPt.x / gridSpace) * gridSpace, lastPt.y = Math.round(lastPt.y / gridSpace) * gridSpace), clip.pastefromjson(n)) : d = new (n.type || ht.Node), d) {
                n.flash && d.a("flash", !0), d instanceof ht.Text ? (d.setLayer("textLayer"), d.setImage(i)) : d instanceof ht.Image ? (t || selectImageControl(d), d.setIcon(n.icon), d.setLayer("nodeLayer")) : ("TagValue" == i ? (d.setLayer("textLayer"), d.setIcon("number")) : d.setLayer("nodeLayer"), d instanceof ht.LiveNode || (d instanceof ht.Html ? (d.setWidth(200), d.setHeight(150), d.a("html", "<Div>HtmlNode</Div>"), d.a("padding", 6), d.a("scalable", !1)) : null != i && (d instanceof ht.iFrame ? (d.setWidth(200), d.setHeight(150)) : d instanceof ht.LinkImg ? (d.setWidth(200), d.setHeight(150)) : d instanceof ht.alarm && (d.a("count", 5), d.a("area", 0), d.a("bordercolor", "#000000")), d.setImage(i)))), d.a("modelRule", "defaultModel"), d.setTag(n.name + d.getId()), null != i && null != n.ico && d.setIcon(n.icon || i);
                var s = g2d.lp(e);
                snap && (s.x = Math.round(s.x / gridSpace) * gridSpace, s.y = Math.round(s.y / gridSpace) * gridSpace), d.p(s), o instanceof ht.Group ? (d.setParent(o), o.setExpanded(!0)) : d.setParent(g2d.getCurrentSubGraph()), g2d.dm().add(d), g2d.sm().ss(d)
            }
        }
    }
}

function tagconfig_init() {
    tagformPane = new ht.widget.FormPane, tagformPane.getLabelFont = function (e) {
        return "bold 12px arial, sans-serif"
    }, tagformPane.getLabelVAlign = function (e) {
        return "top"
    }, tagformPane.addRow(["显示名称:", {
        id: "name",
        textField: { text: "" }
    }], [70, .1]), tagformPane.addRow(["标签名称:", { id: "tagname", textField: { text: "" } }, {
        button: {
            label: "...",
            onClicked: function () {
                showTagsDialog(function (e) {
                    var t = 0;
                    e.each(function (e) {
                        t <= 10 && (0 == t ? tagformPane.v("tagname", "" != e.a("plug") ? e.a("plug") + "." + e.a("id") : e.a("id")) : tagformPane.v("tagname" + t.toString(), "" != e.a("plug") ? e.a("plug") + "." + e.a("id") : e.a("id"))), t++
                    })
                })
            }
        }
    }], [70, .1, 20]), tagformPane.addRow(["标签名称1:", { id: "tagname1", textField: { text: "" } }, {
        button: {
            label: "...",
            onClicked: function () {
                showTagsDialog(function (e) {
                    var t = 1;
                    e.each(function (e) {
                        t <= 10 && tagformPane.v("tagname" + t.toString(), e.a("plug") + "." + e.a("id")), t++
                    })
                })
            }
        }
    }], [70, .1, 20]), tagformPane.addRow(["标签名称2:", { id: "tagname2", textField: { text: "" } }, {
        button: {
            label: "...",
            onClicked: function () {
                showTagsDialog(function (e) {
                    var t = 2;
                    e.each(function (e) {
                        t <= 10 && tagformPane.v("tagname" + t.toString(), e.a("plug") + "." + e.a("id")), t++
                    })
                })
            }
        }
    }], [70, .1, 20]), tagformPane.addRow(["标签名称3:", { id: "tagname3", textField: { text: "" } }, {
        button: {
            label: "...",
            onClicked: function () {
                showTagsDialog(function (e) {
                    var t = 3;
                    e.each(function (e) {
                        t <= 10 && tagformPane.v("tagname" + t.toString(), e.a("plug") + "." + e.a("id")), t++
                    })
                })
            }
        }
    }], [70, .1, 20]), tagformPane.addRow(["标签名称4:", { id: "tagname4", textField: { text: "" } }, {
        button: {
            label: "...",
            onClicked: function () {
                showTagsDialog(function (e) {
                    var t = 4;
                    e.each(function (e) {
                        t <= 10 && tagformPane.v("tagname" + t.toString(), e.a("plug") + "." + e.a("id")), t++
                    })
                })
            }
        }
    }], [70, .1, 20]), tagformPane.addRow(["标签名称5:", { id: "tagname5", textField: { text: "" } }, {
        button: {
            label: "...",
            onClicked: function () {
                showTagsDialog(function (e) {
                    var t = 5;
                    e.each(function (e) {
                        t <= 10 && tagformPane.v("tagname" + t.toString(), e.a("plug") + "." + e.a("id")), t++
                    })
                })
            }
        }
    }], [70, .1, 20]), tagformPane.addRow(["标签名称6:", { id: "tagname6", textField: { text: "" } }, {
        button: {
            label: "...",
            onClicked: function () {
                showTagsDialog(function (e) {
                    var t = 6;
                    e.each(function (e) {
                        t <= 10 && tagformPane.v("tagname" + t.toString(), e.a("plug") + "." + e.a("id")), t++
                    })
                })
            }
        }
    }], [70, .1, 20]), tagformPane.addRow(["标签名称7:", { id: "tagname7", textField: { text: "" } }, {
        button: {
            label: "...",
            onClicked: function () {
                showTagsDialog(function (e) {
                    var t = 7;
                    e.each(function (e) {
                        t <= 10 && tagformPane.v("tagname" + t.toString(), e.a("plug") + "." + e.a("id")), t++
                    })
                })
            }
        }
    }], [70, .1, 20]), tagformPane.addRow(["标签名称8:", { id: "tagname8", textField: { text: "" } }, {
        button: {
            label: "...",
            onClicked: function () {
                showTagsDialog(function (e) {
                    var t = 8;
                    e.each(function (e) {
                        t <= 10 && tagformPane.v("tagname" + t.toString(), e.a("plug") + "." + e.a("id")), t++
                    })
                })
            }
        }
    }], [70, .1, 20]), tagformPane.addRow(["标签名称9:", { id: "tagname9", textField: { text: "" } }, {
        button: {
            label: "...",
            onClicked: function () {
                showTagsDialog(function (e) {
                    var t = 9;
                    e.each(function (e) {
                        t <= 10 && tagformPane.v("tagname" + t.toString(), e.a("plug") + "." + e.a("id")), t++
                    })
                })
            }
        }
    }], [70, .1, 20]), tagformPane.addRow(["可见标签:", { id: "vistagname", textField: { text: "" } }, {
        button: {
            label: "...",
            onClicked: function () {
                showTagsDialog(function (e) {
                    e.each(function (e) {
                        tagformPane.v("vistagname", e.a("plug") + "." + e.a("id"))
                    })
                })
            }
        }
    }], [70, .1, 20]), tagformPane.addRow(["闪烁标签:", { id: "flashtagname", textField: { text: "" } }, {
        id: "flashbutton",
        button: {
            label: "...", onClicked: function () {
                showTagsDialog(function (e) {
                    e.each(function (e) {
                        tagformPane.v("flashtagname", e.a("plug") + "." + e.a("id"))
                    })
                })
            }
        }
    }], [70, .1, 20]), tagformPane.addRow([null, {
        button: {
            label: "设置", onClicked: function () {
                currentData && (currentData instanceof ht.ButtonNode || currentData instanceof ht.ToggleButtonNode ? currentData.s("live.label", tagformPane.v("name")) : currentData.setName(tagformPane.v("name")), currentData.a("tagname", tagformPane.v("tagname") || ""), currentData.a("tagname1", tagformPane.v("tagname1") || ""), currentData.a("tagname2", tagformPane.v("tagname2") || ""), currentData.a("tagname3", tagformPane.v("tagname3") || ""), currentData.a("tagname4", tagformPane.v("tagname4") || ""), currentData.a("tagname5", tagformPane.v("tagname5") || ""), currentData.a("tagname6", tagformPane.v("tagname6") || ""), currentData.a("tagname7", tagformPane.v("tagname7") || ""), currentData.a("tagname8", tagformPane.v("tagname8") || ""), currentData.a("tagname9", tagformPane.v("tagname9") || ""), currentData.a("vistagname", tagformPane.v("vistagname") || ""), currentData.a("flashtagname", tagformPane.v("flashtagname") || ""))
            }
        }
    }, {
            button: {
                label: "清除", onClicked: function () {
                    tagformPane.v({
                        name: "",
                        tagname: "",
                        tagname1: "",
                        tagname2: "",
                        tagname3: "",
                        tagname4: "",
                        tagname5: "",
                        tagname6: "",
                        tagname7: "",
                        tagname8: "",
                        tagname9: "",
                        vistagname: "",
                        flashtagname: ""
                    })
                }
            }
        }], [.1, 70, 70]), tagformPane.setWidth(300), tagPanel = new ht.widget.Panel({
            id: "tagPanel",
            title: "快速设置",
            restoreToolTip: "快速设置",
            titleIcon: "",
            width: 300,
            contentHeight: 375,
            narrowWhenCollapse: !0,
            content: tagformPane,
            expanded: !1
        }), tagPanel.setPositionRelativeTo("rightTop"), tagPanel.setPosition(0, 0), tagPanel.getView().style.display = "none", document.body.appendChild(tagPanel.getView())
}

function createImage(e) {
    var t = new ht.Image;
    t.setLayer("nodeLayer"), t.setIcon("imgpng"), t.a("modelRule", "defaultModel"), t.setTag("image" + t.getId());
    var a = lastPt;
    snap && (a.x = Math.round(a.x / gridSpace) * gridSpace, a.y = Math.round(a.y / gridSpace) * gridSpace), t.p(a), t.setParent(g2d.getCurrentSubGraph()), g2d.dm().add(t), g2d.sm().ss(t);
    var n = new Image;
    n.src = e, n.onload = function (a) {
        t && (t.setImage(e), t.setWidth(n.width), t.setHeight(n.height))
    }
}

function createFrameBorder(e, t) {
    var a = new ht.Shape;
    a.setWidth(e), a.setHeight(t), a.setPoints([{ x: 0, y: 0 }, { x: e, y: 0 }, { x: e, y: t }, { x: 0, y: t }, {
        x: 0,
        y: 0
    }]), a.segments = [1, 2, 2, 2, 2], a.s("shape.border.width", .5), a.s("shape.background", null), a.s("shape.border.color", "rgb(100,100,100)"), a.setPosition(.5 * e, .5 * t), a.setLayer("backgroundLayer"), a.setTag("frameborder"), a.setStyle("label.opacity", 0), a.setStyle("2d.selectable", !1), a.setStyle("2d.movable", !1), a.setStyle("2d.editable", !1), dataModel.add(a)
}

function hasScript() {
    var e = g2d.sm().toSelection(), t = null;
    if (e.size() > 0) for (var a = 0; a < e.size(); a++) if (t = e.get(a), isScript(t)) return !0;
    return !1
}

function relaceScript() {
    var e = g2d.sm().toSelection();
    if (e.size() > 0) for (var t = 0; t < e.size(); t++) {
        var a = e.get(t);
        a instanceof ht.Script || a.a("script") || a.a("nclick") || a.a("vchange") || a.a("bclick") || a.a("dchange")
    }
}

function replaceText() {
    "none" == textReplaceDlg.getView().style.display && (textReplaceDlg.getView().style.display = "", textReplaceDlg.iv())
}

function replaceTag() {
    "none" == tagReplaceDlg.getView().style.display && (tagReplaceDlg.getView().style.display = "", tagReplaceDlg.iv())
}

function showFind() {
    null == findDlg && find_init(), "none" == findDlg.getView().style.display && (findDlg.getView().style.display = "", findDlg.iv())
}

function loadclipobject() {
    cliploading || (cliploading = !0, 
    $.post("server/controllist.ashx", {}, function (e) {
        clipcontrols = e, 
            console.log(clipcontrols)
        initclipGroup(), 
        cliploading = !1
    }))
}

function tagreplace_init() {
    tagreplaceformPane = new ht.widget.FormPane, tagreplaceformPane.getLabelFont = function (e) {
        return "bold 12px arial, sans-serif"
    }, tagreplaceformPane.getLabelVAlign = function (e) {
        return "top"
    }, tagreplaceformPane.addRow(["标签名称:", { id: "oldname", textField: { text: "", editable: !0 } }, {
        button: {
            label: "...",
            onClicked: function () {
                showTagsDialog(function (e) {
                    e.each(function (e) {
                        var t = e.a("plug");
                        t = "" == t ? e.a("id") : t + "." + e.a("id"), tagreplaceformPane.v("oldname", t.toUpperCase())
                    })
                }, !0)
            }
        }
    }], [60, .1, 20]), tagreplaceformPane.addRow(["替换名称:", {
        id: "newname",
        textField: { text: "", editable: !0 }
    }, {
            button: {
                label: "...", onClicked: function () {
                    showTagsDialog(function (e) {
                        e.each(function (e) {
                            var t = e.a("plug");
                            t = "" == t ? e.a("id") : t + "." + e.a("id"), tagreplaceformPane.v("newname", t.toUpperCase())
                        })
                    })
                }
            }
        }], [60, .1, 20]), tagreplaceformPane.addRow([{
            id: "ck",
            checkBox: { label: "全部匹配", selected: !0 }
        }, {
            button: {
                label: "替换", onClicked: function () {
                    var e = 0, t = tagreplaceformPane.v("ck"), a = tagreplaceformPane.v("oldname").toLowerCase(),
                        n = tagreplaceformPane.v("oldname"), o = tagreplaceformPane.v("newname");
                    "" != a && "" != o && (dm.sm().size() > 0 ? (dm.sm().toSelection().each(function (r) {
                        var l = r.a("tagname");
                        for (l && (t ? (l = l.toLowerCase()) == a && (r.a("tagname", o), e++) : l != (d = l.replace(new RegExp(n, "gi"), o)) && (r.a("tagname", d), e++)), (l = r.a("vistagname")) && (t ? (l = l.toLowerCase()) == a && (r.a("vistagname", o), e++) : l != (d = l.replace(new RegExp(n, "gi"), o)) && (r.a("vistagname", d), e++)), (l = r.a("flashtagname")) && (t ? (l = l.toLowerCase()) == a && (r.a("flashtagname", o), e++) : l != (d = l.replace(new RegExp(n, "gi"), o)) && (r.a("flashtagname", d), e++)), (l = r.a("enbtagname")) && (t ? (l = l.toLowerCase()) == a && (r.a("enbtagname", o), e++) : l != (d = l.replace(new RegExp(n, "gi"), o)) && (r.a("enbtagname", d), e++)), i = 1; i < 10; i++) if (l = r.a("tagname" + i)) if (t) (l = l.toLowerCase()) == a && (r.a("tagname" + i, o), e++); else {
                            var d = l.replace(new RegExp(n, "gi"), o);
                            l != d && (r.a("tagname" + i, d), e++)
                        }
                    }), alert(e.toString() + "个变量被成功替换!")) : alert("选择的对象数为0,请选择要进行替换的对象后再执行!"))
                }
            }
        }, {
            button: {
                label: "关闭", onClicked: function () {
                    tagReplaceDlg.getView().style.display = "none"
                }
            }
        }], [.1, 65, 65]), tagreplaceformPane.setWidth(260), tagreplaceformPane.setHeight(100), tagReplaceDlg = new ht.widget.Panel({
            id: "tagReplaceDlg",
            title: "标签替换窗口",
            restoreToolTip: "标签替换窗口",
            titleIcon: "",
            width: 260,
            contentHeight: 100,
            minimizable: !1,
            content: tagreplaceformPane,
            expanded: !0
        }), tagReplaceDlg.setPositionRelativeTo("rightTop"), tagReplaceDlg.setPosition(260, 25), tagReplaceDlg.getView().style.display = "none", document.body.appendChild(tagReplaceDlg.getView())
}

function textreplace_init() {
    textreplaceformPane = new ht.widget.FormPane, textreplaceformPane.getLabelFont = function (e) {
        return "bold 12px arial, sans-serif"
    }, textreplaceformPane.getLabelVAlign = function (e) {
        return "top"
    }, textreplaceformPane.addRow(["文字内容:", {
        id: "oldname",
        textField: { text: "", editable: !0 }
    }], [60, .1]), textreplaceformPane.addRow(["替换内容:", {
        id: "newname",
        textField: { text: "", editable: !0 }
    }], [60, .1]), textreplaceformPane.addRow([{
        id: "ck",
        checkBox: { label: "全部匹配", selected: !0 }
    }, {
        button: {
            label: "替换", onClicked: function () {
                var e = 0, t = textreplaceformPane.v("ck"), a = textreplaceformPane.v("oldname"),
                    n = textreplaceformPane.v("newname");
                "" != a && (dm.sm().size() > 0 ? (dm.sm().toSelection().each(function (i) {
                    if (i instanceof ht.ButtonNode || i instanceof ht.ToggleButtonNode) null != (o = i.s("live.label")) && (t ? o == a && (i.s("live.label", n), e++) : (r = o.replace(new RegExp(a, "gim"), n)) != o && (i.s("live.label", r), e++)); else {
                        var o = i.getName();
                        if (null != o) if (t) o == a && (i.setName(n), e++); else {
                            var r = o.replace(new RegExp(a, "gim"), n);
                            r != o && (i.setName(r), e++)
                        }
                    }
                }), alert(e.toString() + "个对象被成功替换!")) : alert("选择的对象数为0,请选择要进行替换的对象后再执行!"))
            }
        }
    }, {
        button: {
            label: "关闭", onClicked: function () {
                textReplaceDlg.getView().style.display = "none"
            }
        }
    }], [.1, 65, 65]), textreplaceformPane.setWidth(260), textreplaceformPane.setHeight(100), textReplaceDlg = new ht.widget.Panel({
        id: "textReplaceDlg",
        title: "文本替换窗口",
        restoreToolTip: "文本替换窗口",
        titleIcon: "",
        width: 260,
        contentHeight: 100,
        minimizable: !1,
        content: textreplaceformPane,
        expanded: !0
    }), textReplaceDlg.setPositionRelativeTo("rightTop"), textReplaceDlg.setPosition(260, 100), textReplaceDlg.getView().style.display = "none", document.body.appendChild(textReplaceDlg.getView())
}

function find_init() {
    findPane = new ht.widget.FormPane, findPane.getLabelFont = function (e) {
        return "bold 12px arial, sans-serif"
    }, findPane.getLabelVAlign = function (e) {
        return "top"
    }, findPane.addRow(["查找内容:", { id: "name", textField: { text: "", editable: !0 } }, {
        button: {
            label: "...",
            onClicked: function () {
                showTagsDialog(function (e) {
                    e.each(function (e) {
                        var t = e.a("plug");
                        t = "" == t ? e.a("id") : t + "." + e.a("id"), tagreplaceformPane.v("name", t.toUpperCase())
                    })
                }, !0)
            }
        }
    }], [60, .1, 20]), findPane.addRow([{ id: "httag", checkBox: { label: "对象名称", selected: !0 } }, {
        id: "tagname",
        checkBox: { label: "变量名称", selected: !1 }
    }, {
        id: "text",
        checkBox: { label: "文本内容", selected: !1 }
    }], [.1, .1, .1]), findPane.addRow([{}, {
        button: {
            label: "查找", onClicked: function () {
                hashttag = findPane.v("httag"), hastagname = findPane.v("tagname"), hastext = findPane.v("text"), "" != (searchname = findPane.v("name")) ? dm.size() > 0 && (searchMode = !0, g2d.iv(), treeView.invalidateModel()) : (searchMode = !1, g2d.iv(), treeView.invalidateModel())
            }
        }
    }, {
        button: {
            label: "关闭", onClicked: function () {
                searchMode = !1, findDlg.getView().style.display = "none", g2d.iv(), treeView.invalidateModel()
            }
        }
    }], [.4, .3, .3]), findPane.setWidth(260), (findDlg = new ht.widget.Panel({
        id: "findDlg",
        title: "对象查找窗口",
        restoreToolTip: "对象查找窗口",
        titleIcon: "",
        width: 260,
        contentHeight: 90,
        minimizable: !1,
        content: findPane,
        expanded: !0
    })).setPositionRelativeTo("rightTop"), findDlg.setPosition(260, 25), findDlg.getView().style.display = "none", document.body.appendChild(findDlg.getView())
}

function showAllTags() {
    var e = new ht.List;
    dataModel.each(function (t) {
        var a = t.a("tagname");
        for (a && (a = a.toUpperCase(), e.contains(a) || e.add(a)), (a = t.a("vistagname")) && (a = a.toUpperCase(), e.contains(a) || e.add(a)), (a = t.a("enbtagname")) && (a = a.toUpperCase(), e.contains(a) || e.add(a)), (a = t.a("flashtagname")) && (a = a.toUpperCase(), e.contains(a) || e.add(a)), i = 1; i < 10; i++) (a = t.a("tagname" + i)) && (a = a.toUpperCase(), e.contains(a) || e.add(a))
    });
    e.size();
    viewTags(e)
}

function viewTags(e) {
    var t = new ht.widget.Toolbar, a = new ht.widget.BorderPane;
    a.setTopView(t);
    var n = new ht.DataModel, i = new ht.widget.TablePane(n);
    a.setCenterView(i), n.getSelectionModel().setSelectionMode("single"), i.addColumns([{
        name: "index",
        width: 40,
        displayName: "序号",
        accessType: "attr",
        align: "left",
        valueType: "number"
    }, { name: "tagname", width: 200, displayName: "标签名称", accessType: "attr", align: "left" }]);
    var o = 1;
    e.each(function (e) {
        var t = new ht.Data;
        t.a({ index: o, tagname: e }), o++ , n.add(t)
    });
    var r = i.getTableView();
    r.setColumnLineVisible(!1), r.setRowHeight(22), r.setAutoHideScrollBar(!1), r.setLabelSelectColor("blue"), r.isVisible = function (e) {
        if (e.isEmpty()) {
            var a = t.v("tagname"), n = !0;
            if ("" != a) {
                e.a("tagname");
                n = e.a("tagname").toUpperCase().indexOf(a.toUpperCase()) >= 0
            }
        }
        return n
    }, t.setItems([{
        id: "tagname",
        label: "标签名称:",
        icon: "images/search.png",
        unfocusable: !0,
        textField: { width: 165, value: "" }
    }]);
    var l = t.getItemById("tagname").element;
    l.getElement().onkeyup = function (e) {
        27 === e.keyCode && (l.getElement().value = ""), r.invalidateModel()
    };
    var d = new ht.widget.Dialog;
    d.setConfig({
        title: "页面使用标签:" + e.size() + "个",
        closable: !0,
        draggable: !0,
        contentPadding: 0,
        width: 300,
        height: 500,
        content: a,
        resizeMode: "wh"
    }), d.onShown = function () {
        t.iv()
    }, (new ht.widget.ContextMenu).addTo(d.getView()), d.show()
}

function Group(e) {
    if (e && e.size() > 1) {
        var t = "group" + ht.Default.getId(), a = e.get(0);
        a.s("_oldTag", a.getTag()), a.s("_gp", 1), a.setTag(t);
        for (var n = 0; n < e.size(); n++) {
            var i = e.get(n);
            i.s("_groupId", t), n > 0 && i.setParent(a);
            var o;
            o = n === e.size() - 1 ? e.get(0) : e.get(n + 1), i.setHost(o), i.s("select.width", 0)
        }
    }
}

function UnGroup(e) {
    if (e && e.s("_gp")) {
        var t = e.s("_groupId");
        t && g2d.dm().each(function (e) {
            e.s("_groupId") === t && (e.s("_groupId", null), e.setParent(null), e.setHost(null), e.s("select.width", ht.Style["select.width"]), e.s("_oldTag") && (e.setTag(e.s("_oldTag")), e.s("_oldTag", null)))
        }), e.s("_gp", null)
    }
}

function browser_createTag(e, t) {
    var a = new ht.Data;
    return a.a({
        index: e,
        id: t.id,
        unit: t.unit,
        type: t.type,
        plug: t.plug,
        desc: t.desc,
        digcount: t.digcount,
        atype: t.atype
    }), "AnalogAlarm" == t.atype && a.a({
        al: t.al,
        all: t.all,
        ah: t.ah,
        ahh: t.ahh,
        ad: t.ad
    }), "String" != t.type && a.a({ max: t.max, min: t.min }), a
}

function addecharts() {
    "" == HT2dEditor.currScene.headHtml ? HT2dEditor.currScene.headHtml = "<script src='js/echarts.min.js'><\/script>" : HT2dEditor.currScene.headHtml.indexOf("echarts.min.js") < 0 && (HT2dEditor.currScene.headHtml += "\r\n<script src='js/echarts.min.js'><\/script>")
}

function addjustgage() {
    "" == HT2dEditor.currScene.headHtml ? HT2dEditor.currScene.headHtml = "<script src='js/raphael-2.1.4.min.js'><\/script>\r\n<script src='js/justgage.js'><\/script>" : HT2dEditor.currScene.headHtml.indexOf("justgage.js") < 0 && (HT2dEditor.currScene.headHtml += "\r\n<script src='js/raphael-2.1.4.min.js'><\/script>\r\n<script src='js/justgage.js'><\/script>")
}

var Key = {};
Key.shift = "16", Key.ctrl = "17", Key.alt = "18", Key.meta = "91", Key.a = "65", Key.b = "66", Key.c = "67", Key.d = "68", Key.e = "69", Key.f = "70", Key.g = "71", Key.h = "72", Key.i = "73", Key.j = "74", Key.k = "75", Key.l = "76", Key.m = "77", Key.n = "78", Key.o = "79", Key.p = "80", Key.q = "81", Key.r = "82", Key.s = "83", Key.t = "84", Key.u = "85", Key.v = "86", Key.w = "87", Key.x = "88", Key.y = "89", Key.z = "90", Key.left = "37", Key.up = "38", Key.right = "39", Key.down = "40", Key.open_bracket = "219", Key.close_bracket = "221", Key.n0 = "48", Key.n1 = "49", Key.n2 = "50", Key.n3 = "51", Key.n4 = "52", Key.n5 = "53", Key.n6 = "54", Key.n7 = "55", Key.n8 = "56", Key.n9 = "57", Key.back_slash = "220", Key.minus = "189", Key.comma = "188", Key.semicolon = "186", Key.equals = "187", Key.slash = "191", Key.period = "190", Key.enter = "13";
var LEFT = "left", RIGHT = "right", TOP = "top", BOTTOM = "bottom", NULL = null, _scurrentPage = 1, _spagecount = 1,
    findDlg = null, searchMode = !1, hashttag = !1, hastagname = !1, hastext = !1, searchname = "";
ptcontextMenu = [{
    label: "清除选择", action: function () {
        resetDefault()
    }
}, {
    label: "刷新图片", action: function () {
        imagegroup.setExpanded(!1), imagegroup.inited = !1, imagegroup.updating = !1;
        var e = new ht.List;
        imagegroup.eachChild(function (t) {
            e.add(t)
        }), e.each(function (e) {
            palette.dm().remove(e)
        })
    }
}, {
    label: "刷新共享", action: function () {
        if (!cliploading) {
            var e = new ht.List;
            clipGroup.eachChild(function (t) {
                e.add(t)
            }), e.each(function (e) {
                palette.dm().remove(e)
            }), loadclipobject()
        }
    }
}], contextMenuChangeToLine = {
    label: "直线", type: "radio", action: function () {
        editInteractor.changeShapeSegment(2)
    }
}, contextMenuChangeToMove = {
    label: "打断", type: "radio", action: function () {
        editInteractor.changeShapeSegment(1)
    }
}, contextMenuChangeToQuadratic = {
    label: "二次曲线", type: "radio", action: function () {
        editInteractor.changeShapeSegment(3)
    }
}, contextMenuChangeToBezier = {
    label: "贝塞尔曲线", type: "radio", action: function () {
        editInteractor.changeShapeSegment(4)
    }
}, contextMenuAddPoint = {
    label: "增加点", action: function (e, t) {
        editInteractor.addShapePoint()
    }
}, contextMenuRemovePoint = {
    label: "删除点", action: function () {
        editInteractor.removeShapePoint()
    }
}, contextMenuCopy = {
    label: "复制", action: function () {
        clip.copy()
    }
}, contextMenuSave = {
    label: "保存选定", action: function () {
        clip.save()
    }
}, contextMenuCut = {
    label: "剪切", action: function () {
        clip.copy(), dataModel.getSelectionModel().toSelection().each(function (e) {
            dataModel.remove(e)
        })
    }
}, contextMenuPaste = {
    label: "粘贴", action: function () {
        clip.paste()
    }
}, contextMenuPasteControl = {
    label: "从控件粘贴", action: function () {
        clip.pastecontrol()
    }
}, contextMenuDelete = {
    label: "删除", action: function () {
        dataModel.getSelectionModel().toSelection().each(function (e) {
            dataModel.remove(e)
        })
    }
}, contextMenuScript = {
    label: "数据更新脚本", action: function () {
        var e = dataModel.getSelectionModel().getFirstData(),
            t = e.a("dchange") || "//数据更新脚本,当设置的标签数据发生改变时触发,函数类型function(data)\r\n", a = null, n = new ht.widget.Dialog;
        n.setConfig({
            title: "数据更新脚本",
            closable: !0,
            draggable: !0,
            contentPadding: 0,
            resizeMode: "wh",
            maximizable: !0,
            width: 800,
            height: 360,
            content: '<div><textarea id="jsscript" rows="30" cols="100" spellcheck="false" wrap="off"  style="visibility:hidden;">' + t + "</textarea></div>",
            buttons: [{
                label: "确定", action: function (t, i) {
                    a.save();
                    var o = n.getView().querySelector("#jsscript").value;
                    o && e.a("dchange", o), n.hide()
                }
            }, {
                label: "取消", action: function (e, t) {
                    n.hide()
                }
            }],
            buttonsAlign: "right"
        }), n.onShown = function () {
            a = CodeMirror.fromTextArea(n.getView().querySelector("#jsscript"), {
                lineNumbers: !0,
                mode: "text/typescript"
            })
        }, n.addEventListener(function (e) {
            if ("endResize" == e.kind || "restore" == e.kind || "maximize" == e.kind) {
                n._config.width;
                var t = n._config.height;
                "maximize" == e.kind ? a.setSize("auto", window.innerHeight - 60) : a.setSize("auto", t - 60)
            }
        }), n.show()
    }
}, contextButtonClickScript = {
    label: "鼠标点击脚本", action: function () {
        var e = dataModel.getSelectionModel().getFirstData(), t = e.a("bclick") || "//鼠标点击脚本,函数类型function(data,e)\r\n",
            a = null, n = new ht.widget.Dialog;
        n.setConfig({
            title: "鼠标点击脚本",
            closable: !0,
            draggable: !0,
            contentPadding: 0,
            resizeMode: "wh",
            maximizable: !0,
            width: 800,
            height: 360,
            content: '<div><textarea id="jsscript" rows="30" cols="100" spellcheck="false" wrap="off" style="visibility:hidden;">' + t + "</textarea></div>",
            buttons: [{
                label: "确定", action: function (t, i) {
                    a.save();
                    var o = n.getView().querySelector("#jsscript").value;
                    o && e.a("bclick", o), n.hide()
                }
            }, {
                label: "取消", action: function (e, t) {
                    n.hide()
                }
            }],
            buttonsAlign: "right"
        }), n.onShown = function () {
            a = CodeMirror.fromTextArea(n.getView().querySelector("#jsscript"), {
                lineNumbers: !0,
                mode: "text/typescript"
            })
        }, n.addEventListener(function (e) {
            if ("endResize" == e.kind || "restore" == e.kind || "maximize" == e.kind) {
                n._config.width;
                var t = n._config.height;
                "maximize" == e.kind ? a.setSize("auto", window.innerHeight - 60) : a.setSize("auto", t - 60)
            }
        }), n.show()
    }
}, contexValueChangeScript = {
    label: "数值改变脚本", action: function () {
        var e = dataModel.getSelectionModel().getFirstData(),
            t = e.a("vchange") || "//数值改变脚本,函数类型function(data,value)\r\n", a = null, n = new ht.widget.Dialog;
        n.setConfig({
            title: "数值改变脚本",
            closable: !0,
            draggable: !0,
            contentPadding: 0,
            resizeMode: "wh",
            maximizable: !0,
            width: 800,
            height: 360,
            content: '<div><textarea id="jsscript" rows="30" cols="100" spellcheck="false" wrap="off"  style="visibility:hidden;">' + t + "</textarea></div>",
            buttons: [{
                label: "确定", action: function (t, i) {
                    a.save();
                    var o = n.getView().querySelector("#jsscript").value;
                    o && e.a("vchange", o), n.hide()
                }
            }, {
                label: "取消", action: function (e, t) {
                    n.hide()
                }
            }],
            buttonsAlign: "right"
        }), n.onShown = function () {
            a = CodeMirror.fromTextArea(n.getView().querySelector("#jsscript"), {
                lineNumbers: !0,
                mode: "text/typescript"
            })
        }, n.addEventListener(function (e) {
            if ("endResize" == e.kind || "restore" == e.kind || "maximize" == e.kind) {
                n._config.width;
                var t = n._config.height;
                "maximize" == e.kind ? a.setSize("auto", window.innerHeight - 60) : a.setSize("auto", t - 60)
            }
        }), n.show()
    }
}, contextNodeClickScript = {
    label: "鼠标点击脚本", action: function () {
        var e = dataModel.getSelectionModel().getFirstData(),
            t = e.a("nclick") || "//鼠标点击脚本,函数类型function(data,e,values)\r\n", a = null, n = new ht.widget.Dialog;
        n.setConfig({
            title: "鼠标点击脚本",
            closable: !0,
            draggable: !0,
            contentPadding: 0,
            resizeMode: "wh",
            maximizable: !0,
            width: 800,
            height: 360,
            content: '<div><textarea id="jsscript" spellcheck="false" wrap="off" style="visibility:hidden;">' + t + "</textarea></div>",
            buttons: [{
                label: "确定", action: function (t, i) {
                    a.save();
                    var o = n.getView().querySelector("#jsscript").value;
                    o && e.a("nclick", o), n.hide()
                }
            }, {
                label: "取消", action: function (e, t) {
                    n.hide()
                }
            }],
            buttonsAlign: "right"
        }), n.onShown = function () {
            a = CodeMirror.fromTextArea(n.getView().querySelector("#jsscript"), {
                lineNumbers: !0,
                mode: "text/typescript"
            })
        }, n.addEventListener(function (e) {
            if ("endResize" == e.kind || "restore" == e.kind || "maximize" == e.kind) {
                n._config.width;
                var t = n._config.height;
                "maximize" == e.kind ? a.setSize("auto", window.innerHeight - 60) : a.setSize("auto", t - 60)
            }
        }), n.show()
    }
}, contextbathClickScript = {
    label: "批量鼠标点击脚本", action: function () {
        var e = dataModel.getSelectionModel().getFirstData().a("nclick") || "", t = null, a = new ht.widget.Dialog;
        a.setConfig({
            title: "批量鼠标点击脚本",
            closable: !0,
            draggable: !0,
            contentPadding: 0,
            resizeMode: "wh",
            maximizable: !0,
            width: 800,
            height: 360,
            content: '<div><textarea id="jsscript" spellcheck="false" wrap="off" style="visibility:hidden;">' + e + "</textarea></div>",
            buttons: [{
                label: "确定", action: function (e, n) {
                    t.save();
                    var i = a.getView().querySelector("#jsscript").value;
                    i && dataModel.getSelectionModel().toSelection().each(function (e) {
                        e instanceof ht.LiveNode ? e instanceof ht.ToggleButtonNode ? e.a("vchange", i) : e instanceof ht.ButtonNode ? e.a("bclick", i) : e instanceof ht.ProgressBarNode || e.a("vchange", i) : e.a("nclick", i)
                    }), a.hide()
                }
            }, {
                label: "取消", action: function (e, t) {
                    a.hide()
                }
            }],
            buttonsAlign: "right"
        }), a.onShown = function () {
            t = CodeMirror.fromTextArea(a.getView().querySelector("#jsscript"), {
                lineNumbers: !0,
                mode: "text/typescript"
            })
        }, a.addEventListener(function (e) {
            if ("endResize" == e.kind || "restore" == e.kind || "maximize" == e.kind) {
                a._config.width;
                var n = a._config.height;
                "maximize" == e.kind ? t.setSize("auto", window.innerHeight - 60) : t.setSize("auto", n - 60)
            }
        }), a.show()
    }
}, contextbathMenuScript = {
    label: "批量数据更新脚本", action: function () {
        var e = dataModel.getSelectionModel().getFirstData().a("dchange") || "//数据更新脚本,当设置的标签数据发生改变时触发,函数类型function(data)\r\n",
            t = null, a = new ht.widget.Dialog;
        a.setConfig({
            title: "批量数据更新脚本",
            closable: !0,
            draggable: !0,
            contentPadding: 0,
            resizeMode: "wh",
            maximizable: !0,
            width: 800,
            height: 360,
            content: '<div><textarea id="jsscript" rows="30" cols="100" spellcheck="false" wrap="off"  style="visibility:hidden;">' + e + "</textarea></div>",
            buttons: [{
                label: "确定", action: function (e, n) {
                    t.save();
                    var i = a.getView().querySelector("#jsscript").value;
                    i && dataModel.getSelectionModel().toSelection().each(function (e) {
                        e.a("dchange", i)
                    }), a.hide()
                }
            }, {
                label: "取消", action: function (e, t) {
                    a.hide()
                }
            }],
            buttonsAlign: "right"
        }), a.onShown = function () {
            t = CodeMirror.fromTextArea(a.getView().querySelector("#jsscript"), {
                lineNumbers: !0,
                mode: "text/typescript"
            })
        }, a.addEventListener(function (e) {
            if ("endResize" == e.kind || "restore" == e.kind || "maximize" == e.kind) {
                a._config.width;
                var n = a._config.height;
                "maximize" == e.kind ? t.setSize("auto", window.innerHeight - 60) : t.setSize("auto", n - 60)
            }
        }), a.show()
    }
}, contextScript = {
    label: "编辑脚本", action: function () {
        var e = dataModel.getSelectionModel().getFirstData(), t = e.a("script") || "//编辑脚本\r\n", a = null,
            n = new ht.widget.Dialog;
        n.setConfig({
            title: "编辑脚本",
            closable: !0,
            draggable: !0,
            contentPadding: 0,
            resizeMode: "wh",
            maximizable: !0,
            width: 800,
            height: 360,
            content: '<div><textarea id="jsscript" rows="30" cols="100" spellcheck="false" wrap="off"  style="visibility:hidden;">' + t + "</textarea></div>",
            buttons: [{
                label: "确定", action: function (t, i) {
                    a.save();
                    var o = n.getView().querySelector("#jsscript").value;
                    o && e.a("script", o), n.hide()
                }
            }, {
                label: "取消", action: function (e, t) {
                    n.hide()
                }
            }],
            buttonsAlign: "right"
        }), n.onShown = function () {
            a = CodeMirror.fromTextArea(n.getView().querySelector("#jsscript"), {
                lineNumbers: !0,
                mode: "text/typescript"
            })
        }, n.addEventListener(function (e) {
            if ("endResize" == e.kind || "restore" == e.kind || "maximize" == e.kind) {
                n._config.width;
                var t = n._config.height;
                "maximize" == e.kind ? a.setSize("auto", window.innerHeight - 60) : a.setSize("auto", t - 60)
            }
        }), n.show()
    }
}, contextHtml = {
    label: "编辑Html", action: function () {
        ht.Switch = function () {
            ht.Switch.superClass.constructor.call(this);
            this.s('switch.angle', 0);
        };
        ht.Default.def('ht.Switch', ht.Node, {
            _image: 'switch',
            _icon: 'switch',

            toggle: function (anim) {
                this.setExpanded(!this.isExpanded(), anim);
            },
            isExpanded: function () {
                return this.s('switch.angle') !== 0;
            },
            setExpanded: function (expanded, anim) {
                if (anim == null) {
                    anim = true;
                }
                var self = this,
                    animation = self._animation,
                    oldValue = self.isExpanded();

                if (animation) {
                    animation.stop(true);
                    delete self._animation;
                }

                if (oldValue !== expanded) {
                    var targetAngle = expanded ? -Math.PI / 4 : 0;

                    if (anim) {
                        oldValue = self.s('switch.angle');
                        self._animation = ht.Default.startAnim({
                            action: function (t) {
                                self.s('switch.angle', oldValue + (targetAngle - oldValue) * t);
                            }
                        });
                    } else {
                        self.s('switch.angle', targetAngle);
                    }
                }
            }
        });
        var e = dataModel.getSelectionModel().getFirstData(), t = e.a("html") || "", a = new ht.widget.Dialog, n = null;
        a.setConfig({
            title: "编辑Html",
            closable: !0,
            draggable: !0,
            resizeMode: "wh",
            maximizable: !0,
            contentPadding: 0,
            width: 600,
            height: 450,
            content: '<div><textarea id="chtml" rows="30" cols="100" spellcheck="false" wrap="off"  style="font-size:14px;">' + t + "</textarea></div>",
            buttons: [{
                label: "确定", action: function (t, i) {
                    n.save(), a.hide();
                    var o = a.getView().querySelector("#chtml").value;
                    o && e.a("html", o)
                }
            }, {
                label: "取消", action: function (e, t) {
                    a.hide()
                }
            }],
            buttonsAlign: "right"
        }), a.onShown = function () {
            (n = CodeMirror.fromTextArea(a.getView().querySelector("#chtml"), {
                lineNumbers: !0,
                mode: "text/typescript"
            })).setSize("auto", "600px")
        }, a.addEventListener(function (e) {
            if ("endResize" == e.kind || "restore" == e.kind || "maximize" == e.kind) {
                a._config.width;
                var t = a._config.height;
                "maximize" == e.kind ? n.setSize("auto", window.innerHeight - 60) : n.setSize("auto", t - 60)
            }
        }), a.show()
    }
}, onlynotselectMenu = {
    label: "仅显示不可选择对象", type: "check", selected: !1, action: function () {
        clearSelected(4), onlynotselectMenu.selected = !0, treeView.invalidateModel(), g2d.iv()
    }
}, onlytagMenu = {
    label: "仅显示动态对象", type: "check", selected: !1, action: function () {
        clearSelected(3), onlytagMenu.selected = !0, treeView.invalidateModel(), g2d.iv()
    }
}, onlyscriptdMenu = {
    label: "仅显示脚本对象", type: "check", selected: !1, action: function () {
        clearSelected(2), onlyscriptdMenu.selected = !0, treeView.invalidateModel(), g2d.iv()
    }
}, onlynotvisibledMenu = {
    label: "仅显示隐藏", type: "check", selected: !1, action: function () {
        clearSelected(1), onlynotvisibledMenu.selected = !0, treeView.invalidateModel(), g2d.iv()
    }
}, viewallMenu = {
    label: "显示全部", type: "check", selected: !0, action: function () {
        clearSelected(0), viewallMenu.selected = !0, treeView.invalidateModel(), g2d.iv()
    }
}, textEditMenu = {
    label: "编辑文字", action: function () {
        var e = dataModel.getSelectionModel().getFirstData();
        getMInput("编辑文字", e.getName(), function (t) {
            e && e.setName(t)
        })
    }
}, copyMirrorMenu = {
    label: "镜像复制", action: function () {
        if (null != dataModel.getSelectionModel().getFirstData()) {
            var e = clip.copyto();
            if (null != e && "" != e) {
                var t = new ht.widget.Dialog;
                t.setConfig({
                    title: "对象镜像设置",
                    closable: !0,
                    draggable: !0,
                    contentPadding: 5,
                    content: '<div>行偏:<input id="rowoffset" style="font-size:14px;width:50px;" value="0"/>&nbsp;&nbsp;&nbsp;列偏:<input id="coloffset" style="font-size:14px;width:50px;" value="20"/>&nbsp;&nbsp;&nbsp;<br/>数量:<input id="count" style="font-size:14px;width:50px;" value="1"/>&nbsp;&nbsp;&nbsp;</div>',
                    buttons: [{
                        label: "确定", action: function (a, n) {
                            t.hide();
                            var i = t.getView().querySelector("#rowoffset").value;
                            i && (i = parseInt(i) || 0);
                            var o = t.getView().querySelector("#coloffset").value;
                            o && (o = parseInt(o) || 0);
                            var r = t.getView().querySelector("#count").value;
                            r && (r = parseInt(r) || 1) < 0 && (r = 1);
                            for (var l = 1; l <= r; l++) {
                                var d, s = clip.pastefrom(e);
                                if (gv = g2d, s) {
                                    gv.sm().cs();
                                    ht.Default.getId();
                                    s.each(function (e) {
                                        d = d ? ht.Default.unionRect(d, e.getRect()) : e.getRect(), e.setTag((e.getTag() || "") + e.getId().toString()), gv.sm().as(e)
                                    }), gv.moveSelection(i * l, o * l)
                                }
                            }
                        }
                    }, {
                        label: "取消", action: function (e, a) {
                            t.hide()
                        }
                    }],
                    buttonsAlign: "right"
                }), t.show()
            }
        }
    }
},
    defaultItem = {
        icon: "images/toolbar/default.gif", toolTip: "默认编辑模式", type: "toggle", action: function () {
            g2d.setEditable(this.selected),
                palette.sm().cs(),
                drawing = !1
        }
    },
    toolbar_options = [defaultItem,
        {
            id: "save", icon: "images/toolbar/save.png", toolTip: "保存",
            action: function () {
                saveScene()
            }
        }, {
            id: "run", icon: "images/toolbar/run.png", toolTip: "运行",
            action: function () {
                runCurrent()
            }
        }, {
            icon: "images/toolbar/zoomIn.gif", toolTip: "放大",
            action: function () {
                g2d.zoomIn(!0)
            }
        }, {
            icon: "images/toolbar/zoomOut.gif", toolTip: "缩小",
            action: function () {
                g2d.zoomOut(!0)
            }
        }, {
            label: "100%", toolTip: "100%",
            action: function () {
                g2d.zoomReset(!0)
            }
        }, {
            label: "0,0", toolTip: "xy坐标恢复",
            action: function () {
                g2d.setTranslate(0, 0)
            }
        }, {//全屏
            icon: "images/toolbar/maximize.png", toolTip: "最大化",
            action: function () {
                //  document.fullscreenElement返回当前文档中正在以全屏模式显示的Element节点, 如果没有使用全屏模式, 则返回null.
                //document.exitFullscreen() 方法用于让当前文档退出全屏模式（原文表述不准确，详见备注）。调用这个方法会让文档回退到上一个调用Element.requestFullscreen()方法进入全屏模式之前的状态。
                document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement ? (view.style.background = "", document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()) : (view.style.left = 0, view.style.top = 0, view.style.width = "100%", view.style.height = "100%", view.style.background = "white", view.requestFullscreen ? view.requestFullscreen() : view.msRequestFullscreen ? view.msRequestFullscreen() : view.mozRequestFullScreen ? view.mozRequestFullScreen() : view.webkitRequestFullscreen && view.webkitRequestFullscreen())
            }
        }, {
            id: "group", icon: "images/toolbar/group.png", toolTip: "成组", disabled: !0,
            action: function () {
                var e = g2d.sm().getSelection();
                e.size() > 1 && Group(e)
            }
        }, {
            id: "ungroup", icon: "images/toolbar/ungroup.png", toolTip: "解组", disabled: !0,
            action: function () {
                var e = g2d.sm().toSelection();
                if (1 == e.size()) {
                    var t = e.get(0);
                    t.s("_gp") && UnGroup(t)
                }
            }
        }, "separator", {
            id: "align_left", icon: "align_left", toolTip: "左对齐", disabled: !0,
            action: function () {
                align(getEditorSelection(), "left")
            }
        }, {
            id: "align_horizontalcenter", icon: "align_horizontalcenter", toolTip: "水平对齐", disabled: !0,
            action: function () {
                align(getEditorSelection(), "horizontalcenter")
            }
        }, {
            id: "align_right", icon: "align_right", toolTip: "右对齐", disabled: !0,
            action: function () {
                align(getEditorSelection(), "right")
            }
        }, {
            id: "align_top", icon: "align_top", toolTip: "上对齐", disabled: !0,
            action: function () {
                align(getEditorSelection(), "top")
            }
        }, {
            id: "align_verticalcenter", icon: "align_verticalcenter", toolTip: "垂直对齐", disabled: !0,
            action: function () {
                align(getEditorSelection(), "verticalcenter")
            }
        }, {
            id: "align_bottom", icon: "align_bottom", toolTip: "下对齐", disabled: !0,
            action: function () {
                align(getEditorSelection(), "bottom")
            }
        }, "separator", {
            id: "align_even_horizontal", icon: "align_even_horizontal", toolTip: "水平间隔相等", disabled: !0,
            action: function () {
                evenSpace(getEditorSelection(), !0)
            }
        }, {
            id: "align_even_vertical", icon: "align_even_vertical", toolTip: "垂直间隔相等", disabled: !0,
            action: function () {
                evenSpace(getEditorSelection(), !1)
            }
        }, {
            id: "samewidth", icon: "samewidth", toolTip: "等宽", disabled: !0,
            action: function () {
                sameWidth(getEditorSelection())
            }
        }, {
            id: "sameheight", icon: "sameheight", toolTip: "等高", disabled: !0,
            action: function () {
                sameHeight(getEditorSelection())
            }
        }, "separator", {
            icon: "images/toolbar/html.png", toolTip: "Html Head代码", id: "headhtml",
            action: function () {
                var e = new ht.widget.Dialog,
                    t = null;
                e.setConfig({
                    title: "Html Head代码",
                    closable: !0,//表示是否显示关闭按钮
                    draggable: !0,//指定对话框是否可拖拽调整位置，可选值为true/false
                    resizeMode: "wh",//resizeMode 鼠标移动到对话框右下角可改变对话框的大小，此参数控制resize模式：w表示只调整宽度，h表示只调整高度，wh表示宽高都可调整，none表示不可调整宽高
                    maximizable: !0,//maximizable 可选值为true/false，表示对话框是否可被最大化
                    contentPadding: 0,//内容内边距
                    width: 900,
                    height: 510,
                    content: '<div><textarea id="head" spellcheck="false" wrap="off" rows="15" cols="100" style="visibility:hidden;">' + HT2dEditor.currScene.headHtml + "</textarea></div>",
                    buttons: [{
                        label: "确定",
                        action: function (a, n) {
                            t.save();//定义在js/codemirror.js
                            var i = e.getView().querySelector("#head").value;
                            null != i && (HT2dEditor.currScene.headHtml = i), e.hide()
                        }
                    }, {
                        label: "取消",
                        action: function (t, a) {//a鼠标当前点信息
                            e.hide()
                        }
                    }],
                    buttonsAlign: "right"
                }), e.onShown = function () {//onShown 回调函数，对话框显示以后回调
                    (t = CodeMirror.fromTextArea(e.getView().querySelector("#head"), {
                        lineNumbers: !0,
                        mode: "text/typescript"
                    })).setSize("auto", "450px")
                }, e.addEventListener(function (a) {

                    if ("endResize" == a.kind || "restore" == a.kind || "maximize" == a.kind) {
                        e._config.width;
                        var n = e._config.height;
                        "maximize" == a.kind ? t.setSize("auto", window.innerHeight - 60) : t.setSize("auto", n - 60)
                    }
                }), e.show()
            }
        }, {
            icon: "images/toolbar/html.png", toolTip: "Html Body代码", id: "bodyhtml", action: function () {
                var e = new ht.widget.Dialog, t = null;
                e.setConfig({
                    title: "Html Body代码",
                    closable: !0,
                    draggable: !0,
                    resizeMode: "wh",
                    maximizable: !0,
                    contentPadding: 0,
                    width: 900,
                    height: 510,
                    content: '<div><textarea id="body" rows="15" spellcheck="false" wrap="off" cols="100" style="visibility:hidden;">' + HT2dEditor.currScene.bodyHtml + "</textarea></div>",
                    buttons: [{
                        label: "确定", action: function (a, n) {
                            t.save();
                            var i = e.getView().querySelector("#body").value;
                            null != i && (HT2dEditor.currScene.bodyHtml = i), e.hide()
                        }
                    }, {
                        label: "取消", action: function (t, a) {
                            e.hide()
                        }
                    }],
                    buttonsAlign: "right"
                }), e.onShown = function () {
                    (t = CodeMirror.fromTextArea(e.getView().querySelector("#body"), {
                        lineNumbers: !0,
                        mode: "text/typescript"
                    })).setSize("auto", "450px")
                }, e.addEventListener(function (a) {
                    if ("endResize" == a.kind || "restore" == a.kind || "maximize" == a.kind) {
                        e._config.width;
                        var n = e._config.height;
                        "maximize" == a.kind ? t.setSize("auto", window.innerHeight - 60) : t.setSize("auto", n - 60)
                    }
                }), e.show()
            }
        }, {
            icon: "images/toolbar/info.png", label: "", toolTip: "文件信息", id: "filename",
            action: function () {
                var e = new ht.widget.Dialog,
                    t = HT2dEditor.currScene.autoSize ? "checked" : "",
                    a = HT2dEditor.currScene.isMovable ? "checked" : "",
                    n = HT2dEditor.currScene.isPannable ? "checked" : "";

                e.setConfig({
                    title: "文件信息",
                    closable: !0,
                    draggable: !0,
                    contentPadding: 5,
                    content: '<div>标题:<input id="title" spellcheck="false" style="font-size:14px;width:400px;" value="' + HT2dEditor.currScene.title + '"/><br/>描述:<textarea id="info" spellcheck="false" wrap="off" rows="10" cols="50" style="font-size:14px;width:400px;">' + HT2dEditor.currScene.info + '</textarea><br/><br/>数据更新:<input id="dataRate" style="font-size:14px;width:50px;" value="' + HT2dEditor.currScene.dataRate.toString() + '"/>ms&nbsp;&nbsp;&nbsp;动画时间:<input id="animRate" style="font-size: 14px;width:50px;" value="' + HT2dEditor.currScene.animRate.toString() + '"/>ms&nbsp;&nbsp;&nbsp;画面自适应:<input id="autoSize" type="checkbox"' + t + ' style="font-size: 14px;"/><br/><br/>放大比例:<input id="zoomMax" style="font-size:14px;width:50px;" value="' + HT2dEditor.currScene.zoomMax.toString() + '"/>ms&nbsp;&nbsp;&nbsp;缩小比例:<input id="zoomMin" style="font-size: 14px;width:50px;" value="' + HT2dEditor.currScene.zoomMin.toString() + '"/>ms&nbsp;&nbsp;&nbsp;画面可平移:<input id="isPannable" type="checkbox"' + n + ' style="font-size: 14px;"/>&nbsp;&nbsp;对象移动:<input id="isMovable" type="checkbox"' + a + ' style="font-size: 14px;"/></div>',
                    buttons: [{
                        label: "确定", action: function (t, a) {
                            e.hide();
                            var n = e.getView().querySelector("#info").value;
                            null != n && (HT2dEditor.currScene.info = n);
                            var i = e.getView().querySelector("#title").value;
                            null != i && (HT2dEditor.currScene.title = i);
                            var o = e.getView().querySelector("#dataRate").value;
                            o && (HT2dEditor.currScene.dataRate = parseInt(o) || 1e3);//1e3 1000
                            var r = e.getView().querySelector("#animRate").value;
                            r && (HT2dEditor.currScene.animRate = parseInt(r) || 500);
                            var l = e.getView().querySelector("#autoSize").checked;
                            HT2dEditor.currScene.autoSize = l;
                            var d = e.getView().querySelector("#isPannable").checked;
                            HT2dEditor.currScene.isPannable = d;
                            var s = e.getView().querySelector("#isMovable").checked;
                            HT2dEditor.currScene.isMovable = s;
                            var c = e.getView().querySelector("#zoomMax").value;
                            c && (HT2dEditor.currScene.zoomMax = parseFloat(c) || 8);
                            var g = e.getView().querySelector("#zoomMin").value;
                            g && (HT2dEditor.currScene.zoomMin = parseFloat(g) || .25)
                        }
                    }, {
                        label: "取消", action: function (t, a) {
                            e.hide()
                        }
                    }],
                    buttonsAlign: "right"
                }), e.show()
            }
        }, {
            label: "", toolTip: "鼠标位置", id: "position", disabled: !0,
            action: function () {
            }
        }
    ];
var getEditorSelection = function () {
    return dataModel.sm().getSelection().toArray()
}, getBounds = function (e) {
    var t = NULL;
    if (e.length > 0) return t = {
        x: e[0].getPosition().x,
        y: e[0].getPosition().y,
        width: 0,
        height: 0
    }, e.forEach(function (e) {
        if (e instanceof ht.Node) {
            var a = e.getRect();
            t = ht.Default.unionRect(t, a)
        }
    }), t
}, align = function (e, t) {
    if (!(e == NULL || e.length < 2)) {
        var a = getBounds(e);
        a != NULL && a.x != Number.MAX_VALUE && (t = t.toLowerCase(), e.forEach(function (e) {
            if (e instanceof ht.Node) {
                var n = e.getPosition(), i = n.x, o = n.y, r = e.getWidth(), l = e.getHeight(), d = a.x, s = a.y,
                    c = a.width, g = a.height;
                switch (t) {
                    case LEFT:
                        i = d + r / 2;
                        break;
                    case RIGHT:
                        i = d + c - r / 2;
                        break;
                    case TOP:
                        o = s + l / 2;
                        break;
                    case BOTTOM:
                        o = s + g - l / 2;
                        break;
                    case "horizontalcenter":
                        i = d + c / 2;
                        break;
                    case "verticalcenter":
                        o = s + g / 2
                }
                e.setPosition(i, o)
            }
        }))
    }
}, evenSpace = function (e, t) {
    if (!(e == NULL || e.length < 3)) {
        var a = getBounds(e);
        if (a != NULL && a.x != Number.MAX_VALUE) {
            e.sort(function (e, a) {
                return t ? e.getPosition().x - a.getPosition().x : e.getPosition().y - a.getPosition().y
            });
            var n = e.length, i = 0;
            e.forEach(function (e) {
                i += t ? e.getWidth() : e.getHeight()
            });
            var o = ((t ? a.width : a.height) - i) / (n - 1), r = t ? a.x : a.y;
            e.forEach(function (e, a) {
                if (e instanceof ht.Node) {
                    var n = e.getWidth(), i = e.getHeight(), l = e.getPosition();
                    t ? e.setPosition(r + a * o + n / 2, l.y) : e.setPosition(l.x, r + a * o + i / 2), r += t ? n : i
                }
            })
        }
    }
}, sameWidth = function (e) {
    if (!(e == NULL || e.length < 2)) {
        var t = e[0].getWidth();
        e.forEach(function (e) {
            e.setWidth(t)
        })
    }
}, sameHeight = function (e) {
    if (!(e == NULL || e.length < 2)) {
        var t = e[0].getHeight();
        e.forEach(function (e) {
            e.setHeight(t)
        })
    }
}, loadImage = function (e) {
    $.post("server/getbackground.ashx", {}, function (t) {
        var a = t, n = new ht.DataModel, i = null, o = 0, r = 0, l = Math.floor(5);
        a.forEach(function (e) {
            (i = new ht.Node).setName(e), i.setImage("images/background/" + e), i.s("select.color", "blue"), i.setWidth(120), i.setHeight(80), i.setStyle("label.max", 150), i.setPosition(160 * (o + .5), 110 * (r + .5)), ++o >= l && (o %= l, r++), n.add(i)
        });
        var d = new ht.graph.GraphView(n);
        d.handleScroll = function (e, t) {
            this.translate(0, t, !1), e.preventDefault(), e.stopPropagation()
        }, d.adjustTranslateX = function (e) {
            return 0
        }, d.adjustTranslateY = function (e) {
            return e < 0 ? e : 0
        }, d.setMovableFunc(function () {
            return !1
        });
        var s = new ht.widget.Dialog, c = new ht.widget.ContextMenu;
        c.addTo(s.getView()), c.setItems([]), s.setConfig({
            title: "背景图形列表",
            width: 800,
            height: 550,
            closable: !0,
            draggable: !0,
            resizeMode: "wh",
            maximizable: !0,
            content: d,
            buttons: [{
                label: "确定", action: function (t, a) {
                    var i = n.getSelectionModel().getFirstData();
                    i && e(i), s.hide()
                }
            }, {
                label: "取消", action: function (e, t) {
                    s.hide()
                }
            }],
            buttonsAlign: "right",
            action: function (e, t) {
            }
        }), s.addEventListener(function (e) {
            if ("endResize" == e.kind || "restore" == e.kind || "maximize" == e.kind) {
                var t = s._config.width;
                s._config.height;
                "maximize" == e.kind && (t = window.innerWidth), l = Math.floor(t / 160), r = 0, o = 0, n.each(function (e) {
                    e.setPosition(160 * (o + .5), 110 * (r + .5)), ++o >= l && (o %= l, r++)
                })
            }
        }), d.onDataDoubleClicked = function (t) {
            e(t), s.hide()
        }, s.show()
    })
}, setBackground = function () {
    loadImage(function (e) {
        drawBackground(e.getImage())
    })
}, drawBackground = function (e) {
    var t = new Image;
    t.src = e, t.onload = function (a) {
        var n = dataModel.getDataByTag("background");
        n && dataModel.remove(n);
        var i = new ht.Node;
        i.setImage(e);
        var o = t.width, r = t.height;
        i.setWidth(o), i.setHeight(r), i.setPosition(.5 * o, .5 * r), i.setLayer("backgroundLayer"), i.setTag("background"), i.setStyle("label.opacity", 0), i.setStyle("2d.selectable", !1), i.setStyle("2d.movable", !1), i.setStyle("2d.editable", !1), dataModel.add(i), initMenu()
    }
}, lockBackground = function (e) {
    var t = dataModel.getDataByTag("background");
    t.setStyle("2d.selectable", e), t.setStyle("2d.movable", e), t.setStyle("2d.editable", e)
}, isBackgroundLocked = function () {
    var e = dataModel.getDataByTag("background");
    return !!e && !e.getStyle("2d.selectable")
}, setBackgroundColor = function () {
    var e = new ht.DataModel, t = new ht.Data;
    t.a("background", g2d.getView().style.backgroundColor), e.add(t), e.sm().setSelection([t]);
    var a = new ht.widget.PropertyView(e);
    a.setIndent(0), a.setRowHeight(30), a.setSelectRowIndex(0), a.setProperties([{
        name: "background",
        displayName: "背景颜色",
        valueType: "color",
        accessType: "attr",
        editable: !0,
        formatValue: function (e) {
            return e || "#FFFFFF"
        }
    }]);
    var n = new ht.widget.Dialog, i = new ht.widget.ContextMenu;
    i.addTo(n.getView()), i.setItems([]), n.setConfig({
        title: "背景颜色设置",
        width: 280,
        height: 111,
        closable: !0,
        draggable: !0,
        content: a,
        contentPadding: 10,
        background: "#D9D9D9",
        buttons: [{
            label: "OK", action: function (e, a) {
                g2d.getView().style.backgroundColor = t.a("background"), dataModel.setAttr("background", t.a("background")), n.hide()
            }
        }],
        buttonsAlign: "right",
        action: function (e, t) {
        }
    }), n.show()
}, loadImageControl = function (e) {
    $.post("server/getimagecontrol.ashx", {}, function (t) {
        var a = null, n = t, i = new ht.DataModel, o = null, r = 0, l = 0, d = Math.floor(800 / 120), s = new ht.Text;
        s.setName("目录列表:"), s.setPosition(s.getWidth() / 2, s.getHeight() / 2), s.setStyle("2d.selectable", !1), s.setStyle("2d.movable", !1), s.setStyle("2d.editable", !1), i.add(s);
        var c = new ht.ComboboxNode;
        c.setWidth(150), c.setHeight(25), c.setPosition(140, c.getHeight() / 2 + 2.5), c.setItems(n), c.setSelectedIndex(0), c.setStyle("2d.movable", !1), c.setStyle("2d.editable", !1), c.s("select.color", "white"), i.add(c);
        var g = function (e) {
            $.post("server/getimagefiles.ashx", { dir: e }, function (t) {
                (a = t).forEach(function (t) {
                    (o = new ht.Node).setName(t), o.setImage("images/control/" + e + "/" + t), o.s("select.color", "blue"), o.setWidth(80), o.setHeight(80), o.setStyle("label.max", 110), o.setPosition(120 * (r + .5), 30 + 110 * (l + .5)), ++r >= d && (r %= d, l++), i.add(o)
                })
            })
        };
        if (t.length > 0) {
            var u = n[c.getSelectedIndex()];
            g(u)
        }
        c.onChanged = function (e) {
            var t = new ht.List;
            i.each(function (e) {
                e instanceof ht.Text || e instanceof ht.ComboboxNode || t.add(e)
            }), t.each(function (e) {
                i.remove(e)
            }), l = 0, r = 0, g(e)
        };
        var m = new ht.graph.GraphView(i);
        m.handleScroll = function (e, t) {
            this.translate(0, t, !1), e.preventDefault(), e.stopPropagation()
        }, m.adjustTranslateX = function (e) {
            return 0
        }, m.adjustTranslateY = function (e) {
            return e < 0 ? e : 0
        }, m.setMovableFunc(function () {
            return !1
        });
        var f = new ht.widget.Dialog, p = new ht.widget.ContextMenu;
        p.addTo(f.getView()), p.setItems([]), f.setConfig({
            title: "图形列表",
            width: 800,
            height: 550,
            closable: !0,
            draggable: !0,
            resizeMode: "wh",
            maximizable: !0,
            content: m,
            buttons: [{
                label: "确定", action: function (t, a) {
                    var n = i.getSelectionModel().getFirstData();
                    n && (n instanceof ht.ComboboxNode || e(n)), f.hide()
                }
            }, {
                label: "取消", action: function (e, t) {
                    f.hide()
                }
            }],
            buttonsAlign: "right",
            action: function (e, t) {
            }
        }), m.onDataDoubleClicked = function (t) {
            e(t), f.hide()
        }, f.addEventListener(function (e) {
            if ("endResize" == e.kind || "restore" == e.kind || "maximize" == e.kind) {
                var t = f._config.width;
                f._config.height;
                "maximize" == e.kind && (t = window.innerWidth), d = Math.floor(t / 120);
                var a = new ht.List;
                i.each(function (e) {
                    e instanceof ht.Text || e instanceof ht.ComboboxNode || a.add(e)
                }), l = 0, r = 0, a.each(function (e) {
                    e.setPosition(120 * (r + .5), 30 + 110 * (l + .5)), ++r >= d && (r %= d, l++)
                })
            }
        }), f.show()
    })
}, selectImageControl = function (e) {
    loadImageControl(function (t) {
        if (e) {
            var a = new Image;
            a.src = t.getImage(), a.onload = function (n) {
                e && (e.setImage(t.getImage()), e.setWidth(a.width), e.setHeight(a.height), e.setIcon("imgpng"))
            }
        } else createImage(t.getImage())
    })
}, loaduserImageControl = function (e) {
    $.post("server/getuserimage.ashx", {}, function (t) {
        var a = t, n = new ht.DataModel, i = null, o = 0, r = 0, l = Math.floor(800 / 120);
        a.forEach(function (e) {
            (i = new ht.Node).setName(e), i.setImage("images/user/" + e), i.s("select.color", "blue"), i.setWidth(80), i.setHeight(80), i.setStyle("label.max", 110), i.setPosition(120 * (o + .5), 110 * (r + .5)), ++o >= l && (o %= l, r++), n.add(i)
        });
        var d = new ht.graph.GraphView(n);
        d.handleScroll = function (e, t) {
            this.translate(0, t, !1), e.preventDefault(), e.stopPropagation()
        }, d.adjustTranslateX = function (e) {
            return 0
        }, d.adjustTranslateY = function (e) {
            return e < 0 ? e : 0
        }, d.setMovableFunc(function () {
            return !1
        });
        var s = new ht.widget.Dialog, c = new ht.widget.ContextMenu;
        c.addTo(s.getView()), c.setItems([]), s.setConfig({
            title: "用户图形列表",
            width: 800,
            height: 550,
            closable: !0,
            draggable: !0,
            resizeMode: "wh",
            maximizable: !0,
            content: d,
            buttons: [{
                label: "确定", action: function (t, a) {
                    var i = n.getSelectionModel().getFirstData();
                    i && (i instanceof ht.ComboboxNode || e(i)), s.hide()
                }
            }, {
                label: "取消", action: function (e, t) {
                    s.hide()
                }
            }],
            buttonsAlign: "right",
            action: function (e, t) {
            }
        }), d.onDataDoubleClicked = function (t) {
            e(t), s.hide()
        }, s.addEventListener(function (e) {
            if ("endResize" == e.kind || "restore" == e.kind || "maximize" == e.kind) {
                var t = s._config.width;
                s._config.height;
                "maximize" == e.kind && (t = window.innerWidth), l = Math.floor(t / 120);
                var a = new ht.List;
                n.each(function (e) {
                    e instanceof ht.Text || e instanceof ht.ComboboxNode || a.add(e)
                }), r = 0, o = 0, a.each(function (e) {
                    e.setPosition(120 * (o + .5), 30 + 110 * (r + .5)), ++o >= l && (o %= l, r++)
                })
            }
        }), s.show()
    })
}, selectuserImageControl = function (e) {
    loaduserImageControl(function (t) {
        if (e) {
            var a = new Image;
            a.src = t.getImage(), a.onload = function (n) {
                e && (e.setImage(t.getImage()), e.setWidth(a.width), e.setHeight(a.height), e.setIcon("imgpng"))
            }
        } else createImage(t.getImage())
    })
}, createMenu = function () {
    var e = function (e) {
        if ("新建..." === e.label) {
            var t = new ht.widget.Dialog, a = new ht.widget.ContextMenu;
            a.addTo(t.getView()), a.setItems([]), t.setConfig({
                title: "新建",
                closable: !0,
                draggable: !0,
                contentPadding: 5,
                content: '<div>文件名称:<input name="filename" id="filename" style="font-size: 14px;width:220px;"><br/>边框宽度:<input name="width" id="width" value="1024" style="font-size: 14px;width:50px;"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;边框高度:<input name="height" id="height" value="768" style="font-size: 14px;width:50px;"/><br />文件信息:<textarea id="info" style="font-size: 14px;width:220px;height:120px;"></textarea></div>',
                buttons: [{
                    label: "确定", action: function (e, a) {
                        t.hide();
                        var n = t.getView().querySelector("#filename").value;
                        n = n.replace(/,/g, ""), "" != (n = n.replace(/ /g, "")) && $.post("server/jsonfileExist.ashx", { filename: n }, function (e) {
                            var a = !1;
                            if (0 == e.length ? a = !0 : confirm("文件已经存在,是否要继续?") && (a = !0), a) {
                                isnew = !0, updateToolbar();
                                var i = t.getView().querySelector("#info").value;
                                HT2dEditor.currScene.id = 0, HT2dEditor.currScene.filename = n, HT2dEditor.currScene.info = i, HT2dEditor.currScene.title = n, HT2dEditor.currScene.headHtml = "", HT2dEditor.currScene.bodyHtml = "", dataModel.clear(), toolbar.getItemById("filename").toolTip = n;
                                var o = t.getView().querySelector("#width").value,
                                    r = t.getView().querySelector("#height").value;
                                "" != o ? (o = parseInt(o), isNaN(o) && (o = 1024)) : o = 1024, "" != r ? (r = parseInt(r), isNaN(r) && (r = 1024)) : r = 1024, createFrameBorder(o, r)
                            }
                        })
                    }
                }, {
                    label: "取消", action: function (e, a) {
                        t.hide()
                    }
                }],
                buttonsAlign: "right"
            }), t.show()
        } else if ("上载图片" == e.label) {
            t = new ht.widget.Dialog;
            window.dialog = t, t.setConfig({
                title: "上载图片",
                closable: !0,
                draggable: !0,
                contentPadding: 0,
                width: 400,
                height: 190,
                content: '<iframe width="400px" height="190px" name="fm" id="fm" src="uploadFile.aspx"> '
            }), t.show()
        } else if ("打开..." === e.label) openFromFile(); else if ("打开本地" === e.label) openFromLocal(); else if ("保存" === e.label) saveScene(); else if ("复制" === e.label) clip.copy(); else if ("粘贴" === e.label) clip.paste(); else if ("全选" === e.label) dataModel.getSelectionModel().selectAll(); else if ("剪切" === e.label) clip.copy(), (n = dataModel.getSelectionModel().toSelection()).each(function (e) {
            dataModel.remove(e)
        }); else if ("删除" === e.label) {
            var n = dataModel.getSelectionModel().toSelection();
            n.each(function (e) {
                dataModel.remove(e)
            })
        } else if ("清除" === e.label) dataModel.clear(); else if ("运行" === e.label) runCurrent(); else if ("另存为..." === e.label) saveSceneAs(); else if ("背景图片" === e.label) setBackground(); else if ("图形控件" == e.label) {
            i = dataModel.getSelectionModel().getFirstData();
            selectImageControl(i ? i : null)
        } else if ("用户图形" == e.label) {
            var i = dataModel.getSelectionModel().getFirstData();
            selectuserImageControl(i ? i : null)
        } else "背景颜色" === e.label ? setBackgroundColor() : "锁定背景" === e.label ? lockBackground(!e.selected) : "撤消" == e.label ? historyManager.undo() : "重做" == e.label ? historyManager.redo() : "标签替换" == e.label ? replaceTag() : "文本替换" == e.label && replaceText()
    },
        menu_options_ = [{
        // 文件
            label: "文件", items: [{ label: "新建...", action: e }, {
                label: "新窗口", action: function () {
                    // window.open("editor.aspx")
                    window.open("./editor.html");
                }
            }, { label: "打开...", suffix: "Ctrl+1", key: [Key.ctrl, Key.n1], action: e }, {
                label: "打开本地",
                suffix: "Ctrl+L",
                key: [Key.ctrl, Key.l],
                action: e
            }, { label: "保存", suffix: "Ctrl+S", key: [Key.ctrl, Key.s], action: e }, {
                label: "另存为...",
                action: e
            }, {
                label: "运行", action: function () {
                    runCurrent()
                }
            }, {
                label: "自动保存", action: function () {
                    var e = getinputvalue("输入自动保存周期(30秒-300秒)", (autoSaveInteval / 1e3).toString());
                    if (e) {
                        var t = parseInt(e);
                        "number" == typeof t && (isNaN(t) || (t < 30 && (t = 30), t > 300 && (t = 300), autoSaveInteval = 1e3 * t, resettimer()))
                    }
                }
            }, "separator", { label: "背景图片", action: e }, { label: "背景颜色", action: e }, {
                label: "标签浏览",
                href: "database.html",
                linkTarget: "_blank",
                preventDefault: !1
            }, { label: "后台管理", href: "admin/index.aspx", linkTarget: "_blank", preventDefault: !1 }, {
                label: "系统状态",
                href: "status.aspx",
                linkTarget: "_blank",
                preventDefault: !1
            }]
        }, {
        // 编辑
            label: "编辑", items: [{
                label: "查找对象", suffix: "Ctrl+F", key: [Key.ctrl, Key.f], 
                action: function (e) {
                    showFind()
                }
            }, { label: "标签替换", action: e }, { label: "文本替换", action: e }, {
                label: "上载图片",
                suffix: "Ctrl+U",
                key: [Key.ctrl, Key.u],
                action: e
            }, { label: "图形控件", action: e }, { label: "用户图形", action: e }, {
                label: "撤消",
                suffix: "Ctrl+Z",
                action: e
            }, { label: "重做", suffix: "Ctrl+R", action: e }, "separator", {
                label: "复制",
                suffix: "Ctrl+C",
                action: e
            }, { label: "粘贴", suffix: "Ctrl+V", action: e }, "separator", {
                label: "剪切",
                suffix: "Ctrl+X",
                action: e
            }, { label: "删除", suffix: "Delete", action: e }, { label: "清除", action: e }, {
                suffix: "Ctrl+A",
                label: "全选",
                action: e
            }, {
                label: "取消选择", action: function () {
                    g2d.dm().sm().cs()
                }
            }]
        }, {
        // 视图
            label: "视图", items: [{
                label: "平移", type: "check", selected: isPannable, action: function (e) {
                    isPannable = e.selected
                }
            }, {
                label: "网格", type: "check", selected: drawGrid, action: function (e) {
                    drawGrid = e.selected, g2d.redraw()
                }
            }, {
                label: "设置网格", action: function (e) {
                    var t = getinputvalue("输入网格设置值(2-20)", gridSpace);
                    if (t) {
                        var a = parseInt(t);
                        "number" == typeof a && (isNaN(a) || (a < 2 && (a = 2), a > 20 && (a = 20), gridSpace = a, drawGrid && g2d.redraw()))
                    }
                }
            }, {
                label: "对齐到网格", type: "check", selected: snap, action: function (e) {
                    snap = e.selected, snap ? g2d.setSnapSpacing(gridSpace) : g2d.setSnapSpacing(1)
                }
            }, {
                label: "显示左侧栏", type: "check", selected: !0, action: function () {
                    "normal" == leftSplit.getStatus() ? leftSplit.setStatus("cl") : leftSplit.setStatus("normal")
                }
            }, {
                label: "显示右侧栏", type: "check", selected: !0, action: function () {
                    "normal" == mainSplit.getStatus() ? mainSplit.setStatus("cr") : mainSplit.setStatus("normal")
                }
            }, {
                label: "标签浏览器", action: function () {
                    showTagsDialog(function (e) {
                        dataModel.sm().cs();
                        var t = 50;
                        e.each(function (e) {
                            if ("" != e.a("plug")) {
                                var a = (e.a("plug") + "." + e.a("id")).toUpperCase(), n = new ht.Node;
                                if (n.setImage("TagValue"), n.a("tagname", a), "" != e.a("desc") && n.a("ToolTip", e.a("desc")), n.setWidth(80), "Boolean" == e.a("type")) n.a("tagvalue", "False"); else if ("String" == e.a("type")) n.a("tagvalue", e.a("id")); else if (e.a("unit") && n.a("unit", e.a("unit")), e.a("digcount")) {
                                    var i = e.a("digcount");
                                    n.a("digcount", i);
                                    for (var o = "0.", r = 0; r < i; r++) o += "0";
                                    n.a("tagvalue", o)
                                } else n.a("tagvalue", "0");
                                n.setTag(a);
                                var l = rulerFrame.getComponentViewRect(g2d);
                                n.setPosition(l.x + 80, l.y + t), t += 30, n.setLayer("nodeLayer"), dataModel.add(n), dataModel.sm().as(n)
                            }
                        })
                    })
                }
            }, {
                label: "统计使用标签", action: function () {
                    showAllTags()
                }
            }]
        }, {
        // 扩展
            label: "扩展", items: [{
                label: "JustGage仪表", action: function () {
                    getInput("输入控件名称", "myjustgage", function (e) {
                        if (e && "" != e) {
                            var t = (new Date).toLocaleTimeString();
                            $.get("wizard/justgage.js?t=" + t, function (t) {
                                var a = new ht.Script;
                                a.a("html", !0), a.setName("justgage代码"), a.setTag(e), a.a("type", "初始化脚本"), a.a("script", t.replace(new RegExp("myjustgage", "g"), e)), a.setLayer("nodeLayer");
                                var n = rulerFrame.getComponentViewRect(g2d);
                                a.setWidth(200), a.setHeight(200), a.setPosition(n.x + 200, n.y + 200), dataModel.add(a), dataModel.sm().cs(), dataModel.sm().as(a)
                            }, "text"), addjustgage()
                        }
                    })
                }
            }, {
                label: "TreeView控件", action: function () {
                    getInput("输入控件名称", "mytreeView1", function (e) {
                        if (e && "" != e) {
                            var t = (new Date).toLocaleTimeString();
                            $.get("wizard/treeview.js?t=" + t, function (t) {
                                var a = new ht.Script;
                                a.setName("TreeView代码"), a.setTag(e), a.a("type", "初始化脚本"), a.a("script", t.replace(new RegExp("mytreeView", "g"), e)), a.setLayer("nodeLayer");
                                var n = rulerFrame.getComponentViewRect(g2d);
                                a.setPosition(n.x + 50, n.y + 50), dataModel.add(a), dataModel.sm().cs(), dataModel.sm().as(a)
                            }, "text")
                        }
                    })
                }
            }, {
                label: "ListView控件", action: function () {
                    getInput("输入控件名称", "mylistView1", function (e) {
                        if (e && "" != e) {
                            var t = (new Date).toLocaleTimeString();
                            $.get("wizard/listview.js?t=" + t, function (t) {
                                var a = new ht.Script;
                                a.setName("ListView代码"), a.setTag(e), a.a("type", "初始化脚本"), a.a("script", t.replace(new RegExp("mylistView1", "g"), e)), a.setLayer("nodeLayer");
                                var n = rulerFrame.getComponentViewRect(g2d);
                                a.setPosition(n.x + 50, n.y + 50), dataModel.add(a), dataModel.sm().cs(), dataModel.sm().as(a)
                            }, "text")
                        }
                    })
                }
            }, {
                label: "TreeTableView控件", action: function () {
                    getInput("输入控件名称", "mytreeTable1", function (e) {
                        if (e && "" != e) {
                            var t = (new Date).toLocaleTimeString();
                            $.get("wizard/treetableview.js?t=" + t, function (t) {
                                var a = new ht.Script;
                                a.setName("TreeTableView代码"), a.setTag(e), a.a("type", "初始化脚本"), a.a("script", t.replace(new RegExp("mytreeTable", "g"), e)), a.setLayer("nodeLayer");
                                var n = rulerFrame.getComponentViewRect(g2d);
                                a.setPosition(n.x + 50, n.y + 50), dataModel.add(a), dataModel.sm().cs(), dataModel.sm().as(a)
                            }, "text")
                        }
                    })
                }
            }, {
                label: "表单控件", action: function () {
                    getInput("输入控件名称", "myformPane1", function (e) {
                        if (e && "" != e) {
                            var t = (new Date).toLocaleTimeString();
                            $.get("wizard/form.js?t=" + t, function (t) {
                                var a = new ht.Script;
                                a.setName("Form表单代码"), a.setTag(e), a.a("type", "初始化脚本"), a.a("script", t.replace(new RegExp("myformPane", "g"), e)), a.setLayer("nodeLayer");
                                var n = rulerFrame.getComponentViewRect(g2d);
                                a.setPosition(n.x + 50, n.y + 50), dataModel.add(a), dataModel.sm().cs(), dataModel.sm().as(a)
                            }, "text")
                        }
                    })
                }
            }, "separator", {
                label: "询问对话框", action: function () {
                    getInput("输入控件名称", "mydialog", function (e) {
                        if (e && "" != e) {
                            var t = (new Date).toLocaleTimeString();
                            $.get("wizard/dialog1.js?t=" + t, function (t) {
                                var a = new ht.Script;
                                a.setName("询问对话框"), a.setTag(e), a.a("type", "初始化脚本"), a.a("script", t.replace(new RegExp("mydialog", "g"), e)), a.setLayer("nodeLayer");
                                var n = rulerFrame.getComponentViewRect(g2d);
                                a.setPosition(n.x + 50, n.y + 50), dataModel.add(a), dataModel.sm().cs(), dataModel.sm().as(a)
                            }, "text")
                        }
                    })
                }
            }, {
                label: "对话框表单", action: function () {
                    getInput("输入控件名称", "mydialog1", function (e) {
                        if (e && "" != e) {
                            var t = (new Date).toLocaleTimeString();
                            $.get("wizard/dialog2.js?t=" + t, function (t) {
                                var a = new ht.Script;
                                a.setName("对话框表单"), a.setTag(e), a.a("type", "初始化脚本"), a.a("script", t.replace(new RegExp("mydialog", "g"), e)), a.setLayer("nodeLayer");
                                var n = rulerFrame.getComponentViewRect(g2d);
                                a.setPosition(n.x + 50, n.y + 50), dataModel.add(a), dataModel.sm().cs(), dataModel.sm().as(a)
                            }, "text")
                        }
                    })
                }
            }, {
                label: "HTML对话框表单", action: function () {
                    getInput("输入控件名称", "mydialog2", function (e) {
                        if (e && "" != e) {
                            var t = (new Date).toLocaleTimeString();
                            $.get("wizard/dialog3.js?t=" + t, function (t) {
                                var a = new ht.Script;
                                a.setTag(e), a.setName("HTML对话框表单"), a.a("type", "初始化脚本"), a.a("script", t.replace(new RegExp("mydialog", "g"), e)), a.setLayer("nodeLayer");
                                var n = rulerFrame.getComponentViewRect(g2d);
                                a.setPosition(n.x + 50, n.y + 50), dataModel.add(a), dataModel.sm().cs(), dataModel.sm().as(a)
                            }, "text")
                        }
                    })
                }
            }, {
                label: "Table表格控件", action: function () {
                    getInput("输入控件名称", "mytable", function (e) {
                        if (e && "" != e) {
                            var t = (new Date).toLocaleTimeString();
                            $.get("wizard/tableview.js?t=" + t, function (t) {
                                var a = new ht.Script;
                                a.setTag(e), a.setName("Table表格控件"), a.a("type", "初始化脚本"), a.a("script", t.replace(new RegExp("mytable", "g"), e)), a.setLayer("nodeLayer");
                                var n = rulerFrame.getComponentViewRect(g2d);
                                a.setPosition(n.x + 50, n.y + 50), dataModel.add(a), dataModel.sm().cs(), dataModel.sm().as(a)
                            }, "text")
                        }
                    })
                }
            }, {
                label: "表格对话框", action: function () {
                    getInput("输入控件名称", "mytabledialog", function (e) {
                        if (e && "" != e) {
                            var t = (new Date).toLocaleTimeString();
                            $.get("wizard/tableviewdialog.js?t=" + t, function (t) {
                                var a = new ht.Script;
                                a.setTag(e), a.setName("表格对话框"), a.a("type", "初始化脚本"), a.a("script", t.replace(new RegExp("mydialog", "g"), e)), a.setLayer("nodeLayer");
                                var n = rulerFrame.getComponentViewRect(g2d);
                                a.setPosition(n.x + 50, n.y + 50), dataModel.add(a), dataModel.sm().cs(), dataModel.sm().as(a)
                            }, "text")
                        }
                    })
                }
            }, "separator", {
                label: "调色板组件", action: function () {
                    getInput("输入控件名称", "mypalette", function (e) {
                        if (e && "" != e) {
                            var t = (new Date).toLocaleTimeString();
                            $.get("wizard/palette.js?t=" + t, function (t) {
                                var a = new ht.Script;
                                a.setTag(e), a.setName("调色板组件"), a.a("type", "初始化脚本"), a.a("script", t.replace(new RegExp("mypalette", "g"), e)), a.setLayer("nodeLayer");
                                var n = rulerFrame.getComponentViewRect(g2d);
                                a.setPosition(n.x + 50, n.y + 50), dataModel.add(a), dataModel.sm().cs(), dataModel.sm().as(a)
                            }, "text")
                        }
                    })
                }
            }, {
                label: "高级右键菜单", action: function () {
                    var e = (new Date).toLocaleTimeString();
                    $.get("wizard/contextmenu.js?t=" + e, function (e) {
                        var t = new ht.Script;
                        t.setName("高级右键菜单"), t.a("type", "初始化脚本"), t.a("script", e), t.setLayer("nodeLayer");
                        var a = rulerFrame.getComponentViewRect(g2d);
                        t.setPosition(a.x + 50, a.y + 80), dataModel.add(t), dataModel.sm().cs(), dataModel.sm().as(t)
                    }, "text")
                }
            }, {
                label: "禁用右键菜单", action: function () {
                    var e = (new Date).toLocaleTimeString();
                    $.get("wizard/scontextmenu.js?t=" + e, function (e) {
                        var t = new ht.Script;
                        t.setName("禁用右键菜单"), t.a("type", "初始化脚本"), t.a("script", e), t.setLayer("nodeLayer");
                        var a = rulerFrame.getComponentViewRect(g2d);
                        t.setPosition(a.x + 70, a.y + 80), dataModel.add(t), dataModel.sm().cs(), dataModel.sm().as(t)
                    }, "text")
                }
            }, {
                label: "面板", action: function () {
                    getInput("输入控件名称", "myPanel", function (e) {
                        if (e && "" != e) {
                            var t = (new Date).toLocaleTimeString();
                            $.get("wizard/panel.js?t=" + t, function (t) {
                                var a = new ht.Script;
                                a.setTag(e), a.setName("面板"), a.a("type", "初始化脚本"), a.a("script", t.replace(new RegExp("myPanel", "g"), e)), a.setLayer("nodeLayer");
                                var n = rulerFrame.getComponentViewRect(g2d);
                                a.setPosition(n.x + 50, n.y + 100), dataModel.add(a), dataModel.sm().cs(), dataModel.sm().as(a)
                            }, "text")
                        }
                    })
                }
            }, {
                label: "文件列表控件", action: function () {
                    var e = (new Date).toLocaleTimeString();
                    $.get("wizard/filelist.js?t" + e, function (e) {
                        var t = new ht.Script;
                        t.setName("文件列表控件"), t.a("type", "初始化脚本"), t.a("script", e), t.setLayer("nodeLayer");
                        var a = rulerFrame.getComponentViewRect(g2d);
                        t.setPosition(a.x + 50, a.y + 100), dataModel.add(t), dataModel.sm().cs(), dataModel.sm().as(t)
                    }, "text")
                }
            }, "separator", {
                label: "EChart饼图", action: function () {
                    getInput("输入控件名称", "EChart", function (e) {
                        if (e && "" != e) {
                            var t = (new Date).toLocaleTimeString();
                            $.get("wizard/pie.js?t=" + t, function (t) {
                                var a = new ht.Script;
                                a.setTag(e), a.a("html", !0), a.setName("饼图控件"), a.a("type", "初始化脚本"), a.a("script", t.replace(new RegExp("myPie", "g"), e)), a.setLayer("nodeLayer");
                                var n = rulerFrame.getComponentViewRect(g2d);
                                a.setWidth(400), a.setHeight(300), a.setPosition(n.x + 400, n.y + 300), dataModel.add(a), dataModel.sm().cs(), dataModel.sm().as(a)
                            }, "text"), addecharts()
                        }
                    })
                }
            }, {
                label: "EChart柱状图", action: function () {
                    getInput("输入控件名称", "CEChart", function (e) {
                        if (e && "" != e) {
                            var t = (new Date).toLocaleTimeString();
                            $.get("wizard/echart1.js?t=" + t, function (t) {
                                var a = new ht.Script;
                                a.setTag(e), a.a("html", !0), a.setName("柱状图控件"), a.a("type", "初始化脚本"), a.a("script", t.replace(new RegExp("myChart", "g"), e)), a.setLayer("nodeLayer");
                                var n = rulerFrame.getComponentViewRect(g2d);
                                a.setWidth(400), a.setHeight(300), a.setPosition(n.x + 400, n.y + 300), dataModel.add(a), dataModel.sm().cs(), dataModel.sm().as(a)
                            }, "text"), addecharts()
                        }
                    })
                }
            }, {
                label: "EChart Guage", action: function () {
                    getInput("输入控件名称", "myGuage", function (e) {
                        if (e && "" != e) {
                            var t = (new Date).toLocaleTimeString();
                            $.get("wizard/guage.js?t=" + t, function (t) {
                                var a = new ht.Script;
                                a.setTag(e), a.a("html", !0), a.setName("仪表盘"), a.a("type", "初始化脚本"), a.a("script", t.replace(new RegExp("myGuage", "g"), e)), a.setLayer("nodeLayer");
                                var n = rulerFrame.getComponentViewRect(g2d);
                                a.setWidth(400), a.setHeight(300), a.setPosition(n.x + 400, n.y + 300), dataModel.add(a), dataModel.sm().cs(), dataModel.sm().as(a)
                            }, "text"), addecharts()
                        }
                    })
                }
            }]
        }, {
        // 向导
            label: "向导", items: [{
                label: "实时趋势控件", action: function () {
                    getInput("输入控件名称", "realtrend", function (e) {
                        if (e && "" != e) {
                            var t = (new Date).toLocaleTimeString();
                            $.get("wizard/realchart.js?t=" + t, function (t) {
                                var a = new ht.Script;
                                a.setTag(e), a.a("html", !0), a.setName("实时趋势控件"), a.a("type", "初始化脚本"), a.a("script", t.replace(new RegExp("myEchart", "g"), e)), a.setLayer("nodeLayer");
                                var n = rulerFrame.getComponentViewRect(g2d);
                                a.setWidth(600), a.setHeight(400), a.setPosition(n.x + 400, n.y + 300), dataModel.add(a), dataModel.sm().cs(), dataModel.sm().as(a)
                            }, "text"), addecharts()
                        }
                    })
                }
            }]
        }, {
        // 帮助
            label: "帮助", items: [{
                label: "关于", action: function () {
                    mydialog = new ht.widget.Dialog, mydialog.setConfig({
                        title: "关于" + version,
                        closable: !0,
                        draggable: !0,
                        width: 300,
                        height: 150,
                        contentPadding: 0,
                        content: '<div style="font-size:18px;background:#FFFFFF;"><center>WTScada组态软件HTML5版本<br/><br/><a href="http://www.wtscada.com">常州文庭软件有限公司</a> 247122944@qq.com<br/><br/><center></div>',
                        buttons: [{
                            label: "关闭", action: function (e, t) {
                                mydialog.hide()
                            }
                        }],
                        buttonsAlign: "right"
                    }), mydialog.show()
                }
            }, { label: "主页", href: "http://www.wtscada.com", linkTarget: "_blank", preventDefault: !1 }, {
                label: "软件更新",
                href: "http://www.wtscada.com/wtscada.aspx",
                linkTarget: "_blank",
                preventDefault: !1
            }, {
                label: "视频教程",
                href: "http://www.wtscada.com/List.aspx?id=21",
                linkTarget: "_blank",
                preventDefault: !1
            }, {
                label: "开发教程",
                href: "http://www.wtscada.com/List.aspx?id=24",
                linkTarget: "_blank",
                preventDefault: !1
            }, {
                label: "百度地图取点",
                href: "http://api.map.baidu.com/lbsapi/getpoint/index.html",
                linkTarget: "_blank",
                preventDefault: !1
            }, { label: "JS开发手册", href: "doc/readme.html", linkTarget: "_blank", preventDefault: !1 }, {
                label: "JSAPI手册",
                href: "doc/api.html",
                linkTarget: "_blank",
                preventDefault: !1
            }]
        }];
    layermenu = { label: "显示层", items: [] };
    var edit_menu_ = menu_options_[2];
    layers.forEach(function (e) {
        layersView[e] = !0, layermenu.items.push({
            label: e, type: "check", selected: !0, action: function (e) {
                layersView[e.label] = e.selected, treeView.invalidateModel(), g2d.iv()
            }
        })
    }), edit_menu_.items.push(layermenu);
    var n = window.menu = new ht.widget.Menu(menu_options_);
    return n.enableGlobalKey(), n
}, initMenu = function () {
}, saveLocal = function (e) {
    if (e || (e = HT2dEditor.currScene), "" != e.filename && window.localStorage) {
        for (var t = new ht.List, a = 0; a < localStorage.length; a++) {
            var n = localStorage.key(a);
            0 == n.indexOf(e.filename + "-", 0) && t.add(n)
        }
        t.each(function (e) {
            localStorage.removeItem(e)
        });
        var i = dataModel.serialize(0), o = {
            id: e.id,
            filename: e.filename,
            json: i,
            info: e.info,
            headHtml: e.headHtml,
            bodyHtml: e.bodyHtml,
            dataRate: e.dataRate,
            animRate: e.animRate,
            autoSize: e.autoSize,
            title: e.title,
            isPannable: e.isPannable,
            isMovable: e.isMovable,
            zoomMax: e.zoomMax,
            zoomMin: e.zoomMin,
            links: e.links
        }, r = JSON.stringify(o), l = (new Date).toLocaleString();
        localStorage.setItem(e.filename + "-" + l, r)
    }
},
    saveScene = function (e, t) {//toobal保存
        if (e || (e = HT2dEditor.currScene), "" != e.filename) {
            if (!saving) {
                saving = !0;
                var a = "";
                dataModel.each(function (e) {
                    e instanceof ht.LinkImg && e.a("filename") && ("" == a ? (a = e.a("filename"), e.a("param") && (a += ":" + e.a("param"))) : (a += "," + e.a("filename"), e.a("param") && (a += ":" + e.a("param"))))
                }), e.links = a;
                var n = dataModel.serialize(0), i = {
                    id: e.id,
                    filename: e.filename,
                    json: n,
                    info: e.info,
                    headHtml: e.headHtml,
                    bodyHtml: e.bodyHtml,
                    dataRate: e.dataRate,
                    animRate: e.animRate,
                    autoSize: e.autoSize,
                    title: e.title,
                    isPannable: e.isPannable,
                    isMovable: e.isMovable,
                    zoomMax: e.zoomMax,
                    zoomMin: e.zoomMin,
                    links: e.links
                };
                $.post("server/save.ashx", i, function (e) {
                    HT2dEditor.currScene.id = e.id;
                    var t = new ht.widget.Dialog, a = new ht.widget.ContextMenu;
                    a.addTo(t.getView()), a.setItems([]), t.setConfig({
                        title: "信息",
                        closable: !0,
                        draggable: !0,
                        contentPadding: 10,
                        height: 100,
                        content: '<div id="content">' + e.message + "</div>",
                        buttons: [{ label: "OK" }],
                        buttonsAlign: "right",
                        action: function (e, a) {
                            t.hide(), isnew = !1, saving = !1, updateToolbar(), resettimer()
                        }
                    }), t.show()
                }, "json"), t && t()
            }
        } else saveSceneAs()
    }, runCurrent = function () {
        var e = HT2dEditor.currScene.filename;
        "" != e && window.open("runview.aspx?filename=" + encodeURIComponent(e))
    }, saveSceneAs = function () {
        if (!saving) {
            var e = new ht.widget.Dialog, t = new ht.widget.ContextMenu;
            t.addTo(e.getView()), t.setItems([]), e.setConfig({
                title: "另保存",
                closable: !0,
                draggable: !0,
                contentPadding: 5,
                content: '<div>文件名称:<input id="filename" style="font-size:14px;width:220px;"/><br />文件信息:<textarea id="info" style="font-size: 14px;width:218px;height:120px;">' + HT2dEditor.currScene.info + "</textarea></div>",
                buttons: [{
                    label: "确定", action: function (t, a) {
                        var n = e.getView().querySelector("#filename").value;
                        n = n.replace(/,/g, ""), n = n.replace(/ /g, "");
                        var i = e.getView().querySelector("#info").value;
                        e.hide(), "" != n && $.post("server/jsonfileExist.ashx", { filename: n }, function (e) {
                            var t = !1;
                            0 == e.length ? t = !0 : confirm("文件已经存在是否确定覆盖文件?") && (t = !0), t && (HT2dEditor.currScene.id = 0, HT2dEditor.currScene.filename = n, HT2dEditor.currScene.info = i, toolbar.getItemById("filename").toolTip = n, saving = !1, saveScene(), isnew = !1, updateToolbar())
                        })
                    }
                }, {
                    label: "取消", action: function (t, a) {
                        e.hide()
                    }
                }],
                buttonsAlign: "right"
            }), e.onShown = function () {
                var e = $("#filename");
                if (e) {
                    var t = HT2dEditor.currScene.filename;
                    "" == t ? e.val("newfile") : e.val(t + "1")
                }
            }, e.onHidden = function () {
            }, e.show()
        }
    }, openFromFile = function () {
        showLoading(), $.post("server/getjsonFiles.ashx", {}, function (data) {
            var t = new ht.widget.Toolbar, a = new ht.widget.BorderPane;
            a.setTopView(t);
            var n = new ht.DataModel, i = new ht.widget.TablePane(n);
            a.setCenterView(i), n.getSelectionModel().setSelectionMode("single"), i.addColumns([{
                name: "name",
                width: 250,
                displayName: "文件名称",
                accessType: "attr",
                align: "left"
            }, { name: "time", width: 150, displayName: "修改时间", accessType: "attr", align: "left" }, {
                name: "size",
                width: 80,
                displayName: "尺寸",
                accessType: "attr",
                align: "left"
            }]), data.forEach(function (e) {
                var t = new ht.Data;
                t.a({ name: e.name, time: e.time, size: e.size }), n.add(t)
            });
            var o = i.getTableHeader();
            o.setColumnLineColor("#C8C8C8"), o.setInsertColor("#6DCDF3"), o.getLabelFont = function (e) {
                return "bold 12px Arial"
            }, o.getView().style.background = "#F1F1F1";
            var r = i.getTableView();
            r.setSelectBackground("#E1E1E1"), r.setRowLineColor("#EDEDED"), r.setColumnLineVisible(!1), r.setRowHeight(22), r.setAutoHideScrollBar(!1), r.drawRowBackground = function (e, t, a, n, i, o, r) {
                e.fillStyle = a ? "#87A6CB" : "#FAFAFA", e.beginPath(), e.rect(n, i, o, r), e.fill()
            }, t.setItems([{
                id: "text",
                label: "筛选",
                icon: "images/search.png",
                unfocusable: !0,
                textField: { width: 200 }
            }]), t.getView().style.background = "#F1F1F1";
            var l = t.getItemById("text").element;
            l.getElement().onkeyup = function (e) {
                27 === e.keyCode && (l.getElement().value = ""), r.invalidateModel()
            }, r.isVisible = function (e) {
                if (e.isEmpty()) {
                    var a = t.v("text");
                    if (a) return e.a("name").toLowerCase().indexOf(a.toLowerCase()) >= 0
                }
                return !0
            };
            var d = new ht.widget.Dialog;
            d.setConfig({
                title: "打开文件",
                width: 500,
                height: 450,
                closable: !0,
                draggable: !0,
                resizeMode: "h",
                content: a,
                maximizable: !0,
                buttons: [{
                    label: "新窗口打开", action: function (e, t) {
                        var a = n.getSelectionModel().getFirstData();
                        a && (window.open("editor.aspx?filename=" + a.a("name")), d.hide())
                    }
                }, {
                    label: "打开", action: function (e, t) {
                        var a = n.getSelectionModel().getFirstData();
                        a && openFile(a.a("name")), d.hide()
                    }
                }, {
                    label: "取消", action: function (e, t) {
                        d.hide()
                    }
                }],
                buttonsAlign: "right"
            });
            var s = new ht.widget.ContextMenu;
            s.addTo(d.getView()), s.setItems([]), r.onDataDoubleClicked = function (e) {
                openFile(e.a("name")), d.hide()
            }, hideLoading(), d.show()
        }, "json")
    }, openFile = function (e) {
        dataModel.clear(), dataModel.a("background", ""), g2d.getView().style.backgroundColor = "", $.post("server/load.ashx", { filename: e }, function (t) {
            t.json && (t.id > 0 ? (HT2dEditor.currScene.id = t.id || 0, HT2dEditor.currScene.info = t.info || "", HT2dEditor.currScene.headHtml = t.headHtml || "", HT2dEditor.currScene.bodyHtml = t.bodyHtml || "", HT2dEditor.currScene.dataRate = t.dataRate || 1e3, HT2dEditor.currScene.animRate = t.animRate || 500, HT2dEditor.currScene.autoSize = t.autoSize || !1, HT2dEditor.currScene.title = t.title || "", HT2dEditor.currScene.isPannable = t.isPannable, HT2dEditor.currScene.isMovable = t.isMovable, HT2dEditor.currScene.zoomMax = t.zoomMax, HT2dEditor.currScene.zoomMin = t.zoomMin, dataModel.deserialize(t.json), g2d.getView().style.backgroundColor = dataModel.a("background") || "#FFFFFF", HT2dEditor.currScene.filename = e || "", toolbar.getItemById("filename").toolTip = e, isnew = !1, updateToolbar(), resettimer()) : (HT2dEditor.currScene.filename = "", toolbar.getItemById("filename").toolTip = "", isnew = !0, updateToolbar()))
        }, "json")
    }, openFromLocal = function () {
        if (window.localStorage) {
            var e = new ht.widget.Toolbar, t = new ht.widget.BorderPane;
            t.setTopView(e);
            var a = new ht.DataModel, n = new ht.widget.TablePane(a);
            t.setCenterView(n), a.getSelectionModel().setSelectionMode("single"), n.addColumns([{
                name: "name",
                width: 280,
                displayName: "文件名称",
                accessType: "attr",
                align: "left"
            }]);
            for (var i = 0; i < localStorage.length; i++) {
                var o = localStorage.key(i), r = new ht.Data;
                r.a({ name: o }), a.add(r)
            }
            var l = n.getTableHeader();
            l.setColumnLineColor("#C8C8C8"), l.setInsertColor("#6DCDF3"), l.getLabelFont = function (e) {
                return "bold 12px Arial"
            }, l.getView().style.background = "#F1F1F1";
            var s = n.getTableView();
            s.setSelectBackground("#E1E1E1"), s.setRowLineColor("#EDEDED"), s.setColumnLineVisible(!1), s.setRowHeight(22), s.setAutoHideScrollBar(!1), s.drawRowBackground = function (e, t, a, n, i, o, r) {
                e.fillStyle = a ? "#87A6CB" : "#FAFAFA", e.beginPath(), e.rect(n, i, o, r), e.fill()
            }, e.setItems([{
                id: "text",
                label: "筛选",
                icon: "images/search.png",
                unfocusable: !0,
                textField: { width: 200 }
            }]), e.getView().style.background = "#F1F1F1";
            var c = e.getItemById("text").element;
            c.getElement().onkeyup = function (e) {
                27 === e.keyCode && (c.getElement().value = ""), s.invalidateModel()
            }, s.isVisible = function (t) {
                if (t.isEmpty()) {
                    var a = e.v("text");
                    if (a) return t.a("name").toLowerCase().indexOf(a.toLowerCase()) >= 0
                }
                return !0
            };
            var g = new ht.widget.Dialog;
            g.setConfig({
                title: "打开本地文件",
                width: 300,
                height: 450,
                closable: !0,
                draggable: !0,
                resizeMode: "h",
                content: t,
                maximizable: !0,
                buttons: [{
                    label: "删除全部", action: function (e, t) {
                        window.localStorage && localStorage.clear(), g.hide()
                    }
                }, {
                    label: "删除选择", action: function (e, t) {
                        if (window.localStorage) {
                            var n = a.getSelectionModel().getFirstData();
                            n && (localStorage.removeItem(n.a("name")), a.remove(n))
                        }
                    }
                }, {
                    label: "打开", action: function (e, t) {
                        var n = a.getSelectionModel().getFirstData();
                        n && openLocalFile(n.a("name")), g.hide()
                    }
                }, {
                    label: "取消", action: function (e, t) {
                        g.hide()
                    }
                }],
                buttonsAlign: "right"
            });
            var u = new ht.widget.ContextMenu;
            u.addTo(g.getView()), u.setItems([]), s.onDataDoubleClicked = function (e) {
                openLocalFile(d.a("name")), g.hide()
            }, g.show()
        }
    }, openLocalFile = function (e) {
        if (dataModel.clear(), dataModel.a("background", ""), g2d.getView().style.backgroundColor = "", window.localStorage) {
            var t = localStorage.getItem(e);
            if (null != t) {
                var a = JSON.parse(t);
                a.json ? (HT2dEditor.currScene.id = a.id || 0, HT2dEditor.currScene.info = a.info || "", HT2dEditor.currScene.headHtml = a.headHtml || "", HT2dEditor.currScene.bodyHtml = a.bodyHtml || "", HT2dEditor.currScene.dataRate = a.dataRate || 1e3, HT2dEditor.currScene.animRate = a.animRate || 500, HT2dEditor.currScene.autoSize = a.autoSize || !1, HT2dEditor.currScene.title = a.title || "", HT2dEditor.currScene.isPannable = a.isPannable, HT2dEditor.currScene.isMovable = a.isMovable, HT2dEditor.currScene.zoomMax = a.zoomMax, HT2dEditor.currScene.zoomMin = a.zoomMin, dataModel.deserialize(a.json), g2d.getView().style.backgroundColor = dataModel.a("background") || "#FFFFFF", HT2dEditor.currScene.filename = a.filename || "", toolbar.getItemById("filename").toolTip = HT2dEditor.currScene.filename, isnew = !1, updateToolbar(), resettimer()) : (HT2dEditor.currScene.filename = "", toolbar.getItemById("filename").toolTip = "", isnew = !0, updateToolbar())
            }
        }
    }, showTagsDialog = function (e, t) {
        serverTags ? callTagsDialog(e, t) : (showLoading(), $.post("server/scada/gettagstable.ashx", {
            rows: _rows,
            page: _scurrentPage
        }, function (a) {
            serverTags = a, _spagecount = a.pagecount, callTagsDialog(e, t), hideLoading()
        }, "json"))
    }, callTagsDialog = function (e, t) {
        if (serverTags && serverTags.total > 0) {
            var a = new ht.widget.Toolbar([{
                id: "tagname",
                label: "标签名称:",
                icon: "images/search.png",
                unfocusable: !0,
                textField: { width: 100 }
            }, "separator", { id: "plug", label: "驱动:", unfocusable: !0, textField: { width: 50 } }, "separator", {
                id: "desc",
                label: "描述:",
                unfocusable: !0,
                textField: { width: 150 }
            }]), n = new ht.widget.BorderPane;
            n.setTopView(a);
            var i = new ht.DataModel, o = new ht.widget.TablePane(i);
            n.setCenterView(o), t ? i.getSelectionModel().setSelectionMode("single") : i.getSelectionModel().setSelectionMode("multiple"), o.addColumns([{
                name: "index",
                width: 50,
                displayName: "序号",
                accessType: "attr",
                align: "left",
                valueType: "number"
            }, { name: "id", width: 150, displayName: "标签名称", accessType: "attr", align: "left" }, {
                name: "plug",
                width: 80,
                displayName: "驱动",
                accessType: "attr",
                align: "left"
            }, { name: "unit", width: 50, displayName: "单位", accessType: "attr", align: "left" }, {
                name: "type",
                width: 65,
                displayName: "类型",
                accessType: "attr",
                align: "left"
            }, { name: "min", width: 50, displayName: "下限", accessType: "attr", align: "left" }, {
                name: "max",
                width: 50,
                displayName: "上限",
                accessType: "attr",
                align: "left"
            }, { name: "desc", width: 150, displayName: "描述", accessType: "attr", align: "left" }, {
                name: "atype",
                width: 70,
                displayName: "报警",
                accessType: "attr",
                align: "left"
            }, { name: "al", width: 50, displayName: "低低报", accessType: "attr", align: "right" }, {
                name: "all",
                width: 50,
                displayName: "低报",
                accessType: "attr",
                align: "right"
            }, { name: "ah", width: 50, displayName: "高报", accessType: "attr", align: "right" }, {
                name: "ahh",
                width: 50,
                displayName: "高高报",
                accessType: "attr",
                align: "right"
            }]);
            var r = serverTags.rows, l = (_scurrentPage - 1) * _rows + 1;
            createLocalTags(i), r.forEach(function (e) {
                var t = browser_createTag(l, e);
                l++ , i.add(t)
            });
            var d = o.getTableHeader();
            d.setColumnLineColor("#C8C8C8"), d.setInsertColor("#6DCDF3"), d.getLabelFont = function (e) {
                return "bold 12px Arial"
            }, d.getView().style.background = "#F1F1F1";
            var s = o.getTableView();
            s.setSelectBackground("#E1E1E1"), s.setRowLineColor("#EDEDED"), s.setColumnLineVisible(!1), s.setRowHeight(22), s.setAutoHideScrollBar(!1), s.drawRowBackground = function (e, t, a, n, i, o, r) {
                e.fillStyle = a ? "#87A6CB" : "#FAFAFA", e.beginPath(), e.rect(n, i, o, r), e.fill()
            }, a.getView().style.background = "#E1E1E1";
            var c = a.getItemById("tagname").element;
            c.getElement().onkeyup = function (e) {
                27 === e.keyCode && (c.getElement().value = ""), s.invalidateModel()
            };
            var g = a.getItemById("desc").element;
            g.getElement().onkeyup = function (e) {
                27 === e.keyCode && (g.getElement().value = ""), s.invalidateModel()
            };
            var u = a.getItemById("plug").element;
            u.getElement().onkeyup = function (e) {
                27 === e.keyCode && (u.getElement().value = ""), s.invalidateModel()
            }, s.isVisible = function (e) {
                if (e.isEmpty()) {
                    var t = a.v("tagname"), n = a.v("desc"), i = a.v("plug"), o = !0;
                    if ("" != t) {
                        e.a("id");
                        o = e.a("id").toLowerCase().indexOf(t.toLowerCase()) >= 0
                    }
                    o && "" != i && (o = e.a("plug").toLowerCase().indexOf(i.toLowerCase()) >= 0), o && "" != n && (o = e.a("desc").toLowerCase().indexOf(n.toLowerCase()) >= 0)
                }
                return o
            };
            var m = "(" + _scurrentPage + "/" + _spagecount + ")", f = new ht.widget.Dialog;
            f.setConfig({
                title: "标签浏览器" + m,
                width: 800,
                height: 450,
                closable: !0,
                draggable: !0,
                resizeMode: "wh",
                content: n,
                maximizable: !0,
                buttons: [{
                    label: "上一页", action: function (e, t) {
                        _scurrentPage > 1 && (_scurrentPage-- , i.clear(), 1 == _scurrentPage && createLocalTags(i), $.post("server/scada/gettagstable.ashx", {
                            rows: _rows,
                            page: _scurrentPage
                        }, function (e) {
                            serverTags = e, _spagecount = e.pagecount, m = "标签浏览器(" + _scurrentPage + "/" + _spagecount + ")", f.setTitle(m);
                            var t = serverTags.rows;
                            l = (_scurrentPage - 1) * _rows + 1, t.forEach(function (e) {
                                var t = browser_createTag(l, e);
                                l++ , i.add(t)
                            })
                        }, "json")), _scurrentPage < _spagecount && (w._background = "rgb(231, 76, 60)", w._selectBackground = "rgb(196, 65, 51)", w.iv()), 1 == _scurrentPage && (h._background = "rgb(128, 128, 128)", h._selectBackground = "rgb(128, 128, 128)")
                    }
                }, {
                    label: "下一页", action: function (e, t) {
                        _scurrentPage < _spagecount && (_scurrentPage++ , i.clear(), $.post("server/scada/gettagstable.ashx", {
                            rows: _rows,
                            page: _scurrentPage
                        }, function (e) {
                            serverTags = e, _spagecount = e.pagecount, m = "标签浏览器(" + _scurrentPage + "/" + _spagecount + ")", f.setTitle(m);
                            var t = serverTags.rows;
                            l = (_scurrentPage - 1) * _rows + 1, t.forEach(function (e) {
                                var t = browser_createTag(l, e);
                                l++ , i.add(t)
                            })
                        }, "json")), _scurrentPage == _spagecount && (w._background = "rgb(128, 128, 128)", w._selectBackground = "rgb(128, 128, 128)"), _scurrentPage > 1 && (h._background = "rgb(231, 76, 60)", h._selectBackground = "rgb(196, 65, 51)", h.iv())
                    }
                }, {
                    label: "重新加载", action: function (e, t) {
                        reload(function (e) {
                            0 == e.id ? (i.clear(), _scurrentPage = 1, $.post("server/scada/gettagstable.ashx", {
                                rows: _rows,
                                page: _scurrentPage
                            }, function (e) {
                                serverTags = e, _spagecount = e.pagecount;
                                var t = serverTags.rows, a = 1;
                                createLocalTags(i), t.forEach(function (e) {
                                    var t = browser_createTag(a, e);
                                    a++ , i.add(t)
                                })
                            }, "json")) : alert(e.message)
                        })
                    }
                }, {
                    label: "确定", action: function (t, a) {
                        if (f.hide(), e) {
                            var n = i.getSelectionModel().toSelection();
                            n && e(n)
                        }
                    }
                }, {
                    label: "取消", action: function (e, t) {
                        f.hide()
                    }
                }],
                buttonsAlign: "right"
            });
            var p = new ht.widget.ContextMenu;
            p.addTo(f.getView()), p.setItems([]), s.onDataDoubleClicked = function (t) {
                if (f.hide(), e) {
                    var a = new ht.List;
                    a.add(t), e(a)
                }
            }, f.onShown = function () {
                a.redraw()
            };
            var h = f.$42d[0], w = f.$42d[1], b = f.$42d[2];
            "" == username && (b._background = "rgb(128, 128, 128)", b._selectBackground = "rgb(128, 128, 128)"), h._background = "rgb(128, 128, 128)", h._selectBackground = "rgb(128, 128, 128)", f.show()
        }
    }, selectFileName = function (e) {
        showLoading(), $.post("server/getjsonFiles.ashx", {}, function (data) {
            var a = new ht.widget.Toolbar, n = new ht.widget.BorderPane;
            n.setTopView(a);
            var i = new ht.DataModel, o = new ht.widget.TablePane(i);
            n.setCenterView(o), i.getSelectionModel().setSelectionMode("single"), o.addColumns([{
                name: "name",
                width: 250,
                displayName: "文件名称",
                accessType: "attr",
                align: "left"
            }, { name: "time", width: 150, displayName: "修改时间", accessType: "attr", align: "left" }, {
                name: "size",
                width: 80,
                displayName: "尺寸",
                accessType: "attr",
                align: "left"
            }]), data.forEach(function (e) {
                var t = new ht.Data;
                t.a({ name: e.name, time: e.time, size: e.size }), i.add(t)
            });
            var r = o.getTableHeader();
            r.setColumnLineColor("#C8C8C8"), r.setInsertColor("#6DCDF3"), r.getLabelFont = function (e) {
                return "bold 12px Arial"
            }, r.getView().style.background = "#F1F1F1";
            var l = o.getTableView();
            l.setSelectBackground("#E1E1E1"), l.setRowLineColor("#EDEDED"), l.setColumnLineVisible(!1), l.setRowHeight(22), l.setAutoHideScrollBar(!1), l.drawRowBackground = function (e, t, a, n, i, o, r) {
                e.fillStyle = a ? "#87A6CB" : "#FAFAFA", e.beginPath(), e.rect(n, i, o, r), e.fill()
            }, a.setItems([{
                id: "text",
                label: "筛选",
                icon: "images/search.png",
                unfocusable: !0,
                textField: { width: 200 }
            }]), a.getView().style.background = "#F1F1F1";
            var d = a.getItemById("text").element;
            d.getElement().onkeyup = function (e) {
                27 === e.keyCode && (d.getElement().value = ""), l.invalidateModel()
            }, l.isVisible = function (e) {
                if (e.isEmpty()) {
                    var t = a.v("text");
                    if (t) return e.a("name").toLowerCase().indexOf(t.toLowerCase()) >= 0
                }
                return !0
            };
            var s = new ht.widget.Dialog;
            s.setConfig({
                title: "选择文件",
                width: 500,
                height: 450,
                closable: !0,
                draggable: !0,
                resizeMode: "h",
                content: n,
                maximizable: !0,
                buttons: [{
                    label: "确定", action: function (t, a) {
                        var n = i.getSelectionModel().getFirstData();
                        n && e && e(n.a("name")), s.hide()
                    }
                }, {
                    label: "取消", action: function (e, t) {
                        s.hide()
                    }
                }],
                buttonsAlign: "right"
            });
            var c = new ht.widget.ContextMenu;
            c.addTo(s.getView()), c.setItems([]), hideLoading(), s.show()
        }, "json")
    }, selectParamName = function (e) {
        showLoading(), $.post("server/getParamFiles.ashx", {}, function (t) {
            var a = new ht.widget.Toolbar, n = new ht.widget.BorderPane;
            n.setTopView(a);
            var i = new ht.DataModel, o = new ht.widget.TablePane(i);
            n.setCenterView(o), i.getSelectionModel().setSelectionMode("single"), o.addColumns([{
                name: "name",
                width: 200,
                displayName: "文件名称",
                accessType: "attr",
                align: "left"
            }, { name: "desc", width: 200, displayName: "描述", accessType: "attr", align: "left" }]), t.forEach(function (e) {
                var t = new ht.Data;
                t.a({ name: e.name, desc: e.desc }), i.add(t)
            });
            var r = o.getTableHeader();
            r.setColumnLineColor("#C8C8C8"), r.setInsertColor("#6DCDF3"), r.getLabelFont = function (e) {
                return "bold 12px Arial"
            }, r.getView().style.background = "#F1F1F1";
            var l = o.getTableView();
            l.setSelectBackground("#E1E1E1"), l.setRowLineColor("#EDEDED"), l.setColumnLineVisible(!1), l.setRowHeight(22), l.setAutoHideScrollBar(!1), l.drawRowBackground = function (e, t, a, n, i, o, r) {
                e.fillStyle = a ? "#87A6CB" : "#FAFAFA", e.beginPath(), e.rect(n, i, o, r), e.fill()
            }, a.setItems([{
                id: "text",
                label: "筛选",
                icon: "images/search.png",
                unfocusable: !0,
                textField: { width: 200 }
            }]), a.getView().style.background = "#F1F1F1";
            var d = a.getItemById("text").element;
            d.getElement().onkeyup = function (e) {
                27 === e.keyCode && (d.getElement().value = ""), l.invalidateModel()
            }, l.isVisible = function (e) {
                if (e.isEmpty()) {
                    var t = a.v("text");
                    if (t) return e.a("name").toLowerCase().indexOf(t.toLowerCase()) >= 0
                }
                return !0
            };
            var s = new ht.widget.Dialog;
            s.setConfig({
                title: "选择替换参数文件",
                width: 420,
                height: 450,
                closable: !0,
                draggable: !0,
                resizeMode: "h",
                content: n,
                maximizable: !0,
                buttons: [{
                    label: "确定", action: function (t, a) {
                        var n = i.getSelectionModel().getFirstData();
                        n && e && e(n.a("name")), s.hide()
                    }
                }, {
                    label: "取消", action: function (e, t) {
                        s.hide()
                    }
                }],
                buttonsAlign: "right"
            });
            var c = new ht.widget.ContextMenu;
            c.addTo(s.getView()), c.setItems([]), hideLoading(), s.show()
        }, "json")
    };