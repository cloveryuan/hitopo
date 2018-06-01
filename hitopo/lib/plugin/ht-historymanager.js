!function(o,t,c){"use strict";var r="ht",H=o[r],C=H.Default,F=C.def,b=C.getInternal();H.HistoryManager=function(A){this._histories=[],this.setDataModel(A)},F(H.HistoryManager,t,{ms_ac:["dataModel","histories","historyIndex","maxHistoryCount","disabled"],ms_fire:1,_historyIndex:-1,_betweenTransaction:0,_maxHistoryCount:200,_disabled:!1,ignoredPropertyMap:{imageLoaded:!0,children:!0,attaches:!0,shape:!0,childChange:!0,agentChange:!0,sourceAgent:!0,targetAgent:!0,edgeGroup:!0,"*":!0},beginInteraction:function(){this.beginTransaction()},endInteraction:function(){this.endTransaction()},beginTransaction:function(){if(!this._disabled){var b=this;b._betweenTransaction++,1===b._betweenTransaction&&(b._transactionHistories=[])}},endTransaction:function(){if(!this._disabled){var P=this,k=P._histories;P._betweenTransaction>0&&P._betweenTransaction--,0===P._betweenTransaction&&(P._transactionHistories&&P._transactionHistories.length&&(k=k.slice(0,P._historyIndex+1),k.push(P._transactionHistories),k.length>P._maxHistoryCount&&(k=k.slice(k.length-P._maxHistoryCount)),P.setHistories(k),P.setHistoryIndex(k.length-1,!0)),delete P._transactionHistories)}},setDataModel:function(U){var T=this,y=T._dataModel;y!==U&&(y&&(delete y._historyManager,y.ump(T.handleDataModelPropertyChange,T),y.umm(T.$5p,T),y.umd(T.$6p,T),y.removeHierarchyChangeListener(T.handleHierarchyChange,T),y.removeIndexChangeListener(T.handleIndexChange,T)),T._dataModel=U,U&&(U._historyManager=T,U.mp(T.handleDataModelPropertyChange,T),U.mm(T.$5p,T),U.md(T.$6p,T),U.addHierarchyChangeListener(T.handleHierarchyChange,T),U.addIndexChangeListener(T.handleIndexChange,T)),T.fp("dataModel",y,U),T.clear())},setHistoryIndex:function(v,I){var g=this,i=g._historyIndex,D=g._histories.length;if(-1>v?v=-1:v>=D&&(v=D-1),i!==v){if(!I){var l=v-i;l>0?g.$2p(l):0>l&&g.$1p(-l)}g._historyIndex=v,g.fp("historyIndex",i,v),g.dataModel&&g.dataModel.onHistoryManagerChanged()}},setMaxHistoryCount:function(J){var S=this,Y=S._histories,P=S._maxHistoryCount;(!J||0>=J)&&(J=10),P!==J&&(S._maxHistoryCount=J,S.fp("maxHistoryCount",P,J),Y.length>J&&S.clear())},cloneValue:function(q){return H.Default.clone(q)},isPropertyUndoable:function(b){return b&&!this.ignoredPropertyMap[b]},$5p:function(S){this.handleChange(S,S.kind)},$6p:function(k){this.handleChange(k,"property")},handleHierarchyChange:function(T){this.handleChange(T,"hierarchy")},handleIndexChange:function(t){this.handleChange(t,"index")},handleDataModelPropertyChange:function(j){this.handleChange(j,"dataModelProperty")},toChildrenInfo:function(d){var C={};return C.data=d,C.children=[],d.eachChild(function(R){C.children.push(this.toChildrenInfo(R))},this),C},restoreChildren:function(b){var K=b.data;b.children.forEach(function(m){var d=m.data;d.getParent()!==K&&K.addChild(d),this._dataModel.contains(d)||this._dataModel.add(d),this.restoreChildren(m)},this)},handleChange:function(S,q){var u=this;if(!(u._disabled||u._isUndoRedoing||C.loadingRefGraph)){var $,N=(u._histories,S.data),J=S.property;if(!N||!(N._refGraph||N instanceof H.RefGraph)){if("property"===q)u.isPropertyUndoable(J,N)&&($={kind:q,data:N,property:J,oldValue:u.cloneValue(S.oldValue,N,J),newValue:u.cloneValue(S.newValue,N,J),event:S});else if("hierarchy"===q||"index"===q)$={kind:q,data:N,oldIndex:S.oldIndex,newIndex:S.newIndex,event:S};else if("clear"===q)$={kind:q,json:S.json,event:S};else if("add"===q){if($={kind:q,data:N,event:S,childrenInfo:this.toChildrenInfo(N),parent:N.getParent()},$.parent){var X=u._dataModel.getSiblings(N);$.siblingsIndex=X.indexOf(N)}N instanceof H.Node&&($.host=N.getHost(),$.attaches=N.getAttaches()?N.getAttaches().toArray():c),N instanceof H.Edge&&($.source=N.getSource(),$.target=N.getTarget())}else"remove"===q?$={kind:q,data:N,event:S}:"dataModelProperty"===q&&($={kind:q,property:J,oldValue:u.cloneValue(S.oldValue,N,J),newValue:u.cloneValue(S.newValue,N,J),event:S});u.addHistory($)}}},addHistory:function(f){var Q=this;if(f)if(Q._betweenTransaction){var y=!1;if("property"===f.kind||"dataModelProperty"===f.kind)for(var d=Q._transactionHistories.length-1;d>=0;d--){var E=Q._transactionHistories[d];if(f.kind===E.kind&&f.property===E.property&&f.data===E.data){f.oldValue=E.oldValue,Q._transactionHistories[d]=f,y=!0;break}}y||Q._transactionHistories.push(f)}else{var v=Q._histories;v=v.slice(0,Q._historyIndex+1),v.push([f]),v.length>Q._maxHistoryCount&&(v=v.slice(v.length-Q._maxHistoryCount)),Q.setHistories(v),Q.setHistoryIndex(v.length-1,!0)}},canUndo:function(){return!this._disabled&&this._historyIndex>=0&&this._historyIndex<this._histories.length},canRedo:function(){return!this._disabled&&this._historyIndex>=-1&&this._historyIndex<this._histories.length-1},undo:function(j){(!j||0>=j)&&(j=1),this.setHistoryIndex(this._historyIndex-j)},$1p:function(S){if(this.canUndo()){var w,h=this,y=h._dataModel,v=h._histories,c=h._historyIndex;for(h._isUndoRedoing=!0,C.setIsolating(!0);S>0;){if(c>=0&&c<v.length){w=v[c],c--;for(var G=w.length-1;G>=0;G--){var J=w[G],Q=J.kind,m=J.data,B=J.property,x=J.event,T=this.cloneValue(J.oldValue,m,B);if(J.undo)J.undo();else if("add"===Q)y.remove(m,{keepChildren:!0});else if("remove"===Q)y.contains(m)||y.add(m,x.rootsIndex,x.datasIndex);else if("clear"===Q)y.deserialize(C.clone(J.json));else if("property"===Q)if("parent"===B)T?T.addChild(m,x.oldIndex):(m.setParent(T),x.oldIndex>=0&&y.moveTo(m,x.oldIndex));else{var s=null;0===B.indexOf("a:")?(s="attr",B=B.replace("a:","")):0===B.indexOf("s:")&&(s="style",B=B.replace("s:","")),b.setPropertyValue(m,s,B,T)}else if("dataModelProperty"===Q){var s=null;0===B.indexOf("a:")?(s="attr",B=B.replace("a:","")):0===B.indexOf("s:")&&(s="style",B=B.replace("s:","")),b.setPropertyValue(y,s,B,T)}else"hierarchy"===Q?y.moveTo(m,J.oldIndex):"index"===Q&&y.moveToIndex(m,J.oldIndex)}}S--}C.setIsolating(!1),delete h._isUndoRedoing}},redo:function(R){(!R||0>=R)&&(R=1),this.setHistoryIndex(this._historyIndex+R)},$2p:function(a){if(this.canRedo()){var G,g=this,L=g._dataModel,Z=g._histories,d=g._historyIndex;for(g._isUndoRedoing=!0,C.setIsolating(!0);a>0;){if(d>=-1&&d<Z.length-1){d++,G=Z[d];for(var o=0;o<G.length;o++){var D=G[o],J=D.kind,t=D.data,P=D.property,s=D.event,v=this.cloneValue(D.newValue,t,P);if(D.redo)D.redo();else if("add"===J)D.parent&&!t.getParent()&&D.parent.addChild(t,D.siblingsIndex),L.contains(t)||L.add(t,s.rootsIndex,s.datasIndex),this.restoreChildren(D.childrenInfo),t instanceof H.Node&&(t.setHost(D.host),D.attaches&&D.attaches.forEach(function(H){H.setHost(t)})),t instanceof H.Edge&&(t.setSource(D.source),t.setTarget(D.target));else if("remove"===J)L.remove(t);else if("clear"===J)L.clear();else if("property"===J)if("parent"===P)v?v.addChild(t,s.newIndex):(t.setParent(v),s.newIndex>=0&&L.moveTo(t,s.newIndex));else{var n=null;0===P.indexOf("a:")?(n="attr",P=P.replace("a:","")):0===P.indexOf("s:")&&(n="style",P=P.replace("s:","")),b.setPropertyValue(t,n,P,v)}else if("dataModelProperty"===J){var n=null;0===P.indexOf("a:")?(n="attr",P=P.replace("a:","")):0===P.indexOf("s:")&&(n="style",P=P.replace("s:","")),b.setPropertyValue(L,n,P,v)}else"hierarchy"===J?L.moveTo(t,D.newIndex):"index"===J&&L.moveToIndex(t,D.newIndex)}}a--}C.setIsolating(!1),delete g._isUndoRedoing}},clear:function(){this.setHistories([]),this.setHistoryIndex(-1,!0),this._betweenTransaction=0,delete this._transactionHistories}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);