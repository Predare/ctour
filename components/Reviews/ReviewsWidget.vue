<script setup>
const props = defineProps({
    filmLink: String,
    authorId: String,
});
const items = ref([]);

onMounted(() => {
    $fetch(`/api/review/get/?${props.filmLink ? 'filmLink=' + props.filmLink : 'authorId=' + props.authorId}`).then(response => {
        items.value = response;
    });
})
</script>

<template>
    <div v-if="items.length > 0" class="flex flex-col rounded-md gap-8 overflow-auto">
        <ReviewsItem v-for="item in items" :key="item.id" :filmLink="item.filmLink" :authorId="item.authorId" :id="item.id" :viewsCount="item.viewsCount" :name="item.author.name"
            :avatar="item.author.avatar" :avatarColor="item.author.color" :userId="item.author.id" :text="item.text"
            :rating="item.rating" :createdAt="item.createdAt" :voteStatus="item.voteStatus"
            :positiveVotes="item.positiveVotes" :negativeVotes="item.negativeVotes" :userReviewsCount="item.author._count.reviews"
            :commentsCount="item._count.comments" />
    </div>
</template>