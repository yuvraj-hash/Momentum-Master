// Code Metrics Module
const codeMetricsModule = (() => {
  function addCodeMetric() {
    const metricNameInput = document.getElementById('metricName');
    const metricValueInput = document.getElementById('metricValue');
    
    const metricName = metricNameInput.value.trim();
    const metricValue = parseInt(metricValueInput.value);
    
    if (metricName && !isNaN(metricValue)) {
      const metricsContainer = document.getElementById('codeMetrics');
      
      const metricItem = document.createElement('div');
      metricItem.className = 'value-item';
      
      // Calculate a percentage for the progress bar (1-100)
      const percentage = Math.min(Math.max(metricValue * 10, 10), 100);
      
      metricItem.innerHTML = `
        <div class="value-text">
          <h3>${metricName}</h3>
          <p>This week: ${metricValue}</p>
        </div>
        <div class="value-progress">
          <div class="value-bar" style="width: ${percentage}%;"></div>
        </div>
      `;
      
      metricsContainer.appendChild(metricItem);
      
      // Clear inputs
      metricNameInput.value = '';
      metricValueInput.value = '';
      
      // Save to localStorage
      saveData();
    } else {
      alert('Please enter a valid metric name and value.');
    }
  }
  
  // Public API
  return {
    addCodeMetric
  };
})();