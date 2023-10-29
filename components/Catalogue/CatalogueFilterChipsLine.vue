<script setup>
import { useFilmFilterStore } from '@/stores/filmFilter';
const filmFilterStore = useFilmFilterStore();

const chipDataFavorite = computed(() => {
    return {
        if: filmFilterStore.favorite,
        onClose: filmFilterStore.clearFavorite,
        color: "light-blue",
        text: "Избранное",
    }
});

const chipDataViewed = computed(() => {
    return {
        if: filmFilterStore.viewed,
        onClose: filmFilterStore.clearViewed,
        color: "light-red",
        text: "Просмотренное",
    }
});

const chipDataGenre = computed(() => {
    return {
        if: filmFilterStore.genre.length > 0,
        onClose: filmFilterStore.clearGenres,
        color: "purple",
        text: filmFilterStore.genre.join(', '),
    }
});

const chipDataSelection = computed(() => {
    return {
        if: filmFilterStore.selection.length > 0,
        onClose: filmFilterStore.clearSelections,
        color: "light-green",
        text: filmFilterStore.selection.map(selection => selection.name).join(', '),
    }
});

const chipDataCountry = computed(() => {
    return {
        if: filmFilterStore.country,
        onClose: filmFilterStore.clearCountry,
        color: "blue",
        text: filmFilterStore.country,
    }
});

const chipDataVoice = computed(() => {
    return {
        if: filmFilterStore.voice.length > 0,
        onClose: filmFilterStore.clearVoices,
        color: "yellow",
        text: filmFilterStore.voice.join(', '),
    }
});

const chipDataActor = computed(() => {
    return {
        if: filmFilterStore.actor.length > 0,
        onClose: filmFilterStore.clearActors,
        color: "pink",
        text: 'Актёр:' + ' ' + filmFilterStore.actor.map(actor => actor.name).join(', '),
    }
});

const chipDataDirector = computed(() => {
    return {
        if: filmFilterStore.director.length > 0,
        onClose: filmFilterStore.clearDirectors,
        color: "red",
        text: 'Режиссёр:' + ' ' + filmFilterStore.director.map(director => director.name).join(', '),
    }
});

const chipDataYearFrom = computed(() => {
    return {
        if: filmFilterStore.yearFrom,
        onClose: () => filmFilterStore.setYearFrom(null),
        color: "green",
        text: "От:" + ' ' + filmFilterStore.yearFrom,
    }
});

const chipDataYearTo = computed(() => {
    return {
        if: filmFilterStore.yearTo,
        onClose: () => filmFilterStore.setYearTo(null),
        color: "orange",
        text: 'До:' + ' ' + filmFilterStore.yearTo,
    }
});
</script>

<template>
    <div>
        <v-chip-filter v-if="chipDataFavorite.if" @click:close="chipDataFavorite.onClose" :color="chipDataFavorite.color"
            :text="chipDataFavorite.text" />
        <v-chip-filter v-if="chipDataViewed.if" @click:close="chipDataViewed.onClose" :color="chipDataViewed.color"
            :text="chipDataViewed.text" />
        <v-chip-filter v-if="chipDataGenre.if" @click:close="chipDataGenre.onClose" :color="chipDataGenre.color"
            :text="chipDataGenre.text" />
        <v-chip-filter v-if="chipDataSelection.if" @click:close="chipDataSelection.onClose" :color="chipDataSelection.color"
            :text="chipDataSelection.text" />
        <v-chip-filter v-if="chipDataVoice.if" @click:close="chipDataVoice.onClose" :color="chipDataVoice.color"
            :text="chipDataVoice.text" />
        <v-chip-filter v-if="chipDataActor.if" @click:close="chipDataActor.onClose" :color="chipDataActor.color"
            :text="chipDataActor.text" />
        <v-chip-filter v-if="chipDataDirector.if" @click:close="chipDataDirector.onClose" :color="chipDataDirector.color"
            :text="chipDataDirector.text" />
        <v-chip-filter v-if="chipDataCountry.if" @click:close="chipDataCountry.onClose" :color="chipDataCountry.color"
            :text="chipDataCountry.text" />
        <v-chip-filter v-if="chipDataYearFrom.if" @click:close="chipDataYearFrom.onClose" :color="chipDataYearFrom.color"
            :text="chipDataYearFrom.text" />
        <v-chip-filter v-if="chipDataYearTo.if" @click:close="chipDataYearTo.onClose" :color="chipDataYearTo.color"
            :text="chipDataYearTo.text" />
    </div>
</template>

<style scoped>
.v-chip-filter {
    text-transform: capitalize;
    margin: 0.3rem;
}
</style>