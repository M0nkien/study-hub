/* StudyHub v2.3: secure cloud content studio; mounted only inside authenticated Admin page. */
(function () {
  "use strict";

  const TYPES = {
    subjects: {label:"Predmety", fields:["name","short_name","slug","description","status","href","color","sort_order"]},
    topics: {label:"Témy", fields:["subject_id","title","slug","summary","content","sort_order"]},
    materials: {label:"Materiály/PDF", fields:["subject_id","topic_id","title","type","description","content","url"]},
    quiz_questions: {label:"Kvízové otázky",fields:["subject_id","question","answers","explanation"]},
    flashcards: {label:"Flashcards",fields:["subject_id","topic_id","front","back"]}
  };
  const LABELS={name:"Názov predmetu",short_name:"Skratka",slug:"Identifikátor (slug)",
    description:"Popis",status:"Stav",href:"Cesta na predmet",color:"Farba",
    sort_order:"Poradie",subject_id:"Predmet",topic_id:"Téma (voliteľná)",
    title:"Názov",summary:"Zhrnutie",content:"Obsah poznámky",
    type:"Typ materiálu",url:"Externý odkaz",question:"Otázka",
    answers:"Odpovede (správnu označ *)",explanation:"Vysvetlenie",
    front:"Predná strana",back:"Zadná strana"};
  const TYPE_ORDER=Object.keys(TYPES);
  const LONG=new Set(["description","summary","content","question","answers","explanation","front","back"]);
  const FILE_TYPES=new Set(["application/pdf","image/png","image/jpeg","image/webp","text/plain"]);
  const TABLES=["subjects","topics","materials","quiz_questions","flashcards","roadmap_items","changelog_entries"];
  let data={}, user=null, active="subjects", editing=null, host=null, previousVersions=[], materialVersions=[];

  const db=()=>window.studyHubSupabase;
  const h=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const $=(sel,root=host)=>root?.querySelector(sel);
  const titleOf=(item,table)=>item.name||item.title||item.question||item.front||item.version||table;
  const statusOf=item=>item.publication_status||"published";
  const published=s=>s==="published"?"Publikované":"Koncept";

  function notify(message,isError) {
    const box=$("[data-v23-message]");
    if(!box)return;
    box.textContent=message;
    box.style.color=isError?"#fca5a5":"#86efac";
  }
  async function isAdmin(){
    const session=await db()?.auth.getSession();
    const me=session?.data?.session?.user;
    if(!me)return null;
    const profile=await db().from("profiles").select("role,display_name").eq("id",me.id).maybeSingle();
    return profile.data?.role==="admin"?me:null;
  }
  async function fetchAll(){
    const results=await Promise.all(TABLES.map(t=>db().from(t).select("*")));
    const failed=results.find(x=>x.error);
    if(failed)throw failed.error;
    TABLES.forEach((t,i)=>data[t]=results[i].data||[]);
    const audit=await db().from("content_versions").select("id,entity_type,entity_id,action,snapshot,changed_at,changed_by").order("id",{ascending:false}).limit(40);
    previousVersions=audit.data||[];
    const history=await db().from("content_versions").select("id,entity_type,entity_id,action,snapshot,changed_at,changed_by")
      .eq("entity_type","materials").order("id",{ascending:false}).limit(500);
    materialVersions=history.data||[];
  }
  function setStats(){
    const stats=[
      ["Predmety",data.subjects?.length||0],["Témy",data.topics?.length||0],
      ["Materiály",data.materials?.length||0],["Otázky",data.quiz_questions?.length||0],
      ["Flashcards",data.flashcards?.length||0],["Koncepty",
        TABLES.reduce((n,t)=>n+(data[t]||[]).filter(x=>statusOf(x)==="draft").length,0)]
    ];
    $("[data-v23-stats]").innerHTML=stats.map(([a,b])=>
      '<div class="v23-stat"><strong>'+b+'</strong><span>'+a+"</span></div>").join("");
    const subjectRows=data.subjects||[];
    const empty=subjectRows.filter(s=>!["topics","materials","quiz_questions","flashcards"].some(
      t=>(data[t]||[]).some(x=>x.subject_id===s.id&&statusOf(x)==="published")));
    const warnings=[];
    if(empty.length)warnings.push("Bez publikovaného obsahu: "+empty.map(s=>s.name).join(", "));
    const drafts=stats[5][1];
    if(drafts)warnings.push("Na publikovanie čaká "+drafts+" konceptov.");
    if(!warnings.length)warnings.push("Všetky predmety majú publikovaný obsah a neevidujeme koncepty.");
    $("[data-v23-warnings]").replaceChildren(...warnings.map(x=>{
      const p=document.createElement("p");p.textContent=x;return p;
    }));
  }
  function renderRecent(){
    const node=$("[data-v23-recent]");
    if(!previousVersions.length){node.textContent="Zatiaľ žiadne zmeny v histórii.";return;}
    node.innerHTML=previousVersions.slice(0,8).map(v=>'<div class="v23-version"><div><strong>'+
      h(v.entity_type)+" · "+h(v.action)+"</strong><small>"+h(titleOf(v.snapshot||{},v.entity_type))+
      ' · '+h(new Date(v.changed_at).toLocaleString("sk-SK"))+
      '</small></div></div>').join("");
  }
  function option(val,label,current){return '<option value="'+h(val)+'"'+(String(val)===String(current)?" selected":"")+">"+h(label)+"</option>";}
  function field(name,current){
    const value=current?.[name]??"";
    const label=h(LABELS[name]||name);
    const attrs='name="'+name+'" id="v23-'+name+'"';
    if(name==="subject_id"){
      return '<label>'+label+'<select '+attrs+' required>'+
        option("","Vyber predmet",value)+(data.subjects||[]).map(x=>option(x.id,x.name,value)).join("")+
        '</select></label>';
    }
    if(name==="topic_id"){
      const sid=$("[name=subject_id]")?.value||current?.subject_id||"";
      return '<label>'+label+'<select '+attrs+'>'+option("","Bez konkrétnej témy",value)+
        (data.topics||[]).filter(x=>!sid||x.subject_id===sid).map(x=>option(x.id,x.title,value)).join("")+
        '</select></label>';
    }
    if(name==="status"){
      return '<label>'+label+'<select '+attrs+'>'+
        ["hotove","rozpracovane","pripravovane"].map(x=>option(x,x,value||"pripravovane")).join("")+'</select></label>';
    }
    if(name==="type"){
      return '<label>'+label+'<select '+attrs+'>'+
        ["poznamka","pdf","image","zadanie","kviz","tahak","odkaz"].map(x=>option(x,x,value||"poznamka")).join("")+'</select></label>';
    }
    if(name==="answers"){
      const txt=Array.isArray(value)?value.map(x=>(x.correct?"*":"")+x.text).join("\n"):value;
      return '<label>'+label+'<textarea '+attrs+' rows="5" placeholder="*Správna odpoveď&#10;Nesprávna odpoveď">'+h(txt)+'</textarea></label>';
    }
    if(LONG.has(name))return '<label>'+label+'<textarea '+attrs+' rows="'+(name==="content"?9:3)+'">'+h(value)+'</textarea></label>';
    return '<label>'+label+'<input '+attrs+' '+(name==="sort_order"?'type="number"':'type="text"')+
      ' value="'+h(value)+'" '+(["name","slug","title","question","front","back"].includes(name)?"required":"")+'></label>';
  }
  function renderForm(){
    const type=TYPES[active];
    const current=(data[active]||[]).find(x=>x.id===editing);
    const node=$("[data-v23-form]");
    node.innerHTML='<form id="v23-editor-form"><div class="v23-edit-head"><h3>'+
      (editing?"Upraviť: ":"Pridať: ")+h(type.label)+'</h3>'+
      '<button class="btn secondary" type="button" data-cancel-edit>Nová položka</button></div>'+
      '<div class="v23-fields">'+type.fields.map(n=>field(n,current)).join("")+
      '<label>Publikovanie<select name="publication_status">'+
        option("draft","Koncept",current?.publication_status||"draft")+
        option("published","Publikované",current?.publication_status||"draft")+'</select></label>'+
      '<label class="v23-checkbox"><input type="checkbox" name="visible" '+
        (current?.visible!==false?"checked":"")+'> Zobraziť, keď je publikované</label>'+
      (active==="materials"?'<label>PDF alebo obrázok (max. 10 MB)<input name="upload_file" type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,.txt"></label>':"")+
      '</div><button class="btn primary" type="submit">'+(editing?"Uložiť úpravy":"Uložiť do databázy")+
      '</button></form>';
    $("[data-cancel-edit]",node).onclick=()=>{editing=null;renderForm();};
    const subjectSelect=$("[name=subject_id]",node);
    if(subjectSelect)subjectSelect.addEventListener("change",()=>{
      const topic=$("[name=topic_id]",node);
      if(topic)topic.innerHTML=option("","Bez konkrétnej témy","")+
        (data.topics||[]).filter(x=>x.subject_id===subjectSelect.value)
          .map(x=>option(x.id,x.title,"")).join("");
    });
    $("#v23-editor-form",node).addEventListener("submit",save);
  }
  async function uploadFile(file,subjectId){
    if(!FILE_TYPES.has(file.type)||file.size>10485760)throw new Error("Povolené sú PDF, obrázky a TXT do 10 MB.");
    const subject=(data.subjects||[]).find(x=>x.id===subjectId);
    if(!subject)throw new Error("Vyber predmet.");
    const extension=({"application/pdf":"pdf","image/png":"png","image/jpeg":"jpg","image/webp":"webp","text/plain":"txt"})[file.type];
    const path=subject.slug+"/"+crypto.randomUUID()+"."+extension;
    const result=await db().storage.from("studyhub-materials").upload(path,file,{contentType:file.type,upsert:false});
    if(result.error)throw result.error;
    return path;
  }
  async function save(event){
    event.preventDefault();
    const form=event.currentTarget;
    const button=form.querySelector('button[type="submit"]');
    button.disabled=true;
    let uploadedPath="";
    try{
      const fd=new FormData(form),payload={};
      TYPES[active].fields.forEach(k=>payload[k]=String(fd.get(k)||"").trim());
      if("subject_id" in payload&&!payload.subject_id)throw new Error("Vyber predmet.");
      if("topic_id" in payload&&!payload.topic_id)payload.topic_id=null;
      if("sort_order" in payload)payload.sort_order=Number(payload.sort_order)||100;
      if(active==="quiz_questions"){
        payload.answers=payload.answers.split(/\r?\n/).map(s=>s.trim()).filter(Boolean)
          .map(s=>({text:s.replace(/^\*/,"").trim(),correct:s.startsWith("*")}));
        if(payload.answers.length<2||payload.answers.filter(x=>x.correct).length!==1)
          throw new Error("Otázka musí mať aspoň dve možnosti a presne jednu správnu odpoveď.");
      }
      if(active==="subjects"&& !/^[a-z0-9-]+$/.test(payload.slug))
        throw new Error("Slug môže obsahovať iba malé písmená, číslice a pomlčky.");
      if(active==="topics"&& !/^[a-z0-9-]+$/.test(payload.slug))
        throw new Error("Slug môže obsahovať iba malé písmená, číslice a pomlčky.");
      payload.publication_status=String(fd.get("publication_status")||"draft");
      payload.visible=fd.get("visible")==="on";
      if(active==="materials"){
        const file=fd.get("upload_file");
        if(file instanceof File&&file.size){
          uploadedPath=await uploadFile(file,payload.subject_id);
          payload.storage_path=uploadedPath;
          payload.type=file.type==="application/pdf"?"pdf":"image";
        }
        if(!payload.url)payload.url=null;
      }
      if(!editing&&active!=="subjects")payload.created_by=user.id;
      if(active==="subjects"&&!payload.href)payload.href="subject.html?slug="+payload.slug;
      const op=editing?db().from(active).update(payload).eq("id",editing):db().from(active).insert(payload);
      const result=await op.select("id").single();
      if(result.error)throw result.error;
      editing=null;await refresh();
      notify("Uložené do Supabase. História zmien sa zachovala.");
    }catch(err){
      if(uploadedPath)await db().storage.from("studyhub-materials").remove([uploadedPath]);
      notify(err.message||"Uloženie zlyhalo.",true);
    }finally{button.disabled=false;}
  }
  function renderList(){
    const node=$("[data-v23-list]");
    const rows=(data[active]||[]).slice().sort((a,b)=>String(b.updated_at||"").localeCompare(String(a.updated_at||"")));
    node.innerHTML=rows.length?rows.map(item=>'<article class="v23-list-row" data-id="'+h(item.id)+'">'+
      '<div><strong>'+h(titleOf(item,active))+'</strong><small>'+
      h(published(statusOf(item)))+' · '+h(new Date(item.updated_at||item.created_at||Date.now()).toLocaleDateString("sk-SK"))+
      '</small></div><button type="button" class="btn secondary" data-edit>Upraviť</button>'+
      '<button type="button" class="btn secondary" data-delete>Vymazať</button></article>').join(""):
      '<p>Zatiaľ tu nie je žiadny obsah.</p>';
    node.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>{
      editing=b.closest("[data-id]").dataset.id;renderForm();$("#v23-editor-form")?.scrollIntoView({behavior:"smooth",block:"start"});
    });
    node.querySelectorAll("[data-delete]").forEach(b=>b.onclick=async()=>{
      const id=b.closest("[data-id]").dataset.id;
      if(!window.confirm("Naozaj vymazať? História zmeny sa uloží."))return;
      b.disabled=true;
      const result=await db().from(active).delete().eq("id",id);
      if(result.error){notify(result.error.message,true);b.disabled=false;return;}
      if(editing===id)editing=null;
      await refresh();notify("Položka bola vymazaná. História zostala.");
    });
  }
  function renderHistory(){
    const selector=$("[data-v23-restore-select]");
    const chosen=selector?.value||"";
    const sources=new Map((data.materials||[]).map(m=>[m.id,m.title]));
    materialVersions.forEach(v=>{
      if(!sources.has(v.entity_id))sources.set(v.entity_id,v.snapshot?.title||"Vymazaný materiál");
    });
    selector.innerHTML=option("","Vyber materiál...",chosen)+
      [...sources.entries()].map(([id,title])=>option(id,title,chosen)).join("");
    const versions=materialVersions.filter(v=>v.entity_id===selector.value);
    const node=$("[data-v23-history]");
    node.innerHTML=versions.length?versions.map(v=>'<article class="v23-version"><div><strong>'+
      h(v.action)+'</strong><small>'+h(new Date(v.changed_at).toLocaleString("sk-SK"))+
      '</small></div><button class="btn secondary" data-restore="'+v.id+'">Obnoviť</button></article>').join(""):
      '<p>Vyber materiál, aby sa zobrazili dostupné verzie.</p>';
    node.querySelectorAll("[data-restore]").forEach(b=>b.onclick=async()=>{
      if(!window.confirm("Obnoviť túto staršiu verziu materiálu?"))return;
      const result=await db().rpc("restore_material_version",{p_version_id:Number(b.dataset.restore)});
      if(result.error){notify(result.error.message,true);return;}
      await refresh();notify("Materiál bol obnovený.");
    });
  }
  async function exportJson(){
    const dump={format:"studyhub-export-v2.3",exported_at:new Date().toISOString(),tables:{},history:[]};
    let offset=0;
    for(;;){
      const page=await db().from("content_versions").select("*").order("id",{ascending:true})
        .range(offset,offset+999);
      if(page.error){notify(page.error.message,true);return;}
      dump.history.push(...(page.data||[]));
      if((page.data||[]).length<1000)break;
      offset+=1000;
    }
    TABLES.forEach(t=>dump.tables[t]=data[t]||[]);
    const payload=JSON.stringify(dump,null,2);
    const url=URL.createObjectURL(new Blob([payload],{type:"application/json"}));
    const link=document.createElement("a");
    link.href=url;link.download="studyhub-content-"+new Date().toISOString().slice(0,10)+".json";
    document.body.appendChild(link);link.click();link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1500);
    notify("Export obsahu hotový. Ide o JSON export, nie úplnú zálohu PostgreSQL.");
  }
  function mount(){
    if(host)return;
    const grid=document.querySelector("#adminContent .admin-grid");
    if(!grid)return;
    host=document.createElement("section");
    host.className="v23-admin-studio";
    host.innerHTML=
      '<div class="v23-studio-heading"><div><p class="small-title">StudyHub v2.3</p>'+
      '<h2>Admin Content Studio</h2><p>Cloudový editor, koncepty, posledné úpravy a zálohy obsahu.</p></div>'+
      '<button type="button" class="btn secondary" data-v23-refresh>Obnoviť</button></div>'+
      '<div class="v23-stat-grid" data-v23-stats></div>'+
      '<div class="v23-dual"><section class="v23-panel"><h3>Upozornenia na obsah</h3>'+
      '<div data-v23-warnings></div></section><section class="v23-panel"><h3>Posledné úpravy</h3>'+
      '<div data-v23-recent></div></section></div>'+
      '<section class="v23-panel"><h3>Kompletný editor</h3>'+
      '<div class="v23-tabs" data-v23-tabs></div>'+
      '<div class="v23-editor-layout"><div data-v23-form></div><div>'+
      '<h3>Uložené položky</h3><div class="v23-list" data-v23-list></div></div></div>'+
      '<p data-v23-message role="status" aria-live="polite"></p></section>'+
      '<div class="v23-dual"><section class="v23-panel"><h3>Obnovenie materiálu</h3>'+
      '<select aria-label="Materiál" data-v23-restore-select></select>'+
      '<div data-v23-history></div></section><section class="v23-panel"><h3>Export a zálohy</h3>'+
      '<p>Export aktuálneho obsahu do JSON. Každé budúce vytvorenie, úprava a vymazanie má aj databázový audit.</p>'+
      '<button class="btn primary" type="button" data-v23-export>Exportovať obsah</button>'+
      '<p><small>Úplné automatické zálohovanie databázy nastav samostatne v Supabase.</small></p></section></div>';
    grid.parentNode.insertBefore(host,grid);
    const advanced=document.createElement("details");
    advanced.className="v23-advanced-tools";
    const summary=document.createElement("summary");
    summary.textContent="Ďalšie nástroje: Roadmapa, Changelog a rýchly editor";
    advanced.appendChild(summary);
    host.insertAdjacentElement("afterend",advanced);
    advanced.appendChild(grid);
    const tabs=$("[data-v23-tabs]");
    tabs.innerHTML=TYPE_ORDER.map(t=>'<button class="btn secondary" data-v23-type="'+t+'">'+TYPES[t].label+"</button>").join("");
    tabs.querySelectorAll("[data-v23-type]").forEach(b=>b.onclick=()=>{
      active=b.dataset.v23Type;editing=null;render();
    });
    $("[data-v23-refresh]").onclick=refresh;
    $("[data-v23-export]").onclick=exportJson;
    $("[data-v23-restore-select]").onchange=renderHistory;
  }
  function render(){
    setStats();renderRecent();
    $("[data-v23-tabs]").querySelectorAll("button").forEach(b=>
      b.classList.toggle("is-active",b.dataset.v23Type===active));
    renderForm();renderList();renderHistory();
  }
  async function refresh(){
    try{await fetchAll();render();}catch(e){notify(e.message||"Chyba načítania.",true);}
  }
  async function init(){
    if(!db()||!document.body.classList.contains("admin-page"))return;
    user=await isAdmin();
    if(!user)return;
    mount();await refresh();
  }
  function start(){
    init();
    if(!db())return;
    db().auth.onAuthStateChange((event)=>{
      if(event==="SIGNED_OUT"&&host){host.remove();host=null;user=null;}
      if(event==="SIGNED_IN"||event==="INITIAL_SESSION")
        window.setTimeout(init,60);
    });
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);
  else start();
})();