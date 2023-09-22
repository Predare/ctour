<script setup>
function openSharePage() {
    window.open('https://www.facebook.com/sharer.php?u=http://localhost:3000/film/fies', "sharer", "toolbar=0,status=0,width=626,height=436");
}
</script>

<template>
    <div>
        <v-btn icon="fa:fas fa-brands fa-facebook" @click="openSharePage" variant="plain" density="compact" size="small" :ripple="false">
        </v-btn>
        <v-tooltip activator="parent" location="bottom" text="Facebook"> </v-tooltip>
    </div>
</template>