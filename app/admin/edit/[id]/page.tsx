"use client";

import Link from "next/link";
import { ResourceForm } from "@/components/admin/resource-form";
import { Button } from "@/components/ui/button";
import { useResources } from "@/hooks/use-resources";

interface PageProps {
  params: { id: string };
}

export default function EditResourcePage({ params }: PageProps) {
  const { resources, ready } = useResources();
  const resource = resources.find((r) => r.id === params.id);

  if (!ready) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        Loading resource...
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="rounded-xl border border-dashed p-12 text-center">
        <p className="text-lg font-medium">Resource not found</p>
        <Button asChild className="mt-4">
          <Link href="/admin">Back to admin</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Resource</h1>
        <p className="mt-1 text-muted-foreground">{resource.title}</p>
      </div>
      <ResourceForm initial={resource} />
    </div>
  );
}
