<script setup>
const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    reward: {
        type: Number,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    }
})
</script>

<template>
    <div class="flex flex-row gap-3 items-center">
        <v-icon size="30px" :color="completed ? 'green' : 'primary'" :icon="icon"></v-icon>
        <div class="flex flex-col">
            <p class="text-body-1">{{name}} <span class="text-success">+{{ reward }}</span></p>
            <p class="text-body-2">{{description}}</p>
        </div>
    </div>
</template>