<script setup>
const route = useRoute();
const authorId = route.params.authorId;
const filmLink = route.params.filmLink;

const filmName = ref('');
const items = ref([]);
const comments = ref([]);
async function getReview() {
    await useFetch(`/api/review/get/?filmLink=${filmLink}&authorId=${authorId}&single=true`).then(response => {
        items.value = response.data.value;
        getComments(response.data.value[0].id);
    });
}

async function getComments(reviewId) {
    $fetch(`/api/comments/review/${reviewId}`).then(response => {
        comments.value = response.comments;
    })
}

async function getFilmName() {
    await useFetch(`/api/film/get/name/${filmLink}`).then(response => {
        filmName.value = response.data.value.name;
    })
}

await getReview();
await getFilmName();
</script>

<template>
    <div class="flex flex-col gap-10">
        <NuxtLink :to="`/film/${ filmLink }`">
            <h1 class="text-2xl font-bold">Рецензия на фильм {{ filmName }}</h1>
        </NuxtLink>
        <div class="bg-surface-lighten-1 p-4 rounded-md">
            <ClientOnly>
                <ReviewsItem v-for="item in items" :key="item.id" :filmLink="filmLink" :authorId="item.authorId"
                    :id="item.id" :viewsCount="item.viewsCount" :name="item.author.name" :avatar="item.author.avatar"
                    :avatarColor="item.author.color" :userId="item.author.id" :text="item.text" :rating="item.rating"
                    :createdAt="item.createdAt" :voteStatus="item.voteStatus" :positiveVotes="item.positiveVotes"
                    :negativeVotes="item.negativeVotes" :userReviewsCount="item.author._count.reviews"
                    :commentsCount="item._count.comments" />
            </ClientOnly>
        </div>
        <div class="flex flex-col bg-surface-lighten-1 p-4 rounded-md">
            <CommentsSlot v-for="i in comments" :key="i.id" :id="i.id" :title="i.user.name" :text="i.text"
                :avatar="i.user.avatar" :ratingPositive="i.positiveVotes" :ratingNegative="i.negativeVotes"
                :createdAt="i.createdAt" :color="i.user.color" :voteStatus="i.voteStatus" :rank="i.user.rank.name"
                :rankColor="i.user.rank.color" :userId="i.user.id">
            </CommentsSlot>
        </div>
    </div>
</template>