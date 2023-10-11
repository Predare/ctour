<script setup>
import { useFilmStore } from '@/stores/film';
const filmStore = useFilmStore();

const filmFavorited = ref(filmStore.film._count.favoritedByUsers);
filmStore.$subscribe((mutation, state) => {
    if (state.film) {
        filmFavorited.value = state.film._count.favoritedByUsers;
    }
});

async function addFilmToFavoriteList() {
    filmStore.film._count.favoritedByUsers = true;
    await $fetch(`/api/user/films/favorited/${route.params.link}/`, { method: 'POST' });
}

async function removeFilmFromFavoriteList() {
    filmStore.film._count.favoritedByUsers = false;
    await $fetch(`/api/user/films/favorited/${route.params.link}/`, { method: 'DELETE' });
}
</script>

<template>
    <v-tooltip location="right" text="В закладки">
        <template v-slot:activator="{ props }">
            <v-btn density="comfortable" color="secondary-darken-1" :icon="filmFavorited ? '' : 'mdi-bookmark-outline'"
                v-bind="props" @click="filmFavorited ? removeFilmFromFavoriteList() : addFilmToFavoriteList()"></v-btn>
        </template>
    </v-tooltip>
</template>