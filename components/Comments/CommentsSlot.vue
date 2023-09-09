<script setup>

const props = defineProps({
    id: {
        type: Number,
    },
    title: {
        type: String,
    },
    text: {
        type: String,
    },
    ratingPositive: {
        type: Number,
    },
    ratingNegative: {
        type: Number,
    },
    avatar: {
        type: String
    },
    createdAt: {
        type: String
    },
    color: {
        type: String
    },
    voteStatus: {
        type: Number
    },
    rank: {
        type: String,
    },
    rankColor: {
        type: String,
    },
    userId: {
        type: String
    }
});

const actualVote = ref(props.voteStatus);
const actualPositiveRating = ref(props.ratingPositive);
const actualNegativeRating = ref(props.ratingNegative);

const createdDate = computed(() => {
    const date = new Date(props.createdAt);
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

const avatarEmoji = computed(() => emojis[props.avatar]);

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

const { getSession } = useAuth();

const session = ref();
getSession().then((res) => {
    session.value = res;
});

</script>

<template>
    <div class="flex flex-row gap-4">
        <p :style="{ backgroundColor: props.color }" class="text-[30px] rounded-full bg-opacity-25 px-2 max-h-[50px]">{{
            avatarEmoji }}</p>
        <div class="w-100">
            <NuxtLink :to="userId ? `/profile/${userId}` : ''">
                <h3 class="opacity-60 font-bold">{{ title + ' / ' }}<span :style="{ color: props.rankColor }"
                        v-text="props.rank"></span> <v-icon :color="props.rankColor" icon="mdi-star"></v-icon></h3>
            </NuxtLink>
            <p class="opacity-60 text-caption">{{ createdDate }}</p>
            <p class="opacity-60 text-body-2">{{ text }}</p>
            <div class="flex flex-row justify-start items-center mt-1">
                <div class="flex flex-row items-center me-3">
                    <v-btn variant="plain" size="small" :icon="actualVote === 1 ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'"
                        color="green" @click="changeRating(1)" />
                    <p class="text-green-500 text-body-2">{{ actualPositiveRating ?? '0' }}</p>
                    <v-btn variant="plain" size="small"
                        :icon="actualVote === -1 ? 'mdi-thumb-down' : 'mdi-thumb-down-outline'" color="red"
                        @click="changeRating(-1)" />
                    <p class="text-red-500 text-body-2">{{ actualNegativeRating ?? '0' }}</p>
                </div>
                <v-btn class="font-weight-bold" variant="plain" size="x-small" :ripple="false" text="Ответить" />
                <span class="opacity-60 text-h6">/</span>
                <v-btn class="font-weight-bold" variant="plain" size="x-small" :ripple="false" text="Пожаловаться" />
            </div>
        </div>
    </div>
</template>