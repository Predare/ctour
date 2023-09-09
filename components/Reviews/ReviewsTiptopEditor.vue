<script setup lang="ts">
import { useTheme } from "vuetify";
import { locale } from "vuetify-pro-tiptap";

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const theme = useTheme();

const outlined = ref(true);
const dense = ref(false);
const hideToolbar = ref(false);
const disableToolbar = ref(false);
const errorMessages = ref(null);
const maxWidth = ref<number>(900);

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
    <vuetify-tiptap v-model="value" label="Написать рецензию" :hide-toolbar="hideToolbar" :disable-toolbar="disableToolbar"
        :outlined="outlined" :dense="dense" :error-messages="errorMessages" rounded :max-height="465"
        :max-width="maxWidth" />
    <div v-dompurify-html="value"></div>
</template>