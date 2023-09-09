<script setup>
const route = useRoute()

const profileInfo = ref(await useFetch(`/api/profile/${route.params.id}`));

onMounted(async () => {
    await profileInfo.value.refresh();
    if(profileInfo?.value.data.positiveVotesCount === 0){
        positiveVotesCountText.value = ' плюсов и ';
    }else if(profileInfo?.value.data.positiveVotesCount === 1){
        positiveVotesCountText.value = ' плюс и ';
    }else if(profileInfo?.value.data.positiveVotesCount > 1){
        positiveVotesCountText.value = ' плюса и ';
    }
    if(profileInfo?.value.data.negativeVotesCount === 0){
        negativeVotesCountText.value = ' минусов ';
    }else if(profileInfo?.value.data.negativeVotesCount === 1){
        negativeVotesCountText.value = ' минус ';
    }else if(profileInfo?.value.data.negativeVotesCount > 1){
        negativeVotesCountText.value = ' минуса ';
    }
    refreshDate();
})

const positiveVotesCountText = ref('');
const negativeVotesCountText = ref(''); 
const userTime = ref(null);
const userTimeString = ref('');
function refreshDate() {
    const date = new Date(profileInfo.value.data.createdAt);
    userTime.value = new Date(Date.now() - date);
    const dateNow = new Date(Date.now());
    const yearsCount = dateNow.getFullYear() - date.getFullYear();
    const monthsCount = dateNow.getMonth() - date.getMonth();
    const daysCount = dateNow.getDate() - date.getDate();
    const yearsString = (yearsCount ? yearsCount + (yearsCount <= 4 ? (yearsCount === 1 ? " год " : " года ") : " лет ") : "");
    const monthsString = (monthsCount ? monthsCount + (monthsCount <= 4 ? (daysCount === 1 ? " месяц " : " месяца ") : " месяцев ") : "");
    const daysString = (daysCount ? daysCount + (daysCount <= 4 ? (daysCount === 1 ? " день" : " дня") : " дней") : "");
    //const hoursString = (hoursCount ? hoursCount + (hoursCount <= 4 ? (hoursCount === 1 ? " час " : " часа ") : " часов") : "");
    userTimeString.value = yearsString || monthsString || daysString ? "На сайте уже " + yearsString + monthsString + daysString : 'На сайте менее дня' /*+ hoursString*/;
}
</script>

<template>
    <div class="bg-surface-lighten-1 rounded-md" style="padding: 3rem; padding-bottom: 1rem; padding-top: 2rem;">
        <AvatarIcon width="100px" height="100px" icon-size="60px" :icon-name="profileInfo?.data.avatar"
            :icon-color="profileInfo?.data.color" />
        <div class="flex flex-row justify-between items-center">
            <div class="flex flex-col mt-4 gap-3">
                <p class="text-body-1" v-text="profileInfo?.data.name"></p>
                <p class="text-body-2" v-text="userTimeString"></p>
            </div>
            <p class="text-h6">Рейтинг критика: 137</p>
        </div>
        <v-divider class="my-3" />
        <p class="text-body-2">Поставил
            <span class="text-green" v-text="profileInfo?.data.positiveVotesCount ?? 0"></span>
            <span
                v-text="positiveVotesCountText"></span>
            <span class="text-red" v-text="profileInfo?.data.negativeVotesCount ?? 0"></span>
            <span v-text="negativeVotesCountText"></span>
        </p>
        <v-divider class="my-3" />
        <p class="text-h6">Достижения на текущем уровне:</p>
        <ProfileExpProgress style="margin-top: 1rem" :expierence="profileInfo?.data?.expirence"
            :next-rank-expirence="profileInfo?.data?.nextRank.requiredExpirence" />
        <ProfileRank :rank-color="profileInfo?.data.rank.color" :rank-name="profileInfo?.data.rank.name" />
        <div class="flex flex-col gap-5 mt-3">
            <ProfileAchievement />
            <ProfileAchievement />
            <ProfileAchievement />
        </div>
        <div class="mt-5">
            <NuxtLink to="/">
                <v-btn variant="plain">Все достижения</v-btn>
            </NuxtLink>
        </div>
        <v-divider class="my-3" />
        <div class="flex flex-row gap-5 text-center text-subtitle-1 ms-5 mt-4">
            <div class="flex flex-col">
                <p v-text="profileInfo?.data.rating"></p>
                <p>Рейтинг</p>
            </div>
            <div class="flex flex-col">
                <p v-text="profileInfo?.data._count.followers"></p>
                <p>Читателей</p>
            </div>
            <div class="flex flex-col">
                <p v-text="profileInfo?.data._count.subscribes"></p>
                <p>Подписок</p>
            </div>
            <div class="flex flex-col">
                <p v-text="profileInfo?.data._count.reviews"></p>
                <p>Рецензий</p>
            </div>
        </div>
    </div>
</template>