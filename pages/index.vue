<script setup>
import { useFilmFilterStore } from '@/stores/filmFilter';
import { useCatalogueFilmStore } from '@/stores/catalogueFilms';
const catalogueFilmStore = useCatalogueFilmStore();
const filmFilterStore = useFilmFilterStore();

onMounted(() => {
    catalogueFilmStore.nextPage();
});

filmFilterStore.$subscribe((mutation, state) => {
    if (mutation.events.key = 'fullreload' && mutation.events.newValue === true) {
        catalogueFilmStore.clear();
        catalogueFilmStore.nextPage();
    }
});

function clearFilter(setter) {
    setter('');
    filmFilterStore.setFullreload(true);
}
</script>

<template>
    <v-container class="bg-surface-lighten-1 rounded-md" style="padding: 3rem; padding-bottom: 0; padding-top: 2rem;">
        <v-row>
            <v-col>
                <CatalogueSearchForm/>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <CatalogueGenreTable />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <div class="flex flex-row justify-between">
                    <p class="text-h6">Каталог</p>
                    <CatalogueSortButtons />
                </div>
                <div class="flex flex-row gap-2 mt-3">
                    <v-chip v-if="filmFilterStore.genre" closable variant="elevated"
                        @click:close="() => clearFilter(filmFilterStore.setGenre)" color="purple" class="capitalize"
                        :text="filmFilterStore.genre" />
                    <v-chip v-if="filmFilterStore.selection" closable variant="elevated"
                        @click:close="() => clearFilter(filmFilterStore.setSelection)" color="light-green" class="capitalize"
                        :text="filmFilterStore.selection" />
                    <v-chip v-if="filmFilterStore.country" closable variant="elevated"
                        @click:close="() => clearFilter(filmFilterStore.setCountry)" color="blue" class="capitalize"
                        :text="filmFilterStore.country" />
                    <v-chip v-if="filmFilterStore.voice" closable variant="elevated"
                        @click:close="() => clearFilter(filmFilterStore.setVoice)" color="yellow" class="capitalize"
                        :text="filmFilterStore.voice" />
                    <v-chip v-if="filmFilterStore.actor" closable variant="elevated"
                        @click:close="() => clearFilter(filmFilterStore.setActor)" color="pink" class="capitalize"
                        :text="'Актёр:' + ' ' + filmFilterStore.actor" />
                    <v-chip v-if="filmFilterStore.director" closable variant="elevated"
                        @click:close="() => clearFilter(filmFilterStore.setDirector)" color="red" class="capitalize"
                        :text="'Режиссёр:' + ' ' + filmFilterStore.director" />
                    <v-chip v-if="filmFilterStore.yearFrom" closable variant="elevated"
                        @click:close="() => clearFilter(filmFilterStore.setYearFrom)" color="green" class="capitalize"
                        :text="'От:' + ' ' + filmFilterStore.yearFrom" />
                    <v-chip v-if="filmFilterStore.yearTo" closable variant="elevated"
                        @click:close="() => clearFilter(filmFilterStore.setYearTo)" color="orange" class="capitalize"
                        :text="'До:' + ' ' + filmFilterStore.yearTo" />
                </div>
                <FilmsTable/>
            </v-col>
        </v-row>
    </v-container>
</template>