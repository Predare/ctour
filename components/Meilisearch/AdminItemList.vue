<script setup>
const props = defineProps({
    items: {
        type: Array,
        default: [],
    },
    removeItem: {
        type: Function,
        required: true,
    },
    listStyleClass: {
        type: String,
        default: 'bg-surface-lighten-2',
    }
});
</script>

<template>
    <v-card class="mx-auto" max-width="300">
        <v-list :class="listStyleClass" v-if="items.length > 0">
            <v-list-item v-for="(item, i) in items" :key="i">
                <template v-slot:title>
                    <div class="flex flex-row items-center justify-between">
                        <v-list-item-title v-text="item.name" style="text-transform: capitalize;"></v-list-item-title>
                        <v-btn size="small" variant="plain" icon="mdi-close" @click="removeItem(item)"></v-btn>
                    </div>
                </template>
                <template v-slot:subtitle>
                    <v-divider v-show="i < items.length - 1" />
                </template>
            </v-list-item>
        </v-list>
    </v-card>
</template>