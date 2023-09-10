<script setup>
import { useCommentsStore } from '@/stores/comments';
const commentsStore = useCommentsStore();

onMounted(() => {
    commentsStore.loadNextPage();
})

onUnmounted(() => {
    commentsStore.clearComments();
})
</script>

<template>
    <div class="flex flex-col mt-5 gap-4 px-2">
        <CommentsSlot v-for="i in commentsStore.comments" :key="i.id" :id="i.id" :title="i.user.name" :text="i.text" :avatar="i.user.avatar"
            :ratingPositive="i.positiveVotes" :ratingNegative="i.negativeVotes" :createdAt="i.createdAt"
            :color="i.user.color" :voteStatus="i.voteStatus" :rank="i.user.rank.name" :rankColor="i.user.rank.color" :userId="i.user.id">
        </CommentsSlot>
    </div>
</template>