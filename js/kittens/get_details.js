(function () {
    $(document).ready(function () {
        $.getJSON('../../data/explodingkittens/editions.json', function (editions) {

            const editionName = $.urlParam('edition');
            const available_editions_names = editions.map(edition => { 
                return edition.filename;
            }); 
            
            if (editionName && available_editions_names.indexOf(editionName) >= 0) {

                $.getJSON(`../../data/explodingkittens/detail/${editionName}.json`, function (specificEditionDetail) {

                    const editionDetail = editions.find(e => e.filename === specificEditionDetail.filename);
                    const fullDetail = { ...editionDetail, ...specificEditionDetail };

                    const isExpansion = (fullDetail.type === 'expansion'); 
                    const expansionWarning = `
                        <div class="well well-info" >
                            This is an expansion pack. You will need one of the full game edition to play this game. 
                        </div>`;


                    // get a list of card names 
                    const cardNames = Object.keys(fullDetail.cards);
                    let displayCardNames = []; 
                    let cardGroupImages = '';
                    cardNames.map(name => {
                        const images = fullDetail.cards[name].images;
                        const description = fullDetail.cards[name].description;
                        cardGroupImages += `<h4>${name} (${images.length})</h4><p>${description}</p>`;
                        displayCardNames.push(name + ` (${images.length})`)
                        
                        images.map(i => { 
                            cardGroupImages += `
                            <span>
                                <img  src="../../data/explodingkittens/${fullDetail.filename}/IMG_${i}.jpeg" alt="${i}.jpeg">
                            </span>
                            `;
                        });
                        cardGroupImages += '<br><br>';

                    });

                    $('#cards').append(cardGroupImages);


                    const contentList = fullDetail.contents.map(i => `<li>${i}</li>`).join('');
                    const cardList = '<li>' + displayCardNames.join('</li><li>') + '</li>';

                    const html = `
                        <h1>${fullDetail.name}</h1>
                            <div class="box-content">
                                ${ isExpansion ? expansionWarning : '<p></p>'}
            
                                <div class="info-block">
                                    <span>
                                        <ul>
                                            ${ isExpansion ? `<li><strong>Expansion Number:</strong> ${fullDetail.expansion_no}</li>` : '' }
                                            <li>
                                                <strong>Price:</strong> CDN$${fullDetail.price}    
                                                ${getAmazonLink(fullDetail.amazon)}
                                                
                                            </li>
                                            <li>
                                                <strong>Contents:</strong> 
                                                <ul class="ul-nopadding">
                                                    <li>${fullDetail.num_of_cards} Cards</li>
                                                    ${contentList}
                                                </ul>
                                            </li>
                                            <li><strong>Card Label:</strong> ${fullDetail.card_label} </li>
                                            <li>
                                                <strong>Cards:</strong>
                                                <ul class="ul-nopadding">
                                                    ${cardList}
                                                </ul>
                                            </li>
                                        </ul>
                                    </span>
                                    <span>
                                        <img src="../../data/explodingkittens/${fullDetail.filename}/all.jpeg" alt="all.jpeg">
                                    </span>
                                </div>
                                
                    
                            </div>
                        
                        `;


                    $('#detailBox').append(html);

                    appendYouTube(fullDetail.youtubeId);
                    
                });
            } else {
                window.location.href = window.location.origin + '/portfolio/html/explodingkittens';
            }

        })

    }); 

    function appendYouTube(id) { 
        if (id) { 
            $('#iframe').append(`
            <iframe 
                src="https://www.youtube.com/embed/${id}" 
                title="YouTube video player" 
                frameborder="0" 
                allow="encrypted-media; gyroscope; picture-in-picture;" 
                allowfullscreen
            ></iframe>
        `);
        }
    }

})();