import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  theme: {
    path: './.dumi/theme',
  },
  themeConfig: {
    name: 'ChemUI',
  },
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'EN' },
  ],
  plugins: ['@umijs/plugins/dist/tailwindcss'],
  tailwindcss: {},
});
