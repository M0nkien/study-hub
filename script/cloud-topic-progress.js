/* StudyHub v2.3 - per-topic learned state for cloud and guest sessions. */
(function(){
"use strict";
const db=()=>window.studyHubSupabase;
async function enhance(event){
 const topics=event.detail?.topics||[];
 if(!topics.length)return;
 const slug=event.detail?.slug||"subject";
 const session=db()?await db().auth.getSession():null;
 const user=session?.data?.session?.user||null;
 const state=new Map();
 if(user){
  const result=await db().from("user_topic_progress").select("topic_id,status")
    .eq("user_id",user.id).in("topic_id",topics.map(t=>t.id));
  if(!result.error)(result.data||[]).forEach(x=>state.set(x.topic_id,x.status));
 }else{
  try{
   const local=JSON.parse(localStorage.getItem("studyHubProgress")||"{}");
   topics.forEach(t=>state.set(t.id,local[slug+":"+t.id]?"learned":"not_started"));
  }catch(e){}
 }
 topics.forEach(t=>{
  const article=document.getElementById("db-topic-"+t.id);
  if(!article||article.querySelector("[data-topic-progress]"))return;
  const button=document.createElement("button");
  button.type="button";button.className="btn secondary";
  button.dataset.topicProgress=t.id;
  const label=()=>state.get(t.id)==="learned"?"Naučené ✓":"Označiť ako naučené";
  button.textContent=label();
  article.appendChild(button);
  button.onclick=async()=>{
   const previous=state.get(t.id)||"not_started";
   const next=previous==="learned"?"in_progress":"learned";
   button.disabled=true;
   if(user){
    const res=await db().from("user_topic_progress").upsert({
     user_id:user.id,topic_id:t.id,status:next
    },{onConflict:"user_id,topic_id"});
    if(res.error){button.disabled=false;button.textContent="Uloženie zlyhalo";return;}
   }else{
    let local={};
    try{local=JSON.parse(localStorage.getItem("studyHubProgress")||"{}");}catch(e){}
    local[slug+":"+t.id]=next==="learned";
    localStorage.setItem("studyHubProgress",JSON.stringify(local));
    document.dispatchEvent(new CustomEvent("studyhub:local-data-changed",{detail:{key:"studyHubProgress"}}));
   }
   state.set(t.id,next);button.textContent=label();button.disabled=false;
  };
 });
}
document.addEventListener("studyhub:cloud-topics-ready",enhance);
})();