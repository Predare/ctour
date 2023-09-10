<script setup>
import { useCommentsStore } from '@/stores/comments';
const { getSession } = useAuth();
const session = ref();
var profileInfo = ref();

watch (session, async () => {
    profileInfo.value = await useFetch(`/api/profile/${session.value?.user.id}`);
});

await getSession().then(async (res) => {
    session.value = res;
});

const text = ref('');
const commentsStore = useCommentsStore();
async function postComment() {
    await $fetch(commentsStore.postLink, {
        method: 'POST', body: {
            text: text.value,
        }
    }).catch(error => console.log(error)).then(response => {
        clearForm();
        commentsStore.comments.unshift(response);
    });
}

function clearForm() {
    text.value = '';
}
</script>

<template>
    <div class="w-full mt-7">
        <v-form @submit.prevent="postComment">
            <div class="flex flex-row items-start rounded gap-3">
                <AvatarIcon :icon-name="profileInfo?.data?.avatar" :icon-color="profileInfo?.data?.color"/>
                <CommentsFormTextarea v-model="text"></CommentsFormTextarea>
            </div>
        </v-form>
    </div>
</template>