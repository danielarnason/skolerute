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
    const selectedSkoleDistrikt = computed(() => {
        const smql = `select Intersects('POINT(${selectedSkoleCoordinates.value.split(',')[0]} ${selectedSkoleCoordinates.value.split(',')[1]})', shape_wkt), udd_dist_1, shape_wkt from ${minimapObj.value.getSession().getParam('module.skolerute.skoledistrikter_ds')} where Intersects('POINT(${selectedSkoleCoordinates.value.split(',')[0]} ${selectedSkoleCoordinates.value.split(',')[1]})', shape_wkt) = true`
        const ds = minimapObj.value.getSession().getDatasource(minimapObj.value.getSession().getParam('module.skolerute.skole_ds'))
        return ds.executeSMQL(smql)[0]
    })

    const selectedAdressCoordinates = computed(() => `${selectedAdress.value.data.x},${selectedAdress.value.data.y}`)
    const routeGeometry = computed(() => route.value?.shape_wkt)
    const routeDistance = computed(() => {
        if (route.value?.distance < 1000) {
            return `${route.value?.distance} m`
        } else {
            const km = route.value?.distance / 1000
            return `${km.toFixed(1)} km`
        }
    })

    return { skoleData, kommunenr, selectedAdress, selectedSkole, selectedSkoleCoordinates, selectedAdressCoordinates, route, routeGeometry, routeDistance, minimapObj, selectedSkoleDistrikt }
})