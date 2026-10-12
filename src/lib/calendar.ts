import type {Event} from '../data/events';
export const DAY=86400000;
export const parseDate=(s:string)=>new Date(s+'T00:00:00Z');
export const iso=(d:Date)=>d.toISOString().slice(0,10);
export const addDays=(s:string,n:number)=>iso(new Date(+parseDate(s)+n*DAY));
export const monthOf=(s:string)=>s.slice(0,7);
export function shiftMonth(m:string,n:number){const [y,v]=m.split('-').map(Number); return iso(new Date(Date.UTC(y,v-1+n,1))).slice(0,7)}
export const monthEnd=(m:string)=>addDays(shiftMonth(m,1)+'-01',-1);
export function today(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Jakarta',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}
export function labelDate(d:string,opts:Intl.DateTimeFormatOptions={day:'numeric',month:'long',year:'numeric'}){return new Intl.DateTimeFormat('id-ID',{...opts,timeZone:'UTC'}).format(parseDate(d))}
export const labelMonth=(m:string)=>labelDate(m+'-01',{month:'long',year:'numeric'});
export function dateRange(e:Pick<Event,'startDate'|'endDate'>){
 if(e.startDate===e.endDate)return labelDate(e.startDate);
 if(monthOf(e.startDate)===monthOf(e.endDate)) return `${Number(e.startDate.slice(-2))}–${labelDate(e.endDate)}`;
 return `${labelDate(e.startDate)} – ${labelDate(e.endDate)}`;
}
export const onDay=(events:Event[],d:string)=>events.filter(e=>e.startDate<=d&&e.endDate>=d);
export const inMonth=(events:Event[],m:string)=>events.filter(e=>e.startDate<=monthEnd(m)&&e.endDate>=m+'-01');
export function monthsFor(events:Event[]){
 if(!events.length)return [];
 const first=events.map(e=>monthOf(e.startDate)).sort()[0],last=events.map(e=>monthOf(e.endDate)).sort().at(-1)!;
 const months=[];for(let m=first;m<=last;m=shiftMonth(m,1))months.push(m);return months;
}
export function initialMonth(events:Event[],now=today()){
 const months=monthsFor(events), m=monthOf(now);
 if(inMonth(events,m).length)return m;
 return months.find(x=>x>m&&inMonth(events,x).length)??[...months].reverse().find(x=>inMonth(events,x).length)??m;
}
export function selectedMonth(events:Event[],query:string|null,now=today()){
 return query&&/^\d{4}-(0[1-9]|1[0-2])$/.test(query)&&monthsFor(events).includes(query)?query:initialMonth(events,now);
}
export interface Segment {event:Event;start:number;end:number;lane:number;continuesBefore:boolean;continuesAfter:boolean}
export function calendarWeeks(events:Event[],month:string){
 const start=month+'-01',last=monthEnd(month),offset=(parseDate(start).getUTCDay()+6)%7,first=addDays(start,-offset);
 const count=Math.ceil((Number(last.slice(-2))+offset)/7),weeks=[];
 for(let w=0;w<count;w++){
  const days=Array.from({length:7},(_,d)=>addDays(first,w*7+d));
  const lo=days[0]<start?start:days[0],hi=days[6]>last?last:days[6];
  const candidates=events.filter(e=>e.startDate<=hi&&e.endDate>=lo).sort((a,b)=>a.startDate.localeCompare(b.startDate)||b.endDate.localeCompare(a.endDate)||a.id.localeCompare(b.id));
  const occupied:number[]=[];const segments:Segment[]=[];
  for(const event of candidates){
   const s=event.startDate>lo?event.startDate:lo,e=event.endDate<hi?event.endDate:hi;
   const startIndex=Math.round((+parseDate(s)-+parseDate(days[0]))/DAY),endIndex=Math.round((+parseDate(e)-+parseDate(days[0]))/DAY);
   let lane=occupied.findIndex(end=>end<startIndex);if(lane<0)lane=occupied.length;occupied[lane]=endIndex;
   segments.push({event,start:startIndex,end:endIndex,lane,continuesBefore:event.startDate<s,continuesAfter:event.endDate>e});
  }
  weeks.push({days,segments,hidden:days.map((_,i)=>segments.filter(s=>s.lane>=3&&s.start<=i&&s.end>=i).length)});
 }
 return weeks;
}
export function teaserEvents(events:Event[],now=today()){
 const sorted=[...events].sort((a,b)=>a.startDate.localeCompare(b.startDate));
 const future=sorted.filter(e=>e.endDate>=now);return future.length?future.slice(0,3):sorted.slice(-3).reverse();
}
