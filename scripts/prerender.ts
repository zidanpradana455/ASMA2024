import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {events,pendingEvents} from '../src/data/events';
import {materialPages,materialPath} from '../src/lib/materials';
const template=readFileSync('dist/index.html','utf8');
const escape=(s:string)=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const routes=[
 {path:'anggota/index.html',title:'Anggota ASMA 2020–2024',description:'Kenalan dengan anggota Asisten Mahasiswa Laboratorium Keterampilan Klinis FK-KMK UGM angkatan 2020–2024.'},
 {path:'materi/index.html',title:'Materi Ajar',description:'Arsip buku Skills Lab, checklist, bahan tentir, studi kasus, dan video OSCE Kedokteran 2020–2024.'},
 ...materialPages.map(p=>({path:`${materialPath(p).slice(1)}/index.html`,title:`${p.title} · Kedokteran ${p.cohort}`,description:`Bahan belajar ${p.title} untuk Kedokteran ${p.cohort}: buku, checklist, PPT tentir, studi kasus, dan video dari arsip ASMA.`})),
 {path:'timeline/index.html',title:'Timeline Kegiatan',description:'Kalender kegiatan tentir, TFSS, Run OSCE, dan latihan mandiri bersama ASMA 2024.'},
 ...[...events,...pendingEvents].map(e=>({path:`kegiatan/${e.slug}/index.html`,title:e.title,description:e.description})),
 {path:'404.html',title:'Halaman tidak ditemukan',description:'Kembali ke Beranda ASMA 2024 FK-KMK UGM.'}
];
for(const r of routes){const file=join('dist',r.path);mkdirSync(dirname(file),{recursive:true});writeFileSync(file,template.replace(/<title>.*?<\/title>/,`<title>${escape(r.title)} — ASMA 2024 FK-KMK UGM</title>`).replace(/<meta name="description" content="[^"]*"\s*\/?\s*>/,`<meta name="description" content="${escape(r.description)}"/>`))}
console.log(`Created ${routes.length} static route entries with individual metadata.`);
