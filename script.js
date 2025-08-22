function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(pageId).classList.remove('hidden');
}

// จัดการตัวเลือก
document.addEventListener('DOMContentLoaded', () => {
  const options = document.querySelectorAll('.option');
  options.forEach(option => {
    option.addEventListener('click', () => {
      const siblings = option.parentElement.querySelectorAll('.option');
      siblings.forEach(sib => sib.classList.remove('selected'));
      option.classList.add('selected');
    });
  });

  // เมื่อกดส่ง
  document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    showPage('page-thankyou');
  });
});

// เปิดหน้าแรกตอนโหลด
showPage('page-intro');
