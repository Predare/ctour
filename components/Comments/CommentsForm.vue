<script setup>
const props = defineProps({
    postLink: String,
    closeForm: {type: Function, default: () => {}},
    comments: Array,
    addComment: {type: Function, required: true},
});
const text = ref('');
const counter = computed(() => {
    return unref(text).length
});
const maxTextLength = ref(1200);

async function postComment() {
    await $fetch(props.postLink, {
        method: 'POST', body: {
            text: text.value,
        }
    }).catch(error => console.log(error)).then(response => {
        clearForm();
        props.closeForm();
        props.addComment(response);
    });
}

function clearForm() {
    text.value = '';
}
</script>

<template>
    <div class="w-full">
        <v-form @submit.prevent="postComment">
            <div class="flex flex-row items-start rounded gap-3">
                <CommentsFormTextarea :max-text-length="maxTextLength" v-model="text"></CommentsFormTextarea>
            </div>
            <div class="flex flex-row justify-between">
                <p v-text="counter + ' / ' + maxTextLength + ' символов'"></p>
                <div class="flex flex-row gap-2">
                    <v-btn rounded="xl" size="small" class="text-subtitle-2" variant="text" @click="() => {clearForm(); closeForm();}">Отмена</v-btn>
                    <v-btn :disabled="text === ''" rounded="xl" size="small" class="text-subtitle-2"
                        :color="text === '' ? 'surface' : 'primary'" type="submit">Отправить</v-btn>
                </div>
            </div>

        </v-form>
    </div>
</template>