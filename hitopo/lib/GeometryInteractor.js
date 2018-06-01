var GeometryInteractor = function (graphView, geometryType) {
    GeometryInteractor.superClass.constructor.call(this, graphView);
    this.geometryType = geometryType || 'rect';
};
ht.Default.def(GeometryInteractor, ht.graph.Interactor, {
    setUp: function () {
        CreateShapeInteractor.superClass.setUp.call(this);
        this._graphView.addTopPainter(this);
        this._onBackgroundDoubleClicked = this._graphView.onBackgroundDoubleClicked;
        this._graphView.onBackgroundDoubleClicked = function () { };
        this._graphView.sm().cs();
    },
    tearDown: function () {
        CreateShapeInteractor.superClass.tearDown.call(this);
        this._graphView.removeTopPainter(this);
        this._graphView.onBackgroundDoubleClicked = this._onBackgroundDoubleClicked;
    },
    handle_mousedown: function (e) {
        this.handle_touchstart(e);
    },
    handle_touchstart: function (e) {
        e.preventDefault();
        var pt = this._graphView.getLogicalPoint(e);
        if (snap) {
            var gap = gridSpace;
            pt.x = Math.round(pt.x / gap) * gap;
            pt.y = Math.round(pt.y / gap) * gap;
        }
        this._startPoint = pt;
        drawing = true;
    },
    handle_mouseup: function (e) {
        this.handle_touchend(e);
    },
    handle_touchend: function (e) {
        e.preventDefault();
        drawing = false;
        if (!this._movePoint) {
            this._startPoint = null;
            return;
        }

        switch (this.geometryType) {
            case 'rect':
                this._createShape('rect');
                break;
            case 'roundRect':
                this._createShape('roundRect');
                break;
            case 'oval':
                this._createShape('oval');
                break;
            case 'circle':
                this._createShape('circle');
                break;
            case 'arc':
                this._createShape('arc');
                break;
            case 'star':
                this._creareStar();
                break;
            case 'triangle':
                this._createTriangle();
                break;
            case 'hexagon':
                this._createHexagon();
                break;
            case 'pentagon':
                this._createPentagon();
                break;
            case 'diamond':
                this._createDiamond();
                break;
            case 'rightTriangle':
                this._createRightTriangle();
                break;
            case 'parallelogram':
                this._createParallelogram();
                break;
            case 'trapezoid':
                this._createTrapezoid();
                break;
        }

        this.redraw();
        this._startPoint = null;
        this._movePoint = null;
    },
    handleWindowMouseUp: function (e) {
        this.handleWindowTouchEnd(e);
    },
    handleWindowTouchEnd: function (e) {

    },
    handle_mousemove: function (e) {
        this.handle_touchmove(e);
    },
    handle_touchmove: function (e) {
        drawing = true;
        e.preventDefault();
        if (!this._startPoint) return;
        this.redraw();
        var pt = this._graphView.getLogicalPoint(e);
        if (snap) {
            var gap = gridSpace;
            pt.x = Math.round(pt.x / gap) * gap;
            pt.y = Math.round(pt.y / gap) * gap;
        }
        this._movePoint = pt;
        this.redraw();
    },
    redraw: function () {
        if (!this._startPoint || !this._movePoint) return;

        var rect = ht.Default.unionPoint([this._startPoint, this._movePoint]);
        if (rect) {
            ht.Default.grow(rect, 5);
            this._graphView.redraw(rect);
        }
    },
    draw: function (g) {
        if (!this._startPoint || !this._movePoint) return;

        var x = Math.min(this._startPoint.x, this._movePoint.x),
            y = Math.min(this._startPoint.y, this._movePoint.y),
            width = Math.abs(this._movePoint.x - this._startPoint.x),
            height = Math.abs(this._movePoint.y - this._startPoint.y);
        if (width === 0 || height === 0) return;

        g.fillStyle = '#20b5e6';
        g.strokeStyle = '#34495E';
        g.lineWidth = 1;
        g.beginPath();
        Shapes[this.geometryType](g, x, y, width, height);
        g.fill();
        g.stroke();
    },

    _createShape: function (type) {
        var shape = new ht.Node();
        shape.setLayer('nodeLayer');
        var x = Math.min(this._startPoint.x, this._movePoint.x),
            y = Math.min(this._startPoint.y, this._movePoint.y),
            w = Math.abs(this._movePoint.x - this._startPoint.x),
            h = Math.abs(this._movePoint.y - this._startPoint.y);
        shape.setSize(w, h);
        shape.setPosition(x + w / 2, y + h / 2);
        shape.setStyle('shape', type);
        shape.a('modelRule', 'defaultModel');
        shape.setStyle('shape.background', ht.Style["shape.background"]);
        shape.setStyle('shape.border.width', 1);
        shape.setStyle('shape.border.color', 'black');
        if (type == 'arc') {
            shape.setStyle('shape.arc.from', Math.PI);
            shape.setStyle('shape.arc.to', 0);
        }
        shape.setIcon(type + '_icon');
        shape.setTag(type + shape.getId());
        this._graphView.dm().add(shape);
        this._graphView.sm().ss(shape);
    },

    _createroundRect: function () {
        var width = Math.abs(this._movePoint.x - this._startPoint.x),
            height = Math.abs(this._movePoint.y - this._startPoint.y),
            x = Math.min(this._movePoint.x, this._startPoint.x),
            y = Math.min(this._movePoint.y, this._startPoint.y);
        if (width === 0 || height === 0) return;

        var node = new ht.Node();
        node.setLayer('nodeLayer');
        node.a('modelRule', 'defaultModel');
        node.setPosition(x + width * 0.5, y + height * 0.5);
        node.setWidth(width);
        node.setHeight(height);
        node.setStyle('shape.background', ht.Style["shape.background"]);
        node.setStyle('shape.border.width', 1);
        node.setStyle('shape.border.color', 'black');

        node.setImage('roundRectTemplate');
        node.setTag("roundrect" + node.getId());
        this._graphView.dm().add(node);
        this._graphView.sm().ss(node);
    },

    _creareStar: function () {
        var width = Math.abs(this._movePoint.x - this._startPoint.x),
           height = Math.abs(this._movePoint.y - this._startPoint.y),
           x = Math.min(this._movePoint.x, this._startPoint.x),
           y = Math.min(this._movePoint.y, this._startPoint.y);

        var w = width * 2,
           h = height * 2,
           ox = x + width / 2,
           oy = y + height / 2;

        var shape = new ht.Shape();
        shape.setLayer('nodeLayer');
        shape.a('modelRule', 'defaultModel');
        shape.setStyle('shape.background', ht.Style["shape.background"]);
        shape.setStyle('shape.border.width', 1);
        shape.setStyle('shape.border.color', 'black');
        shape.setPoints([
            { x: ox - w / 4.0, y: oy - h / 12.0 },
            { x: x + width * 0.306, y: y + height * 0.579 },
            { x: ox - w / 6.0, y: oy + h / 4.0 },
            { x: x + width / 2, y: y + height * 0.733 },
            { x: ox + w / 6.0, y: oy + h / 4.0 },
            { x: x + width * 0.693, y: y + height * 0.579 },
            { x: ox + w / 4.0, y: oy - h / 12.0 },
            { x: x + width * 0.611, y: y + height * 0.332 },
            { x: ox + 0.0, y: oy - h / 4.0 },
            { x: x + width * 0.388, y: y + height * 0.332 }
        ]);
        shape.setSegments([
            1, // moveTo
            2, // lineTo
            2, // lineTo
            2, // lineTo
            2, // lineTo
            2, // lineTo
            2, // lineTo
            2, // lineTo
            2, // lineTo
            2, // lineTo
            5  // closePath
        ]);
        shape.setTag("star" + shape.getId());
        this._graphView.dm().add(shape);
        this._graphView.sm().ss(shape);
    },

    _createTriangle: function () {
        var width = Math.abs(this._movePoint.x - this._startPoint.x),
            height = Math.abs(this._movePoint.y - this._startPoint.y),
            x = Math.min(this._movePoint.x, this._startPoint.x),
            y = Math.min(this._movePoint.y, this._startPoint.y);

        var shape = new ht.Shape();
        shape.setLayer('nodeLayer');
        shape.a('modelRule', 'defaultModel');
        shape.setStyle('shape.background', ht.Style["shape.background"]);
        shape.setStyle('shape.border.width', 1);
        shape.setStyle('shape.border.color', 'black');
        shape.setPoints([
            { x: x + width * 0.5, y: y },
            { x: x, y: y + height },
            { x: x + width, y: y + height }
        ]);
        shape.setSegments([
            1, // moveTo
            2, // lineTo
            2, // lineTo
            5  // closePath
        ]);
        shape.setTag("tri" + shape.getId());
        this._graphView.dm().add(shape);
        this._graphView.sm().ss(shape);
    },

    _createCircle: function () {
        var width = Math.abs(this._movePoint.x - this._startPoint.x),
            height = Math.abs(this._movePoint.y - this._startPoint.y),
            x = Math.min(this._movePoint.x, this._startPoint.x),
            y = Math.min(this._movePoint.y, this._startPoint.y);
        if (width === 0 || height === 0) return;

        var node = new ht.Node();
        node.setLayer('nodeLayer');
        node.a('modelRule', 'defaultModel');
        node.setPosition(x + width * 0.5, y + height * 0.5);
        node.setWidth(width);
        node.setHeight(height);
        node.setStyle('shape.background', ht.Style["shape.background"]);
        node.setStyle('shape.border.width', 1);
        node.setStyle('shape.border.color', 'black');
        node.setTag("circle" + node.getId());
        node.setImage('circleTemplate');
        this._graphView.dm().add(node);
        this._graphView.sm().ss(node);
    },

    _createHexagon: function () {
        var w = Math.abs(this._movePoint.x - this._startPoint.x),
            h = Math.abs(this._movePoint.y - this._startPoint.y),
            x = Math.min(this._movePoint.x, this._startPoint.x),
            y = Math.min(this._movePoint.y, this._startPoint.y);

        var shape = new ht.Shape();
        shape.setLayer('nodeLayer');
        shape.a('modelRule', 'defaultModel');
        shape.setStyle('shape.background', ht.Style["shape.background"]);
        shape.setStyle('shape.border.width', 1);
        shape.setStyle('shape.border.color', 'black');
        shape.setPoints([
            { x: x, y: y + h / 2 },
        { x: x + w / 4, y: y + h },
        { x: x + w * 3 / 4, y: +y + h },
        { x: x + w, y: y + h / 2 },
        { x: x + w * 3 / 4, y: y },
        { x: x + w / 4, y: y }
        ]);
        shape.setSegments([
            1, // moveTo
            2, // lineTo
            2, // lineTo
             2, // lineTo
            2, // lineTo
             2, // lineTo
            5  // closePath
        ]);
        shape.setTag("hexagon" + shape.getId());
        this._graphView.dm().add(shape);
        this._graphView.sm().ss(shape);
    },

    _createPentagon: function () {
        var width = Math.abs(this._movePoint.x - this._startPoint.x),
            height = Math.abs(this._movePoint.y - this._startPoint.y),
            x = Math.min(this._movePoint.x, this._startPoint.x),
            y = Math.min(this._movePoint.y, this._startPoint.y);

        var w = width * 2,
            h = height * 2,
            ox = x + width / 2,
            oy = y + height / 2;

        var shape = new ht.Shape();
        shape.setLayer('nodeLayer');
        shape.a('modelRule', 'defaultModel');
        shape.setStyle('shape.background', ht.Style["shape.background"]);
        shape.setStyle('shape.border.width', 1);
        shape.setStyle('shape.border.color', 'black');
        shape.setPoints([
           { x: ox - w / 4.0, y: oy - h / 12.0 },
        { x: ox - w / 6.0, y: oy + h / 4.0 },
        { x: ox + w / 6.0, y: oy + h / 4.0 },
        { x: ox + w / 4.0, y: oy - h / 12.0 },
        { x: ox + 0.0, y: oy - h / 4.0 }
        ]);
        shape.setSegments([
            1, // moveTo
            2, // lineTo
            2, // lineTo
             2, // lineTo
            2, // lineTo
            5  // closePath
        ]);
        shape.setTag("pentagon" + shape.getId());
        this._graphView.dm().add(shape);
        this._graphView.sm().ss(shape);
    },

    _createDiamond: function () {
        var w = Math.abs(this._movePoint.x - this._startPoint.x),
            h = Math.abs(this._movePoint.y - this._startPoint.y),
            x = Math.min(this._movePoint.x, this._startPoint.x),
            y = Math.min(this._movePoint.y, this._startPoint.y);

        var shape = new ht.Shape();
        shape.setLayer('nodeLayer');
        shape.a('modelRule', 'defaultModel');
        shape.setStyle('shape.background', ht.Style["shape.background"]);
        shape.setStyle('shape.border.width', 1);
        shape.setStyle('shape.border.color', 'black');
        shape.setPoints([
              { x: x + w / 2, y: y },
              { x: x, y: y + h / 2 },
              { x: x + w / 2, y: y + h },
              { x: x + w, y: y + h / 2 }
        ]);
        shape.setSegments([
            1, // moveTo
            2, // lineTo
            2, // lineTo
            2, // lineTo
            5  // closePath
        ]);
        shape.setTag("diamond" + shape.getId());
        this._graphView.dm().add(shape);
        this._graphView.sm().ss(shape);
    },

    _createRightTriangle: function () {
        var w = Math.abs(this._movePoint.x - this._startPoint.x),
            h = Math.abs(this._movePoint.y - this._startPoint.y),
            x = Math.min(this._movePoint.x, this._startPoint.x),
            y = Math.min(this._movePoint.y, this._startPoint.y);

        var shape = new ht.Shape();
        shape.setLayer('nodeLayer');
        shape.a('modelRule', 'defaultModel');
        shape.setStyle('shape.background', ht.Style["shape.background"]);
        shape.setStyle('shape.border.width', 1);
        shape.setStyle('shape.border.color', 'black');
        shape.setPoints([
               { x: x, y: y },
        { x: x + w, y: y + h },
        { x: x, y: y + h }
        ]);
        shape.setSegments([
            1, // moveTo
            2, // lineTo
            2, // lineTo
            5  // closePath
        ]);
        shape.setTag("righttriangle" + shape.getId());
        this._graphView.dm().add(shape);
        this._graphView.sm().ss(shape);
    },

    _createParallelogram: function () {
        var w = Math.abs(this._movePoint.x - this._startPoint.x),
            h = Math.abs(this._movePoint.y - this._startPoint.y),
            x = Math.min(this._movePoint.x, this._startPoint.x),
            y = Math.min(this._movePoint.y, this._startPoint.y);
        var d = w / 4;
        var shape = new ht.Shape();
        shape.setLayer('nodeLayer');
        shape.a('modelRule', 'defaultModel');
        shape.setStyle('shape.background', ht.Style["shape.background"]);
        shape.setStyle('shape.border.width', 1);
        shape.setStyle('shape.border.color', 'black');
        shape.setPoints([
               { x: x + d, y: y },
        { x: x + w, y: y },
        { x: x + w - d, y: y + h },
        { x: x, y: y + h }
        ]);
        shape.setSegments([
            1, // moveTo
            2, // lineTo
            2, // lineTo
            2, // lineTo
            5  // closePath
        ]);
        shape.setTag("parallelogram" + shape.getId());
        this._graphView.dm().add(shape);
        this._graphView.sm().ss(shape);
    },

    _createTrapezoid: function () {
        var w = Math.abs(this._movePoint.x - this._startPoint.x),
            h = Math.abs(this._movePoint.y - this._startPoint.y),
            x = Math.min(this._movePoint.x, this._startPoint.x),
            y = Math.min(this._movePoint.y, this._startPoint.y);
        var d = w / 4;
        var shape = new ht.Shape();
        shape.setLayer('nodeLayer');
        shape.a('modelRule', 'defaultModel');
        shape.setStyle('shape.background', ht.Style["shape.background"]);
        shape.setStyle('shape.border.width', 1);
        shape.setStyle('shape.border.color', 'black');
        shape.setPoints([
                { x: x + d, y: y },
        { x: x + w - d, y: y },
        { x: x + w, y: y + h },
        { x: x, y: y + h }
        ]);
        shape.setSegments([
            1, // moveTo
            2, // lineTo
            2, // lineTo
            2, // lineTo
            5  // closePath
        ]);
        shape.setTag("trapezoid" + shape.getId());
        this._graphView.dm().add(shape);
        this._graphView.sm().ss(shape);
    }
});

