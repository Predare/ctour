<script setup>
const props = defineProps({
    date: String,
});

const createdDate = computed(() => {
    const date = new Date(props.date);
    return `${date.getHours() < 10 ? '0' + date.getHours() : 
    date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : 
    date.getMinutes()} ${date.getDate() < 10 ? '0' + date.getDate() : 
    date.getDate()}:${date.getMonth() < 10 ? '0' + date.getMonth() : 
    date.getMonth()}:${date.getFullYear()}`;
});
</script>

<template>
<p>{{ createdDate }}</p>
</template>