const options = document.querySelectorAll('.option');

options.forEach(option => {
    option.addEventListener('click', () => {
        const siblings = option.parentElement.querySelectorAll('.option');
        siblings.forEach(sib => sib.classList.remove('selected'));
        option.classList.add('selected');
    });
});

document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let responses = [];
    document.querySelectorAll('.question').forEach(q => {
        const selected = q.querySelector('.option.selected');
        responses.push(selected ? selected.dataset.value : "ไม่ระบุ");
    });
    alert("คำตอบของคุณ: " + responses.join(", "));
});
