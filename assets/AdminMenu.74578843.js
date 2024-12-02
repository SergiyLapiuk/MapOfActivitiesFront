import{e as o,d as T,Q as k}from"./QBtn.65d16f8d.js";import{_ as S,H as A,I as L,J as c,V as h,M as l,Y as n,f as r,s as y,a7 as U,ak as p,F as E,W as g,L as b,X as u,al as w,am as W}from"./index.39a34321.js";import{c as x}from"./convertDate.2fe32ce1.js";import"./uid.5d029387.js";const I={components:{},data(){return{loadUsersComponent:!1,loadEventsComponent:!1,loadComplaintsComponent:!1,loadComplaintDetailsComponent:!1,isSearchActive:!1,searchType:"all",searchWord:"",searchWordUsersComplaints:"",searchTypeUsersComplaints:"all",searchWordEventsComplaints:"",searchTypeEventsComplaints:"all"}},computed:{filteredUsers(){const t=this.searchWord.toLowerCase();return this.searchType==="all"?this.users:this.searchType==="id"?this.users.filter(s=>s.id.toString().includes(t)):this.searchType==="email"?this.users.filter(s=>s.email.includes(t)):this.searchType==="role"?this.users.filter(s=>s.roles.length>0&&s.roles[0].toLowerCase().includes(t)):this.users},filteredUsersComplaints(){const t=this.searchWordUsersComplaints.toLowerCase();return this.searchTypeUsersComplaints==="all"?this.allUsersComplaints:this.searchTypeUsersComplaints==="email"?this.allUsersComplaints.filter(s=>s.userEmail.toString().includes(t)):this.searchTypeUsersComplaints==="header"?this.allUsersComplaints.filter(s=>s.header.toLowerCase().includes(t)):this.allUsersComplaints},filteredEventsComplaints(){const t=this.searchWordEventsComplaints.toLowerCase();return this.searchTypeEventsComplaints==="all"?this.allEventsComplaints:this.searchTypeEventsComplaints==="id"?this.allEventsComplaints.filter(s=>s.eventId.toString().includes(t)):this.searchTypeEventsComplaints==="header"?this.allEventsComplaints.filter(s=>s.header.toLowerCase().includes(t)):this.allEventsComplaints},...A({users:"getUsers",status:"getUsersStatus",profile:"getProfile",events:"getEvents",allUsersComplaints:"getAllUsersComplaints",allEventsComplaints:"getAllEventsComplaints",allWebLogs:"getAllWebLogs"}),searchInputClasses(){return{"hidden md:!block lg:!block":!this.isSearchActive,"md:block":this.isSearchActive,"lg:block":this.isSearchActive,"sm:block":this.isSearchActive,"search-input":!0}}},async mounted(){await this.getProfile(),await this.getEvents()},methods:{convertJSONToDate(t){return x(t)},isSearchTypeActive(t){return this.searchType===t},isSearchUserTypeActive(t){return this.searchTypeUsersComplaints===t},isSearchEventTypeActive(t){return this.searchTypeEventsComplaints===t},loadUsers(){this.loadUsersComponent=!0,this.loadLogsComponent=!1,this.loadComplaintsComponent=!1,this.getUsers()},loadLogs(){this.loadUsersComponent=!1,this.loadLogsComponent=!0,this.loadComplaintsComponent=!1,this.getAllWebLogs()},loadComplaints(){this.loadUsersComponent=!1,this.loadLogsComponent=!1,this.loadComplaintsComponent=!0,this.getAllUsersComplaints(),this.getAllEventsComplaints()},async getProfile(){await Promise.all([this.profile!={}?this.$store.dispatch("GET_PROFILE",{id:this.$store.getters.getCurrentUser}):void 0])},async getEvents(){await Promise.all([this.events.length<1?this.$store.dispatch("GET_EVENTS"):void 0])},banUser(t){this.$store.dispatch("BAN_USER",{userId:t,adminEmail:this.profile.email,handler:s=>{this.$store.dispatch("GET_USERS")},handlerError:s=>{alert("Error occurred: "+s)}})},unBanUser(t){this.$store.dispatch("UNBAN_USER",{userId:t,adminEmail:this.profile.email,handler:s=>{this.$store.dispatch("GET_USERS")},handlerError:s=>{alert("Error occurred: "+s)}})},deleteUser(t){this.$store.dispatch("DELETE_USER",{userId:t,adminEmail:this.profile.email,handler:s=>{this.$store.dispatch("GET_USERS")},handlerError:s=>{alert("Error occurred: "+s)}})},async getUsers(){await Promise.all([this.users.length<1?this.$store.dispatch("GET_USERS"):void 0])},getAllUsersComplaints(){this.$store.dispatch("GET_ALL_USERS_COMPLAINTS")},getAllEventsComplaints(){this.$store.dispatch("GET_ALL_EVENTS_COMPLAINTS")},putStatusComplaint(t,s){if(s==="work"&&s!="process"&&s!="reject")var _="\u0412 \u0440\u043E\u0431\u043E\u0442\u0456 \u0430\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u043E\u043C: "+this.profile.email;else if(s==="process"&&s!="work"&&s!="reject")var _="\u041E\u043F\u0440\u0430\u0446\u044C\u043E\u0432\u0430\u043D\u043E \u0430\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u043E\u043C: "+this.profile.email;else if(s==="reject"&&s!="process"&&s!="work")var _="\u0412\u0456\u0434\u0445\u0438\u043B\u0435\u043D\u043E \u0430\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u043E\u043C: "+this.profile.email;else alert("Error");console.log(t),console.log(s),console.log(_),this.$store.dispatch("PUT_STATUS_COMPLAINT",{formData:{Id:t,Status:_},handler:C=>{this.$store.dispatch("GET_ALL_USERS_COMPLAINTS"),this.$store.dispatch("GET_ALL_EVENTS_COMPLAINTS")},handlerError:C=>{console.log("error: "+C),alert("Error occurred: "+C)}})},getAllWebLogs(){this.$store.dispatch("GET_ALL_WEB_LOGS")}}},a=t=>(w("data-v-d4bf9ba8"),t=t(),W(),t),N={class:""},V={class:"AdminTopLine"},G={class:"TopButtons"},P={class:"filters1 q-gutter-xs"},O={key:0,class:"status"},B={key:1,class:"status"},D={key:2},R={class:"scrollable-container2"},M={class:"flex mt-2",style:{gap:"10px"}},J={class:"w-full flex h-[90vh]"},j={class:"w-1/2 flex flex-col max-h-full"},Q=a(()=>l("div",{class:"text-center mb-2"},[l("b",null,"\u0421\u043A\u0430\u0440\u0433\u0438 \u043D\u0430 \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0456\u0432")],-1)),q={class:"filters q-gutter-xs"},F={class:"overflow-auto flex-1"},z=a(()=>l("br",null,null,-1)),H=a(()=>l("b",null,"\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447: ",-1)),X=a(()=>l("br",null,null,-1)),Y=a(()=>l("b",null,"\u041E\u043F\u0438\u0441:",-1)),K=a(()=>l("br",null,null,-1)),Z=a(()=>l("b",null,"\u0410\u0432\u0442\u043E\u0440 \u0441\u043A\u0430\u0440\u0433\u0438: ",-1)),$=a(()=>l("br",null,null,-1)),ee=a(()=>l("b",null,"\u0427\u0430\u0441 \u043D\u0430\u0434\u0445\u043E\u0436\u0435\u043D\u043D\u044F \u0441\u043A\u0430\u0440\u0433\u0438:",-1)),se=a(()=>l("br",null,null,-1)),le=a(()=>l("b",null,"\u0421\u0442\u0430\u0442\u0443\u0441:",-1)),te=a(()=>l("br",null,null,-1)),re={class:"flex mt-2",style:{gap:"10px"}},ie={class:"w-1/2 flex flex-col h-[90vh]"},ae=a(()=>l("div",{class:"text-center mb-2"},[l("b",null,"\u0421\u043A\u0430\u0440\u0433\u0438 \u043D\u0430 \u043F\u043E\u0434\u0456\u0457")],-1)),oe={class:"filters q-gutter-xs"},ne={class:"overflow-auto flex-1"},de=a(()=>l("br",null,null,-1)),ce=a(()=>l("b",null,"\u041D\u043E\u043C\u0435\u0440 \u043F\u043E\u0434\u0456\u0457: ",-1)),he=a(()=>l("br",null,null,-1)),ue=a(()=>l("b",null,"\u041E\u043F\u0438\u0441:",-1)),pe=a(()=>l("br",null,null,-1)),ve=a(()=>l("b",null,"\u0410\u0432\u0442\u043E\u0440 \u0441\u043A\u0430\u0440\u0433\u0438: ",-1)),me=a(()=>l("br",null,null,-1)),_e=a(()=>l("b",null,"\u0427\u0430\u0441 \u043D\u0430\u0434\u0445\u043E\u0434\u0436\u0435\u043D\u043D\u044F \u0441\u043A\u0430\u0440\u0433\u0438:",-1)),fe=a(()=>l("br",null,null,-1)),be=a(()=>l("b",null,"\u0421\u0442\u0430\u0442\u0443\u0441:",-1)),Ce=a(()=>l("br",null,null,-1)),Ee={class:"flex mt-2",style:{gap:"10px"}},ge={class:"scrollable-container3"};function Te(t,s,_,C,d,i){const f=L("router-link");return c(),h("div",N,[l("div",V," Admin: "+n(t.profile.email)+" - "+n(t.profile.name),1),l("div",G,[r(o,{onClick:i.loadUsers,label:"\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0456",color:"green-10"},null,8,["onClick"]),r(o,{onClick:i.loadComplaints,label:"\u0421\u043A\u0430\u0440\u0433\u0438",color:"orange-14"},null,8,["onClick"]),r(o,{onClick:i.loadLogs,label:"\u041B\u043E\u0433\u0438",color:"red-14"},null,8,["onClick"])]),y(l("div",null,[r(T,{class:"search",type:"text",modelValue:d.searchWord,"onUpdate:modelValue":s[0]||(s[0]=e=>d.searchWord=e),placeholder:"\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u0441\u0438\u043C\u0432\u043E\u043B\u0438 \u0434\u043B\u044F \u043F\u043E\u0448\u0443\u043A\u0443"},null,8,["modelValue"]),l("div",P,[r(o,{label:"\u0412\u0441\u0456 \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0456",onClick:s[1]||(s[1]=e=>d.searchType="all"),class:p({active:i.isSearchTypeActive("all")})},null,8,["class"]),r(o,{label:"ID \u043F\u043E\u0448\u0443\u043A",onClick:s[2]||(s[2]=e=>d.searchType="id"),class:p({active:i.isSearchTypeActive("id")})},null,8,["class"]),r(o,{label:"\u041F\u043E\u0448\u0443\u043A \u0437\u0430 \u043F\u043E\u0448\u0442\u043E\u044E",onClick:s[3]||(s[3]=e=>d.searchType="email"),class:p({active:i.isSearchTypeActive("email")})},null,8,["class"]),r(o,{label:"\u041F\u043E\u0448\u0443\u043A \u0437\u0430 \u0440\u043E\u043B\u043B\u044E",onClick:s[4]||(s[4]=e=>d.searchType="role"),class:p({active:i.isSearchTypeActive("role")})},null,8,["class"])]),t.status=="loading"?(c(),h("div",O,[r(k,{color:"primary",size:"3em",class:"mx-auto"})])):t.status=="error"?(c(),h("div",B," \u0429\u043E\u0441\u044C \u043F\u0456\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A - \u043F\u0435\u0432\u043D\u043E, \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0438 \u0437\u0456 \u0437'\u0454\u0434\u043D\u0430\u043D\u043D\u044F\u043C. ")):(c(),h("div",D,[l("div",R,[(c(!0),h(E,null,g(i.filteredUsers,(e,v)=>(c(),h("div",{key:v,class:"event-item relative"},[r(f,{to:"/profile-page?id="+e.id},{default:b(()=>[u(n(e.id)+" - "+n(e.email)+" - "+n(e.roles),1)]),_:2},1032,["to"]),l("div",M,[r(o,{label:"\u0417\u0430\u0431\u0430\u043D\u0438\u0442\u0438",onClick:m=>i.banUser(e.id),color:"positive",disable:e.roles.includes("BannedUser")||e.roles.includes("Admin")},null,8,["onClick","disable"]),r(o,{label:"\u0420\u043E\u0437\u0431\u0430\u043D\u0438\u0442\u0438",onClick:m=>i.unBanUser(e.id),color:"positive",disable:e.roles.includes("User")||e.roles.includes("Admin")},null,8,["onClick","disable"]),r(o,{label:"\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0430\u043A\u0430\u0443\u043D\u0442 \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430",onClick:m=>i.deleteUser(e.id),color:"red-14",disable:e.roles.includes("Admin")},null,8,["onClick","disable"])])]))),128))])]))],512),[[U,d.loadUsersComponent]]),y(l("div",J,[l("div",j,[Q,r(T,{type:"text",modelValue:d.searchWordUsersComplaints,"onUpdate:modelValue":s[5]||(s[5]=e=>d.searchWordUsersComplaints=e),placeholder:"\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u0441\u0438\u043C\u0432\u043E\u043B\u0438 \u0434\u043B\u044F \u043F\u043E\u0448\u0443\u043A\u0443",style:{"margin-left":"5%","margin-right":"5%"}},null,8,["modelValue"]),l("div",q,[r(o,{label:"\u0412\u0441\u0456 \u0441\u043A\u0430\u0440\u0433\u0438 \u043D\u0430 \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0456\u0432",onClick:s[6]||(s[6]=e=>d.searchTypeUsersComplaints="all"),class:p({active:i.isSearchUserTypeActive("all")})},null,8,["class"]),r(o,{label:"\u041F\u043E\u0448\u0443\u043A \u0437\u0430 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u043C",onClick:s[7]||(s[7]=e=>d.searchTypeUsersComplaints="header"),class:p({active:i.isSearchUserTypeActive("header")})},null,8,["class"]),r(o,{label:"\u041F\u043E\u0448\u0443\u043A \u0437\u0430 \u043F\u043E\u0448\u0442\u043E\u044E",onClick:s[8]||(s[8]=e=>d.searchTypeUsersComplaints="email"),class:p({active:i.isSearchUserTypeActive("email")})},null,8,["class"])]),l("div",F,[(c(!0),h(E,null,g(i.filteredUsersComplaints,(e,v)=>(c(),h("div",{key:v,class:"event-complaint relative"},[l("b",null,n(e.header==="\u0406\u043D\u0448\u0435"?"\u0406\u043D\u0448\u0435: "+e.description:e.header),1),z,H,r(f,{to:"/profile-page?id="+e.userId,class:"clickable-link",style:{"font-weight":"normal"}},{default:b(()=>[u(n(e.userEmail)+" ",1),X]),_:2},1032,["to"]),Y,u(" "+n(e.description),1),K,Z,r(f,{to:"/profile-page?id="+e.authorId,class:"clickable-link",style:{"font-weight":"normal"}},{default:b(()=>[u(n(e.authorEmail)+" ",1),$]),_:2},1032,["to"]),ee,u(" "+n(i.convertJSONToDate(e.time)),1),se,le,u(" "+n(e.status),1),te,l("div",re,[r(o,{label:"\u041E\u043F\u0440\u0430\u0446\u044C\u043E\u0432\u0430\u043D\u043E",onClick:m=>i.putStatusComplaint(e.id,"process"),color:"green-10",disabled:e&&e.status&&(e.status.startsWith("\u041E\u043F\u0440\u0430\u0446\u044C\u043E\u0432\u0430\u043D\u043E")||e.status.startsWith("\u0412\u0456\u0434\u0445\u0438\u043B\u0435\u043D\u043E"))},null,8,["onClick","disabled"]),r(o,{label:"\u0412\u0456\u0434\u0445\u0438\u043B\u0438\u0442\u0438",onClick:m=>i.putStatusComplaint(e.id,"reject"),color:"red-14",disabled:e&&e.status&&(e.status.startsWith("\u041E\u043F\u0440\u0430\u0446\u044C\u043E\u0432\u0430\u043D\u043E")||e.status.startsWith("\u0412\u0456\u0434\u0445\u0438\u043B\u0435\u043D\u043E"))},null,8,["onClick","disabled"])])]))),128))])]),l("div",ie,[ae,r(T,{type:"text",modelValue:d.searchWordEventsComplaints,"onUpdate:modelValue":s[9]||(s[9]=e=>d.searchWordEventsComplaints=e),placeholder:"\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u0441\u0438\u043C\u0432\u043E\u043B\u0438 \u0434\u043B\u044F \u043F\u043E\u0448\u0443\u043A\u0443",style:{"margin-left":"5%","margin-right":"5%"}},null,8,["modelValue"]),l("div",oe,[r(o,{label:"\u0412\u0441\u0456 \u0441\u043A\u0430\u0440\u0433\u0438 \u043D\u0430 \u043F\u043E\u0434\u0456\u0457",onClick:s[10]||(s[10]=e=>d.searchTypeEventsComplaints="all"),class:p({active:i.isSearchEventTypeActive("all")})},null,8,["class"]),r(o,{label:"\u041F\u043E\u0448\u0443\u043A \u0437\u0430 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u043C",onClick:s[11]||(s[11]=e=>d.searchTypeEventsComplaints="header"),class:p({active:i.isSearchEventTypeActive("header")})},null,8,["class"]),r(o,{label:"\u041F\u043E\u0448\u0443\u043A \u0437\u0430 \u043D\u043E\u043C\u0435\u0440\u043E\u043C \u043F\u043E\u0434\u0456\u0457",onClick:s[12]||(s[12]=e=>d.searchTypeEventsComplaints="id"),class:p({active:i.isSearchEventTypeActive("id")})},null,8,["class"])]),l("div",ne,[(c(!0),h(E,null,g(i.filteredEventsComplaints,(e,v)=>(c(),h("div",{key:v,class:"event-complaint relative"},[l("b",null,n(e.header==="\u0406\u043D\u0448\u0435"?"\u0406\u043D\u0448\u0435: "+e.description:e.header),1),de,ce,r(f,{to:"/event-page?id="+e.eventId,class:"clickable-link",style:{"font-weight":"normal"}},{default:b(()=>[u(n(e.eventId)+" ",1),he]),_:2},1032,["to"]),ue,u(" "+n(e.description),1),pe,ve,r(f,{to:"/profile-page?id="+e.authorId,class:"clickable-link",style:{"font-weight":"normal"}},{default:b(()=>[u(n(e.authorEmail)+" ",1),me]),_:2},1032,["to"]),_e,u(" "+n(i.convertJSONToDate(e.time)),1),fe,be,u(" "+n(e.status),1),Ce,l("div",Ee,[r(o,{label:"\u041E\u043F\u0440\u0430\u0446\u044C\u043E\u0432\u0430\u043D\u043E",onClick:m=>i.putStatusComplaint(e.id,"process"),color:"green-10",disabled:e&&e.status&&(e.status.startsWith("\u041E\u043F\u0440\u0430\u0446\u044C\u043E\u0432\u0430\u043D\u043E")||e.status.startsWith("\u0412\u0456\u0434\u0445\u0438\u043B\u0435\u043D\u043E"))},null,8,["onClick","disabled"]),r(o,{label:"\u0412\u0456\u0434\u0445\u0438\u043B\u0438\u0442\u0438",onClick:m=>i.putStatusComplaint(e.id,"reject"),color:"red-14",disabled:e&&e.status&&(e.status.startsWith("\u041E\u043F\u0440\u0430\u0446\u044C\u043E\u0432\u0430\u043D\u043E")||e.status.startsWith("\u0412\u0456\u0434\u0445\u0438\u043B\u0435\u043D\u043E"))},null,8,["onClick","disabled"])])]))),128))])])],512),[[U,d.loadComplaintsComponent]]),y(l("div",null,[l("div",ge,[(c(!0),h(E,null,g(t.allWebLogs,(e,v)=>(c(),h("div",{key:v,class:"event-item relative"},[l("b",null,n(e.id)+": "+n(e.description),1),u(" - "+n(i.convertJSONToDate(e.time)),1)]))),128))])],512),[[U,t.loadLogsComponent]])])}var Ae=S(I,[["render",Te],["__scopeId","data-v-d4bf9ba8"]]);export{Ae as default};