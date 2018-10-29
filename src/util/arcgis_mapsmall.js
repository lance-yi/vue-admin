/* eslint-disable no-undef */
import { loadScript, loadCss, loadModules } from 'esri-loader';
import tileInfo from './tileInfo';

export default {
    name: 'ArcgisMapsmall',
    props: {propsname:{type:Array,}},
    data() {
        return {
            mapObj: {},
            point:[],
        };
    },
    mounted() {
        // console.log(this.propsname)

        this.init();
        
    },
    methods: {
        init() {
            // 加载js;
            loadScript({
                url: 'https://js.arcgis.com/3.22/',
                dojoConfig: {
                    async: true
                }
            });
            // 加载css;
            loadCss('https://js.arcgis.com/3.22/esri/css/esri.css');
            // 加载模块
            loadModules([
                'esri/map',
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
                url: 'https://js.arcgis.com/3.22/',
            }).then(this.TDTinstance)
                .then(this.initMap);
        },
        TDTinstance(
            [
                Map,
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
            this.mapObj = obj;// 将对象保存到vue data 的 maoObj中,方便调用;
            let map = new obj.Map('maps', {logo: false,basemap: "streets-navigation-vector",slider:false});// 创建地图实例
            let pt = new obj.Point(this.propsname[0].longitude, this.propsname[0].latitude); // 设置中心点
            map.centerAndZoom(pt,7); // 设置中心点和缩放级别;
            let img = new TDT('img'); // 影像
            let cia = new TDT('cia');//路网
            map.addLayer(img); // 将图层添加到map对象
            map.addLayer(cia);
            this.mapObj.map = map;

            // this.$http.get("gis/gis/getLalontude",{},res=>{
            //     // console.log(res.data)
                // this.point = propsname
                var that = this
                this.propsname.forEach (el=>{ 
                    // that.createCircle(el)
                    if(el.alert == 1){
                        that.createCircle(el)
                    }else if(el.alert == 2){
                        that.createCircless(el)
                    }else if(el.alert == 0){
                        that.createCircles(el)
                    }
                })
            //   },err=>{
            //   })
             
        },
        createCircle(el) {
            var that = this
            let gl = new this.mapObj.GraphicsLayer({id:el.gatewayIp});
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
