<script setup>
import { useSessionStore } from '~/stores/session';

useSeoMeta({
    title: '[title]',
    description: '[description]',
    ogTitle: '[og:title]',
    ogDescription: '[og:description]',
    ogImage: '[og:image]',
    ogUrl: '[og:url]',
    twitterTitle: '[twitter:title]',
    twitterDescription: '[twitter:description]',
    twitterImage: '[twitter:image]',
    twitterCard: 'summary'
})

useHead({
    htmlAttrs: {
        lang: 'en'
    },
    link: [
        {
            rel: 'icon',
            type: 'image/png',
            href: '/favicon.png'
        }
    ]
});

const { status } = useAuth();
if (!useSessionStore.session) {
    const { getSession } = useAuth();
    useSessionStore.session = await getSession();
}
</script>

<template>
    <v-layout>
        <NuxtLoadingIndicator />
        <Navbar></Navbar>
        <div class="flex flex-col w-full">
            <v-container fluid class="bg-surface-lighten-2 pb-10 pt-[20px] px-10"
                style="max-width: 1500px; padding-top: 5rem;">
                <v-row justify="center" align="start">
                    <v-col cols="9" class="pt-0">
                        <slot></slot>
                    </v-col>
                    <v-col cols="3" class="pt-0 pe-0">
                        <SidebarMain v-if="status === 'authenticated'"/>
                    </v-col>
                </v-row>
            </v-container>
            <Footer class="bg-surface-lighten-1"></Footer>
        </div>
    </v-layout>
</template>