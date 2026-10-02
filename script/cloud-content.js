/* StudyHub v2.3 - published DB topics and private Storage materials. */
(function(){
"use strict";
const db=()=>window.studyHubSupabase;
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const aliases={"3d-tlac":"tlac3d","uvod-do-studia":"uvod"};
function slug(){
  const path=location.pathname.replace(/\\/g,"/");
  if(path.endsWith("/subject.html"))return new URLSearchParams(location.search).get("slug")||"";
  const match=path.match(/\/subjects\/([^/]+)\.html$/);
  return match?(aliases[match[1]]||match[1]):"";
}
function safeLink(value){
  if(!value)return "";
  const u=String(value).trim();
  if(/^https?:\/\//i.test(u)||/^(?:\.\.?\/)?[\w-][\w./%-]*$/.test(u))return u;
  return "";
}
async function run(){
  if(!db()||!slug())return;
  const currentSlug=slug();
  const subjectResult=await db().from("subjects")
    .select("id,name,description,href").eq("slug",currentSlug)
    .eq("publication_status","published").eq("visible",true).maybeSingle();
  if(subjectResult.error||!subjectResult.data){
    if(document.body.classList.contains("page-cloud-subject")){
      const title=document.querySelector("#cloudSubjectTitle");
      if(title)title.textContent="Predmet nie je dostupný";
    }
    return;
  }
  const subject=subjectResult.data;
  const title=document.querySelector("#cloudSubjectTitle");
  if(title)title.textContent=subject.name;
  const intro=document.querySelector("#cloudSubjectDescription");
  if(intro)intro.textContent=subject.description;
  const [topicsResult,materialsResult]=await Promise.all([
    db().from("topics").select("id,title,summary,content,sort_order")
      .eq("subject_id",subject.id).eq("visible",true).eq("publication_status","published")
      .order("sort_order",{ascending:true}),
    db().from("materials").select("id,topic_id,title,type,description,content,url,storage_path,created_at")
      .eq("subject_id",subject.id).eq("visible",true).eq("publication_status","published")
      .order("created_at",{ascending:false})
  ]);
  const main=document.querySelector("main");
  if(!main)return;
  const dest=document.querySelector("#cloudSubjectContent")||main;
  const topics=topicsResult.data||[];
  if(!topicsResult.error&&topics.length&&!document.querySelector("#databaseTopicsSection")){
    const section=document.createElement("section");
    section.className="subject-content";
    section.id="databaseTopicsSection";
    section.innerHTML='<div class="container v23-db-content"><p class="small-title">StudyHub databáza</p>'+
      '<h2>Témy a poznámky</h2>'+topics.map(t=>'<article class="v23-cloud-card" id="db-topic-'+esc(t.id)+'">'+
       '<h3>'+esc(t.title)+'</h3>'+(t.summary?'<p>'+esc(t.summary)+'</p>':"")+
       '<p>'+esc(t.content)+'</p></article>').join("")+'</div>';
    dest.appendChild(section);
  }
  const materials=materialsResult.data||[];
  if(materialsResult.error||!materials.length||document.querySelector("#databaseMaterialsSection"))return;
  const linkUrls=await Promise.all(materials.map(async item=>{
    if(item.storage_path){
      const signed=await db().storage.from("studyhub-materials").createSignedUrl(item.storage_path,3600);
      return signed.error?"":signed.data?.signedUrl||"";
    }
    return safeLink(item.url);
  }));
  const section=document.createElement("section");
  section.className="subject-content";
  section.id="databaseMaterialsSection";
  section.innerHTML='<div class="container v23-db-content"><p class="small-title">StudyHub databáza</p>'+
    '<h2>Materiály a súbory</h2>'+materials.map((item,i)=>{
      const related=topics.find(t=>t.id===item.topic_id);
      return '<article class="v23-cloud-card"><span class="badge">'+esc(item.type)+'</span>'+
        '<h3>'+esc(item.title)+'</h3>'+(related?'<small>Téma: '+esc(related.title)+'</small>':"")+
        '<p>'+esc(item.description)+'</p>'+
        (item.content?'<p>'+esc(item.content)+'</p>':"")+
        (linkUrls[i]?'<a class="btn secondary" target="_blank" rel="noopener noreferrer" href="'+esc(linkUrls[i])+
        '">Otvoriť materiál</a>':"")+'</article>';
    }).join("")+'</div>';
  dest.appendChild(section);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run);
else run();
})();