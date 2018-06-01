!function(T,k,N){"use strict";var q="px",c="0",b="innerHTML",O="className",L=ht.Default,K=ht.Color,r=ht.Node,w="position",y="top",i="left",G=L.animate,n=L.getInternal(),s="width",c="0",V="none",R="max-height",H="font",I="background",B="border-box",t="user-select",S="box-sizing",A="overflow",o=L.isTouchable,n=L.getInternal(),e=K.titleIconBackground,v=L.scrollBarInteractiveSize,l=/msie 9/.test(T.navigator?T.navigator.userAgent.toLowerCase():""),Z=null,p=function(){return document},Q=function(X){return p().createElement(X)},E=function(){return Q("div")},m=function(){var w=E(),O=w.style;return O.msTouchAction=V,O.cursor="default",o&&O.setProperty("-webkit-tap-highlight-color","rgba(0, 0, 0, 0)",Z),O.position="absolute",O.left=c,O.top=c,w},_=function(){return Q("canvas")},h=function(){return document.body},D=function(y,o,P){y.style.setProperty(o,P,Z)},J=function(d,q){d.style.removeProperty(q)},X=function(j,N,i){L.def(ht.widget[j],N,i)},j=function(Y,O){Y.appendChild(O)},P=function(n,x){n.removeChild(x)},M=function(t,o,x,j){t.addEventListener(o,x,!!j)};n.addMethod(L,{paletteExpandIcon:{width:16,height:16,comps:[{type:"triangle",rect:[4,4,10,8],background:e,rotation:3.14}]},paletteCollapseIcon:{width:16,height:16,comps:[{type:"triangle",rect:[4,4,10,8],background:e}]},paletteTitleLabelColor:L.labelSelectColor,paletteTitleLabelFont:L.labelFont,paletteContentLabelFont:L.labelFont,paletteContentLabelColor:"#777",paletteContentBackground:"#fff",paletteTitleHeight:L.widgetTitleHeight,paletteTitleBackground:K.titleBackground,paletteTitleHoverBackground:K.titleBackground,paletteSeparatorWidth:1,paletteSeparatorColor:N,paletteItemHoverBorderColor:K.highlight,paletteItemSelectBackground:K.highlight},!0);var f=".palette-item:hover{border: 1px solid "+L.paletteItemHoverBorderColor+" !important}"+" .palette-header:hover{background: "+L.paletteTitleHoverBackground+" !important}",Y=document.createElement("style");o||(Y.styleSheet?Y.styleSheet.cssText=f:Y.appendChild(p().createTextNode(f))),p().getElementsByTagName("head")[0].appendChild(Y);var d=function(p){var c=this;c.$22h=p,c.addListeners()};L.def(d,k,{ms_listener:1,getView:function(){return this.$22h.getView()},$26h:function(){var $=this;$.$36h&&h().removeChild($.$36h),$.$23h=$.$24h=$.$25h=$.$35h=$.$36h=Z},handle_touchstart:function(h){for(var b,W=this,p=W.$22h,E=h.target,c=p.sm(),d=p.dm(),M="palette-header",m="palette-header-tool",I="palette-item",F=!1,v=!1,j=!1;E&&(E[O]||"").indexOf(M)<0&&(E[O]||"").indexOf(I)<0;)E=E.parentNode;if(E&&E[O].indexOf(m)>=0?F=!0:E&&E[O].indexOf(M)>=0?j=!0:E&&E[O].indexOf(I)>=0&&(v=!0),L.isLeftButton(h))if(W.$27h(h))W.$24h=L.getClientPoint(h),W.$25h=p.ty();else if(F){L.preventDefault(h),b=E.parentNode.$11h;var u=d.getDataById(b),V=u.s("tools")[E.toolIndex];V.action&&V.action.call(p)}else if(j){L.preventDefault(h),b=E.$11h;var u=d.getDataById(b);u.isExpanded()?u.setExpanded(!1):u.setExpanded(!0)}else if(v){b=E.$11h;var U=d.getDataById(b);c.ss(U),p.handleDragAndDrop&&(L.preventDefault(h),U.s("draggable")&&(p.handleDragAndDrop(h,"prepare"),W.$35h=0)),U.s("draggable")||(L.preventDefault(h),W.$24h=L.getClientPoint(h),W.$25h=p.ty())}else L.preventDefault(h),W.$24h=L.getClientPoint(h),W.$25h=p.ty();else W.$26h(h)},handle_mousedown:function(e){this.handle_touchstart(e)},handle_mousewheel:function(u){this.handleScroll(u,u.wheelDelta/40,u.wheelDelta!==u.wheelDeltaX)},handle_DOMMouseScroll:function(d){this.handleScroll(d,-d.detail,1)},handleScroll:function(R,Y,I){var f=this.$22h;L.preventDefault(R),I&&f._41o()&&f.ty(f.ty()+20*Y)},handle_mouseup:function(J){this.handle_touchend(J)},handle_touchend:function(i){var e=this;e.$37h(i),e.$26h(i)},handleWindowMouseUp:function(F){this.handleWindowTouchEnd(F)},handleWindowTouchEnd:function(K){var u=this;u.$37h(K),u.$26h(K)},$37h:function(K){var H=this,v=H.$22h;2===H.$35h&&(H.$35h=3,v.handleDragAndDrop(K,"end"))},handleWindowMouseMove:function(n){this.handleWindowTouchMove(n)},handleWindowTouchMove:function(C){var V=this,W=V.$22h,Y=V.$23h,d=V.$24h,Z=V.$25h,z=L.getClientPoint(C),l=W._29I,t=V.$36h;if(1===V.$35h||2===V.$35h){if(V.$35h=2,W.handleDragAndDrop(C,"between"),o){var I=C.touches[0];C=I?I:C.changedTouches[0]}t.style.left=C.pageX-parseInt(t.width)/2+q,t.style.top=C.pageY-parseInt(t.height)/2+q}else"p"===Y?W.ty(Z+z.y-d.y):"v"===Y&&W.ty(Z+(d.y-z.y)/l.height*W._59I)},handle_mousemove:function(P){this.handle_touchmove(P)},handle_touchmove:function(B){if(!L.isDragging()&&L.isLeftButton(B)){var C=this,Y=C.$22h,x=C.$27h(B);if(C.$24h){if(!C.$23h){if(L.getDistance(L.getClientPoint(B),C.$24h)<2)return;C.$23h=x?"v":"p",L.startDragging(C)}}else if(x)Y._43o();else if(0===C.$35h){if(C.$35h=1,Y.handleDragAndDrop(B,"begin"),o){var H=B.touches[0];B=H?H:B.changedTouches[0]}var F=C.$36h=new Image,V=Y.$10h[Y.sm().ld().getId()].querySelector(".image-box"),Z=parseInt(V.style.width),T=parseInt(V.style.height);F.draggable=!1,F.src=V.toDataURL(),F.width=Z,F.height=T,F.style.position="absolute",F.style.left=B.pageX-Z/2+q,F.style.top=B.pageY-T/2+q,h().appendChild(F),L.startDragging(C)}}},$27h:function(T){var M=this.$22h,L=M.getView(),C=L.getBoundingClientRect(),$=M._29I,O=T.clientX-C.left+L.scrollLeft;return M._41o()&&$.x+$.width-O<v}}),ht.widget.Palette=function(J){var F=this,K=F._view=n.createView(null,F);F.$9h={},F.$10h={},F.$4h={},F._29I={x:0,y:0,width:0,height:0},F._59I=0,F.dm(J?J:new ht.DataModel),K[O]="ht-widget-palette",F.$29h=new d(F),D(K,I,L.paletteContentBackground),D(K,A,"auto"),D(K,S,B),D(K,"-moz-"+S,B),D(K,"-webkit-"+t,V),D(K,"-moz-"+t,V),D(K,"-ms-"+t,V),D(K,t,V),D(K,"position","absolute"),D(K,"overflow","hidden"),j(K,F._79O=m()),M(K,"dragstart",function(s){s.dataTransfer&&(s.dataTransfer.setData("Text","nodeid:"+s.target.$11h),s.dataTransfer.effectAllowed="all",F.$29h.$26h())})},X("Palette",k,{ms_v:1,ms_fire:1,ms_dm:1,ms_sm:1,ms_vs:1,ms_ac:["itemImageWidth","itemImageHeight","itemImagePadding","itemMargin","layout","autoHideScrollBar","scrollBarSize","scrollBarColor"],$30h:0,_itemImagePadding:4,_itemImageWidth:70,_itemImageHeight:50,_itemMargin:10,_layout:"largeicons",_autoHideScrollBar:L.autoHideScrollBar,_scrollBarSize:L.scrollBarSize,_scrollBarColor:L.scrollBarColor,getViewRect:function(){return this._29I},ty:function(Z){return Z?(this.setTranslateY(Z),void 0):this.getTranslateY()},setTranslateY:function(g){if(this.$32h==Z){var v=this,D=v.$33h(g),V=v.$30h;v.$30h=D,v.fp("translateY",V,D)}},getTranslateY:function(){return this.$30h},setLayout:function(g){var $,Y,d=this,U=d._layout;d._layout=g,"smallicons"===g?$=Y=20:"iconsonly"===g?$=Y=50:($=70,Y=50),d.setItemImageWidth($),d.setItemImageHeight(Y),d.setItemImagePadding(4),d.fp("layout",U,g)},getDataAt:function(W){for(var X=W.target;X&&X.$11h==Z;)X=X.parentNode;return X&&X.$11h!=Z?this.getDataModel().getDataById(X.$11h):void 0},$20h:function(){var Q=16;return o&&(Q*=1.2),Q},$19h:function(){return L.paletteTitleHeight},$18h:function(){var Q=L.paletteSeparatorWidth,v=L.paletteTitleBackground,j=L.paletteSeparatorColor||L.brighter(v);return Q+q+" solid "+j},$17h:function(B){D(B,"cursor","pointer"),D(B,"display","inline-block"),D(B,"margin-right",(o?8:4)+q),D(B,"vertical-align",y)},$1h:function(U){var t=this,f=E(),Z=E(),X=Q("span");f[O]="palette-header",D(f,w,"relative"),D(f,I,L.paletteTitleBackground),D(f,"color",L.paletteTitleLabelColor),D(f,y,c),D(f,S,B),D(f,"-moz-"+S,B),D(f,"padding","0 5px 0 0"),D(f,"border-top",t.$18h()),D(f,s,"100%"),D(f,"cursor","pointer"),D(f,"white-space","nowrap"),D(f,A,"hidden"),D(f,H,L.paletteTitleLabelFont),D(f,"line-height",t.$19h()+q),f.$11h=U.getId();var W=_(),K=t.$19h(),v=t.$20h();t.$17h(W),n.setCanvas(W,v,K),j(f,W);var e=U.s("tools");if(e)for(var G=0;G<e.length;G++){var V=_();t.$17h(V),n.setCanvas(V,v,K),V[O]="palette-header-tool palette-header-tool"+U.getId()+"-"+G,V.style.position="absolute",V.style.right=(v+10)*G+"px",V.toolIndex=G,j(f,V)}return W[O]="palette-toggle-icon-"+U.getId(),Z[O]="palette-content",D(Z,"max-height",0+q),D(Z,H,L.paletteContentLabelFont),D(Z,A,"hidden"),Z.$11h=U.getId(),t.$9h[U.getId()]=Z,X[b]=U.getName(),D(X,H,L.paletteTitleLabelFont),j(f,W),j(f,X),[f,Z]},$2h:function(a){var f=this,s=f._layout,I=l&&a.s("draggable")?Q("a"):E(),B=_(),g=E(),o=a.getName()||"",Z=a.s("title")||a.getToolTip()||o,U=f._itemMargin;B[O]="image-box";var K=f.getItemImageWidth(),C=f.getItemImageHeight();return n.setCanvas(B,K,C),j(I,B),g[b]=o,g[O]="label-box","iconsonly"!==s&&j(I,g),I[O]="palette-item",D(I,"vertical-align",y),D(I,"cursor","pointer"),D(I,"border-radius",5+q),D(I,"border","1px solid transparent"),D(I,"text-align","center"),D(I,"display","inline-block"),D(I,"margin-left",U+q),D(I,"margin-top",U+q),D(I,"color",L.paletteContentLabelColor),"smallicons"===s?(D(B,"vertical-align","middle"),D(I,"margin-left",2+q),D(I,"margin-top",2+q),D(I,"padding",2+q),D(I,"text-align",i),D(g,"display","inline-block"),D(g,"min-width",f.$21h+f._itemMargin+q)):"largeicons"===s&&(D(g,"max-width",K+q),D(g,"overflow","hidden")),I.$11h=a.getId(),Z&&(I.title=Z),a.s("draggable")&&!f.handleDragAndDrop&&(l?(I.href="#",D(I,"text-decoration",V)):I.draggable="true"),I},$16h:function(K,q,M,N){var A=n.initContext(K);n.translateAndScale(A,0,0,1),A.clearRect(0,0,M,M);var m=(M-N)/2;L.drawStretchImage(A,L.getImage(q),"fill",0,m,N,N),A.restore()},$15h:function(F){var $=this,n=F.getId(),P=$._view.querySelector(".palette-toggle-icon-"+n),J=F.isExpanded()?L.paletteCollapseIcon:L.paletteExpandIcon;if(P&&J){var Z=$.$19h(),T=$.$20h();$.$16h(P,J,Z,T)}},_drawToolsIcon:function(Y){var I=this,A=Y.s("tools");if(A)for(var h=0;h<A.length;h++){var W=I._view.querySelector(".palette-header-tool"+Y.getId()+"-"+h),b=A[h].icon,C=I.$19h(),J=I.$20h();I.$16h(W,b,C,J)}},$14h:function(D){var T=this,x=D.getId(),G=T.$10h[x].querySelector(".image-box"),k=D.getImage(),v=D.s("image.stretch");if(G&&k){var a=n.initContext(G),w=T.getItemImagePadding();w="smallicons"===T._layout?w/2:w;var y=T.getItemImageWidth()-2*w,A=T.getItemImageHeight()-2*w;n.translateAndScale(a,0,0,1),a.clearRect(0,0,y,A),L.drawStretchImage(a,L.getImage(k),v,w,w,y,A,D,T),a.restore()}},validateImpl:function(){var k,X,Y,s=this,A=s.$9h,T=s._layout,S=s.$10h,u=s.$4h,V=s._view,y=s.dm();if(s.$13h&&(delete s.$13h,u={},y.each(function(W){u[W.getId()]=W})),"smallicons"===T)for(var $ in u){var f=u[$];if(f instanceof r){var F=f.getName()||"",g=L.getTextSize(L.paletteContentLabelFont,F).width;s.$21h!=Z&&s.$21h>g||(s.$21h=g)}}for(var $ in u){Y=u[$];var n,_;if(y.contains(Y)){if(Y instanceof ht.Group){var o,i=s.$1h(Y),C=S[Y.getId()];C&&(o=C.nextSibling,P(V,o),P(V,C)),X=y.getSiblings(Y).indexOf(Y);var D=V.children[2*X]||s._79O;D&&D.parentNode?(V.insertBefore(i[0],D),V.insertBefore(o||i[1],D)):(V.appendChild(i[0]),V.appendChild(o||i[1])),S[Y.getId()]=i[0],k=A[Y.getId()]=o||i[1],_=Y.$12h;var v=Y.s("promptText");_||(Y.$12h=Q("div"),Y.$12h[b]=v||"",_=Y.$12h),0===Y.getChildren().size()?k.contains(_)||j(k,_):k.contains(_)&&P(k,_)}else if(n=Y.getParent()){var K=s.$2h(Y),x=S[Y.getId()];k=A[n.getId()],x&&P(x.parentNode,x),X=y.getSiblings(Y).indexOf(Y);var p=k.children[X];p?k.insertBefore(K,p):j(k,K),S[Y.getId()]=K,s.$14h(Y)}}else{var I=S[Y.getId()],m=I.parentNode;if(Y instanceof ht.Group){var d=I.nextSibling;P(V,I),P(V,d),delete A[Y.getId()]}else P(m,I),0===m.children.length&&(n=y.getDataById(m.$11h),_=n.$12h,_&&!m.contains(_)&&j(m,_));delete S[Y.getId()]}}s.$4h={};var z=function(){var D=s._59I,C=0;s.$32h!=Z&&(clearInterval(s.$32h),C=0,delete s.$32h),s.$32h=setInterval(function(){s.$31h(),D===s._59I?(C++,C>=2&&(clearInterval(s.$32h),delete s.$32h)):(C=0,D=s._59I)},30)};for(var e in A)if(k=A[e],Y=y.getDataById(A[e].$11h),s.$15h(Y),s._drawToolsIcon(Y),Y.isExpanded()){if(k.style.maxHeight===0+q){var W=k.scrollHeight+s._itemMargin+q;G(k).duration(200).set(R,W).set("padding-bottom",s._itemMargin+q).end(function(){return function(){z()}}(W))}else k.style.maxHeight=k.scrollHeight+q;k.style.paddingBottom=s._itemMargin+q}else k.style.maxHeight!==0+q&&G(k).duration(200).set(R,c).set("padding-bottom",c).end(function(){return function(){z()}}(k));s.$28h(),s.$31h()},$31h:function(){for(var E=this,T=E._view,R=0,A=T.children,w=0;w<A.length;w++){var S=A[w];S.className&&S.className.indexOf("palette-")>=0&&(R+=S.offsetHeight)}E._59I=R,E.$30h=E.$33h(E.ty());var m=E.ty();T.scrollTop=-m,E._29I={x:0,y:-m,width:T.clientWidth,height:T.clientHeight},D(E._79O,y,-m+q),E._93I()},$33h:function(l){var r=this,n=r._29I.height-r._59I;return n>l&&(l=n),l>0?0:Math.round(l)},redraw:function(){this.$13h||(this.$13h=1,this.iv())},onPropertyChanged:function(N){["autoHideScrollBar","scrollBarSize","scrollBarColor","translateY"].indexOf(N.property)<0&&this.redraw(),"translateY"===N.property&&(this.iv(),this._43o())},findDataByName:function(H){for(var h=this.dm().getDatas(),w=0;w<h.size();w++){var Q=h.get(w);if(Q.getName()===H)return Q}},setDataModel:function(L){var F=this,$=F._dataModel,t=F._selectionModel;$!==L&&($&&($.umm(F.$6h,F),$.umd(F.$8h,F),$.umh(F.$7h,F),t||$.sm().ums(F.$28h,F)),F._dataModel=L,L.mm(F.$6h,F),L.md(F.$8h,F),L.mh(F.$7h,F),t?t._21I(L):L.sm().ms(F.$28h,F),F.sm().setSelectionMode("single"),F.fp("dataModel",$,L))},$6h:function(m){var c=this,u=c._view,E=m.data,T=c.$4h;"add"===m.kind?T[E.getId()]=E:"remove"===m.kind?T[E.getId()]=E:"clear"===m.kind&&(c.$10h={},c.$9h={},c.$4h={},u[b]=""),c.iv()},$7h:function(l){var Q=this,R=l.data;Q.$4h[R.getId()]=R,Q.iv()},$8h:function(A){var M=this,c=A.data,Y=A.property;"expanded"===Y?M.iv():(M.$4h[c.getId()]=c,M.iv())},$28h:function(){var t,u=this,B=u.sm(),X="palette-item",T=B.ld();this.dm().each(function(g){t=u.$10h[g.getId()],t&&t[O].indexOf(X)>=0&&(g===T?D(t,I,L.paletteItemSelectBackground):J(t,I))})}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);