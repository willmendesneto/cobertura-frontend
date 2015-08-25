function strip(t){var e=document.createElement("div");return e.innerHTML=t,e.textContent||e.innerText}function getOptmizedImageUrl(t){return window.UA.isMobile()?t.replace("_b.jpg","_n.jpg"):t}function getMonthName(t){var t=parseInt(t),e="";return 1===t?e="JAN":2===t?e="FEV":3===t?e="MAR":4===t?e="ABR":5===t?e="MAI":6===t?e="JUN":7===t?e="JUL":8===t?e="AGO":9===t?e="SET":10===t?e="OUT":11===t?e="NOV":12===t&&(e="DEZ"),e}function getFormattedDate(t){var e=t.split(" ")[0].split("-",3);return e.shift(),e.reverse(),e[0]+" "+getMonthName(e[1])}function getFormattedHourAndMinutes(t){return t.split(" ")[1].split(":",2).join(":")}function capitalize(t){return t.charAt(0).toUpperCase()+t.slice(1)}function extend(t,e){t=t||{};for(var i in e)t[i]="object"==typeof e[i]?this.extend(t[i],e[i]):e[i];return t}function RenderException(t){this.message=t,this.name="RenderException"}!function(t,e,i,n){"use strict";function o(t,e,i){return setTimeout(l(t,i),e)}function r(t,e,i){return Array.isArray(t)?(s(t,i[e],i),!0):!1}function s(t,e,i){var o;if(t)if(t.forEach)t.forEach(e,i);else if(t.length!==n)for(o=0;o<t.length;)e.call(i,t[o],o,t),o++;else for(o in t)t.hasOwnProperty(o)&&e.call(i,t[o],o,t)}function a(t,e,i){for(var o=Object.keys(e),r=0;r<o.length;)(!i||i&&t[o[r]]===n)&&(t[o[r]]=e[o[r]]),r++;return t}function u(t,e){return a(t,e,!0)}function c(t,e,i){var n,o=e.prototype;n=t.prototype=Object.create(o),n.constructor=t,n._super=o,i&&a(n,i)}function l(t,e){return function(){return t.apply(e,arguments)}}function h(t,e){return typeof t==lt?t.apply(e?e[0]||n:n,e):t}function d(t,e){return t===n?e:t}function f(t,e,i){s(g(e),function(e){t.addEventListener(e,i,!1)})}function p(t,e,i){s(g(e),function(e){t.removeEventListener(e,i,!1)})}function m(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1}function v(t,e){return t.indexOf(e)>-1}function g(t){return t.trim().split(/\s+/g)}function T(t,e,i){if(t.indexOf&&!i)return t.indexOf(e);for(var n=0;n<t.length;){if(i&&t[n][i]==e||!i&&t[n]===e)return n;n++}return-1}function y(t){return Array.prototype.slice.call(t,0)}function w(t,e,i){for(var n=[],o=[],r=0;r<t.length;){var s=e?t[r][e]:t[r];T(o,s)<0&&n.push(t[r]),o[r]=s,r++}return i&&(n=e?n.sort(function(t,i){return t[e]>i[e]}):n.sort()),n}function b(t,e){for(var i,o,r=e[0].toUpperCase()+e.slice(1),s=0;s<ut.length;){if(i=ut[s],o=i?i+r:e,o in t)return o;s++}return n}function x(){return pt++}function E(t){var e=t.ownerDocument;return e.defaultView||e.parentWindow}function I(t,e){var i=this;this.manager=t,this.callback=e,this.element=t.element,this.target=t.options.inputTarget,this.domHandler=function(e){h(t.options.enable,[t])&&i.handler(e)},this.init()}function k(t){var e,i=t.options.inputClass;return new(e=i?i:gt?U:Tt?W:vt?V:D)(t,A)}function A(t,e,i){var n=i.pointers.length,o=i.changedPointers.length,r=e&It&&n-o===0,s=e&(At|Ot)&&n-o===0;i.isFirst=!!r,i.isFinal=!!s,r&&(t.session={}),i.eventType=e,O(t,i),t.emit("hammer.input",i),t.recognize(i),t.session.prevInput=i}function O(t,e){var i=t.session,n=e.pointers,o=n.length;i.firstInput||(i.firstInput=_(e)),o>1&&!i.firstMultiple?i.firstMultiple=_(e):1===o&&(i.firstMultiple=!1);var r=i.firstInput,s=i.firstMultiple,a=s?s.center:r.center,u=e.center=L(n);e.timeStamp=ft(),e.deltaTime=e.timeStamp-r.timeStamp,e.angle=M(a,u),e.distance=z(a,u),C(i,e),e.offsetDirection=S(e.deltaX,e.deltaY),e.scale=s?N(s.pointers,n):1,e.rotation=s?F(s.pointers,n):0,R(i,e);var c=t.element;m(e.srcEvent.target,c)&&(c=e.srcEvent.target),e.target=c}function C(t,e){var i=e.center,n=t.offsetDelta||{},o=t.prevDelta||{},r=t.prevInput||{};(e.eventType===It||r.eventType===At)&&(o=t.prevDelta={x:r.deltaX||0,y:r.deltaY||0},n=t.offsetDelta={x:i.x,y:i.y}),e.deltaX=o.x+(i.x-n.x),e.deltaY=o.y+(i.y-n.y)}function R(t,e){var i,o,r,s,a=t.lastInterval||e,u=e.timeStamp-a.timeStamp;if(e.eventType!=Ot&&(u>Et||a.velocity===n)){var c=a.deltaX-e.deltaX,l=a.deltaY-e.deltaY,h=B(u,c,l);o=h.x,r=h.y,i=dt(h.x)>dt(h.y)?h.x:h.y,s=S(c,l),t.lastInterval=e}else i=a.velocity,o=a.velocityX,r=a.velocityY,s=a.direction;e.velocity=i,e.velocityX=o,e.velocityY=r,e.direction=s}function _(t){for(var e=[],i=0;i<t.pointers.length;)e[i]={clientX:ht(t.pointers[i].clientX),clientY:ht(t.pointers[i].clientY)},i++;return{timeStamp:ft(),pointers:e,center:L(e),deltaX:t.deltaX,deltaY:t.deltaY}}function L(t){var e=t.length;if(1===e)return{x:ht(t[0].clientX),y:ht(t[0].clientY)};for(var i=0,n=0,o=0;e>o;)i+=t[o].clientX,n+=t[o].clientY,o++;return{x:ht(i/e),y:ht(n/e)}}function B(t,e,i){return{x:e/t||0,y:i/t||0}}function S(t,e){return t===e?Ct:dt(t)>=dt(e)?t>0?Rt:_t:e>0?Lt:Bt}function z(t,e,i){i||(i=Ft);var n=e[i[0]]-t[i[0]],o=e[i[1]]-t[i[1]];return Math.sqrt(n*n+o*o)}function M(t,e,i){i||(i=Ft);var n=e[i[0]]-t[i[0]],o=e[i[1]]-t[i[1]];return 180*Math.atan2(o,n)/Math.PI}function F(t,e){return M(e[1],e[0],Nt)-M(t[1],t[0],Nt)}function N(t,e){return z(e[0],e[1],Nt)/z(t[0],t[1],Nt)}function D(){this.evEl=Ut,this.evWin=$t,this.allow=!0,this.pressed=!1,I.apply(this,arguments)}function U(){this.evEl=Ht,this.evWin=Vt,I.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function $(){this.evTarget=jt,this.evWin=Xt,this.started=!1,I.apply(this,arguments)}function P(t,e){var i=y(t.touches),n=y(t.changedTouches);return e&(At|Ot)&&(i=w(i.concat(n),"identifier",!0)),[i,n]}function W(){this.evTarget=Yt,this.targetIds={},I.apply(this,arguments)}function H(t,e){var i=y(t.touches),n=this.targetIds;if(e&(It|kt)&&1===i.length)return n[i[0].identifier]=!0,[i,i];var o,r,s=y(t.changedTouches),a=[],u=this.target;if(r=i.filter(function(t){return m(t.target,u)}),e===It)for(o=0;o<r.length;)n[r[o].identifier]=!0,o++;for(o=0;o<s.length;)n[s[o].identifier]&&a.push(s[o]),e&(At|Ot)&&delete n[s[o].identifier],o++;return a.length?[w(r.concat(a),"identifier",!0),a]:void 0}function V(){I.apply(this,arguments);var t=l(this.handler,this);this.touch=new W(this.manager,t),this.mouse=new D(this.manager,t)}function q(t,e){this.manager=t,this.set(e)}function j(t){if(v(t,ee))return ee;var e=v(t,ie),i=v(t,ne);return e&&i?ie+" "+ne:e||i?e?ie:ne:v(t,te)?te:Qt}function X(t){this.id=x(),this.manager=null,this.options=u(t||{},this.defaults),this.options.enable=d(this.options.enable,!0),this.state=oe,this.simultaneous={},this.requireFail=[]}function G(t){return t&ce?"cancel":t&ae?"end":t&se?"move":t&re?"start":""}function Y(t){return t==Bt?"down":t==Lt?"up":t==Rt?"left":t==_t?"right":""}function K(t,e){var i=e.manager;return i?i.get(t):t}function J(){X.apply(this,arguments)}function Z(){J.apply(this,arguments),this.pX=null,this.pY=null}function Q(){J.apply(this,arguments)}function tt(){X.apply(this,arguments),this._timer=null,this._input=null}function et(){J.apply(this,arguments)}function it(){J.apply(this,arguments)}function nt(){X.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function ot(t,e){return e=e||{},e.recognizers=d(e.recognizers,ot.defaults.preset),new rt(t,e)}function rt(t,e){e=e||{},this.options=u(e,ot.defaults),this.options.inputTarget=this.options.inputTarget||t,this.handlers={},this.session={},this.recognizers=[],this.element=t,this.input=k(this),this.touchAction=new q(this,this.options.touchAction),st(this,!0),s(e.recognizers,function(t){var e=this.add(new t[0](t[1]));t[2]&&e.recognizeWith(t[2]),t[3]&&e.requireFailure(t[3])},this)}function st(t,e){var i=t.element;s(t.options.cssProps,function(t,n){i.style[b(i.style,n)]=e?t:""})}function at(t,i){var n=e.createEvent("Event");n.initEvent(t,!0,!0),n.gesture=i,i.target.dispatchEvent(n)}var ut=["","webkit","moz","MS","ms","o"],ct=e.createElement("div"),lt="function",ht=Math.round,dt=Math.abs,ft=Date.now,pt=1,mt=/mobile|tablet|ip(ad|hone|od)|android/i,vt="ontouchstart"in t,gt=b(t,"PointerEvent")!==n,Tt=vt&&mt.test(navigator.userAgent),yt="touch",wt="pen",bt="mouse",xt="kinect",Et=25,It=1,kt=2,At=4,Ot=8,Ct=1,Rt=2,_t=4,Lt=8,Bt=16,St=Rt|_t,zt=Lt|Bt,Mt=St|zt,Ft=["x","y"],Nt=["clientX","clientY"];I.prototype={handler:function(){},init:function(){this.evEl&&f(this.element,this.evEl,this.domHandler),this.evTarget&&f(this.target,this.evTarget,this.domHandler),this.evWin&&f(E(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&p(this.element,this.evEl,this.domHandler),this.evTarget&&p(this.target,this.evTarget,this.domHandler),this.evWin&&p(E(this.element),this.evWin,this.domHandler)}};var Dt={mousedown:It,mousemove:kt,mouseup:At},Ut="mousedown",$t="mousemove mouseup";c(D,I,{handler:function(t){var e=Dt[t.type];e&It&&0===t.button&&(this.pressed=!0),e&kt&&1!==t.which&&(e=At),this.pressed&&this.allow&&(e&At&&(this.pressed=!1),this.callback(this.manager,e,{pointers:[t],changedPointers:[t],pointerType:bt,srcEvent:t}))}});var Pt={pointerdown:It,pointermove:kt,pointerup:At,pointercancel:Ot,pointerout:Ot},Wt={2:yt,3:wt,4:bt,5:xt},Ht="pointerdown",Vt="pointermove pointerup pointercancel";t.MSPointerEvent&&(Ht="MSPointerDown",Vt="MSPointerMove MSPointerUp MSPointerCancel"),c(U,I,{handler:function(t){var e=this.store,i=!1,n=t.type.toLowerCase().replace("ms",""),o=Pt[n],r=Wt[t.pointerType]||t.pointerType,s=r==yt,a=T(e,t.pointerId,"pointerId");o&It&&(0===t.button||s)?0>a&&(e.push(t),a=e.length-1):o&(At|Ot)&&(i=!0),0>a||(e[a]=t,this.callback(this.manager,o,{pointers:e,changedPointers:[t],pointerType:r,srcEvent:t}),i&&e.splice(a,1))}});var qt={touchstart:It,touchmove:kt,touchend:At,touchcancel:Ot},jt="touchstart",Xt="touchstart touchmove touchend touchcancel";c($,I,{handler:function(t){var e=qt[t.type];if(e===It&&(this.started=!0),this.started){var i=P.call(this,t,e);e&(At|Ot)&&i[0].length-i[1].length===0&&(this.started=!1),this.callback(this.manager,e,{pointers:i[0],changedPointers:i[1],pointerType:yt,srcEvent:t})}}});var Gt={touchstart:It,touchmove:kt,touchend:At,touchcancel:Ot},Yt="touchstart touchmove touchend touchcancel";c(W,I,{handler:function(t){var e=Gt[t.type],i=H.call(this,t,e);i&&this.callback(this.manager,e,{pointers:i[0],changedPointers:i[1],pointerType:yt,srcEvent:t})}}),c(V,I,{handler:function(t,e,i){var n=i.pointerType==yt,o=i.pointerType==bt;if(n)this.mouse.allow=!1;else if(o&&!this.mouse.allow)return;e&(At|Ot)&&(this.mouse.allow=!0),this.callback(t,e,i)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Kt=b(ct.style,"touchAction"),Jt=Kt!==n,Zt="compute",Qt="auto",te="manipulation",ee="none",ie="pan-x",ne="pan-y";q.prototype={set:function(t){t==Zt&&(t=this.compute()),Jt&&(this.manager.element.style[Kt]=t),this.actions=t.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var t=[];return s(this.manager.recognizers,function(e){h(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()))}),j(t.join(" "))},preventDefaults:function(t){if(!Jt){var e=t.srcEvent,i=t.offsetDirection;if(this.manager.session.prevented)return void e.preventDefault();var n=this.actions,o=v(n,ee),r=v(n,ne),s=v(n,ie);return o||r&&i&St||s&&i&zt?this.preventSrc(e):void 0}},preventSrc:function(t){this.manager.session.prevented=!0,t.preventDefault()}};var oe=1,re=2,se=4,ae=8,ue=ae,ce=16,le=32;X.prototype={defaults:{},set:function(t){return a(this.options,t),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(t){if(r(t,"recognizeWith",this))return this;var e=this.simultaneous;return t=K(t,this),e[t.id]||(e[t.id]=t,t.recognizeWith(this)),this},dropRecognizeWith:function(t){return r(t,"dropRecognizeWith",this)?this:(t=K(t,this),delete this.simultaneous[t.id],this)},requireFailure:function(t){if(r(t,"requireFailure",this))return this;var e=this.requireFail;return t=K(t,this),-1===T(e,t)&&(e.push(t),t.requireFailure(this)),this},dropRequireFailure:function(t){if(r(t,"dropRequireFailure",this))return this;t=K(t,this);var e=T(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(t){return!!this.simultaneous[t.id]},emit:function(t){function e(e){i.manager.emit(i.options.event+(e?G(n):""),t)}var i=this,n=this.state;ae>n&&e(!0),e(),n>=ae&&e(!0)},tryEmit:function(t){return this.canEmit()?this.emit(t):void(this.state=le)},canEmit:function(){for(var t=0;t<this.requireFail.length;){if(!(this.requireFail[t].state&(le|oe)))return!1;t++}return!0},recognize:function(t){var e=a({},t);return h(this.options.enable,[this,e])?(this.state&(ue|ce|le)&&(this.state=oe),this.state=this.process(e),void(this.state&(re|se|ae|ce)&&this.tryEmit(e))):(this.reset(),void(this.state=le))},process:function(){},getTouchAction:function(){},reset:function(){}},c(J,X,{defaults:{pointers:1},attrTest:function(t){var e=this.options.pointers;return 0===e||t.pointers.length===e},process:function(t){var e=this.state,i=t.eventType,n=e&(re|se),o=this.attrTest(t);return n&&(i&Ot||!o)?e|ce:n||o?i&At?e|ae:e&re?e|se:re:le}}),c(Z,J,{defaults:{event:"pan",threshold:10,pointers:1,direction:Mt},getTouchAction:function(){var t=this.options.direction,e=[];return t&St&&e.push(ne),t&zt&&e.push(ie),e},directionTest:function(t){var e=this.options,i=!0,n=t.distance,o=t.direction,r=t.deltaX,s=t.deltaY;return o&e.direction||(e.direction&St?(o=0===r?Ct:0>r?Rt:_t,i=r!=this.pX,n=Math.abs(t.deltaX)):(o=0===s?Ct:0>s?Lt:Bt,i=s!=this.pY,n=Math.abs(t.deltaY))),t.direction=o,i&&n>e.threshold&&o&e.direction},attrTest:function(t){return J.prototype.attrTest.call(this,t)&&(this.state&re||!(this.state&re)&&this.directionTest(t))},emit:function(t){this.pX=t.deltaX,this.pY=t.deltaY;var e=Y(t.direction);e&&this.manager.emit(this.options.event+e,t),this._super.emit.call(this,t)}}),c(Q,J,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[ee]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.scale-1)>this.options.threshold||this.state&re)},emit:function(t){if(this._super.emit.call(this,t),1!==t.scale){var e=t.scale<1?"in":"out";this.manager.emit(this.options.event+e,t)}}}),c(tt,X,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[Qt]},process:function(t){var e=this.options,i=t.pointers.length===e.pointers,n=t.distance<e.threshold,r=t.deltaTime>e.time;if(this._input=t,!n||!i||t.eventType&(At|Ot)&&!r)this.reset();else if(t.eventType&It)this.reset(),this._timer=o(function(){this.state=ue,this.tryEmit()},e.time,this);else if(t.eventType&At)return ue;return le},reset:function(){clearTimeout(this._timer)},emit:function(t){this.state===ue&&(t&&t.eventType&At?this.manager.emit(this.options.event+"up",t):(this._input.timeStamp=ft(),this.manager.emit(this.options.event,this._input)))}}),c(et,J,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[ee]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.rotation)>this.options.threshold||this.state&re)}}),c(it,J,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:St|zt,pointers:1},getTouchAction:function(){return Z.prototype.getTouchAction.call(this)},attrTest:function(t){var e,i=this.options.direction;return i&(St|zt)?e=t.velocity:i&St?e=t.velocityX:i&zt&&(e=t.velocityY),this._super.attrTest.call(this,t)&&i&t.direction&&t.distance>this.options.threshold&&dt(e)>this.options.velocity&&t.eventType&At},emit:function(t){var e=Y(t.direction);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t)}}),c(nt,X,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[te]},process:function(t){var e=this.options,i=t.pointers.length===e.pointers,n=t.distance<e.threshold,r=t.deltaTime<e.time;if(this.reset(),t.eventType&It&&0===this.count)return this.failTimeout();if(n&&r&&i){if(t.eventType!=At)return this.failTimeout();var s=this.pTime?t.timeStamp-this.pTime<e.interval:!0,a=!this.pCenter||z(this.pCenter,t.center)<e.posThreshold;this.pTime=t.timeStamp,this.pCenter=t.center,a&&s?this.count+=1:this.count=1,this._input=t;var u=this.count%e.taps;if(0===u)return this.hasRequireFailures()?(this._timer=o(function(){this.state=ue,this.tryEmit()},e.interval,this),re):ue}return le},failTimeout:function(){return this._timer=o(function(){this.state=le},this.options.interval,this),le},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==ue&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),ot.VERSION="2.0.4",ot.defaults={domEvents:!1,touchAction:Zt,enable:!0,inputTarget:null,inputClass:null,preset:[[et,{enable:!1}],[Q,{enable:!1},["rotate"]],[it,{direction:St}],[Z,{direction:St},["swipe"]],[nt],[nt,{event:"doubletap",taps:2},["tap"]],[tt]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var he=1,de=2;rt.prototype={set:function(t){return a(this.options,t),t.touchAction&&this.touchAction.update(),t.inputTarget&&(this.input.destroy(),this.input.target=t.inputTarget,this.input.init()),this},stop:function(t){this.session.stopped=t?de:he},recognize:function(t){var e=this.session;if(!e.stopped){this.touchAction.preventDefaults(t);var i,n=this.recognizers,o=e.curRecognizer;(!o||o&&o.state&ue)&&(o=e.curRecognizer=null);for(var r=0;r<n.length;)i=n[r],e.stopped===de||o&&i!=o&&!i.canRecognizeWith(o)?i.reset():i.recognize(t),!o&&i.state&(re|se|ae)&&(o=e.curRecognizer=i),r++}},get:function(t){if(t instanceof X)return t;for(var e=this.recognizers,i=0;i<e.length;i++)if(e[i].options.event==t)return e[i];return null},add:function(t){if(r(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t},remove:function(t){if(r(t,"remove",this))return this;var e=this.recognizers;return t=this.get(t),e.splice(T(e,t),1),this.touchAction.update(),this},on:function(t,e){var i=this.handlers;return s(g(t),function(t){i[t]=i[t]||[],i[t].push(e)}),this},off:function(t,e){var i=this.handlers;return s(g(t),function(t){e?i[t].splice(T(i[t],e),1):delete i[t]}),this},emit:function(t,e){this.options.domEvents&&at(t,e);var i=this.handlers[t]&&this.handlers[t].slice();if(i&&i.length){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};for(var n=0;n<i.length;)i[n](e),n++}},destroy:function(){this.element&&st(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},a(ot,{INPUT_START:It,INPUT_MOVE:kt,INPUT_END:At,INPUT_CANCEL:Ot,STATE_POSSIBLE:oe,STATE_BEGAN:re,STATE_CHANGED:se,STATE_ENDED:ae,STATE_RECOGNIZED:ue,STATE_CANCELLED:ce,STATE_FAILED:le,DIRECTION_NONE:Ct,DIRECTION_LEFT:Rt,DIRECTION_RIGHT:_t,DIRECTION_UP:Lt,DIRECTION_DOWN:Bt,DIRECTION_HORIZONTAL:St,DIRECTION_VERTICAL:zt,DIRECTION_ALL:Mt,Manager:rt,Input:I,TouchAction:q,TouchInput:W,MouseInput:D,PointerEventInput:U,TouchMouseInput:V,SingleTouchInput:$,Recognizer:X,AttrRecognizer:J,Tap:nt,Pan:Z,Swipe:it,Pinch:Q,Rotate:et,Press:tt,on:f,off:p,each:s,merge:u,extend:a,inherit:c,bindFn:l,prefixed:b}),typeof define==lt&&define.amd?define(function(){return ot}):"undefined"!=typeof module&&module.exports?module.exports=ot:t[i]=ot}(window,document,"Hammer"),function(t){"function"==typeof define&&define.amd?define(["jquery","hammerjs"],t):"object"==typeof exports?t(require("jquery"),require("hammerjs")):t(jQuery,Hammer)}(function(t,e){function i(i,n){var o=t(i);o.data("hammer")||o.data("hammer",new e(o[0],n))}t.fn.hammer=function(t){return this.each(function(){i(this,t)})},e.Manager.prototype.emit=function(e){return function(i,n){e.call(this,i,n),t(this.element).trigger({type:i,gesture:n})}}(e.Manager.prototype.emit)}),$(document).ready(function(){$("[data-toggle]").click(function(){var t=$(this).data("toggle");$(t).toggleClass("open"),$(this).toggleClass("open")}),$("main > aside").hammer().on("swipe",function(){$(this).toggleClass("open"),$("[data-toggle]").toggleClass("open")})}),$(document).ready(function(){$(".choose-photos").magnificPopup({delegate:"a",type:"image",tLoading:"Carregando #%curr%...",mainClass:"mfp-img-mobile",tCounter:'<span class="mfp-counter">%curr% de %total%</span>',gallery:{enabled:!0,navigateByImgClick:!0,preload:[0,1]}})}),$(document).ready(function(){Galleria.loadTheme("//cdnjs.cloudflare.com/ajax/libs/galleria/1.4.2/themes/classic/galleria.classic.min.js")}),function(t,e){"use strict";function i(t){return function(){return t.test(n)}}var n=t.navigator&&e.userAgent||"",o={isChrome:i(/webkit\W.*(chrome|chromium)\W/i),isFirefox:i(/mozilla.*\Wfirefox\W/i),isGecko:i(/mozilla(?!.*webkit).*\Wgecko\W/i),isIE:function(){return"Microsoft Internet Explorer"===e.appName?!0:i(/\bTrident\b/)?!0:!1},isKindle:i(/\W(kindle|silk)\W/i),isMobile:i(/(iphone|ipod|((?:android)?.*?mobile)|blackberry|nokia)/i),isOpera:i(/opera.*\Wpresto\W|OPR/i),isSafari:i(/webkit\W(?!.*chrome).*safari\W/i),isTablet:i(/(ipad|android(?!.*mobile)|tablet)/i),isTV:i(/googletv|sonydtv/i),isWebKit:i(/webkit\W/i),isAndroid:i(/android/i),isIOS:i(/(ipad|iphone|ipod)/i),isIPad:i(/ipad/i),isIPhone:i(/iphone/i),isIPod:i(/ipod/i),whoami:function(){return n}};"function"==typeof define&&define.amd?define([],function(){return o}):"undefined"!=typeof module&&module.exports?(module.exports=o.attach,module.exports.UA=o):t.UA=o}(window,navigator),function(t,e){"use strict";"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?module.exports=e():t.viewportUnitsBuggyfill=e()}(this,function(){"use strict";function t(t,e){var i;return function(){var n=this,o=arguments,r=function(){t.apply(n,o)};clearTimeout(i),i=setTimeout(r,e)}}function e(){try{return window.self!==window.top}catch(t){return!0}}function i(i){y||(i===!0&&(i={force:!0}),m=i||{},m.isMobileSafari=k,m.isBadStockAndroid=A,(m.force||k||E||A||I||m.hacks&&m.hacks.required(m))&&(m.hacks&&m.hacks.initialize(m),y=!0,T=document.createElement("style"),T.id="patched-viewport",document.head.appendChild(T),h(function(){var i=t(o,m.refreshDebounceWait||100);window.addEventListener("orientationchange",i,!0),window.addEventListener("pageshow",i,!0),(m.force||E||e())&&(window.addEventListener("resize",i,!0),m._listeningToResize=!0),m.hacks&&m.hacks.initializeEvents(m,o,i),o()})))}function n(){T.textContent=a()}function o(){y&&(r(),setTimeout(function(){n()},1))}function r(){return g=[],x.call(document.styleSheets,function(t){"patched-viewport"!==t.ownerNode.id&&t.cssRules&&"ignore"!==t.ownerNode.getAttribute("data-viewport-units-buggyfill")&&(t.media&&t.media.mediaText&&window.matchMedia&&!window.matchMedia(t.media.mediaText).matches||x.call(t.cssRules,s))}),g}function s(t){if(7===t.type){var e;try{e=t.cssText}catch(i){return}return b.lastIndex=0,void(b.test(e)&&(g.push([t,null,e]),m.hacks&&m.hacks.findDeclarations(g,t,null,e)))}if(!t.style){if(!t.cssRules)return;return void x.call(t.cssRules,function(t){s(t)})}x.call(t.style,function(e){var i=t.style.getPropertyValue(e);b.lastIndex=0,b.test(i)&&(g.push([t,e,i]),m.hacks&&m.hacks.findDeclarations(g,t,e,i))})}function a(){v=l();var t,e,i=[],n=[];return g.forEach(function(o){var r=u.apply(null,o),s=r.selector.length?r.selector.join(" {\n")+" {\n":"",a=new Array(r.selector.length+1).join("\n}");return s&&s===t?(s&&!t&&(t=s,e=a),void n.push(r.content)):(n.length&&(i.push(t+n.join("\n")+e),n.length=0),void(s?(t=s,e=a,n.push(r.content)):(i.push(r.content),t=null,e=null)))}),n.length&&i.push(t+n.join("\n")+e),I&&i.push("* { content: normal !important; }"),i.join("\n\n")}function u(t,e,i){var n,o=[];n=i.replace(b,c),m.hacks&&(n=m.hacks.overwriteDeclaration(t,e,n)),e&&(o.push(t.selectorText),n=e+": "+n+";");for(var r=t.parentRule;r;)o.unshift("@media "+r.media.mediaText),r=r.parentRule;return{selector:o,content:n}}function c(t,e,i){var n=v[i],o=parseFloat(e)/100;return o*n+"px"}function l(){var t=window.innerHeight,e=window.innerWidth;return{vh:t,vw:e,vmax:Math.max(e,t),vmin:Math.min(e,t)}}function h(t){var e=0,i=function(){e--,e||t()};x.call(document.styleSheets,function(t){t.href&&d(t.href)!==d(location.href)&&(e++,f(t.ownerNode,i))}),e||t()}function d(t){return t.slice(0,t.indexOf("/",t.indexOf("://")+3))}function f(t,e){p(t.href,function(){var i=document.createElement("style");i.media=t.media,i.setAttribute("data-href",t.href),i.textContent=this.responseText,t.parentNode.replaceChild(i,t),e()},e)}function p(t,e,i){var n=new XMLHttpRequest;if("withCredentials"in n)n.open("GET",t,!0);else{if("undefined"==typeof XDomainRequest)throw new Error("cross-domain XHR not supported");n=new XDomainRequest,n.open("GET",t)}return n.onload=e,n.onerror=i,n.send(),n}var m,v,g,T,y=!1,w=window.navigator.userAgent,b=/([+-]?[0-9.]+)(vh|vw|vmin|vmax)/g,x=[].forEach,E=!1,I=w.indexOf("Opera Mini")>-1,k=/(iPhone|iPod|iPad).+AppleWebKit/i.test(w)&&function(){var t=w.match(/OS (\d)/);return t&&t.length>1&&parseInt(t[1])<8}(),A=function(){var t=w.indexOf(" Android ")>-1;if(!t)return!1;var e=w.indexOf("Version/")>-1;if(!e)return!1;var i=parseFloat((w.match("Android ([0-9.]+)")||[])[1]);return 4.4>=i}();return E||(E=!!navigator.userAgent.match(/Trident.*rv[ :]*11\./)),{version:"0.5.0",findProperties:r,getCss:a,init:i,refresh:o}}),function(t,e){"use strict";"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?module.exports=e():t.viewportUnitsBuggyfillHacks=e()}(this,function(){"use strict";function t(t,e,o,r){var s="content"===o&&r.indexOf("viewport-units-buggyfill")>-1;if(s){var a=r.replace(n,"");a.split(";").forEach(function(n){var o=n.split(":");if(2===o.length){var r=o[0].trim();if("viewport-units-buggyfill"!==r){var s=o[1].trim();if(t.push([e,r,s]),i.test(s)){var a=s.replace(i,"-webkit-calc(");t.push([e,r,a])}}}})}}var e,i=/calc\(/g,n=/[\"\']/g,o=!1,r=!0,s=!0;return{required:function(t){return t.isMobileSafari||o},initialize:function(t){e=t;var i=document.createElement("div");i.style.width="1vmax",r=""!==i.style.width,(e.isMobileSafari||e.isBadStockAndroid)&&(s=!1)},initializeEvents:function(t,e,i){t.force||o&&!t._listeningToResize&&(window.addEventListener("resize",i,!0),t._listeningToResize=!0)},findDeclarations:function(e,i,n,o){null!==n&&t(e,i,n,o)},overwriteDeclaration:function(t,e,i){return o&&"filter"===e&&(i=i.replace(/px/g,"")),i}}}),function(t){"use strict";var e=t.TimeLineStore,i=t.TimelineBlocks,n=function(){var t=$(".timeline-block:last-child");return t.size()>0?i.elementIsVisibleOnViewport(t):!0},o=function(){if(i.showBlocksInViewport(),n()){var t=e.getLocalOldestInformations();0!==t.length&&(s(t),i.hideBlocksOutsideViewport())}},r=function(t){var n=$(t);n.addClass("m-progress"),i.showBlocksInViewport();var o=e.getLocalOldestInformations();return 0===o.length?void n.attr("disabled",!0).removeClass("m-progress"):(s(o),void n.removeClass("m-progress"))},s=function(t){var e,i=t.length;for(e=0;i>e;e++)u(t[e],!1)},a=function(t){$(document).trigger("addedBuzzInTimeline",t)},u=function(t,n){i.render(t,n),e.remove(t),a(t)},c=function(t){var n=t.message;e.remove(n),i.showBlocksInViewport(),u(n,!0),i.hideBlocksOutsideViewport()},l=function(t){e.setData(t)},h=function(){var t=e.getLocalOldestInformations();t.length>0&&s(t)},d=function(e){var i=io.connect(t.CONFIG.URL_SOCKET_IO);i.on("buzz",c)},f=function(){var e=function(){$(".button-load-more").on("click",r).removeClass("is-hidden")},i=function(){$(t).on("scroll",o)};t.UA.isMobile()?e():i()},p={};p={init:function(n){return e=t.TimeLineStore,i=t.TimelineBlocks,i.hideBlocksOutsideViewport(),n?e.getBufferInformations().done(l,h,f):e.getBufferInformations().done(l,h,d,f),!0},onAddBuzz:function(t){return $(document).on("addedBuzzInTimeline",t),this}},"undefined"!=typeof define&&define.amd?define(function(){return p}):"undefined"!=typeof module&&module.exports?(module.exports=p.attach,module.exports.Timeline=p):t.Timeline=p}(window),function(t){"use strict";function e(e){return t["TimeLineBlock"+capitalize(e)]}var i=function(){$(t).scrollTop()>500&&$(".button-new-content").fadeIn().removeClass("is-hidden")},n={},o=.8;n={timelineBlocks:null,render:function(t,n){var o=e(t.type).render(t);n?($("#timeline").prepend(o),i()):$(".timeline-block:last-child")[0]?$(".timeline-block:last-child").after(o):$(".button-load-more").before(o)},getTimelineBlocks:function(){return n.timelineBlocks=$(".timeline-block"),n.timelineBlocks},elementIsVisibleOnViewport:function(e){return e.offset().top<=$(t).scrollTop()+$(t).height()*o},elementIsNotVisibleOnViewport:function(e){return e.offset().top>$(t).scrollTop()+$(t).height()*o},hideBlocksOutsideViewport:function(){var t,e=n.getTimelineBlocks();e.each(function(){t=$(this),n.elementIsNotVisibleOnViewport(t)&&t.find(".timeline-img, .timeline-content").addClass("is-hidden")})},showBlocksInViewport:function(){var t,e=n.getTimelineBlocks();e.each(function(){t=$(this),n.elementIsVisibleOnViewport(t)&&t.find(".timeline-img").hasClass("is-hidden")&&t.find(".timeline-img, .timeline-content").removeClass("is-hidden").addClass("bounce-in")})}},"undefined"!=typeof define&&define.amd?define(function(){return n}):"undefined"!=typeof module&&module.exports?(module.exports=n.attach,module.exports.TimelineBlocks=n):t.TimelineBlocks=n}(window),function(t){"use strict";function e(){return-1===t.location.origin.indexOf("localhost")?"//burburinho.herokuapp.com":"//localhost:5000"}function i(){var i=t.offline||!1;return i?"/assets/json/"+i.data:e()+"/api/buzzes"}var n={FACEBOOK_ID:0x554d5fd3c13e3,URL_COBERTURA:"http://cobertura.brasildefato.com.br",URL_SOCIAL_SHARE_IMAGE:"http://cobertura.brasildefato.com.br/assets/img/logo.jpg",URL_BUFFER_INFO:i(),URL_SOCKET_IO:e()};"undefined"!=typeof define&&define.amd?define(function(){return n}):"undefined"!=typeof module&&module.exports?(module.exports=n.attach,module.exports.CONFIG=n):t.CONFIG=n}(window),function(t){"use strict";function e(){o+=1;var t=[];if(i.length>0)for(var e,r=0;n>r;)e=i[r],e&&t.push(e),++r;return t}var i=[],n=10,o=0,r=t.CONFIG,s={};s={setData:function(t){return i=t,!0},remove:function(t){var e=i.filter(function(e,i){return e.timestamp===t.timestamp?i:void 0});i.splice(e,1)},getLocalOldestInformations:function(){return e()},numberOfPages:function(){return Math.ceil(i.length/n)},getBufferInformations:function(){return $.when($.getJSON(r.URL_BUFFER_INFO))}},"undefined"!=typeof define&&define.amd?define(function(){return s}):"undefined"!=typeof module&&module.exports?(module.exports=s.attach,module.exports.TimeLineStore=s):t.TimeLineStore=s}(window),function(t){"use strict";var e={render:function(t){throw new RenderException("Render method wasn't implemented!")},getSocialNetworkHTML:function(t){var e;return e="photo"===t.type||"quote"===t.type?t.url:"gallery"===t.type?t.content[0].url:CONFIG.URL_SOCIAL_SHARE_IMAGE,'<div class="logos"><div class="social-small"><a target="_blank" href="//www.twitter.com/share?url='+CONFIG.URL_COBERTURA+"&via=Brasil_de_Fato&related=Brasil_de_Fato&text="+encodeURIComponent(strip(t.content))+'" ><i class="fa fa-twitter"></i></a></div><div class="social-small"><a href="//www.facebook.com/dialog/feed?app_id='+CONFIG.FACEBOOK_ID+"&display=popup&href="+CONFIG.URL_COBERTURA+"&redirect_uri="+CONFIG.URL_COBERTURA+"&picture="+e+"&name="+document.title+"&description="+encodeURIComponent(strip(t.content))+"&link="+CONFIG.URL_COBERTURA+'" target="_blank"><i class="fa fa-facebook"></i></a></div></div>'}};"undefined"!=typeof define&&define.amd?define(function(){return e}):"undefined"!=typeof module&&module.exports?(module.exports=e.attach,module.exports.AbstractTimeLineBlock=e):t.AbstractTimeLineBlock=e}(window),function(t){"use strict";var e={};extend(e,t.AbstractTimeLineBlock),e.render=function(t){var e=getFormattedDate(t.timestamp),i=getFormattedHourAndMinutes(t.timestamp),n=t.content.map(function(t){return'<img src="'+getOptmizedImageUrl(t.url)+'" alt="'+t.description+'"/>'});return'<div class="timeline-block"><figure class="timeline-img"><i class="fa fa-picture-o"></i></figure><time class="data-hora">'+e+'    <strong class="hora">'+i+'</strong></time><article class="timeline-content gallery"><h2 class="estado">'+t.local+'</h2><section class="photos">'+n.join("")+"</section>"+TimeLineBlockText.getSocialNetworkHTML(t)+"</article></div>"},"undefined"!=typeof define&&define.amd?define(function(){
return e}):"undefined"!=typeof module&&module.exports?(module.exports=e.attach,module.exports.TimeLineBlockGallery=e):t.TimeLineBlockGallery=e}(window),function(t){"use strict";var e={};extend(e,t.AbstractTimeLineBlock),e.render=function(t){var e=getFormattedDate(t.timestamp),i=getFormattedHourAndMinutes(t.timestamp);return'<div class="timeline-block"><figure class="timeline-img"><i class="fa fa-camera-retro"></i></figure><time class="data-hora">'+e+'    <strong class="hora">'+i+'</strong></time><article class="timeline-content photo"><h2 class="estado">'+t.local+'</h2><img src="'+getOptmizedImageUrl(t.url)+'" alt="manifestação"/><p>'+t.content+"</p>"+TimeLineBlockText.getSocialNetworkHTML(t)+"</article></div>"},"undefined"!=typeof define&&define.amd?define(function(){return e}):"undefined"!=typeof module&&module.exports?(module.exports=e.attach,module.exports.TimeLineBlockPhoto=e):t.TimeLineBlockPhoto=e}(window),function(t){"use strict";var e={};extend(e,t.AbstractTimeLineBlock),e.render=function(t){var e=getFormattedDate(t.timestamp),i=getFormattedHourAndMinutes(t.timestamp);return'<div class="timeline-block"><figure class="timeline-img">  <i class="fa fa-quote-left"></i></figure><time class="data-hora">'+e+'    <strong class="hora">'+i+'</strong></time><article class="timeline-content quote"><h2 class="estado">'+t.local+'</h2>  <img class="perfil" src="'+getOptmizedImageUrl(t.url)+'" alt="foto perfil"/>  <p>'+t.content+"</p>"+TimeLineBlockText.getSocialNetworkHTML(t)+"</article></div>"},"undefined"!=typeof define&&define.amd?define(function(){return e}):"undefined"!=typeof module&&module.exports?(module.exports=e.attach,module.exports.TimeLineBlockQuote=e):t.TimeLineBlockQuote=e}(window),function(t){"use strict";{var e={};t.CONFIG}extend(e,t.AbstractTimeLineBlock),e.render=function(t){var i=getFormattedDate(t.timestamp),n=getFormattedHourAndMinutes(t.timestamp);return'<div class="timeline-block">  <figure class="timeline-img">    <i class="fa fa-align-justify"></i>  </figure><time class="data-hora">'+i+'    <strong class="hora">'+n+'</strong></time><article class="timeline-content text"><h2 class="estado">'+t.local+"</h2>    <p>"+t.content+"</p>"+e.getSocialNetworkHTML(t)+"  </article></div>"},"undefined"!=typeof define&&define.amd?define(function(){return e}):"undefined"!=typeof module&&module.exports?(module.exports=e.attach,module.exports.TimeLineBlockText=e):t.TimeLineBlockText=e}(window),function(t){"use strict";var e={};extend(e,t.AbstractTimeLineBlock),e.render=function(t){var e=getFormattedDate(t.timestamp),i=getFormattedHourAndMinutes(t.timestamp);return'<div class="timeline-block"><figure class="timeline-img"><i class="fa fa-video-camera fa-4"></i></figure><time class="data-hora">'+e+'    <strong class="hora">'+i+'</strong></time><article class="timeline-content video"><h2 class="estado">'+t.local+'</h2><div class="video-wrapper"><iframe src="'+t.url+'"></iframe></div><p>'+t.content+"</p>"+TimeLineBlockText.getSocialNetworkHTML(t)+"</article></div>"},"undefined"!=typeof define&&define.amd?define(function(){return e}):"undefined"!=typeof module&&module.exports?(module.exports=e.attach,module.exports.TimeLineBlockVideo=e):t.TimeLineBlockVideo=e}(window),$(document).ready(function(){$(".button-new-content").click(function(){return $("html, body").animate({scrollTop:$("main").offset().top},800),$(this).fadeOut().addClass("is-hidden"),!1});var t=function(t,e){"photo"===e.type&&$(".choose-photos").html($(".choose-photos").html()+'<a class="photo" href="'+getOptmizedImageUrl(e.url)+'"><img class="highlight-photo" src="'+getOptmizedImageUrl(e.url)+'" alt="'+e.content+'" width="90" height="auto"></a>')},e=window.offline||!1;Timeline.onAddBuzz(t).init(e)});