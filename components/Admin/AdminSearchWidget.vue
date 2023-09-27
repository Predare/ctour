<script setup>
const props = defineProps({
    selectedItems: {type: Array, required: true},
    addItem: {type: Function, required: true},
    removeItem: {type: Function, required: true},
    placeholder: {type: String, required: true},
    searchIndex: {type: String, required: true},
    icon: {type: String, required: true},
})
</script>

<template>
    <div class="flex flex-row gap-3">
        <v-icon>{{icon}}</v-icon>
        <div class="flex flex-col gap-2 items-center">
            <AdminSearchField :placeholder="placeholder" :addItem="addItem"
                :selected-items="selectedItems" :searchIndex="searchIndex"></AdminSearchField>
            <AdminItemList class="w-full" emptyText="Список режиссёров пуст" :items="selectedItems"
                :removeItem="removeItem">
            </AdminItemList>
        </div>
    </div>
</template>