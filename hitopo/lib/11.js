var stationconfig = false,
    equipmentconfig = false,
    signalconfig = false
checkStation = '',
    checkEquipment = '',
    checkSignal = ''


function clearSelected(e) {
    viewstate = e, viewallMenu.selected = 0 == e, onlyscriptdMenu.selected = 2 == e, onlytagMenu.selected = 3 == e, onlynotvisibledMenu.selected = 1 == e, onlynotselectMenu.selected = 4 == e
}

function resettimer() {
    autoSaveTimer > 0 && window.clearInterval(autoSaveTimer), autoSaveTimer = window.setInterval("iead()", autoSaveInteval)
}

function datavisible(e) {
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
        if (hashttag) {
            var a = e.getTag();
            t = a == searchname
        }
        if (hastagname) {
            var n = searchname.toLowerCase(),
                o = e.a("tagname");
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
            return isPannable || e
        },
        g2d.getView().addEventListener("keydown", function (e) {
            27 == e.keyCode && g2d.dm().sm().cs() //    esc按下 或者 
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
            // console.log(a)
            if (a) {
                var n = propertyView.getPropertyAt(e);//getPropertyAt(event)返回event事件所在的行的属性信息
                // console.log(n)
                n ? n._name.indexOf("tagname") >= 0 ? t.setItems([{//大于等于0，就是有右键菜单
                    label: "设置标签",
                    action: function () {
                        showTagsDialog(function (e) {
                            if (e.size() > 0) {
                                var t = e.get(0),
                                    i = "" == t.a("plug") ? t.a("id") : t.a("plug") + "." + t.a("id");
                                a.a(n._name, i)
                            }
                        }, !0)
                    }
                }, { label: "取消" }]) :
                    "filename" == n._name ? t.setItems([{
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
        },

        rulerFrame = new ht.widget.RulerFrame(g2d);
    var a = new ht.widget.ContextMenu;
    a.addTo(rulerFrame.getView()),
        a.setItems([]),
        borderPane = new ht.widget.BorderPane,
        leftSplit = new ht.widget.SplitView(palette, borderPane, "h", 260),
        rightSplit = new ht.widget.SplitView(treeView, propertyPane, "v", .3),
        mainSplit = new ht.widget.SplitView(leftSplit, rightSplit, "h", -260),
        g2d.editing = !0;
    var n = createMenu(),//上面的导航
        i = new ht.widget.ContextMenu;
    i.addTo(n.getView()),
        i.setItems([]);
    var o = new ht.widget.SplitView(n, mainSplit, "v", 24);
    o.setDraggable(!1),
        toolbar.enableToolTip(),
        borderPane.setTopView(toolbar),
        borderPane.setCenterView(rulerFrame),
        initPalette(),
        initGraphView(),
        initContextMenu(),
        initTreeView(), //在树组件显示每个节点名称
        initTreeContextMenu(),
        initPropertyView(),
        initpaletteContextMenu(),
        resetDefault(),
        view = o.getView(),
        view.className = "main",
        document.body.appendChild(view),
        window.addEventListener("resize", function (e) {
            o.invalidate()
        }, false),
        "" != openfile ? openFile(openfile) : createFrameBorder(1024, 768),
        tagconfig_init(),
        updateToolbar(),
        tagreplace_init(),
        textreplace_init()//文本替换

}

function resetDefault() {
    defaultItem.selected ? (g2d.setEditable(!0), palette.sm().cs()) : (defaultItem.selected = !0, g2d.setEditable(!0), toolbar.iv(), palette.sm().cs()), drawing = !1
}

// 组件面板
function initPalette() {
    var e = !0;
    for (var t in palette_config) {
        // console.log(palette_config[t])
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
                        // draggable: void 0 === e.draggable || e.draggable
                        'draggable': e.draggable === undefined ? true : e.draggable// 设置节点是否可被拖拽
                    }),
                    n.addChild(t)// 将节点设置为 group 组的孩子
            })
    }

    // 引入共享控件，用户图片显示在面板属性中  
    if (clipGroup = new ht.Group, clipGroup.setName("共享控件"), clipGroup.setTag("共享控件"), clipGroup.setExpanded(!1), palette.dm().add(clipGroup), initclipGroup(),

        imagegroup = new ht.Group, imagegroup.setName("用户图片"), imagegroup.setTag("用户图片"), imagegroup.inited = !1, imagegroup.updating = !1, imagegroup.setExpanded(!1), palette.dm().add(imagegroup), imagegroup.onPropertyChanged = function (e) {//属性变化回调函数，可重载做后续处理
            "expanded" == e.property && e.newValue && (this.inited || this.updating || (this.updating = !0, $.post("server/getuserimage.ashx", {}, function (e) {
                console.log(e)
                e.forEach(function (e) {
                    var t = new ht.Node;
                    palette.dm().add(t),
                        t.setName(e),
                        t.setImage("images/user/" + e),
                        t.item = t.getImage(),
                        t.s({
                            "image.stretch": "centerUniform",
                            draggable: !0
                        }),
                        imagegroup.addChild(t)
                }),
                    imagegroup.inited = !0//控制初始时加载一次
            })))
        }, viewPicLib) {
        for (var i in imagedir) {
            var o = new ht.Group;
            o.inited = !1,
                o.updating = !1,
                o.setName("图片-" + imagedir[i]),
                o.setTag(imagedir[i]),
                o.setExpanded(!1),
                palette.dm().add(o),
                o.onPropertyChanged = function (e) {
                    if ("expanded" == e.property && e.newValue && !this.inited && !this.updating) {
                        this.updating = !0;
                        var t = this.getTag(),
                            a = this;
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
    }

    //添加一个选择监听器，选中节点操作,添加辅助编辑按钮
    palette.sm().ms(function () {
        var e = palette.dm().sm().ld();//graphView.getDataModel().getSelectionModel().addSelectionChangeListener(func).getLastData()= graphView.dm().sm().ms(func).Id()
        // console.log(e)
        if (e) {
            var t = e.item;
            // console.log(t.operation)
            if (void 0 !== t.edgeType) {
                return defaultItem.selected = !1, toolbar.iv(), void g2d.setInteractors(new ht.List([new CreateEdgeInteractor(g2d, t.edgeType), new ht.graph.DefaultInteractor(g2d)]));
            }
            if (void 0 !== t.shapeType) return defaultItem.selected = !1, toolbar.iv(), void g2d.setInteractors(new ht.List([new CreateShapeInteractor(g2d, t.shapeType, t.line), new ht.graph.DefaultInteractor(g2d)]));

            // if ("parent" === t.operation) return defaultItem.selected = !1, toolbar.iv(), void g2d.setInteractors([new ParentInteractor(g2d), new ht.graph.DefaultInteractor(g2d)]);

            // if ("host" === t.operation) return defaultItem.selected = !1, toolbar.iv(), void g2d.setInteractors([new HostInteractor(g2d), new ht.graph.DefaultInteractor(g2d)]);

            // if ("icon" === t.operation) return defaultItem.selected = !1, toolbar.iv(), void g2d.setInteractors([new IconInteractor(g2d), new ht.graph.DefaultInteractor(g2d)]);

            if (void 0 !== t.geometryType) return defaultItem.selected = !1, toolbar.iv(), void g2d.setInteractors([new GeometryInteractor(g2d, t.geometryType)])
        }
    })
}

//循环共享控件
function initclipGroup() {
    for (var e in clipcontrols) {
        var t = clipcontrols[e],
            a = new ht.Node;
        palette.dm().add(a),
            a.setName(t.name),
            a.setTag(t.name),
            a.setImage("clipobject"),
            a.item = t,
            // a.item = t.id
            a.setToolTip(t.name + "\r\n" + t.time),
            a.s({
                "image.stretch": "centerUniform",
                draggable: !0
            }),
            clipGroup.addChild(a)
        // console.log(a.item)
    }
}

// 初始化拓扑图
function initGraphView() {
    g2d.enableToolTip(),
        g2d.addInteractorListener(function (e) {//内置的Interactor在交互过程会派发出事件，可通过GraphView#addInteractorListener进行监听，简写为mi,e指每一次交互
            var t = g2d.sm().getSelection();
            "beginMove" === e.kind ? t.each(function (e) {
                console.log(e + '被单击');
                e.s("select.width", 0),
                    e.s("2d.editable", !1)
            }) : "endMove" === e.kind && t.each(function (e) {
                console.log('结束移动图元');
                e.s("select.width", ht.Style["select.width"]),
                    e.s("2d.editable", !0)
            })
        }),

        // nodeBorderColor属性通过getNodeBorderColor()和setNodeBorderColor('newColor')操作，表示组内被选中的节点的边框颜色，默认值为#1ABC9C
        g2d.getNodeBorderColor = function () {
            return "#f40"
        },
        g2d.sm().ms(function () {
            if (updateToolbar(), !ht.Default.isShiftDown()) {
                var e = g2d.sm().ld();
                if (!e) return;
                // console.log(e.s("_groupId"))//组合Id
                var t = e.s("_groupId");//有组合时执行
                t && g2d.dm().each(function (e) {
                    console.log(e)
                    e.s("_groupId") === t && g2d.sm().as(e)//appendSelection简写as
                })
            }
        }),
        // addInteractorListener添加交互监听,借用e._host中间变量，设置宿主对象
        g2d.mi(function (e) {
            "beginEditRect" === e.kind || "beginEditRotation" === e.kind ? g2d.sm().each(function (e) {
                e.__host = e.getHost(), e.setHost(null)
            }) : "endEditRect" !== e.kind && "endEditRotation" !== e.kind || g2d.sm().each(function (e) {
                e.setHost(e.__host), delete e.__host
            })
        }),
        //*?getToolTip()和setToolTip(tooltip)获取和设置组件上该节点或图元的文字提示信息
        g2d.getToolTip = function (e) {
            var t = this.getDataAt(e);
            if (t) {
                var a = this.getIconInfoAt(e);//getIconInfoAt函数能得到点击的具体icon图标信息
                // console.log(a)
                return a ? a.name : t.getToolTip()
            }
            return null
        },

        //*? 创建此交互的实例，并设置到拓扑组件上：
        editInteractor = new ht.graph.XEditInteractor(g2d),
        // 重写交互对象的onEdgeCreated(e, edge)方法，对创建完的Edge按钮设置特殊样式
        editInteractor.onEdgeCreated = function (e, t) {
            console.log(e)
            console.log(t)
            t.setLayer("nodeLayer")
        },

        g2d.setEditable = function (e) {  //e是true默认   
            var t = this,
                a = new NodeOperationInteractor(g2d);//得到最大的一个对象，包括这里的t，也就是g2d
            // console.log(a)
            // console.log(t)
            clip = a,
                e ? t.setInteractors(//组合这些交互器,GraphView构造函数会调用setEditable(false),默认只有基本的操作功能不具备编辑功能,需要编辑功能可调用setEditable(true)实现
                    new ht.List([
                        new ht.graph.SelectInteractor(t),
                        editInteractor,
                        new ht.graph.SnapMoveInteractor(t),
                        new ht.graph.DefaultInteractor(t),
                        new ht.graph.SnapTouchInteractor(t, { editable: !1 }),
                        a
                    ])) : t.setInteractors(
                        new ht.List([
                            new ht.graph.SelectInteractor(t),
                            new ht.graph.SnapMoveInteractor(t),
                            new ht.graph.DefaultInteractor(t),
                            new ht.graph.SnapTouchInteractor(t, { editable: !1 }),
                            a
                        ])),
                snap && g2d.setSnapSpacing(gridSpace)//snap为true，gridSpace为吸附的大小8，定义在editor.html中了，snapSpacing属性通过getSnapSpacing()和setSnapSpacing(newSpacing)操作，表示编辑大小时要吸附的尺寸，默认为空，表示不吸附
        },

        // 判断是否为触屏可 Touch 方式交互
        // 如果触屏就重写此方法可以禁用 HTML5原生的Drag和Drop事件并启用palette插件里模拟的拖拽事件handleDragAndDrop
        ht.Default.isTouchable ? palette.handleDragAndDrop = function (e, state) {
            if (ht.Default.containedInView(e, g2d)) {// 判断交互事件所处位置是否在View组件之上
                if (state === 'between') {
                    e.preventDefault();
                }
                // 当 state 为 end 时，判断e是否在 graphView 的范围内，如果是，则创建 Node
                else if (state === 'end') {
                    handleDrop(e);
                }
            }
            // ht.Default.containedInView(e, g2d) && ("between" === state ? handleOver(e) : "end" === state && handleDrop(e))
        } : (g2d.getView().addEventListener("dragover", function (e) {
            e.dataTransfer.dropEffect = "copy", // e.dataTransfer.dropEffect = "copy";//源项目的副本在新位置处制作。
                handleOver(e)
        }),
            g2d.getView().addEventListener("drop", function (e) {
                handleDrop(e)
            }));

    var e = ht.Default.isTouchable ? "touchend" : "mouseup";//判断为桌面及触屏终端做周全的事件类型考虑
    g2d.getView().addEventListener(e, function (e) {
        lastPt = g2d.getLogicalPoint(e),
            pannabling = !1
    }),

        startpoint = null,
        g2d.getView().addEventListener("mousedown", function (e) {
            // console.log(e.button)//左键按下去为0鼠标
            1 == e.button && (startpoint = g2d.getLogicalPoint(e), pannabling = !0)//false
        }),

        g2d.getView().addEventListener("mousemove", function (e) {
            var t = g2d.getLogicalPoint(e),
                a = "哈哈:" + t.x.toFixed(0) + " Y:" + t.y.toFixed(0);
            toolbar.getItemById("position").label = a,
                toolbar.redraw(), //函数可用于item元素有所变化时进行刷新绘制
                // window.status = a, 

                pannabling && g2d.setTranslate(//pannabling定义的全局变量为false了
                    g2d.tx() + t.x - startpoint.x,
                    g2d.ty() + t.y - startpoint.y,
                    !0
                )
        }),
        // addBottomPainter是绘制在拓扑原有节点连线下面的，并且我们可以加多个bottomPainter。 
        g2d.addBottomPainter(new ht.graph.GridPainter(g2d))
}


// 属性面板右键
function initpaletteContextMenu() {
    var e = new ht.widget.ContextMenu;
    e.setItems([]),
        e.addTo(palette.getView())
}

// g2d的右键菜单
function initContextMenu() {
    contextMenu = new ht.widget.ContextMenu,
        contextMenu.addTo(g2d.getView()),
        contextMenu.afterShow = function () {//afterShow(event)菜单显示之后被调用
            // _pause 为true时交互内部停止检测鼠标位置，右键菜单显示出来以后应该设为true，避免再改变_hoverSegmentIndex，右键菜单隐藏后再设回false
            editInteractor._pause = !0
        },
        contextMenu.afterHide = function () {
            editInteractor._pause = !1
        },
        contextMenu.beforeShow = function (e) {

            // console.log(editInteractor._removePointIndex)
            if (lastPt = g2d.getLogicalPoint(e),
                editInteractor._hoverSegmentIndex >= 0) {//_hoverSegmentIndex鼠标下高亮线段的下标
                var t = null,
                    // _shape 鼠标下有高亮线段或编辑点时，高亮线段或编辑点所属的Shape
                    // _edge 鼠标下有高亮线段或编辑点时，高亮线段或编辑点所属的Edge
                    a = editInteractor._shape || editInteractor._edge;
                console.log(a instanceof ht.Shape)
                if (a instanceof ht.Shape) {
                    t = (n = a.getSegments() || editInteractor.getDefaultSegments(a)).get(editInteractor._hoverSegmentIndex);
                } else if (a instanceof ht.Edge) {
                    // getDefaultSegments(data)Shape或Edge的segments为空时，可用此方法得到默认的segments
                    var n = a.s("edge.segments") || editInteractor.getDefaultSegments(a);
                    t = n.get(editInteractor._hoverSegmentIndex)
                }
                contextMenuChangeToMove.selected = 1 === t,//折断
                    contextMenuChangeToLine.selected = 2 === t,//直线
                    contextMenuChangeToQuadratic.selected = 3 === t,//二次曲线
                    contextMenuChangeToBezier.selected = 4 === t,//贝塞尔曲线
                    contextMenu.setItems([
                        contextMenuAddPoint,//增加点
                        contextMenuChangeToMove,
                        contextMenuChangeToLine,
                        contextMenuChangeToQuadratic,
                        contextMenuChangeToBezier
                    ])
            } else if (editInteractor._removePointIndex >= 0) {
                contextMenu.setItems([contextMenuRemovePoint])//删除点
            } else {
                // getFirstData()返回首个被选中的对象，如果没有选中对象则返回空，简写为fd
                var i = new ht.List,
                    o = dataModel.getSelectionModel().size();

                // 选中一个时，多个时
                if (o > 0 && (1 == o ? dm.sm().fd() instanceof ht.Edge || (i.add(contextMenuCopy),
                    i.add(contextMenuCut), i.add(contextMenuSave), i.add(copyMirrorMenu))  //复制，剪切，保存选定，镜像复制 
                    :
                    (i.add(contextMenuCopy), i.add(contextMenuCut), i.add(contextMenuSave), i.add(copyMirrorMenu)),

                    clip.clipboard && i.add(contextMenuPaste),//黏贴

                    i.add(contextMenuDelete),//删除
                    i.add(contextMenuPasteControl)),//从控件黏贴

                    // 选中个数为0，但是控件上有东西，就是俗话说的，之前复制或剪切过，黏贴板上有东西
                    0 == o && (clip.clipboard && i.add(contextMenuPaste), //黏贴
                        i.add(contextMenuPasteControl), //从控件黏贴
                        i.add("separator"),
                        i.add(viewallMenu), //显示全部
                        i.add(onlynotvisibledMenu), //仅显示隐藏
                        i.add(onlyscriptdMenu), //仅显示脚本对象
                        i.add(onlytagMenu), //仅显示动态对象
                        i.add(onlynotselectMenu)), //仅选择不可选择对象

                    1 == o) {
                    // 有1个选择对象的时候执行  contextScript编辑脚本
                    var r = dataModel.getSelectionModel().getFirstData();
                    r && (r instanceof ht.Script ? i.add(contextScript) : r instanceof ht.Html ? i.add(contextHtml) : r instanceof ht.Text ? (i.add(textEditMenu), i.add(contextMenuScript), i.add(contextNodeClickScript)) : (i.add(contextMenuScript), r instanceof ht.LiveNode ? r instanceof ht.ToggleButtonNode ? i.add(contexValueChangeScript) : r instanceof ht.ButtonNode ? i.add(contextButtonClickScript) : r instanceof ht.ProgressBarNode || i.add(contexValueChangeScript) : i.add(contextNodeClickScript)))
                } else {
                    // o>0返回false，后面不执行了
                    o > 0 && (i.add(contextbathClickScript),
                        i.add(contextbathMenuScript));
                }
                console.log(i)
                contextMenu.setItems(i.toArray())
            }
        }
}

// 组合，解组，对其等更新工具栏
function updateToolbar() {
    var e = g2d.sm().size();
    1 == e && g2d.sm().ld().s("_gp") ? toolbar.getItemById("ungroup").disabled = !1 : toolbar.getItemById("ungroup").disabled = !0;
    var t = e < 2;
    toolbar.getItemById("group").disabled = t,
        toolbar.getItemById("align_left").disabled = t,
        toolbar.getItemById("align_horizontalcenter").disabled = t,
        toolbar.getItemById("align_right").disabled = t,
        toolbar.getItemById("align_top").disabled = t,
        toolbar.getItemById("align_verticalcenter").disabled = t,
        toolbar.getItemById("align_bottom").disabled = t,
        toolbar.getItemById("align_even_horizontal").disabled = t,
        toolbar.getItemById("align_even_vertical").disabled = t,
        toolbar.getItemById("samewidth").disabled = t,
        toolbar.getItemById("sameheight").disabled = t,
        toolbar.getItemById("run").disabled = "" == HT2dEditor.currScene.filename || isnew,
        toolbar.iv()
}

//初始化树组件右键菜单
function initTreeContextMenu() {
    treecontextMenu = new ht.widget.ContextMenu,
        treecontextMenu.addTo(treeView.getView()),
        treecontextMenu.afterShow = function () {
            editInteractor._pause = !0
        },
        treecontextMenu.afterHide = function () {
            editInteractor._pause = !1
        },
        treecontextMenu.beforeShow = function (e) {
            var t = new ht.List,
                a = dataModel.getSelectionModel().size();
            if (a > 0 && (t.add(contextMenuCopy), t.add(contextMenuSave), t.add(contextMenuCut), t.add(contextMenuDelete), t.add(copyMirrorMenu)), 1 == a) {
                var n = dataModel.getSelectionModel().getFirstData();
                n && (n instanceof ht.Script ? t.add(contextScript) : n instanceof ht.Html ? t.add(contextHtml) : n instanceof ht.Text ? (t.add(textEditMenu), t.add(contextMenuScript), t.add(contextNodeClickScript)) : (t.add(contextMenuScript), n instanceof ht.LiveNode ? n instanceof ht.ToggleButtonNode ? t.add(contexValueChangeScript) : n instanceof ht.ButtonNode ? t.add(contextButtonClickScript) : n instanceof ht.ProgressBarNode || t.add(contexValueChangeScript) : t.add(contextNodeClickScript)))
            } else a > 0 && (t.add(contextbathClickScript), t.add(contextbathMenuScript));
            treecontextMenu.setItems(t.toArray())
        }
}

// 初始化界面树组件，这里是默认先有frameborder，界面显示，后面新创建的节点名称在树组件显示
function initTreeView() {
    treeView.getLabel = function (e) {
        return e.getTag() || e.getName() || e.getId()
    }
}

// 属性面板
function initPropertyView() {
    dataModel.sm().ms(function (e) {
        // console.log("none" != tagPanel.getView().style.display && (tagPanel.getView().style.display = "none"))//第一次返回false，以后每次都是none  &&遇到false就返回，不继续执行
        propertyView.setProperties(null);//清空所有属性   右上侧tagformPane表单面板
        var t = dataModel.sm().ld();
        if (t) {
            currentData = t;
            if (currentData instanceof ht.ButtonNode || currentData instanceof ht.ToggleButtonNode) {
                tagformPane.v("name", currentData.s("live.label"))
            } else {
                tagformPane.v("name", t.getName() || "")
            }

            // 同步属性面板和右上角面板
            tagformPane.v("station", t.a("station") || "");
            tagformPane.v("faci", t.a("faci") || "");
            tagformPane.v("signal", t.a("signal") || "");

            // 选中时，有值，就把ID号赋值给选中
            console.log(t)
            checkStation = t.a('station_id') ? t.a('station_id') : ''
            checkEquipment = t.a('faci_id') ? t.a('faci_id') : ''
            checkSignal = t.a('signal_id') ? t.a('signal_id') : ''


            // 不可以输入
            tagformPane.getItemById("station").element.setDisabled(true);
            tagformPane.getItemById("faci").element.setDisabled(true);
            tagformPane.getItemById("signal").element.setDisabled(true);


            if (tagPanel.getView().style.display == "none") {
                tagPanel.getView().style.display = ""
            }

        } else {
            currentData = null;
            tagformPane.v("station", "");
            tagformPane.v("faci", "");
            tagformPane.v("signal", "");
            if (tagPanel.getView().style.display !== "none") {
                tagPanel.getView().style.display = ""
            }
        }

        if (!t) return;
        if (t.getImage) {
            var a = t.getImage();
            console.log(a)

            if ("string" == typeof a) {
                window[a + "_properties"] && propertyView.addProperties(window[a + "_properties"]), //添加对应的属性面板中去，配置在properties——config.js
                    "UserShape" == a && propertyView.addProperties(shape_properties);//为常规里面的用户图形，就会在属性框添加shap_properties


                var n = "usertag_" + a + "_properties";
                window[n] ? propertyView.addProperties(window[n]) : (propertyView.addProperties(tag_properties), propertyView.addProperties(professional_properties))
            } else {
                propertyView.addProperties(tag_properties);
                propertyView.addProperties(professional_properties)
            }
        } else {
            propertyView.addProperties(tag_properties);
            propertyView.addProperties(professional_properties)
        }

        t instanceof ht.Data && propertyView.addProperties(data_properties);
        t instanceof ht.Node && propertyView.addProperties(node_properties);
        t instanceof ht.Group && propertyView.addProperties(group_properties);
        t instanceof ht.Edge && propertyView.addProperties(edge_properties);
        t instanceof ht.Switch && propertyView.addProperties(swithc_properties);

        if (t instanceof ht.Shape) {
            propertyView["addProperties"](shape_properties);
        } else {
            if (t.s("shape")) {
                propertyView.addProperties(shape_properties);
                if ("roundRect" == t.s("shape")) {
                    propertyView.addProperties(RoundRect_properties)
                } else {
                    if ("rect" == t.s("shape")) {
                        propertyView.addProperties(Rect_properties)
                    } else if ("arc" == t.s("shape")) {
                        propertyView.addProperties(arc_properties)
                    }
                }
            }
        };

        // t instanceof ht.Shape ? propertyView.addProperties(shape_properties) : t.s("shape") && (propertyView.addProperties(shape_properties), "roundRect" == t.s("shape") ? propertyView.addProperties(RoundRect_properties) : "rect" == t.s("shape") ? propertyView.addProperties(Rect_properties) : "arc" == t.s("shape") && propertyView.addProperties(arc_properties)),

        t instanceof ht.Text ? propertyView.addProperties(Text_properties) : t instanceof ht.Script ? propertyView.addProperties(script_properties) : t instanceof ht.LiveNode ? (propertyView.addProperties(live_properties),

            t instanceof ht.ComboboxNode && propertyView.addProperties(combobox_properties)) :
            t instanceof ht.Image ? propertyView.addProperties(Image_properties) :
                t instanceof ht.Html ? propertyView.addProperties(Html_properties) :
                    t instanceof ht.iFrame ? propertyView.addProperties(iFrame_properties) :
                        t instanceof ht.LinkImg ? propertyView.addProperties(iFrame_properties) :
                            t instanceof ht.alarm && propertyView.addProperties(alarm_properties)
    })
}

// 拖动时触发
function handleOver(e) {
    e.preventDefault(),
        isPannable && g2d.autoScroll(e);
    var t = palette.dm().sm().ld();
    if (t) {
        var a = t.item;
        (void 0 !== a.source || a.styleIcon) && g2d.sm().ss(g2d.getDataAt(e, null, 5))
    }
}

// 拖动结束放手时触发
function handleDrop(e) {
    e.preventDefault();
    var t = !1,
        a = palette.dm().sm().ld();

    if (a) {
        var n = a.item,
            i = n.image,
            o = g2d.getDataAt(e, null, 5);//获取事件下的节点

        // 箭头时 void 0 !== n.source就为true，才执行if里面语句
        // Data#addStyleIcon(name, json)和Data#removeStyleIcon(name)的函数，便于控制管理图标增删

        if (void 0 !== n.source) {//箭头组走这里
            (o instanceof ht.Edge || o instanceof ht.Polyline) && (n.source ? o.addStyleIcon("sourceArrow", {
                position: 15,
                keepOrien: !0,//旋转Edge时，icons会自动调整方向以保持最好的阅读效果（比如文字），此属性为true表示禁止自动调整方向
                names: [i]//包含多个字符串的数组，每个字符串对应一张图片或矢量(通过ht.Default.setImage注册)
            }) : o.addStyleIcon("targetArrow", {
                position: 19,
                keepOrien: !0,
                names: [i]
            }));
        } else if (n.styleIcon) {//图标组就走这里         
            if (o) {
                var r,
                    l = o.s("icons");
                (r = l && l.states ? l.states : {
                    width: 16,
                    height: 16,
                    position: o instanceof ht.Edge || o instanceof ht.Polyline ? 3 : 1,
                    names: []
                }).names.indexOf(i) < 0 && (r.names.push(i), o.addStyleIcon("states", r))
            }
        } else {
            var d;

            // console.log("string" == typeof n.type)//只有面板里交互组满足
            // console.log(typeof n)//用户图片
            // pastefromjson 在lib\NodeOperationInteractor.js共享控件

            if ("string" == typeof n.type ? ((d = new ht[n.type + "Node"]).setEditable(!1), d.s("live.label", n.type), d.setItems) : "string" == typeof n ? (d = new ht.Image, (i = new Image).src = n, i.onload = function (e) {
                d && (d.setImage(n), d.setWidth(i.width), d.setHeight(i.height), d.setIcon("imgpng"))
            }, t = !0) : "number" == typeof n ? (d = new ht.Node(), lastPt = g2d.lp(e), snap && (lastPt.x = Math.round(lastPt.x / gridSpace) * gridSpace, lastPt.y = Math.round(lastPt.y / gridSpace) * gridSpace), clip.pastefromjson(n)) : d = new (n.type || ht.Node), d) {
                // console.log(d)
                // console.log(n.flash)
                // console.log(d.a("flash", !0))
                // console.log(n.flash && d.a("flash", !0))
                n.flash && d.a("flash", !0),
                    d instanceof ht.Text ? (d.setLayer("textLayer"),
                        // 组态里的图片ht.Image
                        d.setImage(i)) : d instanceof ht.Image ? (t || selectImageControl(d),
                            d.setIcon(n.icon),
                            d.setLayer("nodeLayer")) : ("TagValue1".indexOf(i) >= 0 ? (d.setLayer("textLayer"),
                                d.setIcon("number")) :
                                d.setLayer("nodeLayer"),
                                d instanceof ht.LiveNode || (d instanceof ht.Html ? (d.setWidth(200),
                                    d.setHeight(150),
                                    d.a("html", "<Div>HtmlNode</Div>"),
                                    d.a("padding", 6),
                                    d.a("scalable", !1)) : null != i && (d instanceof ht.iFrame ? (d.setWidth(200),
                                        d.setHeight(150)) : d instanceof ht.LinkImg ? (d.setWidth(200),
                                            d.setHeight(150)) : d instanceof ht.alarm && (d.a("count", 5),
                                                d.a("area", 0),
                                                d.a("bordercolor", "#f40")), //改属性
                                        d.setImage(i)))),
                    d.a("modelRule", "defaultModel"),

                    // n.num ? (d.a('station', '3号'), d.a('faci', '2号'), d.s('signal','中')) : '',

                    typeof n == "string" ? d.setTag(a['_name']) : d.setTag(n.name + d.getId()),//self修改
                    null != i && null != n.ico && d.setIcon(n.icon || i);
                var s = g2d.lp(e);
                snap && (s.x = Math.round(s.x / gridSpace) * gridSpace,
                    s.y = Math.round(s.y / gridSpace) * gridSpace),
                    d.p(s),
                    o instanceof ht.Group ? (d.setParent(o), o.setExpanded(!0)) :
                        d.setParent(g2d.getCurrentSubGraph()), //getCurrentSubGraph()和setCurrentSubGraph(subGraph)获取和设置当前子网，默认值为空代表处于最顶层
                    g2d.dm().add(d),
                    g2d.sm().ss(d)
            }
        }
    }
}

// 右上角的表格面板，显示节点属性
function tagconfig_init() {
    tagformPane = new ht.widget.FormPane,
        tagformPane.getLabelFont = function (e) {
            return "bold 12px arial, sans-serif"
        },
        tagformPane.getLabelVAlign = function (e) {
            return "top"
        },
        tagformPane.addRow(["显示名称:", {
            id: "name",
            textField: { text: "" }
        }], [60, .1]),
        tagformPane.addRow(["厂站号:", {
            id: "station",
            textField: { text: "" }
        }, {
                button: {
                    label: "...",
                    onClicked: function () {
                        stationconfig = true;
                        equipmentconfig = false,
                            signalconfig = false
                        showTagsDialog(function (e) {//e指选中的
                            var t = 0;
                            e.each(function (e) {
                                tagformPane.v("station", "" != e.a("station") ? e.a("station") : '')
                            })
                        })
                    }
                }
            }], [60, .1, 20]),
        tagformPane.addRow(["设备号:", {
            id: "faci",
            textField: { text: "" }
        },
            {
                button: {
                    label: "...",
                    onClicked: function () {
                        console.log(checkStation)
                        if (checkStation == '') {
                            alert('请选择厂站号');
                            return
                        }
                        stationconfig = false;
                        equipmentconfig = true,
                            signalconfig = false
                        showTagsDialog(function (e) {
                            console.log(e)
                            e.each(function (e) {
                                tagformPane.v("faci", "" != e.a("faci") ? e.a("faci") : '')
                            })
                        })
                    }
                }
            }], [60, .1, 20]),
        tagformPane.addRow(["信号:", {
            id: "signal",
            textField: { text: "" }
        },
            {
                button: {
                    label: "...",
                    onClicked: function () {
                        if (checkEquipment == '') {
                            alert('请选择厂站号设备号');
                            return
                        }
                        stationconfig = false;
                        equipmentconfig = false,
                            signalconfig = true
                        showTagsDialog(function (e) {
                            var t = 1;
                            e.each(function (e) {
                                tagformPane.v("signal", "" != e.a("signal") ? e.a("signal") : '')
                            })
                        })
                    }
                }
            }
        ], [60, .1, 20]),
        tagformPane.addRow([null, {
            button: {
                label: "设置",
                onClicked: function () {
                    if (currentData) {
                        if (currentData instanceof ht.ButtonNode || currentData instanceof ht.ToggleButtonNode) {
                            currentData.s("live.label", tagformPane.v("name"))
                        } else {
                            currentData.setName(tagformPane.v("name"))
                        }
                        currentData.a('station', tagformPane.v('station') || '')
                        currentData.a('faci', tagformPane.v('faci') || '')
                        currentData.a('signal', tagformPane.v('signal') || '')
                        currentData.a('station_id', checkStation)
                        currentData.a('faci_id', checkEquipment)
                        currentData.a('signal_id', checkSignal)
                    }
                }
            }
        }, {
                button: {
                    label: "清除",
                    onClicked: function () {
                        checkEquipment = '';
                        checkStation = '';
                        tagformPane.v({
                            name: '',
                            station: "",
                            faci: "",
                            signal: ""
                        })
                    }
                }
            }
        ], [.1, 70, 70]),
        tagformPane.setWidth(300),
        tagPanel = new ht.widget.Panel({
            id: "tagPanel",
            title: "快速设置",
            restoreToolTip: "快速设置",
            titleIcon: "",
            width: 300,
            contentHeight: 200,
            narrowWhenCollapse: true,//narrowWhenCollapse 如果为true合并面板时收缩宽度
            content: tagformPane,
            expanded: !1
        }),
        tagPanel.setPositionRelativeTo("rightTop"),
        tagPanel.setPosition(0, 0),
        tagPanel.getView().style.display = "none",
        document.body.appendChild(tagPanel.getView())
}

function createImage(e) {
    var t = new ht.Image;
    t.setLayer("nodeLayer"),
        t.setIcon("imgpng"),
        t.a("modelRule", "defaultModel"),
        t.setTag("image" + t.getId());
    var a = lastPt;
    snap && (a.x = Math.round(a.x / gridSpace) * gridSpace,
        a.y = Math.round(a.y / gridSpace) * gridSpace), t.p(a),
        t.setParent(g2d.getCurrentSubGraph()),
        g2d.dm().add(t),
        g2d.sm().ss(t);
    var n = new Image;
    n.src = e,
        n.onload = function (a) {
            t && (t.setImage(e),
                t.setWidth(n.width),
                t.setHeight(n.height))
        }
}


// 创造面板边框节点
function createFrameBorder(e, t) {
    var a = new ht.Shape;
    a.setWidth(e),
        a.setHeight(t),
        a.setPoints([
            { x: 0, y: 0 },
            { x: e, y: 0 },
            { x: e, y: t },
            { x: 0, y: t },
            { x: 0, y: 0 }
        ]),
        a.segments = [1, 2, 2, 2, 2],
        a.s("shape.border.width", .5),
        a.s("shape.background", null),
        a.s("shape.border.color", "#f40"),
        a.setPosition(.5 * e, .5 * t),
        a.setLayer("backgroundLayer"),
        a.setTag("frameborder"),
        a.setStyle("label.opacity", 0),
        a.setStyle("2d.selectable", !1),
        a.setStyle("2d.movable", !1),
        a.setStyle("2d.editable", !1),
        dataModel.add(a)
}

function hasScript() {
    //toSelection(matchFunc, scope)返回过滤后的选中对象，matchFunc为空时代表复制全部到新数组
    var e = g2d.sm().toSelection()
    console.log(e)
    t = null;
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

//编辑- f文本替换
function replaceText() {
    "none" == textReplaceDlg.getView().style.display && (textReplaceDlg.getView().style.display = "", textReplaceDlg.iv())
}
//编辑- f标签替换
function replaceTag() {
    "none" == tagReplaceDlg.getView().style.display && (tagReplaceDlg.getView().style.display = "", tagReplaceDlg.iv())
}
//编辑- f查找对象
function showFind() {
    null == findDlg && find_init(),
        "none" == findDlg.getView().style.display && (findDlg.getView().style.display = "",
            findDlg.iv())
}

function loadclipobject() {
    cliploading || (cliploading = !0, $.post("server/controllist.ashx", {}, function (e) {
        clipcontrols = e, initclipGroup(), cliploading = !1
    }))
}

function tagreplace_init() {
    tagreplaceformPane = new ht.widget.FormPane,
        tagreplaceformPane.getLabelFont = function (e) {
            return "bold 12px arial, sans-serif"
        },
        tagreplaceformPane.getLabelVAlign = function (e) {
            return "top"
        },
        tagreplaceformPane.addRow(["标签名称:",
            {
                id: "oldname",
                textField: { text: "", editable: !0 }
            },
            {
                button: {
                    label: "...",
                    onClicked: function () {
                        showTagsDialog(function (e) {
                            e.each(function (e) {
                                var t = e.a("plug");
                                t = "" == t ? e.a("id") : t + "." + e.a("id"),
                                    tagreplaceformPane.v("oldname", t.toUpperCase())
                            })
                        }, !0)
                    }
                }
            }
        ], [60, .1, 20]),
        tagreplaceformPane.addRow(["替换名称:",
            {
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
            }
        ], [60, .1, 20]),
        tagreplaceformPane.addRow([{
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
        }], [.1, 65, 65]),
        tagreplaceformPane.setWidth(260),
        tagreplaceformPane.setHeight(100),
        tagReplaceDlg = new ht.widget.Panel({
            id: "tagReplaceDlg",
            title: "标签替换窗口",
            restoreToolTip: "标签替换窗口",
            titleIcon: "",
            width: 260,
            contentHeight: 100,
            minimizable: !1,
            content: tagreplaceformPane,
            expanded: !0
        }),
        tagReplaceDlg.setPositionRelativeTo("rightTop"),
        tagReplaceDlg.setPosition(260, 25),
        tagReplaceDlg.getView().style.display = "none",
        document.body.appendChild(tagReplaceDlg.getView())
}

// 文本替换
function textreplace_init() {
    textreplaceformPane = new ht.widget.FormPane,
        textreplaceformPane.getLabelFont = function (e) {
            return "bold 12px arial, sans-serif"
        },
        textreplaceformPane.getLabelVAlign = function (e) {
            return "top"
        },
        textreplaceformPane.addRow(["文字内容:",
            {
                id: "oldname",
                textField: { text: "", editable: !0 }
            }], [60, .1]),

        textreplaceformPane.addRow(["替换内容:",
            {
                id: "newname",
                textField: { text: "", editable: !0 }
            }], [60, .1]),
        textreplaceformPane.addRow([
            {
                id: "ck",
                checkBox: { label: "全部匹配", selected: !0 }
            },
            {
                button: {
                    label: "替换",
                    onClicked: function () {
                        var e = 0,
                            t = textreplaceformPane.v("ck"),
                            a = textreplaceformPane.v("oldname"),
                            n = textreplaceformPane.v("newname");
                        "" != a && (dm.sm().size() > 0 ? (dm.sm().toSelection().each(function (i) {
                            if (i instanceof ht.ButtonNode || i instanceof ht.ToggleButtonNode) {
                                null != (o = i.s("live.label")) && (t ? o == a && (i.s("live.label", n), e++) : (r = o.replace(new RegExp(a, "gim"), n)) != o && (i.s("live.label", r), e++));
                            } else {
                                var o = i.getName();
                                if (null != o) if (t) o == a && (i.setName(n), e++);
                                else {
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
            }
        ], [.1, 65, 65]),
        textreplaceformPane.setWidth(260),
        textreplaceformPane.setHeight(100),
        textReplaceDlg = new ht.widget.Panel({
            id: "textReplaceDlg",
            title: "文本替换窗口",
            restoreToolTip: "文本替换窗口",
            titleIcon: "",
            width: 260,
            contentHeight: 100,
            minimizable: !1,
            content: textreplaceformPane,
            expanded: !0
        }),
        textReplaceDlg.setPositionRelativeTo("rightTop"),
        textReplaceDlg.setPosition(260, 100),
        textReplaceDlg.getView().style.display = "none",
        document.body.appendChild(textReplaceDlg.getView())
}

// 编辑-查找对象
function find_init() {
    findPane = new ht.widget.FormPane,
        findPane.getLabelFont = function (e) {
            return "bold 12px arial, sans-serif"
        },
        findPane.getLabelVAlign = function (e) {
            return "top"
        },
        findPane.addRow(["查找内容:",
            {
                id: "name",
                textField: { text: "", editable: !0 }
            },
            {
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
            }], [60, .1, 20]),

        findPane.addRow([
            {
                id: "httag",
                checkBox: { label: "对象名称", selected: !0 }
            },
            {
                id: "tagname",
                checkBox: { label: "变量名称", selected: !1 }
            }, {
                id: "text",
                checkBox: { label: "文本内容", selected: !1 }
            }], [.1, .1, .1]),

        findPane.addRow([{},
        {
            button: {
                label: "查找",
                onClicked: function () {
                    hashttag = findPane.v("httag"),
                        hastagname = findPane.v("tagname"),
                        hastext = findPane.v("text"),
                        "" != (searchname = findPane.v("name")) ? dm.size() > 0 && (searchMode = !0, g2d.iv(), treeView.invalidateModel()) : (searchMode = !1, g2d.iv(),
                            treeView.invalidateModel())
                }
            }
        },
        {
            button: {
                label: "关闭",
                onClicked: function () {
                    searchMode = !1,
                        findDlg.getView().style.display = "none",
                        g2d.iv(),
                        treeView.invalidateModel()
                }
            }
        }], [.4, .3, .3]),
        findPane.setWidth(260),

        (findDlg = new ht.widget.Panel({
            id: "findDlg",
            title: "对象查找窗口",
            restoreToolTip: "对象查找窗口",
            titleIcon: "",
            width: 260,
            contentHeight: 90,
            minimizable: !1,
            content: findPane,
            expanded: !0
        })).setPositionRelativeTo("rightTop"),
        findDlg.setPosition(260, 25),
        findDlg.getView().style.display = "none",
        document.body.appendChild(findDlg.getView())
}

// 视图-统计使用标签
function showAllTags() {
    var e = new ht.List;
    dataModel.each(function (t) {
        // console.log(t.getTag())
        var a = t.a("station");
        a && e.add(t);
    });
    console.log(e)
    e.size();
    viewTags(e)
}
// showAllTags同上的写法一样
// function showAllTags() {
//     var e = new ht.List();
//     dataModel["each"](function (t) {
//         var a = t["a"]("tagname");
//         if (a) {
//             a = a["toUpperCase"]();
//             if (!e["contains"](a)) {
//                 e["add"](a)
//             }
//         };
//         var a = t["a"]("vistagname");
//         if (a) {
//             a = a["toUpperCase"]();
//             if (!e["contains"](a)) {
//                 e["add"](a)
//             }
//         };
//         a = t["a"]("enbtagname");
//         if (a) {
//             a = a["toUpperCase"]();
//             if (!e["contains"](a)) {
//                 e["add"](a)
//             }
//         };
//         a = t["a"]("flashtagname");
//         if (a) {
//             a = a["toUpperCase"]();
//             if (!e["contains"](a)) {
//                 e["add"](a)
//             }
//         };
//         for (i = 1; i < 10; i++) {
//             a = t["a"]("tagname" + i);
//             if (a) {
//                 a = a["toUpperCase"]();
//                 if (!e["contains"](a)) {
//                     e["add"](a)
//                 }
//             }
//         }
//     });
//     var r = e.size();
//     viewTags(e)
// }
// 这样才正常吗写法  哈哈


function viewTags(e) {
    var t = new ht.widget.Toolbar,
        a = new ht.widget.BorderPane;
    a.setTopView(t);
    var n = new ht.DataModel,
        i = new ht.widget.TablePane(n);
    a.setCenterView(i),
        n.getSelectionModel().setSelectionMode("single"),
        i.addColumns([
            {
                name: "index",
                width: 40,
                displayName: "序号",
                accessType: "attr",
                align: "left",
                valueType: "number"
            },
            {
                name: "station",
                width: 160,
                displayName: "厂站号",
                accessType: "attr",
                align: "left"
            },
            {
                name: "faci",
                width: 110,
                displayName: "设备号",
                accessType: "attr",
                align: "left"
            },
            {
                name: "signal",
                width: 90,
                displayName: "信号",
                accessType: "attr",
                align: "left"
            }
        ]);
    var o = 1;
    e.each(function (e) {
        var t = new ht.Data;
        t.a({
            index: o,
            station: e.a('station'),
            faci: e.a('faci'),
            signal: e.a('signal')
        }),
            o++ ,
            n.add(t)
    });
    var r = i.getTableView();
    r.setColumnLineVisible(false), //设置列线是否可见
        r.setRowHeight(22),
        r.setAutoHideScrollBar(false),
        r.setLabelSelectColor("blue"),
        r.onDataClicked = function (e) {
            t.v("seach", e.a('station') + '-' + e.a('faci') + '-' + e.a('signal'))
        }
    r.drawRowBackground = function (e, t, a, n, i, o, r) {
        e.fillStyle = a ? "#87A6CB" : "#FAFAFA",
            e.beginPath(),
            e.rect(n, i, o, r),
            e.fill()
    },
        // 过
        r.isVisible = function (e) {
            if (e.isEmpty()) {
                var y = t.v("seach"),
                    o = !0;
                var l = e.a("station") && e.a("station").toLowerCase().indexOf(y.toLowerCase()) >= 0;
                var m = e.a("faci") && e.a("faci").toLowerCase().indexOf(y.toLowerCase()) >= 0;
                var n = e.a("signal") && e.a("signal").toLowerCase().indexOf(y.toLowerCase()) >= 0;

                o && "" != t && (o = l || m || n)

            }
            return o
        },
        t.setItems([{
            id: "seach",
            label: "厂站号-设备号-信号:",
            icon: "images/search.png",
            unfocusable: !0,
            textField: { width: 165, value: "" }
        }]);
    var l = t.getItemById("seach").element;
    l.getElement().onkeyup = function (e) {
        27 === e.keyCode && (l.getElement().value = ""),
            r.invalidateModel()//invalidateModel()该函数触发组件重新排序过滤加载数据，一般组件会自动调用，除非数据变化但未派发事件时才需强制调用
    };
    var d = new ht.widget.Dialog;
    d.setConfig({
        title: "页面使用设备:" + e.size() + "个",
        closable: !0,
        draggable: !0,
        contentPadding: 0,
        width: 400,
        height: 500,
        content: a,
        borderWidth: 1,
        resizeMode: "wh"
    }),
        d.onShown = function () {
            t.iv()
        },
        (new ht.widget.ContextMenu).addTo(d.getView()),
        d.show()
}

function Group(e) {
    if (e && e.size() > 1) {
        var t = "group" + ht.Default.getId(), a = e.get(0);
        console.log(t)
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


function addecharts() {
    if ("" == HT2dEditor.currScene.headHtml) {
        HT2dEditor.currScene.headHtml = "<script src='js/echarts.min.js'><\/script>"
    } else {
        HT2dEditor.currScene.headHtml.indexOf("echarts.min.js") < 0 && (HT2dEditor.currScene.headHtml += "\r\n<script src='js/echarts.min.js'><\/script>")
    }
}

function addjustgage() {
    console.log(HT2dEditor.currScene.headHtml)
    if ("" == HT2dEditor.currScene.headHtml) {
        HT2dEditor.currScene.headHtml =
            `<script src='js/raphael-2.1.4.min.js'><\/script>
        <script src='js/justgage.js'><\/script>`
    } else {
        HT2dEditor.currScene.headHtml.indexOf("justgage.js") < 0 && (HT2dEditor.currScene.headHtml += "\r\n<script src='js/raphael-2.1.4.min.js'><\/script>\r\n<script src='js/justgage.js'><\/script>")
    }
}

var Key = {};
Key.shift = "16", Key.ctrl = "17", Key.alt = "18", Key.meta = "91", Key.a = "65", Key.b = "66", Key.c = "67", Key.d = "68", Key.e = "69", Key.f = "70", Key.g = "71", Key.h = "72", Key.i = "73", Key.j = "74", Key.k = "75", Key.l = "76", Key.m = "77", Key.n = "78", Key.o = "79", Key.p = "80", Key.q = "81", Key.r = "82", Key.s = "83", Key.t = "84", Key.u = "85", Key.v = "86", Key.w = "87", Key.x = "88", Key.y = "89", Key.z = "90", Key.left = "37", Key.up = "38", Key.right = "39", Key.down = "40", Key.open_bracket = "219", Key.close_bracket = "221", Key.n0 = "48", Key.n1 = "49", Key.n2 = "50", Key.n3 = "51", Key.n4 = "52", Key.n5 = "53", Key.n6 = "54", Key.n7 = "55", Key.n8 = "56", Key.n9 = "57", Key.back_slash = "220", Key.minus = "189", Key.comma = "188", Key.semicolon = "186", Key.equals = "187", Key.slash = "191", Key.period = "190", Key.enter = "13";

var LEFT = "left",
    RIGHT = "right",
    TOP = "top",
    BOTTOM = "bottom",
    NULL = null,
    _scurrentPage = 1,
    _spagecount = 1,
    findDlg = null,
    searchMode = !1,
    hashttag = !1,
    hastagname = !1,
    hastext = !1,
    searchname = "";

ptcontextMenu = [
    {
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
                }),
                    e.each(function (e) {
                        palette.dm().remove(e)
                    }),
                    loadclipobject()
            }
        }
    }
],

    // g2d右键菜单
    contextMenuChangeToLine = {
        label: "直线", type: "radio", action: function () {
            editInteractor.changeShapeSegment(2)
        }
    },
    contextMenuChangeToMove = {
        label: "打断", type: "radio", action: function () {
            editInteractor.changeShapeSegment(1)
        }
    },
    contextMenuChangeToQuadratic = {
        label: "二次曲线", type: "radio", action: function () {
            editInteractor.changeShapeSegment(3)
        }
    },
    contextMenuChangeToBezier = {
        label: "贝塞尔曲线", type: "radio", action: function () {
            editInteractor.changeShapeSegment(4)
        }
    },
    contextMenuAddPoint = {
        label: "增加点", action: function (e, t) {
            editInteractor.addShapePoint()
        }
    },
    contextMenuRemovePoint = {
        label: "删除点", action: function () {
            editInteractor.removeShapePoint()
        }
    },
    contextMenuCopy = {
        label: "复制", action: function () {
            clip.copy()
        }
    },
    contextMenuSave = {
        label: "保存选定", action: function () {
            clip.save()
        }
    },
    contextMenuCut = {
        label: "剪切",
        action: function () {
            clip.copy(),
                dataModel.getSelectionModel().toSelection().each(function (e) {
                    dataModel.remove(e)
                })
        }
    },
    contextMenuPaste = {
        label: "粘贴",
        action: function () {
            clip.paste()
        }
    },
    contextMenuPasteControl = {
        label: "从控件粘贴",
        action: function () {
            clip.pastecontrol()
        }
    },
    contextMenuDelete = {
        label: "删除",
        action: function () {
            dataModel.getSelectionModel().toSelection().each(function (e) {
                dataModel.remove(e)
            })
        }
    },
    contextMenuScript = {
        label: "数据更新脚本",
        action: function () {
            var e = dataModel.getSelectionModel().getFirstData(),
                t = e.a("dchange") || "//数据更新脚本,当设置的标签数据发生改变时触发,函数类型function(data)\r\n",
                a = null,
                n = new ht.widget.Dialog;
            console.log(t)
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
            }),
                n.onShown = function () {
                    a = CodeMirror.fromTextArea(n.getView().querySelector("#jsscript"), {
                        lineNumbers: !0,
                        mode: "text/typescript"
                    })
                },
                n.addEventListener(function (e) {
                    if ("endResize" == e.kind || "restore" == e.kind || "maximize" == e.kind) {
                        n._config.width;
                        var t = n._config.height;
                        "maximize" == e.kind ? a.setSize("auto", window.innerHeight - 60) : a.setSize("auto", t - 60)
                    }
                }),
                n.show()
        }
    },
    contextButtonClickScript = {
        label: "鼠标点击脚本",
        action: function () {
            var e = dataModel.getSelectionModel().getFirstData(),
                t = e.a("bclick") || "//鼠标点击脚本,函数类型function(data,e)\r\n",
                a = null,
                n = new ht.widget.Dialog;
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
                    label: "确定",
                    action: function (t, i) {
                        a.save();
                        var o = n.getView().querySelector("#jsscript").value;
                        o && e.a("bclick", o),
                            n.hide()
                    }
                },
                {
                    label: "取消", action: function (e, t) {
                        n.hide()
                    }
                }],
                buttonsAlign: "right"
            }),
                n.onShown = function () {
                    a = CodeMirror.fromTextArea(n.getView().querySelector("#jsscript"), {
                        lineNumbers: !0,
                        mode: "text/typescript"
                    })
                },
                n.addEventListener(function (e) {
                    if ("endResize" == e.kind || "restore" == e.kind || "maximize" == e.kind) {
                        n._config.width;
                        var t = n._config.height;
                        "maximize" == e.kind ? a.setSize("auto", window.innerHeight - 60) : a.setSize("auto", t - 60)
                    }
                }),
                n.show()
        }
    },
    contexValueChangeScript = {
        label: "数值改变脚本",
        action: function () {
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
            }),
                n.onShown = function () {
                    a = CodeMirror.fromTextArea(n.getView().querySelector("#jsscript"), {
                        lineNumbers: !0,
                        mode: "text/typescript"
                    })
                },
                n.addEventListener(function (e) {
                    if ("endResize" == e.kind || "restore" == e.kind || "maximize" == e.kind) {
                        n._config.width;
                        var t = n._config.height;
                        "maximize" == e.kind ? a.setSize("auto", window.innerHeight - 60) : a.setSize("auto", t - 60)
                    }
                }),
                n.show()
        }
    },
    contextNodeClickScript = {
        label: "鼠标点击脚本",
        action: function () {
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
            }),
                n.onShown = function () {
                    a = CodeMirror.fromTextArea(n.getView().querySelector("#jsscript"), {
                        lineNumbers: !0,
                        mode: "text/typescript"
                    })
                },
                n.addEventListener(function (e) {
                    if ("endResize" == e.kind || "restore" == e.kind || "maximize" == e.kind) {
                        n._config.width;
                        var t = n._config.height;
                        "maximize" == e.kind ? a.setSize("auto", window.innerHeight - 60) : a.setSize("auto", t - 60)
                    }
                }),
                n.show()
        }
    },
    contextbathClickScript = {
        label: "批量鼠标点击脚本",
        action: function () {
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
    },
    contextbathMenuScript = {
        label: "批量数据更新脚本",
        action: function () {
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
    },
    contextScript = {
        label: "编辑脚本",
        action: function () {
            var e = dataModel.getSelectionModel().getFirstData(), // getFirstData()返回首个被选中的对象，如果没有选中对象则返回空，简写为fd

                t = e.a("script") || "//编辑脚本\r\n",
                a = null,
                n = new ht.widget.Dialog;
            // console.log(t)
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
                    label: "确定",
                    action: function (t, i) {
                        a.save();
                        var o = n.getView().querySelector("#jsscript").value;
                        o && e.a("script", o),
                            console.log(o)
                        n.hide()
                    }
                }, {
                    label: "取消", action: function (e, t) {
                        n.hide()
                    }
                }],
                buttonsAlign: "right"
            }),
                n.onShown = function () {
                    a = CodeMirror.fromTextArea(n.getView().querySelector("#jsscript"), {
                        lineNumbers: !0,
                        mode: "text/typescript"
                    })
                    // console.log(a)
                },
                n.addEventListener(function (e) {
                    if ("endResize" == e.kind || "restore" == e.kind || "maximize" == e.kind) {
                        n._config.width;
                        var t = n._config.height;
                        "maximize" == e.kind ? a.setSize("auto", window.innerHeight - 60) : a.setSize("auto", t - 60)
                    }
                }),
                n.show()
        }
    },
    contextHtml = {
        label: "编辑Html",
        action: function () {
            // 注释掉不报错，这个类在control中定义过了
            // ht.Switch = function () {
            //     ht.Switch.superClass.constructor.call(this);
            //     this.s('switch.angle', 0);
            // };
            // ht.Default.def('ht.Switch', ht.Node, {
            //     _image: 'switch',
            //     _icon: 'switch',

            //     toggle: function (anim) {
            //         this.setExpanded(!this.isExpanded(), anim);
            //     },
            //     isExpanded: function () {
            //         return this.s('switch.angle') !== 0;
            //     },
            //     setExpanded: function (expanded, anim) {
            //         if (anim == null) {
            //             anim = true;
            //         }
            //         var self = this,
            //             animation = self._animation,
            //             oldValue = self.isExpanded();

            //         if (animation) {
            //             animation.stop(true);
            //             delete self._animation;
            //         }

            //         if (oldValue !== expanded) {
            //             var targetAngle = expanded ? -Math.PI / 4 : 0;

            //             if (anim) {
            //                 oldValue = self.s('switch.angle');
            //                 self._animation = ht.Default.startAnim({
            //                     action: function (t) {
            //                         self.s('switch.angle', oldValue + (targetAngle - oldValue) * t);
            //                     }
            //                 });
            //             } else {
            //                 self.s('switch.angle', targetAngle);
            //             }
            //         }
            //     }
            // });
            // 
            var e = dataModel.getSelectionModel().getFirstData(),
                t = e.a("html") || "",
                a = new ht.widget.Dialog,
                n = null;
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
            }),
                a.onShown = function () {
                    (n = CodeMirror.fromTextArea(a.getView().querySelector("#chtml"), {
                        lineNumbers: !0,
                        mode: "text/typescript"
                    })).setSize("auto", "600px")
                },
                a.addEventListener(function (e) {
                    if ("endResize" == e.kind || "restore" == e.kind || "maximize" == e.kind) {
                        a._config.width;
                        var t = a._config.height;
                        "maximize" == e.kind ? n.setSize("auto", window.innerHeight - 60) : n.setSize("auto", t - 60)
                    }
                }),
                a.show()
        }
    },
    onlynotselectMenu = {
        label: "仅显示不可选择对象",
        type: "check",
        selected: !1,
        action: function () {
            clearSelected(4), onlynotselectMenu.selected = !0, treeView.invalidateModel(), g2d.iv()
        }
    },
    onlytagMenu = {
        label: "仅显示动态对象",
        type: "check",
        selected: !1,
        action: function () {
            clearSelected(3), onlytagMenu.selected = !0, treeView.invalidateModel(), g2d.iv()
        }
    },
    onlyscriptdMenu = {
        label: "仅显示脚本对象",
        type: "check",
        selected: !1,
        action: function () {
            clearSelected(2),
                onlyscriptdMenu.selected = !0,
                treeView.invalidateModel(),
                g2d.iv()
        }
    },
    onlynotvisibledMenu = {
        label: "仅显示隐藏",
        type: "check",
        selected: !1,
        action: function () {
            clearSelected(1),
                onlynotvisibledMenu.selected = !0,
                treeView.invalidateModel(),
                g2d.iv()
        }
    },
    viewallMenu = {
        label: "显示全部", type: "check", selected: !0, action: function () {
            clearSelected(0), viewallMenu.selected = !0, treeView.invalidateModel(), g2d.iv()
        }
    },
    textEditMenu = {
        label: "编辑文字", action: function () {
            var e = dataModel.getSelectionModel().getFirstData();
            getMInput("编辑文字", e.getName(), function (t) {
                e && e.setName(t)
            })
        }
    },
    copyMirrorMenu = {
        label: "镜像复制",
        action: function () {
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
    // 鼠标样式
    defaultItem = {
        icon: "images/toolbar/default.gif",
        toolTip: "默认编辑模式",
        type: "toggle",
        action: function () {
            g2d.setEditable(this.selected),
                palette.sm().cs(),
                drawing = !1
        }
    },

    // 菜单项
    toolbar_options = [
        defaultItem,
        {
            id: "save",
            icon: "images/toolbar/save.png",
            toolTip: "保存",
            action: function () {
                saveScene()
            }
        },
        {
            id: "run",
            icon: "images/toolbar/run.png",
            toolTip: "运行",
            action: function () {
                runCurrent()
            }
        },
        {
            icon: "images/toolbar/zoomIn.gif",
            toolTip: "放大",
            action: function () {
                g2d.zoomIn(!0)
            }
        },
        {
            icon: "images/toolbar/zoomOut.gif",
            toolTip: "缩小",
            action: function () {
                g2d.zoomOut(!0)
            }
        },
        {
            label: "100%",
            toolTip: "100%",
            action: function () {
                g2d.zoomReset(!0)
            }
        },
        {
            label: "0,0",
            toolTip: "xy坐标恢复",
            action: function () {
                g2d.setTranslate(0, 0)
            }
        },
        {//全屏
            icon: "images/toolbar/maximize.png", toolTip: "最大化",
            action: function () {
                //  document.fullscreenElement返回当前文档中正在以全屏模式显示的Element节点, 如果没有使用全屏模式, 则返回null.
                //document.exitFullscreen() 方法用于让当前文档退出全屏模式（原文表述不准确，详见备注）。调用这个方法会让文档回退到上一个调用Element.requestFullscreen()方法进入全屏模式之前的状态。
                document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement ? (view.style.background = "", document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()) : (view.style.left = 0, view.style.top = 0, view.style.width = "100%", view.style.height = "100%", view.style.background = "white", view.requestFullscreen ? view.requestFullscreen() : view.msRequestFullscreen ? view.msRequestFullscreen() : view.mozRequestFullScreen ? view.mozRequestFullScreen() : view.webkitRequestFullscreen && view.webkitRequestFullscreen())
            }
        },
        {
            id: "group", icon: "images/toolbar/group.png", toolTip: "成组", disabled: !0, action: function () {
                var e = g2d.sm().getSelection();
                e.size() > 1 && Group(e)
            }
        },
        {
            id: "ungroup", icon: "images/toolbar/ungroup.png", toolTip: "解组", disabled: !0, action: function () {
                var e = g2d.sm().toSelection();
                if (1 == e.size()) {
                    var t = e.get(0);
                    t.s("_gp") && UnGroup(t)
                }
            }
        },
        "separator",
        {
            id: "align_left", icon: "align_left", toolTip: "左对齐", disabled: !0, action: function () {
                align(getEditorSelection(), "left")
            }
        },
        {
            id: "align_horizontalcenter", icon: "align_horizontalcenter", toolTip: "水平对齐", disabled: !0, action: function () {
                align(getEditorSelection(), "horizontalcenter")
            }
        },
        {
            id: "align_right", icon: "align_right", toolTip: "右对齐", disabled: !0, action: function () {
                align(getEditorSelection(), "right")
            }
        }, {
            id: "align_top", icon: "align_top", toolTip: "上对齐", disabled: !0, action: function () {
                align(getEditorSelection(), "top")
            }
        },
        {
            id: "align_verticalcenter", icon: "align_verticalcenter", toolTip: "垂直对齐", disabled: !0, action: function () {
                align(getEditorSelection(), "verticalcenter")
            }
        },
        {
            id: "align_bottom", icon: "align_bottom", toolTip: "下对齐", disabled: !0, action: function () {
                align(getEditorSelection(), "bottom")
            }
        },
        "separator",
        {
            id: "align_even_horizontal",
            icon: "align_even_horizontal",
            toolTip: "水平间隔相等",
            disabled: !0,
            action: function () {
                evenSpace(getEditorSelection(), !0)
            }
        },
        {
            id: "align_even_vertical", icon: "align_even_vertical", toolTip: "垂直间隔相等", disabled: !0, action: function () {
                evenSpace(getEditorSelection(), !1)
            }
        },
        {
            id: "samewidth", icon: "samewidth", toolTip: "等宽", disabled: !0, action: function () {
                sameWidth(getEditorSelection())
            }
        },
        {
            id: "sameheight", icon: "sameheight", toolTip: "等高", disabled: !0, action: function () {
                sameHeight(getEditorSelection())
            }
        },
        "separator",
        {
            icon: "images/toolbar/html.png", toolTip: "Html Head代码", id: "headhtml", action: function () {
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
                            null != i && (HT2dEditor.currScene.headHtml = i),
                                e.hide()
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
        },
        {
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
        },
        {
            icon: "images/toolbar/info.png", label: "", toolTip: "文件信息", id: "filename", action: function () {
                var e = new ht.widget.Dialog, t = HT2dEditor.currScene.autoSize ? "checked" : "",
                    a = HT2dEditor.currScene.isMovable ? "checked" : "", n = HT2dEditor.currScene.isPannable ? "checked" : "";
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
                            o && (HT2dEditor.currScene.dataRate = parseInt(o) || 1e3);
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
        },
        {
            label: "", toolTip: "鼠标位置", id: "position", disabled: !0, action: function () {
            }
        }
    ];

var getEditorSelection = function () {
    return dataModel.sm().getSelection().toArray()
},
    getBounds = function (e) {
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
    },
    align = function (e, t) {
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
    },
    evenSpace = function (e, t) {
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
    },
    sameWidth = function (e) {
        if (!(e == NULL || e.length < 2)) {
            var t = e[0].getWidth();
            e.forEach(function (e) {
                e.setWidth(t)
            })
        }
    },
    sameHeight = function (e) {
        if (!(e == NULL || e.length < 2)) {
            var t = e[0].getHeight();
            e.forEach(function (e) {
                e.setHeight(t)
            })
        }
    },
    // 背景图片
    loadImage = function (e) {
        // $.post("server/getbackground.ashx", {}, function (t) {
        var a = t = ["background.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg"],
            n = new ht.DataModel,
            i = null,
            o = 0,
            r = 0,
            l = Math.floor(5);
        a.forEach(function (e) {
            (i = new ht.Node).setName(e),
                i.setImage("images/background/" + e),
                i.s("select.color", "blue"),
                i.setWidth(120),
                i.setHeight(80),
                i.setStyle("label.max", 150),
                i.setPosition(160 * (o + .5),
                    110 * (r + .5)),
                ++o >= l && (o %= l, r++),
                n.add(i)

        });
        var d = new ht.graph.GraphView(n);
        d.handleScroll = function (e, t) {
            this.translate(0, t, !1),
                e.preventDefault(),
                e.stopPropagation()
        },
            // 设置节点可拖拽，场景不可拖拽
            d.adjustTranslateX = function (e) {
                return 0
            },
            d.adjustTranslateY = function (e) {
                return e < 0 ? e : 0
            },

            d.setMovableFunc(function () {
                return !1
            });
        var s = new ht.widget.Dialog,
            c = new ht.widget.ContextMenu;

        c.addTo(s.getView()),
            c.setItems([]),
            s.setConfig({
                title: "背景图形列表",
                width: 800,
                height: 550,
                closable: !0,
                draggable: !0,
                resizeMode: "wh",
                maximizable: !0,
                content: d,
                buttons: [{
                    label: "确定",
                    action: function (t, a) {
                        var i = n.getSelectionModel().getFirstData();
                        i && e(i),
                            s.hide()
                    }
                }, {
                    label: "取消",
                    action: function (e, t) {
                        s.hide()
                    }
                }],
                buttonsAlign: "right",
                action: function (e, t) {
                }
            }),
            s.addEventListener(function (e) {
                if ("endResize" == e.kind || "restore" == e.kind || "maximize" == e.kind) {
                    var t = s._config.width;
                    s._config.height;
                    "maximize" == e.kind && (t = window.innerWidth),
                        l = Math.floor(t / 160),
                        r = 0,
                        o = 0,
                        n.each(function (e) {
                            e.setPosition(160 * (o + .5), 110 * (r + .5)),
                                ++o >= l && (o %= l, r++)
                        })
                }
            }),
            d.onDataDoubleClicked = function (t) {
                e(t),
                    s.hide()
            },
            s.show()
        // })
    },
    setBackground = function () {
        loadImage(function (e) {
            drawBackground(e.getImage())
        })
    },
    drawBackground = function (e) {
        var t = new Image;
        t.src = e,
            t.onload = function (a) {
                var n = dataModel.getDataByTag("background");
                n && dataModel.remove(n);
                var i = new ht.Node;
                i.setImage(e);
                // var o = t.width, 
                //     r = t.height;
                var o = 600,
                    r = 300;
                i.setWidth(o),
                    i.setHeight(r),
                    i.setPosition(.5 * o, .5 * r),
                    i.setLayer("backgroundLayer"),
                    i.setTag("background"),
                    i.setStyle("label.opacity", 0),
                    i.setStyle("2d.selectable", !1),
                    i.setStyle("2d.movable", !1),
                    i.setStyle("2d.editable", !1),
                    dataModel.add(i),
                    initMenu()
                // console.log(i)
            }
    },
    lockBackground = function (e) {
        var t = dataModel.getDataByTag("background");
        t.setStyle("2d.selectable", e),
            t.setStyle("2d.movable", e),
            t.setStyle("2d.editable", e)
    },
    isBackgroundLocked = function () {
        var e = dataModel.getDataByTag("background");
        return !!e && !e.getStyle("2d.selectable")
    },
    setBackgroundColor = function () {
        var e = new ht.DataModel,
            t = new ht.Data;
        t.a("background", g2d.getView().style.backgroundColor),
            e.add(t),
            e.sm().setSelection([t]);
        var a = new ht.widget.PropertyView(e);
        a.setIndent(0),
            a.setRowHeight(30),
            a.setSelectRowIndex(0),
            a.setProperties([{
                name: "background",
                displayName: "背景颜色",
                valueType: "color",
                accessType: "attr",
                editable: !0,
                formatValue: function (e) {
                    return e || "#FFFFFF"
                }
            }]);
        var n = new ht.widget.Dialog
        // i = new ht.widget.ContextMenu;
        // i.addTo(n.getView()),
        // i.setItems([]),
        n.setConfig({
            title: "背景颜色设置",
            width: 280,
            height: 111,
            closable: !0,
            draggable: !0,
            content: a,
            contentPadding: 10,
            background: "#D9D9D9",
            buttons: [{
                label: "OK",
                action: function (e, a) {
                    g2d.getView().style.backgroundColor = t.a("background"),
                        dataModel.setAttr("background", t.a("background")),
                        n.hide()
                }
            }],
            buttonsAlign: "right",
            action: function (e, t) {
            }
        }),
            n.show()
    },
    loadImageControl = function (e) {
        $.post("server/getimagecontrol.ashx", {}, function (t) {
            var a = null,
                n = t,
                i = new ht.DataModel,
                o = null,
                r = 0,
                l = 0,
                d = Math.floor(800 / 120),
                s = new ht.Text;
            s.setName("目录列表:"),
                s.setPosition(s.getWidth() / 2,
                    s.getHeight() / 2),
                s.setStyle("2d.selectable", !1),
                s.setStyle("2d.movable", !1),
                s.setStyle("2d.editable", !1),
                i.add(s);
            var c = new ht.ComboboxNode;
            c.setWidth(150),
                c.setHeight(25),
                c.setPosition(140,
                    c.getHeight() / 2 + 2.5),
                c.setItems(n),
                c.setSelectedIndex(0),
                c.setStyle("2d.movable", !1),
                c.setStyle("2d.editable", !1),
                c.s("select.color", "white"),
                i.add(c);
            var g = function (e) {
                $.post("server/getimagefiles.ashx", { dir: e }, function (t) {
                    (a = t).forEach(function (t) {
                        (o = new ht.Node).setName(t),
                            o.setImage("images/control/" + e + "/" + t),
                            o.s("select.color", "blue"),
                            o.setWidth(80), o.setHeight(80),
                            o.setStyle("label.max", 110),
                            o.setPosition(120 * (r + .5), 30 + 110 * (l + .5)),
                            ++r >= d && (r %= d, l++),
                            i.add(o)
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
                }),
                    t.each(function (e) {
                        i.remove(e)
                    }),
                    l = 0,
                    r = 0,
                    g(e)
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
            var f = new ht.widget.Dialog,
                p = new ht.widget.ContextMenu;
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
                        n && (n instanceof ht.ComboboxNode || e(n)),
                            f.hide()
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
                e(t),
                    f.hide()
            }, f.addEventListener(function (e) {
                if ("endResize" == e.kind || "restore" == e.kind || "maximize" == e.kind) {
                    var t = f._config.width;
                    f._config.height;
                    "maximize" == e.kind && (t = window.innerWidth),
                        d = Math.floor(t / 120);
                    var a = new ht.List;
                    i.each(function (e) {
                        e instanceof ht.Text || e instanceof ht.ComboboxNode || a.add(e)
                    }),
                        l = 0,
                        r = 0,
                        a.each(function (e) {
                            e.setPosition(120 * (r + .5), 30 + 110 * (l + .5)), ++r >= d && (r %= d, l++)
                        })
                }
            }),
                f.show()
        })
    },

    selectImageControl = function (e) {
        loadImageControl(function (t) {
            if (e) {
                var a = new Image;
                a.src = t.getImage(),
                    a.onload = function (n) {
                        e && (e.setImage(t.getImage()),
                            e.setWidth(a.width),
                            e.setHeight(a.height),
                            e.setIcon("imgpng"))
                    }
            } else createImage(t.getImage())
        })
    },
    loaduserImageControl = function (e) {
        $.post("server/getuserimage.ashx", {}, function (t) {
            var a = t, n = new ht.DataModel, i = null, o = 0, r = 0, l = Math.floor(800 / 120);
            a.forEach(function (e) {
                (i = new ht.Node).setName(e),
                    i.setImage("images/user/" + e),
                    i.s("select.color", "blue"),
                    i.setWidth(80),
                    i.setHeight(80),
                    i.setStyle("label.max", 110),
                    i.setPosition(120 * (o + .5),
                        110 * (r + .5)),
                    ++o >= l && (o %= l, r++),
                    n.add(i)
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
            var s = new ht.widget.Dialog,
                c = new ht.widget.ContextMenu;
            c.addTo(s.getView()),
                c.setItems([]),
                s.setConfig({
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
                }),
                d.onDataDoubleClicked = function (t) {
                    e(t), s.hide()
                },
                s.addEventListener(function (e) {
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
                }),
                s.show()
        })
    },
    selectuserImageControl = function (e) {
        loaduserImageControl(function (t) {
            if (e) {
                var a = new Image;
                a.src = t.getImage(), a.onload = function (n) {
                    e && (e.setImage(t.getImage()), e.setWidth(a.width), e.setHeight(a.height), e.setIcon("imgpng"))
                }
            } else createImage(t.getImage())
        })
    },

    createMenu = function () {
        var e = function (e) {
            if ("新建..." === e.label) {
                var t = new ht.widget.Dialog,
                    a = new ht.widget.ContextMenu;
                a.addTo(t.getView()),
                    a.setItems([]),
                    t.setConfig({
                        title: "新建",
                        closable: !0,
                        draggable: !0,
                        contentPadding: 5,
                        content: '<div>文件名称:<input name="filename" id="filename" style="font-size: 14px;width:220px;"><br/>边框宽度:<input name="width" id="width" value="1024" style="font-size: 14px;width:50px;"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;边框高度:<input name="height" id="height" value="768" style="font-size: 14px;width:50px;"/><br />文件信息:<textarea id="info" style="font-size: 14px;width:220px;height:120px;"></textarea></div>',
                        buttons: [{
                            label: "确定",
                            action: function (e, a) {
                                t.hide();
                                var n = t.getView().querySelector("#filename").value;
                                n = n.replace(/,/g, ""),
                                    "" != (n = n.replace(/ /g, "")) && $.post("server/jsonfileExist.ashx", { filename: n }, function (e) {
                                        var a = !1;
                                        if (0 == e.length ? a = !0 : confirm("文件已经存在,是否要继续?") && (a = !0), a) {
                                            isnew = !0, updateToolbar();
                                            var i = t.getView().querySelector("#info").value;
                                            HT2dEditor.currScene.id = 0, HT2dEditor.currScene.filename = n, HT2dEditor.currScene.info = i, HT2dEditor.currScene.title = n, HT2dEditor.currScene.headHtml = "", HT2dEditor.currScene.bodyHtml = "",
                                                dataModel.clear(),
                                                toolbar.getItemById("filename").toolTip = n;
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
                    }),
                    t.show()
            }
            else if ("上载图片" == e.label) {
                t = new ht.widget.Dialog;
                window.dialog = t,
                    t.setConfig({
                        title: "上载图片",
                        closable: !0,
                        draggable: !0,
                        contentPadding: 0,
                        width: 400,
                        height: 190,
                        content: '<iframe width="400px" height="190px" name="fm" id="fm" src="uploadFile.html"> '
                    }),
                    t.show()
            } else if ("打开..." === e.label) openFromFile();
            else if ("保存" === e.label) saveScene();
            else if ("复制" === e.label) clip.copy();
            else if ("粘贴" === e.label) clip.paste();
            else if ("全选" === e.label) dataModel.getSelectionModel().selectAll();
            else if ("剪切" === e.label) clip.copy(), (n = dataModel.getSelectionModel().toSelection()).each(function (e) {
                dataModel.remove(e)
            });
            else if ("删除" === e.label) {
                var n = dataModel.getSelectionModel().toSelection();
                n.each(function (e) {
                    dataModel.remove(e)
                })
            }
            else if ("清除" === e.label) dataModel.clear();
            else if ("运行" === e.label) runCurrent();
            else if ("另存为..." === e.label) saveSceneAs();
            else if ("背景图片" === e.label) setBackground();
            else if ("图形控件" == e.label) {
                i = dataModel.getSelectionModel().getFirstData();
                selectImageControl(i ? i : null)
            }
            else if ("用户图形" == e.label) {
                var i = dataModel.getSelectionModel().getFirstData();
                selectuserImageControl(i ? i : null)
            }
            else if ("背景颜色" === e.label) setBackgroundColor();
            else if ("锁定背景" === e.label) lockBackground(!e.selected);
            else if ("撤消" == e.label) historyManager.undo();
            else if ("重做" == e.label) historyManager.redo();
            else if ("标签替换" == e.label) replaceTag();
            else if ("文本替换" == e.label) replaceText()
        },

            // 导航条
            t = [
                {
                    //文件
                    label: "文件",
                    items: [
                        { label: "新建...", action: e },
                        {
                            label: "新窗口", action: function () {
                                window.open("editor.html")
                            }
                        },
                        { label: "打开...", suffix: "Ctrl+1", key: [Key.ctrl, Key.n1], action: e },
                        { label: "保存", suffix: "Ctrl+S", key: [Key.ctrl, Key.s], action: e },
                        { label: "另存为...", action: e },
                        {
                            label: "运行", action: function () {
                                runCurrent()
                            }
                        },
                        {
                            label: "自动保存", action: function () {
                                var e = getinputvalue("输入自动保存周期(30秒-300秒)", (autoSaveInteval / 1e3).toString());
                                if (e) {
                                    var t = parseInt(e);
                                    "number" == typeof t && (isNaN(t) || (t < 30 && (t = 30), t > 300 && (t = 300), autoSaveInteval = 1e3 * t, resettimer()))
                                }
                            }
                        },
                        "separator",
                        { label: "背景图片", action: e },
                        { label: "背景颜色", action: e }
                    ]
                }, {
                    //编辑
                    label: "编辑", items: [{
                        label: "查找对象", suffix: "Ctrl+F", key: [Key.ctrl, Key.f],
                        action: function (e) {
                            showFind()
                        }
                    }, { label: "标签替换", action: e }, {
                        label: "文本替换",
                        action: e
                    }, {
                        label: "上载图片",
                        suffix: "Ctrl+U",
                        key: [Key.ctrl, Key.u],
                        action: e
                    }, { label: "图形控件", action: e }, {
                        label: "用户图形",
                        action: e
                    }, {
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
                            console.log(e)
                            drawGrid = e.selected,
                                g2d.redraw()
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
                                        var a = (e.a("plug") + "." + e.a("id")).toUpperCase(),
                                            n = new ht.Node;
                                        if (n.setImage("TagValue"), n.a("tagname", a), "" != e.a("desc") && n.a("ToolTip", e.a("desc")), n.setWidth(80), "Boolean" == e.a("type")) n.a("tagvalue", "False");
                                        else if ("String" == e.a("type")) n.a("tagvalue", e.a("id"));
                                        else if (e.a("unit") && n.a("unit", e.a("unit")), e.a("digcount")) {
                                            var i = e.a("digcount");
                                            n.a("digcount", i);
                                            for (var o = "0.", r = 0; r < i; r++) o += "0";
                                            n.a("tagvalue", o)
                                        } else n.a("tagvalue", "0");
                                        n.setTag(a);
                                        var l = rulerFrame.getComponentViewRect(g2d);
                                        n.setPosition(l.x + 80, l.y + t),
                                            t += 30,
                                            n.setLayer("nodeLayer"),
                                            dataModel.add(n),
                                            dataModel.sm().as(n)
                                    }
                                })
                            })
                        }
                    }, {
                        label: "统计使用标签",
                        action: function () {
                            showAllTags()
                        }
                    }]
                }, {
                    // 扩展
                    label: "扩展", items: [{
                        label: "JustGage仪表",
                        action: function () {
                            getInput("输入控件名称", "myjustgage", function (e) {//e指input的value值
                                if (e && "" != e) {
                                    var t = (new Date).toLocaleTimeString();//"下午3:34:28"转换为这样的北京时间格式
                                    $.get("wizard/justgage.js?t=" + t, function (t) {
                                        var a = new ht.Script;
                                        a.a("html", !0),
                                            a.setName("justgage"),
                                            a.setTag(e),
                                            a.a("type", "初始化脚本"),
                                            a.a("script", t.replace(new RegExp("myjustgage", "g"), e)), //a.a(script)得到转换为自己设置的脚本名字后的脚本
                                            a.setLayer("nodeLayer");
                                        var n = rulerFrame.getComponentViewRect(g2d);//获得component的可视范围

                                        a.setWidth(200),
                                            a.setHeight(200),
                                            a.setPosition(n.x + 200, n.y + 200),
                                            dataModel.add(a),
                                            dataModel.sm().cs(), //clearSelection()取消所有选中对象，简写为cs
                                            dataModel.sm().as(a)//appendSelection(datas)加选中对象，参数可为单个对象，也可为ht.List或Array数组，简写为as
                                    }, "text"),
                                        addjustgage()
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
                        label: "高级右键菜单",
                        action: function () {
                            var e = (new Date).toLocaleTimeString();
                            $.get("wizard/contextmenu.js?t=" + e,
                                function (e) {
                                    var t = new ht.Script;
                                    t.setName("高级右键菜单"),
                                        t.a("type", "初始化脚本"),
                                        t.a("script", e),
                                        t.setLayer("nodeLayer");
                                    var a = rulerFrame.getComponentViewRect(g2d);
                                    t.setPosition(a.x + 50, a.y + 80),
                                        dataModel.add(t),
                                        dataModel.sm().cs(),
                                        dataModel.sm().as(t)
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
                                t.setName("文件列表控件"),
                                    t.a("type", "初始化脚本"),
                                    t.a("script", e),
                                    t.setLayer("nodeLayer");
                                var a = rulerFrame.getComponentViewRect(g2d);
                                t.setPosition(a.x + 50, a.y + 100),
                                    dataModel.add(t), dataModel.sm().cs(),
                                    dataModel.sm().as(t)
                            }, "text")
                        }
                    },
                        "separator",
                    {
                        label: "EChart饼图",
                        action: function () {
                            getInput("输入控件名称", "EChart", function (e) {
                                if (e && "" != e) {
                                    var t = (new Date).toLocaleTimeString();
                                    $.get("wizard/pie.js?t=" + t, function (t) {//参数括号t指饼图函数，pie.js      
                                        var a = new ht.Script;
                                        a.setTag(e),
                                            a.a("html", !0),
                                            a.setName("饼图控件"),
                                            a.a("type", "初始化脚本"),
                                            a.a("script", t.replace(new RegExp("myPie", "g"), e)),

                                            a.setLayer("nodeLayer");
                                        var n = rulerFrame.getComponentViewRect(g2d);
                                        a.setWidth(400),
                                            a.setHeight(300),
                                            a.setPosition(n.x + 400, n.y + 300),
                                            dataModel.add(a),
                                            dataModel.sm().cs(),
                                            dataModel.sm().as(a)
                                    }, "text"),
                                        addecharts()
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
                                        a.setTag(e),
                                            a.a("html", !0),
                                            a.setName("柱状图控件"),
                                            a.a("type", "初始化脚本"),
                                            a.a("script", t.replace(new RegExp("myChart", "g"), e)),
                                            a.setLayer("nodeLayer");
                                        var n = rulerFrame.getComponentViewRect(g2d);
                                        a.setWidth(400),
                                            a.setHeight(300),
                                            a.setPosition(n.x + 400, n.y + 300),
                                            dataModel.add(a),
                                            dataModel.sm().cs(),
                                            dataModel.sm().as(a)
                                    }, "text"),
                                        addecharts()
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
                                        a.setTag(e),
                                            a.a("html", !0),
                                            a.setName("仪表盘"),
                                            a.a("type", "初始化脚本"),
                                            a.a("script",
                                                t.replace(new RegExp("myGuage", "g"), e)),
                                            a.setLayer("nodeLayer");
                                        var n = rulerFrame.getComponentViewRect(g2d);
                                        a.setWidth(400),
                                            a.setHeight(300),
                                            a.setPosition(n.x + 400, n.y + 300),
                                            dataModel.add(a),
                                            dataModel.sm().cs(),
                                            dataModel.sm().as(a)
                                    }, "text"),
                                        addecharts()
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
                                        a.setTag(e),
                                            a.a("html", !0),
                                            a.setName("实时趋势控件"),
                                            a.a("type", "初始化脚本"),
                                            a.a("script", t.replace(new RegExp("myEchart", "g"), e)),
                                            a.setLayer("nodeLayer");
                                        var n = rulerFrame.getComponentViewRect(g2d);
                                        a.setWidth(600),
                                            a.setHeight(400),
                                            a.setPosition(n.x + 400, n.y + 300),
                                            dataModel.add(a),
                                            dataModel.sm().cs(),
                                            dataModel.sm().as(a)
                                    }, "text"),
                                        addecharts()
                                }
                            })
                        }
                    }]
                }, {
                    // 帮助
                    label: "帮助", items: [{
                        label: "关于",
                        action: function () {
                            mydialog = new ht.widget.Dialog,
                                mydialog.setConfig({
                                    title: "南京紫图科技有限公司承制",
                                    closable: !0,
                                    draggable: !0,
                                    width: 300,
                                    height: 180,
                                    contentPadding: 0,
                                    content: `<div style="font-size:14px;background:#FFFFFF;">
                                            <p>   	
                                                欢迎来电垂询基于微软、安卓手机版操作系统的动力环境集中监控系统，随时随地监控您的IT机房！      
                                                <br/>
                                                <br/>
                                                <a href="http://www.zitu.cn/">南京紫图科技有限公司</a> 
                                                tel:13260833921
                                                <br/><br/>
                                            <p>
                                        </div>`,
                                    buttons: [{
                                        label: "关闭", action: function (e, t) {
                                            mydialog.hide()
                                        }
                                    }],
                                    buttonsAlign: "right"
                                }),
                                mydialog.show()
                        }
                    }, {
                        label: "主页",
                        href: "http://www.zitu.cn",
                        linkTarget: "_blank",
                        preventDefault: !1
                    }]
                }
            ];

        // layermenu视图显示层下面的菜单
        layermenu = { label: "显示层", items: [] };
        var a = t[2];//t指导航条，下拉选中索引为2的
        // console.log(a)
        layers.forEach(function (e) {
            // console.log(e)
            layersView[e] = !0,
                layermenu.items.push({
                    label: e,
                    type: "check",
                    selected: !0,
                    action: function (e) {
                        console.log(e)//自身
                        layersView[e.label] = e.selected,
                            treeView.invalidateModel(),
                            g2d.iv()
                    }
                })
        }),
            a.items.push(layermenu);
        var n = window.menu = new ht.widget.Menu(t);
        // console.log(n)
        return n.enableGlobalKey(), n
    },
    initMenu = function () {
    },
    saveLocal = function (e) {
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
            },
                r = JSON.stringify(o),
                l = (new Date).toLocaleString();
            localStorage.setItem(e.filename + "-" + l, r)
        }
    },
    saveScene = function (e, t) {//toobal保存  e:当前保存的这个文档    
        if (e || (e = HT2dEditor.currScene), "" != e.filename) {
            if (!saving) {
                saving = !0;
                var a = "";
                dataModel.each(function (e) {
                    console.log(e.a("param"))
                    e instanceof ht.LinkImg && e.a("filename") && ("" == a ? (a = e.a("filename"), e.a("param") && (a += ":" + e.a("param"))) : (a += "," + e.a("filename"), e.a("param") && (a += ":" + e.a("param"))))
                }),
                    e.links = a;
                var n = dataModel.serialize(0), //n序列化结果

                    i = {
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
                    var t = new ht.widget.Dialog,
                        a = new ht.widget.ContextMenu;
                    a.addTo(t.getView()),
                        a.setItems([]),
                        t.setConfig({
                            title: "信息",
                            closable: !0,
                            draggable: !0,
                            contentPadding: 10,
                            height: 100,
                            content: '<div id="content">' + e.message + "</div>",
                            buttons: [{ label: "OK" }],
                            buttonsAlign: "right",
                            action: function (e, a) {
                                t.hide(),
                                    isnew = !1,
                                    saving = !1,
                                    updateToolbar(),
                                    resettimer()
                            }
                        }),
                        t.show()
                }, "json"),
                    console.log(t)
                t && t()
            }
        } else saveSceneAs()
    },
    runCurrent = function () {
        var e = HT2dEditor.currScene.filename;
        "" != e && window.open("runview.aspx?filename=" + encodeURIComponent(e))
    },
    saveSceneAs = function () {
        if (!saving) {
            var e = new ht.widget.Dialog,
                t = new ht.widget.ContextMenu;
            t.addTo(e.getView()),
                t.setItems([]),
                e.setConfig({
                    title: "另保存",
                    closable: !0,
                    draggable: !0,
                    contentPadding: 5,
                    content: '<div>文件名称:<input id="filename" style="font-size:14px;width:220px;"/><br />文件信息:<textarea id="info" style="font-size: 14px;width:218px;height:120px;">' + HT2dEditor.currScene.info + "</textarea></div>",
                    buttons: [{
                        label: "确定",
                        action: function (t, a) {
                            var n = e.getView().querySelector("#filename").value;
                            n = n.replace(/,/g, ""), n = n.replace(/ /g, "");
                            var i = e.getView().querySelector("#info").value;
                            e.hide(),
                                "" != n && $.post("server/jsonfileExist.ashx", { filename: n }, function (e) {
                                    var t = !1;
                                    0 == e.length ? t = !0 : confirm("文件已经存在是否确定覆盖文件?") && (t = !0), t && (HT2dEditor.currScene.id = 0,
                                        HT2dEditor.currScene.filename = n,
                                        HT2dEditor.currScene.info = i,
                                        toolbar.getItemById("filename").toolTip = n,
                                        saving = !1,
                                        saveScene(),
                                        isnew = !1,
                                        updateToolbar())
                                })
                        }
                    }, {
                        label: "取消",
                        action: function (t, a) {
                            e.hide()
                        }
                    }],
                    buttonsAlign: "right"
                }),
                e.onShown = function () {
                    var e = $("#filename");
                    if (e) {
                        var t = HT2dEditor.currScene.filename;
                        "" == t ? e.val("newfile") : e.val(t + "1")
                    }
                },
                e.onHidden = function () {
                },
                e.show()
        }
    },
    //文件- 打开里调用
    openFromFile = function () {
        showLoading(),
            $.post("server/getjsonFiles.ashx", {}, function (e) {
                var t = new ht.widget.Toolbar,
                    a = new ht.widget.BorderPane;

                var n = new ht.DataModel,
                    i = new ht.widget.TablePane(n);

                a.setTopView(t);
                a.setCenterView(i),
                    n.getSelectionModel().setSelectionMode("single"),
                    i.addColumns([{
                        name: "name",
                        width: 250,
                        displayName: "文件名称",
                        accessType: "attr",
                        align: "left"
                    }, {
                        name: "time",
                        width: 150,
                        displayName: "修改时间",
                        accessType: "attr",
                        align: "left"
                    }, {
                        name: "size",
                        width: 80,
                        displayName: "尺寸",
                        accessType: "attr",
                        align: "left"
                    }]),
                    // console.log(e)
                    e.forEach(function (e) {
                        var t = new ht.Data;
                        t.a({
                            name: e.name,
                            time: e.time,
                            size: e.size
                        }),
                            n.add(t)
                    });
                var o = i.getTableHeader();
                o.setColumnLineColor("#C8C8C8"),
                    o.setInsertColor("#6DCDF3"),
                    o.getLabelFont = function (e) {
                        return "bold 12px Arial"
                    },
                    o.getView().style.background = "#F1F1F1";
                var r = i.getTableView();
                r.setSelectBackground("#E1E1E1"),
                    r.setRowLineColor("#EDEDED"),
                    r.setColumnLineVisible(!1),
                    r.setRowHeight(22),
                    r.setAutoHideScrollBar(!1),
                    r.drawRowBackground = function (e, t, a, n, i, o, r) {
                        e.fillStyle = a ? "#87A6CB" : "#FAFAFA",
                            e.beginPath(),
                            e.rect(n, i, o, r),
                            e.fill()
                    },
                    t.setItems([{
                        id: "text",
                        label: "筛选",
                        icon: "images/search.png",
                        unfocusable: !0,
                        textField: { width: 200 }
                    }]),
                    t.getView().style.background = "#F1F1F1";
                var l = t.getItemById("text").element;
                l.getElement().onkeyup = function (e) {
                    27 === e.keyCode && (l.getElement().value = ""),
                        r.invalidateModel()
                },
                    r.isVisible = function (e) {
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
                        label: "新窗口打开",
                        action: function (e, t) {
                            var a = n.getSelectionModel().getFirstData();
                            a && (window.open("editor.aspx?filename=" + a.a("name")), d.hide())
                        }
                    }, {
                        label: "打开",
                        action: function (e, t) {
                            var a = n.getSelectionModel().getFirstData();
                            a && openFile(a.a("name")), d.hide()
                        }
                    }, {
                        label: "取消",
                        action: function (e, t) {
                            d.hide()
                        }
                    }],
                    buttonsAlign: "right"
                });
                var s = new ht.widget.ContextMenu;
                s.addTo(d.getView()), s.setItems([]),
                    r.onDataDoubleClicked = function (e) {
                        openFile(e.a("name")),
                            d.hide()
                    },
                    hideLoading(),
                    d.show()
            }, "json")
    },
    openFile = function (e) {
        dataModel.clear(),
            dataModel.a("background", ""),
            g2d.getView().style.backgroundColor = "",
            $.post("server/load.ashx", { filename: e }, function (t) {
                t.json && (t.id > 0 ? (HT2dEditor.currScene.id = t.id || 0, HT2dEditor.currScene.info = t.info || "",
                    HT2dEditor.currScene.headHtml = t.headHtml || "",
                    HT2dEditor.currScene.bodyHtml = t.bodyHtml || "",
                    HT2dEditor.currScene.dataRate = t.dataRate || 1e3,
                    HT2dEditor.currScene.animRate = t.animRate || 500,
                    HT2dEditor.currScene.autoSize = t.autoSize || !1,
                    HT2dEditor.currScene.title = t.title || "",
                    HT2dEditor.currScene.isPannable = t.isPannable,
                    HT2dEditor.currScene.isMovable = t.isMovable,
                    HT2dEditor.currScene.zoomMax = t.zoomMax,
                    HT2dEditor.currScene.zoomMin = t.zoomMin,
                    dataModel.deserialize(t.json),
                    g2d.getView().style.backgroundColor = dataModel.a("background") || "#FFFFFF",
                    HT2dEditor.currScene.filename = e || "",
                    toolbar.getItemById("filename").toolTip = e,
                    isnew = !1,
                    updateToolbar(),
                    resettimer()) : (HT2dEditor.currScene.filename = "",
                        toolbar.getItemById("filename").toolTip = "",
                        isnew = !0,
                        updateToolbar()))
            }, "json")
    },
    // 厂站号-设备号-信号
    showTagsDialog = function (e, t) {
        // console.log(serverTags)
        serverTags ? callTagsDialog(e, t) :
            (showLoading(),
                $.post("https://www.easy-mock.com/mock/5b06298aa5fec41287e785e8/hightopo/pipe/station", {
                    rows: _rows,
                    page: _scurrentPage
                },
                    function (a) {
                        serverTags = a,
                            _spagecount = a.pagecount,
                            callTagsDialog(e, t),
                            hideLoading()
                    }, "json"))
    },

    // 处理所得的数据
    callTagsDialog = function (e, t) {
        var r = serverTags.station;
        var newstation = [],
            newequipments = [],
            newsignal = [];
        r.forEach(function (e) {
            $.each(e, function (name, value) {
                "equipments" == name && value.map(function (item) {
                    var obj = {
                        station_id: e.station_id,
                        equipments: item,
                    }
                    newequipments.push(obj);
                    var obj1 = {
                        station_id: e.station_id,
                        equipment_id: item.equipment_id,
                        signal: item.signals
                    }
                    newsignal.push(obj1)
                })
            });
            newstation.push(e);
        });
        console.log(newstation, newequipments, newsignal)
        serverTags.total = newstation.length
        if (serverTags && serverTags.total > 0) {
            n = new ht.widget.BorderPane;
            var i = new ht.DataModel,
                o = new ht.widget.TablePane(i);
            n.setCenterView(o);
            // 分情况
            if (stationconfig) {
                // 
                var a = new ht.widget.Toolbar([
                    {
                        id: "station",
                        label: "厂站号:",
                        icon: "images/search.png",
                        unfocusable: !0,
                        textField: { width: 100 }
                    }
                ])
                // 
                o.addColumns(
                    [{
                        name: "index",
                        width: 50,
                        displayName: "序号",
                        accessType: "attr",
                        align: "left",
                        valueType: "number"
                    },
                    {
                        name: "station",
                        width: 150,
                        displayName: "厂站号",
                        accessType: "attr",
                        align: "left"
                    }
                    ])
                // 
                var c = a.getItemById("station").element;
                c.getElement().onkeyup = function (e) {
                    27 === e.keyCode && (c.getElement().value = ""),
                        s.invalidateModel()
                };
            } else if (equipmentconfig) {
                var a = new ht.widget.Toolbar([
                    {
                        id: "faci",
                        label: "设备号:",
                        icon: "images/search.png",
                        unfocusable: !0,
                        textField: { width: 100 }
                    }
                ])

                o.addColumns(
                    [{
                        name: "index",
                        width: 50,
                        displayName: "序号",
                        accessType: "attr",
                        align: "left",
                        valueType: "number"
                    },
                    {
                        name: "faci",
                        width: 150,
                        displayName: "设备号",
                        accessType: "attr",
                        align: "left"
                    }
                    ])

                var g = a.getItemById("faci").element;
                g.getElement().onkeyup = function (e) {
                    27 === e.keyCode && (g.getElement().value = ""),
                        s.invalidateModel()
                };

            } else if (signalconfig) {
                var a = new ht.widget.Toolbar([
                    {
                        id: "signal",
                        label: "信号:",
                        icon: "images/search.png",
                        unfocusable: !0,
                        textField: { width: 100 }
                    }
                ])

                o.addColumns(
                    [{
                        name: "index",
                        width: 50,
                        displayName: "序号",
                        accessType: "attr",
                        align: "left",
                        valueType: "number"
                    },
                    {
                        name: "signal",
                        width: 150,
                        displayName: "信号",
                        accessType: "attr",
                        align: "left"
                    }
                    ])
                var u = a.getItemById("signal").element;
                u.getElement().onkeyup = function (e) {
                    27 === e.keyCode && (u.getElement().value = ""),
                        s.invalidateModel()
                };
            } else {
                var a = new ht.widget.Toolbar;
                a.setItems([{
                    id: "seach",
                    label: "厂站号-设备号-信号:",
                    icon: "images/search.png",
                    unfocusable: !0,
                    textField: { width: 165, value: "" }
                }]);

                o.addColumns([
                    {
                        name: "index",
                        width: 40,
                        displayName: "序号",
                        accessType: "attr",
                        align: "left",
                        valueType: "number"
                    },
                    {
                        name: "station",
                        width: 160,
                        displayName: "厂站号",
                        accessType: "attr",
                        align: "left"
                    },
                    {
                        name: "faci",
                        width: 110,
                        displayName: "设备号",
                        accessType: "attr",
                        align: "left"
                    },
                    {
                        name: "signal",
                        width: 90,
                        displayName: "信号",
                        accessType: "attr",
                        align: "left"
                    }
                ]);
                var u = a.getItemById("seach").element;
                u.getElement().onkeyup = function (e) {
                    console.log(r)
                    27 === e.keyCode && (l.getElement().value = ""),
                        s.invalidateModel()//invalidateModel()该函数触发组件重新排序过滤加载数据，一般组件会自动调用，除非数据变化但未派发事件时才需强制调用
                };
            }

            n.setTopView(a);
            t ? i.getSelectionModel().setSelectionMode("single") : i.getSelectionModel().setSelectionMode("multiple"),


                l = (_scurrentPage - 1) * _rows + 1;

            // createLocalTags(i); //添加故障，安全，历史模式

            if (stationconfig) {
                // 展示在tab中
                newstation.forEach(function (e) {
                    var t = browser_createTag(l, e);
                    l++ ,
                        i.add(t);
                });
            } else if (equipmentconfig) {
                var checkEquiArray = []
                newequipments.forEach(function (e) {
                    if (e.station_id == checkStation) {
                        checkEquiArray.push(e.equipments)
                    }
                });

                checkEquiArray.forEach(function (e) {
                    var t = browser_createTag(l, e);
                    l++ ,
                        i.add(t);
                })

            } else if (signalconfig) {
                newsignal.forEach(function (e) {
                    if (e.station_id == checkStation) {
                        if (e.equipment_id == checkEquipment) {
                            e.signal.map(function (item) {
                                var t = browser_createTag(l, item);
                                l++ ,
                                i.add(t);
                            })
                        }
                    }
                })
            } else {
                var g = 1;
                $.post('https://www.easy-mock.com/mock/5b06298aa5fec41287e785e8/hightopo/pipe/current_value', { info: 'info' }, function (result) {
                    result.map(function (e) {
                        var t = new ht.Data;
                        t.a({
                            index: g,
                            station: e.station_name,
                            faci: e.equipment_name,
                            signal: e.signal_name
                        }),
                            g++ ,
                            i.add(t)
                    })
                })
            }

            var d = o.getTableHeader();
            d.setColumnLineColor("#C8C8C8"),
                d.setInsertColor("#6DCDF3"),
                d.getLabelFont = function (e) {
                    return "bold 12px Arial"
                },
                d.getView().style.background = "#F1F1F1";
            var s = o.getTableView();
            s.setSelectBackground("#E1E1E1"),
                s.setRowLineColor("#EDEDED"),
                s.setColumnLineVisible(!1),
                s.setRowHeight(22),
                s.setAutoHideScrollBar(!1),
                s.drawRowBackground = function (e, t, a, n, i, o, r) {
                    e.fillStyle = a ? "#87A6CB" : "#FAFAFA",
                        e.beginPath(),
                        e.rect(n, i, o, r),
                        e.fill()
                },
                a.getView().style.background = "#E1E1E1";

            // 分情况过

            s.isVisible = function (e) {
                if (stationconfig) {
                    if (e.isEmpty()) {
                        var y = a.v("station"),
                            o = !0;
                        var l = e.a("station") && e.a("station").toLowerCase().indexOf(y.toLowerCase()) >= 0;
                        o && "" != t && (o = l)
                    }
                    return o
                }
                if (equipmentconfig) {
                    if (e.isEmpty()) {
                        var y = a.v("faci"),
                            o = !0;
                        var m = e.a("faci") && e.a("faci").toLowerCase().indexOf(y.toLowerCase()) >= 0;

                        o && "" != t && (o = m)
                    }
                    return o
                }
                if (signalconfig) {
                    if (e.isEmpty()) {
                        var y = a.v("signal"),
                            o = !0;

                        var n = e.a("signal") && e.a("signal").toLowerCase().indexOf(y.toLowerCase()) >= 0;

                        o && "" != t && (o = n)

                    }
                    return o
                } else {
                    if (e.isEmpty()) {
                        var y = a.v("seach"),
                            o = !0;
                        var l = e.a("station") && e.a("station").toLowerCase().indexOf(y.toLowerCase()) >= 0;
                        var m = e.a("faci") && e.a("faci").toLowerCase().indexOf(y.toLowerCase()) >= 0;
                        var n = e.a("signal") && e.a("signal").toLowerCase().indexOf(y.toLowerCase()) >= 0;

                        o && "" != t && (o = l || m || n)

                    }
                    return o
                }
            }
            var m = "(" + _scurrentPage + "/" + _spagecount + ")",
                f = new ht.widget.Dialog;
            f.setConfig({
                title: "标签浏览器" + m,
                width: 500,
                height: 450,
                closable: !0,
                draggable: !0,
                resizeMode: "wh",
                content: n,
                maximizable: !0,
                buttons: [
                    {
                        label: "上一页",
                        action: function (e, t) {
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
                            }, "json")),
                                _scurrentPage < _spagecount && (w._background = "rgb(231, 76, 60)", w._selectBackground = "rgb(196, 65, 51)", w.iv()),
                                1 == _scurrentPage && (h._background = "rgb(128, 128, 128)", h._selectBackground = "rgb(128, 128, 128)")
                        }
                    }, {
                        label: "下一页",
                        action: function (e, t) {
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
                            }, "json")),
                                _scurrentPage == _spagecount && (w._background = "rgb(128, 128, 128)", w._selectBackground = "rgb(128, 128, 128)"),
                                _scurrentPage > 1 && (h._background = "rgb(231, 76, 60)", h._selectBackground = "rgb(196, 65, 51)", h.iv())
                        }
                    }, {
                        label: "重新加载",
                        action: function (e, t) {
                            reload(function (e) {
                                0 == e.id ? (i.clear(), _scurrentPage = 1, $.post("https://www.easy-mock.com/mock/5b06298aa5fec41287e785e8/hightopo/pipe/station", {
                                    rows: _rows,
                                    page: _scurrentPage
                                }, function (e) {
                                    serverTags = e,
                                        _spagecount = e.pagecount;
                                    var t = serverTags.rows,
                                        a = 1;
                                    createLocalTags(i),
                                        t.forEach(function (e) {
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
                                n && e(n);
                                var s = i.getSelectionModel().getLastData().a('station_id')
                                var t = i.getSelectionModel().getLastData().a('faci_id')
                                var p = i.getSelectionModel().getLastData().a('signal_id')
                                console.log(i.getSelectionModel().getLastData())
                                if (stationconfig) {
                                    s ? checkStation = s : ''
                                }

                                if (equipmentconfig) {
                                    t ? checkEquipment = t : ''
                                }

                                if (signalconfig) {
                                    p ? checkSignal = p : ''
                                }

                            }
                        }
                    }, {
                        label: "取消", action: function (e, t) {
                            f.hide()
                            stationconfig = false;
                            equipmentconfig = false;
                            signalconfig = false;
                        }
                    }],
                buttonsAlign: "right",
            });
            // 消失回调，让分类的配置3个都为false，这样视图-标签浏览器就可以全部显示
            f.onHidden = function () {
                stationconfig = false;
                equipmentconfig = false;
                signalconfig = false;
            }

            var p = new ht.widget.ContextMenu;
            p.addTo(f.getView()),
                p.setItems([]),
                s.onDataDoubleClicked = function (t) {
                    if (f.hide(), e) {
                        var a = new ht.List;
                        a.add(t), e(a)
                    }
                },
                f.onShown = function () {
                    a.redraw()
                };
            var h = f.$42d[0],
                w = f.$42d[1],
                b = f.$42d[2];
            "" == username && (b._background = "rgb(128, 128, 128)", b._selectBackground = "rgb(128, 128, 128)"), h._background = "rgb(128, 128, 128)",
                h._selectBackground = "rgb(128, 128, 128)",
                f.show()
        }
    };
function browser_createTag(e, t) {
    var a = new ht.Data;
    stationconfig && a.a({ index: e, station: t.station_name, station_id: t.station_id });
    equipmentconfig && a.a({ index: e, faci: t.equipment_name, faci_id: t.equipment_id });
    signalconfig && a.a({ index: e, signal: t.signal_name, signal_id: t.signal_id });
    return a
}
selectFileName = function (e) {
    showLoading(),
        $.post("server/getjsonFiles.ashx", {}, function (t) {
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
            }]), t.forEach(function (e) {
                var t = new ht.Data;
                t.a({ name: e.name, time: e.time, size: e.size }), i.add(t)
            });
            var r = o.getTableHeader();
            r.setColumnLineColor("#C8C8C8"),
                r.setInsertColor("#6DCDF3"),
                r.getLabelFont = function (e) {
                    return "bold 12px Arial"
                },
                r.getView().style.background = "#F1F1F1";
            var l = o.getTableView();
            l.setSelectBackground("#E1E1E1"),
                l.setRowLineColor("#EDEDED"),
                l.setColumnLineVisible(!1),
                l.setRowHeight(22),
                l.setAutoHideScrollBar(!1),
                l.drawRowBackground = function (e, t, a, n, i, o, r) {
                    e.fillStyle = a ? "#87A6CB" : "#FAFAFA",
                        e.beginPath(),
                        e.rect(n, i, o, r),
                        e.fill()
                },
                a.setItems([{
                    id: "text",
                    label: "筛选",
                    icon: "images/search.png",
                    unfocusable: !0,
                    textField: { width: 200 }
                }]),
                a.getView().style.background = "#F1F1F1";
            var d = a.getItemById("text").element;
            d.getElement().onkeyup = function (e) {
                27 === e.keyCode && (d.getElement().value = ""),
                    l.invalidateModel()
            },
                l.isVisible = function (e) {
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
            c.addTo(s.getView()),
                c.setItems([]),
                hideLoading(),
                s.show()
        }, "json")
},
    selectParamName = function (e) {
        showLoading(),
            $.post("server/getParamFiles.ashx", {}, function (t) {
                var a = new ht.widget.Toolbar,
                    n = new ht.widget.BorderPane;
                n.setTopView(a);
                var i = new ht.DataModel,
                    o = new ht.widget.TablePane(i);
                n.setCenterView(o),
                    i.getSelectionModel().setSelectionMode("single"),
                    o.addColumns([
                        {
                            name: "name",
                            width: 200,
                            displayName: "文件名称",
                            accessType: "attr",
                            align: "left"
                        },
                        { name: "desc", width: 200, displayName: "描述", accessType: "attr", align: "left" }
                    ]),
                    t.forEach(function (e) {
                        var t = new ht.Data;
                        t.a({ name: e.name, desc: e.desc }), i.add(t)
                    });
                var r = o.getTableHeader();
                r.setColumnLineColor("#C8C8C8"),
                    r.setInsertColor("#6DCDF3"),
                    r.getLabelFont = function (e) {
                        return "bold 12px Arial"
                    },
                    r.getView().style.background = "#F1F1F1";
                var l = o.getTableView();
                l.setSelectBackground("#E1E1E1"),
                    l.setRowLineColor("#EDEDED"),
                    l.setColumnLineVisible(!1),
                    l.setRowHeight(22),
                    l.setAutoHideScrollBar(!1),
                    l.drawRowBackground = function (e, t, a, n, i, o, r) {
                        e.fillStyle = a ? "#87A6CB" : "#FAFAFA",
                            e.beginPath(),
                            e.rect(n, i, o, r), e.fill()
                    }, a.setItems([{
                        id: "text",
                        label: "筛选",
                        icon: "images/search.png",
                        unfocusable: !0,
                        textField: { width: 200 }
                    }]),
                    a.getView().style.background = "#F1F1F1";
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
    }
