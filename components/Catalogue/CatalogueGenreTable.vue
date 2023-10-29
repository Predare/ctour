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
                <EmojiButton v-for="i in genres" :key="i.id" :text="i.name" :emoji="i.emoji"
                    @click="setNewGenre(i.name)" />
            </div>
        </v-card-text>
    </v-card>
</template>