# Curriculum Studio — a CMS prototype built for my aiEDU application

Curriculum Studio is a curriculum management system prototype for an AI-literacy education nonprofit. It replaces a static marketing-site approach with a searchable catalog, structured metadata, and a lightweight admin workflow.

**Repository:** [github.com/slothman01/aiedu-test](https://github.com/slothman01/aiedu-test)  
**Live demo:** [curriculum-studio.vercel.app](https://curriculum-studio.vercel.app/)  
**Also:** [aiedu-test-two.vercel.app](https://aiedu-test-two.vercel.app/) (previous deploy)  
**Application video:** [Loom walkthrough](https://www.loom.com/share/b80eab28497d4684a1feed7c7f24e616) · also embedded on [/process](https://curriculum-studio.vercel.app/process)

Built with **Cursor + Claude**. Estimated build time: ~10 hours (Phase 1).

## Loom walkthrough script (~4 min)

Use a **fresh incognito window** so admin login and collection start clean. Dismiss the demo banner with **X** before recording.

| Step | Route | What to show |
|------|-------|--------------|
| 1 | `/` | Hero, search **deepfake**, filter by grade, open a resource |
| 2 | `/resource/...` | Metadata chips, markdown content, **Download / Launch** toast |
| 3 | `/` | Heart-save a resource → **My Collection** |
| 4 | `/collection` | Saved card with pink heart |
| 5 | `/admin` | Passcode **`aiedu-demo`** → dashboard, change draft → **published** |
| 6 | `/admin/new` | **Load sample text** → **Generate metadata** → **Apply to form** |
| 7 | `/admin/analytics` | Mock charts (optional, 30 sec) |
| 8 | `/process` | Built vs mocked table, evaluation criteria |

After recording: link is in README and embedded on `/process`.

---

## Problem

Educators looking for AI-literacy classroom material currently navigate a marketing site: resources are scattered across blog posts, PDFs, and standalone pages with no unified catalog, no search, no filtering by grade or time, and no metadata. Internally, the Programs team manages curriculum by editing a website — no draft workflow, no visibility into what's used.

Curriculum Studio prototypes the fix: one structured catalog for educators, one lightweight admin for the team.

## Screenshots

Capture after deploy and add to `public/screenshots/`:

- `catalog.png` — hero + resource grid with filters
- `admin.png` — resource table with status workflow
- `ai-metadata.png` — admin edit page with AI assist panel

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
