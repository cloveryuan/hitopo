var NodeOperationInteractor = function (graphView) {
    NodeOperationInteractor.superClass.constructor.call(this, graphView);
    this.jsonSerializer = new ClipboardJSONSerializer(graphView.dm());
};

ht.Default.def(NodeOperationInteractor, ht.graph.Interactor, {
    setUp: function() {
        var self = this,
            gv = self.gv;
        NodeOperationInteractor.superClass.setUp.call(self);
        gv.addTopPainter(self);
    },
    tearDown: function() {
        var self = this,
            gv = self.gv;
        NodeOperationInteractor.superClass.tearDown.call(self);
        gv.removeTopPainter(self);
    },
    draw : function() {},
    handle_keydown: function(e) {
        var self = this,
            gv = self.gv,
            keyCode = e.keyCode;
        if (ht.Default.isCtrlDown(e)) {
            if (keyCode === 67) {//C=67
                this.copy();
            } else if (keyCode === 86) {//V=86
                this.paste();
            } else if (e.keyCode == 90) {//ctrl + z
                historyManager.undo();
            } else if (e.keyCode == 89) {//ctrl + y
                historyManager.redo();
            }
        }
    },
    copy: function () {
        var lst = new ht.List();
        var datas = g2d.sm().getSelection();
        datas.each(function (data) {
            if (data instanceof ht.Edge) {
                g2d.sm().rs(data);
                lst.add(data);
            }
        });

        datas = g2d.sm().getSelection();
        if (datas.size() > 0) {
            var self = this,
                jsonString = self.jsonSerializer.serialize();
            self.clipboard = jsonString;
        }
    },
    copyto: function () {
        var lst = new ht.List();
        var datas = g2d.sm().getSelection();
        datas.each(function (data) {
            if (data instanceof ht.Edge) {
                g2d.sm().rs(data);
                lst.add(data);
            }
        });

        var self = this;
        return self.jsonSerializer.serialize();
    },
    save: function () {
        var lst = new ht.List();
        var datas = g2d.sm().getSelection();
        datas.each(function (data) {
            if (data instanceof ht.Edge) {
                g2d.sm().rs(data);
                lst.add(data);
            }
        });

        var self = this,
            jsonString = self.jsonSerializer.serialize();
        if (jsonString && jsonString != "") {
            var v = prompt("请输入保存对象的名称,选定对象将被保存到后台数据库", "control");
            if (v && v != "") {
                $.post("server/savecontrol.ashx", { "name": v, "json": jsonString }, function (data) {
                    if (data.id == 0) {
                        alert(data.message);
                    }
                    else {
                        //data.id v
                        var node = new ht.Node();
                        palette.dm().add(node);
                        node.setName(v);
                        node.setImage('clipobject');
                        node.item = data.id;
                        node.s({
                            'image.stretch': 'centerUniform',
                            'draggable': true
                        });
                        clipGroup.addChild(node);
                    }
                }, "json");
            }
        }
    },
    pastecontrol:function()
    {
        $.post("server/controllist.ashx", {}, function (data) {
            //
            var mytabledataModel = new ht.DataModel();
            var mytable = new ht.widget.TablePane(mytabledataModel);
            mytabledataModel.getSelectionModel().setSelectionMode("single");
            mytable.addColumns([
                {
                    name: 'name',
                    width: 200,
                    displayName: '名称',
                    accessType: 'attr',
                    align: 'left'
                },
                {
                    name: 'time',
                    width: 150,
                    displayName: '修改时间',
                    accessType: 'attr',
                    align: 'left'
                }
            ]);


            var fileList = data;
            fileList.forEach(function (file) {
                var data = new ht.Data();
                data.a({
                    'id':file.id,
                    'name': file.name,
                    'time': file.time
                });
                mytabledataModel.add(data);
            });

            var mytableHeader = mytable.getTableHeader();

            mytableHeader.setColumnLineColor('#C8C8C8');
            mytableHeader.setInsertColor('#6DCDF3');
            mytableHeader.getLabelFont = function (column) { return 'bold 12px Arial' };

            var mytableView = mytable.getTableView();

            mytableView.setSelectBackground('#E1E1E1');
            mytableView.setRowLineColor('#EDEDED');
            mytableView.setColumnLineVisible(false);

            mytableView.setRowHeight(22);
            mytableView.setAutoHideScrollBar(false);
            mytableView.drawRowBackground = function (g, data, selected, x, y, width, height) {
                if (selected) {
                    g.fillStyle = '#87A6CB';
                }
                else {
                    g.fillStyle = '#FAFAFA';
                }
                g.beginPath();
                g.rect(x, y, width, height);
                g.fill();
            };
            mytable.setWidth(350);
            mytable.setHeight(400);
            //
            var fileDialog = new ht.widget.Dialog();
            fileDialog.setConfig({
                title: "选择控件",
                width: 360,
                height: 450,
                closable: true,
                draggable: true,
                content: mytable,
                buttons: [
                    {
                        label: "确定",
                        action: function (item, e) {
                            var d = mytabledataModel.getSelectionModel().getFirstData();
                            if (d) {
                                clip.pastefromjson(d.a("id"));
                            }
                            fileDialog.hide();
                        }
                    },
                        {
                            label: "取消",
                            action: function (item, e) {
                                fileDialog.hide();
                            }
                        }
                ],
                buttonsAlign: "right",
            });
            /*
            mytableView.onDataDoubleClicked = function (data) {
                clip.pastefromjson(data.a("id"));
                fileDialog.hide();
            };*/
            fileDialog.show();

        }, "json");
    },
    // 共享控件创建发起请求
    pastefromjson:function(id)
 
    {
        $.post("server/loadcontrol.ashx", {"id":id}, function (data) {
            if (data.json != "") {
                var rt;
                var gv = clip.gv;
                var datas = clip.jsonSerializer.deserialize(data.json);
                gv.sm().cs();
                var id = ht.Default.getId();
                datas.each(function (data) {
                    if (!rt)
                        rt = data.getRect();
                    else
                        rt = ht.Default.unionRect(rt, data.getRect());

                    data.setTag((data.getTag() || '') + data.getId().toString());
                    var gid = data.s("_groupId");
                    if (gid) data.s("_groupId", id);
                    gv.sm().as(data);
                });
                var posx = rt.x + (rt.width / 2);
                var posy = rt.y + (rt.height / 2);
                gv.moveSelection(lastPt.x - posx, lastPt.y - posy);
                //gv.makeVisible(datas[0]);
            } 
        },"json");
    },
    paste: function () {
        var rt;
        var self = this,
            clipboard = self.clipboard,
            gv = self.gv;
        if (clipboard) {
            var datas = self.jsonSerializer.deserialize(clipboard);
            gv.sm().cs();
            var id = ht.Default.getId();
            var copy = true;
            datas.each(function (data) {                
                //getName()
                if (data.getRect) {
                    copy = false;
                    if (!rt)
                        rt = data.getRect();
                    else {
                        var t = data.getRect();
                        rt = ht.Default.unionRect(rt, t);
                    }
                    data.setTag((data.getTag() || '') + data.getId().toString());
                    var gid = data.s("_groupId");
                    if (gid) data.s("_groupId", id);
                    gv.sm().as(data);
                }
            });
            var posx = rt.x + (rt.width / 2);
            var posy = rt.y + (rt.height / 2);
            gv.moveSelection(lastPt.x - posx, lastPt.y - posy);
            //gv.moveSelection(30, 30);
            if (copy)
               self.copy();
        }
    },
    pastefrom: function (str) {
        var self = this;
        if (str && str!="") {
            var datas = self.jsonSerializer.deserialize(str);
            return datas;
        }
        else
            return null;
    }
});
