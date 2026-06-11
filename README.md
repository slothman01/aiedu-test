# Curriculum Studio — a CMS prototype built for my aiEDU application

Curriculum Studio is a curriculum management system prototype for an AI-literacy education nonprofit. It replaces a static marketing-site approach with a searchable catalog, structured metadata, and a lightweight admin workflow.

**Repository:** [github.com/slothman01/aiedu-test](https://github.com/slothman01/aiedu-test)  
**Live demo:** [aiedu-test-two.vercel.app](https://aiedu-test-two.vercel.app/)  
**Application video:** _(add link after recording)_

Built with **Cursor + Claude**. Estimated build time: ~10 hours (Phase 1).

---

## Problem

Educators looking for AI-literacy classroom material currently navigate a marketing site: resources are scattered across blog posts, PDFs, and standalone pages with no unified catalog, no search, no filtering by grade or time, and no metadata. Internally, the Programs team manages curriculum by editing a website — no draft workflow, no visibility into what's used.

Curriculum Studio prototypes the fix: one structured catalog for educators, one lightweight admin for the team.

## Screenshots

_Add catalog, admin, and AI metadata panel screenshots after deploy._

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **recharts** (analytics dashboard)
- **react-markdown** (resource descriptions)
- **JSON seed** + **localStorage** (demo persistence)

## Features (Phase 1)

### Educator (public)

- `/` — Catalog with search + filters (type, grade, topic, audience, duration); URL-synced for sharing
- `/resource/[slug]` — Detail page with markdown description, materials, related resources
- `/collection` — Saved resources via localStorage (heart icon on cards)

### Admin (demo passcode: `aiedu-demo`)

- `/admin` — Resource table with status workflow (draft → in-review → published)
- `/admin/new` & `/admin/edit/[id]` — Full CRUD with AI metadata assist panel
- `/admin/analytics` — Mock views/downloads dashboard

### Meta

- `/process` — Exhibit page: PRD summary, built vs mocked, evaluation criteria

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin passcode (shown on login screen): `aiedu-demo`

## Demo persistence

Admin edits are stored in **localStorage** on top of `data/seed.json`. Clear site data in your browser to reset. Production would use Postgres + real auth.

## Phase 2 (not built)

- Supabase auth + Postgres persistence
- Real LLM metadata generation (API keys in `.env.example`)
- CSV import from spreadsheets/Airtable

## License

MIT — see [LICENSE](LICENSE)
