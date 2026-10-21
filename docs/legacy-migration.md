# Integrasi arsip ASMA dan materi ajar

Sumber: https://sites.google.com/view/asmafkkmkugm/beranda. Inventaris diperiksa 20 Oktober 2026; implementasi diselesaikan 21 Oktober 2026 (Asia/Jakarta).

## Hasil

- 82 anggota lama: 20 dari 2020, 21 dari 2021, 20 dari 2022, dan 21 dari 2023. Bersama 21 anggota 2024, halaman Anggota mencakup 103 orang dengan pemilih tahun; pilihan awal tetap 2024.
- Seluruh 82 foto lama disimpan sebagai WebP lokal, total sekitar 4,37 MB. Nama dan urutan foto dicocokkan per baris terhadap halaman sumber. Foto ditampilkan utuh dalam bingkai persegi, tanpa crop wajah. Asal setiap gambar tercatat dalam `legacy-image-sources.json`.
- 16 halaman OSCE untuk angkatan Kedokteran 2020–2024. Total 375 tautan dalam konteks angkatan/fase, mengarah ke 219 URL unik. Seluruh URL cocok dengan inventaris awal: tidak ada yang hilang atau ditambahkan.
- 219 URL unik terdiri dari 140 file Google Drive (termasuk 9 buku sematan), 21 presentasi Google Slides, 15 presentasi SharePoint, dan 43 video YouTube.
- Fase I 2023 juga memiliki 32 entri bahan tanpa tautan. Entri tersebut diberi status belum tersedia dan tidak menjadi tombol aktif.
- Navbar/footer mendapatkan Materi Ajar; Beranda mendapatkan pengantar dan pintu masuk ke materi. Footer memakai email organisasi dan alamat Skills Lab yang tercantum pada sumber. Link sosial rusak tidak disalin.

## Arsitektur dan perilaku

Menu utama: Beranda, Anggota, Materi Ajar, Timeline. Angkatan dipilih di dalam halaman terkait. Materi memakai direktori fase, bukan penambahan banyak menu utama.

- `/materi?angkatan=2024`: daftar fase; pencarian `q` mencakup semua angkatan.
- `/materi/2024/fase-1?jenis=checklist&q=antropometri`: filter jenis dan topik pada fase itu. Pilihan filter masuk riwayat browser; mengetik pencarian mengganti entri URL saat ini.
- `/anggota?angkatan=2023&q=almira`: pencarian dalam angkatan terpilih, tetap tersimpan saat refresh.
- Daftar sumber menampilkan 30 entri awal dengan tombol untuk menambah 30 berikutnya. Video tetap tautan, sehingga puluhan pemutar tidak dimuat saat halaman dibuka.
- Angkatan/fase tidak dikenal menampilkan pemulihan ke direktori. Parameter angkatan/filter tidak valid memakai pilihan aman. Fase yang kosong tidak diisi dari angkatan lain.

## Batas verifikasi sumber

Keberadaan dan pemetaan tautan pada Google Sites sudah diperiksa. Isi, hak akses, serta ketersediaan 219 sumber eksternal belum diuji satu per satu. Website menginformasikan bahwa akses mengikuti izin pemilik sumber. Dokumen Drive/Slides/SharePoint dan video tidak disalin ke hosting.

PPT Tentir 2020 Fase I tidak tersedia pada sumber. OSCE Komprehensif 2020 dan Fase II–III angkatan 2021–2024 belum memiliki tautan. Fase I 2023 memiliki video, tetapi label Checklist/PPT belum berisi tautan. TFSS & Asistensi lama masih Coming Soon, sehingga tidak dibuat menjadi menu kosong; jadwal terverifikasi tetap berada di Timeline.

## Pemeliharaan

Edit JSON di `src/data/` untuk pembaruan manual. Pertahankan nama sesuai sumber dan jangan memperluas singkatan tanpa bukti. Jalankan `npm test` dan `npm run build` setelah pembaruan.

`scripts/import-legacy.py <direktori-snapshot>` dapat membangun ulang data dari salinan HTML Google Sites. Opsi `--download-images` memerlukan Pillow. Jika ada `member-originals/<tahun>-<nomor>.img` beserta manifest pada direktori snapshot, importer menggunakannya; jika tidak, ia mencoba URL gambar publik. URL gambar Google Sites dapat bersifat sementara, jadi salinan lama mungkin perlu disegarkan melalui halaman publik. Proses impor menimpa data hasil impor: simpan perubahan manual terlebih dahulu. HTML dan file mentah audit tidak disertakan dalam build atau repo.

Workflow lengkap ada di `workflow-integrasi-arsip-asma.md`. Screenshot lokal dan keluaran pemeriksaan browser ada di `.impeccable/review/` (diabaikan Git).
