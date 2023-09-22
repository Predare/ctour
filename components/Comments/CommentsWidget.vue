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
    <div class="flex flex-col">
        <slot name="title">
            <p class="text-h6">{{ title }}</p>
        </slot>
        <CommentsContainer :comments="comments" :getLink="api.get" :add-comments="addComments" class="w-[100%]" />
        <CommentsForm class="mt-[1rem]" v-if="showForm" :comments="comments" :postLink="api.post" :add-comment="addComment"></CommentsForm>
    </div>
</template>