<script setup>
import { useFilmFilterStore } from '@/stores/filmFilter';
import { useFilmStore } from '@/stores/film';

const filmStore = useFilmStore();
const filmFilterStore = useFilmFilterStore();

const actors = ref(filmStore.film.actors);
</script>

<template>
    <FilmDescriptionTemplate title="Актёры">
        <FilmTextLink v-for="actor in actors" :title="actor.name" :setter="filmFilterStore.setActor"
            :value="actor.name" />
    </FilmDescriptionTemplate>
</template>