"use client";

import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui";
import Link from "next/link";

export default function FavoritesPage() {
  // TODO: Implement favorites functionality
  const favorites: never[] = [];

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <div className="w-20 h-20 bg-muted/10 rounded-full flex items-center justify-center mb-6">
          <Bookmark className="text-muted" size={32} />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">
          Nenhum favorito ainda
        </h2>
        <p className="text-muted text-center max-w-sm mb-6">
          Salve intenções de compra para encontrá-las facilmente depois.
        </p>
        <Link href="/">
          <Button>Explorar intenções</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-foreground mb-6">
        Salvos
      </h1>
      {/* TODO: Implement favorites grid */}
    </div>
  );
}



