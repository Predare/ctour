<script setup>
import { useFilmFilterStore } from '@/stores/filmFilter';
const filmFilterStore = useFilmFilterStore();
</script>

<template>
    <div>
        <v-chip-filter v-if="filmFilterStore.favorite" @click:close="filmFilterStore.clearFavorite" color="light-blue"
            text="Избранное" />
        <v-chip-filter v-if="filmFilterStore.viewed" @click:close="filmFilterStore.clearViewed" color="light-red"
            text="Просмотренное" />
        <v-chip-filter v-if="filmFilterStore.genre.length > 0" @click:close="filmFilterStore.clearGenres" color="purple"
            :text="filmFilterStore.genre.join(', ')" />
        <v-chip-filter v-if="filmFilterStore.selection.length > 0" @click:close="filmFilterStore.clearSelections"
            color="light-green" :text="filmFilterStore.selection.map(selection => selection.name).join(', ')" />
        <v-chip-filter v-if="filmFilterStore.country" @click:close="filmFilterStore.clearCountry" color="blue"
            :text="filmFilterStore.country" />
        <v-chip-filter v-if="filmFilterStore.voice.length > 0" @click:close="filmFilterStore.clearVoices" color="yellow"
            :text="filmFilterStore.voice.join(', ')" />
        <v-chip-filter v-if="filmFilterStore.actor.length > 0" @click:close="filmFilterStore.clearActors" color="pink"
            :text="'Актёр:' + ' ' + filmFilterStore.actor.map(actor => actor.name).join(', ')" />
        <v-chip-filter v-if="filmFilterStore.director.length > 0" @click:close="filmFilterStore.clearDirectors" color="red"
            :text="'Режиссёр:' + ' ' + filmFilterStore.director.map(director => director.name).join(', ')" />
        <v-chip-filter v-if="filmFilterStore.yearFrom" @click:close="filmFilterStore.setYearFrom(null)" color="green"
            :text="'От:' + ' ' + filmFilterStore.yearFrom" />
        <v-chip-filter v-if="filmFilterStore.yearTo" @click:close="filmFilterStore.setYearTo(null)" color="orange"
            :text="'До:' + ' ' + filmFilterStore.yearTo" />
    </div>
</template>

<style scoped>
.v-chip-filter {
    text-transform: capitalize;
    margin: 0.3rem;
}
</style>