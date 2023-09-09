<script setup>
const toggle = ref(0);
import { useFilmFilterStore } from '@/stores/filmFilter';
import { sortTypes } from '@/stores/filmFilter';
const filmFilterStore = useFilmFilterStore();

function reSort(sort){
    filmFilterStore.setSort(sort);
    filmFilterStore.setFullreload(true);
}

</script>

<template>
    <div>
        <v-btn-toggle density="compact" v-model="toggle" divided variant="tonal">
            <v-btn class="text-body-1" text="Популярные новинки"
                @click="reSort(sortTypes.popularLatest)"></v-btn>
            <v-btn class="text-body-1" text="Сначала новое"
                @click="reSort(sortTypes.latest)"></v-btn>
            <v-btn class="text-body-1" text="Самое популярное"
                @click="reSort(sortTypes.mostPopular)"></v-btn>
        </v-btn-toggle>
    </div>
</template>