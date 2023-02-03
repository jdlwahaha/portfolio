(function () {
    $(document).ready(function () {


        document.getElementById('nav-top').addEventListener('click', () => { 
            click('top');
        });
        document.getElementById('nav-main').addEventListener('click', () => { 
            click('main');
        });
        document.getElementById('nav-ground').addEventListener('click', () => { 
            click('ground');
        });

        document.getElementById('nav-notes').addEventListener('click', () => { 
            click('notes');
        });


        function click(floor) { 
            const menu = ['top', 'main', 'ground', 'notes'];

            menu.map(menuItem => { 
                const navSelector = '#nav-' + menuItem; 
                const contentSelector = `#${menuItem}-floor`; 
    
                if (floor === menuItem) { 
                    $(navSelector).addClass('active');
                    $(contentSelector).removeClass('hide');
                } else { 
                    $(navSelector).removeClass('active');
                    $(contentSelector).addClass('hide');
                }
            }); 
        }
    });
}) ();
