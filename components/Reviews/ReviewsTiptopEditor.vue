<script setup lang="ts">
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

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
});
</script>

<template>
  <div>
    <vuetify-tiptap v-model="value" label="Написать рецензию" :hide-toolbar="hideToolbar"
      :disable-toolbar="disableToolbar" :outlined="outlined" :dense="dense" :error-messages="errorMessages"
      rounded :max-height="465" :max-width="maxWidth" editor-class="review" markdown-theme="github" />
    <div>
      <div class="review" v-dompurify-html="value"></div>
    </div>
  </div>
</template>

<style lang="scss">
@use '~/assets/scss/review.scss';

</style>