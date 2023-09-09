

export const useFilmSorterStore = defineStore('filmSorter', {
    state: () => ({
        sort: 'popularLatest',
    }),
    actions: {
        popularLatest(){
            this.sort = 'popularLatest';
        },
        mostPopular(){
            this.sort = 'mostPopular';
        },
        latest(){
            this.sort = 'latest';
        }
    },
})