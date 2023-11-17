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
    const pageRequest = store.minimapObj.getSession().createPageRequest('afstand-calculate-route')
    pageRequest.call({
        frompoint: `POINT(${store.selectedAdressCoordinates.split(',')[0]} ${store.selectedAdressCoordinates.split(',')[1]})`,
        topoint: `POINT(${store.selectedSkoleCoordinates.split(',')[0]} ${store.selectedSkoleCoordinates.split(',')[1]})`,
        datasource: 'afstand_route_service',
        command: 'calculate-route-point-to-point',
        routeprofile: 'foot',
        srs: '25832',
        sessionid: pageRequest.sessionId
    }, response => {
        store.route = response.row[0].row[0]
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