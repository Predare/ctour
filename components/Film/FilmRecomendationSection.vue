<template>
    <p class="text-h6 mb-5">Рекомендации</p>
    <div class="flex justify-center">
        <v-container>
            <v-row no-gutters>
                <v-col cols="2" v-for="i in 12" :key="i">
                    <InfoPoster class="ma-2" />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>