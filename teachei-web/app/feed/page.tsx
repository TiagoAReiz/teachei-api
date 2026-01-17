"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MainLayout } from "@/components/layout";
import { IntentionGrid, IntentionFilters } from "@/components/intentions";
import { useInfiniteIntentions } from "@/hooks/use-intentions";
import type { TipoVeiculo, IntentionFilters as Filters } from "@/types";

function FeedContent() {
  const searchParams = useSearchParams();
  
  const filters: Omit<Filters, "page"> = {
    tipoVeiculo: (searchParams.get("tipo") as TipoVeiculo) || undefined,
    search: searchParams.get("search") || undefined,
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteIntentions(filters);

  // Flatten paginated results
  const intentions = data?.pages.flatMap((page) => page.content) ?? [];

  return (
    <div className="p-4 lg:p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Feed de Intenções
        </h1>
        <p className="text-muted">
          Descubra o que compradores estão procurando
        </p>
      </div>

      {/* Filters */}
      <IntentionFilters className="mb-6" />

      {/* Grid */}
      <IntentionGrid
        intentions={intentions}
        isLoading={isLoading}
        onLoadMore={() => fetchNextPage()}
        hasMore={hasNextPage}
        isLoadingMore={isFetchingNextPage}
      />
    </div>
  );
}

function FeedLoading() {
  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6">
        <div className="h-8 w-48 bg-muted/20 rounded animate-pulse mb-2" />
        <div className="h-5 w-72 bg-muted/20 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 bg-muted/20 rounded-2xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default function FeedPage() {
  return (
    <MainLayout>
      <Suspense fallback={<FeedLoading />}>
        <FeedContent />
      </Suspense>
    </MainLayout>
  );
}
