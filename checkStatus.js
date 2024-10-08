//DEPRECTATED_DEPRECTATED_DEPRECTATED_DEPRECTATED_DEPRECTATED_DEPRECTATED_DEPRECTATED_DEPRECTATED_DEPRECTATED_DEPRECTATED_DEPRECTATED_DEPRECTATED
 
const fs = require('fs');
const axios = require('axios');

// Read the sites.txt file
const sites = fs.readFileSync('sites.txt', 'utf-8').trim().split('\n');

// Create an array to store promises
const statusPromises = [];

// Check website status function
const checkWebsiteStatus = async (url, title) => {
    try {
        const response = await axios.get(url);
        return `Website: ${title} - Status: ${response.status}`;
    } catch (error) {
        return `Website: ${title} - Status: Offline`;
    }
};

// Iterate through the sites and create status promises
sites.forEach(line => {
    const [url, title] = line.split(',');
    if (url && title) {
        const trimmedUrl = url.trim();
        const trimmedTitle = title.trim();
        // Push the promise to the array
        statusPromises.push(checkWebsiteStatus(trimmedUrl, trimmedTitle));
    }
});

// Execute all promises concurrently
Promise.all(statusPromises)
    .then(results => {
        // Write the results to output.txt
        fs.writeFileSync('output.txt', results.join('\n'), 'utf-8');
        console.log('Website statuses checked and saved to output.txt');
    })
    .catch(error => {
        console.error('Error checking website statuses:', error);
    });
