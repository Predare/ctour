<script setup>
const props = defineProps({
    iconName: String,
    iconColor: String,
    name: String,
    id: String,
});

const { signOut } = useAuth();
</script>

<template>
    <div class="flex flex-row gap-4">
        <NuxtLink :to="`/profile/${id}`">
            <AvatarIcon width="45px" height="45px" :icon-name="iconName" :icon-color="iconColor" />
        </NuxtLink>
        <div class="flex flex-col items-start">
            <NuxtLink :to="`/profile/${id}`"> 
                <p v-text="name"></p>
            </NuxtLink>
            <v-btn class="pa-0 text-body-2" density="compact" variant="plain" @click="signOut">Выйти</v-btn>
        </div>
    </div>
</template>