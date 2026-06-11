# Product Requirements Document — Curriculum Studio

**Author:** Built for aiEDU application  
**Status:** Phase 1 prototype  
**Last updated:** June 2026

---

## 1. Problem

aiEDU distributes AI-literacy curriculum through a public-facing website that functions as a marketing portal rather than a structured content system. Educators cannot search or filter by grade band, topic, duration, or audience. Resources lack consistent metadata. The Programs team updates content by editing web pages directly — there is no draft/review/publish workflow and no analytics on what educators actually use.

## 2. Users

| User | Need |
|------|------|
| **Educator** | Find classroom-ready AI literacy materials quickly; save favorites |
| **Programs team member** | Create, tag, review, and publish resources without touching website code |
| **Admin / leadership** | See which resources are popular; identify metadata gaps |

## 3. Jobs to be done

- *When* I'm planning a unit on AI ethics, *I want* to filter resources by topic and grade, *so I* can pick something that fits my class in one session.
- *When* I'm adding a new lesson, *I want* AI to suggest metadata from raw text, *so I* spend less time tagging and more time reviewing content quality.
- *When* a resource isn't ready, *I want* to keep it in draft, *so* educators never see unfinished material.

## 4. Requirements

### Must have (Phase 1)

- [x] Public catalog showing **published** resources only
- [x] Search (title, summary, topics) + filters (type, grade, topic, audience, duration)
- [x] Shareable filter state in URL query params
- [x] Resource detail pages with markdown description and materials list
- [x] "My Collection" via localStorage (no login)
- [x] Admin passcode gate + resource table (all statuses)
- [x] CRUD forms with status workflow: draft → in-review → published
- [x] AI metadata assist panel with **human-in-the-loop** apply step
- [x] Mock analytics dashboard
- [x] `/process` exhibit page documenting scope decisions
- [x] Mobile-responsive, accessible UI
- [x] Deploy to Vercel

### Should have (Phase 2)

- [ ] Supabase Postgres persistence
- [ ] Google for Education SSO + RBAC
- [ ] Real LLM structured-output metadata generation
- [ ] CSV import from team spreadsheets/Airtable
- [ ] Real download/launch URLs to PDFs and external tools

### Won't have (this prototype)

- Multi-tenant org support
- Version history / diff view
- Comments or review assignments
- LMS integrations (Canvas, Google Classroom)
- Usage tracking / analytics beyond mock counts

## 5. Data model

```
Resource {
  id, slug
  title, summary, description (markdown)
  type: lesson | course | project | quick-guide | activity | framework
  gradeBand: elementary | middle | high | all
  topics: string[]
  audience: educator | student | family
  duration: string
  materials: string[]
  status: draft | in-review | published
  updatedAt, viewCount, downloadCount
}
```

## 6. Phasing rationale

**Phase 1** validates the core UX — can educators find content? can admins manage a workflow? — without backend infrastructure. JSON seed + localStorage is explicitly labeled as demo persistence so reviewers understand the tradeoff.

**Phase 2** adds real persistence and auth once stakeholder interviews confirm the schema and workflow match how the Programs team actually operates (likely spreadsheet-driven).

This phasing is deliberate scoping discipline: ship a credible demo in a weekend; defer infrastructure until problem-solution fit is validated.

## 7. Success metrics (if deployed for real)

| Metric | Target |
|--------|--------|
| Time to find a relevant resource | < 60 seconds |
| Resources with complete metadata | > 90% |
| Admin time to publish new resource | < 15 minutes (with AI assist) |
| Educator return visits / collection saves | Baseline TBD with real auth |

## 8. Open questions for stakeholders

1. What fields does the Programs team track in Airtable/spreadsheets today?
2. Who approves publish — single editor or multi-step review?
3. Do educators need accounts, or is anonymous browse + optional save enough?
4. Should "duration" reflect teacher prep time, class time, or unit length?
5. What external URLs/files should "Download / Launch" point to?
6. Are view/download analytics available from current hosting, or net-new?

## 9. AI assist design

The metadata generation feature uses a **human-in-the-loop** pattern:

1. Admin pastes raw lesson text
2. System suggests title, summary, type, grade, topics, duration
3. Admin reviews, edits, and explicitly clicks "Apply to form"
4. Admin saves — AI never writes directly to the catalog

Phase 1 uses deterministic keyword matching (mock mode). Phase 2 would use structured LLM output with audit logging.

## 10. Build log (summary)

| Step | Approach |
|------|----------|
| PRD | Written with AI assist, refined for aiEDU context |
| Scaffold | Next.js 14 + shadcn/ui via Cursor |
| Seed data | 16 paraphrased resources inspired by public aiEDU catalog |
| AI panel | Mock API route + editable preview before apply |
| Deploy | Vercel, no env vars required for Phase 1 |

---

_See [README.md](README.md) for setup instructions and [/process](https://aiedu-test-two.vercel.app/process) for the live exhibit page._
