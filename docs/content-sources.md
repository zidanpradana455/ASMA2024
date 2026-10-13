# Sumber konten ASMA 2024

Audit dilakukan 12 Oktober 2026. Dokumen asli tidak diubah. File pendukung dengan nomor telepon, email, daftar peserta, dan hasil remediasi tidak disertakan dalam website.

## Identitas dan aset

- Visual Guidelines ASMA 2024.pdf: halaman 2 logo specific use 2024, halaman 3 font, halaman 4 warna, halaman 5 empat elemen, halaman 6 contoh tagline/gradient. PDF berupa gambar dan diperiksa melalui hasil render.
- Hero: All ASMA No BG.png, 4215 × 1978 px, memiliki transparansi. Area transparan luar dipangkas dan dibuat WebP desktop/mobile.
- Logo hitam/putih: Logo + Title + FKKMK 2024 (Hitam/Putih).png.
- Anggota: tepat 21 file NN-Nama-01.png. Kode 02–04 tidak digunakan. Foto asli berupa poster rasio 3:4, tampil dalam bingkai 4:5 dengan crop terpusat.
- Nama panggilan berasal dari file. Nama lengkap dicocokkan dengan tabel Pembagian Asisten Tentir OSCE Fase 1 Angkatan 2025 dalam Mekanisme Tentir & Daftar Asisten OSCE Fase I Angkatan 2025.docx; nama Alphatar lengkap juga ada pada jadwal TFSS/Latman. Singkatan K. untuk Dhita dipertahankan sesuai sumber.

## Kegiatan bertanggal

| ID data | Sumber DOCX | Sumber XLSX / sel | Keputusan |
|---|---|---|---|
| tentir25 | Mekanisme Tentir & Daftar Asisten OSCE Fase I Angkatan 2025, paragraf pembukaan | — | 12–21 Oktober 2026 |
| tfss25 | Mekanisme TFSS OSCE Fase I Angkatan 2025, paragraf pembukaan | Jadwal TFSS OSCE 1 Angkatan 2025, Jadwal TFSS C3/C16/C29/C34/C39 | 24–28 Oktober 2026 |
| tfss26 | Mekanisme TFSS OSCE SMT 1 Angkatan 2026, paragraf pembukaan | Jadwal TFSS OSCE SMT 1_Angkatan 2026, Sheet1 B4 | 31 Oktober 2026 |
| run25 | Mekanisme Run OSCE Fase I Angkatan 2025, paragraf pembukaan | Jadwal Run OSCE 1 Angkatan 2025, Jadwal RUN OSCE B3/I3/P3/W3/AD3 | 14–18 November 2026, REG 14–15 dan IUP 16–18 |
| tentir26 | Mekanisme Tentir & Daftar Asisten Mini OSCE 1 Angkatan 2026, paragraf pembukaan | — | 14–19 November 2026 |
| latman24 | Mekanisme Latihan Mandiri Mini Osce Angkatan 2024, paragraf pembukaan | Jadwal Latihan Mandiri Mini OSCE Semester 5_Angkatan 2024, Sheet1 B4/B14/B22 | 24–26 November 2026 |

Nama folder menunjukkan angkatan, bukan tahun kegiatan. Enam kegiatan di atas dimasukkan dalam events.ts. Belum terkonfirmasi berarti tidak diplot pada kalender.

## Konflik dan bahan yang ditahan

- Run OSCE SMT 1 Angkatan 2026: DOCX 14 November (IUP), 15 November (REG) 2026; XLSX B3 sampai AD3 berisi 2–6 Desember 2026. Tampil sebagai jadwal belum terkonfirmasi.
- TFSS OSCE II Angkatan 2024: DOCX 16–22 Juni 2027; [ASMA] Jadwal TFSS OSCE 2.xlsx 3–9 Juni 2026; workbook JADWAL TFSS OSCE FASE II Angkatan 2024.xlsx memiliki tanggal Juni 2024 dan label angkatan 2021 pada salah satu sheet. Tampil sebagai jadwal belum terkonfirmasi.
- Remediasi OSCE I Angkatan 2025: dua workbook memiliki tanggal 30–31 Maret, 1 April, dan 6–7 April 2026; daftar pengajar berbeda dari 21 anggota ASMA 2024. Belum dimasukkan sebagai kegiatan tim ini sampai keterkaitannya dipastikan. Rentang tidak dijadikan 30 Maret–7 April secara kontinu karena ada hari tanpa sesi.
- Sherleen tercatat pada dua kelompok Latman dalam jam yang sama: tidak memengaruhi rentang kegiatan umum; perlu koreksi sebelum membuat detail pembagian asisten.

## Pengujian

Kegiatan fiktif hanya ada pada tests/calendar.test.ts. Data publik tidak ditambah untuk menciptakan kasus lintas bulan, bulan kosong, atau lebih dari tiga overlap.

## Revisi pemilik — 13 Oktober 2026

Instruksi pemilik menggantikan konflik sumber sebelumnya untuk Run OSCE Semester 1 Angkatan 2026: tanggal ditetapkan 14–15 November 2026. Mekanisme seluruh kegiatan Angkatan 2026 berstatus Coming soon. Angkatan 2024 hanya menampilkan Latihan Mandiri 24–26 November; TFSS OSCE II dihapus dari daftar publik. Empat URL mekanisme Google Docs untuk Latihan Mandiri 2024 serta Tentir, TFSS, dan Run OSCE 2025 diberikan langsung oleh pemilik dan disimpan dalam mechanismUrl pada events.ts. Isi dokumen eksternal tidak disalin.

## Revisi terbaru pemilik

Seluruh kegiatan Angkatan 2026 (Tentir, TFSS, dan Run OSCE) sementara dihapus dari sumber data publik, termasuk halaman detail dan legenda. Empat kegiatan Angkatan 2024/2025 beserta link mekanismenya tetap ditampilkan. Tahun pelaksanaan kegiatan tetap 2026.
