import {useEffect,useRef} from 'react';
import './HeroGradient.css';

export default function HeroGradient(){
 const layer=useRef<HTMLDivElement>(null);
 const video=useRef<HTMLVideoElement>(null);
 useEffect(()=>{
  const player=video.current;
  const hero=layer.current?.parentElement;
  if(!player||!hero)return;
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible=false;
  const update=()=>{
   const active=visible&&!document.hidden&&!reducedMotion.matches;
   hero.dataset.heroMotion=reducedMotion.matches?'reduced':active?'running':'paused';
   if(active){
    if(!player.hasAttribute('src'))player.src='/assets/hero-background.mp4';
    void player.play().catch(()=>{/* The poster remains visible when autoplay is unavailable. */});
   }else player.pause();
  };
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update()});
  observer.observe(hero);
  document.addEventListener('visibilitychange',update);
  reducedMotion.addEventListener('change',update);
  return()=>{observer.disconnect();document.removeEventListener('visibilitychange',update);reducedMotion.removeEventListener('change',update);player.pause();delete hero.dataset.heroMotion};
 },[]);
 return <div ref={layer} className="hero-fluid" aria-hidden="true"><video ref={video} muted loop playsInline preload="none" poster="/assets/hero-background-poster.webp" disablePictureInPicture tabIndex={-1}/></div>;
}
