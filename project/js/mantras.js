// Mantras Module
const mantrasModule = (() => {
  // Developer focus mantras
  const focusMantras = [
    "I am fully present in this moment. My attention creates valuable code.",
    "One feature, full focus. This is how great software is built.",
    "I choose what deserves my attention. I am the master of my code.",
    "When I focus fully, I access my deepest problem-solving abilities.",
    "Clean code requires clear thinking. I focus on quality over quantity."
  ];
  
  // Developer confidence mantras
  const confidenceMantras = [
    "I celebrate my coding uniqueness. Self-doubt is a signal to learn, not a stop sign.",
    "I am capable. My skills grow with every challenge I face.",
    "My perspective is valuable. My code serves a purpose.",
    "I don't need to know everything to be a valuable developer.",
    "I balance learning from others with trusting my own abilities."
  ];
  
  function newMantra(type) {
    let element;
    let mantras;
    
    if (type === 'focus') {
      element = document.getElementById('focusMantra');
      mantras = focusMantras;
    } else if (type === 'confidence') {
      element = document.getElementById('confidenceMantra');
      mantras = confidenceMantras;
    }
    
    if (element && mantras) {
      const currentMantra = element.textContent;
      let newMantra;
      
      // Ensure we get a different mantra
      do {
        newMantra = mantras[Math.floor(Math.random() * mantras.length)];
      } while (newMantra === currentMantra && mantras.length > 1);
      
      // Apply a fade-out effect
      element.style.opacity = 0;
      
      // After fade-out, change text and fade back in
      setTimeout(() => {
        element.textContent = newMantra;
        element.style.opacity = 1;
      }, 300);
    }
  }
  
  // Public API
  return {
    newMantra
  };
})();