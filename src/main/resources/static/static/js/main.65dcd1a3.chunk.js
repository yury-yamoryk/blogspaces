(this.webpackJsonpui=this.webpackJsonpui||[]).push([[0],{56:function(e,t,n){},58:function(e,t,n){},87:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n(24),c=n.n(a),s=n(3),o=(n(56),n(7)),l=n(12),i=(n(57),n(58),n(2)),u=n.n(i),d=n(5),b=n(6),j=n(41),m=n.n(j).a.create({baseURL:"http://localhost:8080/api",headers:{"Content-type":"application/json"}}),p={buildHttpHeader:function(){var e=localStorage.getItem("user");if(!e)return{};var t=JSON.parse(e);return t&&t.token?{Authorization:"Bearer "+t.token}:{}}},h="spaces/",f={getAll:function(){var e=Object(d.a)(u.a.mark((function e(t){var n,r,a,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.get("/spaces/users");case 2:return n=e.sent,r=n.data,a=r.filter((function(e){return e.name==t})),c=r.filter((function(e){return e.name!=t})),e.abrupt("return",{userBlogs:a.flatMap((function(e){return e.blogs?e.blogs.map((function(t){return Object(b.a)(Object(b.a)({},t),{},{link:h+e.name+"/"+t.id})})):[]})),otherBlogs:c.flatMap((function(e){return e.blogs?e.blogs.map((function(t){return Object(b.a)(Object(b.a)({},t),{},{link:h+e.name+"/"+t.id})})):[]}))});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),getBlog:function(){var e=Object(d.a)(u.a.mark((function e(t){var n,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.get(t);case 2:if(n=e.sent,r=n.data.optionalBlog){e.next=6;break}return e.abrupt("return",{id:"",title:"",posts:[],theme:null});case 6:return r.posts&&(r.posts=r.posts.map((function(e){return Object(b.a)(Object(b.a)({},e),{},{link:t+"/"+e.id})}))),e.abrupt("return",r);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),createBlog:function(){var e=Object(d.a)(u.a.mark((function e(t,n,r){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.put("/spaces/blog",{userName:t,blogId:n.id,blogTitle:n.title,themeId:r},{headers:p.buildHttpHeader()});case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),deleteBlog:function(){var e=Object(d.a)(u.a.mark((function e(t,n){var r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.post("/spaces/blog",{userName:t,blogId:n},{headers:p.buildHttpHeader()});case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},g="REGISTER_SUCCESS",O="REGISTER_FAIL",v="LOGIN_SUCCESS",x="LOGIN_FAIL",N="LOGOUT",y="SET_MESSAGE",w="CLEAR_MESSAGE",k="GET_ALL_BLOGS",S="GET_BLOG",B="GET_POST",C="GET_THEMES",I="ADD_COMMENT",E=function(e){return{type:y,payload:e}},T=function(){return{type:w}},R=n(0),P=function(e){var t=Object(s.c)((function(e){return e.blogs})),n=Object(s.c)((function(e){return e.authentication.user})),a=Object(s.b)();Object(r.useEffect)((function(){var e;a((e=n&&n.username,function(){var t=Object(d.a)(u.a.mark((function t(n){var r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,f.getAll(e);case 3:r=t.sent,n({type:k,allBlogs:r}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()))}),[]);return Object(R.jsx)("div",{className:"list row",children:Object(R.jsxs)("div",{className:"col-md-12",children:[Object(R.jsx)("h1",{children:"Blogs"}),n&&Object(R.jsx)("button",{className:"btn btn-success",onClick:function(){e.history.push("/spaces/createblog"),window.location.reload()},children:"Create new blog"}),n&&t.userBlogs.length>0&&Object(R.jsx)("h2",{children:"My Blogs"}),t.userBlogs&&t.userBlogs.length>0&&Object(R.jsx)("ul",{className:"list-group",children:t.userBlogs.map((function(e,t){return Object(R.jsx)("li",{className:"list-group-item",children:Object(R.jsx)(l.a,{to:e.link,className:"nav-link",children:e.title})},t)}))}),n&&t.userBlogs.length>0&&Object(R.jsx)("h2",{children:"Other Blogs"}),t.otherBlogs&&t.otherBlogs.length>0&&Object(R.jsx)("ul",{className:"list-group",children:t.otherBlogs.map((function(e,t){return Object(R.jsx)("li",{className:"list-group-item",children:Object(R.jsx)(l.a,{to:e.link,className:"nav-link",children:e.title})},t)}))}),(!t.userBlogs||0==t.userBlogs.length)&&(!t.otherBlogs||0==t.otherBlogs.length)&&Object(R.jsx)("span",{children:"The space is ready for blogs. Please, create your blog."})]})})},L=n(8),A=n(17),G=n.n(A),_=n(15),D=n.n(_),F=n(18),H=n.n(F),M={getAll:function(){return m.get("/spaces/users",{headers:p.buildHttpHeader()})},register:function(e,t){return m.post("/spaces/register",{username:e,password:t})},login:function(e,t){return m.post("/spaces/authenticate",{username:e,password:t}).then((function(e){return e.data.token&&localStorage.setItem("user",JSON.stringify(e.data)),e.data}))},logout:function(){localStorage.removeItem("user")}},U=function(e,t){return function(n){return M.register(e,t).then((function(e){if(e.data.message&&e.data.message.indexOf("Error")>-1){var t=e&&e.data&&e.data.message||e.data.message||e.toString();return n({type:O}),n(E(t)),Promise.reject()}return n({type:g}),n(E(e.data.message)),Promise.resolve()}))}},J=function(e,t){return function(n){return M.login(e,t).then((function(e){if(e.token)return n({type:v,payload:{user:e}}),Promise.resolve();var t=e.response&&e.response.data&&e.response.data.message||e.message||e.toString();return n({type:x}),n(E(t)),Promise.reject()}))}},q=function(){return function(e){M.logout(),e({type:N})}},z=function(e){if(!e)return Object(R.jsx)("div",{className:"alert alert-danger",role:"alert",children:"(required)"})},W=function(e){var t=Object(r.useRef)(),n=Object(r.useRef)(),a=Object(r.useState)(""),c=Object(L.a)(a,2),l=c[0],i=c[1],u=Object(r.useState)(""),d=Object(L.a)(u,2),b=d[0],j=d[1],m=Object(r.useState)(!1),p=Object(L.a)(m,2),h=p[0],f=p[1],g=Object(s.c)((function(e){return e.authentication.isLoggedIn})),O=Object(s.c)((function(e){return e.message.message})),v=Object(s.b)();return g?Object(R.jsx)(o.a,{to:"/spaces"}):Object(R.jsx)("div",{className:"col-md-12",children:Object(R.jsx)("div",{className:"card card-container",children:Object(R.jsxs)(G.a,{onSubmit:function(r){r.preventDefault(),f(!0),t.current.validateAll(),0===n.current.context._errors.length?v(J(l,b)).then((function(){e.history.push("/"),window.location.reload()})).catch((function(){f(!1)})):f(!1)},ref:t,children:[Object(R.jsxs)("div",{className:"form-group",children:[Object(R.jsx)("label",{htmlFor:"username",children:"USER NAME"}),Object(R.jsx)(D.a,{type:"text",className:"form-control",name:"username",value:l,onChange:function(e){var t=e.target.value;i(t)},validations:[z]})]}),Object(R.jsxs)("div",{className:"form-group",children:[Object(R.jsx)("label",{htmlFor:"password",children:"PASSWORD"}),Object(R.jsx)(D.a,{type:"password",className:"form-control",name:"password",value:b,onChange:function(e){var t=e.target.value;j(t)},validations:[z]})]}),Object(R.jsx)("div",{className:"text-center",children:Object(R.jsxs)("button",{className:"btn btn-light btn-block",disabled:h,children:[h&&Object(R.jsx)("span",{className:"spinner-border spinner-border-sm"}),Object(R.jsx)("span",{children:"SIGN IN"})]})}),O&&Object(R.jsx)("div",{className:"form-group",children:Object(R.jsx)("div",{className:"alert alert-danger",role:"alert",children:O})}),Object(R.jsx)(H.a,{style:{display:"none"},ref:n})]})})})},Z=function(e){if(!e)return Object(R.jsx)("div",{className:"alert alert-danger",role:"alert",children:"(required)"})},$=function(e){if(e.length<3||e.length>20)return Object(R.jsx)("div",{className:"alert alert-danger",role:"alert",children:"(must be between 3 and 20 characters)"})},K=function(e){if(e.length<6||e.length>40)return Object(R.jsx)("div",{className:"alert alert-danger",role:"alert",children:"(must be between 6 and 40 characters)"})},Q=function(){var e=Object(r.useRef)(),t=Object(r.useRef)(),n=Object(r.useState)(""),a=Object(L.a)(n,2),c=a[0],l=a[1],i=Object(r.useState)(""),u=Object(L.a)(i,2),d=u[0],b=u[1],j=Object(r.useState)(!1),m=Object(L.a)(j,2),p=m[0],h=m[1],f=Object(s.c)((function(e){return e.message.message})),g=Object(s.b)();return p?Object(R.jsx)(o.a,{to:"/spaces/login"}):Object(R.jsx)("div",{className:"col-md-12",children:Object(R.jsx)("div",{className:"card card-container",children:Object(R.jsxs)(G.a,{onSubmit:function(n){n.preventDefault(),h(!1),e.current.validateAll(),0===t.current.context._errors.length&&g(U(c,d)).then((function(){h(!0)})).catch((function(){h(!1)}))},ref:e,children:[!p&&Object(R.jsxs)("div",{children:[Object(R.jsxs)("div",{children:[Object(R.jsx)("label",{htmlFor:"username",children:"USER NAME"}),Object(R.jsx)(D.a,{type:"text",className:"form-control",name:"username",value:c,onChange:function(e){var t=e.target.value;l(t)},validations:[Z,$]})]}),Object(R.jsxs)("div",{children:[Object(R.jsx)("label",{htmlFor:"password",children:"PASSWORD"}),Object(R.jsx)(D.a,{type:"password",className:"form-control",name:"password",value:d,onChange:function(e){var t=e.target.value;b(t)},validations:[Z,K]})]}),Object(R.jsx)("div",{className:"text-center",children:Object(R.jsx)("button",{className:"btn btn-light btn-block",children:"SIGN UP"})})]}),f&&Object(R.jsx)("div",{className:"form-group",children:Object(R.jsx)("div",{className:"alert alert-danger",role:"alert",children:f})}),Object(R.jsx)(H.a,{style:{display:"none"},ref:t})]})})})},V=n(9),X=function(e){var t,n=Object(s.c)((function(e){return e.authentication.user})),a=Object(o.g)(),c=Object(s.c)((function(e){return e.blog})),i=Object(s.b)();c.id||e.history.goBack(),Object(r.useEffect)((function(){var e;i((e=a.pathname,function(){var t=Object(d.a)(u.a.mark((function t(n){var r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,f.getBlog(e);case 3:r=t.sent,n({type:S,blog:r}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()))}),[]);return Object(R.jsx)("div",{className:"list row",style:c.theme?{backgroundColor:null===(t=c.theme)||void 0===t?void 0:t.blogBackgroundColor,color:c.theme.blogColor}:{},children:Object(R.jsxs)("div",{className:"col-md-12",children:[Object(R.jsx)("h1",{children:c.title}),n&&n.username==e.match.params.userName&&Object(R.jsx)("button",{className:"btn btn-success",onClick:function(){e.history.push("/spaces/createpost/"+c.id),window.location.reload()},children:"Add Post"}),c.posts&&Object(R.jsx)("ul",{className:"list-group",children:c.posts.map((function(e,t){return Object(R.jsx)("li",{className:"list-group-item",children:Object(R.jsx)(l.a,{to:e.link,className:"nav-link",children:e.title})},t)}))}),n&&n.username==e.match.params.userName&&Object(R.jsx)("button",{className:"btn btn-danger",onClick:function(){var t=e.match.params.userName,n=e.match.params.blogId;i(function(e,t){return function(){var n=Object(d.a)(u.a.mark((function n(r){var a;return u.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,f.deleteBlog(e,t);case 2:return(a=n.sent).message&&r(E(a.message)),n.abrupt("return",a);case 5:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()}(t,n)).then((function(t){e.history.goBack()})).catch((function(e){console.log(e)}))},children:"Delete Blog"}),(!c.posts||0==c.posts.length)&&Object(R.jsx)("span",{children:"Nothing here right now."})]})})},Y={getPost:function(){var e=Object(d.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.get(t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),createPost:function(){var e=Object(d.a)(u.a.mark((function e(t,n,r){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.put("/spaces/post",{userName:t,blogId:n,postId:r.id,postTitle:r.title,postDescription:r.description},{headers:p.buildHttpHeader()});case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),deletePost:function(){var e=Object(d.a)(u.a.mark((function e(t,n,r){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.post("/spaces/post",{userName:t,blogId:n,postId:r},{headers:p.buildHttpHeader()});case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}()},ee={createComment:function(){var e=Object(d.a)(u.a.mark((function e(t,n,r,a){var c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.post("/spaces/createComment",{userName:t,blogId:n,postId:r,commentText:a.text,commentUserName:a.userName},{headers:p.buildHttpHeader()});case 2:return c=e.sent,e.abrupt("return",c.data);case 4:case"end":return e.stop()}}),e)})));return function(t,n,r,a){return e.apply(this,arguments)}}()},te=n(26),ne=n.n(te),re=function(e){if(!e)return Object(R.jsx)("div",{className:"alert alert-danger",role:"alert",children:"(cannot be empty)"})},ae=function(e){var t=Object(s.c)((function(e){return e.authentication.user})),n=Object(r.useRef)(),a=Object(r.useRef)(),c=Object(o.g)(),l=Object(s.c)((function(e){return e.post})),i=Object(s.c)((function(e){return e.blog.theme})),b=Object(s.b)(),j=Object(r.useState)(""),m=Object(L.a)(j,2),p=m[0],h=m[1],f=Object(s.c)((function(e){return e.message.message}));l||e.history.goBack();Object(r.useEffect)((function(){var e;b((e=c.pathname,function(){var t=Object(d.a)(u.a.mark((function t(n){var r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Y.getPost(e);case 3:r=t.sent,n({type:B,getPostResponse:r}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()))}),[]);return Object(R.jsx)("div",{className:"list row",style:i?{backgroundColor:i.postBackgroundColor,color:i.postColor}:{},children:Object(R.jsxs)("div",{className:"col-md-12",children:[Object(R.jsx)("h1",{children:l.title}),Object(R.jsx)("div",{children:l.description}),t&&Object(R.jsxs)(G.a,{onSubmit:function(r){if(r.preventDefault(),b(T()),n.current.validateAll(),0===a.current.context._errors.length){var c={id:-1,text:p,userName:t.username},s=e.match.params.userName,o=e.match.params.blogId,l=e.match.params.postId;b(function(e,t,n,r){return function(){var a=Object(d.a)(u.a.mark((function a(c){var s,o;return u.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,ee.createComment(e,t,n,r);case 2:return(s=a.sent).message?c(E(s.message)):(o=s.newComment,c({type:I,newComment:o})),a.abrupt("return",s);case 5:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()}(s,o,l,c))}},ref:n,children:[Object(R.jsx)("div",{className:"col-md-8",children:Object(R.jsxs)("div",{className:"input-group mb-3",children:[Object(R.jsx)(ne.a,{style:i?{backgroundColor:i.commentBackgroundColor,color:i.commentColor}:{},type:"text",className:"form-control",placeholder:"Leave a comment...",value:p,onChange:function(e){var t=e.target.value;h(t)},validations:[re]}),Object(R.jsx)("div",{className:"input-group-append",children:Object(R.jsx)("button",{className:"btn btn-outline-secondary",children:"Comment"})})]})}),f&&Object(R.jsx)("div",{className:"form-group",children:Object(R.jsx)("div",{className:"alert alert-danger",role:"alert",children:f})}),Object(R.jsx)(H.a,{style:{display:"none"},ref:a})]}),l.comments&&Object(R.jsx)("ul",{className:"list-group",children:l.comments.map((function(e,t){return Object(R.jsx)("li",{className:"list-group-item",children:Object(R.jsxs)("div",{style:i?{backgroundColor:i.commentBackgroundColor,color:i.commentColor}:{},children:[Object(R.jsxs)("span",{className:"commentUserName",children:[e.userName,": "]}),e.text]})},t)}))}),t&&t.username==e.match.params.userName&&Object(R.jsx)("button",{className:"btn btn-danger",onClick:function(){var t=e.match.params.userName,n=e.match.params.blogId,r=e.match.params.postId;b(function(e,t,n){return function(){var r=Object(d.a)(u.a.mark((function r(a){var c;return u.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Y.deletePost(e,t,n);case 2:return(c=r.sent).message&&a(E(c.message)),r.abrupt("return",c);case 5:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}()}(t,n,r)).then((function(t){e.history.goBack()})).catch((function(e){console.log(e)}))},children:"Delete Post"})]})})},ce=n(43),se=n.n(ce),oe={getAll:function(){var e=Object(d.a)(u.a.mark((function e(){var t,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.get("/spaces/themes");case 2:return t=e.sent,n=t.data,e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},le=function(e){if(!e)return Object(R.jsx)("div",{className:"alert alert-danger",role:"alert",children:"(required)"})},ie=function(e){if(!e.match(/^[a-zA-Z0-9-]+$/g))return Object(R.jsx)("div",{className:"alert alert-danger",role:"alert",children:"(must be at least 1 character from alpha-numeric and hyphens)"})},ue=function(e){var t=Object(s.c)((function(e){return e.authentication.user}));t||e.history.goBack();var n=Object(r.useRef)(),a=Object(r.useRef)(),c=Object(s.c)((function(e){return e.theme})),l=Object(r.useState)(""),i=Object(L.a)(l,2),b=i[0],j=i[1],m=Object(r.useState)(""),p=Object(L.a)(m,2),h=p[0],g=p[1],O=Object(r.useState)(""),v=Object(L.a)(O,2),x=v[0],N=v[1],y=Object(r.useState)(!1),w=Object(L.a)(y,2),k=w[0],S=w[1];Object(r.useEffect)((function(){I(function(){var e=Object(d.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,oe.getAll();case 3:return n=e.sent,t({type:C,getThemesResponse:n}),e.abrupt("return",n);case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}()).then((function(e){e&&N(e.themes[0].id)}))}),[]);var B=Object(s.c)((function(e){return e.message.message})),I=Object(s.b)();return k?Object(R.jsx)(o.a,{to:"/spaces"}):Object(R.jsx)("div",{className:"col-md-12",children:Object(R.jsx)("div",{className:"card card-container",children:Object(R.jsxs)(G.a,{onSubmit:function(e){if(e.preventDefault(),I(T()),S(!1),n.current.validateAll(),0===a.current.context._errors.length){var r={id:b,title:h,theme:null,posts:null};I(function(e,t,n){return function(){var r=Object(d.a)(u.a.mark((function r(a){var c,s;return u.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,f.createBlog(e,t,n);case 2:return(c=r.sent).message?a(E(c.message)):(s=c.newBlog,a({type:"CREATE_BLOG",newBlog:s})),r.abrupt("return",c);case 5:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}()}(t.username,r,x)).then((function(e){e.message?S(!1):S(!0)}))}else S(!1)},ref:n,children:[!k&&Object(R.jsxs)("div",{children:[Object(R.jsxs)("div",{children:[Object(R.jsx)("label",{htmlFor:"blogId",children:"BLOG URL ID"}),Object(R.jsx)(D.a,{type:"text",className:"form-control",name:"blogId",value:b,onChange:function(e){var t=e.target.value;j(t)},validations:[le,ie]})]}),Object(R.jsxs)("div",{children:[Object(R.jsx)("label",{htmlFor:"blogTitle",children:"BLOG TITLE"}),Object(R.jsx)(D.a,{type:"text",className:"form-control",name:"blogTitle",value:h,onChange:function(e){var t=e.target.value;g(t)},validations:[le]})]}),Object(R.jsxs)("div",{children:[Object(R.jsx)("label",{htmlFor:"blogTitle",children:"BLOG THEME"}),Object(R.jsx)(se.a,{className:"form-control",name:"blogThemeId",value:x,onChange:function(e){var t=e.target.value;N(t)},validations:[le],children:c&&c.map((function(e,t){return Object(R.jsx)("option",{value:e.id,children:e.name},t)}))})]}),Object(R.jsx)("div",{className:"text-center",children:Object(R.jsx)("button",{className:"btn btn-light btn-block",children:"CREATE BLOG"})})]}),B&&Object(R.jsx)("div",{className:"form-group",children:Object(R.jsx)("div",{className:"alert alert-danger",role:"alert",children:B})}),Object(R.jsx)(H.a,{style:{display:"none"},ref:a})]})})})},de=function(e){if(!e)return Object(R.jsx)("div",{className:"alert alert-danger",role:"alert",children:"(required)"})},be=function(e){if(!e.match(/^[a-zA-Z0-9-]+$/g))return Object(R.jsx)("div",{className:"alert alert-danger",role:"alert",children:"(must be at least 1 character from alpha-numeric and hyphens)"})},je=function(e){var t=Object(s.c)((function(e){return e.authentication.user}));t||e.history.goBack();var n=Object(r.useRef)(),a=Object(r.useRef)(),c=Object(r.useState)(""),o=Object(L.a)(c,2),l=o[0],i=o[1],b=Object(r.useState)(""),j=Object(L.a)(b,2),m=j[0],p=j[1],h=Object(r.useState)(""),f=Object(L.a)(h,2),g=f[0],O=f[1],v=Object(r.useState)(!1),x=Object(L.a)(v,2),N=x[0],y=x[1],w=Object(s.c)((function(e){return e.message.message})),k=Object(s.b)();return N&&e.history.goBack(),Object(R.jsx)("div",{className:"col-md-12",children:Object(R.jsx)("div",{className:"card card-container",children:Object(R.jsxs)(G.a,{onSubmit:function(r){if(r.preventDefault(),k(T()),y(!1),n.current.validateAll(),0===a.current.context._errors.length){var c={id:l,title:m,description:g,comments:null},s=e.match.params.blogId;k(function(e,t,n){return function(){var r=Object(d.a)(u.a.mark((function r(a){var c,s;return u.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Y.createPost(e,t,n);case 2:return(c=r.sent).message?a(E(c.message)):(s=c.newPost,a({type:"CREATE_POST",newPost:s})),r.abrupt("return",c);case 5:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}()}(t.username,s,c)).then((function(e){e.message?y(!1):y(!0)}))}else y(!1)},ref:n,children:[!N&&Object(R.jsxs)("div",{children:[Object(R.jsxs)("div",{children:[Object(R.jsx)("label",{htmlFor:"blogId",children:"POST URL ID"}),Object(R.jsx)(D.a,{type:"text",className:"form-control",name:"postId",value:l,onChange:function(e){var t=e.target.value;i(t)},validations:[de,be]})]}),Object(R.jsxs)("div",{children:[Object(R.jsx)("label",{htmlFor:"blogTitle",children:"POST TITLE"}),Object(R.jsx)(D.a,{type:"text",className:"form-control",name:"postTitle",value:m,onChange:function(e){var t=e.target.value;p(t)},validations:[de]})]}),Object(R.jsxs)("div",{children:[Object(R.jsx)("label",{htmlFor:"blogTitle",children:"POST DESCRIPTION"}),Object(R.jsx)(ne.a,{className:"form-control",name:"postDescription",value:g,onChange:function(e){var t=e.target.value;O(t)},validations:[de]})]}),Object(R.jsx)("div",{className:"text-center",children:Object(R.jsx)("button",{className:"btn btn-light btn-block",children:"CREATE POST"})})]}),w&&Object(R.jsx)("div",{className:"form-group",children:Object(R.jsx)("div",{className:"alert alert-danger",role:"alert",children:w})}),Object(R.jsx)(H.a,{style:{display:"none"},ref:a})]})})})},me=Object(V.a)(),pe=function(){var e=Object(s.c)((function(e){return e.authentication.user})),t=Object(s.b)();Object(r.useEffect)((function(){me.listen((function(e){t(T())}))}),[t]);return Object(R.jsx)(o.c,{history:me,children:Object(R.jsxs)("div",{children:[Object(R.jsxs)("nav",{className:"navbar navbar-expand",children:[Object(R.jsx)(l.a,{to:"/spaces",className:"navbar-brand ms-1",children:"Blog Spaces"}),e?Object(R.jsx)("div",{className:"navbar-nav ms-auto",children:Object(R.jsx)("li",{className:"nav-item",children:Object(R.jsx)("a",{href:"/spaces/login",className:"nav-link",onClick:function(){t(q())},children:"LogOut"})})}):Object(R.jsxs)("div",{className:"navbar-nav ms-auto",children:[Object(R.jsx)("li",{className:"nav-item",children:Object(R.jsx)(l.a,{to:"/spaces/login",className:"nav-link",children:"Login"})}),Object(R.jsx)("li",{className:"nav-item",children:Object(R.jsx)(l.a,{to:"/spaces/register",className:"nav-link",children:"Sign Up"})})]})]}),Object(R.jsx)("div",{className:"container mt-3",children:Object(R.jsxs)(o.d,{children:[Object(R.jsx)(o.b,{exact:!0,path:"/",children:Object(R.jsx)(o.a,{to:"/spaces"})}),Object(R.jsx)(o.b,{exact:!0,path:["/spaces/"],component:P}),Object(R.jsx)(o.b,{exact:!0,path:"/spaces/login",component:W}),Object(R.jsx)(o.b,{exact:!0,path:"/spaces/register",component:Q}),Object(R.jsx)(o.b,{exact:!0,path:"/spaces/createBlog",component:ue}),Object(R.jsx)(o.b,{exact:!0,path:"/spaces/createPost/:blogId",component:je}),Object(R.jsx)(o.b,{exact:!0,path:"/spaces/:userName/:blogId",component:X}),Object(R.jsx)(o.b,{exact:!0,path:"/spaces/:userName/:blogId/:postId",component:ae})]})})]})})},he=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,88)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),r(e),a(e),c(e),s(e)}))},fe=n(19),ge=n(44),Oe=n(45),ve=localStorage.getItem("user"),xe=ve?JSON.parse(ve):null,Ne=xe?{isLoggedIn:!0,user:xe}:{isLoggedIn:!1,user:null},ye=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ne,t=arguments.length>1?arguments[1]:void 0,n=t.type,r=t.payload;switch(n){case g:case O:return Object(b.a)(Object(b.a)({},e),{},{isLoggedIn:!1});case v:return Object(b.a)(Object(b.a)({},e),{},{isLoggedIn:!0,user:r.user});case x:case N:return Object(b.a)(Object(b.a)({},e),{},{isLoggedIn:!1,user:null});default:return e}},we={message:""},ke=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:we,t=arguments.length>1?arguments[1]:void 0,n=t.type,r=t.payload;switch(n){case y:return{message:r};case w:return{message:""};default:return e}},Se={userBlogs:[],otherBlogs:[]},Be=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Se,t=arguments.length>1?arguments[1]:void 0,n=t.type,r=t.allBlogs;switch(n){case k:return r;default:return e}},Ce={id:"",title:"",theme:null,posts:[]},Ie=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ce,t=arguments.length>1?arguments[1]:void 0,n=t.type;switch(n){case S:return t.blog;case B:return Object(b.a)(Object(b.a)({},e),{},{theme:t.getPostResponse.optionalTheme});default:return e}},Ee=n(46),Te={id:"",title:"",description:"",comments:[]},Re=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Te,t=arguments.length>1?arguments[1]:void 0,n=t.type;switch(n){case B:return t.getPostResponse.optionalPost;case I:return Object(b.a)(Object(b.a)({},e),{},{comments:[].concat(Object(Ee.a)(e.comments?e.comments:[]),[t.newComment])});default:return e}},Pe=[],Le=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Pe,t=arguments.length>1?arguments[1]:void 0,n=t.type;switch(n){case C:return t.getThemesResponse.themes;default:return e}},Ae=Object(fe.combineReducers)({authentication:ye,message:ke,blogs:Be,blog:Ie,post:Re,theme:Le}),Ge=[Oe.a],_e=Object(fe.createStore)(Ae,Object(ge.composeWithDevTools)(fe.applyMiddleware.apply(void 0,Ge)));c.a.render(Object(R.jsx)(s.a,{store:_e,children:Object(R.jsx)(pe,{})}),document.getElementById("root")),he()}},[[87,1,2]]]);
//# sourceMappingURL=main.65dcd1a3.chunk.js.map