/**
 * List of functions that will be shared across book pages
*/


const nav = [ 
    { 
        filename: 'self-development', 
        display: 'Self-Development'
    }, 
    { 
        filename: 'investing', 
        display: 'Investing'
    }, 
    { 
        filename: 'computer-programming', 
        display: 'Computer Programming'
    }, 
    { 
        filename: 'fiction', 
        display: 'Fiction'
    }, 
    { 
        filename: 'cigar', 
        display: 'Cigar'
    }, 
];

function pageExists(section) { 
    return (nav.find(n => n.filename === section))
}



function loadSubmenu(currentSectionName) { 
    const htmlPages = nav.map(page => { 
        if (currentSectionName && currentSectionName === page.filename) { 
            return `<span>${page.display}</span>`;
        }
        return `<a href=index?section=${page.filename}>${page.display}</a>`;
    })

    $('#submenu').append(htmlPages.join(' | ')); 
}


function loadBooks(books, section) {

    // remove empty records
    books = books.filter((r) => { return r.title != '' && (r.review != '' || r.showFullReview) });
    let content = '';


    books.map(function (book) {
        content += getBookHtml(book, true, section); 
    });

    $('#book_list').append(content);

}

function getBookHtml(book, showLinks, section) {
    
    
    const bookThumbnail = (section === 'cigar')  
        ? `../../data/books/thumbnails/${section}/${book.filename}.jpeg`
        : `../../data/books/thumbnails/${book.filename}.jpeg`;

    const reviewDateHtml = book.reviewDate  
        ? `<span class="grey">-</span> &nbsp;  <span class="reviewDate">${book.reviewDate}</span>`
        : '';

    const hasPhysicalCopyIndicator = book?.hasPhysicalCopy
        ? `<span class="triggerHover">&#128217;
            <span class="showOnHover">
                Got a copy
            </span>
        </span>
            `
        : ''

    if (section === 'cigar') { 
        $('#cigar-extra-note').removeClass('hide');
    }

    return `
        <section class="box">
            <div class="box-content">
                <span class="thumbnail-container">
                    <img src="${bookThumbnail}" alt="${book.filename}.jpeg"><br><br>
                </span>
                <div class="book-container">
                    <h4>
                        ${book.title}
                        ${hasPhysicalCopyIndicator}
                    </h4>
                    
                    <div class="author">by ${book.author}</div>
                    
                    <div class="rating"> 
                        ${getRatingString(book.rating)} &nbsp;
                        ${reviewDateHtml}
                    </div>
                    ${getReivew(book, section, showLinks)}
                    <div>
                        
                    </div>
                </div>
            </div>
        </section>
    `;
}





function getReivew(book, section, showLinks) { 


    if (book.showFullReview === true && showLinks === true) {
        let result = `
            <p>
                ${book.review} 
            </p>`;

        let isLocalhost = window.location.host === 'localhost';
            
        if (isLocalhost) { 
            if (book.showFullReview || book.showExercise) { 
                result += `
                    <p>
                    ${book.showFullReview ? `<a href="./review?section=${section}&name=${book.filename}">Full Review >>></a>` : ''}
                    ${book.showExercise ? `| <a href="./z_exercise-${book.filename}" title="exercise">ᕦ(ò_óˇ)ᕤ</a>` : ''}
                        
                    </p>`;
            }
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


