import {useEffect, useState} from 'react';
import {Link, useParams, useSearchParams} from 'react-router-dom';
import {ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, FileText, Search, Play, X} from 'lucide-react';
import {availableCount, cohorts, materialPages, materialPath, matchesResource, resourceProvider, resourceTypes, type MaterialPage, type Resource} from '../lib/materials';
import {filterStations, stationCount, stationDirectory} from '../lib/stations';
import {StationDirectory} from '../components/StationDirectory';

function SearchField({value, onChange, label}: {value: string; onChange: (value: string) => void; label: string}) {
  return <div className="library-search">
    <Search size={20} aria-hidden="true"/>
    <label className="sr-only" htmlFor="material-search">{label}</label>
    <input id="material-search" type="search" value={value} placeholder={label} onChange={e => onChange(e.target.value)}/>
    {value && <button className="icon-button" onClick={() => onChange('')} aria-label="Hapus pencarian"><X size={17}/></button>}
  </div>;
}

function SourceNote() {
  return <p className="library-source-note">Bahan belajar dari arsip ASMA. Dokumen dan video dibuka di tab baru; akses mengikuti izin pemilik sumber. Jika tautan tidak bisa dibuka, hubungi <a href="mailto:asmafkkmkugm@gmail.com">ASMA</a>.</p>;
}

type Result = {resource: Resource; page: MaterialPage};
function ResourceList({results, context, resetKey}: {results: Result[]; context?: boolean; resetKey: string}) {
  const [limit, setLimit] = useState(30);
  useEffect(() => setLimit(30), [resetKey]);
  return <>
    <ul className="resource-list">
      {results.slice(0, limit).map(({resource, page}) => <li key={`${page.cohort}-${page.phase}-${resource.id}`} className={resource.url ? '' : 'resource-unavailable'}>
        <span className="resource-symbol" aria-hidden="true">{resource.type === 'video' ? <Play size={19}/> : resource.type === 'book' ? <BookOpen size={19}/> : <FileText size={19}/>}</span>
        <div className="resource-copy">
          <div className="resource-meta"><span>{resourceTypes[resource.type]}</span><span>{resourceProvider(resource.url)}</span></div>
          <h3>{resource.url ? <a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.title}<span className="sr-only"> — {resourceTypes[resource.type]}, buka di tab baru</span></a> : resource.title}</h3>
          {context && <Link className="resource-context" to={materialPath(page)}>Kedokteran {page.cohort} · {page.title} <ArrowRight size={13}/></Link>}
          {!resource.url && <p className="resource-missing">Topik tercantum di arsip, tetapi belum memiliki tautan {resourceTypes[resource.type].toLowerCase()}.</p>}
        </div>
        {resource.url && <ArrowUpRight className="resource-arrow" size={21} aria-hidden="true"/>}
      </li>)}
    </ul>
    {results.length > limit && <div className="library-more"><p>{Math.min(limit, results.length)} dari {results.length} hasil ditampilkan</p><button className="button button-outline" onClick={() => setLimit(value => value + 30)}>Tampilkan lebih banyak <ArrowRight size={18}/></button></div>}
  </>;
}

