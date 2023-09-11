<script setup>
const props = defineProps({
    showForm: { type: Boolean, default: true },
    title: { type: String, default: 'Комментарии' },
})
</script>

<template>
    <v-container>
        <v-row>
            <slot name="title">
                <p class="text-h6">{{ title }}</p>
            </slot>
        </v-row>
        <v-row>
            <CommentsContainer class="w-[100%]" />
        </v-row>
        <v-row v-if="showForm">
            <CommentsForm></CommentsForm>
        </v-row>
    </v-container></template>