<script setup>
import { AisInstantSearch, AisSearchBox, AisHits, AisConfigure } from 'vue-instantsearch/vue3/es';

const props = defineProps({
    addItem: { type: Function, required: true },
    selectedItems: { type: Array, required: true },
    placeholder: { type: String, required: true },
    searchIndex: { type: String, required: true },
})

const client = useMeilisearchClient();
const focusedSearchBox = ref(false);
function onFocus(status) {
    focusedSearchBox.value = status;
}
</script>
<template>
    <div tabindex="1" @focusin="onFocus(true)">
        <ais-instant-search :search-client="client" :index-name="searchIndex">
            <ais-configure :hits-per-page.camel="10" />
            <ais-search-box :placeholder="placeholder" class="searchboxClass text-white">
                <template v-slot="{ currentRefinement, isSearchStalled, refine }">
                    <div class="flex flex-row gap-2">
                        <input :placeholder="placeholder" class="w-full px-2" type="search" :value="currentRefinement"
                            @input="refine($event.currentTarget.value)">
                        <v-btn :disabled="!currentRefinement" density="compact" variant="plain" icon="mdi-plus"
                            @click="addItem({ name: currentRefinement });refine('');  onFocus(false)"></v-btn>
                        <v-btn density="compact" variant="plain" icon="mdi-close"
                            @click="refine(''); onFocus(false)"></v-btn>
                    </div>
                    <span :hidden="!isSearchStalled">Loading...</span>
                </template>
            </ais-search-box>
            <ais-hits>
                <template v-slot="{ items }">
                    <ul v-show="focusedSearchBox" class=" bg-surface-lighten-2 z-10">
                        <li v-for="{ id, name, } in items" :key="id"
                            @click="addItem({ id, name, poster }); onFocus(false);">
                            <v-btn block :disabled="selectedItems.find(item => item.id === id) !== undefined"
                                variant="plain">
                                <h1>{{ name }}</h1>
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