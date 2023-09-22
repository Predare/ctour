<script setup>
import { useSessionStore } from '~/stores/session';
const session = useSessionStore.session;

const props = defineProps({
    data: Object,
});
const content = ref(null);
const expand = ref(false);
const overflow = ref(false);
watch(content, () => {
    if (content.value) {
        setTimeout(() => {
            overflow.value = content.value ? content.value.scrollHeight > content.value.clientHeight : true;
        }, 300);
    }
});

const colors = {
    '1': 'green',
    '-1': 'darkred',
}

const actualFollowersCount = ref(props.data.author._count.followers);

const actualPositiveVotes = ref(props.data.positiveVotes);
const actualNegativeVotes = ref(props.data.negativeVotes);

const actualVoteStatus = ref(props.data.voteStatus);
async function sendVote(value) {
    const result = await $fetch(`/api/review/vote/${props.data.id}`, { method: 'POST', body: { status: value } });
    if (!result.status) return;
    actualPositiveVotes.value = result.positiveCount;
    actualNegativeVotes.value = result.negativeCount;
    actualVoteStatus.value = result.status;
}

const componentRef = ref(null);

onMounted(() => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(async entry => {
            if (entry.isIntersecting) {
                await addView();
                observer.disconnect();
            }
        })
    })

    observer.observe(componentRef.value);
    return () => {
        observer.disconnect();
    }
});

const actualViewsCount = ref(props.data.viewsCount);

async function addView() {
    const review = await $fetch(`/api/review/views/${props.data.id}`, { method: 'POST' });
    if (!review) return;
    actualViewsCount.value++;
}

const actualSubscribeStatus = ref(props.data.author.followers.length === 0 ? false : true);

async function subscribe() {
    const result = await $fetch(`/api/user/followers/${props.data.author.id}/subscribe`, { method: 'POST' });
    if (!result || !result.status) return;
    actualFollowersCount.value = result.user._count.followers;
    actualSubscribeStatus.value = true;
}

async function unsubscribe() {
    const result = await $fetch(`/api/user/followers/${props.data.author.id}/unsubscribe`, { method: 'DELETE' });
    if (!result || !result.status) return;
    actualFollowersCount.value = result.user._count.followers;
    actualSubscribeStatus.value = false;
}
</script>

<template>
    <div ref="componentRef" class="rounded-md p-5" :style="{ backgroundColor: colors[data.rating] }">
        <div class="flex flex-row justify-between">
            <div class="flex flex-row gap-4 items-start">
                <NuxtLink :to="`/profile/${data.author.id}`">
                    <AvatarIcon width="50px" height="50px" icon-size="30px" :iconName="data.author.avatar"
                        :icon-color="data.author.color" />
                    <v-tooltip activator="parent" location="bottom">Профиль</v-tooltip>
                </NuxtLink>
                <div class="flex flex-col justify-start items-start">
                    <NuxtLink :to="`/profile/${data.author.id}`">
                        <div class="flex flex-row items-center gap-2">
                            <p class="text-body-1">{{ data.author.name }}</p>
                            <DateLine class="text-caption" :date="data.createdAt"></DateLine>
                        </div>
                        <div class="flex flex-row items-center gap-2">
                            <CriticCardReviewsRow :reviews-count="data.author._count.reviews"></CriticCardReviewsRow>
                            <CriticCardFollowersRow :followers-count="actualFollowersCount"></CriticCardFollowersRow>
                        </div>
                        <v-tooltip activator="parent" location="bottom">Профиль</v-tooltip>
                    </NuxtLink>

                    <v-btn v-if="session?.user?.id != data.author.id" class="text-subtitle-2 px-1" variant="text"
                        @click="actualSubscribeStatus ? unsubscribe() : subscribe()"
                        v-text="actualSubscribeStatus ? 'Отписаться' : 'Подписаться'"></v-btn>
                </div>
            </div>
            <div class="flex flex-row gap-2">
                <v-btn variant="plain" density="comfortable"
                    :prepend-icon="actualVoteStatus === 1 ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'"
                    @click="sendVote(1)">&nbsp;{{ actualPositiveVotes }}</v-btn>
                <v-btn variant="plain" density="comfortable"
                    :prepend-icon="actualVoteStatus === -1 ? 'mdi-thumb-down' : 'mdi-thumb-down-outline'"
                    @click="sendVote(-1)">&nbsp;{{ actualNegativeVotes }}</v-btn>
            </div>
        </div>
        <v-divider class="my-3" />
        <ClientOnly>
            <div ref="content" class="overflow-hidden" :class="{ 'max-h-[100px]': !expand }">
                <div v-dompurify-html="data.text"></div>
            </div>
        </ClientOnly>

        <v-btn v-if="overflow" class="text-body-2 mt-2" density="comfortable" variant="plain" @click="expand = !expand"
            v-text="expand ? 'Скрыть...' : 'Развернуть...'"></v-btn>
        <v-divider class="my-3" />
        <ReviewsFooter :id="data.id" :filmLink="data.filmLink" :author-id="data.author.id" :viewsCount="actualViewsCount"
            :commentsCount="data._count.comments" />
    </div>
</template>