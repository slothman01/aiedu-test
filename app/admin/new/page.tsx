import { ResourceForm } from "@/components/admin/resource-form";

export default function NewResourcePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Resource</h1>
        <p className="mt-1 text-muted-foreground">
          Create a new curriculum resource with optional AI metadata assist.
        </p>
      </div>
      <ResourceForm />
    </div>
  );
}
