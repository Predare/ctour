export const useCommentsStore = defineStore('comments', {
    state: () => ({
        comments: [],
        cursor: null,
        getLink: null, //Ссылка по которой получать комментарии
        getNext: false,
        postLink: null,
    }),
})