import data from '../data/materials.json';

export const cohorts = ['2024', '2023', '2022', '2021', '2020'];
export const resourceTypes = {
  book: 'Buku', checklist: 'Checklist', slides: 'PPT Tentir', case: 'Studi Kasus', video: 'Video',
} as const;
export type ResourceType = keyof typeof resourceTypes;
export type Resource = {id: string; title: string; type: ResourceType; url: string};
export type MaterialPage = {cohort: string; phase: string; title: string; sourceUrl: string; resources: Resource[]};
export const materialPages = data as MaterialPage[];
export const materialPath = (page: Pick<MaterialPage, 'cohort' | 'phase'>) => `/materi/${page.cohort}/${page.phase}`;
export const availableCount = (page: MaterialPage) => page.resources.filter(r => r.url).length;
export const normalize = (value: string) => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
export function matchesResource(resource: Resource, query: string, context = '') {
  const text = normalize(`${resource.title} ${resourceTypes[resource.type]} ${context}`);
  return normalize(query).split(' ').filter(Boolean).every(word => text.includes(word));
}
export function resourceProvider(url: string) {
  if (!url) return 'Tautan belum tersedia';
  const host = new URL(url).hostname;
  if (host === 'www.youtube.com') return 'YouTube';
  if (host === 'docs.google.com') return 'Google Slides';
  if (host.endsWith('.sharepoint.com')) return 'SharePoint';
  return 'Google Drive';
}
export function materialRouteTitle(pathname: string) {
  if (pathname === '/materi' || pathname === '/materi/') return 'Materi Ajar';
  const page = materialPages.find(p => materialPath(p) === pathname.replace(/\/$/, ''));
  return page ? `${page.title} · Kedokteran ${page.cohort}` : 'Halaman tidak ditemukan';
}
