<template>
    <div id = "maps" class = "maps">
    </div>
</template>

<script>
import initArcgis from '../util/arcgis_mapsmall';

export default initArcgis;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang = "less">
    .maps {
        /* padding-top: 60px; */
         /* width: 100vw; */
        height:calc(100% - 80px); 
        width: 300px;
        position: absolute;
        left: 650px;
        top:38px;
        min-height: 200px;
        /* background: url("../assets/start.gif") no-repeat center; */
    }
</style>
