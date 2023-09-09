<script setup>
const emojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😄', 
    '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', 
    '😌', '😍', '😘', '😋', '😎', '🤩', '😭', '😢', '🤯', 
    '👹', '👺', '🤡','👻','👽','👾','🤖','🎃','😺','😸',
    '😹','😻','😼','🙀','😿','😾','😈','🤠','✊','🤟',
    '🧝‍♀️','🧛‍♂️','🧟‍♀️','🧞‍♀️','🧜‍♀️','🧜‍♂️',
]

const props = defineProps({
    addText: Function,
})
</script>


<template>
    <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon="mdi-emoticon-happy-outline" variant="plain" :ripple="false"
                density="compact"></v-btn>
        </template>
        <div class="grid grid-cols-12 bg-surface-lighten-1 rounded p-2 gap-3 elevation-5">
            <button v-for="emoji in emojis" :key="emoji" v-text="emoji" @click="props.addText(emoji)"
                class="text-lg"></button>
        </div>
    </v-menu>
</template>