<script setup>
function openSharePage() {
    window.open('https://vkontakte.ru/share.php?url=http://localhost:3000/film/fies', "sharer", "toolbar=0,status=0,width=626,height=436");
}
</script>

<template>
    <div>
        <v-btn icon="fa:fas fa-brands fa-vk" @click="openSharePage" variant="plain" density="compact" size="small" :ripple="false">
        </v-btn>
        <v-tooltip activator="parent" location="bottom" text="ВКонтакте"> </v-tooltip>
    </div>
</template>