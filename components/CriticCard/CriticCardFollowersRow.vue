<script setup>
const props = defineProps({
    followersCount: {Type: Number},
});

const followersCountText = computed(() => {
    if (props.followersCount === 1) {
        return props.followersCount + ' подписчик';
    } else if (props.followersCount === 0) {
        return props.followersCount + ' подписчиков';
    } else {
        return props.followersCount + ' подписчика';
    }
});
</script>

<template>
    <p class="text-caption">{{ followersCountText }}</p>
</template>