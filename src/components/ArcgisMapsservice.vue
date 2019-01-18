<template>
    <div id = "mapservice" class = "mapservice">
    </div>
</template>

<script>
import initArcgis from '../util/arcgis_mapservice';

export default initArcgis;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang = "less">
    .mapservice {
        width: 100%;
        height:100%;
        padding: 10px;
        /* border-bottom: 1px solid #C9C9C9; */
        /* background: url("../assets/start.gif") no-repeat center; */
    }
</style>
