/* eslint-disable no-undef */
import { loadScript, loadCss, loadModules } from 'esri-loader';
import tileInfo from './tileInfo';

export default {
    name: 'ArcgisMap',
    props: {propsmap:{type:String},
    maptime:{type:String},
    num:{type:Number}
    },
    data() {
        return {
            timer:null,
            mintime:60000,
            mapObj: {},
            point:[],
            centerlist:'',
            oldtime:'',
        };
    },
    mounted() {
        this.init();
        if(localStorage.getItem('breaktime')){
            if(localStorage.getItem('breaktime') == '两分钟'){
               this.timers(2)
            }else if(localStorage.getItem('breaktime') == '五分钟'){
                this.timers(5)
            }else if(localStorage.getItem('breaktime') == '十分钟'){
                this.timers(10)
            }else if(localStorage.getItem('breaktime') == '半小时'){
                this.timers(30)
            }
        }else{
            this.timers(2)
        }
        // console.log(localStorage.getItem('breaktime'))
        // console.log(this.maptime)
        
    },
    watch:{
        propsmap:{
          handler: function(val,odlval) {
              var that = this
              this.centerlist = val
            this.$http.get("res/ponitMove/selectPonintForMap?",{param:this.centerlist},res=>{
                    if(res.data.length>0){
                        var pt = new that.mapObj.Point(res.data[0].longitude, res.data[0].latitude); // 设置中心点
                        that.mapObj.map.centerAndZoom(pt,13); // 设置中心点和缩放级别;
                    }else{
                        this.$Message.info('没有找到您要搜索的东西');
                    }
                },err=>{
                })
          },
          deep:true
        },
        maptime:{
             handler: function(val,odlval) {
                //  console.log(val)
                 if(val == '两分钟'){
                    this.timers(2)
                    }else if(val == '五分钟'){
                        this.timers(5)
                    }else if(val == '十分钟'){
                        this.timers(10)
                    }else if(val == '半小时'){
                        this.timers(30)
                    }
             }
        },
        num:{
            handler: function(val,odlval) {
                this.init() 
                // history.go(0)
            }
       }
      },
    methods: {
        timers(i){
            clearInterval(this.timer)
            this.timer =  setInterval(() => { 
                    this.init();
                }, this.mintime*i)
        },
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
                "esri/Color"
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
                Color
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
                Color
            };
        },
        initMap(obj) {
            // graphicsLayer.clear();
            // obj.basemaps.delorme = {baseMapLayers: [{url: "http://100.16.3.40:6080/arcgis/rest/services/wuhann/MapServer"}]}
            this.mapObj = obj;// 将对象保存到vue data 的 maoObj中,方便调用;
            let map = new obj.Map('map', {logo: false,basemap: "streets-navigation-vector",},);// 创建地图实例
            // let map = new obj.Map('map', {logo: false,basemap: "delorme",},);
            
            let pt = new obj.Point(114.420148, 30.474698); // 设置中心点
            map.centerAndZoom(pt,13); // 设置中心点和缩放级别;
            let img = new TDT('img'); // 影像
            let cia = new TDT('cia');//路网
            
            map.addLayer(img); // 将图层添加到map对象
            map.addLayer(cia);
            this.mapObj.map = map;
            this.$http.get("res/ponitMove/selectPonintForMap",{},res=>{
                // console.log(res.data)
                this.point = res.data
                var that = this
                this.point.forEach (el=>{ 
                        that.createCircle(el)
                })
                // var polyline = new esri.geometry.Polyline([[114,30],[115,30]]);
                // var symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOTDOT, new dojo.Color([29,96,254]), 2);
                // var graphic = new esri.Graphic(polyline, symbol);
                // setTimeout(function(){
                //     map.graphics.add(graphic)},3000);
              },err=>{
              })
       
         
            
             
        },
        createCircle(el) {
            var that = this
            let gl = new this.mapObj.GraphicsLayer({id:el.id});
            this.mapObj.map.addLayer(gl);
            // gl.removeAll()
            var labelPoint=new esri.geometry.Point(el.longitude,el.latitude);
            var labelSymbol =  new esri.symbol.PictureMarkerSymbol({
                url:require('../../public/img/96.png'),
                "height":28,
                "width":22,
                "type":"esriPMS",
                "angle": 0,
              });
            // var labelSymbol=new esri.symbol.SimpleMarkerSymbol();
            var labelGraphic=new this.mapObj.Graphic(labelPoint,labelSymbol);

            //添加到地图 
            
            gl.add(labelGraphic);
            gl.onClick = function(evt){
            that.$emit('ip',el.id)
            }


            
        },
        
    }
};
