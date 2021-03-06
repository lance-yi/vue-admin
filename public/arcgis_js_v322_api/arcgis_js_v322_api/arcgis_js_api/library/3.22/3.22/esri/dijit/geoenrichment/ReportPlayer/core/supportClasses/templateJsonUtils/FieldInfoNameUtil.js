// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/supportClasses/templateJsonUtils/FieldInfoNameUtil",[],function(){var c={SCRIPT_PREFIX:"SCRIPT_",DEFAULT_SCRIPT_NAME:"SCRIPT_Custom",SCRIPT_PREFIX_RE:/^SCRIPT_/i,FIRST_SYMBOL_IS_NUMBER_RE:/^[0-9]/,DATA_COLLECTIONS_CALCULATOR_NAME:"dataCollectionsCalculator",MAPS_CALCULATOR_NAME:"mapsCalculator",createFieldNameFromVariable:function(a,d){if(!a)return"";var b;a.isWebMap?b=a.fieldName.replace(/_|\.|\s/g,""):(b=(a.fullName||a).replace(/_|\.|\s/g,""),d=
d||"n",b+="n"==d?"":"_"+d,c.FIRST_SYMBOL_IS_NUMBER_RE.test(b)&&(b="_"+b));return b.toUpperCase()},createFieldNameFromScript:function(a){a=a.name;c.SCRIPT_PREFIX_RE.test(a)&&(a=a.substr(c.SCRIPT_PREFIX.length));return c.SCRIPT_PREFIX+a.replace(/\.|-/g,"")},renderScriptName:function(a){return a.replace(c.SCRIPT_PREFIX_RE,"")},provideQualifiedFieldInfoTemplateName:function(a){a.templateName=c.DATA_COLLECTIONS_CALCULATOR_NAME+"."+a.name}};return c});