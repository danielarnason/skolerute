<template>
    <div id="legendDiv">
        <h2>Signaturforklaring</h2>
        <div id="homeLegend">
            <img src="/home.svg" alt="Hjemmepunkt">
            <p>Adresse</p>
        </div>
        <div>
            <img src="/school.svg" alt="Skolepunkt">
            <p>Skole</p>
        </div>
    </div>
</template>

<style scoped>
#legendDiv {
    position: fixed;
    z-index: 10;
    bottom: 0;
    right: 0;
    margin: 24px;
    padding: 16px;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 0.5em 1em -0.125em #0a0a0a1a, 0 0 0 1px #0a0a0a05;
}

#homeLegend {
    margin-bottom: 4px;
}

p {
    display: inline;
}

h2 {
    margin-top: auto;
}
</style>