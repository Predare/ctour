<script setup>
const props = defineProps({
    name: String,
    rankName: String,
    rankColor: String,
});
</script>

<template>
    <div class="flex flex-row items-center gap-1 mt-2">
        <p class="text-left">Текущий ранг: <span class="font-semibold" :style="{ color: props.rankColor }"
                v-text="props.rankName"></span></p>
        <v-icon :color="props.rankColor" icon="mdi-star"></v-icon>
        <NuxtLink :to="`/profile/${name}/achievements`">
            <v-btn variant="text" density="comfortable" icon="">
                <v-icon icon="mdi-seal" />
                <v-tooltip activator="parent" location="bottom">Все достижения</v-tooltip>
            </v-btn>
        </NuxtLink>

    </div>
</template>