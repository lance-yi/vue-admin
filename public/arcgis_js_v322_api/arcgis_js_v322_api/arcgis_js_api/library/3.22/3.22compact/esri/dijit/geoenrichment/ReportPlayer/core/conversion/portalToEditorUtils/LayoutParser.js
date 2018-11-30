// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/conversion/portalToEditorUtils/LayoutParser",["esri/dijit/geoenrichment/utils/JsonXmlConverter","esri/dijit/geoenrichment/ReportPlayer/core/sections/SectionTypes"],function(e,h){function f(a){a=a.templateJson;var c=[];a.sections.forEach(function(a){function d(){b={type:a.type,stack:[]};c.push(b)}var b;d();a.stack.forEach(function(a){if("hr"==a.id){var c=!!b.stack.length;b.stack.push(a);c&&d()}else"table"==a.id?(b.stack.some(function(a){return"table"==
a.id})&&d(),b.stack.push(a)):"pageBreak"==a.id?(b.stack.length&&d(),b.stack.push(a),d()):b.stack.push(a)})});c=c.filter(function(a){return!!a.stack.length});a.sections=c}return{parseReportXML:function(a){function c(){e.queryJson(b,"section",!0).forEach(function(b){d.sections.push(a.parsers.getParser("section").parseSection(b,a))});f(a)}function g(){e.queryJson(b,"table",!0).forEach(function(b){d.sectionsTables.push(a.parsers.getParser("section").parseTable(b,a))})}a.log(a.file.data);var d=a.templateJson,
b=e.parseXml(a.file.data);a.parsers.getParser("document").parseDocument(b,a);a.isGraphicReport?g():c()}}});