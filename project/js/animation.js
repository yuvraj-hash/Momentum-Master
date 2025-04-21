// Animation and Canvas Functions
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.querySelector('header').offsetHeight;
}

function createParticles() {
  particles = [];
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.5 + 0.3
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Create connection lines between particles that are close
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
    ctx.fill();
    
    // Move particles
    p.x += p.speedX;
    p.y += p.speedY;
    
    // Bounce off walls
    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
  });
  
  requestAnimationFrame(drawParticles);
}

// Confetti Animation
function createConfetti() {
  const confetti = document.createElement('div');
  confetti.className = 'confetti';
  
  // Random color
  const colors = ['#ff4757', '#2ecc71', '#3a5eff', '#fdcb6e', '#6c63ff'];
  confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  
  // Random position
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.top = '0';
  
  // Random size
  const size = Math.random() * 8 + 5;
  confetti.style.width = size + 'px';
  confetti.style.height = size + 'px';
  
  // Random rotation
  confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
  
  // Random shape
  if (Math.random() > 0.5) {
    confetti.style.borderRadius = '50%';
  }
  
  document.body.appendChild(confetti);
  
  // Remove after animation completes
  setTimeout(() => {
    confetti.remove();
  }, 3000);
}

// Initialize the canvas
window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
});

resizeCanvas();
createParticles();
drawParticles();