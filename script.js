document.addEventListener('DOMContentLoaded', function() {
  const themeSwitchLabel = document.querySelector('.theme-switch');
  const themeSwitchInput = document.querySelector('.theme-switch input[type="checkbox"]');
  const themeToggleButtons = Array.from(new Set([
    document.getElementById('themeToggle')
  ].filter(Boolean)));
  const body = document.body;
  const saved = localStorage.getItem('jario-theme');
  let currentTheme = saved === 'dark' || saved === 'light' ? saved : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  function applyTheme(theme) {
    currentTheme = theme;
    if (theme === 'dark') {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
    if (themeSwitchInput) {
      themeSwitchInput.checked = theme === 'dark';
    }
    themeToggleButtons.forEach((btn) => {
      if (!btn) return;
      btn.textContent = theme === 'dark' ? 'Mode Clair' : 'Mode Sombre';
    });
  }

  applyTheme(currentTheme);

  themeToggleButtons.forEach((btn) => {
    btn.addEventListener('click', function() {
      console.log('theme button clicked', btn, 'currentTheme', currentTheme, 'body dark class', body.classList.contains('dark'));
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      localStorage.setItem('jario-theme', nextTheme);
      console.log('theme applied', nextTheme);
    });
  });

  if (themeSwitchInput) {
    themeSwitchInput.addEventListener('change', function() {
      const nextTheme = themeSwitchInput.checked ? 'dark' : 'light';
      applyTheme(nextTheme);
      localStorage.setItem('jario-theme', nextTheme);
      console.log('theme checkbox toggled', nextTheme);
    });
  }

  if (themeSwitchLabel && !themeSwitchInput) {
    themeSwitchLabel.addEventListener('click', function() {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      localStorage.setItem('jario-theme', nextTheme);
    });
  }

  // Fallback global pour images cassées : elles basculent vers un placeholder commun.
  const fallbackImage = 'https://via.placeholder.com/600x400.png?text=Image+indisponible';
  document.querySelectorAll('img').forEach((img) => {
    img.addEventListener('error', () => {
      if (!img.dataset.fallback) {
        img.dataset.fallback = 'true';
        img.src = fallbackImage;
      }
    });
  });

  // Animation de scroll : apparition des éléments .reveal.
  const destinationCards = document.querySelectorAll('.destination-card');
  destinationCards.forEach((card) => card.classList.add('reveal'));

  const revealElements = document.querySelectorAll('.reveal');
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, {
    threshold: 0.25
  });

  revealElements.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 10) * 0.06}s`;
    scrollObserver.observe(el);
  });

  // Loader : cacher après chargement complet de la page
  const loader = document.getElementById('loader');
  function hideLoader() {
    if (!loader) return;
    loader.classList.add('hidden');
    setTimeout(() => {
      if (loader.parentNode) loader.parentNode.removeChild(loader);
    }, 500);
  }

  if (loader) {
    // Cache immédiatement pour éviter blocage, puis repos
    hideLoader();

    window.addEventListener('load', hideLoader);
    setTimeout(hideLoader, 2000);

    let fallbackCount = 0;
    const loaderCheck = setInterval(() => {
      if (!document.getElementById('loader')) {
        clearInterval(loaderCheck);
        return;
      }
      hideLoader();
      fallbackCount += 1;
      if (fallbackCount >= 5) {
        clearInterval(loaderCheck);
      }
    }, 1000);
  }

  // Bouton scroll to top
  const scrollBtn = document.getElementById('scrollToTopBtn');
  function updateScrollButton() {
    if (!scrollBtn) return;
    if (window.scrollY > 300) {
      scrollBtn.classList.add('show');
      scrollBtn.setAttribute('aria-hidden', 'false');
    } else {
      scrollBtn.classList.remove('show');
      scrollBtn.setAttribute('aria-hidden', 'true');
    }
  }

  window.addEventListener('scroll', updateScrollButton);
  updateScrollButton();

  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});