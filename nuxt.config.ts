import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  css: ['assets/scss/index.scss'],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {}
        }
      }
    },
    transpile: ['@headlessui/vue']
  }
})
