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
        display: 'Smart', 
        descriptionHtml: `
            <strong>Notes</strong>
            <p>
                I love watches and was super excited when smart watches were first introduced.
                I always thought talking to your wrist to give commands or communicate like buzz lighter is super cool.
                Getting notifications was the best these smart watches could do back then, but still a huge leap.
            </p>
            <p>
                With the programming background, I was also extremely excited to find that I can customize 
                the watch face to whatever I like with Pebble C. It already has built-in functions to display 
                time, date, day of the week, bluetooth connectivity status, etc. Fun side project to work with.
            </p>
            <p>
                Fitbit supported ground-breaking feature at the time with Fitbit pay. Paying grocery off my watch
                was one of the coolest thing I've ever done in a store. Measuring how many steps I walked in a day or how 
                well I sleep was another great feature that I love about my Ionic.
            </p>
            <p>
                However, these smart watches are not meant to last forever. Pebble was bought out by Fitbit, so Pebble 
                app store and SDK closed. Fitbit is later bought out by Google, and they also disabled my Ionic
                due to overheat concerns after 2 years of ownership. Fitbit dev tool was also later closed.
            </p>
            <p >
                <div class="well well-error">Major issue: Smart watches don't last forever! </div>
                <ul>
                    <li>Battery dies eventually and harder to replace unlike traditional watches</li>
                    <li>Have to recharge the watch at least once a week</li>
                    <li>Phone battery also suffers from having bluetooth turned on all the time</li>
                    <li>Company do not provide life-time support like traditional watch brand does</li>
                    <li>Unreasonably pricy comparing to the lifespan of traditional watches</li>
                    <li>Looks bulky and hardly elegant on my wrist</li>
                </ul>
            </p>
            <p>
                Health measuring and communication features are cool, but these are side benefits. 
                If it's a "watch", it needs to fulfill the basics of how to tell time reliably and indefinitely.

            </p>

        `
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
    });

    const allPages =  htmlPages.join(' | ');
    return allPages;
}


function getSectionDescriptionHtml(currentSectionName) { 
    const page = nav.find(i => i.filename === currentSectionName);
    return page.descriptionHtml || '';
}







