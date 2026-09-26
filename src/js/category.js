const getCategoryElements = () => {
  const menu = document.querySelector('.menu');
  if (!menu) return null;

  const inputs = [...menu.querySelectorAll('.menu__category-input')];
  const cards = [...menu.querySelectorAll('.menu__card')];
  const labels = [...menu.querySelectorAll('.menu__category')];

  if (!inputs.length || !cards.length) return null;
  return { inputs, cards, labels };
};

const updateVisibleCards = (cards, category) => {
  cards.forEach((card) => {
    const isSelectedCategory = card.classList.contains(`menu__card_${category}`);
    card.classList.toggle('menu__card--hidden', !isSelectedCategory);
  });
};

const updateActiveCategory = (inputs, labels, category) => {
  inputs.forEach((input) => {
    input.checked = input.id === category;
  });

  labels.forEach((label) => {
    label.classList.toggle('menu__category--active', label.htmlFor === category);
  });
};

const selectCategory = (elements, category) => {
  updateVisibleCards(elements.cards, category);
  updateActiveCategory(elements.inputs, elements.labels, category);
};

const bindCategoryControls = (elements) => {
  elements.inputs.forEach((input) => {
    input.addEventListener('change', () => selectCategory(elements, input.id));
  });
};

export const initCategory = () => {
  const elements = getCategoryElements();
  if (!elements) return;

  bindCategoryControls(elements);
  const selectedInput = elements.inputs.find((input) => input.checked) || elements.inputs[0];
  selectCategory(elements, selectedInput.id);
};
