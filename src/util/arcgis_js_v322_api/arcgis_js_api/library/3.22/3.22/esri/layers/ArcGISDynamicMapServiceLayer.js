// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
define("esri/layers/ArcGISDynamicMapServiceLayer","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/json dojo/sniff dojo/io-query ../kernel ../config ../request ../urlUtils ../layerUtils ../geometry/scaleUtils ./DynamicMapServiceLayer ./ArcGISMapServiceLayer ./TimeInfo ./LayerTimeOptions ./ImageParameters ./DynamicLayerInfo ./LayerMapSource".split(" "),function(k,f,l,n,p,v,w,q,x,r,h,y,z,A,B,C,t,D,E){k=k([z,A],{declaredClass:"esri.layers.ArcGISDynamicMapServiceLayer",_eventMap:{"visible-layers-change":["visibleLayers"]},
constructor:function(a,b,c){a=b&&b.imageParameters;var g=f.hitch;if(a){var e=a.layerDefinitions;e&&this.setLayerDefinitions(e);a.layerOption===t.LAYER_OPTION_SHOW&&(this.visibleLayers=[].concat(a.layerIds),this.onVisibleLayersChange(this.visibleLayers))}this._setIsPNG32=g(this,this._setIsPNG32);this.dpi=a&&a.dpi||96;this.imageFormat=a&&a.format||"png8";this.imageTransparency=a&&!1===a.transparent?!1:!0;this._setIsPNG32();this.gdbVersion=b&&b.gdbVersion;this._params.gdbVersion=this.gdbVersion;e=a&&
a.layerDefinitions;f.mixin(this._params,this._url.query,{dpi:this.dpi,transparent:this.imageTransparency,format:this.imageFormat},a?a.toJson():{});e&&(this._params.layerDefs=e);this.getImageUrl=g(this,this.getImageUrl);this._initLayer=g(this,this._initLayer);this._load=g(this,this._load);this.useMapImage=b?b.useMapImage:!1;this._loadCallback=b&&b.loadCallback;(b=b&&b.resourceInfo)?this._initLayer(b):void 0!==c&&!1!==c||this._load();this.registerConnectEvents()},disableClientCaching:!1,layerDefinitions:null,
_initLayer:function(a,b){this.inherited(arguments);a.timeInfo&&(this.timeInfo=new B(a.timeInfo));this.loaded=!0;this.onLoad(this);var c=this._loadCallback;c&&(delete this._loadCallback,c(this))},getImageUrl:function(a,b,c,g){var e=this._url.path+"/export?",d=this._params,m=d.token=this._getToken(),u=a.spatialReference.wkid||n.toJson(a.spatialReference.toJson()),l=this._errorHandler;delete d._ts;f.mixin(d,{bbox:a.xmin+","+a.ymin+","+a.xmax+","+a.ymax,bboxSR:u,imageSR:u,size:b+","+c},this.disableClientCaching?
{_ts:(new Date).getTime()}:{});d.layerDefs&&(a=h._serializeLayerDefinitions(d.layerDefs,10.5<=this.version),d=f.mixin({},d),delete d.layerDefs,d.layerDefs=a);a=r.addProxy(e+v.objectToQuery(f.mixin({},d,{f:"image"})));a.length>q.defaults.io.postLength||this.useMapImage?this._jsonRequest=x({url:e,content:f.mixin(d,{f:"json"}),callbackParamName:"callback",load:function(a){a=a.href;m&&(a+=-1===a.indexOf("?")?"?token\x3d"+m:"\x26token\x3d"+m);g(r.addProxy(a))},error:l}):g(a)},_setIsPNG32:function(){var a=
this.imageFormat.toLowerCase(),b=p("ie");this.isPNG32=b&&6===b&&("png32"===a||"png24"===a)&&this.imageTransparency},_setTime:function(a){var b=this.timeInfo;a=this._params.time=a?a.toJson().join(","):null;if(10.02>this.version&&b)if(a)this._params.layerTimeOptions=h._serializeTimeOptions(this.layerTimeOptions);else{var c=this.layerInfos;if(c){var g=this.layerTimeOptions,e=g?g.slice(0):[],d=[];l.forEach(c,function(a){a.subLayerIds||d.push(a.id)});d.length&&(l.forEach(d,function(a){if(!e[a]){var b=
new C;b.useTime=!1;e[a]=b}}),this._params.layerTimeOptions=h._serializeTimeOptions(e,d))}}10.02<=this.version&&b&&!a&&!b.hasLiveData&&(this._params.time="null,null")},setDPI:function(a,b){this.dpi=this._params.dpi=a;b||this.refresh(!0)},setImageFormat:function(a,b){this.imageFormat=this._params.format=a;this._setIsPNG32();b||this.refresh(!0)},setImageTransparency:function(a,b){this.imageTransparency=this._params.transparent=a;this._setIsPNG32();b||this.refresh(!0)},setVisibleLayers:function(a,b){this.visibleLayers=
a;this._params.layers=t.LAYER_OPTION_SHOW+":"+(a.length?a.join():"-1");this._updateDynamicLayers();b||this.refresh(!0);this.onVisibleLayersChange(this.visibleLayers)},onVisibleLayersChange:function(){},setDefaultVisibleLayers:function(a){this.visibleLayers=this._defaultVisibleLayers;this._params.layers=null;this._updateDynamicLayers();a||this.refresh(!0);this.onVisibleLayersChange(this.visibleLayers)},setLayerDefinitions:function(a,b){this.layerDefinitions=a;this._params.layerDefs=a;this._updateDynamicLayers();
b||this.refresh(!0)},setDefaultLayerDefinitions:function(a){this.layerDefinitions=this._params.layerDefs=null;this._updateDynamicLayers();a||this.refresh(!0)},setDisableClientCaching:function(a){this.disableClientCaching=a},setLayerTimeOptions:function(a,b){this.layerTimeOptions=a;this._params.layerTimeOptions=h._serializeTimeOptions(a);this._updateDynamicLayers();b||this.refresh(!0)},refresh:function(a){if(a)this.inherited(arguments);else{var b=this.disableClientCaching;this.disableClientCaching=
!0;this.inherited(arguments);this.disableClientCaching=b}},setLayerDrawingOptions:function(a,b){this.layerDrawingOptions=a;this._updateDynamicLayers();b||this.refresh(!0)},setDynamicLayerInfos:function(a,b){a&&0<a.length?(this.dynamicLayerInfos=a,this.visibleLayers=h._getDefaultVisibleLayers(a),this.onVisibleLayersChange(this.visibleLayers)):this.dynamicLayerInfos=this.layerDrawingOptions=null;this._updateDynamicLayers();b||this.refresh(!0)},createDynamicLayerInfosFromLayerInfos:function(){var a=
[],b;l.forEach(this.layerInfos,function(c){b=new D(c.toJson());b.source=new E({mapLayerId:c.id});a.push(b)});return a},_onDynamicLayersChange:function(){},_updateDynamicLayers:function(){if(this.dynamicLayerInfos&&0<this.dynamicLayerInfos.length||this.layerDrawingOptions&&0<this.layerDrawingOptions.length){this.dynamicLayerInfos&&0!==this.dynamicLayerInfos.length||(this.dynamicLayerInfos=this.createDynamicLayerInfosFromLayerInfos());var a;a=this.dynamicLayerInfos;var b=[],c=this._map&&y.getScale(this._map),
g=this.visibleLayers,e=c?h._getLayersForScale(c,a):g;l.forEach(a,function(a){if(!a.subLayerIds){var c,d=a.id;if(-1!==l.indexOf(g,d)&&-1!==l.indexOf(e,d)){c={id:d,name:a.name};c.source=a.source&&a.source.toJson();var f;this.layerDefinitions&&this.layerDefinitions[d]&&(f=this.layerDefinitions[d]);f&&(c.definitionExpression=f);var h;this.layerDrawingOptions&&this.layerDrawingOptions[d]&&(h=this.layerDrawingOptions[d]);h&&(c.drawingInfo=h.toJson());var k;this.layerTimeOptions&&this.layerTimeOptions[d]&&
(k=this.layerTimeOptions[d]);k&&(c.layerTimeOptions=k.toJson());c.minScale=a.minScale||0;c.maxScale=a.maxScale||0;b.push(c)}}},this);a=n.toJson(b);this._params.dynamicLayers&&this._params.dynamicLayers.length===a.length&&this._params.dynamicLayers===a||(this._params.dynamicLayers=a,this._onDynamicLayersChange(this._params.dynamicLayers))}else this._params.dynamicLayers?(this._params.dynamicLayers=null,this._onDynamicLayersChange(null)):this._params.dynamicLayers=null},_onExtentChangeHandler:function(a,
b,c){c&&this._updateDynamicLayers();this.inherited(arguments)},_setMap:function(a,b,c){this._map=a;this._updateDynamicLayers();return this.inherited(arguments)},onGDBVersionChange:function(){},setGDBVersion:function(a,b){this.gdbVersion=a;this._params.gdbVersion=a;this.onGDBVersionChange();b||this.refresh(!0)},exportMapImage:function(a,b){var c=f.hitch(this,function(){var c=q.defaults.map,e=a&&a.layerDefinitions;a=a?a.toJson(this.normalization):{};e&&(a.layerDefs=e);a=f.mixin({size:c.width+","+c.height},
this._params,a,{f:"json"});delete a._ts;a.layerDefs&&(c=h._serializeLayerDefinitions(a.layerDefs,10.5<=this.version),delete a.layerDefs,a.layerDefs=c);this._exportMapImage(this._url.path+"/export",a,b)});if(this.loaded)c();else this.on("load",c)}});p("extend-esri")&&f.setObject("layers.ArcGISDynamicMapServiceLayer",k,w);return k});