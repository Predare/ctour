<script setup>
import { useCommentsStore } from '@/stores/comments';
const commentsStore = useCommentsStore();
</script>

<template>
    <v-container>
        <v-row>
            <p class="text-h6">Комментарии</p>
        </v-row>
        <v-row>
            <ClientOnly>
                <CommentsContainer />
            </ClientOnly>
        </v-row>
        <v-row class="justify-center mt-5">
            <v-btn v-if="commentsStore.cursor != -1" @click="commentsStore.loadNextPage" color="surface-lighten-2" block
                size="small">Загрузить
                ещё</v-btn></v-row>
        <v-row>
            <CommentsForm></CommentsForm>
        </v-row>
    </v-container>
</template>