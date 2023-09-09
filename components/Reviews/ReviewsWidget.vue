<script setup>
const props = defineProps({
    filmId: Number,
    authorId: String,
});

const items = ref();

onMounted(() => {
    $fetch(`/api/review/get/?${props.filmId ? 'filmId' + props.filmId : 'authorId' +props.authorId}`).then(response => {
        items.value = response;
    });
})
</script>

<template>
    <div class="flex flex-col rounded-md gap-8 overflow-auto">
        <ReviewsItem v-for="item in items" :key="item.id" :review="item" :name="item.author.name"
            :avatar="item.author.avatar" :avatarColor="item.author.color" :userId="item.author.id" :text="item.text"
            :pole="item.rating" :createdAt="item.createdAt" />
    </div>
</template>