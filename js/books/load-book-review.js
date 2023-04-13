
(function() { 
    $(document).ready(function() { 

        const bookName = $.urlParam('name');
        
        if (bookName) {
            $.getJSON('../../data/books/self-development.json', function(books)  { 
                const currentBook = books.find(book => book.filename === bookName); 
                if (currentBook) {
                    $('#book_info').append(getCourseHTML(currentBook, false));
    
                    $.getJSON(`../../data/books/reviews/${bookName}.json`, function(review) { 
        
                        $('#likes').append(getLikeDislikeHtml(review.likes));
                        $('#dislikes').append(getLikeDislikeHtml(review.dislikes));
            
                                
                        const quotes = review.quotes.map(quote => `<li>${quote}</li>`); 
                        $('#quotes').append(quotes);

                        const notes = review.notes.map(note => `<li>${note}</li>`); 
                        $('#notes').append(notes);
                    });     
                }
                else { 
                    window.location.href = window.location.origin + '/portfolio/html/books'; 
                }
            });    
        } else { 
            window.location.href = window.location.origin + '/portfolio/html/books'; 
        }
  
    });

    function getLikeDislikeHtml(list) { 
        const html = list.map(item => { 
            return `<div class="answer review">${item}</div>`;
        }); 
        return html.join(''); 
    }



    
})(); 
    