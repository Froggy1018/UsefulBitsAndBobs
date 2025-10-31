document.addEventListener('DOMContentLoaded', function(){
    const quizbook = document.getElementById('quizbook');
    const quizqs=document.getElementById('quizqs');
    const loadingDiv = document.getElementById('loading');
    const resultsDiv = document.getElementById('results');
    const books = document.getElementById('books');
    const error = document.getElementById('error');
    const backtoform = document.getElementById('backtoform')

    quizbook.addEventListener('submit', function(e){
        e.preventDefault();

        const genreCheckboxes = document.querySelectorAll('input[name="genre"]: checked');
        const seriesType = document.querySelector('input [name="type"]:checked');
        const lengthType = document.querySelector('input [name="length"]:checked');

        if (genreCheckboxes.length === 0){
            showError('Please select at least one genre.');
            return;
        }

        if (!seriesType){
            showError('Please select either one of the options.');
            return;
        }

        if(!lengthType){
            showError('Please select either one of the options');
            return;
        }

        quizqs.style.display='none';
        loadingDiv.style.display = 'block';
        resultsDiv.style.display= 'none';
        error.style.display='none';
    })
})