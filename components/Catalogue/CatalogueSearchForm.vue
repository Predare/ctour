<script setup>

import { useSearchFormStore } from '@/stores/searchForm';

const searchFormStore = useSearchFormStore()
const expand = computed(() => {
    return [searchFormStore.expand ? "searchForm" : null];
});

const selectGenre = ref('');
const selectCountry = ref('');
const selectVoice = ref('');
const selectSelection = ref('');
const year = ref([1894, 2023]);
const selectFavorite = ref(false);
const selectViewed = ref(false);
const selectedDirectors = ref([]);
const selectedActors = ref([]);
const selectedSelections = ref([]);

const { data: filters } = await useFetch('/api/catalogueFilters/all');
const { genres, voices, selections, countries } = filters.value;

const genresNames = computed(() => {
    var names = [''];
    names = names.concat(genres.map(genre => genre.name));
    return names;
})

const voiceNames = computed(() => {
    var names = [''];
    names = names.concat(voices.map(voice => voice.name));
    return names;
})

const selectionNames = computed(() => {
    var names = [''];
    names = names.concat(selections.map(selection => selection.name));
    return names;
})

const countryNames = computed(() => {
    var names = [''];
    names = names.concat(countries.map(country => country.name));
    return names;
})

import { useFilmFilterStore } from '@/stores/filmFilter';
const filmFilterStore = useFilmFilterStore();

function applyFilters() {
    filmFilterStore.pureFilters();
    filmFilterStore.setGenre(selectGenre.value);
    filmFilterStore.setCountry(selectCountry.value);
    filmFilterStore.setActor(selectedActors.value);
    filmFilterStore.setDirector(selectedDirectors.value);
    filmFilterStore.setVoice(selectVoice.value);
    filmFilterStore.setYearFrom(year.value[0]);
    filmFilterStore.setYearTo(year.value[1]);
    filmFilterStore.setSelection(selectSelection.value);
    filmFilterStore.favorite = selectFavorite.value;
    filmFilterStore.viewed = selectViewed.value;
    filmFilterStore.setFullreload(true);
}

function clearForm() {
    selectActor.value = '';
    selectGenre.value = '';
    selectCountry.value = '';
    selectVoice.value = '';
    selectSelection.value = '';
    selectDirector.value = '';
    year.value = [1894, 2023];
}

function addItemToArray(array, item) {
    array.push(item)
}

function removeItemFromArray(array, item) {
    array.splice(array.indexOf(item), 1);
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
                                <v-select multiple clearable v-model="selectGenre" :items="genresNames"
                                    label="Жанр" prependIcon="fa:fa-solid fa-masks-theater"></v-select>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-select clearable v-model="selectCountry" :items="countryNames" label="Страна"
                                    prependIcon="fa:fa-solid fa-earth-americas"></v-select>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-select multiple clearable v-model="selectVoice" :items="voiceNames" label="Озвучка"
                                    prependIcon="fa:fa-solid fa-microphone"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="4">
                                <AdminSearchWidget hitsClass="bg-surface-lighten-4" :selectedItems="selectedSelections"
                                    :addItem="(item) => addItemToArray(selectedSelections, item)"
                                    :removeItem="(item) => removeItemFromArray(selectedSelections, item)"
                                    placeholder="Подборки" searchIndex="selection" icon="fa:fa-solid fa-puzzle-piece"
                                    :enableForm="false" listStyleClass="bg-surface-lighten-3" />
                            </v-col>
                            <v-col cols="12" md="4">
                                <AdminSearchWidget hitsClass="bg-surface-lighten-4" :selectedItems="selectedActors"
                                    :addItem="(item) => addItemToArray(selectedActors, item)"
                                    :removeItem="(item) => removeItemFromArray(selectedActors, item)" placeholder="Актёр"
                                    searchIndex="stuff" icon="mdi-account-group" :enableForm="false"
                                    listStyleClass="bg-surface-lighten-3" />
                            </v-col>
                            <v-col cols="12" md="4">
                                <AdminSearchWidget hitsClass="bg-surface-lighten-4" :selectedItems="selectedDirectors"
                                    :addItem="(item) => addItemToArray(selectedDirectors, item)"
                                    :removeItem="(item) => removeItemFromArray(selectedDirectors, item)"
                                    placeholder="Режиссёр" searchIndex="stuff" icon="mdi-account-group" :enableForm="false"
                                    listStyleClass="bg-surface-lighten-3" />
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
    </v-expansion-panels></template>