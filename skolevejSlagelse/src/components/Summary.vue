<template>
    <div v-if="store.route" class="summaryContainer">
        <h1>Ruteinfo</h1>
        <dl>
            <dt>Fra adresse:</dt>
            <dd>{{ store.selectedAdress?.tekst }}</dd>
            
            <dt>Til skole:</dt>
            <dd>{{ store.selectedSkole?.skole }}</dd>
            <dd>{{ store.selectedSkole?.adresse }}</dd>
    
            <dt>Afstand:</dt>
            <dd>{{ store.routeDistance }}</dd>
        </dl>
    </div>
    <div class="summaryContainer" v-else>
        <h1>Vejledning</h1>
        <p>Få beregnet rute fra en adresse til en skole</p>
        <ol>
            <li>Indtast elevens adresse</li>
            <li>Vælg skole</li>
            <li>Klik på beregn</li>
        </ol>
    </div>
</template>

<script setup>
import { useDataStore } from '../stores/data';

const store = useDataStore()
</script>

<style scoped>
.summaryContainer {
    background-color: white;
    padding: 4px 16px 4px;
    margin-bottom: 10px;
    border-radius: 6px;
    box-shadow: 0 0.5em 1em -0.125em #0a0a0a1a, 0 0 0 1px #0a0a0a05;
}

li {
    margin: 4px 0;
}

dl > * {
    margin: 4px;
}

dl > dd {
    margin-left: 40px;
}

dl > dt {
    margin-top: 16px;
}

</style>