export function MaterialsHome() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const cohort = cohorts.includes(params.get('angkatan') || '') ? params.get('angkatan')! : '2024';
  const pages = materialPages.filter(p => p.cohort === cohort);
  const searching = query.trim().length > 0;
  const results = materialPages.flatMap(page => page.resources.filter(resource => resource.url && matchesResource(resource, query, `${page.cohort} ${page.title}`)).map(resource => ({resource, page})));
  const search = (q: string) => {const next = new URLSearchParams(params); q ? next.set('q', q) : next.delete('q'); setParams(next, {replace: true})};
  return <>
    <header className="library-heading"><div className="container">
      <h1>Materi Ajar</h1>
      <p className="serif">Bekal belajar, dari satu angkatan ke angkatan berikutnya.</p>
      <p className="library-intro">Temukan buku Skills Lab, checklist, bahan tentir, dan video untuk persiapan OSCE.</p>
      <SearchField value={query} onChange={search} label="Cari topik di semua angkatan…"/>
    </div></header>
    <div className="container library-body">
      {searching ? <section aria-label="Hasil pencarian materi">
        <div className="library-result-heading"><h2>Hasil pencarian</h2><p role="status">{results.length} hasil di semua angkatan</p></div>
        {results.length ? <ResourceList results={results} context resetKey={query}/> : <EmptyResults onReset={() => search('')}/>}
      </section> : <>
        <nav className="cohort-picker" aria-label="Angkatan Kedokteran">
          {cohorts.map(year => <Link key={year} to={`/materi?angkatan=${year}`} aria-current={cohort === year ? 'page' : undefined}>Kedokteran {year}</Link>)}
        </nav>
        <div className="library-directory">
          <section className="phase-directory" aria-label={`Fase OSCE Kedokteran ${cohort}`}>
            <div className="library-result-heading"><h2>Kedokteran {cohort}</h2><p>Pilih fase OSCE</p></div>
            <ul className="phase-list">{pages.map(page => {
              const count = availableCount(page);
              const types = Object.entries(resourceTypes).filter(([key]) => page.resources.some(r => r.type === key && r.url)).map(([,label]) => label);
              return <li key={page.phase}><Link to={materialPath(page)}>
                <div><h3>{page.title}</h3><p>{count ? types.join(' · ') : 'Materi belum tersedia di arsip'}</p></div>
                <span className={`phase-status ${count ? '' : 'is-empty'}`}>{count ? `${stationCount(page) ? `${stationCount(page)} stase · ` : ''}${count} tautan` : 'Belum tersedia'}</span><ArrowRight size={22}/>
              </Link></li>;
            })}</ul>
          </section>
          <aside className="library-aside">
            <BookOpen size={28} aria-hidden="true"/>
            <h2>Pilih stase, mulai belajar.</h2>
            <p>Buka fase OSCE, pilih stase, lalu pelajari topiknya lewat checklist, bahan tentir, dan video pendamping.</p>
            <Link className="text-link" to={materialPath(pages[0])}>Buka {pages[0].title} <ArrowUpRight size={18}/></Link>
            <div className="library-aside-divider"/>
            <p>Mencari jadwal tentir atau latihan bersama?</p><Link className="text-link" to="/timeline">Lihat timeline kegiatan <ArrowRight size={18}/></Link>
          </aside>
        </div>
      </>}
      <SourceNote/>
    </div>
  </>;
}

function EmptyResults({onReset}: {onReset: () => void}) {
  return <div className="library-empty"><Search size={30} aria-hidden="true"/><h2>Materi tidak ditemukan</h2><p>Coba kata lain, seperti “jantung”, “antropometri”, atau “EKG”.</p><button className="button button-outline" onClick={onReset}>Reset pencarian dan filter</button></div>;
}

