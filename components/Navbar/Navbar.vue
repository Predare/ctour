<script setup>
import { useSearchFormStore } from '@/stores/searchForm';
import { useFilmStore } from '@/stores/film';
import { useFilmFilterStore } from '@/stores/filmFilter';
const filmStore = useFilmStore();
const { status } = useAuth();
const route = useRoute();
const searchFormStore = useSearchFormStore();
const filmFilterStore = useFilmFilterStore();

const theme_items = ref([
  {
    name: 'Ретровейв',
    value: 'foo',
  },
  {
    name: 'Классика',
    value: 'bar',
  },
  {
    name: 'Кофе',
    value: 'fizz',
  },
]);

const { data: filters } = await useFetch('/api/catalogueFilters/all');
const { genres, voices, selections } = filters.value;
const filmLink = ref(filmStore.film?.link ? '/film/' + filmStore.film?.link : '/');

function setFilmType(name) {
  filmFilterStore.pureFilters();
  filmFilterStore.setType(name);
  filmFilterStore.setFullreload(true);
}

async function navigateToRandomFilm() {
  const filmLink = await $fetch('/api/film/get/random');
  await navigateTo(`/film/${filmLink}`);
}

filmStore.$subscribe((mutation, state) => {
  if (state.film) {
    if (state.film?.link) filmLink.value = '/film/' + state.film.link;
    else filmLink.value = '/';
  }
});

</script>

<template>
  <div class="absolute w-full flex flex-row justify-between bg-surface-lighten-1">
    <NuxtLink :to="filmLink">
      <v-btn :prepend-icon="!route.path.startsWith('/film/') && filmLink != '/' ? 'mdi-chevron-left' : ''" rounded="0"
        size="large" class="min-h-[50px]" variant="text" text="LionFilm"></v-btn>
    </NuxtLink>

    <div class="flex flex-row items-center">
      <NuxtLink to="/" @click="setFilmType('FILM')">
        <v-btn rounded="0" class="min-h-[50px]" variant="text">Фильмы</v-btn>
      </NuxtLink>
      <NuxtLink to="/" @click="setFilmType('SERIAL')">
        <v-btn rounded="0" class="min-h-[50px]" variant="text">Сериалы</v-btn>
      </NuxtLink>
      <NavbarDropdown title="Жанры" :items="genres" :setter="filmFilterStore.setGenre" />
      <NavbarDropdown title="Озвучка" :items="voices" :setter="filmFilterStore.setVoice" />
      <NavbarDropdown title="Подборки" :items="selections" :setter="filmFilterStore.setSelection" />
      <v-tooltip location="bottom" text="Поиск">
        <template v-slot:activator="{ props }">
          <NuxtLink to="/?search=true">
            <v-btn rounded="0" @click="searchFormStore.openForm" v-bind="props" variant="text" class="min-h-[50px]"
              icon="mdi-magnify" />
          </NuxtLink>
        </template>
      </v-tooltip>
    </div>

    <div class="flex flex-row items-center">
      <v-tooltip location="bottom" text="Случайное">
        <template v-slot:activator="{ props }">
          <v-btn rounded="0" v-bind="props" variant="text" class="min-h-[50px]" icon="mdi-dice-5"
            @click="navigateToRandomFilm" />
        </template>
      </v-tooltip>
      <v-tooltip location="bottom" text="Закладки">
        <template v-slot:activator="{ props }">
          <NuxtLink to="/">
            <v-btn rounded="0" v-bind="props" variant="text" class="min-h-[50px]" icon="mdi-bookmark-outline"
              @click="() => { filmFilterStore.pureFilters(); filmFilterStore.favorite = true; filmFilterStore.setFullreload(true); }" />
          </NuxtLink>
        </template>
      </v-tooltip>
      <v-tooltip location="bottom" text="История просмотра">
        <template v-slot:activator="{ props }">
          <NuxtLink to="/">
            <v-btn rounded="0" v-bind="props" variant="text" class="min-h-[50px]" icon="mdi-history"
              @click="() => { filmFilterStore.pureFilters(); filmFilterStore.viewed = true; filmFilterStore.setFullreload(true); }" />
          </NuxtLink>
        </template>
      </v-tooltip>
      <NavbarThemeButton :themes=theme_items />
      <template v-if="status === 'authenticated'">
        <v-divider class="me-4" vertical=""></v-divider>
        <NavbarProfileButton />
        <v-divider class="ms-4" vertical=""></v-divider>
      </template>

      <NavbarAuthDropdown />
    </div>
  </div>
</template>
