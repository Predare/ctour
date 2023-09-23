import {
    VuetifyTiptap,
    VuetifyViewer,
    createVuetifyProTipTap,
  } from "vuetify-pro-tiptap";
  import {
    BaseKit,
    Bold,
    Italic,
    Underline,
    Strike,
    Heading,
    TextAlign,
    SubAndSuperScript,
    Blockquote,
    HorizontalRule,
    Clear,
    Fullscreen,
    History,
  } from "vuetify-pro-tiptap";
  import "vuetify-pro-tiptap/style.css";
  
  export default defineNuxtPlugin((nuxtApp) => {
    const vuetifyProTipTap = createVuetifyProTipTap({
      lang: "en",
      components: {
        VuetifyTiptap,
        VuetifyViewer,
      },
      extensions: [
        BaseKit.configure({
          placeholder: {
            placeholder: "Enter some text...",
          },
        }),
        Bold,
        Italic,
        Underline,
        Strike,
        Heading.configure({ levels: [5, 6] }),
        TextAlign,
        SubAndSuperScript.configure({ divider: true }),
        Clear.configure({ divider: true }),
        Blockquote,
        HorizontalRule,
        History.configure({ divider: true }),
        Fullscreen,
      ],
    });
  
    nuxtApp.vueApp.use(vuetifyProTipTap);
  });
  