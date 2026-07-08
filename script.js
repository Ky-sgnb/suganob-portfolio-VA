// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== MOBILE HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== SCROLL FADE-IN ANIMATIONS =====
const animateEls = document.querySelectorAll(
  '.service-card, .why-card, .cert-card, .project-card, .about-card, .tool-chip, .highlight-item, .note-card'
);
animateEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animateEls.forEach(el => observer.observe(el));

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(item => {
        item.style.color = item.getAttribute('href') === '#' + entry.target.id
          ? 'var(--primary)'
          : '';
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => sectionObserver.observe(s));

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all required fields.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    form.reset();
    btn.textContent = originalText;
    btn.disabled = false;
    formSuccess.classList.add('visible');
    setTimeout(() => formSuccess.classList.remove('visible'), 5000);
  }, 1200);
});
