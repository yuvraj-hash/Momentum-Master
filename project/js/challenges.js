// Growth Challenges Module
const challengesModule = (() => {
  const challenges = [
    "Implement a feature using a design pattern you've never used before.",
    "Contribute to an open-source project you use regularly.",
    "Learn and implement a new testing strategy for your code.",
    "Optimize a slow function or component in your codebase.",
    "Set up a CI/CD pipeline for a project that doesn't have one.",
    "Explore and implement a feature with a technology you're unfamiliar with.",
    "Build a micro-feature in a functional programming style.",
    "Give a tech talk or write a blog post about something you've learned."
  ];
  
  function completeChallenge() {
    // Increment counter and streak
    const challengesCompleted = document.getElementById('challengesCompleted');
    const currentStreak = document.getElementById('currentStreak');
    const comfortZoneExits = document.getElementById('comfortZoneExits');
    
    challengesCompleted.textContent = parseInt(challengesCompleted.textContent) + 1;
    currentStreak.textContent = parseInt(currentStreak.textContent) + 1;
    comfortZoneExits.textContent = parseInt(comfortZoneExits.textContent) + 2;
    
    // Update progress bar
    const progressBar = document.getElementById('challengeProgress');
    progressBar.style.width = Math.min(parseInt(progressBar.style.width) + 20, 100) + '%';
    
    // Get a new challenge
    getNewChallenge();
    
    // Celebrate with confetti
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        createConfetti();
      }, i * 50);
    }
    
    // Save to localStorage
    saveData();
  }
  
  function skipChallenge() {
    // Reset streak if skipping
    const currentStreak = document.getElementById('currentStreak');
    currentStreak.textContent = "0";
    
    // Get a new challenge
    getNewChallenge();
    
    // Save to localStorage
    saveData();
  }
  
  function getNewChallenge() {
    const currentChallenge = document.getElementById('currentChallenge');
    const currentText = currentChallenge.textContent;
    
    // Get a different challenge
    let newChallenge;
    do {
      newChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    } while (newChallenge === currentText && challenges.length > 1);
    
    // Fade out
    currentChallenge.style.opacity = 0;
    
    // Change text and fade in
    setTimeout(() => {
      currentChallenge.textContent = newChallenge;
      currentChallenge.style.opacity = 1;
    }, 300);
  }
  
  // Public API
  return {
    completeChallenge,
    skipChallenge,
    getNewChallenge
  };
})();