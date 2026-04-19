const THEME_KEY = 'theme';

export const getInitialTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-bs-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
};

export { THEME_KEY };