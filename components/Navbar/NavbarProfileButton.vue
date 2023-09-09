<script setup>
const { getSession } = useAuth();
const session = ref();
getSession().then((res) => {
    session.value = res;
})
</script>
<template>
    <NuxtLink :to="`/profile/${session?.user?.id}`">
        <div class="flex flex-row items-center gap-4">
            <v-tooltip activator="parent" location="bottom">Профиль</v-tooltip>
            <AvatarIcon width="40px" height="40px" :icon-name="session?.user?.avatar" :icon-color="session?.user?.color"/>
        </div>
    </NuxtLink>
</template>