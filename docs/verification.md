# Hasil pemeriksaan

Pemeriksaan akhir: 13 Oktober 2026, Asia/Jakarta.

## Lulus

- TypeScript strict dan build produksi Vite.
- Dua belas unit test kalender dan integritas data: tanggal inklusif, pemotongan lintas minggu/bulan, overlap lebih dari tiga bar, bulan kosong, lintas tahun, leap year, validasi query, teaser, serta 21 aset anggota unik.
- Browser Microsoft Edge headless, 24 kombinasi empat halaman pada lebar 360, 390, 768, 1024, 1440, dan 1920px. Tidak ada horizontal scroll atau gambar rusak pada pemeriksaan. Tidak ada error JavaScript halaman.
- Inspeksi screenshot Beranda dan Anggota desktop/mobile, kalender, serta bottom sheet.
- Pencarian nama, hasil kosong, menu mobile, perpindahan bulan, klik kegiatan, kembali ke bulan asal, dialog dua kegiatan overlap, Escape, dan keyboard panah.
- Pengujian lanjutan pada 360 × 640: simulasi swipe, fokus keyboard melewati batas bulan, query invalid, reduced motion, dan respons HTTP 200 untuk route langsung.
- Pemeriksaan bounding box tautan, tombol, dan input interaktif Timeline pada mobile 360px: tidak ada target aktif di bawah 44 × 44px. Bar mini mobile berupa indikator; tombol tanggal membuka seluruh daftar kegiatan.
- Build menghasilkan 11 entry HTML tambahan untuk route dan 404, dengan title dan meta description masing-masing.

## Perbaikan selama pemeriksaan

- Posisi tagline disesuaikan agar benar-benar berada di belakang subjek foto, dan foto grup mobile menampilkan semua anggota.
- Menu diuji setelah transisi route selesai.
- Pemindahan fokus tanggal menunggu bulan tujuan selesai dirender.
- Area klik judul kartu diperluas dan jarak bar kalender terhadap +N lagi diperbaiki.

## Batas pemeriksaan

- Pengujian browser memakai Edge headless, bukan pengujian fisik pada iOS/Safari atau Android.
- Kasus sintetis lintas tahun, bulan kosong, dan lebih dari tiga overlap diuji pada mesin kalender dengan unit test. Data publik saat ini tidak memiliki semua kasus tersebut.
- Font berasal dari Google Fonts dan memiliki fallback jika jaringan tidak tersedia.
- Rentang Run OSCE Semester 1 Angkatan 2026 dan TFSS OSCE II Angkatan 2024 tetap menunggu klarifikasi sumber. Rincian konflik dicatat di content-sources.md.

## Pembaruan setelah kritik antarmuka — 13 Oktober 2026

- Seluruh 21 anggota tampil dalam ring 3D draggable pada perkenalan Beranda.
- Rotasi otomatis, scroll boost, drag, Jeda/Putar, penghentian offscreen, dan fallback reduced motion diverifikasi di Edge headless.
- Build produksi dan 12 unit test lulus.
- Pemeriksaan empat halaman pada enam lebar layar (360, 390, 768, 1024, 1440, 1920): 24 kombinasi tanpa overflow horizontal, gambar rusak, atau error JavaScript.
- Kalender: pemilihan bulan tidak menggeser viewport; Back mengembalikan bulan; dialog desktop tetap bekerja.
- Mobile: 14 November menampilkan dua kegiatan inline; reset bulanan menampilkan tiga kegiatan. Pencarian dan kondisi hasil kosong lulus.
- Tipografi informasi utama diperbesar; ringkasan kegiatan menampilkan tanggal, lokasi bila tersedia, dan persiapan terverifikasi. Kalender dan agenda menggantikan empat representasi jadwal berulang.
- Screenshot desktop/mobile ditinjau. Tidak ada dependensi animasi baru. Pengujian perangkat fisik iOS/Android belum dilakukan.

- Revisi berikutnya: bar petunjuk/kontrol ring dihapus; keyboard panah tetap berfungsi. Fluid gradient hero bergerak pada desktop/mobile, berhenti offscreen, dan statis pada reduced motion. Build serta pemeriksaan Edge di 390/1440px lulus tanpa error JavaScript atau overflow.

- Revisi timeline per angkatan: 2024 kuning, 2025 merah, 2026 magenta; total tujuh kegiatan. Run OSCE 2026 pada 14–15 November, mekanisme 2026 Coming soon. Empat href mekanisme sama persis dengan URL pemilik dan membuka tab baru. Build dan 12 test lulus; pemeriksaan desktop/mobile untuk tiga overlap tanggal 14 November, legenda, dan layout lulus tanpa error JavaScript.
