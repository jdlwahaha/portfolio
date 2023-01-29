(function() { 
    $(document).ready(function() {
        loadHeader(); 
        loadFooter(); 
    }); 
    
    

    function loadHeader() { 
        var headerHtml = `
            <a href="../youtube"><h1>My Space</h1></a>
            <nav>
                <!-- <a href="index.html" class="first">Home</a> -->
                <a href="../youtube" class="first">
                    <span class="nav-icon">&#128249;</span> 
                    YouTuber
                </a>
                <a href="../jdreads">
                    <span class="nav-icon">&#127897;</span> 
                    JDReads
                </a>
                
                <span class="navSectionHeader-desktop">REVIEWS</span>
                <span class="navSectionHeader-mobile">|</span>
                

                <a href="../books" >
                    <span class="nav-icon">&#128214;</span> 
                    Books
                </a> 

                <span class="navSectionHeader-desktop">PAGES</span>
                <span class="navSectionHeader-mobile">|</span>
                
                <!-- <a href="../people" class="last">
                    <span class="nav-icon">&#8220;</span> 
                    People
                </a> -->
             
                <a href="../quotes" >
                    <span class="nav-icon">&#8220;</span> 
                    Quotes
                </a>
                <a href="../dreams" class="last">
                    <span class="nav-icon">&#128173;</span> 
                    Dreams
                </a>
            </nav>
        `;
        $('header').append(headerHtml); 
        

    
        // read url and highlight tab 
        var pages = ['jdreads', 'quotes', 'typerace', 'youtube', 'people', 'books', 'dreams']; 
    
        let index = window.location.href.indexOf('portfolio/') + 'portfolio/'.length; 
        let currentPageStr = window.location.href.substring(index); 
    
        let currentPage = pages.find(x => currentPageStr.includes(x.toLowerCase()));
        if (currentPage) { 
            $(`a[href*="${currentPage}"]`).addClass('current-tab');
        } else { 
            // redirect to home page
            window.location.href = window.location.origin + '/portfolio/html/youtube'; 
        }
    
    }
    
    
    function loadFooter() {
        $('footer').append('Copyrighted &copy; 2018-2023');
    }
    
})(); 
