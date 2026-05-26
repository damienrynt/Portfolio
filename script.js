/* ============================================================
   AOS
============================================================ */
AOS.init({ duration: 1000, once: true });

/* ============================================================
   GEAR — rotates on scroll
============================================================ */
const gear = document.querySelector('.rotating-gear');
window.addEventListener('scroll', () => {
  if (gear) gear.style.transform = `rotate(${window.scrollY * 0.4}deg)`;
}, { passive: true });

/* ============================================================
   SMOOTH SCROLL for anchor links
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ============================================================
   MINI-PROJECT POPUP DATA
============================================================ */
const projects = {
  screw: {
    title: "Archimedes' Screw",
    date: "Spring 2026",
    body: `
      <p>As part of a 24-hour engineering competition, our team designed and built a machine capable of transporting ping pong balls from a table surface to an elevated target — powered entirely by a single falling mass.</p>
      <p>Rather than relying on the maximum allowed mass, we deliberately scaled down to optimise efficiency. Our final design — an Archimedes' screw constructed from paper, cardboard, and metal framing — moved five balls through 29 cm of horizontal travel and 22 cm of vertical lift on a single 59 cm mass drop.</p>
      <ul>
        <li>Designed and assembled the full screw mechanism within strict material constraints</li>
        <li>Optimised mass-to-output ratio to maximise ball throughput per drop</li>
        <li>Coordinated rapid prototyping and testing cycles under time pressure</li>
      </ul>
      <p>The design was recognised with the <strong>Novelty Award</strong> for its unconventional approach.</p>
    `,
    skills: ['Mechanical Design', 'Rapid Prototyping', 'Team Collaboration', 'Materials Engineering'],
    images: ['Images/archimedes.jpg'],
    links: []
  },

  keychain: {
    title: 'Keychain',
    date: '2024',
    body: `
      <p>Machined a keychain from raw stock using a lathe, milling machine, drill press, and various hand tools.</p>
      <p>Created a SolidWorks assembly and an engineering drawing with GD&amp;T constraints.</p>
    `,
    skills: ['Machining', 'SolidWorks', 'GD&T'],
    images: ['Images/keychain1.jpg', 'Images/keychain2.jpg'],
    links: []
  },

  loro: {
    title: 'The Loro Toy: A Target Shooting Game',
    date: '2024',
    body: `
      <p>Designed and fabricated a ball launching mechanism based on spring compression.</p>
      <p>The blaster successfully launched balls across several meters and could be aimed at moving targets.</p>
    `,
    skills: ['CAD (SolidWorks)', 'Power Tools', 'Prototyping', 'Task Distribution'],
    images: ['Images/lorotoy.jpg'],
    links: []
  },

  mars: {
    title: 'Gateway to Mars',
    date: '2023',
    body: `
      <p>Simulated the Hohmann Transfer, demonstrating the optimal launch window for transferring a spacecraft from Earth's orbit to Mars's orbit.</p>
      <p>Placed second overall in the 2023 McGill Physics Hackathon using JavaScript and the p5.js library.</p>
      <p>Despite strict time constraints, our team completed the project within 24 hours while coordinating and integrating multiple subsystems into a single functional simulation.</p>
    `,
    skills: ['JavaScript (p5.js)', 'Physics Simulation', 'Time Management', 'Teamwork'],
    images: ['Images/mcgillhack.jpg'],
    links: [
      { href: 'https://youtu.be/J0Q34lAa_xw', label: '▶ Watch the Simulation' },
      { href: 'https://devpost.com/software/project-title-to-be-changed', label: '🌐 View More' }
    ]
  }
};

/* ============================================================
   MODAL LOGIC
============================================================ */
const backdrop  = document.getElementById('modalBackdrop');
const closeBtn  = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');

function openModal(key) {
  const p = projects[key];
  if (!p) return;

  const imagesHtml = p.images.length
    ? `<div class="modal-images">${p.images.map(src => `<img src="${src}" alt="">`).join('')}</div>`
    : '';

  const linksHtml = p.links.length
    ? `<div class="modal-links">${p.links.map(l => `<a href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`).join('')}</div>`
    : '';

  const skillsHtml = p.skills.length
    ? `<div class="modal-skills">${p.skills.map(s => `<span>${s}</span>`).join('')}</div>`
    : '';

  modalBody.innerHTML = `
    <h3>${p.title}</h3>
    <div class="modal-date">${p.date}</div>
    ${p.body}
    ${imagesHtml}
    ${linksHtml}
    ${skillsHtml}
  `;

  backdrop.classList.add('open');
  backdrop.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  closeBtn.focus();
}

function closeModal() {
  backdrop.classList.remove('open');
  backdrop.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* Tile click / keyboard */
document.querySelectorAll('.more-tile').forEach(tile => {
  tile.addEventListener('click', () => openModal(tile.dataset.project));
  tile.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(tile.dataset.project);
    }
  });
});

/* Close triggers */
closeBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
