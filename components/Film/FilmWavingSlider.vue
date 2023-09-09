<script setup>
const perPageItems = 6;
const autoplayTimeout = 3000;
const paginationPadding = 5;
</script>

<template>
    <div class="flex flex-col items-center">
        <p class="text-h6 mb-2 self-start">Горячие новинки</p>
        <carousel :autoplayTimeout='autoplayTimeout' loop autoplay :paginationPadding='paginationPadding' :perPage="perPageItems" class="max-w-[1000px] w-full"
            paginationActiveColor="white" paginationColor="grey">
            <slide v-for="i in 24" :key="i">
                <InfoPoster class="mx-2" />
            </slide>
        </carousel>
    </div>
</template>