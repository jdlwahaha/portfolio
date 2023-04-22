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

                    const cardList = fullDetail.card_list.map(i => `<li>${i}</li>`).join('');
                    const contentList = fullDetail.contents.map(i => `<li>${i}</li>`).join('');

                    const html =
                        `
                <h1>${fullDetail.name}</h1>
                    <div class="box-content">
                        ${ isExpansion ? expansionWarning : '<p></p>'}
    
                        <div class="info-block">
                            <span>
                                <ul>
                                    ${ isExpansion ? `<li><strong>Expansion Number:</strong> ${fullDetail.expansion_no}</li>` : '' }
                                    <li>
                                        <strong>Price:</strong> CDN$${fullDetail.price} <br>    
                                        <a target="_blank" href="${fullDetail.amazon}">
                                            Buy from Amazon.ca 
                                            <img class="icon" src="../../data/links/amazon.png" />
                                            <img class="icon" src="../../data/links/canada.png" /> 
                                        </a>
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
                        
                        <!-- <p>
                            
                        </p> -->
                    </div>
                
                `;


                    $('#detailBox').append(html);

                    if (fullDetail.youtubeId) { 
                        $('#iframe').append(`
                        <iframe 
                            src="https://www.youtube.com/embed/${fullDetail.youtubeId}" 
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="encrypted-media; gyroscope; picture-in-picture;" 
                            allowfullscreen
                        ></iframe>
                    `);
                    }
                   

                    let images = []; 
                    for (let i = fullDetail.images.start; i <= fullDetail.images.end; i++) { 
                        if (fullDetail.images.exclude) { 
                            if (!fullDetail.images.exclude.includes(i)) {
                                images.push(`${i}`); 
                            }
                        } else { 
                            images.push(`${i}`); 
                        }
                    }
                    
                    console.log('size:', images.length);
                    const imageHtml = images.map(i => `
                        <span>
                            <img  src="../../data/explodingkittens/${fullDetail.filename}/IMG_${i}.jpeg" alt="${i}.jpeg">
                        </span>
                    `).join('');
                    $('#cards').append(imageHtml);
                });
            } else {
                window.location.href = window.location.origin + '/portfolio/html/explodingkittens';
            }

        })

    })

})();