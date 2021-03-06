// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/playerSupports/_MapSupport",["dojo/_base/declare","../core/supportClasses/map/MapBuilder"],function(e,f){return e(null,{_mapBuilder:null,postCreate:function(){this.inherited(arguments);this._mapBuilder=new f},collectMaps:function(a){return a&&a.allAreas?this._mapBuilder.collectAllAreasMaps():this._mapBuilder.collectAreaMaps(this.getCurrentAnalysisAreaIndex())},_resetMapBuilder:function(){this._mapBuilder.reset()},_updateMapPortalUrl:function(){this._mapBuilder.setArcgisUrl(this._reportData&&
this._reportData.config.portalUrl)},_setFallbackMapImageInfos:function(a){this._mapBuilder.setFallbackMapImageInfos(a)},_createMap:function(a,b){var c=this._reportData.analysisAreas[this.getCurrentAnalysisAreaIndex()],d=[c.feature];c.additionalFeatures&&(d=d.concat(c.additionalFeatures));return this._mapBuilder.createMap(a,{webMapId:b&&b.webMapId,features:d,areaIndex:this.getCurrentAnalysisAreaIndex(),defaultBasemapId:this._getDefaultBasemapId()||b.defaultBasemapId})},_getDefaultBasemapId:function(){return null}})});