!function(U,H){"use strict";var c="ht",b=U[c],G="innerHTML",A="className",V=null,Q="px",X=b.Default,m=X.getInternal(),F="0",M=function(){return document},K=function(z){return M().createElement(z)},e=function(){return K("canvas")},t=function(N,P,i){N.style.setProperty(P,i,V)},O=function(y,G,f){X.def(b.widget[y],G,f)},y=function(G,c){G.appendChild(c)},h=function(s,u){s.removeChild(u)},L=function(F,_,z,f){F.addEventListener(_,z,!!f)},P=function(q,M,R,H){q.removeEventListener(M,R,!!H)},u=X.isTouchable;m.addMethod(X,{menuLabelFont:(u?"16":"13")+"px arial, sans-serif",menuLabelColor:"#000",menuBackground:"#F0EFEE",menuHoverBackground:"#648BFE",menuHoverLabelColor:"#fff",menuSeparatorWidth:1,menuSeparatorColor:"#999"},!0),b.widget.Menu=function(j){var d=this,J=d._view=m.createView(null,d),k=d.$1g=new b.widget.ContextMenu,s=K("ul");k._r=!0,k._view[A]+=" ht-widget-dropdownmenu",J[A]="ht-widget-menu",s[A]="header",t(J,"margin",F),t(J,"padding",F),t(J,"background",X.menuBackground),t(J,"-webkit-user-select","none"),t(J,"-moz-user-select","none"),t(J,"user-select","none"),t(J,"text-align","left"),t(J,"border-bottom",X.menuSeparatorWidth+"px solid "+X.menuSeparatorColor),t(J,"cursor","default"),t(J,"overflow","auto"),t(J,"white-space","nowrap"),t(J,"font",X.menuLabelFont),t(J,"color",X.menuLabelColor),t(J,"box-sizing","border-box"),t(J,"-moz-box-sizing","border-box"),t(s,"list-style","none"),t(s,"margin",F),t(s,"padding",F),t(s,"display","inline-block"),y(J,s),d.setItems(j),d.$2g=function(N){d.$3g(N)},d.$4g=function(H){d.$5g(H)},d.$6g=function(O){d.$7g(O)},d.$8g=function(X){d.$9g(X)},d.$9b=function(q){d.$10g(q)},d._autoShow=!0,d.setAutoShow(!1),k.afterHide=function(){d.$11g()},k.afterShow=function(){d.$12g()},P(M(),"keydown",k.$3b),d.$3b=function(r){d.$13g(r)},d.invalidate()},O("Menu",H,{_items:V,$14g:X.menuHoverBackground,$15g:X.menuHoverLabelColor,$16g:{},_enableGlobalKey:!1,ms_v:1,$21g:"smallicons",$22g:0,$23g:0,$24g:"left",getDropDownMenu:function(){return this.$1g},setLayout:function(i){var j=this;if(j.$21g=i,j.setItems(j._items),"largeicons"===i){for(var f=j._view.querySelectorAll(".header-item"),Z=0,U=0;U<f.length;U++){var $=f[U];Z=Math.max(Z,$.clientWidth)}for(var U=0;U<f.length;U++){var $=f[U];t($,"min-width",Z+Q)}}this.invalidate()},getLayout:function(){return this.$21g},setHeaderItemHGap:function(p){this.$22g=p;for(var N=this._view.querySelectorAll(".header-item"),f=0;f<N.length;f++){var o=N[f];t(o,"margin-left",p+Q),t(o,"margin-right",p+Q)}},getHeaderItemHGap:function(){return this.$22g},setHeaderItemVGap:function(k){this.$23g=k;for(var n=this._view.querySelectorAll(".header-item"),c=0;c<n.length;c++){var g=n[c];t(g,"margin-top",k+Q),t(g,"margin-bottom",k+Q)}},getHeaderItemVGap:function(){return this.$24g},setHeaderItemAlign:function(c){this.$24g=c,t(this._view,"text-align",c)},getHeaderItemAlign:function(){return this.$23g},enableGlobalKey:function(){var C=this,n=C._enableGlobalKey;n===!1&&(L(M(),"keydown",C.$3b),C._enableGlobalKey=!0)},disableGlobalKey:function(){this._enableGlobalKey=!1,P(M(),"keydown",this.$3b)},setHoverBackground:function(H){this.$14g=H},setHoverColor:function(x){this.$15g=x},setItems:function(V){var F=this,L=F._view,n=F.$21g;if(F._items=V,L.children[0][G]="",F.$16g={},V&&V.length){for(var R=L.children[0],i=0,s=M().createDocumentFragment();i<V.length;i++){var C=V[i],H=K("li"),p=K("span");if(C.icon){var f=e();f[A]="menu-item-icon","smallicons"===n?(t(f,"height","1.2em"),t(f,"width","1.2em"),t(f,"vertical-align","middle")):(t(f,"height","32px"),t(f,"width","32px"),t(f,"display","block"),t(f,"margin","0 auto")),f.$20g=C.icon,y(H,f)}H[A]="header-item",t(H,"display","inline-block"),t(H,"vertical-align","top"),t(H,"padding","0 1.2em"),t(H,"line-height","1.8em"),"largeicons"===n&&t(H,"text-align","center"),t(H,"background-color","rgba(0,0,0,0)"),H.setAttribute("data-index",i),F.$16g[i]=C.items,p[G]=C.label,"iconsonly"!==n&&y(H,p),y(s,H)}y(R,s)}},showDropdownMenu:function(n){var I=this,D=I.$16g[n],R=I.$1g,i=I._view.children[0].children[n],k=I.$17g;if(i&&i!==k){k&&I.hideDropdownMenu();var B=i.getBoundingClientRect(),a=X.getWindowInfo();I.$17g=i,R.setItems(D),R.show(B.left+a.left,B.top+B.height+a.top,!1)}},hideDropdownMenu:function(){this.$1g.hide()},getItemByProperty:function(u,c){var g=this,y=g._items;return y&&0!==y.length?g.$1g.getItemByProperty(u,c,y):V},$12g:function(){var k=this,Z=k.$17g;Z.style.background=k.$14g,Z.style.color=k.$15g,k._autoShow||L(M(),u?"touchstart":"mousedown",k.$9b)},$11g:function(){var s=this,d=s.$17g;d&&(d.style.background="",d.style.color="",s.$17g=V),P(M(),u?"touchstart":"mousedown",s.$9b)},$10g:function(Q){var G=this,$=G._view,W=G.$1g,E=$.children[0];!M().body.contains($)||E.contains(Q.target)||W._view.contains(Q.target)||G.hideDropdownMenu()},$13g:function(s){var c=this,E=c.$1g;M().body.contains(c._view)&&E.$13b.$4b.call(E.$13b,s,c._items)},setAutoShow:function(o){var z=this,m=z.$1g,K=z._view;z._autoShow!==o&&(z._autoShow?(P(K,"mouseover",z.$2g),P(K,"mouseout",z.$4g),P(m._view,"mouseout",z.$4g),u||(L(K,"mouseover",z.$8g),L(K,"mouseout",z.$8g)),L(K,u?"touchstart":"mousedown",z.$6g)):(P(K,"mouseover",z.$8g),P(K,"mouseout",z.$8g),P(K,u?"touchstart":"mousedown",z.$6g),P(M(),u?"touchstart":"mousedown",z.$9b),u||(L(K,"mouseover",z.$2g),L(K,"mouseout",z.$4g),L(m._view,"mouseout",z.$4g))),z._autoShow=o)},$3g:function(v){var y=this,F=y._view.children[0],O=v.target;if(F!==O&&F.contains(O)){for(;"header-item"!==O[A];)O=O.parentNode;y.showDropdownMenu(O.getAttribute("data-index"))}},$5g:function(W){var C=this,B=C._view.children[0],I=C.$1g,r=W.target,_=W.relatedTarget;!B.contains(r)&&!I._view.contains(r)||B.contains(_)||I._view.contains(_)||C.hideDropdownMenu()},$7g:function(q){q.preventDefault();var x=this,G=x._view.children[0],r=x.$1g,d=q.target;if(X.isLeftButton(q)&&G!==d&&G.contains(d))if(u){for(;"header-item"!==d[A];)d=d.parentNode;var e=d.getAttribute("data-index"),r=x.$1g,_=x._view.children[0].children[e],K=x.$17g;r.isShowing()&&x.hideDropdownMenu(),_!==K&&x.showDropdownMenu(e)}else if(r.isShowing())x.hideDropdownMenu();else{for(;"header-item"!==d[A];)d=d.parentNode;x.showDropdownMenu(d.getAttribute("data-index"))}},$9g:function(P){var C=this,D=C._view,m=C.$1g,X=P.target;if(D.contains(X)){for(var k=D.querySelectorAll(".header-item"),e=V,p=0;p<k.length;p++){var H=k[p];H.style.background="",H.style.color="","mouseover"===P.type?H.contains(X)&&(e=H):"mouseout"===P.type&&m.isShowing()&&C.$17g===H&&(e=H)}m.isShowing()&&(e||(e=C.$17g),C.showDropdownMenu(e.getAttribute("data-index"))),e&&(e.style.background=C.$14g,e.style.color=C.$15g)}},getShowingMenuIndex:function(){var D=this.$17g;return D?D.getAttribute("data-index"):-1},addTo:function(r){var m=this,c=m._view;y(r,c),m.invalidate()},dispose:function(){var E=this,b=E._view,t=E.$1g;b&&(E._autoShow?(P(b,"mouseover",E.$2g),P(b,"mouseout",E.$4g),P(t._view,"mouseout",E.$4g)):(P(b,"mouseover",E.$8g),P(b,"mouseout",E.$8g),P(b,u?"touchstart":"mousedown",E.$6g),P(M(),u?"touchstart":"mousedown",E.$9b)),P(M(),"keydown",E.$3b),t.dispose(),b.parentNode&&h(b.parentNode,b),E._view=E.$1g=E.$16g=E._items=E.$17g=E.$2g=E.$4g=E.$6g=E.$8g=E.$9b=E.$3b=V)},$19g:function(o,E,F,H){var w=m.initContext(o);m.translateAndScale(w,0,0,1),w.clearRect(0,0,F,H),X.drawStretchImage(w,X.getImage(E),"fill",0,0,F,H),w.restore()},validateImpl:function(){var g,f,t,y=this,p=y._view,e=p.querySelectorAll(".menu-item-icon");for(t=0;t<e.length;t++){var Q=e[t];g=Q.clientWidth,f=Q.clientHeight,g&&f&&(m.setCanvas(Q,g,f),y.$19g(Q,X.getImage(Q.$20g),g,f))}}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);