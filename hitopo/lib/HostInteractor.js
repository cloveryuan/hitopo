var HostInteractor = function (graphView, type) {
    HostInteractor.superClass.constructor.call(this, graphView);                
    this._type = type;
};
ht.Default.def(HostInteractor, DNDInteractor, {             
    handleWindowTouchEnd: function (e) {        
        this.redraw();                
        if(this._source){
            this._source.setHost(this._target);    
        }
        this._graphView.sm().ss(this._source);
        this._graphView.removeTopPainter(this);         
    }            
});
