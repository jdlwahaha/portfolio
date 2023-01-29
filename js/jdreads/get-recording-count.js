(function() { 

    
    $(document).ready(function() { 
        $.getJSON('../../data/audio.json', function(recordings) {         
    
            // remove empty records
            recordings = recordings.filter((r) => {return r.title != ''})
    
            $('#total2021').append(recordings.filter(r => r.recording_date.substr(0, 4) === '2021').length);
            $('#total2020').append(recordings.filter(r => r.recording_date.substr(0, 4) === '2020').length);
            $('#total2019').append(recordings.filter(r => r.recording_date.substr(0, 4) === '2019').length);
            $('#total2018').append(recordings.filter(r => r.recording_date.substr(0, 4) === '2018').length);

        });
    });
    
 
    
})(); 
    