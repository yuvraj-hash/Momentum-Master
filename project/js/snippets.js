// Code Snippets Module
const snippetsModule = (() => {
  function saveSnippet() {
    const titleInput = document.getElementById('snippetTitle');
    const languageSelect = document.getElementById('snippetLanguage');
    const codeInput = document.getElementById('snippetCode');
    
    const title = titleInput.value.trim();
    const language = languageSelect.value;
    const code = codeInput.value.trim();
    
    if (title && code) {
      const snippetsList = document.getElementById('snippetsList');
      
      const snippetItem = document.createElement('div');
      snippetItem.className = 'snippet-item';
      
      snippetItem.innerHTML = `
        <div class="snippet-header">
          <h3>${title}</h3>
          <span class="snippet-language">${language}</span>
        </div>
        <pre class="snippet-code">${escapeHTML(code)}</pre>
        <div class="snippet-actions">
          <button class="button-secondary" onclick="snippetsModule.copySnippet(this)">Copy</button>
          <button class="button-danger" onclick="snippetsModule.deleteSnippet(this)">Delete</button>
        </div>
      `;
      
      snippetsList.appendChild(snippetItem);
      
      // Clear inputs
      titleInput.value = '';
      codeInput.value = '';
      
      // Save to localStorage
      saveData();
    } else {
      alert('Please provide both a title and code for your snippet.');
    }
  }
  
  function copySnippet(button) {
    const snippetItem = button.closest('.snippet-item');
    const code = snippetItem.querySelector('.snippet-code').textContent;
    
    // Copy to clipboard
    navigator.clipboard.writeText(code).then(() => {
      // Change button text temporarily to show success
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      alert('Failed to copy code. Please try again.');
    });
  }
  
  function deleteSnippet(button) {
    const snippetItem = button.closest('.snippet-item');
    
    // Add fade-out animation
    snippetItem.style.opacity = '0';
    
    setTimeout(() => {
      snippetItem.remove();
      saveData();
    }, 300);
  }
  
  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  
  // Public API
  return {
    saveSnippet,
    copySnippet,
    deleteSnippet
  };
})();