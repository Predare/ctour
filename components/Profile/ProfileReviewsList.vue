<script setup>
const authorId = useRoute().params.id;
</script>

<template>
    <div class="flex flex-col gap-8 bg-surface-lighten-1 rounded-md" style="padding: 3rem; padding-bottom: 2rem; padding-top: 2rem;">
        <div class="flex flex-row justify-between items-center">
            <ReviewsSortButtonToggles />
            <v-btn icon="mdi-sort-ascending" variant="plain"></v-btn>
        </div>
        <ReviewsWidget :authorId="authorId"/>
    </div>
</template>