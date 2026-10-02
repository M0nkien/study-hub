import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {Script,createContext} from "node:vm";

const source=readFileSync("script/admin.js","utf8");

function node(initial={}) {
 const classes=new Set(initial.classes||[]);
 const attributes={};
 return {
  hidden:initial.hidden??false,
  inert:initial.inert??false,
  disabled:false,
  value:initial.value||"",
  textContent:"",
  classList:{
   add(name){classes.add(name);},
   remove(name){classes.delete(name);},
   toggle(name,on){if(on)classes.add(name);else classes.delete(name);},
   contains(name){return classes.has(name);}
  },
  setAttribute(name,value){attributes[name]=value;},
  removeAttribute(name){delete attributes[name];},
  getAttribute(name){return attributes[name];},
  addEventListener(){},
  querySelector(){return null;},
 };
}
async function check(role,userPresent) {
 const nodes={
  adminLogin:node({hidden:false}),
  adminContent:node({hidden:true,inert:true,classes:["hidden"]}),
  adminLoginMessage:node({hidden:true}),
  adminSessionEmail:node(),
  adminSessionName:node(),
  adminLoginForm:node(),
  adminLoginBtn:node()
 };
 const user={id:"00000000-0000-4000-8000-000000000001",email:"user@example.test"};
 let logoutCalls=0;
 const db={
  auth:{
   async getSession(){return {data:{session:userPresent?{user}:null},error:null};},
   async getUser(){return {data:{user},error:null};},
   onAuthStateChange(){return {data:{subscription:{unsubscribe(){}}}};},
   async signOut(){logoutCalls++;return {error:null};}
  },
  from(table){
   const query={
    select(){return query;},
    eq(){return query;},
    order(){return query;},
    then(resolve,reject){return Promise.resolve({data:[],error:null}).then(resolve,reject);},
    async maybeSingle(){
     return {data:table==="profiles"?{id:user.id,display_name:"Test účet",role}:null,error:null};
    }
   };
   return query;
  }
 };
 const handlers={};
 const document={
  readyState:"loading",
  getElementById(id){return nodes[id]||null;},
  querySelectorAll(){return [];},
  addEventListener(type,fn){handlers[type]=fn;}
 };
 const sessionStorage={
  data:new Map(),
  setItem(k,v){this.data.set(k,v);},
  removeItem(k){this.data.delete(k);},
  getItem(k){return this.data.get(k)||null;}
 };
 const context=createContext({
  window:{studyHubSupabase:db},
  document,sessionStorage,
  console,Promise,Date,setTimeout,clearTimeout
 });
 new Script(source,{filename:"script/admin.js"}).runInContext(context);
 assert.ok(handlers.DOMContentLoaded,"Admin init must be registered");
 await handlers.DOMContentLoaded();

 if(userPresent&&role==="admin"){
  assert.equal(nodes.adminLogin.hidden,true,"Admin login must disappear after sign-in");
  assert.equal(nodes.adminContent.hidden,false,"Verified Admin must see editor");
  assert.equal(nodes.adminContent.inert,false,"Verified Admin editor must be interactive");
  assert.equal(nodes.adminContent.classList.contains("hidden"),false);
 }else{
  assert.equal(nodes.adminLogin.hidden,false,"Non-admin must see login");
  assert.equal(nodes.adminContent.hidden,true,"Non-admin must not see editor");
  assert.equal(nodes.adminContent.inert,true,"Non-admin editor must not be interactive");
  assert.equal(nodes.adminContent.getAttribute("aria-hidden"),"true");
 }
 assert.equal(logoutCalls,0,"Checking Admin role must not log out students");
 return true;
}

await check("admin",true);
await check("student",true);
await check(null,false);
console.log("PASS: Admin login hides after verified sign-in; guests and students cannot see editor.");
