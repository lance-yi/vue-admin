<template>
    <div id = "mapworkdetail" class = "mapworkdetail">
    </div>
</template>

<script>
import initArcgis from '../util/arcgis_mapworkdetail';

export default initArcgis;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang = "less">
    .mapworkdetail {
        min-width: 90%;
        height:200px; 
        /* margin-top: 10px; */
        padding-bottom: 10px;
        /* border-bottom: 1px solid #C9C9C9; */
        /* background: url("../assets/start.gif") no-repeat center; */
    }
</style>
