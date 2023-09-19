<script setup>
import { useCommentsStore } from '@/stores/comments';
import { useCommentsFormStore } from '@/stores/commentForm';
const commentFormStore = useCommentsFormStore();
const { getSession } = useAuth();
const session = ref();
var profileInfo = ref();

watch (session, async () => {
    profileInfo.value = await useFetch(`/api/profile/${session.value?.user.id}`);
});

await getSession().then(async (res) => {
    session.value = res;
});

const commentsStore = useCommentsStore();
async function postComment() {
    
    await $fetch(commentsStore.postLink, {
        
        method: 'POST', body: {
            text: commentFormStore.text,
        }
    }).catch(error => console.log(error)).then(response => {
        clearForm();
        commentsStore.comments.unshift(response);
    });
}

function clearForm() {
    commentFormStore.repliedComment = null;
    commentFormStore.text = '';
}
</script>

<template>
    <div class="w-full mt-7">
        <v-form @submit.prevent="postComment">
            <div class="flex flex-row items-start rounded gap-3">
                <CommentsFormTextarea v-model="commentFormStore.text"></CommentsFormTextarea>
            </div>
        </v-form>
    </div>
</template>