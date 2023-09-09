<script setup>
const props = defineProps({
    reviewId: Number,
    viewsCount: Number,
    commentsCount: Number,
})

const actualViewsCount = ref(props.viewsCount);

async function addVote() {
    var review = await $fetch(`/api/review/views/${props.reviewId}`, { method: 'POST' });
    if(!review) return;
    actualViewsCount.value = review.viewsCount;
}

const viewsCountText = computed(() => {
    if (unref(actualViewsCount) < 1000) {
        return unref(actualViewsCount);
    }else {
        return unref(actualViewsCount) / 1000 + 'k';
    }
})
</script>

<template>
    <div class="flex flex-row justify-between">
        <div class="flex flex-row gap-3">
            <v-btn variant="plain" prepend-icon="mdi-comment-outline">{{commentsCount}}</v-btn>
            <v-btn variant="plain" prepend-icon="mdi-eye" @click="addVote">{{viewsCountText}}</v-btn>
            <v-btn variant="plain" size="small" icon="mdi-share-variant"></v-btn>
        </div>
        <v-btn icon="mdi-alert" size="small" variant="plain" />
    </div>
</template>