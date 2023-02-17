/**
 * require books.service.js getRatingString(); 
 */

(function() { 
    $(document).ready(function() { 
        $.getJSON('../../data/keyboards/keyboards.json', loadKeyboards);       
    });

    function loadKeyboards(keyboards) {

        // remove empty records
        keyboards = keyboards.filter((r) => { return  r.review });
        let content = '';
    
    
        keyboards.map(function (keyboard) {
            content += getKeyboardHtml(keyboard); 
        });
    
        $('#keyboard_list').append(content);
    
    }
    
    function getKeyboardHtml(keyboard) { 
        const thumbnail = `../../data/keyboards/thumbnails/${keyboard.filename}.png`;
        const youtubeLink = (keyboard.youtubeId)
                    ? `&nbsp;<a href="https://youtu.be/${keyboard.youtubeId}" target="_blank" title="Watch on YouTube">
                            <img src="../../img/play.png" width="20"/>
                        </a>
                        `
                    : '';
    
        return `
            <section class="box">
                <div class="box-content">
                <span class="thumbnail-container keyboard-thumbnail-container">
                    <img src="${thumbnail}" alt="${thumbnail}">
                </span>
                    <div class="book-container keyboard-container">
                        <h4>${keyboard.name} ${youtubeLink}</h4>
                        <div class="rating"> ${getRatingString(keyboard.rating)}</div>
                        <p class="review">${keyboard.review}</p>
                    </div>
                </div>
            </section>
        `;
    }


})(); 





