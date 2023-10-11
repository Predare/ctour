<script setup>
import { useFilmFilterStore } from '@/stores/filmFilter';
import { useFilmStore } from '@/stores/film';

const filmStore = useFilmStore();
const filmFilterStore = useFilmFilterStore();

const countries = ref(filmStore.film.country);
</script>

<template>
    <FilmDescriptionTemplate title="Страна">
        <FilmTextLink v-for="country in countries" :title="country.name + ' ' + country.emoji"
                        :setter="filmFilterStore.setCountry" :value="country.name" />
    </FilmDescriptionTemplate>
</template>