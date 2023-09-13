<script setup>
const authorId = useRoute().params.id;
</script>

<template>
    <div class="flex flex-col gap-8 bg-surface-lighten-1 rounded-md" style="padding: 3rem; padding-bottom: 2rem; padding-top: 2rem;">
        <ReviewsFilterHeader />
        <ReviewsWidget :authorId="authorId"/>
    </div>
</template>