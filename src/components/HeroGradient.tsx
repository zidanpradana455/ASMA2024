import {useEffect,useId,useRef} from 'react';
import './HeroGradient.css';

const waves=Array.from({length:16},(_,i)=>{
 const y=24+i*57;
 return {path:`M -80 ${y} C 220 ${y-90} 410 ${y+100} 720 ${y} S 1190 ${y-70} 1520 ${y+5}`,duration:18+i*.4,delay:-i*.65,amplitude:22+i*1.1};
});

export default function HeroGradient(){
 const root=useRef<HTMLDivElement>(null);
 const id=useId().replaceAll(':','');
 useEffect(()=>{
  const layer=root.current,hero=layer?.parentElement;if(!layer||!hero)return;
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  let visible=false;
  const update=()=>{layer.dataset.active=String(visible&&!document.hidden&&!preference.matches)};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update()});observer.observe(hero);
  const title=hero.querySelector<HTMLElement>('.hero-tagline'),stage=hero.querySelector<HTMLElement>('.hero-stage');
  const measure=()=>{
   if(!title||!stage)return;
   // Use layout coordinates, so the existing headline parallax cannot move this mask.
   const top=stage.offsetTop+title.offsetTop;
   layer.style.setProperty('--headline-top',`${Math.max(0,top-16)}px`);
   layer.style.setProperty('--headline-bottom',`${top+title.offsetHeight+64}px`);
   layer.style.setProperty('--rings-top',`${stage.offsetTop+(innerWidth<640?25:30)}px`);
  };
  const size=new ResizeObserver(measure);size.observe(hero);if(title)size.observe(title);if(stage)size.observe(stage);measure();
  preference.addEventListener('change',update);document.addEventListener('visibilitychange',update);
  return()=>{observer.disconnect();size.disconnect();preference.removeEventListener('change',update);document.removeEventListener('visibilitychange',update)};
 },[]);
 return <div ref={root} className="hero-fluid" data-active="false" aria-hidden="true">
  <div className="hero-mesh">{Array.from({length:5},(_,i)=><i className={`hero-blob hero-blob-${i+1}`} key={i}/>)}</div>
  <div className="hero-spotlight"><i/></div>
  <div className="hero-rings">{Array.from({length:5},(_,i)=><i key={i} style={{inset:`${i*5.6}%`,animationDelay:`${-i*1.8}s`}}/>)}</div>
  <div className="hero-flow">
   <svg viewBox="0 0 1440 900" preserveAspectRatio="none" focusable="false">
    <defs>
     <linearGradient id={`${id}-cream`} x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0" stopColor="#FFE9D0" stopOpacity="0"/><stop offset=".23" stopColor="#FFE9D0" stopOpacity=".65"/><stop offset=".5" stopColor="#FFE9D0"/><stop offset=".77" stopColor="#FFE9D0" stopOpacity=".65"/><stop offset="1" stopColor="#FFE9D0" stopOpacity="0"/></linearGradient>
     <linearGradient id={`${id}-white`} x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0" stopColor="white" stopOpacity="0"/><stop offset=".5" stopColor="white"/><stop offset="1" stopColor="white" stopOpacity="0"/></linearGradient>
    </defs>
    {waves.map((wave,i)=><g className="hero-wave" key={i} style={{'--wave-duration':`${wave.duration}s`,'--wave-delay':`${wave.delay}s`,'--wave-amplitude':`${wave.amplitude}px`} as React.CSSProperties}>
     <path d={wave.path} stroke={`url(#${id}-${i%3===0?'white':'cream'})`} opacity={.08+(i%5)*.025} vectorEffect="non-scaling-stroke"/>
     {i%4===2&&<path className="hero-wave-glint" d={wave.path} pathLength="1600" stroke={`url(#${id}-cream)`} opacity=".07" vectorEffect="non-scaling-stroke" style={{animationDelay:`${-i*2}s`}}/>}
    </g>)}
   </svg>
  </div>
  <div className="hero-noise"/>
 </div>;
}
