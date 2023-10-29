<script setup>
import { AisInstantSearch, AisSearchBox, AisHits, AisConfigure } from 'vue-instantsearch/vue3/es';

const props = defineProps({
    addItem: { type: Function, required: true },
    selectedItems: { type: Array, required: true },
    placeholder: { type: String, required: true },
    searchIndex: { type: String, required: true },
    hitsClass: { type: String, default: 'bg-surface-lighten-2' },
    enableForm: { type: Boolean, default: false },
})

const client = useMeilisearchClient();
const focusedSearchBox = ref(false);
function onFocus(status) {
    focusedSearchBox.value = status;
}

const el = ref(null);


onMounted(() => {
    document.addEventListener('click', (e) => {
        if (!el.value?.contains(e.target)) {
            onFocus(false);
        }
    });
});

</script>
<template>
    <div ref="el" tabindex="1" @focusin="onFocus(true)" class="relative">
        <ais-instant-search :search-client="client" :index-name="searchIndex">
            <ais-configure :hits-per-page.camel="10" />
            <ais-search-box :placeholder="placeholder" class="searchboxClass text-white">
                <template v-slot="{ currentRefinement, isSearchStalled, refine }">
                    <div class="flex flex-row gap-2 items-center bg-surface-lighten-3 rounded-md rounded-b-none p-1">
                        <input :placeholder="placeholder" class="w-full p-4 px-2 border-none search-input" type="search"
                            :value="currentRefinement" @input="refine($event.currentTarget.value)">
                        <v-btn density="compact" variant="plain" icon="mdi-plus" v-if="enableForm">
                            <v-icon>mdi-plus</v-icon>
                            <slot name="addDialogForm"></slot>
                        </v-btn>
                        <v-btn density="compact" variant="plain" icon="mdi-close-circle" v-if="currentRefinement"
                            @click="refine(''); onFocus(false)"></v-btn>
                    </div>
                    <span :hidden="!isSearchStalled">Loading...</span>
                </template>
            </ais-search-box>
            <ais-hits>
                <template v-slot="{ items }">
                    <ul v-show="focusedSearchBox" class="w-full absolute z-10 rounded-b-md" :class="hitsClass">
                        <li v-for="{ id, name, } in items" :key="id">
                            <v-divider v-if="id != items[0].id"></v-divider>
                            <v-btn block :disabled="selectedItems.find(selected => selected.id === id) !== undefined"
                                variant="plain" @click="addItem({ id, name, poster }); onFocus(false);">
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

.search-input {
    outline: none;
    border-color: transparent;
    box-shadow: none;
}
</style>