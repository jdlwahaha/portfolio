(function () {
    $(document).ready(function () {

        const cars = [ 
            { 
                filename: 'chr-01', 
                displayName: 'front',
            },
            { 
                filename: 'chr-02', 
                displayName: 'back',
            },
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
            $('.slideshow img').attr('src', `../../img/car/${selectedCar.filename}.jpeg`);
            $('.slideshow img').attr('alt', `${selectedCar.filename}`);
        }

    });
}) ();
