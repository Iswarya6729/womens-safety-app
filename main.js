/* SafeHer — Main JavaScript */

// Nav scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

// Animate-in on scroll
const animateEls = document.querySelectorAll('.animate-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

animateEls.forEach(el => observer.observe(el));

// Feature cards hover glow
document.querySelectorAll('.feature-card, .qa-card, .report-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.25s cubic-bezier(0.4,0,0.2,1)';
  });
});

// Smooth anchor scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Helpline card hover effect
document.querySelectorAll('.helpline-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.querySelector('.helpline-card__number').style.color = 'var(--pink-600)';
  });
  card.addEventListener('mouseleave', function() {
    this.querySelector('.helpline-card__number').style.color = 'var(--purple-600)';
  });
});

// Testimonial card entrance animation
const testimonialCards = document.querySelectorAll('.testimonial-card');
const tObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = entry.target.classList.contains('testimonial-card--featured')
          ? 'scale(1.02) translateY(0)'
          : 'translateY(0)';
      }, i * 100);
      tObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

testimonialCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = card.classList.contains('testimonial-card--featured')
    ? 'scale(1.02) translateY(20px)'
    : 'translateY(20px)';
  card.style.transition = 'all 0.6s cubic-bezier(0.4,0,0.2,1)';
  tObserver.observe(card);
});

// Feature card stagger
const featureCards = document.querySelectorAll('.feature-card');
const fObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
      fObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

featureCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(24px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fObserver.observe(card);
});

// Counter animation for stats
function animateCounter(el, target, suffix = '') {
  const start = 0;
  const duration = 1600;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statNums = document.querySelectorAll('.stat__num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const text = entry.target.textContent;
      if (text.includes('50K')) animateCounter(entry.target, 50000, 'K+');
      else if (text.includes('120')) animateCounter(entry.target, 120, '+');
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => statObserver.observe(el));

console.log('%c🛡️ SafeHer — Women\'s Safety App', 'color:#7c3aed;font-size:16px;font-weight:bold');
console.log('%cBuilt with 💜 for every woman', 'color:#be185d;font-size:12px');