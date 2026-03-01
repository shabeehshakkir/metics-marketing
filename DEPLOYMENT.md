# Metics Marketing — Deployment Guide

This document covers everything needed to deploy the Metics website on a production server.

---

## Architecture Overview

The application runs as two Docker containers orchestrated by Docker Compose:

| Container | Image | Role |
|-----------|-------|------|
| `web` | Built from `Dockerfile` | Nginx — serves the static React build and reverse-proxies `/api/` |
| `php` | Built from `docker/php.Dockerfile` | PHP-FPM — handles contact form submissions via PHPMailer |

---

## Prerequisites

On your server, you need:

- **Docker** ≥ 24
- **Docker Compose** ≥ v2
- **Git**
- A domain name pointed at your server (optional, but recommended for production)

### Install Docker (Ubuntu/Debian)

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker
```

Verify:
```bash
docker --version
docker compose version
```

---

## Option A — Deploy by Building from Source (Recommended)

Use this when deploying directly from a cloned repository.

### 1. Clone the repository

```bash
git clone https://github.com/shabeehshakkir/metics-marketing.git
cd metics-marketing
```

### 2. Create and configure the `.env` file

```bash
cp .env.example .env
nano .env
```

Fill in your SMTP details:

```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=sales@metics.org
SMTP_PASSWORD=your_password_here
SMTP_FROM=sales@metics.org
SMTP_AUTH=on
SMTP_TLS=on
SMTP_STARTTLS=off
```

> [!IMPORTANT]
> If you use **port 465**, set `SMTP_STARTTLS=off` — port 465 uses implicit TLS (SMTPS).
> If you use **port 587**, set `SMTP_STARTTLS=on` and `SMTP_TLS=off`.

### 3. Build and start

```bash
docker compose up -d --build
```

The site will be live on **port 8080** by default.

### 4. Verify containers are running

```bash
docker compose ps
```

Both `web` and `php` should show `Up`.

---

## Option B — Deploy Using Pre-built Images from GHCR

Use this for the fastest deploys — no build step needed. Images are automatically built and pushed to GitHub Container Registry (GHCR) on every push to `master`.

### 1. Authenticate with GHCR

```bash
echo YOUR_GITHUB_PAT | docker login ghcr.io -u shabeehshakkir --password-stdin
```

> You need a GitHub Personal Access Token (PAT) with `read:packages` permission.

### 2. Create a project directory and configure `.env`

```bash
mkdir metics && cd metics
curl -O https://raw.githubusercontent.com/shabeehshakkir/metics-marketing/master/.env.example
cp .env.example .env
nano .env   # Fill in your SMTP credentials
```

Also download the production compose file:
```bash
curl -O https://raw.githubusercontent.com/shabeehshakkir/metics-marketing/master/docker-compose.prod.yml
```

### 3. Pull and start

```bash
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

The site runs on **port 80** with this compose file.

---

## Changing the Exposed Port

Edit `docker-compose.yml` (or `docker-compose.prod.yml`) and change the `web` service ports:

```yaml
ports:
  - "80:80"    # Port 80 (standard HTTP)
```

Then restart:
```bash
docker compose up -d
```

---

## Updating to a New Version

```bash
git pull origin master

# If PHP/Docker files changed, rebuild:
docker compose up -d --build

# If only api/contact.php changed (no rebuild needed):
docker compose restart php
```

---

## SMTP Configuration Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `SMTP_HOST` | SMTP server hostname | `smtp.hostinger.com` |
| `SMTP_PORT` | SMTP port | `465` or `587` |
| `SMTP_USER` | SMTP login username | `sales@metics.org` |
| `SMTP_PASSWORD` | SMTP password | `your_password` |
| `SMTP_FROM` | Sender email address | `sales@metics.org` |
| `SMTP_AUTH` | Enable SMTP auth | `on` |
| `SMTP_TLS` | Implicit TLS (port 465) | `on` / `off` |
| `SMTP_STARTTLS` | STARTTLS (port 587) | `on` / `off` |

### Common Provider Settings

| Provider | Host | Port | TLS | STARTTLS |
|----------|------|------|-----|----------|
| Hostinger | `smtp.hostinger.com` | `465` | `on` | `off` |
| SendGrid | `smtp.sendgrid.net` | `587` | `off` | `on` |
| Brevo | `smtp-relay.brevo.com` | `587` | `off` | `on` |
| AWS SES | `email-smtp.<region>.amazonaws.com` | `587` | `off` | `on` |
| Gmail (App PW) | `smtp.gmail.com` | `587` | `off` | `on` |

---

## Useful Commands

```bash
# View running containers
docker compose ps

# View logs (web)
docker compose logs --tail 50 web

# View logs (PHP/email errors)
docker compose logs --tail 50 php

# Restart all services
docker compose restart

# Stop everything
docker compose down

# Stop and remove volumes
docker compose down -v
```

---

## Testing Email Delivery

After deployment, you can test the contact form API directly:

```bash
curl -X POST http://YOUR_SERVER_IP:8080/api/contact.php \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@yourcompany.com",
    "company": "Test Corp",
    "role": "Manager",
    "size": "10-50",
    "packages": "10-50",
    "message": "Testing email delivery"
  }'
```

**Expected response:**
```json
{"ok":true,"message":"Your message has been sent. We will be in touch soon."}
```

If you get a `500` error, check the PHP logs:
```bash
docker compose logs php
```

---

## GitHub Actions CI/CD

The repository includes a GitHub Actions workflow (`.github/workflows/docker.yml`) that automatically builds and pushes both Docker images to GHCR on every push to `master`:

- `ghcr.io/shabeehshakkir/metics-marketing-web:latest`
- `ghcr.io/shabeehshakkir/metics-marketing-php:latest`

No manual action required — just push to `master` and pull the new images on your server.
