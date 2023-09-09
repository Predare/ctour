<script setup>
const props = defineProps({
    expierence: Number,
    nextRankExpirence: Number,
})

const lineFill = computed(() => {
    return (props.expierence / props.nextRankExpirence) * 100;
});
</script>

<template>
    <v-progress-linear rounded color="green" v-model="lineFill" :height="22"><p v-text="props.expierence  + '/' + props.nextRankExpirence"></p></v-progress-linear>
</template>