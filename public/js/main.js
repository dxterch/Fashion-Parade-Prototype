// Fashion Parade — Main JS (Brand-accurate)

// ── Mobile nav toggle ──
const toggle = document.getElementById('navToggle');
const links  = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.classList.toggle('active');
  });
  // Close on outside click
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
    }
  });
}

// ── Auto-dismiss flash messages ──
document.querySelectorAll('.flash').forEach(f => {
  setTimeout(() => {
    f.style.transition = 'opacity 0.4s ease';
    f.style.opacity = '0';
    setTimeout(() => f.remove(), 400);
  }, 5000);
});

// ── Scroll-reveal animations ──
const revealTargets = document.querySelectorAll(
  '.pillar-card, .role-card, .event-card, .event-row, .stat-card, .value-card, .team-card, .mosaic-item, .tier-card'
);

// Inject reveal styles
const style = document.createElement('style');
style.textContent = `
  .pillar-card, .role-card, .event-card, .event-row,
  .stat-card, .value-card, .team-card, .mosaic-item, .tier-card {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.55s cubic-bezier(.4,0,.2,1), transform 0.55s cubic-bezier(.4,0,.2,1);
  }
  .fp-revealed {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
  /* stagger siblings */
  .pillar-card:nth-child(2), .role-card:nth-child(2), .event-card:nth-child(2) { transition-delay: 0.08s; }
  .pillar-card:nth-child(3), .role-card:nth-child(3), .event-card:nth-child(3) { transition-delay: 0.16s; }
  .pillar-card:nth-child(4), .role-card:nth-child(4)                           { transition-delay: 0.24s; }
  .mosaic-item:nth-child(2) { transition-delay: 0.06s; }
  .mosaic-item:nth-child(3) { transition-delay: 0.12s; }
  .mosaic-item:nth-child(4) { transition-delay: 0.18s; }
  .mosaic-item:nth-child(5) { transition-delay: 0.24s; }
  .mosaic-item:nth-child(6) { transition-delay: 0.30s; }
  .mosaic-item:nth-child(7) { transition-delay: 0.36s; }
  .mosaic-item:nth-child(8) { transition-delay: 0.42s; }
`;
document.head.appendChild(style);

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fp-revealed');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealTargets.forEach(el => revealObs.observe(el));

// ── Stat counter animation ──
const statNums = document.querySelectorAll('.stat-num, .hero-stat-num');
const countObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const raw = el.textContent.trim();
      const num = parseInt(raw.replace(/[^0-9]/g, ''));
      if (isNaN(num)) return;
      const suffix = raw.replace(/[0-9]/g, '');
      let current = 0;
      const increment = Math.ceil(num / 40);
      const timer = setInterval(() => {
        current = Math.min(current + increment, num);
        el.textContent = current + suffix;
        if (current >= num) clearInterval(timer);
      }, 30);
      countObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => countObs.observe(el));

// ── Textarea character counter ──
const motivation = document.getElementById('motivation');
if (motivation) {
  const hint = motivation.nextElementSibling;
  motivation.addEventListener('input', () => {
    const len = motivation.value.length;
    if (hint) {
      hint.textContent = len < 50
        ? `${50 - len} more characters needed`
        : `✓ ${len} characters`;
      hint.style.color = len < 50 ? 'var(--hot-pink)' : 'var(--electric-blue)';
    }
  });
}

// ── Sticky nav highlight on scroll ──
const navLinks2 = document.querySelectorAll('.nav-links a:not(.btn-nav)');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    document.querySelector('.nav')?.classList.add('nav-scrolled');
  } else {
    document.querySelector('.nav')?.classList.remove('nav-scrolled');
  }
}, { passive: true });

// Add scrolled nav style
const navStyle = document.createElement('style');
navStyle.textContent = `.nav-scrolled { box-shadow: 0 2px 20px rgba(255,1,153,0.1); }`;
document.head.appendChild(navStyle);
