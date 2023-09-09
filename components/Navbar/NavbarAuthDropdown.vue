<script setup>
const { signIn, signOut, getProviders, status } = useAuth();

const authIcons = {
    github: 'fa:fas fa-brands fa-github',
    vk: 'fa:fas fa-brands fa-vk',
    yandex: 'fa:fas fa-brands fa-yandex',
    google: 'fa:fas fa-brands fa-google',
};

const providers = ref({});
getProviders().then((res) => {
    providers.value = res;
});
</script>

<template>
    <v-menu v-if="status === 'unauthenticated'" open-on-hover open-delay="100">
        <template v-slot:activator="{ props }">
            <v-btn rounded="0" class="min-h-[50px]" variant="text" v-bind="props" append-icon="mdi-chevron-down">
                Войти
            </v-btn>
        </template>
        <v-list>
            <v-btn v-for="(provider) in providers" variant="plain" :key="provider.name"
                :icon="authIcons[provider.id]" @click="signIn(provider.id)"></v-btn>
        </v-list>
    </v-menu>
    <v-btn v-else @click="signOut()" rounded="0" class="min-h-[50px]" variant="text" >Выйти</v-btn>
</template>