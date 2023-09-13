<script setup>
const props = defineProps({
    reviewsCount: Number,
});

const reviewsCountText = computed(() => {
    if (props.reviewsCount === 1) {
        return props.reviewsCount + ' рецензия';
    } else {
        return props.reviewsCount + ' рецензии';
    }
});
</script>

<template>
    <p class="text-caption">{{ reviewsCountText }}</p>
</template>