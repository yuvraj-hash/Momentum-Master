// Limiting Beliefs Module
const beliefsModule = (() => {
  function saveBeliefReframe() {
    const limitingBelief = document.getElementById('limitingBelief').value.trim();
    const empoweringAlternative = document.getElementById('empoweringAlternative').value.trim();
    
    if (limitingBelief && empoweringAlternative) {
      // Clear inputs
      document.getElementById('limitingBelief').value = '';
      document.getElementById('empoweringAlternative').value = '';
      
      // Show success message with modal
      showModal('belief-reframe', {
        limitingBelief: limitingBelief,
        empoweringAlternative: empoweringAlternative
      });
      
      // Save to localStorage
      saveData();
    } else {
      alert('Please fill in both fields.');
    }
  }
  
  // Public API
  return {
    saveBeliefReframe
  };
})();