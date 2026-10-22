import index from '../data/material-stations.json';
import {matchesResource, type MaterialPage, type Resource} from './materials';

type StationDefinition = {id: string; number: number | null; title: string; image: string; topics: {title: string; resourceIds: string[]}[]};
export type Station = Omit<StationDefinition, 'topics'> & {topics: {title: string; resources: Resource[]}[]};

// Curated against the numbered source sections. Resource IDs keep the original URLs intact.
export function stationDirectory(page: MaterialPage) {
  const entry = index.find(item => item.cohort === page.cohort && item.phase === page.phase);
  const resources = new Map(page.resources.map(resource => [resource.id, resource]));
  const resolve = (ids: string[]) => ids.map(id => resources.get(id)).filter((r): r is Resource => Boolean(r));
  return {
    stations: (entry?.stations || []).map(station => ({...station, topics: station.topics.map(topic => ({title: topic.title, resources: resolve(topic.resourceIds)}))})) as Station[],
    general: resolve(entry?.generalResourceIds || []),
  };
}

export function filterStations(stations: Station[], query: string, type: string) {
  return stations.map(station => ({...station, topics: station.topics.map(topic => ({...topic,
    resources: topic.resources.filter(resource => (type === 'all' || resource.type === type) && matchesResource(resource, query, `${station.title} ${station.number ? `stase ${station.number}` : ''} ${topic.title}`)),
  })).filter(topic => topic.resources.length)})).filter(station => station.topics.length);
}

export function stationCount(page: MaterialPage) {
  return stationDirectory(page).stations.filter(station => station.number !== null).length;
}
