import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProcessPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <p className="text-sm font-medium text-primary">Application exhibit</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          How Curriculum Studio was built
        </h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Curriculum Studio is a CMS prototype built for my aiEDU application — a
          structured catalog and lightweight admin workflow replacing a static
          marketing-site approach to curriculum distribution.
        </p>
      </div>

      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>Problem statement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-muted-foreground">
          <p>
            Educators looking for AI-literacy classroom material currently navigate a
            marketing site: resources are scattered across blog posts, PDFs, and
            standalone pages with no unified catalog, no search, no filtering by grade
            or time, and no metadata.
          </p>
          <p>
            Internally, the Programs team manages curriculum by editing a website — no
            draft workflow, no visibility into what&apos;s used. Curriculum Studio
            prototypes the fix: one structured catalog for educators, one lightweight
            admin for the team.
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>What was built vs. mocked</CardTitle>
          <CardDescription>
            Phase 1 is shippable alone; Phase 2 deferred by design.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Educator catalog + search/filters</TableCell>
                <TableCell>Built</TableCell>
                <TableCell>URL-synced filters, published-only view</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>My Collection</TableCell>
                <TableCell>Mocked</TableCell>
                <TableCell>localStorage; production = Google for Education SSO</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Admin CRUD + status workflow</TableCell>
                <TableCell>Built</TableCell>
                <TableCell>draft → in-review → published</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Data persistence</TableCell>
                <TableCell>Mocked</TableCell>
                <TableCell>localStorage overlay on JSON seed</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Admin auth</TableCell>
                <TableCell>Mocked</TableCell>
                <TableCell>Demo passcode; production = RBAC</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>AI metadata generation</TableCell>
                <TableCell>Mocked</TableCell>
                <TableCell>Keyword-based; human-in-the-loop apply step</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Analytics dashboard</TableCell>
                <TableCell>Mocked</TableCell>
                <TableCell>Seed view/download counts</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Download / Launch links</TableCell>
                <TableCell>Mocked</TableCell>
                <TableCell>Toast placeholder for external assets</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>Evaluation criteria</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>Can an educator find a relevant resource in under 60 seconds?</li>
            <li>Does the admin workflow support draft → review → publish?</li>
            <li>Does AI metadata assist reduce tagging effort without removing human review?</li>
            <li>Is the demo honest about what&apos;s production-ready vs. prototyped?</li>
            <li>Would this integrate with aiEDU&apos;s existing content ops (spreadsheets, Airtable)?</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>What I&apos;d do with real stakeholder access</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-muted-foreground">
          <p>
            Interview Programs team on their Airtable/spreadsheet workflow and map fields
            to the Resource schema. Pilot CSV import (Phase 2) with their actual column
            names.
          </p>
          <p>
            Shadow educators searching for materials today; validate filter dimensions
            and whether &quot;duration&quot; or &quot;implementation model&quot; matters
            more than topic tags.
          </p>
          <p>
            Replace passcode auth with Google for Education SSO and role-based access
            (viewer / editor / publisher). Move persistence to Postgres via Supabase.
          </p>
          <p>
            Connect real LLM metadata generation with structured output and audit logs
            for compliance review.
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>PRD & build artifacts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-muted-foreground">
            Full product requirements document: <code className="text-sm">PRD.md</code> in
            the repository root.
          </p>
          <p className="text-muted-foreground">
            Built with Cursor + Claude. Estimated build time: ~10 hours (Phase 1).
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-xl border-dashed">
        <CardHeader>
          <CardTitle>Application video</CardTitle>
          <CardDescription>Embed link added after recording</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex aspect-video items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
            Video embed placeholder — add YouTube/Vimeo URL here
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
