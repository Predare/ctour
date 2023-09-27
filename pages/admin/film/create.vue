<script setup>
definePageMeta({
  layout: "admin",
});

function sendForm(data) {
  console.log(data);
  $fetch('/api/admin/film/create', {
    method: 'POST',
    body: data,
  });
}

function clearData(array) {

  array.forEach((element, index) => {
    if (element === '') {
      array.splice(index, 1);
    }
  });
  return array;
}
</script>

<template>
  <div>
    <AdminFilmForm :sendForm="sendForm" />
  </div>
</template>