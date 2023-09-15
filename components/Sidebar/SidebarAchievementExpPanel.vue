<script setup>
const props = defineProps({
    achievements: {
        type: Array,
        default: [],
    }
})
</script>

<template>
    <v-expansion-panels class="mt-2">
        <v-expansion-panel class="ma-0" title="Достижения" color="surface-lighten-2" elevation="1">
            <v-expansion-panel-text color="surface-lighten-3" class="bg-surface-lighten-2">
                <ProfileAchievement v-for="i in achievements" :key="i.id" :id="i.id" :icon="i.icon" :name="i.name"
                :description="i.description" :reward="i.reward" />
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>