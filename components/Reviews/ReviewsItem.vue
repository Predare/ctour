<script setup>
const props = defineProps({
    id: Number,
    name: String,
    text: String,
    avatar: String,
    userId: String,
    rating: Number,
    avatarColor: String,
    createdAt: String,
    voteStatus: Number,
    positiveVotes: Number,
    negativeVotes: Number,
    userReviewsCount: Number,
    viewsCount: Number,
    commentsCount: Number,
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

const reviewsCountText = computed(() => {
    if (props.userReviewsCount === 1) {
        return props.userReviewsCount + ' рецензия';
    } else {
        return props.userReviewsCount + ' рецензии';
    }
});

const actualPositiveVotes = ref(props.positiveVotes);
const actualNegativeVotes = ref(props.negativeVotes);

const actualVoteStatus = ref(props.voteStatus);

async function sendVote(value) {
    const result = await $fetch(`/api/review/vote/${props.id}`, { method: 'POST', body: { status: value } });
    if(!result.status) return;
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

const actualViewsCount = ref(props.viewsCount);

async function addView() {
    const review = await $fetch(`/api/review/views/${props.id}`, { method: 'POST' });
    if(!review) return;
    actualViewsCount.value++;
}
</script>

<template>
    <div ref="componentRef" class="rounded-md p-5" :style="{ backgroundColor: colors[rating] }">
        <div class="flex flex-row justify-between">
            <div class="flex flex-row gap-4 items-start">
                <AvatarIcon width="50px" height="50px" icon-size="30px" :iconName="avatar" :icon-color="avatarColor" />
                <div class="flex flex-col">
                    <div class="flex flex-row items-center gap-2">
                        <p class="text-body-1">{{ name }}</p>
                        <DateLine class="text-caption" :date="createdAt"></DateLine>
                    </div>
                    <p class="text-caption">{{reviewsCountText}}</p>
                </div>
            </div>
            <div class="flex flex-row gap-2">
                <v-btn variant="plain" density="comfortable"
                    :prepend-icon="actualVoteStatus === 1 ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'" @click="sendVote(1)">&nbsp;{{actualPositiveVotes}}</v-btn>
                <v-btn variant="plain" density="comfortable"
                    :prepend-icon="actualVoteStatus === -1 ? 'mdi-thumb-down' : 'mdi-thumb-down-outline'" @click="sendVote(-1)">&nbsp;{{actualNegativeVotes}}</v-btn>
            </div>
        </div>
        <v-divider class="my-3" />
        <div ref="content" class="overflow-hidden" :class="{ 'max-h-[100px]': !expand }">
            <div v-dompurify-html="text"></div>
        </div>

        <v-btn v-if="overflow" class="text-body-2 mt-2" density="comfortable" variant="plain" @click="expand = !expand"
            v-text="expand ? 'Скрыть...' : 'Развернуть...'"></v-btn>
        <v-divider class="my-3" />
        <ReviewsFooter :viewsCount="actualViewsCount" :reviewId="id" :commentsCount="commentsCount"/>
    </div>
</template>