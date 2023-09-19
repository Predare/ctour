export const useCommentsFormStore = defineStore('commentForm', {
    state: () => ({
        repliedComment: null,
        text: '',
    }),
})