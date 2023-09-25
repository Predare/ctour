<script setup>
const props = defineProps({ sendForm: Function });

const selectFilmType = ref('FILM');
const selectQuality = ref('');
const selectRatingKinopoisk = ref('');
const selectRatingImdb = ref('');
const selectYearStart = ref('');
const selectYearEnd = ref('');
const selectAgeRestriction = ref('');
const selectGenre = ref([]);
const selectDirector = ref([]);
const selectActor = ref([]);
const selectSelection = ref([]);
const selectVoiceStudio = ref('');
const selectCountry = ref([]);

const { data } = useFetch('/api/admin/film/filters');

const name = ref('');
const description = ref('');
const filmTypes = [{ name: 'Фильм', value: 'FILM' }, { name: 'Сериал', value: 'SERIAL' }];
const genres = ['ACTION', 'COMEDY', 'DRAMA', 'ROMANCE', 'THRILLER'];
const directors = ['Torrantino', 'Mikki Rurk', 'Jo Johnson'];
const actors = ['Torrantino', 'Mikki Rurk', 'Jo Johnson'];
const selection = ['Весело живём', 'Тупой и ещё тупее', 'Пляшем'];
const voices = ['Кубик в кубе', 'Кураж Бомбей', 'LostFilm'];
const countries = ['Казахстан', 'Россия', 'США'];

function getFormData() {
    return {
        name: name.value,
        description: description.value,
        filmType: selectFilmType.value,
        quality: selectQuality.value,
        ratingKinopoisk: selectRatingKinopoisk.value,
        ratingImdb: selectRatingImdb.value,
        yearStart: selectYearStart.value,
        yearEnd: selectYearEnd.value,
        ageRestriction: selectAgeRestriction.value,
        genres: selectGenre.value,
        directors: selectDirector.value,
        actors: selectActor.value,
        selections: selectSelection.value,
        voiceStudios: selectVoiceStudio.value,
        countries: selectCountry.value
    }
}

const rules = {
    onlyNumber: (value) => {
        return /^\d+$/.test(value) || 'Только цифры';
    },
    required: (value) => !!value || 'Обязательное поле',
    yearFormat: (value) => {
        return /^\d{4}$/.test(value) || 'Только 4 цифры';
    },
    ratingFormat: (value) => {
        return /^\d{1}0{0,1}.\d{1}$/.test(value) || 'Только нецелое число 0 от 10';
    }
};
</script>

<template>
    <v-sheet width="600" class="mx-auto bg-surface-lighten-1 rounded">
        <v-form @submit.prevent="sendForm(getFormData())">
            <v-container>
                <v-row>
                    <v-col cols="4">
                        <v-file-input prepend-icon="mdi-image" label="Постер"></v-file-input>
                        <v-tooltip location="bottom" text="Добавить постер" activator="parent"></v-tooltip>
                    </v-col>
                    <v-col cols="8">
                        <v-text-field :rules="[rules.required]" prepend-icon="mdi-format-title" v-model="name" label="Название"
                            required></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-text-field :rules="[rules.required, rules.ratingFormat]" prepend-icon="mdi-alpha-k"
                            v-model="selectRatingKinopoisk" label="Рейтинг: Кинопоиск" required></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field :rules="[rules.required, rules.ratingFormat]" prepend-icon="mdi-alpha-i"
                            v-model="selectRatingImdb" label="Рейтинг: Imdb" required></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4">
                        <v-text-field :rules="[rules.required, rules.onlyNumber, rules.yearFormat]"
                            v-model="selectYearStart" label="Год выхода" required></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field :rules="[rules.required, rules.onlyNumber, rules.yearFormat]" v-model="selectYearEnd"
                            label="Год окончания" required></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <div class="flex">
                            <p class="pt-2">Тип фильма:</p>
                            <v-radio-group :rules="[rules.required]" inline v-model="selectFilmType" required>
                                <v-radio v-for="(i, index) in filmTypes" :key="index" :label="i.name"
                                    :value="i.value"></v-radio>
                            </v-radio-group>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-text-field :rules="[rules.required, rules.onlyNumber]" v-model="selectAgeRestriction"
                            label="Ограничение возраста" required></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field :rules="[rules.required]" v-model="selectQuality" label="Качество" required></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-textarea :rules="[rules.required]" prepend-icon="mdi-text-long" v-model="description" label="Описание"
                            required></v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-select :rules="[rules.required]" prepend-icon="mdi-account-group" multiple v-model="selectDirector" :items="directors"
                            label="Режиссеры" required></v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-select :rules="[rules.required]" prepend-icon="mdi-account-group" multiple v-model="selectActor" :items="actors"
                            label="Актёры" required></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-select :rules="[rules.required]" multiple v-model="selectGenre" :items="genres" label="Жанр" required></v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-select :rules="[rules.required]" prepend-icon="fa:fa-solid fa-earth-americas" multiple v-model="selectCountry"
                            :items="countries" label="Страна" required></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-select :rules="[rules.required]" prepend-icon="fa:fa-solid fa-puzzle-piece" multiple v-model="selectSelection"
                            :items="selection" label="Подборка" required></v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-select prepend-icon="fa:fa-solid fa-microphone" multiple v-model="selectVoiceStudio"
                            :items="voices" label="Студия озвучки" required></v-select>
                    </v-col>
                </v-row>
            </v-container>
            <v-btn type="submit" color="primary" block class="mt-2">Submit</v-btn>
        </v-form>
    </v-sheet>
</template>