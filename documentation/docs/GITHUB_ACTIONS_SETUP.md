# GitHub Actions CI/CD Setup

Project ini menggunakan GitHub Actions untuk otomasi testing dan deployment dokumentasi.

## Workflows

### 1. Playwright Tests (`playwright.yml`)
**Trigger:** Push/PR ke branch `main` atau `master` dengan perubahan di:
- `app/tests/**`
- `app/helpers/**`
- `playwright.config.ts`
- `package.json`

**Proses:**
1. Install dependencies
2. Install Playwright browsers
3. Run semua test suites
4. Copy test report ke `documentation/static/test-reports/`
5. Commit dan push test reports (dengan `[skip ci]` tag)
6. Upload artifacts (playwright-report, test-results)

### 2. Deploy Docusaurus (`deploy-docs.yml`)
**Trigger:** Push to branch `main`/`master` dengan perubahan di:
- `documentation/**`
- `package.json`

**Proses:**
1. Install dependencies
2. Build Docusaurus
3. Upload build artifacts
4. Deploy ke GitHub Pages

### 3. Auto Deploy with Test Reports (`test-reports-deploy.yml`)
**Trigger:** Push dengan perubahan di:
- `documentation/static/test-reports/**`

**Proses:**
1. Install dependencies
2. Build Docusaurus dengan test reports terbaru
3. Deploy ke GitHub Pages

## Alur Otomasi

```
Push ke main/master
    ↓
├─→ Playwright Tests berjalan
│   ├─→ Tests executed
│   ├─→ Report di-copy ke docs
│   └─→ Commit & push report (triggers test-reports-deploy)
│
├─→ Deploy Docusaurus (jika docs berubah)
│   └─→ Build & Deploy ke GitHub Pages
│
└─→ Auto Deploy with Reports (jika reports berubah)
    └─→ Build & Deploy ke GitHub Pages
```

## Environment Variables

Tidak ada environment variables khusus yang diperlukan. GitHub Actions secara otomatis providing `GITHUB_TOKEN` untuk push dan deploy.

## Important Notes

- `[skip ci]` tag digunakan saat commit test reports untuk menghindari infinite loops
- Artifacts disimpan untuk debugging (retention: 5-30 hari)
- Custom domain: `docu-test.panduanqa.blog`
- Jobs berjalan di `ubuntu-latest`

## Local Testing sebelum Push

Sebelum push ke repository:

```bash
# Run tests locally
pnpm test

# Build documentation
cd documentation && pnpm build

# Preview build
cd documentation && pnpm preview
```

## Troubleshooting

### Test report tidak ter-update di Docusaurus
- Pastikan `playwright.yml` berhasil run tanpa error
- Check GitHub Actions logs
- Verify test reports ada di `documentation/static/test-reports/`

### Deploy gagal
- Check error di GitHub Actions logs
- Verify `CNAME` file di `documentation/static/` sudah benar
- Pastikan branch protection rules tidak block automated commits

### [skip ci] tidak bekerja
- Verifikasi commit message tepat: `[skip ci]`
- Check branch protection rules
