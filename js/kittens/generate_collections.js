(function () {
    $(document).ready(function () {
        $.getJSON('../../data/explodingkittens/editions.json', function (editions) {
            const html = editions.map(edition => { 
                const displayType = getType(edition.type);

                const link = (edition.completed) 
                    ? `
                    <a href="detail?edition=${edition.filename}">
                                ${edition.name} 
                            </a><br>` : `${edition.name}<br>`; 

                return `
                    <tr>
                        <td>
                            ${link}
                            
                            <span class="mobile">${displayType}</span><br>

                            <!--<div>
                                <img src="../../data/explodingkittens/${edition.filename}.png" alt="${edition.filename}">
                            </div>-->
                        </td> 
                        <td class="desktop">${displayType}</td>
                        <td class="price">
                            <span>$${edition.price}<span>
                            <a target="_blank" href="${edition.amazon}">
                                <img class="icon right" src="../../data/links/canada.png" /> 
                                <img class="icon right" src="../../data/links/amazon.png" /> 
                            </a>
                        </td>
                        <td>${edition.players}</td>   
                        <td>${edition.num_of_cards}</td>                                                             
                        <td class="desktop">${edition.release_year}</td>
                        <td class="desktop">${edition.acquisition_date}</td>
                    </tr>
                `; 
            }); 
            $('#tableData').append(html);
        });

    })

    function getType(type) { 
        switch(type) { 
            case 'full': 
                return 'Full'; 
            case 'full_no': 
                return 'Full (Not compatible with other editions)'; 
            case 'expansion': 
                return 'Expansion'; 
            default: 
                return '';
        }
    }
})();