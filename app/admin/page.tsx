"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BarChart3, Plus, Search } from "lucide-react";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TYPE_LABELS } from "@/lib/constants";
import { useResources } from "@/hooks/use-resources";
import { updateResourceStatus } from "@/lib/resources";
import type { ResourceStatus } from "@/lib/types";

export default function AdminPage() {
  const { resources, ready, refresh } = useResources();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return resources;
    return resources.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q)
    );
  }, [resources, search]);

  const handleStatusChange = (id: string, status: ResourceStatus) => {
    updateResourceStatus(id, status);
    refresh();
  };

  if (!ready) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        Loading admin...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Manage all resources including drafts and in-review items.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/admin/analytics">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Link>
          </Button>
          <Button asChild className="rounded-xl">
            <Link href="/admin/new">
              <Plus className="mr-2 h-4 w-4" />
              New resource
            </Link>
          </Button>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="rounded-xl pl-10"
          placeholder="Search resources..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{resource.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {resource.summary}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{TYPE_LABELS[resource.type]}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={resource.status} />
                    <Select
                      value={resource.status}
                      onValueChange={(v) =>
                        handleStatusChange(resource.id, v as ResourceStatus)
                      }
                    >
                      <SelectTrigger className="h-8 w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="in-review">In Review</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(resource.updatedAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/edit/${resource.id}`}>Edit</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
