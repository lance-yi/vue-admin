// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/playerSupports/_PlayerAreaSelectSupport",["dojo/_base/declare","dojo/string","../PlayerSelect","esri/dijit/geoenrichment/utils/DomUtil","dojo/i18n!../../../../nls/jsapi"],function(b,f,g,e,c){c=c.geoenrichment.dijit.ReportPlayer.ReportPlayer;return b(null,{areasSelect:null,postCreate:function(){this.inherited(arguments);e.hide(this.areasSelectDiv);this._initAreaSelect()},_initAreaSelect:function(){var a=this;this.areasSelect=(new this._getAreasSelectClass)({onUserChange:function(c){a.showAnalysisAreaAt(c)}}).placeAt(this.areasSelectDiv);
this.own(this.areasSelect)},_updateAreaSelect:function(){var a=this._reportData.analysisAreas.length,b=this._reportData.analysisAreas.map(function(d,b){return{label:1===a?d.name||d.shortName:d.shortName||d.name||f.substitute(c.areaIndex,{index:b+1}),value:b}});this.areasSelect.update(b,this.getCurrentAnalysisAreaIndex());e[1<a?"show":"hide"](this.areasSelectDiv);this._updateCurrentAreaTitle()},_getAreasSelectClass:function(){return g},_updateCurrentAreaTitle:function(){var a=this.getCurrentAnalysisArea();
this.areaTitleInnerDiv.innerHTML=a.name||a.shortName}})});