/* StudyHub v2.1.1 shell */
(function(){
"use strict";
function ready(fn){if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",fn);else fn();}
function path(){return location.pathname.replace(/\\/g,"/").replace(/\/$/,"")}
function subjectPage(){return path().includes("/subjects/")}
function root(){return subjectPage()?"../":""}
function href(p){return root()+p}
function safe(v,f){return typeof v==="string"&&v.trim()?v.trim():f}
function icon(n){var m={
home:'<svg viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5v8H14.5v-6h-5v6H3z"/></svg>',
grid:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
card:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h6M7 13h9"/></svg>',
chart:'<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20V7"/></svg>',
map:'<svg viewBox="0 0 24 24"><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15"/></svg>',
help:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.4 2.4 0 1 1 4.2 1.6c-1.2 1.2-2 1.6-2 3M12 17.5h.01"/></svg>',
search:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>',
sun:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>',
moon:'<svg viewBox="0 0 24 24"><path d="M20 15.2A8 8 0 0 1 8.8 4a8.7 8.7 0 1 0 11.2 11.2Z"/></svg>',
bell:'<svg viewBox="0 0 24 24"><path d="M18 9a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7M10 20h4"/></svg>',
user:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
menu:'<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
close:'<svg viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg>',
admin:'<svg viewBox="0 0 24 24"><path d="M12 2 4 5v6c0 5 3.5 9.4 8 11 4.5-1.6 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/></svg>'
};return m[n]||m.grid}
function nav(p,label,i){return '<a class="v2-side-link" href="'+href(p)+'" data-nav-href="'+p+'"><span class="v2-side-icon">'+icon(i)+'</span><span>'+label+'</span></a>'}
function shell(){
 if(document.querySelector(".v2-app-sidebar"))return;
 var name=safe(localStorage.getItem("studyHubProfileName"),"Študent");
 var admin=sessionStorage.getItem("studyHubAdminLoggedIn")==="1"||sessionStorage.getItem("studyHubAdminUnlocked")==="true";
 var adminAction=admin?'<a href="'+href("admin.html")+'">'+icon("admin")+'<span>Admin panel</span></a><button class="v2-admin-logout" type="button">'+icon("admin")+'<span>Odhlásiť admina</span></button>':'<a href="'+href("admin.html")+'">'+icon("admin")+'<span>Admin prihlásenie</span></a>';
 var side=document.createElement("aside");side.className="v2-app-sidebar";side.innerHTML='<div class="v2-sidebar-brand"><a class="v2-brand-link" href="'+href("index.html")+'"><span class="v2-brand-mark"><span class="v2-cap-top"></span><span class="v2-cap-base"></span></span><span class="v2-brand-copy"><strong>StudyHub <em>v2</em></strong><small>Tvoje štúdium na jednom mieste</small></span></a></div><nav class="v2-sidebar-nav">'+nav("index.html","Domov","home")+nav("subjects.html","Predmety","grid")+nav("flashcards.html","Flashcards","card")+nav("results.html","Výsledky","chart")+nav("roadmap.html","Roadmapa","map")+nav("support.html","Podpora","help")+'</nav><div class="v2-sidebar-meta"><div><span>Verzia stránky</span><strong>v2.1.1</strong></div><div><span>Posledná aktualizácia</span><strong>29. 9. 2026</strong></div><p><i></i>Všetko funguje správne</p></div>';
 var top=document.createElement("div");top.className="v2-app-topbar";top.innerHTML='<button class="v2-mobile-nav-btn" type="button" aria-label="Otvoriť menu">'+icon("menu")+'</button><form class="v2-global-search" role="search"><span>'+icon("search")+'</span><input type="search" autocomplete="off" placeholder="Hľadaj predmety, témy, kvízy, PDF, flashcards..."></form><div class="v2-top-actions"><button class="v2-icon-btn v2-theme-btn" type="button" aria-label="Prepnúť vzhľad">'+icon("sun")+'</button><div class="v2-popover-wrap"><button class="v2-icon-btn v2-notification-btn" type="button" aria-expanded="false">'+icon("bell")+'<i></i></button><div class="v2-popover v2-notification-popover" hidden><div class="v2-popover-title"><strong>Upozornenia</strong><span>StudyHub</span></div><div class="v2-notice-item"><b>StudyHub v2.1.1</b><p>Netlify verzia, filtre a admin boli stabilizované.</p></div></div></div><div class="v2-popover-wrap"><button class="v2-account-btn" type="button" aria-expanded="false"><span class="v2-account-avatar">'+icon("user")+'</span><span class="v2-account-copy"><strong class="v2-profile-name">'+name+'</strong><small>Lokálny profil</small></span><b>⌄</b></button><div class="v2-popover v2-account-popover" hidden><div class="v2-account-head"><span class="v2-account-avatar">'+icon("user")+'</span><div><strong class="v2-profile-name">'+name+'</strong><small>Údaje sú zatiaľ lokálne.</small></div></div><a href="'+href("results.html")+'">'+icon("chart")+'<span>Moje výsledky</span></a>'+adminAction+'<button class="v2-edit-profile" type="button">'+icon("user")+'<span>Upraviť meno profilu</span></button></div></div></div>';
 var back=document.createElement("button");back.className="v2-sidebar-backdrop";back.type="button";
 document.body.insertBefore(side,document.body.firstChild);document.body.insertBefore(top,side.nextSibling);document.body.insertBefore(back,top.nextSibling);document.body.classList.add("v2-shell-ready");
}
function active(){
 var file=path().split("/").pop()||"index.html";if(file.indexOf(".")<0)file="index.html";
 document.querySelectorAll(".v2-side-link").forEach(function(a){var h=a.getAttribute("data-nav-href")||"",t=h.split("/").pop(),on=t===file||(h==="subjects.html"&&subjectPage());a.classList.toggle("is-active",on);if(on)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")})
}
function mobile(){
 var b=document.querySelector(".v2-mobile-nav-btn"),back=document.querySelector(".v2-sidebar-backdrop");if(!b||!back)return;
 function set(on){document.body.classList.toggle("v2-sidebar-open",on);b.innerHTML=icon(on?"close":"menu")}
 b.addEventListener("click",function(){set(!document.body.classList.contains("v2-sidebar-open"))});back.addEventListener("click",function(){set(false)});
 document.querySelector(".v2-app-sidebar").addEventListener("click",function(e){if(e.target.closest("a")&&innerWidth<=980)set(false)})
}
function popovers(){
 var nb=document.querySelector(".v2-notification-btn"),np=document.querySelector(".v2-notification-popover"),ab=document.querySelector(".v2-account-btn"),ap=document.querySelector(".v2-account-popover");
 function set(b,p,on){if(!b||!p)return;p.hidden=!on;b.setAttribute("aria-expanded",on?"true":"false")}
 if(nb)nb.addEventListener("click",function(e){e.stopPropagation();set(ab,ap,false);set(nb,np,np.hidden)});
 if(ab)ab.addEventListener("click",function(e){e.stopPropagation();set(nb,np,false);set(ab,ap,ap.hidden)});
 document.addEventListener("click",function(e){if(!e.target.closest(".v2-popover-wrap")){set(nb,np,false);set(ab,ap,false)}});
 var edit=document.querySelector(".v2-edit-profile");if(edit)edit.addEventListener("click",function(){var n=prompt("Meno zobrazené v StudyHube:",safe(localStorage.getItem("studyHubProfileName"),"Študent"));if(n===null)return;n=n.trim().slice(0,24)||"Študent";localStorage.setItem("studyHubProfileName",n);document.querySelectorAll(".v2-profile-name").forEach(function(x){x.textContent=n})});
 var out=document.querySelector(".v2-admin-logout");if(out)out.addEventListener("click",function(){sessionStorage.removeItem("studyHubAdminLoggedIn");sessionStorage.removeItem("studyHubAdminUnlocked");location.href=href("index.html")})
}
function theme(){
 var saved=localStorage.getItem("studyHubTheme");if(saved!=="light"&&saved!=="dark")saved="dark";document.documentElement.dataset.theme=saved;
 var b=document.querySelector(".v2-theme-btn");if(!b)return;function sync(){b.innerHTML=icon(document.documentElement.dataset.theme==="dark"?"sun":"moon")}b.addEventListener("click",function(){var n=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=n;localStorage.setItem("studyHubTheme",n);sync()});sync()
}
function track(){
 document.addEventListener("click",function(e){var a=e.target.closest('a[href*="subjects/"]');if(!a)return;var h=a.getAttribute("href")||"";try{localStorage.setItem("studyHubLastLocation",JSON.stringify({href:h,label:(a.querySelector("h3,strong")||a).textContent.trim(),savedAt:Date.now()}))}catch(x){}});
 if(subjectPage()){var f=path().split("/").pop(),h=document.querySelector(".subject-hero h2,.subject-hero h1");try{localStorage.setItem("studyHubLastLocation",JSON.stringify({href:"subjects/"+f,label:h?h.textContent.replace(/\s+/g," ").trim():document.title.split("|")[0],savedAt:Date.now()}))}catch(x){}}
}
function dashboard(){
 var last;try{last=JSON.parse(localStorage.getItem("studyHubLastLocation")||"null")}catch(e){}
 var link=document.getElementById("v2ContinueLink"),name=document.getElementById("v2LastOpen");if(last&&link){link.href=last.href||"subjects.html";if(name)name.textContent=last.label||"Posledný predmet"}
 var learned={};try{learned=JSON.parse(localStorage.getItem("studyHubProgress")||localStorage.getItem("mikStudyLearned")||"{}")}catch(e){}
 var done=Object.values(learned).filter(Boolean).length,el=document.getElementById("v2DoneSections");if(el)el.textContent=done;
 var results=[];try{results=JSON.parse(localStorage.getItem("studyHubQuizResults")||"[]")}catch(e){}
 var qc=document.getElementById("v2QuizCount"),best=document.getElementById("v2BestQuiz");if(qc)qc.textContent=results.length;if(best)best.textContent=(results.length?Math.max.apply(null,results.map(function(r){return Number(r.percent)||0})):0)+"%";
 document.querySelectorAll("[data-progress-subject]").forEach(function(card){var id=card.getAttribute("data-progress-subject"),keys=Object.keys(learned).filter(function(k){return k.indexOf(id)>=0}),v=keys.length?Math.round(keys.filter(function(k){return learned[k]}).length/keys.length*100):0,lab=card.querySelector(".hub-progress-value"),fill=card.querySelector(".hub-progress span");if(lab)lab.textContent=v+" %";if(fill)fill.style.width=v+"%"})
}
function scrollTop(){var b=document.createElement("button");b.className="v2-scroll-top";b.type="button";b.textContent="↑";document.body.appendChild(b);function s(){b.classList.toggle("visible",scrollY>500)}addEventListener("scroll",s,{passive:true});b.addEventListener("click",function(){scrollTo({top:0,behavior:"smooth"})});s()}
function reveal(){if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;var els=document.querySelectorAll(".hub-panel,.hub-progress-card,.hub-resource-card,.subject-card,.content-block,.roadmap-lane,.admin-card");if(!("IntersectionObserver"in window)){els.forEach(function(x){x.classList.add("v2-visible")});return}var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("v2-visible");o.unobserve(e.target)}})},{threshold:.05});els.forEach(function(x){x.classList.add("v2-reveal");o.observe(x)})}
ready(function(){shell();active();mobile();popovers();theme();track();dashboard();scrollTop();requestAnimationFrame(reveal)});
})();