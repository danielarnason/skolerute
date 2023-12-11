<template>
    <div id="minimapbody"></div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useDataStore } from '../stores/data'
import { storeToRefs } from 'pinia'

const store = useDataStore()

const { routeGeometry } = storeToRefs(store)

watch(routeGeometry, () => {

    store.minimapObj.getMapControl().map.getLayers().getArray().slice().forEach(layer => {
        if (layer && (layer.get('name') === 'routeLayer' || layer.get('name') === 'schoolLayer' || layer.get('name') === 'homeLayer' || layer.get('name') === 'distriktLayer')) {
            store.minimapObj.getMapControl().map.removeLayer(layer)
        }
    })

    
    const lineStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(0,0,0,1)',
            width: 2,
            lineDash: [5, 5]
        })
    })
    
    const wktFormat = new ol.format.WKT()
    const routeFeature = wktFormat.readFeature(routeGeometry.value)
    const source = new ol.source.Vector({
        features: [routeFeature]
    })
    const routeLayer = new ol.layer.Vector({
        name: 'routeLayer',
        zIndex: 98,
        source: source,
        style: lineStyle
    })
    
    store.minimapObj.getMapControl().map.addLayer(routeLayer)
    store.minimapObj.getMapControl().map.getView().fit(routeFeature.getGeometry(), {
        padding: [100, 250, 100, 500]
    })
    addDestination(store.selectedAdressCoordinates, 'home')
    addDestination(store.selectedSkoleCoordinates, 'school')
    addSkoledistrikt(store.selectedSkoleDistrikt.shape_wkt.wkt)
})

const addSkoledistrikt = wktGeom => {
    const wktFormat = new ol.format.WKT()
    const skoledistriktFeature = wktFormat.readFeature(wktGeom)
    const source = new ol.source.Vector({
        features: [skoledistriktFeature]
    })
    const distriktLayer = new ol.layer.Vector({
        name: 'distriktLayer',
        zIndex: 97,
        source: source,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'rgba(190,49,39,0.8)',
                width: 3
            })
        })
    })
    store.minimapObj.getMapControl().map.addLayer(distriktLayer)
}

const addDestination = (coordinates, type) => {
    const feature = new ol.Feature({
        geometry: new ol.geom.Point(coordinates.split(','))
    })
    const source = new ol.source.Vector({
        features: [feature]
    })
    const layer = new ol.layer.Vector({
        name: `${type}Layer`,
        zIndex: 99,
        source: source,
        style: new ol.style.Style({
            image: new ol.style.Icon({
                src: type === 'home' ? '/modules/skolerute/home.svg' : '/modules/skolerute/school.svg',
                anchor: [0.5, 1]
            })
        })
    })

    store.minimapObj.getMapControl().map.addLayer(layer)
}

const onMapReady = mm => {
    store.minimapObj = mm
    const ses = mm.getSession()

    store.kommunenr = ses.getParam('config.kommunenr.trecifre')
    
    const ds = ses.getDatasource(ses.getParam('module.skolerute.skole_ds'))
    ds.execute({command: 'read'}, rows => {
        const data = rows.map((element) => {
            const wkt = element.shape_wkt.wkt;
            const start = wkt.search(/[0-9]/);
            const end = wkt.search(/[)]/);
            const subStr = wkt.substring(start, end);
            const latLong = subStr.replace(' ', ',');
            const adresse = `${element.vejnavn} ${element.husnummer}, ${element.postnummer} ${element.by}`;
            return {
                id: parseInt(element.id),
                skole: element.skole,
                adresse,
                latLong,
            };
        });
        store.skoleData = data.sort((a, b) => (a.skole > b.skole) ? 1 : ((b.skole > a.skole) ? -1 : 0))
    })
}

onMounted(() => {
    MiniMap.createMiniMap({
        mapDiv: 'minimapbody',
        initCallback: onMapReady
    })
})

</script>

<style>
#minimapbody {
    height: 100%;
    width: 100%;
}
</style>