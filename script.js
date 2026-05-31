/* ============================================================
   AOS
============================================================ */
AOS.init({ duration: 1000, once: true });

/* ============================================================
   ROAD SPINE — size the CSS road stripe to cover all track rows
============================================================ */
(function () {
  const racetrack = document.getElementById('racetrack');
  if (!racetrack) return;

  const spine = document.createElement('div');
  spine.className = 'road-spine';
  const inner = document.createElement('div');
  inner.className = 'road-spine-inner';
  spine.appendChild(inner);
  racetrack.insertBefore(spine, racetrack.firstChild);

  function sizeSpine() {
    const rows = racetrack.querySelectorAll('.track-row');
    if (!rows.length) return;

    // Use actual rendered spine width (respects responsive CSS)
    const ROAD_W      = spine.offsetWidth;
    const trackRect   = racetrack.getBoundingClientRect();
    const firstRect   = rows[0].getBoundingClientRect();
    const lastRect    = rows[rows.length - 1].getBoundingClientRect();
    const spineTop    = firstRect.top   - trackRect.top;
    const spineH      = lastRect.bottom - firstRect.top;

    spine.style.top    = spineTop + 'px';
    spine.style.height = spineH   + 'px';

    // Inner: landscape (spineH wide × ROAD_W tall) rotated 90°
    // so it renders portrait (ROAD_W wide × spineH tall)
    inner.style.width         = spineH  + 'px';
    inner.style.height        = ROAD_W  + 'px';
    inner.style.top           = (spineH / 2 - ROAD_W / 2) + 'px';
    inner.style.left          = (ROAD_W / 2 - spineH / 2) + 'px';
    inner.style.transform     = 'rotate(90deg)';
    inner.style.transformOrigin = 'center center';
  }

  window.addEventListener('load',   sizeSpine);
  window.addEventListener('resize', sizeSpine, { passive: true });
  setTimeout(sizeSpine, 50);
  setTimeout(sizeSpine, 300);
})();

/* ============================================================
   MOBILE HEADER — hide on scroll down, show on scroll up
============================================================ */
(function () {
  const header = document.querySelector('header');
  if (!header) return;
  let lastY    = window.scrollY;
  let ticking  = false;

  function onScroll() {
    // Only activate on mobile
    if (window.innerWidth > 640) {
      header.classList.remove('header--hidden');
      return;
    }
    const currentY = window.scrollY;
    if (currentY > lastY && currentY > 60) {
      header.classList.add('header--hidden');
    } else {
      header.classList.remove('header--hidden');
    }
    lastY = currentY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 640) header.classList.remove('header--hidden');
  });
})();

/* ============================================================
   GEAR — rotates on scroll
============================================================ */
const gear = document.querySelector('.rotating-gear');

/* ============================================================
   F1 CAR — smooth scroll-driven position, bidirectional
============================================================ */
(function () {
  const car       = document.getElementById('f1car');
  const racetrack = document.getElementById('racetrack');
  const startCap  = document.getElementById('track-start-cap');
  const finishCap = document.getElementById('track-finish-cap');
  if (!car || !racetrack || !startCap || !finishCap) return;

  const CAR_HALF = 80;
  let targetTop  = 0;
  let currentTop = 0;
  let rafId      = null;

  // Lerp factor — lower = smoother/slower, higher = snappier
  // Use slower on mobile for better feel
  function lerpFactor() {
    return window.innerWidth <= 640 ? 0.06 : 0.10;
  }

  function getBounds() {
    const trackRect  = racetrack.getBoundingClientRect();
    const startRect  = startCap.getBoundingClientRect();
    const finishRect = finishCap.getBoundingClientRect();
    return {
      min: startRect.bottom  - trackRect.top + 20,
      max: finishRect.top    - trackRect.top - 20 - CAR_HALF * 2,
      trackTop: trackRect.top
    };
  }

  function computeTarget() {
    const { min, max, trackTop } = getBounds();
    const viewCenterY = window.innerHeight / 2 - trackTop;
    const desired     = viewCenterY - CAR_HALF;
    return Math.min(Math.max(desired, min), max);
  }

  function animate() {
    const lerp = lerpFactor();
    currentTop += (targetTop - currentTop) * lerp;
    car.style.top = currentTop + 'px';

    // Keep animating until close enough
    if (Math.abs(targetTop - currentTop) > 0.5) {
      rafId = requestAnimationFrame(animate);
    } else {
      car.style.top = targetTop + 'px';
      rafId = null;
    }
  }

  function onScroll() {
    targetTop = computeTarget();
    if (!rafId) rafId = requestAnimationFrame(animate);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    targetTop  = computeTarget();
    currentTop = targetTop; // snap on resize, no slide
    car.style.top = currentTop + 'px';
  }, { passive: true });

  // Initial placement
  targetTop  = computeTarget();
  currentTop = targetTop;
  car.style.top = currentTop + 'px';
})();

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
   PROJECT DATA
