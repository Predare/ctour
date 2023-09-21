<script setup>
const props = defineProps({
    postLink: String,
});
const text = ref('');

async function postComment() {
    await $fetch(props.postLink, {
        method: 'POST', body: {
            text: text.value,
        }
    }).catch(error => console.log(error)).then(response => {
        clearForm();
        //commentsStore.comments.unshift(response);
    });
}

function clearForm() {
    text.value = '';
    //commentFormStore.repliedComment = null;
}
</script>

<template>
    <div class="w-full mt-7">
        <v-form @submit.prevent="postComment">
            <div class="flex flex-row items-start rounded gap-3">
                <CommentsFormTextarea v-model="text"></CommentsFormTextarea>
            </div>
        </v-form>
    </div>
</template>