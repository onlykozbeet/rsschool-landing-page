const SWIPE_BREAKPOINT = '(max-width: 500px)';
const SWIPE_THRESHOLD = 40;

const updateSlider = (inner, dots, index) => {
  inner.scrollTo({ left: index * inner.clientWidth, behavior: 'smooth' });
  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === index;
    dot.classList.toggle('slider__dot--active', isActive);
  });
};

const getSliderElements = (slider) => {
  const inner = slider.querySelector('.slider__inner');
  if (!inner) return null;

  return {
    inner,
    slides: [...inner.querySelectorAll('.slider__item')],
    dots: [...slider.querySelectorAll('.slider__dot')],
    previousArrow: slider.querySelector('.slider__left-arrow'),
    nextArrow: slider.querySelector('.slider__right-arrow'),
  };
};

const createNavigator = ({ inner, slides, dots }) => {
  let index = 0;
  const goTo = (nextIndex) => {
    index = (nextIndex + slides.length) % slides.length;
    updateSlider(inner, dots, index);
  };

  return { goTo, getIndex: () => index, refresh: () => updateSlider(inner, dots, index) };
};

const bindControls = ({ dots, previousArrow, nextArrow }, goTo, getIndex) => {
  if (previousArrow) {
    previousArrow.addEventListener('click', () => goTo(getIndex() - 1));
  }

  if (nextArrow) {
    nextArrow.addEventListener('click', () => goTo(getIndex() + 1));
  }

  dots.forEach((dot, dotIndex) => dot.addEventListener('click', () => goTo(dotIndex)));
};

const bindSwipe = (inner, goTo, getIndex) => {
  const mobileQuery = window.matchMedia(SWIPE_BREAKPOINT);
  let startX = 0;
  let startY = 0;
  let pointerId = null;

  inner.addEventListener('pointerdown', (event) => {
    if (!mobileQuery.matches || !event.isPrimary) return;
    startX = event.clientX;
    startY = event.clientY;
    pointerId = event.pointerId;
  });

  inner.addEventListener('pointerup', (event) => {
    if (event.pointerId !== pointerId) return;
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    pointerId = null;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) < Math.abs(deltaY)) return;
    goTo(getIndex() + (deltaX < 0 ? 1 : -1));
  });

  inner.addEventListener('pointercancel', () => { pointerId = null; });
};

export const initSlider = () => {
  const slider = document.querySelector('.slider');
  if (!slider) return;

  const elements = getSliderElements(slider);
  if (!elements) return;
  if (!elements.slides.length) return;

  const navigator = createNavigator(elements);
  bindControls(elements, navigator.goTo, navigator.getIndex);
  bindSwipe(elements.inner, navigator.goTo, navigator.getIndex);
  window.addEventListener('resize', navigator.refresh);
  navigator.refresh();
};
