// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/geoenrichment/ReportPlayer/core/templates/DynamicInfographic.html":'\x3cdiv data-dojo-attach-point\x3d"viewDiv" class\x3d"dynamicInfographic_viewDiv"\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"infographicDiv"\x3e\x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"errorDiv" class\x3d"esriGEAbsoluteStretched dynamicInfographic_errorDiv"\x3e${nls.dynamicInfographicError}\x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"waitingDiv"\x3e\x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/geoenrichment/ReportPlayer/core/infographics/DynamicInfographic","dojo/_base/declare dojo/_base/lang dojo/aspect dojo/when dojo/dom-class dojo/dom-style dojo/on dojo/query dijit/focus dijit/_WidgetBase dijit/_TemplatedMixin esri/geometry/Point esri/dijit/geoenrichment/Infographic esri/dijit/geoenrichment/AgePyramid esri/dijit/geoenrichment/RelatedVariables esri/dijit/geoenrichment/OneVar esri/dijit/geoenrichment/Tapestry esri/dijit/geoenrichment/config esri/dijit/geoenrichment/theme esri/tasks/geoenrichment/GeometryStudyArea esri/dijit/geoenrichment/_Invoke ./InfographicTypes esri/dijit/geoenrichment/utils/DomUtil esri/dijit/geoenrichment/utils/WaitingUtil esri/dijit/geoenrichment/utils/DynamicStyleUtil dojo/text!../templates/DynamicInfographic.html dojo/i18n!../../../../../nls/jsapi".split(" "),
function(f,h,C,x,n,g,D,y,z,E,F,p,G,q,r,t,u,A,H,L,I,e,v,J,m,K,w){w=w.geoenrichment.dijit.ReportPlayer.ReportPlayer;var k={};k[e.ONE_VAR]=230;k[e.AGE_PYRAMID]=0;k[e.RELATED_VARS]=320;k[e.TAPESTRY]=300;p=f(null,{_createComboBox:function(){this.inherited(arguments);this.select&&this.select.own(C.after(this.select,"onChange",function(){setTimeout(function(){z.curNode&&z.curNode.blur()})}))},getSelectedFeatureID:function(){return this.select&&this.select.get("value")},setSelectedFeatureID:function(a){this.select&&
this.select.set("value",a)}});q=f([q,p],{infographicStyleProvider:null,_onThemeLoad:function(a){var b=this.infographicStyleProvider&&this.infographicStyleProvider.agePyramid;b&&(a=h.mixin({},a),a.male=a.male||{},a.male.fill=b.male.backgroundColor,a.female=a.female||{},a.female.fill=b.female.backgroundColor);this.inherited(arguments,[a]);if(b){var d=function(a){g.set(a,"color",n.contains(a,"AgePyramid_TextMale")?b.male.backgroundColor:b.female.backgroundColor)};d(this.min);d(this.max)}},resize:function(){this.inherited(arguments);
var a=this.min&&this.min.parentNode;if(a&&this.parent)for(var b=400>g.get(this.parent,"width"),d=0;d<a.children.length;d++)n[b?"add":"remove"](a.children[d],"TrimWithEllipses")}});r=f([r,p],{infographicStyleProvider:null,_themeAddedFlag:!1,updateUI:function(){this.inherited(arguments);if(!this._themeAddedFlag){var a=this.infographicStyleProvider&&this.infographicStyleProvider.agePyramid;if(a){var b=this.parent.id;m.addStyle(["#"+b+" .RelatedVariables_PositiveBar { background-color:"+a.male.backgroundColor+
"; } #"+b+" .RelatedVariables_NegativeBar { background-color:"+a.female.backgroundColor+"; } #"+b+" .RelatedVariables_DifferenceColumn_Positive { color:"+a.male.backgroundColor+"; } #"+b+" .RelatedVariables_DifferenceColumn_Negative { color:"+a.female.backgroundColor+"; }"],b);this._themeAddedFlag=!0}}},destroy:function(){m.removeStyle(this.parent.id);this.inherited(arguments)}});t=f(t,{infographicStyleProvider:null,_themeAddedFlag:!1,updateUI:function(){this.inherited(arguments);if(!this._themeAddedFlag){var a=
this.infographicStyleProvider&&this.infographicStyleProvider.agePyramid;if(a){var b=this.parent.id;m.addStyle(["#"+b+" .OneVarMultiComparison_Expanded_Value_Primary { color:"+a.male.backgroundColor+"; } #"+b+" .OneVarMultiComparison_Expanded_CurrentBar { background-color:"+a.male.backgroundColor+"; }"],b);this._themeAddedFlag=!0}}},destroy:function(){m.removeStyle(this.parent.id);this.inherited(arguments)}});u=f(u,{_toDetailView:function(a){this.inherited(arguments);this.onExpandedStateChanged()},
collapseContent:function(){n.remove(this._mainTable,"clicked");this._toMainView();this.onExpandedStateChanged()},onExpandedStateChanged:function(){}});var l={};l[e.ONE_VAR]=t;l[e.AGE_PYRAMID]=q;l[e.RELATED_VARS]=r;l[e.TAPESTRY]=u;var B=f(G,{infographicStyleProvider:null,widgetParams:null,_requireReport:function(){this.type&&(l[this.type]?this._createReportWidget(this.type,l[this.type]):require([this._getAbsMid("./"+this.type)],h.hitch(this,this._createReportWidget,this.type)))},_createReportWidget:function(a,
b){var d=this;if(!this._destroyed&&this.type==a)if(this._ge&&this._ge.isBusy())D.once(this._ge,"end",h.hitch(this,this._createReportWidget,this.type,b));else if(this._autoTitlePromise)this._autoTitlePromise.then(h.hitch(this,this._createReportWidget,this.type,b));else if(this.type){var c=this._widget=new b(this.domNode);h.mixin(c,this.widgetParams);c.onExpandedStateChanged=function(){d.onExpandedStateChanged()};c.infographicStyleProvider=this.infographicStyleProvider;c.title="string"==typeof this.title?
this.title:this._autoTitle;c.subtitle=this.subtitle;c.expanded=this.expanded;c.on("resize",h.hitch(this,this._onResize));isNaN(this._lastSelectedComparison)||c.setState({selectedComparison:this._lastSelectedComparison});c.setDataProvider(this.dataProvider)}},collapseContent:function(){this._widget&&this._widget.collapseContent&&this._widget.collapseContent()},getSelectedFeatureID:function(){return this._widget&&this._widget.getSelectedFeatureID&&this._widget.getSelectedFeatureID()},setSelectedFeatureID:function(a){this._widget&&
this._widget.setSelectedFeatureID&&this._widget.setSelectedFeatureID(a)},onExpandedStateChanged:function(){}});f=f([E,F,I],{templateString:K,nls:w,viewModel:null,themeContext:null,theme:null,_infographic:null,_progressHanlder:null,postCreate:function(){this.inherited(arguments);this._showError(!1)},_currentInfographicJson:null,_getWidgetCreationParams:function(a){var b={};switch(a.type){case e.AGE_PYRAMID:b.showVerticalAxis=a.showVerticalAxis}return b},updateInfographic:function(a){var b=this;if(this.viewDiv){this._destroyCurrentInfographic();
this._currentInfographicJson=a;var d=this.viewModel.getInfographicDefaultStyles(this.theme||this.themeContext);this._enrichInfographicJsonWithProps(a);if(this.viewModel.dynamicReportInfo&&this.viewModel.dynamicReportInfo.infographicOptions){var c=this.viewModel.dynamicReportInfo.infographicOptions;this._infographic=(new B({infographicStyleProvider:d,widgetParams:this._getWidgetCreationParams(a),returnGeometry:!1,autoTitle:!1,subtitle:!1,levels:a.levels,highestLevel:a.highestLevel,onDataRequest:function(){b._showProgress(!0)},
onDataReady:function(){b._showProgress(!1);b.resize()},onDataError:function(){b._showProgress(!1);b._showError(!0)},onExpandedStateChanged:function(){b._doResize()}})).placeAt(this.infographicDiv);this._infographic.setGeoenrichment(c.createGeoenrichment(a,this.viewModel.dynamicReportInfo.fieldData));this._infographic.set("studyArea",c.studyArea);this._infographic.set("countryID",c.countryID);this._infographic.set("type",a.type);this._showProgress(!0);x(function(){return a.calcData?{title:a.title,
type:a.type,variables:a.variables}:x(c.getOptions().getItems(c.countryID),function(c){b._showProgress(!1);var d;c.some(function(b){if(b.variables&&b.variables.length){var c,f,e=a.variables[0];-1!==e.indexOf(".*")?c=e.replace(".*",""):f=e;e=b.variables[0];if(f&&-1!=e.indexOf(f)||c&&0==e.indexOf(c))return d=b,!0}});return d})}(),function(c){b._showProgress(!1);c?(b._infographic.set("variables",c.variables),b._infographic.set("title",c.title),b._infographic.startup(),b.resize(),a.title=a.title||c.title):
b._showError(!0)})}else this._createDummyInfographic(a);H.set(this.viewDiv,d&&d.agePyramid&&d.agePyramid.theme||"light");g.set(this._infographic.domNode,"backgroundColor",a.style&&a.style.backgroundColor||d&&d.backgroundColor)}},_enrichInfographicJsonWithProps:function(a){a.levels=a.levels||A.levels;a.highestLevel=a.highestLevel||A.highestLevel;a.variables||(a.variables=a.dataCollectionID?[a.dataCollectionID+".*"]:[a.variableID]);delete a.dataCollectionID;delete a.variableID},_createDummyInfographic:function(a){},
_destroyCurrentInfographic:function(){this._showError(!1);this._showProgress(!1);this._infographic&&this._infographic.destroy();this._infographic=null},_isContentLoading:!1,_showProgress:function(a){if(this._isContentLoading)this.onContentLoadingEnd();a&&this.onContentLoadingStart();this._isContentLoading=a;J[a?"showProgress":"removeProgress"](this.waitingDiv)},_showError:function(a){v[a?"show":"hide"](this.errorDiv);v[a?"hide":"show"](this.infographicDiv)},notifyShown:function(){this.resize()},width:null,
height:null,resize:function(a,b){void 0!==a&&(this.width=a,this.height=b);this.invoke("_doResize",50)},_doResize:function(){var a=this;if(this._infographic&&this._infographic.domNode&&v.isNodeInLayout(this.domNode)){var b=this._currentInfographicJson.type,d=Math.max(function(){if("OneVar"==b){var c=y(".OneVarMultiComparison_Table",a.domNode)[0],c=c?g.get(c,"height")+120:0;return Math.max(c,k[b])}return"TapestryNEW"==b?(c=(c=y(".Tapestry_Main_Table",a.domNode)[0])?g.get(c,"height")+60:0,Math.max(c,
k[b])):k[b]}(),this.height);g.set(this._infographic.domNode,{width:this.width-(d>this.height?20:0)+"px",height:d+"px"});g.set(this.viewDiv,{height:this.height+"px",overflowY:"auto"});this._infographic.resize()}},getPreferredHeight:function(){return this._infographic&&g.get(this._infographic.domNode,"height")},collapseContent:function(){this._infographic&&this._infographic.collapseContent()},getVisualState:function(){return{selectedFeatureId:this._infographic&&this._infographic.getSelectedFeatureID()}},
setVisualState:function(a){a&&a.selectedFeatureId&&this._infographic&&this._infographic.setSelectedFeatureID(a.selectedFeatureId)},toJson:function(){return h.clone(this._currentInfographicJson)},onContentLoadingStart:function(){},onContentLoadingEnd:function(){},destroy:function(){this._destroyCurrentInfographic();this.inherited(arguments)}});f.ThemableInfographic=B;return f});