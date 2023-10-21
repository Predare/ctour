<script setup>
import { useFilmFilterStore } from '@/stores/filmFilter';
const filmFilterStore = useFilmFilterStore();
</script>

<template>
    <v-range-slider min="1894" max="2023" :step="1" thumb-label label="Год" :model-value="filmFilterStore.yearRange"
        @update:model-value="filmFilterStore.yearRange = $event" class="align-center">
        <template v-slot:prepend>
            <v-year-range-field :model-value="filmFilterStore.yearRange[0]"
                @update:model-value="filmFilterStore.yearRange[0] = $event" />
        </template>
        <template v-slot:append>
            <v-year-range-field :model-value="filmFilterStore.yearRange[1]"
                @update:model-value="filmFilterStore.yearRange[1] = $event" />
        </template>
    </v-range-slider>
</template>

<style scoped>
.v-text-field {
    width: 90px;
}
</style>