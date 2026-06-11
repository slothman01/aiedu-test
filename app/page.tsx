import { Suspense } from "react";
import { CatalogPage } from "@/components/catalog/catalog-page";
import { getPublishedResources } from "@/lib/resources";

export default function Home() {
  const count = getPublishedResources().length;

  return (
    <Suspense
      fallback={
        <div className="space-y-8">
          <div className="aiedu-gradient-soft h-48 animate-pulse rounded-2xl" />
          <p className="text-center text-muted-foreground">
            Loading {count} resources...
          </p>
        </div>
      }
    >
      <CatalogPage />
    </Suspense>
  );
}
