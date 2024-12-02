import{c as D,h as Ae,R as Ye,Q as ae,a as he,u as Ze,b as et,d as tt}from"./uid.5d029387.js";import{i as be,l as p,m as ge,p as me,c as v,h as w,n as nt,g as O,t as Ie,r as T,q as U,o as J,s as ot,u as ke,v as at,x as lt,y as rt,w as I,z as ye,A as Me,B as Pe,C as ve,D as it,E as ut,G as ne,a as st,_ as ct,H as dt,I as ft,J as j,K,L as oe,f as X,M as vt,N as ce}from"./index.39a34321.js";import{u as de,a as $e,g as ht,b as bt,c as gt,d as fe}from"./scroll.04ac4bb5.js";import{r as mt}from"./rtl.b51694b1.js";var yt=D({name:"QPageContainer",setup(e,{slots:R}){const{proxy:{$q:r}}=O(),o=be(ge,p);if(o===p)return console.error("QPageContainer needs to be child of QLayout"),p;me(nt,!0);const t=v(()=>{const c={};return o.header.space===!0&&(c.paddingTop=`${o.header.size}px`),o.right.space===!0&&(c[`padding${r.lang.rtl===!0?"Left":"Right"}`]=`${o.right.size}px`),o.footer.space===!0&&(c.paddingBottom=`${o.footer.size}px`),o.left.space===!0&&(c[`padding${r.lang.rtl===!0?"Right":"Left"}`]=`${o.left.size}px`),c});return()=>w("div",{class:"q-page-container",style:t.value},Ae(R.default))}});let wt=0;const Tt=["click","keydown"],Ct={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${wt++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function _t(e,R,r,o){const t=be(Ie,p);if(t===p)return console.error("QTab/QRouteTab component needs to be child of QTabs"),p;const{proxy:c}=O(),g=T(null),x=T(null),h=T(null),f=v(()=>e.disable===!0||e.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},e.ripple===!0?{}:e.ripple)),q=v(()=>t.currentModel.value===e.name),P=v(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(q.value===!0?" q-tab--active"+(t.tabProps.value.activeClass?" "+t.tabProps.value.activeClass:"")+(t.tabProps.value.activeColor?` text-${t.tabProps.value.activeColor}`:"")+(t.tabProps.value.activeBgColor?` bg-${t.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(e.icon&&e.label&&t.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(e.noCaps===!0||t.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(e.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")+(o!==void 0?o.linkClass.value:"")),$=v(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(t.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(e.contentClass!==void 0?` ${e.contentClass}`:"")),y=v(()=>e.disable===!0||t.hasFocus.value===!0||q.value===!1&&t.hasActiveTab.value===!0?-1:e.tabindex||0);function k(u,i){if(i!==!0&&g.value!==null&&g.value.focus(),e.disable===!0){o!==void 0&&o.hasRouterLink.value===!0&&ke(u);return}if(o===void 0){t.updateModel({name:e.name}),r("click",u);return}if(o.hasRouterLink.value===!0){const a=(d={})=>{let S;const A=d.to===void 0||rt(d.to,e.to)===!0?t.avoidRouteWatcher=Ze():null;return o.navigateToRouterLink(u,{...d,returnRouterError:!0}).catch(F=>{S=F}).then(F=>{if(A===t.avoidRouteWatcher&&(t.avoidRouteWatcher=!1,S===void 0&&(F===void 0||F.message.startsWith("Avoided redundant navigation")===!0)&&t.updateModel({name:e.name})),d.returnRouterError===!0)return S!==void 0?Promise.reject(S):F})};r("click",u,a),u.defaultPrevented!==!0&&a();return}r("click",u)}function L(u){at(u,[13,32])?k(u,!0):lt(u)!==!0&&u.keyCode>=35&&u.keyCode<=40&&u.altKey!==!0&&u.metaKey!==!0&&t.onKbdNavigate(u.keyCode,c.$el)===!0&&ke(u),r("keydown",u)}function B(){const u=t.tabProps.value.narrowIndicator,i=[],a=w("div",{ref:h,class:["q-tab__indicator",t.tabProps.value.indicatorClass]});e.icon!==void 0&&i.push(w(ae,{class:"q-tab__icon",name:e.icon})),e.label!==void 0&&i.push(w("div",{class:"q-tab__label"},e.label)),e.alert!==!1&&i.push(e.alertIcon!==void 0?w(ae,{class:"q-tab__alert-icon",color:e.alert!==!0?e.alert:void 0,name:e.alertIcon}):w("div",{class:"q-tab__alert"+(e.alert!==!0?` text-${e.alert}`:"")})),u===!0&&i.push(a);const d=[w("div",{class:"q-focus-helper",tabindex:-1,ref:g}),w("div",{class:$.value},he(R.default,i))];return u===!1&&d.push(a),d}const M={name:v(()=>e.name),rootRef:x,tabIndicatorRef:h,routeData:o};U(()=>{t.unregisterTab(M)}),J(()=>{t.registerTab(M)});function E(u,i){const a={ref:x,class:P.value,tabindex:y.value,role:"tab","aria-selected":q.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:k,onKeydown:L,...i};return ot(w(u,a,B()),[[Ye,f.value]])}return{renderTab:E,$tabs:t}}var G=D({name:"QRouteTab",props:{...et,...Ct},emits:Tt,setup(e,{slots:R,emit:r}){const o=tt({useDisableForRouterLinkProps:!1}),{renderTab:t,$tabs:c}=_t(e,R,r,{exact:v(()=>e.exact),...o});return I(()=>`${e.name} | ${e.exact} | ${(o.resolvedLink.value||{}).href}`,()=>{c.verifyRouteModel()}),()=>t(o.linkTag.value,o.linkAttrs.value)}});function Rt(){const e=T(!ye.value);return e.value===!1&&J(()=>{e.value=!0}),e}const Ee=typeof ResizeObserver!="undefined",ze=Ee===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var le=D({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:R}){let r=null,o,t={width:-1,height:-1};function c(h){h===!0||e.debounce===0||e.debounce==="0"?g():r===null&&(r=setTimeout(g,e.debounce))}function g(){if(r!==null&&(clearTimeout(r),r=null),o){const{offsetWidth:h,offsetHeight:f}=o;(h!==t.width||f!==t.height)&&(t={width:h,height:f},R("resize",t))}}const{proxy:x}=O();if(Ee===!0){let h;const f=q=>{o=x.$el.parentNode,o?(h=new ResizeObserver(c),h.observe(o),g()):q!==!0&&Pe(()=>{f(!0)})};return J(()=>{f()}),U(()=>{r!==null&&clearTimeout(r),h!==void 0&&(h.disconnect!==void 0?h.disconnect():o&&h.unobserve(o))}),Me}else{let q=function(){r!==null&&(clearTimeout(r),r=null),f!==void 0&&(f.removeEventListener!==void 0&&f.removeEventListener("resize",c,ve.passive),f=void 0)},P=function(){q(),o&&o.contentDocument&&(f=o.contentDocument.defaultView,f.addEventListener("resize",c,ve.passive),g())};const h=Rt();let f;return J(()=>{Pe(()=>{o=x.$el,o&&P()})}),U(q),x.trigger=c,()=>{if(h.value===!0)return w("object",{style:ze.style,tabindex:-1,type:"text/html",data:ze.url,"aria-hidden":"true",onLoad:P})}}}});function qt(e,R,r){const o=r===!0?["left","right"]:["top","bottom"];return`absolute-${R===!0?o[0]:o[1]}${e?` text-${e}`:""}`}const Lt=["left","center","right","justify"];var St=D({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:e=>Lt.includes(e)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(e,{slots:R,emit:r}){const{proxy:o}=O(),{$q:t}=o,{registerTick:c}=de(),{registerTick:g}=de(),{registerTick:x}=de(),{registerTimeout:h,removeTimeout:f}=$e(),{registerTimeout:q,removeTimeout:P}=$e(),$=T(null),y=T(null),k=T(e.modelValue),L=T(!1),B=T(!0),M=T(!1),E=T(!1),u=[],i=T(0),a=T(!1);let d=null,S=null,A;const F=v(()=>({activeClass:e.activeClass,activeColor:e.activeColor,activeBgColor:e.activeBgColor,indicatorClass:qt(e.indicatorColor,e.switchIndicator,e.vertical),narrowIndicator:e.narrowIndicator,inlineLabel:e.inlineLabel,noCaps:e.noCaps})),Fe=v(()=>{const n=i.value,l=k.value;for(let s=0;s<n;s++)if(u[s].name.value===l)return!0;return!1}),Qe=v(()=>`q-tabs__content--align-${L.value===!0?"left":E.value===!0?"justify":e.align}`),pe=v(()=>`q-tabs row no-wrap items-center q-tabs--${L.value===!0?"":"not-"}scrollable q-tabs--${e.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${e.outsideArrows===!0?"outside":"inside"} q-tabs--mobile-with${e.mobileArrows===!0?"":"out"}-arrows`+(e.dense===!0?" q-tabs--dense":"")+(e.shrink===!0?" col-shrink":"")+(e.stretch===!0?" self-stretch":"")),He=v(()=>"q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position "+Qe.value+(e.contentClass!==void 0?` ${e.contentClass}`:"")),Y=v(()=>e.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),Z=v(()=>e.vertical!==!0&&t.lang.rtl===!0),re=v(()=>mt===!1&&Z.value===!0);I(Z,N),I(()=>e.modelValue,n=>{ie({name:n,setCurrent:!0,skipEmit:!0})}),I(()=>e.outsideArrows,ee);function ie({name:n,setCurrent:l,skipEmit:s}){k.value!==n&&(s!==!0&&e["onUpdate:modelValue"]!==void 0&&r("update:modelValue",n),(l===!0||e["onUpdate:modelValue"]===void 0)&&(Ve(k.value,n),k.value=n))}function ee(){c(()=>{we({width:$.value.offsetWidth,height:$.value.offsetHeight})})}function we(n){if(Y.value===void 0||y.value===null)return;const l=n[Y.value.container],s=Math.min(y.value[Y.value.scroll],Array.prototype.reduce.call(y.value.children,(_,m)=>_+(m[Y.value.content]||0),0)),C=l>0&&s>l;L.value=C,C===!0&&g(N),E.value=l<parseInt(e.breakpoint,10)}function Ve(n,l){const s=n!=null&&n!==""?u.find(_=>_.name.value===n):null,C=l!=null&&l!==""?u.find(_=>_.name.value===l):null;if(s&&C){const _=s.tabIndicatorRef.value,m=C.tabIndicatorRef.value;d!==null&&(clearTimeout(d),d=null),_.style.transition="none",_.style.transform="none",m.style.transition="none",m.style.transform="none";const b=_.getBoundingClientRect(),z=m.getBoundingClientRect();m.style.transform=e.vertical===!0?`translate3d(0,${b.top-z.top}px,0) scale3d(1,${z.height?b.height/z.height:1},1)`:`translate3d(${b.left-z.left}px,0,0) scale3d(${z.width?b.width/z.width:1},1,1)`,x(()=>{d=setTimeout(()=>{d=null,m.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",m.style.transform="none"},70)})}C&&L.value===!0&&W(C.rootRef.value)}function W(n){const{left:l,width:s,top:C,height:_}=y.value.getBoundingClientRect(),m=n.getBoundingClientRect();let b=e.vertical===!0?m.top-C:m.left-l;if(b<0){y.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(b),N();return}b+=e.vertical===!0?m.height-_:m.width-s,b>0&&(y.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(b),N())}function N(){const n=y.value;if(n===null)return;const l=n.getBoundingClientRect(),s=e.vertical===!0?n.scrollTop:Math.abs(n.scrollLeft);Z.value===!0?(B.value=Math.ceil(s+l.width)<n.scrollWidth-1,M.value=s>0):(B.value=s>0,M.value=e.vertical===!0?Math.ceil(s+l.height)<n.scrollHeight:Math.ceil(s+l.width)<n.scrollWidth)}function Te(n){S!==null&&clearInterval(S),S=setInterval(()=>{We(n)===!0&&H()},5)}function Ce(){Te(re.value===!0?Number.MAX_SAFE_INTEGER:0)}function _e(){Te(re.value===!0?0:Number.MAX_SAFE_INTEGER)}function H(){S!==null&&(clearInterval(S),S=null)}function De(n,l){const s=Array.prototype.filter.call(y.value.children,z=>z===l||z.matches&&z.matches(".q-tab.q-focusable")===!0),C=s.length;if(C===0)return;if(n===36)return W(s[0]),s[0].focus(),!0;if(n===35)return W(s[C-1]),s[C-1].focus(),!0;const _=n===(e.vertical===!0?38:37),m=n===(e.vertical===!0?40:39),b=_===!0?-1:m===!0?1:void 0;if(b!==void 0){const z=Z.value===!0?-1:1,Q=s.indexOf(l)+b*z;return Q>=0&&Q<C&&(W(s[Q]),s[Q].focus({preventScroll:!0})),!0}}const Oe=v(()=>re.value===!0?{get:n=>Math.abs(n.scrollLeft),set:(n,l)=>{n.scrollLeft=-l}}:e.vertical===!0?{get:n=>n.scrollTop,set:(n,l)=>{n.scrollTop=l}}:{get:n=>n.scrollLeft,set:(n,l)=>{n.scrollLeft=l}});function We(n){const l=y.value,{get:s,set:C}=Oe.value;let _=!1,m=s(l);const b=n<m?-1:1;return m+=b*5,m<0?(_=!0,m=0):(b===-1&&m<=n||b===1&&m>=n)&&(_=!0,m=n),C(l,m),N(),_}function Re(n,l){for(const s in n)if(n[s]!==l[s])return!1;return!0}function Ne(){let n=null,l={matchedLen:0,queryDiff:9999,hrefLen:0};const s=u.filter(b=>b.routeData!==void 0&&b.routeData.hasRouterLink.value===!0),{hash:C,query:_}=o.$route,m=Object.keys(_).length;for(const b of s){const z=b.routeData.exact.value===!0;if(b.routeData[z===!0?"linkIsExactActive":"linkIsActive"].value!==!0)continue;const{hash:Q,query:ue,matched:Xe,href:Je}=b.routeData.resolvedLink.value,se=Object.keys(ue).length;if(z===!0){if(Q!==C||se!==m||Re(_,ue)===!1)continue;n=b.name.value;break}if(Q!==""&&Q!==C||se!==0&&Re(ue,_)===!1)continue;const V={matchedLen:Xe.length,queryDiff:m-se,hrefLen:Je.length-Q.length};if(V.matchedLen>l.matchedLen){n=b.name.value,l=V;continue}else if(V.matchedLen!==l.matchedLen)continue;if(V.queryDiff<l.queryDiff)n=b.name.value,l=V;else if(V.queryDiff!==l.queryDiff)continue;V.hrefLen>l.hrefLen&&(n=b.name.value,l=V)}n===null&&u.some(b=>b.routeData===void 0&&b.name.value===k.value)===!0||ie({name:n,setCurrent:!0})}function je(n){if(f(),a.value!==!0&&$.value!==null&&n.target&&typeof n.target.closest=="function"){const l=n.target.closest(".q-tab");l&&$.value.contains(l)===!0&&(a.value=!0,L.value===!0&&W(l))}}function Ke(){h(()=>{a.value=!1},30)}function te(){Le.avoidRouteWatcher===!1?q(Ne):P()}function qe(){if(A===void 0){const n=I(()=>o.$route.fullPath,te);A=()=>{n(),A=void 0}}}function Ge(n){u.push(n),i.value++,ee(),n.routeData===void 0||o.$route===void 0?q(()=>{if(L.value===!0){const l=k.value,s=l!=null&&l!==""?u.find(C=>C.name.value===l):null;s&&W(s.rootRef.value)}}):(qe(),n.routeData.hasRouterLink.value===!0&&te())}function Ue(n){u.splice(u.indexOf(n),1),i.value--,ee(),A!==void 0&&n.routeData!==void 0&&(u.every(l=>l.routeData===void 0)===!0&&A(),te())}const Le={currentModel:k,tabProps:F,hasFocus:a,hasActiveTab:Fe,registerTab:Ge,unregisterTab:Ue,verifyRouteModel:te,updateModel:ie,onKbdNavigate:De,avoidRouteWatcher:!1};me(Ie,Le);function Se(){d!==null&&clearTimeout(d),H(),A!==void 0&&A()}let xe;return U(Se),it(()=>{xe=A!==void 0,Se()}),ut(()=>{xe===!0&&qe(),ee()}),()=>w("div",{ref:$,class:pe.value,role:"tablist",onFocusin:je,onFocusout:Ke},[w(le,{onResize:we}),w("div",{ref:y,class:He.value,onScroll:N},Ae(R.default)),w(ae,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+(B.value===!0?"":" q-tabs__arrow--faded"),name:e.leftIcon||t.iconSet.tabs[e.vertical===!0?"up":"left"],onMousedownPassive:Ce,onTouchstartPassive:Ce,onMouseupPassive:H,onMouseleavePassive:H,onTouchendPassive:H}),w(ae,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+(M.value===!0?"":" q-tabs__arrow--faded"),name:e.rightIcon||t.iconSet.tabs[e.vertical===!0?"down":"right"],onMousedownPassive:_e,onTouchstartPassive:_e,onMouseupPassive:H,onMouseleavePassive:H,onTouchendPassive:H})])}}),xt=D({name:"QFooter",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:R,emit:r}){const{proxy:{$q:o}}=O(),t=be(ge,p);if(t===p)return console.error("QFooter needs to be child of QLayout"),p;const c=T(parseInt(e.heightHint,10)),g=T(!0),x=T(ye.value===!0||t.isContainer.value===!0?0:window.innerHeight),h=v(()=>e.reveal===!0||t.view.value.indexOf("F")>-1||o.platform.is.ios&&t.isContainer.value===!0),f=v(()=>t.isContainer.value===!0?t.containerHeight.value:x.value),q=v(()=>{if(e.modelValue!==!0)return 0;if(h.value===!0)return g.value===!0?c.value:0;const a=t.scroll.value.position+f.value+c.value-t.height.value;return a>0?a:0}),P=v(()=>e.modelValue!==!0||h.value===!0&&g.value!==!0),$=v(()=>e.modelValue===!0&&P.value===!0&&e.reveal===!0),y=v(()=>"q-footer q-layout__section--marginal "+(h.value===!0?"fixed":"absolute")+"-bottom"+(e.bordered===!0?" q-footer--bordered":"")+(P.value===!0?" q-footer--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus"+(h.value!==!0?" hidden":""):"")),k=v(()=>{const a=t.rows.value.bottom,d={};return a[0]==="l"&&t.left.space===!0&&(d[o.lang.rtl===!0?"right":"left"]=`${t.left.size}px`),a[2]==="r"&&t.right.space===!0&&(d[o.lang.rtl===!0?"left":"right"]=`${t.right.size}px`),d});function L(a,d){t.update("footer",a,d)}function B(a,d){a.value!==d&&(a.value=d)}function M({height:a}){B(c,a),L("size",a)}function E(){if(e.reveal!==!0)return;const{direction:a,position:d,inflectionPoint:S}=t.scroll.value;B(g,a==="up"||d-S<100||t.height.value-f.value-d-c.value<300)}function u(a){$.value===!0&&B(g,!0),r("focusin",a)}I(()=>e.modelValue,a=>{L("space",a),B(g,!0),t.animate()}),I(q,a=>{L("offset",a)}),I(()=>e.reveal,a=>{a===!1&&B(g,e.modelValue)}),I(g,a=>{t.animate(),r("reveal",a)}),I([c,t.scroll,t.height],E),I(()=>o.screen.height,a=>{t.isContainer.value!==!0&&B(x,a)});const i={};return t.instances.footer=i,e.modelValue===!0&&L("size",c.value),L("space",e.modelValue),L("offset",q.value),U(()=>{t.instances.footer===i&&(t.instances.footer=void 0,L("size",0),L("offset",0),L("space",!1))}),()=>{const a=he(R.default,[w(le,{debounce:0,onResize:M})]);return e.elevated===!0&&a.push(w("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),w("footer",{class:y.value,style:k.value,onFocusin:u},a)}}});const{passive:Be}=ve,kt=["both","horizontal","vertical"];var Pt=D({name:"QScrollObserver",props:{axis:{type:String,validator:e=>kt.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:R}){const r={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let o=null,t,c;I(()=>e.scrollTarget,()=>{h(),x()});function g(){o!==null&&o();const P=Math.max(0,bt(t)),$=gt(t),y={top:P-r.position.top,left:$-r.position.left};if(e.axis==="vertical"&&y.top===0||e.axis==="horizontal"&&y.left===0)return;const k=Math.abs(y.top)>=Math.abs(y.left)?y.top<0?"up":"down":y.left<0?"left":"right";r.position={top:P,left:$},r.directionChanged=r.direction!==k,r.delta=y,r.directionChanged===!0&&(r.direction=k,r.inflectionPoint=r.position),R("scroll",{...r})}function x(){t=ht(c,e.scrollTarget),t.addEventListener("scroll",f,Be),f(!0)}function h(){t!==void 0&&(t.removeEventListener("scroll",f,Be),t=void 0)}function f(P){if(P===!0||e.debounce===0||e.debounce==="0")g();else if(o===null){const[$,y]=e.debounce?[setTimeout(g,e.debounce),clearTimeout]:[requestAnimationFrame(g),cancelAnimationFrame];o=()=>{y($),o=null}}}const{proxy:q}=O();return I(()=>q.$q.lang.rtl,g),J(()=>{c=q.$el.parentNode,x()}),U(()=>{o!==null&&o(),h()}),Object.assign(q,{trigger:f,getPosition:()=>r}),Me}}),$t=D({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:R,emit:r}){const{proxy:{$q:o}}=O(),t=T(null),c=T(o.screen.height),g=T(e.container===!0?0:o.screen.width),x=T({position:0,direction:"down",inflectionPoint:0}),h=T(0),f=T(ye.value===!0?0:fe()),q=v(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),P=v(()=>e.container===!1?{minHeight:o.screen.height+"px"}:null),$=v(()=>f.value!==0?{[o.lang.rtl===!0?"left":"right"]:`${f.value}px`}:null),y=v(()=>f.value!==0?{[o.lang.rtl===!0?"right":"left"]:0,[o.lang.rtl===!0?"left":"right"]:`-${f.value}px`,width:`calc(100% + ${f.value}px)`}:null);function k(i){if(e.container===!0||document.qScrollPrevented!==!0){const a={position:i.position.top,direction:i.direction,directionChanged:i.directionChanged,inflectionPoint:i.inflectionPoint.top,delta:i.delta.top};x.value=a,e.onScroll!==void 0&&r("scroll",a)}}function L(i){const{height:a,width:d}=i;let S=!1;c.value!==a&&(S=!0,c.value=a,e.onScrollHeight!==void 0&&r("scrollHeight",a),M()),g.value!==d&&(S=!0,g.value=d),S===!0&&e.onResize!==void 0&&r("resize",i)}function B({height:i}){h.value!==i&&(h.value=i,M())}function M(){if(e.container===!0){const i=c.value>h.value?fe():0;f.value!==i&&(f.value=i)}}let E=null;const u={instances:{},view:v(()=>e.view),isContainer:v(()=>e.container),rootRef:t,height:c,containerHeight:h,scrollbarWidth:f,totalWidth:v(()=>g.value+f.value),rows:v(()=>{const i=e.view.toLowerCase().split(" ");return{top:i[0].split(""),middle:i[1].split(""),bottom:i[2].split("")}}),header:ne({size:0,offset:0,space:!1}),right:ne({size:300,offset:0,space:!1}),footer:ne({size:0,offset:0,space:!1}),left:ne({size:300,offset:0,space:!1}),scroll:x,animate(){E!==null?clearTimeout(E):document.body.classList.add("q-body--layout-animate"),E=setTimeout(()=>{E=null,document.body.classList.remove("q-body--layout-animate")},155)},update(i,a,d){u[i][a]=d}};if(me(ge,u),fe()>0){let d=function(){i=null,a.classList.remove("hide-scrollbar")},S=function(){if(i===null){if(a.scrollHeight>o.screen.height)return;a.classList.add("hide-scrollbar")}else clearTimeout(i);i=setTimeout(d,300)},A=function(F){i!==null&&F==="remove"&&(clearTimeout(i),d()),window[`${F}EventListener`]("resize",S)},i=null;const a=document.body;I(()=>e.container!==!0?"add":"remove",A),e.container!==!0&&A("add"),st(()=>{A("remove")})}return()=>{const i=he(R.default,[w(Pt,{onScroll:k}),w(le,{onResize:L})]),a=w("div",{class:q.value,style:P.value,ref:e.container===!0?void 0:t,tabindex:-1},i);return e.container===!0?w("div",{class:"q-layout-container overflow-hidden",ref:t},[w(le,{onResize:B}),w("div",{class:"absolute-full",style:$.value},[w("div",{class:"scroll",style:y.value},[a])])]):a}}});const zt={name:"MainLayout",data(){return{showFilters:!1,showTabs:!0}},computed:{...dt({role:"getCurrentRole"}),isAdmin(){return this.role=="Admin"},isGuest(){return this.role==null}},beforeRouteEnter(e,R,r){const o=e.name!=="start-menu";r(t=>{t.showTabs=o})},beforeRouteUpdate(e,R,r){this.showTabs=e.name!=="start-menu",r()}},Bt={class:"bg-white text-black"};function At(e,R,r,o,t,c){const g=ft("router-view");return j(),K($t,{view:"lHh Lpr lFf"},{default:oe(()=>[X(yt,null,{default:oe(()=>[X(g)]),_:1}),t.showTabs?(j(),K(xt,{key:0},{default:oe(()=>[vt("div",Bt,[X(St,{class:"m-auto"},{default:oe(()=>[c.isAdmin?(j(),K(G,{key:0,to:{name:"admin-menu"},icon:"admin_panel_settings",label:"\u0410\u0434\u043C\u0456\u043D"})):ce("",!0),c.isGuest?(j(),K(G,{key:1,to:{name:"start-menu"},icon:"account_circle",label:"\u0410\u043A\u0430\u0443\u043D\u0442"})):(j(),K(G,{key:2,to:{name:"profile-page"},icon:"account_circle",label:"\u0410\u043A\u0430\u0443\u043D\u0442"})),X(G,{to:{name:"events-list"},icon:"list",label:"\u0421\u043F\u0438\u0441\u043E\u043A"}),X(G,{to:{name:"map"},icon:"map",label:"\u041C\u0430\u043F\u0430"}),c.isGuest?ce("",!0):(j(),K(G,{key:3,to:{name:"create-event"},icon:"create",label:"\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438"}))]),_:1})])]),_:1})):ce("",!0)]),_:1})}var Qt=ct(zt,[["render",At]]);export{Qt as default};
