// popup.js

// Function to display the history
function displayHistory() {
    const historyList = document.getElementById('history');

    chrome.storage.local.get({ history: [] }, function(result) {
        const history = result.history;

        // Clear the list
        historyList.innerHTML = '';

        // Populate the list with history items
        history.forEach(function(entry) {
            const listItem = document.createElement('li');
            listItem.textContent = `ID: ${entry.id}, Last viewed on: ${new Date(entry.timestamp).toLocaleString()}${entry.count > 1 ? ` (+ ${entry.count - 1} times)` : ''}`;
            historyList.appendChild(listItem);
        });
    });
}

// Function to clear the history
function clearHistory() {
    chrome.storage.local.set({ history: [] }, function() {
        displayHistory(); // Refresh the displayed history
    });
}

// Add event listener to the clear history button
document.getElementById('clearHistory').addEventListener('click', clearHistory);

// Run the function on popup load
document.addEventListener('DOMContentLoaded', displayHistory);
