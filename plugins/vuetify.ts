import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { fa } from 'vuetify/iconsets/fa'; 
import '@fortawesome/fontawesome-free/css/all.css' // Ensure your project is capable of handling css files

const myCustomLightTheme = {
  dark: true,
  colors: {
    background: '#D1C4E9',
    surface: '#111',
    primary:'#F44336',
    secondary: '#E91E63',
    accent: '#9C27B0',
    error: '#f44336',
    warning: '#ff5722',
    info:'#00bcd4',
    success: '#4caf50'
  },
}

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    icons: {
      defaultSet: 'mdi',
      aliases, 
      sets: {
        mdi, 
        fa,
      },
    },
    components,
    directives,
    theme: {
      defaultTheme: 'myCustomLightTheme',
      themes: {
        myCustomLightTheme,
      },
      variations: {
        colors: ['primary', 'secondary', 'surface'],
        lighten: 6,
        darken: 6,
      }
    },
    aliases: {
      VChipFilter: components.VChip,
      VYearRangeField: components.VTextField,
      VEmojiButton: components.VBtn
    },
    defaults: {
      VChipFilter: {
        variant: 'elevated',
        closable: true,
        class: 'v-chip-filter',
      },
      VYearRangeField: {
        variant:"outlined",
        density: "compact",
        hideDetails: true,
        singleLine: true, 
        type: "number",
      },
      VEmojiButton: {
        variant: "text",
        class: "text-body-1"
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})