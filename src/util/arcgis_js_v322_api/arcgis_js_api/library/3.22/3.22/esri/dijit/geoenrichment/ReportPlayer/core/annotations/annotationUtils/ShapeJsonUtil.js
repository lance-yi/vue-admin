// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/annotations/annotationUtils/ShapeJsonUtil",["dojo/_base/lang"],function(d){function e(a){h.forEach(function(c){var b=a[c];"string"===typeof b&&f.test(b)&&(a[c]=Number(b.replace(f,"")))})}var g={},h="x y left top width height".split(" "),f=/px$/i;g.createShapeJsonFromShapeObj=function(a,c){var b={id:"shape",g:a.g,viewBox:d.mixin({},a.viewBox),preserveAspectRatio:a.preserveAspectRatio,isPlaceholder:a.isPlaceholder,style:d.mixin({top:a.x||0,left:a.y||
0,width:a.viewBox.width||100,height:a.viewBox.height||100*a.viewBox.height/a.viewBox.width},a.style,c),showAsBar:a.showAsBar,showBarBackground:a.showBarBackground,barBackgroundStyle:{}};e(b.viewBox);e(b.style);return b};return g});