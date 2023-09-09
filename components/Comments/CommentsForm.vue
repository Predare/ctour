<script setup>
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
const valid = ref(false);

import { useCommentsStore } from '@/stores/comments';
const commentsStore = useCommentsStore();

import { useFilmStore } from '@/stores/film';
const filmStore = useFilmStore();
async function postComment() {
    await $fetch(`/api/comments/`, {
        method: 'POST', body: {
            name: profileInfo.value.data.name,
            email: 'example.email',
            text: text.value,
            filmId: filmStore.film.id,
            avatar: profileInfo.value.data.avatar,
        }
    }).catch(error => console.log(error)).then(response => {
        clearForm();
        commentsStore.shiftComments([response]);
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