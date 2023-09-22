<script setup>
const props = defineProps({
    modelValue: String,
    repliedUserName: String,
    repliedUserText: String,
    maxTextLength: Number,
});
const emits = defineEmits(['update:modelValue']);
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
        </div>
        <div class="flex flex-row gap-2 ms-4">
            <v-divider vertical />
            <div class="flex flex-row gap-2" v-show="repliedUserName">
                <p class="text-truncate">Ответ на комментарий <span class="text-primary">{{ repliedUserName
                + ': ' + repliedUserText}}</span></p>
                <v-btn size="small" density="compact" color="secondary" icon="mdi-close"
                    ></v-btn>
            </div>
        </div>
    </div>
</template>