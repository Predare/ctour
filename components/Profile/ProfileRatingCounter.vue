<script setup>
const props = defineProps({
    rating: {
        type: Number,
        default: 0,
    },
});

const ratingCountText = ref(ratingTextFormatter(props.rating));
watch(() => props.rating, () => {
    ratingCountText.value = ratingTextFormatter(props.rating);
});
</script>

<template>
    <p class="mt-2"><span class="font-bold" v-text="ratingCountText.value"></span> {{ ratingCountText.text }}</p>
</template>