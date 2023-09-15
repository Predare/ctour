<script setup>
const route = useRoute()
const ratingCountText = ref(ratingTextFormatter(-1));
const positiveVotesCountText = ref('');
const negativeVotesCountText = ref('');
const userTimeString = ref('');

const { data, pending, error, refresh} = await useFetch(`/api/profile/${route.params.id}`, {
    onResponse: (response) => {
        const newData = response.response._data;
        ratingCountText.value = ratingTextFormatter(newData.rating);
        positiveVotesCountText.value = plusTextFormatter(newData.positiveVotesCount);
        negativeVotesCountText.value = minusTextFormatter(newData.negativeVotesCount);
        userTimeString.value = liveTimeTextFormatter(newData.createdAt);
        return response;
    }
});
</script>

<template>
    <div class="bg-surface-lighten-1 rounded-md" style="padding: 3rem; padding-bottom: 1rem; padding-top: 2rem;">
        <AvatarIcon width="100px" height="100px" icon-size="60px" :icon-name="data?.avatar"
            :icon-color="data?.color" />

        <div class="flex flex-row justify-between items-center">
            <div class="flex flex-col mt-4 gap-3">
                <p class="text-body-1" v-text="data?.name"></p>
                <p class="text-body-2" v-text="userTimeString"></p>
            </div>
            <p class="text-h6">Рейтинг критика: {{ data?.criticRating }}</p>
        </div>
        <v-divider class="my-3" />
        <p class="text-body-2">Поставил
            <span class="text-green" v-text="positiveVotesCountText.value ?? 0"></span>
            <span v-text="positiveVotesCountText.text"></span>
            <span class="text-red" v-text="negativeVotesCountText.value ?? 0"></span>
            <span v-text="negativeVotesCountText.text"></span>
        </p>
        <v-divider class="my-3" />
        <p class="text-h6">Достижения на текущем уровне:</p>
        <ProfileExpProgress style="margin-top: 1rem" :expierence="data?.expirence"
            :next-rank-expirence="data?.nextRank.requiredExpirence" />
        <ProfileRank :rank-color="data?.rank.color" :rank-name="data?.rank.name" />
        <div class="flex flex-col gap-5 mt-3">
            <ProfileAchievement v-for="i in data?.achievements" :key="i.id" :id="i.id" :icon="i.icon"
                :name="i.name" :description="i.description" :reward="i.reward" />
        </div>
        <div class="mt-5">
            <NuxtLink to="/">
                <v-btn variant="plain">Все достижения</v-btn>
            </NuxtLink>
        </div>
        <v-divider class="my-3" />
        <div class="flex flex-row gap-5 text-center text-subtitle-1 ms-5 mt-4">
            <div class="flex flex-col">
                <p v-text="ratingCountText.value"></p>
                <p>{{ ratingCountText.text }}</p>
            </div>
            <div class="flex flex-col">
                <p v-text="data?._count.followers"></p>
                <p>Читателей</p>
            </div>
            <div class="flex flex-col">
                <p v-text="data?._count.subscribes"></p>
                <p>Подписок</p>
            </div>
            <div class="flex flex-col">
                <p v-text="data?._count.reviews"></p>
                <p>Рецензий</p>
            </div>
        </div>
    </div>
</template>