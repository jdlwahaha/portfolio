let playSymbol = '&#9658;';
let stopSymbol = '&#9724;'; 

$(document).ready(function() {



    loadPage(''); 


    $.getJSON('data/audio.json', function(recordings) {         

        // remove empty records
        recordings = recordings.filter((r) => {return r.title != ''})


        // paging
        let pageNum = parseInt(getQueryParam('page'));
        pageNum = pageNum ? pageNum : 1; 
        const PAGE_LIMIT = 10;

        let page = { 
            offset: (pageNum > 0) ? (pageNum - 1) * PAGE_LIMIT : 0,
            max:  Math.ceil((recordings.length-1) / PAGE_LIMIT), 
            min: 1,
        }

        $('#pageNum').append(pageNum); 
        $('#pageMax').append(page.max); 
        
        if (pageNum - 1 >= page.min) {
            $('#prevLink').attr('href', '?page='+(pageNum-1));
        } else { 
            $('#prevLink').addClass('disabled');
        }
        
        if (pageNum + 1 <= page.max) {
            $('#nextLink').attr('href', '?page='+(pageNum+1));
        } else { 
            $('#nextLink').addClass('disabled');
        }

        // get first 10 records from recording 
        let records = recordings.slice(page.offset, page.offset + PAGE_LIMIT); 

        let content = ''; 
        records.map( (record) => { 
            if (record.title) {
                let filename = record.recording_date + '.mp3';
                let sourceLink = (record.url) 
                                ? `<a href="${record.url}">${record.title}</a>`
                                : `<span>${record.title}</span>`; 
                content += `
                    <tr>
                        <td>${record.id}</td>
                        <td>${sourceLink}</td>
                        <td><audio src="data/${filename}" controls="controls"></audio></td>			
                        <td>${record.source}</td>
                        <td>${record.type}</td>	
                        <td style="white-space:nowrap;">${record.recording_date}</td>	
                    </tr>
                `;
            }
            
        })
        $('#audio_table_body').append(content); 
    });
}); 

function getQueryParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function loadPage(page) { 
    var pages = ['home', 'quotes', 'books', 'jdreads']; 

    // Remove all tab selection
    $('nav a').removeClass('current-tab');
    $('div.content').removeClass('active-content');

    // Check if the url is valid. If not, redirect to home page 
    var selectedPage = pages.find(p => p==page) ? page : pages[0]; 

    $('#'+ selectedPage +'-content').addClass('active-content');
    $(`a[href="#${selectedPage}"]`).addClass('current-tab');
}