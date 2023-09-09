<script setup>
const props = defineProps({
    title: {
        type: String
    },
    setter: {
        type: Function
    },
    value: {
        type: String
    }
});

import { useFilmFilterStore } from '@/stores/filmFilter';
const filmFilterStore = useFilmFilterStore();

function setFilter() {
    filmFilterStore.pureFilters();
    props.setter(props.value);
    filmFilterStore.setFullreload(true);
}
</script>

<template>
    <NuxtLink to="/"><v-btn @click="setFilter" :ripple="false" size="x-small" variant="plain"
            class="pa-0 text-body-2 mb-0.5 text-capitalize">{{ title }}</v-btn></NuxtLink>
</template>