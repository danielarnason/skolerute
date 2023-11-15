<template>
    <div class="formContainer">
        <Autocomplete />
        <SkoleSelect />
        <input type="button" value="Beregn" @click="handleClick">
    </div>
</template>

<script setup>
import { useDataStore } from '../stores/data';
import Autocomplete from './Autocomplete.vue'
import SkoleSelect from './SkoleSelect.vue';

const store = useDataStore()

const handleClick = async () => {
    const url = `${store.minimapObj.getSession().getParam('module.skolerute.spsroute_url')}?profile=foot&from=${store.selectedAdressCoordinates}&to=${store.selectedSkoleCoordinates}&srs=epsg:25832&lang=da`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            store.route = data
        })
}
</script>

<style scoped>
.formContainer {
    display: block;
    background-color: white;
    padding: 16px;
    margin-bottom: 10px;
    border-radius: 6px;
    box-shadow: 0 0.5em 1em -0.125em #0a0a0a1a, 0 0 0 1px #0a0a0a05;
}

input {
    margin-top: 8px;
}

</style>