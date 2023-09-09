<script setup>
const expand = ref(false);
</script>

<template>
    <div>
        <v-btn @click="expand = !expand" color="surface-lighten-2" class="text-caption" text="Скриншоты (спойлеры!)" />
        <v-expand-transition>
            <div v-show="expand" class="mt-5 flex flex-row gap-1">
                <div v-for="i in 5" class="w-[150px] h-[100px] border"></div>
            </div>
        </v-expand-transition>
    </div>
</template>