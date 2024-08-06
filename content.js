// content.js

// Function to log and save the viewed article id
function logAndSaveArticleId() {
    const url = window.location.href;
    const articleIdMatch = url.match(/arxiv\.org\/abs\/(.+)/);
    if (articleIdMatch) {
        const articleId = articleIdMatch[1];
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
    }
}

// Run the function on page load
logAndSaveArticleId();
