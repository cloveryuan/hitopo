!function(n,Z){"use strict";var K="ht",k=n[K],N="px",L="left",p="top",R="bottom",h="right",i="innerHTML",H="className",U="",T="width",y="height",s="string",r="position",S="absolute",u="0",e="opacity",O="background",M=k.Default,I=M.getInternal(),W=k.Color,q=M.animate,A=M.isTouchable,G=null,_=(Math.sqrt,n.parseInt),V=n.setTimeout,c=(Math.round,W.titleIconBackground),o=function(P){return typeof P===s||P instanceof String},B=function(){return document},w=function(W){return B().createElement(W)},j=function(){var Q=w("div");return Q.tabIndex=-1,Q.style.outline="none",Q},D=function(){return w("canvas")},a=function(j,n){x(j,"-webkit-transform",n),x(j,"-ms-transform",n),x(j,"transform",n)},x=function(C,H,g){C.style.setProperty(H,g,G)},F=function(N,t,Y){M.def(k.widget[N],t,Y)},m=function(a,M){a.appendChild(M)},f=function(){return B().documentElement},Q=function(){return f().clientWidth},E=function(){return f().clientHeight},P=function(x,O,V,M){x.addEventListener(O,V,!!M)},C=function(L){var u=L.touches[0];return u?u:L.changedTouches[0]};I.addMethod(M,{dialogCloseIcon:{width:100,height:100,comps:[{type:"shape",points:[10,10,90,90],segments:[1,2],borderWidth:8,borderColor:c},{type:"shape",points:[90,10,10,90],segments:[1,2],borderWidth:8,borderColor:c}]},dialogMaximizeIcon:{width:100,height:100,comps:[{type:"rect",rect:[10,15,80,75],borderWidth:6,borderColor:c},{type:"rect",rect:[10,10,80,20],background:c}]},dialogRestoreIcon:{width:100,height:100,comps:[{type:"rect",rect:[10,34,56,56],borderWidth:8,borderColor:c},{type:"rect",rect:[10,34,56,14],background:c},{type:"rect",rect:[34,10,56,14],background:c},{type:"rect",rect:[82,10,8,56],background:c},{type:"rect",rect:[66,62,24,8],background:c}]},dialogTitleLabelColor:M.labelSelectColor,dialogTitleLabelFont:(A?"18":"14")+"px arial, sans-serif",dialogContentLabelFont:M.labelFont,dialogTitleBackground:W.titleBackground,dialogHeaderBackground:W.headerBackground,dialogButtonBackground:"#1ABC9C",dialogButtonSelectBackground:"#16A085",dialogButtonLabelColor:"#fff"},!0);var J=function(n){var V=this;V.$1d=n,V.addListeners()};M.def(J,Z,{ms_listener:1,getView:function(){return this.$1d.getView()},clear:function(){delete this.$2d,delete this.$3d,delete this.$4d,delete this.$5d},handle_touchstart:function(e){var G=this,z=G.$1d,E=z.$6d,u=z._config,t=z.$7d,i=e,h=e.target;if(t.contains(h)||M.preventDefault(e),M.isLeftButton(e)){A&&(i=C(e));var d=G.$8d={x:i.pageX,y:i.pageY};G.$9d={x:d.x,y:d.y},!u.maximized&&u.draggable&&E.contains(h)&&(G.$4d=!0,M.startDragging(G,e)),G.handle_mousemove(e)&&(G.$2d=!0,M.startDragging(G,e)),t.contains(e.target)||z.$41d.focus()}},handle_mousedown:function(y){this.handle_touchstart(y)},handle_touchend:function(g){if(M.isLeftButton(g)&&!this.$5d&&!this.$3d){var P=this,i=P.$1d,h=g.target,N=i._config,Z=i.$18d,R=i.$16d;for(N.closable&&Z.contains(h)&&i.hide(),N.maximizable&&R.contains(h)&&(N.maximized?i.restore():i.maximize());h&&(h.className||"").indexOf("dialog-button")<0;)h=h.parentNode;h&&h.buttonItem&&i.action&&i.action(h.buttonItem,g),delete P.$8d,delete P.$9d}},handle_mouseup:function(X){this.handle_touchend(X)},handleWindowTouchEnd:function(q){var W=this,Z=W.$1d,c=Z.$10d;W.$2d&&W.$3d?c.fire({kind:"endResize",target:Z,originEvent:q}):W.$4d&&W.$5d&&c.fire({kind:"endMove",target:Z,originEvent:q}),this.clear()},handleWindowMouseUp:function(z){this.handleWindowTouchEnd(z)},handle_mousemove:function(R){var m=this.$1d._config;if(m.maximized)return!1;if("w"!==m.resizeMode&&"h"!==m.resizeMode&&"wh"!==m.resizeMode)return!1;var Y=this,k=Y.getView(),c=k.querySelector(".resize-area"),f=c.getBoundingClientRect(),L={x:f.left,y:f.top,width:f.width,height:f.height};R=A?C(R):R;var z=R.clientX,P=R.clientY,j={x:z,y:P};return M.containsPoint(L,j)?(x(k,"cursor","nwse-resize"),!0):(x(k,"cursor",U),void 0)},handleWindowTouchMove:function(T){T.preventDefault();var O=T;A&&(O=C(T));var F=this,W=F.$8d,P=F.$9d;if(!(P.x==W.x&&P.y==W.y&&M.getDistance(P,{x:O.pageX,y:O.pageY})<=1)){var X=F.$1d,t=X._config,S=X.$21d,z=t.resizeMode||"wh",m=O.pageX-W.x,c=O.pageY-W.y;if(F.$2d){var h=S.offsetWidth,f=S.offsetHeight,u=h+m,a=f+c;if(u=Math.max(u,50),a=Math.max(a,50),"center"===t.position||t.position==G){var d={},K=S.getBoundingClientRect();d.x=K.left,d.y=K.top,t.position=d}"w"===z?(X.setSize(u,f),W.x+=u-h):"h"===z?(X.setSize(h,a),W.y+=a-f):"wh"===z&&(X.setSize(u,a),W.x+=u-h,W.y+=a-f),F.$3d?X.$10d.fire({kind:"betweenResize",target:X,originEvent:T}):(F.$3d=!0,X.$10d.fire({kind:"beginResize",target:X,originEvent:T}))}else if(F.$4d){var r=S.getBoundingClientRect(),l=r.width,H=r.height,w=Q(),j=E(),s=_(S.style.left)||0,$=_(S.style.top)||0,o=s+m,V=$+c,y=X.adjustPosition({x:o,y:V},{width:l,height:H},{width:w,height:j});y&&(o=y.x,V=y.y);var e=o-s,k=V-$;x(S,L,o+N),x(S,p,V+N),W.x+=e,W.y+=k,t.position={x:o,y:V},F.$5d?X.$10d.fire({kind:"betweenMove",target:X,originEvent:T}):(F.$5d=!0,X.$10d.fire({kind:"beginMove",target:X,originEvent:T}))}}},handleWindowMouseMove:function(a){this.handleWindowTouchMove(a)},handleWindowResize:function(){var a=this,J=a,l=J._config,P=J.$21d,w=Q(),I=E(),q=l.width,d=l.height,V=l.position||"center";l.maximized?(x(P,T,w+N),x(P,y,I+N),x(P,p,u),x(P,L,u)):(x(P,T,q+N),x(P,y,d+N),"center"===V?(x(P,L,(w-q)/2+N),x(P,p,(I-d)/2+N)):(x(P,L,V.x+N),x(P,p,V.y+N))),J.iv()},handle_mousewheel:function(N){N.stopPropagation()},handle_DOMMouseScroll:function(M){M.stopPropagation()}}),k.widget.Dialog=function(n){var C=this,Y=C._view=I.createView(null,C);Y[H]="ht-widget-dialog",x(Y,r,S),M.baseZIndex!=G&&x(Y,"z-index",M.baseZIndex+"");var T=C.$11d=new J(C);C.bindingHandleWindowResize=T.handleWindowResize.bind(C),C.$10d=new k.Notifier,n&&C.setConfig(n)},F("Dialog",Z,{ms_v:1,setTitle:function(a){this._config.title=a,this.getView().querySelector(".dialog-container-title span").innerHTML=a},$31d:function(){var C=this,n=C.$6d=j(),y=C._config,W=C.$12d=C.$13d();n[H]="dialog-container-title",x(n,"cursor","default"),x(n,"white-space","nowrap"),x(n,"overflow","hidden"),x(n,"font",M.dialogTitleLabelFont),x(n,O,y.titleBackground||M.dialogTitleBackground),x(n,"color",y.titleColor||M.dialogTitleLabelColor);var h=w("span"),Z=C.$25d();if(y.titleAlign&&x(n,"text-align",y.titleAlign),y.titleIcon){var e=C.$14d=C.$15d();m(n,e)}if(y.title&&y.title.trim&&(y.title=y.title.trim()),h[i]=y.title||"&nbsp;",m(n,h),y.maximizable){var Q=C.$16d=C.$17d();m(W,Q)}if(y.closable){var A=C.$18d=C.$19d();m(W,A)}return m(n,W),x(n,"display","block"),x(n,"line-height",Z+N),n},$13d:function(){var m=j();return x(m,r,S),x(m,L,u),x(m,h,5+N),x(m,p,u),x(m,R,u),x(m,"text-align",h),x(m,"white-space","nowrap"),m[H]="dialog-title-controls",m},$20d:function(){var i=this.$21d=j(),C=this._config,n=C.borderWidth;return x(i,r,"fixed"),x(i,"box-shadow","rgba(0, 0, 0, 0.2) 0px 5px 10px 0px"),x(i,"padding",u+" "+n+N+" "+n+N+" "+n+N),x(i,"box-sizing","border-box"),x(i,"-moz-box-sizing","border-box"),i[H]="dialog-container",x(i,O,C.titleBackground||M.dialogTitleBackground),i},$22d:function(){var f,V=this,E=V._config,Q=V.$7d=j(),Y=E.content,z=0,b=E.contentPadding||0;E.buttons!=G&&E.buttons.length>0&&(z=32),o(Y)?Q[i]=Y:Y.getView?(f=Y.getView(),m(Q,f)):(f=Y,m(Q,f)),x(Q,r,S),x(Q,"font",M.dialogContentLabelFont),k.Default.appendToScreen(Q);var A=Q.offsetWidth+1,W=Q.offsetHeight,J=V.$25d();return E.width==G&&(E.width=A+10+2*b),E.height==G&&(E.height=W+J+z+5+2*b),k.Default.removeHTML(Q),f&&(x(f,"box-sizing","border-box"),x(f,"-moz-box-sizing","border-box"),x(f,T,"100%"),x(f,y,"100%")),Q[H]="dialog-content",x(Q,p,J+b+N),x(Q,R,z+b+N),x(Q,L,b+N),x(Q,h,b+N),x(Q,"overflow","hidden"),Q},getOverlayDiv:function(){return this.$41d},$23d:function(){var n=this.$41d=j();return n[H]="dialog-overlay",x(n,T,"100%"),x(n,y,"100%"),x(n,r,"fixed"),x(n,p,u),x(n,L,u),x(n,O,"rgba(235, 235, 235, 0.7)"),n},_config:G,setSize:function(U,r){var m=this,M=m._config;M&&(M.width=U,M.height=r,m.isShowing()&&(m.bindingHandleWindowResize(),m.iv()))},getConfig:function(){return this._config},$24d:function(){var G=this._config,u=G.titleIconSize||16;return A&&(u*=1.2),u},$25d:function(){var W=this._config,D=W.titleHeight||M.widgetTitleHeight;return D},$26d:function(g){x(g,"cursor","pointer"),x(g,"display","inline-block"),x(g,"margin-right",(A?8:4)+N),x(g,"vertical-align",p)},$27d:function(){var D=this.$30d=j(),i=10;return A&&(i=20),x(D,T,i+N),x(D,y,i+N),x(D,r,S),x(D,R,u),x(D,h,u),D[H]="resize-area",D},$15d:function(){var w=this,B=D();B[H]="dialog-title-control dialog-title-control-icon";var p=w.$25d(),C=w.$24d();return w.$26d(B),I.setCanvas(B,C,p),B},$17d:function(){var P=D();P[H]="dialog-title-control dialog-title-control-maximize";var V=this.$25d(),X=this.$24d();return this.$26d(P),I.setCanvas(P,X,V),P},$19d:function(){var Y=D();Y[H]="dialog-title-control dialog-title-control-close";var V=this.$25d(),l=this.$24d();return this.$26d(Y),I.setCanvas(Y,l,V),Y},$28d:function(){var z=j();return x(z,O,"white"),x(z,T,"100%"),x(z,y,"100%"),x(z,r,"relative"),z},$29d:function(){var $=this,e=j();x(e,"line-height",32+N),x(e,r,S),x(e,R,u),x(e,L,u),x(e,"white-space","nowrap"),x(e,"overflow","hidden"),x(e,h,u),x(e,O,M.dialogHeaderBackground),e[H]="dialog-container-buttons";var Y=this._config,d=Y.buttonsAlign||h,c=0;return x(e,"text-align",d),$.$42d=[],Y.buttons.forEach(function(o){var j=new k.widget.Button,B=j.getView();B[H]="dialog-button "+o.className,B.buttonItem=o,$.$42d.push(j),j.setBorderColor(G),j.setBackground(M.dialogButtonBackground),j.setSelectBackground(M.dialogButtonSelectBackground),j.setLabelColor(M.dialogButtonLabelColor),x(B,r,"static"),x(B,"display","inline-block"),x(B,"text-align",L),x(B,"height",24+N);var Z=A?10:5;d===L||d===h?x(B,"margin-"+d,Z+N):0===c||x(B,"margin-"+L,Z+N),x(B,"vertical-align","middle");var X=M.getTextSize(j.getLabelFont(),o.label).width+10;j.onClicked=function(m){o.action&&o.action.call($,o,m)},j.setLabel(o.label),x(B,T,X+N),m(e,j.getView()),c++}),e},setConfig:function(d){if(d){var k=this,u=k._view;k._config=d,k.action=d.action,u[i]=U,d.borderWidth==G&&(d.borderWidth=5);var S=k.$23d(),V=k.$28d(),N=k.$31d(),l=k.$22d(),y=k.$20d(),g=k.$30d=k.$27d();if(m(u,S),m(u,y),m(y,V),m(V,N),m(V,l),d.buttons!=G&&d.buttons.length>0){var K=k.$29d();m(V,K)}m(y,g),d.maximized?(d.maximized=!1,k.bindingHandleWindowResize(),k.maximize(!0)):k.bindingHandleWindowResize(),k.isShowing()&&k.iv()}},hide:function(){var N=this,Q=N.$21d,I=N.$41d,J=N._view;J[H]="ht-widget-dialog",q(Q).duration(200).scale(.7).set(e,u).end(function(){N.onHidden&&N.onHidden(),k.Default.removeHTML(J),N.$10d.fire({kind:"hide",target:N})}),q(I).duration(200).set(e,u).end(),n.removeEventListener("resize",N.bindingHandleWindowResize)},isShowing:function(){return!!this._view.parentNode},setModal:function(z){this.$41d.style.display=z?"block":"none"},isModal:function(){return"none"!==this.$41d.style.display},$32d:function(){var s=this,h=s._config,v=s.$21d;a(v,U),s.iv(),h.maximized?s.$10d.fire({kind:"maximize",target:s}):s.$10d.fire({kind:"restore",target:s})},maximize:function(Z){var J=this,D=J.$21d,i=J._config;if(!i.maximized){i.maximized=!0,J.$33d(),J.$16d[H]="dialog-title-control dialog-title-control-minimize";var V=Q(),I=E(),P=i.width,r=i.height,A=_(D.style.left)||0,$=_(D.style.top)||0;J.$36d=P,J.$37d=r,J.$34d=A,J.$35d=$;var S=Z?0:200;q(D).duration(S).set(L,u).set(p,u).set(T,V+N).set(y,I+N).end(function(){J.$32d()})}},restore:function(){var S=this,E=S.$34d,F=S.$35d,W=S.$36d,e=S.$37d,a=S._config;if(a.maximized&&(a.maximized=!1,S.$33d(),S.$16d[H]="dialog-title-control dialog-title-control-maximize",S.isShowing()&&E!=G&&F!=G&&W!=G&&e!=G)){var v=S.$21d;q(v).duration(200).set(L,E+N).set(p,F+N).set(T,W+N).set(y,e+N).end(function(){S.$32d()})}delete S.$34d,delete S.$35d,delete S.$36d,delete S.$37d},show:function(){var W=this,i=W._view,f=W._config,I=W.$21d,b=W.$41d;f&&f.zIndex!=G&&x(i,"z-index",f.zIndex+U),k.Default.appendToScreen(i),a(I,"scale(0.7)"),x(I,e,u),W.iv(),W.validate(),W._view[H]+=" dialog-show",V(function(){q(I).duration(200).scale(1).set(e,"1").end(function(){x(I,T,I.clientWidth+N),x(I,y,I.clientHeight+N),W.onShown&&W.onShown(),W.$10d.fire({kind:"show",target:W})}),q(b).duration(200).set(e,"1").end(),P(n,"resize",W.bindingHandleWindowResize)},30)},setPosition:function(z){var w=this.$21d;w.style.left=z.x+"px",w.style.top=z.y+"px"},addEventListener:function(T,U,q){this.$10d.add(T,U,q)},removeEventListener:function(O,d){this.$10d.remove(O,d)},$38d:function(O,b,y,B){var K=I.initContext(O);I.translateAndScale(K,0,0,1),K.clearRect(0,0,y,y);var P=(y-B)/2;M.drawStretchImage(K,M.getImage(b),"fill",0,P,B,B),K.restore()},$33d:function(){var z=this,T=z._config,R=z.$16d,m=T.maximized?M.dialogRestoreIcon:M.dialogMaximizeIcon;if(R&&m){var N=z.$25d(),d=z.$24d();z.$38d(R,M.getImage(m),N,d)}},$39d:function(){var S=this,u=S._config,$=S.$14d,L=u.titleIcon;if($&&L){var W=S.$25d(),c=S.$24d();S.$38d($,M.getImage(L),W,c)}},$40d:function(){var f=this,V=f.$18d,x=M.dialogCloseIcon;if(V&&x){var C=f.$25d(),N=f.$24d();f.$38d(V,M.getImage(x),C,N)}},invalidate:function(v){var D=this,_=D.$42d;D._68I||(D._68I=1,M.callLater(D.validate,D,G,v),D.onInvalidated&&D.onInvalidated(),D.fireViewEvent("invalidate"));var Z=D._config.content;Z.invalidate&&Z.invalidate(),_&&_.forEach(function(v){v.iv()})},validateImpl:function(){var d=this;d.$40d(),d.$33d(),d.$39d();var U=d._config.content;U.initView&&(U.setX(0),U.setY(0),U.setWidth(d.$7d.clientWidth),U.setHeight(d.$7d.clientHeight))},adjustPosition:function(M,h,W){var Z=h.width,D=h.height,_=W.width,f=W.height,e=M.x,s=M.y,N=this._config,a=N.minDragSize||20;return"inside"===N.dragMode?(e+Z>_&&(e=_-Z),s+D>f&&(s=f-D),0>e&&(e=0),0>s&&(s=0)):(null==N.dragMode||"none"===N.dragMode)&&(-Z+a>e&&(e=-Z+a),e>_-a&&(e=_-a),s>f-a&&(s=f-a),0>s&&(s=0)),{x:e,y:s}}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);