<script setup>
import { useCommentsStore } from '~/stores/comments';
const commentsStore = useCommentsStore();

const id = useRoute().params.id;
commentsStore.$reset();
commentsStore.$patch({ getLink: `/api/comments/user/${id}/all`, hideReplayReportButton: true, postStyle: 'single' });

const user = ref();
async function getUser() {
    await useFetch(`/api/user/${id}`).then(response => {
        user.value = response.data.value;
    })
}
await getUser();
const showForm = ref(false);
</script>

<template>
    <div>
        <CommentsWidget class="bg-surface-lighten-1 rounded-md" style="padding: 2rem;" :showForm="showForm">
            <template v-slot:title>
                <NuxtLink :to="`/profile/${id}`">
                    <p class="text-h6">Все комментарии <span class="text-primary lowercase">{{ user?.name }}</span></p>
                </NuxtLink>
            </template>
        </CommentsWidget>
    </div>
</template>