============================================================ */
const projects = {

  formula: {
    title: 'Formula Electric R&D – Joining Methods',
    date: 'September 2025 – December 2025',
    body: `
      <p>The objective was to develop and test a mechanical joint technique to effectively join carbon fiber components.</p>
      <p>Unlike regular direct inserts, helicoil inserts are replaceable and do not damage the aluminum parts lodged into the car components, reducing the need to replace entire sections of the car.</p>
      <p>This R&D task focused on testing helicoil inserts on carbon fiber car component mockups.</p>
      <ul>
        <li>3D printed parts with various shapes corresponding to carbon fiber component structures (e.g. airfoil)</li>
        <li>Waterjetted and tapped aluminum insert parts</li>
        <li>Performed carbon fiber layup</li>
        <li>Added helicoil inserts to the prototypes and performed strength and effectiveness analysis</li>
      </ul>
    `,
    skills: ['R&D', 'Composites', 'Manufacturing', '3D Printing'],
    images: ['Images/direct-vs-helicoil.png', 'Images/carbonlayup1.jpg', 'Images/carbonlayup2.jpg', 'Images/carbonlayup4.jpg'],
    links: []
  },

  sauce: {
    title: 'Sauce Dispenser',
    date: 'May 2025',
    body: `
      <p>For this project, we collaborated with another team who developed a sauce filling machine that filled and dropped sauce cups one by one. The objective was to develop an Arduino-based machine that receives the cups and carries them onto a heating plate.</p>
      <p>Our sauce dispenser machine consisted of a treadmill system that received and transported the cups, along with a mechanical arm that pushed the cups from the treadmill onto the heating plate.</p>
      <ul>
        <li>Led the development of the robotic arm responsible for pushing the cups onto the plate</li>
        <li>Designed 3D CAD models of the mechanical arm and a custom gear to convert rotational motion into translational movement</li>
        <li>Set up and ran 3D prints</li>
        <li>Conducted validation testing and iterative design improvements to enhance dispenser efficiency</li>
        <li>Wired an Arduino-based electrical circuit with a stepper motor, driver, ultrasonic sensor, and capacitor</li>
        <li>Programmed the Arduino to synchronise arm motion with treadmill speed</li>
      </ul>
    `,
    skills: ['3D CAD (Onshape)', '3D Printing', 'Arduino'],
    images: ['Images/image-2-1.jpg', 'Images/picture1.jpg'],
    links: []
  },

  screw: {
    title: "Archimedes' Screw",
    date: 'Spring 2026',
    body: `
      <p>As part of an 8-hour engineering competition, our team designed and built an Archimedes' screw-inspired structure, successfully moving balls above and to the side of their starting position using the potential energy of a 200g mass.</p>
      <ul>
        <li>Optimized the design to maximise calculated efficiency and the number of balls moved, achieving the transport of 5 balls using only 25g out of the 200g mass provided.</li>
        <li>Collaborated effectively as a team to propose design ideas, distribute tasks, and assemble a functional project under time pressure.</li>
      </ul>
      <p>The design earned us the Novelty Award.</p>
    `,
    skills: ['Problem Solving', 'Rapid Prototyping', 'Team Collaboration'],
    images: ['Images/archimedes.jpg'],
    links: []
  },

  keychain: {
    title: 'Keychain',
    date: 'Fall 2025',
    body: `
      <p>Machined a keychain from raw stock using a lathe, milling machine, drill press, and various hand tools.</p>
      <p>Created a SolidWorks assembly and an engineering drawing with GD&amp;T constraints.</p>
    `,
    skills: ['Machining', 'SolidWorks', 'GD&T'],
    images: ['Images/keychain2.jpg'],
    links: []
  },

  loro: {
    title: 'The Loro Toy: A Target Shooting Game',
    date: 'Fall 2025',
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
    date: 'Fall 2023',
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

  const imagesHtml = p.images && p.images.length
    ? `<div class="modal-images">${p.images.map(src => `<img src="${src}" alt="">`).join('')}</div>`
    : '';

  const videosHtml = p.videos && p.videos.length
    ? `<div class="modal-videos">${p.videos.map(src => `
        <video autoplay loop muted playsinline>
          <source src="${src}" type="video/mp4">
        </video>`).join('')}</div>`
    : '';

  const linksHtml = p.links && p.links.length
    ? `<div class="modal-links">${p.links.map(l => `<a href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`).join('')}</div>`
    : '';

  const skillsHtml = p.skills && p.skills.length
    ? `<div class="modal-skills">${p.skills.map(s => `<span>${s}</span>`).join('')}</div>`
    : '';

  modalBody.innerHTML = `
    <h3>${p.title}</h3>
    <div class="modal-date">${p.date}</div>
    ${p.body}
    ${imagesHtml}
    ${videosHtml}
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

/* Tile click / keyboard — covers all .more-tile elements */
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

/* ============================================================
   ARCHIMEDES TILE — use video as cover instead of static image
============================================================ */
(function () {
  const screwTile = document.querySelector('.more-tile[data-project="screw"]');
  if (!screwTile) return;
  const wrap = screwTile.querySelector('.more-tile-img-wrap');
  if (!wrap) return;

  // Replace the <img> with a looping muted video
  const oldImg = wrap.querySelector('img');
  const video = document.createElement('video');
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
  const source = document.createElement('source');
  source.src = 'Images/archimedesvid.mp4';
  source.type = 'video/mp4';
  video.appendChild(source);
  if (oldImg) wrap.replaceChild(video, oldImg);
  else wrap.insertBefore(video, wrap.firstChild);
})();


