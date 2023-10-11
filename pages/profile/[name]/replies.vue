<script setup>
const name = useRoute().params.name;
const {data: user} = await useFetch(`/api/user/${name}`
);
const showForm = ref(false);

const commentLinks = computed(() => {
    return formatGetCommentsLink().repliesToUser(name);
});
</script>

<template>
    <div>
        <CommentsWidget class="bg-surface-lighten-1 rounded-md" style="padding: 2rem;" :showForm="showForm"
            :api="commentLinks">
            <template v-slot:title>
                <NuxtLink :to="`/profile/${name}`">
                    <p class="text-h6">Все ответы для <span class="text-primary lowercase">{{ user?.name }}</span></p>
                </NuxtLink>
            </template>
        </CommentsWidget>
    </div>
</template>