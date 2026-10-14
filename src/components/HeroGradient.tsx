import {useEffect,useId,useRef} from 'react';
import './HeroGradient.css';

const layers=[
 {height:365,amplitude:140,speed:14,morph:8,opacity:.35,colors:['#E8640C','#B30A22']},
 {height:445,amplitude:120,speed:18,morph:9.5,opacity:.40,colors:['#B30A22','#A20C36']},
 {height:525,amplitude:100,speed:24,morph:11,opacity:.45,colors:['#A20C36','#8A0B33']},
 {height:605,amplitude:80,speed:30,morph:12,opacity:.50,colors:['#8A0B33','#690B2C']},
];

// Both 1440-unit tiles share endpoints AND tangents, including during morphs.
function wavePath(height:number,amplitude:number,phase:number){
 const k=Math.PI*2/1440;
 const y=(x:number)=>height+amplitude*(.82*Math.sin(k*x+phase)+.18*Math.sin(2*k*x+phase));
 const slope=(x:number)=>amplitude*k*(.82*Math.cos(k*x+phase)+.36*Math.cos(2*k*x+phase));
 let path=`M 0 ${y(0)}`;
 for(let x=0;x<2880;x+=240){const end=x+240;path+=` C ${x+80} ${y(x)+80*slope(x)} ${end-80} ${y(end)-80*slope(end)} ${end} ${y(end)}`}
 return path;
}

export default function HeroGradient(){
 const root=useRef<HTMLDivElement>(null);
 const id=useId().replaceAll(':','');
 useEffect(()=>{
  const layer=root.current,hero=layer?.parentElement;if(!layer||!hero)return;
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  const svgs=[...layer.querySelectorAll('svg')];let visible=false;
  const update=()=>{
   const active=visible&&!document.hidden&&!preference.matches;
   layer.dataset.active=String(active);hero.dataset.heroMotion=preference.matches?'reduced':active?'running':'paused';
   for(const svg of svgs){if(active)svg.unpauseAnimations();else svg.pauseAnimations();if(preference.matches)svg.setCurrentTime(0)}
  };
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update()});observer.observe(hero);
  const title=hero.querySelector<HTMLElement>('.hero-tagline'),stage=hero.querySelector<HTMLElement>('.hero-stage');
  const measure=()=>{if(title&&stage)layer.style.setProperty('--headline-bottom',`${stage.offsetTop+title.offsetTop+title.offsetHeight+32}px`)};
  const size=new ResizeObserver(measure);size.observe(hero);if(title)size.observe(title);if(stage)size.observe(stage);measure();update();
  preference.addEventListener('change',update);document.addEventListener('visibilitychange',update);
  return()=>{observer.disconnect();size.disconnect();preference.removeEventListener('change',update);document.removeEventListener('visibilitychange',update);delete hero.dataset.heroMotion};
 },[]);
 return <div ref={root} className="hero-fluid" data-active="false" aria-hidden="true">
  <div className="hero-satin-waves">
   {layers.map((layer,i)=>{
    const paths=[0,.6,-.45,0].map(phase=>wavePath(layer.height,layer.amplitude,phase+i*.7));
    const timing={dur:`${layer.morph}s`,repeatCount:'indefinite',calcMode:'spline' as const,keyTimes:'0;.333333;.666667;1',keySplines:'.42 0 .58 1;.42 0 .58 1;.42 0 .58 1'};
    return <svg key={i} className={`hero-satin-layer hero-satin-layer-${i+1}`} viewBox="0 0 2880 900" preserveAspectRatio="none" focusable="false" style={{'--wave-speed':`${layer.speed}s`,'--wave-direction':i%2?'reverse':'normal'} as React.CSSProperties}>
     <defs><linearGradient id={`${id}-satin-${i}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={layer.colors[0]}/><stop offset="1" stopColor={layer.colors[1]}/></linearGradient></defs>
     <path className="hero-satin-fill" d={`${paths[0]} L 2880 1100 L 0 1100 Z`} fill={`url(#${id}-satin-${i})`} opacity={layer.opacity}>
      <animate attributeName="d" values={paths.map(path=>`${path} L 2880 1100 L 0 1100 Z`).join(';')} {...timing}/>
     </path>
     <path className="hero-satin-edge" d={paths[0]} fill="none" stroke="#FFE9D0" strokeWidth="1.5" strokeOpacity=".35" vectorEffect="non-scaling-stroke">
      <animate attributeName="d" values={paths.join(';')} {...timing}/>
     </path>
    </svg>;
   })}
  </div>
  <div className="hero-noise"/>
 </div>;
}
