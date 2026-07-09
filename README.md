# Sipilah-Law-Firm
Web Prototype untuk Memenuhi Tugas/Projek Akhir Modul Komputer

Nama Anggota kelompok 4 :

1.Shabrina Ghitca Nuralfisyah/PMH 2C (1253040084).

2.Ismi Abdillah Wahdah/PHM 2C (1253040079).

3.Gamal Hidayat/PMH 2C (1253040057).

4.Yusri Helmi/PMH 2C (1253040064).

5.Muhammad Iqbal Hakim/PMH 2C (1253040047).

6.Fahrul Muhammad Hasby/PMH 2C (1253040051).

# ⚖️ SIPILAH - Sistem Informasi Pengajuan Konsultasi Hukum

SIPILAH adalah sebuah platform aplikasi web interaktif yang dirancang untuk menjembatani klien dengan pengacara profesional. Aplikasi ini memungkinkan klien untuk mengajukan jadwal konsultasi hukum, membaca artikel edukasi hukum terbaru, serta memungkinkan admin untuk mengelola direktori pengacara dan jadwal konsultasi secara *real-time*.

Aplikasi ini dibangun menggunakan teknologi **Client-Side** sepenuhnya (HTML, CSS, JS) dan menggunakan `localStorage` browser sebagai basis data simulasi, sehingga sangat cepat dan mudah dijalankan tanpa memerlukan konfigurasi server backend.

## ✨ Fitur Utama

**👨‍⚖️ Fitur Klien:**
- Pendaftaran akun baru dan sistem Login.
- Mengajukan jadwal konsultasi hukum (dilengkapi validasi tanggal cerdas).
- Melihat direktori pengacara berserta spesialisasi dan status ketersediaannya.
- Membaca portal artikel dan berita hukum dengan tampilan layaknya portal berita modern.
- Melihat riwayat pengajuan dan status persetujuan dari Admin.

**🛡️ Fitur Admin:**
- Dasbor analitik interaktif dilengkapi dengan grafik statistik (Chart.js).
- Kelola Permintaan Konsultasi (Terima/Tolak kasus).
- Kelola Data Pengacara (Tambah, Hapus, Ubah Status: Aktif/Sibuk/Tidak Aktif).
- Kelola Akun Klien (Melihat daftar klien terdaftar dan menghapus akun beserta riwayatnya).
- Kelola Artikel Hukum (Membuat artikel baru dengan fitur *upload cover* gambar otomatis menggunakan *Base64 Encoding*).

## 🚀 Teknologi yang Digunakan
- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6).
- **Framework UI:** Bootstrap 5 (Responsive Design).
- **Library Tambahan:** Chart.js (Untuk grafik statistik Dasbor Admin).
- **Penyimpanan:** Web Storage API (`localStorage`).

---

## 🛠️ Instruksi Setup (Cara Menjalankan Web)

Aplikasi ini bersifat *serverless* dan *plug-and-play*. Anda **TIDAK PERLU** menginstal XAMPP, Node.js, atau mengkonfigurasi database MySQL.

1. **Unduh Proyek:** Clone repository ini atau unduh proyek dalam bentuk file `.zip` lalu ekstrak ke komputer Anda.
2. **Buka Aplikasi:** Buka folder proyek tersebut.
3. **Jalankan:** Klik dua kali (Double-click) pada file `index.html`. File akan otomatis terbuka di *browser* bawaan Anda (Google Chrome, Mozilla Firefox, Microsoft Edge, dll).
4. *Selesai!* Sistem otomatis akan menyuntikkan data awal (Auto-Seeding) sehingga web siap langsung digunakan.

---

## 📖 Cara Menggunakan Web

### 1. Hak Akses Admin (Dasbor Manajemen)
Saat pertama kali dijalankan, sistem sudah menyediakan akun Admin default.
- **Halaman Login:** Buka `login.html` atau klik tombol Login dari halaman utama.
- **Username:** `admin`
- **Password:** `admin123`
- *Catatan:* Dari dasbor Admin, Anda bisa mengklik menu navigasi di sebelah kanan untuk mulai mengelola Pengacara, Artikel, dan Klien.

### 2. Hak Akses Klien (Pengguna Umum)
- Sistem sudah menyediakan akun Klien dummy (contoh: Username `Budi`, Password `123`), atau Anda bisa mendaftar sebagai pengguna baru melalui tombol **Daftar Akun** (`daftar.html`).
- Setelah login, Klien dapat langsung memilih menu **"Ajukan Konsultasi"**. Klien hanya bisa memilih pengacara yang berstatus *Aktif*. Pengacara yang di-set *Sibuk* oleh admin akan berwarna abu-abu dan tidak bisa dipilih.

### 3. Mengunggah Gambar Artikel
- Login sebagai `admin`.
- Masuk ke menu **Kelola Artikel**.
- Isi judul, pilih kategori, ketik isi berita, dan klik tombol "Pilih File" pada bagian Cover Artikel untuk mengunggah gambar dari komputer Anda (.jpg / .png). 
- Jika gambar tidak diisi, sistem akan menggunakan gambar *placeholder* cantik secara otomatis.

---
**Catatan Penting:** Karena aplikasi ini menggunakan `localStorage`, semua data (akun, konsultasi, pengacara, artikel) disimpan di dalam *browser* perangkat Anda. Jika Anda menghapus *cache/history* browser atau membuka web ini di mode *Incognito* (Penyamaran), data akan kembali ke kondisi awal (*default dummy data*).
