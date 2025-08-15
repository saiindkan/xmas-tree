(()=>{var e={};e.id=393,e.ids=[393],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},53520:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>u,originalPathname:()=>p,pages:()=>c,routeModule:()=>m,tree:()=>l}),r(46525),r(32029),r(7629),r(12523);var a=r(23191),o=r(88716),s=r(37922),i=r.n(s),n=r(95231),d={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>n[e]);r.d(t,d);let l=["",{children:["auth",{children:["verify-otp",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,46525)),"/Users/anonymous/Downloads/xmas-tree/src/app/auth/verify-otp/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,32029)),"/Users/anonymous/Downloads/xmas-tree/src/app/layout.tsx"],error:[()=>Promise.resolve().then(r.bind(r,7629)),"/Users/anonymous/Downloads/xmas-tree/src/app/error.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,12523)),"/Users/anonymous/Downloads/xmas-tree/src/app/not-found.tsx"]}],c=["/Users/anonymous/Downloads/xmas-tree/src/app/auth/verify-otp/page.tsx"],p="/auth/verify-otp/page",u={require:r,loadChunk:()=>Promise.resolve()},m=new a.AppPageRouteModule({definition:{kind:o.x.APP_PAGE,page:"/auth/verify-otp/page",pathname:"/auth/verify-otp",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},22118:(e,t,r)=>{Promise.resolve().then(r.bind(r,59006))},35047:(e,t,r)=>{"use strict";var a=r(77389);r.o(a,"notFound")&&r.d(t,{notFound:function(){return a.notFound}}),r.o(a,"useRouter")&&r.d(t,{useRouter:function(){return a.useRouter}}),r.o(a,"useSearchParams")&&r.d(t,{useSearchParams:function(){return a.useSearchParams}})},59006:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var a=r(10326),o=r(17577),s=r(35047),i=r(40381);let n=()=>a.jsx("div",{className:"min-h-screen flex items-center justify-center",children:a.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"})}),d=()=>{let e=(0,s.useSearchParams)(),t=(0,s.useRouter)(),r=e.get("email")||"",[n,d]=(0,o.useState)(""),[l,c]=(0,o.useState)(!1),p=async e=>{if(e.preventDefault(),!n||6!==n.length){i.ZP.error("Please enter a valid 6-digit OTP");return}c(!0);try{let e=await fetch("/api/auth/verify-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:r,otp:n})}),a=await e.json();if(!e.ok)throw Error(a.error||"Failed to verify OTP");t.push(`/auth/reset-password?email=${encodeURIComponent(r)}&token=${a.resetToken}`)}catch(e){i.ZP.error(e.message||"Failed to verify OTP")}finally{c(!1)}};return a.jsx("div",{className:"min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8",children:(0,a.jsxs)("div",{className:"max-w-md w-full space-y-8",children:[(0,a.jsxs)("div",{children:[a.jsx("h2",{className:"mt-6 text-center text-3xl font-extrabold text-gray-900",children:"Verify Your Email"}),(0,a.jsxs)("p",{className:"mt-2 text-center text-sm text-gray-600",children:["We've sent a 6-digit code to ",r]})]}),(0,a.jsxs)("form",{className:"mt-8 space-y-6",onSubmit:p,children:[a.jsx("div",{className:"rounded-md shadow-sm -space-y-px",children:(0,a.jsxs)("div",{children:[a.jsx("label",{htmlFor:"otp",className:"sr-only",children:"Verification Code"}),a.jsx("input",{id:"otp",name:"otp",type:"text",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,required:!0,value:n,onChange:e=>{d(e.target.value.replace(/\D/g,"").slice(0,6))},className:"appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm text-center text-2xl tracking-widest",placeholder:"000000"})]})}),a.jsx("div",{children:a.jsx("button",{type:"submit",disabled:l,className:"group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50",children:l?"Verifying...":"Verify Code"})}),a.jsx("div",{className:"text-center text-sm",children:a.jsx("button",{type:"button",onClick:()=>t.back(),className:"font-medium text-green-600 hover:text-green-500",children:"Back to previous step"})})]})]})})},l=()=>a.jsx(o.Suspense,{fallback:a.jsx(n,{}),children:a.jsx(d,{})})},46525:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});let a=(0,r(68570).createProxy)(String.raw`/Users/anonymous/Downloads/xmas-tree/src/app/auth/verify-otp/page.tsx#default`)},40381:(e,t,r)=>{"use strict";r.d(t,{ZP:()=>R});var a,o=r(17577);let s={data:""},i=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||s,n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,c=(e,t)=>{let r="",a="",o="";for(let s in e){let i=e[s];"@"==s[0]?"i"==s[1]?r=s+" "+i+";":a+="f"==s[1]?c(i,s):s+"{"+c(i,"k"==s[1]?"":t)+"}":"object"==typeof i?a+=c(i,t?t.replace(/([^,])+/g,e=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):s):null!=i&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=c.p?c.p(s,i):s+":"+i+";")}return r+(t&&o?t+"{"+o+"}":o)+a},p={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e},m=(e,t,r,a,o)=>{let s=u(e),i=p[s]||(p[s]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(s));if(!p[i]){let t=s!==e?e:(e=>{let t,r,a=[{}];for(;t=n.exec(e.replace(d,""));)t[4]?a.shift():t[3]?(r=t[3].replace(l," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(l," ").trim();return a[0]})(e);p[i]=c(o?{["@keyframes "+i]:t}:t,r?"":"."+i)}let m=r&&p.g?p.g:null;return r&&(p.g=p[i]),((e,t,r,a)=>{a?t.data=t.data.replace(a,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(p[i],t,a,m),i},f=(e,t,r)=>e.reduce((e,a,o)=>{let s=t[o];if(s&&s.call){let e=s(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;s=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+a+(null==s?"":s)},"");function x(e){let t=this||{},r=e.call?e(t.p):e;return m(r.unshift?r.raw?f(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,i(t.target),t.g,t.o,t.k)}x.bind({g:1});let g,h,y,b=x.bind({k:1});function v(e,t){let r=this||{};return function(){let a=arguments;function o(s,i){let n=Object.assign({},s),d=n.className||o.className;r.p=Object.assign({theme:h&&h()},n),r.o=/ *go\d+/.test(d),n.className=x.apply(r,a)+(d?" "+d:""),t&&(n.ref=i);let l=e;return e[0]&&(l=n.as||e,delete n.as),y&&l[0]&&y(n),g(l,n)}return t?t(o):o}}var w=e=>"function"==typeof e,j=(e,t)=>w(e)?e(t):e,P=(()=>{let e=0;return()=>(++e).toString()})(),k=((()=>{let e;return()=>e})(),(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return k(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+o}))}}}),N=[],_={toasts:[],pausedAt:void 0},$=e=>{_=k(_,e),N.forEach(e=>{e(_)})},S={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},C=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||P()}),D=e=>(t,r)=>{let a=C(t,e,r);return $({type:2,toast:a}),a.id},A=(e,t)=>D("blank")(e,t);A.error=D("error"),A.success=D("success"),A.loading=D("loading"),A.custom=D("custom"),A.dismiss=e=>{$({type:3,toastId:e})},A.remove=e=>$({type:4,toastId:e}),A.promise=(e,t,r)=>{let a=A.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let o=t.success?j(t.success,e):void 0;return o?A.success(o,{id:a,...r,...null==r?void 0:r.success}):A.dismiss(a),e}).catch(e=>{let o=t.error?j(t.error,e):void 0;o?A.error(o,{id:a,...r,...null==r?void 0:r.error}):A.dismiss(a)}),e};var O=new Map,F=1e3,q=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,E=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,T=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,z=(v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${q} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${E} 0.15s ease-out forwards;
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
    animation: ${T} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`),U=(v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${z} 1s linear infinite;
`,b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`),I=b`
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
}`,M=(v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${U} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${I} 0.2s ease-out forwards;
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
`,v("div")`
  position: absolute;
`,v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`);v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${M} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,v("div")`
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
`,v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,a=o.createElement,c.p=void 0,g=a,h=void 0,y=void 0,x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var R=A}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[276,77,183],()=>r(53520));module.exports=a})();