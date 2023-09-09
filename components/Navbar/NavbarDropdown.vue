<script setup>
const props = defineProps({
    title: String,
    items: Array,
    setter: Function
});

import { useFilmFilterStore } from '@/stores/filmFilter';
const filmFilterStore = useFilmFilterStore();

function setFilter(name) {
    filmFilterStore.pureFilters();
    props.setter(name);
    filmFilterStore.setFullreload(true);
}

</script>

<template>
    <v-menu open-on-hover open-delay="100">
        <template v-slot:activator="{ props }">
            <v-btn rounded="0" class="min-h-[50px]" variant="text" v-bind="props" append-icon="mdi-chevron-down">
                {{ title }}
            </v-btn>
        </template>
        <v-list>
            <NavbarLinkButton v-for="(item) in items" :name="item.name" :key="item.id" @click="setFilter(item.name)"/>
        </v-list>
    </v-menu>
</template>