/* StudyHub v2.3 - cloud flashcards with scheduled repetition. */
(function(){
"use strict";
const db=()=>window.studyHubSupabase;
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let cards=[],subjects=[],topics=[],reviews=new Map(),current=null,user=null,showAll=false,host=null;
let selectedSubject="all",selectedTopic="all";
const $=s=>host?.querySelector(s);
const due=row=>!row?.due_at||new Date(row.due_at).getTime()<=Date.now();
function reviewedBefore(id){return reviews.has(id);}
function nextSchedule(before,rating){
  const prev=before||{interval_days:0,ease:2.5,repetitions:0};
  const ease=Number(prev.ease)||2.5;
  const n=Number(prev.repetitions)||0;
  const interval=Number(prev.interval_days)||0;
  let days=0,repetitions=n,newEase=ease,minutes=0;
  if(rating==="again"){days=0;minutes=10;repetitions=0;newEase=Math.max(1.3,ease-0.2);}
  if(rating==="hard"){days=Math.max(1,Math.ceil(interval*1.2));repetitions=n+1;newEase=Math.max(1.3,ease-0.15);}
  if(rating==="good"){days=n===0?1:n===1?3:Math.max(1,Math.ceil(interval*ease));repetitions=n+1;}
  if(rating==="easy"){days=Math.max(3,Math.ceil(Math.max(1,interval)*ease*1.3));repetitions=n+1;newEase=ease+0.15;}
  const next=new Date(Date.now()+days*86400000+minutes*60000);
  return {interval_days:days,ease:Number(newEase.toFixed(2)),repetitions,
    due_at:next.toISOString(),last_rating:rating,reviewed_at:new Date().toISOString()};
}
function available(){
  return cards.filter(c=>(selectedSubject==="all"||c.subject_id===selectedSubject)&&
    (selectedTopic==="all"||c.topic_id===selectedTopic)&&
    (showAll||due(reviews.get(c.id))));
}
function populate(){
  const subj=$("[data-card-subject]"),topic=$("[data-card-topic]");
  subj.innerHTML='<option value="all">Všetky predmety</option>'+
    subjects.map(s=>'<option value="'+esc(s.id)+'"'+(selectedSubject===s.id?" selected":"")+'>'+esc(s.name)+'</option>').join("");
  topic.innerHTML='<option value="all">Všetky témy</option>'+
    topics.filter(t=>selectedSubject==="all"||t.subject_id===selectedSubject)
      .map(t=>'<option value="'+esc(t.id)+'"'+(selectedTopic===t.id?" selected":"")+'>'+esc(t.title)+'</option>').join("");
}
function render(){
  populate();
  const list=available();
  const count=$("[data-card-count]");
  count.textContent=list.length+" kartičiek na "+(showAll?"precvičenie":"opakovanie");
  if(!list.length){
    current=null;
    $("[data-card-view]").innerHTML="<p>Všetky vybrané kartičky máš zatiaľ zopakované. Môžeš zobraziť aj všetky.</p>";
    return;
  }
  if(!current||!list.some(x=>x.id===current.id))current=list[0];
  const topic=topics.find(x=>x.id===current.topic_id);
  const subject=subjects.find(x=>x.id===current.subject_id);
  $("[data-card-view]").innerHTML=
    '<div class="v23-cloud-card"><small>'+esc(subject?.name||"StudyHub")+
    (topic?" · "+esc(topic.title):"")+'</small>'+
    '<h3>'+esc(current.front)+'</h3>'+
    '<p data-card-answer hidden>'+esc(current.back)+'</p>'+
    '<button class="btn secondary" type="button" data-card-reveal>Ukázať odpoveď</button>'+
    '<div class="v23-review-controls" data-card-ratings hidden>'+
      '<button class="btn secondary" data-rate="again">Znova · 10 min</button>'+
      '<button class="btn secondary" data-rate="hard">Ťažké</button>'+
      '<button class="btn secondary" data-rate="good">Viem</button>'+
      '<button class="btn secondary" data-rate="easy">Ľahké</button>'+
    '</div></div>';
  $("[data-card-reveal]").onclick=()=>{
    $("[data-card-answer]").hidden=false;
    $("[data-card-ratings]").hidden=false;
    $("[data-card-reveal]").hidden=true;
  };
  host.querySelectorAll("[data-rate]").forEach(b=>b.onclick=()=>rate(b.dataset.rate));
}
async function rate(value){
  if(!current)return;
  const id=current.id;
  const next=nextSchedule(reviews.get(id),value);
  if(user){
    const result=await db().from("flashcard_reviews").upsert({user_id:user.id,flashcard_id:id,...next},
      {onConflict:"user_id,flashcard_id"});
    if(result.error){$("[data-card-count]").textContent="Ukladanie zlyhalo. Skús znovu.";return;}
  }else{
    const store=JSON.parse(localStorage.getItem("studyhub-v23-guest-flashcards")||"{}");
    store[id]=next;
    localStorage.setItem("studyhub-v23-guest-flashcards",JSON.stringify(store));
  }
  reviews.set(id,next);current=null;render();
}
async function init(){
  if(!db()||!document.body.classList.contains("page-flashcards"))return;
  const [s,t,f,session]=await Promise.all([
    db().from("subjects").select("id,name,sort_order").eq("publication_status","published").eq("visible",true),
    db().from("topics").select("id,title,subject_id").eq("publication_status","published").eq("visible",true),
    db().from("flashcards").select("id,front,back,subject_id,topic_id").eq("publication_status","published").eq("visible",true),
    db().auth.getSession()
  ]);
  if(f.error||!f.data?.length)return;
  subjects=s.data||[];topics=t.data||[];cards=f.data||[];
  user=session.data?.session?.user||null;
  if(user){
    const result=await db().from("flashcard_reviews").select("*").eq("user_id",user.id);
    if(!result.error)(result.data||[]).forEach(r=>reviews.set(r.flashcard_id,r));
  }else{
    try{
      const store=JSON.parse(localStorage.getItem("studyhub-v23-guest-flashcards")||"{}");
      Object.keys(store).forEach(id=>reviews.set(id,store[id]));
    }catch(e){}
  }
  const main=document.querySelector("main");
  if(!main)return;
  host=document.createElement("section");
  host.className="container v23-cloud-flashcards";
  host.innerHTML='<p class="small-title">StudyHub Cloud</p><h2>Inteligentné opakovanie</h2>'+
    '<p>Ťažšie kartičky sa opakujú skôr. '+(user?"Progres sa synchronizuje s tvojím účtom.":"Ako hosť máš progres len v tomto prehliadači.")+'</p>'+
    '<div class="v23-review-controls"><label>Predmet <select data-card-subject></select></label>'+
    '<label>Téma <select data-card-topic></select></label>'+
    '<label><input type="checkbox" data-card-show-all> Zobraziť všetky</label></div>'+
    '<p data-card-count role="status"></p><div data-card-view></div>';
  main.appendChild(host);
  $("[data-card-subject]").onchange=e=>{selectedSubject=e.target.value;selectedTopic="all";current=null;render();};
  $("[data-card-topic]").onchange=e=>{selectedTopic=e.target.value;current=null;render();};
  $("[data-card-show-all]").onchange=e=>{showAll=e.target.checked;current=null;render();};
  render();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);
else init();
})();