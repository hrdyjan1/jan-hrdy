(this["webpackJsonpbasic-app"]=this["webpackJsonpbasic-app"]||[]).push([[0],{39:function(e,t,n){e.exports=n(56)},44:function(e,t,n){},45:function(e,t,n){},56:function(e,t,n){"use strict";n.r(t);var a=n(1),l=n.n(a),c=n(28),r=n.n(c),o=(n(44),n(29)),i=n(15),u=(n(45),n(5)),m=n(38),h=n(37),s=n(58),E=n(30),p=n.n(E),d=n(17),w=n(14);function f(){var e=Object(o.a)(["\n    query {\n        getMinds{\n            id\n        }\n    }\n"]);return f=function(){return e},e}var v=p()(f()),b=Object(m.a)({uri:"/graphql"}),g=new i.c({link:b,cache:new h.a}),M=function(){return l.a.createElement("p",null,"home")},W=function(){return l.a.createElement("div",null,l.a.createElement(s.a,{query:v},(function(e){e.loading,e.error;var t=e.data;return console.log("data",t),l.a.createElement("p",null,"You lou")})),l.a.createElement("p",null,"WillMatch"))},k=function(){return l.a.createElement("p",null,"NoMatch")};var y=function(){return l.a.createElement(u.a,{client:g},l.a.createElement(d.a,null,l.a.createElement("div",null,l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement(d.b,{to:"/"},"Home")),l.a.createElement("li",null,l.a.createElement(d.b,{to:"/will-match"},"Will Match")),l.a.createElement("li",null,l.a.createElement(d.b,{to:"/will-not-match"},"Will Not Match")),l.a.createElement("li",null,l.a.createElement(d.b,{to:"/also/will/not/match"},"Also Will Not Match"))),l.a.createElement(w.c,null,l.a.createElement(w.a,{path:"/",exact:!0,component:M}),l.a.createElement(w.a,{path:"/will-match",component:W}),l.a.createElement(w.a,{component:k})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(l.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[39,1,2]]]);
//# sourceMappingURL=main.4cb936b2.chunk.js.map