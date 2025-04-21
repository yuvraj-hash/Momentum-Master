// Breathing Exercise Module
const breathingModule = (() => {
  let breathingInterval;
  
  function startBreathingExercise() {
    // Clear any existing interval
    clearInterval(breathingInterval);
    
    const breathInstruction = document.getElementById('breathInstruction');
    const breathTimer = document.getElementById('breathTimer');
    const breathAnimation = document.getElementById('breathAnimation');
    
    let totalSeconds = 0;
    let phase = 'inhale'; // inhale, hold, exhale
    let phaseSeconds = 0;
    
    // Update immediately
    updateBreathingDisplay();
    
    // Update every second
    breathingInterval = setInterval(() => {
      totalSeconds++;
      phaseSeconds++;
      
      // Cycle through breathing phases
      if (phase === 'inhale' && phaseSeconds >= 4) {
        phase = 'hold';
        phaseSeconds = 0;
      } else if (phase === 'hold' && phaseSeconds >= 4) {
        phase = 'exhale';
        phaseSeconds = 0;
      } else if (phase === 'exhale' && phaseSeconds >= 6) {
        phase = 'inhale';
        phaseSeconds = 0;
      }
      
      updateBreathingDisplay();
      
      // Update timer display
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      
      breathTimer.textContent = 
        (minutes < 10 ? "0" + minutes : minutes) + ":" + 
        (seconds < 10 ? "0" + seconds : seconds);
      
    }, 1000);
    
    function updateBreathingDisplay() {
      if (phase === 'inhale') {
        breathInstruction.textContent = 'Breathe in...';
        breathAnimation.style.transform = 'scale(1.2)';
        breathAnimation.style.opacity = '1';
      } else if (phase === 'hold') {
        breathInstruction.textContent = 'Hold...';
      } else if (phase === 'exhale') {
        breathInstruction.textContent = 'Breathe out...';
        breathAnimation.style.transform = 'scale(0.8)';
        breathAnimation.style.opacity = '0.5';
      }
    }
  }
  
  function stopBreathingExercise() {
    clearInterval(breathingInterval);
    document.getElementById('breathTimer').textContent = '0:00';
    document.getElementById('breathInstruction').textContent = 'Breathe in...';
  }
  
  // Public API
  return {
    startBreathingExercise,
    stopBreathingExercise
  };
})();