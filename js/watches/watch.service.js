/**
 * List of functions that will be shared across book pages
*/


const nav = [ 
    { 
        filename: 'automatic', 
        display: 'Automatic'
    }, 
    { 
        filename: 'casio', 
        display: 'Casio'
    }, 
    { 
        filename: 'budget', 
        display: 'Budget'
    }, 
    { 
        filename: 'smart', 
        display: 'Smart'
    }, 
];


function pageExists(section) { 
    return (nav.find(n => n.filename === section))
}



function getSubmenuHtml(currentSectionName) {
        
        

    const pages = [
        ...nav,
        {
            filename: 'about', 
            display: 'About', 
            anchor: '<a href="about">About</a>'
        }, 
    
    ]; 


    const htmlPages = pages.map(page => { 
        if (currentSectionName && currentSectionName === page.filename) { 
            return `<span>${page.display}</span>`;
        }

        const anchor = page.anchor || `<a href="index?section=${page.filename}">${page.display}</a>`;
        
        return anchor;
    })


    const allPages =  htmlPages.join(' | ');

    return allPages;
}








