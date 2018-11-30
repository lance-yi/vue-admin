// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/grid/coreUtils/GridSortUtil","dojo/on dojo/dom-class dojo/dom-construct dojo/dom-style ./GridQueryUtil ./GridLayoutCalculator ../../supportClasses/templateJsonUtils/FieldInfoRenderer esri/dijit/geoenrichment/utils/DomUtil".split(" "),function(r,e,t,n,p,u,v,k){var d={updateSorting:function(a,w){function d(c){var b=c._sortArrow;e.remove(b,"sortArrowUp");e.remove(b,"sortArrowDown");k.hide(b);a._sortInfo&&a._sortInfo.columnId==c.columnId&&("up"==a._sortInfo.state?
(e.add(b,"sortArrowUp"),k.show(b)):"down"==a._sortInfo.state&&(e.add(b,"sortArrowDown"),k.show(b)))}function q(){if(a._sortInfo){if(a._sortInfo.state){for(var c=[],b=a._sortInfo.originalData.slice(),f=0;f<m+1;f++)c.push(b.shift());var l,g;if(a.getNumDynamicColumns()){l={};for(var f=u.calcFeatureCount(a.columns.length,a.getNumFixedColumns(),a.getNumDynamicColumns()),e=a.getNumFixedColumns();a.columns[e];)for(var d=0;d<f;d++)l[a.columns[e++].field]=d}else a.getNumDynamicRows()&&(g={},a._sortInfo.originalData.forEach(function(c,
b){g[c.id]=Math.max(0,b-a.getNumFixedRows())}));var h=a._sortInfo.column.field;b.sort(function(c,b){function f(c){var b=c.fieldInfos&&c.fieldInfos[h];if(b){var d;a.previewFeatureIndex?d=a.previewFeatureIndex:l?d=l[h]:g&&(d=g[c.id]);b.isImage&&b.triggerJson&&b.triggerJson.fieldInfo&&(b=b.triggerJson.fieldInfo);return v.getFieldDataValue(b,a.viewModel.dynamicReportInfo.fieldData,d)||""}return c[h]}var d=f(c),e=f(b),k="down"==a._sortInfo.state;"number"==typeof d||"number"==typeof e?(d=Number(d),e=Number(e),
result=d>e?1:d<e?-1:0):(d=String(d),e=String(e),result=d.localeCompare(e));return k?-result:result});a.store.data=c.concat(b)}else a.store.data=a._sortInfo.originalData;a.refresh({applyCurrentSorting:!1})}}if(!(!a.allowSorting||a.isEmptyTable()||3>a.store.data.length)&&a.viewModel.dynamicReportInfo){for(var x=a.store.data.length-2,h,m,f=0;f<x;f++){var g=p.queryCells(a,{rowIndex:f});if(g&&g.length==a.columns.length){h=g;m=f;break}}if(h){for(f=m+1;f<a.store.data.length;f++)if(g=p.queryCells(a,{rowIndex:f}),
!g||g.length!=a.columns.length)return;h.forEach(function(c){r(c.domNode,"click",function(){var b=a._sortInfo&&a._sortInfo.columnId==c.columnId?a._sortInfo.state:null;a._sortInfo={columnId:c.columnId,column:c.column,state:null,originalData:a._sortInfo?a._sortInfo.originalData:a.store.data.slice()};b?"down"==b?a._sortInfo.state="up":"up"==b&&(a._sortInfo.state=null):a._sortInfo.state="down";h.forEach(d);q()});e.add(c.domNode,"esriGEAdjustableGridValueField");var b=t.create("div",{"class":"sortArrow"},
c.domNode);n.set(b,"top",(c.getHeight()-9)/2+"px");var f=c.getFullStyle();n.set(b,f&&"left"==f.horizontalAlign?"right":"left","5px");c._sortArrow=b;d(c)});w&&q()}}},getSorting:function(a){return a._sortInfo},setSorting:function(a,e){a._sortInfo=e;d.updateSorting(a,!0)}};return d});