var Shapes = {
    polygon: function (g, x, y, w, h, side) {
        if (side == NULL || side < 3) {
            side = 6;
        }
        var r = Math.min(w, h) / 2,
            cx = x + w / 2,
            cy = y + h / 2,
            angle = 0,
            theta = Math.PI * 2 / side,
            i = 0, px, py;
        for (; i < side; i++) {
            px = cx + Math.cos(angle) * r;
            py = cy + Math.sin(angle) * r;
            if (i === 0) {
                g.moveTo(px, py);
            } else {
                g.lineTo(px, py);
            }
            angle += theta;
        }
        g.closePath();
    },
    arc: function (g, x, y, w, h, from, to, close, oval) {
        if (from == NULL) from = Math.PI;
        if (to == NULL) to = 0;// * 2;
        if (close == NULL) close = true;
        var cx = x + w / 2,
            cy = y + h / 2;
        if (close) {
            g.moveTo(cx, cy);
        }
        // oval = true;
        if (oval) {
            from = -from;
            to = -to;
            drawArc(g, cx, cy, from, to - from, w / 2, h / 2, true);
        } else {
            g.arc(cx, cy, Math.min(w, h) / 2, from, to);
        }
        if (close) {
            g.closePath();
        }
    },
    rect: function (g, x, y, w, h) {
        g.rect(x, y, w, h);
    },
    roundRect: function (g, x, y, w, h) {
        g.rect(x, y, w, h);
    },
    circle: function (g, x, y, w, h) {
        g.arc(x + w / 2, y + h / 2, Math.min(w, h) / 2, 0, Math.PI * 2, true);
    },
    oval: function (g, x, y, w, h) {
        drawArc(g, x + w / 2, y + h / 2, 0, Math.PI * 2, w / 2, h / 2, false);
    },
    star: function (g, x, y, width, height) {
        var w = width * 2,
            h = height * 2,
            ox = x + width / 2,
            oy = y + height / 2;

        g.moveTo(ox - w / 4.0, oy - h / 12.0);
        g.lineTo(x + width * 0.306, y + height * 0.579);
        g.lineTo(ox - w / 6.0, oy + h / 4.0);
        g.lineTo(x + width / 2, y + height * 0.733);
        g.lineTo(ox + w / 6.0, oy + h / 4.0);
        g.lineTo(x + width * 0.693, y + height * 0.579);
        g.lineTo(ox + w / 4.0, oy - h / 12.0);
        g.lineTo(x + width * 0.611, y + height * 0.332);
        g.lineTo(ox + 0.0, oy - h / 4.0);
        g.lineTo(x + width * 0.388, y + height * 0.332);
        g.closePath();
    },
    triangle: function (g, x, y, w, h) {
        g.moveTo(x + w / 2, y);
        g.lineTo(x + w, y + h);
        g.lineTo(x, y + h);
        g.closePath();
    },
    hexagon: function (g, x, y, w, h) {
        g.moveTo(x, y + h / 2);
        g.lineTo(x + w / 4, y + h);
        g.lineTo(x + w * 3 / 4, +y + h);
        g.lineTo(x + w, y + h / 2);
        g.lineTo(x + w * 3 / 4, y);
        g.lineTo(x + w / 4, y);
        g.closePath();
    },
    pentagon: function (g, x, y, width, height) {
        var w = width * 2,
            h = height * 2,
            ox = x + width / 2,
            oy = y + height / 2;
        g.moveTo(ox - w / 4.0, oy - h / 12.0);
        g.lineTo(ox - w / 6.0, oy + h / 4.0);
        g.lineTo(ox + w / 6.0, oy + h / 4.0);
        g.lineTo(ox + w / 4.0, oy - h / 12.0);
        g.lineTo(ox + 0.0, oy - h / 4.0);
        g.closePath();
    },
    diamond: function (g, x, y, w, h) {
        g.moveTo(x + w / 2, y);
        g.lineTo(x, y + h / 2);
        g.lineTo(x + w / 2, y + h);
        g.lineTo(x + w, y + h / 2);
        g.closePath();
    },
    rightTriangle: function (g, x, y, w, h) {
        g.moveTo(x, y);
        g.lineTo(x + w, y + h);
        g.lineTo(x, y + h);
        g.closePath();
    },
    parallelogram: function (g, x, y, w, h) {
        var d = w / 4;
        g.moveTo(x + d, y);
        g.lineTo(x + w, y);
        g.lineTo(x + w - d, y + h);
        g.lineTo(x, y + h);
        g.closePath();
    },
    trapezoid: function (g, x, y, w, h) {
        var d = w / 4;
        g.moveTo(x + d, y);
        g.lineTo(x + w - d, y);
        g.lineTo(x + w, y + h);
        g.lineTo(x, y + h);
        g.closePath();
    }
};

