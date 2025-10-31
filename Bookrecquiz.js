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
    });

    function showError(message){
        error.textContent = message;
        error.style.display = 'block';
    }

    async function getBookRec(genres, series, length){
        try{
            const primaryGenre = genres[0];
            let query = `subject:${primaryGenre}`;

            if (series === 'series'){
                query+= 'AND (series OR "book 1" OR "book one")';
            }else if (series === 'standalone'){
            }

            const apiURL = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=50`;

            const response = await fetch (apiURL);

            if(!response.ok){
                throw new Error('Failed to fetch data from Open Library');
            }

            const data = await response.json();

            processBookResults(data.docs, genres, series, length);
        } catch (error) {
            console.error('Error fetching book data:', error);
            showError('Sorry, we encountered an error while searching for books. Please try again.');
            loadingDiv.style.display  = 'none';
            quizqs.style.display = 'block';
        }
    }

    function processBookResults(books, genres, series, length){
        let filteredBooks= books.filter(book =>{
            if (series ==='series'){
                return book.title_suggest && (book.title_suggest.toLowerCase().includes('book') || (book.seed && book.seed.some(s => s.includes('series'))));
            } else if (series === 'standalone'){
                return !(book.title_suggest &&
                    (book.title_suggest.toLowerCase().includes('book')|| (book.seed && book.seed.some (s => s.includes('series')))));
            }

            return true;
        });

        if (length){
            filteredBooks = filteredBooks.filter(book => {
                if (book.number_of_pages_median){
                    const pages = book.number_of_pages_median;

                    if (length === 'short' && pages<300) return true;
                    if(length ==='medium' && pages >=300 && pages <= 600)return true;
                    if (length === 'long' && pages > 600) return true;

                    return false;
                };
            });
        }

        if (filteredBooks.length<5){
            filteredBooks = book.slice(0,12);
        }else{
            filteredBooks = filteredBooks.slice (0,12);
        }
        displayBooks(filteredBooks);
    }
    function displayBooks(books){
        booksGrid.innerHTML = '';

        if (books.length ===0){
            books.innerHTML = '<p>No books found matching your options, please try a different preference.</p>';
        } else{
            books.forEach(book =>{
                const bookcard = document.createElement('div');
                bookcard.className='book-card';

                const coverID = book.cover_i;
                const constUrl = coverID ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : '';

                const author = book.author_name ? book.author_name[0]: 'Unknown Author';

                const year = book.first_publish_year || 'Unknown';

                const pages = book.number_of_pages_median || 'Unknown';

                bookcard.innerHTML = `
                <div class = "bookcover">
                ${coverURL ? `<img src="${coverURL}" alt = ${book.title}">`: '<p>No cover available</p>'}
                </div>
                
                `;

            })
        }
    }
})