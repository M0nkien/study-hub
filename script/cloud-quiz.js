/* StudyHub v2.3 - server-graded database quiz; answers never fetched beforehand. */
(function(){
"use strict";
const db=()=>window.studyHubSupabase;
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function slug(){
  const path=location.pathname.replace(/\\/g,"/");
  if(path.endsWith("/subject.html"))return new URLSearchParams(location.search).get("slug");
  const m=path.match(/\/subjects\/([^/]+)\.html$/);
  return m?({"3d-tlac":"tlac3d","uvod-do-studia":"uvod"}[m[1]]||m[1]):"";
}
function root(){return location.pathname.includes("/subjects/")?"../":"";}
async function init(){
  if(!db()||!slug())return;
  const response=await db().rpc("studyhub_quiz_questions",{p_slug:slug()});
  if(response.error||!response.data?.length)return;
  const main=document.querySelector("main");
  if(!main)return;
  const section=document.createElement("section");
  section.className="subject-content";
  section.id="databaseQuizSection";
  const questions=response.data;
  section.innerHTML='<div class="container v23-db-content"><p class="small-title">Bezpečný databázový kvíz</p>'+
    '<h2>Otestuj sa</h2><p>Správne odpovede sa vyhodnocujú až po odoslaní na serveri.</p>'+
    '<form data-cloud-quiz>'+questions.map((q,i)=>
      '<fieldset class="v23-cloud-card" data-question-id="'+esc(q.question_id)+'">'+
        '<legend><strong>'+(i+1)+'. '+esc(q.prompt)+'</strong></legend>'+
        '<div class="v23-quiz-answers">'+(q.options||[]).map((o,n)=>
           '<label><input type="radio" name="quiz-'+i+'" value="'+n+'"> '+esc(o.text)+'</label>').join("")+
        '</div></fieldset>').join("")+
    '<button type="submit" class="btn primary">Vyhodnotiť test</button>'+
    '<p data-quiz-message role="status" aria-live="polite"></p></form></div>';
  main.appendChild(section);
  const form=section.querySelector("[data-cloud-quiz]");
  form.addEventListener("submit",async e=>{
    e.preventDefault();
    const msg=section.querySelector("[data-quiz-message]");
    const responses=questions.map((q,i)=>{
      const answer=form.querySelector('input[name="quiz-'+i+'"]:checked');
      return answer?{id:q.question_id,answer:Number(answer.value)}:null;
    });
    if(responses.some(x=>x===null)){msg.textContent="Odpovedz na všetky otázky.";return;}
    const session=await db().auth.getSession();
    if(!session.data?.session?.user){
      msg.innerHTML='Na uloženie a vyhodnotenie testu sa <a href="'+root()+
        'login.html?redirect='+encodeURIComponent(location.pathname+location.search)+'">prihlás</a>.';
      return;
    }
    const button=form.querySelector('button[type="submit"]');button.disabled=true;
    const result=await db().rpc("studyhub_submit_quiz",{p_slug:slug(),p_responses:responses});
    if(result.error){
      msg.textContent="Vyhodnotenie zlyhalo: "+result.error.message;
      button.disabled=false;return;
    }
    const value=result.data||{};
    const details=value.details||[];
    msg.innerHTML="<strong>Výsledok: "+Number(value.correct||0)+" / "+Number(value.total||0)+"</strong>"+
      details.map((detail,i)=>'<p>'+(i+1)+". "+(detail.correct?"Správne":"Nesprávne")+
        (detail.correct?"":" · Správna možnosť: "+(Number(detail.correct_answer)+1))+
        (detail.explanation?" · "+esc(detail.explanation):"")+'</p>').join("");
    form.querySelectorAll("input").forEach(x=>x.disabled=true);
    button.textContent="Test vyhodnotený";
  });
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);
else init();
})();