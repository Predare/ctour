<template>
    <div class="flex flex-col items-center w-full mb-0">
        <v-divider :thickness="1" color="success" class="w-full"></v-divider>
        <div class="flex flex-col sm:flex-row sm:items-start items-center sm:gap-20 gap-2">
            <div class="flex flex-col items-center text-center">
                <p class="text-2xl text-bold mt-5 mb-2">Статьи и новости</p>
                <div class="flex flex-row gap-3">
                    <v-btn density="comfortable"  class="pb-1" variant="plain" icon="fa:fa-brands fa-telegram"></v-btn>
                    <v-btn density="comfortable"  class="text-left pb-1" variant="plain" icon="fa:fas fa-lock"></v-btn>
                    <v-btn density="comfortable"  class="text-left pb-1" variant="plain" icon="fa:fa-brands fa-vk"></v-btn>
                </div>
            </div>
            <div class="flex flex-col items-center gap-2 text-center">
                <p class="text-2xl text-bold mt-5 mb-4">Обратная связь</p>
                <v-btn density="comfortable"  variant="outlined">Задать вопрос</v-btn>
                <div class="flex flex-row gap-2 items-center">
                    <v-btn density="comfortable"  class="pb-1" variant="plain" icon="fa:fa-brands fa-telegram"></v-btn>
                    <v-btn density="comfortable"  class="text-left pb-1" variant="plain" icon="fa:fas fa-lock"></v-btn>
                    <v-btn density="comfortable"  class="text-left pb-1" variant="plain" icon="fa:fa-brands fa-vk"></v-btn>
                </div>
                <v-btn variant="plain">v2Lxv@example.com</v-btn>
                <a class="text-subtitle-1 hover:text-primary" href='#'></a>
            </div>
        </div>
        <v-btn class="hover:text-primary sm:self-end me-5 mb-1 max-sm:mt-7"  variant="plain">Правообладателям</v-btn>
    </div>
</template>