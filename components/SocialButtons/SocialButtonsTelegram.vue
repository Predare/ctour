<script setup>
function openSharePage() {
    window.open('https://telegram.me/share/url?url=http://localhost:3000/film/fies"', "sharer", "toolbar=0,status=0,width=626,height=436");
}
</script>

<template>
    <div>
        <v-btn icon="fa:fas fa-brands fa-telegram" @click="openSharePage" variant="plain" density="compact" size="small" :ripple="false">
        </v-btn>
        <v-tooltip activator="parent" location="bottom" text="Телеграм"> </v-tooltip>
    </div>
</template>