function getImage(video) {
    switch(video.source) { 
        case 'deck': 
            return (video.type === 'short') ? 'deck_s_play.png' : "deck_play.png";
        case 'go': 
        default: 
            return (video.type === 'short') ? 's_play.png' : "play.png";

    }

}