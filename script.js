// =============================================
// SOLOMYCRM — Main Script
// =============================================

// —— Navbar scroll effect ——
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// —— Hamburger menu ——
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// —— Interactive CRM screenshot tabs ——
const tabs = document.querySelectorAll('.mockup-tab');
const screens = document.querySelectorAll('.mockup-screen');

function switchTab(targetTab) {
  // Remove active from all
  tabs.forEach(t => t.classList.remove('active'));
  screens.forEach(s => s.classList.remove('active'));

  // Activate selected
  targetTab.classList.add('active');
  const screenId = 'screen-' + targetTab.dataset.tab;
  document.getElementById(screenId)?.classList.add('active');
}

// Manual tab click
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    switchTab(tab);
  });
});

// —— Scroll reveal ——
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const wh = window.innerHeight;
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < wh - 80) el.classList.add('visible');
  });
}

document.querySelectorAll('.benefit-card').forEach((el, i) => {
  el.classList.add('reveal', `reveal-delay-${i + 1}`);
});
document.querySelectorAll('.feature-item').forEach((el, i) => {
  el.classList.add('reveal', `reveal-delay-${(i % 2) + 1}`);
});
document.querySelectorAll('.trust-card').forEach((el, i) => {
  el.classList.add('reveal', `reveal-delay-${i + 1}`);
});

window.addEventListener('scroll', revealOnScroll, { passive: true });
revealOnScroll();

// —— Smooth anchor scroll ——
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
