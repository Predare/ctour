import { useFilmFilterStore } from "./filmFilter";

export const useCatalogueFilmStore = defineStore('catalogueFilms', {
    state: () => ({
        films: [],
        page: 1,
        cursor: null,
        count: 0,
    }),
    actions: {
        set(films) {
            this.films = films;
        },
        clear() {
            this.cursor = null;
            this.films = [];
        },
        push(films) {
            this.films.push(...films);
        },
        shift(films) {
            this.films.unshift(...films);
        },
        nextPage() {
            const filmFiltersStore = useFilmFilterStore();
            const filters = filmFiltersStore.getFilters;
            var params = '';
            for (var key of Object.keys(filters)) {
                if (filters[key]) {
                    params += key + '=' + filters[key] + '&';
                }
            }
            const link = computed(() => { return `/api/catalogue/?page=${this.page}&cursor=${this.cursor}&${params}`});
            $fetch(link.value).then(response => {
                this.push(response.films);
                this.cursor = response.cursor;
                this.count = response.count;
                filmFiltersStore.setFullreload(false);
            });
        },
        changePage(page) {
            this.clear();
            this.page = page;
            this.nextPage();
        },
    },
})