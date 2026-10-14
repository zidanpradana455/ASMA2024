import {useEffect,useRef,type CSSProperties} from 'react';
import './HeroGradient.css';

type Bubble={id:number;size:number;kind:string;side:'left'|'right';x:number;top:number;tint:string;duration:number;delay:number;drift:[number,number];depth:number;mobile:boolean;front?:boolean};
// One source of truth: all nine bubbles are rendered, including the two foreground accents.
const bubbles:Bubble[]=[
 {id:1,size:340,kind:'xl',side:'left',x:-4,top:52,tint:'255 180 120',duration:18,delay:-4.2,drift:[-28,-55],depth:8,mobile:true},
 {id:2,size:260,kind:'l',side:'right',x:-3,top:12,tint:'208 16 48',duration:16,delay:-7.6,drift:[25,50],depth:8,mobile:true},
 {id:3,size:220,kind:'l',side:'left',x:6,top:6,tint:'160 18 74',duration:15,delay:-2.8,drift:[-24,45],depth:8,mobile:false},
 {id:4,size:150,kind:'m',side:'right',x:5,top:58,tint:'255 122 26',duration:12,delay:-5.4,drift:[30,-55],depth:14,mobile:true},
 {id:5,size:120,kind:'m',side:'left',x:14,top:78,tint:'208 16 48',duration:11,delay:-8.1,drift:[-22,-70],depth:14,mobile:false},
 {id:6,size:90,kind:'s',side:'right',x:22,top:14,tint:'160 18 74',duration:10,delay:-3.6,drift:[20,-40],depth:25,mobile:true},
 {id:7,size:70,kind:'s',side:'left',x:24,top:18,tint:'255 122 26',duration:9,delay:-6.4,drift:[-18,35],depth:25,mobile:true},
 {id:8,size:56,kind:'xs',side:'left',x:9,top:62,tint:'208 16 48',duration:8,delay:-1.8,drift:[-18,40],depth:25,mobile:false,front:true},
 {id:9,size:48,kind:'xs',side:'right',x:9,top:36,tint:'255 180 120',duration:8,delay:-4.9,drift:[20,35],depth:25,mobile:false,front:true},
];
const orbs=[
 {size:420,left:'-5%',top:'45%',color:'#FF7A1A',end:'#D01030',duration:28},
 {size:340,left:'79%',top:'7%',color:'#D01030',end:'#A0124A',duration:26},
 {size:300,left:'2%',top:'1%',color:'#D01030',end:'#FF7A1A',duration:30},
 {size:260,left:'78%',top:'55%',color:'#A0124A',end:'#7A0A2E',duration:24},
 {size:220,left:'12%',top:'72%',color:'#D01030',end:'#7A0A2E',duration:22},
];

function BubbleGlass({bubble}:{bubble:Bubble}){
 const style={
  [bubble.side]:`${bubble.x}%`,top:`${bubble.top}%`,
  '--bubble-size':`clamp(${bubble.size*.72}px,${bubble.size/14.4}vw,${bubble.size}px)`,
  '--bubble-mobile-size':`${bubble.size*.6}px`,'--bubble-tint':bubble.tint,
  '--float-duration':`${bubble.duration}s`,'--float-delay':`${bubble.delay}s`,
  '--drift-x':`${bubble.drift[0]}px`,'--drift-y':`${bubble.drift[1]}px`,
  '--enter-delay':`${(bubble.id-1)*.12}s`,'--breath-duration':`${6+(9-bubble.id)*.5}s`,
 } as CSSProperties;
 return <div className={`glass-bubble-anchor glass-bubble-${bubble.kind}`} data-bubble={bubble.id} data-mobile={bubble.mobile} style={style}>
  <div className="glass-bubble-parallax"><div className="glass-bubble-enter"><div className="glass-bubble-float"><div className="glass-bubble"/></div></div></div>
 </div>;
}

