<script setup>
const props = defineProps({
    id: { type: String },
    name: { type: String, default: 'Predare' },
    iconName: { type: String, default: 'GHOST' },
    iconColor: { type: String, default: '#333' },
    reviewsCount: { type: Number, default: 0 },
    followersCount: { type: Number, default: 0 },
    reviews: { type: Array, default: () => [] },
    subscribed: { type: Boolean, default: false },
});

const actualSubscribeStatus = ref(props.subscribed);
const actualFollowersCount = ref(props.followersCount);

async function subscribe() {
    const result = await $fetch(`/api/user/followers/${props.id}/subscribe`, { method: 'POST' });
    if (!result || !result.status) return;
    actualFollowersCount.value = result.user._count.followers;
    actualSubscribeStatus.value = true;
}

async function unsubscribe() {
    const result = await $fetch(`/api/user/followers/${props.id}/unsubscribe`, { method: 'DELETE' });
    if (!result || !result.status) return;
    actualFollowersCount.value = result.user._count.followers;
    actualSubscribeStatus.value = false;
}
</script>

<template>
    <div class="max-w-[400px]">
        <v-card color="surface-lighten-2">
            <v-card-title>
                <NuxtLink :to="`/profile/${id}/`">
                    <div class="flex flex-row gap-3">
                        <AvatarIcon width="45px" height="45px" :icon-name="iconName" :icon-color="iconColor" />
                        <div class="flex flex-col">
                            <p class="text-body-1">{{ name }}</p>
                            <div class="flex flex-row gap-2">
                                <CriticCardReviewsRow :reviewsCount="reviewsCount"></CriticCardReviewsRow>
                                <CriticCardFollowersRow :followersCount="actualFollowersCount"></CriticCardFollowersRow>
                            </div>
                        </div>
                    </div>
                </NuxtLink>
            </v-card-title>
            <v-card-text>
                <p class="text-body-2 mt-2">Последнее</p>
                <v-divider class="my-1"></v-divider>
                <div class="flex flex-col gap-1">
                    <CriticCardFilmReviewRow v-for="review in reviews" :key="review.id" :name="review.film.name"
                        :genre="review.film.genres.length > 0 ? review.genre[0] : ''" :year="review.film.yearStart"
                        :rating="review.rating" :author-id="id" :film-link="review.film.link" />

                </div>
            </v-card-text>
            <v-card-actions class="gap-3">
                <NuxtLink :to="`/profile/${id}/`">
                    <v-btn variant="flat" color="info">Профиль</v-btn>
                </NuxtLink>
                <v-btn variant="tonal" :color="actualSubscribeStatus ? 'warning' : 'success'"
                    :text="actualSubscribeStatus ? 'Отписаться' : 'Подписаться'"
                    @click="actualSubscribeStatus ? unsubscribe() : subscribe()"></v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>