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
            keyboardsClass.set(matchSearch);

            if (selectedFilterSwitch === 'hasVideoReview') { 
                matchSearch = keyboardsClass.getVideoReviews();
            }
            else if (selectedFilterSwitch) { 
                matchSearch = keyboardsClass.getSwitchFilter(selectedFilterSwitch);
            }

            $('#keyboard_list').empty();
            loadKeyboards(matchSearch); 
        });
        
    });


    function addFilterListeners() { 
        const allFilters = [
            'all',
            SwitchTypes.linear(),
            SwitchTypes.tactile(),
            SwitchTypes.clicky(),
            SwitchTypes.membrane(),
            'hasVideoReview'
        ]

        Keyboards.getSwitchTypes().map(filterOption => { 
            document.getElementById(`${filterOption}Filter`).addEventListener('click', () => { 
                updateFilterSelection(filterOption, allFilters);
                filterBySwitch(filterOption);
            });
        });


        document.getElementById(`hasVideoReviewFilter`).addEventListener('click', () => { 
            updateFilterSelection('hasVideoReview', allFilters);
            filterByVideo();
        });
    }

    function updateFilterSelection(switchType, allFilters) { 
        selectedFilterSwitch = switchType;
        keyboardsClass.resetList();

        if (searchTerm) { 
            keyboardsClass.set(keyboardsClass.getByName(searchTerm));
        }

        allFilters.map(type => { 
            const navSelector = `#${type}Filter`; 

            if (switchType === type) { 
                $(navSelector).addClass('active');
            } else { 
                $(navSelector).removeClass('active');
            }
        }); 
        
        $('#keyboard_list').empty();
    }


    function filterByVideo() { 
        const filteredKeyboards = keyboardsClass.getVideoReviews();
        loadKeyboards(filteredKeyboards);
        keyboardsClass.set(filteredKeyboards);
    }

    function filterBySwitch(switchType) { 
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





