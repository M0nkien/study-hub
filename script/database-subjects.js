/* StudyHub v2.3 - Supabase is authoritative for published subjects and filters. */
(function(){
"use strict";
const db=()=>window.studyHubSupabase;
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const labels={hotove:"Hotové",rozpracovane:"Rozpracované",pripravovane:"Pripravované"};
const classes={hotove:"state-done",rozpracovane:"state-progress",pripravovane:"state-planned"};
function cardFor(subject,old){
 let card=old?old.cloneNode(true):document.createElement("a");
 card.classList.add("subject-card","subject-card-with-static-tags");
 card.dataset.subjectId=subject.slug;
 card.dataset.status=subject.status;
 card.dataset.dbVisible="true";
 card.dataset.visibilityHidden="false";
 card.dataset.search=[subject.name,subject.description,old?.dataset.search||""].join(" ");
 const href=String(subject.href||"");
 card.href=/^(?:subjects\/[a-z0-9-]+\.html|subject\.html\?slug=[a-z0-9-]+)$/.test(href)
   ?href:"subject.html?slug="+encodeURIComponent(subject.slug);
 if(subject.color)card.style.setProperty("--subject-card-accent",subject.color);
 if(!old){
  card.innerHTML='<div class="card-top"><div class="subject-badge"></div><div class="progress-pill"><span class="js-progress-text">0%</span></div></div>'+
   '<div class="subject-state-ribbon"><span></span><small>Načítané z databázy</small></div>'+
   '<h3></h3><p></p><div class="subject-card-tags static-tags"><span>StudyHub</span></div>'+
   '<div class="card-link">Otvoriť predmet →</div>';
 }
 const badge=card.querySelector(".subject-badge");
 if(badge)badge.textContent=subject.short_name||subject.slug.toUpperCase();
 const title=card.querySelector("h3");
 if(title)title.textContent=subject.name;
 const description=card.querySelector("h3 + p");
 if(description)description.textContent=subject.description||"";
 let ribbon=card.querySelector(".subject-state-ribbon");
 if(!ribbon){
  ribbon=document.createElement("div");ribbon.className="subject-state-ribbon";
  ribbon.innerHTML="<span></span><small>Načítané z databázy</small>";
  card.querySelector(".card-top")?.insertAdjacentElement("afterend",ribbon);
 }
 ribbon.classList.remove("state-done","state-progress","state-planned");
 ribbon.classList.add(classes[subject.status]||"state-planned");
 ribbon.querySelector("span").textContent=labels[subject.status]||subject.status;
 const details=ribbon.querySelector("small");
 if(details)details.textContent="Aktuálny stav z databázy";
 card.hidden=false;
 return card;
}
async function load(){
 if(!db()||!document.body.classList.contains("page-subjects"))return;
 const grid=document.querySelector(".subjects-grid");
 if(!grid)return;
 const originals=new Map(
   Array.from(grid.querySelectorAll(".subject-card[data-subject-id]"))
     .map(card=>[card.dataset.subjectId,card])
 );
 const result=await db().from("subjects")
   .select("slug,name,short_name,description,status,href,color,visible,publication_status,sort_order")
   .eq("visible",true).eq("publication_status","published")
   .order("sort_order",{ascending:true});
 if(result.error){console.warn("StudyHub subjects fallback:",result.error.message);return;}
 const fragment=document.createDocumentFragment();
 (result.data||[]).forEach(row=>fragment.appendChild(cardFor(row,originals.get(row.slug))));
 grid.replaceChildren(fragment);
 document.dispatchEvent(new CustomEvent("studyhub:subject-visibility-changed"));
 document.dispatchEvent(new CustomEvent("studyhub:subjects-loaded",{detail:{count:(result.data||[]).length}}));
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",load);
else load();
})();