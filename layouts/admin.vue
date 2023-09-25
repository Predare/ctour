<script setup>
import { useSessionStore } from '~/stores/session';

const { status, getSession } = useAuth();
if (!useSessionStore?.session?.id) {
    useSessionStore.session = await getSession();
}
</script>

<template>
    <v-layout class="rounded rounded-md">
        <NuxtLoadingIndicator />
        <v-app-bar title="Application bar"></v-app-bar>
        <AdminNavigationDrawer />

        <v-main class="d-flex align-center justify-center my-10" style="min-height: 300px;">
            <slot></slot>
        </v-main>
    </v-layout>
</template>