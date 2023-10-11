<script setup>
    const props = defineProps({
        title: {
            type: String
        }
    });
</script>

<template>
    <div class="flex flex-row gap-1 items-center">
        <p class="text-body-1">{{title}}:</p>
        <slot></slot>
    </div>
</template>