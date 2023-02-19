class KeyboardHTML { 
    static getKeyboardHtml(keyboard) { 
        const thumbnail = `../../data/keyboards/thumbnails/${keyboard.filename}.png`;
        const youtubeLink = (keyboard.youtubeId)
                    ? `&nbsp;<a href="https://youtu.be/${keyboard.youtubeId}" target="_blank" title="Watch on YouTube">
                            <img src="../../img/play.png" width="20"/>
                        </a>
                        `
                    : '';


        const switchType = this.getSwitchHtml(keyboard);

        const price = (keyboard.msrp && keyboard.myPrice)
                ? `<div>$${keyboard.msrp} &nbsp;<span class="myPrice" title="total price that I paid included tax">($${keyboard.myPrice})<span></div>`
                : ``;
        return `
            <section class="box">
                <div class="box-content">
                <span class="thumbnail-container keyboard-thumbnail-container">
                    <img src="${thumbnail}" alt="${keyboard.filename}.png">
                </span>
                    <div class="book-container keyboard-container">
                        <h4>${keyboard.name} ${youtubeLink}</h4>
                        ${switchType}
                        ${price}
                        <div class="rating"> ${getRatingString(keyboard.rating)}</div>
                        <p class="review">${keyboard.review}</p>
                    </div>
                </div>
            </section>
        `;
    }

    static getSwitchHtml(keyboard) { 
        let switchSymbol = ''; 

        switch(keyboard.switchType) { 
            case SwitchTypes.linear: 
                switchSymbol = '&#128997;'; 
                break;
            case SwitchTypes.tactile: 
                switchSymbol = '&#129003;'; 
                break;
            case SwitchTypes.clicky: 
                switchSymbol = '&#128998;'; 
                break;
            case SwitchTypes.membrane: 
                switchSymbol = '&#128999;';
                keyboard.switchName = 'Membrane'; 
                break;
            case SwitchTypes.mecha: 
                switchSymbol = '&#11036;'; 
                keyboard.switchName = 'Mecha-Membrane'; 
                break;
        }

        return `<div title="${keyboard.switchType} switch" class="${keyboard.switchType}">${switchSymbol} ${keyboard.switchName}</div>`;
    }
}