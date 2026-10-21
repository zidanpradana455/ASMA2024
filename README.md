# Website ASMA 2024

Website multi-page Asisten Mahasiswa Laboratorium Keterampilan Klinis FK-KMK UGM 2024, dengan arsip anggota 2020–2023 dan materi ajar Kedokteran 2020–2024. Dibuat dengan React, TypeScript, React Router, Vite, dan CSS.

## Menjalankan

Gunakan Node.js versi yang mendukung Vite 6 (proyek ini diuji dengan Node 24).

```text
npm ci
npm run dev
```

Buka alamat lokal yang dicetak Vite. Port default 5173.

```text
npm test
npm run build
npm run preview
```

Build ada di `dist/`. Build juga membuat entry HTML untuk setiap route kegiatan yang dikenal, Anggota, Materi Ajar beserta 16 fase OSCE, Timeline, dan halaman 404, sehingga refresh langsung tidak bergantung pada rewrite SPA. Ketika berpindah host, gunakan `dist` sebagai direktori publik dan `404.html` untuk halaman tidak ditemukan. Jika hosting mendukung fallback SPA, arahkan route lain ke `index.html`.

## Mengubah konten

- Anggota: edit `src/data/members.json`. `name` adalah nama panggilan, `fullName` untuk pencarian dan keterangan, `image` menunjuk `public/feeds/`. Pilih hanya sumber gambar berkode `-01`.
- Arsip anggota: `src/data/legacy-members.json` menyimpan 82 nama angkatan 2020–2023; foto lokal ada di `public/feeds/arsip/`. Pilihan awal `/anggota` tetap 2024, dengan angkatan dan pencarian tersimpan pada query URL.
- Materi ajar: `src/data/materials.json` memetakan angkatan, fase, URL halaman sumber, dan bahan belajar. Jenis bahan: `book`, `checklist`, `slides`, `case`, `video`. URL kosong berarti bahan belum tersedia; jangan mengarang URL pengganti. Pertahankan ID unik ketika mengedit bahan.
- `/materi` mencari topik di semua angkatan; `/materi/:angkatan/:fase` memfilter fase terpilih. Dokumen dan video dibuka di sumber aslinya, tanpa iframe otomatis atau salinan dokumen eksternal.
- Workflow integrasi ada di `docs/workflow-integrasi-arsip-asma.md`; rincian migrasi dan batas verifikasi ada di `docs/legacy-migration.md`.
- Kegiatan: edit `src/data/events.ts`. Gunakan tanggal inklusif `YYYY-MM-DD`; kegiatan satu hari memakai startDate sama dengan endDate. Kalender, daftar, teaser, dan halaman detail menggunakan data ini bersama.
- Kegiatan belum pasti disimpan di `pendingEvents` tanpa tanggal. Setelah terkonfirmasi, pindahkan ke `events`, isi field lengkap, kemudian build ulang.
- Warna berdasarkan angkatan: `tertiary` (kuning) untuk 2024, `primary` (merah) untuk 2025, dan `secondary` (magenta) untuk 2026. Link mekanisme publik disimpan pada `mechanismUrl`. Nilai warna, font, dan responsivitas berada di `src/styles.css`.
- Foto dan logo asli disimpan di folder induk proyek. Website hanya berisi salinan teroptimalkan.
- Bukti sumber dan konflik data ada di `docs/content-sources.md`.

## Perilaku penting

Kalender memakai Senin sebagai awal minggu. Hari ini dihitung dalam zona Asia/Jakarta; perhitungan tanggal kalender memakai UTC agar tidak bergeser karena zona waktu browser. Rentang kalender dihitung otomatis dari seluruh kegiatan bertanggal. Bulan yang dipilih disimpan di query `?bulan=YYYY-MM`. Tombol kembali dari detail membawa konteks bulan sebelumnya.

Mobile: ketuk tanggal untuk menampilkan agenda tanggal tersebut langsung di bawah kalender, atau geser kalender kiri/kanan untuk berganti bulan. Tombol Lihat sebulan mengembalikan agenda bulanan. Desktop membuka dialog kegiatan per tanggal. Pilihan bulan tetap di posisi kalender dan tersimpan dalam riwayat browser. Keyboard: gunakan panah di tanggal, Home/End untuk awal/akhir minggu, Enter untuk membuka daftar, dan Escape untuk menutup dialog. Pencarian anggota juga mencakup nama lengkap.

Beranda menampilkan seluruh 21 anggota dalam ring 3D. Tarik horizontal untuk memutar. Bar petunjuk dan kontrol visual dihilangkan; ketika ring mendapat fokus keyboard, panah kiri/kanan memutar dan spasi mengatur jeda. Scroll mempercepat rotasi sementara dengan pelambatan bertahap. Animasi berhenti ketika keluar layar atau tab tersembunyi. Reduced motion memakai daftar horizontal statis yang dapat digeser.

## Batas versi pertama

Halaman detail berisi ringkasan, tanggal, lokasi yang tersedia, dan persiapan dari sumber terverifikasi. Jam sesi dan pembagian kelompok belum tersedia di halaman publik. Tidak ada backend, login, CMS, atau profil anggota individual. Google Fonts membutuhkan jaringan; font cadangan tetap tersedia. Seluruh kegiatan Angkatan 2026 sementara dihapus dari website atas permintaan pemilik. Angkatan 2024 hanya memiliki Latihan Mandiri 24–26 November; Angkatan 2025 memiliki Tentir, TFSS, dan Run OSCE. Tidak ada daftar email atau nomor telepon dalam build.

## Pemeriksaan

`npm test` menjalankan pengujian tanggal, pemotongan bar, overlap, bulan kosong, tahun kabisat, query bulan, teaser, dan kelengkapan 21 foto. Pemeriksaan browser mencakup lebar 360, 390, 768, 1024, 1440, dan 1920px, pencarian, dialog, keyboard, navigasi, serta route tidak dikenal. Lihat `docs/verification.md` untuk hasil dan batas pemeriksaan terakhir.

Background hero memakai video pengguna `public/assets/hero-background.mp4` (1280×720, sekitar 9,8 detik, 2,14 MB), berulang tanpa suara. Video berhenti saat hero keluar layar atau tab tersembunyi; reduced motion menampilkan `hero-background-poster.webp` tanpa mengunduh video. Poster juga menjadi cadangan saat autoplay tidak tersedia. Sumber: `gemini_generated_video_bbd3c5be.mp4` dari pengguna.
