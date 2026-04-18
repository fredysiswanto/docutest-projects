# docu-test

Platform untuk menyatukan **Playwright tests** dan **Docusaurus docs** dalam satu monorepo, supaya testing otomatis dan dokumentasi lebih
tercentral dalam satu tempat, serta mudah dalam update jika ada perubahan.

---

## Apa Isi Repo Ini?

- `app/` – Playwright tests (API dan UI) + helpers.
- `documentation/` – Website dokumentasi berbasis Docusaurus.
- `playwright.config.ts` – konfigurasi bersama untuk semua tests.
- `.github/` dan `bitbucket-pipelines.yml` – CI untuk test + deploy docs.

Detail struktur dan alur kerja kontribusi dipindahkan ke [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Quick Start

Prasyarat:

- Node.js (disarankan versi LTS)
- pnpm

Install dependencies:

```bash
pnpm install
```

Jalankan semua Playwright tests:

```bash
pnpm test
```

---

## Dokumentasi

Jalankan Docusaurus secara lokal:

```bash
cd documentation
pnpm start
```

Build static site:

```bash
cd documentation
pnpm build
```

Konten dokumentasi ada di `documentation/docs/`. Integrasi detail antara test ↔ dokumentasi dijelaskan di
[CONTRIBUTING.md](CONTRIBUTING.md).

---

## CI / CD

- GitHub Actions:
  - `.github/workflows/playwright.yml` – untuk menjalankan tests dan simpan laporan.
  - `.github/workflows/deploy-docs.yml` – build dan deploy Docusaurus ke GitHub Pages (jika diaktifkan).
- Bitbucket Pipelines:
  - `bitbucket-pipelines.yml` – jalankan tests dan deploy ke Bitbucket Pages.

Cara kerja lengkap CI, struktur tests, linting, dan konvensi commit ada di [CONTRIBUTING.md](CONTRIBUTING.md).
