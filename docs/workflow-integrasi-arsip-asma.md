# Workflow integrasi arsip dan materi ASMA

Tanggal: 20 Oktober 2026. Lingkup: implementasi lokal pada website yang sudah ada.

## Struktur yang dipilih

Navigasi utama: **Beranda · Anggota · Materi Ajar · Timeline**.

Materi Ajar menjadi menu utama karena mahasiswa datang untuk mencari bahan belajar, terpisah dari jadwal kegiatan. Angkatan dan fase OSCE menjadi navigasi di dalam menu tersebut, bukan tambahan menu utama. Dokumen dibuka pada sumber aslinya di tab browser baru.

| Halaman | Alur dan isi |
|---|---|
| `/materi` | Pilih angkatan Kedokteran 2020–2024, lihat fase yang memiliki materi, atau cari materi lintas angkatan. |
| `/materi/:angkatan/:fase` | Filter buku, checklist, PPT tentir, studi kasus, dan video; cari topik; buka sumber. |
| `/anggota?angkatan=2024` | Tim 2024 menjadi pilihan awal; pemilih tahun membuka arsip 2020–2023, dengan pencarian nama pada angkatan terpilih. |
| `/timeline` | Jadwal dan informasi kegiatan tetap memakai data kegiatan yang sudah diverifikasi. Halaman TFSS lama yang kosong tidak dibuat sebagai menu baru. |
| `/` | Tambahkan pintu masuk ke Materi Ajar dan profil singkat dari situs lama. Hero dan identitas ASMA 2024 dipertahankan. |

## Tahap implementasi

1. Normalisasi 16 halaman OSCE dari salinan 27 halaman publik. Pertahankan asal angkatan, fase, judul, kategori, dan URL sumber. Hubungkan label generik “Checklist”/“PPT” dengan topik di atasnya.
2. Ambil 82 foto arsip dari halaman anggota, cocokkan urutan foto dan nama per baris, simpan versi WebP lokal beserta catatan asal. Pertahankan ejaan nama sumber.
3. Bangun direktori materi dengan filter, pencarian, jumlah hasil, tombol reset, navigasi kembali, dan keadaan kosong. Jangan menampilkan tombol aktif untuk label tanpa URL.
4. Gabungkan arsip anggota dengan pemilih angkatan. Tim 2024 dan ring foto di Beranda tetap menggunakan data saat ini.
5. Tambahkan tautan navigasi, metadata route, serta entry HTML produksi agar tautan langsung tetap dapat dibuka.
6. Uji pemetaan data dan gambar, pencarian/filter, browser Back, refresh route, navigasi mobile, keyboard, dan overflow desktop/mobile. Jalankan tes yang sudah ada dan build produksi.
7. Serahkan preview lokal dan dokumentasi sumber; publikasi hosting terpisah dari implementasi ini.

## Aturan sumber

- Tautan Google Drive, Slides, SharePoint, dan YouTube dipertahankan; implementasi ini tidak menyalin atau mengekspor seluruh dokumen eksternal.
- Ketersediaan tautan di situs asal bukan jaminan file eksternal dapat diakses semua orang. Jelaskan singkat pada halaman materi bahwa akses mengikuti izin pemilik.
- Halaman kosong tetap memiliki penjelasan dan tautan kembali. Jangan mengisi dengan materi dari tahun lain secara diam-diam.
- Video yang berulang antarangkatan tetap terhubung dengan angkatannya, tetapi tidak dimuat sebagai puluhan iframe saat halaman dibuka.
- Nomor telepon, email personal, maupun data internal tidak ditambahkan. Kontak organisasi hanya menggunakan alamat yang jelas; link sosial rusak dari sumber tidak disalin.

## Direction contract

THESIS: Direktori belajar yang membawa mahasiswa dari angkatan ke topik dan sumber dengan sedikit langkah; daftar judul dan jenis materi menjadi isi utama.

OWN-WORLD: Mengikuti warna merah ASMA, kertas off-white, font Lato/Montserrat, dan aksen Playfair yang sudah dipakai. Tidak mengganti identitas beranda atau komponen lama.

STORY: Mahasiswa memilih angkatan dan fase, mempersempit jenis materi, lalu membuka bahan belajar. Pengunjung arsip memilih tahun untuk mengenal anggota.

FIRST VIEWPORT: Judul Materi Ajar, deskripsi singkat, pencarian, dan pilihan angkatan; fase tersusun sebagai daftar dengan status. Halaman detail menempatkan pencarian dan jenis materi sebelum daftar sumber.

FORM: Ekstensi sistem yang ada; direktori bertingkat dan baris sumber. Mode Read/Operate. Context engine tidak tersedia; keputusan didasarkan pada kode dan tangkapan layar incumbent.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
