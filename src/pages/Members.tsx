import {Link, useSearchParams} from 'react-router-dom';
import {Search} from 'lucide-react';
import currentMembers from '../data/members.json';
import legacyMembers from '../data/legacy-members.json';
import {cohorts, normalize} from '../lib/materials';

export default function Members() {
  const [params, setParams] = useSearchParams();
  const year = cohorts.includes(params.get('angkatan') || '') ? params.get('angkatan')! : '2024';
  const query = params.get('q') || '';
  const members = year === '2024' ? currentMembers : legacyMembers.filter(m => m.cohort === year);
  const filtered = members.filter(m => normalize(`${m.name} ${m.fullName}`).includes(normalize(query)));
  const setQuery = (value: string) => {const next = new URLSearchParams(params); value ? next.set('q', value) : next.delete('q'); setParams(next, {replace: true})};
  return <>
    <header className="page-heading"><div className={year === '2024' ? 'page-heading-art' : 'archive-heading-art'} aria-hidden="true"/><div className="container">
      <h1>Anggota</h1><p className="serif">Asisten Mahasiswa {year}</p>
      <div className="clear-line" aria-hidden="true"><i/><span/><i/></div>
      <p className="page-summary">Kenali orang-orang di balik pendampingan keterampilan klinis.</p>
    </div></header>
    <section className="container members-section">
      <nav className="cohort-picker" aria-label="Angkatan anggota ASMA">{cohorts.map(cohort => <Link key={cohort} to={`/anggota?angkatan=${cohort}`} aria-current={cohort === year ? 'page' : undefined}>ASMA {cohort}</Link>)}</nav>
      <div className="members-toolbar">
        <p role="status"><strong>{filtered.length}</strong> dari {members.length} anggota ASMA {year}</p>
        <label className="search-field"><Search size={19}/><span className="sr-only">Cari nama anggota ASMA {year}</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Cari nama anggota…" type="search"/></label>
      </div>
      {filtered.length ? <div className="member-grid">{filtered.map((member, index) => <article key={`${year}-${member.id}`} className={`member-card ${year !== '2024' ? 'archive-member' : ''}`} style={{'--delay':`${Math.min(index, 5) * 40}ms`} as React.CSSProperties}>
        <div className="member-photo"><img src={member.image} alt={`Potret ${member.fullName}, Asisten Mahasiswa ${year}`} loading="lazy" width={800} height={year === '2024' ? 1067 : 800}/></div>
        <div className="member-info"><span className="member-number">{String(member.id).padStart(2, '0')}</span><div><h3>{member.name}</h3><p>{year === '2024' ? member.fullName : `ASMA ${year}`}</p></div></div>
      </article>)}</div> : <div className="empty-state"><Search size={30}/><h2>Tidak ditemukan</h2><p>Coba nama lain atau pilih angkatan yang berbeda.</p><button className="button button-outline" onClick={() => setQuery('')}>Tampilkan semua anggota</button></div>}
      {year !== '2024' && <p className="member-archive-note">Nama dan foto mengikuti <a href={`https://sites.google.com/view/asmafkkmkugm/asma/asma-${year}`} target="_blank" rel="noopener noreferrer">arsip ASMA {year}<span className="sr-only"> (buka di tab baru)</span></a>. Singkatan nama dipertahankan sesuai sumber.</p>}
    </section>
  </>;
}
