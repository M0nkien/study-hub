/* StudyHub v2.3 - sync existing study progress across signed-in devices.
   Guest remains local-only; pending changes survive offline sessions. */
(function(){
"use strict";
const db=()=>window.studyHubSupabase;
const EXACT=new Set(["studyHubProgress","mikStudyLearned","studyHubFlashcardsState",
 "studyHubFlashcardsHistory","studyHubQuizResults"]);
let user=null,timer=null,working=false;
const earlyDirty=new Set();
const allowed=k=>EXACT.has(k)||k.startsWith("studyHubChecklist:");
const pendingKey=()=>user?"studyHubCloudPending:"+user.id:"";
function readPending(){
 try{return new Set(JSON.parse(localStorage.getItem(pendingKey())||"[]"));}
 catch(e){return new Set();}
}
function savePending(s){if(user)localStorage.setItem(pendingKey(),JSON.stringify([...s]));}
function localKeys(){
 const found=[];
 for(let i=0;i<localStorage.length;i++){
  const key=localStorage.key(i);
  if(key&&allowed(key))found.push(key);
 }
 return found;
}
function changed(k){
 if(!allowed(k))return;
 if(!user){earlyDirty.add(k);return;}
 const pending=readPending();pending.add(k);savePending(pending);schedule();
}
function schedule(){if(timer)clearTimeout(timer);timer=setTimeout(flush,350);}
async function flush(){
 if(!db()||!user||working)return;
 working=true;
 const pending=readPending();
 for(const key of pending){
  const raw=localStorage.getItem(key);
  if(raw===null){pending.delete(key);savePending(pending);continue;}
  const res=await db().from("user_learning_state").upsert({
   user_id:user.id,storage_key:key,value:{raw}
  },{onConflict:"user_id,storage_key"});
  if(!res.error){pending.delete(key);savePending(pending);}
  else console.warn("StudyHub cloud sync:",res.error.message);
 }
 working=false;
}
async function init(){
 if(!db())return;
 const session=await db().auth.getSession();
 user=session.data?.session?.user||null;
 if(!user)return;
 const pending=readPending();
 earlyDirty.forEach(k=>pending.add(k));earlyDirty.clear();savePending(pending);
 const result=await db().from("user_learning_state")
  .select("storage_key,value,updated_at").eq("user_id",user.id);
 if(result.error){console.warn("StudyHub sync download:",result.error.message);return;}
 const cloud=new Map((result.data||[]).map(row=>[row.storage_key,row]));
 let applied=0;
 for(const key of localKeys()){
  if(!cloud.has(key))pending.add(key);
 }
 for(const [key,row] of cloud){
  if(!allowed(key)||pending.has(key))continue;
  const raw=row.value?.raw;
  if(typeof raw==="string"&&localStorage.getItem(key)!==raw){
   localStorage.setItem(key,raw);
   applied++;
  }
 }
 savePending(pending);
 if(pending.size)schedule();
 if(applied)window.location.reload();
}
document.addEventListener("studyhub:local-data-changed",e=>changed(e.detail?.key||""));
window.addEventListener("storage",e=>{if(e.key&&allowed(e.key))changed(e.key);});
window.addEventListener("online",schedule);
function start(){
 init();
 if(db())db().auth.onAuthStateChange(event=>{
  if(event==="SIGNED_OUT")user=null;
  if(event==="SIGNED_IN")window.setTimeout(init,60);
 });
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);
else start();
})();