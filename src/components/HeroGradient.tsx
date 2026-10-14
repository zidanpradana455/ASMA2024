import {useEffect,useRef} from 'react';

const vertex=`attribute vec2 position;void main(){gl_Position=vec4(position,0.,1.);}`;
const fragment=`
precision mediump float;
uniform vec2 resolution;
uniform float time;
void main(){
 vec2 uv=gl_FragCoord.xy/resolution;
 float t=time*.22;
 // Broad, interleaving currents keep the portrait readable.
 vec2 p=uv;
 p.x+=.19*sin(uv.y*4.2+t)+.09*cos(uv.x*3.7-t*.8);
 p.y+=.21*cos(uv.x*3.3-t*.7)+.08*sin(uv.y*5.+t*.6);
 float warm=1.-smoothstep(.05,.85,length((p-vec2(.12+.24*sin(t*.7),.87+.15*cos(t*.9)))*vec2(.9,1.1)));
 float pink=1.-smoothstep(.03,.85,length((p-vec2(.83+.22*cos(t*.8),.35+.25*sin(t*.6)))*vec2(1.,.85)));
 float deep=.5+.5*sin(p.x*4.-p.y*3.+t*.65);
 vec3 color=mix(vec3(.49,.015,.09),vec3(.67,.024,.075),deep);
 color=mix(color,vec3(.75,.0,.35),pink*.88);
 color=mix(color,vec3(.92,.43,.025),warm*.9);
 gl_FragColor=vec4(color,1.);
}`;

export default function HeroGradient(){
 const canvas=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{
  const el=canvas.current;if(!el)return;
  const gl=el.getContext('webgl',{alpha:false,antialias:false,depth:false,powerPreference:'low-power'});
  if(!gl)return;
  const compile=(type:number,source:string)=>{const shader=gl.createShader(type);if(!shader)return null;gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){gl.deleteShader(shader);return null}return shader};
  const vs=compile(gl.VERTEX_SHADER,vertex),fs=compile(gl.FRAGMENT_SHADER,fragment);
  if(!vs||!fs){if(vs)gl.deleteShader(vs);if(fs)gl.deleteShader(fs);return}
  const program=gl.createProgram();if(!program){gl.deleteShader(vs);gl.deleteShader(fs);return}
  gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS)){gl.deleteProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);return}
  gl.useProgram(program);
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const position=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
  const resolution=gl.getUniformLocation(program,'resolution'),time=gl.getUniformLocation(program,'time');
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,visible=false,last=0,elapsed=0,lost=false;
  const draw=()=>{if(lost)return;gl.uniform2f(resolution,el.width,el.height);gl.uniform1f(time,elapsed);gl.drawArrays(gl.TRIANGLES,0,6)};
  const resize=()=>{const rect=el.getBoundingClientRect();const scale=Math.min(.65,1280/Math.max(rect.width,rect.height));el.width=Math.max(1,Math.round(rect.width*scale));el.height=Math.max(1,Math.round(rect.height*scale));gl.viewport(0,0,el.width,el.height);draw()};
  const tick=(now:number)=>{if(!last)last=now;if(now-last>=1000/30){elapsed+=Math.min((now-last)/1000,.1);last=now;draw()}frame=requestAnimationFrame(tick)};
  const update=()=>{cancelAnimationFrame(frame);frame=0;last=0;const active=visible&&!document.hidden&&!preference.matches&&!lost;el.dataset.active=String(active);if(active)frame=requestAnimationFrame(tick);else draw()};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update()});observer.observe(el);
  const size=new ResizeObserver(resize);size.observe(el);resize();el.dataset.ready='true';
  preference.addEventListener('change',update);document.addEventListener('visibilitychange',update);
  const onLost=()=>{lost=true;update();el.dataset.ready='false'};
  el.addEventListener('webglcontextlost',onLost);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();size.disconnect();preference.removeEventListener('change',update);document.removeEventListener('visibilitychange',update);el.removeEventListener('webglcontextlost',onLost);gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.deleteShader(vs);gl.deleteShader(fs)};
 },[]);
 return <div className="hero-fluid" aria-hidden="true"><canvas ref={canvas}/></div>;
}
