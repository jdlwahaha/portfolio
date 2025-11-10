class GoldClass extends AbstractGoldClass {

    async init() { 
        let golds = await $.getJSON('../../data/gold/gold.json');

        let html = '';


        golds.map((gold, i) => { 
            let cssClass = super.getCssClass(i, golds);
            html += this.getGoldItemHtml(cssClass, gold); 
        });
        $('#list').append(html);
    }


    getGoldItemHtml(cssClass, gold) {
        return `
            <div class="${cssClass}">
                <div>
                    <strong>${gold.buy.date}</strong>
                </div>
                <div>
                    Price: <strong class="green">${super.readablePrice(gold.buy.price)}</strong>
                </div>
                <div class="imageblock">
                    <image src="../../data/gold/${gold.filename}" width="300"/>
                </div>
            </div> 
        `;
    }
}