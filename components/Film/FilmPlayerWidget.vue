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
            <SocialButton link='https://vkontakte.ru/share.php?url=http://localhost:3000/film/fies'
                icon="fa:fas fa-brands fa-vk" tooltipText="ВКонтакте" />
            <SocialButton link='https://www.facebook.com/sharer.php?u=http://localhost:3000/film/fies'
                icon="fa:fas fa-brands fa-facebook" tooltipText="Facebook" />
            <SocialButton
                link='https://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl=http://localhost:3000/film/fies&st.comments=ОПИСАНИЕ"'
                icon="fa:fas fa-brands fa-odnoklassniki" tooltipText="Одноклассники" />
            <SocialButton link='https://telegram.me/share/url?url=http://localhost:3000/film/fies"'
                icon="fa:fas fa-brands fa-telegram" tooltipText="Телеграм" />
            <SocialButton link='https://twitter.com/intent/tweet?text=Title. Description. http://localhost:3000/film/fies"'
                icon="fa:fas fa-brands fa-twitter" tooltipText="Twitter" />
            <SocialButton link='https://connect.mail.ru/share?url=http://localhost:3000/film/fies"' icon="mdi-share"
                tooltipText="Мой мир" />
        </div>
    </div>
</template>
