import './styles/main.scss';

(() => {
	const themeInputs = document.querySelectorAll('.theme__input');
	const savedTheme = localStorage.getItem('theme') || 'light';

	const applyTheme = (theme) => {
		document.body.classList.toggle('dark-theme', theme === 'dark');

		themeInputs.forEach((input) => {
			input.checked = input.id === `${theme}-theme`;
		});
	};

	applyTheme(savedTheme);

	themeInputs.forEach((input) => {
		input.addEventListener('change', () => {
			const theme = input.id === 'dark-theme' ? 'dark' : 'light';

			localStorage.setItem('theme', theme);
			applyTheme(theme);
		});
	});
})();
