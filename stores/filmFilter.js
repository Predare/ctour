export const sortTypes = {
    popularLatest: 'popularLatest',
    mostPopular: 'mostPopular',
    latest: 'latest',
};

export const useFilmFilterStore = defineStore('filmFilter', {
    state: () => ({
        type: 'FILM',
        genre: [],
        voice: [],
        selection: [],
        yearFrom: 0,
        yearTo: 0,
        country: '',
        actor: [],
        director: [],
        page: 0,
        sort: sortTypes.popularLatest,
        viewed: false,
        favorite: false,
        fullreload: false,
    }),
    actions: {
        /**
         * Set the type of the film, serial or movie.
         *
         * @param {type} type - the type to set
         * @return {void} This function does not return anything.
         */
        setType(type) {
            this.type = type;
            this.setFullreload(true);
        },
        /**
         * Set the genres of the object.
         *
         * @param {Array<String>} genres - the genres to be set
         * @return {void} This function does not return anything.
         */
        setGenre(genres) {
            this.genre = genres;
            this.setFullreload(true);
        },
        /**
         * Clears the genre array and sets the full reload flag to true.
         */
        clearGenres() {
            this.genre = [];
            this.setFullreload(true);
        },
        /**
         * Set the voices of the object.
         *
         * @param {Array<String>} voices - the voices to be set
         * @return {void} This function does not return anything.
         */
        setVoice(voices) {
            this.voice = voices;
            this.setFullreload(true);
        },
        /**
         * Clears the voices array and sets fullreload to true.
         */
        clearVoices() {
            this.voice = [];
            this.setFullreload(true);
        },
        /**
         * Set the selections of the object.
         *
         * @param {Array<String>} selections - the selections to be set
         * @return {void} This function does not return anything.
         */
        setSelection(selections) {
            this.selection = selections;
            this.setFullreload(true);
        },
        /**
         * Clears the selections by resetting the selection array and setting the full reload flag to true.
         * @return {type} description of return value
         */
        clearSelections() {
            this.selection = [];
            this.setFullreload(true);
        },
        /**
         * Set the year from which the data should be retrieved and
         * triggers a full reload.
         *
         * @param {number} yearFrom - The year from which the data should be retrieved.
         * @return {void} This function does not return anything.
         */
        setYearFrom(yearFrom) {
            this.yearFrom = yearFrom;
            this.setFullreload(true);
        },
        /**
         * Sets the value of the 'yearTo' property to the specified year and
         * triggers a full reload.
         *
         * @param {number} yearTo - The year to set.
         * @return {void} This function does not return anything.
         */
        setYearTo(yearTo) {
            this.yearTo = yearTo;
            this.setFullreload(true);
        },
        /**
         * Sets the country and triggers a full reload.
         *
         * @param {string} country - the country to set
         * @return {void} This function does not return anything.
         */
        setCountry(country) {
            this.country = country;
            this.setFullreload(true);
        },
        /**
         * Clears the country and sets the full reload flag to true.
         * @return {void} This function does not return anything.
         */
        clearCountry() {
            this.country = '';
            this.setFullreload(true);
        },
        /**
         * Sets the actor.
         *
         * @param {type} actor - The actor to be set.
         * @return {void} This function does not return anything.
         */
        setActor(actor) {
            this.actor = actor;
            this.setFullreload(true);
        },
        /**
         * Clears the actors array and sets full reload to true.
         * @return {void} This function does not return anything.
         */
        clearActors() {
            this.actor = [];
            this.setFullreload(true);
        },
        /**
         * Sets the director of the object.
         *
         * @param {type} director - The director to be set.
         * @return {void} This function does not return anything.
         */
        setDirector(director) {
            this.director = director;
            this.setFullreload(true);
        },
        /**
         * Clears the `director` array and sets the `fullreload` property to `true`.
         * @return {void} This function does not return anything.
         */
        clearDirectors() {
            this.director = [];
            this.setFullreload(true);
        },
        /**
         * Set the catalogue page to the specified value.
         *
         * @param {type} page - The page to set.
         * @return {void} This function does not return anything.
         */
        setPage(page) {
            this.page = page;
            this.setFullreload(true);
        },
        setFullreload(value) {
            this.fullreload = value;
        },
        /**
         * Sets the sort type for films catalogue.
         *
         * @param {type} sort - the sort type to be set
         * @return {void} This function does not return anything.
         */
        setSort(sort) {
            if (Object.values(sortTypes).includes(sort)) {
                this.sort = sort;
                this.setFullreload(true);
            }
        },
        /**
         * Sets all the filters to their initial values.
         *
         * @return {void} 
         */
        pureFilters() {
            this.clearGenres();
            this.clearVoices();
            this.clearSelections();
            this.setYearFrom(null);
            this.setYearTo(null);
            this.clearCountry();
            this.clearActors();
            this.clearDirectors();
            this.setPage(0);
            this.clearViewed();
            this.clearFavorite();
        },
        /**
         * Sets the value of the 'viewed' property and triggers a full reload.
         *
         * @param {boolean} value - The new value for the 'viewed' property.
         */
        setViewed(value) {
            this.viewed = value;
            this.setFullreload(true);
        },
        /**
         * Clears the viewed status and triggers a full reload.
         * @return {void} 
         */
        clearViewed() {
            this.viewed = false;
            this.setFullreload(true);
        },
        /**
         * Sets the value of the 'favorite' property and triggers a full reload.
         *
         * @param {boolean} value - The new value for the 'favorite' property.
         */
        setFavorite(value) {
            this.favorite = value;
            this.setFullreload(true);
        },
        /**
         * Clears the favorite status and triggers a full reload.
         * @return {void} 
         */
        clearFavorite() {
            this.favorite = false;
            this.setFullreload(true);
        }
    },
    getters: {
        getFilters: (state) => {
            return {
                type: state.type,
                genre: state.genre,
                voice: state.voice,
                selection: state.selection,
                yearFrom: state.yearFrom,
                yearTo: state.yearTo,
                country: state.country,
                actor: state.actor,
                director: state.director,
                page: state.page,
                sort: state.sort,
                viewed: state.viewed,
                favorite: state.favorite,
            };
        },
        /**
         * Взять значения фильтров для поиска
         * @param {*} state 
         * @returns 
         */
        getFilterValues: (state) => {
            return {
                type: state.type,
                genre: state.genre,
                voice: state.voice,
                selection: state.selection.map((item) => {
                    return item.name;
                }),
                yearFrom: state.yearFrom,
                yearTo: state.yearTo,
                country: state.country,
                actor: state.actor.map((item) => {
                    return item.name;
                }),
                director: state.director.map((item) => {
                    return item.name;
                }),
                page: state.page,
                sort: state.sort,
                viewed: state.viewed,
                favorite: state.favorite,
            }
        }
    }
})