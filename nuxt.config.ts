import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  css: ["assets/scss/index.scss"],
  // NUXT_PORT

  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
    // transpile: ['@headlessui/vue']
  },
});
