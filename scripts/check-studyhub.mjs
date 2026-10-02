import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, extname } from "node:path";
import { Script } from "node:vm";

const htmlPages=[
 "index.html","subjects.html","flashcards.html","results.html","roadmap.html",
 "changelog.html","support.html","admin.html","login.html","reset-password.html","subject.html",
 ...["3d-tlac","algebra","ccna","fyzika","java","linux","mat","msd",
    "praktikum","uvod-do-studia","vvs"].map(name=>"subjects/"+name+".html")
];
const jsFiles=[
 "script/admin.js","script/admin-v23.js","script/auth-page.js","script/auth-reset.js","script/supabase-client.js",
 "script/supabase-config.js","script/v2.js","script/v21.js",
 "script/auth-ui.js","script/cloud-sync.js","script/cloud-content.js",
 "script/cloud-topic-progress.js","script/cloud-quiz.js","script/cloud-flashcards.js",
 "script/cloud-results.js","script/system-health.js","script/database-subjects.js",
 "script/database-search.js","script/database-roadmap.js","script/database-changelog.js",
 "script/database-activity.js","script/progress.js","script/checklist.js",
 "script/quiz-engine.js","script/flashcards.js"
];
const errors=[];
for(const file of jsFiles){
 try{
  if(!existsSync(file))throw new Error("Missing file");
  new Script(readFileSync(file,"utf8"),{filename:file});
 }catch(e){errors.push("JS "+file+": "+e.message);}
}
for(const file of htmlPages){
 if(!existsSync(file)){errors.push("Missing HTML: "+file);continue;}
 const html=readFileSync(file,"utf8");
 const scriptPaths=[...html.matchAll(/<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/gi)]
  .map(match=>match[1].split(/[?#]/)[0]);
 const cssPaths=[...html.matchAll(/<link\b[^>]*\bhref\s*=\s*["']([^"']+\.css(?:\?[^"']*)?)["']/gi)]
  .map(match=>match[1].split(/[?#]/)[0]);
 for(const path of [...scriptPaths,...cssPaths]){
  if(/^(?:https?:|\/\/|data:)/i.test(path))continue;
  const target=resolve(dirname(file),path);
  if(!existsSync(target))errors.push("Missing "+path+" in "+file);
 }
 for(const path of new Set(scriptPaths)){
  if(scriptPaths.filter(item=>item===path).length>1)errors.push("Duplicate "+path+" in "+file);
 }
 if(!html.includes("</body>")||!html.includes("</html>"))errors.push("Unclosed document: "+file);
 if(!html.includes("v23.css"))errors.push("v2.3 styles missing: "+file);
 if(!scriptPaths.some(path=>path.endsWith("supabase-client.js")))errors.push("Supabase missing: "+file);
}
const admin=readFileSync("admin.html","utf8");
const login=readFileSync("login.html","utf8");
const adminJs=readFileSync("script/admin.js","utf8");
const authPage=readFileSync("script/auth-page.js","utf8");
if(/Predvolené heslo|študentsk[eé] heslo:\\s*studyhub/i.test(admin))
 errors.push("Admin login leaks an example/default password.");
if(!admin.includes('id="adminContent" hidden inert'))
 errors.push("Admin content must start hidden and inert.");
if(!admin.includes('type="password"'))
 errors.push("Admin login must mask the password.");
if(!adminJs.includes("auth.getUser()") || !adminJs.includes('profile.role !== "admin"'))
 errors.push("Admin must verify Supabase user and admin role.");
if(!login.includes('data-auth-mode="register"') || !login.includes('id="studentPasswordConfirm"'))
 errors.push("Student registration and password confirmation are required.");
if(!authPage.includes("db.auth.signUp") || !authPage.includes("display_name"))
 errors.push("Student registration must use Supabase Auth with display name.");

if(errors.length){
 errors.forEach(error=>console.error(error));
 process.exitCode=1;
}else console.log("PASS: "+jsFiles.length+" JavaScript files, "+htmlPages.length+" HTML pages and role-aware Admin/registration guards.");
