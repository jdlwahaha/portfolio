(function() { 

let playSymbol = '&#9658;';
let stopSymbol = '&#9724;'; 

$(document).ready(function() { 
    $.getJSON('data/audio.json', function(recordings) {         

        // remove empty records
        recordings = recordings.filter((r) => {return r.title != ''})

        // $('#total2020').append(recordings.filter(r => r.recording_date.substr(0, 4) === '2020').length);
        $('#total2021').append(recordings.filter(r => r.recording_date.substr(0, 4) === '2021').length);
        $('#total2020').append(recordings.filter(r => r.recording_date.substr(0, 4) === '2020').length);
        $('#total2019').append(recordings.filter(r => r.recording_date.substr(0, 4) === '2019').length);
        $('#total2018').append(recordings.filter(r => r.recording_date.substr(0, 4) === '2018').length);

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
                        <td>
                            ${sourceLink} <br>
                            <audio src="data/${filename}" controls="controls"></audio>
                        </td>			
                        <td class="desktop">${record.source}</td>
                        <td class="desktop">${record.type}</td>	
                        <td style="white-space:nowrap;" class="desktop">${record.recording_date}</td>	
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

})(); 
