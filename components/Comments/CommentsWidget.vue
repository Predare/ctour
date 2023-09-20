<script setup>
import { useCommentsFormStore } from '@/stores/commentForm';
const commentFormStore = useCommentsFormStore();

const props = defineProps({
    showForm: { type: Boolean, default: true },
    title: { type: String, default: 'Комментарии' },
    api: { type: Object, required: true },
});

onMounted(() => {
    commentFormStore.repliedComment = null;
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
            <CommentsContainer :getLink="api.get" class="w-[100%]" />
        </v-row>
        <v-row v-if="showForm">
            <CommentsForm :postLink="api.post"></CommentsForm>
        </v-row>
    </v-container></template>