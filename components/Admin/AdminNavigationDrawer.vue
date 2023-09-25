<script setup>
const items = [
    {
        name: 'Dashboard',
        icon: 'mdi-view-dashboard',
        to: '/admin',
    },
    {
        name: 'Film add',
        icon: 'mdi-film',
        to: '/admin/film/create',
    },
];
</script>

<template>
    <v-navigation-drawer>
        <v-list>
            <v-list-item v-for="item in items" :key="item.name" :to="item.to" :icon="item.icon" :title="item.name"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>