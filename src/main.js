import './styles/main.scss';

import { initTheme } from './js/theme.js';
import { initBurger } from './js/burger.js';
import { initSlider } from './js/slider.js';
import { initCategory } from './js/category.js';
import { initRefresh } from './js/refresh.js';
import { initModal } from './js/modal.js';
import { initCatalog } from './js/renderCatalog.js';

const init = async () => {
	initTheme();
	initBurger();
	initSlider();
	await initCatalog();
	initCategory();
	initRefresh();
	initModal();
};

init();

