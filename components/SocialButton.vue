<script setup>
const props = defineProps({
    tooltipText: String,
    icon: String,
    link: String,
})
function openSharePage() {
    window.open(props.link, "sharer", "toolbar=0,status=0,width=626,height=436");
}
</script>

<template>
    <div>
        <v-btn :icon="icon" @click="openSharePage" variant="plain" density="compact" size="small" :ripple="false">
        </v-btn>
        <v-tooltip activator="parent" location="bottom" :text="tooltipText"> </v-tooltip>
    </div>
</template>