(function() { 
    $(document).ready(function() {
        loadHeader(); 
        loadFooter(); 
    }); 
    
    

    function loadHeader() { 
        var headerHtml = 
            '<h1>My Little Space</h1>' +
            '<nav>' +
                '<!-- <a href="index.html" class="first">Home</a> -->' +
                '<a href="jdreads.html" class="first">JDReads</a>' +
                '<a href="quotes.html">Quotes</a>' +
                '<!-- <a href="books.html">Books</a> -->' +
            '</nav>';
        $('header').append(headerHtml); 
        
    
        // read url and highlight tab 
        var pages = [//'index',
             'quotes', 'books', 'jdreads']; 
    
        let index = window.location.href.indexOf('portfolio/') + 'portfolio/'.length; 
        let currentPageStr = window.location.href.substring(index); 
    
        let currentPage = pages.find(x => currentPageStr.indexOf(x)>=0);
        if (currentPage) { 
            $(`a[href="${currentPage}.html"]`).addClass('current-tab');
        } else { 
            // redirect to home page
            window.location.href = window.location.origin + '/portfolio/jdreads.html'; 
        }
    
    }
    
    
    function loadFooter() {
        $('footer').append('Copyrighted &copy; 2018-2020');
    }
    
})(); 
