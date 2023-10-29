<script setup>

const props = defineProps({
    selectedItems: { type: Array, required: true },
    addItem: { type: Function, required: true },
    removeItem: { type: Function, required: true },
    placeholder: { type: String, required: true },
    searchIndex: { type: String, required: true },
    icon: { type: String, required: true },
    hitsClass: { type: String, default: 'bg-surface-lighten-2' },
    enableForm: { type: Boolean, default: false },
    listStyleClass: { type: String, default: 'bg-surface-lighten-2' },
})
</script>

<template>
    <div class="flex flex-row gap-3 items-start">
        <v-icon class="mt-4" style="opacity: var(--v-medium-emphasis-opacity);">{{ icon }}</v-icon>
        <div class="flex flex-col gap-2">
            <div class="flex flex-row gap-2">
                <MeilisearchField :placeholder="placeholder" :addItem="addItem" :selected-items="selectedItems"
                    :searchIndex="searchIndex" :hitsClass="hitsClass" :enableForm="enableForm">
                    <template v-slot:addDialogForm>
                        <slot name="dialogForm"></slot>
                    </template>
                </MeilisearchField>
            </div>
            <MeilisearchItemList class="w-full" :listStyleClass="listStyleClass" :items="selectedItems" :removeItem="removeItem">
            </MeilisearchItemList>
        </div>
    </div>
</template>