# Latihan TKA SD Kelas 6

Aplikasi latihan soal TKA untuk Malika: Matematika, Bahasa Indonesia, dan IPAS (426 soal), lengkap dengan kunci dan pembahasan.

## Isi folder

| File / folder | Fungsi |
|---|---|
| `index.html` | Halaman aplikasi (tampilan dan logika) |
| `bank.json` | Bank soal, bacaan, dan daftar materi |
| `legacy.js` | Gambar soal yang digambar dengan kode (kubus, trapesium, diagram batang, tabel) |
| `img/` | Gambar soal dan bacaan (format .webp) |
| `firebase-store.js` | Sambungan ke Firebase (config project `latihan-tka-cbc91`, login anonim, Firestore) |
| `firestore.rules` | Aturan keamanan Firestore (salin ke Firebase Console → Firestore → Rules → Publish) |

## Cara membuka

- **Online:** aktifkan GitHub Pages (Settings → Pages → Deploy from a branch → `main` / root). App bisa dibuka di `https://<username>.github.io/<nama-repo>/`.
- **Di laptop:** `bank.json` dimuat lewat `fetch`, jadi membuka `index.html` dengan klik dua kali tidak akan berhasil. Jalankan server kecil dari folder ini, misalnya `python -m http.server`, lalu buka `http://localhost:8000`.

## Riwayat & Firebase

- Riwayat (jawaban, paket, paket yang belum selesai) disimpan di Firestore di bawah `families/{KODE}`. Kode keluarga (misalnya `TKA-7KQ3M9XP`) dibuat lewat **Sambungkan → Mulai baru** di perangkat Malika. Perangkat lain bergabung lewat **Sambungkan → Gabung dengan kode**.
- Hanya perangkat yang sudah tergabung (`families/{KODE}/devices/{uid}`) yang bisa membaca atau menulis data. Kode keluarga berfungsi seperti kunci, jadi jangan disebar.
- Prasyarat di Firebase Console: Firestore dibuat, **Authentication → Anonymous** aktif, domain `galgitgut.github.io` ada di **Authorized domains**, dan isi `firestore.rules` sudah di-Publish.
- Halaman **Rapor ortu** (tombol kuning di kanan atas) menampilkan progres per mapel dan materi, materi yang perlu perhatian, aktivitas 14 hari, hasil Try Out, dan riwayat paket.
- Sebelum disambungkan, riwayat tersimpan di browser saja (localStorage). Saat **Mulai baru**, riwayat lokal itu ikut dipindahkan ke Firebase.

## Catatan

- Untuk menambah atau memperbaiki soal, cukup ubah `bank.json` (dan tambahkan gambarnya ke `img/`), lalu upload ulang.
