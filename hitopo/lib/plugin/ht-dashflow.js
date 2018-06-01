!function(o){"use strict";var N="ht",v=o[N],L=v.Default,O=Math,r=(O.PI,O.sin,O.cos,O.atan2,O.sqrt,O.max),M=O.floor,Z=(O.round,O.ceil),n=v.Shape,J=(v.Edge,v.List),c=v.Style,k=v.graph,K=L.getInternal(),G=K.ui(),q=null,e="prototype",B=o.clearInterval,l=o.setInterval,D=function(B){var U=B.data,I=this.dm();if(U&&"add"===B.kind){var p=I.$1c,H=U instanceof n?"shape.":"edge.";p&&U.s(H+"dash.flow")&&p.indexOf(U)<0&&p.push(U)}"clear"===B.kind&&(I.$1c=[])},Q=function(H){var w=H.property,G=H.data,V=H.newValue,R=this.dm().$1c,Y=G instanceof n?"s:shape.dash.flow":"s:edge.dash.flow";if(R&&w===Y)if(V)R.indexOf(G)<0&&R.push(G);else for(var L=R.length,W=0;L>W;W++)if(R[W]===G){R.splice(W,1);break}},R=k.GraphView[e],T=G.EdgeUI[e],d=G.ShapeUI[e],w=d._80o,h=T._80o,X=v.DataModel[e],S=X.prepareRemove,y=R.setDataModel;c["edge.dash.flow.step"]==q&&(c["edge.dash.flow.step"]=3),c["shape.dash.flow.step"]==q&&(c["shape.dash.flow.step"]=3),X.prepareRemove=function(j){S.call(this,j);var I=j._dataModel,i=I.$1c;if(i)for(var d=i.length,T=0;d>T;T++)if(i[T]===j){i.splice(T,1);break}},R.setDataModel=function(g){var i=this,l=i._dataModel;if(l!==g){l&&(l.umm(D,i),l.umd(Q,i),l.$1c=[]),g.mm(D,i),g.md(Q,i);var t=g.$1c=[];g.each(function(g){var _=g instanceof n?"shape.":"edge.";g.s(_+"dash.flow")&&t.indexOf(g)<0&&t.push(g)}),y.call(i,g)}},R.setDashFlowInterval=function(T){var j=this,w=j.$2c;j.$2c=T,j.fp("dashFlowInterval",w,T),j.$3c!=q&&(B(j.$3c),delete j.$3c,j.enableDashFlow(T))},R.getDashFlowInterval=function(){return this.$2c},R.$4c=function(){var N,p,T,X=this,b=X.tx(),A=X.ty(),v=X._zoom,O=X.getWidth(),H=X.getHeight(),s={x:-b/v,y:-A/v,width:O/v,height:H/v},u=X.dm().$1c,j=X._56I,g=new J;if(u.forEach(function(k){j[k.getId()]&&(N=X.getDataUI(k),N&&(T=N._79o(),T&&g.add(T)))}),0!==g.size()&&(g.each(function(G){L.intersectsRect(s,G)&&(p=L.unionRect(p,G))}),p&&(p&&(L.grow(p,r(1,1/v)),p.x=M(p.x*v)/v,p.y=M(p.y*v)/v,p.width=Z(p.width*v)/v,p.height=Z(p.height*v)/v,p=L.intersection(s,p)),p))){var V=X._canvas.getContext("2d");V.save(),V.lineCap=L.lineCap,V.lineJoin=L.lineJoin,K.translateAndScale(V,b,A,v),V.beginPath(),V.rect(p.x,p.y,p.width,p.height),V.clip(),V.clearRect(p.x,p.y,p.width,p.height),X.$5c(V,p),V.restore()}},R.$5c=function(j,Q){var V,K,w=this;w._93db(j),w.each(function(d){w._56I[d._id]&&(V=w.getDataUI(d),V&&(K=V._79o(),(!Q||L.intersectsRect(Q,K))&&(V.$7c=!0,V._42(j),delete V.$7c)))}),w._92db(j)},R.enableDashFlow=function(v){var y=this;y.$3c==q&&(y.$3c=l(function(){y.$4c()},v||y.$2c||50))},R.disableDashFlow=function(){var s=this;B(s.$3c),delete s.$3c};var C=function(){var C=this,F=C._data,I=F instanceof n?"shape.":"edge.",a=F.s(I+"dash.pattern"),x=F.s(I+"dash.flow.reverse");if(a&&F.s(I+"dash")&&F.s(I+"dash.flow")&&C.$7c){var X=C.s(I+"dash.offset")||0,g=F.s(I+"dash.flow.step"),N=F.getStyleMap(),t=0;a.forEach(function(e){t+=e}),x&&(g=-g),X-=g,X%=t,N||(F._styleMap=N={}),N[I+"dash.offset"]=X}};T._80o=function(u){h.call(this,u),C.call(this)},d._80o=function(o){w.call(this,o),C.call(this)}}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);