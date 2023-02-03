(function () {
    $(document).ready(function () {

        const cars = [ 
            { 
                filename: 'toyota86', 
                displayName: 'Toyota 86 - Premium AT',
                cost: '500,000'
            },
            { 
                filename: 'lexusrc', 
                displayName: 'Lexus RC',
                cost: '850,000'
            },
            { 
                filename: 'benz-c300', 
                displayName: 'Benz C300',
                cost: '650,000'
            }
        ]; 
        let i = 0;

        selectCar(i);
 



        document.getElementById('previous').addEventListener('click', () => { 
            prevCar();
        });
        document.getElementById('next').addEventListener('click', () => { 
            nextCar();
        });


        function prevCar() { 
            if (i-1 < 0) { 
                i = cars.length-1; 
            } else { 
                i = i - 1; 
            }
            selectCar(i);
        }

        function nextCar() { 
            if (i+1 > cars.length-1) { 
                i = 0; 
            } else { 
                i = i + 1; 
            }
            selectCar(i);
        }

        function selectCar(i) {  
            let selectedCar = cars[i]; 
            $('#carName').text(selectedCar.displayName); 
            $('#carCost').text(selectedCar.cost); 
            $('.slideshow img').attr('src', `../../img/car/${selectedCar.filename}.png`);
            $('.slideshow img').attr('alt', `${selectedCar.filename}`);
    
        }

    });
}) ();
