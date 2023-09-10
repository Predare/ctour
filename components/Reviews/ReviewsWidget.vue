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
        <ReviewsItem v-for="item in items" :key="item.id" :data="item" />
    </div>
</template>