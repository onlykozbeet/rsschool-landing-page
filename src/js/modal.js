import products from './products.json';

const getModalElements = () => {
  const modal = document.querySelector('.modal');
  const catalog = document.querySelector('.menu__catalog');
  if (!modal || !catalog) return null;

  const image = modal.querySelector('.modal__image');
  const title = modal.querySelector('.modal__title');
  const description = modal.querySelector('.modal__description');
  const sizes = modal.querySelector('.modal__sizes');
  const additives = modal.querySelector('.modal__additives');
  const price = modal.querySelector('.modal__price');
  const closeButton = modal.querySelector('.modal__close');
  if (!image || !title || !description || !sizes || !additives || !price || !closeButton) return null;

  return {
    modal,
    catalog,
    image,
    title,
    description,
    sizes,
    additives,
    price,
    closeButton,
  };
};

const getCardCategory = (card) => {
  const categoryClass = [...card.classList].find((className) => className.startsWith('menu__card_'));
  if (!categoryClass) return '';
  return categoryClass.replace('menu__card_', '');
};

const normalizeName = (name) => name.toLowerCase().replace(/\s+(coffee|tea)$/, '').trim();

const getProduct = (card, products) => {
  const category = getCardCategory(card);
  const titleElement = card.querySelector('.menu__card-title');
  const descriptionElement = card.querySelector('.menu__card-description');
  const priceElement = card.querySelector('.menu__card-price');
  const imageElement = card.querySelector('.menu__image');
  if (!category || !titleElement || !descriptionElement || !priceElement || !imageElement) return null;

  const title = titleElement.textContent.trim();
  const matchedProduct = products.find((product) => (
    product.category === category && normalizeName(product.name) === normalizeName(title)
  ));
  const categoryProduct = products.find((product) => product.category === category);

  if (!categoryProduct || !categoryProduct.sizes || !categoryProduct.additives) return null;

  let description = descriptionElement.textContent.trim();
  let price = priceElement.textContent.replace(/[^\d.]/g, '');
  if (matchedProduct) {
    description = matchedProduct.description;
    price = matchedProduct.price;
  }

  return {
    ...categoryProduct,
    ...matchedProduct,
    name: title,
    description,
    price,
    image: imageElement.getAttribute('src'),
  };
};

const createOption = (text, marker, addPrice, selected = false) => {
  const button = document.createElement('button');
  button.classList.add('modal__option');
  if (selected) button.classList.add('modal__option--selected');
  button.type = 'button';
  button.dataset.addPrice = addPrice;

  const markerElement = document.createElement('span');
  markerElement.classList.add('modal__option-mark');
  markerElement.textContent = marker;

  const labelElement = document.createElement('span');
  labelElement.textContent = text;

  button.append(markerElement, labelElement);
  return button;
};

const renderOptions = (container, options, getOption, selectedIndex = -1) => {
  container.replaceChildren();

  options.forEach((option, index) => {
    const isSize = container.classList.contains('modal__sizes');
    const marker = isSize ? option.key.toUpperCase() : String(index + 1);
    const button = createOption(getOption(option), marker, option['add-price'], index === selectedIndex);
    button.dataset.optionType = container.classList.contains('modal__sizes') ? 'size' : 'additive';
    if (container.classList.contains('modal__sizes')) button.dataset.sizeKey = option.key;
    container.append(button);
  });
};

const getSelectedPrice = (container) => [...container.querySelectorAll('.modal__option--selected')]
  .reduce((total, button) => total + Number(button.dataset.addPrice || 0), 0);

const updateTotal = (elements, basePrice) => {
  const extra = getSelectedPrice(elements.sizes) + getSelectedPrice(elements.additives);
  elements.price.textContent = `$${(basePrice + extra).toFixed(2)}`;
};

const renderProduct = (elements, product) => {
  elements.image.style.backgroundImage = `url("${product.image}")`;
  elements.title.textContent = product.name;
  elements.description.textContent = product.description;

  const sizes = Object.entries(product.sizes).map(([key, size]) => ({ ...size, key }));
  renderOptions(elements.sizes, sizes, (size) => size.size, 0);
  renderOptions(elements.additives, product.additives, (additive) => additive.name);

  const basePrice = Number(product.price);
  elements.basePrice = basePrice;
  updateTotal(elements, basePrice);
};

const closeModal = (elements) => {
  elements.modal.classList.remove('modal--open');
  document.body.classList.remove('modal-open');
};

const bindModalEvents = (elements, products) => {
  elements.catalog.addEventListener('click', (event) => {
    const card = event.target.closest('.menu__card');
    if (!card || !elements.catalog.contains(card)) return;

    const product = getProduct(card, products);
    if (!product) return;
    renderProduct(elements, product);
    document.body.classList.add('modal-open');
    elements.modal.classList.add('modal--open');
  });

  elements.closeButton.addEventListener('click', () => closeModal(elements));
  elements.modal.addEventListener('click', (event) => {
    if (event.target === elements.modal) {
      closeModal(elements);
      return;
    }

    const option = event.target.closest('.modal__option');
    if (!option) return;

    if (option.dataset.optionType === 'size') {
      elements.sizes.querySelectorAll('.modal__option').forEach((button) => {
        button.classList.toggle('modal__option--selected', button === option);
      });
    } else {
      option.classList.toggle('modal__option--selected');
    }

    updateTotal(elements, elements.basePrice);
  });
  document.addEventListener('keydown', (event) => {
    const isOpen = elements.modal.classList.contains('modal--open');
    if (event.key === 'Escape' && isOpen) closeModal(elements);
  });
};

export const initModal = () => {
  const elements = getModalElements();
  if (!elements) return;
  bindModalEvents(elements, products);
};
