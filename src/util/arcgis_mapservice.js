/* eslint-disable no-undef */
import { loadScript, loadCss, loadModules } from 'esri-loader';
import tileInfo from './tileInfo';

export default {
    name: 'ArcgisMap',
    props: {propstimes:{type:Array},
    // propsusers:{type:String}
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
        // if(localStorage.getItem('breaktime')){
        //     if(localStorage.getItem('breaktime') == '两分钟'){
        //        this.timers(2)
        //     }else if(localStorage.getItem('breaktime') == '五分钟'){
        //         this.timers(5)
        //     }else if(localStorage.getItem('breaktime') == '十分钟'){
        //         this.timers(10)
        //     }else if(localStorage.getItem('breaktime') == '半小时'){
        //         this.timers(30)
        //     }
        // }else{
        //     this.timers(2)
        // }
        // console.log(localStorage.getItem('breaktime'))
        // console.log(this.maptime)
        
    },
    watch:{
        propstimes:{
          handler: function(val,odlval) {
            var that = this
            that.mapObj.map.destroy();
            that.init()
            //     this.$http.get("workflow/trajectory/findTrajectory",{maintenancer:this.propstimes[1],createTime:this.propstimes[0]},res=>{
            //         var pt = new that.mapObj.Point(res.data.all[0].longlat[0], res.data.all[0].longlat[1]); // 设置中心点
            //         that.mapObj.map.centerAndZoom(pt,13); // 设置中心点和缩放级别
            //         that.point = res.data.all
                

                

            //     that.point.forEach ((el,index)=>{
            //         if(el.type == 'pole'){
            //             that.creategan(el,index)
            //             that.detailwork(el,index)
            //         }else{
            //             that.createCircles(el,index)
            //         }
                        
            //     })
                
            //     var polylineold = new esri.geometry.Polyline(res.data.poles);
            //     var symbolold = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([29,96,254]), 2);
            //     var graphicold = new esri.Graphic(polylineold, symbolold);


             
        

            //     setTimeout(function(){
            //         that.mapObj.map.graphics.add(graphicold)
            //     },3000);
                    
            //   },err=>{
            //   })
          },
          deep:true
        },
      },
    methods: {
        // timers(i){
        //     clearInterval(this.timer)
        //     this.timer =  setInterval(() => { 
        //             this.init();
        //         }, this.mintime*i)
        // },
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
                "esri/symbols/TextSymbol"
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
                TextSymbol
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
                TextSymbol
            };
        },
        initMap(obj) {
            // obj.basemaps.delorme = {baseMapLayers: [{url: "http://100.16.3.40:6080/arcgis/rest/services/wuhann/MapServer"}]}
            this.mapObj = obj;// 将对象保存到vue data 的 maoObj中,方便调用;
            let map = new obj.Map('mapservice', {logo: false,basemap: "streets-navigation-vector",},);// 创建地图实例
            // let map = new obj.Map('map', {logo: false,basemap: "delorme",},);
            var pt = new obj.Point(114.420148, 30.474698); // 设置中心点
            map.centerAndZoom(pt,13); // 设置中心点和缩放级别;
            let img = new TDT('img'); // 影像
            let cia = new TDT('cia');//路网
            map.addLayer(img); // 将图层添加到map对象
            map.addLayer(cia);
            this.mapObj.map = map;
            
           var that = this
        
            if(that.propstimes.length > 0){
                this.$http.get("workflow/trajectory/findTrajectory",{maintenancer:that.propstimes[1],createTime:that.propstimes[0]},res=>{
                    var pt = new obj.Point(res.data.all[0].longlat[0], res.data.all[0].longlat[1]); // 设置中心点
                    map.centerAndZoom(pt,5); // 设置中心点和缩放级别;
                    this.point = res.data.all
                    var that = this
                    this.point.forEach ((el,index)=>{
                        if(el.type == 'pole'){
                            that.creategan(el,index)
                            that.detailwork(el,index)
                        }else{
                            that.createCircles(el,index)
                        }
                            
                    })
                    var polylineold = new esri.geometry.Polyline(res.data.poles);
                    var symbolold = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([29,96,254]), 2);
                    var graphicold = new esri.Graphic(polylineold, symbolold);
                    setTimeout(function(){
                        map.graphics.add(graphicold)
                    },3000);     
                  },err=>{
                  }) 
            }  
        },
        creategan(el,zz) {
            var that = this
            var c = zz+'rrrr'
            let gl = new this.mapObj.GraphicsLayer({id:c});
            this.mapObj.map.addLayer(gl,2);
            var labelPoint=new esri.geometry.Point(el.longlat[0],el.longlat[1]);
            var labelSymbol =  new esri.symbol.PictureMarkerSymbol({
                url:require('../../public/img/161.png'),
                "height":62,
                "width":54,
                "type":"esriPMS",
                "angle": 0,
              });
           
              var backone=new esri.geometry.Point(el.longlat[0],el.longlat[1]);
              var backtwo =  new esri.symbol.PictureMarkerSymbol({
                  url:require('../../public/img/162.png'),
                  "height":26,
                  "width":150,
                  "type":"esriPMS",
                  "angle": 0,
                  "xoffset":90,
                  "yoffset":18
                });
              
                var bigdivtwo =  new esri.symbol.PictureMarkerSymbol({
                    url:require('../../public/img/163.png'),
                    "height":120,
                    "width":170,
                    "type":"esriPMS",
                    "angle": 0,
                    "xoffset":-30,
                    "yoffset":95
                  });

                  var textsymbol = new esri.symbol.TextSymbol('反馈时间:'+el.form.feedbackTime);
                  textsymbol.setOffset(-44, 100);
                  textsymbol.setColor(new esri.Color([105,109,111,1]));
                  var graphicText = new esri.Graphic(labelPoint, textsymbol);


                  var textsymbolth = new esri.symbol.TextSymbol('处理耗时:'+el.form.intervaTime+'小时');
                  textsymbolth.setOffset(-67, 72);
                  textsymbolth.setColor(new esri.Color([105,109,111,1]));
                  var graphicTextth = new esri.Graphic(labelPoint, textsymbolth);

                  var textsymboltwo = new esri.symbol.TextSymbol('工单编号:'+el.form.formId);
                  textsymboltwo.setOffset(-40, 130);
                  textsymboltwo.setColor(new esri.Color([105,109,111,1]));
                  var graphicTexttwo = new esri.Graphic(labelPoint, textsymboltwo);

                  var textsymboltr = new esri.symbol.TextSymbol('完成时间:'+el.form.updateTime);
                  textsymboltr.setOffset(-45, 180);
                  textsymboltr.setColor(new esri.Color([105,109,111,1]));
                  var graphicTexttr = new esri.Graphic(labelPoint, textsymboltr);
            //线杆手机背景图 
            var labelGraphic=new this.mapObj.Graphic(labelPoint,labelSymbol);
            //经纬度灰色背景图
            var backthree=new this.mapObj.Graphic(backone,backtwo);
            //文字大背景
            var bigimg=new this.mapObj.Graphic(labelPoint,bigdivtwo);
            
            //添加到地图 
            gl.add(labelGraphic);
            gl.add(backthree);
            gl.add(bigimg);
            gl.add(graphicText);
            gl.add(graphicTexttwo);
            gl.add(graphicTextth)
            gl.add(graphicTexttr)
            // gl.add(graphicText);
            // gl.onClick = function(evt){
            // that.$emit('ip',el.id)
            // }


            
        },
        createCircles(el,aaa) {
            var that = this
            var x = aaa+'sdsjd'
            let gl = new this.mapObj.GraphicsLayer({id:x});
            this.mapObj.map.addLayer(gl,3);
            var labelPoint=new esri.geometry.Point(el.longlat[0],el.longlat[1]);
            var textsymbol = new esri.symbol.TextSymbol('经度:'+el.longlat[0]+',纬度:'+el.longlat[1]);
            textsymbol.setOffset(100, 20);
            textsymbol.setColor(new esri.Color([255,255,255,1]));
            var graphicText = new esri.Graphic(labelPoint, textsymbol);

            //添加到地图 
            gl.add(graphicText);   
        },
        detailwork(el,index){
            var that = this
            let gl = new this.mapObj.GraphicsLayer({id:el.form.formId});
            this.mapObj.map.addLayer(gl);
            var labelPoint=new esri.geometry.Point(el.longlat[0],el.longlat[1]);
            var labelSymbol =  new esri.symbol.PictureMarkerSymbol({
                url:require('../../public/img/xq.png'),
                "height":17,
                "width":17,
                "type":"esriPMS",
                "angle": 0,
                "xoffset":35,
                "yoffset":55
              });
            // var labelSymbol=new esri.symbol.SimpleMarkerSymbol();
            var labelGraphic=new this.mapObj.Graphic(labelPoint,labelSymbol);

            //添加到地图 
            gl.add(labelGraphic);
            gl.onClick = function(evt){
            that.$emit('formids',el.form.formId)
            }
        }
    }
};
