<script setup>
import { useCommentsStore } from '@/stores/comments';
const commentsStore = useCommentsStore();
await getComments();
async function getComments() {
    if (!commentsStore.getLink) return;
    commentsStore.getNext = false;
    const link = computed(() => { return `${commentsStore.getLink}/?cursor=${commentsStore.cursor}` });
    $fetch(link.value).then(response => {
        commentsStore.comments.push(...response.comments);
        commentsStore.cursor = response.cursor;
    });
}

commentsStore.$subscribe((mutation, state) => {
    if (state.getNext) {
        getComments();
    }
})

</script>

<template>
    <div class="flex flex-col mt-5 gap-4 px-2">
        <CommentsSlot v-for="i in commentsStore.comments" :key="i.id" :data="i" />
        <v-btn v-if="commentsStore.cursor != -1" @click="commentsStore.getNext = true" color="surface-lighten-2" block
            size="small">Загрузить
            ещё</v-btn>
    </div>
</template>