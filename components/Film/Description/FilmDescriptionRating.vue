<script setup>
import { useFilmStore } from '@/stores/film';
const filmStore = useFilmStore();
</script>

<template>
    <div class="flex flex-row items-center gap-2 text-left whitespace-nowrap">
        <div class="flex flex-row gap-1">
            <v-icon color="green" icon="mdi-star" />
            <span class="text-green-500">{{ filmStore.film.rating }}</span>
            <button>😃</button>
        </div>
        <span class="text-orange-500">&nbsp;<span class="font-bold">КП</span>:
            {{ filmStore.film.kinopoiskRating }}</span>
        <span class="text-yellow-500">&nbsp;<span class="font-bold">Imdb</span>:
            {{ filmStore.film.imdbRating }}</span>
    </div>
</template>