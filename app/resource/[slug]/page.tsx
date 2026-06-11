import { ResourceDetail } from "@/components/resource/resource-detail";

interface PageProps {
  params: { slug: string };
}

export default function ResourcePage({ params }: PageProps) {
  return <ResourceDetail slug={params.slug} />;
}
