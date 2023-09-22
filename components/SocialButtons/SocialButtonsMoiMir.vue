<script setup>
function openSharePage() {
    window.open('https://connect.mail.ru/share?url=http://localhost:3000/film/fies"', "sharer", "toolbar=0,status=0,width=626,height=436");
}
</script>

<template>
    <div>
        <v-btn icon="mdi-share" @click="openSharePage" variant="plain" density="compact" size="small" :ripple="false">
        </v-btn>
        <v-tooltip activator="parent" location="bottom" text="Мой мир"> </v-tooltip>
    </div>
</template>