<script setup>
import followersTextFormatter from '~/composables/followersTextFormatter';
import { useSessionStore } from '~/stores/session';
const session = ref(useSessionStore.session);
var profileInfo = await useFetch(`/api/profile/${session.value?.user.name}`);

const followers = profileInfo?.data?.value._count.followers;
const followersText = computed(() => {
    return followersTextFormatter(followers);
});

const rating = profileInfo?.data?.value.rating;
const ratingText = computed(() => {
    return ratingTextFormatter(rating);
})
</script>

<template>
    <div class="bg-surface-lighten-1 p-4 rounded-md">
        <SidebarHeader :name="profileInfo?.data?.value.name" :icon-name="profileInfo?.data?.value.avatar"
            :icon-color="profileInfo?.data?.value.color" />
        <v-divider class="my-3 mb-4" />
        <ProfileExpProgress :expierence="profileInfo?.data?.value.expirence"
            :next-rank-expirence="profileInfo?.data?.value.nextRank?.requiredExpirence" />
        <ProfileRank :name="profileInfo?.data?.value.name" :rank-color="profileInfo?.data?.value.rank?.color"
            :rank-name="profileInfo?.data?.value.rank?.name" />
        <SidebarAchievementExpPanel :achievements="profileInfo?.data?.value.achievements" />
        <p class="mt-2"><span class="font-bold" v-text="ratingText.value"></span> {{ ratingText.text }}</p>
        <p class="mt-2">
            <span class="font-bold" v-text="followersText.value"></span>
            <span v-text="followersText.text"></span>
        </p>
        <v-divider class="my-3" />
        <SidebarLinkList :name="profileInfo?.data?.value.name" />
</div></template>