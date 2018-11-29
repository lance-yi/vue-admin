<template>
    <div id = "maps" class = "maps">
    </div>
</template>

<script>
import initArcgis from '../util/arcgis_mapsmallpmic';

export default initArcgis;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang = "less">
    .map {
        height:calc(100% - 80px); 
        width: 310px;
        position: absolute;
        left: 580px;
        top:38px;
        min-height: 200px;
    }
</style>
