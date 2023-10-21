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
    <v-container class="bg-surface-lighten-1 rounded-md" style="padding: 3rem; padding-bottom: 0; padding-top: 2rem;">
        <v-col>
            <CatalogueSearchForm />
        </v-col>
        <v-col>
            <CatalogueGenreTable />
        </v-col>
        <v-col>
            <div class="flex flex-row justify-between">
                <p class="text-h6">Каталог</p>
                <CatalogueSortButtons />
            </div>
            <CatalogueFilterChipsLine class="mt-3" />
            <FilmsTable />
        </v-col>
    </v-container>
</template>