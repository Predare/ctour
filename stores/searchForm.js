export const useSearchFormStore = defineStore('searchForm', {
    state: () => ({
        expand: false,
    }),
    actions: {
        openForm(){
            this.expand = true;
        },
        closeForm(){
            this.expand = false;
        },
        changeStatus(){
            this.expand = !this.expand;
        }
    },
})