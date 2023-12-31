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
    searchApiKey: process.env.MEILI_SEARCH_KEY,
    adminApiKey: process.env.MEILI_ADMIN_KEY,
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
