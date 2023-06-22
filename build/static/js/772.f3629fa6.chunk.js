"use strict";(self.webpackChunkdemo1=self.webpackChunkdemo1||[]).push([[772],{15357:function(e,n,t){t.d(n,{Z:function(){return h}});var s=t(43144),a=t(15671),r=t(74165),i=t(15861),c=t(74569),l=t.n(c),o=t(4245),d=l().create({baseURL:"http://localhost:3004/v1",headers:{Accept:"application/json","Content-Type":"application/json"},paramsSerializer:function(e){return o.stringify(e)}});d.interceptors.request.use(function(){var e=(0,i.Z)((0,r.Z)().mark((function e(n){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",n);case 1:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()),l().interceptors.response.use((function(e){return e&&e.data?e.data:e}),(function(e){throw e}));var m=d,u=localStorage.getItem("3rd-auth"),h=new((0,s.Z)((function e(){(0,a.Z)(this,e),this.postTrend=function(e){return m.post("/trends",e,{headers:{Authorization:"Bearer ".concat(u)}})},this.refreshComment=function(e){return m.get("/tiktok/refresh_comment/".concat(e))}})))},11772:function(e,n,t){t.r(n);var s=t(74165),a=t(15861),r=t(11838),i=t(10193),c=(t(72791),t(16871)),l=t(5239),o=t(16229),d=t(97892),m=t.n(d),u=t(72930),h=t(15357),x=t(80184);var f=function(e){var n,t=e.item,r=(0,c.s0)(),o=(0,l.D3)(),d=o.firstLoad,f=o.noti,p=o.resultLoad,b=o.onCloseNoti,j=function(){var e=(0,a.Z)((0,s.Z)().mark((function e(){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d(),e.prev=1,e.next=4,h.Z.refreshComment(t._id);case 4:e.sent&&p("Refresh comment success !"),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),p("Refresh comment fail !");case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(){return e.apply(this,arguments)}}();return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("tr",{children:[(0,x.jsx)("td",{children:(0,x.jsxs)("div",{className:"d-flex align-items-center",children:[(0,x.jsx)("div",{className:"symbol symbol-45px me-5",children:(0,x.jsx)("img",{src:(0,u.BY)(t.organization_image),alt:""})}),(0,x.jsx)("div",{className:"d-flex justify-content-start flex-column",children:(0,x.jsx)("span",{className:"text-dark fw-bold fs-6",children:t.title})})]})}),(0,x.jsx)("td",{children:(0,x.jsx)("span",{className:"text-dark fw-bold d-block fs-6",children:t.organization_name})}),(0,x.jsx)("td",{children:null===(n=t.services)||void 0===n?void 0:n.map((function(e){return(0,x.jsx)("p",{className:"text-dark d-block fs-6",children:e.service_name},e.id)}))}),(0,x.jsx)("td",{children:(0,x.jsx)("span",{className:"text-dark d-block fs-7",children:m()(t.createdAt).format("DD/MM/YYYY")})}),(0,x.jsx)("td",{children:(0,x.jsx)("span",{className:"text-dark d-block fs-7",children:m()(t.updatedAt).format("DD/MM/YYYY")})}),(0,x.jsx)("td",{children:(0,x.jsxs)("div",{className:"d-flex justify-content-end flex-shrink-0",children:[(0,x.jsx)("button",{onClick:function(){r("/pages/trend-form/".concat(t._id))},style:{marginRight:"6px"},className:"btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4",children:(0,x.jsx)("i",{className:"bi bi-pencil-fill fs-6"})}),(0,x.jsx)("button",{onClick:j,className:"btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4",children:(0,x.jsx)("i",{className:"bi bi-arrow-clockwise"})})]})})]},t._id),(0,x.jsx)(i.vv,{open:f.openAlert,onClose:b,title:f.message})]})};n.default=function(){var e,n,t,s=(0,c.s0)(),a=(0,c.TH)(),d=(0,l.RA)(),m=(0,l.ib)(!0,"".concat(o.NA.TRENDS,"?page=").concat(null!==(e=null===d||void 0===d?void 0:d.page)&&void 0!==e?e:1,"&include=services")),u=m.totalPage,h=m.response;return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(r.Z,{title:"Trends",element:(0,x.jsx)(i.Rb,{title:"T\u1ea1o m\u1edbi",color:"success",onClick:function(){return s("/pages/trend-form")}})}),(0,x.jsxs)("div",{className:"card mb-5 mb-xl-8",children:[(0,x.jsx)("div",{className:"card-header border-0 pt-5",children:(0,x.jsx)("h3",{className:"card-title align-items-start flex-column",children:(0,x.jsx)("span",{className:"card-label fw-bold fs-3 mb-1",children:"B\xe0i \u0111\u0103ng"})})}),(0,x.jsx)("div",{className:"card-body py-3",children:(0,x.jsx)("div",{className:"table-responsive",children:(0,x.jsxs)("table",{className:"table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4",children:[(0,x.jsx)("thead",{children:(0,x.jsxs)("tr",{className:"fw-bold text-muted",children:[(0,x.jsx)("th",{className:"min-w-100px",children:"B\xe0i \u0111\u0103ng"}),(0,x.jsx)("th",{className:"min-w-140px",children:"Doanh nghi\u1ec7p"}),(0,x.jsx)("th",{className:"min-w-140px",children:"D\u1ecbch v\u1ee5 \u0111\u01b0\u1ee3c g\xe1n"}),(0,x.jsx)("th",{className:"min-w-120px",children:"Ng\xe0y \u0111\u0103ng"}),(0,x.jsx)("th",{className:"min-w-120px",children:"Ng\xe0y s\u1eeda"}),(0,x.jsx)("th",{className:"min-w-100px",children:"Actions"})]})}),(0,x.jsx)("tbody",{children:null===h||void 0===h||null===(n=h.data)||void 0===n?void 0:n.map((function(e){return(0,x.jsx)(f,{item:e},e._id)}))})]})})})]}),(0,x.jsx)(i.Aw,{onChangePage:function(e){s({pathname:a.pathname,search:"page=".concat(e)})},totalPage:u,defaultPage:null!==(t=null===d||void 0===d?void 0:d.page)&&void 0!==t?t:1})]})}},11838:function(e,n,t){t.d(n,{Z:function(){return a}});t(72791);var s=t(80184);var a=function(e){var n=e.title,t=e.element;return(0,s.jsx)("div",{className:"toolbar",id:"kt_toolbar",children:(0,s.jsxs)("div",{id:"kt_toolbar_container",className:"container-fluid d-flex flex-stack",children:[(0,s.jsx)("h1",{className:"d-flex align-items-center text-dark fw-bolder my-1 fs-3",children:n}),t]})})}}}]);
//# sourceMappingURL=772.f3629fa6.chunk.js.map