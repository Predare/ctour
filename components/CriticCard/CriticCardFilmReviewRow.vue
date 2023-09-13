<script setup>
const props = defineProps({
    name: { type: String, default: 'Этот безумный, безумный, безумный мир' },
    genre: { type: String, default: 'комедия' },
    year: { type: Number, default: 1964 },
    rating: { type: Number, default: 1 },
    seen: { type: Boolean, default: true },
});
</script>

<template>
    <NuxtLink to="/">
        <v-tooltip :text="`${name}, ${genre} (${year})`">
            <template v-slot:activator="{ props }">
                <div v-bind="props" class="flex flex-row gap-2">
                    <div class="px-1 max-w-[90%] flex flex-row gap-1" :class="!seen ? 'bg-yellow-100/60' : ''">
                        <p class="text-body-2 truncate">{{ name }},&nbsp;</p>
                        <span class="font-bold">{{ genre }}</span>
                        <span>({{ year }})</span>
                    </div>
                    <v-icon :color="rating === 1 ? 'green' : 'red'"
                        :icon="rating === 1 ? 'mdi-thumb-up' : 'mdi-thumb-down'" />
                </div>
            </template>
        </v-tooltip>
    </NuxtLink>
</template>