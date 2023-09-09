import { useFilmStore } from "./film";

export const useCommentsStore = defineStore('comments', {
    state: () => ({
        comments: [],
        cursor: null,
    }),
    actions: {
        setComments(comments) {
            this.comments = comments;
        },
        clearComments() {
            this.comments = [];
        },
        pushComments(newComments) {
            this.comments.push(...newComments);
        },
        shiftComments(comments) {
            this.comments.unshift(...comments);
        },
        loadNextPage() {
            const filmStore = useFilmStore();
            const link = computed(() => { return `/api/comments/${filmStore.film.link}/?cursor=${this.cursor}` });
            $fetch(link.value).then(response => {
                this.pushComments(response.comments);
                this.cursor = response.cursor;
            });
        }
    },
})