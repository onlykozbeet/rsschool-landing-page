import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  const base = command === 'serve' ? '/' : '/rsschool-landing-page/';

  return {
    base,
    plugins: [
      {
        name: 'fix-public-image-paths',
        transformIndexHtml(html) {
          return html.replace(
            /(src|href)="\/(slider|gallery|menu)\//g,
            `$1="${base}assets/images/$2/`,
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
  };
});
