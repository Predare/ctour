<script setup>
import { useFilmFilterStore } from '@/stores/filmFilter';
const filmFilterStore = useFilmFilterStore();

const props = defineProps({
    name: String,
})
</script>

<template>
    <div class="flex flex-col gap-2 items-start">
        <NuxtLink :to="`/profile/${name}/replies`">
            <v-btn variant="plain" density="comfortable">Ответы</v-btn>
        </NuxtLink>

        <NuxtLink :to="`/profile/${name}/comments`">
            <v-btn variant="plain" density="comfortable">Комментарии</v-btn>
        </NuxtLink>
        <NuxtLink :to="`/`">
            <v-btn variant="plain" density="comfortable"
                @click="() => { filmFilterStore.clearFilters(); filmFilterStore.setFavorite(true); }">Избранное</v-btn>
        </NuxtLink>
        <NuxtLink :to="`/`">
            <v-btn variant="plain" density="comfortable"
                @click="() => { filmFilterStore.clearFilters(); filmFilterStore.setViewed(true); }">Просмотренное</v-btn>
        </NuxtLink>
        <NuxtLink :to="`/profile/${name}/subscriptions`">
            <v-btn variant="plain" density="comfortable">Подписки</v-btn>
        </NuxtLink>
        
    </div>
</template>