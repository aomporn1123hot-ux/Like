function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  const el = document.getElementById(pageId);
  if (el) el.classList.remove('hidden');
}

// ------------------ 🔥 Firebase โปรเจกต์เก่า ------------------
const firebaseConfigOld = {
  apiKey: "AIzaSyDf0D2GLLDHoAVX4zq-tLuVocSmsrFhs38",
  authDomain: "fera-2215e.firebaseapp.com",
  databaseURL: "https://fera-2215e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fera-2215e",
  storageBucket: "fera-2215e.appspot.com",
  messagingSenderId: "810225127285",
  appId: "1:810225127285:web:fa87166d4e3e4770670d3c"
};

const appOld = firebase.initializeApp(firebaseConfigOld, "old");
const dbOld = appOld.database();
const authOld = appOld.auth();
authOld.signInAnonymously().catch(console.error);

// ------------------ 🔥 Firebase โปรเจกต์ใหม่ ------------------
const firebaseConfigNew = {
  apiKey: "AIzaSyAy88t3sZ_OEoQP0jRxVYKOLG1gucvRGsg",
  authDomain: "fera-ergonomics.firebaseapp.com",
  databaseURL: "https://fera-ergonomics-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fera-ergonomics",
  storageBucket: "fera-ergonomics.firebasestorage.app",
  messagingSenderId: "111595993339",
  appId: "1:111595993339:web:80119030f63a850447985e",
  measurementId: "G-2T11CCPNY7"
};

const appNew = firebase.initializeApp(firebaseConfigNew, "new");
const dbNew = appNew.database();
const authNew = appNew.auth();
authNew.signInAnonymously().catch(console.error);

// ------------------ 🧩 การทำงานของฟอร์ม ------------------
document.addEventListener('DOMContentLoaded', () => {
  const optionElements = document.querySelectorAll('.option');
  const glowMap = {
    "5": "rgba(0,200,83,0.85)",
    "4": "rgba(102,187,106,0.9)",
    "3": "rgba(255,167,38,0.95)",
    "2": "rgba(255,235,59,0.95)",
    "1": "rgba(239,83,80,0.95)"
  };

  optionElements.forEach(option => {
    option.addEventListener('click', () => {
      const value = option.dataset.value;
      const row = option.closest('.options-row');
      if (!row) return;

      row.querySelectorAll('.option').forEach(sib => {
        sib.classList.remove('selected');
        sib.style.removeProperty('--glow-color');
      });

      option.classList.add('selected');
      option.style.setProperty('--glow-color', glowMap[value]);

      const questionDiv = option.closest('.question');
      const hidden = questionDiv.querySelector('.answer-input');
      hidden.value = value;
    });
  });

  document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const inputs = document.querySelectorAll('.answer-input');
    for (const inp of inputs) {
      if (!inp.value) {
        alert('กรุณาตอบแบบสอบถามทุกข้อก่อนส่ง');
        return;
      }
    }

    const answers = {};
    inputs.forEach(inp => answers[inp.name] = inp.value);
    answers.timestamp = Date.now();

    const saveOld = dbOld.ref("surveyResponses").push(answers);
    const saveNew = dbNew.ref("surveyResponses").push(answers);

    Promise.allSettled([saveOld, saveNew])
      .then(() => showPage('page-thankyou'))
      .catch(err => {
        console.error("บันทึกข้อมูลล้มเหลว:", err);
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      });
  });
});

// เปิดหน้าแรก
showPage('page-intro');
