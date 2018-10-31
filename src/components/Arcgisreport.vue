<template>
    <div id = "mapreport" class = "mapreport">
    </div>
</template>

<script>
import initArcgis from '../util/arcgis_report';

export default initArcgis;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang = "less">
    .mapreport {
        /* padding-top: 60px; */
         /* width: 100vw; */
        height:139px; 
        width: 300px;
        position: absolute;
        left: 650px;
        top:38px;
        min-height: 139px;
        /* background: url("../assets/start.gif") no-repeat center; */
    }
</style>
