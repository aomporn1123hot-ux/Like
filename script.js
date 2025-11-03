// ======================================================
// script.js — แบบสอบถาม เชื่อม Firebase 2 โปรเจกต์
// ======================================================

// ฟังก์ชันเปลี่ยนหน้า
function showPage(pageId){
  document.querySelectorAll('.page').forEach(p=>p.classList.add('hidden'));
  const el = document.getElementById(pageId);
  if(el) el.classList.remove('hidden');
}

// ---------------------------
// Firebase เก่า (compat SDK)
// ---------------------------
const oldConfig = {
  apiKey: "AIzaSyDf0D2GLLDHoAVX4zq-tLuVocSmsrFhs38",
  authDomain: "fera-2215e.firebaseapp.com",
  databaseURL: "https://fera-2215e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fera-2215e",
  storageBucket: "fera-2215e.appspot.com",
  messagingSenderId: "810225127285",
  appId: "1:810225127285:web:fa87166d4e3e4770670d3c"
};

const oldApp = firebase.initializeApp(oldConfig, "oldApp");
const oldDB = oldApp.database();
oldApp.auth().signInAnonymously().catch(console.error);

// ---------------------------
// Firebase ใหม่ (modular SDK)
// ---------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

const newConfig = {
  apiKey: "AIzaSyAy88t3sZ_OEoQP0jRxVYKOLG1gucvRGsg",
  authDomain: "fera-ergonomics.firebaseapp.com",
  databaseURL: "https://fera-ergonomics-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fera-ergonomics",
  storageBucket: "fera-ergonomics.firebasestorage.app",
  messagingSenderId: "111595993339",
  appId: "1:111595993339:web:80119030f63a850447985e",
  measurementId: "G-2T11CCPNY7"
};

const newApp = initializeApp(newConfig, "newApp");
const newDB = getDatabase(newApp);

// ======================================================
// เมื่อโหลดหน้า
// ======================================================
window.addEventListener('DOMContentLoaded',()=>{

  // ---- เลือกคะแนน ----
  const optionElements = document.querySelectorAll('.option');
  const glowMap = {
    "5":"rgba(0,200,83,0.85)",
    "4":"rgba(102,187,106,0.9)",
    "3":"rgba(255,167,38,0.95)",
    "2":"rgba(255,235,59,0.95)",
    "1":"rgba(239,83,80,0.95)"
  };

  optionElements.forEach(option=>{
    option.addEventListener('click',()=>{
      const value = option.dataset.value;
      const row = option.closest('.options-row');
      if(!row) return;

      row.querySelectorAll('.option').forEach(sib=>{
        sib.classList.remove('selected');
        sib.style.removeProperty('--glow-color');
      });

      option.classList.add('selected');
      option.style.setProperty('--glow-color',glowMap[value]||'rgba(0,200,83,0.8)');

      const questionDiv = option.closest('.question');
      if(questionDiv){
        const hidden = questionDiv.querySelector('.answer-input');
        if(hidden) hidden.value = value;
      }
    });
  });

  // ---- ส่งข้อมูล ----
  const form = document.getElementById('surveyForm');
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const inputs = document.querySelectorAll('.answer-input');
    for(const inp of inputs){
      if(!inp.value){
        alert('กรุณาตอบแบบสอบถามทุกข้อก่อนส่ง');
        return;
      }
    }

    const answers = {};
    inputs.forEach(inp=>answers[inp.name]=inp.value);
    answers.timestamp = Date.now();

    try{
      // ส่งโปรเจกต์เก่า
      await oldDB.ref("surveyResponses").push(answers);
      // ส่งโปรเจกต์ใหม่
      await push(ref(newDB,"surveyResponses"),answers);

      showPage('page-thankyou');
    }catch(err){
      console.error(err);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่");
    }
  });

  // เปิดหน้าแรก
  showPage('page-intro');
});
