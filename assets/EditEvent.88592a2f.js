import{Q as x,e as v,d as h}from"./QBtn.65d16f8d.js";import{Q as S}from"./QFile.d269fcc9.js";import{T as b}from"./TypeSelector.23f2ff35.js";import{L as m}from"./leaflet-src.ffd70e66.js";import{g as V}from"./convertDate.2fe32ce1.js";import{D}from"./volleyball.ef602882.js";import{_ as I,I as E,J as w,V as g,f as r,M as l,s as d,a7 as u,Y as k,al as N,am as U}from"./index.39a34321.js";import"./uid.5d029387.js";import"./QChip.8b3d3643.js";import"./format.3e32b8d9.js";import"./EventIcon.8848892e.js";import"./QMenu.12e0eebd.js";import"./scroll.04ac4bb5.js";const C={components:{TypeSelector:b,DateTimeInput:D},props:{id:{type:Number,required:!0}},data(){return{event:{},autoResizeTextArea:"auto",showEditEventStepOne:!0,showEditEventStepTwo:!1,files:[]}},computed:{type(){return this.$store.getters.getLeafTypes.find(e=>e.id==this.event.typeId)},isTypeHistoric(){return this.type==null?!1:this.type.maxDuration==null},isNextDisabled(){const e=this.validateTime;return!(this.event.name&&this.event.name.length<=50&&/^[?!@()№,.;:a-zA-Zа-яА-ЯґҐіІїЇєЄ0-9\s]*$/u.test(this.event.name)&&this.event.typeId&&e===!0&&this.event.coordinates)},validateTime(){var a,n;if(this.isTypeHistoric==!0)return!0;if(!this.event.endTime||!this.event.startTime)return"\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u0447\u0430\u0441";let e=(n=(a=this.type)==null?void 0:a.maxDuration)!=null?n:10,s=Math.abs(new Date(this.event.endTime)-new Date(this.event.startTime))/36e5;return s>e?"\u0422\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C \u043F\u043E\u0434\u0456\u0457 \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0430 \u0434\u043B\u044F \u043E\u0431\u0440\u0430\u043D\u043E\u0433\u043E \u0442\u0438\u043F\u0443.":s*60<15?"\u0422\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C \u043F\u043E\u0434\u0456\u0457 \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u043A\u043E\u0440\u043E\u0442\u043A\u0430.":!0}},async mounted(){await this.getEvent(),this.event=JSON.parse(JSON.stringify(this.$store.getters.getEvent)),this.showMap()},methods:{backPage(){this.showEditEventStepOne==!0?this.$router.go(-1):this.showEditEventStepTwo==!0&&(this.showEditEventStepTwo=!1,this.showEditEventStepOne=!0)},nextPage(){this.isNextDisabled||(this.showEditEventStepOne=!1,this.showEditEventStepTwo=!0)},convertFileToDataUrl(e){return e?new Promise((s,a)=>{const n=new FileReader;n.onload=t=>s(t.target.result),n.onerror=t=>a(t),n.readAsDataURL(e)}):""},async updateEvent(){this.event.dataUrl=await this.convertFileToDataUrl(this.files[0]),this.isTypeHistoric==!0&&(this.event.startTime=null,this.event.endTime=null),this.$store.dispatch("PUT_EVENT",{formData:this.event,id:this.event.id,handler:e=>{this.$store.dispatch("GET_EVENTS"),this.$router.push({name:"events-list",params:{}})},handlerError:e=>{console.log("error: "+e),alert("Error occurred: "+e)}})},async getEvent(){await Promise.all([this.event!={}?this.$store.dispatch("GET_EVENT",{id:this.id}):void 0])},showMap(){if(this.event!=null){const a=this.event.coordinates.split(", ").map(parseFloat).map(t=>t.toFixed(2)),n=m.map("map3").setView(a,13);m.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(n);var e=m.marker(this.event.coordinates.split(", ").map(parseFloat)).addTo(n);n.on("click",t=>{const o=t.latlng;e&&n.removeLayer(e),e=m.marker(o).addTo(n),this.event.coordinates=`${o.lat}, ${o.lng}`})}}},watch:{"event.startTime"(e){if(this.event.endTime!=null&&e>this.event.endTime){let s=V(e);this.event.endTime=s}},"event.endTime"(e){e!=null&&e<=this.event.startTime&&(this.event.endTime=this.event.startTime)}}},p=e=>(N("data-v-4bf471f7"),e=e(),U(),e),O={key:0},P={key:1},z={class:"TopLine"},F=p(()=>l("div",{style:{"font-size":"16px","font-weight":"500"}}," Editing your event details ",-1)),H={class:"inputStyle"},L={class:"text-red-700 text-sm"},Q=p(()=>l("div",{id:"map3",class:"map"},null,-1)),A={style:{display:"flex","flex-direction":"column","align-items":"center"}},M=p(()=>l("div",{style:{"font-size":"16px","font-weight":"500",margin:"10px"}}," Picture(s) of your event ",-1)),B=p(()=>l("div",{style:{"font-size":"16px","font-weight":"500",margin:"10px"}}," Description of your event ",-1));function q(e,s,a,n,t,o){var f,T,y;const _=E("TypeSelector"),c=E("DateTimeInput");return t.event=={}?(w(),g("div",O,[r(x,{color:"primary",size:"3em",class:"mx-auto"})])):(w(),g("div",P,[l("div",null,[l("div",z,[r(v,{flat:"",style:"",onClick:o.backPage,icon:"arrow_back",color:"primary"},null,8,["onClick"]),F,d(l("div",null,[r(v,{disable:o.isNextDisabled,flat:"",style:"",onClick:o.nextPage,label:"Next",color:"primary"},null,8,["disable","onClick"])],512),[[u,t.showEditEventStepOne]]),d(l("div",null,[r(v,{flat:"",style:"",onClick:o.updateEvent,label:"Update event",color:"primary"},null,8,["onClick"])],512),[[u,t.showEditEventStepTwo]])]),d(l("div",null,[l("div",H,[r(h,{square:"",outlined:"",modelValue:t.event.name,"onUpdate:modelValue":s[0]||(s[0]=i=>t.event.name=i),label:"Name",clearable:"",rules:[i=>!!i||"\u041D\u0435\u043E\u0431\u0445\u0456\u0434\u043D\u043E \u0437\u0430\u043F\u043E\u0432\u043D\u0438\u0442\u0438",i=>i&&i.length<=50||"\u041D\u0435 \u0431\u0456\u043B\u044C\u0448\u0435 50 \u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432",i=>i&&/^[?!@()№,.;:a-zA-Zа-яА-ЯґҐіІїЇєЄ0-9\s]*$/u.test(i)||"\u041C\u043E\u0436\u043B\u0438\u0432\u0456 \u043B\u0438\u0448\u0435 \u043B\u0456\u0442\u0435\u0440\u0438, \u0446\u0438\u0444\u0440\u0438 \u0442\u0430 \u0441\u0438\u043C\u0432\u043E\u043B\u0438"]},null,8,["modelValue","rules"]),r(_,{value:this.event.typeId,onInput:s[1]||(s[1]=i=>this.event.typeId=i)},null,8,["value"]),l("div",L,k(o.validateTime==!0?"":o.validateTime),1),d(r(c,{class:"mb-3",label:"starting time",value:(f=t.event.startTime)!=null?f:null,min:o.isTypeHistoric?"":new Date().toISOString(),onInput:s[2]||(s[2]=i=>t.event.startTime=i)},null,8,["value","min"]),[[u,o.isTypeHistoric==!1]]),d(r(c,{class:"mb-6",label:"ending time",value:(T=t.event.endTime)!=null?T:null,min:(y=t.event.startTime)!=null?y:null,onInput:s[3]||(s[3]=i=>t.event.endTime=i)},null,8,["value","min"]),[[u,o.isTypeHistoric==!1]]),r(h,{square:"",outlined:"",modelValue:t.event.coordinates,"onUpdate:modelValue":s[4]||(s[4]=i=>t.event.coordinates=i),label:"Address",clearable:"",rules:[i=>!!i||"\u041D\u0435\u043E\u0431\u0445\u0456\u0434\u043D\u043E \u0437\u0430\u043F\u043E\u0432\u043D\u0438\u0442\u0438"],readonly:""},null,8,["modelValue","rules"])]),Q],512),[[u,t.showEditEventStepOne]])]),d(l("div",null,[l("div",A,[M,r(S,{modelValue:t.files,"onUpdate:modelValue":s[5]||(s[5]=i=>t.files=i),label:"Change picture",outlined:"",multiple:"",style:{"max-width":"300px"}},null,8,["modelValue"]),B,r(h,{modelValue:t.event.description,"onUpdate:modelValue":s[6]||(s[6]=i=>t.event.description=i),outlined:"",autogrow:"",style:{width:"95%"}},null,8,["modelValue"])])],512),[[u,t.showEditEventStepTwo]])]))}var se=I(C,[["render",q],["__scopeId","data-v-4bf471f7"]]);export{se as default};
