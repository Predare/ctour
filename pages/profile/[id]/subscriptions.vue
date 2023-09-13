<script setup>
const followedUsersReviewsLink = `/api/user/${useRoute().params.id}/subscribes/`; 
const users = ref([]);
const reviews = ref([]);
async function getFollowedUsersReviews() {
    const result = await $fetch(followedUsersReviewsLink);
    users.value.push(...result.users);
    reviews.value.push(...result.reviews);
}

await getFollowedUsersReviews();
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="bg-surface-lighten-1 p-4 rounded-md">
            <p class="text-h5 mb-3">Подписки</p>
            <div class="flex flex-row gap-4 overflow-hidden mx-2">
                <CriticCard v-for="user in users" :key="user.id" :name="user.name" :iconName="user.avatar"
                    :iconColor="user.color" :reviewsCount="user._count.reviews" :followersCount="user._count.followers" :reviews="user.reviews"/>
            </div>
        </div>
        <div class="flex flex-col gap-4 bg-surface-lighten-1 p-4 rounded-md">
            <p class="text-h5">Рецензии</p>
            <div class="flex flex-col rounded-md gap-8 overflow-auto mx-2">
                <ReviewsItem v-for="review in reviews" :key="review.id" :data="review" />
            </div>
        </div>
    </div>
</template>