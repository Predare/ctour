<script setup>
import { useSessionStore } from '~/stores/session';
const session = ref(useSessionStore.session);
var profileInfo = await useFetch(`/api/profile/${session.value?.user.id}`);
</script>

<template>
    <div class="bg-surface-lighten-1 p-4 rounded-md">
        <SidebarHeader :id="profileInfo?.data?.value.id" :name="profileInfo?.data?.value.name" :icon-name="profileInfo?.data?.value.avatar" :icon-color="profileInfo?.data?.value.color"/>
        <v-divider class="my-3 mb-4" />
        <ProfileExpProgress :expierence="profileInfo?.data?.value.expirence" :next-rank-expirence="profileInfo?.data?.value.nextRank?.requiredExpirence"/>
        <ProfileRank :id="profileInfo?.data?.value.id" :rank-color="profileInfo?.data?.value.rank?.color" :rank-name="profileInfo?.data?.value.rank?.name"/>
        <SidebarAchievementExpPanel :achievements="profileInfo?.data?.value.achievements" />
        <ProfileRatingCounter :rating="profileInfo?.data?.value.rating" />
        <ProfileFollowersCounter :followers-count="profileInfo?.data?.value._count.followers" />
        <v-divider class="my-3" />
        <SidebarLinkList :id="profileInfo?.data?.value.id" />
    </div>
</template>