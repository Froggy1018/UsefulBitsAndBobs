document.addEventListener('DOMContentLoaded', function(){
    const correctButtons = document.querySelectorAll('.correct');
    const incorrectButtons = document.querySelectorAll('.incorrect');
    const correctEl = document.getElementById('correctCount');
    const incorrectEl = document.getElementById('incorrectCount');
    let correctCount = 0;
    let incorrectCount = 0;

    function handleAnswerClick(btn, isCorrect){
        let question = btn.closest('div');
        while(question && !question.querySelector('.feedback') && question !== document.body){
            question = question.parentElement;
        }
        
        if(!question) question = btn.parentElement;

        if(question.dataset.answered === 'true') return;
        question.dataset.answered = 'true';
        
        btn.style.backgroundColor = isCorrect ? 'green' : 'red';
        const fb = question.querySelector('.feedback');
        if(fb) fb.innerHTML = isCorrect ? 'Correct!' : 'Incorrect...';

        const buttons = question.querySelectorAll('button');
        buttons.forEach(b => b.disabled = true);
        
        if(isCorrect){
            correctCount++;
            if(correctEl) correctEl.textContent = 'Correct: ' + correctCount;
        } else {
            incorrectCount++;
            if(incorrectEl) incorrectEl.textContent = 'Incorrect: ' + incorrectCount;
        }
    }

    correctButtons.forEach(btn => btn.addEventListener('click', () => handleAnswerClick(btn, true)));
    incorrectButtons.forEach(btn => btn.addEventListener('click', () => handleAnswerClick(btn, false)));
        });

