<script setup>
import { useFilmFilterStore } from '@/stores/filmFilter';
import { useCatalogueFilmStore } from '@/stores/catalogueFilms';
const catalogueFilmStore = useCatalogueFilmStore();
const filmFilterStore = useFilmFilterStore();

onMounted(() => {
    catalogueFilmStore.nextPage();
    filmFilterStore.$subscribe((mutation, state) => {
        if (mutation.events.key = 'fullreload' && mutation.events.newValue === true) {
            catalogueFilmStore.clear();
            catalogueFilmStore.nextPage();
        }
    });
});
</script>

<template>
    <v-container class="bg-surface-lighten-1 rounded-md">
        <v-col>
            <CatalogueSearchForm />
        </v-col>
        <v-col>
            <CatalogueGenreTable />
        </v-col>
        <v-col>
            <div class="flex justify-between">
                <p class="text-h6">Каталог</p>
                <CatalogueSortButtons />
            </div>
            <CatalogueFilterChipsLine class="mt-3" />
            <FilmsTable />
        </v-col>
    </v-container>
</template>

<style scoped>
.v-container {
    padding: 3rem;
    padding-bottom: 0;
    padding-top: 2rem;
}
</style>