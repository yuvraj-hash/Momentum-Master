// Journal Module
const journalModule = (() => {
  function saveJournalEntry(type) {
    let journalInput;
    let entriesContainer;
    
    if (type === 'confidence') {
      journalInput = document.getElementById('confidenceJournal');
      entriesContainer = document.getElementById('confidenceEntries');
    } else if (type === 'purpose') {
      journalInput = document.getElementById('purposeJournal');
      entriesContainer = document.getElementById('purposeEntries');
    }
    
    const journalText = journalInput.value.trim();
    
    if (journalText) {
      // Create a new journal entry
      const entryElement = document.createElement('div');
      entryElement.className = 'journal-entry';
      
      // Get current date
      const now = new Date();
      const dateStr = `${now.toLocaleString('default', { month: 'long' })} ${now.getDate()}, ${now.getFullYear()}`;
      
      entryElement.innerHTML = `
        <div class="journal-date">${dateStr}</div>
        <div class="journal-content">${journalText}</div>
      `;
      
      // Add to the beginning of the container
      if (entriesContainer.firstChild) {
        entriesContainer.insertBefore(entryElement, entriesContainer.firstChild);
      } else {
        entriesContainer.appendChild(entryElement);
      }
      
      // Clear input
      journalInput.value = '';
      
      // Save to localStorage
      saveData();
    }
  }
  
  // Public API
  return {
    saveJournalEntry
  };
})();