(function() { 
    $(document).ready(function() {
        loadHeader(); 
        loadFooter(); 
    }); 
    
    

    function loadHeader() { 
        var headerHtml = `
            <a href="youtube.html"><h1>My Space</h1></a>
            <nav>
                <!-- <a href="index.html" class="first">Home</a> -->
                <a href="youtube.html" class="first">
                    <span class="nav-icon">&#128249;</span> 
                    _Tape
                </a>
                <a href="jdreads.html" class="last">
                    <span class="nav-icon">&#128214;</span> 
                    JDReads
                </a>


                <!-- <a href="quotes.html">Quotes</a> -->
                <!-- <a href="books.html">Books</a> -->
            </nav>
        `;
        $('header').append(headerHtml); 
        

    
        // read url and highlight tab 
        var pages = ['index', 'jdreads', 'quotes', 'typerace', 'youtube']; 
    
        let index = window.location.href.indexOf('portfolio/') + 'portfolio/'.length; 
        let currentPageStr = window.location.href.substring(index); 
    
        let currentPage = pages.find(x => currentPageStr.includes(x.toLowerCase()));
        if (currentPage) { 
            $(`a[href="${currentPage}.html"]`).addClass('current-tab');
        } else { 
            // redirect to home page
            window.location.href = window.location.origin + '/portfolio/youtube.html'; 
        }
    
    }
    
    
    function loadFooter() {
        $('footer').append('Copyrighted &copy; 2018-2023');
    }
    
})(); 
