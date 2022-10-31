(function () {
    $(document).ready(function () {
        
        $(document).ready(function () {
            $.getJSON('data/youtube2.json', function (videos) {
                const totalPublishThisYear = videos.length - 31; //31 are videos done before 2021
                loadProgressBar('youtube', totalPublishThisYear, 50);

                const validVideos = videos.filter(v => v.videoId);
                let htmlContent = loadVideoLinks(validVideos);
                $('#youtube_embed_videos').append(htmlContent);
            });

            
        });

    });


    function loadVideoLinks(videos) {
        let htmlContent = '';
        videos.map(video => {
            if (video.videoId) {
                const link = `https://youtu.be/${video.videoId}`
                htmlContent += `<a href="${link}" target="_blank">${video.title}</a><br>`
            }
        });
        return htmlContent;
    }

    function loadIframe(videos) {
        let htmlContent = '';
        videos.map(video => {
            if (video.videoId) {
                htmlContent += `<iframe src="https://www.youtube.com/embed/${video.videoId}"></iframe>`
            }
        });
        return htmlContent;
    }


    function loadProgressBar(elementId, currentCount, goalCount) {
        let percent = Math.floor(1.0 * currentCount / goalCount * 100);
        console.log(percent);
        $(`#${elementId} .progress`).append(currentCount);
        $(`#${elementId} .goal`).append(goalCount);
        $(`#${elementId} span.progressbar`).attr('style', `width: ${percent}%`);
    }


  


})(); 
