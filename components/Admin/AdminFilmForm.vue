<script setup>
const props = defineProps({ sendForm: Function });

const selectFilmType = ref('FILM');
const selectQuality = ref('');
const selectRatingKinopoisk = ref('');
const selectRatingImdb = ref('');
const selectYearStart = ref('');
const selectYearEnd = ref('');
const selectAgeRestriction = ref('');
const selectedGenres = ref([]);
const selectedDirectors = ref([]);
const selectedActors = ref([]);
const selectedSelections = ref([]);
const selectedVoiceStudios = ref([]);
const selectedCountries = ref([]);

const name = ref('');
const description = ref('');
const filmTypes = [{ name: 'Фильм', value: 'FILM' }, { name: 'Сериал', value: 'SERIAL' }];

const form = ref(null);

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
        genres: selectedGenres.value,
        directors: selectedDirectors.value,
        actors: selectedActors.value,
        selections: selectedSelections.value,
        voiceStudios: selectedVoiceStudios.value,
        countries: selectedCountries.value
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
    moreThanYearStart: (value) => {
        return value > unref(selectYearStart) || 'Дата окончания не может быть раньше даты выхода';
    },
    ratingFormat: (value) => {
        return /^\d{1}0{0,1}.\d{1}$/.test(value) || 'Только нецелое число 0 от 10';
    },
    ageFormat: (value) => {
        return /^\d{1,2}$/.test(value) || 'Возраст должен быть от 0 до 99';
    }
};

async function validate() {
    const { valid } = await unref(form).validate();
    if (!valid) return valid;
    props.sendForm(getFormData());
}

function addItemToArray(array, item) {
    array.push(item)
}

function removeItemFromArray(array, item) {
    array.splice(array.indexOf(item), 1);
}
</script>

<template>
    <v-sheet width="600" class="mx-auto bg-surface-lighten-1 rounded">
        <v-form ref="form" @submit.prevent="validate">
            <v-container>
                <v-row>
                    <v-col cols="4">
                        <v-file-input prepend-icon="mdi-image" label="Постер"></v-file-input>
                        <v-tooltip location="bottom" text="Добавить постер" activator="parent"></v-tooltip>
                    </v-col>
                    <v-col cols="8">
                        <v-text-field :rules="[rules.required]" prepend-icon="mdi-format-title" v-model="name"
                            label="Название" required></v-text-field>
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
                        <v-text-field prepend-icon="fa:fa-regular fa-calendar-days"
                            :rules="[rules.required, rules.yearFormat]" v-model="selectYearStart" label="Год выхода"
                            required></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field prepend-icon="fa:fa-regular fa-calendar-plus"
                            :rules="[rules.onlyNumber, rules.yearFormat, rules.moreThanYearStart]" v-model="selectYearEnd"
                            label="Год окончания"></v-text-field>
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
                        <v-text-field prepend-icon="fa:fa-solid fa-children" :rules="[rules.ageFormat]"
                            v-model="selectAgeRestriction" label="Ограничение возраста" required></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field prepend-icon="fa:fa-solid fa-video" :rules="[rules.required]" v-model="selectQuality"
                            label="Качество" required></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-textarea :rules="[rules.required]" prepend-icon="mdi-text-long" v-model="description"
                            label="Описание" required></v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <AdminSearchWidget :selectedItems="selectedDirectors"
                            :addItem="(item) => addItemToArray(selectedDirectors, item)"
                            :removeItem="(item) => removeItemFromArray(selectedDirectors, item)" placeholder="Режиссёры"
                            searchIndex="movies" icon="mdi-account-group">
                        </AdminSearchWidget>
                    </v-col>
                    <v-col cols="6">
                        <AdminSearchWidget :selectedItems="selectedActors"
                            :addItem="(item) => addItemToArray(selectedActors, item)"
                            :removeItem="(item) => removeItemFromArray(selectedActors, item)" placeholder="Актёры"
                            searchIndex="movies" icon="mdi-account-group">
                        </AdminSearchWidget>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <AdminSearchWidget :selectedItems="selectedGenres"
                            :addItem="(item) => addItemToArray(selectedGenres, item)"
                            :removeItem="(item) => removeItemFromArray(selectedGenres, item)" placeholder="Жанр"
                            searchIndex="genres" icon="fa:fa-solid fa-masks-theater">
                        </AdminSearchWidget>
                    </v-col>
                    <v-col cols="6">
                        <AdminSearchWidget :selectedItems="selectedCountries"
                            :addItem="(item) => addItemToArray(selectedCountries, item)"
                            :removeItem="(item) => removeItemFromArray(selectedCountries, item)" placeholder="Страна"
                            searchIndex="movies" icon="fa:fa-solid fa-earth-americas">
                        </AdminSearchWidget>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <AdminSearchWidget :selectedItems="selectedSelections"
                            :addItem="(item) => addItemToArray(selectedSelections, item)"
                            :removeItem="(item) => removeItemFromArray(selectedSelections, item)" placeholder="Подборка"
                            searchIndex="movies" icon="fa:fa-solid fa-puzzle-piece">
                        </AdminSearchWidget>
                    </v-col>
                    <v-col cols="6">
                        <AdminSearchWidget :selectedItems="selectedVoiceStudios"
                            :addItem="(item) => addItemToArray(selectedVoiceStudios, item)"
                            :removeItem="(item) => removeItemFromArray(selectedVoiceStudios, item)"
                            placeholder="Студия озвучки" searchIndex="movies" icon="fa:fa-solid fa-microphone">
                        </AdminSearchWidget>
                    </v-col>
                </v-row>
        </v-container>
        <v-btn type="submit" color="primary" block class="mt-2">Submit</v-btn>
    </v-form>
</v-sheet></template>