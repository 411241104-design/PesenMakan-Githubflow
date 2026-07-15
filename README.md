# PesenMakan - GitHub Flow Implementation

## 📋 Deskripsi Proyek

Proyek ini merupakan implementasi GitHub Flow pada platform e-commerce **PesenMakan**. Proyek ini dibuat sebagai studi kasus untuk Ujian Akhir Semester mata kuliah Rekayasa Perangkat Lunak.

**Nama:** Adryan Izdihar Rafief  
**NIM:** 411241104

## 🎯 Tujuan Implementasi

GitHub Flow diterapkan untuk mengatasi permasalahan berikut:

- ❌ **Masalah Awal:**
  - Push langsung ke branch `main` oleh seluruh programmer
  - Sering terjadi merge conflict
  - Tidak ada proses code review
  - Bug masuk ke production
  - Riwayat commit sulit dipahami

- ✅ **Solusi dengan GitHub Flow:**
  - Setiap fitur dikembangkan di branch terpisah
  - Proses Pull Request sebelum merge
  - Mandatory code review dari tim
  - Branch protection rules untuk keamanan
  - Conventional Commits untuk riwayat yang jelas

## 📁 Struktur Repository

```
PesenMakan-Githubflow
│
├── README.md                 # Dokumentasi proyek
├── package.json              # Konfigurasi Node.js
├── CartService.js            # Service keranjang belanja
├── LoginService.js           # Service login/autentikasi
├── PaymentService.js         # Service pembayaran
└── docs
    └── Laporan.pdf           # Laporan lengkap implementasi
```

## 🚀 GitHub Flow Workflow

### 1. **Membuat Branch Fitur**
```bash
git checkout -b feature/nama-fitur
```

### 2. **Mengembangkan Fitur**
- Edit file sesuai kebutuhan
- Commit dengan Conventional Commits format:
  ```bash
  git commit -m "feat(modul): deskripsi singkat"
  git commit -m "fix(modul): deskripsi perbaikan"
  git commit -m "docs(modul): deskripsi dokumentasi"
  ```

### 3. **Push ke Repository**
```bash
git push origin feature/nama-fitur
```

### 4. **Membuat Pull Request**
- Buka GitHub → Compare & Pull Request
- Isi title dan description dengan jelas
- Mendeskripsikan perubahan yang dilakukan

### 5. **Code Review**
- Reviewer memeriksa kode
- Memberikan feedback jika diperlukan
- Approve atau request changes

### 6. **Merge ke Main**
- Setelah approve, klik "Merge Pull Request"
- Pull request tertutup otomatis
- Fitur sudah live di production

## 📝 Conventional Commits Format

Standar format commit yang digunakan:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type:**
- `feat`: Fitur baru
- `fix`: Perbaikan bug
- `docs`: Perubahan dokumentasi
- `style`: Perubahan format kode
- `refactor`: Refactoring kode
- `test`: Penambahan test

**Scope:** Bagian aplikasi yang diubah (cart, login, payment)

**Contoh:**
```
feat(cart): add tax calculation
fix(login): resolve session timeout issue
docs(payment): update payment documentation
```

## 🔐 Branch Protection Rules

Branch `main` dilindungi dengan aturan berikut:

- ✅ Require Pull Request sebelum merge
- ✅ Require code review dari minimal 1 reviewer
- ✅ Require status checks passed
- ✅ Disable force push
- ✅ Disable delete branch

## 📂 Services

### CartService.js
Service untuk mengelola keranjang belanja dengan perhitungan pajak 11%.

```javascript
function calculateTotal(subtotal) {
    const tax = subtotal * 0.11;
    return subtotal + tax;
}
```

### LoginService.js
Service untuk autentikasi user dengan session management.

### PaymentService.js
Service untuk proses pembayaran dan transaction history.

## 🛠️ Cara Menggunakan Repository

### Clone Repository
```bash
git clone https://github.com/411241104-design/PesenMakan-Githubflow.git
cd PesenMakan-Githubflow
```

### Install Dependencies
```bash
npm install
```

### Membuat Feature Branch
```bash
git checkout -b feature/nama-fitur
```

### Commit Changes
```bash
git add .
git commit -m "feat(modul): deskripsi perubahan"
```

### Push ke GitHub
```bash
git push origin feature/nama-fitur
```

### Lihat Git Log
```bash
git log --oneline
git log --graph --oneline --all
```

## 📊 Keuntungan GitHub Flow

1. **Kualitas Kode** - Setiap kode melalui review
2. **Keamanan** - Branch protection mencegah bug ke production
3. **Kolaborasi** - Tim dapat bekerja pada fitur berbeda
4. **Transparency** - Riwayat commit jelas dan mudah dipahami
5. **Recovery** - Mudah melakukan rollback jika ada masalah

## 📞 Kontribusi

Untuk berkontribusi:

1. Fork repository ini
2. Buat branch fitur: `git checkout -b feature/fitur-baru`
3. Commit perubahan: `git commit -m "feat(modul): deskripsi"`
4. Push ke branch: `git push origin feature/fitur-baru`
5. Buat Pull Request

## 📄 Lisensi

Proyek ini adalah bagian dari tugas Ujian Akhir Semester.

---

**Dibuat oleh:** Adryan Izdihar Rafief (411241104)  
**Program Studi:** Teknik Informatika  
**Mata Kuliah:** Rekayasa Perangkat Lunak
