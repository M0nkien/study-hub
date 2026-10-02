/* StudyHub v2.3 - one public search index from Supabase without exposing quiz answers. */
(function(){
"use strict";
async function init(){
 const db=window.studyHubSupabase;
 const index=window.STUDYHUB_SEARCH_INDEX;
 if(!db||!Array.isArray(index))return;
 const result=await db.rpc("studyhub_public_search_index");
 if(result.error||!Array.isArray(result.data)){
  console.warn("StudyHub: cloud search fallback",result.error?.message||"Unavailable");
  return;
 }
 const urls=new Set(result.data.filter(x=>x.type==="Predmet").map(x=>String(x.url||"").split("#")[0]));
 // Remove search entries for subjects hidden or unpublished in PostgreSQL.
 const local=index.filter(x=>{
  const url=String(x.url||"").replace(/^\.\.\//,"").split("#")[0];
  return !url.startsWith("subjects/")||urls.has(url);
 });
 const seen=new Set(local.map(x=>[x.type,x.url,x.title].join("|").toLocaleLowerCase("sk-SK")));
 result.data.forEach(item=>{
  const key=[item.type,item.url,item.title].join("|").toLocaleLowerCase("sk-SK");
  if(!seen.has(key)){
   local.push({
    title:item.title||"",type:item.type||"Téma",
    url:item.url||"subjects.html",subject:item.subject||"StudyHub",
    keywords:item.keywords||"",snippet:item.snippet||""
   });
   seen.add(key);
  }
 });
 index.splice(0,index.length,...local);
 document.dispatchEvent(new CustomEvent("studyhub:database-search-ready"));
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);
else init();
})();