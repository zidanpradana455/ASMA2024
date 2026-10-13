import {useEffect,useRef,useState} from 'react';

export default function HeroGradient(){
 const layer=useRef<HTMLDivElement>(null);
 const [active,setActive]=useState(false);
 useEffect(()=>{
  let visible=false;
  const update=()=>setActive(visible&&!document.hidden);
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update()});
  if(layer.current?.parentElement)observer.observe(layer.current.parentElement);
  document.addEventListener('visibilitychange',update);
  return()=>{observer.disconnect();document.removeEventListener('visibilitychange',update)};
 },[]);
 return <div ref={layer} className="hero-fluid" data-active={active} aria-hidden="true"><span/><span/></div>;
}
