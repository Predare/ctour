<script setup>
const props = defineProps({
    date: String,
});

const dateText = computed(() => {
    return DateTimeTextFormatter(props.date);
});
</script>

<template>
    <ClientOnly>
        <p>{{ dateText }}</p>
    </ClientOnly>
</template>