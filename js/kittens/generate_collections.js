(function () {
    $(document).ready(function () {
        $.getJSON('../../data/explodingkittens/editions.json', function (editions) {
            const html = editions.map(edition => { 
                const displayType = getType(edition.type);

                
                const image = (edition.filename === 'minions')
                            ? `<img src="../../data/explodingkittens/${edition.filename}/package.gif" alt="${edition.filename}.gif">`
                            : `<img src="../../data/explodingkittens/${edition.filename}/package.jpeg" alt="${edition.filename}.jpeg">`;
                            
                const amazonLink = `
                        <a target="_blank" class="amazon" href="${edition.amazon}" >
                            <img class="icon" src="../../data/links/amazon.png" /> 
                            <img class="icon" src="../../data/links/canada.png" /> 
                            <span class="showOnHover">
                                Buy from Amazon.ca
                                
                            </span>
                        </a>
                    `;

                return `
                    <tr>
                        <td>
                            <a href="detail?edition=${edition.filename}">
                                ${edition.name} 
                            </a><br>
                            <div class="mobile">
                                <div class="addMarginTop">Type: ${displayType}</div>
                                <div class="addMarginTop">
                                    CDN$${edition.price}
                                    ${amazonLink}
                                </div>
                                
                            </div>
                            
                        </td> 
                        <td class=" center zoom">
                            ${image} 
                        </td>
                        <td class="price desktop">
                            <div>$${edition.price}</div>
                            ${amazonLink}
                        </td>
                        <td class="desktop">${displayType}</td>
                        <td class="center">${edition.players}</td>   
                        <td class="center">${edition.num_of_cards}</td>                                                             
                        <td class="desktop center">${edition.release_year}</td>
                        <td class="desktop center">${edition.acquisition_date}</td>
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
                return 'Full Game (Not compatible with other editions)'; 
            case 'expansion': 
                return 'Expansion'; 
            default: 
                return '';
        }
    }
})();