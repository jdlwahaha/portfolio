
(function() { 
    $(document).ready(function() { 

        const bookName = $.urlParam('name');
        
        if (bookName) {
            $.getJSON('../../data/books/self-development.json', function(books)  { 
                const currentBook = books.find(book => book.filename === bookName); 
                if (currentBook) {
                    $('#book_info').append(getBookHTML(currentBook, false));
    
                    $.getJSON(`../../data/books/reviews/${bookName}.json`, function(review) { 
        
                        $('#likes').append(getLikeDislikeHtml(review.likes));
                        $('#dislikes').append(getLikeDislikeHtml(review.dislikes));
            
                                
                        const quotes = review.quotes.map(quote => `<li>${quote}</li>`); 
                        $('#quotes').append(quotes);

                        const notes = review.notes.map(quote => `<li>${quote}</li>`); 
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

    $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)')
                          .exec(window.location.search);
    
        return (results !== null) ? results[1] || 0 : false;
    }
    
    
})(); 
    