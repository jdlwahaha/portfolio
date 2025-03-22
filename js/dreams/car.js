(function () {
    $(document).ready(function () {

        const cars = [ 
            { 
                filename: 'toyota-supra', 
                displayName: 'Toyota Supra 3.0L Premium AT',
                cost: '85,000'
            },
            { 
                filename: 'miata', 
                displayName: 'Mazda MX-5',
                cost: '52,000'
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
            $('#carName').text(selectedCar.displayName); 
            $('#carCost').text(selectedCar.cost); 
            $('.slideshow img').attr('src', `../../img/car/${selectedCar.filename}.jpeg`);
            $('.slideshow img').attr('alt', `${selectedCar.filename}`);
    
        }

    });
}) ();
