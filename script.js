const gear1 = document.querySelector(".rotating-gear");

window.addEventListener("scroll", () => {
  const rotation = window.scrollY * 0.4;
  gear1.style.transform = `rotate(${rotation}deg)`;
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

<script>
const trailContainer = document.querySelector('.jet-trail');

function createTrail() {
  const trail = document.createElement('div');
  trail.classList.add('trail');
  
  // Random start position anywhere on screen
  trail.style.top = Math.random() * 100 + '%';
  trail.style.left = Math.random() * 100 + '%';

  // Random angle between -45° and 45° for realism
  const angle = (Math.random() * 90 - 45);
  trail.style.transform = `rotate(${angle}deg)`;

  // Movement distance in pixels, scaled by angle
  const distance = 800 + Math.random() * 400;
  const dx = Math.cos(angle * Math.PI / 180) * distance;
  const dy = Math.sin(angle * Math.PI / 180) * distance;
  trail.style.setProperty('--dx', `${dx}px`);
  trail.style.setProperty('--dy', `${dy}px`);

  // Random animation duration + delay
  const duration = 10 + Math.random() * 10;
  const delay = Math.random() * 5;
  trail.style.animation = `fly ${duration}s linear ${delay}s infinite`;

  // Add to DOM
  trailContainer.appendChild(trail);

  // Remove old trails after a while (avoid buildup)
  setTimeout(() => trail.remove(), (duration + delay) * 1000);
}

// Continuously spawn trails
setInterval(createTrail, 1000);
</script>
