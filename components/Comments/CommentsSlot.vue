<script setup>

const props = defineProps({
    data: Object
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

const { getSession } = useAuth();

const session = ref();
getSession().then((res) => {
    session.value = res;
});

</script>

<template>
    <div class="flex flex-row gap-4">
        <p :style="{ backgroundColor: props.data.user.color }" class="text-[30px] rounded-full bg-opacity-25 px-2 max-h-[50px]">{{
            avatarEmoji }}</p>
        <div class="w-100">
            <NuxtLink :to="props.data.user.id ? `/profile/${props.data.user.id}` : ''">
                <h3 class="opacity-60 font-bold">{{ data.user.name + ' / ' }}<span :style="{ color: props.data.user.rank.color }"
                        v-text="props.data.user.rank.name"></span> <v-icon :color="props.data.user.rank.color" icon="mdi-star"></v-icon></h3>
            </NuxtLink>
            <p class="opacity-60 text-caption">{{ data.createdDate }}</p>
            <p class="opacity-60 text-body-2">{{ data.text }}</p>
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