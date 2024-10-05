const fs = require('fs');
const axios = require('axios');

const websites = [
    { title: 'Agriculture', url: 'http://example.com/agriculture' },
    { title: 'Basic Education', url: 'http://example.com/basic-education' },
    // Add more websites here...
];

async function checkWebsiteStatus() {
    let results = [];

    for (const website of websites) {
        try {
            const response = await axios.get(website.url);
            results.push(`Website: ${website.title} - Status: ${response.status}`);
        } catch (error) {
            results.push(`Website: ${website.title} - Status: Offline`);
        }
    }

    // Write results to a text file
    fs.writeFileSync('results.txt', results.join('\n'), 'utf8');
}

checkWebsiteStatus()
    .then(() => console.log('Website status check complete. Results saved in results.txt.'))
    .catch(error => console.error('Error checking website status:', error));
