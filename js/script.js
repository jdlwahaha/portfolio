(function() { 
    $(document).ready(function() {
        loadHeader(); 
        loadFooter(); 
    }); 

    function loadHeader() { 
        var headerHtml = `
            <a href="../home"><h1>My Space</h1></a>
            <nav>
                <!-- <a href="index" class="first">Home</a> -->
                <a href="../youtube" class="first">
                    <span class="nav-icon">&#128249;</span> 
                    GO
                </a>
                <a href="../jdreads">
                    <span class="nav-icon">&#127897;</span> 
                    JDReads
                </a>
                

                <span class="navSectionHeader-desktop">PAGES</span>
                <span class="navSectionHeader-mobile">|</span>
                
                <!-- <a href="../people" class="last">
                    <span class="nav-icon">&#8220;</span> 
                    People
                </a> -->
                
                <a href="../actions" >
                    <span class="nav-icon">&#129470;</span> 
                    Actions
                </a>
                <a href="../dreams" >
                    <span class="nav-icon">&#128173;</span> 
                    Dreams
                </a>


                <span class="navSectionHeader-desktop">REVIEWS</span>
                <span class="navSectionHeader-mobile">|</span>
                

                <a href="../books" >
                    <span class="nav-icon">&#128214;</span> 
                    Books
                </a> 
                <a href="../keyboards" >
                    <span class="nav-icon">&#128187;</span> 
                    Keyboards
                </a>
                
                <span class="navSectionHeader-desktop">INFO</span>
                <span class="navSectionHeader-mobile">|</span>

                <a href="../explodingkittens" class="last" >
                    <span class="nav-icon">&#128049;</span> 
                    Exploding Kittens
                </a>
       
               
            </nav>
        `;
        $('header').append(headerHtml); 
        

    
        // read url and highlight tab 
        var pages = ['jdreads', 'actions', 'typerace', 'youtube', 'books', 'dreams', 'home', 'keyboards', 'explodingkittens']; 
    
        let index = window.location.href.indexOf('portfolio/') + 'portfolio/'.length; 
        let currentPageStr = window.location.href.substring(index); 
    
        let currentPage = pages.find(x => currentPageStr.includes(x.toLowerCase()));
        if (currentPage) { 
            $(`a[href*="${currentPage}"]`).addClass('current-tab');
        } else { 
            // redirect to home page
            window.location.href = window.location.origin + '/portfolio/html/home'; 
        }
    
    }
    
    
    function loadFooter() {
        $('footer').append('Copyrighted &copy; 2018-2023');
    }
    
    $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)')
                          .exec(window.location.search);
    
        return (results !== null) ? results[1] || 0 : false;
    }

})(); 
