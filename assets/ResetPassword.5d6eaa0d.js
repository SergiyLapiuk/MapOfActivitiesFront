import{_ as w,J as a,V as d,N as n,M as o,s as l,a9 as u,a6 as p,Y as _,al as h,am as m}from"./index.39a34321.js";const f={data(){return{newPassword:"",confirmPassword:"",resetTokenValid:!1,resetSuccess:!1,resetError:null,userId:"",code:""}},async mounted(){const e=(await window.location.hash.substring(1)).split("&");this.userId=e[0].replace("/reset-password?userId=",""),this.code=e[1].replace("code=",""),this.resetTokenValid=!0,console.log(this.userId,this.code)},methods:{resetPassword(){if(this.newPassword!==this.confirmPassword){this.resetError="Passwords do not match.";return}this.$store.dispatch("RESET_PASSWORD",{formData:{id:this.userId,password:this.newPassword,code:this.code},handler:s=>{this.resetSuccess=!0,this.resetError=null},handlerError:s=>{console.log("error: "+s),this.resetError="Error occurred: "+s}})}}},i=s=>(h("data-v-af58b55e"),s=s(),m(),s),P={class:"reset-password-container"},v=i(()=>o("h2",{class:"form-title"},"Reset Password",-1)),y={key:0,class:"invalid-token-message"},S=i(()=>o("p",null,"The reset token is invalid or has expired.",-1)),k=[S],b={key:1},E=i(()=>o("label",{for:"newPassword",class:"form-label"},"New Password:",-1)),g=i(()=>o("label",{for:"confirmPassword",class:"form-label"},"Confirm Password:",-1)),I=i(()=>o("button",{type:"submit",class:"form-button"},"Reset Password",-1)),V={key:0,class:"success-message"},T={key:1,class:"error-message"};function x(s,e,R,q,r,c){return a(),d("div",P,[v,r.resetTokenValid?n("",!0):(a(),d("div",y,k)),r.resetTokenValid?(a(),d("div",b,[o("form",{onSubmit:e[2]||(e[2]=p((...t)=>c.resetPassword&&c.resetPassword(...t),["prevent"])),class:"password-form"},[E,l(o("input",{type:"password",id:"newPassword","onUpdate:modelValue":e[0]||(e[0]=t=>r.newPassword=t),class:"form-input",required:""},null,512),[[u,r.newPassword]]),g,l(o("input",{type:"password",id:"confirmPassword","onUpdate:modelValue":e[1]||(e[1]=t=>r.confirmPassword=t),class:"form-input",required:""},null,512),[[u,r.confirmPassword]]),I],32),r.resetSuccess?(a(),d("div",V," Password successfully reset. ")):n("",!0),r.resetError?(a(),d("div",T,_(r.resetError),1)):n("",!0)])):n("",!0)])}var N=w(f,[["render",x],["__scopeId","data-v-af58b55e"]]);export{N as default};