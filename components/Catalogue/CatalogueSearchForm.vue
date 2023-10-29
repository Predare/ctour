<script setup>
import { useSearchFormStore } from '@/stores/searchForm';
import { useFilmFilterStore } from '@/stores/filmFilter';

const searchFormStore = useSearchFormStore()
const expand = computed(() => {
    return [searchFormStore.expand ? "searchForm" : null];
});

const { data: filters } = await useFetch('/api/catalogueFilters/all');
const { genres, voices, countries } = filters.value;

const genresNames = computed(() => {
    var names = [];
    names = names.concat(genres.map(genre => genre.name));
    return names;
})

const voiceNames = computed(() => {
    var names = [];
    names = names.concat(voices.map(voice => voice.name));
    return names;
})

const countryNames = computed(() => {
    var names = [];
    names = names.concat(countries.map(country => country.name));
    return names;
})

const filmFilterStore = useFilmFilterStore();

function clearForm() {
    filmFilterStore.clearFilters();
}
</script>

<template>
    <v-expansion-panels v-model="expand" multiple>
        <v-expansion-panel value="searchForm">
            <v-expansion-panel-title color="surface-lighten-2" @click="searchFormStore.changeStatus">
                <p class="text-h6">Поиск</p>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="pa-0 bg-surface-lighten-2">
                <v-form>
                    <v-container class="pa-2">
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-select multiple clearable v-model="filmFilterStore.genre" :items="genresNames" label="Жанр"
                                    prependIcon="fa:fa-solid fa-masks-theater"></v-select>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-select clearable v-model="filmFilterStore.country" :items="countryNames" label="Страна"
                                    prependIcon="fa:fa-solid fa-earth-americas"></v-select>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-select multiple clearable v-model="filmFilterStore.voice" :items="voiceNames" label="Озвучка"
                                    prependIcon="fa:fa-solid fa-microphone"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="4">
                                <MeilisearchWidget hitsClass="bg-surface-lighten-4" :selectedItems="filmFilterStore.selection"
                                    :addItem="(item) => filmFilterStore.setSelection(filmFilterStore.selection.concat(item))"
                                    :removeItem="(item) => filmFilterStore.setSelection(filmFilterStore.selection.filter(i => i.name !== item.name))"
                                    placeholder="Подборки" searchIndex="selection" icon="fa:fa-solid fa-puzzle-piece"
                                    :enableForm="false" listStyleClass="bg-surface-lighten-3" />
                            </v-col>
                            <v-col cols="12" md="4">
                                <MeilisearchWidget hitsClass="bg-surface-lighten-4" :selectedItems="filmFilterStore.actor"
                                    :addItem="(item) => filmFilterStore.setActor(filmFilterStore.actor.concat(item))"
                                    :removeItem="(item) => filmFilterStore.setActor(filmFilterStore.actor.filter(i => i.name !== item.name))"
                                    placeholder="Актёр" searchIndex="stuff" icon="mdi-account-group" :enableForm=" false "
                                    listStyleClass="bg-surface-lighten-3" />
                            </v-col>
                            <v-col cols="12" md="4">
                                <MeilisearchWidget hitsClass="bg-surface-lighten-4" :selectedItems="filmFilterStore.director"
                                    :addItem="(item) => filmFilterStore.setDirector(filmFilterStore.director.concat(item))"
                                    :removeItem="(item) => filmFilterStore.setDirector(filmFilterStore.director.filter(i => i.name !== item.name))"
                                    placeholder="Режиссёр" searchIndex="stuff" icon="mdi-account-group" :enableForm=" false "
                                    listStyleClass="bg-surface-lighten-3" />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="7">
                                <CatalogueRangeSlider class="max-w-[550px]"/>
                            </v-col>
                            <v-col cols="12" md="5">
                                <div class="flex flex-row gap-2 justify-end">
                                    <v-checkbox v-model="filmFilterStore.favorite" label="Избранное"></v-checkbox>
                                    <v-checkbox v-model="filmFilterStore.viewed" label="Просмотренное"></v-checkbox>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-btn color="warning" block class="mt-2" @click=" clearForm " text="Очистить"></v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>