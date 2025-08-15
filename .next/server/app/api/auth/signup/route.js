"use strict";(()=>{var e={};e.id=654,e.ids=[654],e.modules={72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},61282:e=>{e.exports=require("child_process")},84770:e=>{e.exports=require("crypto")},80665:e=>{e.exports=require("dns")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},98216:e=>{e.exports=require("net")},19801:e=>{e.exports=require("os")},55315:e=>{e.exports=require("path")},68621:e=>{e.exports=require("punycode")},76162:e=>{e.exports=require("stream")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},96357:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>x,patchFetch:()=>g,requestAsyncStorage:()=>d,routeModule:()=>c,serverHooks:()=>h,staticGenerationAsyncStorage:()=>m});var s={};t.r(s),t.d(s,{POST:()=>l});var o=t(49303),a=t(88716),i=t(60670),n=t(87070),u=t(1926),p=t(20471);async function l(e){let r=(0,u.uw)();try{let{name:t,email:s,password:o}=await e.json();if(!t||!s||!o)return n.NextResponse.json({error:"Missing required fields"},{status:400});let{data:a,error:i}=await r.auth.admin.createUser({email:s,password:o,user_metadata:{name:t},email_confirm:!0});if(i){if(console.error("Supabase signup error:",i),i.message.includes("already exists"))return n.NextResponse.json({error:"User already exists"},{status:409});return n.NextResponse.json({error:i.message},{status:500})}let u=a.user,{error:l}=await r.from("users").insert({id:u.id,name:u.user_metadata.name,email:u.email});if(l)return console.error("Error inserting user into public table:",l),await r.auth.admin.deleteUser(u.id),n.NextResponse.json({error:"Failed to create user profile."},{status:500});try{let e=`Welcome to IndkanChristmas Tree Store, ${u.user_metadata.name}! 🎄`,r=`Hi ${u.user_metadata.name},

Thank you for joining IndkanChristmas Tree Store! We're excited to have you here!!!.

Your account has been successfully created with the email: ${u.email}

Start exploring our collection of beautiful Christmas trees and decorations today!

Best regards,
The Indkan Christmas Tree Store Team`,t=`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2e7d32;">Welcome to Xmas Tree Shop, ${u.user_metadata.name}! 🎄</h1>
          <p>Thank you for joining Xmas Tree Shop! We're excited to have you on board.</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Your account details:</strong></p>
            <p>Email: ${u.email}</p>
            <p>Account created: ${new Date().toLocaleDateString()}</p>
          </div>
          
          <p>Start exploring our collection of beautiful Christmas trees and decorations today!</p>
          
          <a href="https://www.indkanchristmastree.com" 
             style="display: inline-block; padding: 10px 20px; background-color: #2e7d32; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
            Start Shopping Now
          </a>
          
          <p>If you have any questions, feel free to reply to this email.</p>
          
          <p>Best regards,<br/>The IndkanChristmas Tree Store Team</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
            <p>You're receiving this email because you recently created a new Indkan Christmas Tree Store account.</p>
            <p>\xa9 ${new Date().getFullYear()} Indkan Christmas Tree Store. All rights reserved.</p>
          </div>
        </div>
      `;await (0,p.C)({to:u.email,subject:e,text:r,html:t})}catch(e){console.error("Failed to send welcome email:",e)}return n.NextResponse.json({user:{id:u.id,name:u.user_metadata.name,email:u.email}})}catch(e){return console.error("Signup route error:",e),n.NextResponse.json({error:"Server error"},{status:500})}}let c=new o.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/auth/signup/route",pathname:"/api/auth/signup",filename:"route",bundlePath:"app/api/auth/signup/route"},resolvedPagePath:"/Users/anonymous/Downloads/xmas-tree/src/app/api/auth/signup/route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:d,staticGenerationAsyncStorage:m,serverHooks:h}=c,x="/api/auth/signup/route";function g(){return(0,i.patchFetch)({serverHooks:h,staticGenerationAsyncStorage:m})}},20471:(e,r,t)=>{t.d(r,{C:()=>o});let s=t(55245).createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT),secure:"true"===process.env.SMTP_SECURE,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}});async function o({to:e,subject:r,text:t,html:o}){let a={from:`"Indkan Christmas Tree Store" <${process.env.SMTP_USER}>`,to:e,subject:r,text:t,html:o};try{let e=await s.sendMail(a);return console.log("Message sent: %s",e.messageId),e}catch(e){throw console.error("Error sending email:",e),Error("Failed to send email.")}}},1926:(e,r,t)=>{t.d(r,{fU:()=>u,pR:()=>l,uw:()=>p});var s=t(86718),o=t(71615);let a="https://nyykggssyasvxrtjhhhb.supabase.co",i="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55eWtnZ3NzeWFzdnhydGpoaGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMjM5NDksImV4cCI6MjA3MDU5OTk0OX0.60hkCLL76yg0Bg9-W-le06lHnSwadeU74-xEpRPAqug",n=process.env.SUPABASE_SERVICE_ROLE_KEY;function u(){let e=(0,o.cookies)();return(0,s.createServerClient)(a,i,{cookies:{get:r=>e.get(r)?.value}})}function p(){let e=(0,o.cookies)();return(0,s.createServerClient)(a,n,{cookies:{get:r=>e.get(r)?.value}})}(0,s.createBrowserClient)(a,i);let l=(0,s.createServerClient)(a,n,{cookies:{get:()=>""}})}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[276,219,70,245],()=>t(96357));module.exports=s})();