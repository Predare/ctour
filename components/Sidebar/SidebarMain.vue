<script setup>
const { getSession } = useAuth();
const session = ref();
var profileInfo = ref();

watch (session, async () => {
    profileInfo.value = await useFetch(`/api/profile/${session.value?.user.id}`);
});

await getSession().then(async (res) => {
    session.value = res;
});
</script>

<template>
    <div class="bg-surface-lighten-1 p-4 rounded-md">
        <SidebarHeader :name="session?.user?.name" :icon-name="session?.user?.avatar" :icon-color="session?.user?.color"/>
        <v-divider class="my-3 mb-4" />
        <ProfileExpProgress :expierence="profileInfo?.data?.expirence" :next-rank-expirence="profileInfo?.data?.nextRank.requiredExpirence"/>
        <ProfileRank :rank-color="profileInfo?.data?.rank?.color" :rank-name="profileInfo?.data?.rank?.name"/>
        <SidebarAchievementExpPanel />
        <ProfileRatingCounter :rating="profileInfo?.data?.rating" />
        <ProfileFollowersCounter :followers-count="profileInfo?.data._count.followers" />
        <v-divider class="my-3" />
        <SidebarLinkList />
    </div>
</template>