/* eslint-disable no-undef */
import { loadScript, loadCss, loadModules } from 'esri-loader';
import tileInfo from './tileInfo';

export default {
    name: 'ArcgisMaplog',
    props: {propsmap:{type:String}},
    data() {
        return {
            mapObj: {},
            point:[],
            centerlist:'',
            // oldtime:'',
        };
    },
    mounted() {
        this.init();
        // console.log(this.propsmap)
        
    },
    watch:{
        propsmap:{
          handler: function(val,odlval) {
              var that = this
              this.centerlist = val
            this.$http.get("res/socGateway/getGatewayByInstallOrCrossVillage?",{param:this.centerlist},res=>{
                    if(res.data.length>0){
                        var pt = new that.mapObj.Point(res.data[0].longitude, res.data[0].latitude); // 设置中心点
                        that.mapObj.map.centerAndZoom(pt,8); // 设置中心点和缩放级别;
                    }else{
                        // if(this.oldtime == ''){
                        //     this.oldtime = Date.parse(new Date())
                        //     this.$Message.info('没有找到您要搜索的东西');
                        // }else{
                        //     console.log(1111)
                        //     if(this.oldtime < Date.parse(new Date())- 3000){
                        //         console.log(222)
                        //         this.oldtime = Date.parse(new Date())
                                this.$Message.info('没有找到您要搜索的东西');
                            // }
                        // }
                        
                    }
                },err=>{
                })
            
   
          },
          deep:true
        }
      },
    methods: {
        init() {
            // 加载js;
            // loadScript({
            //     // url: 'https://js.arcgis.com/3.22/',
            //     dojoConfig: {
            //         async: true
            //     }
            // });
            // 加载css;
            // loadCss('https://js.arcgis.com/3.22/esri/css/esri.css');
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
                SimpleMarkerSymbol
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
                SimpleMarkerSymbol
            };
        },
        initMap(obj) {
            // obj.basemaps.delorme = {baseMapLayers: [{url: "http://100.16.3.40:6080/arcgis/rest/services/wuhann/MapServer"}]}
            this.mapObj = obj;// 将对象保存到vue data 的 maoObj中,方便调用;
            let map = new obj.Map('mapreport', {logo: false,basemap: "streets-navigation-vector",});// 创建地图实例
            // let map = new obj.Map('mapreport', {logo: false,basemap: "delorme",},);
            let pt = new obj.Point(114.420148, 30.474698); // 设置中心点
            map.centerAndZoom(pt,13); // 设置中心点和缩放级别;
            let img = new TDT('img'); // 影像
            let cia = new TDT('cia');//路网
            map.addLayer(img); // 将图层添加到map对象
            map.addLayer(cia);
            this.mapObj.map = map;
            
            this.$http.get("res/gis/getLalontude",{requestModular:3},res=>{
                // console.log(res.data)
                this.point = res.data
                var that = this
                // this.point.forEach (el=>{ 
                //     if(el.isAlert == 1){
                //         that.createCircle(el)
                //     }else if(el.isAlert == 2){
                //         that.createCircless(el)
                //     }else if(el.isAlert == 0){
                //         that.createCircles(el)
                //     }
                //     // that.createCircle(el)
                // })
              },err=>{
              })
             
        },
        createCircle(el) {
            var that = this
            let gl = new this.mapObj.GraphicsLayer({id:el.gatewayId});
            this.mapObj.map.addLayer(gl);
            var labelPoint=new esri.geometry.Point(el.longitude,el.latitude);
            var labelSymbol =  new esri.symbol.PictureMarkerSymbol({
                url:require('../../public/img/bbb.png'),
                "height":20,
                "width":20,
                "type":"esriPMS",
                "angle": -30,
              });
            // var labelSymbol=new esri.symbol.SimpleMarkerSymbol();
            var labelGraphic=new this.mapObj.Graphic(labelPoint,labelSymbol);

            //添加到地图 
            gl.add(labelGraphic);
            gl.onClick = function(evt){
            that.$emit('ip',el.gatewayId)
            }


            
        },
        createCircles(el) {
            var that = this
            let gl = new this.mapObj.GraphicsLayer({id:el.gatewayId});
            this.mapObj.map.addLayer(gl);
            var labelPoint=new esri.geometry.Point(el.longitude,el.latitude);
            var labelSymbol =  new esri.symbol.PictureMarkerSymbol({
                url:require('../../public/img/ccc.png'),
                "height":20,
                "width":20,
                "type":"esriPMS",
                "angle": -30,
              });
            // var labelSymbol=new esri.symbol.SimpleMarkerSymbol();
            var labelGraphic=new this.mapObj.Graphic(labelPoint,labelSymbol);

            //添加到地图 
            gl.add(labelGraphic);
            gl.onClick = function(evt){
                that.$emit('ip',el.gatewayId)
                }
        },
        createCircless(el) {
            var that = this
            let gl = new this.mapObj.GraphicsLayer({id:el.gatewayId});
            this.mapObj.map.addLayer(gl);
            var labelPoint=new esri.geometry.Point(el.longitude,el.latitude);
            var labelSymbol =  new esri.symbol.PictureMarkerSymbol({
                url:require('../../public/img/aaa.png'),
                "height":20,
                "width":20,
                "type":"esriPMS",
                "angle": -30,
              });
            // var labelSymbol=new esri.symbol.SimpleMarkerSymbol();
            var labelGraphic=new this.mapObj.Graphic(labelPoint,labelSymbol);

            //添加到地图 
            gl.add(labelGraphic);
            gl.onClick = function(evt){
            that.$emit('ip',el.gatewayId)
            }
        },
        
    }
};
