!function(p,v){"use strict";var S="position",T="absolute",N="relative",w="px",D="left",P="right",u="top",X="bottom",y="display",j="none",i="block",U=ht.Default,J=U.getInternal(),b=Math.floor,r=Math.ceil,E=Math.PI,x=null,O=p.parseInt,h=function(d){return d.getContext("2d")},o=function(){return document},g=function(G){return o().createElement(G)},W=function(){return g("canvas")},V=function(n,L,t){n.style.setProperty(L,t,x)},R=function(L,G,q){U.def(ht.widget[L],G,q)},t=function(_,h){_.appendChild(h)},L=function(c,S){c.removeChild(S)},C=function(o,v,r,i){o.addEventListener(v,r,!!i)},G=function(C,t,M,l){C.removeEventListener(t,M,!!l)};ht.widget.RulerFrame=function(e){var h=this,M=h._view=J.createView(null,h),j=h.$1k=W(),g=h.$2k=W(),r=h.$3k=W(),A=h.$4k=W();h._defaultRulerConfig={size:20,borderWidth:1,borderStyle:"solid",borderColor:"#888",defaultMajorTickSpacing:50,minMajorTickSpacing:10,minPhysicalMajorTickSpacing:40,maxPhysicalMajorTickSpacing:100,tickSpacingAdaptable:!0,majorTickTextFont:"12px Arial",majorTickTextColor:"#666",majorTickColor:"#888",minorTickColor:"#ccc",background:"rgba(0,0,0,0)",guideColor:"rgb(0, 173, 239)",guideWidth:2,guideVisible:!1,guideTipVisible:!1,guideTipBorderColor:"#666",guideTipTextColor:"#666",guideTipTextFont:"12px Arial",guideTipBackground:"#fff"},h._topRulerConfig={visible:!0},h._rightRulerConfig={visible:!1},h._bottomRulerConfig={visible:!1},h._leftRulerConfig={visible:!0},t(M,j),t(M,r),t(M,g),t(M,A),V(M,S,N),V(M,"box-sizing","border-box"),V(M,"-moz-box-sizing","border-box"),V(j,S,T),V(g,S,T),V(r,S,T),V(A,S,T),h.$14k=function(){h.$13k=1,h.iv()},h.$15k=function(J){if(h._topRulerConfig.guideVisible||h._rightRulerConfig.guideVisible||h._bottomRulerConfig.guideVisible||h._leftRulerConfig.guideVisible||h._defaultRulerConfig.guideVisible||(h._topRulerConfig.guideTipVisible||h._rightRulerConfig.guideTipVisible||h._bottomRulerConfig.guideTipVisible||h._leftRulerConfig.guideTipVisible||h._defaultRulerConfig.guideTipVisible)&&h._component){var F=M.getBoundingClientRect();h.$16k={x:J.clientX-F.left,y:J.clientY-F.top},h.$5k()}},h.setComponent(e)},R("RulerFrame",v,{ms_v:1,ms_fire:1,ms_ac:["defaultRulerConfig","topRulerConfig","rightRulerConfig","bottomRulerConfig","leftRulerConfig","component"],setComponent:function(U){var s=this,z=s._component,E=s.getView();if(E){if(s._component=U,s.fp("component",z,U),z){var l=s.getComponentView(z);L(E,l),G(E,"mousemove",s.$15k),s.removeComponentPropertyChangeListener(z,s.$14k)}if(U){var y=s.getComponentView(U);t(E,y),V(y,S,T),C(E,"mousemove",s.$15k),s.addComponentPropertyChangeListener(U,s.$14k)}}},addComponentPropertyChangeListener:function(o,i){o&&o.mp&&o.mp(i)},removeComponentPropertyChangeListener:function(s,C){s&&s.ump&&s.ump(C)},getComponentHZoom:function(A){return A&&A.getZoom?A.getZoom():1},getComponentVZoom:function(i){return i&&i.getZoom?i.getZoom():1},getComponentViewRect:function(Q){return Q&&Q.getViewRect?Q.getViewRect():void 0},getComponentView:function(b){return b&&b.getView?b.getView():b},invalidateComponent:function(E){E&&E.iv&&E.iv()},validateComponent:function(Y){Y&&Y.validate&&Y.validate()},$7k:function(l,Q,N,b,m,d,Z,f,E,h,A,p){if(Q.visible){var B=this._defaultRulerConfig,M="borderStyle",U="borderColor",W="borderWidth",c="background",r=Q[M]||B[M],O=Q[U]||B[U],g=Q[W]||B[W],o=Q.size!=x?Q.size:B.size,P=Q[c]||B[c],H=o+g,v=this.$6k(g,r,O,l,N,m,H,Z,f,E,h,A,p);V(l,m,"0px"),d?J.setCanvas(l,b-v,o):J.setCanvas(l,o,b-v),V(l,"background",P),V(l,y,i)}else V(l,y,j),V(this.getComponentView(this._component),m,"0px")},$6k:function(e,b,B,L,l,k,M,N,H,a,j,S,A){var Q=0;return V(L,l,e+"px "+b+" "+B),V(this.getComponentView(this._component),k,M+w),N?(V(L,H,a+w),Q+=a):V(L,H,"0px"),j?(V(L,S,A+w),Q+=A):V(L,S,"0px"),Q},validateImpl:function(){var g=this,N=g._component,Y=g.$1k,F=g.$2k,c=g.$3k,S=g.$4k,O=g._view,M=g._defaultRulerConfig,R=g._topRulerConfig,H=g._rightRulerConfig,U=g._bottomRulerConfig,b=g._leftRulerConfig,$=M.size;if(O&&N){var z=R.size!=x?R.size:$,C=H.size!=x?H.size:$,E=U.size!=x?U.size:$,L=b.size!=x?b.size:$;g.$7k(Y,R,"border-bottom",O.offsetWidth,u,!0,b.visible,D,L,H.visible,P,C),g.$7k(F,H,"border-left",O.offsetHeight,P,!1,R.visible,u,z,U.visible,X,E),g.$7k(c,U,"border-top",O.offsetWidth,X,!0,b.visible,D,L,H.visible,P,C),g.$7k(S,b,"border-right",O.offsetHeight,D,!1,R.visible,u,z,U.visible,X,E),g.$13k?delete g.$13k:g.invalidateComponent(N),g.validateComponent(N),g.$5k()}},$5k:function(){function c(i,B,T,v,H,M){if(B.visible){var o=h(i),y=B[G]||g,u=B[k]!=x?B[k]:Q,b=B[m]||s,c=B[q]||a,$=B.size!=x?B.size:O,Fg=B[W]||R,as=B[N]||P,Vn=B[F]||L,wf=B[Z]!=x?B[Z]:d,Iq=B[U]!=x?B[U]:S,Nm=B[t]!=x?B[t]:_,Lf=B[C]!=x?B[C]:f,Ni=B[V]!=x?B[V]:A,Ac=B[J]!=x?B[J]:p,ip=B[X]||es,yj=B[e]||yg;u&&(y=r[M]=r.$8k(r[M]||y,B[z]||n,B[l]||I,v?Y:K,as)),T.call(r,o,j,D,E,w,$,v?Y:K,y,b,c,H,Fg,Vn);var Pm=r.$16k;(wf||Iq)&&Pm&&(v?r.$9k(o,Pm.x,$,ip,yj,wf,Iq,Nm,Lf,Ni,Ac):r.$10k(o,Pm.y,$,ip,yj,wf,Iq,Nm,Lf,Ni,Ac,H))}}var r=this,M=r.$1k,T=r.$2k,y=r.$3k,v=r.$4k,b=r._topRulerConfig,i=r._rightRulerConfig,$=r._bottomRulerConfig,B=r._leftRulerConfig,H=r._defaultRulerConfig,u=r._component,o=r.getComponentViewRect(u),Y=r.getComponentHZoom(u),K=r.getComponentVZoom(u),j=o.x*Y,E=j+o.width*Y,D=o.y*K,w=D+o.height*K,O=r._defaultRulerConfig.size,G="defaultMajorTickSpacing",z="maxPhysicalMajorTickSpacing",l="minPhysicalMajorTickSpacing",k="tickSpacingAdaptable",m="majorTickTextFont",q="majorTickTextColor",W="majorTickColor",F="minorTickColor",Z="guideVisible",U="guideTipVisible",t="guideTipBorderColor",C="guideTipTextColor",V="guideTipTextFont",J="guideTipBackground",X="guideColor",e="guideWidth",N="minMajorTickSpacing",g=H[G],n=H[z],I=H[l],Q=H[k],s=H[m],a=H[q],R=H[W],P=H[N],L=H[F],d=H[Z],S=H[U],_=H[t],f=H[C],A=H[V],p=H[J],es=H[X],yg=H[e];r._view&&u&&(c(M,b,r.$11k,!0,!1,"_currentTopMajorTickSpacing"),c(T,i,r.$12k,!1,!0,"_currentRightMajorTickSpacing"),c(y,$,r.$11k,!0,!0,"_currentBottomMajorTickSpacing"),c(v,B,r.$12k,!1,!1,"_currenLeftMajorTickSpacing"))},$8k:function(A,W,q,t,u){return q>A*t?A=b(W/t/u)*u:A*t>W&&(A=r(q/t/u)*u),A},getHTipText:function(a){var j=this,f=j._component,N=0,c=j._view.getBoundingClientRect();return f.lp?N=O(f.lp({x:a.x+c.left,y:a.y}).x):N-=O(this.getComponentView(f).style.left)||0,N},$9k:function(K,F,n,C,g,R,f,L,v,P,q){var S=this,s=S._component;K.save(),J.translateAndScale(K,0,0,1);var m=F-(O(this.getComponentView(s).style.left)||0),k=0;if(F=S.getHTipText(S.$16k),R&&(K.beginPath(),K.fillStyle=C,K.rect(m,k,g,n),K.fill()),f){K.beginPath(),K.textAlign="center",K.textBaseline="middle",K.font=P;var _=K.measureText(F).width+6;K.fillStyle=q,K.rect(m-_/2,k,_,n),K.fill(),K.strokeStyle=L,K.stroke(),K.beginPath(),K.fillStyle=v,K.fillText(F,m,k+n/2)}K.restore()},getVTipText:function(x){var Z=this,W=Z._component,M=0,j=Z._view.getBoundingClientRect();return W.lp?M=O(W.lp({x:x.x,y:x.y+j.top}).y):M-=O(this.getComponentView(W).style.top)||0,M},formatScaleText:function(S){return Math.round(S)},$10k:function(M,X,_,H,K,j,B,s,e,x,F,b){var p=this,S=p._component;M.save(),J.translateAndScale(M,0,0,1);var V=_/2,l=X-(O(this.getComponentView(S).style.top)||0);if(X=p.getVTipText(p.$16k),j&&(M.beginPath(),M.fillStyle=H,M.rect(V-_/2,l,_,K),M.fill()),B){M.translate(V,l),M.rotate((b?90:-90)*E/180),M.translate(-V,-l),M.beginPath(),M.textAlign="center",M.textBaseline="middle",M.font=x;var C=M.measureText(X).width+6;M.fillStyle=F,M.rect(V-C/2,l-_/2,C,_),M.fill(),M.strokeStyle=s,M.stroke(),M.fillStyle=e,M.fillText(X,V,l)}M.restore()},$11k:function(S,z,q,o,Z,i,j,d,D,t,X,B,w){S.save(),q=0;var G=z,p=o,P=(G+p)/2;z=0,o=p-G,J.translateAndScale(S,0,0,1);var r=0,I=0,R=O(i/2),n=i-R,c=X?0:R,x=d*j,V=x/10;z-=x,o+=x,S.clearRect(z,0,o-z,i),S.beginPath(),S.fillStyle=w;var M=b(P/V)*V-G;for(r=M;o>r;r+=V)S.rect(r,q+c,1,n);for(r=M;r>z;r-=V)S.rect(r,q+c,1,n);for(S.fill(),c=X?0:1,S.beginPath(),S.fillStyle=B,M=b(P/x)*x-G,r=M;o>r;r+=x)S.rect(r,q+c,1,i-1);for(r=M;r>z;r-=x)S.rect(r,q+c,1,i-1);S.fill();var F=O(/\d+px/.exec(D)[0]),A=(F||10)/2;S.textBaseline="middle",c=X?i-A-2:A+2,S.beginPath(),S.fillStyle=t,S.font=D;var L=b(P/x)*x/j;for(r=M,I=L;o>r;r+=x,I+=d){var k=this.getHScaleText?this.getHScaleText(r):I;S.fillText(this.formatScaleText(k),r+2,q+c)}for(r=M,I=L;r>z;r-=x,I-=d){var k=this.getHScaleText?this.getHScaleText(r):I;S.fillText(this.formatScaleText(k),r+2,q+c)}S.restore()},$12k:function(y,X,I,z,c,m,p,h,T,u,r,W,H){function e(r,Z,n,f,d,W){d=B.getVScaleText?B.getVScaleText(n):d,d=B.formatScaleText(d),y.translate(r+Z,n),y.rotate(-f),y.translate(-r-Z,-n),y.fillText(d,r+Z+(W?2:1),n),y.translate(r+Z,n),y.rotate(f),y.translate(-r-Z,-n)}y.save(),X=0;var M=I,F=c,o=(M+F)/2;I=0,c=F-M,J.translateAndScale(y,0,0,1);var n=0,B=this,f=0,w=O(m/2),K=m-w,C=r?0:w,i=h*p,S=i/10;I-=i,c+=i,y.clearRect(X,0,m,c-I),y.beginPath(),y.fillStyle=H;var v=b(o/S)*S-M;for(n=v;c>n;n+=S)y.rect(X+C,n,K,1);for(n=v;n>I;n-=S)y.rect(X+C,n,K,1);for(y.fill(),C=r?0:1,y.beginPath(),y.fillStyle=W,v=b(o/i)*i-M,n=v;c>n;n+=i)y.rect(X+C,n,m-1,1);for(n=v;n>I;n-=i)y.rect(X+C,n,m-1,1);y.fill();var P=O(/\d+px/.exec(T)[0]),D=(P||10)/2,x=90*E/180;y.textBaseline="middle",C=r?m-D:D+2,x=r?-x:x,y.beginPath(),y.fillStyle=u,y.font=T;var l=b(o/i)*i/p;for(n=v,f=l;c>n;n+=i,f+=h)e(X,C,n,x,f,r);for(n=v,f=l;n>I;n-=i,f-=h)e(X,C,n,x,f,r);y.restore()},onPropertyChanged:function(){this.iv()},dispose:function(){var w=this,e=w._component,R=w._view;e&&w.removeComponentPropertyChangeListener(e,w.$14k),R&&(G(R,"mousemove",w.$15k),L(R.parentNode,R),w._view=null)}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);