export const sortTypes = {
    popularLatest: 'popularLatest',
    mostPopular: 'mostPopular',
    latest: 'latest',
};

export const useFilmFilterStore = defineStore('filmFilter', {
    state: () => ({
        type: 'FILM',
        genre: '',
        voice: '',
        selection: '',
        yearFrom: 0,
        yearTo: 0,
        country: '',
        actor: '',
        director: '',
        page: 0,
        sort: sortTypes.popularLatest,
        fullreload: false,
    }),
    actions: {
        setType(type) {
            this.type = type;
        },
        setGenre(genre) {
            this.genre = genre;
        },
        setVoice(voice) {
            this.voice = voice;
        },
        setSelection(selection) {
            this.selection = selection;
        },
        setYearFrom(yearFrom) {
            this.yearFrom = yearFrom;
        },
        setYearTo(yearTo) {
            this.yearTo = yearTo;
        },
        setCountry(country) {
            this.country = country;
        },
        setActor(actor) {
            this.actor = actor;
        },
        setDirector(director) {
            this.director = director;
        },
        setPage(page) {
            this.page = page;
        },
        setFullreload(value) {
            this.fullreload = value;
        },
        setSort(sort) {
            if (Object.values(sortTypes).includes(sort)) {
                this.sort = sort;
            }
        },
        pureFilters(){
            this.setGenre('');
            this.setVoice('');
            this.setSelection('');
            this.setYearFrom(0);
            this.setYearTo(0);
            this.setCountry('');
            this.setActor('');
            this.setPage(0);
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
                page: state.page,
                sort: state.sort,
            };
        }
    }
})