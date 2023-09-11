<script setup>
import { useCatalogueFilmStore } from '@/stores/catalogueFilms';
const catalogueFilmStore = useCatalogueFilmStore();
</script>

<template>
    <div class="flex justify-center">
            <v-container>
                <v-row no-gutters>
                    <v-col cols="2" v-for="film in catalogueFilmStore.films" :key="film.id">
                        <InfoPoster class="ma-2" :filmInfo="film"/>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn :disabled="catalogueFilmStore.cursor === -1" @click="catalogueFilmStore.nextPage" color="surface-lighten-2" block>Показать ещё</v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-pagination :modelValue="catalogueFilmStore.page" @update:modelValue="newValue => catalogueFilmStore.changePage(newValue)" :length="catalogueFilmStore.count"></v-pagination>
                    </v-col>
                </v-row>
            </v-container>
    </div>
</template>