import { useFilmFilterStore } from "./filmFilter";

export const useCatalogueFilmStore = defineStore('catalogueFilms', {
    state: () => ({
        films: [], // Каталог загруженных фильмов
        page: 1, // Текущая страница каталога
        cursor: null, // Курсор каталога для следующей страницы
        count: 0, // Количество фильмов в каталоге
    }),
    actions: {
        /**
         * Установить каталог фильмов
         * @param {Array} films
         * */
        set(films) {
            this.films = films;
        },
        /**
         * Отчистить каталог фильмов
         */
        clear() {
            this.cursor = null;
            this.films = [];
            this.count = 0;
        },
        /**
         * Добавить фильм в каталог
         * @param {Object} film
         */
        add(film) {
            this.films.push(film);
        },
        /**
         * Добавить фильмы в каталог
         * @param {Array} films
         */
        push(films) {
            this.films.push(...films);
        },
        /**
         * Добавить фильмы в начало каталога
         * @param {Array} films
         * */
        shift(films) {
            this.films.unshift(...films);
        },
        /**
         * Загрузить новую страницу с фильмами
         * */
        nextPage() {
            const filmFiltersStore = useFilmFilterStore();
            const filters = filmFiltersStore.getFilterValues;
            var params = '';
            for (var key of Object.keys(filters)) {
                if (filters[key]) {
                    params += key + '=' + filters[key] + '&';
                }
            }
            const link = computed(() => { return `/api/catalogue/?page=${this.page}&cursor=${this.cursor}&${params}` });
            $fetch(link.value).then(response => {
                this.push(response.films);
                this.cursor = response.cursor;
                this.count = response.count;
                filmFiltersStore.setFullreload(false);
            });
        },
        /**
         * Загрузить отедьную страницу с фильмами
         * @param {Number} page
         */
        changePage(page) {
            this.clear();
            this.page = page;
            this.nextPage();
        },
    },
})