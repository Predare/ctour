<script setup>
const props = defineProps({
    authorId: {type: String},
    filmLink: {type: String},
    name: { type: String, default: 'Этот безумный, безумный, безумный мир' },
    genre: { type: String, default: 'комедия' },
    year: { type: Number, default: 1964 },
    rating: { type: Number, default: 1 },
});
</script>

<template>
    <NuxtLink :to="`/reviews/get/${filmLink}/${authorId}`">
        <v-tooltip :text="`${name}, ${genre} (${year})`">
            <template v-slot:activator="{ props }">
                <div v-bind="props" class="flex flex-row gap-2">
                    <div class="px-1 max-w-[90%] flex flex-row gap-1">
                        <p class="text-body-2 truncate">{{ name }},&nbsp;</p>
                        <span class="font-bold">{{ genre }}</span>
                        <span>({{ year }})</span>
                    </div>
                    <v-icon :color="rating === 1 ? 'green' : rating === -1 ? 'red' : ''"
                        :icon="rating === 1 ? 'mdi-thumb-up' : rating === -1 ? 'mdi-thumb-down' : ''" />
                </div>
            </template>
        </v-tooltip>
    </NuxtLink>
</template>