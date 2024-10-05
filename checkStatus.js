const fs = require('fs');
const axios = require('axios');

async function checkWebsiteStatus(websites) {
    const results = await Promise.all(websites.map(async (site) => {
        const [url, title] = site.split(',');
        try {
            const response = await axios.get(url.trim());
            return `Website: ${title.trim()} - Status: ${response.status}`;
        } catch (error) {
            return `Website: ${title.trim()} - Status: Offline`;
        }
    }));
    
    return results;
}

async function main() {
    const websites = fs.readFileSync('sites.txt', 'utf8').split('\n');
    const results = await checkWebsiteStatus(websites);

    // Save results to a text file
    fs.writeFileSync('results.txt', results.join('\n'), 'utf8');
}

main();
