<script setup>
const name = useRoute().params.name;
</script>

<template>
    <div class="flex flex-col gap-8 bg-surface-lighten-1 rounded-md" style="padding: 3rem; padding-bottom: 2rem; padding-top: 2rem;">
        <ReviewsFilterHeader />
        <ReviewsWidget :name="name"/>
    </div>
</template>