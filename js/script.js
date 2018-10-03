let playSymbol = '&#9658;';
let stopSymbol = '&#9724;'; 

$(document).ready(function() {
    $.getJSON('data/audio.json', function(recordings) {         
        let content = ''; 
        let track_no = recordings.length - 1;
        recordings.map( (recording)=> { 
            if (recording.title) {
                let filename = recording.recording_date + '.mp3';
                let sourceLink = (recording.url) 
                                ? `<a href="${recording.url}">${recording.title}</a>`
                                : `<span>${recording.title}</span>`; 
                content += `
                    <tr>
                        <td>${track_no}</td>
                        <td>${recording.source}</td>
                        <td> 
                            <audio id="${filename}" src="data/${filename}"></audio>
                            <span> 
                                <button name="${filename}" onclick="togglePlayAudio('${filename}')">${playSymbol}</button> 
                            </span>
                            ${sourceLink} <br>

                            <!-- 
                            <audio controls>
                                <source src="data/${filename}" type="audio/mpeg">
                                <p>
                                    Your browser does not support HTML5 audio, but you can still 
                                    <a href="${filename}">download the audio file</a>.
                                </p>
                            </audio> 
                            -->


                        </td>
                        <td>${recording.type}</td>	
                        <td style="white-space:nowrap;">${recording.recording_date}</td>				
                    </tr>
                `;
                track_no--; 
            }
            
        })
        $('#audio_table').append(content); 
    });
}); 

var playingFilename = ''; 

function togglePlayAudio(filename) { 
    let audioFile = document.getElementById(filename); 
    let buttonPlayStatus = $('button[name="'+ filename + '"]'); 
    

    if (playingFilename) { 
        if (playingFilename != filename) {
            // Pause the previous selected track
            let prevAudioFile =  document.getElementById(playingFilename);
            let prevButtonPlayStatus = $('button[name="'+ playingFilename + '"]'); 
            stopAudio(prevAudioFile, prevButtonPlayStatus); 
            
            playAudio(); 
        }
        else { 
           stopAudio(audioFile, buttonPlayStatus); 
        }
    } else { 
        playAudio(); 
    }


    function playAudio() { 
        audioFile.play();
        buttonPlayStatus.html(stopSymbol);
        playingFilename = filename; 
    }    

    function stopAudio(audioFile, buttonPlayStatus) { 
        audioFile.pause(); 
        audioFile.currentTime = 0;
        buttonPlayStatus.html(playSymbol);

        playingFilename = '';
    }
    
}

window.togglePlayAudio = togglePlayAudio;
