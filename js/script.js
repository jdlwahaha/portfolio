(function() { 
    $(document).ready(function() {
        loadHeader(); 
        loadFooter(); 
    }); 

    function loadHeader() { 
        var isLocal = window.location.href.indexOf('localhost/') >= 0; 
        var stockLink = `  <a href="../stock" >
                        <span class="nav-icon">&#128200;</span> 
                        Stock
                    </a> `

        var headerHtml = `
            <a href="../home"><h1>My Space</h1></a>
            <nav>

                <span class="navSectionHeader-desktop">RECORDINGS</span>
                <a href="../youtube">
                    <span class="nav-icon">&#128249;</span> 
                    GO
                </a>
                <a href="../jdreads">
                    <span class="nav-icon">&#127897;</span> 
                    JDReads
                </a>





                <span class="navSectionHeader-desktop">PAGES</span>
                <span class="navSectionHeader-mobile">|</span>
                ${isLocal ? stockLink : ''}
                
                
                <a href="../actions" >
                    <span class="nav-icon">&#129470;</span> 
                    Actions
                </a>
                <a href="../dreams" >
                    <span class="nav-icon">&#128173;</span> 
                    Dreams
                </a>
                <a href="../books" >
                    <span class="nav-icon">&#128214;</span> 
                    Books
                </a> 
                

                <!--<a href="../design-patterns" >
                    <span class="nav-icon">&#128190;</span> 
                    Programming
                </a>-->
        


                <span class="navSectionHeader-desktop">COLLECTIONS</span>
                <span class="navSectionHeader-mobile">|</span>

               
            
                <a href="../keyboards" >
                    <span class="nav-icon">&#128224;</span> 
                    Keyboards
                </a>

                <a href="../watches"> 
                    <span class="nav-icon">&#8986;</span>
                    Watches
                </a> 
            
                <a href="../zippo"> 
                    <span class="nav-icon">&#128293;</span>
                    Zippo
                </a> 

                <span class="navSectionHeader-desktop">COMPLETE</span>
                <span class="navSectionHeader-mobile">|</span>

                <a href="../explodingkittens">
                    <span class="nav-icon">&#128049;</span> 
                    Exploding Kittens
                </a>

               
            </nav>
        `;
        $('header').append(headerHtml); 
        

    
        // read url and highlight tab 
        var pages = [
            'home',
            'youtube',
            'jdreads',

            'actions',
            'dreams',
            'books', 

            'zippo',
            'keyboards', 
            'explodingkittens', 

            'design-patterns',
            'stock',
            'typerace', 
            'watches'
        ]; 
    
        let index = window.location.href.indexOf('portfolio/') + 'portfolio/'.length; 
        let currentPageStr = window.location.href.substring(index); 
    
        let currentPage = pages.find(x => currentPageStr.includes(x.toLowerCase() +'/'));
        if (currentPage) { 
            $(`a[href*="./${currentPage}"]`).addClass('current-tab');
        } else { 
            // redirect to home page
            window.location.href = window.location.origin + '/portfolio/html/home'; 
        }
    
    }
    
    
    function loadFooter() {
        $('footer').append('Copyrighted &copy; 2018-2025');
    }
    
    $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)')
                          .exec(window.location.search);
    
        return (results !== null) ? results[1] || 0 : false;
    }



})(); 

function getAmazonLink(title, link, showHover) { 
    return '';
    return `
        <a target="_blank" class="amazon  ${(showHover===false) ? '' : 'triggerHover'}" href="${link}" >
            ${title}
            <img class="icon" src="../../data/link/amazon.png" /> 
            <img class="icon" src="../../data/link/canada.png" /> 
            <span class="showOnHover">
                Shop on Amazon.ca
            </span>
        </a>
    `;
}