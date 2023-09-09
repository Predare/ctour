<script setup>
import { useFilmStore } from '@/stores/film';
const filmStore = useFilmStore();
const route = useRoute();

await loadFilmInfo();

async function loadFilmInfo() {
    await useFetch(`/api/film/${route.params.link}`).then(response => {
        filmStore.film = response.data.value;
    });
}
</script>

<template>
    <v-container style="padding: 0;">
        <v-row>
            <v-col>
                <!--<WavingSlider class="mb-10"/>-->
                <FilmWatchWindow class="bg-surface-lighten-1 py-10 rounded-md"
                    style="padding-left: 5rem; padding-right: 5rem;" />
                <CommentsWidget class="bg-surface-lighten-1 py-10 rounded-md mt-10" style="padding: 3rem;"></CommentsWidget>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <ReviewsWidget class="mt-10 bg-surface-lighten-1 p-10" :filmId="filmStore.film.id"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <NuxtLink :to="'/reviews/create/?id=' + filmStore.film.id">
                    <v-btn >Написать рецензию</v-btn>
                </NuxtLink>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <div class="bg-surface-lighten-1 rounded-md" style="padding: 3rem; padding-bottom: 0; padding-top: 2rem;">
                    <p class="text-h6">Каталог</p>
                    <FilmsTable :count="12" />
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>