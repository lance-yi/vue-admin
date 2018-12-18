<template>
    <div id = "map" class = "map">
    </div>
</template>

<script>
import initArcgis from '../util/arcgis_mapbig';

export default initArcgis;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang = "less">
    .map {
        /* padding-top: 50px; */
        /* width: 450px; */
         /* width: 100vw; */
        height:410px; 
        z-index:1;
        /* background: url("../assets/start.gif") no-repeat center; */
    }
</style>
