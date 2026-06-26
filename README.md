# EIO Health – AI Healthcare Platform

EIO Health adalah platform kesehatan digital komprehensif yang menyediakan layanan konsultasi medis berbasis Artificial Intelligence (AI), pemetaan fasilitas kesehatan terdekat secara real-time, edukasi medis terpersonalisasi, serta sistem manajemen konten (CMS) untuk admin. 

> Proyek ini dikembangkan sebagai Tugas Akhir Mata Kuliah Rekayasa Perangkat Lunak Program Studi Teknik Informatika, Fakultas Sains dan Teknologi, Universitas Muhammadiyah Kalimantan Timur.

---

## Tim Pengembang (Kelompok 15)

| Nama | Peran |
| --- | --- |
| Muhammad Alliyah Tilla Ilwa Fathami | Project Manager |
| Kamal Ilham | Web Developer |
| Muhammad Rama Fahrezy | Web Developer |
| Muhammad Razky Sakha Khairan | Frontend Designer |

## Fitur Utama

* Konsultasi kesehatan berbasis Artificial Intelligence (AI)
* Pencarian fasilitas kesehatan terdekat secara real-time
* Edukasi kesehatan digital melalui artikel informatif
* Sistem manajemen artikel dan kategori (CMS)
* Manajemen pengguna dan autentikasi
* Dashboard administrator
* Sistem keamanan berbasis JWT Authentication
* Integrasi peta interaktif menggunakan OpenStreetMap

## Tech Stack

### Frontend
* Next.js 16 (App Router)
* React 19
* TypeScript
* Tailwind CSS v4
* Framer Motion

### Backend
* Next.js API Routes
* Prisma ORM
* PostgreSQL (Neon Database)

### Artificial Intelligence
* Groq API

### Authentication & Security
* JSON Web Token (JWT)
* Jose
* Bcrypt

### Library Pendukung
* Leaflet & React Leaflet
* Tiptap Editor
* React Markdown

---

## Struktur Direktori

```text
src/
├── app/
│   ├── (admin)/          # Dashboard Admin
│   ├── (auth)/           # Login & Register
│   ├── (dashboard)/      # Dashboard Pengguna
│   └── api/              # REST API
├── components/
│   ├── dashboard/
│   ├── landing/
│   ├── layout/
│   └── ui/
├── lib/
├── hooks/
└── types/

prisma/
├── schema.prisma
└── seed.ts
```

---

## Persyaratan Sistem

Pastikan perangkat telah terpasang:
* Node.js 18.17 atau versi terbaru
* NPM
* PostgreSQL Database
* Git
* Web Browser Modern

---

## Instalasi Proyek

### 1. Clone Repository
```bash
git clone https://github.com/username/eio-health.git
cd eio-health
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Buat file `.env` pada root project dan sesuaikan nilainya:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/eio_health"

# Authentication
JWT_SECRET="your_super_secret_key"

# AI Services
GROQ_API_KEY="your_groq_api_key"
OPENAI_API_KEY="your_openai_api_key"
```

---

## Konfigurasi Database

**Generate Prisma Client**
```bash
npx prisma generate
```

**Sinkronisasi Database**
```bash
npx prisma db push
```

**Seed Database (Opsional)**
```bash
npx prisma db seed
```

---

## Menjalankan Aplikasi

**Mode Development:**
```bash
npm run dev
```

**Mode Production:**
```bash
npm run build
npm start
```

---

## Akses Aplikasi

| Halaman | URL |
| --- | --- |
| Landing Page | `http://localhost:3000` |
| Dashboard Pengguna | `http://localhost:3000/dashboard` |
| Login Admin | `http://localhost:3000/admin-login` |
| Dashboard Admin | `http://localhost:3000/admin` |

---

## Deployment

Aplikasi dapat dideploy menggunakan platform seperti Vercel, Railway, Render, atau VPS Linux.

**Live Deployment:** [https://ai-healthcare-platform.vercel.app/](https://ai-healthcare-platform.vercel.app/)

---

## Lisensi

Proyek ini dikembangkan untuk keperluan akademik pada Mata Kuliah Rekayasa Perangkat Lunak Program Studi Teknik Informatika Universitas Muhammadiyah Kalimantan Timur.

*© 2026 Kelompok 15 – Teknik Informatika UMKT*
