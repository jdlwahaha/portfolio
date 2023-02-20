(function () {
        
    $(document).ready(function () {
        $.getJSON('../../data/videos/ya_deck.json', function(deckVideos) { 
            $.getJSON('../../data/videos/go.json', function (goVideos) {
                const YEAR_START = 2020; 
                const YEAR_END = 2023; 
    
                const videos = [...removeEmptyRecords(goVideos), ...removeEmptyRecords(deckVideos)].sort(sortByDate);

                loadYearData(YEAR_END, videos);
                var that = this; 
                that.videos = videos;
                
                $(`span #videoCount`).append(videos.length);
    
                $(document).on('change', '#yearSelection', function(value){
                    $(`section #videoList`).empty();
                    const selectedYear = $(this).find("option:selected").attr('value');
                    loadYearData(selectedYear, that.videos);
                });
    
            });
        });
        
        
    });

    function sortByDate(v1, v2) { 
        const v1Date = new Date(v1.date.year, v1.date.month, v1.date.day);
        const v2Date = new Date(v2.date.year, v2.date.month, v2.date.day);

        if (v1Date < v2Date) { 
            return 1; 
        } else if (v1Date > v2Date) { 
            return -1; 
        }
        return 0;
    }


    function loadYearData(year, videos) { 
        if (typeof year === 'string') { 
            year = parseInt(year);
        }

        const GOAL_FOR_EACH_MONTH = 10; 
        const MONTH_JAN = 0; 
        const MONTH_DEC = 11;

        for (let month = MONTH_DEC; month >= MONTH_JAN; month--) { 
            const videosThisMonth = videos.filter(v => v.date.year === year && v.date.month === month);
            if (videosThisMonth.length > 0) { 
                const htmlContent = getHtml(year, month, videosThisMonth, GOAL_FOR_EACH_MONTH);
                $(`section #videoList`).append(htmlContent);
            }
        }
    }


    function getHtml(year, month, videos, video_num_goal) { 
        const current_count = videos.length;
        let htmlContent = generalVideoLinks(videos);
        let percent = getProgressBarValue(current_count, video_num_goal);

        const html = `
        <div class="date-info">${getMonthName(month)}</div>
        <div class="meter">
            <span class="progressbar" style="width: ${percent}%"></span>
            <strong>
                <span class="progress">${current_count}</span> ${(current_count > 1) ? 'videos' : 'video'}
            </strong>
        </div>
        <br>
        <div class="youtube_embed_videos">
            ${htmlContent}
        </div>
        <br>
        <br>
        <br>
        `; 
        return html; 
    }

    function getProgressBarValue(current_count, video_num_goal) { 
        const MAX_PERCENT = 100;

        let percent = Math.floor(1.0 * current_count / video_num_goal * 100);
        percent = (percent > MAX_PERCENT) ? MAX_PERCENT : percent;
        
        return percent;
    }

    function generalVideoLinks(videos) {
        let htmlContent = '';
        videos.map(video => {
            const videoDate = video.date.year + '-' + appendZero(video.date.month+1) + '-' + appendZero(video.date.day);
            if (video.videoId) {
                const link = `https://youtu.be/${video.videoId}`; 
                const png = getImage(video);
                htmlContent += `<div class="list-item">${videoDate} 
                        <a href="${link}" target="_blank">
                                <img src="../../img/${png}" width=25/>
                            ${video.title}
                        </a>
                    <div>`;
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

 

})(); 
