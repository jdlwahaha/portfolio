/**
 * List of functions that will be shared across book pages
 */

function loadBooks(books, section) {

    // remove empty records
    books = books.filter((r) => { return r.title != '' && r.review != '' });
    let content = '';


    books.map(function (book) {
        content += getBookHtml(book, true, section); 
    });

    $('#book_list').append(content);

}

function getBookHtml(book, showLinks, section) {
    
    
    const bookThumbnail = (section === 'cigar')  
        ? `../../data/books/thumbnails/${section}/${book.filename}.png`
        : `../../data/books/thumbnails/${book.filename}.png`;


    return `
        <section class="box">
            <div class="box-content">
                <span class="thumbnail-container">
                    <img src="${bookThumbnail}" alt="${book.filename}.png"><br><br>
                </span>
                <div class="book-container">
                    <h4>
                        ${book.title}
                        
                    </h4>
                    
                    <div class="author">by ${book.author}</div>
                    
                    <div class="rating"> 
                        ${getRatingString(book.rating)} &nbsp;&nbsp;&nbsp;
                        
                    </div>
                    ${getReivew(book, showLinks)}
                    <div>
                        
                    </div>
                </div>
            </div>
        </section>
    `;
}

function getReivew(book, showLinks) { 


    if (book.showFullReview === true && showLinks === true) {
        let result = `
            <p>
                ${book.review} 
            </p>`;
            
        if (book.showFullReview || book.showExercise) { 
            result += `
                <p>
                ${book.showFullReview ? `<a href="./review?name=${book.filename}">Full Review >>></a>` : ''}
                ${book.showExercise ? `| <a href="./z_exercise-${book.filename}" title="exercise">ᕦ(ò_óˇ)ᕤ</a>` : ''}
                    
                </p>`;
        }
        return result; 
    } else { 
        return `
            <p class="review">
                ${book.review}
            </p>
        `;
    }
}

function getRatingString(number) { 
    var result = ''; 
    if (number >= 0) { 
        var MAX_STARS_COUNT = 5;
        var SOLID_STAR_SYMBOL = '&#9733;';
        var EMPTY_STAR_SYMBOL = '&#9734;';
        if (number >= 0 && number <= MAX_STARS_COUNT) { 
            for (var i=0; i<MAX_STARS_COUNT; i++) { 
                if (number < i+1) { 
                    result += EMPTY_STAR_SYMBOL;
                } else { 
                    result += SOLID_STAR_SYMBOL; 
                }
            }
        }
    }

    return result; 
}


