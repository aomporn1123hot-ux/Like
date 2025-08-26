function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  const el = document.getElementById(pageId);
  if (el) el.classList.remove('hidden');
}

// จัดการตัวเลือกและการบันทึกค่าใน input ที่ซ่อนอยู่
document.addEventListener('DOMContentLoaded', () => {
  const optionElements = document.querySelectorAll('.option');

  // สี glow ตามค่า (value => color)
  const glowMap = {
    "5": "rgba(0,200,83,0.85)",   // มากที่สุด => เขียว
    "4": "rgba(102,187,106,0.9)", // มาก => เขียวอ่อน
    "3": "rgba(255,167,38,0.95)", // ปานกลาง => ส้ม
    "2": "rgba(255,235,59,0.95)", // น้อย => เหลือง
    "1": "rgba(239,83,80,0.95)"   // น้อยที่สุด => แดง
  };

  optionElements.forEach(option => {
    option.addEventListener('click', () => {
      const value = option.dataset.value;
      const row = option.closest('.options-row');
      if (!row) return;

      // เอา selected ออกจาก siblings
      const siblings = row.querySelectorAll('.option');
      siblings.forEach(sib => {
        sib.classList.remove('selected');
        sib.style.removeProperty('--glow-color');
      });

      // mark selected
      option.classList.add('selected');

      // กำหนดสี glow ตามค่า
      const color = glowMap[value] || 'rgba(0,200,83,0.8)';
      option.style.setProperty('--glow-color', color);

      // บันทึกค่าไปที่ input ซ่อนของคำถามนั้น
      const questionDiv = option.closest('.question');
      if (questionDiv) {
        const hidden = questionDiv.querySelector('.answer-input');
        if (hidden) hidden.value = value;
      }
    });
  });

  // เมื่อกดส่ง
  document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // (เลือกไม่บังคับ) ตรวจสอบว่ามีคำตอบหรือยัง — หากต้องการให้บังคับ ให้ uncomment ข้อความด้านล่าง
    /*
    const inputs = document.querySelectorAll('.answer-input');
    for (const inp of inputs) {
      if (!inp.value) {
        alert('กรุณาตอบแบบสอบถามทุกข้อก่อนส่ง');
        return;
      }
    }
    */

    // ตอนนี้แค่ไปหน้าขอบคุณ
    showPage('page-thankyou');
  });
});

// เปิดหน้าแรกตอนโหลด
showPage('page-intro');
