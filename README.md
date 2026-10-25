# Latihan TKA SD Kelas 6

Aplikasi latihan soal TKA untuk Malika: Matematika, Bahasa Indonesia, dan IPAS (426 soal), lengkap dengan kunci dan pembahasan.

## Isi folder

| File / folder | Fungsi |
|---|---|
| `index.html` | Halaman aplikasi (tampilan dan logika) |
| `bank.json` | Bank soal, bacaan, dan daftar materi |
| `legacy.js` | Gambar soal yang digambar dengan kode (kubus, trapesium, diagram batang, tabel) |
| `img/` | Gambar soal dan bacaan (format .webp) |

## Cara membuka

- **Online:** aktifkan GitHub Pages (Settings → Pages → Deploy from a branch → `main` / root). App bisa dibuka di `https://<username>.github.io/<nama-repo>/`.
- **Di laptop:** `bank.json` dimuat lewat `fetch`, jadi membuka `index.html` dengan klik dua kali tidak akan berhasil. Jalankan server kecil dari folder ini, misalnya `python -m http.server`, lalu buka `http://localhost:8000`.

## Catatan

- Riwayat latihan tersimpan di browser (localStorage). Riwayat tidak ikut pindah ke perangkat atau browser lain, dan akan hilang jika data situs dihapus.
- Untuk menambah atau memperbaiki soal, cukup ubah `bank.json` (dan tambahkan gambarnya ke `img/`), lalu upload ulang.
