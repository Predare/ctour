<script setup>
const props = defineProps({
    rating: Number,
});
</script>

<template>
    <p class="mt-2"><span class="font-bold" v-text="rating"></span> Рейтинг</p>
</template>