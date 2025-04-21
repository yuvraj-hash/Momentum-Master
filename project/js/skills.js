// Skills Development Module
const skillsModule = (() => {
  function addSkill() {
    const skillInput = document.getElementById('newSkill');
    const skill = skillInput.value.trim();
    
    if (skill) {
      const skillTracking = document.getElementById('skillTracking');
      
      const skillItem = document.createElement('div');
      skillItem.className = 'value-item';
      
      skillItem.innerHTML = `
        <div class="value-text">
          <h3>${skill}</h3>
          <p>Practice minutes this week: 0</p>
        </div>
        <div class="value-progress">
          <div class="value-bar" style="width: 0%;"></div>
        </div>
      `;
      
      skillTracking.appendChild(skillItem);
      
      // Clear input
      skillInput.value = '';
      
      // Save to localStorage
      saveData();
    }
  }
  
  // Public API
  return {
    addSkill
  };
})();