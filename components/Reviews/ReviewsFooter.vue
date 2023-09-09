<script setup>
const props = defineProps({
    reviewId: Number,
    viewsCount: Number,
    commentsCount: Number,
});

const viewsCountText = computed(() => {
    if (props.viewsCount < 1000) {
        return props.viewsCount;
    }else {
        return props.viewsCount / 1000 + 'k';
    }
})
</script>

<template>
    <div class="flex flex-row justify-between">
        <div class="flex flex-row gap-3">
            <v-btn variant="plain" prepend-icon="mdi-comment-outline">{{commentsCount}}</v-btn>
            <v-btn variant="plain" prepend-icon="mdi-eye">{{viewsCountText}}</v-btn>
            <v-btn variant="plain" size="small" icon="mdi-share-variant"></v-btn>
        </div>
        <v-btn icon="mdi-alert" size="small" variant="plain" />
    </div>
</template>