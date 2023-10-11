<script setup>
import { useFilmFilterStore } from '@/stores/filmFilter';
import { useFilmStore } from '@/stores/film';

const filmStore = useFilmStore();
const filmFilterStore = useFilmFilterStore();

const selections = ref(filmStore.film.selections);
</script>

<template>
    <FilmDescriptionTemplate title="В категориях">
        <FilmTextLink v-for="selection in selections" :title="selection.name"
                        :setter="filmFilterStore.setSelection" :value="selection.name" />
    </FilmDescriptionTemplate>
</template>