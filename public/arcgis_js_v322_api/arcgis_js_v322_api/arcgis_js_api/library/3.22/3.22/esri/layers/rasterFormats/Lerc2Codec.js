// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
define("esri/layers/rasterFormats/Lerc2Codec",[],function(){var C={unstuff:function(b,a,d,c,f,k,h,m){var n=(1<<d)-1,e=0,g,l=0,p,q;b[b.length-1]<<=8*(4*b.length-Math.ceil(d*c/8));if(f)for(g=0;g<c;g++)0===l&&(q=b[e++],l=32),l>=d?(p=q>>>l-d&n,l-=d):(l=d-l,p=(q&n)<<l&n,q=b[e++],l=32-l,p+=q>>>l),a[g]=f[p];else for(f=Math.ceil((m-k)/h),g=0;g<c;g++)0===l&&(q=b[e++],l=32),l>=d?(p=q>>>l-d&n,l-=d):(l=d-l,p=(q&n)<<l&n,q=b[e++],l=32-l,p+=q>>>l),a[g]=p<f?k+p*h:m},unstuffLUT:function(b,a,d,c,f,k){var h=(1<<a)-
1,m=0,n=0,e=0,g=e=0,l,p=[];b[b.length-1]<<=8*(4*b.length-Math.ceil(a*d/8));for(var q=Math.ceil((k-c)/f),n=0;n<d;n++)0===e&&(l=b[m++],e=32),e>=a?(g=l>>>e-a&h,e-=a):(e=a-e,g=(l&h)<<e&h,l=b[m++],e=32-e,g+=l>>>e),p[n]=g<q?c+g*f:k;p.unshift(c);return p},unstuff2:function(b,a,d,c,f,k,h,m){var n=(1<<d)-1,e=0,g,l=0,p=0,q,t,r;if(f)for(g=0;g<c;g++)0===l&&(t=b[e++],l=32,p=0),l>=d?(q=t>>>p&n,l-=d,p+=d):(r=d-l,q=t>>>p&n,t=b[e++],l=32-r,q|=(t&(1<<r)-1)<<d-r,p=r),a[g]=f[q];else for(f=Math.ceil((m-k)/h),g=0;g<c;g++)0===
l&&(t=b[e++],l=32,p=0),l>=d?(q=t>>>p&n,l-=d,p+=d):(r=d-l,q=t>>>p&n,t=b[e++],l=32-r,q|=(t&(1<<r)-1)<<d-r,p=r),a[g]=q<f?k+q*h:m;return a},unstuffLUT2:function(b,a,d,c,f,k){for(var h=(1<<a)-1,m=0,n=0,e=0,g=0,l=0,p=0,q,t=[],r=Math.ceil((k-c)/f),n=0;n<d;n++)0===g&&(q=b[m++],g=32,p=0),g>=a?(l=q>>>p&h,g-=a,p+=a):(e=a-g,l=q>>>p&h,q=b[m++],g=32-e,l|=(q&(1<<e)-1)<<a-e,p=e),t[n]=l<r?c+l*f:k;t.unshift(c);return t},originalUnstuff:function(b,a,d,c){var f=(1<<d)-1,k=0,h,m=0,n,e;b[b.length-1]<<=8*(4*b.length-Math.ceil(d*
c/8));for(h=0;h<c;h++)0===m&&(e=b[k++],m=32),m>=d?(n=e>>>m-d&f,m-=d):(m=d-m,n=(e&f)<<m&f,e=b[k++],m=32-m,n+=e>>>m),a[h]=n;return a},originalUnstuff2:function(b,a,d,c){var f=(1<<d)-1,k=0,h,m=0,n=0,e,g,l;for(h=0;h<c;h++)0===m&&(g=b[k++],m=32,n=0),m>=d?(e=g>>>n&f,m-=d,n+=d):(l=d-m,e=g>>>n&f,g=b[k++],m=32-l,e|=(g&(1<<l)-1)<<d-l,n=l),a[h]=e;return a}},w={HUFFMAN_LUT_BITS_MAX:12,computeChecksumFletcher32:function(b){for(var a=65535,d=65535,c=b.length,f=Math.floor(c/2),k=0;f;){var h=359<=f?359:f,f=f-h;do a+=
b[k++]<<8,d+=a+=b[k++];while(--h);a=(a&65535)+(a>>>16);d=(d&65535)+(d>>>16)}c&1&&(d+=a+=b[k]<<8);return((d&65535)+(d>>>16)<<16|(a&65535)+(a>>>16))>>>0},readHeaderInfo:function(b,a){var d=a.ptr,c=new Uint8Array(b,d,6),f={};f.fileIdentifierString=String.fromCharCode.apply(null,c);if(0!==f.fileIdentifierString.lastIndexOf("Lerc2",0))throw"Unexpected file identifier string (expect Lerc2 ): "+f.fileIdentifierString;d+=6;c=new DataView(b,d,52);f.fileVersion=c.getInt32(0,!0);d+=4;3<=f.fileVersion&&(f.checksum=
c.getUint32(4,!0),d+=4);c=new DataView(b,d,48);f.height=c.getUint32(0,!0);f.width=c.getUint32(4,!0);f.numValidPixel=c.getUint32(8,!0);f.microBlockSize=c.getInt32(12,!0);f.blobSize=c.getInt32(16,!0);f.imageType=c.getInt32(20,!0);f.maxZError=c.getFloat64(24,!0);f.zMin=c.getFloat64(32,!0);f.zMax=c.getFloat64(40,!0);d+=48;a.headerInfo=f;a.ptr=d;if(3<=f.fileVersion&&(d=this.computeChecksumFletcher32(new Uint8Array(b,d-48,f.blobSize-14)),d!==f.checksum))throw"Checksum failed.";return!0},readMask:function(b,
a){var d=a.ptr,c=a.headerInfo,f=c.width*c.height,k=c.numValidPixel,h=new DataView(b,d,4),c={};c.numBytes=h.getUint32(0,!0);d+=4;if((0===k||f===k)&&0!==c.numBytes)throw"invalid mask";if(0===k)k=new Uint8Array(Math.ceil(f/8)),c.bitset=k,h=new Uint8Array(f),a.pixels.resultMask=h,d+=c.numBytes;else if(0<c.numBytes){var k=new Uint8Array(Math.ceil(f/8)),h=new DataView(b,d,c.numBytes),m=h.getInt16(0,!0),n=2,e=0,g=0;do{if(0<m)for(;m--;)k[e++]=h.getUint8(n++);else for(g=h.getUint8(n++),m=-m;m--;)k[e++]=g;
m=h.getInt16(n,!0);n+=2}while(n<c.numBytes);if(-32768!==m||e<k.length)throw"Unexpected end of mask RLE encoding";h=new Uint8Array(f);for(n=n=m=0;n<f;n++)n&7?(m=k[n>>3],m<<=n&7):m=k[n>>3],m&128&&(h[n]=1);a.pixels.resultMask=h;c.bitset=k;d+=c.numBytes}a.ptr=d;a.mask=c;return!0},readDataOneSweep:function(b,a,d){var c=a.ptr,f=a.headerInfo,k=f.width*f.height,f=f.numValidPixel*w.getDateTypeSize(f.imageType);if(d===Uint8Array)b=new Uint8Array(b,c,f);else{var h=new ArrayBuffer(f);(new Uint8Array(h)).set(new Uint8Array(b,
c,f));b=new d(h)}if(b.length===k)a.pixels.resultPixels=b;else for(a.pixels.resultPixels=new d(k),h=h=d=0;h<k;h++)a.pixels.resultMask[h]&&(a.pixels.resultPixels[h]=b[d++]);a.ptr=c+f;return!0},readHuffman:function(b,a,d){var c=a.headerInfo,f=c.width*c.height,k=this.HUFFMAN_LUT_BITS_MAX,c=new DataView(b,a.ptr,16);a.ptr+=16;if(2>c.getInt32(0,!0))throw"unsupported Huffman version";var h=c.getInt32(4,!0),m=c.getInt32(8,!0),n=c.getInt32(12,!0);if(m>=n)return!1;var e=new Uint32Array(n-m);w.decodeBits(b,a,
e);for(var g=[],l,p,c=m;c<n;c++)l=c-(c<h?0:h),g[l]={first:e[c-m],second:null};c=b.byteLength-a.ptr;e=new ArrayBuffer(4*Math.ceil(c/4));(new Uint8Array(e)).set(new Uint8Array(b,a.ptr,c));b=new Uint32Array(e);var e=0,q,t=0;q=b[0];for(c=m;c<n;c++)l=c-(c<h?0:h),p=g[l].first,0<p&&(g[l].second=q<<e>>>32-p,32-e>=p?(e+=p,32===e&&(e=0,t++,q=b[t])):(e+=p-32,t++,q=b[t],g[l].second|=q>>>32-e));for(var r=0===a.headerInfo.imageType?128:0,y=a.headerInfo.height,B=a.headerInfo.width,u=0,x=0,z=new D,c=0;c<g.length;c++)void 0!==
g[c]&&(u=Math.max(u,g[c].first));x=u>=k?k:u;30<=u&&console.log("WARning, large NUM LUT BITS IS "+u);for(var k=[],v,c=m;c<n;c++)if(l=c-(c<h?0:h),p=g[l].first,0<p)if(q=[p,l],p<=x)for(l=g[l].second<<x-p,v=1<<x-p,m=0;m<v;m++)k[l|m]=q;else for(l=g[l].second,v=z,m=p-1;0<=m;m--)(p=l>>>m&1)?(v.right||(v.right=new D),v=v.right):(v.left||(v.left=new D),v=v.left),0!==m||v.val||(v.val=q[1]);var h=a.pixels.resultMask,A,g=n=0;0<e&&(t++,e=0);q=b[t];d=new d(f);if(a.headerInfo.numValidPixel===B*y)for(c=m=0;c<y;c++)for(l=
0;l<B;l++,m++){f=0;g=A=q<<e>>>32-x;32-e<x&&(g=A|=b[t+1]>>>64-e-x);if(k[g])f=k[g][1],e+=k[g][0];else for(g=A=q<<e>>>32-u,32-e<u&&(g=A|=b[t+1]>>>64-e-u),v=z,g=0;g<u;g++)if(v=(p=A>>>u-g-1&1)?v.right:v.left,!v.left&&!v.right){f=v.val;e=e+g+1;break}32<=e&&(e-=32,t++,q=b[t]);f-=r;f=0<l?f+n:0<c?f+d[m-B]:f+n;f&=255;n=d[m]=f}else for(c=m=0;c<y;c++)for(l=0;l<B;l++,m++)if(h[m]){f=0;g=A=q<<e>>>32-x;32-e<x&&(g=A|=b[t+1]>>>64-e-x);if(k[g])f=k[g][1],e+=k[g][0];else for(g=A=q<<e>>>32-u,32-e<u&&(g=A|=b[t+1]>>>64-
e-u),v=z,g=0;g<u;g++)if(v=(p=A>>>u-g-1&1)?v.right:v.left,!v.left&&!v.right){f=v.val;e=e+g+1;break}32<=e&&(e-=32,t++,q=b[t]);f-=r;f=0<l&&h[m-1]?f+n:0<c&&h[m-B]?f+d[m-B]:f+n;f&=255;n=d[m]=f}a.pixels.resultPixels=d;a.ptr=a.ptr+4*(t+1)+(0<e?4:0)},decodeBits:function(b,a,d,c){var f=a.headerInfo.fileVersion,k=0,h=new DataView(b,a.ptr,5),m=h.getUint8(0);k++;var n=m>>6,e=0===n?4:3-n,g=0<(m&32)?!0:!1,n=m&31,m=0;if(1===e)m=h.getUint8(k),k++;else if(2===e)m=h.getUint16(k,!0),k+=2;else if(4===e)m=h.getUint32(k,
!0),k+=4;else throw"Invalid valid pixel count type";var e=2*a.headerInfo.maxZError,l,p,q;if(g){a.counter.lut++;q=h.getUint8(k);k++;g=Math.ceil((q-1)*n/8);l=Math.ceil(g/4);l=new ArrayBuffer(4*l);p=new Uint8Array(l);a.ptr+=k;p.set(new Uint8Array(b,a.ptr,g));k=new Uint32Array(l);a.ptr+=g;for(h=0;q-1>>>h;)h++;g=Math.ceil(m*h/8);l=Math.ceil(g/4);l=new ArrayBuffer(4*l);p=new Uint8Array(l);p.set(new Uint8Array(b,a.ptr,g));b=new Uint32Array(l);a.ptr+=g;a=3<=f?C.unstuffLUT2(k,n,q-1,c,e,a.headerInfo.zMax):
C.unstuffLUT(k,n,q-1,c,e,a.headerInfo.zMax);3<=f?C.unstuff2(b,d,h,m,a):C.unstuff(b,d,h,m,a)}else a.counter.bitstuffer++,h=n,a.ptr+=k,0<h&&(g=Math.ceil(m*h/8),l=Math.ceil(g/4),l=new ArrayBuffer(4*l),p=new Uint8Array(l),p.set(new Uint8Array(b,a.ptr,g)),b=new Uint32Array(l),a.ptr+=g,3<=f?null==c?C.originalUnstuff2(b,d,h,m):C.unstuff2(b,d,h,m,!1,c,e,a.headerInfo.zMax):null==c?C.originalUnstuff(b,d,h,m):C.unstuff(b,d,h,m,!1,c,e,a.headerInfo.zMax))},readTiles:function(b,a,d){var c=a.headerInfo,f=c.width,
k=c.height,h=c.microBlockSize,c=c.imageType,m=Math.ceil(f/h),n=Math.ceil(k/h);a.pixels.numBlocksY=n;a.pixels.numBlocksX=m;for(var e=a.pixels.ptr=0,g=0,l=0,p=0,q=0,t=0,r=0,y=0,B=e=0,u=0,x=0,r=r=e=r=0,z,v=new d(h*h),k=k%h||h,A=f%h||h,l=0;l<n;l++)for(q=l!==n-1?h:k,p=0;p<m;p++){t=p!==m-1?h:A;u=l*f*h+p*h;x=f-t;r=b.byteLength-a.ptr;g=new DataView(b,a.ptr,Math.min(10,r));z={};r=0;y=g.getUint8(0);r++;e=y>>6&255;B=y>>2&15;if(B!==(p*h>>3&15))throw"integrity issue";y&=3;if(3<y)throw a.ptr+=r,"Invalid block encoding ("+
y+")";if(2===y)a.counter.constant++,a.ptr+=r;else if(0===y){a.counter.uncompressed++;a.ptr+=r;r=q*t*w.getDateTypeSize(c);e=b.byteLength-a.ptr;r=r<e?r:e;e=new ArrayBuffer(r);g=new Uint8Array(e);g.set(new Uint8Array(b,a.ptr,r));z=new d(e);r=0;if(a.pixels.resultMask)for(e=0;e<q;e++){for(g=0;g<t;g++)a.pixels.resultMask[u]&&(a.pixels.resultPixels[u]=z[r++]),u++;u+=x}else for(e=0;e<q;e++){for(g=0;g<t;g++)a.pixels.resultPixels[u++]=z[r++];u+=x}a.ptr+=r*w.getDateTypeSize(c)}else if(e=w.getDataTypeUsed(c,
e),z=w.getOnePixel(z,r,e,g),r+=w.getDateTypeSize(e),3===y)if(a.ptr+=r,a.counter.constantoffset++,a.pixels.resultMask)for(e=0;e<q;e++){for(g=0;g<t;g++)a.pixels.resultMask[u]&&(a.pixels.resultPixels[u]=z),u++;u+=x}else for(e=0;e<q;e++){for(g=0;g<t;g++)a.pixels.resultPixels[u++]=z;u+=x}else if(a.ptr+=r,w.decodeBits(b,a,v,z),r=0,a.pixels.resultMask)for(e=0;e<q;e++){for(g=0;g<t;g++)a.pixels.resultMask[u]&&(a.pixels.resultPixels[u]=v[r++]),u++;u+=x}else for(e=0;e<q;e++){for(g=0;g<t;g++)a.pixels.resultPixels[u++]=
v[r++];u+=x}}},formatFileInfo:function(b){return{fileIdentifierString:b.headerInfo.fileIdentifierString,fileVersion:b.headerInfo.fileVersion,imageType:b.headerInfo.imageType,height:b.headerInfo.height,width:b.headerInfo.width,numValidPixel:b.headerInfo.numValidPixel,microBlockSize:b.headerInfo.microBlockSize,blobSize:b.headerInfo.blobSize,maxZError:b.headerInfo.maxZError,pixelType:w.getPixelType(b.headerInfo.imageType),eofOffset:b.eofOffset,mask:b.mask?{numBytes:b.mask.numBytes}:null,pixels:{numBlocksX:b.pixels.numBlocksX,
numBlocksY:b.pixels.numBlocksY,maxValue:b.headerInfo.zMax,minValue:b.headerInfo.zMin,noDataValue:b.noDataValue}}},constructConstantSurface:function(b){var a=b.headerInfo.zMax,d=b.headerInfo.height*b.headerInfo.width,c=0;if(b.pixels.resultMask)for(c=0;c<d;c++)b.pixels.resultMask[c]&&(b.pixels.resultPixels[c]=a);else for(c=0;c<d;c++)b.pixels.resultPixels[c]=a},getDataTypeArray:function(b){switch(b){case 0:b=Int8Array;break;case 1:b=Uint8Array;break;case 2:b=Int16Array;break;case 3:b=Uint16Array;break;
case 4:b=Int32Array;break;case 5:b=Uint32Array;break;case 6:b=Float32Array;break;case 7:b=Float64Array;break;default:b=Float32Array}return b},getPixelType:function(b){switch(b){case 0:b="S8";break;case 1:b="U8";break;case 2:b="S16";break;case 3:b="U16";break;case 4:b="S32";break;case 5:b="U32";break;case 6:b="F32";break;case 7:b="F64";break;default:b="F32"}return b},isValidPixelValue:function(b,a){if(null===a||void 0===a)return!1;var d;switch(b){case 0:d=-128<=a&&127>=a;break;case 1:d=0<=a&&255>=
a;break;case 2:d=-32768<=a&&32767>=a;break;case 3:d=0<=a&&65536>=a;break;case 4:d=-2147483648<=a&&2147483647>=a;break;case 5:d=0<=a&&4294967296>=a;break;case 6:d=-3.4027999387901484E38<=a&&3.4027999387901484E38>=a;break;case 7:d=4.9E-324<=a&&1.7976931348623157E308>=a;break;default:d=!1}return d},getDateTypeSize:function(b){var a=0;switch(b){case 0:case 1:a=1;break;case 2:case 3:a=2;break;case 4:case 5:case 6:a=4;break;case 7:a=8;break;default:a=b}return a},getDataTypeUsed:function(b,a){var d=b;switch(b){case 2:case 4:d=
b-a;break;case 3:case 5:d=b-2*a;break;case 6:d=0===a?b:1===a?2:1;break;case 7:d=0===a?b:b-2*a+1;break;default:d=b}return d},getOnePixel:function(b,a,d,c){b=0;switch(d){case 0:b=c.getInt8(a);break;case 1:b=c.getUint8(a);break;case 2:b=c.getInt16(a,!0);break;case 3:b=c.getUint16(a,!0);break;case 4:b=c.getInt32(a,!0);break;case 5:b=c.getUInt32(a,!0);break;case 6:b=c.getFloat32(a,!0);break;case 7:b=c.getFloat64(a,!0);break;default:throw"the decoder does not understand this pixel type";}return b}},D=function(b,
a,d){this.val=b;this.left=a;this.right=d};return{decode:function(b,a){a=a||{};var d=a.maskData||null===a.maskData,c=a.noDataValue,f=0,k={};k.ptr=a.inputOffset||0;k.pixels={};if(w.readHeaderInfo(b,k)){var f=k.headerInfo,h=w.getDataTypeArray(f.imageType);if(d)k.pixels.resultMask=a.maskData,k.ptr+=4;else if(!w.readMask(b,k))return;d=f.width*f.height;k.pixels.resultPixels=new h(d);k.counter={onesweep:0,uncompressed:0,lut:0,bitstuffer:0,constant:0,constantoffset:0};if(0!==f.numValidPixel)if(f.zMax===f.zMin)w.constructConstantSurface(k);
else{var m=new DataView(b,k.ptr,2),n=m.getUint8(0,!0);k.ptr++;n?w.readDataOneSweep(b,k,h):1<f.fileVersion&&1>=f.imageType&&1E-5>Math.abs(f.maxZError-.5)?(m=m.getUint8(1,!0),k.ptr++,m?w.readHuffman(b,k,h):w.readTiles(b,k,h)):w.readTiles(b,k,h)}k.eofOffset=k.ptr;a.inputOffset?(h=k.headerInfo.blobSize+a.inputOffset-k.ptr,1<=Math.abs(h)&&(k.eofOffset=a.inputOffset+k.headerInfo.blobSize)):(h=k.headerInfo.blobSize-k.ptr,1<=Math.abs(h)&&(k.eofOffset=k.headerInfo.blobSize));h={width:f.width,height:f.height,
pixelData:k.pixels.resultPixels,minValue:f.zMin,maxValue:f.zMax,maskData:k.pixels.resultMask};if(k.pixels.resultMask&&w.isValidPixelValue(f.imageType,c)){m=k.pixels.resultMask;for(f=0;f<d;f++)m[f]||(h.pixelData[f]=c);h.noDataValue=c}k.noDataValue=c;a.returnFileInfo&&(h.fileInfo=w.formatFileInfo(k));return h}},getBandCount:function(b){for(var a=0,d=0,c={ptr:0,pixels:{}};d<b.byteLength-58;)w.readHeaderInfo(b,c),d+=c.headerInfo.blobSize,a++,c.ptr=d;return a}}});