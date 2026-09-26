import './styles/main.scss';

import { initTheme } from './js/theme.js';
import { initBurger } from './js/burger.js';
import { initSlider } from './js/slider.js';
import { initCategory } from './js/category.js';

const init = () => {
	initTheme();
	initBurger();
	initSlider();
	initCategory();
};

init();