var drawArc = function (g, x, y, startAngle, arc, radius, yRadius, continueFlag) {
    var segAngle,
        theta,
        angle,
        angleMid,
        segs,
        ax,
        ay,
        bx,
        by,
        cx,
        cy,
        mathAbs = Math.abs,
        mathPI = Math.PI,
        mathCeil = Math.ceil,
        mathCos = Math.cos,
        mathSin = Math.sin;

    if (mathAbs(arc) > 2 * mathPI) {
        arc = 2 * mathPI;
    }

    segs = mathCeil(mathAbs(arc) / (mathPI / 4));
    segAngle = arc / segs;
    theta = -segAngle;
    angle = -startAngle;

    if (segs > 0) {
        ax = x + mathCos(startAngle) * radius;
        ay = y + mathSin(-startAngle) * yRadius;

        if (continueFlag) {
            g.lineTo(ax, ay);
        } else {
            g.moveTo(ax, ay);
        }

        for (var i = 0; i < segs; i++) {
            angle += theta;
            angleMid = angle - theta / 2;

            bx = x + mathCos(angle) * radius;
            by = y + mathSin(angle) * yRadius;
            cx = x + mathCos(angleMid) * (radius / mathCos(theta / 2));
            cy = y + mathSin(angleMid) * (yRadius / mathCos(theta / 2));
            g.quadraticCurveTo(cx, cy, bx, by);
        }
    }
};
