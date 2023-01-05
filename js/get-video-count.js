(function() { 

    
    $(document).ready(function() { 
        $.getJSON('data/youtube2.json', function(videos) {         
    
            // remove empty records
            videos = videos.filter((r) => {return r.title != ''})
    
            $('#total2023').append(getVideosCount(videos, 2023));
            $('#total2022').append(getVideosCount(videos, 2022));
            $('#total2021').append(getVideosCount(videos, 2021));
            $('#total2020').append(getVideosCount(videos, 2020));

            // shorts
            $('#total2023short').append(getShortsCount(videos, 2023));
            $('#total2022short').append(getShortsCount(videos, 2022));


        });

        function getVideosCount(videos, year) { 
            return videos.filter(video => (video.date.year === year && video.type !== 'short')).length;
        }

        function getShortsCount(videos, year) { 
            return videos.filter(video => (video.date.year === year && video.type === 'short')).length;
        }
    });
    
 
    
})(); 
    