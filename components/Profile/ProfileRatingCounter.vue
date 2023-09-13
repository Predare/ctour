<script setup>
const props = defineProps({
    rating: Number,
});

const ratingCountText = computed(() => {
    if (props.rating === 1) {
        return ' Рейтинг';
    } else if (props.rating === 0) {
        return ' Рейтинга';
    } else {
        return ' Рейтинга';
    }
});
</script>

<template>
    <p class="mt-2"><span class="font-bold" v-text="rating"></span> {{ ratingCountText }}</p>
</template>