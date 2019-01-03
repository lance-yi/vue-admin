<template>
    <div id = "mapjw" class = "mapjw">
    </div>
</template>

<script>
import initArcgis from '../util/arcgis_mapaddresjw';

export default initArcgis;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang = "less">
    .mapjw {
        width: 600px;
        height:400px; 
        margin-top: 10px;
        border: 1px solid #C9C9C9;
        /* background: url("../assets/start.gif") no-repeat center; */
    }
</style>
