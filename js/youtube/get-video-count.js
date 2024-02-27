(function() { 

    
    $(document).ready(function() { 
        $.getJSON('../../data/videos/deck.json', function (deckVideos) {
            $.getJSON('../../data/videos/build.json', function (buildVideos) {
                $.getJSON('../../data/videos/go.json', function (goVideos) {
                    let videos = [...goVideos, ...buildVideos, ...deckVideos];

                    // remove empty records
                    videos = videos.filter((r) => { return r.title != '' })

                    $('#total2024').append(getVideosCount(videos, 2024));
                    $('#total2023').append(getVideosCount(videos, 2023));
                    $('#total2022').append(getVideosCount(videos, 2022));
                    $('#total2021').append(getVideosCount(videos, 2021));
                    $('#total2020').append(getVideosCount(videos, 2020));

                    // shorts
                    $('#total2024short').append(getShortsCount(videos, 2024));
                    $('#total2023short').append(getShortsCount(videos, 2023));
                    $('#total2022short').append(getShortsCount(videos, 2022));


                });
            });
        });


        function getVideosCount(videos, year) { 
            return 0 || videos.filter(video => (video.date.year === year && video.type !== 'short')).length;
        }

        function getShortsCount(videos, year) { 
            return 0 || videos.filter(video => (video.date.year === year && video.type === 'short')).length;
        }

    });
    
 
    
})(); 
    