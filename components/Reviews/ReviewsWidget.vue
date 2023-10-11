<script setup>
const props = defineProps({
    filmLink: String,
    name: String,
});
const { data } = await useFetch(`/api/review/get/?${props.filmLink ? 'filmLink=' + props.filmLink : 'authorId=' + props.name}`);
</script>

<template>
    <div v-if="data.length > 0" class="flex flex-col rounded-md gap-8 overflow-auto">
        <ReviewsItem v-for="item in data" :key="item.id" :data="item" />
    </div>
</template>