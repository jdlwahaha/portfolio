(function () {
    $(document).ready(function () {
        $.getJSON('../../data/explodingkittens/editions.json', function (editions) {

            const editionName = $.urlParam('edition');
            const available_editions_names = ['barking'];
            
            if (editionName && available_editions_names.indexOf(editionName) >= 0) {

                $.getJSON(`../../data/explodingkittens/${editionName}/detail.json`, function (barkingKittens) {

                    const editionDetail = editions.find(e => e.filename === barkingKittens.filename);
                    const fullDetail = { ...editionDetail, ...barkingKittens };

                    const expansionWarning = (fullDetail.type === 'expansion')
                        ? `
                        <div class="well well-info" >
                            This is an expansion pack. You will need one of the full game edition to play this game. 
                        </div>`
                        : '';

                    const cardList = fullDetail.card_list.map(i => `<li>${i}</li>`).join('');
                    const contentList = fullDetail.contents.map(i => `<li>${i}</li>`).join('');

                    const html =
                        `
                <h1>${fullDetail.name}</h1>
                    <div class="box-content">
                        ${expansionWarning}
    
                        <div class="info-block">
                            <span>
                                <ul>
                                    <li><strong>Expansion Number:</strong> ${fullDetail.expansion_no}</li>
                                    <li><strong>Number of Cards:</strong> ${fullDetail.num_of_cards}</li>
                                    <li>
                                        <strong>Other Contents:</strong> 
                                        <ul class="ul-nopadding">
                                            ${contentList}
                                        </ul>
                                    </li>
                                    <li><strong>MSRP:</strong> CDN$${fullDetail.price}</li>
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
                                <img src="../../data/explodingkittens/${fullDetail.filename}/all.png" alt="all.png">
                            </span>
                        </div>
                        
                        <!-- <p>
                            
                        </p> -->
                    </div>
                
                `;


                    $('#detailBox').append(html);

                    $('#iframe').append(`
                        <iframe 
                            src="https://www.youtube.com/embed/${fullDetail.youtubeId}" 
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="encrypted-media; gyroscope; picture-in-picture;" 
                            allowfullscreen
                        ></iframe>
                    `);

                    const imageHtml = fullDetail.images.map(i => `
                        <span>
                            <img src="../../data/explodingkittens/${fullDetail.filename}/${i}.jpeg" alt="${i}.jpeg">
                        </span>
                    `);
                    $('#cards').append(imageHtml);
                });
            } else {
                window.location.href = window.location.origin + '/portfolio/html/explodingkittens';
            }

        })

    })

})();