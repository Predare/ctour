<script setup>
import { useFilmFilterStore } from '@/stores/filmFilter';
import { useFilmStore } from '@/stores/film';

const filmStore = useFilmStore();
const filmFilterStore = useFilmFilterStore();

const genres = ref(filmStore.film.genres);
</script>

<template>
    <FilmDescriptionTemplate title="Жанры">
        <FilmTextLink v-for="genre in genres" :title="genre.name + ' ' + genre.emoji"
                        :setter="filmFilterStore.setGenre" :value="genre.name" />
    </FilmDescriptionTemplate>
</template>