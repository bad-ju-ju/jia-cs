// ========================================================
// Jia Sourcing Prototype — Shared JavaScript
// Sidebar navigation, animations, interactions
// ========================================================

// Current page detection
const currentPage = window.location.pathname.split('/').pop() || 'setup.html';

// Sidebar HTML (injected into every page)
function renderSidebar() {
  const sidebarEl = document.getElementById('sidebar');
  if (!sidebarEl) return;

  const navItems = [
    { icon: '📊', label: 'Dashboard', href: '#', section: 'core' },
    { icon: '💼', label: 'Jobs', href: '#', section: 'core' },
    { icon: '👥', label: 'Candidates', href: '#', section: 'core' },
    { icon: '📋', label: 'ATS Pipeline', href: '#', section: 'core' },
    { divider: true, label: 'SOURCING MODULE' },
    { icon: '✨', label: 'Setup', href: 'setup.html', section: 'sourcing', page: 'setup.html', badge: 'NEW' },
    { icon: '👥', label: 'Database', href: 'database.html', section: 'sourcing', page: 'database.html' },
    { icon: '📋', label: 'Job Orders', href: 'joborder.html', section: 'sourcing', page: 'joborder.html' },
    { icon: '🔍', label: 'Search', href: 'search.html', section: 'sourcing', page: 'search.html' },
    { icon: '🎯', label: 'Results', href: 'results.html', section: 'sourcing', page: 'results.html' },
    { icon: '📨', label: 'Outreach', href: 'outreach.html', section: 'sourcing', page: 'outreach.html' },
    { icon: '📈', label: 'Analytics', href: 'analytics.html', section: 'sourcing', page: 'analytics.html' },
  ];

  let navHTML = `
    <a href="setup.html" class="sidebar-logo">
      <div class="owl-icon">🦉</div>
      <span>Jia</span>
    </a>
    <nav class="sidebar-nav">
  `;

  navItems.forEach(item => {
    if (item.divider) {
      navHTML += `<div class="sidebar-section-label">${item.label}</div>`;
    } else {
      const isActive = item.page === currentPage;
      const isDisabled = !item.page;
      navHTML += `
        <a href="${item.href}" class="${isActive ? 'active' : ''}" ${isDisabled ? 'style="opacity: 0.4; pointer-events: none;"' : ''}>
          <span class="nav-icon">${item.icon}</span>
          ${item.label}
          ${item.badge ? `<span class="new-badge">${item.badge}</span>` : ''}
        </a>
      `;
    }
  });

  navHTML += `
    </nav>
    <div class="sidebar-user">
      <div class="avatar">JR</div>
      <div class="user-info">
        <div class="name">Julia R.</div>
        <div class="role">Senior Recruiter</div>
      </div>
    </div>
  `;

  sidebarEl.innerHTML = navHTML;
}

// Initialize sidebar on load
document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  initAnimations();
  initInteractions();
});

// ========== ANIMATIONS ==========
function initAnimations() {
  // Animate elements when they enter viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Counter animation for stat cards
  document.querySelectorAll('.stat-value[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    animateCounter(el, target, prefix, suffix);
  });
}

function animateCounter(element, target, prefix = '', suffix = '', duration = 1200) {
  let start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.floor(eased * target);

    element.textContent = prefix + current.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ========== INTERACTIONS ==========
function initInteractions() {
  // Checkbox toggles
  document.querySelectorAll('.custom-checkbox').forEach(cb => {
    cb.addEventListener('click', () => {
      cb.classList.toggle('checked');
    });
  });

  // Filter chip toggles
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
    });
  });

  // Channel option toggles
  document.querySelectorAll('.channel-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.channel-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });
}

// ========== UPLOAD SIMULATION ==========
function simulateUpload(callback) {
  const steps = [
    { text: 'Reading file...', progress: 10 },
    { text: 'Parsing candidate records...', progress: 30 },
    { text: 'Extracting skills and job titles...', progress: 50 },
    { text: 'Normalizing job titles...', progress: 65 },
    { text: 'Generating embeddings for semantic search...', progress: 80 },
    { text: 'Calculating response likelihood scores...', progress: 92 },
    { text: 'Indexing database...', progress: 100 },
  ];

  let i = 0;
  const interval = setInterval(() => {
    if (i >= steps.length) {
      clearInterval(interval);
      if (callback) callback();
      return;
    }
    const step = steps[i];
    updateProgress(step.progress, step.text);
    i++;
  }, 800);
}

function updateProgress(percent, statusText) {
  const bar = document.querySelector('.progress-fill');
  const text = document.querySelector('.progress-status');
  const pct = document.querySelector('.progress-percent');

  if (bar) bar.style.width = percent + '%';
  if (text) text.textContent = statusText;
  if (pct) pct.textContent = percent + '%';
}

// ========== AI TYPING EFFECT ==========
function typeText(element, text, speed = 30, callback) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }

  type();
}

// ========== NOTIFICATION TOAST ==========
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    padding: 14px 24px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    color: white;
    z-index: 1000;
    animation: fadeInUp 0.3s ease;
    font-family: 'Satoshi', sans-serif;
    background: ${type === 'success' ? '#1a1a2e' : '#32325d'};
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeIn 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
