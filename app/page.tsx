import { Suspense } from "react";
import { CatalogPage } from "@/components/catalog/catalog-page";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="py-16 text-center text-muted-foreground">
          Loading catalog...
        </div>
      }
    >
      <CatalogPage />
    </Suspense>
  );
}
