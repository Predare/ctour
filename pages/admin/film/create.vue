<script setup>
definePageMeta({
  layout: "admin",
});

function sendForm(data) {
    console.log(data.directors);
    data.directors = clearData(data.directors);
    data.actors = clearData(data.actors);
    data.countries = clearData(data.countries);
    data.genres = clearData(data.genres);
    data.selections = clearData(data.selections);
    data.voiceStudios = clearData(data.voiceStudios);
    
}

function clearData(array) {
    
    array.forEach((element, index) => {
        if(element === ''){
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