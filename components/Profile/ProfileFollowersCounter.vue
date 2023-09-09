<script setup>
const props = defineProps({
    followersCount: Number
});
</script>

<template>
    <p class="mt-2"><span class="font-bold" v-text="props.followersCount"></span> Читателей</p>
</template>