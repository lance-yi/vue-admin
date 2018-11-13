// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/conversion/ConversionUtil",["dojo/_base/lang","esri/dijit/geoenrichment/utils/PageUnitsConverter","esri/dijit/geoenrichment/utils/ColorUtil"],function(n,p,q){var b={};n.mixin(b,p);var f={"font-size":"fontSize","font-family":"fontFamily","font-style":"fontStyle","font-weight":"fontWeight","text-decoration":"textDecoration",color:"color","background-color":"backgroundColor"},h={},g;for(g in f)h[f[g]]=g;b.splitTrim=function(a,b,d){a=String(a).split(b).map(function(a){return a.trim()});
return d?a.filter(function(a){return!!a}):a};b.parseStyleString=function(a){var k={};b.splitTrim(a||"",";",!0).forEach(function(a){var c=b.splitTrim(a,":");if(a=f[c[0]])c=c[1],"rgba(0, 0, 0, 0)"==c&&(c="transparent"),k[a]=c});return k};b.composeStyleString=function(a){var b="",d;for(d in a){var c=h[d];if(c){var e=a[d];e&&("backgroundColor"==d&&(e=q.toCSSColor(e)),b+=c+":"+e+";")}}return b};b.removeZeroProperties=function(a){Object.keys(a).forEach(function(b){0===Number(a[b])&&delete a[b]});return a};
var l={valign:{center:"middle"}},m={valign:{middle:"center"}};b.getPropValuePtoE=function(a,b){return l[a]&&l[a][b]||b};b.getPropValueEtoP=function(a,b){return m[a]&&m[a][b]||b};b.REPORT_XML_JOINED_TABLE_NAME="results";b.convertFieldInfoTemplateNameToJoinedTableName=function(a){return a};b.KEY_OPERATOR_RE=/^(!=|>=|<=|<|>|=)/;b.ONE_FIELD_KEY_TEST=/^(default|(<|>|<=|>=|!=|=|)(\d+\.\d+|\d+))$/;b.KEY_INTERVAL_SEPARATOR=";";b.canEmulateMissingVariable=function(a){return!1};return b});