<script setup>
const tab = ref(1);
</script>

<template>
    <div>
        <v-tabs v-model="tab" align-tabs="center">
            <v-tab :value="1">По времени</v-tab>
            <v-tab :value="2">ПО рейтингу</v-tab>
            <v-tab :value="3">По популярности</v-tab>
        </v-tabs>
    </div>
</template>