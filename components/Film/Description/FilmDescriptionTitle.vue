<script setup>
import { useFilmStore } from '@/stores/film';
const filmStore = useFilmStore();
</script>

<template>
    <div class="flex flex-row items-center gap-2">
        <h1 class="text-xl text-left text-h5">{{ filmStore.film.name }}<span class="text-lg">&nbsp;{{
            filmStore.film.season[0] }}
                сезон
                {{ filmStore.film.season[1] }} серия {{ filmStore.film.ageRestriction }}+</span></h1>
        <FilmBookmarkButton />
    </div>
</template>