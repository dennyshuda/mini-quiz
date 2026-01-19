# 🚀 Mini Quiz Online Platform

Aplikasi platform kuis berbasis web yang modern, responsif, dan elegan. Dibangun menggunakan **React Router v7** (Vite-based).

---

## 🛠️ Tech Stack

- **Framework:** React Router v7
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** @tabler/icons-react
- **HTTP Client:** Axios
- **State Management:** React Router Loaders & Actions (Native Data Flow)

---

## 📁 Struktur Folder

```text
├── app/              # Entry point aplikasi, konfigurasi routing, dan layout utama
├── components/       # UI Components
├── interfaces/       # Kontrak data (TypeScript Interfaces/Types) untuk standarisasi objek
├── lib/              # Konfigurasi library eksternal
├── utils/            # Helper functions
└── public/           # Aset statis
```

## 💻 Getting Started

### Clone project

```bash
# HTTPS
git clone https://github.com/dennyshuda/mini-quiz.git

or

# SSH

git clone git@github.com:dennyshuda/mini-quiz.git

cd quiz-app
```

### Installation

```bash

# Install dependencies
npm install

# Setup env (pastikan telah mengisi variabel di .env)
cp .env.example .env

# Jalankan server development
npm run dev
```

Aplikasi bakal berjalan di `http://localhost:5173`.

## 🛠️ Keputusan Teknis Penting

### React Router v7

- Alasan: Memilih React Router v7 karena merupakan evolusi dari Remix yang menggabungkan kemampuan Client-side dan Server-side secara built-in.

- Fitur Utama: Memanfaatkan fitur Loader untuk pre-fetching data dan Action sebagai State Management bawaan untuk menangani mutasi data (Form Submission) tanpa perlu library tambahan seperti Redux atau Zustand.

### Tailwind CSS

- Tailwind CSS: Memberikan kecepatan dalam development dan fleksibilitas kustomisasi penuh melalui sistem utilitas.

- `clsx`: Digunakan untuk mengelola pengkondisian class (Conditional Classes) agar logika tampilan menjadi lebih readable (misal: perubahan warna timer saat kritis).

- `tailwind-merge`: Digunakan untuk menghindari conflict antar class Tailwind saat melakukan penggabungan atau penimpaan class (override) pada komponen yang reusable.

### TypeScript

- Alasan: Menggunakan TypeScript untuk menghindari runtime error yang sulit dideteksi dan meningkatkan produktivitas melalui autocomplete.

- Integrasi: Memanfaatkan fitur Type Safety bawaan React Router v7 pada Loader dan Action (menggunakan tipe Route.ActionArgs dan Route.LoaderArgs) sehingga aliran data dari server ke UI terjamin konsistensinya.

### Axios

- Alasan: Memilih Axios dibandingkan Fetch API karena dukungannya yang lebih baik terhadap interceptor (untuk penyisipan token otomatis), penanganan error, serta pembatalan request
