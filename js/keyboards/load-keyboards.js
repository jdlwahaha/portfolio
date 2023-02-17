/**
 * require books.service.js getRatingString(); 
 */

(function() { 
    $(document).ready(function() { 
        let keyboards = [];
        $.getJSON('../../data/keyboards/keyboards.json', (k) => {
            loadKeyboards(k); 
            keyboards = k;
            
        });    
        
        $("#search").on("input", function(event) {
            const matchSearch = keyboards.filter(k => { 
                const original = k.name.toUpperCase(); 
                const target = event.target.value.toUpperCase();
                return original.includes(target);
            });
            $('#keyboard_list').empty();
            loadKeyboards(matchSearch); 
            
        });
        
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

        const price = (keyboard.msrp && keyboard.myPrice)
                ? `<div>$${keyboard.msrp} &nbsp;<span class="myPrice" title="total price that I paid included tax">($${keyboard.myPrice})<span></div>`
                : '';
        return `
            <section class="box">
                <div class="box-content">
                <span class="thumbnail-container keyboard-thumbnail-container">
                    <img src="${thumbnail}" alt="${keyboard.filename}.png">
                </span>
                    <div class="book-container keyboard-container">
                        <h4>${keyboard.name} ${youtubeLink}</h4>
                        ${price}
                        <div class="rating"> ${getRatingString(keyboard.rating)}</div>
                        <p class="review">${keyboard.review}</p>
                    </div>
                </div>
            </section>
        `;
    }


})(); 





