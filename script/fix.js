/* StudyHub v2.1.1 bootstrap for legacy subject pages */
(function(){
"use strict";
function subjectPage(){return location.pathname.replace(/\\/g,"/").includes("/subjects/")}
function cleanup(){document.querySelectorAll(".subject-card").forEach(function(c){var s=c.querySelectorAll(".subject-status");s.forEach(function(x){x.remove()});var r=c.querySelectorAll(".subject-state-ribbon");r.forEach(function(x,i){if(i>0)x.remove()})})}
function addStyle(h){if(document.querySelector('link[href*="style/v2.css"]'))return;var l=document.createElement("link");l.rel="stylesheet";l.href=h;document.head.appendChild(l)}
function load(src,done){if(document.querySelector('script[src*="'+src.split("/").pop()+'"]')){if(done)done();return}var s=document.createElement("script");s.src=src;s.onload=function(){if(done)done()};s.onerror=function(){console.error("StudyHub: nepodarilo sa načítať",src)};document.body.appendChild(s)}
function bootstrap(){cleanup();if(!subjectPage())return;addStyle("../style/v2.css?v=studyhub-v211-20260929");load("../script/search-index.js?v=studyhub-v211-20260929",function(){load("../script/v2.js?v=studyhub-v211-20260929",function(){load("../script/v21.js?v=studyhub-v211-20260929")})})}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bootstrap);else bootstrap();
})();