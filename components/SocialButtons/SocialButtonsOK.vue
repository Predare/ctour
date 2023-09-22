<script setup>
function openSharePage() {
    window.open('https://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl=http://localhost:3000/film/fies&st.comments=ОПИСАНИЕ"', "sharer", "toolbar=0,status=0,width=626,height=436");
}
</script>

<template>
    <div>
        <v-btn icon="fa:fas fa-brands fa-odnoklassniki" @click="openSharePage" variant="plain" density="compact" size="small" :ripple="false">
        </v-btn>
        <v-tooltip activator="parent" location="bottom" text="Одноклассники"> </v-tooltip>
    </div>
</template>