<script setup>
import {AisInstantSearch,AisSearchBox,AisHits,AisConfigure} from 'vue-instantsearch/vue3/es';
const client = useMeilisearchClient();
</script>
<template>
    <div>
        <ais-instant-search :search-client="client" index-name="movies">
            <ais-configure :hits-per-page.camel="10" />
            <ais-search-box placeholder="Search here…" class="searchbox"></ais-search-box>
            <ais-hits>
                <template v-slot="{ items }">
                    <ul>
                        <li v-for="{ id, title, poster } in items" :key="id">
                            <h1>{{ title }}</h1>
                        </li>
                    </ul>
                </template>
            </ais-hits>
        </ais-instant-search>
    </div>
</template>