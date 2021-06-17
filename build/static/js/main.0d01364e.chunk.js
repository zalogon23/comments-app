(this["webpackJsonpcomments-app"]=this["webpackJsonpcomments-app"]||[]).push([[0],{36:function(e,t,n){},44:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n(28),s=n.n(a),o=(n(36),n(5)),r=n(2),i=n(7),l=n(6),j=n(29),u=n(0),d=Object(c.createContext)();var b=function(e){var t,n=e.children,a=!1,s=Object(j.a)(document.cookie.split(";"));try{for(s.s();!(t=s.n()).done;){0===t.value.indexOf("connect.sid")&&(a=!0)}}catch(m){s.e(m)}finally{s.f()}var o=Object(c.useState)({logged:a}),i=Object(r.a)(o,2),b=i[0],h=i[1];return Object(c.useEffect)((function(){b.logged&&fetch("/api/profile").then((function(e){return e.json()})).then((function(e){return h(Object(l.a)({logged:!0},e.data))})).catch((function(e){e&&console.log(e)}))}),[]),Object(u.jsx)(d.Provider,{value:[b,h],children:n})},h=Object(c.createContext)();var m=function(e){var t=e.children,n=Object(i.h)().pathname,a=Object(c.useState)(""),s=Object(r.a)(a,2),o=s[0],l=s[1];return""===o&&0===n.indexOf("/topics/search/")&&l(n.slice(15)),Object(u.jsx)(h.Provider,{value:[o,l],children:t})};var O=function(e){var t=e.placeholder,n=e.className,a=Object(c.useState)(""),s=Object(r.a)(a,2),o=s[0],l=s[1],j=Object(c.useContext)(h),d=Object(r.a)(j,2),b=(d[0],d[1]),m=Object(i.g)();return Object(u.jsxs)("form",{children:[Object(u.jsx)("input",{value:o,onChange:function(e){return l(e.target.value)},type:"text",placeholder:t}),Object(u.jsx)("button",{onClick:function(e){if(e.preventDefault(),!o.length)return;m.push("/topics/search/"+o),b(o),l("")},className:n,children:Object(u.jsx)("i",{className:"fas fa-search"})})]})};var p=function(){var e=Object(c.useContext)(d),t=Object(r.a)(e,2),n=t[0],a=t[1],s=Object(i.h)().pathname,l=Object(i.g)();return Object(u.jsxs)("header",{className:"main-header",children:[0!==s.indexOf("/login")&&(n.logged?Object(u.jsx)("button",{onClick:function(){fetch("/api/logout",{method:"POST"}).then((function(e){return e.json()})).then((function(e){a({logged:!1}),console.log(e),X.removeQueries(),l.push("/")})).catch((function(e){e&&console.log(e)}))},className:"logout",children:"Log Out"}):Object(u.jsx)(o.b,{to:"/login",className:"login",children:"Log In"})),Object(u.jsx)("h1",{className:"title",children:"COMMENTS APP"}),Object(u.jsx)("div",{className:"comment",children:Object(u.jsx)(O,{className:"add add-main",placeholder:"Look for a topic!"})}),Object(u.jsx)("nav",{children:Object(u.jsxs)("ul",{children:[Object(u.jsx)(o.c,{activeClassName:"here",exact:!0,to:"/",children:"Home"}),Object(u.jsx)(o.c,{activeClassName:"here",to:"/profile",children:"Profile"}),Object(u.jsx)(o.c,{activeClassName:"here",to:"/topics",children:"Topics"}),Object(u.jsx)(o.c,{activeClassName:"here",to:"/enemies",children:"Enemies"})]})})]})},f=n(17),x=n.n(f),g=n(21);function N(){return v.apply(this,arguments)}function v(){return(v=Object(g.a)(x.a.mark((function e(){var t,n,c;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/topics").then((function(e){return e.json()})).catch((function(e){console.log(e)}));case 2:if(t=e.sent,(n=null===t||void 0===t?void 0:t.data.map((function(e){return e.id})))&&0!==n.length){e.next=6;break}return e.abrupt("return",!1);case 6:return c=Math.floor(Math.random()*n.length),e.abrupt("return",n[c]);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var C=function(){var e=Object(c.useState)("/topics"),t=Object(r.a)(e,2),n=t[0],a=t[1];return Object(c.useEffect)((function(){Object(g.a)(x.a.mark((function e(){var t;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N();case 2:if(t=e.sent){e.next=5;break}return e.abrupt("return");case 5:a("/topics/".concat(t));case 6:case"end":return e.stop()}}),e)})))()}),[]),Object(u.jsx)(u.Fragment,{children:Object(u.jsx)("main",{className:"home",children:Object(u.jsxs)("div",{className:"content",children:[Object(u.jsx)("h2",{className:"title",children:"Prepare to discuss"}),Object(u.jsx)("p",{className:"intro",children:"Este sitio fue ideado con la premisa de que a todos les gusta hablar mal de algo. Y debido a lo comun que es, he considerado necesario declararlo como un Derecho Humano, el derecho de quejarse de todo. Por lo anterior, esta plataforma simplemente se presenta como un medio de descarga emocional, y... por que no (en el mejor de los casos) como punto de discusiones constructivas y tertulias amenas."}),Object(u.jsxs)("div",{className:"random",children:[Object(u.jsx)("span",{children:"Random Discussion"}),Object(u.jsx)(o.b,{to:n,className:"go-to-comments",children:"Join"})]})]})})})};var y=function(e,t){e.id||fetch("api/profile",{method:"GET"}).then((function(e){return e.json()})).then((function(e){console.log(e),e.error||e.id+100&&t.replace("/")}))};var S=function(){var e=Object(c.useContext)(d),t=Object(r.a)(e,2),n=t[0],a=t[1],s=Object(c.useState)(""),j=Object(r.a)(s,2),b=j[0],h=j[1],m=Object(c.useState)(""),O=Object(r.a)(m,2),p=O[0],f=O[1],x=Object(c.useState)(""),g=Object(r.a)(x,2),N=g[0],v=g[1],C=(Object(i.h)().state||{from:{pathname:"/"}}).from,S=Object(i.g)();return Object(c.useEffect)((function(){y(n,S)}),[]),Object(u.jsxs)("main",{className:"login-form",children:[Object(u.jsx)("h3",{className:"title",children:"Login"}),Object(u.jsxs)("form",{children:[Object(u.jsx)("input",{onChange:function(e){return h(e.target.value)},value:b,type:"text",className:"username ".concat("username"===N&&"error-primary"),placeholder:"Username"}),Object(u.jsx)("input",{onChange:function(e){return f(e.target.value)},value:p,type:"password",className:"password ".concat("password"===N&&"error-primary"),placeholder:"Password"}),Object(u.jsx)("button",{onClick:function(e){e.preventDefault(),fetch("api/login",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({username:b,password:p})}).then((function(e){return e.json()})).then((function(e){if(!e.error)return a(Object(l.a)(Object(l.a)({},e.data),{},{logged:!0})),console.log(e),void S.replace(C);"username"===e.cause&&v("username"),"password"===e.cause&&v("password")})).catch((function(e){e&&console.log(e)}))},className:"login",children:"Login"})]}),Object(u.jsxs)("div",{className:"register-now",children:[Object(u.jsx)("span",{children:" Have not an account yet? "}),Object(u.jsx)(o.b,{to:"/register",children:"Sign In"})]}),Object(u.jsxs)("div",{className:"reset",children:[Object(u.jsx)("span",{children:" Forgot your password "}),Object(u.jsx)(o.b,{to:"/reset",children:"Reset"})]})]})},w=n(47);function k(){document.querySelector(".image-picker-input").click()}var T=function(e){var t=e.user,n=e.setUser,a=Object(c.useState)(!1),s=Object(r.a)(a,2),o=s[0],i=s[1],j=Object(c.useRef)(),d=Object(c.useState)(!1),b=Object(r.a)(d,2),h=b[0],m=b[1],O=Object(c.useRef)();return Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)("form",{ref:O,children:[Object(u.jsxs)("div",{className:"avatar-section",children:[Object(u.jsx)("img",{ref:j,onClick:k,className:"image-picker",src:t.profile_image,alt:"Profile"}),Object(u.jsx)("i",{className:"fas fa-camera change-image"}),Object(u.jsx)("input",{name:"avatar",onChange:function(e){e.target.files[0]&&function(e,t){var n=e.target.files[0];if("image/svg+xml"!==n.type){var c=new Blob([n]),a=URL.createObjectURL(c);t.src=a}}(e,j.current);i(!0),void 0===e.target.files[0]&&(j.current.src=t.profile_image,i(!1))},className:"image-picker-input",accept:"image/*",type:"file"}),h&&Object(u.jsx)("p",{className:"loading",children:"The image is uploading"})]}),o&&Object(u.jsxs)("div",{className:"image-actions",children:[Object(u.jsx)("button",{className:"confirmUpdateImage",onClick:function(e){e.preventDefault();var c=new FormData(O.current);console.log(document.forms[1]),m(!0),fetch("/api/profile/avatar",{method:"PUT",body:c}).then((function(e){return e.json()})).then((function(e){n(Object(l.a)(Object(l.a)({},t),{},{profile_image:e.path})),X.refetchQueries("userdata")})).catch((function(e){return alert(e)})).finally((function(){i(!1),m(!1)}))},children:Object(u.jsx)("i",{className:"fas fa-check yes"})}),Object(u.jsx)("button",{className:"cancelUpdateImage",onClick:function(){i(!1),j.current.src=t.profile_image,document.querySelector(".image-picker-input")&&(document.querySelector(".image-picker-input").value="")},children:Object(u.jsx)("i",{className:"fas fa-times"})})]})]})})};var E=function(e){var t=e.user,n=e.setUser,a=Object(c.useState)(!1),s=Object(r.a)(a,2),o=s[0],i=s[1],j=Object(c.useState)(""),d=Object(r.a)(j,2),b=d[0],h=d[1];return Object(u.jsx)("div",{className:"info",children:o?Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("textarea",{onChange:function(e){return h(e.target.value)},className:"set-personal-info",value:b}),Object(u.jsxs)("div",{className:"actions",children:[Object(u.jsx)("button",{onClick:function(){fetch("/api/profile/info",{method:"PUT",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({info:b})}).then((function(e){return e.json()})).then((function(e){n(Object(l.a)(Object(l.a)({},t),{},{profile_info:e.data})),m(),X.removeQueries()})).catch((function(e){e&&console.log(e)}))},className:"set",children:"Set"}),Object(u.jsx)("button",{onClick:m,className:"cancel",children:"Cancel"})]})]}):Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("p",{children:t.profile_info}),Object(u.jsx)("button",{onClick:function(){i(!0),h(t.profile_info)},className:"edit",children:"Edit"})]})});function m(){i(!1)}};var P=function(){var e=Object(c.useContext)(d),t=Object(r.a)(e,2),n=t[0],a=t[1],s=Object(w.a)("userdata",(function(){return fetch("/api/profile").then((function(e){return e.json()}))}));return Object(c.useEffect)((function(){s.isSuccess&&a(Object(l.a)(Object(l.a)({},n),s.data.data))}),[]),Object(u.jsx)("main",{className:"profile",children:s.isLoading?Object(u.jsx)("div",{className:"loading",children:"It is loading..."}):s.isError?Object(u.jsx)("div",{className:"error",children:"There was an error fetching. Please log out and try again"}):Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(T,{user:n,setUser:a}),Object(u.jsxs)("div",{className:"content",children:[Object(u.jsx)("h3",{className:"name",children:n.username}),Object(u.jsx)(E,{user:n,setUser:a})]})]})})};var F=function(){var e=Object(i.g)(),t=Object(c.useContext)(d),n=Object(r.a)(t,1)[0],a=Object(c.useState)(""),s=Object(r.a)(a,2),o=s[0],l=s[1],j=Object(c.useState)(""),b=Object(r.a)(j,2),h=b[0],m=b[1],O=Object(c.useState)(""),p=Object(r.a)(O,2),f=p[0],x=p[1],g=Object(c.useState)(""),N=Object(r.a)(g,2),v=N[0],C=N[1],S=Object(c.useState)(!1),w=Object(r.a)(S,2),k=w[0],T=w[1];return Object(c.useEffect)((function(){y(n,e)}),[]),Object(u.jsxs)("main",{className:"register-form",children:[Object(u.jsx)("h3",{className:"title",children:"Register"}),Object(u.jsxs)("form",{children:[Object(u.jsx)("input",{onChange:function(e){return m(e.target.value)},type:"text",className:"username ".concat("username"===o&&"error-primary"),placeholder:"Username",value:h}),Object(u.jsx)("input",{onChange:function(e){return x(e.target.value)},type:"password",className:"password ".concat("password"===o&&"error-primary"),placeholder:"Password",value:f}),Object(u.jsx)("input",{onChange:function(e){return C(e.target.value)},type:"email",className:"email ".concat("email"===o&&"error-primary"),placeholder:"Email",value:v}),Object(u.jsx)("button",{onClick:function(t){if(k)return;T(!0),t.preventDefault(),fetch("api/register",{headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify({username:h,password:f,email:v})}).then((function(e){return e.json()})).then((function(t){console.log(t),t.error?("username"===t.cause&&l("username"),"password"===t.cause&&l("password"),"email"===t.cause&&l("email")):e.replace("/login")})).catch((function(e){console.log(e),e&&console.log("No se pudo enviar la data...")})).finally((function(){return T(!1)}))},className:"register",children:"Register"})]})]})},U=n(22);var A=function(e){var t=e.addChild,n=e.setCommentMode,c=e.setCommenting,a=e.answerContent,s=e.onChange;return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("input",{value:a,type:"text",className:"answer-comment",onChange:s}),Object(u.jsx)("button",{onClick:t,className:"send-answer-comment",children:"Send"}),Object(u.jsx)("button",{onClick:function(){n(!1),c(!1)},className:"abort-answer-comment",children:"\xd7"})]})};var J=function(e){var t=e.editComment,n=e.setEditMode,c=e.setCommenting,a=e.answerContent,s=e.onChange;return Object(u.jsxs)("div",{className:"edit-actions",children:[Object(u.jsx)("input",{value:a,type:"text",className:"answer-comment",onChange:s}),Object(u.jsx)("button",{onClick:t,className:"send-answer-comment",children:Object(u.jsx)("i",{className:"fas fa-check yes"})}),Object(u.jsx)("button",{onClick:function(){n(!1),c(!1)},className:"abort-answer-comment",children:"\xd7"})]})};var L=function e(t){var n=t.source,a=Object(c.useState)(!1),s=Object(r.a)(a,2),j=s[0],b=s[1],h=Object(c.useState)(n.content),m=Object(r.a)(h,2),O=m[0],p=m[1],f=Object(c.useState)(!1),x=Object(r.a)(f,2),g=x[0],N=x[1],v=Object(c.useState)(!1),C=Object(r.a)(v,2),y=C[0],S=C[1],w=Object(c.useState)(O),k=Object(r.a)(w,2),T=k[0],E=k[1],P=Object(c.useContext)(d),F=Object(r.a)(P,1)[0],L=Object(c.useState)(JSON.parse(n.children)),R=Object(r.a)(L,2),I=R[0],D=R[1],M=n.commenting,_=n.setCommenting,q=Object(i.g)(),Q=Object(c.useRef)();return Object(c.useEffect)((function(){document.activeElement.blur(),Q.current&&Q.current.focus()}),[j]),Object(u.jsxs)("article",{className:"comment ".concat(n.id),children:[Object(u.jsx)(o.b,{className:"author",to:n.author===F.id?"/profile":"/users/".concat(n.author),children:n.authorName}),g?Object(u.jsx)(J,{editComment:function(e){_(!1),fetch("/api/comment/",{method:"PUT",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({content:T,id:n.id})}).then((function(e){return e.json()})).then((function(e){console.log(e),N(!1),p(T)})).catch((function(e){e&&console.log(e)}))},answerContent:T,setEditMode:N,setCommenting:_,onChange:function(e){return E(e.target.value)}}):Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("p",{className:"content",children:O}),Object(u.jsxs)("ul",{className:"actions",children:[j?Object(u.jsx)(A,{addChild:function(e){b(!1),_(!1),E(""),fetch("/api/comment/",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({topic:n.topic,content:T,parent:n.id})}).then((function(e){return e.json()})).then((function(e){D([].concat(Object(U.a)(I),[Object(l.a)(Object(l.a)({},e.data),{},{authorName:F.username})])),y||Y()})).catch((function(e){e&&console.log(e)}))},answerContent:T,setCommentMode:b,setCommenting:_,onChange:function(e){return E(e.target.value)}}):Object(u.jsxs)(u.Fragment,{children:[!!I.length&&Object(u.jsx)("button",{onClick:Y,className:"see-more",children:"..."}),Object(u.jsx)("button",{onClick:function(){M||(F.logged||q.push("/login"),b(!0),_(!0))},className:"answer",children:"+"}),F.id===n.author&&Object(u.jsx)("button",{onClick:function(){M||(N(!0),_(!0))},className:"answer",children:Object(u.jsx)("i",{className:"fas fa-edit"})})]}),F.id===n.author&&Object(u.jsx)("button",{onClick:function(e){return t=n.id,n.setChildComments(n.childComments.filter((function(e){return e.id!==t}))),void fetch("/api/comment",{method:"DELETE",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({id:t})}).then((function(e){return e.json()})).then((function(e){return console.log(e)})).catch((function(e){e&&console.log(e)})).finally((function(){document.querySelector(".answer-comment")||_(!1)}));var t},className:"delete",children:Object(u.jsx)("i",{className:"fa fa-trash","aria-hidden":"true"})})]})]}),Object(u.jsx)("ol",{className:"children",children:!!I.length&&y&&I.map((function(t){return Object(u.jsx)(e,{source:Object(l.a)(Object(l.a)({},t),{},{childComments:I,setChildComments:D,commenting:M,setCommenting:_})},t.id+1e9)}))})]});function Y(){!1!==y?S(!1):fetch("/api/comment/".concat(n.id)).then((function(e){return e.json()})).then((function(e){return D(e)})).catch((function(e){return console.log(e)})).finally((function(){return S(!0)}))}};var R=function(e){var t=e.value,n=e.id,a=e.setEditMode,s=e.setIntro,o=Object(c.useState)(t),i=Object(r.a)(o,2),l=i[0],j=i[1];return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("textarea",{onChange:function(e){return j(e.target.value)},value:l}),Object(u.jsxs)("div",{className:"edit-actions",children:[Object(u.jsx)("button",{onClick:function(){fetch("/api/topics/",{method:"PUT",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({content:l,id:n})}).then((function(e){return e.json()})).then((function(){s(l),j(""),a(!1)})).catch((function(e){e&&console.log(e)}))},className:"confirm",children:"Yes"}),Object(u.jsx)("button",{onClick:function(){return a(!1)},className:"cancel",children:"No"})]})]})};var I=function(){var e=Object(i.h)().pathname,t=Object(c.useContext)(d),n=Object(r.a)(t,1)[0],a=Object(c.useState)(""),s=Object(r.a)(a,2),j=s[0],b=s[1],h=Object(c.useState)(""),m=Object(r.a)(h,2),O=m[0],p=m[1],f=Object(c.useState)(!1),x=Object(r.a)(f,2),g=x[0],N=x[1],v=Object(c.useState)(""),C=Object(r.a)(v,2),y=C[0],S=C[1],w=Object(i.g)(),k=Object(c.useState)([]),T=Object(r.a)(k,2),E=T[0],P=T[1],F=Object(c.useState)(!1),A=Object(r.a)(F,2),J=A[0],I=A[1],D=Object(c.useState)(""),M=Object(r.a)(D,2),_=M[0],q=M[1];return Object(c.useEffect)((function(){console.log("/api"+e),fetch("/api"+e).then((function(e){return e.json()})).then((function(e){var t=e.topic,n=e.comments;S(e.topic.intro),p(t),P(n),console.log(t)})).catch((function(e){e&&console.log(e)}))}),[]),Object(u.jsx)(u.Fragment,{children:O.subject&&O.intro?Object(u.jsxs)(u.Fragment,{children:[Object(u.jsxs)("main",{className:"topic",children:[Object(u.jsx)(o.b,{className:"author-link",to:O.author===n.id?"/profile":"/users/".concat(O.author),children:O.authorName}),Object(u.jsx)("h3",{className:"title",children:O.subject[0].toUpperCase()+O.subject.slice(1)}),g?Object(u.jsx)(R,{value:y,id:O.id,editMode:g,setEditMode:N,setIntro:S}):Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)("p",{className:"intro",children:[y,O.author===n.id&&Object(u.jsx)("button",{onClick:function(){return N(!0)},className:"edit-topic",children:Object(u.jsx)("i",{className:"fas fa-edit"})})]})})]}),Object(u.jsxs)("article",{className:"actions",children:[Object(u.jsx)("input",{type:"text",className:"comment-content ".concat("main"===j&&"error-primary"),onChange:function(e){return q(e.target.value)},value:_}),Object(u.jsx)("button",{className:"add-comment",onClick:function(){n.logged||w.push("/login");if(!_.length)return void b("main");b(""),fetch("/api/comment",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({topic:O.id,parent:null,content:_})}).then((function(e){return e.json()})).then((function(e){q(""),P([].concat(Object(U.a)(E),[Object(l.a)(Object(l.a)({},e.data),{},{authorName:n.username})]))})).catch((function(e){return console.log(e)}))},children:"+"})]}),Object(u.jsx)("section",{className:"comments",children:E.map((function(e){return Object(u.jsx)(L,{source:Object(l.a)(Object(l.a)({},e),{},{childComments:E,setChildComments:P,commenting:J,setCommenting:I})},e.id+1e7)}))})]}):Object(u.jsx)("p",{children:"Loading..."})})};var D=function(){var e=Object(c.useContext)(d),t=Object(r.a)(e,1)[0],n=Object(w.a)("topics",(function(){return fetch("/api/topics").then((function(e){return e.json()}))}));return console.log(n),Object(u.jsxs)(u.Fragment,{children:[t.logged&&Object(u.jsx)("section",{className:"create-topic",children:Object(u.jsx)(o.b,{to:"/topics/create",className:"add-topic",children:"Add a new topic!"})}),Object(u.jsx)("main",{className:"topics",children:n.isLoading?Object(u.jsx)("div",{children:" Loading... "}):n.isError?Object(u.jsx)("div",{children:" There was an error, please refresh "}):Object(u.jsx)(u.Fragment,{children:n.data.data.map((function(e){return Object(u.jsxs)("article",{className:"topic ".concat(e.id),children:[Object(u.jsxs)(o.b,{to:"/topics/".concat(e.id),children:[Object(u.jsx)("div",{className:"rating",children:[1,2,3,4,5].map((function(t){return t<=e.rating?Object(u.jsx)("i",{className:"fas fa-star"},t):Object(u.jsx)("i",{className:"far fa-star"},t+100)}))}),Object(u.jsx)("h3",{className:"title",children:e.subject[0].toUpperCase()+e.subject.slice(1)}),Object(u.jsx)("p",{className:"content",children:e.intro}),Object(u.jsx)("h4",{className:"founder",children:e.authorName})]}),e.author===t.id&&Object(u.jsx)("button",{onClick:function(){return t=e.id,void fetch("/api/topics",{method:"DELETE",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({id:t})}).then((function(e){return e.json()})).then((function(e){console.log(e),X.refetchQueries("topics")})).catch((function(e){return console.log(e)}));var t},className:"delete",children:Object(u.jsx)("i",{className:"fa fa-trash","aria-hidden":"true"})})]},e.id)}))})})]})};var M=function(){var e=Object(c.useState)(""),t=Object(r.a)(e,2),n=t[0],a=t[1],s=Object(c.useState)(""),o=Object(r.a)(s,2),j=o[0],d=o[1],b=Object(i.g)();return Object(u.jsxs)("main",{className:"create-topic",children:[Object(u.jsx)("h3",{className:"title",children:"What topic would you like to create?"}),Object(u.jsxs)("form",{className:"topic-info",children:[Object(u.jsx)("input",{placeholder:"Topic's title",type:"text",className:"subject",value:n,onChange:function(e){return a(e.target.value)}}),Object(u.jsx)("textarea",{placeholder:"A small introduction...",className:"intro",value:j,onChange:function(e){return d(e.target.value)}}),Object(u.jsx)("button",{className:"create",onClick:function(e){if(e.preventDefault(),!n.length||!j.length)return;var t=(s=j,s.charAt(0).toUpperCase()+s.slice(1)),c={subject:n,intro:t};var s;fetch("/api/topics",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(Object(l.a)({},c))}).then((function(e){return e.json()})).then((function(e){console.log(e),d(""),a(""),b.push("/topics")})).catch((function(e){return console.log(e)}))},children:"Create!"})]})]})};var _=function(){var e=Object(c.useContext)(h),t=Object(r.a)(e,1)[0],n=Object(c.useContext)(d),a=Object(r.a)(n,1)[0],s=Object(w.a)(["searchedTopics",{search:t}],(function(e){var t=e.queryKey,n=Object(r.a)(t,2),c=(n[0],n[1].search);return fetch("/api/topics/search/".concat(c)).then((function(e){return e.json()}))}));return console.log(s),Object(u.jsx)("main",{className:"topics",children:s.isFetching?Object(u.jsx)("p",{children:"It is loading"}):s.isError?Object(u.jsx)("p",{children:"There was an error, please try another topic"}):s.data.data.length?Object(u.jsx)(u.Fragment,{children:s.data.data.map((function(e){return Object(u.jsxs)("article",{className:"topic ".concat(e.id),children:[Object(u.jsxs)(o.b,{to:"/topics/".concat(e.id),children:[Object(u.jsx)("div",{className:"rating",children:[1,2,3,4,5].map((function(t){return t<=e.rating?Object(u.jsx)("i",{className:"fas fa-star"},t):Object(u.jsx)("i",{className:"far fa-star"},t+100)}))}),Object(u.jsx)("h3",{className:"title",children:e.subject[0].toUpperCase()+e.subject.slice(1)}),Object(u.jsx)("p",{className:"content",children:e.intro}),Object(u.jsx)("h4",{className:"founder",children:e.authorName})]}),e.author===a.id&&Object(u.jsx)("button",{onClick:function(){return t=e.id,void fetch("/api/topics",{method:"DELETE",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({id:t})}).then((function(e){return e.json()})).then((function(e){console.log(e),X.refetchQueries("searchedTopics")})).catch((function(e){return console.log(e)}));var t},className:"delete",children:Object(u.jsx)("i",{className:"fa fa-trash","aria-hidden":"true"})})]},e.id)}))}):Object(u.jsxs)("section",{className:"no-matches",children:[Object(u.jsx)("p",{children:"There is no matching topic, sorry"}),Object(u.jsx)(o.b,{to:"/topics",children:"Go to Topics"})]})})};var q=function(){return Object(u.jsxs)(i.d,{children:[Object(u.jsx)(i.b,{exact:!0,path:"/topics",component:D}),Object(u.jsx)(i.b,{path:"/topics/create",component:M}),Object(u.jsx)(i.b,{exact:!0,path:"/topics/search/:search",component:_}),Object(u.jsx)(i.b,{exact:!0,path:"/topics/:id",component:I})]})};var Q=function(){var e,t=Object(c.useContext)(d),n=Object(r.a)(t,1)[0],a=Object(w.a)("enemies",(function(){return fetch("/api/friends").then((function(e){return e.json()}))}),{enabled:!!n.id});return Object(u.jsxs)("main",{className:"enemies",children:[Object(u.jsx)("h2",{className:"title",children:"Your enemies"}),n.id?a.isFetching?Object(u.jsx)("div",{className:"loading",children:"It is loading..."}):a.isError?Object(u.jsx)("div",{className:"error",children:"There was an error, please refresh"}):!(null===(e=a.data)||void 0===e?void 0:e.data.length)&&n.id?Object(u.jsx)("article",{className:"no-friends",children:"There are no friends to show, man."}):a.data.data.map((function(e){return Object(u.jsxs)(o.b,{to:"/users/".concat(e.id),className:"friend",children:[Object(u.jsx)("img",{src:e.profile_image,alt:e.username,className:"avatar"}),Object(u.jsxs)("div",{className:"info",children:[Object(u.jsx)("h3",{className:"username",children:e.username}),Object(u.jsx)("p",{className:"info",children:e.profile_info})]})]},e.id)})):Object(u.jsxs)("article",{className:"no-friends",children:[Object(u.jsx)("p",{children:"You should login to see your friends"}),Object(u.jsx)(o.b,{to:"/login",className:"login",children:"Login"})]})]})};var Y=function(){var e,t=Object(i.i)().params.id,n=Object(c.useContext)(d),a=Object(r.a)(n,1)[0],s=Object(i.g)(),o=Object(w.a)("anotheruser",(function(){return fetch("/api/users/"+t).then((function(e){return e.json()}))}),{cacheTime:0});return Object(u.jsx)("main",{className:"profile user",children:o.isLoading?Object(u.jsx)("div",{className:"loading",children:"It is loading..."}):o.isError?Object(u.jsx)("div",{className:"error",children:"There was an error fetching. Please log out and try again"}):!o.isFetching&&(null===(e=o.data)||void 0===e?void 0:e.data)?Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("form",{children:Object(u.jsx)("div",{className:"avatar-section",children:Object(u.jsx)("img",{className:"image-picker",src:"/"+o.data.data.profile_image,alt:"Profile"})})}),Object(u.jsxs)("div",{className:"content",children:[Object(u.jsx)("h3",{className:"name",children:o.data.data.username}),Object(u.jsxs)("div",{className:"info",children:[Object(u.jsx)("p",{children:o.data.data.profile_info}),a.id&&JSON.parse(o.data.data.friends).includes(a.id)?Object(u.jsx)("button",{onClick:function(){return l(o.data.data.id)},className:"remove-friend",children:Object(u.jsx)("i",{className:"fas fa-user-times"})}):Object(u.jsx)("button",{onClick:function(){return l(o.data.data.id)},className:"add-friend",children:Object(u.jsx)("i",{className:"fas fa-user-plus"})})]})]})]}):Object(u.jsx)(u.Fragment,{})});function l(e){a.id||s.push("/login"),fetch("/api/friends",{method:"PUT",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({id:e})}).then((function(e){return e.json()})).then((function(e){console.log(e),X.refetchQueries("anotheruser")})).catch((function(e){return console.log(e)}))}};var G=function(e){var t=Object(c.useContext)(d),n=Object(r.a)(t,1)[0].logged,a=Object(i.h)();return Object(u.jsx)(u.Fragment,{children:n?Object(u.jsx)(i.b,Object(l.a)({},e)):Object(u.jsx)(i.a,{to:{pathname:"/login",state:{from:a}}})})};var H=function(e){var t=Object(c.useContext)(d),n=Object(r.a)(t,1)[0];console.log(n.logged?"Already logged":"Isnt logged yet");var a=n.logged;return Object(u.jsx)(u.Fragment,{children:a?Object(u.jsx)(i.a,{to:{pathname:"/"}}):Object(u.jsx)(i.b,Object(l.a)({},e))})};var K=function(){var e=Object(c.useState)(""),t=Object(r.a)(e,2),n=t[0],a=t[1],s=Object(c.useState)(!1),o=Object(r.a)(s,2),i=o[0],l=o[1],j=Object(c.useState)(!1),d=Object(r.a)(j,2),b=d[0],h=d[1];return Object(u.jsxs)("main",{className:"reset-form",children:[Object(u.jsx)("h3",{className:"title",children:"Reset Password"}),b?Object(u.jsx)("p",{className:"done",children:"The email has been sent. Go to check it out"}):Object(u.jsxs)("form",{children:[Object(u.jsx)("input",{onChange:function(e){return a(e.target.value)},value:n,type:"email",placeholder:"Email"}),Object(u.jsx)("button",{onClick:function(e){if(e.preventDefault(),i)return;l(!0),fetch("/api/users/reset",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({email:n})}).then((function(e){return e.json()})).then((function(e){console.log(e),e.error||h(!0)})).catch((function(e){return console.log(e)})).finally((function(){l(!1)}))},className:"reset",children:"Send Reset Request"})]}),i&&Object(u.jsx)("p",{className:"loading",children:"Is loading..."})]})};var B=function(){var e=Object(c.useState)(""),t=Object(r.a)(e,2),n=t[0],a=t[1],s=Object(c.useState)(!1),l=Object(r.a)(s,2),j=l[0],d=l[1],b=Object(c.useState)(!1),h=Object(r.a)(b,2),m=h[0],O=h[1],p=Object(i.i)().params,f=new URLSearchParams(p.algo),x=f.get("resetKey"),g=f.get("id");return Object(u.jsxs)("main",{className:"reset-form",children:[Object(u.jsx)("h3",{className:"title",children:"Reset Password"}),m?Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("p",{className:"done",children:"The password has been updated"}),Object(u.jsx)(o.b,{to:"/login",children:"Login"})]}):Object(u.jsxs)("form",{children:[Object(u.jsx)("input",{onChange:function(e){return a(e.target.value)},value:n,type:"password",placeholder:"Password"}),Object(u.jsx)("button",{onClick:function(e){if(e.preventDefault(),j)return;d(!0),fetch("/api/users/reset",{method:"PUT",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({password:n,resetKey:x,id:g})}).then((function(e){return e.json()})).then((function(e){console.log(e),e.error||O(!0)})).catch((function(e){return console.log(e)})).finally((function(){d(!1)}))},className:"reset-password",children:"Reset Password"})]}),j&&Object(u.jsx)("p",{className:"loading",children:"Is loading..."})]})};var W=function(){return Object(u.jsxs)(i.d,{children:[Object(u.jsx)(i.b,{exact:!0,path:"/",component:C}),Object(u.jsx)(H,{path:"/login",component:S}),Object(u.jsx)(H,{path:"/register",component:F}),Object(u.jsx)(H,{path:"/reset/:algo",component:B}),Object(u.jsx)(H,{exact:!0,path:"/reset",component:K}),Object(u.jsx)(G,{path:"/profile",component:P}),Object(u.jsx)(i.b,{path:"/topics",component:q}),Object(u.jsx)(i.b,{path:"/enemies",component:Q}),Object(u.jsx)(i.b,{path:"/users/:id",component:Y})]})},z=n(46),V=n(31),X=new z.a;var Z=function(){return Object(u.jsx)(V.a,{client:X,children:Object(u.jsx)(o.a,{children:Object(u.jsx)(m,{children:Object(u.jsxs)(b,{children:[Object(u.jsx)(p,{}),Object(u.jsx)(W,{})]})})})})};s.a.render(Object(u.jsx)(Z,{}),document.getElementById("root"))}},[[44,1,2]]]);
//# sourceMappingURL=main.0d01364e.chunk.js.map