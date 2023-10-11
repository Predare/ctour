<script setup>
const route = useRoute();
const authorName = route.params.authorName;
const filmLink = route.params.filmLink;
const filmName = ref('');
const review = ref();
await useFetch(`/api/review/get/?filmLink=${filmLink}&authorName=${authorName}&single=true`).then(response => {
    review.value = response.data.value[0];
    filmName.value = response.data.value[0].film.name;
});

const commentLinks = computed(() => {
    return formatGetCommentsLink().review(unref(review.value.id));
});
</script>

<template>
    <div class="flex flex-col gap-10">
        <NuxtLink :to="`/film/${filmLink}`">
            <h1 class="text-2xl font-bold">Рецензия на фильм {{ filmName }}</h1>
        </NuxtLink>
        <div class="bg-surface-lighten-1 p-4 rounded-md">
            <ClientOnly>
                <ReviewsItem :data="review" />
            </ClientOnly>
        </div>
        <div class="flex flex-col bg-surface-lighten-1 p-4 rounded-md">
            <CommentsWidget :api="commentLinks" />
        </div>
    </div>
</template>