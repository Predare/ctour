<script setup>
const query = useRoute().query;
const text = ref('');
async function sendReview(){
    await $fetch(`/api/review/${query['id']}`, {
        method: 'POST', body: {
            text: text.value,
        }
    }).catch(error => console.log(error)).then(response => {
    });
}
</script>

<template>
    <div class="flex flex-col gap-5 mt-5">
        <p class="text-h5" style="text-align: center;">Рецензия для Тупой и ещё тупее</p>
        <ClientOnly>
            <ReviewsTiptopEditor v-model="text"/>
        </ClientOnly>
        <div class="flex flex-row gap-5 justify-center">
            <v-btn color="success" @click="sendReview">Отправить</v-btn>
            <v-btn color="info">Просмотр</v-btn>
            <v-btn color="error">Отменить</v-btn>
        </div>
    </div>
</template>
