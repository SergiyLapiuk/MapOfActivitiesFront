import{d as E}from"./QBtn.65d16f8d.js";import{_ as w,I as h,J as o,V as i,M as u,X as x,Y as I,f as p,N as y,a6 as N,F as g,W as K,s as b,a7 as S,K as O,a8 as C,H as V}from"./index.39a34321.js";import{Q as L}from"./uid.5d029387.js";import{E as B}from"./EventIcon.8848892e.js";const _={components:{EventIcon:B},name:"TypeOption",props:{type:{type:Object,default:void 0},toroot:{type:Number,default:1},parentShowKids:{type:Boolean,default:!1}},computed:{leftPadding(){return this.toroot*8+"px"}},data(){return{showKids:!1,localType:this.type}},methods:{input(e){this.$emit("input",e)},handleClick(){var e;((e=this.localType.children)==null?void 0:e.length)===0?(console.log(this.localType),this.input(this.localType.id)):(console.log(this.localType),this.showKids=!this.showKids)}},watch:{parentShowKids(e){e==!1&&(this.showKids=!1)}}},T=()=>{C(e=>({"49abcd34":e.leftPadding}))},v=_.setup;_.setup=v?(e,s)=>(T(),v(e,s)):T;const P=_,F={key:0,class:"h-3 w-3 ml-2 inline-block"},Q={key:1};function R(e,s,a,k,t,l){var d;const c=h("EventIcon"),n=h("TypeOption",!0);return o(),i("div",null,[u("div",{class:"typeOption hover:bg-slate-100 addPadding",onClick:s[0]||(s[0]=N((...r)=>l.handleClick&&l.handleClick(...r),["stop"]))},[x(I(t.localType.name)+" ",1),t.localType.imageURL?(o(),i("div",F,[p(c,{icon:t.localType.imageURL},null,8,["icon"])])):y("",!0),((d=t.localType.children)==null?void 0:d.length)!==0?(o(),i("span",Q,[p(L,{name:"expand_more"})])):y("",!0)]),(o(!0),i(g,null,K(t.localType.children,(r,f)=>b((o(),i("div",{key:f},[p(n,{type:r,toroot:a.toroot+1,onInput:s[1]||(s[1]=m=>l.input(m)),parentShowKids:t.showKids},null,8,["type","toroot","parentShowKids"]),f==t.localType.children.length-1?(o(),O(n,{key:0,type:{id:t.localType.id,name:"\u0406\u043D\u0448\u0435",children:[]},toroot:a.toroot+1,onInput:s[2]||(s[2]=m=>l.input(t.localType.id)),parentShowKids:t.showKids},null,8,["type","toroot","parentShowKids"])):y("",!0)])),[[S,t.showKids]])),128))])}var j=w(P,[["render",R],["__scopeId","data-v-7c93f482"]]);const D={components:{TypeOption:j},name:"TypeSelector",props:{value:{type:Number,default:void 0},tabindex:{type:Number,default:0}},computed:{...V({types:"getEventTypesTree",typesStatus:"getEventTypesStatus",leafTypes:"getLeafTypes"}),type(){return this.leafTypes.find(e=>e.id==this.value)}},data(){return{showKids:!1}},async mounted(){await this.getTypes()},methods:{async getTypes(){await Promise.all([this.types.length<1?this.$store.dispatch("GET_EVENT_TYPES_TREE"):void 0])},input(e){this.showKids=!1,this.$emit("input",e)},getLabel(){return this.typesStatus=="loading"?"\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...":this.typesStatus=="error"?"\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0438\u0442\u0438 \u0442\u0438\u043F\u0438":this.value>0&&this.type===void 0?"\u0406\u043D\u0448\u0435":this.type==null?"\u0412\u0438\u0431\u0456\u0440 \u0442\u0438\u043F\u0443":this.type.name}}},G={class:"relative w-full"},M={class:"absolute w-full top-0 left-0 w-100 border border-gray-400 bg-white z-50"};function U(e,s,a,k,t,l){const c=h("TypeOption");return o(),i("div",{onFocusin:s[1]||(s[1]=n=>t.showKids=!t.showKids),onFocusout:s[2]||(s[2]=n=>t.showKids=!1),tabindex:"0"},[u("div",null,[p(E,{tabindex:a.tabindex,class:"!pb-0",square:"",outlined:"",label:l.getLabel(),readonly:"",rules:[n=>!!n||"\u041D\u0435\u043E\u0431\u0445\u0456\u0434\u043D\u043E \u0437\u0430\u043F\u043E\u0432\u043D\u0438\u0442\u0438"]},null,8,["tabindex","label","rules"])]),b(u("div",G,[u("div",M,[(o(!0),i(g,null,K(e.types,(n,d)=>(o(),i("div",{key:d},[p(c,{type:n,onInput:s[0]||(s[0]=r=>l.input(r)),parentShowKids:this.showKids},null,8,["type","parentShowKids"])]))),128))])],512),[[S,t.showKids]])],32)}var J=w(D,[["render",U]]);export{J as T};