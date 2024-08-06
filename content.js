// Function to extract the article ID from different arXiv URLs
function getArticleId(url) {
    console.log(`Checking URL: ${url}`);  // Debugging: Log the URL

    const absMatch = url.match(/arxiv\.org\/abs\/(.+)/);
    const pdfMatch = url.match(/arxiv\.org\/pdf\/(.+)/);
    const htmlMatch = url.match(/arxiv\.org\/html\/(.+)/);
    const formatMatch = url.match(/arxiv\.org\/format\/(.+)/);

    console.log(`Matches:`, { absMatch, pdfMatch, htmlMatch, formatMatch });  // Debugging: Log match results

    if (absMatch) return absMatch[1];
    if (pdfMatch) return pdfMatch[1];
    if (htmlMatch) return htmlMatch[1];
    if (formatMatch) return formatMatch[1];

    return null;
}

// Function to process article ID to remove version suffix
function processArticleId(articleId) {
    return articleId.replace(/v\d+$/, '');
}

// Function to log and save the viewed article id
function logAndSaveArticleId() {
    const url = window.location.href;
    let articleId = getArticleId(url);

    if (articleId) {
        articleId = processArticleId(articleId);  // Process the ID to remove version suffix
        console.log(`Viewing article with id ${articleId}`);

        // Get the current history from local storage
        chrome.storage.local.get({ history: [] }, function(result) {
            let history = result.history;
            let articleIndex = history.findIndex(entry => entry.id === articleId);
            
            if (articleIndex !== -1) {
                // Article already viewed, update the timestamp and increment the count
                history[articleIndex].timestamp = new Date().toISOString();
                history[articleIndex].count += 1;
            } else {
                // Add the new article ID
                history.push({ id: articleId, timestamp: new Date().toISOString(), count: 1 });
            }

            // Save the updated history back to local storage
            chrome.storage.local.set({ history: history });
        });
    } else {
        console.log('No valid article ID found for this URL.');  // Log if no ID is found
    }
}

// Run the function on page load
logAndSaveArticleId();