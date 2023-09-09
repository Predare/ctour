<script setup>
const year = ref([1894, 2023]);

const props = defineProps({
    year: {
        type: Array
    }
})
</script>

<template>
    <v-range-slider min="1894" max="2023" :step="1" thumb-label label="Год" :model-value="props.year" @update:model-value="$emit('update:year', $event)" class="align-center">
        <template v-slot:prepend>
            <v-text-field :model-value="props.year[0]" hide-details single-line type="number" variant="outlined" density="compact"
                style="width: 90px" @update:model-value="$emit('update:year', [$event, year[1]])"></v-text-field>
        </template>
        <template v-slot:append>
            <v-text-field :model-value="props.year[1]" hide-details single-line type="number" variant="outlined" style="width: 90px"
                density="compact" @update:model-value="$emit('update:year', [year[0], $event])"></v-text-field>
        </template>
    </v-range-slider>
</template>