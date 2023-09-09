<script setup>
const { status } = useAuth();

import { useSearchFormStore } from '@/stores/searchForm';

const searchFormStore = useSearchFormStore()

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

const { data: genres } = await useFetch('/api/catalogueFilters/genre');
const { data: selections } = await useFetch('/api/catalogueFilters/selection');
const { data: voices } = await useFetch('/api/catalogueFilters/voice');

import { useFilmStore } from '@/stores/film';
const filmStore = useFilmStore();
const filmLink = computed(() => filmStore?.film?.link ? '/film/' + filmStore?.film?.link : '');

import { useFilmFilterStore } from '@/stores/filmFilter';
const filmFilterStore = useFilmFilterStore();

function setFilmType(name){
  filmFilterStore.pureFilters();
  filmFilterStore.setType(name);
  filmFilterStore.setFullreload(true);
}

const route = useRoute();
</script>

<template>
  <div class="absolute w-full flex flex-row justify-between bg-surface-lighten-1">
    <NuxtLink :to="filmLink ? `${filmLink}` : '/'">
      <v-btn :prepend-icon="!route.path.startsWith('/film/') && filmLink ? 'mdi-chevron-left' : ''" rounded="0" size="large" class="min-h-[50px]" variant="text">LionFilm</v-btn>
    </NuxtLink>

    <div class="flex flex-row items-center">
      <NuxtLink to="/" @click="setFilmType('FILM')">
        <v-btn rounded="0" class="min-h-[50px]" variant="text">Фильмы</v-btn>
      </NuxtLink>
      <NuxtLink to="/" @click="setFilmType('SERIAL')">
        <v-btn rounded="0" class="min-h-[50px]" variant="text">Сериалы</v-btn>
      </NuxtLink>
      <NavbarDropdown title="Жанры" :items="genres" :setter="filmFilterStore.setGenre"/>
      <NavbarDropdown title="Озвучка" :items="voices" :setter="filmFilterStore.setVoice"/>
      <NavbarDropdown title="Подборки" :items="selections" :setter="filmFilterStore.setSelection"/>
      <v-tooltip location="bottom" text="Поиск">
        <template v-slot:activator="{ props }">
          <NuxtLink to="/?search=true">
            <v-btn rounded="0" @click="searchFormStore.openForm" v-bind="props" variant="text" class="min-h-[50px]" icon="mdi-magnify" />
          </NuxtLink>
        </template>
      </v-tooltip>
    </div>

    <div class="flex flex-row items-center">
      <v-tooltip location="bottom" text="Случайное">
        <template v-slot:activator="{ props }">
          <NuxtLink to="/?random=true">
            <v-btn rounded="0" v-bind="props" variant="text" class="min-h-[50px]" icon="mdi-dice-5" />
          </NuxtLink>
        </template>
      </v-tooltip>
      <v-tooltip location="bottom" text="Закладки">
        <template v-slot:activator="{ props }">
          <NuxtLink to="/?bookmarks=true">
            <v-btn rounded="0" v-bind="props" variant="text" class="min-h-[50px]" icon="mdi-bookmark-outline" />
          </NuxtLink>
        </template>
      </v-tooltip>
      <v-tooltip location="bottom" text="История просмотра">
        <template v-slot:activator="{ props }">
          <NuxtLink to="/?history=true">
            <v-btn rounded="0" v-bind="props" variant="text" class="min-h-[50px]" icon="mdi-history" />
          </NuxtLink>
        </template>
      </v-tooltip>
      <NavbarThemeButton :themes=theme_items />
      <template v-if="status === 'authenticated'">
        <v-divider class="me-4" vertical=""></v-divider>
      <NavbarProfileButton/>
      <v-divider class="ms-4" vertical=""></v-divider>
      </template>
      
      <NavbarAuthDropdown/>
    </div>
  </div>
</template>
