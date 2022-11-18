(function () {
        
    $(document).ready(function () {
        $.getJSON('data/youtube2.json', function (videos) {
            const YEAR_START = 2020; 
            const YEAR_END = 2022; 

            loadYearData(2022, videos);
            var that = this; 
            that.videos = videos;
            
            $(`span #videoCount`).append(videos.length);
            $(`span #lastUpdatedDate`).append('Nov 18, 2022');

            $(document).on('change', '#yearSelection', function(value){
                $(`section #a`).empty();
                const selectedYear = $(this).find("option:selected").attr('value');
                loadYearData(selectedYear, that.videos);
            });

        });
        
    });


    function loadYearData(year, videos) { 
        if (typeof year === 'string') { 
            year = parseInt(year);
        }

        const GOAL_FOR_EACH_MONTH = 10; 

        for (let month=11; month >= 0; month--) { 
            const videosThisMonth = videos.filter(v => v.date.year === year && v.date.month === month);
            if (videosThisMonth.length > 0) { 
                const htmlContent = getHtml(year, month, videosThisMonth, GOAL_FOR_EACH_MONTH);
                $(`section #a`).append(htmlContent);
            }
 
        }

    }


    function getHtml(year, month, videos, video_num_goal) { 
        const current_count = videos.length;
        let htmlContent = generalVideoLinks(videos);
        let percent = Math.floor(1.0 * current_count / video_num_goal * 100);
        const html = `
            <div class="date-info">${getMonthName(month)} </div>
            <div class="meter">
                <span class="progressbar" style="width: ${percent}%"></span>
                <strong>
                    <span class="progress">${current_count}</span> ${(current_count > 1) ? 'videos' : 'video'}
                    <!--<span class="goal">${video_num_goal}</span> -->
                </strong>
            </div>
            <br>
            <div class="youtube_embed_videos">
                ${htmlContent}
            </div>
            <br>
            <br>
        `; 
        return html; 
    }

    function generalVideoLinks(videos) {
        let htmlContent = '';
        videos.map(video => {
            const videoDate = video.date.year + '-' + appendZero(video.date.month+1) + '-' + appendZero(video.date.day);
            if (video.videoId) {
                const link = `https://youtu.be/${video.videoId}`
                htmlContent += `<div class="list-item">${videoDate} <a href="${link}" target="_blank">${video.title}</a><div>`
            }
        });
        return htmlContent;
    }

    function appendZero(number) { 
        if (number < 10) { 
            return '0' + number; 
        }
        return number; 
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



    function getMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber);
        return date.toLocaleString('en-US', { month: 'long' });
    }
  


})(); 
