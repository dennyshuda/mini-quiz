# 🚀 Mini Quiz Online Platform - React Router v7

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
.
├── app/
│   ├── components/       # Komponen UI (Timer, Navbar, ProfileCard, dsb)
│   ├── lib/              # Konfigurasi Axios & API Interceptor
│   ├── routes/           # Halaman Utama & Logic (Loaders/Actions)
│   ├── session.server.ts # Manajemen Session & Cookie (Auth)
│   └── root.tsx          # Konfigurasi Global & Global Layout
├── public/               # Asset statis (Logo, Favicon)
├── .env.example          # Contoh variabel environment
└── tailwind.config.ts    # Kustomisasi tema & desain sistem
```

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

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

Install the dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