export default function HeroGradient(){
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const layer=root.current,hero=layer?.parentElement;if(!layer||!hero)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(min-width: 640px) and (hover: hover) and (pointer: fine)');
  const anchors=[...hero.querySelectorAll<HTMLElement>('.glass-bubble-anchor')];
  const nodes=anchors.map(anchor=>({anchor,bubble:bubbles.find(b=>b.id===Number(anchor.dataset.bubble))!,parallax:anchor.querySelector<HTMLElement>('.glass-bubble-parallax')!}));
  let visible=false,active=false,frame=0,last=0,x=0,y=0,targetX=0,targetY=0;
  const paint=()=>nodes.forEach(({bubble,parallax})=>{parallax.style.transform=`translate3d(${x*bubble.depth}px,${y*bubble.depth}px,0)`});
  const tick=(now:number)=>{
   frame=0;const blend=1-Math.exp(-Math.min(last?now-last:16,50)/110);last=now;
   x+=(targetX-x)*blend;y+=(targetY-y)*blend;paint();
   if(Math.abs(x-targetX)+Math.abs(y-targetY)>.001&&active&&fine.matches)frame=requestAnimationFrame(tick);else last=0;
  };
  const wake=()=>{if(!frame&&active&&fine.matches&&!reduced.matches)frame=requestAnimationFrame(tick)};
  const reset=()=>{cancelAnimationFrame(frame);frame=0;last=0;x=y=targetX=targetY=0;paint()};
  const update=()=>{active=visible&&!document.hidden&&!reduced.matches;hero.dataset.heroMotion=reduced.matches?'reduced':active?'running':'paused';if(!active||!fine.matches)reset()};
  const move=(event:PointerEvent)=>{if(!active||!fine.matches||event.pointerType==='touch')return;const rect=hero.getBoundingClientRect();targetX=Math.max(-1,Math.min(1,(event.clientX-rect.left)/rect.width*2-1));targetY=Math.max(-1,Math.min(1,(event.clientY-rect.top)/rect.height*2-1));wake()};
  const leave=()=>{targetX=targetY=0;wake()};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update()});observer.observe(hero);
  const title=hero.querySelector<HTMLElement>('.hero-tagline'),stage=hero.querySelector<HTMLElement>('.hero-stage'),photo=hero.querySelector<HTMLElement>('.hero-photo');
  const measure=()=>{
   if(!title||!stage||!photo)return;
   const rect=hero.getBoundingClientRect(),picture=photo.getBoundingClientRect();
   const lines=[...title.querySelectorAll<HTMLElement>('.hero-tagline-line')].map(line=>line.getBoundingClientRect());
   const text={left:Math.min(...lines.map(line=>line.left))-rect.left,right:Math.max(...lines.map(line=>line.right))-rect.left,top:stage.offsetTop+title.offsetTop-12,bottom:stage.offsetTop+title.offsetTop+title.offsetHeight+(innerWidth>=1024?60:8)};
   layer.style.setProperty('--orb-clear-top',`${text.top}px`);layer.style.setProperty('--orb-clear-bottom',`${text.bottom}px`);
   // A conservative band covers every row of faces, including the outermost members.
   const faces={left:picture.left-rect.left+picture.width*.10,right:picture.right-rect.left-picture.width*.08,top:picture.top-rect.top,bottom:picture.top-rect.top+picture.height*.74};
   for(const {anchor,bubble} of nodes){
    if(!anchor.offsetWidth)continue;
    const size=anchor.offsetWidth,depth=fine.matches?bubble.depth:0;
    const extra={left:Math.min(0,bubble.drift[0])-depth-size*.02,right:Math.max(0,bubble.drift[0])+depth+size*.02,top:Math.min(0,bubble.drift[1])-depth-size*.02,bottom:Math.max(0,bubble.drift[1])+depth+size*.02};
    let bx=anchor.offsetLeft,by=anchor.offsetTop;
    const overlaps=(r:typeof text)=>bx+extra.left<r.right&&bx+size+extra.right>r.left&&by+extra.top<r.bottom&&by+size+extra.bottom>r.top;
    if(overlaps(text)){
     const sideX=bubble.side==='left'?text.left-size-extra.right-8:text.right-extra.left+8;
     const visibleWidth=Math.max(0,Math.min(hero.clientWidth,sideX+size)-Math.max(0,sideX));
     if(size>=150&&visibleWidth>=size*.35)bx=sideX;
     else{
      const above=text.top-size-extra.bottom-8;
      // Mobile has a full-width portrait; keep rear lenses in the open space above it.
      by=(by<text.top||innerWidth<640)&&above+size>size*.5?above:text.bottom-extra.top+8;
     }
    }
    if(bubble.front&&overlaps(faces))bx=bubble.side==='left'?faces.left-size-extra.right-8:faces.right-extra.left+8;
    anchor.style.setProperty('--safe-x',`${bx-anchor.offsetLeft}px`);anchor.style.setProperty('--safe-y',`${by-anchor.offsetTop}px`);
   }
  };
  const size=new ResizeObserver(measure);size.observe(hero);if(title)size.observe(title);if(photo)size.observe(photo);measure();update();
  const preferences=()=>{update();measure()};
  reduced.addEventListener('change',preferences);fine.addEventListener('change',preferences);document.addEventListener('visibilitychange',update);hero.addEventListener('pointermove',move);hero.addEventListener('pointerleave',leave);
  return()=>{reset();observer.disconnect();size.disconnect();reduced.removeEventListener('change',preferences);fine.removeEventListener('change',preferences);document.removeEventListener('visibilitychange',update);hero.removeEventListener('pointermove',move);hero.removeEventListener('pointerleave',leave);delete hero.dataset.heroMotion};
 },[]);
 return <>
  <div ref={root} className="hero-fluid" aria-hidden="true"><div className="hero-color-orbs">{orbs.map((orb,i)=><i className="hero-color-orb" key={i} style={{left:orb.left,top:orb.top,'--orb-size':`${orb.size}px`,'--orb-color':orb.color,'--orb-end':orb.end,animationDuration:`${orb.duration}s`,animationDelay:`${-i*4.3}s`} as CSSProperties}/>)}</div></div>
  {[false,true].map(front=><div className={`hero-bubble-plane ${front?'hero-bubble-front':'hero-bubble-back'}`} aria-hidden="true" key={String(front)}>{bubbles.filter(bubble=>Boolean(bubble.front)===front).map(bubble=><BubbleGlass bubble={bubble} key={bubble.id}/>)}</div>)}
 </>;
}
