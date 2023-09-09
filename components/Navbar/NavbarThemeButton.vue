<script setup>
import { mergeProps } from 'vue';
const props = defineProps({
    themes: Array
});
</script>

<template>
    <v-menu location="bottom" open-delay="100">
        <template v-slot:activator="{ props: menu }">
            <v-tooltip location="bottom" text="Сменить тему">
                <template v-slot:activator="{ props: tooltip }">
                    <v-btn rounded="0" v-bind="mergeProps(menu, tooltip)" variant="text" id="menu-activator" class="rounded-0 min-h-[50px]"
                        icon="mdi-format-paint"></v-btn>
                </template>
            </v-tooltip>
        </template>
        <v-list>
            <v-list-item v-for="(theme, index) in themes" :key="index" :value="index">
                <v-list-item-title>{{ theme.name }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>