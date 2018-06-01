var CreateShapeInteractor = function (graphView, type,isline) {
    CreateShapeInteractor.superClass.constructor.call(this, graphView);
    this._points = new ht.List();
    this._type = type;
    this._line = isline;
};
ht.Default.def(CreateShapeInteractor, ht.graph.Interactor, {
    setUp: function () {
        CreateShapeInteractor.superClass.setUp.call(this);
        this._graphView.addTopPainter(this);
        this._onBackgroundDoubleClicked = this._graphView.onBackgroundDoubleClicked;
        this._graphView.onBackgroundDoubleClicked = function(){};
        this._graphView.sm().cs();
    },
    tearDown: function () {
        CreateShapeInteractor.superClass.tearDown.call(this);
        this._graphView.removeTopPainter(this);
        this._graphView.onBackgroundDoubleClicked = this._onBackgroundDoubleClicked;
    },
    handle_mousedown: function (e) {
        this.handle_touchstart(e);
        drawing = true;
    },
    handle_touchstart: function (e) {
        this.isLeftClick = ht.Default.isLeftButton(e) && ht.Default.getTouchCount(e) === 1;
    },
    handle_mouseup: function (e) {
        this.handle_touchend(e);
    },
    handle_touchend: function (e) {
        var shape,
            graphView = this._graphView;
        if(!graphView._panning && !graphView._pinching && this.isLeftClick){
            this.redraw();
                       
            if (ht.Default.isDoubleClick(e) || ht.Default.isCtrlDown(e)) {
                drawing = false;
                var size = this._points.size();
                if(size > 1){
                    shape = new this._type();
                    shape.setLayer('nodeLayer');
                    //shape.a('modelRule', 'defaultModel');
                    shape.setClosePath(true);
                    if(size == 2){
                        shape.s({
                            'shape.background': null,
                            'shape.border.width': 1
                        });
                    }
                    shape.setPoints(this._points);
                    shape.setParent(graphView.getCurrentSubGraph());
                    graphView.dm().add(shape);
                    graphView.sm().ss(shape);
                    this._points = new ht.List();
                    this._movePoint = null;
                }else{
                    this._points.clear();
                }
                this._movePoint = null;
            } else {
                var pt = graphView.getLogicalPoint(e);
                if (snap) {
                    var gap = gridSpace;
                    pt.x = Math.round(pt.x / gap) * gap;
                    pt.y = Math.round(pt.y / gap) * gap;
                }
                this._points.add(pt);

                if (this._line) {
                    drawing = false;
                    if (this._points.size() == 2) {
                        shape = new this._type();
                        shape.setLayer('nodeLayer');
                        shape.setClosePath(true);
                        if (size == 2) {
                            shape.s({
                                'shape.background': null,
                                'shape.border.width': 1
                            });
                        }
                        shape.setPoints(this._points);
                        shape.setParent(graphView.getCurrentSubGraph());
                        graphView.dm().add(shape);
                        graphView.sm().ss(shape);
                        this._points = new ht.List();
                        this._movePoint = null;
                    }
                }
                //this._points.add(graphView.getLogicalPoint(e));
            }
            this.redraw();
            delete this.isLeftClick;
        }
        //Í£Ö¹¼ÌÐø
        /*
        if(shape){
            resetDefault();
        }*/
    },
    handle_mousemove: function (e) {
        drawing = true;
        if(this._points.size() > 0){
            this.redraw();
            this.autoScroll(e);

            var pt = this._graphView.getLogicalPoint(e);
            if (snap) {
                var gap = gridSpace;
                pt.x = Math.round(pt.x / gap) * gap;
                pt.y = Math.round(pt.y / gap) * gap;
            }
            this._movePoint = pt;
            //this._movePoint = this._graphView.getLogicalPoint(e);
            this.redraw();
        }
    },
    redraw: function(){
        var points = this._points;
        if(points.size() > 0){
            if(this._movePoint){
                points = new ht.List(points);
                points.add(this._movePoint);
            }
            var rect = ht.Default.unionPoint(points);
            if(rect){
                ht.Default.grow(rect, 5);
                this._graphView.redraw(rect);
            }
        }
    },
    draw: function (g) {
        var size = this._points.size();
        if(size > 0){
            var point = this._points.get(0);
            g.lineWidth = 1;
            g.strokeStyle = '#1ABC9C';
            g.beginPath();
            g.moveTo(point.x, point.y);

            for(var i=1; i<size; i++){
                point = this._points.get(i);
                g.lineTo(point.x, point.y);
            }
            if(this._movePoint){
                g.lineTo(this._movePoint.x, this._movePoint.y);
            }
            g.stroke();

            for(i=0; i<size; i++){
                point = this._points.get(i);
                g.fillStyle = 'white';
                g.strokeStyle = '#34495E';
                g.lineWidth = 1;
                g.beginPath();
                g.arc(point.x, point.y, 4, 0, Math.PI * 2, true);
                g.fill();
                g.stroke();
            }
        }
    }
});


var CreateEdgeInteractor = function (graphView, type) {
    CreateEdgeInteractor.superClass.constructor.call(this, graphView);
    this._type = type;
};
ht.Default.def(CreateEdgeInteractor, DNDInteractor, {
    handleWindowTouchEnd: function (e) {
        this.redraw();
        var isPoints = false;
        if (this._target) {
            var edge = new ht.Edge(this._source, this._target);
            edge.setLayer('nodeLayer');
            edge.a('modelRule', 'defaultModel');
            edge.s({
                'edge.type': this._type
            });
            edge.s("edge.offset", 0);
            isPoints = this._type === 'points';
            if (isPoints) {
                edge.s({
                    'edge.points': [{
                        x: (this._source.p().x + this._target.p().x) / 2,
                        y: (this._source.p().y + this._target.p().y) / 2
                    }]
                });
            }
            edge.setParent(this._graphView.getCurrentSubGraph());
            this._graphView.getDataModel().add(edge);
            this._graphView.getSelectionModel().setSelection(edge);
        }
        this._graphView.removeTopPainter(this);
        if (isPoints) {
            resetDefault();
        }
    }
});
