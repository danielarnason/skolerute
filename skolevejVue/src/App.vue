<script setup>
import Minimap from './components/Minimap.vue';
import Form from './components/Form.vue';
import Summary from './components/Summary.vue';
import Legend from './components/Legend.vue';
import { useDataStore } from './stores/data';

const store = useDataStore()

</script>

<template>
  <Legend v-if="store.route"/>
  <Minimap />
  <div id="formDiv">
    <Summary />
    <Form />
  </div>
</template>

<style scoped>
#formDiv {
  position: fixed;
  top: 0;
  margin: 24px;
  padding: 16px;
}
</style>