(this["webpackJsonpconvertcurrency-app"]=this["webpackJsonpconvertcurrency-app"]||[]).push([[0],{143:function(e,t,c){},148:function(e,t,c){"use strict";c.r(t);var a=c(2),n=c(0),r=c(9),s=c.n(r),l=(c(91),c(92),c(93),c(94),c(95),c(43)),i=c(11);function j(){return Object(a.jsx)("nav",{className:"navbar navbar-expand-lg navbar-light  indigo-c",children:Object(a.jsxs)("div",{className:"container-fluid",children:[Object(a.jsx)("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(a.jsx)("span",{className:"navbar-toggler-icon"})}),Object(a.jsx)("div",{className:"collapse navbar-collapse",id:"navbarNav",children:Object(a.jsxs)("ul",{className:"navbar-nav",children:[Object(a.jsx)("li",{className:"nav-item",children:Object(a.jsx)(l.b,{to:"/",className:"nav-link",activeClassName:"active",children:"\u0413\u043e\u043b\u043e\u0432\u043d\u0430"})}),Object(a.jsx)("li",{className:"nav-item",children:Object(a.jsx)(l.b,{className:"nav-link ","aria-current":"page",to:"/converter",children:"\u041a\u043e\u043d\u0432\u0435\u0440\u0442\u0435\u0440 \u0432\u0430\u043b\u044e\u0442"})})]})})]})})}var b=c(28),o=c(51),d=c.n(o),u={API_EXCHANGE:"https://api.exchangeratesapi.io/latest?base=",API_PRIVATBANK:"https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"};function O(e){var t=e.data,c=t.ccy,n=t.base_ccy,r=t.buy,s=t.sale;return Object(a.jsxs)("tr",{children:[Object(a.jsx)("th",{children:c}),Object(a.jsx)("td",{children:n}),Object(a.jsx)("td",{children:Number(r).toFixed(2)}),Object(a.jsx)("td",{children:Number(s).toFixed(2)})]})}function h(){var e=Object(n.useState)(null),t=Object(b.a)(e,2),c=t[0],r=t[1],s=Object(n.useState)(!1),l=Object(b.a)(s,2),i=l[0],j=l[1],o=Object(n.useState)([]),h=Object(b.a)(o,2),x=h[0],m=h[1];return Object(n.useEffect)((function(){fetch(u.API_PRIVATBANK).then((function(e){return e.json()})).then((function(e){j(!0),m(e)}),(function(e){j(!0),r(e)}))}),[]),c?Object(a.jsxs)("div",{children:["Error: ",c.message]}):i?Object(a.jsxs)("div",{className:"currency-list-container",children:[Object(a.jsx)("div",{className:"sub-title__base-ccy",children:Object(a.jsxs)("p",{children:["\u0411\u0430\u0437\u043e\u0432\u0430 \u0432\u0430\u043b\u044e\u0442\u0430: ",x[0]?x[0].base_ccy:"UAH"]})}),Object(a.jsxs)("table",{className:"table table-currency",children:[Object(a.jsx)("thead",{className:"thead-dark",children:Object(a.jsxs)("tr",{className:"table-header",children:[Object(a.jsx)("th",{scope:"col"}),Object(a.jsx)("th",{scope:"col"}),Object(a.jsx)("th",{scope:"col",children:"\u041a\u0443\u043f\u0456\u0432\u043b\u044f"}),Object(a.jsx)("th",{scope:"col",children:"\u041f\u0440\u043e\u0434\u0430\u0436"})]})}),Object(a.jsx)("tbody",{children:x.map((function(e){return Object(a.jsx)(O,{data:e},e.ccy)}))})]})]}):Object(a.jsx)("div",{className:"loader-container",children:Object(a.jsx)("div",{className:"loader-wrapper",children:Object(a.jsx)(d.a,{type:"Bars",color:"#8540f5",height:35,width:35})})})}function x(){return Object(a.jsxs)("div",{className:"container text-center",children:[Object(a.jsx)("div",{className:"title-page",children:Object(a.jsx)("h1",{children:"\u041a\u0443\u0440\u0441 \u0432\u0430\u043b\u044e\u0442"})}),Object(a.jsx)(h,{})]})}var m=c(58),v=c.n(m),p=c(70),f=c(52),N=c(24),g=c(71),y=c.n(g),C=c(59),k=c.n(C),S=c(189),T=c(190),E=c(179),A=c(191),w=c(187),I=c(193),P=c(188),_=c(194),B=c(184),F=c(75),U=c.n(F);c(143);function R(){var e=["USD","EUR","PLN","CZK","RUB"],t=Object(n.useState)({base:"USD",convertTo:"EUR",amount:"",result:"",date:""}),c=Object(b.a)(t,2),r=c[0],s=c[1],l=Object(n.useState)(!1),i=Object(b.a)(l,2),j=i[0],o=i[1],O=Object(n.useState)(!1),h=Object(b.a)(O,2),x=h[0],m=h[1],g=function(e){s((function(t){return Object(N.a)(Object(N.a)({},t),{},Object(f.a)({},e.target.name,e.target.value))}))},C=r.date,F=r.result,R=r.amount,D=r.convertTo,K=r.base;Object(n.useEffect)((function(){var e=!1;return function(){var t=Object(p.a)(v.a.mark((function t(){var c,a,n;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,r.amount!==isNaN){t.next=5;break}return t.abrupt("return",null);case 5:return t.next=7,y.a.get("".concat(u.API_EXCHANGE).concat(r.base));case 7:c=t.sent,a=c.data.date,n=(c.data.rates[r.convertTo]*r.amount).toFixed(4),e||s((function(e){return Object(N.a)(Object(N.a)({},e),{},{date:a,result:n})})),o(!0);case 12:t.next=18;break;case 14:t.prev=14,t.t0=t.catch(0),m(!0),console.log(t.t0.message);case 18:case"end":return t.stop()}}),t,null,[[0,14]])})));return function(){return t.apply(this,arguments)}}()(),function(){return e=!0}}),[K,D,R]);var H=Object(E.a)((function(e){return{formControl:{minWidth:200},selectEmpty:{marginTop:e.spacing(2)}}}))();return x?Object(a.jsxs)(S.a,{severity:"error",children:[Object(a.jsx)(T.a,{children:"Error"}),"\u0429\u043e\u0441\u044c \u043f\u0456\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a!"]}):j?Object(a.jsxs)("div",{className:"form-container",children:[Object(a.jsxs)("h4",{children:["\u041a\u0443\u0440\u0441 \u0432\u0437\u044f\u0442\u0438\u0439 \u0437\u0430 \u043f\u043e\u0442\u043e\u0447\u043d\u0443 \u0434\u0430\u0442\u0443: ",C]}),Object(a.jsxs)("p",{children:[""===R?0:R," ",Object(a.jsx)("b",{children:K})," \u0434\u043e\u0440\u0456\u0432\u043d\u044e\u0454 ",F," ",Object(a.jsx)("b",{children:D})," "]}),Object(a.jsx)("form",{className:"form-currency",children:Object(a.jsxs)("div",{className:"form-wrapper",children:[Object(a.jsxs)("div",{className:"form-block",children:[Object(a.jsx)("div",{className:"mb-3",children:Object(a.jsx)(A.a,{itemType:"number",label:k.a.code(K).currency,onChange:function(e){s((function(t){return Object(N.a)(Object(N.a)({},t),{},{amount:e.target.value,result:null,data:null})}))},onKeyPress:function(e){e.target.value=e.target.value.replace(/[^0-9.]/g,"")}})}),Object(a.jsx)("div",{className:"mb-3",children:Object(a.jsxs)(w.a,{className:H.formControl,children:[Object(a.jsx)(I.a,{id:"baseCurrencySelect",children:"\u0411\u0430\u0437\u043e\u0432\u0430 \u0432\u0430\u043b\u044e\u0442\u0430"}),Object(a.jsx)(P.a,{labelId:"baseCurrencySelect",id:"demo-simple-select",value:K,name:"base",onChange:g,children:e.filter((function(e){return e!==D})).map((function(e){return Object(a.jsx)(_.a,{value:e,children:e},e)}))})]})})]}),Object(a.jsx)("div",{className:"form-block",children:Object(a.jsx)("div",{className:"form-block__wrapper",children:Object(a.jsx)(B.a,{className:"btn btn-primary",onClick:function(e){e.preventDefault(),s((function(e){return Object(N.a)(Object(N.a)({},e),{},{convertTo:r.base,base:r.convertTo,result:null})}))},"aria-label":"Change",children:Object(a.jsx)(U.a,{})})})}),Object(a.jsxs)("div",{className:"form-block",children:[Object(a.jsx)("div",{className:"mb-3",children:Object(a.jsx)(A.a,{disabled:!0,label:k.a.code(D).currency,value:""===R?"":null===F?"Calculating...":F})}),Object(a.jsx)("div",{className:"mb-3",children:Object(a.jsxs)(w.a,{className:H.formControl,children:[Object(a.jsx)(I.a,{id:"convertCurrencySelect",children:"\u0412\u0430\u043b\u044e\u0442\u0430 \u0434\u043b\u044f \u043a\u043e\u043d\u0432\u0435\u0440\u0442\u0430\u0446\u0456\u0457"}),Object(a.jsx)(P.a,{labelId:"convertCurrencySelect",id:"demo-simple-select",value:D,name:"convertTo",onChange:g,children:e.filter((function(e){return e!==K})).map((function(e){return Object(a.jsx)(_.a,{value:e,children:e},e)}))})]})})]})]})})]}):Object(a.jsx)("div",{className:"loader-container",children:Object(a.jsx)("div",{className:"loader-wrapper",children:Object(a.jsx)(d.a,{type:"Bars",color:"#8540f5",height:35,width:35})})})}function D(){return Object(a.jsx)("div",{className:"container container-converter",children:Object(a.jsx)(R,{})})}var K=function(){return Object(a.jsxs)(l.a,{children:[Object(a.jsx)(j,{}),Object(a.jsxs)(i.c,{children:[Object(a.jsx)(i.a,{path:"/",exact:!0,component:x}),Object(a.jsx)(i.a,{path:"/converter",component:D})]})]})},H=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,195)).then((function(t){var c=t.getCLS,a=t.getFID,n=t.getFCP,r=t.getLCP,s=t.getTTFB;c(e),a(e),n(e),r(e),s(e)}))};s.a.render(Object(a.jsx)(K,{}),document.getElementById("root")),H()},91:function(e,t,c){},95:function(e,t,c){}},[[148,1,2]]]);
//# sourceMappingURL=main.94a3a45c.chunk.js.map