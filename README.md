# Website ASMA 2024

Website multi-page Asisten Mahasiswa Laboratorium Keterampilan Klinis FK-KMK UGM 2024. Dibuat dengan React, TypeScript, React Router, Vite, dan CSS.

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

Build ada di `dist/`. Build juga membuat entry HTML untuk setiap route kegiatan yang dikenal, Anggota, Timeline, dan halaman 404, sehingga refresh langsung tidak bergantung pada rewrite SPA. Ketika berpindah host, gunakan `dist` sebagai direktori publik dan `404.html` untuk halaman tidak ditemukan. Jika hosting mendukung fallback SPA, arahkan route lain ke `index.html`.

## Mengubah konten

- Anggota: edit `src/data/members.json`. `name` adalah nama panggilan, `fullName` untuk pencarian dan keterangan, `image` menunjuk `public/feeds/`. Pilih hanya sumber gambar berkode `-01`.
- Kegiatan: edit `src/data/events.ts`. Gunakan tanggal inklusif `YYYY-MM-DD`; kegiatan satu hari memakai startDate sama dengan endDate. Kalender, daftar, teaser, dan halaman detail menggunakan data ini bersama.
- Kegiatan belum pasti disimpan di `pendingEvents` tanpa tanggal. Setelah terkonfirmasi, pindahkan ke `events`, isi field lengkap, kemudian build ulang.
- Warna: gunakan `primary`, `secondary`, atau `tertiary`. Nilai warna, font, dan responsivitas berada di `src/styles.css`.
- Foto dan logo asli disimpan di folder induk proyek. Website hanya berisi salinan teroptimalkan.
- Bukti sumber dan konflik data ada di `docs/content-sources.md`.

## Perilaku penting

Kalender memakai Senin sebagai awal minggu. Hari ini dihitung dalam zona Asia/Jakarta; perhitungan tanggal kalender memakai UTC agar tidak bergeser karena zona waktu browser. Rentang kalender dihitung otomatis dari seluruh kegiatan bertanggal. Bulan yang dipilih disimpan di query `?bulan=YYYY-MM`. Tombol kembali dari detail membawa konteks bulan sebelumnya.

Mobile: ketuk tanggal untuk membuka daftar kegiatan, atau geser kalender kiri/kanan untuk berganti bulan. Keyboard: gunakan panah di tanggal, Home/End untuk awal/akhir minggu, Enter untuk membuka daftar, dan Escape untuk menutup dialog. Pencarian anggota juga mencakup nama lengkap.

## Batas versi pertama

Halaman detail berisi ringkasan dan Segera Hadir. Tidak ada backend, login, CMS, atau profil anggota individual. Google Fonts membutuhkan jaringan; font cadangan tetap tersedia. Run OSCE Semester 1 Angkatan 2026 dan TFSS OSCE II Angkatan 2024 belum ditempatkan pada tanggal tertentu karena konflik sumber. Tidak ada daftar email atau nomor telepon dalam build.

## Pemeriksaan

`npm test` menjalankan pengujian tanggal, pemotongan bar, overlap, bulan kosong, tahun kabisat, query bulan, teaser, dan kelengkapan 21 foto. Pemeriksaan browser mencakup lebar 360, 390, 768, 1024, 1440, dan 1920px, pencarian, dialog, keyboard, navigasi, serta route tidak dikenal. Lihat `docs/verification.md` untuk hasil dan batas pemeriksaan terakhir.
