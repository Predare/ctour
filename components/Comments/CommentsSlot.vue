<script setup>
import DateTimeTextFormatter from '~/composables/DateTimeTextFormatter';

const props = defineProps({
    hideReplayReportButton: { type: Boolean, default: false },
    id: { type: Number, required: true },
    replyCommentId: { type: Number, required: false },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userAvatar: { type: String, required: true },
    userAvatarColor: { type: String, required: true },
    userRankColor: { type: String, required: true },
    userRankName: { type: String, required: true },
    text: { type: String, required: true },
    subcommentCount: { type: Number, required: false, default: 0 },
    voteStatus: { type: Number, required: true },
    positiveVotes: { type: Number, required: true },
    negativeVotes: { type: Number, required: true },
    createdAt: { type: String, required: true }
});
const actualVote = ref(props.voteStatus);
const actualPositiveRating = ref(props.positiveVotes);
const actualNegativeRating = ref(props.negativeVotes);
const createdDate = ref(DateTimeTextFormatter(props.createdAt));
const avatarEmoji = ref(getAvatar(props.userAvatar));
const reportDialog = ref(false);
const showReplies = ref(false);
const subComments = ref([]);
const cursor = ref(-1);
const api = ref(formatGetCommentsLink().replies(props.id, props.replyCommentId ?? props.id));

function changeRating(type) {
    if (actualVote.value === type) {
        return;
    }
    $fetch(`/api/comments/rating/${props.id}`,
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

async function loadSubcomments() {
    $fetch(unref(api).get, { method: 'GET', params: { cursor: unref(cursor) } }).then(res => {
        subComments.value = unref(subComments).concat(res.comments);
        cursor.value = res.cursor;
    });
}

function setReply() {
    //commentFormStore.repliedComment = data; 
    //commentFormStore.text = `@${data.user.name} ` + commentFormStore.text;
}
</script>

<template>
    <div class="flex flex-row gap-4">
        <p :style="{ backgroundColor: userAvatarColor }" class="text-[30px] rounded-full bg-opacity-25 px-2 max-h-[50px]">{{
            avatarEmoji }}</p>
        <div class="w-100">
            <NuxtLink :to="userId ? `/profile/${userId}` : ''">
                <p class=" text-body-1 font-bold">{{ userName + ' / ' }}<span :style="{ color: userRankColor }"
                        v-text="userRankName"></span>
                    <v-icon :color="userRankColor" icon="mdi-star"></v-icon>
                </p>
            </NuxtLink>
            <p class="opacity-50 text-caption">{{ createdDate }}</p>
            <p class="text-body-2 mt-2">{{ text }}</p>
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
                <div class="flex flex-row items-center" v-if="!hideReplayReportButton">
                    <v-btn class="font-weight-bold" variant="plain" size="x-small" :ripple="false" text="Ответить"
                        @click="setReply" />
                    <span class="opacity-60 text-h6">/</span>
                    <v-btn class="font-weight-bold" variant="plain" size="x-small" :ripple="false" text="Пожаловаться"
                        @click="reportDialog = true" />
                    <ReportDialog :link="`/api/report/comment/${id}`" v-model="reportDialog"></ReportDialog>
                </div>
            </div>
            <v-btn v-show="subcommentCount > 0" density="compact" variant="plain"
                @click="showReplies = !showReplies; if(subComments.length === 0)loadSubcomments();" class="text-body-2"
                v-text="showReplies ? 'Скрыть ответы' : `Показать ответы (${subcommentCount})`" :ripple="false"></v-btn>
            <div v-show="showReplies" class="flex flex-col mt-[1rem] gap-3">
                <CommentsSlot v-for="i in subComments" :key="i.id" :id="i.id" :reply-comment-id="i.replyCommentId"
                    :userId="i.user.id" :userName="i.user.name" :user-avatar="i.user.avatar" :userAvatarColor="i.user.color"
                    :userRankColor="i.user.rank.color" :userRankName="i.user.rank.name" :text="i.text"
                    :created-at="i.createdAt" :positive-votes="i.positiveVotes" :negative-votes="i.negativeVotes"
                    :vote-status="i.voteStatus" />
            </div>
            <v-btn v-show="showReplies && cursor != -1" @click="loadSubcomments" color="surface-lighten-2" block size="small">Загрузить
            ещё</v-btn>
        </div>
    </div>
</template>