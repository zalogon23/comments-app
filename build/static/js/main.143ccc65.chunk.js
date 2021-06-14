(this["webpackJsonpcomments-app"]=this["webpackJsonpcomments-app"]||[]).push([[0],{157:function(e,t,c){},469:function(e,t,c){"use strict";c.r(t);var n=c(2),a=c(148),s=c.n(a),o=(c(157),c(13)),i=c(5),r=c(6),l=c(7),j=c(149),u=c(0),b=Object(n.createContext)();var d=function(e){var t,c=e.children,a=!1,s=Object(j.a)(document.cookie.split(";"));try{for(s.s();!(t=s.n()).done;){0===t.value.indexOf("connect.sid")&&(a=!0)}}catch(h){s.e(h)}finally{s.f()}var o=Object(n.useState)({logged:a}),r=Object(i.a)(o,2),d=r[0],m=r[1];return Object(n.useEffect)((function(){d.logged&&fetch("/api/profile").then((function(e){return e.json()})).then((function(e){return m(Object(l.a)({logged:!0},e.data))})).catch((function(e){e&&console.log(e)}))}),[]),Object(u.jsx)(b.Provider,{value:[d,m],children:c})};var m=function(){var e=Object(n.useContext)(b),t=Object(i.a)(e,2),c=t[0],a=t[1],s=Object(r.h)().pathname;return Object(u.jsxs)("header",{className:"main-header",children:[0!==s.indexOf("/login")&&(c.logged?Object(u.jsx)("button",{onClick:function(){fetch("/api/logout",{method:"POST"}).then((function(e){return e.json()})).then((function(e){a({logged:!1}),console.log(e),L.removeQueries()})).catch((function(e){e&&console.log(e)}))},className:"logout",children:"Log Out"}):Object(u.jsx)(o.b,{to:"/login",className:"login",children:"Log In"})),Object(u.jsx)("h1",{className:"title",children:"COMMENTS APP"}),Object(u.jsxs)("div",{className:"comment",children:[Object(u.jsx)("input",{type:"text",placeholder:"Look for a topic..."}),Object(u.jsx)("button",{className:"add add-main",children:Object(u.jsx)("i",{className:"fas fa-search"})})]}),Object(u.jsx)("nav",{children:Object(u.jsxs)("ul",{children:[Object(u.jsx)(o.c,{activeClassName:"here",exact:!0,to:"/",children:"Home"}),Object(u.jsx)(o.c,{activeClassName:"here",to:"/profile",children:"Profile"}),Object(u.jsx)(o.c,{activeClassName:"here",to:"/topics",children:"Topics"}),Object(u.jsx)(o.c,{activeClassName:"here",to:"/enemies",children:"Enemies"})]})})]})};var h=function(){return Object(u.jsx)(u.Fragment,{children:Object(u.jsx)("main",{className:"home",children:Object(u.jsxs)("div",{className:"content",children:[Object(u.jsx)("h2",{className:"title",children:"Prepare to discuss"}),Object(u.jsx)("p",{className:"intro",children:"Este sitio fue ideado con la premisa de que a todos les gusta hablar mal de algo. Y debido a lo comun que es, he considerado necesario declararlo como un Derecho Humano, el derecho de quejarse de todo. Por lo anterior, esta plataforma simplemente se presenta como un medio de descarga emocional, y... por que no (en el mejor de los casos) como punto de discusiones constructivas y tertulias amenas."}),Object(u.jsxs)("div",{className:"random",children:[Object(u.jsx)("span",{children:"Random Discussion"}),Object(u.jsx)("button",{className:"go-to-comments",children:"Join"})]})]})})})};var O=function(e,t){e.id||fetch("api/profile",{method:"GET"}).then((function(e){return e.json()})).then((function(e){console.log(e),e.error||e.id+100&&t.replace("/")}))};var f=function(){var e=Object(n.useContext)(b),t=Object(i.a)(e,2),c=t[0],a=t[1],s=Object(n.useState)(""),j=Object(i.a)(s,2),d=j[0],m=j[1],h=Object(n.useState)(""),f=Object(i.a)(h,2),p=f[0],g=f[1],x=Object(n.useState)(""),v=Object(i.a)(x,2),N=v[0],C=v[1],y=(Object(r.h)().state||{from:{pathname:"/"}}).from,S=Object(r.g)();return Object(n.useEffect)((function(){O(c,S)}),[]),Object(u.jsxs)("main",{className:"login-form",children:[Object(u.jsx)("h3",{className:"title",children:"Login"}),Object(u.jsxs)("form",{children:[Object(u.jsx)("input",{style:"username"===N?{backgroundColor:"#fbb"}:{},onChange:function(e){return m(e.target.value)},value:d,type:"text",className:"username",placeholder:"Username"}),Object(u.jsx)("input",{style:"password"===N?{backgroundColor:"#fbb"}:{},onChange:function(e){return g(e.target.value)},value:p,type:"password",className:"password",placeholder:"Password"}),Object(u.jsx)("button",{onClick:function(e){e.preventDefault(),fetch("api/login",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({username:d,password:p})}).then((function(e){return e.json()})).then((function(e){if(!e.error)return a(Object(l.a)(Object(l.a)({},e.data),{},{logged:!0})),console.log(e),void S.replace(y);console.log(e),"username"===e.cause&&C("username"),"password"===e.cause&&C("password")})).catch((function(e){e&&console.log(e)}))},className:"login",children:"Login"})]}),Object(u.jsxs)("div",{className:"register-now",children:[Object(u.jsx)("span",{children:" Have not an account yet? "}),Object(u.jsx)(o.b,{to:"/register",children:"Sign In"})]})]})},p=c(472);function g(){document.querySelector(".image-picker-input").click()}var x=function(e){var t=e.user,c=e.setUser,a=Object(n.useState)(!1),s=Object(i.a)(a,2),o=s[0],r=s[1],j=Object(n.useRef)();return Object(u.jsxs)("form",{className:"avatar-section",children:[Object(u.jsx)("img",{ref:j,onClick:g,className:"image-picker",src:t.profile_image,alt:"Profile"}),o&&Object(u.jsxs)("div",{className:"image-actions",children:[Object(u.jsx)("button",{className:"confirmUpdateImage",onClick:function(e){e.preventDefault();var n=new FormData(document.forms[0]);fetch("/api/profile/avatar",{method:"PUT",body:n}).then((function(e){return e.json()})).then((function(e){c(Object(l.a)(Object(l.a)({},t),{},{profile_image:e.path})),L.removeQueries()})).catch((function(e){return console.log(e)})).finally((function(){return r(!1)}))},children:Object(u.jsx)("i",{className:"fas fa-check yes"})}),Object(u.jsx)("button",{className:"cancelUpdateImage",onClick:function(){r(!1),j.current.src=t.profile_image,document.querySelector(".image-picker-input")&&(document.querySelector(".image-picker-input").value="")},children:Object(u.jsx)("i",{className:"fas fa-times"})})]}),Object(u.jsx)("i",{className:"fas fa-camera change-image"}),Object(u.jsx)("input",{name:"avatar",onChange:function(e){e.target.files[0]&&function(e,t){var c=e.target.files[0];if("image/svg+xml"!==c.type){var n=new Blob([c]),a=URL.createObjectURL(n);t.src=a}}(e,j.current);r(!0),void 0===e.target.files[0]&&(j.current.src=t.profile_image,r(!1))},className:"image-picker-input",accept:"image/*",type:"file"})]})};var v=function(e){var t=e.user,c=e.setUser,a=Object(n.useState)(!1),s=Object(i.a)(a,2),o=s[0],r=s[1],j=Object(n.useState)(""),b=Object(i.a)(j,2),d=b[0],m=b[1];return Object(u.jsx)("div",{className:"info",children:o?Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("textarea",{onChange:function(e){return m(e.target.value)},className:"set-personal-info",value:d}),Object(u.jsxs)("div",{className:"actions",children:[Object(u.jsx)("button",{onClick:function(){fetch("/api/profile/info",{method:"PUT",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({info:d})}).then((function(e){return e.json()})).then((function(e){c(Object(l.a)(Object(l.a)({},t),{},{profile_info:e.data})),h(),L.removeQueries()})).catch((function(e){e&&console.log(e)}))},className:"set",children:"Set"}),Object(u.jsx)("button",{onClick:h,className:"cancel",children:"Cancel"})]})]}):Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("p",{children:t.profile_info}),Object(u.jsx)("button",{onClick:function(){r(!0),m(t.profile_info)},className:"edit",children:"Edit"})]})});function h(){r(!1)}};var N=function(){var e=Object(n.useContext)(b),t=Object(i.a)(e,2),c=t[0],a=t[1],s=Object(n.useState)(""),o=Object(i.a)(s,2),r=(o[0],o[1],Object(n.useState)("watch")),j=Object(i.a)(r,2),d=(j[0],j[1],Object(p.a)("userdata",(function(){return fetch("/api/profile").then((function(e){return e.json()}))})));return Object(n.useEffect)((function(){d.isSuccess&&a(Object(l.a)(Object(l.a)({},c),d.data.data))}),[]),Object(u.jsx)("main",{className:"profile",children:d.isLoading?Object(u.jsx)("div",{className:"loading",children:"It is loading..."}):d.isError?Object(u.jsx)("div",{className:"error",children:"There was an error fetching. Please log out and try again"}):Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(x,{user:c,setUser:a}),Object(u.jsxs)("div",{className:"content",children:[Object(u.jsx)("h3",{className:"name",children:c.username}),Object(u.jsx)(v,{user:c,setUser:a})]})]})})};var C=function(){var e=Object(r.g)(),t=Object(n.useContext)(b),c=Object(i.a)(t,2),a=c[0],s=(c[1],Object(n.useState)("")),o=Object(i.a)(s,2),l=o[0],j=o[1],d=Object(n.useState)(""),m=Object(i.a)(d,2),h=m[0],f=m[1];return Object(n.useEffect)((function(){O(a,e)}),[]),Object(u.jsxs)("main",{className:"register-form",children:[Object(u.jsx)("h3",{className:"title",children:"Register"}),Object(u.jsxs)("form",{children:[Object(u.jsx)("input",{onChange:function(e){return j(e.target.value)},type:"text",className:"username",placeholder:"Username",value:l}),Object(u.jsx)("input",{onChange:function(e){return f(e.target.value)},type:"password",className:"password",placeholder:"Password",value:h}),Object(u.jsx)("button",{onClick:function(t){t.preventDefault(),fetch("api/register",{headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify({username:l,password:h})}).then((function(e){return e.json()})).then((function(t){console.log(t),t.problem||e.replace("/login")})).catch((function(e){console.log(e),e&&console.log("No se pudo enviar la data...")}))},className:"register",children:"Register"})]})]})},y=(c(163),c(67));var S=function e(t){var c=t.source,a=Object(n.useState)(!1),s=Object(i.a)(a,2),o=s[0],j=s[1],d=Object(n.useState)(!1),m=Object(i.a)(d,2),h=m[0],O=m[1],f=Object(n.useState)(""),p=Object(i.a)(f,2),g=p[0],x=p[1],v=Object(n.useContext)(b),N=Object(i.a)(v,1)[0],C=Object(n.useState)(JSON.parse(c.children)),S=Object(i.a)(C,2),k=S[0],w=S[1],T=c.commenting,E=c.setCommenting,P=Object(r.g)(),A=Object(n.useRef)();return Object(n.useEffect)((function(){document.activeElement.blur(),A.current&&A.current.focus()}),[o]),Object(u.jsxs)("article",{className:"comment ".concat(c.id),children:[Object(u.jsx)("h4",{className:"author",children:c.authorName}),Object(u.jsx)("p",{className:"content",children:c.content}),Object(u.jsxs)("ul",{className:"actions",children:[o?Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("input",{ref:A,value:g,onChange:function(e){return x(e.target.value)},type:"text",className:"answer-comment"}),Object(u.jsx)("button",{onClick:function(e){j(!1),E(!1),x(""),fetch("/api/comment/",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({topic:c.topic,content:g,parent:c.id})}).then((function(e){return e.json()})).then((function(e){w([].concat(Object(y.a)(k),[e.data])),h||U()})).catch((function(e){e&&console.log(e)}))},className:"send-answer-comment",children:"Send"}),Object(u.jsx)("button",{onClick:function(){j(!1),E(!1)},className:"abort-answer-comment",children:"\xd7"})]}):Object(u.jsxs)(u.Fragment,{children:[!!k.length&&Object(u.jsx)("button",{onClick:U,className:"see-more",children:"..."}),Object(u.jsx)("button",{onClick:function(){T||(N.logged||P.push("/login"),j(!0),E(!0))},className:"answer",children:"+"})]}),N.id===c.author&&Object(u.jsx)("button",{onClick:function(e){return t=c.id,c.setChildComments(c.childComments.filter((function(e){return e.id!==t}))),void fetch("/api/comment",{method:"DELETE",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({id:t})}).then((function(e){return e.json()})).then((function(e){return console.log(e)})).catch((function(e){e&&console.log(e)})).finally((function(){document.querySelector(".answer-comment")||E(!1)}));var t},className:"delete",children:Object(u.jsx)("i",{className:"fa fa-trash","aria-hidden":"true"})})]}),Object(u.jsx)("ol",{className:"children",children:!!k.length&&h&&k.map((function(t){return Object(u.jsx)(e,{source:Object(l.a)(Object(l.a)({},t),{},{childComments:k,setChildComments:w,commenting:T,setCommenting:E})},t.id+1e9)}))})]});function U(){!1!==h?O(!1):fetch("/api/comment/".concat(c.id)).then((function(e){return e.json()})).then((function(e){return w(e)})).catch((function(e){return console.log(e)})).finally((function(){return O(!0)}))}};var k=function(){var e=Object(r.h)().pathname,t=Object(n.useContext)(b),c=Object(i.a)(t,1)[0],a=Object(n.useState)(""),s=Object(i.a)(a,2),o=s[0],j=s[1],d=Object(n.useState)([]),m=Object(i.a)(d,2),h=m[0],O=m[1],f=Object(n.useState)(!1),p=Object(i.a)(f,2),g=p[0],x=p[1],v=Object(n.useState)(""),N=Object(i.a)(v,2),C=N[0],k=N[1];return Object(n.useEffect)((function(){console.log("/api"+e),fetch("/api"+e).then((function(e){return e.json()})).then((function(e){var t=e.topic,c=e.comments;j(t),O(c),console.log(t)})).catch((function(e){e&&console.log(e)}))}),[]),Object(u.jsxs)(u.Fragment,{children:[Object(u.jsxs)("main",{className:"topic",children:[Object(u.jsx)("h3",{className:"title",children:null===o||void 0===o?void 0:o.subject}),Object(u.jsx)("p",{className:"intro",children:null===o||void 0===o?void 0:o.intro})]}),Object(u.jsxs)("article",{className:"actions",children:[Object(u.jsx)("input",{type:"text",className:"comment-content",onChange:function(e){return k(e.target.value)},value:C}),Object(u.jsx)("button",{className:"add-comment",onClick:function(){if(!C.length)return void console.log("Escribe algo pe mongol");fetch("/api/comment",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({topic:o.id,parent:null,content:C})}).then((function(e){return e.json()})).then((function(e){k(""),O([].concat(Object(y.a)(h),[Object(l.a)(Object(l.a)({},e.data),{},{authorName:c.username})]))})).catch((function(e){return console.log(e)}))},children:"+"})]}),Object(u.jsx)("section",{className:"comments",children:h.map((function(e){return Object(u.jsx)(S,{source:Object(l.a)(Object(l.a)({},e),{},{childComments:h,setChildComments:O,commenting:g,setCommenting:x})},e.id+1e7)}))})]})};var w=function(){var e=Object(n.useState)(""),t=Object(i.a)(e,2),c=t[0],a=t[1],s=Object(n.useState)(""),o=Object(i.a)(s,2),r=o[0],j=o[1];return Object(u.jsxs)("main",{className:"create-topic",children:[Object(u.jsx)("h3",{className:"title",children:"What topic would you like to create?"}),Object(u.jsxs)("form",{className:"topic-info",children:[Object(u.jsx)("input",{placeholder:"Topic's title",type:"text",className:"subject",value:c,onChange:function(e){return a(e.target.value)}}),Object(u.jsx)("textarea",{placeholder:"A small introduction...",className:"intro",value:r,onChange:function(e){return j(e.target.value)}}),Object(u.jsx)("button",{className:"create",onClick:function(e){if(e.preventDefault(),!c.length||!r.length)return;var t=b(c),n=b(r),s={subject:t,intro:n};fetch("/api/topics",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(Object(l.a)({},s))}).then((function(e){return e.json()})).then((function(e){console.log(e),j(""),a("")})).catch((function(e){return console.log(e)}))},children:"Create!"})]})]});function b(e){return e.charAt(0).toUpperCase()+e.slice(1)}};var T=function(){var e=Object(n.useState)([]),t=Object(i.a)(e,2),c=(t[0],t[1],Object(n.useContext)(b)),a=Object(i.a)(c,1)[0],s=Object(p.a)("topics",(function(){return fetch("/api/topics").then((function(e){return e.json()}))}));console.log(s);var l=Object(r.i)().path;return Object(u.jsxs)(r.d,{children:[Object(u.jsx)(r.b,{exact:!0,path:l,children:s.isLoading?Object(u.jsx)("div",{children:" Loading... "}):s.isError?Object(u.jsx)("div",{children:" There was an error, please refresh "}):Object(u.jsxs)(u.Fragment,{children:[a.logged&&Object(u.jsx)("section",{className:"create-topic",children:Object(u.jsx)(o.b,{to:"".concat(l,"/create"),className:"add-topic",children:"Add a new topic!"})}),Object(u.jsx)("main",{className:"topics",children:s.data.data.map((function(e){return Object(u.jsxs)("article",{className:"topic ".concat(e.id),children:[Object(u.jsxs)(o.b,{to:"".concat(l,"/").concat(e.id),children:[Object(u.jsx)("div",{className:"rating",children:[1,2,3,4,5].map((function(t){return t<=e.rating?Object(u.jsx)("i",{className:"fas fa-star"},t):Object(u.jsx)("i",{className:"far fa-star"},t+100)}))}),Object(u.jsx)("h3",{className:"title",children:e.subject}),Object(u.jsx)("p",{className:"content",children:e.intro}),Object(u.jsx)("h4",{className:"founder",children:e.authorName})]}),e.author===a.id&&Object(u.jsx)("button",{onClick:function(){return t=e.id,void fetch("/api/topics",{method:"DELETE",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({id:t})}).then((function(e){return e.json()})).then((function(e){console.log(e),L.invalidateQueries("topics")})).catch((function(e){return console.log(e)}));var t},className:"delete",children:Object(u.jsx)("i",{className:"fa fa-trash","aria-hidden":"true"})})]},e.id)}))})]})}),Object(u.jsx)(r.b,{path:"".concat(l,"/create"),component:w}),Object(u.jsx)(r.b,{exact:!0,path:"".concat(l,"/:id"),component:k})]})};var E=function(e){var t=Object(n.useContext)(b),c=Object(i.a)(t,1)[0].logged,a=Object(r.h)();return Object(u.jsx)(u.Fragment,{children:c?Object(u.jsx)(r.b,Object(l.a)({},e)):Object(u.jsx)(r.a,{to:{pathname:"/login",state:{from:a}}})})};var P=function(e){var t=Object(n.useContext)(b),c=Object(i.a)(t,1)[0];console.log(c.logged?"Already logged":"Isnt logged yet");var a=c.logged;return Object(u.jsx)(u.Fragment,{children:a?Object(u.jsx)(r.a,{to:{pathname:"/"}}):Object(u.jsx)(r.b,Object(l.a)({},e))})};var A=function(){return Object(u.jsxs)(r.d,{children:[Object(u.jsx)(r.b,{exact:!0,path:"/",component:h}),Object(u.jsx)(P,{path:"/login",component:f}),Object(u.jsx)(P,{path:"/register",component:C}),Object(u.jsx)(E,{path:"/profile",component:N}),Object(u.jsx)(r.b,{path:"/topics",component:T})]})},U=c(471),J=c(151),L=new U.a;var F=function(){return Object(u.jsx)(J.a,{client:L,children:Object(u.jsx)(d,{children:Object(u.jsxs)(o.a,{children:[Object(u.jsx)(m,{}),Object(u.jsx)(A,{})]})})})};s.a.render(Object(u.jsx)(F,{}),document.getElementById("root"))}},[[469,1,2]]]);
//# sourceMappingURL=main.143ccc65.chunk.js.map