const MOBILE_BREAKPOINT = '(max-width: 768px)';

const setMenuState = (nav, button, isOpen) => {
  nav.classList.toggle('nav--active', isOpen);
  button.classList.toggle('burger--active', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
};

const closeMenu = (nav, button) => setMenuState(nav, button, false);

const bindMenuEvents = (nav, button, mobileQuery) => {
  button.addEventListener('click', () => {
    setMenuState(nav, button, !nav.classList.contains('nav--active'));
  });

  nav.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => closeMenu(nav, button));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu(nav, button);
  });

  mobileQuery.addEventListener('change', (event) => {
    if (!event.matches) closeMenu(nav, button);
  });
};

export const initBurger = () => {
  const nav = document.querySelector('.nav');
  const button = document.querySelector('.burger');
  if (!nav || !button) return;

  bindMenuEvents(nav, button, window.matchMedia(MOBILE_BREAKPOINT));
};
