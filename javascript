document.addEventListener('DOMContentLoaded', function() {
  const toggleButtons = document.querySelectorAll('#themeToggle');
  const body = document.body;
  const saved = localStorage.getItem('jario-theme');

  function applyTheme(theme) {
    body.classList.toggle('dark', theme === 'dark');
    toggleButtons.forEach((btn) => {
      btn.textContent = theme === 'dark' ? 'Mode Clair' : 'Mode Sombre';
    });
  }

  if (saved === 'dark' || saved === 'light') {
    applyTheme(saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }

  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', function() {
      const nextTheme = body.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(nextTheme);
      localStorage.setItem('jario-theme', nextTheme);
    });
  });
});
