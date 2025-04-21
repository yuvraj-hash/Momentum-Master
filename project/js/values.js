// Values Module
const valuesModule = (() => {
  function toggleValue(valueTag) {
    valueTag.classList.toggle('selected');
    
    // Save to localStorage
    saveData();
  }
  
  function addCustomValue() {
    const customValueInput = document.getElementById('customValue');
    const customValue = customValueInput.value.trim();
    
    if (customValue) {
      const coreValues = document.querySelector('.core-values');
      
      const valueTag = document.createElement('div');
      valueTag.className = 'value-tag';
      valueTag.textContent = customValue;
      valueTag.onclick = function() { toggleValue(this); };
      
      coreValues.appendChild(valueTag);
      
      // Clear input
      customValueInput.value = '';
      
      // Save to localStorage
      saveData();
    }
  }
  
  // Public API
  return {
    toggleValue,
    addCustomValue
  };
})();