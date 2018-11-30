// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/templates/ExpressionEditor.html":'\x3cdiv class\x3d"modal"\x3e\r\n  \x3cdiv class\x3d"modal-content"\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"_expressionEditorLoading" class\x3d"throb-loading" style\x3d"border:none;height:100%;"\x3e\x3c/div\x3e\r\n    \x3ciframe data-dojo-attach-point\x3d"_expressionEditor" scrolling\x3d"auto" style\x3d"border:none;width:100%;height:100%;visibility:hidden;"\x3e\x3c/iframe\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e\r\n'}});
define("esri/dijit/ExpressionEditor","dojo/_base/declare dojo/_base/kernel dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/_base/html dojo/Evented dojo/string dojo/dom dojo/has dojo/topic dojo/query dojo/aspect dojo/_base/json dojo/Deferred dojo/dom-class dojo/dom-style dijit/registry dijit/TooltipDialog dijit/Tooltip dojo/store/Memory ../layers/ArcGISImageServiceLayer ../layers/ArcGISImageServiceVectorLayer ../layers/ArcGISDynamicMapServiceLayer ../layers/ArcGISTiledMapServiceLayer ../renderers/smartMapping ../lang ../symbols/jsonUtils ../geometry/Point ../geometry/Polyline ../geometry/Polygon ../SpatialReference ../tasks/QueryTask ../tasks/query dojo/i18n!../nls/jsapi dijit/_Widget dijit/_Templated dojo/text!./templates/ExpressionEditor.html".split(" "),
function(k,f,d,e,h,F,G,g,H,t,I,J,K,l,L,M,m,N,O,P,Q,R,u,v,w,S,x,T,y,z,A,n,p,q,r,B,C,D){k=k([B,C],{declaredClass:"esri.dijit.ExpressionEditor",basePath:require.toUrl("."),baseClass:"esriAGOExpressionEditor",widgetsInTemplate:!0,templateString:D,i18n:null,constructor:function(a,c){a&&(d.mixin(this,a),this.defaultExpressionScript=this.defaultExpressionScript||"")},destroy:function(){clearInterval(this.editorFrameListener);window.removeEventListener("message",this.receiveMessageHitch);this.inherited(arguments)},
postMixInProperties:function(){this.inherited(arguments);this.i18n=d.clone(r.common);d.mixin(this.i18n,r.rendererCommon)},postCreate:function(){},_onClose:function(a){a.preventDefault();h.publish("expression-cancel")},startup:function(){this.inherited(arguments);this._init()},_init:function(){var a=0;this.editorFrameLoaded=!1;this.editorUrl=this.arcadeEditor+"?locale\x3d"+f.locale;this._expressionEditor.onload=d.hitch(this,function(){m.set(this._expressionEditorLoading,"display","none");m.set(this._expressionEditor,
"visibility","visible")});this._expressionEditor.src=this.editorUrl;this.receiveMessageHitch=d.hitch(this,"receiveMessage");window.addEventListener("message",this.receiveMessageHitch,!1);this.editorFrameListener=setInterval(d.hitch(this,function(){this.editorFrameLoaded?(clearInterval(this.editorFrameListener),this.editorFrameListener=null):this.sendPostMessage({type:"isLoaded"});a++;60<a&&h.publish("expression-cancel")}),500)},sendPostMessage:function(a){this._expressionEditor&&this._expressionEditor.contentWindow&&
this._expressionEditor.contentWindow.postMessage(l.toJson(a),this.editorUrl)},receiveMessage:function(a){if(-1!==this.editorUrl.indexOf(a.origin)){var c="string"===typeof a.data?l.fromJson(a.data):a.data;switch(c.type){case "loaded":if(this.editorFrameLoaded=c.value){var c=this.layer instanceof v,b=this.mapLayer.layer instanceof w,E="esri.layers.ArcGISTiledMapServiceLayer"===this.mapLayer.layer.declaredClass;if(this.layer instanceof u||c){if(!this.mapLayer._queryResponse){c=new p(this.layer.url);
b=new q;b.where="1\x3d1";b.num=1;b.outFields=["*"];b.outSpatialReference=this.map.spatialReference;c.execute(b,f.hitch(this,function(b){this.mapLayer._queryResponse=b;this.receiveMessage(a)}),f.hitch(this,function(){this.mapLayer._queryResponse={};this.receiveMessage(a)}));break}}else if((b||E)&&this.layer.url&&(this.mapLayer._queryResponse=this.mapLayer._queryResponse||[],!this.mapLayer._queryResponse[this.layer.url])){c=new p(this.layer.url);b=new q;b.where="1\x3d1";b.num=1;b.outFields=["*"];b.outSpatialReference=
this.map.spatialReference;c.execute(b,f.hitch(this,function(b){this.mapLayer._queryResponse[this.layer.url]=b;this.receiveMessage(a)}),f.hitch(this,function(){this.mapLayer._queryResponse[this.layer.url]={};this.receiveMessage(a)}));break}this.sendPostMessage({type:"initializeDialog",title:this.expressionTitle?this.expressionTitle:this.i18n.custom,captureTitle:!0,predictOutputType:!0,script:this.expression?this.expression:this.defaultExpressionScript,profile:this.makeCurrentProfile(),existing:this.makeExistingList(),
spatialReference:this.map.spatialReference.toJson()})}case "initFinished":this.editorFrameLoaded?console.log("editor app loaded"):console.log("editor app not loaded yet");break;case "scriptSaveAndClose":if(!c.script||c.script===this.defaultExpressionScript){h.publish("expression-cancel");break}h.publish("expression-commit",[{expression:c.script,returnType:"Number"===c.predictOutputType?"esriFieldTypeDouble":"String"===c.predictOutputType?"esriFieldTypeString":"esriFieldTypeUnknown",title:c.title}]);
break;case "scriptClose":h.publish("expression-cancel")}}},makeCurrentProfile:function(){var a=this.layer.fields,c=[{type:"Feature",value:{attributes:null,geometry:null,layer:{fields:e.map(a,function(a){a.domain&&-1<e.indexOf(["range","codedValue"],a.domain.type)&&(a=f.clone(a),a.domain=a.domain.toJson?a.domain.toJson():a.domain);return a}),objectIdField:this.layer.objectIdField,typeIdField:this.layer.typeIdField,types:this.layer.types?e.map(this.layer.types,function(a){return a.toJson?a.toJson():
a}):null,templates:this.layer.templates}},id:"$feature"}];this.showViewScale&&c.push({type:"Dictionary",value:{attributes:{scale:this.map.getScale()},layer:{fields:[{name:"scale",alias:this.i18n.currentMapScale,type:"Number"}]}},id:"$view"});if(this.mapLayer._queryResponse&&this.mapLayer._queryResponse.features&&this.mapLayer._queryResponse.features.length)c[0].value.attributes=d.clone(this.mapLayer._queryResponse.features[0].attributes),c[0].value.geometry=this.mapLayer._queryResponse.features[0].geometry;
else if(this.mapLayer._queryResponse&&this.mapLayer._queryResponse[this.layer.url]&&this.mapLayer._queryResponse[this.layer.url].features&&this.mapLayer._queryResponse[this.layer.url].features.length)c[0].value.attributes=d.clone(this.mapLayer._queryResponse[this.layer.url].features[0].attributes),c[0].value.geometry=this.mapLayer._queryResponse[this.layer.url].features[0].geometry;else if(this.layer.graphics&&this.layer.graphics.length)c[0].value.attributes=d.clone(this.layer.graphics[0].attributes),
c[0].value.geometry=this.layer.graphics[0].geometry.toJson();else{var b={};e.forEach(a,function(a){-1<e.indexOf("esriFieldTypeSmallInteger esriFieldTypeInteger esriFieldTypeSingle esriFieldTypeDouble esriFieldTypeString esriFieldTypeDate esriFieldTypeOID esriFieldTypeGlobalID".split(" "),a.type)?!1===a.nullable?a.defaultValue?b[a.name]=a.defaultValue:-1<e.indexOf(["esriFieldTypeString"],a.type)?b[a.name]="":b[a.name]=0:b[a.name]=null:b[a.name]=null});c[0].value.attributes=b;a=this.map.extent;"esriGeometryPolygon"==
this.layer.geometryType||this.layer.getCustomRasterFields?(c[0].value.geometry=new A(new n(this.map.spatialReference.toJson())),c[0].value.geometry.addRing([[a.xmin,a.ymin],[a.xmax,a.ymin],[a.xmax,a.ymax],[a.xmin,a.ymax],[a.xmin,a.ymin]])):"esriGeometryPoint"==this.layer.geometryType||"esriGeometryMultipoint"==this.layer.geometryType?c[0].value.geometry=new y(a.getCenter().toJson()):"esriGeometryPolyline"==this.layer.geometryType&&(c[0].value.geometry=new z(new n(this.map.spatialReference.toJson())),
c[0].value.geometry.addPath([[a.xmin,a.ymin],[a.xmax,a.ymax]]))}return c},makeExistingList:function(){var a=f.hitch(this,function(a,b,c){if(a&&(a.shortTitle!==this.expressionTitle||a.valueExpression!==this.expression)){a={shortTitle:a.shortTitle||this.i18n.untitled,script:a.valueExpression,returnType:a.returnType};switch(c){case "color":a.title=g.substitute(this.i18n.expressionOriginColor,{title:a.shortTitle});break;case "size":a.title=g.substitute(this.i18n.expressionOriginSize,{title:a.shortTitle});
break;case "type":a.title=g.substitute(this.i18n.expressionOriginColor,{title:a.shortTitle});break;case "transparency":a.title=g.substitute(this.i18n.expressionOriginTransparency,{title:a.shortTitle});break;case "rotation":a.title=g.substitute(this.i18n.expressionOriginRotation,{title:a.shortTitle});break;default:a.title=a.shortTitle}b.push(a)}}),c=[],b=this.getRendererCustomExpression(this.layer.renderer,"color");a(b,c,"color");b=this.getRendererCustomExpression(this.layer.renderer,"size");a(b,c,
"size");b=this.getRendererCustomExpression(this.layer.renderer,"type");a(b,c,"type");b=this.getRendererCustomExpression(this.layer.renderer,"transparency");a(b,c,"transparency");b=this.getRendererCustomExpression(this.layer.renderer,"rotation");a(b,c,"rotation");if(this.layer.labelingInfo||this.layer.drawingInfo&&this.layer.drawingInfo.labelingInfo)a=this.layer.drawingInfo?this.layer.drawingInfo.labelingInfo[0]:this.layer.labelingInfo[0],a.labelExpressionInfo&&a.labelExpressionInfo.expression&&a.name&&
(a.name!==this.expressionTitle||a.labelExpressionInfo.expression!==this.expression)&&c.push({shortTitle:a.name||this.i18n.untitled,title:g.substitute(this.i18n.expressionOriginLabels,{title:a.name||this.i18n.untitled}),script:a.labelExpressionInfo.expression});a=this.latestPopupInfo||this.mapLayer.popupInfo;if(!a&&this.mapLayer.itemLayers)for(b=0;b<this.mapLayer.itemLayers.length;b++)if(this.mapLayer.itemLayers[b].id===this.layer.id){a=this.mapLayer.itemLayers[b].popupInfo;break}a&&a.expressionInfos&&
e.forEach(a.expressionInfos,function(a){!a||a.title===this.expressionTitle&&a.expression===this.expression||c.push({shortTitle:a.title||this.i18n.untitled,title:g.substitute(this.i18n.expressionOriginPopup,{title:a.title||this.i18n.untitled}),script:a.expression})},this);return c},getRendererCustomExpression:function(a,c){if(!a)return null;if(a.valueExpression&&("esri.renderer.UniqueValueRenderer"==a.declaredClass||"esri.renderer.ClassBreaksRenderer"==a.declaredClass&&!this.getVisualVariableByType("colorInfo",
null,a.visualVariables)&&!this.getVisualVariableByType("sizeInfo",null,a.visualVariables))&&"type"===c){var b="esriFieldTypeDouble";"esri.renderer.UniqueValueRenderer"==a.declaredClass&&a.infos&&a.infos[0]&&"string"===typeof a.infos[0].value&&(b="esriFieldTypeString");return{valueExpression:a.valueExpression,returnType:b,shortTitle:a.valueExpressionTitle||a.legendOptions&&a.legendOptions.title}}return a.visualVariables&&((b=this.getVisualVariableByType("colorInfo",null,a.visualVariables))&&b.valueExpression&&
"color"===c||(b=this.getVisualVariableByType("sizeInfo",null,a.visualVariables))&&b.valueExpression&&"size"===c||(b=this.getVisualVariableByType("opacityInfo",null,a.visualVariables))&&b.valueExpression&&"transparency"===c||(b=this.getVisualVariableByType("rotationInfo",null,a.visualVariables))&&b.valueExpression&&"rotation"===c)?{valueExpression:b.valueExpression,returnType:"esriFieldTypeDouble",shortTitle:b.valueExpressionTitle||b.legendOptions&&b.legendOptions.title}:a.observationRenderer?this.getRendererCustomExpression(a.observationRenderer):
a.latestObservationRenderer?this.getRendererCustomExpression(a.latestObservationRenderer):null},getVisualVariableByType:function(a,c,b){return b&&(b=e.filter(b,function(b){return x.isDefined(c)?b.type===a&&b.target===c:b.type===a&&!b.target}),b.length)?d.clone(b[0]):null}});t("extend-esri")&&d.setObject("esri.dijit.ExpressionEditor",k);return k});