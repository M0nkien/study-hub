/* StudyHub v2.1.1 dynamic search index */
(function(){
"use strict";
var index=window.STUDYHUB_SEARCH_INDEX=window.STUDYHUB_SEARCH_INDEX||[],seen=new Set();
function add(x){if(!x||!x.title)return;var k=[x.type,x.title,x.url].join("|");if(seen.has(k))return;seen.add(k);index.push(x)}
function root(){return location.pathname.replace(/\\/g,"/").includes("/subjects/")?"../":""}
function get(p){return fetch(root()+p,{cache:"no-store"}).then(function(r){if(!r.ok)throw new Error(p);return r.json()})}
function subjectTitle(id,map){return map[id]||id||""}
var names={linux:"Linux",msd:"MSD",ccna:"CCNA",fyzika:"Fyzika",mat:"Matematika",vvs:"VVS",java:"Java",tlac3d:"3D tlač",algebra:"Algebra",praktikum:"Praktikum z programovania",uvod:"Úvod do štúdia"};
Object.keys(names).forEach(function(id){var files={linux:"linux",msd:"msd",ccna:"ccna",fyzika:"fyzika",mat:"mat",vvs:"vvs",java:"java",tlac3d:"3d-tlac",algebra:"algebra",praktikum:"praktikum",uvod:"uvod-do-studia"};add({title:names[id],type:"Predmet",url:"subjects/"+files[id]+".html",subject:names[id],keywords:names[id],snippet:"Predmet StudyHub"})});
Promise.allSettled([
 get("data/subjects.json").then(function(list){list.forEach(function(s){names[s.id]=s.title||names[s.id];add({title:s.title,type:"Predmet",url:s.url,subject:s.short||s.title,keywords:[s.description,s.purpose,(s.tags||[]).join(" "),(s.detailTags||[]).join(" ")].join(" "),snippet:s.description||""})})}),
 get("data/materials.json").then(function(list){list.forEach(function(m){var t=String(m.type||"").toLowerCase(),type=t.includes("zad")?"Zadanie":t.includes("kv")?"Kvíz":(m.url||"").toLowerCase().endsWith(".pdf")||t==="pdf"?"PDF":"Poznámka";add({title:m.title,type:type,url:m.url,subject:subjectTitle(m.subject,names),keywords:(m.tags||[]).join(" "),snippet:(m.tags||[]).join(", ")})})}),
 get("data/quizzes.json").then(function(list){list.forEach(function(q){add({title:q.title,type:"Kvíz",url:"subjects/"+q.subject+".html",subject:subjectTitle(q.subject,names),keywords:q.source||"",snippet:"Kvíz · "+(q.timeLimit||"")+" min"})})}),
 get("data/flashcards.json").then(function(data){Object.keys(data||{}).forEach(function(id){(data[id]||[]).forEach(function(pair,n){add({title:pair[0],type:"Flashcards",url:"flashcards.html",subject:subjectTitle(id,names),keywords:pair[1]||"",snippet:(pair[1]||"").slice(0,120)})})})})
]).then(function(){
 var pages=Object.keys(names).map(function(id){var files={linux:"linux",msd:"msd",ccna:"ccna",fyzika:"fyzika",mat:"mat",vvs:"vvs",java:"java",tlac3d:"3d-tlac",algebra:"algebra",praktikum:"praktikum",uvod:"uvod-do-studia"};return files[id]?{id:id,url:"subjects/"+files[id]+".html"}:null}).filter(Boolean);
 pages.forEach(function(p){fetch(root()+p.url,{cache:"no-store"}).then(function(r){return r.ok?r.text():""}).then(function(html){if(!html)return;var doc=new DOMParser().parseFromString(html,"text/html");doc.querySelectorAll("main h2[id],main h3[id],section[id] h2,section[id] h3").forEach(function(h){var id=h.id||(h.closest("[id]")&&h.closest("[id]").id),title=h.textContent.replace(/\s+/g," ").trim();if(title.length>2&&title.length<120)add({title:title,type:"Téma",url:p.url+(id?"#"+id:""),subject:subjectTitle(p.id,names),keywords:"téma poznámky",snippet:"Téma v predmete "+subjectTitle(p.id,names)})});doc.querySelectorAll('a[href$=".pdf"],a[href*=".pdf?"]').forEach(function(a){var h=a.getAttribute("href")||"",title=a.textContent.replace(/\s+/g," ").trim()||h.split("/").pop();if(h&&!/^https?:/i.test(h)&&!h.startsWith("../"))h="subjects/"+h;add({title:title,type:"PDF",url:h,subject:subjectTitle(p.id,names),keywords:"pdf materiál",snippet:"PDF materiál"})})}).catch(function(){})})
});
})();