<script setup>
import { useSessionStore } from '~/stores/session';
const text = ref('');
const rating = ref(1);
const preview = ref(false);
const route = useRoute();
const session = ref(useSessionStore.session);
const { data } = await useFetch(`/api/review/get/content/one/?link=${route.params.link}&authorId=${session.value?.user.id}`);
text.value = data.value.text;
rating.value = data.value.rating;

async function sendReview() {
    await $fetch(`/api/review/${route.params.link}`, {
        method: 'POST', body: {
            text: text.value,
            rating: rating.value,
        }
    }).catch(error => console.log(error));
    await navigateTo('/film/' + route.params.link);
}
</script>

<template>
    <div class="flex flex-col gap-5 mt-5">
        <p class="text-h5" style="text-align: center;">Рецензия для Тупой и ещё тупее</p>
        <div class="flex flex-row justify-end gap-4">
            <v-btn size="large" color="green" @click="rating = 1"
                :icon="rating === 1 ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'"></v-btn>
            <v-btn size="large" color="red" @click="rating = -1"
                :icon="rating === -1 ? 'mdi-thumb-down' : 'mdi-thumb-down-outline'"></v-btn>
        </div>
        <ClientOnly>
            <ReviewsTiptopEditor v-show="!preview" v-model="text" />
            <div v-show="preview" class="rounded-md bg-surface-lighten-1 px-6 py-4">
                <div class="review" v-dompurify-html="text"></div>
            </div>
        </ClientOnly>
        <div class="flex flex-col gap-2 items-center">
            <v-btn color="primary" @click="sendReview">Отправить</v-btn>
            <v-btn class="text-subtitle-1" variant="plain" @click="preview = !preview">Предварительный просмотр</v-btn>

        </div>
    </div>
</template>
