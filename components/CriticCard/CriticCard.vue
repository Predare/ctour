<script setup>
const props = defineProps({
    name: { type: String, default: 'Predare' },
    iconName: { type: String, default: 'GHOST' },
    iconColor: { type: String, default: '#333' },
    newReviewsCount: { type: Number, default: 1 },
    reviewsCount: { type: Number, default: 0 },
    followersCount: { type: Number, default: 0 },
    reviews: { type: Array, default: () => [] },
});
</script>

<template>
    <div class="max-w-[400px]">
        <v-card color="surface-lighten-2">
            <v-card-title>
                <div class="flex flex-row gap-2">
                    <AvatarIcon width="45px" height="45px" :icon-name="iconName" :icon-color="iconColor" />
                    <div class="flex flex-col">
                        <p class="text-body-1">{{ name }}</p>
                        <div class="flex flex-row gap-2">
                            <CriticCardReviewsRow :reviewsCount="reviewsCount"></CriticCardReviewsRow>
                            <CriticCardFollowersRow :followersCount="followersCount"></CriticCardFollowersRow>
                        </div>
                    </div>

                </div>
            </v-card-title>
            <v-card-text>
                <p class="text-body-1">Последнее: {{ newReviewsCount > 0 ? `(+${newReviewsCount})` : '' }}</p>
                <v-divider class="my-2"></v-divider>
                <div class="flex flex-col gap-1">
                    <CriticCardFilmReviewRow v-for="review in reviews" :key="review.id" :name="review.film.name"
                        :genre="review.film.genres.length > 0 ? review.genre[0] : ''" :year="review.film.yearStart" :rating="review.votes[0].status"
                        :author-id="review.authorId" :film-link="review.film.link"/>

                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn variant="flat" color="info">Рецензии</v-btn>
                <v-btn variant="tonal" color="warning">Отписаться</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>