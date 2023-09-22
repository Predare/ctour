<script setup>
const props = defineProps({
    showForm: { type: Boolean, default: true },
    title: { type: String, default: 'Комментарии' },
    api: { type: Object, required: true },
});

const comments = ref([]);

function addComments(newComments) {
    comments.value.push(...newComments);
}

function addComment(comment) {
    comments.value.push(comment);
}
</script>

<template>
    <v-container>
        <v-row>
            <slot name="title">
                <p class="text-h6">{{ title }}</p>
            </slot>
        </v-row>
        <v-row>
            <CommentsContainer :comments="comments" :getLink="api.get" :add-comments="addComments" class="w-[100%]" />
        </v-row>
        <v-row v-if="showForm">
            <CommentsForm :comments="comments" :postLink="api.post" :add-comment="addComment"></CommentsForm>
        </v-row>
    </v-container>
</template>