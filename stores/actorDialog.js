export const useActorDialogStore = defineStore('actorDialog', {
    state: () => ({
        isOpen: false,
        id: 1,
        name: 'no name',
        isLoading: false,
    }),
    actions: {
        async openDialog(id){
            this.isOpen = true;
            this.isLoading = true;
            await this.fetchInfo(id);
        },
        async fetchInfo(id){
            const { data } = await useFetch(`/api/getActorInfo/${id}`);
            this.id = data.value.id;
            this.name = data.value.name;

            this.isLoading = false;
        },
        closeDialog(){
            this.isOpen = false;
        }
    },
})