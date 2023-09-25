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
    searchApiKey: 'fbd1dacd27250e2bd6be36fe05b6368f360e98a9b848f0d860fe07ffceacbd6c',
    adminApiKey: '3d35732e9a548c0e7c24c6a4970dbd2675d5cd2dbfaac925ef2fffd614cee4f2',
    serverSideUsage: true,
    instantSearch: {
      theme: 'algolia',
    }
  },
  plugins: [{ src: '~/plugins/vue-dompurify-html', mode: 'client' }, {src: '~/plugins/instant-search', mode: 'client'}],
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
