<script setup>
const props = defineProps({
    followersCount: Number
});

const followersCountText = computed(() => {
    if (props.followersCount === 1) {
        return ' Подписчик';
    } else if (props.followersCount === 0) {
        return ' Подписчиков';
    } else {
        return ' Подписчика';
    }
});
</script>

<template>
    <p class="mt-2"><span class="font-bold" :v-text="followersCount"></span>{{ followersCountText }}</p>
</template>