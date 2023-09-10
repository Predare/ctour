<script setup>
import { useCommentsStore } from '@/stores/comments';
const commentsStore = useCommentsStore();
</script>

<template>
    <v-btn v-if="commentsStore.cursor != -1" @click="commentsStore.getNext = true" color="surface-lighten-2" block
        size="small">Загрузить
        ещё</v-btn>
</template>