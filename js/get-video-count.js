(function() { 

    
    $(document).ready(function() { 
        $.getJSON('data/youtube2.json', function(videos) {         
    
            // remove empty records
            videos = videos.filter((r) => {return r.title != ''})
    
            $('#total2022').append(videos.filter(video => video.date.year === 2022).length);
            $('#total2021').append(videos.filter(video => video.date.year === 2021).length);
            $('#total2020').append(videos.filter(video => video.date.year === 2020).length);

        });
    });
    
 
    
})(); 
    