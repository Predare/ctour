<script setup>
import { useFilmStore } from '@/stores/film';
const filmStore = useFilmStore();

import { useFilmFilterStore } from '@/stores/filmFilter';
const filmFilterStore = useFilmFilterStore();
</script>

<template>
    <div class="flex flex-col items-center justify-center">
        <div class="flex flex-row gap-10 items-start">
            <div>
                <v-img width="150" class="rounded-lg" cover :aspect-ratio="2 / 3" :src="filmStore.film.posterLink"></v-img>
            </div>
            <div class="flex flex-col gap-1">
                <div class="flex flex-row items-center gap-2">
                    <h1 class="text-xl text-left text-h5">{{ filmStore.film.name }}<span class="text-lg">&nbsp;{{
                        filmStore.film.season[0] }}
                            сезон
                            {{ filmStore.film.season[1] }} серия {{ filmStore.film.ageRestriction }}+</span></h1>
                    <v-tooltip location="right" text="В закладки">
                        <template v-slot:activator="{ props }">
                            <v-btn density="comfortable" color="secondary-darken-1" icon="mdi-bookmark-outline"
                                v-bind="props"></v-btn>
                        </template>
                    </v-tooltip>
                </div>
                <div class="flex flex-row items-center gap-2 text-left whitespace-nowrap">
                    <div class="flex flex-row gap-1">
                        <v-icon color="green" icon="mdi-star" />
                        <span class="text-green-500">{{ filmStore.film.rating }}</span>
                        <button>😃</button>
                    </div>
                    <span class="text-orange-500">&nbsp;<span class="font-bold">КП</span>:
                        {{ filmStore.film.kinopoiskRating }}</span>
                    <span class="text-yellow-500">&nbsp;<span class="font-bold">Imdb</span>:
                        {{ filmStore.film.imdbRating }}</span>
                </div>
                <FilmDescriptionRow title="Год выпуска">
                    <FilmTextLink :title="filmStore.film.yearStart + ''" :setter="filmFilterStore.setYearFrom" :value="filmStore.film.yearStart+''"  />
                </FilmDescriptionRow>
                <FilmDescriptionRow title="Жанры">
                    <FilmTextLink v-for="genre in filmStore.film.genres" :title="genre.name + ' ' + genre.emoji" :setter="filmFilterStore.setGenre" :value="genre.name"/>
                </FilmDescriptionRow>
                <FilmDescriptionRow title="Страна">
                    <FilmTextLink v-for="country in filmStore.film.country" :title="country.name + ' ' + country.emoji" :setter="filmFilterStore.setCountry" :value="country.name"/>
                </FilmDescriptionRow>
                <FilmDescriptionRow title="Режиссёр">
                    <FilmTextLink v-for="director in filmStore.film.directors" :title="director.name" :setter="filmFilterStore.setDirector" :value="director.name" />
                </FilmDescriptionRow>
                <FilmDescriptionRow title="Актёры">
                    <FilmTextLink v-for="actor in filmStore.film.actors" :title="actor.name" :setter="filmFilterStore.setActor" :value="actor.name" />
                </FilmDescriptionRow>
                <FilmDescriptionRow title="В категориях">
                    <FilmTextLink v-for="selection in filmStore.film.selections" :title="selection.name" :setter="filmFilterStore.setSelection" :value="selection.name"/>
                </FilmDescriptionRow>
                <FilmScreenshotSpoiler />
                <p class="mt-2 text-left text-body-2 max-w-[800px]">{{ filmStore.film.description }}</p>

            </div>
        </div>
        <FilmPlayerWidget class="mt-10"></FilmPlayerWidget>
    </div>
</template>