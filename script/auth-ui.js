/* StudyHub v2.3 - account menu reflects verified Supabase session and role. */
(function(){
"use strict";
const db=()=>window.studyHubSupabase;
const prefix=()=>location.pathname.replace(/\\/g,"/").includes("/subjects/")?"../":"";
const icon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 4 5v6c0 5 3.5 9.4 8 11 4.5-1.6 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/></svg>';
function menuLink(pop,css,text,href){
 let node=pop.querySelector("."+css);
 if(!node){node=document.createElement("a");node.className=css;pop.appendChild(node);}
 node.href=href;node.innerHTML=icon+"<span>"+text+"</span>";return node;
}
function remove(pop,cls){pop.querySelectorAll("."+cls).forEach(n=>n.remove());}
function updateName(name,subtitle){
 document.querySelectorAll(".v2-profile-name").forEach(n=>n.textContent=name);
 const desc=document.querySelector(".v2-account-copy small");
 if(desc)desc.textContent=subtitle;
}
function guest(pop){
 sessionStorage.removeItem("studyHubAdminUnlocked");
 sessionStorage.removeItem("studyHubAdminLoggedIn");
 if(!pop)return;
 remove(pop,"v23-signout");remove(pop,"v2-admin-logout");
 menuLink(pop,"v23-student-link","Prihlásenie / Registrácia",prefix()+"login.html");
 menuLink(pop,"v23-admin-link","Admin prihlásenie",prefix()+"admin.html");
 remove(pop,"v2-account-admin-link");
 const legacy=pop.querySelector('a[href$="admin.html"]:not(.v23-admin-link)');
 if(legacy)legacy.remove();
 const small=pop.querySelector(".v2-account-head small");
 if(small)small.textContent="Údaje bez prihlásenia zostávajú iba v tomto prehliadači.";
 updateName(localStorage.getItem("studyHubProfileName")||"Študent","Hosť");
}
function signout(pop){
 let b=pop.querySelector(".v23-signout");
 if(!b){b=document.createElement("button");b.className="v23-signout";b.type="button";pop.appendChild(b);}
 b.innerHTML=icon+"<span>Odhlásiť sa</span>";
 b.onclick=async()=>{if(db())await db().auth.signOut();guest(pop);location.assign(prefix()+"index.html");};
}
function loggedIn(pop,user,profile){
 if(!pop)return;
 const admin=profile?.role==="admin";
 if(admin){
   sessionStorage.setItem("studyHubAdminUnlocked","true");
   sessionStorage.setItem("studyHubAdminLoggedIn","1");
 }else{
   sessionStorage.removeItem("studyHubAdminUnlocked");
   sessionStorage.removeItem("studyHubAdminLoggedIn");
 }
 remove(pop,"v2-admin-logout");
 const legacy=pop.querySelector('a[href$="admin.html"]:not(.v23-admin-link)');
 if(legacy)legacy.remove();
 menuLink(pop,"v23-student-link","Moje štúdium",prefix()+"results.html");
 if(admin)menuLink(pop,"v23-admin-link","Admin panel",prefix()+"admin.html");
 else remove(pop,"v23-admin-link");
 signout(pop);
 updateName(profile?.display_name||user.email?.split("@")[0]||"Študent",admin?"Administrátor":"Študentský účet");
 const small=pop.querySelector(".v2-account-head small");
 if(small)small.textContent=user.email||"Prihlásený účet";
}
async function sync(){
 const pop=document.querySelector(".v2-account-popover");
 if(!pop)return;
 if(!db()){guest(pop);return;}
 const s=await db().auth.getSession();
 const user=s.data?.session?.user;
 if(!user){guest(pop);return;}
 const p=await db().from("profiles").select("role,display_name").eq("id",user.id).maybeSingle();
 if(p.error){guest(pop);return;}
 loggedIn(pop,user,p.data);
}
function start(){
 sync();
 if(db())db().auth.onAuthStateChange(()=>setTimeout(sync,30));
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);
else start();
})();