<script setup>
import { useFilmStore } from '@/stores/film';
import { useCommentsStore } from '@/stores/comments';

const route = useRoute();
const filmStore = useFilmStore();
const commentsStore = useCommentsStore();

function setCommentLinks() {
    commentsStore.$reset();
    commentsStore.$patch(
        {
            getLink: `/api/comments/film/${route.params.link}`,
            postLink: `/api/comments/film/${route.params.link}`,
            hideReplayReportButton: false,
        }
    );
}

setCommentLinks();
await loadFilmInfo();
async function loadFilmInfo() {
    await useFetch(`/api/film/${route.params.link}`).then(response => {
        filmStore.film = response.data.value;
    });
}

async function addFilmToViewedList() {
    await $fetch(`/api/user/films/viewed/${route.params.link}/`, { method: 'POST' });
}

onMounted(() => {
    addFilmToViewedList();
})
</script>

<template>
    <v-container style="padding: 0;">
        <v-row>
            <v-col>
                <!--<WavingSlider class="mb-10"/>-->
                <FilmWatchWindow class="bg-surface-lighten-1 py-10 rounded-md"
                    style="padding-left: 5rem; padding-right: 5rem;" />
                <CommentsWidget class="bg-surface-lighten-1 py-10 rounded-md mt-10 p-[3rem]" 
                    :api="formatGetCommentsLink().film(route.params.link)"></CommentsWidget>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <ReviewsWidget class="mt-10 bg-surface-lighten-1 p-10" :filmLink="route.params.link" />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <NuxtLink :to="`/reviews/create/${route.params.link}`">
                    <v-btn>Написать рецензию</v-btn>
                </NuxtLink>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <div class="bg-surface-lighten-1 rounded-md" style="padding: 3rem; padding-bottom: 0; padding-top: 2rem;">
                    <p class="text-h6">Каталог</p>
                    <FilmsTable/>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>