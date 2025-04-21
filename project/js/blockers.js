// Digital Detox Blockers Module
const blockersModule = (() => {
  function toggleBlocker(checkbox) {
    const blockerItem = checkbox.closest('.blocker-item');
    
    if (checkbox.checked) {
      blockerItem.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';
    } else {
      blockerItem.style.backgroundColor = '#f8f9fa';
    }
    
    // Save to localStorage
    saveData();
  }
  
  function addBlocker() {
    const blockerInput = document.getElementById('newBlocker');
    const blockerText = blockerInput.value.trim();
    
    if (blockerText) {
      const blockersList = document.querySelector('.blockers-list');
      
      const blockerItem = document.createElement('div');
      blockerItem.className = 'blocker-item';
      
      blockerItem.innerHTML = `
        <span>${blockerText}</span>
        <label class="toggle-switch">
          <input type="checkbox" onchange="blockersModule.toggleBlocker(this)">
          <span class="slider"></span>
        </label>
      `;
      
      blockersList.appendChild(blockerItem);
      
      // Clear input
      blockerInput.value = '';
      
      // Save to localStorage
      saveData();
    }
  }
  
  // Public API
  return {
    toggleBlocker,
    addBlocker
  };
})();