<script setup>
const showButtons = ref(false);
const props = defineProps({
    title: {
        type: String
    },
    kp: {
        type: Number
    },
    imdb: {
        type: Number
    },
    poster: {
        type: String
    },
    yearStart: {
        type: Number
    },
    genres: {
        type: Array
    },
    link: {
        type: String
    }
});
</script>

<template>
    <a @click="$router.push(`/film/${props.link}`)" class="flex flex-row cursor-pointer" :class="$attrs.class"
        @mouseover="showButtons = true" @mouseleave="showButtons = false">
        <v-img :src=props.poster :aspect-ratio="2 / 3" cover>
            <div :class="showButtons ? 'justify-center items-center bg-black/70' : 'justify-end bg-gradient-to-t from-black/100 via-black/20'"
                class="flex flex-col h-full p-1  ">
                <div class="flex flex-row justify-between items-center text-white">
                    <div class="flex w-100 flex-col items-center text-subtitle-2" v-if="!showButtons">
                        <p class="text-center text-body-1">{{title}} <br><span class="text-body-2">{{yearStart}}, {{genres[0] ? genres[0].name: ''}}</span></p>
                        <div class="flex flex-row w-100 justify-between px-1">
                            <p class="text-left">
                                <span class="text-orange-500 font-bold">КП</span> {{kp}}
                            </p>
                            <p class="text-left">
                                <span class="text-yellow-500 font-bold">IMDB</span> {{imdb}}
                            </p>
                        </div>
                    </div>

                    <v-btn v-if="showButtons" size="large" icon="mdi-play" color="primary">
                        <v-icon size="40"></v-icon>
                    </v-btn>
                </div>
            </div>
        </v-img>
    </a>
</template>