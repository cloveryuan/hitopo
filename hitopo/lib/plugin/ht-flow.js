!function(q){"use strict";var c="ht",O=q[c],y=O.Default,S=Math,i=S.PI,v=2*i,d=S.sin,l=S.cos,j=S.atan2,K=S.sqrt,m=S.max,o=S.floor,D=(S.round,S.ceil),u=S.abs,$=O.Shape,P=O.Edge,w=O.List,e=O.Style,g=O.graph,X=y.getInternal(),Q=X.ui(),J=null,s="__segmentLengths",p="__lineTotalLength",V="__linePoints",k="__distance0",t="flow.count",U="flow.step",A="flow.element.max",_="flow.element.count",G="flow.element.min",z="flow.element.space",Y="flow.element.autorotate",E="flow.element.background",h="flow.element.shadow.max",Z="flow.element.shadow.min",x="flow.element.shadow.begincolor",C="flow.element.shadow.endcolor",b="flow.element.shadow.visible",B="flow.element.image",N="flow",f="prototype",H=g.GraphView[f],T=O.Data[f],F=Q.DataUI[f],R=Q.ShapeUI[f],L=Q.EdgeUI[f],a=O.DataModel[f],I=R._80o,W=L._80o,r=a.prepareRemove,n=L._79o,M=R._79o,Rf=H.setDataModel,ck=function(d){return document.createElement(d)};H.calculatePointLength=function(O,A,d){var m=this,k=m.getDataUI(O);d==J&&(d=.1);var D=uh(k),v=[];if(D){for(var K=D.length,z=0;K>z;z++){var N=D[z];N._as&&(N=N._as);for(var x=N[0],E=1;E<N.length;E++)v.push([x,N[E]]),x=N[E]}for(var r=[],z=0;z<v.length;z++){var Y=Lq(v[z][0],v[z][1],A);r.push(Y)}var p=r.slice(0);p.sort(function(Z,F){return Z.z>F.z?1:Z.z<F.z?-1:0});var t=p[0];if(t.z<d){for(var M=r.indexOf(t),l=0,z=0;M>=z;z++)l+=M>z?y.getDistance(v[z][0],v[z][1]):y.getDistance(v[z][0],t);return l}}},y.calculatePointLength=function(O,G,K,x){x==J&&(x=.1);var T=uh(J,O,G),G=[];if(T){for(var I=T.length,v=0;I>v;v++){var A=T[v];A._as&&(A=A._as);for(var m=A[0],W=1;W<A.length;W++)G.push([m,A[W]]),m=A[W]}for(var Q=[],v=0;v<G.length;v++){var M=Lq(G[v][0],G[v][1],K);Q.push(M)}var X=Q.slice(0);X.sort(function(C,c){return C.z>c.z?1:C.z<c.z?-1:0});var L=X[0];if(L.z<x){for(var p=Q.indexOf(L),h=0,v=0;p>=v;v++)h+=p>v?y.getDistance(G[v][0],G[v][1]):y.getDistance(G[v][0],L);return h}}},H.calculateClosestPoint=function(l,D){var n=this,A=n.getDataUI(l),U=uh(A),f=[];if(U){for(var z=U.length,F=0;z>F;F++){var p=U[F];p._as&&(p=p._as);for(var P=p[0],d=1;d<p.length;d++)f.push([P,p[d]]),P=p[d]}for(var X=[],F=0;F<f.length;F++){var u=Lq(f[F][0],f[F][1],D);X.push(u)}return X.sort(function(u,x){return u.z>x.z?1:u.z<x.z?-1:0}),X[0]}},y.calculateClosestPoint=function(G,k,Y){var z=uh(J,G,k),k=[];if(z){for(var g=z.length,N=0;g>N;N++){var i=z[N];i._as&&(i=i._as);for(var o=i[0],W=1;W<i.length;W++)k.push([o,i[W]]),o=i[W]}for(var C=[],N=0;N<k.length;N++){var D=Lq(k[N][0],k[N][1],Y);C.push(D)}return C.sort(function(W,w){return W.z>w.z?1:W.z<w.z?-1:0}),C[0]}},H.getPercentAngle=function(w,H){var Y=this,W=Y.getDataUI(w),f=w.getRotation?w.getRotation():0,g=uh(W);if(g)if(0===H){var O=g[0][0],J=g[0][1];f+=j(J.y-O.y,J.x-O.x)}else if(100===H){g=g[g.length-1];var O=g[g.length-2],J=g[g.length-1];f+=j(J.y-O.y,J.x-O.x)}else{for(var x=0,Z=[],C=g.length,I=0;C>I;I++){var o=g[I],y=ar(o);x+=y,Z.push(y)}for(var $=x*H/100,k=Up($,Z),B=0,R=0;k>R;R++)B+=Z[R];$-=B;for(var v=Tm(g[k],$),s=g[k],M=0,X=0,A=0;A<s.length-1;A++){var E=s[A],n=s[A+1],q=n.x-E.x,d=n.y-E.y,u=K(q*q+d*d);if(M+=u,M>$){X=A;break}}var b=s[X];f+=j(v.y-b.y,v.x-b.x)}return f},y.getPercentAngle=function(g,Z,Y){var f=0,U=uh(J,g,Z);if(U)if(0===Y){var _=U[0][0],I=U[0][1];f+=j(I.y-_.y,I.x-_.x)}else if(100===Y){U=U[U.length-1];var _=U[U.length-2],I=U[U.length-1];f+=j(I.y-_.y,I.x-_.x)}else{for(var D=0,l=[],G=U.length,V=0;G>V;V++){var E=U[V],W=ar(E);D+=W,l.push(W)}for(var i=D*Y/100,L=Up(i,l),X=0,s=0;L>s;s++)X+=l[s];i-=X;for(var A=Tm(U[L],i),B=U[L],F=0,C=0,m=0;m<B.length-1;m++){var w=B[m],q=B[m+1],r=q.x-w.x,N=q.y-w.y,H=K(r*r+N*N);if(F+=H,F>i){C=m;break}}var P=B[C];f+=j(A.y-P.y,A.x-P.x)}return f},H.calculateLength=function(N){var Q=this,J=Q.getDataUI(N),b=uh(J),A=0;if(b)if(Array.isArray(b[0]))for(var e=b.length,G=0;e>G;G++){var C=b[G],d=ar(C);A+=d}else A=ar(b);return A},y.calculateLength=function(i,m){var i=uh(J,i,m),h=0;if(i)if(Array.isArray(i[0]))for(var V=i.length,$=0;V>$;$++){var p=i[$],D=ar(p);h+=D}else h=ar(i);return h};var Lq=y.calculateClosestPointOnLine=function(p,e,Q){var c=p.x,K=p.y,v=e.x,C=e.y,o=Q.x,P=Q.y,y={},G=v-c,I=C-K,i=Math.sqrt(G*G+I*I),j=G/i,L=I/i,S=(-c+o)*j+(-K+P)*L;return y.x=c+S*j,y.y=K+S*L,mk(y,p,e)||(y.x=Math.abs(y.x-p.x)<Math.abs(y.x-e.x)?p.x:e.x,y.y=Math.abs(y.y-p.y)<Math.abs(y.y-e.y)?p.y:e.y),G=o-y.x,I=P-y.y,y.z=Math.sqrt(G*G+I*I),y},mk=function(F,s,p){return F.x>=Math.min(s.x,p.x)&&F.x<=Math.max(s.x,p.x)&&F.y>=Math.min(s.y,p.y)&&F.y<=Math.max(s.y,p.y)},ar=function(P){for(var X=0,M=P.length-1,U=0;M>U;U++){var a=P[U],I=P[U+1],z=I.x-a.x,s=I.y-a.y,E=K(z*z+s*s);X+=E}return X},Tm=function(a,E){for(var G=0,u=0,o=0,B=a.length-1,p=0;B>p;p++){var H=a[p],P=a[p+1],s=P.x-H.x,h=P.y-H.y;if(o=K(s*s+h*h),G+=o,G>E){G-=o,u=p;break}}var x=a[u],y=a[u+1],S=j(y.y-x.y,y.x-x.x),b=E-G,h=d(S)*b,s=l(S)*b;return{x:x.x+s,y:x.y+h}},yf=function(n,L,P,M){var e=l(M),h=d(M),Y=e*L-h*P,$=h*L+e*P;return n?{x:n.x+Y,y:n.y+$}:{x:Y,y:$}},Lo=function(i,G){i[s]=i[p]=i[V]=G[k]=J},ul=function(M,F,W,$,B,k){var H,E,P,g,Q,x,j,y,G,m,t,s=[];if(u($)>v&&($=v),Q=D(u($)/(i/4)),H=$/Q,E=-H,P=-W,Q>0){x=M+l(W)*B,j=F+d(-W)*k,s.push({x:x,y:j});for(var V=0;Q>V;V++)P+=E,g=P-E/2,y=M+l(P)*B,G=F+d(P)*k,m=M+l(g)*(B/l(E/2)),t=F+d(g)*(k/l(E/2)),s.push({x:m,y:t}),s.push({x:y,y:G})}return s},uh=function(M,S,s){if(S==J){var k=M._data;if(k instanceof $){if(S=k.getPoints(),s=k.getSegments(),(!s||0===s.size())&&S){s=new O.List([1]);for(var r=1;r<S.size();r++)s.add(2)}}else if(k instanceof P){var Y=M._78o;if(Y){var R=Y.type,j=Y.points,l=Y.segments,G=Y._4O;if(!R||j){var E=Y.sourcePoint,B=E.x,f=E.y,c=Y.targetPoint,L=c.x,N=c.y;if(R)l?(S=new w({x:B,y:f}),S.addAll(j),S.add({x:L,y:N}),s=new w(l._as)):(S=new w({x:B,y:f}),s=new w([1]),j.each(function(Y){S.add(Y),s.add(2)}),S.add({x:L,y:N}),s.add(2));else if(Y.looped){S=new w(ul(B,f,0,v,Y.radius,Y.radius)),s=new w([1]);for(var r=0;r<(S.size()-1)/2;r++)s.add(3)}else S=new w,Y.center?(S.add({x:Y.c1.x,y:Y.c1.y}),S.add({x:B,y:f}),S.add({x:L,y:N}),S.add({x:Y.c2.x,y:Y.c2.y}),s=new w([1,2,2,2])):(S.add({x:B,y:f}),S.add({x:L,y:N}),s=new w([1,2]))}else if(G)if(S=new w(G.points._as),G.segments)s=new w(G.segments._as);else{s=new w([1]);for(var r=1;r<G.points.size();r++)s.add(2)}}}}if(S){if(Array.isArray(S)&&(S=new w(S)),"number"==typeof S.get(0)){for(var T=new O.List,r=0;r<S.size();r+=2)T.add({x:S.get(r),y:S.get(r+1)});S=T}if(!s){s=[];for(var r=0;r<S.size();r++)0===r?s.push(1):s.push(2)}Array.isArray(s)&&(s=new w(s));for(var D=X.toPointsArray(S._as,s._as,50),V=D.length,h=[],r=0;V>r;r++){var H=D[r];H.length>1&&h.push(H)}return h}},ue=function(x){var n=x._data,t=uh(x);if(t){n.s("flow.reverse")&&(t.reverse(),t.forEach(function(X){X.reverse()}));for(var N=0,U=[],o=t.length,R=0;o>R;R++){var i=t[R],X=ar(i);N+=X,U.push(X)}if(n[s]=U,n[p]=N,n[V]=t,n instanceof P){var W=y.unionPoint(t),k=W.x+W.width/2,g=W.y+W.height/2;n.$10e={x:k,y:g}}lp(x,!0)}},lp=(y.getPercentPositionOnPoints=function(A,T,j){if(A){var p=uh(J,A,T);if(p){var B;if(0===j)B=p[0][0];else if(100===j)p=p[p.length-1],B=p[p.length-1];else{for(var i=0,R=[],N=p.length,S=0;N>S;S++){var K=p[S],t=ar(K);i+=t,R.push(t)}for(var z=i*j/100,H=Up(z,R),c=0,Z=0;H>Z;Z++)c+=R[Z];z-=c,B=Tm(p[H],z)}return B}}},H.getPercentPosition=function(B,v){var z=this,E=z.getDataUI(B),k=uh(E);if(k){var m;if(0===v)m=k[0][0];else if(100===v)k=k[k.length-1],m=k[k.length-1];else{for(var K=0,q=[],F=k.length,C=0;F>C;C++){var T=k[C],G=ar(T);K+=G,q.push(G)}for(var o=K*v/100,h=Up(o,q),W=0,Z=0;h>Z;Z++)W+=q[Z];o-=W,m=Tm(k[h],o)}return m}},function(O,Y){var e=O._data,u=e[p],D=e.s(t),P=e.s(U),L=0,l=e[s],X=e.s(A),f=e.s(G),g=e.s(_),C=(X-f)/(g-1),i=[];if(l){if(1===g)i.push(X);else if(2===g)i.push(X),i.push(f);else{if(!(g>2))return;i.push(X);for(var r=g-2;r>0;r--)i.push(f+C*r);i.push(f)}var T=0,j=0;i.forEach(function(i){g-1>T&&(j+=e.getFlowElementSpace(i)),T++}),j+=(X+f)/2,L=(u-D*j+j)/D;var v=O[k];for(null==v&&(v=0),Y||(v+=P);v>u+j;){var w=O._overCount;w?w++:w=1,w>=D&&(w=null),O._overCount=w,e.s("flow.autoreverse")?w?v-=L+j:(v=0,e.s("flow.reverse",!e.s("flow.reverse"))):v-=L+j}O[k]=v}}),kp=function(Q){var d=Q.data,G=this.dm();if(d&&"add"===Q.kind){var I=G.$3e;I&&d.s(N)&&I.indexOf(d)<0&&I.push(d)}"clear"===Q.kind&&(G.$3e=[])},Zd=function(J){var M=J.property,F=J.data,H=J.newValue,V=this.dm().$3e;if(V&&"s:flow"===M)if(H)V.indexOf(F)<0&&V.push(F);else for(var v=V.length,K=0;v>K;K++)if(V[K]===F){V.splice(K,1);break}},Up=Up=function(V,K){for(var Z=0,l=K.length,m=0;l>m;m++){var S=K[m];if(Z+=S,Z>V)return m}return Math.min(m,l-1)},gl=function(B){var c=this,R=c._data,D=R[p],y=R[s],w=R[V],r=R.s(t),W=0,Q=c[k],f=R.s(A),E=R.s(G),F=R.s(_),U=R.s(Z),L=R.s(h),e=R.s(Y),l=(L-U)/(F-1),d=(f-E)/(F-1),i=R.getRotation?R.getRotation():0,$=R.getPosition?R.p():R.$10e,N=[],n=[];if(Q!=J){if(1===F)N.push(f);else if(2===F)N.push(f),N.push(E);else{if(!(F>2))return;N.push(f);for(var O=F-2;O>0;O--)N.push(E+d*O);N.push(E)}if(1===F)n.push(L);else if(2===F)n.push(L),n.push(U);else{if(!(F>2))return;n.push(L);for(var O=F-2;O>0;O--)n.push(U+l*O);n.push(U)}var M=0,H=0;N.forEach(function($){F-1>M&&(H+=R.getFlowElementSpace($)),M++}),H+=(f+E)/2,W=(D-r*H+H)/r,B.save();for(var O=0;r>O;O++){var v=Q,m=0,o=c._overCount,z=0;R.s("flow.autoreverse")&&o&&o>r-(O+1)||(v-=O*(W+H),M=0,N.forEach(function(a){var d=v-m;if(d>=0&&D>d){var x=!0,A=Up(d,y);z=0;for(var l=0;A>l;l++)z+=y[l];if(d-=z,x){var E=Tm(w[A],d),p=i;if(e){for(var V=w[A],Q=0,S=0,O=0;O<V.length-1;O++){var J=V[O],_=V[O+1],C=_.x-J.x,T=_.y-J.y,s=K(C*C+T*T);if(Q+=s,Q>d){S=O;break}}var h=V[S];p+=j(E.y-h.y,E.x-h.x)}i&&(E=yf($,E.x-$.x,E.y-$.y,i)),c.$5e(B,E,a,n[M],p)}}m+=R.getFlowElementSpace(N[M]),M++}))}B.restore()}},lc=function(){var z=this,p=z._data,B=p.s(A),w=!1,C=J;if(z._6I||(w=!0),C=p instanceof P?n.call(z):M.call(z),p.s(N)&&w){var c=p.s(h),F=p.s(b);F&&c>B&&(B=c),B>0&&y.grow(C,D(B/2)),ue(z)}return!p.s(N)&&w&&Lo(p,z),C};T.getFlowElementSpace=function(){return this.s(z)},R._79o=lc,L._79o=lc,e[A]==J&&(e[A]=7),e[G]==J&&(e[G]=0),e[t]==J&&(e[t]=1),e[U]==J&&(e[U]=3),e[_]==J&&(e[_]=10),e[z]==J&&(e[z]=3.5),e[Y]==J&&(e[Y]=!1),e[E]==J&&(e[E]="rgba(255, 255, 114, 0.4)"),e[x]==J&&(e[x]="rgba(255, 255, 0, 0.3)"),e[C]==J&&(e[C]="rgba(255, 255, 0, 0)"),e[b]==J&&(e[b]=1),e[h]==J&&(e[h]=22),e[Z]==J&&(e[Z]=4),a.prepareRemove=function(P){r.call(this,P);var u=P._dataModel,$=u.$3e;if($)for(var H=$.length,g=0;H>g;g++)if($[g]===P){$.splice(g,1);break}},H.setDataModel=function(v){var o=this,y=o._dataModel;if(y!==v){y&&(y.umm(kp,o),y.umd(Zd,o),y.$3e=[]),v.mm(kp,o),v.md(Zd,o);var T=v.$3e=[];v.each(function($){$.s(N)&&T.indexOf($)<0&&T.push($)}),Rf.call(o,v)}},H.setFlowInterval=function(A){var W=this,c=W.$11e;W.$11e=A,W.fp("flowInterval",c,A),W.$7e!=J&&(clearInterval(W.$7e),delete W.$7e,W.enableFlow(A))},H.getFlowInterval=function(){return this.$11e},H.$9e=function(){var j,C,E,f=this,d=f.tx(),u=f.ty(),n=f.getZoom(),g=f.getWidth(),A=f.getHeight(),k={x:-d/n,y:-u/n,width:g/n,height:A/n},J=f.dm().$3e,v=f._56I,W=new w;if(J.forEach(function(N){v[N.getId()]&&(j=f.getDataUI(N),j&&(E=j._79o(),E&&W.add(E)))}),0!==W.size()&&(W.each(function(K){y.intersectsRect(k,K)&&(C=y.unionRect(C,K))}),C&&(C&&(y.grow(C,m(1,1/n)),C.x=o(C.x*n)/n,C.y=o(C.y*n)/n,C.width=D(C.width*n)/n,C.height=D(C.height*n)/n,C=y.intersection(k,C)),C))){var Q=f._canvas.getContext("2d");Q.save(),Q.lineCap=y.lineCap,Q.lineJoin=y.lineJoin,X.translateAndScale(Q,d,u,n),Q.beginPath(),Q.rect(C.x,C.y,C.width,C.height),Q.clip(),Q.clearRect(C.x,C.y,C.width,C.height),f.$6e(Q,C),Q.restore()}},H.$6e=function(Y,n){var v,I,V=this;V._93db(Y),V.each(function(d){V._56I[d._id]&&(v=V.getDataUI(d),v&&(I=v._79o(),(!n||y.intersectsRect(n,I))&&v._42(Y)))}),V._92db(Y)},H.enableFlow=function(X){var Q=this,G=Q.dm(),d=G.$3e;Q.$7e==J&&(d.forEach(function(s){var q=Q.getDataUI(s);ue(q)}),Q.$7e=setInterval(function(){G.$3e.forEach(function(E){lp(Q.getDataUI(E))}),Q.$9e()},X||Q.$11e||50))},H.disableFlow=function(){var E=this;clearInterval(E.$7e),delete E.$7e;var G=E.dm().$3e;G&&E.$9e()},F.$5e=function(n,R,S,a,k){var l=this,h=l._data,K=l.gv,I=h.s(E),d=h.s(x),F=h.s(C),L=h.s(b),Y=K.$8e,A=h.s(B);if(Y==J&&(Y=K.$8e={}),n.beginPath(),A!=J){var w=y.getImage(A),O=S/2;n.translate(R.x,R.y),n.rotate(k),n.translate(-R.x,-R.y),y.drawImage(n,w,R.x-O,R.y-O,S,S,h),n.translate(R.x,R.y),n.rotate(-k),n.translate(-R.x,-R.y)}else n.fillStyle=I,n.arc(R.x,R.y,S/2,0,v,!0),n.fill();if(L){var Z=22,m=Z+"_"+d+"_"+F,T=Y[m];if(T==J){var s=ck("canvas");X.setCanvas(s,Z,Z);var g=s.getContext("2d"),$=Z/2,o=$,j=$;X.translateAndScale(g,0,0,1),g.beginPath();var P=g.createRadialGradient(o,j,0,o,o,$);P.addColorStop(0,d),P.addColorStop(1,F),g.fillStyle=P,g.arc(o,j,$,0,v,!0),g.fill(),T=Y[m]=s}var O=a/2;y.drawImage(n,T,R.x-O,R.y-O,a,a,h)}},L._80o=function(x){W.call(this,x);var C=this,E=C._data,d=C.gv;E.s(N)&&d.$7e!=J&&gl.call(C,x)},R._80o=function(M){I.call(this,M);var s=this,R=s._data,q=s.gv;R.s(N)&&q.$7e!=J&&gl.call(s,M)}}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);