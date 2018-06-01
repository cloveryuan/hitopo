var DNDInteractor = function (graphView, dataType) {    
    DNDInteractor.superClass.constructor.call(this, graphView);                    
    this.dataType = dataType || ht.Node;
};
ht.Default.def(DNDInteractor, ht.graph.Interactor, {
    setUp: function () {
        DNDInteractor.superClass.setUp.call(this); 
        this._autoMakeVisible = this._graphView.isAutoMakeVisible();
        this._graphView.setAutoMakeVisible(false);
        this._graphView.sm().cs();
    },
    tearDown: function () {
        DNDInteractor.superClass.tearDown.call(this);
        this._graphView.setAutoMakeVisible(this._autoMakeVisible);
    },    
    handle_mousedown: function (e) {
        this.handle_touchstart(e);
    },
    handle_touchstart: function (e) {
        e.preventDefault();
        this. _source = this.getDataAt(e);
        if(this._source){    
            this._target = null;
            this.startDragging(e);
            this._graphView.addTopPainter(this); 
            this._graphView.getSelectionModel().setSelection(this._source);
        }         
    },        
    getDataAt: function(e){
        if(ht.Default.isLeftButton(e) && ht.Default.getTouchCount(e) === 1){
            var data = this._graphView.getDataAt(e);
            if(data instanceof this.dataType){
                return data;
            }            
        } 
        return null;
    },
    handleWindowMouseMove: function (e) {
        this.handleWindowTouchMove(e);
    },              
    handleWindowMouseUp: function (e) {
        this.handleWindowTouchEnd(e);
    },  
    handleWindowTouchMove: function (e) { 
        var graphView = this._graphView;
        this.redraw();
        this._logicalPoint = graphView.getLogicalPoint(e);
        this.autoScroll(e);        
        this._target = this.getDataAt(e);
        if(this._target){
            graphView.sm().ss([this._source, this._target]);
        }else{
            graphView.sm().ss([this._source]);
        }    
        this.redraw();
    },             
    handleWindowTouchEnd: function (e) {        
        
    },
    getSourcePosition: function(){
        if(this._source instanceof ht.Node){
            return this._source.getPosition();
        }
        var rect = this._graphView.getDataUIBounds(this._source);
        return {x: rect.x + rect.width/2, y: rect.y + rect.height/2};
    },        
    redraw: function(){
        var p1 = this.getSourcePosition(),
            p2 = this._logicalPoint; 
        if(p1 && p2){
            var rect = ht.Default.unionPoint(p1, p2);
            ht.Default.grow(rect, 1);
            this._graphView.redraw(rect);
        }
    },
    draw: function (g) {   
        var p1 = this.getSourcePosition(),
            p2 = this._logicalPoint;                
        if(p1 && p2){
            g.lineWidth = 1;
            g.strokeStyle = '#1ABC9C';
            g.beginPath();
            g.moveTo(p1.x, p1.y);
            g.lineTo(p2.x, p2.y);
            g.stroke();              
        }               
    }           
});




