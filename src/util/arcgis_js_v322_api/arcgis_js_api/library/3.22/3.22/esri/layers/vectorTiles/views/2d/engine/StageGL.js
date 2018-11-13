// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/2d/engine/StageGL","require exports ../../../core/tsSupport/extendsHelper ../libs/gl-matrix/common ../libs/gl-matrix/vec2 ../libs/gl-matrix/mat2d ./webgl/BitBlitRenderer ../../support/screenshotUtils ../../../core/promiseUtils ../../webgl/RenderingContext ../../webgl/FramebufferObject ../../webgl/webgl-utils ../../webgl/Program ../../webgl/VertexArrayObject ../../webgl/BufferObject ./webgl/painter/WGLPainter ./Container ./webgl/shaders/glShaderSnippets".split(" "),
function(O,P,C,D,l,x,E,F,G,H,z,I,J,K,A,L,M,B){function y(l){return{budget:l.budget,state:l.state,devicePixelRatio:l.devicePixelRatio,stationary:l.stationary}}var N={png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg"};return function(v){function b(){var a=null!==v&&v.apply(this,arguments)||this;a._clipData=new Float32Array(8);a._upperLeft=l.create();a._upperRight=l.create();a._lowerLeft=l.create();a._lowerRight=l.create();a._mat2=x.create();a._clipRendererInitialized=!1;return a}C(b,v);Object.defineProperty(b.prototype,
"glPainter",{get:function(){return this._painter},enumerable:!0,configurable:!0});b.prototype.createElement=function(){var a=document.createElement("canvas");a.setAttribute("class","esri-display-object");return a};b.prototype.setElement=function(a){this.element=a};b.prototype.attach=function(a){if(this.attached)return!0;this._resizeCanvas(a);var p=I.setupWebGL(this.element,{alpha:!0,antialias:!1,depth:!0,stencil:!0});this._renderingContext=new H(p[0]);this.attached=!0;this._cachedRenderParams=y(a);
this._painter||(this._painter=new L,this._painter.initialize(this._renderingContext));return v.prototype.attach.call(this,a)};b.prototype.detach=function(a){v.prototype.detach.call(this,a);this._renderingContext&&(this._renderingContext.dispose(),this._renderingContext=null);this._cachedRenderParams=null};b.prototype.beforeRenderChildren=function(a,p){var c=a.state,d=this._painter;if(d){var f=this._renderingContext;f.enforceState();d.update(c,a.devicePixelRatio);if(c.spatialReference&&(c.spatialReference._isWrappable?
c.spatialReference._isWrappable():c.spatialReference.isWrappable)){var e=c.width,d=c.height,w=c.rotation,e=Math.round(e*a.devicePixelRatio),d=Math.round(d*a.devicePixelRatio),m=D.toRadian(w),k=Math.abs(Math.cos(m)),b=Math.abs(Math.sin(m)),q=Math.round(c.worldScreenWidth);if(Math.round(e*k+d*b)<=q)this._clipFrame=!1;else{this._clipFBO&&this._clipFBO.width===e&&this._clipFBO.height===d||(this._clipFBO=new z(f,{colorTarget:0,depthStencilTarget:3,width:e,height:d}));var h=.5*e,t=.5*d,c=1/e,u=1/d,q=.5*
q*a.devicePixelRatio,g=.5*(e*b+d*k),e=this._upperLeft,k=this._upperRight,b=this._lowerLeft,n=this._lowerRight;l.set(e,-q,-g);l.set(k,q,-g);l.set(b,-q,g);l.set(n,q,g);x.identity(this._mat2);x.translate(this._mat2,this._mat2,[h,t]);0!==w&&x.rotate(this._mat2,this._mat2,m);l.transformMat2d(e,e,this._mat2);l.transformMat2d(k,k,this._mat2);l.transformMat2d(b,b,this._mat2);l.transformMat2d(n,n,this._mat2);w=this._clipData;w.set([2*b[0]*c-1,2*(d-b[1])*u-1,2*n[0]*c-1,2*(d-n[1])*u-1,2*e[0]*c-1,2*(d-e[1])*
u-1,2*k[0]*c-1,2*(d-k[1])*u-1]);this._clipRendererInitialized||this._initializeClipRenderer(f);this._clipVBO.setData(w);this._boundFBO=f.getBoundFramebufferObject();f.bindFramebuffer(this._clipFBO);f.setDepthWriteEnabled(!0);f.setStencilWriteMask(255);f.setClearColor(0,0,0,0);f.setClearDepth(1);f.setClearStencil(0);f.clear(f.gl.COLOR_BUFFER_BIT|f.gl.DEPTH_BUFFER_BIT|f.gl.STENCIL_BUFFER_BIT);f.setDepthWriteEnabled(!1);this._clipFrame=!0}}else this._clipFrame=!1}};b.prototype.afterRenderChildren=function(a,
p){if(this._clipFrame&&this._clipRendererInitialized){var c=this._renderingContext;c.bindFramebuffer(this._boundFBO);this._boundFBO=null;c.bindVAO(this._clipVAO);c.bindProgram(this._clipStencilProgram);c.setDepthWriteEnabled(!1);c.setDepthTestEnabled(!1);c.setStencilTestEnabled(!0);c.setBlendingEnabled(!1);c.setColorMask(!1,!1,!1,!1);c.setStencilOp(7680,7680,7681);c.setStencilWriteMask(255);c.setStencilFunction(519,1,255);c.drawElements(4,6,5123,0);c.bindVAO();c.setColorMask(!0,!0,!0,!0);c.setBlendingEnabled(!0);
c.setStencilFunction(514,1,255);this._blitRenderer.render(c,this._clipFBO.colorTexture,9728,1);c.setStencilTestEnabled(!1)}};b.prototype.doRender=function(a){var p=this.element.style;this.visible?(p.display="block",p.opacity=""+this.opacity,this._resizeCanvas(a),v.prototype.doRender.call(this,a),this._cachedRenderParams=y(a)):p.display="none"};b.prototype.takeScreenshot=function(a){void 0===a&&(a={});var p=a.pixelRatio||1;this._cachedRenderParams.devicePixelRatio=p;var c=Math.round(p*this._cachedRenderParams.state.width),
d=Math.round(p*this._cachedRenderParams.state.height),f=0,e=0,b=c,m=d,k=c,l=d;if(k=a.area)f=Math.round(p*k.x),e=Math.round(p*k.y),b=Math.round(p*k.width),m=Math.round(p*k.height);void 0!==a.width&&void 0!==a.height?(k=a.width/a.height,m*k<b?(k*=m,f+=Math.floor((b-k)/2),b=Math.floor(k)):(k=b/k,e+=Math.floor((m-k)/2),m=Math.floor(k)),k=a.width,l=a.height):(k=b,l=m);p=document.createElement("canvas");p.width=k;p.height=l;var q=p.getContext("2d"),h=new Uint8Array(b*m*4),t=this._renderingContext,u=z.create(t,
{colorTarget:1,depthStencilTarget:3,width:c,height:d});t.bindFramebuffer(u);t.setViewport(0,0,c,d);this._cachedRenderParams.budget&&this._cachedRenderParams.budget.reset(Number.MAX_VALUE);var g=this._cachedRenderParams,n=this._renderingContext.gl;this._renderingContext.setClearColor(0,0,0,0);this._renderingContext.setClearDepth(1);this._renderingContext.setClearStencil(0);this._renderingContext.clear(n.COLOR_BUFFER_BIT|n.DEPTH_BUFFER_BIT|n.STENCIL_BUFFER_BIT);g.context=this._renderingContext;this.beforeRenderChildren(g,
g);if(void 0!==a.rotation&&null!==a.rotation){var n=g.state,r=n.clone();r.viewpoint.rotation=a.rotation;g.state=r;this.renderChildren(g);g.state=n}else this.renderChildren(g);this.afterRenderChildren(g,g);u.readPixels(f,d-(e+m),b,m,6408,5121,h);t.bindFramebuffer();t=q.getImageData(0,0,k,l);if(0!==f||0!==e||b!==c||m!==d||k!==c||l!==d)F.resampleHermite(h,b,m,t.data,k,l,!0);else{e=m-1;m=0;u=4*b;for(r=n=f=d=c=b=g=void 0;m<e;){n=m*u;r=e*u;for(g=0;g<u;g+=4)b=h[n+g],c=h[n+g+1],d=h[n+g+2],f=h[n+g+3],h[n+
g]=h[r+g],h[n+g+1]=h[r+g+1],h[n+g+2]=h[r+g+2],h[n+g+3]=h[r+g+3],h[r+g]=b,h[r+g+1]=c,h[r+g+2]=d,h[r+g+3]=f;m++;e--}b=t.data;c=h.length;for(e=0;e<c;e++)b[e]=h[e]}h=t.data;m=h.length;for(e=0;e<m;e+=4)f=h[e+3],0<f&&(d=f/255,b=Math.floor(h[e+0]/d),c=Math.floor(h[e+1]/d),d=Math.floor(h[e+2]/d),h[e+0]=255>=b?b:255,h[e+1]=255>=c?c:255,h[e+2]=255>=d?d:255);q.putImageData(t,0,0);q=N[a.format?a.format.toLowerCase():"png"];h=1;void 0!==a.quality&&(h=a.quality/100);a=p.toDataURL(q,h);return G.resolve({dataURL:a,
x:0,y:0,width:k,height:l})};b.prototype.prepareChildrenRenderParameters=function(a){if(!this.attached||!this._renderingContext)return null;a=y(a);var b=this._renderingContext,c=b.gl;b.setDepthWriteEnabled(!0);b.setStencilWriteMask(255);b.setClearColor(0,0,0,0);b.setClearDepth(1);b.setClearStencil(0);b.clear(c.COLOR_BUFFER_BIT|c.DEPTH_BUFFER_BIT|c.STENCIL_BUFFER_BIT);b.setViewport(0,0,this.element.width,this.element.height);b.setDepthWriteEnabled(!1);a.context=b;return a};b.prototype.attachChild=function(a,
b){return a.attach(b)};b.prototype.detachChild=function(a,b){return a.detach(b)};b.prototype.renderChild=function(a,b){return a.processRender(b)};b.prototype._resizeCanvas=function(a){var b=this.element,c=b.style,d=a.state,f=a.devicePixelRatio;a=Math.round(d.width*f);f=Math.round(d.height*f);if(b.width!==a||b.height!==f)b.width=a,b.height=f;c.width=d.width+"px";c.height=d.height+"px"};b.prototype._initializeClipRenderer=function(a){if(this._clipRendererInitialized)return!0;this._blitRenderer=new E;
var b={a_pos:0},c=new J(a,B.stencilVS,B.stencilFS,b);if(!c)return!1;var d=A.createVertex(a,35040,32),f=new Uint16Array([0,1,2,2,1,3]),f=A.createIndex(a,35044,f);a=new K(a,b,{geometry:[{name:"a_pos",count:2,type:5126,offset:0,stride:8,normalized:!1,divisor:0}]},{geometry:d},f);this._clipStencilProgram=c;this._clipVBO=d;this._clipVAO=a;return this._clipRendererInitialized=!0};return b}(M)});