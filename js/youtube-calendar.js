(function () {
    $(document).ready(function () {

        $.getJSON('data/youtube2.json', function (videos) {
            // let thisMonth = (new Date()).getMonth();
            loadCalendar(videos, undefined);

            document.getElementById('prevMonthBtn').addEventListener('click', () => { 
                var index = (thisMonth > 0) ? (thisMonth - 1) : 11;

                $('#youtube-calendar tbody').empty();
                console.log({videos})
                loadCalendar(videos,  index);
                console.log('month:', index)
                thisMonth = index;
            });

            document.getElementById('nextMonthBtn').addEventListener('click', () => { 
                var index = (thisMonth < 11) ? (thisMonth + 1) : 0;

                $('#youtube-calendar tbody').empty();
                console.log({videos})
                loadCalendar(videos,  index);
                console.log('month:', index)
                thisMonth = index;
            });
            
        });

    });


    function getMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber);
        return date.toLocaleString('en-US', { month: 'long' });
    }

    function loadCalendar(videos, selectedMonth) {
        // get first day of this month 
        const now = new Date();
        const currentYear = now.getFullYear();
        let currentMonth = (selectedMonth===undefined) ? now.getMonth() :selectedMonth;
        const currentDate = now.getDate(); 



        // weekday of 1st of the month
        const dayOfFirst = new Date(currentYear + "-" + (currentMonth+1) + "-01 00:00:00").getDay();
        const lastDayOfMonth = new Date(currentYear, (currentMonth+1), 0).getDate();
        const maxWeeks = Math.ceil(lastDayOfMonth/7)+1;


        // Debug
        // const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        // let day = weekday[dayOfFirst];
        // const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        // let name = month[currentMonth];
        // console.log({uh:currentYear + "-" + (currentMonth+1) + "-01", lastDayOfMonth, dayOfFirst, currentYear, currentMonth, day, name})
        
        document.getElementById('selectedMonthName').innerHTML =(getMonthName(currentMonth));

        let dayCounter = 0;
        let dayCounterForData = 0;

        currentMonth++;

        for(let week=0; week<maxWeeks && dayCounter < lastDayOfMonth; week++) {
            // display this month 
            $(`#youtube-calendar tbody`).append(`<tr class="number week${week}">`);
            for (let weekday = 0; weekday < 7; weekday++) {
                let content = '';
                if ((dayOfFirst > weekday && dayCounter == 0) || (dayCounter >= lastDayOfMonth)) {
                    content =`<td></td>`;
                } else {
                    dayCounter++; 
                    if (dayCounter === currentDate && selectedMonth === undefined) { 
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
                    const isToday = (dayCounterForData === currentDate && selectedMonth === undefined);
                    const publishedVideo = videos.find(video => {
                        return (video.date.year === currentYear)
                            && (video.date.month === currentMonth-1)
                            && (video.date.day === dayCounterForData)
                    })
                    if (publishedVideo) {
                        content = `
                            <td ${(isToday ? 'class="today"': '')}>
                                <a target="_blank" href="${publishedVideo.url}">
                                    ${publishedVideo.title}
                                </a>
                            </td>
                        `;
                    } else {
                        content = `<td ${(isToday ? 'class="today"': '')}></td>`;
                    }
                }
                $(`#youtube-calendar tbody tr.data.week${week}`).append(content)

            }
            $(`#youtube-calendar tbody`).append(`</tr>`);

        }

    }


})(); 
