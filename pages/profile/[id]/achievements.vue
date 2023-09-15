<script setup>
const route = useRoute();
const achievements = ref([]);
const cursor = ref(0);
$fetch(`/api/user/${route.params.id}/achievements/all/?cursor=${toValue(cursor)}`).then((res) => {
    achievements.value.push(...res.achievements);
    cursor.value = res.cursor;
});
</script>

<template>
    <div class="flex flex-col gap-2 bg-surface-lighten-1 rounded-md p-[2rem]">
        <template v-for="(i, index) in achievements" :key="i.id">
            <ProfileAchievement :id="i.id" :icon="i.icon" :name="i.name" :description="i.description" :reward="i.reward" :completed="i._count.completedUsers === 1"/>
            <v-divider v-show="index < achievements.length - 1"></v-divider>
        </template>
    </div>
</template>