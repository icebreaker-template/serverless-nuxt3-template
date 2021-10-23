import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  css: ['assets/scss/index.scss'],
  // NUXT_PORT
  // server: {
  //   port: 9000
  // },
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {}
        }
      }
    },
    // transpile: ['@headlessui/vue']
  }
})
