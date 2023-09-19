<script setup>
import { useCommentsFormStore } from '@/stores/commentForm';
import { useCommentsStore } from '@/stores/comments';
const commentsStore = useCommentsStore();
const commentFormStore = useCommentsFormStore();

const props = defineProps({
    data: Object,
});

const postStylesClass = computed(() => {
    return commentsStore.postStyle === 'single' ? 'bg-surface-lighten-2 p-3 pb-1 rounded-md' : '';
});

const actualVote = ref(props.data.voteStatus);
const actualPositiveRating = ref(props.data.positiveVotes);
const actualNegativeRating = ref(props.data.negativeVotes);

const createdDate = computed(() => {
    const date = new Date(props.data.createdAt);
    return `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()} ${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}:${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}:${date.getFullYear()}`;
});

const emojis = {
    'ALIEN': '👽',
    'GHOST': '👻',
    'CRAB': '👾',
    'ROBOT': '🤖',
    'CLOWN': '🤡',
    'CAT': '🐱',
    'PUMPKIN': '🎃',
};

const avatarEmoji = computed(() => emojis[props.data.user.avatar]);
function changeRating(type) {
    if (actualVote.value === type) {
        return;
    }
    $fetch(`/api/comments/rating/${props.data.id}`,
        {
            method: 'POST',
            body:
            {
                status: type
            }
        }).then(response => {
            if (response.status) {
                actualVote.value = type;
                actualPositiveRating.value = response.positiveCount;
                actualNegativeRating.value = response.negativeCount;
            }
        });
}

const reportDialog = ref(false);
const showReplies = ref(false);

async function loadSubcomments() {
    var getSubComments = await useFetch(`/api/comments/reply/${props.data.id}`);
    const rootCommentId = commentsStore.comments.findIndex(comment => comment.id === props.data.id);
    if (rootCommentId !== -1) commentsStore.comments[rootCommentId].subComments = getSubComments.data.value.comments;
}
</script>

<template>
    <div class="flex flex-row gap-4" :class="postStylesClass">
        <p :style="{ backgroundColor: props.data.user.color }"
            class="text-[30px] rounded-full bg-opacity-25 px-2 max-h-[50px]">{{
                avatarEmoji }}</p>
        <div class="w-100">
            <NuxtLink :to="props.data.user.id ? `/profile/${props.data.user.id}` : ''">
                <p class=" text-body-1 font-bold">{{ data.user.name + ' / ' }}<span
                        :style="{ color: props.data.user.rank.color }" v-text="props.data.user.rank.name"></span>
                    <v-icon :color="props.data.user.rank.color" icon="mdi-star"></v-icon>
                </p>
            </NuxtLink>
            <p class="opacity-50 text-caption">{{ createdDate }}</p>
            <p class="text-body-2 mt-2">{{ data.text }}</p>
            <div class="flex flex-row justify-start items-center">
                <div class="flex flex-row items-center">
                    <v-btn variant="plain" size="small" :icon="actualVote === 1 ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'"
                        color="green" @click="changeRating(1)" />
                    <p class="text-green-500 text-body-2">{{ actualPositiveRating ?? '0' }}</p>
                    <v-btn variant="plain" size="small"
                        :icon="actualVote === -1 ? 'mdi-thumb-down' : 'mdi-thumb-down-outline'" color="red"
                        @click="changeRating(-1)" />
                    <p class="text-red-500 text-body-2">{{ actualNegativeRating ?? '0' }}</p>
                </div>
                <div class="flex flex-row items-center" v-if="!commentsStore.hideReplayReportButton">
                    <v-btn class="font-weight-bold" variant="plain" size="x-small" :ripple="false" text="Ответить"
                        @click="commentFormStore.repliedComment = props.data; commentsStore.postLink = `/api/comments/reply/${props.data.id}`" />
                    <span class="opacity-60 text-h6">/</span>
                    <v-btn class="font-weight-bold" variant="plain" size="x-small" :ripple="false" text="Пожаловаться"
                        @click="reportDialog = true" />
                    <ReportDialog :link="`/api/report/comment/${props.data.id}`" v-model="reportDialog"></ReportDialog>
                </div>
            </div>
            <v-btn v-if="data?._count?.subComments > 0" density="compact" variant="plain"
                @click="showReplies = !showReplies; loadSubcomments();" class="text-body-2"
                v-text="showReplies ? 'Скрыть ответы' : `Показать ответы (${data._count.subComments})`"
                :ripple="false"></v-btn>
            <div v-show="showReplies" class="flex flex-col mt-[1rem] gap-3">
                <CommentsSlot v-for="i in data.subComments" :key="i.id" :data="i" :rootCommentId="i.id" />
            </div>
        </div>
    </div>
</template>