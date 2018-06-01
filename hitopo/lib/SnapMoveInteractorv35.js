ht.graph.SnapTouchInteractor = function (graphView, params) {
    ht.graph.SnapTouchInteractor.superClass.constructor.call(this, graphView, params);
};
ht.Default.def(ht.graph.SnapTouchInteractor, ht.graph.TouchInteractor, {
    handleMove: function(e) {
        var self = this,
            graphView = self.gv,
            data = self._data;
        if (!data) return;
        if (!graphView._moving) {
            var point = graphView.lp(e),
                lastLogicalPoint = self._lastLogicalPoint = point,
                nodeRect = data.getRect(),
                nodeX = nodeRect.x,
                nodeY = nodeRect.y;
            self._offset = {x: lastLogicalPoint.x - nodeX, y: lastLogicalPoint.y - nodeY};
            self.fi({ kind: 'beginMove', event: e }); 
            graphView._moving = 1;
        } else {
            var lastLogicalPoint = self._lastLogicalPoint,
                point = graphView.lp(e),
                offset = self._offset,
                gap = gridSpace,
                newX = point.x - offset.x,//left
                newY = point.y - offset.y,//top
                nearestX = (snap) ? Math.round(newX / gap) * gap : newX,
                nearestY = (snap) ? Math.round(newY / gap) * gap : newY,
                offsetX = nearestX - (lastLogicalPoint.x - offset.x),//newleft - oldleft
                offsetY = nearestY - (lastLogicalPoint.y - offset.y);
            graphView.moveSelection(offsetX, offsetY);
            self._lastLogicalPoint = {x: point.x + (nearestX - newX), y: point.y + (nearestY - newY)};//newlogicalpoint + roundgap
            self.autoScroll(e);
            self.fi({ kind: 'betweenMove', event: e });
        }
    }
});


ht.graph.SnapMoveInteractor = function (graphView) {
    ht.graph.SnapMoveInteractor.superClass.constructor.call(this, graphView);
};
ht.Default.def(ht.graph.SnapMoveInteractor, ht.graph.MoveInteractor, {
    handle_mousedown: function (e) {
        var self = this,
            graphView = self.gv;
        if (!ht.Default.isLeftButton(e) || graphView._editing) {
            return;
        }
        var data = graphView.getSelectedDataAt(e);
        if (data && data instanceof ht.Node) {
            self._data = data;
            graphView.handleMouseDown && graphView.handleMouseDown(e, data);
            self.startDragging(e);
            var lastLogicalPoint = self._lastLogicalPoint,
                nodeRect = data.getRect(),
                nodeX = nodeRect.x,
                nodeY = nodeRect.y;
            self._offset = { x: lastLogicalPoint.x - nodeX, y: lastLogicalPoint.y - nodeY };
            if (graphView.isMovable(data)) {
                graphView._moving = 1;
            }
        }
    },
    handleWindowMouseMove: function (e) {
        var self = this,
            gv = self.gv;
        if (!gv._moving) {
            return;
        }
        self.fi({ kind: self._logicalPoint ? 'betweenMove' : 'beginMove', event: e });
        var lastLogicalPoint = self._lastLogicalPoint,
            point = self._logicalPoint = gv.lp(e),
            offset = self._offset,
            gap = gridSpace,
            newX = point.x - offset.x,//left
            newY = point.y - offset.y,//top
            nearestX = (snap) ? Math.round(newX / gap) * gap : newX,
            nearestY = (snap) ? Math.round(newY / gap) * gap : newY,
            offsetX = nearestX - (lastLogicalPoint.x - offset.x),//newleft - oldleft
            offsetY = nearestY - (lastLogicalPoint.y - offset.y);
        gv.moveSelection(offsetX, offsetY);
        self._lastLogicalPoint = { x: point.x + (nearestX - newX), y: point.y + (nearestY - newY) };//newlogicalpoint + roundgap
        self.autoScroll(e);
    }
});
