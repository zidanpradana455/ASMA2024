# Hasil pemeriksaan

## Integrasi materi dan arsip — 21 Oktober 2026

- Build produksi TypeScript/Vite lulus; menghasilkan 24 entry HTML tambahan (termasuk halaman 404), selain beranda.
- Seluruh 16 tes lulus: 12 tes kalender/integritas sebelumnya dan 4 tes arsip/materi, termasuk jumlah anggota, keberadaan foto, fase kosong, identitas tautan topik, dan pencarian.
- Rekonsiliasi penuh dengan inventaris Google Sites: 219 URL unik sumber = 219 URL unik hasil impor, tidak ada yang hilang atau ditambahkan. Tautan muncul dalam 375 konteks materi lintas angkatan/fase.
- Pemeriksaan Edge headless: 42 kombinasi enam halaman pada lebar 360, 390, 640, 768, 1024, 1440, dan 1920 px, tanpa overflow horizontal atau error JavaScript.
- Interaksi lulus: pencarian lintas angkatan, hasil kosong/reset, pemilihan fase dan browser Back, filter jenis dan Back, tombol tambah hasil, pencarian topik dan kecocokan URL, bahan tanpa tautan, route tidak valid, semua lima angkatan, seluruh gambar anggota, pencarian anggota setelah refresh, menu mobile, Escape dan pengembalian fokus.
- Pemeriksaan build produksi: 18 route langsung (direktori materi, anggota, dan 16 fase) merespons HTTP 200; aset JS/CSS berhasil dimuat; filter/query bertahan setelah refresh; 21 foto arsip 2023 berhasil dimuat pada build; tidak ada error halaman.
- Review visual terpisah memeriksa 8 screenshot penuh dan 4 potongan bagian atas. Disposisi **ship**, tanpa temuan material. Dokumentasi desain diselesaikan setelah review.
- Screenshot dan keluaran browser tersimpan lokal di `.impeccable/review/`; direktori ini tidak ikut Git. Skrip pengujian browser ada pada direktori audit workspace `../tmp/asma-legacy/`.

Keterbatasan: engine Impeccable belum terpasang, sehingga detector tidak berjalan. Reviewer memeriksa screenshot/kode dan mengikuti craft floor secara langsung. Hak akses dan isi setiap dokumen eksternal tidak diuji satu per satu; website mempertahankan tautan dan memberi penjelasan izin sumber. Tidak ada klaim seluruh file eksternal dapat diakses tanpa login.

## Pemeriksaan versi sebelumnya

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

## Sinkronisasi cloud dan background video — 14 Oktober 2026

- Mengambil seluruh perubahan cloud hingga `90c026f`: teks, layout, headline per huruf, dan transisi halaman. Background bubble diganti dengan video yang dipilih pengguna.
- Video lokal identik dengan `gemini_generated_video_bbd3c5be.mp4` (SHA-256 `cbb14e2e5ab14a2960f7ffcfcb38dbdc1b241c739420c0ff9c7f5643f7f18c60`). Poster diambil dari video yang sama.
- Build produksi dan seluruh 12 tes lulus. Pemeriksaan browser 390px/1440px: video berjalan, 30 huruf headline tampil, tidak ada bubble atau overflow horizontal. Tidak ada error JavaScript yang tercatat.
- Video dan animasi headline memakai status hero yang sama; berhenti saat hero sepenuhnya di luar layar. Mode reduced motion mempertahankan poster dan headline statis; mekanisme poster/video sebelumnya telah diperiksa untuk reduced motion dan tab tersembunyi.
