import { defineConfig } from 'vite';

export default defineConfig({
  base: '/rsschool-landing-page/',
  plugins: [
    {
      name: 'move-public-image-paths',
      transformIndexHtml(html) {
        return html.replace(
          /(src|href)="\/(slider|dark-theme|download|gallery|hero|icons|logo|menu)\//g,
          '$1="/rsschool-landing-page/assets/images/$2/',
        );
      },
    },
  ],
  server: {
    host: '127.0.0.1',
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        menu: 'menu.html',
      },
    },
  },
});
