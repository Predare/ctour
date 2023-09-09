// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@sidebase/nuxt-auth',
  ],
  plugins: [{ src: '~/plugins/vue-dompurify-html', mode: 'client' }],
  pinia: {
    autoImports: [
      'defineStore', // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  css: ['animate.css/animate.min.css',
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
})
