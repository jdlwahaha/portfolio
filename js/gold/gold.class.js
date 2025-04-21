class GoldClass extends AbstractGoldClass {

    async init() { 
        const golds = await $.getJSON('../../data/gold/gold.json');

        let html = '';

        const cost = super.readablePrice(super.getTotalCost(golds));
        $('#cost').append(`${cost}`);

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
                    <strong>${gold.date}</strong>
                </div>
                <div>
                    Price: <strong class="green">${super.readablePrice(gold.price)}</strong>
                </div>
                <div class="imageblock">
                    <image src="../../data/gold/${gold.filename}" width="300"/>
                </div>
            </div> 
        `;
    }
}