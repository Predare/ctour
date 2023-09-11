<script setup>
import { useCommentsStore } from '@/stores/comments';

const route = useRoute();
const authorId = route.params.authorId;
const filmLink = route.params.filmLink;

const filmName = ref('');
const items = ref([]);
const commentsStore = useCommentsStore();

async function getReview() {
    await useFetch(`/api/review/get/?filmLink=${filmLink}&authorId=${authorId}&single=true`).then(response => {
        items.value = response.data.value;
    });
}

function setCommentLinks() {
    const reviewId = items.value[0].id;
    commentsStore.$reset();
    commentsStore.$patch(
        {
            getLink: `/api/comments/review/${reviewId}`,
            postLink: `/api/comments/review/${reviewId}`,
            hideReplayReportButton: false,
        }
    );
}

async function getFilmName() {
    await useFetch(`/api/film/get/name/${filmLink}`).then(response => {
        filmName.value = response.data.value.name;
    })
}

await getReview();
setCommentLinks();
await getFilmName();
</script>

<template>
    <div class="flex flex-col gap-10">
        <NuxtLink :to="`/film/${filmLink}`">
            <h1 class="text-2xl font-bold">Рецензия на фильм {{ filmName }}</h1>
        </NuxtLink>
        <div class="bg-surface-lighten-1 p-4 rounded-md">
            <ClientOnly>
                <ReviewsItem v-for="item in items" :key="item.id" :data="item"/>
            </ClientOnly>
        </div>
        <div class="flex flex-col bg-surface-lighten-1 p-4 rounded-md">
            <CommentsWidget />
        </div>
    </div>
</template>