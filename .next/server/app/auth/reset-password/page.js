(()=>{var e={};e.id=48,e.ids=[48],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},32615:e=>{"use strict";e.exports=require("http")},35240:e=>{"use strict";e.exports=require("https")},68621:e=>{"use strict";e.exports=require("punycode")},76162:e=>{"use strict";e.exports=require("stream")},17360:e=>{"use strict";e.exports=require("url")},71568:e=>{"use strict";e.exports=require("zlib")},43171:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>u,originalPathname:()=>p,pages:()=>c,routeModule:()=>m,tree:()=>l}),r(30402),r(32029),r(7629),r(12523);var s=r(23191),a=r(88716),o=r(37922),i=r.n(o),n=r(95231),d={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>n[e]);r.d(t,d);let l=["",{children:["auth",{children:["reset-password",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,30402)),"/Users/saibhargav/Desktop/workspace/xmas-tree/src/app/auth/reset-password/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,32029)),"/Users/saibhargav/Desktop/workspace/xmas-tree/src/app/layout.tsx"],error:[()=>Promise.resolve().then(r.bind(r,7629)),"/Users/saibhargav/Desktop/workspace/xmas-tree/src/app/error.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,12523)),"/Users/saibhargav/Desktop/workspace/xmas-tree/src/app/not-found.tsx"]}],c=["/Users/saibhargav/Desktop/workspace/xmas-tree/src/app/auth/reset-password/page.tsx"],p="/auth/reset-password/page",u={require:r,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/auth/reset-password/page",pathname:"/auth/reset-password",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},12579:(e,t,r)=>{Promise.resolve().then(r.bind(r,55249))},35047:(e,t,r)=>{"use strict";var s=r(77389);r.o(s,"notFound")&&r.d(t,{notFound:function(){return s.notFound}}),r.o(s,"useRouter")&&r.d(t,{useRouter:function(){return s.useRouter}}),r.o(s,"useSearchParams")&&r.d(t,{useSearchParams:function(){return s.useSearchParams}})},55249:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>d});var s=r(10326),a=r(17577),o=r(35047),i=r(69447),n=r(40381);function d(){let[e,t]=(0,a.useState)(""),[r,d]=(0,a.useState)(!1),l=(0,o.useRouter)(),c=(0,i.e)(),p=async t=>{t.preventDefault(),d(!0);let{error:r}=await c.auth.updateUser({password:e});r?n.ZP.error(r.message):(n.ZP.success("Password updated successfully! You can now sign in."),l.push("/auth/signin")),d(!1)};return(0,s.jsxs)("div",{className:"min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8",children:[(0,s.jsxs)("div",{className:"sm:mx-auto sm:w-full sm:max-w-md",children:[s.jsx("h2",{className:"mt-6 text-center text-3xl font-extrabold text-gray-900",children:"Reset your password"}),s.jsx("p",{className:"mt-2 text-center text-sm text-gray-600",children:"Enter your new password below."})]}),s.jsx("div",{className:"mt-8 sm:mx-auto sm:w-full sm:max-w-md",children:s.jsx("div",{className:"bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10",children:(0,s.jsxs)("form",{className:"space-y-6",onSubmit:p,children:[(0,s.jsxs)("div",{children:[s.jsx("label",{htmlFor:"password",className:"block text-sm font-medium text-gray-700",children:"New Password"}),s.jsx("div",{className:"mt-1",children:s.jsx("input",{id:"password",name:"password",type:"password",required:!0,value:e,onChange:e=>t(e.target.value),className:"appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"})})]}),s.jsx("div",{children:s.jsx("button",{type:"submit",disabled:r,className:"w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50",children:r?"Updating...":"Update Password"})})]})})})]})}},69447:(e,t,r)=>{"use strict";r.d(t,{e:()=>a});var s=r(70474);function a(){return(0,s.createBrowserClient)("https://nyykggssyasvxrtjhhhb.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55eWtnZ3NzeWFzdnhydGpoaGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMjM5NDksImV4cCI6MjA3MDU5OTk0OX0.60hkCLL76yg0Bg9-W-le06lHnSwadeU74-xEpRPAqug")}},30402:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s=(0,r(68570).createProxy)(String.raw`/Users/saibhargav/Desktop/workspace/xmas-tree/src/app/auth/reset-password/page.tsx#default`)},40381:(e,t,r)=>{"use strict";r.d(t,{ZP:()=>Z});var s,a=r(17577);let o={data:""},i=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||o,n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,c=(e,t)=>{let r="",s="",a="";for(let o in e){let i=e[o];"@"==o[0]?"i"==o[1]?r=o+" "+i+";":s+="f"==o[1]?c(i,o):o+"{"+c(i,"k"==o[1]?"":t)+"}":"object"==typeof i?s+=c(i,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=i&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=c.p?c.p(o,i):o+":"+i+";")}return r+(t&&a?t+"{"+a+"}":a)+s},p={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e},m=(e,t,r,s,a)=>{let o=u(e),i=p[o]||(p[o]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(o));if(!p[i]){let t=o!==e?e:(e=>{let t,r,s=[{}];for(;t=n.exec(e.replace(d,""));)t[4]?s.shift():t[3]?(r=t[3].replace(l," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(l," ").trim();return s[0]})(e);p[i]=c(a?{["@keyframes "+i]:t}:t,r?"":"."+i)}let m=r&&p.g?p.g:null;return r&&(p.g=p[i]),((e,t,r,s)=>{s?t.data=t.data.replace(s,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(p[i],t,s,m),i},x=(e,t,r)=>e.reduce((e,s,a)=>{let o=t[a];if(o&&o.call){let e=o(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+s+(null==o?"":o)},"");function g(e){let t=this||{},r=e.call?e(t.p):e;return m(r.unshift?r.raw?x(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,i(t.target),t.g,t.o,t.k)}g.bind({g:1});let f,h,b,y=g.bind({k:1});function w(e,t){let r=this||{};return function(){let s=arguments;function a(o,i){let n=Object.assign({},o),d=n.className||a.className;r.p=Object.assign({theme:h&&h()},n),r.o=/ *go\d+/.test(d),n.className=g.apply(r,s)+(d?" "+d:""),t&&(n.ref=i);let l=e;return e[0]&&(l=n.as||e,delete n.as),b&&l[0]&&b(n),f(l,n)}return t?t(a):a}}var v=e=>"function"==typeof e,j=(e,t)=>v(e)?e(t):e,k=(()=>{let e=0;return()=>(++e).toString()})(),P=((()=>{let e;return()=>e})(),(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return P(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+a}))}}}),I=[],N={toasts:[],pausedAt:void 0},_=e=>{N=P(N,e),I.forEach(e=>{e(N)})},q={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},$=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||k()}),A=e=>(t,r)=>{let s=$(t,e,r);return _({type:2,toast:s}),s.id},C=(e,t)=>A("blank")(e,t);C.error=A("error"),C.success=A("success"),C.loading=A("loading"),C.custom=A("custom"),C.dismiss=e=>{_({type:3,toastId:e})},C.remove=e=>_({type:4,toastId:e}),C.promise=(e,t,r)=>{let s=C.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?j(t.success,e):void 0;return a?C.success(a,{id:s,...r,...null==r?void 0:r.success}):C.dismiss(s),e}).catch(e=>{let a=t.error?j(t.error,e):void 0;a?C.error(a,{id:s,...r,...null==r?void 0:r.error}):C.dismiss(s)}),e};var D=new Map,S=1e3,U=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,z=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,F=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,O=(w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${U} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${z} 0.15s ease-out forwards;
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
    animation: ${F} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`),E=(w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${O} 1s linear infinite;
`,y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`),M=y`
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
}`,R=(w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${E} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${M} 0.2s ease-out forwards;
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
`,w("div")`
  position: absolute;
`,w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,y`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`);w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${R} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,w("div")`
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
`,w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,s=a.createElement,c.p=void 0,f=s,h=void 0,b=void 0,g`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var Z=C}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[276,726,474,45],()=>r(43171));module.exports=s})();