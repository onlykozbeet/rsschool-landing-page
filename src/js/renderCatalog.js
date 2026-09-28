const PRODUCTS_URL = `${import.meta.env.BASE_URL}assets/data/products.json`;

const IMAGE_EXTENSION = 'jpg';

const createCard = (product, imageIndex) => {
  const card = document.createElement('article');
  card.classList.add('menu__card', `menu__card_${product.category}`);

  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('menu__image-wrapper');

  const image = document.createElement('img');
  image.classList.add('menu__image');
  image.src = `${import.meta.env.BASE_URL}assets/images/menu/${product.category}/${product.category}-${imageIndex}.${IMAGE_EXTENSION}`;
  image.alt = product.name;
  imageWrapper.append(image);

  const content = document.createElement('div');
  content.classList.add('menu__card-content');

  const title = document.createElement('h2');
  title.classList.add('menu__card-title');
  title.textContent = product.name;

  const description = document.createElement('p');
  description.classList.add('menu__card-description');
  description.textContent = product.description;

  const price = document.createElement('p');
  price.classList.add('menu__card-price');
  price.textContent = `$${Number(product.price).toFixed(2)}`;

  content.append(title, description, price);
  card.append(imageWrapper, content);
  return card;
};

export const initCatalog = async () => {
  const catalog = document.querySelector('.menu__catalog');
  if (!catalog) return;

  try {
    const response = await fetch(PRODUCTS_URL);

    const products = await response.json();
    const imageIndexes = { coffee: 0, tea: 0, dessert: 0 };
    const cards = products
      .filter((product) => Object.hasOwn(imageIndexes, product.category))
      .map((product) => {
        imageIndexes[product.category] += 1;
        return createCard(product, imageIndexes[product.category]);
      });

    catalog.replaceChildren(...cards);
  } catch (error) {
    console.error(error);
  }
};
