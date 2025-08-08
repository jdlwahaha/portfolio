class AbstractGoldClass {
    constructor() {
        if (new.target === AbstractGoldClass) {
            throw new Error("Cannot instantiate abstract class.");
        }
    }

    getGoldItemHtml() {
        throw new Error("Method must be implemented in subclass.");
    }


    getCssClass(index, golds) { 
        let cssClass = "description"; 
    
        if (index == 0) { 
            cssClass += ' first';
        } else if (index === golds.length-1) { 
            cssClass += ' last';
        }
    
        return cssClass; 
    }

    getTotalCost(golds) { 
        let sum = 0; 
        golds.map(i => {sum += i.buy.price}); 
        return sum;
    }

    loadWantHtml() { 
        const wants = [
            'pamp-buffalo',
            'pamp-liberty-bell',
            'pamp-statue-of-liberty'
        ]; 

        const htmls = wants.map(want => { 
            return `
                <div class="imageblock description">
                    <image src="../../data/gold/${want}.jpeg" width="300"/>
                </div>
            `;
        });

        const html = htmls.join('');
        $('#want').append(html);

    }
    
    readablePrice(number) { 
        if (number) { 
            return number.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            });
        }
        return 0;
    }

}

