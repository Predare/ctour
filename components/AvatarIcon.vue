<script setup>
const { getSession } = useAuth();
const props = defineProps({
    width: String,
    height: String,
    iconSize: String,
    iconName: String,
    iconColor: String
});

const avatarEmojis = [
    {name: 'GHOST', emoji: '👻'}, 
    {name: 'ALIEN', emoji: '👽'},
    {name: 'CRAB', emoji: '👾'}, 
    {name: 'ROBOT', emoji: '🤖'},
    {name: 'CLOWN', emoji: '🤡'},
    {name: 'CAT', emoji: '🐱'},
    {name: 'PUMPKIN', emoji: '🎃'},
];

const session = ref();
getSession().then((res) => {
    session.value = res;
});

const avatar = computed(() => {return avatarEmojis.find(emoji => emoji.name === props.iconName)?.emoji;
});

const bgColor = computed(() => {
    if (props.iconColor) {
        return props.iconColor;
    } else {
        return '#f0f0f0';
    }
});

</script>

<template>
    <div class="rounded-full flex justify-center items-center"
        :style="{ backgroundColor: bgColor, width: width ? width : '60px', height: height ? height : '55px' }">
        <p :style="{ fontSize: iconSize ? iconSize : '30px' }" v-text="avatar"></p>
    </div>
</template>