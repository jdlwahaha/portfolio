/**
 * require books.service.js getRatingString(); 
 */

(function() { 
    let keyboardsClass;
    let searchTerm = '';
    let selectedFilterSwitch = ''; 

    $(document).ready(function() { 
        $.getJSON('../../data/keyboards/keyboards.json', (k) => {
            keyboardsClass = new Keyboards(k);
            loadKeyboards(keyboardsClass.get()); 
            addFilterListeners();
        });    
        
        $("#search").on("input", function(event) {
            searchTerm = event.target.value;
            let matchSearch = keyboardsClass.getByName(searchTerm);

            if (selectedFilterSwitch) { 
                matchSearch = keyboardsClass.getSwitchFilter(selectedFilterSwitch);
            }

            $('#keyboard_list').empty();
            loadKeyboards(matchSearch); 
        });
        
    });


    function addFilterListeners() { 
        const filterOptions = Keyboards.SWITCH_TYPES;

        filterOptions.map(filterOption => { 
            document.getElementById(`${filterOption}Filter`).addEventListener('click', () => { 
                clickFilter(filterOption);
            });
        });
    }


    function clickFilter(switchType) { 
        selectedFilterSwitch = switchType;
        keyboardsClass.resetList();

        if (searchTerm) { 
            keyboardsClass.set(keyboardsClass.getByName(searchTerm));
        }

        Keyboards.SWITCH_TYPES.map(type => { 
            const navSelector = `#${type}Filter`; 

            if (switchType === type) { 
                $(navSelector).addClass('active');
            } else { 
                $(navSelector).removeClass('active');
            }
        }); 
        
        $('#keyboard_list').empty();

        const filteredKeyboards = keyboardsClass.getSwitchFilter(switchType);
        loadKeyboards(filteredKeyboards);
        keyboardsClass.set(filteredKeyboards);
    }

    function loadKeyboards(keyboards) {
        let content = '';    

        keyboards.map(function (keyboard) {
            content += KeyboardHTML.getKeyboardHtml(keyboard); 
        });

        $('#keyboard_list').append(content);
    }
    
})(); 





