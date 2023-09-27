<script setup>
import { AisInstantSearch, AisSearchBox, AisHits, AisConfigure } from 'vue-instantsearch/vue3/es';

const props = defineProps({
    addItem: {type: Function, required: true},
    selectedItems: {type: Array, required: true},
    placeholder: {type: String, required: true},
    searchIndex: {type: String, required: true},
})

const client = useMeilisearchClient();
const focusedSearchBox = ref(false);
function onFocus(status) {
    focusedSearchBox.value = status;
}
</script>
<template>
    <div @focusin="onFocus(true)">
        <ais-instant-search :search-client="client" :index-name="searchIndex">
            <ais-configure :hits-per-page.camel="10"/>
            <ais-search-box :placeholder="placeholder" class="searchboxClass text-white">
            </ais-search-box>
            <ais-hits>
                <template v-slot="{ items }">
                    <ul v-show="focusedSearchBox" class="absolute bg-surface-lighten-2 z-10">
                        <li v-for="{ id, title, poster } in items" :key="id" @click="addItem({id, title, poster}); onFocus(false);">
                            <v-btn :disabled="selectedItems.find(item => item.id === id) !== undefined" variant="plain" >
                                <h1>{{ title }}</h1>
                            </v-btn>
                        </li>
                    </ul>
                </template>
            </ais-hits>
        </ais-instant-search>
    </div>
</template>

<style>
.ais-SearchBox-input {
    color: black;
}
</style>