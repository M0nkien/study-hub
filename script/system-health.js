/* StudyHub v2.3 - status is based on real service checks, not a static badge. */
(function(){
"use strict";
const db=()=>window.studyHubSupabase;
let running=false,lastCheck=0;
function setStatus(text,type){
 const box=document.querySelector(".v2-sidebar-meta p");
 if(!box)return;
 box.classList.remove("v23-health-ok","v23-health-warn","v23-health-error");
 box.classList.add("v23-health-"+type);
 box.textContent="";
 const dot=document.createElement("i");
 const span=document.createElement("span");
 span.textContent=text;
 box.append(dot,span);
 box.title="Kontrola StudyHub služieb • "+new Date().toLocaleTimeString("sk-SK");
}
async function check(){
 if(running)return;
 running=true;lastCheck=Date.now();
 const client=db(),cfg=window.STUDYHUB_SUPABASE_CONFIG||{};
 if(!client){setStatus("Databáza nie je pripojená","warn");running=false;return;}
 try{
  const checks=await Promise.allSettled([
   client.from("subjects").select("id",{head:true,count:"exact"}),
   client.storage.from("studyhub-materials").list("",{limit:1}),
   fetch(cfg.url.replace(/\/$/,"")+"/auth/v1/health",{
    method:"GET",headers:{"apikey":cfg.publishableKey},cache:"no-store"
   })
  ]);
  const database=checks[0].status==="fulfilled"&&!checks[0].value.error;
  const storage=checks[1].status==="fulfilled"&&!checks[1].value.error;
  const auth=checks[2].status==="fulfilled"&&checks[2].value.ok;
  if(database&&storage&&auth)setStatus("Všetko funguje správne","ok");
  else if(database)setStatus("Databáza online · služby sa overujú","warn");
  else setStatus("Problém s databázou","error");
 }catch(err){setStatus("Kontrola služieb zlyhala","error");}
 finally{running=false;}
}
function init(){check();document.addEventListener("visibilitychange",()=>{
 if(!document.hidden&&Date.now()-lastCheck>90000)check();
});setInterval(()=>{if(!document.hidden)check();},300000);}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);
else init();
})();