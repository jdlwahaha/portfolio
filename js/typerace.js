(function() { 
    $(document).ready(function() {
        var userPassageTextarea = document.getElementById('usereneteredpassage');
        document.getElementById('completeSummary').style.display = "none";
        var inputBox = document.getElementById('chatinput');

        var typeThisPassage = ''; 

        var typeThisBtn = document.getElementById('typethis');

        typeThisBtn.addEventListener('click', function() {
            typeThisPassage = userPassageTextarea.value;
            userPassageTextarea.disabled = true; 
            typeThisBtn.disabled = true;
            
            inputBox.focus();
            var userPassageWords = typeThisPassage.split(' '); 

            var index = 0; 
            document.getElementById('printchatbox').innerHTML = userPassageWords[index];



            inputBox.onkeyup = function(){
                var userInput = inputBox.value;
    
                if (userInput === userPassageWords[index]+" ") { 
                    inputBox.value = ''
                    index++; 

                    if (index >= userPassageWords.length) { // the end
                        document.getElementById('printchatbox').innerHTML = 'DONE!'
                        userPassageTextarea.disabled = false; 
                        typeThisBtn.disabled = false;
                        index = 0;

                        document.getElementById('completeSummary').style.display = "block";
                        document.getElementById('completedPassage').innerHTML = typeThisPassage;

                    } else { 
                        document.getElementById('printchatbox').innerHTML = userPassageWords[index];
                    }
                }
    
            }
        }); 
       
    }); 

})(); 


