import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

export default function PageMotion(){
 const {pathname}=useLocation();
 useEffect(()=>{
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  if(preference.matches)return;
  const animations:Animation[]=[];
  const animate=(element:Element,frames:Keyframe[],duration:number,delay=0)=>{
   animations.push(element.animate(frames,{duration,delay,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'}));
  };
  const portrait=document.querySelector('.hero-stage picture');
  if(portrait)animate(portrait,[{clipPath:'inset(3% 0 0)',transform:'translateY(14px)',opacity:.65},{clipPath:'inset(0)',transform:'translateY(0)',opacity:1}],850);
  const heading=document.querySelector('.page-heading');
  if(heading)animate(heading,[{opacity:.6,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],400);
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries){if(!entry.isIntersecting)continue;observer.unobserve(entry.target);
    if(entry.target.matches('.event-grid')){
     entry.target.querySelectorAll('.event-card').forEach((card,i)=>animate(card,[{opacity:.55,transform:'translateY(16px)'},{opacity:1,transform:'translateY(0)'}],550,Math.min(i*70,140)));
    }else{
     const line=entry.target.querySelector('.clear-line');
     if(line)animate(line,[{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0)'}],650);
    }
   }
  },{threshold:.15});
  document.querySelectorAll('.section-top,.event-grid').forEach(el=>observer.observe(el));
  const stop=()=>{if(preference.matches){observer.disconnect();animations.forEach(a=>a.cancel())}};
  preference.addEventListener('change',stop);
  return()=>{observer.disconnect();animations.forEach(a=>a.cancel());preference.removeEventListener('change',stop)};
 },[pathname]);
 return null;
}
