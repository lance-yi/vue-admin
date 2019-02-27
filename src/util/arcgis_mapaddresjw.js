/* eslint-disable no-undef */
import { loadScript, loadCss, loadModules } from 'esri-loader';
import tileInfo from './tileInfo';

export default {
    name: 'ArcgisMap',
    data() {
        return {
            
        };
    },
    mounted() {
        this.init();
       
        // console.log(localStorage.getItem('breaktime'))
        // console.log(this.maptime)
        
    },
    watch:{
        // propsmap:{
        //   handler: function(val,odlval) {
        //       var that = this
        //       this.centerlist = val
        //     this.$http.get("res/socElectrical/selectElectricByCondition?",{param:this.centerlist},res=>{
        //             if(res.data.res.length>0){
        //                 var pt = new that.mapObj.Point(res.data.res[0].longitude, res.data.res[0].latitude); // 设置中心点
        //                 that.mapObj.map.centerAndZoom(pt,13); // 设置中心点和缩放级别;
        //             }else{
        //                 this.$Message.info('没有找到您要搜索的东西');
        //             }
        //         },err=>{
        //         })
        //   },
        //   deep:true
        // },
        // maptime:{
        //      handler: function(val,odlval) {
        //         //  console.log(val)
        //          if(val == '两分钟'){
        //             this.timers(2)
        //             }else if(val == '五分钟'){
        //                 this.timers(5)
        //             }else if(val == '十分钟'){
        //                 this.timers(10)
        //             }else if(val == '半小时'){
        //                 this.timers(30)
        //             }
        //      }
        // }
      },
    methods: {
        init() {
            // 加载js;
            // loadScript({
            //     // url: 'https://js.arcgis.com/3.22/',
            //     // url: '../arcgis_js_v322_api/arcgis_js_api/library/3.22/3.22/init.js',
            //     // dojoConfig: {
            //     //     async: true
            //     // }
            // });
            // 加载css;
            // loadCss('http://192.168.8.180:8770/arcgis_js_v322_api/arcgis_js_api/library/3.22/3.22/esri/css/esri.css');
            // loadCss('./arcgis_js_v322_api/arcgis_js_api/library/3.22/3.22/esri/css/esri.css');
            // 加载模块
            loadModules([
                'esri/map',
                'esri/basemaps',
                'esri/layers/TiledMapServiceLayer',
                'esri/SpatialReference',
                'esri/geometry/Extent',
                'esri/layers/TileInfo',
                'esri/geometry/Point',
                'esri/geometry/Circle',
                'esri/symbols/SimpleFillSymbol',
                'esri/graphic',
                'esri/layers/GraphicsLayer',
                "esri/symbols/SimpleMarkerSymbol",
                "esri/geometry/Polyline",
                "esri/symbols/SimpleLineSymbol",
                "esri/Color",
                "esri/dijit/Search",
            ], {
                // url: 'https://js.arcgis.com/3.22/',
            }).then(this.TDTinstance)
                .then(this.initMap);
        },
        TDTinstance(
            [
                Map,
                basemaps,
                TiledMapServiceLayer,
                SpatialReference,
                Extent,
                TileInfo,
                Point,
                Circle,
                SimpleFillSymbol,
                Graphic,
                GraphicsLayer,
                SimpleMarkerSymbol,
                Polyline,
                SimpleLineSymbol,
                Color,
                Search
            ]
        ) {
            dojo.declare('TDT', TiledMapServiceLayer, {
                constructor(maptype) {
                    this._maptype = maptype;
                    this.spatialReference = new SpatialReference({wkid: 4326});
                    this.initialExtent = (this.fullExtent = new Extent(-180, -90, 180, 90,
                        this.spatialReference));

                    this.tileInfo = new TileInfo(tileInfo);
                    this.loaded = true;
                    this.onLoad(this);
                },

                getTileUrl(level, row, col) {
                    return 'http://t' + col % 8 + '.tianditu.cn/' + this._maptype + '_c/wmts?' +
                        'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=' + this._maptype +
                        '&STYLE=default&TILEMATRIXSET=c&TILEMATRIX=' +
                        level + '&TILEROW=' + row + '&TILECOL=' + col + '&FORMAT=tiles';
                }
            });
            return {
                Map,
                basemaps,
                TiledMapServiceLayer,
                SpatialReference,
                Extent,
                TileInfo,
                Point,
                Circle,
                SimpleFillSymbol,
                Graphic,
                GraphicsLayer,
                SimpleMarkerSymbol,
                Polyline,
                SimpleLineSymbol,
                Color,
                Search
            };
        },
        initMap(obj) {
            var that = this
            obj.basemaps.delorme = {baseMapLayers: [{url: "http://100.16.3.40:6080/arcgis/rest/services/wuhann/MapServer"}]}
            this.mapObj = obj;// 将对象保存到vue data 的 maoObj中,方便调用;
            // let map = new obj.Map('mapjw', {logo: false,basemap: "streets-navigation-vector",},);// 创建地图实例
            let map = new obj.Map('map', {logo: false,basemap: "delorme",},);
            let pt = new obj.Point(114.420148, 30.474698); // 设置中心点
            map.centerAndZoom(pt,13); // 设置中心点和缩放级别;
            let img = new TDT('img'); // 影像
            let cia = new TDT('cia');//路网
            map.addLayer(img); // 将图层添加到map对象
            map.addLayer(cia);
            this.mapObj.map = map;
            setTimeout(() => {
                var div = document.getElementById("mapjw_zoom_slider").style;
                div.visibility = "collapse";
             }, 200);
             
if(dijit.byId("search")){
    dijit.byId("search").destroy();
}
             setTimeout(() => {
                var s = new obj.Search({
                    map: map
                  },"search");
             }, 200);
             //搜索框
             
            
                  map.on("click", function(ev) {
                var lat = Math.round(ev.mapPoint.getLatitude() * 1000) / 1000;
                var lon = Math.round(ev.mapPoint.getLongitude() * 1000) / 1000;
                // alert(lat+","+lon);
                that.$emit('lats',lat)
                that.$emit('lons',lon)


                
        });


       
            
             
        },
        
    }
};
