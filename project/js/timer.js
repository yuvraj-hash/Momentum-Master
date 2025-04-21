// Timer Module
const timerModule = (() => {
  let timerInterval;
  
  function startTimer(minutes) {
    // Clear any existing timers
    clearInterval(timerInterval);
    
    // Set end time
    const endTime = new Date().getTime() + minutes * 60 * 1000;
    
    // Update timer display immediately
    updateTimerDisplay(endTime);
    
    // Set interval to update timer every second
    timerInterval = setInterval(() => {
      updateTimerDisplay(endTime);
    }, 1000);
  }
  
  function updateTimerDisplay(endTime) {
    const now = new Date().getTime();
    const distance = endTime - now;
    
    // If timer is done
    if (distance < 0) {
      clearInterval(timerInterval);
      document.getElementById('focusTimer').textContent = "00:00";
      playTimerEndSound();
      return;
    }
    
    // Calculate minutes and seconds
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Display the result
    document.getElementById('focusTimer').textContent = 
      (minutes < 10 ? "0" + minutes : minutes) + ":" + 
      (seconds < 10 ? "0" + seconds : seconds);
  }
  
  function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById('focusTimer').textContent = "25:00";
  }
  
  function playTimerEndSound() {
    // Visual notification
    document.getElementById('focusTimer').style.color = 'var(--accent)';
    setTimeout(() => {
      document.getElementById('focusTimer').style.color = 'var(--deep-blue)';
    }, 1000);
    
    // Vibrate if supported
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
    
    // Show a notification if permitted
    if (Notification && Notification.permission === "granted") {
      new Notification("Time's up!", {
        body: "Your coding session has ended. Time for a break!"
      });
    } else if (Notification && Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification("Time's up!", {
            body: "Your coding session has ended. Time for a break!"
          });
        }
      });
    }

    // Create confetti celebration
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        createConfetti();
      }, i * 50);
    }
  }
  
  // Public API
  return {
    startTimer,
    resetTimer
  };
})();