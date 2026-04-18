# GitHub Pages Deployment Setup Guide

## Project Configuration

**GitHub Account**: fredysiswanto  
**Repository**: docu-test  
**Docs URL**: https://fredysiswanto.github.io/docu-test/

## What Was Configured

### 1. Docusaurus Config (`documentation/docusaurus.config.ts`)
- ✅ Updated `title` → "docu-test"
- ✅ Updated `url` → "https://fredysiswanto.github.io"
- ✅ Updated `baseUrl` → "/docu-test/"
- ✅ Updated `organizationName` → "fredysiswanto"
- ✅ Updated `projectName` → "docu-test"
- ✅ Updated GitHub edit URLs to point to correct repo
- ✅ Updated navbar & footer links

### 2. GitHub Actions Workflows

#### `.github/workflows/deploy-docs.yml` (CREATED)
- Builds Docusaurus on every push to main/master
- Deploys to GitHub Pages automatically
- Triggers only on changes to `documentation/`, `package.json`, or workflow file itself
- Uses `peaceiris/actions-gh-pages@v3` for deployment

#### `.github/workflows/playwright.yml` (UPDATED)
- Runs on every push and PR to main/master
- Runs all Playwright tests
- Uploads Playwright report & test results as artifacts
- Changed from `self-hosted` runner to `ubuntu-latest` (can change back if needed)

### 3. GitHub Pages Settings

To finalize setup:
1. Go to: https://github.com/fredysiswanto/docu-test/settings/pages
2. Source: `Deploy from a branch`
3. Branch: `gh-pages` (will be created by workflow)
4. Folder: `/ (root)`
5. Click Save

Docs will be live at: https://fredysiswanto.github.io/docu-test/

## How It Works

### When You Push Code
1. GitHub Actions triggers the workflows
2. **Playwright workflow**: Runs tests, uploads artifacts
3. **Deploy workflow**: Builds Docusaurus, publishes to `gh-pages` branch
4. GitHub Pages serves the `gh-pages` branch at the public URL

### Monitoring
- Check `.github/workflows/` folder for all workflows
- Go to `Actions` tab in GitHub to see runs & logs
- Artifacts (test reports) are available in each run for 30 days

## Troubleshooting

If deployment fails:
1. Check GitHub Actions logs (click the failed run)
2. Common issues:
   - `pnpm install` failed → check pnpm-lock.yaml
   - `pnpm build` failed → check Docusaurus config & markdown syntax
   - Deploy failed → ensure GitHub Pages is properly configured
3. Check `documentation/build/` is generated correctly

## Next Steps

- [ ] Verify first deployment by pushing a change
- [ ] Test that Docusaurus loads at public URL
- [ ] Configure branch protection rules (optional)
- [ ] Add custom domain (optional, edit CNAME)
