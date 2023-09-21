<script setup>
const props = defineProps({
    getLink: {
        type: String,
        required: true,
    }
});

const {data} = await useFetch(props.getLink);
const cursor = ref(data.value.cursor);
const comments = ref(data.value.comments);
async function loadComments() {
    $fetch(props.getLink, { method: 'GET', params: { cursor: unref(cursor) } }).then(res => {
        comments.value = unref(comments).concat(res.comments);
        cursor.value = res.cursor;
    })
}
</script>

<template>
    <div class="flex flex-col mt-5 gap-4 px-2">
        <CommentsSlot v-for="i in comments" :key="i.id" :id="i.id" :reply-comment-id="i.replyCommentId" :userId="i.user.id"
            :userName="i.user.name" :user-avatar="i.user.avatar" :userAvatarColor="i.user.color"
            :userRankColor="i.user.rank.color" :userRankName="i.user.rank.name" :text="i.text"
            :subcommentCount="i._count?.subComments" :created-at="i.createdAt" :positive-votes="i.positiveVotes"
            :negative-votes="i.negativeVotes" :vote-status="i.voteStatus" />
        <v-btn v-if="cursor != -1" @click="loadComments" color="surface-lighten-2" block size="small">Загрузить
            ещё</v-btn>
    </div>
</template>