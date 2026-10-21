import {Link} from 'react-router-dom';
import {ArrowRight, ArrowUpRight} from 'lucide-react';

export default function MaterialsTeaser() {
  return <section className="container home-library" aria-labelledby="home-library-title">
    <div><h2 id="home-library-title">Belajar bersama ASMA.</h2>
      <p className="serif">Exercitatio Optimus Est Magister</p>
      <p>Asisten Mahasiswa Laboratorium Keterampilan Klinis FK-KMK UGM mendampingi mahasiswa dalam belajar dan berlatih. Jelajahi arsip buku Skills Lab, checklist, bahan tentir, dan video untuk persiapan OSCE.</p>
      <Link className="button button-primary" to="/materi">Jelajahi Materi Ajar <ArrowUpRight size={18}/></Link>
    </div>
    <div className="home-library-links">
      <Link to="/materi/2024/fase-1?jenis=checklist">Checklist OSCE Fase I · 2024 <ArrowRight size={19}/></Link>
      <Link to="/materi/2024/fase-1?jenis=slides">Bahan tentir · 2024 <ArrowRight size={19}/></Link>
      <Link to="/materi/2024/fase-1?jenis=video">Video keterampilan klinis <ArrowRight size={19}/></Link>
      <Link to="/anggota?angkatan=2023">Kenali ASMA angkatan sebelumnya <ArrowRight size={19}/></Link>
    </div>
  </section>;
}
