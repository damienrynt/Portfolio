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
