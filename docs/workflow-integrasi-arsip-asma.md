# Workflow integrasi arsip dan materi ASMA

Tanggal: 22 Oktober 2026. Lingkup: integrasi arsip dan revisi direktori per stase pada website yang sudah ada.

## Struktur yang dipilih

Navigasi utama: **Beranda · Anggota · Materi Ajar · Timeline**.

Materi Ajar menjadi menu utama karena mahasiswa datang untuk mencari bahan belajar, terpisah dari jadwal kegiatan. Angkatan dan fase OSCE menjadi navigasi di dalam menu tersebut, bukan tambahan menu utama. Dokumen dibuka pada sumber aslinya di tab browser baru.

| Halaman | Alur dan isi |
|---|---|
| `/materi` | Pilih angkatan Kedokteran 2020–2024, lihat fase yang memiliki materi, atau cari materi lintas angkatan. |
| `/materi/:angkatan/:fase` | Pilih/lompat ke stase → pilih topik → buka checklist, PPT, atau video; pencarian dan filter tetap mempertahankan kelompok stase. |
| `/anggota?angkatan=2024` | Tim 2024 menjadi pilihan awal; pemilih tahun membuka arsip 2020–2023, dengan pencarian nama pada angkatan terpilih. |
| `/timeline` | Jadwal dan informasi kegiatan tetap memakai data kegiatan yang sudah diverifikasi. Halaman TFSS lama yang kosong tidak dibuat sebagai menu baru. |
| `/` | Tambahkan pintu masuk ke Materi Ajar dan profil singkat dari situs lama. Hero dan identitas ASMA 2024 dipertahankan. |

## Tahap implementasi

1. Normalisasi 16 halaman OSCE dari salinan 27 halaman publik. Pertahankan asal angkatan, fase, judul, kategori, dan URL sumber. Hubungkan label generik “Checklist”/“PPT” dengan topik di atasnya.
2. Ambil 82 foto arsip dari halaman anggota, cocokkan urutan foto dan nama per baris, simpan versi WebP lokal beserta catatan asal. Pertahankan ejaan nama sumber.
3. Bangun direktori per stase dengan gambar, nomor, judul, dan daftar topik. Checklist dan PPT disandingkan pada topik yang sama; video dibuka melalui disclosure. Tambahkan filter, pencarian, jumlah hasil, pilihan lompat ke stase, tombol reset, navigasi kembali, dan keadaan kosong. Jangan menampilkan tombol aktif untuk label tanpa URL.
4. Gabungkan arsip anggota dengan pemilih angkatan. Tim 2024 dan ring foto di Beranda tetap menggunakan data saat ini.
5. Tambahkan tautan navigasi, metadata route, serta entry HTML produksi agar tautan langsung tetap dapat dibuka.
6. Uji pemetaan data dan gambar, pencarian/filter, browser Back, refresh route, navigasi mobile, keyboard, dan overflow desktop/mobile. Jalankan tes yang sudah ada dan build produksi.
7. Serahkan preview lokal dan dokumentasi sumber; publikasi hosting terpisah dari implementasi ini.

## Aturan sumber

- Fase I 2021–2024: 14 stase. Fase I 2020: 12 stase. Fase II 2020: 9 stase; checklist gabungan Stase 1–4 tetap ditandai gabungan. Fase III 2020 tidak mencantumkan nomor stase, sehingga hanya dikelompokkan berdasarkan topik.
- `src/data/material-stations.json` menyimpan pemetaan yang dikurasi dari nomor dan kelompok pada halaman sumber ke ID materi. Judul kelompok disederhanakan untuk navigasi; judul asli dan URL tetap tersedia pada data sumber. Video yang sesuai dipasangkan dengan topik; buku dan video tambahan tanpa pemetaan stase di sumber masuk “Bahan lintas stase”.
- Setiap entri sumber muncul tepat satu kali dalam direktori fase, termasuk label tanpa URL. Setelah mengimpor ulang sumber, perbarui pemetaan ini dan jalankan tes rekonsiliasi ID.
- Enam belas ilustrasi GPT dibuat melalui tool image generator bawaan dan disimpan sebagai WebP lokal di `public/images/stations/`. Gambar yang sama dipakai untuk topik/stase yang sama lintas angkatan; nomor ditampilkan lewat HTML karena dapat berbeda antarangkatan. Prompt lengkap dan asal aset tercatat pada `docs/station-image-prompts.json`, serta metadata EXIF tiap WebP. Ilustrasi dekoratif, bukan panduan langkah klinis.

- Tautan Google Drive, Slides, SharePoint, dan YouTube dipertahankan; implementasi ini tidak menyalin atau mengekspor seluruh dokumen eksternal.
- Ketersediaan tautan di situs asal bukan jaminan file eksternal dapat diakses semua orang. Jelaskan singkat pada halaman materi bahwa akses mengikuti izin pemilik.
- Halaman kosong tetap memiliki penjelasan dan tautan kembali. Jangan mengisi dengan materi dari tahun lain secara diam-diam.
- Video yang berulang antarangkatan tetap terhubung dengan angkatannya, tetapi tidak dimuat sebagai puluhan iframe saat halaman dibuka.
- Nomor telepon, email personal, maupun data internal tidak ditambahkan. Kontak organisasi hanya menggunakan alamat yang jelas; link sosial rusak dari sumber tidak disalin.

## Direction contract

THESIS: Angkatan → fase OSCE → stase → topik → bahan belajar. Hubungan antarmateri terlihat dalam satu kelompok, mengikuti struktur sumber dan contoh pengguna.

OWN-WORLD: Mengikuti warna merah ASMA, kertas off-white, font Lato/Montserrat, dan aksen Playfair yang sudah dipakai. Tidak mengganti identitas beranda atau komponen lama.

STORY: Mahasiswa memilih angkatan dan fase, menemukan nomor stase lewat gambar/judul atau pemilih stase, lalu membuka checklist, PPT, atau video di bawah topiknya. Pencarian/filter tidak menghilangkan konteks stase.

FIRST VIEWPORT: Judul fase dan angkatan yang ringkas, navigasi fase, pencarian, filter, serta pemilih stase mendahului kelompok stase pertama. Konten dua kolom di desktop dan satu kolom di ponsel, dengan ilustrasi burgundy/krem bernomor di sebelah topik.

FORM: Ekstensi sistem yang ada; direktori stase bergambar, baris topik, tautan berjenis, dan disclosure video native. Mode Read/Operate. Context engine tidak tersedia; keputusan didasarkan pada kode, tangkapan layar incumbent, dan koreksi pengguna beserta gambar sumber. Review 21 Oktober atas daftar datar tidak mengesahkan revisi ini.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
