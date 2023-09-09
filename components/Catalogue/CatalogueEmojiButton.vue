<script setup>
    const props = defineProps({
       text: String,
       emoji: String
    });
</script>

<template>
    <v-btn variant="text" class="text-body-1">{{ emoji + " " + text}}</v-btn>
</template>