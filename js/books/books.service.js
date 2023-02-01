/**
 * List of functions that will be shared across book pages
 */

function loadBooks(books) {

    // remove empty records
    books = books.filter((r) => { return r.title != '' && r.review != '' });
    let content = '';


    books.map(function (book) {
        const bookThumbnail = `../../data/books/thumbnails/` + book.thumbnail;


        content += `
            <section class="box">
                <div class="box-content">
                    <span class="thumbnail-container">
                        <img src="${bookThumbnail}" alt="${book.thumbnail}">
                    </span>
                    <div class="book-container">
                        <h4>${book.title}</h4>
                        <div class="author">by ${book.author}</div>
                        <div class="rating"> ${getRatingString(book.rating)}</div>
                        <p class="review">
                            ${book.review}
                        </p>
                    </div>
                </div>
            </section>
        `;


    });

    $('#book_list').append(content);

}

function getRatingString(number) { 
    var result = ''; 
    if (number) { 
        var MAX_STARS_COUNT = 5;
        var SOLID_STAR_SYMBOL = '&#9733;';
        var EMPTY_STAR_SYMBOL = '&#9734;';
        if (number >= 1 && number <= MAX_STARS_COUNT) { 
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