<template>
    <div id = "maps" class = "maps">
    </div>
</template>

<script>
import initArcgis from '../util/arcgis_mapaddressmall';

export default initArcgis;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang = "less">
    .maps {
        width: 1230px;
        height:200px; 
        margin-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #C9C9C9;
        /* background: url("../assets/start.gif") no-repeat center; */
    }
</style>
