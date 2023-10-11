<script setup>
import { useFilmFilterStore } from '@/stores/filmFilter';
import { useFilmStore } from '@/stores/film';

const filmStore = useFilmStore();
const filmFilterStore = useFilmFilterStore();

const directors = ref(filmStore.film.directors);
</script>

<template>
    <FilmDescriptionTemplate title="Режиссёр">
        <FilmTextLink v-for="director in directors" :title="director.name"
                        :setter="filmFilterStore.setDirector" :value="director.name" />
    </FilmDescriptionTemplate>
</template>