<template>
    <div id="skoleSelectDiv">
        <div>
            <label for="skole-select">Skole</label>
        </div>
        <select v-model="store.selectedSkole" name="skoler" id="skole-select">
            <option value="" disabled selected hidden>Vælg skole</option>
            <option v-for="skole in skoleData" :value="skole">{{ skole.skole }}</option>
        </select>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useDataStore } from '../stores/data';

const store = useDataStore()

const { skoleData } = storeToRefs(store)
</script>

<style scoped>
#skoleSelectDiv {
    margin-top: 15px;
}

select {
    margin-top: 4px;
    padding: 10px;
    border-radius: 10px;
    width: 100%;
}

select:first-child {
    border-radius: 10px 0 10px;
}
</style>