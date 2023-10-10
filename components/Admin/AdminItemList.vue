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
    emptyText: {
        type: String,
        default: 'Список пуст',
    }
});
</script>

<template>
    <v-card class="mx-auto" max-width="300">
        <v-list bg-color="surface-lighten-2">
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
            <p class="text-subtitle-2 text-center" v-show="items.length === 0">{{ emptyText }}</p>
        </v-list>
    </v-card>
</template>