# Stankings Group

The official website for [stankings.com](https://stankings.com) — the institutional homepage of Stankings Group and its ecosystem of companies.

## Getting Started

```bash
cp .env.example .env.local
# Add your Supabase URL and anon key to .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase Auth (Member Access)

Institutional documents (`/library`, `/constitution`) require a verified member account.

1. Create a [Supabase](https://supabase.com) project (or use an existing one).
2. Copy `.env.example` to `.env.local` and set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. In Supabase Dashboard → **Authentication → URL Configuration**:
   - Site URL: `http://localhost:3000` (dev) or `https://stankings.com` (prod)
   - Redirect URLs: `http://localhost:3000/auth/callback`, `https://stankings.com/auth/callback`
4. Enable **Confirm email** under Authentication → Providers → Email.

## Structure

- **Homepage** — Mission, vision, companies, live platforms, pillars
- **Companies** — Individual pages for each Center of Excellence
- **Member Access** (`/members`) — Public info about institutional documents
- **The Stankings Library** (`/library`) — Members only, email verified
- **Constitution** (`/constitution`) — Members only, email verified

## Live Platforms

- [yike.ng](https://yike.ng) — Marketplace
- [bamsignal.com](https://bamsignal.com) — Relationships & community
- [bayright.com](https://bayright.com) — Financial infrastructure

## Build

```bash
npm run build
npm start
```
