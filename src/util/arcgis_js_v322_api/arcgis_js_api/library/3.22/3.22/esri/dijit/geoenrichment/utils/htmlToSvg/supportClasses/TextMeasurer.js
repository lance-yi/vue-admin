// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/utils/htmlToSvg/supportClasses/TextMeasurer",["dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","./EncodeUtil"],function(n,h,g,x){var v={createTempNode:function(a,d){var c=n.create("div",{style:a.style.getTextStyle()},document.body);g.set(c,{position:"absolute",left:"300px",top:d?"0px":"100px",display:"inline-block",width:d?a.style.cw+"px":"",color:d?"white":"yello"});return c}},y={getParagraphs:function(a,d){function c(a){return a.trim().replace(/ {2,}/g,
" ")}var b=d.style.getTextStyle("whiteSpace"),e="pre-wrap"===b||"pre"===b||"pre-line"==b;e||(a=a.replace(new RegExp(String.fromCharCode(10),"g")," "));(b="pre-wrap"===b||"pre"===b)||(a=c(a));e=e?a.split(String.fromCharCode(10)):[a];1<e.length&&!b&&(e=e.map(c));return e}},t={measureWidth:function(a,d){d.innerHTML=a;return g.get(d,"width")}},r={getLinesForWords:function(a,d,c,b){function e(){var a=c.innerHTML;c.innerHTML="";a=a.split("");return r.getLinesForWords(a,d,c,{checkBreaking:!1,separator:""}).lines}
function m(a){a=a.split("");return r.getLinesForWords(a,d,c,{checkBreaking:!1,separator:"",clearLinesNodeBeforeMeasure:!b.isBreakAll}).lines}var f,p,q=0;b.checkBreaking&&(c.innerHTML="a",p=h.position(c).h);var k=0,l="";b.clearLinesNodeBeforeMeasure&&(c.innerHTML="");a.some(function(a){if(f){var n;b.checkBreaking&&(n=c.innerHTML);c.innerHTML+=b.separator+a;var g=h.position(c).h;if(0<k&&g>k){f.push({text:l,w:t.measureWidth(l,d),lineHeight:q});var w;if(b.checkBreaking&&(g-k>1.2*p||b.isBreakAll)){c.innerHTML=
l+b.separator;var r=m(a);c.innerHTML=n+b.separator+a;1<r.length&&(w=!0,r.forEach(function(a,c){if(c<r.length-1)if(0===c&&b.isBreakAll){var e=f[f.length-1];e.text+=b.separator+a.text;e.w=t.measureWidth(e.text,d)}else f.push(a);else q=a.lineHeight,l=a.text}),k=g)}w||(l=a,q=g-k,k=g)}else l+=b.separator+a,0===k&&(q=k=h.position(c).h)}else if(f=[],c.innerHTML=b.clearLinesNodeBeforeMeasure?a:c.innerHTML+a,l=a,q=k=h.position(c).h,b.checkBreaking&&k>1.2*p){var u=e();1<u.length&&u.forEach(function(a,b){b<
u.length-1?f.push(a):(q=a.lineHeight,l=a.text)})}});f.push({text:l,w:t.measureWidth(l,d),lineHeight:q});a=h.position(c).w;return{lines:f,textWidth:a,lineHeight:q}}},z={getLinesForParagraph:function(a,d,c,b){a=a.split(" ");var e="break-word"===d.style.getTextStyle("overflowWrap");d="break-all"===d.style.getTextStyle("wordBreak");return r.getLinesForWords(a,c,b,{checkBreaking:e||d,isBreakAll:d,clearLinesNodeBeforeMeasure:!0,separator:" "})}},A={getSpanFlowOffsets:function(a,d){function c(a){if(a.parentNode)return"DIV"==
a.parentNode.nodeName?a.parentNode:c(a.parentNode)}var b=c(a),e=g.get(b,"textAlign"),m=a.innerHTML;g.set(b,"textAlign","left");var f=h.position(a);a.innerHTML="a";var p=h.position(a);a.innerHTML=m;g.set(b,"textAlign",e);e=b=0;b="center"==d.style.textAlign?0:p.x-f.x;"right"==d.style.textAlign&&(f=n.create("span",{innerHTML:"|"},a,"after"),p=h.position(a),e=h.position(f),e=p.x+p.w-e.x,n.destroy(f));return{start:b,end:e}}},m={_node:null,_originalInnerHTML:null,_originalNextSiblingDisplay:null,_nextSiblingHiddenFlag:null,
setNode:function(a){this._node=a;this._nextSiblingHiddenFlag=this._originalNextSiblingDisplay=this._originalInnerHTML=null},doPresets:function(){this._originalInnerHTML=this._node.innerHTML;this.hideNextSibling()},undoPresets:function(){this.showNextSibling();this._node.innerHTML=this._originalInnerHTML},hideNextSibling:function(){if(!this._nextSiblingHiddenFlag){var a=this._node;this._originalNextSiblingDisplay=a.nextSibling&&a.nextSibling.style&&a.nextSibling.style.display;a.nextSibling&&a.nextSibling.style&&
(a.nextSibling.style.display="none");this._nextSiblingHiddenFlag=!0}},showNextSibling:function(){if(this._nextSiblingHiddenFlag){var a=this._node;a.nextSibling&&a.nextSibling.style&&(a.nextSibling.style.display=this._originalNextSiblingDisplay||"");this._nextSiblingHiddenFlag=!1}}};return{getLines:function(a,d,c){if(a.innerHTML&&a.innerHTML.trim()){m.setNode(a);m.doPresets();var b=d.isSpanLike?a:v.createTempNode(d,!0),e=v.createTempNode(d),g,f=[];y.getParagraphs(a.innerHTML,d).forEach(function(a){a=
z.getLinesForParagraph(a,d,e,b);g=a.textWidth;f=f.concat(a.lines)});f.forEach(function(a){a.text=x.encodeXML(a.text)});d.isSpanLike&&(b.innerHTML=m._originalInnerHTML,a=h.position(b).h,m.showNextSibling(),c=h.position(b).h,c>a&&(f[f.length-1].lineHeight+=(c-a)/2),m.hideNextSibling());m.undoPresets();n.destroy(e);!d.isSpanLike&&n.destroy(b);return{lines:f,textWidth:g}}},getSpanFlowOffsets:function(a,d){return A.getSpanFlowOffsets(a,d)}}});