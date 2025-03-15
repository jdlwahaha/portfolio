
(function() { 
    $(document).ready(async function() { 

        try { 
            const section = $.urlParam('section');
            const bookName = $.urlParam('name');
            
            if (bookName) {
                const books = await $.getJSON(`../../data/books/${section}.json`); 
    
                const currentBook = books.find(book => book.filename === bookName); 
                if (currentBook) {
                    $('#book_info').append(getBookHtml(currentBook, false));
    
                    $.getJSON(`../../data/books/reviews/${bookName}.json`, function(review) { 
    
                        if (review.fullReview && showSection(review.fullReview, '#review-section')) { 
                            $('#fullReview').append(getLikeDislikeHtml(review.fullReview));
                        } else { 
                            $('#review-section').addClass('hide');
                        }
    
                        if (showSection(review.likes, '#like-section')) { 
                            $('#likes').append(getLikeDislikeHtml(review.likes));
                        }
    
                        if (showSection(review.dislikes, '#dislike-section')) { 
                            $('#dislikes').append(getLikeDislikeHtml(review.dislikes));
                        }
            
                        
                        if (showSection(review.quotes, '#quote-section')) { 
                            const quotes = review.quotes.map(quote => `<li>${quote}</li>`); 
                            $('#quotes').append(quotes);
                        }
    
                        if (showSection(review.notes, '#note-section')) {
                            const notes = review.notes.map(note => `<li>${note}</li>`); 
                            $('#notes').append(notes);
                        }
                    });     
                }
                else { 
                    window.location.href = window.location.origin + '/portfolio/html/books'; 
                }
    
            } else { 
                window.location.href = window.location.origin + '/portfolio/html/books'; 
            }
        } catch(e) { 
            window.location.href = window.location.origin + '/portfolio/html/books'; 

        }
        
  
    });

    function showSection(list, sectionName) { 
        if (list.length) { 
            return true;
        } else { 
            $(sectionName).addClass('hide');
            return false;
        }
    }

    function getLikeDislikeHtml(list) { 
        const html = list.map(item => { 
            return `<div class="answer review">${item}</div>`;
        }); 
        return html.join(''); 
    }



    
})(); 
    