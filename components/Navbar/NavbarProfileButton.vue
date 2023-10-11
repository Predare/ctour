<script setup>
import { useSessionStore } from '~/stores/session';
const session = ref(useSessionStore.session);
var profileInfo = await useFetch(`/api/profile/${session.value?.user.name}`);
</script>

<template>
    <NuxtLink :to="`/profile/${profileInfo.data.value.name}`">
        <div class="flex flex-row items-center gap-4">
            <v-tooltip activator="parent" location="bottom">Профиль</v-tooltip>
            <AvatarIcon width="40px" height="40px" :icon-name="profileInfo.data.value.avatar" :icon-color="profileInfo.data.value.color"/>
        </div>
    </NuxtLink>
</template>