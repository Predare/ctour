<script setup>
const props = defineProps({modelValue: Boolean, link: String} );
const emits = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits('update:modelValue', value);
  }
});

const text = ref('');

async function sendReport() {
    await $fetch(props.link, { method: 'POST', body: { text: text.value } });
    value.value = false;
}
</script>

<template>
    <v-dialog v-model="value" width="auto">
        <v-card title="Отправить жалобу" color="surface-lighten-1" class="px-2 py-1 rounded-lg">
            <v-card-text>
                <v-form>
                    <v-textarea style="min-width: 600px" label="Укажите причину(опционально)" v-model="text"/>
                </v-form>
            </v-card-text>
            <v-card-actions location="end">
                <v-btn color="success" variant="tonal" @click="sendReport">Отправить</v-btn>
                <v-btn color="warning" @click="value=false">Закрыть</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>