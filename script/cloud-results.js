/* StudyHub v2.3 - authenticated database quiz results */
(function(){
"use strict";
const db=()=>window.studyHubSupabase;
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
async function init(){
 if(!db()||!document.body.classList.contains("page-results"))return;
 const session=await db().auth.getSession();
 const user=session.data?.session?.user;
 if(!user)return;
 const [r,s]=await Promise.all([
  db().from("quiz_results").select("id,subject_id,correct_count,total_count,completed_at")
   .eq("user_id",user.id).order("completed_at",{ascending:false}).limit(30),
  db().from("subjects").select("id,name")
 ]);
 if(r.error||!r.data?.length)return;
 const names=new Map((s.data||[]).map(x=>[x.id,x.name]));
 const main=document.querySelector("main");if(!main)return;
 const section=document.createElement("section");
 section.className="container v23-db-content";
 section.innerHTML='<p class="small-title">Výsledky v cloude</p>'+
  '<h2>Moje databázové testy</h2>'+
  r.data.map(q=>'<article class="v23-cloud-card">'+
   '<h3>'+esc(names.get(q.subject_id)||"Predmet")+'</h3><p>'+
    Number(q.correct_count)+" / "+Number(q.total_count)+" správne ("+
    (q.total_count?Math.round(q.correct_count/q.total_count*100):0)+" %) · "+
    esc(new Date(q.completed_at).toLocaleString("sk-SK"))+
    '</p></article>').join("");
 main.appendChild(section);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);
else init();
})();