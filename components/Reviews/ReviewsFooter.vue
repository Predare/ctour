<script setup>
const props = defineProps({
    viewsCount: Number,
    commentsCount: Number,
    filmLink: String,
    authorName: String,
    id: Number,
});

const reportDialog = ref(false);

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
        <div class="flex flex-row gap-3 items-center">
            <v-btn variant="plain" prepend-icon="mdi-comment-outline" @click="navigateTo(`/reviews/get/${props.filmLink}/${props.authorName}`)">{{commentsCount}}</v-btn>
            <v-btn variant="plain" prepend-icon="mdi-eye" :ripple="false">{{viewsCountText}}</v-btn>
            <v-btn variant="plain" size="small" icon="mdi-share-variant"></v-btn>
        </div>
        <v-btn icon="mdi-alert" size="small" variant="plain" @click="reportDialog = true"/>
        <ReportDialog :link="`/api/report/review/${props.id}`" v-model="reportDialog"></ReportDialog>
    </div>
</template>