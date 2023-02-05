function getImage(video) {
    switch(video.source) { 
        case 'deck': 
            return (video.type === 'short') ? 'deck_s_play.png' : "deck_play.png";
        case 'go': 
        default: 
            return (video.type === 'short') ? 's_play.png' : "play.png";

    }

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

