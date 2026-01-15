"use client";

import { useSearchParams } from "next/navigation";
import { IntentionGrid, IntentionFilters } from "@/components/intentions";
import { useInfiniteIntentions } from "@/hooks/use-intentions";
import type { TipoVeiculo, IntentionFilters as Filters } from "@/types";

export default function HomePage() {
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



