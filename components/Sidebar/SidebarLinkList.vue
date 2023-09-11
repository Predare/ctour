<script setup>
const props = defineProps({
    id: String,
})
</script>

<template>
    <div class="flex flex-col gap-2 items-start">
        <NuxtLink :to="`/profile/${id}/replies`">
            <v-btn variant="plain" density="comfortable">Ответы</v-btn>
        </NuxtLink>
        
        <NuxtLink :to="`/profile/${id}/comments`">
            <v-btn variant="plain" density="comfortable">Комментарии</v-btn>
        </NuxtLink>
        <v-btn variant="plain" density="comfortable">Избранное</v-btn>
        <v-btn variant="plain" density="comfortable">Просмотренное</v-btn>
        <v-btn variant="plain" density="comfortable">Подписки</v-btn>
    </div>
</template>