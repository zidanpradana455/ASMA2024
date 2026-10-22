import {ArrowUpRight, ChevronDown, Play} from 'lucide-react';
import {resourceTypes, type Resource} from '../lib/materials';
import {type Station} from '../lib/stations';

function MaterialLink({resource, title}: {resource: Resource; title: string}) {
  const label = resource.type === 'slides' ? 'PPT' : resourceTypes[resource.type];
  return resource.url
    ? <a href={resource.url} target="_blank" rel="noopener noreferrer" aria-label={`${title} — ${label}, buka di tab baru`}>{label}<ArrowUpRight size={12} aria-hidden="true"/></a>
    : <span className="station-missing" title={`${label} belum memiliki tautan di arsip`}>{label} belum tersedia</span>;
}

export function StationDirectory({stations, revealVideos}: {stations: Station[]; revealVideos: boolean}) {
  return <div className="station-grid">{stations.map(station => <article className="station" id={station.id} key={station.id} aria-labelledby={`${station.id}-title`} tabIndex={-1}>
    <div className="station-art">
      <img src={`/images/stations/${station.image}.webp`} width={320} height={320} loading="lazy" alt=""/>
      {station.number !== null && <span aria-hidden="true">{String(station.number).padStart(2, '0')}</span>}
    </div>
    <div className="station-content">
      <h2 id={`${station.id}-title`}>{station.number !== null && <span className="sr-only">Stase {station.number}: </span>}{station.title}</h2>
      <ul className="station-topics">{station.topics.map(topic => {
        const documents = topic.resources.filter(r => r.type !== 'video');
        const videos = topic.resources.filter(r => r.type === 'video');
        return <li key={topic.title}>
          <h3>{topic.title}</h3>
          {documents.length > 0 && <div className="station-material-links">{documents.map(resource => <MaterialLink key={resource.id} resource={resource} title={topic.title}/>)}</div>}
          {videos.length > 0 && <details className="station-videos" open={revealVideos} key={String(revealVideos)}>
            <summary><Play size={12} aria-hidden="true"/>Video{videos.length > 1 ? ` (${videos.length})` : ''}<ChevronDown size={13} aria-hidden="true"/></summary>
            <ul>{videos.map(resource => <li key={resource.id}><a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.title}<ArrowUpRight size={12} aria-hidden="true"/><span className="sr-only"> — buka video di tab baru</span></a></li>)}</ul>
          </details>}
        </li>;
      })}</ul>
    </div>
  </article>)}</div>;
}
