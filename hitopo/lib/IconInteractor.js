var IconInteractor = function (graphView) {
    IconInteractor.superClass.constructor.call(this, graphView);                
};
ht.Default.def(IconInteractor, ht.graph.Interactor, {
    setUp: function () {
        IconInteractor.superClass.setUp.call(this); 
        this._graphView.addTopPainter(this);
        this._graphView.sm().cs();
    },
    tearDown: function () {
        IconInteractor.superClass.tearDown.call(this);
        this._graphView.removeTopPainter(this);
    },  
    draw: function (g) {  
        var rect = this.rect;
        if(rect){
            g.save();
            g.beginPath();
            if(this.rotation){
                g.translate(rect.x+rect.width/2, rect.y+rect.height/2);
                g.rotate(this.rotation);                                
                g.translate(-rect.x-rect.width/2, -rect.y-rect.height/2);                
            }
            g.rect(rect.x, rect.y, rect.width, rect.height);            
            g.strokeStyle = '#1ABC9C';
            g.lineWidth = 1;
            g.stroke(); 
            g.restore();
        }               
    }, 
    handle_mousemove: function(e){
        var redrawRect = false,
            info = this._graphView.getIconInfoAt(e);
        if(info){
            redrawRect = true;
            this.rect = info.rect;
            this.rotation = info.rotation;
        }else{
            if(this.rect){
                redrawRect = true;
                this.rect = null;
            }
        }
        if(redrawRect){
            this._graphView.redraw();
        }
    },
    handle_mousedown: function (e) {
        this.handle_touchstart(e);
    },
    handle_touchstart: function (e) {
        var info = this._graphView.getIconInfoAt(e);
        if(info){
            var data = info.data,
                key = info.key;
            if(key === 'sourceArrow' || key === 'targetArrow'){
                data.removeStyleIcon(key);
            }else{
                var states = data.s('icons').states;
                if(states){
                    var names = states.names,
                        index = names.indexOf(info.name);
                    if (index >= 0 && index < names.length) {
                        names.splice(index, 1);
                        data.iv();
                    }                
                }                
            }
            this.rect = null;
            this._graphView.redraw();
        }
    }
});
