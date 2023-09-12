<script setup>
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

const reviewsCountText = computed(() => {
    if (props.data.author._count.reviews === 1) {
        return props.data.author._count.reviews + ' рецензия';
    } else {
        return props.data.author._count.reviews + ' рецензии';
    }
});

const actualPositiveVotes = ref(props.data.positiveVotes);
const actualNegativeVotes = ref(props.data.negativeVotes);

const actualVoteStatus = ref(props.voteStatus);

async function sendVote(value) {
    const result = await $fetch(`/api/review/vote/${props.data.id}`, { method: 'POST', body: { status: value } });
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

const actualViewsCount = ref(props.data.viewsCount);

async function addView() {
    const review = await $fetch(`/api/review/views/${props.data.id}`, { method: 'POST' });
    if(!review) return;
    actualViewsCount.value++;
}
</script>

<template>
    <div ref="componentRef" class="rounded-md p-5" :style="{ backgroundColor: colors[data.rating] }">
        <div class="flex flex-row justify-between">
            <div class="flex flex-row gap-4 items-start">
                <AvatarIcon width="50px" height="50px" icon-size="30px" :iconName="data.author.avatar" :icon-color="data.author.color" />
                <div class="flex flex-col justify-start items-start">
                    <div class="flex flex-row items-center gap-2">
                        <p class="text-body-1">{{ data.author.name }}</p>
                        <DateLine class="text-caption" :date="data.createdAt"></DateLine>
                        
                    </div>
                    <div class="flex flex-row items-center gap-2">
                        <p class="text-caption">{{reviewsCountText}}</p>
                        <v-btn class="text-caption" variant="tonal" density="compact">Подписаться</v-btn>
                    </div>
                    
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
            <div v-dompurify-html="data.text"></div>
        </div>

        <v-btn v-if="overflow" class="text-body-2 mt-2" density="comfortable" variant="plain" @click="expand = !expand"
            v-text="expand ? 'Скрыть...' : 'Развернуть...'"></v-btn>
        <v-divider class="my-3" />
        <ReviewsFooter :id="data.id" :filmLink="data.filmLink" :author-id="data.author.id" :viewsCount="actualViewsCount" :commentsCount="data._count.comments" />
    </div>
</template>