<script setup>
const showButtons = ref(false);
const props = defineProps({
    filmInfo: {
        type: Object
    },
});
</script>

<template>
    <a @click="$router.push(`/film/${filmInfo.link}`)" class="flex flex-row cursor-pointer" :class="$attrs.class"
        @mouseover="showButtons = true" @mouseleave="showButtons = false">
        <v-img :src=filmInfo.poster :aspect-ratio="2 / 3" cover>
            <div :class="showButtons ? 'justify-center items-center bg-black/70' : 'justify-end bg-gradient-to-t from-black/100 via-black/20'"
                class="flex flex-col h-full p-1  ">
                <div class="flex flex-row justify-between items-center text-white">
                    <div class="flex w-100 flex-col items-center text-subtitle-2" v-if="!showButtons">
                        <p class="text-center text-body-1">{{filmInfo.name}} <br><span class="text-body-2">{{filmInfo.yearStart}}, {{filmInfo.genres[0] ? filmInfo.genres[0].name: ''}}</span></p>
                        <div class="flex flex-row w-100 justify-between px-1">
                            <p class="text-left flex flex-row">
                                <span class="text-orange-500 font-bold">КП&nbsp;</span> {{filmInfo.kinopoiskRating}}
                            </p>
                            <p class="text-left flex flex-row">
                                <span class="text-yellow-500 font-bold">IMDB&nbsp;</span> {{filmInfo.imdbRating}}
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