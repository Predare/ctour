<script setup>
import { useFilmStore } from '@/stores/film';
const filmStore = useFilmStore();
</script>

<template>
    <p class="mt-2 text-left text-body-2 max-w-[800px]">{{ filmStore.film.description }}</p>
</template>