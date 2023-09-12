<script setup>

import { useSearchFormStore } from '@/stores/searchForm';

const searchFormStore = useSearchFormStore()
const expand = computed(() => {
    return [searchFormStore.expand ? "searchForm" : null];
});

const actors = [
    'Neco Arc',
    'Joe Bidden',
    'Trump',
    'Obama',
    'Putin',
    'Millenial'
];
const directors = [
    'Neco Arc',
]
const selectActor = ref('');
const selectDirector = ref('');
const selectGenre = ref('');
const selectCountry = ref('');
const selectVoice = ref('');
const selectSelection = ref('');
const year = ref([1894, 2023]);
const selectFavorite = ref(false);
const selectViewed = ref(false);

const { data: genres } = await useFetch('/api/catalogueFilters/genre');
const { data: voices } = await useFetch('/api/catalogueFilters/voice');
const { data: selections } = await useFetch('/api/catalogueFilters/selection');
const { data: countries } = await useFetch('/api/catalogueFilters/country');

const genresNames = computed (() => {
    var names = [''];
    names = names.concat(genres.value.map(genre => genre.name));
    return names;
})

const voiceNames = computed (() => {
    var names = [''];
    names = names.concat(voices.value.map(voice => voice.name));
    return names;
})

const selectionNames = computed (() => {
    var names = [''];
    names = names.concat(selections.value.map(selection => selection.name));
    return names;
})

const countryNames = computed (() => {
    var names = [''];
    names = names.concat(countries.value.map(country => country.name));
    return names;
})

import { useFilmFilterStore } from '@/stores/filmFilter';
const filmFilterStore = useFilmFilterStore();

function applyFilters(){
    filmFilterStore.pureFilters();
    filmFilterStore.setGenre(selectGenre.value);
    filmFilterStore.setCountry(selectCountry.value);
    filmFilterStore.setActor(selectActor.value);
    filmFilterStore.setDirector(selectDirector.value);
    filmFilterStore.setVoice(selectVoice.value);
    filmFilterStore.setYearFrom(year.value[0]);
    filmFilterStore.setYearTo(year.value[1]);
    filmFilterStore.setSelection(selectSelection.value);
    filmFilterStore.favorite = selectFavorite.value;
    filmFilterStore.viewed = selectViewed.value;
    filmFilterStore.setFullreload(true);
}

function clearForm(){
    selectActor.value = '';
    selectGenre.value = '';
    selectCountry.value = '';
    selectVoice.value = '';
    selectSelection.value = '';
    selectDirector.value = '';
    year.value = [1894, 2023];
}

</script>

<template>
    <v-expansion-panels v-model="expand" multiple>
        <v-expansion-panel value="searchForm">
            <v-expansion-panel-title color="surface-lighten-2" @click="searchFormStore.changeStatus">
                <p class="text-h6">Поиск</p>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="pa-0 bg-surface-lighten-2">
                <v-form @submit.prevent="applyFilters">
                    <v-container class="pa-2">
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-select clearable v-model="selectGenre" :items="genresNames" label="Жанр"></v-select>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-select clearable v-model="selectCountry" :items="countryNames" label="Страна"></v-select>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-select clearable v-model="selectVoice" :items="voiceNames" label="Озвучка"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-select clearable v-model="selectSelection" :items="selectionNames" label="Подборки"></v-select>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-autocomplete clearable v-model="selectActor" label="Актёр" :items=actors></v-autocomplete>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-autocomplete clearable v-model="selectDirector" label="Режиссёр" :items=directors></v-autocomplete>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="7">
                                <CatalogueRangeSlider class="max-w-[550px]" v-model:year="year" />
                            </v-col>
                            <v-col cols="12" md="5">
                                <div class="flex flex-row gap-2 justify-end">
                                    <v-checkbox v-model="selectFavorite" label="Избранное"></v-checkbox>
                                    <v-checkbox v-model="selectViewed" label="Просмотренное"></v-checkbox>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-btn type="submit" color="success" block class="mt-2" text="Найти"></v-btn>
                            </v-col>
                            <v-col>
                                <v-btn color="warning" block class="mt-2" @click="clearForm" text="Очистить"></v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>