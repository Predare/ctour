<script setup>
const props = defineProps({
    name: String,
});
</script>

<template>
    <NuxtLink to='/'>
        <v-list-item>
            <v-list-item-title><p class="capitalize">{{ props.name }}</p></v-list-item-title>
        </v-list-item>
    </NuxtLink>
</template>