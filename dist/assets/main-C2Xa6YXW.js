import{g as I,S as Ee,s as la,e as w,a as ke,m as da,h as ca,n as ua,c as pa,i as fa,b as va,p as ha,r as ma,d as _a,f as ga,j as ya}from"./hud-D7Brf-1V.js";function ba(a,n){return a?`#version 300 es
precision highp float;
`+(n==="vs"?`#define ATTR in
#define VARY out
`:`#define VARY in
#define TEX texture
out vec4 fragOut;
#define FRAG fragOut
`):n==="vs"?`precision highp float;
#define ATTR attribute
#define VARY varying
`:`#extension GL_OES_standard_derivatives : enable
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
#define VARY varying
#define TEX texture2D
#define FRAG gl_FragColor
`}function wa(a){var n={alpha:!0,premultipliedAlpha:!0,antialias:!0,depth:!0,stencil:!1,preserveDrawingBuffer:!1,powerPreference:"high-performance"},e=a.getContext("webgl2",n);return e?{gl:e,isGL2:!0}:(e=a.getContext("webgl",n),e&&e.getExtension("OES_standard_derivatives")?{gl:e,isGL2:!1}:null)}function We(a,n,e){var t=a.gl;function i(g,u,p){var v=t.createShader(g);if(t.shaderSource(v,ba(a.isGL2,p)+u),t.compileShader(v),!t.getShaderParameter(v,t.COMPILE_STATUS)){var E=t.getShaderInfoLog(v);throw t.deleteShader(v),new Error(p+" shader failed to compile: "+E)}return v}var r=i(t.VERTEX_SHADER,n,"vs"),s=i(t.FRAGMENT_SHADER,e,"fs"),o=t.createProgram();if(t.attachShader(o,r),t.attachShader(o,s),t.bindAttribLocation(o,0,"aPos"),t.linkProgram(o),t.deleteShader(r),t.deleteShader(s),!t.getProgramParameter(o,t.LINK_STATUS))throw new Error("shader program failed to link: "+t.getProgramInfoLog(o));for(var l={},c=t.getProgramParameter(o,t.ACTIVE_UNIFORMS),f=0;f<c;f++){var y=t.getActiveUniform(o,f).name.replace(/\[0\]$/,"");l[y]=t.getUniformLocation(o,y)}return{prog:o,u:l}}function Ea(a,n,e,t){var i=1/Math.tan(a/2),r=1/(e-t);return new Float32Array([i/n,0,0,0,0,i,0,0,0,0,(t+e)*r,-1,0,0,2*t*e*r,0])}function ce(a,n,e){return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,a,n,e,1])}function _e(a,n,e,t){var i=Math.hypot(a,n,e)||1;a/=i,n/=i,e/=i;var r=Math.sin(t),s=Math.cos(t),o=1-s;return new Float32Array([o*a*a+s,o*a*n+r*e,o*a*e-r*n,0,o*a*n-r*e,o*n*n+s,o*n*e+r*a,0,o*a*e+r*n,o*n*e-r*a,o*e*e+s,0,0,0,0,1])}function Ta(a,n){for(var e=new Float32Array(16),t=0;t<4;t++)for(var i=0;i<4;i++)e[t*4+i]=a[i]*n[t*4]+a[4+i]*n[t*4+1]+a[8+i]*n[t*4+2]+a[12+i]*n[t*4+3];return e}function Ma(){for(var a=arguments[0],n=1;n<arguments.length;n++)a=Ta(a,arguments[n]);return a}function Xe(a){var n=/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/.exec(a||"");return n?[n[1]/255,n[2]/255,n[3]/255]:[0,0,0]}function Aa(a){var n=document.createElement("canvas");n.className="fx",n.setAttribute("aria-hidden","true"),a.appendChild(n);var e=wa(n);if(!e)return n.remove(),null;var t=e.gl,i=window.matchMedia("(pointer: coarse)").matches,r=[],s=[],o=!0,l=!1,c=!1,f={w:1,h:1,dpr:1},y={ok:!0,ctx:e,gl:t,canvas:n,size:f,add:function(p){return r.push(p),p},remove:function(p){var v=r.indexOf(p);v>=0&&r.splice(v,1),o=!0},invalidate:function(){o=!0},onLost:function(p){return s.push(p),function(){var v=s.indexOf(p);v>=0&&s.splice(v,1)}},cache:{}};function g(){var p=Math.min(window.devicePixelRatio||1,i?1.5:2),v=Math.max(1,a.clientWidth),E=Math.max(1,a.clientHeight);f.w=v,f.h=E,f.dpr=p,n.width=Math.round(v*p),n.height=Math.round(E*p),l=!0}typeof ResizeObserver<"u"?new ResizeObserver(function(){l=!1,o=!0}).observe(a):window.addEventListener("resize",function(){l=!1,o=!0});function u(){if(!(!o||!y.ok)){o=!1,l||g();for(var p=!1,v=!1,E=0;E<r.length;E++)if(r[E].visible){p=!0;break}if(!(!p&&!c)){t.viewport(0,0,n.width,n.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT);for(var T=0;T<r.length;T++){var m=r[T];m.visible&&(m.draw(f),m.animating&&(v=!0))}p!==c&&(n.style.visibility=p?"visible":"hidden",c=p),v&&(o=!0)}}}return I.ticker.add(u),n.addEventListener("webglcontextlost",function(p){p.preventDefault(),y.ok=!1,n.style.visibility="hidden",c=!1,s.slice().forEach(function(v){v()})}),y}var K=null;function xa(a){return new Promise(function(n,e){var t=new FileReader;t.onload=function(){n(t.result)},t.onerror=function(){e(t.error)},t.readAsDataURL(a)})}function Se(a,n){return fetch(a,{mode:"cors",credentials:"omit"}).then(function(e){if(!e.ok)throw new Error("font fetch "+e.status+" "+a);return n==="text"?e.text():e.blob()})}function Ra(){if(K)return K;var a=document.querySelector('link[rel="stylesheet"][href*="fonts.googleapis.com"]');return a?(K=Se(a.href,"text").then(function(n){for(var e=[],t,i=/\/\*\s*([\w-]+)\s*\*\/\s*(@font-face\s*\{[^}]*\})/g;t=i.exec(n);)t[1]==="latin"&&e.push(t[2]);var r=/url\((['"]?)([^'")]+)\1\)/,s={};return e.forEach(function(o){var l=r.exec(o);l&&(s[l[2]]=null)}),Promise.all(Object.keys(s).map(function(o){return Se(o,"blob").then(xa).then(function(l){s[o]=l})})).then(function(){return e.map(function(o){return o.replace(r,function(l,c,f){return"url("+s[f]+")"})}).join(`
`)})}),K.catch(function(){K=null}),K):K=Promise.resolve("")}var ge="http://www.w3.org/1999/xhtml",ka="*,*::before,*::after{animation:none!important;transition:none!important}";function Sa(){for(var a=[],n=0;n<document.styleSheets.length;n++){var e;try{e=document.styleSheets[n].cssRules}catch{continue}if(e)for(var t=0;t<e.length;t++)a.push(e[t].cssText)}return a.join(`
`)}function Ca(){var a=document.createElement("div");a.style.cssText="position:fixed;left:0;top:0;width:100vw;height:100vh;visibility:hidden;pointer-events:none",document.body.appendChild(a);var n=a.getBoundingClientRect(),e={vw:n.width,vh:n.height};return a.style.height="100svh",e.svh=a.getBoundingClientRect().height,a.style.height="100dvh",e.dvh=a.getBoundingClientRect().height,a.remove(),e}function Pa(a,n){return a.replace(/(-?\d*\.?\d+)(svh|dvh|lvh)\b/g,function(e,t,i){var r=i==="svh"?n.svh:i==="dvh"?n.dvh:n.vh;return(parseFloat(t)*r/100).toFixed(2)+"px"})}function La(a,n){var e=n.getBoundingClientRect(),t=a.getBoundingClientRect(),i=a.cloneNode(!0);i.querySelectorAll("canvas, video, iframe, script").forEach(function(l){l.remove()});for(var r=a.parentElement;r&&r!==document.body;r=r.parentElement){var s=r.cloneNode(!1);r===n&&(s.style.width=e.width+"px",s.style.height=e.height+"px"),s.appendChild(i),i=s}var o=getComputedStyle(document.body);return{tree:i,units:Ca(),frame:{x:e.left,y:e.top},rect:{x:t.left-e.left,y:t.top-e.top,w:t.width,h:t.height},bodyStyle:["font-family:"+o.fontFamily,"font-size:"+o.fontSize,"line-height:"+o.lineHeight,"color:"+o.color,"-webkit-font-smoothing:antialiased"].join(";")}}function Fa(a){return new Promise(function(n,e){var t=new Image;t.onload=function(){n(t)},t.onerror=function(){e(new Error("snapshot: SVG image failed to load"))},t.src=a})}function qa(){return new Promise(function(a){requestAnimationFrame(function(){a()})})}function Ia(a,n){var e=document.fonts&&document.fonts.ready?document.fonts.ready:null;return Promise.all([Ra(),e]).then(function(t){var i=a.units.vw,r=a.units.vh,s=document.createElementNS(ge,"div");s.setAttribute("style","margin:0;position:relative;overflow:hidden;width:"+i+"px;height:"+r+"px;"+a.bodyStyle);var o=document.createElementNS(ge,"style");o.textContent=t[0]+`
`+Pa(Sa(),a.units)+`
`+ka,s.appendChild(o);var l=document.createElementNS(ge,"div");l.setAttribute("style","position:absolute;left:"+a.frame.x+"px;top:"+a.frame.y+"px;width:100%"),l.appendChild(a.tree),s.appendChild(l);var c='<svg xmlns="http://www.w3.org/2000/svg" width="'+i+'" height="'+r+'"><foreignObject x="0" y="0" width="100%" height="100%">'+new XMLSerializer().serializeToString(s)+"</foreignObject></svg>";return Fa("data:image/svg+xml;charset=utf-8,"+encodeURIComponent(c))}).then(function(t){return qa().then(function(){return t})}).then(function(t){var i=a.rect,r=Math.min(n.scale,n.maxSize/Math.max(i.w,i.h)),s=document.createElement("canvas");return s.width=Math.max(1,Math.round(i.w*r)),s.height=Math.max(1,Math.round(i.h*r)),s.getContext("2d").drawImage(t,a.frame.x+i.x,a.frame.y+i.y,i.w,i.h,0,0,s.width,s.height),{canvas:s,rect:i}})}var Oa=.3;function Ba(a){window.requestIdleCallback?window.requestIdleCallback(a,{timeout:700}):setTimeout(a,60)}function za(a){var n=a.track,e=a.stage,t=a.chapters;e.classList.add("stage--live");var i=null;try{i=Aa(e)}catch{i=null}t.forEach(function(d){d.inner=d.el.querySelector(":scope > .ch__body"),d.veil=document.createElement("div"),d.veil.className="layer__veil",d.el.appendChild(d.veil)});var r=null,s=null,o=1,l=[],c=[],f=0,y=[],g=!1,u={w:0,h:0},p={fx:i,stage:e,own:function(d){l.push(d)},cover:function(d){c.push(d)},snapshot:function(d,h,x,S){y.push({el:d,at:h,priority:x,done:S,gen:f}),y.sort(function(R,M){return R.priority-M.priority}),v()}};function v(){g||!y.length||(g=!0,Ba(function(){var d=y.shift();if(!d||d.gen!==f){g=!1,v();return}var h;try{var x=r.time();r.time(d.at),h=La(d.el,e),r.time(x)}catch{g=!1,v();return}Ia(h,{scale:i?i.size.dpr:1,maxSize:i?Math.min(4096,i.gl.getParameter(i.gl.MAX_TEXTURE_SIZE)):2048}).then(function(S){d.gen===f&&d.done(S)},function(S){console.warn("[stage] snapshot failed, using the CSS fallback:",S&&S.message)}).then(function(){g=!1,v()})}))}var E=document.createElement("div");E.style.cssText="position:fixed;left:0;top:0;width:0;height:100vh;height:100svh;visibility:hidden;pointer-events:none",document.body.appendChild(E);function T(d){if(!d.inner)return 0;var h=e.clientHeight-E.offsetHeight;return Math.max(0,Math.ceil(d.inner.offsetHeight-d.el.clientHeight+h))}function m(){f++,o=e.clientHeight,u.w=window.innerWidth,u.h=window.innerHeight,t.forEach(function(h,x){I.set(h.el,{opacity:x===0?1:0,pointerEvents:x===0?"auto":"none",zIndex:1}),h.inner&&I.set(h.inner,{y:0})}),r=I.timeline({paused:!0,defaults:{ease:"none"}});var d=0;t.forEach(function(h,x){if(h.start=d,x>0){var S=h.transition,R=S.build(r,t[x-1],h,d,p);t[x-1].end=d+R,h.enter&&h.enter(r,d+R*S.reveal,p),d=Math.max(d+R,r.duration())}else h.enter&&(h.enter(r,0,p),d=r.duration());h.arrive=d;var M=h.body&&h.body(r,d,p)||0,z=h.over=T(h);if(z>0){var Q=Math.max(M,z/o);r.fromTo(h.inner,{y:0},{y:-z,duration:Q,ease:"none",immediateRender:!1},d),M=Q}d+=M+(h.hold==null?Oa:h.hold)}),t[t.length-1].end=d,r.duration()<d&&r.to({},{duration:d-r.duration()}),n.style.height=Math.ceil(r.duration()*o+e.clientHeight)+"px",s=Ee.create({trigger:n,start:"top top",end:function(){return"+="+r.duration()*o},animation:r,scrub:!0,onUpdate:O,onRefresh:O}),O()}function D(){var d=r?r.time():0;return s&&s.kill(),r&&(r.progress(0),r.kill()),l.forEach(function(h){h()}),l=[],c=[],y=[],d}function q(d,h){if(!c.length)return null;for(var x=e.getBoundingClientRect(),S=0;S<c.length;S++){var R=c[S](d-x.left,h-x.top,x.width,x.height);if(R)return R}return null}function O(){var d=r.time();t.forEach(function(h){var x=d>=h.start&&d<=h.end;x!==h.live&&(h.live=x,h.el.classList.toggle("is-playing",x))})}function P(d){for(var h=0;h<t.length;h++)if(t[h].el.contains(d))return t[h];return null}function L(){return n.getBoundingClientRect().top+window.scrollY}function U(d){if(!d)return null;if(d.contains(t[0].el))return 0;var h=P(d);return h?L()+h.arrive*o:null}e.addEventListener("focusin",function(d){var h=P(d.target);h&&!h.live&&a.scrollTo&&a.scrollTo(L()+h.arrive*o)});function X(){var d=r.duration(),h=d?D()/d:0;m(),Ee.refresh(),a.scrollTo&&a.scrollTo(L()+h*r.duration()*o,!0)}var G=0;window.addEventListener("resize",function(){clearTimeout(G),G=setTimeout(function(){var d=Math.abs(window.innerWidth-u.w),h=Math.abs(window.innerHeight-u.h);(d>=2||h>=u.h*.15)&&X()},220)}),m();function B(){var d=e.clientHeight!==o||t.some(function(h){return T(h)!==h.over});d&&X()}return document.readyState!=="complete"&&window.addEventListener("load",B,{once:!0}),document.fonts&&document.fonts.status!=="loaded"&&document.fonts.ready.then(B),{fx:i,scrollFor:U,groundAt:q,isLive:function(d){var h=P(d);return!!(h&&h.live)},info:function(){return{unit:o,top:L(),duration:r.duration(),snapshotsPending:y.length+(g?1:0),webgl:!!(i&&i.ok),chapters:t.map(function(d){return{id:d.el.id||d.el.className.split(" ")[0],start:d.start,arrive:d.arrive,end:d.end,over:d.over}})}}}}function ye(a){a=a||{};var n=a.duration||1;return{duration:n,reveal:.5,build:function(e,t,i,r){return a.torn&&i.el.classList.add("layer--torn"),e.set(t.el,{zIndex:2},r),e.set(i.el,{opacity:1,pointerEvents:"auto",zIndex:3},r),e.fromTo(i.el,{yPercent:100,rotation:a.tilt||0},{yPercent:0,rotation:0,duration:n,ease:"power2.out"},r),e.fromTo(t.el,{scale:1,rotation:0,yPercent:0},{scale:.9,rotation:a.sink==null?-2:a.sink,yPercent:-5,duration:n,ease:"power1.in",immediateRender:!1},r),e.fromTo(t.veil,{opacity:0},{opacity:.62,duration:n,ease:"none",immediateRender:!1},r),e.set(t.el,{opacity:0,pointerEvents:"none"},r+n),n}}}function Na(a){a=a||{};var n=a.duration||1.2;return{duration:n,reveal:.45,build:function(e,t,i,r){return t.el.classList.add("layer--iris"),e.set(t.el,{zIndex:3},r),e.set(i.el,{opacity:1,pointerEvents:"auto",zIndex:2},r),e.fromTo(t.el,{yPercent:0,scale:1},{yPercent:45,scale:.9,duration:n,ease:"power1.in",immediateRender:!1},r),e.fromTo(t.el,{"--iris":0},{"--iris":1,duration:n*.9,ease:"sine.inOut",immediateRender:!1},r),e.fromTo(i.el,{scale:1.06},{scale:1,duration:n,ease:"power2.out",immediateRender:!1},r),e.fromTo(i.veil,{opacity:.55},{opacity:0,duration:n,ease:"power1.out"},r),e.set(t.el,{opacity:0,pointerEvents:"none"},r+n),n}}}function Da(a){a=a||{};var n=a.duration||1;return{duration:n,reveal:.35,build:function(e,t,i,r){return e.set(t.el,{zIndex:3},r),e.set(i.el,{opacity:1,pointerEvents:"auto",zIndex:2},r),e.fromTo(t.el,{yPercent:0},{yPercent:-100,duration:n,ease:"power2.inOut",immediateRender:!1},r),i.inner&&e.fromTo(i.inner,{yPercent:16},{yPercent:0,duration:n,ease:"power2.out"},r),e.fromTo(i.veil,{opacity:.6},{opacity:0,duration:n,ease:"power1.out"},r),e.set(t.el,{opacity:0,pointerEvents:"none"},r+n),n}}}var Ua=["ATTR vec2 aPos;","uniform mat4 uProj;","uniform mat4 uView;","uniform mat4 uModel;","uniform vec2 uSize;","uniform float uP;","uniform float uSeed;","uniform float uReach;","uniform vec2 uCurlDir;","uniform vec2 uCurlOrigin;","uniform float uCurlTravel;","uniform float uRadius;","VARY vec2 vUv;","VARY vec3 vWorld;","VARY vec3 vNormal;","VARY float vOcc;","vec2 hash2(vec2 p) {","  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));","  return fract(sin(p) * 43758.5453) * 2.0 - 1.0;","}","float gnoise(vec2 p) {","  vec2 i = floor(p), f = fract(p);","  vec2 u = f * f * (3.0 - 2.0 * f);","  return mix(mix(dot(hash2(i), f), dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),","             mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),","                 dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);","}","float ridge(vec2 p) { return 1.0 - abs(gnoise(p) * 1.45); }","mat2 rot(float a) { float s = sin(a), c = cos(a); return mat2(c, s, -s, c); }","#ifdef CRUMPLE","float folds(vec2 m, out float valley) {","  float z = 0.0;","  valley = 0.0;","  for (int i = 0; i < 9; i++) {","    float fi = float(i) + 1.0;","    float a = fract(sin(fi * 12.9898 + uSeed * 4.1) * 43758.5453) * 3.14159;","    float o = (fract(sin(fi * 78.233 + uSeed) * 12345.678) - 0.5) * 1.5;","    float w = 0.16 + 0.3 * fract(sin(fi * 39.35 + uSeed * 2.3) * 9631.17);","    float s = abs(dot(m, vec2(cos(a), sin(a))) - o);","    float side = mod(fi, 2.0) * 2.0 - 1.0;","    z += side * (min(s, w) - w) / (1.0 + fi * 0.18);","    valley = max(valley, (1.0 - s / w) * step(0.0, side));","  }","  return z;","}","vec3 deform(vec2 q, out float occ) {","  float p = uP;","  float r = length(q);","  vec2 dir = r > 0.001 ? q / r : vec2(0.0, 1.0);","  vec2 m = q / uReach;","  float crease = ridge(m * 2.4 + uSeed) * 0.6 + ridge(rot(1.1) * m * 5.8 + uSeed * 1.9) * 0.4;","  float valley;","  float fold = folds(m, valley);","  float gather = smoothstep(0.0, 1.0, p);","  float lobe = gnoise(dir * 1.6 + uSeed * 3.1) + 0.6 * gnoise(dir * 4.3 - uSeed);","  float rc = r * mix(1.0, 0.34 + lobe * 0.16, gather) * (1.0 - 0.1 * smoothstep(0.0, 0.3, p) * (lobe + 0.5));","  float k = pow(p, 1.8) * 2.95 / (uReach * 0.34);","  vec3 pos = vec3(q, 0.0);","  vec3 nrm = vec3(0.0, 0.0, 1.0);","  if (k > 1e-7) {","    float a = k * rc;","    float h = sin(a * 0.5);","    pos = vec3(dir * (sin(a) / k), -2.0 * h * h / k);","    nrm = vec3(dir * sin(a), cos(a));","  } else {","    pos = vec3(dir * rc, 0.0);","  }","  float amp = uReach * 0.085 * smoothstep(0.12, 0.7, p);","  float famp = uReach * 0.26 * smoothstep(0.0, 0.28, p) * (1.0 - 0.45 * gather);","  pos += nrm * ((crease - 0.55) * amp + fold * famp);","  pos.xy += vec2(gnoise(m * 4.1 + 7.3), gnoise(m * 4.1 - 3.7)) * amp * 0.9 * gather;","  occ = mix(1.0, (0.6 + 0.4 * crease) * (1.0 - 0.35 * valley), smoothstep(0.03, 0.4, p));","  vNormal = nrm;","  return pos;","}","#else","vec3 deform(vec2 q, out float occ) {","  float f = uP * uCurlTravel;","  float d = dot(q - uCurlOrigin, uCurlDir);","  float a = f - d;","  float R = uRadius;","  vec3 pos = vec3(q, 0.0);","  vNormal = vec3(0.0, 0.0, 1.0);","  occ = 1.0;","  if (a > 0.0) {","    float th = min(a / R, 3.14159265);","    float nd = a / R < 3.14159265 ? f - R * sin(th) : f + (a - 3.14159265 * R);","    pos.z = R * (1.0 - cos(th));","    pos.xy = q + uCurlDir * (nd - d);","    vNormal = vec3(uCurlDir * sin(th), cos(th));","  } else if (uP > 0.0) {","    float s = clamp(-a / (R * 2.2), 0.0, 1.0);","    occ = mix(0.68, 1.0, s * s * (3.0 - 2.0 * s));","  }","  return pos;","}","#endif","void main() {","  vec2 q = aPos * uSize;","  vUv = aPos + 0.5;","  float occ;","  vec3 p = deform(q, occ);","  vec4 w = uModel * vec4(p, 1.0);","  vWorld = w.xyz;","  vOcc = occ;","  gl_Position = uProj * uView * w;","}"].join(`
`),Ha=["uniform sampler2D uTex;","uniform vec3 uBack;","uniform vec3 uEye;","VARY vec2 vUv;","VARY vec3 vWorld;","VARY vec3 vNormal;","VARY float vOcc;","float grain(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }","void main() {","#ifdef CRUMPLE","  vec3 n = normalize(cross(dFdx(vWorld), dFdy(vWorld)));","#else","  vec3 n = normalize(vNormal);","#endif","  vec3 V = normalize(uEye - vWorld);","  if (dot(n, V) < 0.0) n = -n;","  vec3 L = normalize(vec3(-0.42, 0.55, 0.72));","  float bend = clamp(1.0 - n.z, 0.0, 1.0);","  float diffuse = dot(n, L) - L.z;","  float spec = pow(max(dot(n, normalize(L + V)), 0.0), 30.0) * bend;","  float g = (grain(floor(vUv * 900.0)) - 0.5) * 0.06 * min(bend * 4.0, 1.0);","  vec3 base = gl_FrontFacing ? TEX(uTex, vUv).rgb : uBack;","  float lum = dot(base, vec3(0.299, 0.587, 0.114));","  vec3 sheen = vec3(0.93, 0.95, 0.88) * (max(diffuse, 0.0) * mix(0.3, 0.04, lum) + spec * mix(0.22, 0.05, lum));","  vec3 col = base * (1.0 + diffuse * 1.35 + g) * vOcc + sheen;","  FRAG = vec4(col, 1.0);","}"].join(`
`);function Wa(a,n){var e="paper-"+n;if(!a.cache[e]){var t=n==="crumple"?`#define CRUMPLE
`:"";a.cache[e]=We(a.ctx,t+Ua,t+Ha)}return a.cache[e]}function Xa(a,n,e){var t="grid-"+n+"x"+e;if(a.cache[t])return a.cache[t];for(var i=a.gl,r=new Float32Array((n+1)*(e+1)*2),s=0,o=0;o<=e;o++)for(var l=0;l<=n;l++)r[s++]=l/n-.5,r[s++]=o/e-.5;for(var c=new Uint16Array(n*e*6),f=0,y=0;y<e;y++)for(var g=0;g<n;g++){var u=y*(n+1)+g,p=u+1,v=u+n+1,E=v+1;c[f++]=u,c[f++]=p,c[f++]=E,c[f++]=u,c[f++]=E,c[f++]=v}var T=i.createBuffer();i.bindBuffer(i.ARRAY_BUFFER,T),i.bufferData(i.ARRAY_BUFFER,r,i.STATIC_DRAW);var m=i.createBuffer();return i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,m),i.bufferData(i.ELEMENT_ARRAY_BUFFER,c,i.STATIC_DRAW),a.cache[t]={vbo:T,ibo:m,count:c.length}}function be(a){return a<0?0:a>1?1:a}function Va(a,n){var e=Math.min(n,Math.pow(2,Math.round(Math.log2(a.width)))),t=Math.min(n,Math.pow(2,Math.round(Math.log2(a.height))));if(e===a.width&&t===a.height)return a;var i=document.createElement("canvas");return i.width=e,i.height=t,i.getContext("2d").drawImage(a,0,0,e,t),i}var Ce=.8,Pe=.62;function Le(a){return a*a*(3-2*a)}function Fe(a){var n=[-.92,.39],e=a.w/2,t=-a.h/2,i=0;[[-1,-1],[-1,1],[1,1],[1,-1]].forEach(function(s){i=Math.max(i,(s[0]*a.w/2-e)*n[0]+(s[1]*a.h/2-t)*n[1])});var r=Math.min(a.w,a.h)*.12;return{dir:n,ox:e,oy:t,radius:r,travel:i+Math.PI*r+60}}function Ga(a,n){var e=a.gl,t=n.mode,i=null,r=null,s=0,o={ready:!1,visible:!1,animating:!1,setTexture:function(l,c){i||(i=e.createTexture());var f=a.ctx.isGL2?l:Va(l,e.getParameter(e.MAX_TEXTURE_SIZE));e.bindTexture(e.TEXTURE_2D,i),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,f),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);var y=e.getExtension("EXT_texture_filter_anisotropic");y&&e.texParameterf(e.TEXTURE_2D,y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(8,e.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT))),r=c,o.ready=!0},set:function(l){s=l},covers:function(l,c){if(!r||s<=0||s>=1)return!1;var f=l-(r.x+r.w/2),y=r.y+r.h/2-c;if(t==="crumple"){var g=be(s/Ce);return Math.hypot(f,y)<Math.hypot(r.w,r.h)/2*(1-1.5*g)}var u=Fe(r),p=(f-u.ox)*u.dir[0]+(y-u.oy)*u.dir[1];return p>Le(s)*u.travel-u.radius},draw:function(l){if(!(!i||!r)){var c=l.w,f=l.h,y=Wa(a,t),g=Xa(a,Math.max(24,Math.min(160,Math.round(r.w/12))),Math.max(24,Math.min(160,Math.round(r.h/12)))),u=30*Math.PI/180,p=f/2/Math.tan(u/2),v=Math.hypot(r.w,r.h)/2,E=r.x+r.w/2-c/2,T=f/2-(r.y+r.h/2),m=y.u,D,q;if(t==="crumple"){var O=be(s/Ce),P=be((s-Pe)/(1-Pe)),L=P*P,U=v*.115,X=n.toss||[1,.5],G=n.spin||1;D=Ma(ce(E+L*(c*.62+U*3)*X[0],T+L*(f*.55+U*3)*X[1]+Math.sin(P*Math.PI)*f*.1,-L*p*.35),ce(0,0,-U),_e(0,0,1,O*.32*G),_e(1,0,0,O*.5),_e(.35,1,.2,P*7.5*G),ce(0,0,U)),q=O}else{var B=Fe(r);e.useProgram(y.prog),e.uniform2f(m.uCurlDir,B.dir[0],B.dir[1]),e.uniform2f(m.uCurlOrigin,B.ox,B.oy),e.uniform1f(m.uCurlTravel,B.travel),e.uniform1f(m.uRadius,B.radius),D=ce(E,T,0),q=Le(s)}e.useProgram(y.prog),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.disable(e.CULL_FACE),e.disable(e.BLEND),e.bindBuffer(e.ARRAY_BUFFER,g.vbo),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,g.ibo),e.uniformMatrix4fv(m.uProj,!1,Ea(u,c/f,p*.1,p*6)),e.uniformMatrix4fv(m.uView,!1,ce(0,0,-p)),e.uniformMatrix4fv(m.uModel,!1,D),e.uniform2f(m.uSize,r.w,r.h),e.uniform1f(m.uP,q),m.uSeed&&e.uniform1f(m.uSeed,n.seed||0),m.uReach&&e.uniform1f(m.uReach,v),e.uniform3fv(m.uBack,n.back),e.uniform3f(m.uEye,0,0,p),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,i),e.uniform1i(m.uTex,0),e.drawElements(e.TRIANGLES,g.count,e.UNSIGNED_SHORT,0)}},dispose:function(){i&&a.ok&&e.deleteTexture(i),i=null,o.ready=!1,o.visible=!1}};return o}function qe(a){return a<0?0:a>1?1:a}function Ie(a){return a*a*(3-2*a)}function re(a,n){var e=Math.sin(a*91.7+n*12.9898)*43758.5453;return e-Math.floor(e)}function Ya(a,n){for(var e=[],t=28,i=0;i<t;i++){var r=i/t*4,s=Math.floor(r),o=r-s,l=s===0?o:s===1?1:s===2?1-o:0,c=s===0?0:s===1?o:s===2?1:1-o,f=a*(.55+.4*re(n,i));e.push(((l+(.5-l)*f)*100).toFixed(2)+"% "+((c+(.5-c)*f)*100).toFixed(2)+"%")}return"polygon("+e.join(",")+")"}var Oe=!1;function Be(){if(!Oe){Oe=!0;for(var a="",n=0;n<90;n++){var e=re(7,n)*100,t=re(13,n)*100,i=8+re(29,n)*26,r=[0,1,2].map(function(l){var c=re(41,n*3+l)*Math.PI*2;return(e+Math.cos(c)*i).toFixed(1)+","+(t+Math.sin(c)*i).toFixed(1)}).join(" "),s=Math.round(150+re(53,n)*105);a+='<polygon points="'+r+'" fill="rgb('+s+","+s+","+s+')" fill-opacity=".55"/>'}var o='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><rect width="100" height="100" fill="#fff"/>'+a+"</svg>";document.documentElement.style.setProperty("--crease-img",'url("data:image/svg+xml;charset=utf-8,'+encodeURIComponent(o)+'")')}}var we={crumple:function(a,n,e){if(n<=0){I.set(a,{scale:1,rotation:0,x:0,y:0,clipPath:"none"}),a.style.setProperty("--crease","0");return}Be();var t=Ie(qe(n/.8)),i=qe((n-.62)/.38);I.set(a,{scale:1-.8*t,rotation:-16*t+i*260*e.spin,x:i*i*window.innerWidth*.9*e.toss[0],y:-i*i*window.innerHeight*.9*e.toss[1],clipPath:Ya(t,e.seed)}),a.style.setProperty("--crease",String(Math.min(1,t*1.8)))},curl:function(a,n){if(n<=0){I.set(a,{rotationY:0,transformPerspective:0,transformOrigin:"50% 50%"}),a.style.setProperty("--crease","0");return}Be();var e=Ie(n);I.set(a,{transformOrigin:"0% 50%",transformPerspective:2200,rotationY:-118*e}),a.style.setProperty("--crease",String(e*.5))}};function Ve(a,n,e){var t=n.el,i=n.toss||[1,.5],r={seed:n.seed||1,toss:i,spin:n.spin||1};t.classList.add("paper");var s=e.fx?e.fx.add(Ga(e.fx,{mode:n.mode,seed:r.seed,toss:i,spin:r.spin,back:Xe(getComputedStyle(t).backgroundColor)})):null,o={p:0},l=!1;function c(){var g=o.p,u=!!(s&&s.ready&&e.fx.ok);u!==l&&(we[n.mode](t,0,r),l=u),u?(s.set(g),s.visible=g>0&&g<1,e.fx.invalidate()):(s&&s.visible&&(s.visible=!1,e.fx.invalidate()),we[n.mode](t,g,r)),t.style.visibility=g>=1||u&&g>0?"hidden":""}var f=null;if(s){e.snapshot(t,n.at,n.priority||0,function(g){s.setTexture(g.canvas,g.rect),c()}),f=e.fx.onLost(c);var y=(t.closest("[data-ground]")||t).getAttribute("data-ground");e.cover(function(g,u){return l&&s.covers(g,u)?y:null})}a.fromTo(o,{p:0},{p:1,duration:n.duration,ease:"none",immediateRender:!1,onUpdate:c},n.at),e.own(function(){f&&f(),s&&(s.dispose(),e.fx.remove(s)),we[n.mode](t,0,r),t.style.visibility=""})}function ja(a,n){n=n||{};var e=n.duration||1.3;return{duration:e,reveal:n.reveal||.6,build:function(t,i,r,s,o){return t.set(i.el,{zIndex:3},s),t.set(r.el,{opacity:1,pointerEvents:"auto",zIndex:2},s),Ve(t,{el:i.el,at:s,duration:e,mode:a,seed:n.seed,toss:n.toss,spin:n.spin,priority:n.priority},o),t.set(i.el,{opacity:0,pointerEvents:"none"},s+e),e}}}function $a(a){return ja("curl",a)}var Ka=["ATTR vec2 aPos;","void main() { gl_Position = vec4(aPos, 0.0, 1.0); }"].join(`
`),Ja=["uniform vec2 uRes;","uniform vec2 uOrigin;","uniform float uReach;","uniform float uP;","uniform float uTime;","uniform vec3 uInk;","uniform vec3 uRim;","float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }","float vnoise(vec2 p) {","  vec2 i = floor(p), f = fract(p);","  vec2 u = f * f * (3.0 - 2.0 * f);","  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),","             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);","}","float fbm(vec2 p) {","  float v = 0.0, a = 0.5;","  for (int i = 0; i < 5; i++) { v += a * vnoise(p); p = p * 2.03 + 17.1; a *= 0.5; }","  return v / 0.97;","}","void main() {","  vec2 uv = gl_FragCoord.xy / uRes;","  uv.y = 1.0 - uv.y;","  vec2 asp = vec2(uRes.x / uRes.y, 1.0);","  float r = length((uv - uOrigin) * asp) / uReach;","  vec2 w = vec2(fbm(uv * 2.4 + uTime * 0.11), fbm(uv * 2.4 + 5.2 - uTime * 0.09)) - 0.5;","  float edge = fbm((uv + w * 0.5) * asp * 3.2 + uTime * 0.05);","  float fingers = 1.0 - abs(fbm((uv + w) * asp * 7.0) * 2.0 - 1.0);","  float settle = 1.0 - smoothstep(0.55, 1.0, uP);","  float reach = uP * 1.32 - 0.12;","  float cov = reach - r + ((edge - 0.5) * 0.42 + (fingers - 0.5) * 0.14) * settle * clamp(r * 2.0, 0.0, 1.0);","  float aa = 1.5 / uRes.y;","  float a = smoothstep(-aa, aa, cov);","  float rim = (1.0 - smoothstep(0.0, 0.06, cov)) * settle;","  vec3 col = mix(uInk, uRim, rim * 0.55);","  FRAG = vec4(col * a, a);","}"].join(`
`);function Za(a){return a.cache.blot||(a.cache.blot=We(a.ctx,Ka,Ja)),a.cache.blot}function Qa(a){if(a.cache.tri)return a.cache.tri;var n=a.gl,e=n.createBuffer();return n.bindBuffer(n.ARRAY_BUFFER,e),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),n.STATIC_DRAW),a.cache.tri=e}function ze(a,n){var e=0;return[[0,0],[1,0],[0,1],[1,1]].forEach(function(t){e=Math.max(e,Math.hypot((t[0]-a[0])*n,t[1]-a[1]))}),e}function en(a,n){var e=a.gl,t=0,i=[.5,.5],r={visible:!1,get animating(){return r.visible&&t>0&&t<1},set:function(s,o){t=s,o&&(i=o)},covers:function(s,o,l,c){if(t<=0||t>=1)return!1;var f=l/c,y=Math.hypot((s/l-i[0])*f,o/c-i[1])/ze(i,f);return y<t*1.32-.12},draw:function(s){var o=Za(a),l=o.u,c=ze(i,s.w/s.h);e.useProgram(o.prog),e.disable(e.DEPTH_TEST),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.bindBuffer(e.ARRAY_BUFFER,Qa(a)),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.uniform2f(l.uRes,e.drawingBufferWidth,e.drawingBufferHeight),e.uniform2f(l.uOrigin,i[0],i[1]),e.uniform1f(l.uReach,c),e.uniform1f(l.uP,t),e.uniform1f(l.uTime,performance.now()/1e3),e.uniform3fv(l.uInk,n.ink),e.uniform3fv(l.uRim,n.rim),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.BLEND)}};return r}function an(a){a=a||{};var n=a.duration||1.1;return{duration:n,reveal:a.reveal||.82,build:function(e,t,i,r,s){e.set(t.el,{zIndex:2},r),e.set(i.el,{opacity:1,pointerEvents:"auto",zIndex:3},r);var o=Xe(getComputedStyle(i.el).backgroundColor),l=s.fx?s.fx.add(en(s.fx,{ink:o,rim:o.map(function(v){return v*.78})})):null,c={p:0},f=null;function y(){var v=s.stage.getBoundingClientRect(),E=a.from&&t.el.querySelector(a.from);if(!E)return[.5,.6];var T=E.getBoundingClientRect();return[(T.left+T.width/2-v.left)/v.width,(T.top+T.height/2-v.top)/v.height]}function g(){var v=c.p;v<=0?f=null:f||(f=y());var E=f||[.5,.6],T=!!(l&&s.fx.ok);l&&(l.set(v,E),l.visible=T&&v>0&&v<1,s.fx.invalidate()),i.el.style.clipPath=v>=1?"":T?"inset(0 0 100% 0)":"circle("+(v*150).toFixed(2)+"% at "+(E[0]*100).toFixed(2)+"% "+(E[1]*100).toFixed(2)+"%)"}e.fromTo(c,{p:0},{p:1,duration:n,ease:"power1.inOut",immediateRender:!1,onUpdate:g},r),e.set(t.el,{opacity:0,pointerEvents:"none"},r+n);var u=l?s.fx.onLost(g):null;if(l){var p=i.el.getAttribute("data-ground");s.cover(function(v,E,T,m){return l.visible&&l.covers(v,E,T,m)?p:null})}return s.own(function(){u&&u(),l&&s.fx.remove(l),i.el.style.clipPath=""}),n}}}function nn(a){function n(t,i,r,s){return Object.assign({el:t,transition:i},r,s)}var e=function(t){return document.getElementById(t)};return[n(e("hero"),null,a.hero),n(e("form"),ye({duration:1}),a.form),n(e("how"),Na({duration:1.2}),a.features),n(e("watch"),ye({duration:1,torn:!0,sink:1.5}),a.demo),n(e("boards"),$a({duration:1.3,priority:2}),a.boards),n(e("price"),ye({duration:1,tilt:3.5,sink:2.5}),a.pricing),n(document.querySelector(".close"),an({duration:1.15,from:".plan .btn--solid"}),a.closing),n(document.querySelector(".foot"),Da({duration:1}),a.footer,{hold:0})]}function tn(a){var n=a.stage,e=window.performance&&performance.getEntriesByType?performance.getEntriesByType("navigation")[0]:null,t=!!(e&&e.type==="back_forward");window.addEventListener("pagehide",function(){var c=n.info(),f=Object.assign({},history.state,{storyAt:(window.scrollY-c.top)/c.unit});history.replaceState(f,"")});var i=null,r=history.state&&history.state.storyAt;if(t&&typeof r=="number")i=function(){a.scrollTo(n.info().top+r*n.info().unit)};else if(!t&&location.hash){var s=document.getElementById(location.hash.slice(1));s&&(history.replaceState(history.state,"",location.pathname+location.search),i=function(){a.jump(s)})}if(i){var o=!1;["wheel","touchstart","keydown","pointerdown"].forEach(function(c){window.addEventListener(c,function(){o=!0},{once:!0,passive:!0})}),i();var l=document.readyState==="complete"?null:new Promise(function(c){window.addEventListener("load",c,{once:!0})});Promise.all([l,document.fonts&&document.fonts.ready]).then(function(){o||i()})}}function Z(a){return a?la(a):[]}function ie(a,n,e,t){!n||!n.length||a.fromTo(n,{yPercent:105},{yPercent:0,duration:t||.45,stagger:.035,ease:"power3.out"},e)}const rn=`<!-- ══ CH 00 ══ the hiring sign, and the correction ════════════════════ -->
<!-- On the stage both states share one screen: the sign is struck through,
     crumpled up and thrown away, and the truth is what was underneath. -->
<section class="hero layer" id="hero" data-chapter="00 — Now hiring">

  <div class="hero-layer hero-layer--sign" id="signLayer" data-ground="ink">
    <p class="label sign__eyebrow">
      <span class="dot"></span> Now hiring
      <span>All departments</span>
      <span>Remote friendly</span>
    </p>
    <h1 class="display sign__title">
      <span class="sign__words">We're hiring<span class="sign__strike" id="strike" aria-hidden="true"></span></span>
    </h1>
    <p class="label sign__meta">
      <span>Full-time</span><span>Competitive</span><span>Start immediately</span>
    </p>
    <p class="label sign__cue">
      <span class="cue-arrow">↓</span> Keep reading <span class="rule"></span> <span>Scroll</span>
    </p>
  </div>

  <div class="hero-layer hero-layer--truth" id="truthLayer" data-ground="bone">
    <p class="truth__aside" id="aside">well… we are not.</p>
    <h2 class="display truth__title" data-split>
      But we can help you <span class="hit">get hired</span>.
    </h2>
    <p class="truth__body">
      Onextap is a Chrome extension that fills the application for you — every field, on
      every job board — and drafts the written answers in your own words. One tap, next job.
    </p>
    <div class="truth__actions">
      <a class="btn btn--solid" href="#how">Add to Chrome — free <span class="btn__arrow">→</span></a>
      <a class="btn btn--ghost" href="#form">See what it fixes</a>
    </div>
  </div>

</section>
`;function Ge(){var a=document.getElementById("signLayer"),n=document.getElementById("aside"),e=Z(document.querySelector(".truth__title")),t=document.querySelectorAll(".truth__body, .truth__actions");return{body:function(i,r,s){return i.fromTo("#strike",{scaleX:0},{scaleX:1,duration:.35,ease:"power3.inOut"},r+.1).fromTo(".sign__cue",{opacity:1},{opacity:0,duration:.12},r+.1),Ve(i,{el:a,at:r+.55,duration:1.3,mode:"crumple",seed:3.7,toss:[.95,.5],spin:1,priority:0},s),i.fromTo(n,{yPercent:40,opacity:0},{yPercent:0,opacity:1,duration:.35,ease:"power3.out"},r+1.3).fromTo(e,{yPercent:105},{yPercent:0,duration:.45,stagger:.03,ease:"power3.out"},r+1.45).fromTo(t,{y:26,opacity:0},{y:0,opacity:1,duration:.35,stagger:.08,ease:"power2.out"},r+1.75),2.25}}}const sn=Object.freeze(Object.defineProperty({__proto__:null,initHero:Ge,markup:rn},Symbol.toStringTag,{value:"Module"})),on=`<!-- ══ CH 01 ══ the same eleven questions ═════════════════════════════ -->
<section class="ch ch--ink layer" id="form" data-ground="ink" data-chapter="01 — The form">
  <div class="ch__body">
    <div class="wrap form-grid">
      <div class="form-grid__lead">
        <div class="ch__head">
          <p class="label">01 / The form</p>
          <h2 class="display form__title" data-split>
            Every application asks the same eleven things.
          </h2>
        </div>

        <p class="lede">
          Greenhouse names the field one way. Workday names it another. Lever buries it on page
          three. The answers never change — only the labels, the order and the number of clicks.
          Onextap learns the mapping once and reuses it everywhere.
        </p>

        <div class="tally">
          <span class="tally__num" id="tally">11</span>
          <p class="lede tally__note">
            fields recognised and filled on this page. The twelfth is the one you actually want to
            think about.
          </p>
        </div>
      </div>

      <div class="fields" id="fieldList">
        <div class="field"><span class="field__n">01</span><span class="field__name">first_name</span><span class="field__tag">Mapped</span></div>
        <div class="field"><span class="field__n">02</span><span class="field__name">last_name</span><span class="field__tag">Mapped</span></div>
        <div class="field"><span class="field__n">03</span><span class="field__name">email</span><span class="field__tag">Mapped</span></div>
        <div class="field"><span class="field__n">04</span><span class="field__name">phone</span><span class="field__tag">Mapped</span></div>
        <div class="field"><span class="field__n">05</span><span class="field__name">location</span><span class="field__tag">Mapped</span></div>
        <div class="field"><span class="field__n">06</span><span class="field__name">linkedin_url</span><span class="field__tag">Mapped</span></div>
        <div class="field"><span class="field__n">07</span><span class="field__name">portfolio_url</span><span class="field__tag">Mapped</span></div>
        <div class="field"><span class="field__n">08</span><span class="field__name">years_of_experience</span><span class="field__tag">Mapped</span></div>
        <div class="field"><span class="field__n">09</span><span class="field__name">work_authorization</span><span class="field__tag">Mapped</span></div>
        <div class="field"><span class="field__n">10</span><span class="field__name">notice_period</span><span class="field__tag">Mapped</span></div>
        <div class="field"><span class="field__n">11</span><span class="field__name">"Why do you want to work here?"</span><span class="field__tag">Drafted</span></div>
      </div>
    </div>
  </div>
</section>
`;function Ye(){var a=Z(document.querySelector("#form [data-split]")),n=document.querySelectorAll("#fieldList .field"),e=document.getElementById("tally"),t=.09,i=.22;function r(s){e.textContent=String(Math.round(s)).padStart(2,"0")}return r(0),{enter:function(s,o){ie(s,a,o)},body:function(s,o){var l={v:0},c=i+t*(n.length-1);return s.fromTo(n,{"--fill":0},{"--fill":1,duration:i,stagger:t,ease:"none"},o+.05),s.fromTo(l,{v:0},{v:n.length,duration:c,ease:"none",onUpdate:function(){r(l.v)}},o+.05),.05+c}}}const ln=Object.freeze(Object.defineProperty({__proto__:null,initFormFields:Ye,markup:on},Symbol.toStringTag,{value:"Module"})),dn=`<!-- ══ CH 02 ══ features, one rail each ═══════════════════════════════ -->
<section class="ch ch--bone layer" id="how" data-ground="bone" data-chapter="02 — Features">
 <div class="ch__body">
  <div class="wrap">
    <div class="ch__head">
      <p class="label">02 / Features</p>
      <div>
        <h2 class="display feat__title" data-split>Pick a feature.</h2>
      </div>
    </div>

    <div class="fbar">
      <div class="fbar__inner" id="fbar" role="tablist" aria-label="Features">
        <span class="fbar__thumb" id="fbarThumb" aria-hidden="true"></span>
        <button class="fbar__btn" id="tab-autofill" role="tab" aria-selected="true"
                aria-controls="rail" data-feature="autofill" type="button">Autofill</button>
        <button class="fbar__btn" id="tab-mapping" role="tab" aria-selected="false"
                aria-controls="rail" data-feature="mapping" type="button">Field mapping</button>
        <button class="fbar__btn" id="tab-answers" role="tab" aria-selected="false"
                aria-controls="rail" data-feature="answers" type="button">AI answers</button>
        <button class="fbar__btn" id="tab-profiles" role="tab" aria-selected="false"
                aria-controls="rail" data-feature="profiles" type="button">Profiles</button>
        <button class="fbar__btn" id="tab-storage" role="tab" aria-selected="false"
                aria-controls="rail" data-feature="storage" type="button">Storage</button>
        <button class="fbar__btn" id="tab-letters" role="tab" aria-selected="false"
                aria-controls="rail" data-feature="letters" type="button">Cover letters</button>
      </div>
    </div>

    <div class="feat-line">
      <p class="feat-desc" id="featDesc">Your profile, filled into any application form — every field, on every board, in one tap.</p>
      <p class="label feat-hint">
        <span class="hint-live">Drag the deck</span><span class="hint-static">Scroll the row</span>
        <span class="rule"></span>
        <span class="hint-live">On a loop</span><span class="hint-static">End to end</span>
      </p>
    </div>
  </div>

  <div class="rail" id="rail" role="tabpanel" aria-labelledby="tab-autofill"
       aria-roledescription="carousel" tabindex="0">
    <div class="rail__track" id="railTrack">
      <article class="rcard" style="--ic:var(--i1);--ic-bg:var(--i1bg)">
        <span class="rcard__ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h4"/></svg></span>
        <h3 class="rcard__t">Build your profile</h3>
        <p class="rcard__b">Enter your details once or upload a resume. Onextap parses and structures everything automatically.</p>
        <ul class="rcard__notes">
          <li>Resume upload, or type it in</li>
          <li>Every field stays editable</li>
        </ul>
        <p class="rcard__meta"><span aria-hidden="true">&#9670;</span> resume.pdf &rarr; parsed once</p>
      </article>

      <article class="rcard" style="--ic:var(--i2);--ic-bg:var(--i2bg)">
        <span class="rcard__ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18z"/><path d="M3.2 12h17.6"/><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z"/></svg></span>
        <h3 class="rcard__t">Open any job form</h3>
        <p class="rcard__b">Navigate to any job application on any platform. The Onextap extension activates automatically.</p>
        <ul class="rcard__notes">
          <li>No per-site setup</li>
          <li>Activates on the page you open</li>
        </ul>
        <p class="rcard__meta"><span aria-hidden="true">&#9670;</span> greenhouse &middot; lever &middot; workday</p>
      </article>

      <article class="rcard rcard--mock" style="--ic:var(--i3);--ic-bg:var(--i3bg)">
        <span class="rcard__ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8V6a2 2 0 0 1 2-2h2"/><path d="M16 4h2a2 2 0 0 1 2 2v2"/><path d="M20 16v2a2 2 0 0 1-2 2h-2"/><path d="M8 20H6a2 2 0 0 1-2-2v-2"/><path d="M4 12h16"/></svg></span>
        <h3 class="rcard__t">It reads the form</h3>
        <p class="rcard__b">DOM analysis and pattern matching find every field on the page, whatever this board decided to call them.</p>
        <div class="mini" aria-hidden="true">
          <div class="mini__bar"><i></i><i></i><i></i><span>boards.greenhouse.io</span></div>
          <div class="mini__body">
            <div class="mini__row"><span class="mini__k">first_name</span><span class="mini__v">Azzah</span><span class="mini__ok">&#10003;</span></div>
            <div class="mini__row"><span class="mini__k">email</span><span class="mini__v">azzah@example.com</span><span class="mini__ok">&#10003;</span></div>
            <div class="mini__row"><span class="mini__k">years_exp</span><span class="mini__v">4</span><span class="mini__ok">&#10003;</span></div>
          </div>
        </div>
        <ul class="rcard__notes">
          <li>Reads labels and placeholders</li>
          <li>Handles fields it has not seen</li>
        </ul>
        <p class="rcard__meta"><span aria-hidden="true">&#9670;</span> 11 fields found</p>
      </article>

      <article class="rcard" style="--ic:var(--i4);--ic-bg:var(--i4bg)">
        <span class="rcard__ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2L4 14h7l-1 8l9-12h-7z"/></svg></span>
        <h3 class="rcard__t">Tap to apply</h3>
        <p class="rcard__b">Hit autofill. Review your AI-personalised answers in seconds. Submit. Move to the next one.</p>
        <ul class="rcard__notes">
          <li>Review before you submit</li>
          <li>Nothing sends on its own</li>
        </ul>
        <p class="rcard__meta"><span aria-hidden="true">&#9670;</span> 11 fields &middot; 1 tap</p>
      </article>

      <article class="rcard" style="--ic:var(--i5);--ic-bg:var(--i5bg)">
        <span class="rcard__ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18z"/><path d="M8.4 12.2l2.4 2.4l4.8-5"/></svg></span>
        <h3 class="rcard__t">Next posting</h3>
        <p class="rcard__b">Nothing to re-type on the one after this. The profile you built is already waiting on the next form.</p>
        <ul class="rcard__notes">
          <li>Profile persists across sites</li>
          <li>Same two seconds each time</li>
        </ul>
        <p class="rcard__meta"><span aria-hidden="true">&#9670;</span> repeat &middot; forever</p>
      </article>
    </div>
  </div>
 </div>
</section>

<!-- ══ CH 02 ══ …watch it work: the form types itself ════════════════ -->
<section class="ch ch--bone layer" id="watch" data-ground="bone" data-chapter="02 — Watch it work">
 <div class="ch__body">
  <div class="wrap">
    <div class="ch__head">
      <p class="label">02 / In practice</p>
      <div>
        <h2 class="display feat__title" data-split>Watch it work.</h2>
      </div>
    </div>

    <div class="demo" id="demo">
      <div class="demo__bar">
        <span class="demo__dots"><i></i><i></i><i></i></span>
        <span class="demo__url">boards.greenhouse.io / northwind-labs / product-designer / apply</span>
        <span class="demo__badge">Onextap · filling</span>
      </div>
      <div class="demo__body">
        <div class="demo__row" data-demo style="--fill:0">
          <label class="demo__k">first_name</label>
          <div class="demo__inp"><span class="demo__v">Azzah</span><i class="demo__caret"></i></div>
        </div>
        <div class="demo__row" data-demo style="--fill:0">
          <label class="demo__k">email</label>
          <div class="demo__inp"><span class="demo__v">azzah@example.com</span><i class="demo__caret"></i></div>
        </div>
        <div class="demo__row" data-demo style="--fill:0">
          <label class="demo__k">years_of_experience</label>
          <div class="demo__inp"><span class="demo__v">4</span><i class="demo__caret"></i></div>
        </div>
        <div class="demo__row" data-demo style="--fill:0">
          <label class="demo__k">portfolio_url</label>
          <div class="demo__inp"><span class="demo__v">azzah.design</span><i class="demo__caret"></i></div>
        </div>
        <div class="demo__row demo__row--wide" data-demo style="--fill:0">
          <label class="demo__k">"Why do you want to work here?" — AI draft</label>
          <div class="demo__inp"><span class="demo__v">Northwind's design team ships its own research, which is rare. I've spent four years doing exactly that on a small team, and I'd rather keep owning the whole loop than hand it off.</span><i class="demo__caret"></i></div>
        </div>
        <p class="demo__note mono">Every draft is yours to edit before it goes anywhere near submit.</p>
      </div>
    </div>
  </div>
 </div>
</section>
`;var Ne=[["var(--i1)","var(--i1bg)"],["var(--i2)","var(--i2bg)"],["var(--i3)","var(--i3bg)"],["var(--i4)","var(--i4bg)"],["var(--i5)","var(--i5bg)"],["var(--i6)","var(--i6bg)"]],ue=[{key:"autofill",cards:null,desc:"Your profile, filled into any application form — every field, on every board, in one tap."},{key:"mapping",desc:"A field Onextap has not seen before gets mapped once, then fills itself everywhere after that.",cards:[{icon:"search",t:"An odd field appears",m:"unmapped: notice_period",b:"A form asks for something Onextap has not met before. It is flagged rather than quietly skipped.",notes:["Flagged, never guessed","Shown before anything fills"]},{icon:"link",t:"Map it once",m:"notice_period → 4 weeks",demo:"map",b:"Point the field at the answer it belongs to. One click, and only the first time you see it.",notes:["One click to bind it","First time only"]},{icon:"db",t:"It sticks",m:"remembered · every board",b:"Every future application carrying that field fills itself, whichever board is asking.",notes:["Stored with your profile","Applies on boards you have not seen"]},{icon:"check",t:"No repeat work",m:"learned once",b:"The mapping list only ever grows, so the second application is always faster than the first.",notes:["The list only ever grows","No second setup"]}]},{key:"answers",desc:"Written answers drafted from the posting in front of you and the answers you have already given.",cards:[{icon:"scan",t:"It reads the posting",m:"job post + your profile",b:"The job description goes in alongside your profile, so the draft is about this role.",notes:["Job text plus your profile","Per posting, not a template"]},{icon:"spark",t:"You get a draft",m:"two-pass on premium",demo:"draft",b:"Written from answers you have already given, in the words you already used.",notes:["Built from your own answers","Second pass on Premium"]},{icon:"pen",t:"You have the last word",m:"edit · then fill",b:"Every answer stays editable before it is saved or submitted. Nothing goes out unread.",notes:["Editable before it is saved","Nothing submits unread"]},{icon:"zap",t:"Straight into the form",m:"no copy-paste",b:"The answer you approved fills the field it was written for, without a round trip.",notes:["Fills the field it was written for","No copy-paste step"]}]},{key:"profiles",desc:"One profile per direction you are applying in, each with its own details and saved answers.",cards:[{icon:"layers",t:"One per direction",m:"design · engineering · lead",demo:"chips",b:"A separate profile for each kind of role, with its own details and its own saved answers.",notes:["Own details and answers","As many as you need"]},{icon:"toggle",t:"Switch per application",m:"switch · then autofill",b:"Pick the profile before you fill. Nothing else about the flow changes.",notes:["Pick before you fill","Rest of the flow unchanged"]},{icon:"shield",t:"Answers stay separate",m:"no cross-fill",b:"An answer written for design work never turns up in an engineering application.",notes:["No cross-profile fill","Each keeps its own answers"]},{icon:"user",t:"One career, told twice",m:"many profiles · one you",b:"The same history, ordered the way each kind of role actually needs to read it.",notes:["Same history, different order","One profile per direction"]}]},{key:"storage",desc:"Your profile stays in your browser. Backup is opt-in, and only answer drafting leaves the device.",cards:[{icon:"lock",t:"It lives in your browser",m:"chrome.storage.local",demo:"vault",b:"Your profile is kept in the browser’s own storage rather than on a server by default.",notes:["Kept on this device","No account needed to start"]},{icon:"cloud",t:"Backup is opt-in",m:"optional · encrypted",b:"Turn on encrypted cloud backup if you want sync across machines. Off until you say so.",notes:["Off until you turn it on","Syncs across your machines"]},{icon:"spark",t:"Drafting calls out",m:"answer drafting only",b:"Drafting an answer sends the relevant text to our AI providers — the one trip off-device.",notes:["Only the text needed to draft","Nothing else leaves the device"]},{icon:"shield",t:"You can see the line",m:"stated, not implied",b:"What stays on the device and what leaves it is written down rather than left to inference.",notes:["Written down, not implied","Set out in the privacy policy"]}]},{key:"letters",desc:"Keep the letters you actually use, adapt them to the posting, and drop them into the form.",cards:[{icon:"mail",t:"Store your letters",m:"saved in the extension",b:"Keep the cover letters you actually send where you can reach them while applying.",notes:["Kept in the extension","Reachable while applying"]},{icon:"spark",t:"Personalise per role",m:"tailored per posting",demo:"draft",b:"The AI adapts a stored letter to the posting in front of you rather than starting over.",notes:["Adapts a letter you saved","Keeps your own voice"]},{icon:"copy",t:"Fill it in one click",m:"1 click · no tab switch",b:"Drop the finished letter into the form without leaving the application page.",notes:["No tab switching","Lands in the form field"]},{icon:"check",t:"Keep the good one",m:"reuse · refine",b:"The letter that worked stays in the library, ready for the next role that looks like it.",notes:["Stays in the library","Ready for the next role like it"]}]}],De={file:["M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z","M14 3v5h5","M9 13h6","M9 17h4"],globe:["M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18z","M3.2 12h17.6","M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z"],scan:["M4 8V6a2 2 0 0 1 2-2h2","M16 4h2a2 2 0 0 1 2 2v2","M20 16v2a2 2 0 0 1-2 2h-2","M8 20H6a2 2 0 0 1-2-2v-2","M4 12h16"],zap:["M13 2L4 14h7l-1 8l9-12h-7z"],check:["M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18z","M8.4 12.2l2.4 2.4l4.8-5"],search:["M11 4a7 7 0 1 0 0 14a7 7 0 0 0 0-14z","M16.4 16.4L21 21"],link:["M10.5 13.5a4 4 0 0 0 5.7 0l2.6-2.6a4 4 0 1 0-5.7-5.7l-1.5 1.5","M13.5 10.5a4 4 0 0 0-5.7 0l-2.6 2.6a4 4 0 1 0 5.7 5.7l1.5-1.5"],db:["M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3s-8-1.3-8-3s3.6-3 8-3z","M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6","M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"],spark:["M11 3l1.7 4.8L17.5 9.5l-4.8 1.7L11 16l-1.7-4.8L4.5 9.5l4.8-1.7z","M17.8 14.6l.7 2l2 .7l-2 .7l-.7 2l-.7-2l-2-.7l2-.7z"],pen:["M4 20h4L18.5 9.5a2.83 2.83 0 0 0-4-4L4 16z","M14.5 5.5l4 4"],layers:["M12 2.5L21 7l-9 4.5L3 7z","M3 12l9 4.5L21 12","M3 16.5l9 4.5l9-4.5"],toggle:["M8 7h8a5 5 0 0 1 0 10H8A5 5 0 0 1 8 7z","M16 9.5a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5z"],shield:["M12 3l8 3v6c0 4.4-3.3 8.3-8 9c-4.7-.7-8-4.6-8-9V6z","M9 12l2 2l4-4"],lock:["M6 11h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z","M8.5 11V7.5a3.5 3.5 0 0 1 7 0V11"],cloud:["M7 18h10a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 6.8 9.2A3.9 3.9 0 0 0 7 18z"],mail:["M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z","M3.6 7.2L12 13l8.4-5.8"],copy:["M9 9h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z","M5 15H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v1"],user:["M12 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8z","M4.5 20a7.5 7.5 0 0 1 15 0"]};function cn(a){var n=w("span","rcard__ic"),e=document.createElementNS(ke,"svg");return e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true"),(De[a]||De.check).forEach(function(t){var i=document.createElementNS(ke,"path");i.setAttribute("d",t),e.appendChild(i)}),n.appendChild(e),n}function V(a,n,e){var t=w("div","mini__row");return t.appendChild(w("span","mini__k",a)),t.appendChild(w("span","mini__v",n)),e&&t.appendChild(w("span","mini__ok",e)),t}function un(a){var n=w("div","mini");n.setAttribute("aria-hidden","true");var e=w("div","mini__bar");e.appendChild(w("i")),e.appendChild(w("i")),e.appendChild(w("i"));var t=w("div","mini__body");if(a==="form")e.appendChild(w("span",null,"boards.greenhouse.io")),t.appendChild(V("first_name","Azzah","✓")),t.appendChild(V("email","azzah@example.com","✓")),t.appendChild(V("years_exp","4","✓"));else if(a==="map")e.appendChild(w("span",null,"unrecognised field")),t.appendChild(V("notice_period","unmapped")),t.appendChild(V("↳ fills with","4 weeks","✓"));else if(a==="draft"){e.appendChild(w("span",null,"answer draft"));var i=w("div","mini__lines");i.appendChild(w("span","mini__line")),i.appendChild(w("span","mini__line mini__line--mid"));var r=w("div","mini__tail");r.appendChild(w("span","mini__line mini__line--short")),r.appendChild(w("i","mini__caret")),i.appendChild(r),t.appendChild(i)}else if(a==="chips"){e.appendChild(w("span",null,"profiles"));var s=w("div","mini__chips");s.appendChild(w("span","mini__chip is-on","Design")),s.appendChild(w("span","mini__chip","Engineering")),s.appendChild(w("span","mini__chip","Lead")),t.appendChild(s),t.appendChild(V("active","Design","✓"))}else e.appendChild(w("span",null,"chrome.storage.local")),t.appendChild(V("profile","on this device","●")),t.appendChild(V("cloud backup","off"));return n.appendChild(e),n.appendChild(t),n}function pn(a,n){var e=w("article","rcard"),t=Ne[n%Ne.length];if(e.style.setProperty("--ic",t[0]),e.style.setProperty("--ic-bg",t[1]),e.appendChild(cn(a.icon)),e.appendChild(w("h3","rcard__t",a.t)),e.appendChild(w("p","rcard__b",a.b)),a.demo&&(e.className="rcard rcard--mock",e.appendChild(un(a.demo))),a.notes){var i=w("ul","rcard__notes");a.notes.forEach(function(o){i.appendChild(w("li",null,o))}),e.appendChild(i)}var r=w("p","rcard__meta"),s=w("span",null,"◆");return s.setAttribute("aria-hidden","true"),r.appendChild(s),r.appendChild(document.createTextNode(" "+a.m)),e.appendChild(r),e}function je(){var a=document.getElementById("railTrack"),n=document.getElementById("fbar"),e=document.getElementById("fbarThumb"),t=document.getElementById("featDesc"),i=n?Array.prototype.slice.call(n.querySelectorAll("[data-feature]")):[],r="autofill",s=null;function o(u){for(var p=0;p<ue.length;p++)if(ue[p].key===u)return ue[p];return ue[0]}a&&(ue[0].nodes=Array.prototype.slice.call(a.children));function l(u){return u.nodes||(u.nodes=u.cards.map(pn)),u.nodes}function c(u){for(var p=o(u);a.firstChild;)a.removeChild(a.firstChild);l(p).forEach(function(v){a.appendChild(v)}),t.textContent=p.desc,t.classList.remove("is-swapping")}function f(){if(!(!n||!e)){var u=n.querySelector('[aria-selected="true"]');if(u){var p=n.getBoundingClientRect(),v=u.getBoundingClientRect();e.style.width=v.width+"px",e.style.transform="translateX("+(v.left-p.left-n.clientLeft+n.scrollLeft)+"px)"}}}function y(u){for(var p=0;p<i.length;p++)if(i[p].getAttribute("data-feature")===u)return i[p];return null}function g(u){u!==r&&(r=u,i.forEach(function(p){var v=p.getAttribute("data-feature")===u;p.setAttribute("aria-selected",v?"true":"false"),v&&document.getElementById("rail").setAttribute("aria-labelledby",p.id)}),y(u)&&y(u).scrollIntoView({inline:"nearest",block:"nearest"}),f(),t.classList.add("is-swapping"),s?s(u):c(u))}return i.forEach(function(u){u.addEventListener("click",function(){g(u.getAttribute("data-feature"))})}),n&&(n.addEventListener("keydown",function(u){if(!(u.key!=="ArrowLeft"&&u.key!=="ArrowRight")){var p=i.indexOf(document.activeElement);if(!(p<0)){u.preventDefault();var v=i[(p+(u.key==="ArrowRight"?1:i.length-1))%i.length];v.focus(),g(v.getAttribute("data-feature"))}}}),f(),n.addEventListener("scroll",f,{passive:!0}),window.addEventListener("resize",f),typeof ResizeObserver<"u"&&new ResizeObserver(f).observe(n),document.fonts&&document.fonts.ready?document.fonts.ready.then(function(){f(),requestAnimationFrame(f),document.querySelector(".fbar").classList.add("is-ready")}):document.querySelector(".fbar").classList.add("is-ready")),{paintFeature:c,setSwapHandler:function(u){s=u}}}function $e(a){var n=a.paintFeature,e=a.setSwapHandler,t=a.cursor.el,i=a.cursor.fine,r=document.getElementById("rail"),s=document.getElementById("railTrack");if(!r||!s)return;var o=.9,l=.05,c=95,f=16,y=.18,g=.58,u=.62,p=24,v=96,E=38,T=[],m=0,D=1,q=1,O=0,P=.58,L=1/P,U=4.2,X=9,G=.085,B=2.2,d=6,h=.14,x=.31,S=3.3,R=0,M=0,z=0,Q=0,H={v:0},se={v:0},ee={o:0},pe=0,Y=!1,W=!1,j=null,k=null,ae=null,fe=null,ne=!0;function he(){return ae!==null}function Me(_){var b=_.cloneNode(!0);return b.setAttribute("data-clone",""),b.setAttribute("aria-hidden","true"),b}function oe(){var _=Array.prototype.slice.call(s.children),b=[];if(_.forEach(function(C){C.hasAttribute("data-clone")?C.remove():b.push(C)}),m=b.reduce(function(C,de){var Re=getComputedStyle(de);return C+de.offsetWidth+parseFloat(Re.marginLeft)+parseFloat(Re.marginRight)},0),!!m){D=Math.max(r.clientWidth/2,1),q=m/b.length;var N=r.clientWidth<620;P=N?.84:.58,L=1/P,U=N?2.4:4.2,X=N?6:9;var F=document.createDocumentFragment();b.forEach(function(C){F.appendChild(Me(C))}),s.insertBefore(F,b[0]),O=b[0].offsetLeft+b[0].offsetWidth/2;for(var A=Math.min(S*q,(D+q)/P),ve=Math.max(3,Math.ceil((O+m+A)/m)+1),$=2;$<ve;$++)b.forEach(function(C){s.appendChild(Me(C))});T=Array.prototype.slice.call(s.children),ne=!0}}function Ae(_,b){_._vis!==b&&(_._vis=b,_.style.visibility=b?"":"hidden")}function ta(_,b){_._z!==b&&(_._z=b,_.style.zIndex=b)}function le(){if(m){var _=(R%m+m)%m,b=D-O-_;s.style.transform="translate3d("+b.toFixed(2)+"px,0,0)";for(var N=H.v,F=0;F<T.length;F++){var A=T[F],ve=A.offsetLeft+A.offsetWidth/2+b-D,$=ve/q,C=$<0?-$:$;if(C>S){A._vis!==!1&&A.style.filter&&(A.style.filter=""),Ae(A,!1);continue}Ae(A,!0),A.style.transform="translate3d("+((P-1)*ve).toFixed(1)+"px,"+(C*X).toFixed(1)+"px,0) rotate("+($*U-N*.3).toFixed(2)+"deg) scale("+(1-C*G).toFixed(4)+")",A.style.opacity=Math.max(0,1-C*x).toFixed(3);var de=(C-h)*B;A.style.filter=de<.05?"":"blur("+Math.min(de,d).toFixed(2)+"px)",ta(A,200-Math.round(C*20))}}}function ra(){if(W)M=z*L,z=0;else if(M*=o,Math.abs(M)<l&&(M=0),q&&!Y&&!he()&&Math.abs(M)<f){var _=Math.round(R/q)*q-R;M=M*g+_*y,Math.abs(_)<.4&&Math.abs(M)<.4&&(R+=_,M=0,ne=!0)}M>c?M=c:M<-c&&(M=-c);var b=Y?ee.o-pe:se.v;Y&&(pe=ee.o);var N=W||M!==0||b!==0||Y||k!==null;if(!(!N&&!ne&&Math.abs(H.v)<=.02)){!N&&Math.abs(H.v)<=.02&&(H.v=0),R+=M+b;var F=he()?E:p,A=(M+b)*u;A>F?A=F:A<-F&&(A=-F),k&&W&&(k.kill(),k=null),k||(H.v+=(A-H.v)*.17,!W&&Math.abs(A)<.35&&Math.abs(H.v)>1.2&&me()),le(),ne=!1}}function me(){k&&k.kill(),k=I.to(H,{v:0,duration:1.05,ease:"elastic.out(1, 0.34)",onComplete:function(){k=null}})}function ia(_){ae&&(ae.kill(),I.killTweensOf(ee),Y=!1,se.v=0,fe&&(n(fe),R=0,oe())),k&&(k.kill(),k=null),fe=_,M=0;var b={b:0},N=function(){s.style.filter=b.b>.05?"blur("+b.b.toFixed(2)+"px)":""};ae=I.timeline({onComplete:function(){ae=null,se.v=0,s.style.filter=""}}),ae.to(se,{v,duration:.26,ease:"power2.in"},0).to(b,{b:5,duration:.26,ease:"power2.in",onUpdate:N},0).add(function(){n(_),R=0,oe(),se.v=0;var F=v*7,A=m?(-F%m+m)%m:0;ee.o=0,pe=0,Y=!0,I.to(ee,{o:F+A,duration:.56,ease:"power3.out",onComplete:function(){Y=!1,pe=ee.o,m&&(R=Math.round(R/m)*m),ne=!0}}),le(),fe=null},.42).to(b,{b:0,duration:.46,ease:"power2.out",onUpdate:N},.42).add(me,.66)}e(ia);function sa(_){if(!he()&&!(_.pointerType==="mouse"&&_.button!==0)){W=!0,z=0,Q=_.clientX,j=_.pointerId;try{r.setPointerCapture(j)}catch{}r.classList.add("is-dragging"),t.classList.add("is-dragging"),k&&(k.kill(),k=null)}}function oa(_){if(!(!W||_.pointerId!==j)){var b=_.clientX-Q;Q=_.clientX,z-=b}}function xe(_){if(!(!W||j!==null&&_.pointerId!==j)){W=!1,z&&(R+=z*L,z=0,ne=!0);try{r.releasePointerCapture(j)}catch{}j=null,r.classList.remove("is-dragging"),t.classList.remove("is-dragging"),Math.abs(H.v)>1.2&&me(),r.matches(":hover")||t.classList.remove("is-drag")}}r.addEventListener("pointerdown",sa),r.addEventListener("pointermove",oa),r.addEventListener("pointerup",xe),r.addEventListener("pointercancel",xe),r.addEventListener("dragstart",function(_){_.preventDefault()}),r.addEventListener("wheel",function(_){Math.abs(_.deltaX)<=Math.abs(_.deltaY)||(_.preventDefault(),R+=_.deltaX*L,M=_.deltaX*.5*L)},{passive:!1}),r.addEventListener("keydown",function(_){_.key!=="ArrowLeft"&&_.key!=="ArrowRight"||(_.preventDefault(),k&&(k.kill(),k=null),M+=_.key==="ArrowRight"?20:-20)}),i&&(r.addEventListener("pointerenter",function(){t.classList.add("is-drag")}),r.addEventListener("pointerleave",function(){W||(t.classList.remove("is-drag"),t.classList.remove("is-dragging"))})),r.classList.add("is-live"),oe(),le(),I.ticker.add(ra),window.addEventListener("resize",function(){oe(),le()}),document.readyState!=="complete"&&window.addEventListener("load",function(){oe(),le()},{once:!0})}function Ke(){var a=Array.prototype.slice.call(document.querySelectorAll("[data-demo]")),n=Z(document.querySelector("#watch [data-split]")),e=document.getElementById("demo");return{enter:function(t,i){ie(t,n,i),t.fromTo(e,{y:44,opacity:0},{y:0,opacity:1,duration:.5,ease:"power3.out"},i+.15)},body:function(t,i){var r=i+.1;return a.forEach(function(s){var o=Math.max(.6,s.querySelector(".demo__v").textContent.length/90)*.34;t.fromTo(s,{"--fill":0},{"--fill":1,duration:o,ease:"none",onStart:function(){s.classList.add("is-typing")},onComplete:function(){s.classList.remove("is-typing")},onReverseComplete:function(){s.classList.remove("is-typing")}},r),r+=o-.03}),r-i}}}function Je(){var a=Z(document.querySelector("#how [data-split]")),n=document.querySelectorAll("#how .fbar, #how .feat-line"),e=document.getElementById("rail");return{enter:function(t,i){ie(t,a,i),t.fromTo(n,{y:24,opacity:0},{y:0,opacity:1,duration:.4,stagger:.08,ease:"power2.out"},i+.15),t.fromTo(e,{y:42,opacity:0},{y:0,opacity:1,duration:.5,ease:"power3.out"},i+.3)},body:function(){return .9}}}const fn=Object.freeze(Object.defineProperty({__proto__:null,initDemoForm:Ke,initFeatureChapter:Je,initFeatureTabs:je,initRail:$e,markup:dn},Symbol.toStringTag,{value:"Module"})),vn=`<!-- ══ CH 03 ══ the marquee ═══════════════════════════════════════════ -->
<section class="ch ch--ink-2 layer" id="boards" data-ground="ink" data-chapter="03 — Everywhere">
  <div class="ch__body">
    <div class="wrap">
      <div class="ch__head">
        <p class="label">03 / Everywhere</p>
        <div>
          <h2 class="display boards__title" data-split>
            Same eleven questions. Different logo.
          </h2>
        </div>
      </div>
    </div>
    <div class="marquee" aria-label="Job boards Onextap runs on">
      <div class="marquee__track">
        <div class="marquee__group" aria-hidden="false">
          <span class="marquee__item">Greenhouse</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">Lever</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">Workday</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">Ashby</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">iCIMS</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">Workable</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">SmartRecruiters</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">Taleo</span><span class="marquee__sep">◆</span>
        </div>
        <div class="marquee__group" aria-hidden="true">
          <span class="marquee__item">Greenhouse</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">Lever</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">Workday</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">Ashby</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">iCIMS</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">Workable</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">SmartRecruiters</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">Taleo</span><span class="marquee__sep">◆</span>
        </div>
      </div>
    </div>
    <!-- The same boards again, the other way round: decorative, so hidden
         from assistive tech — the row above already names them all. -->
    <div class="marquee marquee--reverse" aria-hidden="true">
      <div class="marquee__track">
        <div class="marquee__group">
          <span class="marquee__item">Workable</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">Taleo</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">Lever</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">SmartRecruiters</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">Greenhouse</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">iCIMS</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">Ashby</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">Workday</span><span class="marquee__sep">◆</span>
        </div>
        <div class="marquee__group">
          <span class="marquee__item">Workable</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">Taleo</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">Lever</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">SmartRecruiters</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">Greenhouse</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">iCIMS</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">Ashby</span><span class="marquee__sep">◆</span>
          <span class="marquee__item">Workday</span><span class="marquee__sep">◆</span>
        </div>
      </div>
    </div>
  </div>
</section>
`;function Ze(){var a=Z(document.querySelector("#boards [data-split]")),n=document.querySelectorAll("#boards .marquee");return{enter:function(e,t){ie(e,a,t)},body:function(e,t){return n.forEach(function(i,r){e.fromTo(i.querySelectorAll(".marquee__group"),{xPercent:0},{xPercent:r?9:-9,duration:2.8,ease:"none",immediateRender:!1},t-1)}),.9}}}const hn=Object.freeze(Object.defineProperty({__proto__:null,initJobBoards:Ze,markup:vn},Symbol.toStringTag,{value:"Module"})),mn=`<!-- ══ CH 04 ══ pricing ═══════════════════════════════════════════════ -->
<section class="ch ch--bone layer" id="price" data-ground="bone" data-chapter="04 — Pricing">
  <div class="ch__body">
    <div class="wrap">
      <div class="ch__head">
        <p class="label">04 / Pricing</p>
        <div>
          <h2 class="display price__title" data-split>
            Two prices. One of them is nothing.
          </h2>
        </div>
      </div>

      <div class="plans">
        <article class="plan">
          <div class="plan__k"><p class="label">Free</p></div>
          <p class="display plan__price">$0</p>
          <p class="plan__per">Forever</p>
          <ul class="plan__list">
            <li><span class="tick">◆</span> Unlimited autofill applications</li>
            <li><span class="tick">◆</span> Local data storage</li>
            <li><span class="tick">◆</span> Multiple profiles</li>
            <li><span class="tick">◆</span> Smart field mapping</li>
            <li><span class="tick">◆</span> 3 standard AI credits for written answers</li>
          </ul>
          <a class="btn btn--ghost" href="#top">Get started free</a>
        </article>

        <article class="plan">
          <div class="plan__k"><p class="label">Premium</p><span class="plan__badge">Most popular</span></div>
          <p class="display plan__price">$5</p>
          <p class="plan__per">per month</p>
          <ul class="plan__list">
            <li><span class="tick">◆</span> Everything in Free</li>
            <li><span class="tick">◆</span> Unlimited high-quality AI answers</li>
            <li><span class="tick">◆</span> Two-pass rewrites for stronger drafts</li>
            <li><span class="tick">◆</span> Deeper profile-tailored personalisation</li>
            <li><span class="tick">◆</span> Encrypted cloud backup &amp; sync</li>
            <li><span class="tick">◆</span> Priority support and early access</li>
          </ul>
          <a class="btn btn--solid" href="#top">Upgrade to Premium <span class="btn__arrow">→</span></a>
        </article>
      </div>
    </div>
  </div>
</section>
`;function Qe(){var a=Z(document.querySelector("#price [data-split]")),n=document.querySelectorAll(".plan");return{enter:function(e,t){ie(e,a,t),e.fromTo(n,{y:34,opacity:0},{y:0,opacity:1,duration:.45,stagger:.1,ease:"power3.out"},t+.15)},body:function(){return .6}}}const _n=Object.freeze(Object.defineProperty({__proto__:null,initPricing:Qe,markup:mn},Symbol.toStringTag,{value:"Module"})),gn=`<!-- ══ CH 05 ══ close ═════════════════════════════════════════════════ -->
<section class="close layer" id="close" data-ground="citrine" data-chapter="05 — Get hired">
  <div class="ch__body">
    <div class="wrap">
      <p class="label">The offer</p>
      <h2 class="display close__title" data-split>Get hired.</h2>
      <div class="close__row">
        <a class="btn btn--solid" href="#top">Add to Chrome — free <span class="btn__arrow">→</span></a>
        <p class="close__fine">
          Free forever, no card. Three AI credits to start, then $5/month if you want unlimited
          drafts. Chrome, Edge, Brave and Opera.
        </p>
      </div>
    </div>
  </div>
</section>
`;function ea(){var a=Z(document.querySelector(".close [data-split]")),n=document.querySelector(".close__row");return{enter:function(e,t){ie(e,a,t,.5),e.fromTo(n,{y:24,opacity:0},{y:0,opacity:1,duration:.35,ease:"power2.out"},t+.25)},body:function(){return .5}}}const yn=Object.freeze(Object.defineProperty({__proto__:null,initClosing:ea,markup:gn},Symbol.toStringTag,{value:"Module"})),bn=`<footer class="foot layer" data-ground="ink" data-chapter="05 — Get hired">
  <div class="ch__body">
    <div class="wrap">
      <div class="foot__grid">
        <div>
          <h4>Onextap</h4>
          <p class="foot__note">
            An application copilot, not an applicant tracking system. Your profile stays in your
            browser's storage; generating a written answer sends the relevant text to our AI
            providers to draft it.
          </p>
        </div>
        <div>
          <h4>Product</h4>
          <ul>
            <li><a href="#form">The form</a></li>
            <li><a href="#how">Features</a></li>
            <li><a href="#price">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="/about/">About</a></li>
            <li><a href="/contact/">Contact</a></li>
            <li><a href="/privacy/">Privacy</a></li>
          </ul>
        </div>
        <div>
          <h4>Still hiring?</h4>
          <p class="foot__note">No. But the form on the other side of that link takes about four seconds now.</p>
        </div>
      </div>
      <p class="display foot__mark" aria-hidden="true">Onextap</p>
    </div>
  </div>
</footer>
`;function aa(){var a=document.querySelector(".foot__mark");return{enter:function(n,e){n.fromTo(a,{yPercent:55,opacity:0},{yPercent:0,opacity:1,duration:.6,ease:"power3.out"},e)}}}const wn=Object.freeze(Object.defineProperty({__proto__:null,initFooter:aa,markup:bn},Symbol.toStringTag,{value:"Module"}));da({cursor:pa,nav:ua,hud:ca,hero:sn,"form-fields":ln,"feature-showcase":fn,"job-boards":hn,pricing:_n,closing:yn,footer:wn});var na=fa(),Te=va();Te.onToggle(na.refresh);var Ue=je();if(ha)document.documentElement.classList.add("no-motion");else{ma();var te=null,J=_a(function(a){return te&&te.scrollFor(a)});te=za({track:document.getElementById("stageTrack"),stage:document.getElementById("stage"),chapters:nn({hero:Ge(),form:Ye(),features:Je(),demo:Ke(),boards:Ze(),pricing:Qe(),closing:ea(),footer:aa()}),scrollTo:function(a,n){J.scrollTo(a,{immediate:!!n,force:!!n})}});var En=ga();$e({paintFeature:Ue.paintFeature,setSwapHandler:Ue.setSwapHandler,cursor:En});var He=function(a){J.resize(),ya(J,te.scrollFor,a,!0)};Te.onToggle(function(a){a?J.stop():J.start()}),Te.setJump(He),na.setOverlay(te.groundAt),Ee.refresh(),tn({stage:te,jump:He,scrollTo:function(a){J.resize(),J.scrollTo(a,{immediate:!0,force:!0})}})}
