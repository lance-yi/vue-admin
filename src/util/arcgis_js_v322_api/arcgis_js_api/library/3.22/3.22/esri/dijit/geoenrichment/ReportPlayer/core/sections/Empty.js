// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/geoenrichment/ReportPlayer/core/templates/Empty.html":'\x3cdiv class\x3d"esriGEReportPlayer_empty"\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"backgroundIcon" class\x3d"empty_backgroundIcon esriGEAbsoluteStretched"\x3e\x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"emptyBorderContainer" class\x3d"emptyBorderContainer"\x3e\x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/geoenrichment/ReportPlayer/core/sections/Empty","dojo/_base/declare dojo/dom-class dojo/dom-style dijit/_WidgetBase dijit/_TemplatedMixin ../themes/ReportThemes esri/dijit/geoenrichment/utils/DomUtil esri/dijit/geoenrichment/ReportPlayer/core/sections/SectionTypes dojo/text!../templates/Empty.html dojo/i18n!../../../../../nls/jsapi".split(" "),function(e,f,b,g,h,k,l,d,m,c){c=c.geoenrichment.dijit.ReportPlayer.ReportPlayer;return e([g,h],{templateString:m,nls:c,viewModel:null,json:null,
initialWidth:null,isSmallSize:!1,_hasImage:!1,postCreate:function(){var a=this.viewModel.reportStyle==k.GRAPHIC;this._hasImage=a;this.json&&(this.isSmallSize=this.json.isSmallSize);this.isSmallSize&&f.add(this.domNode,"emptySmallSize");this.initialWidth&&this.setWidth(this.initialWidth);l[this._hasImage?"show":"hide"](this.backgroundIcon);this.viewModel.dynamicReportInfo||(this.emptyBorderContainer.innerHTML=a?c.emptySectionTextGraphic:c.emptySectionText)},getSectionType:function(){return d.EMPTY},
isEmpty:function(){return!0},isDataSection:function(){return!1},isPageHeader:function(){return!1},isPageFooter:function(){return!1},hasNonEmptyTables:function(){return!1},getSectionName:function(){return""},setWidth:function(a){b.set(this.domNode,"width",a+"px")},getHeight:function(){return b.get(this.domNode,"height")},getResizedHeight:function(){return this.getHeight()},setResizedHeight:function(a){this._hasImage?b.set(this.emptyBorderContainer,"paddingTop",(this.isSmallSize?0:a/2+25)+"px"):b.set(this.emptyBorderContainer,
"paddingTop",(this.isSmallSize?0:a/2-25)+"px");b.set(this.domNode,"height",a+"px")},toJson:function(){return{type:d.EMPTY,isSmallSize:this.isSmallSize}}})});