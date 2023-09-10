<template>
    <v-container>
        <v-row>
            <p class="text-h6">Комментарии</p>
        </v-row>
        <v-row>
            <ClientOnly>
                <CommentsContainer />
            </ClientOnly>
        </v-row>
        <v-row class="justify-center mt-5">
            <CommentsLoadNextButton />
        </v-row>
        <v-row>
            <CommentsForm></CommentsForm>
        </v-row>
    </v-container>
</template>