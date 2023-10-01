// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@sidebase/nuxt-auth',
    'nuxt-meilisearch',
  ],
  meilisearch: {
    hostUrl: 'http://localhost:7700',
    searchApiKey: '14332a5c9b2665d0606cd18864a2ae7fac38529b389f4b7bca2155b9014e58a4',
    adminApiKey: 'dac3c49ea9e2ae5d32fa29a7790615040758871ee11504689cce7f34e2c2d723',
    serverSideUsage: true,
    instantSearch: {
      theme: 'algolia',
    }
  },
  plugins: [{ src: '~/plugins/vue-dompurify-html', mode: 'client' }, { src: '~/plugins/instant-search', mode: 'client' }],
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
    pageTransition: { name: 'page', mode: 'out-in' },
  },
})
