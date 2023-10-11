<script setup>
import { useFilmStore } from '@/stores/film';
const filmStore = useFilmStore();
</script>

<template>
    <div>
        <v-img width="150" class="rounded-lg" cover :aspect-ratio="2 / 3" :src="filmStore.film.posterLink"></v-img>
    </div>
</template>