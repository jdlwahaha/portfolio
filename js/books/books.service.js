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
                                    <div>by ${book.author}</div>
                                    <p>
                                        ${book.review}
                                    </p>
                                </div>
                            </div>
                    </section>
                `;


    });

    $('#book_list').append(content);

}