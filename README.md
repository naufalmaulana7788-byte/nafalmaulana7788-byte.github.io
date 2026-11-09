# VALLShop

Template website toko online responsif dengan **5 halaman HTML terpisah**, satu file CSS, dan satu file JavaScript. Cocok untuk GitHub Pages.

## Struktur file

```text
VALLShop/
├── index.html
├── kategori.html
├── produk.html
├── tentang.html
├── kontak.html
├── style.css
├── script.js
└── README.md
```

## Cara menjalankan di komputer

1. Ekstrak folder `VALLShop`.
2. Buka folder menggunakan Visual Studio Code.
3. Klik dua kali `index.html`, atau jalankan dengan ekstensi Live Server.
4. Klik menu Home, Kategori, Produk, Tentang, dan Kontak untuk berpindah halaman.

## Cara upload ke GitHub Pages

1. Buat repository baru di GitHub.
2. Upload semua file di dalam folder ini ke bagian utama (root) repository, bukan hanya file ZIP.
3. Buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/ (root)`, lalu klik **Save**.
6. Tunggu proses selesai. Buka alamat website yang ditampilkan pada halaman GitHub Pages.

Pastikan nama file utama tetap `index.html` dan semua nama file/link tidak diubah tanpa memperbarui tautannya.

## Bagian yang bisa kamu ubah

- Nama toko: cari `VALLShop` pada file HTML.
- Warna, ukuran, dan layout: edit `style.css`.
- Nama produk, harga, dan gambar: edit `produk.html` serta `index.html`.
- Email penerima pesan: buka `script.js`, lalu ganti `vallshop@example.com`.
- Gambar contoh memakai URL Unsplash sehingga perlu koneksi internet untuk ditampilkan.

## Catatan fitur

- Navigasi membuka 5 file HTML yang berbeda.
- Layout responsif untuk desktop, tablet, dan ponsel.
- Menu hamburger aktif pada layar kecil.
- Filter kategori produk aktif pada halaman Produk.
- Tombol keranjang saat ini hanya menampilkan notifikasi simulasi; belum ada database, checkout, atau pembayaran.
- Form kontak membuka aplikasi email perangkat. Untuk menerima pesan langsung dari website, perlu layanan formulir/backend.