export function MaterialDetail() {
  const {cohort, phase} = useParams();
  const page = materialPages.find(p => p.cohort === cohort && p.phase === phase);
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const rawType = params.get('jenis') || 'all';
  const type = rawType === 'all' || Object.hasOwn(resourceTypes, rawType) ? rawType : 'all';
  const update = (key: string, value: string, replace = false) => {
    const next = new URLSearchParams(params);
    if (value && value !== 'all') next.set(key, value); else next.delete(key);
    setParams(next, {replace});
  };
  if (!page) return <div className="container library-empty"><h1>Materi tidak ditemukan</h1><p>Angkatan atau fase ini tidak ada di arsip.</p><Link className="button button-primary" to="/materi">Kembali ke Materi Ajar</Link></div>;
  const directory = stationDirectory(page);
  const stations = filterStations(directory.stations, query, type);
  const general = directory.general.filter(resource => (type === 'all' || resource.type === type) && matchesResource(resource, query));
  const results = [...stations.flatMap(station => station.topics.flatMap(topic => topic.resources)), ...general];
  const count = availableCount(page);
  const kinds = ['all', ...Object.keys(resourceTypes).filter(kind => page.resources.some(r => r.type === kind))];
  return <>
    <header className="library-heading library-detail-heading"><div className="container">
      <Link className="text-link" to={`/materi?angkatan=${cohort}`}><ArrowLeft size={17}/>Materi Kedokteran {cohort}</Link>
      <h1>{page.title}</h1><p className="serif">Kedokteran {cohort}</p>
      {directory.stations.length > 0 && <p className="station-intro">{stationCount(page) ? `${stationCount(page)} stase, tersusun sesuai arsip. Pilih topik, lalu buka bahan belajarnya.` : 'Bahan belajar dikelompokkan per topik. Arsip fase ini tidak mencantumkan nomor stase.'}</p>}
      <nav className="phase-switch" aria-label="Fase OSCE">{materialPages.filter(p => p.cohort === cohort).map(p => <Link key={p.phase} to={materialPath(p)} aria-current={p.phase === phase ? 'page' : undefined}>{p.title}</Link>)}</nav>
    </div></header>
    <section className="container library-body" aria-label="Daftar materi">
      {page.resources.length ? <>
        <div className="library-tools"><SearchField value={query} onChange={q => update('q', q, true)} label="Cari topik pada fase ini…"/><a className="text-link library-original" href={page.sourceUrl} target="_blank" rel="noopener noreferrer">Arsip sumber <ArrowUpRight size={17}/><span className="sr-only"> (buka di tab baru)</span></a></div>
        <div className="resource-filters" role="group" aria-label="Jenis materi">{kinds.map(kind => <button key={kind} aria-pressed={type === kind} onClick={() => update('jenis', kind)}>{kind === 'all' ? 'Semua' : resourceTypes[kind as keyof typeof resourceTypes]}<span>{page.resources.filter(r => kind === 'all' || r.type === kind).length}</span></button>)}</div>
        <div className="library-result-heading station-result-heading"><p role="status">{stations.length ? `${stations.length} ${stationCount(page) ? 'stase' : 'kelompok topik'} · ` : ''}{results.filter(r => r.url).length} tautan{results.some(r => !r.url) ? ` · ${results.filter(r => !r.url).length} bahan belum tersedia` : ''}</p>
          {stations.length > 1 && <label className="station-jump">Lompat ke stase<select value="" onChange={event => {const target = document.getElementById(event.target.value); target?.focus({preventScroll: true}); target?.scrollIntoView({block: 'start'});}}><option value="" disabled>Pilih stase…</option>{stations.map(station => <option key={station.id} value={station.id}>{station.number}. {station.title}</option>)}</select></label>}
        </div>
        {!count && <p className="library-source-note">Belum ada tautan bahan belajar pada fase ini.</p>}
        {results.length ? <>
          <StationDirectory stations={stations} revealVideos={type === 'video' || Boolean(query.trim())}/>
          {general.length > 0 && <section className="station-general" aria-labelledby="general-materials-title"><h2 id="general-materials-title">Bahan lintas stase</h2><p>Buku dan materi tambahan dari arsip fase ini. Materi gabungan tetap ditampilkan sesuai cakupan sumbernya.</p><ResourceList results={general.map(resource => ({resource, page}))} resetKey={`${cohort}-${phase}-${type}-${query}`}/></section>}
        </> : <EmptyResults onReset={() => setParams({})}/>}
      </> : <div className="library-empty">
        <BookOpen size={34} aria-hidden="true"/><h2>Materinya belum tersedia.</h2><p>Halaman {page.title} untuk Kedokteran {cohort} di situs asal masih berisi kategori tanpa tautan bahan belajar.</p>
        <Link className="button button-primary" to={`/materi?angkatan=${cohort}`}>Lihat fase lainnya <ArrowRight size={18}/></Link>
        <a className="text-link" href={page.sourceUrl} target="_blank" rel="noopener noreferrer">Lihat halaman sumber <ArrowUpRight size={16}/><span className="sr-only"> (buka di tab baru)</span></a>
      </div>}
      <SourceNote/>
    </section>
  </>;
}
