<template>
    <div class="flex flex-col items-center">
        <div class="sm:w-[550px] w-[300px] sm:h-[400px] h-[250px] bg-secondary-darken-4">
            <div class="flex flex-row justify-between pa-0 bg-primary">
                <div class="flex flex-row items-center">
                    <v-btn class="rounded-0" variant="plain">Плеер 1</v-btn>
                    <v-btn class="rounded-0" variant="plain">Плеер 2</v-btn>
                </div>
                <div class="flex flex-row items-center">
                    <v-switch color="primary-darken-2" density="compact" hide-details="auto" label="Свет">
                    </v-switch>
                    <v-btn class="rounded-0" prepend-icon="mdi-alert" variant="plain">Жалоба</v-btn>
                </div>
            </div>
        </div>
        <div class="m-0 mt-2 opacity-60 text-subtitle-1">Понравилось? Поделитесь!</div>
        <div class="flex flex-row gap-3 justify-center">
            <SocialButtonsVK/>
            <SocialButtonsFacebook/>
            <SocialButtonsOK/>
            <SocialButtonsTelegram/>
            <SocialButtonsTwitter/>
            <SocialButtonsMoiMir/>
        </div>
    </div>
</template>
