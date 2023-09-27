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
    searchApiKey: '106fdf7d17553f239876c2cad2f20de611f3ae067e10cfaca50aaadcb13ab203',
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
