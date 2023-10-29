<script setup>
const props = defineProps({
    date: String,
});

const creationDate = computed(() => {
    return DateTimeTextFormatter(props.date);
})
</script>

<template>
    <ClientOnly>
        <p>{{ creationDate }}</p>
    </ClientOnly>
</template>