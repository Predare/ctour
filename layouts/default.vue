<template>
    <v-layout>
        <NuxtLoadingIndicator />
        <Navbar></Navbar>
        <div class="flex flex-col w-full">
            <v-container fluid class="bg-surface-lighten-2 pb-10 pt-[20px] px-10" style="max-width: 1500px; padding-top: 5rem;">
                <v-row justify="center" align="start">
                    <v-col cols="9" class="pt-0">
                        <slot></slot>
                    </v-col>
                    <v-col cols="3" class="pt-0 pe-0">
                        <SidebarMain />
                    </v-col>
                </v-row>
            </v-container>
            <Footer class="bg-surface-lighten-1"></Footer>
        </div>
    </v-layout>
</template>