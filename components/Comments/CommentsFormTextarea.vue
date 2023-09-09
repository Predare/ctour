<script setup>
const props = defineProps({
    modelValue: String
});
const emits = defineEmits(['update:modelValue']);
const counter = computed(() => {
    return props.modelValue.length
});
const maxTextLength = ref(1200);
const cols = ref(70);
const textArea = ref(null);
const height = ref('2rem');

function addText(text) {
    emits('update:modelValue', props.modelValue + text);
}
</script>

<template>
    <div class="w-full">
        <div class="flex flex-row bg-surface-lighten-2 p-2 rounded gap-2 mb-2">
            <textarea :maxlength=maxTextLength ref="textArea" :value="modelValue" @input="($event) => {
                $emit('update:modelValue', $event.target.value); height = textArea?.scrollHeight + 'px';
            }" :style="{ height: height }" class="ms-1 resize-none focus-visible:outline-none w-full"
                placeholder="Поделитесь мнением!"></textarea>
            <CommentsFormEmojiTable :addText="addText" />
            <v-btn icon="mdi-send" variant="plain" :ripple="false" density="compact" type="submit"></v-btn>
        </div>
        <p class="ms-4" v-text="counter + ' / ' + maxTextLength + ' символов'"></p>
    </div>
</template>