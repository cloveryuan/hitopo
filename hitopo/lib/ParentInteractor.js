var ParentInteractor = function (graphView) {
    ParentInteractor.superClass.constructor.call(this, graphView, ht.Data);                    
};
ht.Default.def(ParentInteractor, DNDInteractor, {             
    handleWindowTouchEnd: function (e) {        
        this.redraw();                
        if(this._source){
            this._source.setParent(this._target);    
            if(this._target instanceof ht.Group){
                this._target.setExpanded(true);
            }
        }
        this._graphView.sm().ss(this._source);
        this._graphView.removeTopPainter(this);         
    }            
});
