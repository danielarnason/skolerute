<template>
    <div class="autocomplete-container">
        <label for="dawa-autocomplete-input">Adresse</label>
        <input @input="handleChange" type="search" id="dawa-autocomplete-input" placeholder="Søg efter adresse">
    </div>
</template>

<script setup>
import * as dawa from 'dawa-autocomplete2'
import { onMounted } from 'vue'
import { useDataStore } from '../stores/data';

const store = useDataStore()

const handleChange = () => {
  store.route = null
}

onMounted(() => {
    const inputEl = document.getElementById('dawa-autocomplete-input')
    setTimeout(() => {
      const component = dawa.dawaAutocomplete(inputEl, {
          select: selected => {
              store.selectedAdress = selected
          },
          adgangsadresserOnly: true,
          params: {
              kommunekode: store.kommunenr,
              srid: '25832'
          }
      })
    }, 3000);
})

</script>

<style>
#dawa-autocomplete-input {
  margin-top: 4px;
  padding: 10px;
  border: 1px solid #aaa;
  border-radius: 10px;
}

.autocomplete-container {
  /* relative position for at de absolut positionerede forslag får korrekt placering.*/
  position: relative;
  width: 100%;
  max-width: 30em;
}
.autocomplete-container input {
  /* Både input og forslag får samme bredde som omkringliggende DIV */
  width: 100%;
  box-sizing: border-box;
}
.dawa-autocomplete-suggestions {
  margin: 0.3em 0 0 0;
  padding: 0;
  text-align: left;
  border-radius: 0.3125em;
  background: #fcfcfc;
  box-shadow: 0 0.0625em 0.15625em rgba(0,0,0,.15);
  position: absolute;
  left: 0;
  right: 0;
  z-index: 9999;
  overflow-y: auto;
  box-sizing: border-box;
}
.dawa-autocomplete-suggestions .dawa-autocomplete-suggestion {
  margin: 0;
  list-style: none;
  cursor: pointer;
  padding: 0.4em 0.6em;
  color: #333;
  border: 0.0625em solid #ddd;
  border-bottom-width: 0;
}
.dawa-autocomplete-suggestions .dawa-autocomplete-suggestion:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.dawa-autocomplete-suggestions .dawa-autocomplete-suggestion:last-child {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  border-bottom-width: 0.0625em;
}
.dawa-autocomplete-suggestions .dawa-autocomplete-suggestion.dawa-selected,
.dawa-autocomplete-suggestions .dawa-autocomplete-suggestion:hover {
  background: #f0f0f0;
}
</style>