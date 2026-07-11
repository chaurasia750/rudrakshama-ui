# IIS Deployment Guide — Rudrakshama Angular Micro-Frontend

## Architecture

```
Shell (Host)  ──→  Admin (Remote via Module Federation)
              ──→  Member (Remote via Module Federation)
```

Single deployment on IIS:
```
https://rudrakshama.com/              → Shell app
https://rudrakshama.com/admin/        → Admin remote
https://rudrakshama.com/member/       → Member remote
```

---

## Prerequisites

1. **IIS installed** — Server Manager → Add Roles → Web Server (IIS)
2. **URL Rewrite Module** — https://www.iis.net/downloads/microsoft/url-rewrite
3. **Node.js 18+** — for building the apps
4. **SSL Certificate** — for HTTPS (Let's Encrypt / purchased)
5. **.NET CLR = No Managed Code** — in Application Pool settings

---

## Step 1: Build All Apps

From the project root (`rudrakshama-ui/`):

```bash
npx nx run-many -t build -p shell,admin,member --configuration staging --skip-nx-cache
```

This creates:
```
dist/
├── shell/browser/     ← Shell (root app)
├── admin/             ← Admin remote (includes remoteEntry.mjs)
└── member/            ← Member remote (includes remoteEntry.mjs)
```

---

## Step 2: IIS Folder Structure

Physical path (Plesk): `C:\Inetpub\vhosts\rudrakshama.com\httpdocs\`

```
httpdocs/
├── web.config                    ← ROOT web.config (from scripts/iis-web.config)
├── index.html                    ← Shell
├── main-XXXXXXXX.js              ← Shell JS
├── styles-XXXXXXXX.css           ← Shell CSS
├── polyfills-XXXXXXXX.js         ← Shell polyfills
├── favicon.ico                   ← Shell favicon
├── assets/                       ← Shell assets
│
├── admin/
│   ├── web.config                ← Admin SPA rewrite (unique rule name)
│   ├── index.html                ← Admin
│   ├── remoteEntry.mjs           ← Module Federation entry point ⚠️ CRITICAL
│   ├── main.XXXXX.js             ← Admin JS
│   ├── styles.XXXXX.css          ← Admin CSS
│   └── assets/                   ← Admin assets
│
└── member/
    ├── web.config                ← Member SPA rewrite (unique rule name)
    ├── index.html                ← Member
    ├── remoteEntry.mjs           ← Module Federation entry point ⚠️ CRITICAL
    ├── main.XXXXX.js             ← Member JS
    ├── styles.XXXXX.css          ← Member CSS
    └── assets/                   ← Member assets
```

---

## Step 3: Copy Files to IIS

### Option A: PowerShell Commands (run on server via RDP)

```powershell
# Define paths
$dist = "D:\Projects\Rudrakshama\rudrakshama-ui\dist"
$httpdocs = "C:\Inetpub\vhosts\rudrakshama.com\httpdocs"

# 1. Shell → httpdocs root
New-Item -Path $httpdocs -ItemType Directory -Force
Copy-Item -Path "$dist\shell\browser\*" -Destination "$httpdocs\" -Recurse -Force

# 2. Admin → httpdocs/admin/
New-Item -Path "$httpdocs\admin" -ItemType Directory -Force
Copy-Item -Path "$dist\admin\*" -Destination "$httpdocs\admin\" -Recurse -Force

# 3. Member → httpdocs/member/
New-Item -Path "$httpdocs\member" -ItemType Directory -Force
Copy-Item -Path "$dist\member\*" -Destination "$httpdocs\member\" -Recurse -Force

# 4. Root web.config (overwrite shell's if present)
Copy-Item -Path "D:\Projects\Rudrakshama\rudrakshama-ui\scripts\iis-web.config" `
          -Destination "$httpdocs\web.config" -Force
```

### Option B: Using Deploy Script (local machine)

```bash
npm run deploy:stage
```

Default target: `D:\inetpub\rudrakshama` (change in `scripts/deploy-stage.js`)

---

## Step 4: web.config Files

### 3 web.config files, 3 unique rule names:

| Location | Rule Name | Rewrites To | Purpose |
|----------|-----------|-------------|---------|
| `httpdocs/web.config` | `Shell Fallback` | `/index.html` | Shell SPA routing. Skips `/admin/` and `/member/` paths |
| `httpdocs/admin/web.config` | `Admin Angular Routes` | `/admin/index.html` | Admin SPA routing |
| `httpdocs/member/web.config` | `Member Angular Routes` | `/member/index.html` | Member SPA routing |

### Root web.config (`scripts/iis-web.config`)

Handles:
- SPA fallback for shell (skips `/admin/*` and `/member/*`)
- `.mjs` MIME type (required for Module Federation)
- CORS headers (required for cross-origin remote loading)
- Compression (gzip/brotli)
- Security headers
- Cache headers (7 days)

### Admin/Member web.config

Each has:
- Unique SPA rewrite rule (different name to avoid IIS conflict)
- `.mjs` MIME type
- CORS headers
- Cache headers

### ⚠️ IMPORTANT: Rule Names Must Be Unique

IIS throws `500.52` error if two web.config files have rules with the same `name` attribute. Always keep:
- Root: `Shell Fallback`
- Admin: `Admin Angular Routes`
- Member: `Member Angular Routes`

---

## Step 5: IIS Site Setup

1. Open **IIS Manager** (`inetmgr`)
2. Right-click **Sites** → **Add Website**

| Field | Value |
|-------|-------|
| Site name | `rudrakshama` |
| Physical path | `C:\Inetpub\vhosts\rudrakshama.com\httpdocs` |
| Binding Type | `https` |
| Host name | `rudrakshama.com` |
| Port | `443` |
| SSL Certificate | Select your certificate |

3. **Application Pool** → Set `.NET CLR Version` to **No Managed Code**

---

## Step 6: Verify Deployment

### Test URLs

| URL | Expected |
|-----|----------|
| `https://rudrakshama.com/` | Shell homepage loads |
| `https://rudrakshama.com/admin` | Admin app loads (via Module Federation) |
| `https://rudrakshama.com/member` | Member app loads (via Module Federation) |
| `https://rudrakshama.com/admin/remoteEntry.mjs` | JS content (not HTML) |
| `https://rudrakshama.com/member/remoteEntry.mjs` | JS content (not HTML) |

### Common Errors & Fixes

#### `403.14 - Forbidden`
- **Cause**: `index.html` not found or default document not configured
- **Fix**: Ensure shell files are at `httpdocs/` root (not inside a `shell/` subfolder)

#### `500.52 - URL Rewrite Module Error` (duplicate rule)
- **Cause**: Two web.config files have rules with same `name`
- **Fix**: Use unique rule names (see table above)

#### `MIME type text/html` (module script error)
- **Cause**: SPA rewrite catching static files and serving `index.html`
- **Fix**: Ensure admin/member have their own `web.config` with `stopProcessing="true"`

#### `CORS error` (remote entry failed to load)
- **Cause**: Missing `Access-Control-Allow-Origin` header
- **Fix**: Ensure root and subfolder web.configs have CORS headers

#### `404 on remoteEntry.mjs`
- **Cause**: Admin/member folder missing or files not copied
- **Fix**: Verify `httpdocs/admin/remoteEntry.mjs` exists

---

## Quick Redeploy Checklist

```
1. Build:    npx nx run-many -t build -p shell,admin,member --configuration staging --skip-nx-cache
2. Copy:     dist/shell/browser/*  → httpdocs/
3. Copy:     dist/admin/*          → httpdocs/admin/
4. Copy:     dist/member/*         → httpdocs/member/
5. Copy:     scripts/iis-web.config → httpdocs/web.config
6. Verify:   remoteEntry.mjs exists in admin/ and member/
7. Test:     https://rudrakshama.com/
```

---

## Source Files Reference

| File | Purpose |
|------|---------|
| `scripts/iis-web.config` | Root web.config template (SPA rewrite + CORS + MIME) |
| `scripts/build-stage.js` | Build all 3 apps for staging |
| `scripts/deploy-stage.js` | Copy dist to IIS folder |
| `apps/admin/public/web.config` | Admin SPA rewrite config |
| `apps/member/public/web.config` | Member SPA rewrite config |
| `apps/member/src/web.config` | Member web.config (build asset source — must match public) |
| `apps/admin/src/web.config` | Admin web.config (build asset source — must match public) |
| `libs/shared/environments/src/remotes.staging.ts` | Remote entry URLs |

---

## Remote Entry URLs (Staging)

Defined in `libs/shared/environments/src/remotes.staging.ts`:

```typescript
export const remoteEntries = {
  admin: { entry: 'https://rudrakshama.com/admin/remoteEntry.mjs' },
  member: { entry: 'https://rudrakshama.com/member/remoteEntry.mjs' },
};
```

Shell loads these URLs at runtime to fetch admin/member modules.
If these URLs return `text/html` instead of `application/javascript`, the MFE won't load.
