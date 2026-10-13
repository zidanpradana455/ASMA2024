import {useEffect,useRef,useState} from 'react';
import members from '../data/members.json';

const step=360/members.length;

export default function MemberRing(){
 const root=useRef<HTMLDivElement>(null),track=useRef<HTMLDivElement>(null);
 const angle=useRef(0),boost=useRef(0),drag=useRef<{id:number;x:number}|null>(null);
 const visible=useRef(false),focused=useRef(false),pausedRef=useRef(false);
 const [paused,setPaused]=useState(false);
 const [reduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
 const paint=()=>{if(track.current)track.current.style.setProperty('--rotation',`${angle.current}deg`)};
 useEffect(()=>{pausedRef.current=paused},[paused]);
 useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(mq.matches);mq.addEventListener('change',update);return()=>mq.removeEventListener('change',update)},[]);
 useEffect(()=>{
  if(reduced||paused)return;
  let frame=0,last=0,lastScroll=scrollY;
  const wake=()=>{last=0;if(visible.current&&!document.hidden&&!frame)frame=requestAnimationFrame(tick)};
  const observer=new IntersectionObserver(([entry])=>{visible.current=entry.isIntersecting;if(visible.current)wake();else{cancelAnimationFrame(frame);frame=0;last=0}},{threshold:.1});
  if(root.current)observer.observe(root.current);
  const scroll=()=>{const distance=Math.abs(scrollY-lastScroll);lastScroll=scrollY;if(visible.current)boost.current=Math.min(38,boost.current+distance*.035)};
  const tick=(time:number)=>{
   frame=0;if(!visible.current||document.hidden){last=0;return}
   const dt=last?Math.min((time-last)/1000,.05):0;last=time;
   if(visible.current&&!document.hidden&&!pausedRef.current&&!focused.current&&!drag.current){angle.current=(angle.current-(5+boost.current)*dt)%360;paint()}
   boost.current*=Math.exp(-dt*2.2);
   frame=requestAnimationFrame(tick);
  };
  addEventListener('scroll',scroll,{passive:true});document.addEventListener('visibilitychange',wake);
  return()=>{observer.disconnect();removeEventListener('scroll',scroll);document.removeEventListener('visibilitychange',wake);cancelAnimationFrame(frame)};
 },[reduced,paused]);
 const move=(direction:number)=>{angle.current+=direction*step;boost.current=0;paint()};
 const endDrag=(e:React.PointerEvent<HTMLDivElement>)=>{if(drag.current?.id!==e.pointerId)return;drag.current=null;e.currentTarget.removeAttribute('data-dragging');if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId)};
 return <div className={`member-ring ${reduced?'ring-static':''}`} ref={root} role="region" aria-label="Perkenalan 21 anggota ASMA" onFocusCapture={e=>{focused.current=e.target.matches(':focus-visible')}} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node|null))focused.current=false}}>
  <div className="ring-stage" tabIndex={0} onKeyDown={e=>{if(reduced)return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move(e.key==='ArrowLeft'?1:-1)}if(e.key===' '){e.preventDefault();setPaused(p=>!p)}}} role="group" aria-label={reduced?'Daftar anggota, geser kiri atau kanan':'Ring anggota yang bisa diputar'} aria-describedby="ring-instructions" onPointerDown={e=>{if(reduced||e.button!==0)return;drag.current={id:e.pointerId,x:e.clientX};e.currentTarget.setPointerCapture(e.pointerId);e.currentTarget.setAttribute('data-dragging','true')}} onPointerMove={e=>{if(drag.current?.id!==e.pointerId)return;angle.current+=(e.clientX-drag.current.x)*.22;drag.current.x=e.clientX;boost.current=0;paint()}} onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={e=>{if(drag.current?.id===e.pointerId){drag.current=null;e.currentTarget.removeAttribute('data-dragging')}}}>
   <div className="ring-track" ref={track} role="list">
    {members.map((member,i)=><article className="ring-member" role="listitem" key={member.id} style={{'--member-angle':`${i*step}deg`} as React.CSSProperties}>
     <img src={member.image} alt={`Potret ${member.name}`} width="800" height="1067" loading="lazy" draggable={false}/>
     <div className="ring-member-caption"><span>{String(member.id).padStart(2,'0')}</span><h3>{member.name}</h3><p>{member.fullName}</p></div>
    </article>)}
   </div>
  </div>
  <p id="ring-instructions" className="sr-only">Seret untuk memutar anggota. Keyboard: panah kiri atau kanan untuk berpindah; spasi untuk menjeda atau melanjutkan putaran.</p>
 </div>;
}
