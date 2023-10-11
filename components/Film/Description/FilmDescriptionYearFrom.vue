<script setup>
import { useFilmFilterStore } from '@/stores/filmFilter';
import { useFilmStore } from '@/stores/film';

const filmStore = useFilmStore();
const filmFilterStore = useFilmFilterStore();

const year = ref(String(filmStore.film.yearStart));
const setter = ref(filmFilterStore.setYearFrom);
</script>

<template>
    <FilmDescriptionTemplate title="Год выпуска">
        <FilmTextLink :title="year" :setter="setter" :value="year" />
    </FilmDescriptionTemplate>
</template>