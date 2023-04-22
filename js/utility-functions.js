function getAmazonLink(link) { 
    return `
        <a target="_blank" class="amazon" href="${link}" >
            <img class="icon" src="../../data/links/amazon.png" /> 
            <img class="icon" src="../../data/links/canada.png" /> 
            <span class="showOnHover">
                Buy from Amazon.ca
            </span>
        </a>
    `;
}