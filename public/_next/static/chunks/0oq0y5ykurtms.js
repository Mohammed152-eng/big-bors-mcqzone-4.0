(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,934620,e=>{"use strict";var t=e.i(271645),r=globalThis?.document?t.useLayoutEffect:()=>{};e.s(["useLayoutEffect",0,r])},30207,e=>{"use strict";var t=e.i(271645);e.s(["useCallbackRef",0,function(e){let r=t.useRef(e);return t.useEffect(()=>{r.current=e}),t.useMemo(()=>(...e)=>r.current?.(...e),[])}])},705766,e=>{"use strict";let t,r;var a,n=e.i(271645);let o={data:""},i=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,s=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,u=(e,t)=>{let r="",a="",n="";for(let o in e){let i=e[o];"@"==o[0]?"i"==o[1]?r=o+" "+i+";":a+="f"==o[1]?u(i,o):o+"{"+u(i,"k"==o[1]?"":t)+"}":"object"==typeof i?a+=u(i,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=i&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),n+=u.p?u.p(o,i):o+":"+i+";")}return r+(t&&n?t+"{"+n+"}":n)+a},c={},d=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+d(e[r]);return t}return e};function f(e){let t,r,a=this||{},n=e.call?e(a.p):e;return((e,t,r,a,n)=>{var o;let f=d(e),p=c[f]||(c[f]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(f));if(!c[p]){let t=f!==e?e:(e=>{let t,r,a=[{}];for(;t=i.exec(e.replace(s,""));)t[4]?a.shift():t[3]?(r=t[3].replace(l," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(l," ").trim();return a[0]})(e);c[p]=u(n?{["@keyframes "+p]:t}:t,r?"":"."+p)}let h=r&&c.g?c.g:null;return r&&(c.g=c[p]),o=c[p],h?t.data=t.data.replace(h,o):-1===t.data.indexOf(o)&&(t.data=a?o+t.data:t.data+o),p})(n.unshift?n.raw?(t=[].slice.call(arguments,1),r=a.p,n.reduce((e,a,n)=>{let o=t[n];if(o&&o.call){let e=o(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":u(e,""):!1===e?"":e}return e+a+(null==o?"":o)},"")):n.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):n,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||o})(a.target),a.g,a.o,a.k)}f.bind({g:1});let p,h,m,g=f.bind({k:1});function y(e,t){let r=this||{};return function(){let a=arguments;function n(o,i){let s=Object.assign({},o),l=s.className||n.className;r.p=Object.assign({theme:h&&h()},s),r.o=/ *go\d+/.test(l),s.className=f.apply(r,a)+(l?" "+l:""),t&&(s.ref=i);let u=e;return e[0]&&(u=s.as||e,delete s.as),m&&u[0]&&m(s),p(u,s)}return t?t(n):n}}var w=(e,t)=>"function"==typeof e?e(t):e,b=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},S="default",E=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return E(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:n}=t;return{...e,toasts:e.toasts.map(e=>e.id===n||void 0===n?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+o}))}}},A=[],k={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},x={},I=(e,t=S)=>{x[t]=E(x[t]||k,e),A.forEach(([e,r])=>{e===t&&r(x[t])})},P=e=>Object.keys(x).forEach(t=>I(e,t)),C=(e=S)=>t=>{I(t,e)},T={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},q=e=>(t,r)=>{let a,n=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||b()}))(t,e,r);return C(n.toasterId||(a=n.id,Object.keys(x).find(e=>x[e].toasts.some(e=>e.id===a))))({type:2,toast:n}),n.id},L=(e,t)=>q("blank")(e,t);L.error=q("error"),L.success=q("success"),L.loading=q("loading"),L.custom=q("custom"),L.dismiss=(e,t)=>{let r={type:3,toastId:e};t?C(t)(r):P(r)},L.dismissAll=e=>L.dismiss(void 0,e),L.remove=(e,t)=>{let r={type:4,toastId:e};t?C(t)(r):P(r)},L.removeAll=e=>L.remove(void 0,e),L.promise=(e,t,r)=>{let a=L.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let n=t.success?w(t.success,e):void 0;return n?L.success(n,{id:a,...r,...null==r?void 0:r.success}):L.dismiss(a),e}).catch(e=>{let n=t.error?w(t.error,e):void 0;n?L.error(n,{id:a,...r,...null==r?void 0:r.error}):L.dismiss(a)}),e};var M=1e3,O=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,R=g`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,j=g`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,$=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${O} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${R} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${j} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,U=g`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,D=y("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${U} 1s linear infinite;
`,F=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,N=g`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,z=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${F} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${N} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Q=y("div")`
  position: absolute;
