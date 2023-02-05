(function () {

    $(document).ready(function () {
        $.getJSON('../../data/videos/ya_deck.json', function(deckVideos) { 

            $.getJSON('../../data/videos/go.json', function (goVideos) {
                const MONTH_DEC = 11; 
                const today = (new Date());
                let selectedMonth = today.getMonth();
                let selectedYear = today.getFullYear(); 
            
                const videos = [...goVideos, ...deckVideos];

                loadCalendar(videos, selectedMonth, selectedYear);

                $(`span #videoCount`).append(videos.length);
            
                
                document.getElementById('nextMonthBtn').addEventListener('click', () => {
                    selectedYear = (selectedMonth < MONTH_DEC) ? selectedYear : selectedYear + 1;
                    selectedMonth = (selectedMonth < MONTH_DEC) ? (selectedMonth + 1) : 0;
                    setSelected(selectedMonth, selectedYear);

                    loadCalendar(videos, selectedMonth, selectedYear);
                });
                document.getElementById('prevMonthBtn').addEventListener('click', () => {
                    selectedYear = (selectedMonth > 0) ? selectedYear : selectedYear - 1;
                    selectedMonth = (selectedMonth > 0) ? (selectedMonth - 1) : MONTH_DEC;
                    setSelected(selectedMonth, selectedYear);

                    loadCalendar(videos, selectedMonth, selectedYear);
                });
            });
        });

    });

    

    function setSelected(selectedMonth, selectedYear) { 
        this.selectedMonth = selectedMonth; 
        this.selectedYear = selectedYear
    }



    function loadCalendar(videos, selectedMonth, selectedYear) {
        $('#youtube-calendar tbody').empty();


        // get first day of this month 
        const now = new Date();
        const currentYear = selectedYear;
        let currentMonth = selectedMonth;
        const currentDate = now.getDate(); 

        // weekday of 1st of the month
        const dayOfFirst = new Date(currentYear + "/" + (currentMonth+1) + "/01").getDay();
        const lastDayOfMonth = new Date(currentYear, (currentMonth+1), 0).getDate();
        const maxWeeksOfMonth = Math.ceil(lastDayOfMonth/7)+1;


        document.getElementById('selectedMonthName').innerHTML = getMonthName(currentMonth) + ' ' + selectedYear;
        $('#prevMonthBtn').attr("disabled", (selectedMonth === 0 && selectedYear === 2020));
        $('#nextMonthBtn').attr("disabled", (selectedMonth === now.getMonth() && selectedYear === now.getFullYear()));

        let dayCounter = 0;
        let dayCounterForData = 0;

        currentMonth++;

        for(let week = 0; week < maxWeeksOfMonth && dayCounter < lastDayOfMonth; week++) {
            // display this month 
            $(`#youtube-calendar tbody`).append(`<tr class="number week${week}">`);
            for (let weekday = 0; weekday < 7; weekday++) {
                let content = '';
                if ((dayOfFirst > weekday && dayCounter == 0) || (dayCounter >= lastDayOfMonth)) {
                    content =`<td></td>`;
                } else {
                    dayCounter++; 
                    if (dayCounter === currentDate && selectedMonth === (now.getMonth()) && selectedYear === (now.getFullYear())) { 
                        content = `<td class="today">${dayCounter}</td>`;
                    } else { 
                        content = `<td>${dayCounter}&nbsp;</td>`;
                    }
                }
                $(`#youtube-calendar tbody tr.number.week${week}`).append(content);
            }
            $(`#youtube-calendar tbody`).append(`</tr>`);


            $(`#youtube-calendar tbody`).append(`<tr class="data week${week}">`);
            for (let weekday = 0; weekday < 7; weekday++) {
                let content = '';
                if (dayOfFirst > weekday && dayCounterForData == 0) {
                    content = `<td></td>`;
                } else {
                    dayCounterForData++; 
                    const isToday = (dayCounterForData === currentDate && selectedMonth === (now.getMonth()) && selectedYear === (now.getFullYear()));
                    const publishedVideo = videos.find(video => {
                        return (video.date.year === currentYear)
                            && (video.date.month === currentMonth-1)
                            && (video.date.day === dayCounterForData)
                    });
                    content = getRenderVideoTD(publishedVideo, isToday);
                }
                $(`#youtube-calendar tbody tr.data.week${week}`).append(content);

            }
            $(`#youtube-calendar tbody`).append(`</tr>`);

        }

    }


    function getRenderVideoTD(publishedVideo, isToday) { 
        let content = '';
        if (publishedVideo) {
            const png = getImage(publishedVideo);

            content = `
                <td ${(isToday ? 'class="today"': '')}>
                    <a class="mobile" target="_blank" 
                        title="${publishedVideo.title}"
                        href="https://www.youtube.com/watch?v=${publishedVideo.videoId}">
                            <img style="float: left" width="30" src="../../img/${png}"/>
                    </a>
                    <a class="desktop" target="_blank" href="https://www.youtube.com/watch?v=${publishedVideo.videoId}">
                        <img src="../../img/${png}" width=20/>
                        ${publishedVideo.title}
                    </a>
                    
                </td>
            `;
        } else {
            content = `<td ${(isToday ? 'class="today"': '')}></td>`;
        }
        return content;
    }





    function getMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber);
        const month = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        return month[monthNumber];
    }



})(); 


