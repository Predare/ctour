<script setup>
const { data: genres } = await useFetch('/api/catalogueFilters/genre');

import { useFilmFilterStore } from '@/stores/filmFilter';
const filmFilterStore = useFilmFilterStore();

function setNewGenre(genre){
    filmFilterStore.clearFilters();
    filmFilterStore.setGenre([genre]);
}
</script>

<template>
    <v-card title="Жанры" color="surface-lighten-2">
        <v-card-text>
            <div class="grid grid-cols-6 gap-1">
                <v-emoji-button v-for="i in genres" :key="i.id" @click="setNewGenre(i.name)" >{{ i.emoji + " " + i.name}}</v-emoji-button>
            </div>
        </v-card-text>
    </v-card>
</template>