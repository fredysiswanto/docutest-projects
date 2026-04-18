# Kontribusi & Workflow Pengembangan

Dokumen ini berisi detail lengkap cara bekerja di repo **docu-test**: struktur project, cara menjalankan test, update dokumentasi, dan alur
kontribusi.

---

## 1. Struktur Direktori Singkat

- `app/`
  - `tests/api/` – API tests.
  - `tests/ui/` – UI tests (admin, client, dsb.).
  - `helpers/` – helper/reusable functions untuk tests.
- `documentation/`
  - `docs/` – konten dokumentasi (MDX).
  - `blog/` – blog/release notes.
  - `src/` – halaman & komponen kustom.
  - `static/` – assets statis (img, test-reports, dsb.).
- `playwright.config.ts` – konfigurasi Playwright.
- `.github/` – GitHub Actions workflows.
- `bitbucket-pipelines.yml` – Bitbucket Pipelines config.

---

## 2. Setup Lingkungan

Prasyarat:

- Node.js (LTS disarankan)
- pnpm

Instal dependensi monorepo:

```bash
pnpm install
```

Environment variables:

- Lihat `.env.example`, lalu buat `.env` di root:

```bash
cp .env.example .env
# Edit isi sesuai kebutuhan (BASE_URL_ADMIN, CLIENT_BASE_URL, dll.)
```

`.env` sudah di-ignore oleh git.

---

## 3. Menjalankan Test (Playwright)

Tests ada di `app/tests/` dan dijalankan dari root.

Script penting di `package.json`:

```bash
# Semua tests
pnpm test

# UI mode (debug lebih enak)
pnpm test:ui

# API tests saja
pnpm test:api

# UI admin
pnpm test:ui-admin

# UI client
pnpm test:ui-client
```

Struktur umum:

- `app/tests/api/` – endpoint & data validation.
- `app/tests/ui/` – user flow di browser.
- `app/helpers/` – setup/teardown, utilities, assertions umum.

Report Playwright biasanya ada di `playwright-report/` atau via script khusus (lihat `package.json`).

---

## 4. Menjalankan & Mengelola Dokumentasi (Docusaurus)

Jalankan dari folder `documentation/`:

```bash
# Dev server (hot reload)
cd documentation
pnpm start

# Build static site
cd documentation
pnpm build

# Preview hasil build
cd documentation
pnpm serve
```

Konten utama:

- `documentation/docs/intro.mdx` – halaman intro.
- `documentation/docs/tutorial-basics/` – tutorial dasar.
- `documentation/docs/tutorial-extras/` – topik lanjutan.

Silakan tambah folder/halaman sesuai kebutuhan, misalnya:

- `documentation/docs/features/` – dokumentasi fitur per modul.
- `documentation/docs/user-guide/` – panduan untuk user/QA.

Sesuaikan navigasi di `documentation/sidebars.ts` ketika menambah halaman baru.

---

## 5. Alur Kerja: Test ⇄ Dokumentasi

Tujuan utama repo ini: setiap fitur yang dites, **punya dokumentasi yang baik**.

### 5.1 Tambah / Update Test

1. Tambah file baru di `app/tests/ui/` atau `app/tests/api/`.
2. Gunakan nama file yang merepresentasikan fitur, misalnya `login.spec.ts`, `payment.spec.ts`.
3. Pastikan scenario mencerminkan user flow nyata (precondition → actions → assertions).

### 5.2 Tambah / Update Dokumentasi Fitur

1. Buat file MDX di `documentation/docs/features/<nama-fitur>.mdx` (atau struktur yang disepakati):

```mdx
---
title: Login Feature
description: User login flow and behavior
---

## Overview

Deskripsi singkat fitur login, tujuan bisnis, dsb.

## User Flow

Langkah-langkah yang dilakukan user.

## Test Coverage

Link ke test file: [login.spec.ts](../../../app/tests/ui/login.spec.ts)

## Screenshots / Examples

(Opsional) screenshot atau contoh dari test.
```

2. Tambah entry ke halaman indeks fitur (misalnya `features/index.mdx` atau `intro.mdx`).
3. Update `sidebars.ts` jika perlu supaya fitur muncul di menu.

### 5.3 Verifikasi Sebelum Push / PR

Sebelum push:

```bash
# Jalanin tests
pnpm test

# Lint & format
pnpm lint:check
pnpm lint:fix
pnpm prettier:check
pnpm prettier:format

# Build docs (opsional tapi direkomendasikan)
cd documentation && pnpm build
```

---

## 6. Linting, Formatting, dan Commit Message

Repo ini menggunakan:

- **ESLint + Prettier** – kualitas & konsistensi kode.
- **Husky + Commitlint** – enforce conventional commits.

Perintah umum:

```bash
# Lint
pnpm lint:check
pnpm lint:fix

# Format
pnpm prettier:check
pnpm prettier:format
```

Format commit yang valid (conventional commits):

```bash
# Contoh benar
git commit -m "feat: add login test and docs"
git commit -m "fix: correct typo in docs"
git commit -m "docs: update readme"
git commit -m "test: add edge case for payment"

# Contoh salah (akan ditolak commitlint)
git commit -m "add stuff"      # ❌ tidak ada type
git commit -m "Added login"    # ❌ format tidak sesuai
```

---

## 7. Alur Kontribusi (Pull Request)

1. **Buat branch baru**

```bash
git checkout -b feat/nama-fitur
```

2. **Develop & Test**

- Tambah/ubah tests di `app/tests/`.
- Tambah/ubah dokumentasi di `documentation/docs/`.
- Jalankan `pnpm test` + lint/format sebelum commit.

3. **Commit & Push**

```bash
git add .
git commit -m "feat: add <deskripsi-singkat>"
git push origin feat/nama-fitur
```

4. **Buat Pull Request**

Di deskripsi PR, jelaskan singkat:

- Fitur apa yang ditambah/diubah.
- File test mana yang dibuat/diubah.
- Halaman dokumentasi mana yang dibuat/diubah.
- Sertakan link ke report/screenshot jika relevan.

5. **Review & Merge**

- Pastikan semua checks (CI) hijau.
- Setelah merge ke branch utama, pipeline akan menjalankan tests dan build docs sesuai konfigurasi CI.

---

## 8. CI / CD (Ringkasan)

### GitHub Actions

- `.github/workflows/playwright.yml`
  - Trigger: push/PR ke `main`/`master`.
  - Job: install deps, install Playwright, jalankan `pnpm test`, upload report.

- `.github/workflows/deploy-docs.yml`
  - Trigger: push ke `main`/`master` untuk file docs.
  - Job: build Docusaurus (`cd documentation && pnpm build`), deploy ke GitHub Pages.

### Bitbucket Pipelines (Experimental)

- `bitbucket-pipelines.yml`
  - Branch `main`/`master`: install deps → jalankan tests → commit test reports → deploy ke Bitbucket Pages.
  - Pull requests: hanya jalankan tests.

Detail environment/secret (token, domain, dsb.) sebaiknya diatur via pengaturan CI masing-masing (GitHub Secrets, Bitbucket Repository
Variables).

---

Jika ada perubahan besar pada workflow atau struktur project, perbarui **README.md** (high level) dan dokumen ini (detail) agar tetap
sinkron.
