import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useDataStore = defineStore('data', () => {
    // Data som skal flyttes til SPS params
    const minimapObj = ref()
    const kommunenr = ref()
    
    const skoleData = ref()
    const selectedAdress = ref()
    const selectedSkole = ref()
    const route = ref()

    const selectedSkoleCoordinates = computed(() => selectedSkole.value.latLong)
    const selectedAdressCoordinates = computed(() => `${selectedAdress.value.data.x},${selectedAdress.value.data.y}`)
    const routeGeometry = computed(() => route.value?.wkt)
    const routeDistance = computed(() => {
        if (route.value?.travelDistanceInMeter < 1000) {
            return `${route.value?.travelDistanceInMeter} m`
        } else {
            const km = route.value?.travelDistanceInMeter / 1000
            return `${km.toFixed(1)} km`
        }
    })

    return { skoleData, kommunenr, selectedAdress, selectedSkole, selectedSkoleCoordinates, selectedAdressCoordinates, route, routeGeometry, routeDistance, minimapObj }
})