`,W=y("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,_=g`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,H=y("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${_} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,B=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?n.createElement(H,null,t):t:"blank"===r?null:n.createElement(W,null,n.createElement(D,{...a}),"loading"!==r&&n.createElement(Q,null,"error"===r?n.createElement($,{...a}):n.createElement(z,{...a})))},J=y("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,V=y("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Y=n.memo(({toast:e,position:t,style:r,children:a})=>{let o=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,n]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${g(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${g(n)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},i=n.createElement(B,{toast:e}),s=n.createElement(V,{...e.ariaProps},w(e.message,e));return n.createElement(J,{className:e.className,style:{...o,...r,...e.style}},"function"==typeof a?a({icon:i,message:s}):n.createElement(n.Fragment,null,i,s))});a=n.createElement,u.p=void 0,p=a,h=void 0,m=void 0;var Z=({id:e,className:t,style:r,onHeightUpdate:a,children:o})=>{let i=n.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return n.createElement("div",{ref:i,className:t,style:r},o)},G=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;e.s(["Toaster",0,({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:o,toasterId:i,containerStyle:s,containerClassName:l})=>{let{toasts:u,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:a}=((e={},t=S)=>{let[r,a]=(0,n.useState)(x[t]||k),o=(0,n.useRef)(x[t]);(0,n.useEffect)(()=>(o.current!==x[t]&&a(x[t]),A.push([t,a]),()=>{let e=A.findIndex(([e])=>e===t);e>-1&&A.splice(e,1)}),[t]);let i=r.toasts.map(t=>{var r,a,n;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||T[t.type],style:{...e.style,...null==(n=e[t.type])?void 0:n.style,...t.style}}});return{...r,toasts:i}})(e,t),o=(0,n.useRef)(new Map).current,i=(0,n.useCallback)((e,t=M)=>{if(o.has(e))return;let r=setTimeout(()=>{o.delete(e),s({type:4,toastId:e})},t);o.set(e,r)},[]);(0,n.useEffect)(()=>{if(a)return;let e=Date.now(),n=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&L.dismiss(r.id);return}return setTimeout(()=>L.dismiss(r.id,t),a)});return()=>{n.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let s=(0,n.useCallback)(C(t),[t]),l=(0,n.useCallback)(()=>{s({type:5,time:Date.now()})},[s]),u=(0,n.useCallback)((e,t)=>{s({type:1,toast:{id:e,height:t}})},[s]),c=(0,n.useCallback)(()=>{a&&s({type:6,time:Date.now()})},[a,s]),d=(0,n.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:n=8,defaultPosition:o}=t||{},i=r.filter(t=>(t.position||o)===(e.position||o)&&t.height),s=i.findIndex(t=>t.id===e.id),l=i.filter((e,t)=>t<s&&e.visible).length;return i.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+n,0)},[r]);return(0,n.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=o.get(e.id);t&&(clearTimeout(t),o.delete(e.id))}})},[r,i]),{toasts:r,handlers:{updateHeight:u,startPause:l,endPause:c,calculateOffset:d}}})(r,i);return n.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...s},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},u.map(r=>{let i,s,l=r.position||t,u=c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),d=(i=l.includes("top"),s=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${u*(i?1:-1)}px)`,...i?{top:0}:{bottom:0},...s});return n.createElement(Z,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?G:"",style:d},"custom"===r.type?w(r.message,r):o?o(r):n.createElement(Y,{toast:r,position:l}))}))},"default",0,L],705766)},232136,e=>{e.q("/_next/static/media/pdf.worker.min.2v7zou9o6g00x.mjs")},768834,e=>{"use strict";var t=e.i(271645);let r=e=>{let t,r=new Set,a=(e,a)=>{let n="function"==typeof e?e(t):e;if(!Object.is(n,t)){let e=t;t=(null!=a?a:"object"!=typeof n||null===n)?n:Object.assign({},t,n),r.forEach(r=>r(t,e))}},n=()=>t,o={setState:a,getState:n,getInitialState:()=>i,subscribe:e=>(r.add(e),()=>r.delete(e))},i=t=e(a,n,o);return o},a=e=>{let a=e?r(e):r,n=e=>(function(e,r=e=>e){let a=t.default.useSyncExternalStore(e.subscribe,t.default.useCallback(()=>r(e.getState()),[e,r]),t.default.useCallback(()=>r(e.getInitialState()),[e,r]));return t.default.useDebugValue(a),a})(a,e);return Object.assign(n,a),n};e.s(["create",0,e=>e?a(e):a],768834)},824182,e=>{"use strict";let t=(0,e.i(768834).create)(e=>({isOnline:window.navigator.onLine,isStandalone:!1,installPromptEvent:null,updateReady:!1,installOutcome:"idle",setOnline:t=>e({isOnline:t}),setStandalone:t=>e({isStandalone:t}),setInstallPromptEvent:t=>e({installPromptEvent:t}),setUpdateReady:t=>e({updateReady:t}),setInstallOutcome:t=>e({installOutcome:t})}));e.s(["usePwaStore",0,t])},277047,e=>{"use strict";var t=e.i(653699),r=e.i(251688),a=e.i(824182),n=e.i(778497);let o="igcse-mcq-topical-session",i="igcse-mcq-practice-session",s="igcse-mcq-practice-progress-owner",l=new Map;function u(){if(!t.hasConfig||!t.auth||!t.auth.currentUser)return!1;try{if("true"===localStorage.getItem("guestMode"))return!1}catch{return!1}try{if(!a.usePwaStore.getState().isOnline)return!1}catch{}return!0}async function c(e,t,a){try{await r.practiceProgressApi.put(e,t,a)}catch(t){n.logger.warn(t,`Failed to push ${e} practice progress`)}}async function d(){let e=Array.from(l.entries());l.clear(),await Promise.all(e.map(([e,t])=>(t.timer&&clearTimeout(t.timer),c(e,t.state,t.clientUpdatedAt))))}async function f(e){let t=l.get(e);if(t?.timer&&clearTimeout(t.timer),l.delete(e),u())try{await r.practiceProgressApi.remove(e)}catch(t){n.logger.warn(t,`Failed to delete ${e} practice progress`)}}function p(e){try{let t=localStorage.getItem(e);if(!t)return null;let r=JSON.parse(t);return r&&"object"==typeof r?r:null}catch{return null}}function h(e){return e?"number"==typeof e.savedAt?e.savedAt:"number"==typeof e.startedAt?e.startedAt:null:null}async function m(){if(u())try{let{items:e}=await r.practiceProgressApi.getAll(),t=new Map(e.map(e=>[e.kind,e]));!function(e){let t=p(o),r=h(t);if(e&&(null===r||e.clientUpdatedAt>r)){try{localStorage.setItem(o,JSON.stringify(e.state))}catch{}return}t&&null!==r&&(!e||r>e.clientUpdatedAt)&&c("topical",function(e){let{questions:t,...r}=e;return Array.isArray(t)&&!Array.isArray(r.questionIds)&&(r.questionIds=t.map(e=>e?.question_id).filter(e=>!!e)),r}(t),r)}(t.get("topical")??null),function(e){let t=p(i),r=h(t);if(e&&(null===r||e.clientUpdatedAt>r)){try{localStorage.setItem(i,JSON.stringify(e.state))}catch{}return}t&&null!==r&&(!e||r>e.clientUpdatedAt)&&c("paper",t,r)}(t.get("paper")??null)}catch(e){n.logger.warn(e,"Failed to reconcile practice progress")}}async function g(){if(0===l.size)return;if(!u()||!t.auth?.currentUser)return void l.clear();let e=Array.from(l.entries());l.clear();try{let a=await t.auth.currentUser.getIdToken();for(let[t,n]of e){n.timer&&clearTimeout(n.timer);try{fetch(`${r.API_BASE_URL}/api/practice-progress/${t}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({state:n.state,clientUpdatedAt:n.clientUpdatedAt}),keepalive:!0})}catch{}}}catch{}}let y=!1;!function(){if(y)return;y=!0;let e=()=>{g()};window.addEventListener("pagehide",e),document.addEventListener("visibilitychange",()=>{"hidden"===document.visibilityState&&e()})}(),e.s(["deleteProgress",0,f,"ensureOwnerIsolation",0,function(e){try{let t=localStorage.getItem(s),r=e??"";t!==r&&function(){try{localStorage.removeItem(o)}catch{}try{localStorage.removeItem(i)}catch{}try{localStorage.removeItem("igcse-mcq-topical-selector")}catch{}l.clear()}(),e?localStorage.setItem(s,e):localStorage.removeItem(s)}catch{}},"flush",0,d,"pushProgress",0,function(e,t,r){if(!u())return;let a=l.get(e);a?.timer&&clearTimeout(a.timer);let n={state:t,clientUpdatedAt:r,timer:null};n.timer=setTimeout(()=>{l.delete(e),c(e,t,r)},1500),l.set(e,n)},"reconcile",0,m])},614677,e=>{"use strict";let t=new Uint8Array(16),r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));e.s(["v4",0,function(e,a,n){return a||e||!crypto.randomUUID?function(e,a,n){let o=(e=e||{}).random??e.rng?.()??crypto.getRandomValues(t);if(o.length<16)throw Error("Random bytes length must be >= 16");if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,a){if((n=n||0)<0||n+16>a.length)throw RangeError(`UUID byte range ${n}:${n+15} is out of buffer bounds`);for(let e=0;e<16;++e)a[n+e]=o[e];return a}return function(e,t=0){return(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase()}(o)}(e,a,n):crypto.randomUUID()}],614677)},257051,828188,767164,e=>{"use strict";var t=e.i(181595);e.s(["onIdTokenChanged",()=>t.x],257051),e.s(["signInWithPopup",()=>t.d],828188),e.s(["signOut",()=>t.D],767164)},218594,e=>{"use strict";var t=e.i(181595);e.s(["onAuthStateChanged",()=>t.z])},72117,995942,e=>{"use strict";var t=e.i(181595);e.s(["signInWithEmailAndPassword",()=>t.ac],72117),e.s(["createUserWithEmailAndPassword",()=>t.ab],995942)},145801,e=>{"use strict";var t=e.i(181595);e.s(["updateProfile",()=>t.al])},709598,451846,e=>{"use strict";var t=e.i(181595);e.s(["isSignInWithEmailLink",()=>t.ae],709598),e.s(["signInWithEmailLink",()=>t.af],451846)},785305,e=>{"use strict";var t=e.i(768834),r=e.i(251688),a=e.i(614677);let n="attemptQueue";function o(){return new Promise((e,t)=>{let r=indexedDB.open("mcqzone  -pwa-sync",1);r.onerror=()=>{t(Error("Failed to open sync queue database"))},r.onsuccess=()=>{e(r.result)},r.onupgradeneeded=e=>{let t=e.target.result,r=e.oldVersion;if(t.objectStoreNames.contains(n)){if(r<1){let t=e.target.transaction,r=t?.objectStore(n);r&&!r.indexNames.contains("userId")&&r.createIndex("userId","userId",{unique:!1})}}else{let e=t.createObjectStore(n,{keyPath:"id"});e.createIndex("userId","userId",{unique:!1}),e.createIndex("status","status",{unique:!1}),e.createIndex("queuedAt","queuedAt",{unique:!1}),e.createIndex("lastRetryAt","lastRetryAt",{unique:!1})}}})}async function i(){let e=await o();return new Promise((t,r)=>{let a=e.transaction(n,"readonly").objectStore(n).getAll();a.onsuccess=()=>{t(a.result)},a.onerror=()=>{r(Error("Failed to list queued attempts"))}})}async function s(e){let t=await o();return new Promise((r,a)=>{let o=t.transaction(n,"readwrite").objectStore(n).add(e);o.onsuccess=()=>{r()},o.onerror=()=>{a(Error("Failed to add queued attempt"))}})}async function l(e){let t=await o();return new Promise((r,a)=>{let o=t.transaction(n,"readwrite").objectStore(n).put(e);o.onsuccess=()=>{r()},o.onerror=()=>{a(Error("Failed to update queued attempt"))}})}async function u(e){let t=await o();return new Promise((r,a)=>{let o=t.transaction(n,"readwrite").objectStore(n).delete(e);o.onsuccess=()=>{r()},o.onerror=()=>{a(Error("Failed to delete queued attempt"))}})}async function c(e){let t=await o();return new Promise((r,a)=>{let o=t.transaction(n,"readonly").objectStore(n).index("status").count(e);o.onsuccess=()=>{r(o.result)},o.onerror=()=>{a(Error("Failed to count queued attempts"))}})}let d=[6e4,3e5,9e5,36e5,36e5];async function f(e,t=null){let r=(0,a.v4)(),n={id:r,userId:t,attempt:e,queuedAt:Date.now(),retryCount:0,lastRetryAt:null,status:"pending"};return await s(n),window.dispatchEvent(new CustomEvent("sync-queue-updated")),r}async function p(){return(await i()).filter(e=>"failed"!==e.status||!(e.retryCount>=5))}async function h(e=null){let t=await p(),r=Date.now();return t.filter(t=>{if(t.userId!==e)return!1;if("pending"===t.status)return!0;if(t.lastRetryAt&&t.retryCount>0){let e=Math.min(t.retryCount-1,d.length-1),a=d[e];return r-t.lastRetryAt>=a}return!0})}async function m(e){for(let t of(await i()))t.userId!==e&&await u(t.id);window.dispatchEvent(new CustomEvent("sync-queue-updated"))}async function g(e){await u(e),window.dispatchEvent(new CustomEvent("sync-queue-updated"))}async function y(e,t){let r=(await i()).find(t=>t.id===e);r&&(t?await g(e):(r.retryCount++,r.lastRetryAt=Date.now(),r.retryCount>=5?r.status="failed":r.status="retrying",await l(r),window.dispatchEvent(new CustomEvent("sync-queue-updated"))))}async function w(){let[e,t,r]=await Promise.all([c("pending"),c("retrying"),c("failed")]);return{total:e+t+r,pending:e,retrying:t,failed:r}}let b=(0,t.create)((e,t)=>({queueLength:0,get queueCount(){return t().queueLength},isSyncing:!1,lastSyncAt:null,lastSyncError:null,stats:{total:0,pending:0,retrying:0,failed:0},queueAttempt:async(e,r=null)=>{let a=await f(e,r);return await t().refreshQueueStats(),a},processSyncQueue:async(a=null)=>{if(!t().isSyncing){e({isSyncing:!0,lastSyncError:null});try{let n=await h(a);if(0===n.length)return void e({isSyncing:!1,lastSyncAt:Date.now()});let o=0,i=0;for(let e of n)try{let t=e.attempt;await r.userApi.createAttempt(t),await g(e.id),o++}catch(t){t instanceof Error&&(t.message.includes("already exists")||t.message.includes("duplicate")||t instanceof r.ApiError&&409===t.status)?(console.log("Duplicate attempt detected, removing from queue:",e.id),await g(e.id),o++):(await y(e.id,!1),i++,console.error("Failed to sync attempt:",t))}await t().refreshQueueStats(),e({isSyncing:!1,lastSyncAt:Date.now(),lastSyncError:i>0?`${i} attempt(s) failed to sync`:null}),o>0&&window.dispatchEvent(new CustomEvent("attempts-synced",{detail:{count:o}}))}catch(t){e({isSyncing:!1,lastSyncError:t instanceof Error?t.message:"Sync failed"}),console.error("Sync queue processing error:",t)}}},refreshQueueStats:async()=>{try{let t=await w();e({queueLength:t.pending+t.retrying,stats:t})}catch(e){console.error("Failed to refresh queue stats:",e)}},clearOtherUsersQueue:async e=>{await m(e),await t().refreshQueueStats()},clearQueue:()=>{e({queueLength:0,isSyncing:!1,lastSyncAt:null,lastSyncError:null,stats:{total:0,pending:0,retrying:0,failed:0}})}}));b.getState().refreshQueueStats(),window.addEventListener("sync-queue-updated",()=>{b.getState().refreshQueueStats()}),e.s(["useSyncStore",0,b],785305)},557951,e=>{"use strict";var t=e.i(843476),r=e.i(271645);e.i(151718);var a=e.i(257051),n=e.i(828188),o=e.i(767164),i=e.i(218594),s=e.i(653699),l=e.i(72117),u=e.i(995942),c=e.i(145801),d=e.i(709598),f=e.i(451846),p=e.i(963416),h=e.i(251688),m=e.i(785305),g=e.i(277047),y=e.i(705766);let w="igcse-welcome-setup-completed",b="emailForSignIn";function v(e){let t=e?.code??"";return"auth/network-request-failed"===t?"Sign-in failed, check your connection.":"auth/too-many-requests"===t?"Too many sign-in attempts. Try again later.":"auth/user-disabled"===t?"This account has been disabled.":"auth/invalid-email"===t?"That email address looks invalid.":"auth/missing-password"===t?"Please enter your password.":"auth/weak-password"===t?"Password should be at least 6 characters.":"auth/email-already-in-use"===t?"An account already exists for this email. Try signing in.":"auth/user-not-found"===t||"auth/wrong-password"===t||"auth/invalid-credential"===t?"Incorrect email or password.":"Sign-in failed. Please try again."}let S=(0,r.createContext)(void 0);async function E(e){let t=e?JSON.stringify({idToken:e}):void 0,r=await fetch("/api/auth/session",{method:e?"POST":"DELETE",headers:t?{"Content-Type":"application/json"}:void 0,body:t});if(!r.ok){if(e){let e=!1;try{e=(await fetch("/api/auth/session",{method:"DELETE"})).ok}catch(e){console.error("Failed to clear stale auth session cookie after rejected token sync:",e)}if(401===r.status&&e)return}throw Error(`Failed to sync auth session cookie: ${r.status}`)}}e.s(["AuthProvider",0,function({children:e,initialBackendUser:A,hasServerSession:k}){let[x,I]=(0,r.useState)(null),[P,C]=(0,r.useState)(A),[T,q]=(0,r.useState)(!k),[L,M]=(0,r.useState)(!1),[O,R]=(0,r.useState)(!1),j=async()=>{try{let e=await h.userApi.getProfile();C(e)}catch(e){console.error("Error fetching backend user profile:",e)}};(0,r.useEffect)(()=>{let e=(0,p.getStoredTestAuthSession)();if(e){let t=!1;return q(!0),M(!1),localStorage.removeItem("guestMode"),(async()=>{try{await E(e.token);let r=await h.userApi.syncUser();if(t)return;I(null),C(r),r.isNewUser&&!localStorage.getItem(w)&&R(!0)}catch(e){console.error("Error bootstrapping test auth session:",e),t||C(null)}finally{t||q(!1)}})(),()=>{t=!0}}if(!s.hasConfig)return void q(!1);"true"===localStorage.getItem("guestMode")&&(M(!0),q(!1));let t=(0,i.onAuthStateChanged)(s.auth,async e=>{if(I(e),e){M(!1),localStorage.removeItem("guestMode");try{let t=await h.userApi.syncUser();await j(),t.isNewUser&&!localStorage.getItem(w)&&R(!0);let r=m.useSyncStore.getState();if(await r.clearOtherUsersQueue(e.uid),r.stats.total>0){let t=y.default.loading("Syncing your offline attempts...");await r.processSyncQueue(e.uid).catch(()=>void 0),y.default.success("Offline attempts synced!",{id:t})}(0,g.ensureOwnerIsolation)(e.uid),await (0,g.reconcile)()}catch(e){console.error("Error syncing with backend:",e)}}else(0,g.ensureOwnerIsolation)(null),k&&A||C(null);q(!1)});return()=>t()},[k,A]),(0,r.useEffect)(()=>{if((0,p.getStoredTestAuthSession)()||!s.hasConfig)return;let e=(0,a.onIdTokenChanged)(s.auth,async e=>{if(!e){try{await E(null)}catch(e){console.error("Failed to clear auth session cookie:",e)}return}try{let t=await e.getIdToken();await E(t)}catch(e){console.error("Failed to sync session cookie:",e)}});return()=>e()},[]),(0,r.useEffect)(()=>{if((0,p.getStoredTestAuthSession)()||!s.hasConfig||!(0,d.isSignInWithEmailLink)(s.auth,window.location.href))return;let e=window.localStorage.getItem(b);e?(async()=>{try{await (0,f.signInWithEmailLink)(s.auth,e,window.location.href),window.localStorage.removeItem(b),window.history.replaceState({},document.title,window.location.pathname),y.default.success("Signed in successfully")}catch(e){console.error("Failed to complete magic-link sign-in:",e),y.default.error(v(e))}})():y.default.error("Open the sign-in link on the device where you requested it, or request a new one.")},[]);let $=async()=>{if(!s.hasConfig)return void y.default.error("Authentication is unavailable in this environment");try{await (0,n.signInWithPopup)(s.auth,s.googleProvider)}catch(t){let e=t?.code;if("auth/popup-closed-by-user"===e||"auth/cancelled-popup-request"===e)return;y.default.error(v(t))}},U=async(e,t)=>{s.hasConfig?await (0,l.signInWithEmailAndPassword)(s.auth,e.trim(),t):y.default.error("Authentication is unavailable in this environment")},D=async(e,t,r)=>{if(!s.hasConfig)return void y.default.error("Authentication is unavailable in this environment");let a=await (0,u.createUserWithEmailAndPassword)(s.auth,e.trim(),t),n=r?.trim();if(n)try{await (0,c.updateProfile)(a.user,{displayName:n})}catch(e){console.error("Failed to set display name:",e)}},F=async e=>{try{let t=e.trim();return await h.authApi.sendMagicLink(t),window.localStorage.setItem(b,t),!0}catch(e){return console.error("Failed to request magic link:",e),y.default.error("Could not send your sign-in link. Please try again."),!1}},N=async e=>{try{return await h.authApi.requestPasswordReset(e.trim()),y.default.success("If that email has an account, a reset link is on its way."),!0}catch(e){return console.error("Failed to request password reset:",e),y.default.error("Could not send the reset email. Please try again."),!1}},z=async()=>{if((0,p.getStoredTestAuthSession)()){(0,p.clearStoredTestAuthSession)(),I(null),C(null);try{await E(null)}catch(e){console.error("Failed to clear auth session cookie after test sign-out:",e)}y.default.success("Signed out successfully");return}if(!s.hasConfig){I(null),C(null);return}try{await (0,o.signOut)(s.auth),I(null),C(null);try{await E(null)}catch(e){console.error("Failed to clear auth session cookie after sign-out:",e)}y.default.success("Signed out successfully")}catch(t){console.error("Error signing out:",t);let e=t instanceof Error?t.message:"Failed to sign out";y.default.error(e)}},Q=async()=>{let e=(0,p.getStoredTestAuthSession)();if(e)return e.token;if(!x)return null;try{return await x.getIdToken()}catch(e){return console.error("Error getting ID token:",e),null}},W=!!(x||P||(0,p.isTestAuthEnabled)()&&(0,p.getStoredTestAuthSession)())&&!L;return(0,t.jsx)(S.Provider,{value:{user:x,backendUser:P,loading:T,isGuest:L,isAuthenticated:W,showWelcomeSetup:O,signInWithGoogle:$,signInWithEmail:U,signUpWithEmail:D,sendMagicLink:F,sendPasswordReset:N,signOut:z,continueAsGuest:()=>{M(!0),localStorage.setItem("guestMode","true"),q(!1)},getIdToken:Q,refreshBackendUser:j,dismissWelcomeSetup:()=>{R(!1),localStorage.setItem(w,"true")}},children:e})},"useAuth",0,function(){let e=(0,r.useContext)(S);if(void 0===e)throw Error("useAuth must be used within an AuthProvider");return e}])},292721,e=>{"use strict";var t=e.i(768834);let r=new Set(["auto","light","dark"]),a=new Set(["inline","button-grid"]),n=new Set(["left","center","right"]);function o(e,t,r){if("u"<typeof localStorage)return r;try{let a=localStorage.getItem(e);return a&&t.has(a)?a:r}catch{return r}}function i(e,t=!1){if("u"<typeof localStorage)return t;try{let r=localStorage.getItem(e);if("true"===r)return!0;if("false"===r)return!1;return t}catch{return t}}function s(e,t){if("u">typeof localStorage)try{localStorage.setItem(e,t)}catch{}}let l=(0,t.create)(e=>({theme:"light",isMobileMenuOpen:!1,showStatistics:!1,showProfile:!1,showLeaderboard:!1,showAchievements:!1,showSettings:!1,showRankedAdmin:!1,showRanked:!1,questionColorMode:o("questionColorMode",r,"auto"),questionInteractionMode:o("questionInteractionMode",a,"inline"),flashRevealEnabled:i("flashRevealEnabled"),zenModeEnabled:!1,wakeLockEnabled:i("wakeLockEnabled"),showPaperLinks:i("showPaperLinks",!0),showTryAnotherPopup:i("showTryAnotherPopup",!0),showTimeTaken:i("showTimeTaken",!0),questionAlignment:o("questionAlignment",n,"center"),setTheme:t=>{e({theme:t}),s("theme",t);try{document.cookie=`theme=${t};path=/;max-age=31536000;SameSite=Lax`}catch{}let r=document.documentElement;"dark"===t?r.classList.add("dark"):r.classList.remove("dark")},toggleMobileMenu:t=>e(e=>({isMobileMenuOpen:"boolean"==typeof t?t:!e.isMobileMenuOpen})),setShowStatistics:t=>e({showStatistics:t}),setShowProfile:t=>e({showProfile:t}),setShowLeaderboard:t=>e({showLeaderboard:t}),setShowAchievements:t=>e({showAchievements:t}),setShowSettings:t=>e({showSettings:t}),setShowRankedAdmin:t=>e({showRankedAdmin:t}),setShowRanked:t=>e({showRanked:t}),setQuestionColorMode:t=>{s("questionColorMode",t),e({questionColorMode:t})},setQuestionInteractionMode:t=>{s("questionInteractionMode",t),e({questionInteractionMode:t})},setFlashRevealEnabled:t=>{s("flashRevealEnabled",String(t)),e({flashRevealEnabled:t})},setWakeLockEnabled:t=>{s("wakeLockEnabled",String(t)),e({wakeLockEnabled:t})},setShowPaperLinks:t=>{s("showPaperLinks",String(t)),e({showPaperLinks:t})},setShowTryAnotherPopup:t=>{s("showTryAnotherPopup",String(t)),e({showTryAnotherPopup:t})},setShowTimeTaken:t=>{s("showTimeTaken",String(t)),e({showTimeTaken:t})},setQuestionAlignment:t=>{s("questionAlignment",t),e({questionAlignment:t})},toggleZenMode:()=>e(e=>({zenModeEnabled:!e.zenModeEnabled})),setZenModeEnabled:t=>{e({zenModeEnabled:t})}}));e.s(["useUIStore",0,l])},88653,e=>{"use strict";e.i(247167);var t=e.i(843476),r=e.i(271645),a=e.i(231178),n=e.i(947414),o=e.i(674008),i=e.i(821476),s=e.i(772846),l=r,u=e.i(737806);function c(e,t){if("function"==typeof e)return e(t);null!=e&&(e.current=t)}class d extends l.Component{getSnapshotBeforeUpdate(e){let t=this.props.childRef.current;if(t&&e.isPresent&&!this.props.isPresent){let e=t.offsetParent,r=(0,s.isHTMLElement)(e)&&e.offsetWidth||0,a=(0,s.isHTMLElement)(e)&&e.offsetHeight||0,n=this.props.sizeRef.current;n.height=t.offsetHeight||0,n.width=t.offsetWidth||0,n.top=t.offsetTop,n.left=t.offsetLeft,n.right=r-n.width-n.left,n.bottom=a-n.height-n.top}return null}componentDidUpdate(){}render(){return this.props.children}}function f({children:e,isPresent:a,anchorX:n,anchorY:o,root:i}){let s=(0,l.useId)(),p=(0,l.useRef)(null),h=(0,l.useRef)({width:0,height:0,top:0,left:0,right:0,bottom:0}),{nonce:m}=(0,l.useContext)(u.MotionConfigContext),g=function(...e){return r.useCallback(function(...e){return t=>{let r=!1,a=e.map(e=>{let a=c(e,t);return r||"function"!=typeof a||(r=!0),a});if(r)return()=>{for(let t=0;t<a.length;t++){let r=a[t];"function"==typeof r?r():c(e[t],null)}}}}(...e),e)}(p,e.props?.ref??e?.ref);return(0,l.useInsertionEffect)(()=>{let{width:e,height:t,top:r,left:l,right:u,bottom:c}=h.current;if(a||!p.current||!e||!t)return;let d="left"===n?`left: ${l}`:`right: ${u}`,f="bottom"===o?`bottom: ${c}`:`top: ${r}`;p.current.dataset.motionPopId=s;let g=document.createElement("style");m&&(g.nonce=m);let y=i??document.head;return y.appendChild(g),g.sheet&&g.sheet.insertRule(`
          [data-motion-pop-id="${s}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${t}px !important;
            ${d}px !important;
            ${f}px !important;
          }
        `),()=>{y.contains(g)&&y.removeChild(g)}},[a]),(0,t.jsx)(d,{isPresent:a,childRef:p,sizeRef:h,children:l.cloneElement(e,{ref:g})})}let p=({children:e,initial:a,isPresent:o,onExitComplete:s,custom:l,presenceAffectsLayout:u,mode:c,anchorX:d,anchorY:p,root:m})=>{let g=(0,n.useConstant)(h),y=(0,r.useId)(),w=!0,b=(0,r.useMemo)(()=>(w=!1,{id:y,initial:a,isPresent:o,custom:l,onExitComplete:e=>{for(let t of(g.set(e,!0),g.values()))if(!t)return;s&&s()},register:e=>(g.set(e,!1),()=>g.delete(e))}),[o,g,s]);return u&&w&&(b={...b}),(0,r.useMemo)(()=>{g.forEach((e,t)=>g.set(t,!1))},[o]),r.useEffect(()=>{o||g.size||!s||s()},[o]),"popLayout"===c&&(e=(0,t.jsx)(f,{isPresent:o,anchorX:d,anchorY:p,root:m,children:e})),(0,t.jsx)(i.PresenceContext.Provider,{value:b,children:e})};function h(){return new Map}var m=e.i(464978);let g=e=>e.key||"";function y(e){let t=[];return r.Children.forEach(e,e=>{(0,r.isValidElement)(e)&&t.push(e)}),t}e.s(["AnimatePresence",0,({children:e,custom:i,initial:s=!0,onExitComplete:l,presenceAffectsLayout:u=!0,mode:c="sync",propagate:d=!1,anchorX:f="left",anchorY:h="top",root:w})=>{let[b,v]=(0,m.usePresence)(d),S=(0,r.useMemo)(()=>y(e),[e]),E=d&&!b?[]:S.map(g),A=(0,r.useRef)(!0),k=(0,r.useRef)(S),x=(0,n.useConstant)(()=>new Map),I=(0,r.useRef)(new Set),[P,C]=(0,r.useState)(S),[T,q]=(0,r.useState)(S);(0,o.useIsomorphicLayoutEffect)(()=>{A.current=!1,k.current=S;for(let e=0;e<T.length;e++){let t=g(T[e]);E.includes(t)?(x.delete(t),I.current.delete(t)):!0!==x.get(t)&&x.set(t,!1)}},[T,E.length,E.join("-")]);let L=[];if(S!==P){let e=[...S];for(let t=0;t<T.length;t++){let r=T[t],a=g(r);E.includes(a)||(e.splice(t,0,r),L.push(r))}return"wait"===c&&L.length&&(e=L),q(y(e)),C(S),null}let{forceRender:M}=(0,r.useContext)(a.LayoutGroupContext);return(0,t.jsx)(t.Fragment,{children:T.map(e=>{let r=g(e),a=(!d||!!b)&&(S===T||E.includes(r));return(0,t.jsx)(p,{isPresent:a,initial:(!A.current||!!s)&&void 0,custom:i,presenceAffectsLayout:u,mode:c,root:w,onExitComplete:a?void 0:()=>{if(I.current.has(r)||(I.current.add(r),!x.has(r)))return;x.set(r,!0);let e=!0;x.forEach(t=>{t||(e=!1)}),e&&(M?.(),q(k.current),d&&v?.(),l&&l())},anchorX:f,anchorY:h,children:e},r)})})}],88653)}]);