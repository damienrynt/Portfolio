// Gear rotation on scroll
const gears = document.querySelectorAll('.gear');
window.addEventListener("scroll", () => {
  const gear = document.querySelector(".rotating-gear");
  const rotation = window.scrollY * 0.5; // speed factor
  gear.style.transform = `rotate(${rotation}deg)`;
});
// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
