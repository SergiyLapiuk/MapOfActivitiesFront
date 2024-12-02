import{d,e as u}from"./QBtn.65d16f8d.js";import{Q as c}from"./QFile.d269fcc9.js";import{_ as m,H as h,J as p,V as f,M as o,f as s,N as g}from"./index.39a34321.js";import"./uid.5d029387.js";import"./QChip.8b3d3643.js";import"./format.3e32b8d9.js";const P={data(){return{profile:{},files:[],deletedPicture:!1}},async created(){this.$watch(()=>this.$store.getters.getStatus,async(r,i)=>{r==="active"&&r!==i&&(await this.getProfile(),this.profile=JSON.parse(JSON.stringify(this.$store.getters.getProfile)))}),this.$store.getters.getStatus==="active"&&(await this.getProfile(),this.profile=JSON.parse(JSON.stringify(this.$store.getters.getProfile)))},computed:{...h({CurrentUser:"getCurrentUser",profile:"getProfile"})},mounted(){},methods:{editProfile(){this.$router.push({name:"edit-profile"})},async getProfile(){console.log(this.$store.getters.getCurrentUser),this.$store.getters.getCurrentUser&&await Promise.all([this.profile!={}?this.$store.dispatch("GET_PROFILE",{id:this.$store.getters.getCurrentUser}):void 0])},deletePicture(){this.deletedPicture=!0},convertFileToDataUrl(r){return r?new Promise((i,n)=>{const l=new FileReader;l.onload=t=>i(t.target.result),l.onerror=t=>n(t),l.readAsDataURL(r)}):this.deletedPicture?"The picture has been deleted":""},async updateProfile(){this.profile.imageURL=await this.convertFileToDataUrl(this.files[0]),this.$store.dispatch("PUT_PROFILE",{formData:this.profile,id:this.$store.getters.getCurrentUser,handler:r=>{this.$router.push({name:"profile-page",params:{}})},handlerError:r=>{console.log("error: "+r),alert("Error occurred: "+r)}})}}},_=o("div",{class:"TopLineEditProfile"},[o("div",{style:{"font-size":"16px","font-weight":"550"}},"\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u043D\u043D\u044F \u043F\u0440\u043E\u0444\u0456\u043B\u044E")],-1),y={class:"inputStyleProfile"},x={style:{display:"flex","flex-direction":"column","align-items":"center","margin-bottom":"20px","border-bottom":"1px solid #8d8d8d"}},v=o("div",{style:{"font-size":"16px","font-weight":"500",margin:"10px"}}," \u0420\u043E\u0437\u043A\u0430\u0436\u0456\u0442\u044C \u043F\u0440\u043E \u0441\u0435\u0431\u0435 ",-1),U=o("div",{style:{"font-size":"16px","font-weight":"500",margin:"10px"}}," \u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044C \u0444\u043E\u0442\u043E \u043F\u0440\u043E\u0444\u0456\u043B\u044E \u0430\u0431\u043E \u0432\u0438\u0434\u0430\u043B\u0456\u0442\u044C \u043F\u043E\u0442\u043E\u0447\u043D\u0435 (\u0437\u0430 \u0431\u0430\u0436\u0430\u043D\u043D\u044F\u043C) ",-1),w={key:0},V={class:"edit-button-container"};function b(r,i,n,l,t,a){return p(),f("div",null,[_,o("div",y,[s(d,{square:"",outlined:"",modelValue:t.profile.name,"onUpdate:modelValue":i[0]||(i[0]=e=>t.profile.name=e),label:"\u0406\u043C'\u044F",clearable:"",rules:[e=>!!e||"\u041D\u0435\u043E\u0431\u0445\u0456\u0434\u043D\u043E \u0437\u0430\u043F\u043E\u0432\u043D\u0438\u0442\u0438",e=>e&&e.length<=50||"\u041D\u0435 \u0431\u0456\u043B\u044C\u0448\u0435 50 \u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432",e=>e&&/^[?!@()№,.;:a-zA-Zа-яА-ЯґҐіІїЇєЄ0-9\s]*$/u.test(e)||"\u041C\u043E\u0436\u043B\u0438\u0432\u0456 \u043B\u0438\u0448\u0435 \u043B\u0456\u0442\u0435\u0440\u0438, \u0446\u0438\u0444\u0440\u0438 \u0442\u0430 \u0441\u0438\u043C\u0432\u043E\u043B\u0438"]},null,8,["modelValue","rules"])]),o("div",x,[v,s(d,{modelValue:t.profile.description,"onUpdate:modelValue":i[1]||(i[1]=e=>t.profile.description=e),outlined:"",autogrow:"",style:{width:"95%"}},null,8,["modelValue"]),U,s(c,{modelValue:t.files,"onUpdate:modelValue":i[2]||(i[2]=e=>t.files=e),label:"\u0412\u0438\u0431\u0456\u0440 \u0444\u043E\u0442\u043E",outlined:"",multiple:"",style:{"max-width":"300px","margin-bottom":"10px"}},null,8,["modelValue"]),s(u,{ripple:{center:!0},onClick:a.deletePicture,color:"red",label:"\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0444\u043E\u0442\u043E","no-caps":"",style:{"margin-bottom":"20px"}},null,8,["onClick"]),t.deletedPicture?(p(),f("div",w," \u0424\u043E\u0442\u043E \u0431\u0443\u0434\u0435 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u0435 \u043F\u0456\u0441\u043B\u044F \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043D\u044F \u0437\u043C\u0456\u043D ")):g("",!0)]),o("div",V,[s(u,{ripple:{center:!0},onClick:a.updateProfile,color:"secondary",style:{width:"100%"},label:"\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438 \u0437\u043C\u0456\u043D\u0438","no-caps":""},null,8,["onClick"])])])}var O=m(P,[["render",b]]);export{O as default};
