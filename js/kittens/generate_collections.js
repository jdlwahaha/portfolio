(function () {
    $(document).ready(function () {
        $.getJSON('../../data/explodingkittens/editions.json', function (editions) {
            const html = editions.map(edition => { 
                const displayType = getType(edition.type);

                
                const image = (edition.filename === 'minions')
                            ? `<img src="../../data/explodingkittens/${edition.filename}/package.gif" alt="${edition.filename}.gif">`
                            : `<img src="../../data/explodingkittens/${edition.filename}/package.jpeg" alt="${edition.filename}.jpeg">`;
                
                const amazonLink = (edition.amazon) 
                            ? getAmazonLink('', edition.amazon) 
                            : '';
                            
                const editionLink = (edition.show_link === false) 
                    ? edition.name
                    : `<a href="detail?edition=${edition.filename}">
                            ${edition.name} 
                        </a>`;

                return `
                    <tr>
                        <td>
                            ${editionLink}
                            <br>
                            <div class="mobile-800">
                                <div class="addMarginTop">${displayType}</div>
                                <div class="addMarginTop mobile">
                                    CDN$${edition.price} <br><br>
                                    ${amazonLink}
                                </div>
                            </div>
                            
                        </td> 
                        <td class=" center zoom">
                            ${image} 
                        </td>
                        <td class="price desktop center">
                            $${edition.price} <br>
                            ${amazonLink}
                        </td>
                        <td class="desktop-800">${displayType}</td>
                        <td class="center">${edition.players}</td>   
                        <td class="center">${edition.num_of_cards}</td>                                                             
                        <td class="desktop center">${edition.release_year}</td>
                        <td class="desktop-700 center">${edition.acquisition_date}</td>
                    </tr>
                `; 
            }); 
            $('#tableData').append(html);
        });

    })

    function getType(type) { 
        switch(type) { 
            case 'full': 
                return 'Full Game'; 
            case 'full_no': 
                return 'Full Game (Not compatible with other editions or expansions)'; 
            case 'expansion': 
                return 'Expansion'; 
            default: 
                return '';
        }
    }
})();