<script setup>
const form = ref(null);
const dialog = ref(false);
const name = ref('');
const emoji = ref('');
const rules = {
    required: (value) => !!value || 'Обязательное поле',
}

async function validate() {
    const { valid } = await unref(form).validate();
    if (!valid) return valid;
    const response = await $fetch('/api/admin/genre/create', {
        method: 'POST',
        body: JSON.stringify({
            name: unref(name),
            emoji: unref(emoji),
        })
    });
}
</script>

<template>
    <v-dialog v-model="dialog" activator="parent" width="auto">
        <v-form ref="form" @submit.prevent="validate">
            <v-card>
                <v-card-text>
                    <v-text-field :rules="[rules.required]" v-model="name" label="Название"></v-text-field>
                    <v-text-field :rules="[rules.required]" v-model="emoji" label="Эмодзи жанра"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn type="submit" color="success" @click="dialog = false">Добавить</v-btn>
                    <v-btn color="warning" @click="dialog = false">Закрыть</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>