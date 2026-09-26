import './styles/main.scss';

import { initTheme } from './js/theme.js';
import { initBurger } from './js/burger.js';
import { initSlider } from './js/slider.js';

const init = () => {
	initTheme();
	initBurger();
	initSlider();
};

init();
