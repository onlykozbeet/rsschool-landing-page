const MOBILE_BREAKPOINT = 768;
const INITIAL_CARD_COUNT = 4;

const getRefreshElements = () => {
  const menu = document.querySelector('.menu');
  if (!menu) return null;

  const inputs = [...menu.querySelectorAll('.menu__category-input')];
  const cards = [...menu.querySelectorAll('.menu__card')];
  const button = menu.querySelector('.refresh');

  if (!inputs.length || !cards.length || !button) return null;
  return { inputs, cards, button };
};

const getSelectedCategory = (inputs) => {
  for (const input of inputs) {
    if (input.checked) return input.id;
  }

  return null;
};

const getActiveCards = (cards, category) => cards.filter((card) => card.classList.contains(`menu__card_${category}`));

const hideCards = (cards) => {
  cards.forEach((card) => card.classList.add('menu__card--hidden'));
};

const showCards = (cards) => {
  cards.forEach((card) => card.classList.remove('menu__card--hidden'));
};

const updateButton = (button, shouldShow) => {
  button.classList.toggle('refresh--visible', shouldShow);
};

const updateCards = (elements, isExpanded = false) => {
  const category = getSelectedCategory(elements.inputs);
  if (!category) {
    hideCards(elements.cards);
    updateButton(elements.button, false);
    return;
  }

  const activeCards = getActiveCards(elements.cards, category);
  const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
  const visibleCount = isMobile && !isExpanded ? INITIAL_CARD_COUNT : activeCards.length;

  hideCards(elements.cards);
  showCards(activeCards.slice(0, visibleCount));
  updateButton(elements.button, isMobile && activeCards.length > visibleCount);
};

const bindCategoryChanges = (elements, resetCards) => {
  elements.inputs.forEach((input) => input.addEventListener('change', resetCards));
};

const bindRefreshButton = (elements, showAllCards) => {
  elements.button.addEventListener('click', showAllCards);
};

const bindWindowResize = (elements, resetCards) => {
  let wasMobile = window.innerWidth <= MOBILE_BREAKPOINT;

  window.addEventListener('resize', () => {
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    if (isMobile !== wasMobile) resetCards();
    wasMobile = isMobile;
  });
};

export const initRefresh = () => {
  const elements = getRefreshElements();
  if (!elements) return;

  let isExpanded = false;
  const resetCards = () => {
    isExpanded = false;
    updateCards(elements);
  };
  const showAllCards = () => {
    isExpanded = true;
    updateCards(elements, isExpanded);
  };

  bindCategoryChanges(elements, resetCards);
  bindRefreshButton(elements, showAllCards);
  bindWindowResize(elements, resetCards);
  resetCards();
};
