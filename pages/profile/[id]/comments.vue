<script setup>
const id = useRoute().params.id;
const {data: user} = await useFetch(`/api/user/${id}`
);
const showForm = ref(false);
console.log('here');
const commentLinks = computed(() => {
    return formatGetCommentsLink().user(id);
});
</script>

<template>
    <div>
        <CommentsWidget class="bg-surface-lighten-1 rounded-md" style="padding: 2rem;" :showForm="showForm"
            :api="commentLinks">
            <template v-slot:title>
                <NuxtLink :to="`/profile/${id}`">
                    <p class="text-h6">Все комментарии <span class="text-primary lowercase">{{ user?.name }}</span></p>
                </NuxtLink>
            </template>
        </CommentsWidget>
    </div>
</template>