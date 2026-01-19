"use client";

import Link from "next/link";
import { Bookmark, Share2, Car, Bike, Truck } from "lucide-react";
import { Card, CardContent, Badge } from "@/components/ui";
import { cn, formatCurrency, formatRelativeTime, vehicleTypeLabels } from "@/lib/utils";
import { useSavedIntentions } from "@/hooks/use-saved-intentions";
import type { Anuncio, TipoVeiculo } from "@/types";

// Vehicle type icon mapping
const vehicleTypeIcons: Record<TipoVeiculo, typeof Car> = {
  CARRO: Car,
  MOTO: Bike,
  CAMINHAO: Truck,
};

// Vehicle type gradient backgrounds
const vehicleTypeGradients: Record<TipoVeiculo, string> = {
  CARRO: "from-blue-500 to-blue-700",
  MOTO: "from-orange-500 to-orange-700",
  CAMINHAO: "from-green-500 to-green-700",
};

interface IntentionCardProps {
  intention: Anuncio;
}

export function IntentionCard({ intention }: IntentionCardProps) {
  const { isSaved, toggleSave } = useSavedIntentions();
  const saved = isSaved(intention.id);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSave(intention.id);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      await navigator.share({
        title: `Procuro ${intention.veiculo.modeloNome}`,
        text: `Confira esta intenção de compra no TeAchei`,
        url: `${window.location.origin}/intention/${intention.id}`,
      });
    } else {
      await navigator.clipboard.writeText(`${window.location.origin}/intention/${intention.id}`);
    }
  };

  // Format anos display
  const anosDisplay = (() => {
    const anos = intention.veiculo.anos;
    if (!anos || anos.length === 0) return "Qualquer ano";
    if (anos.length === 1) return anos[0].toString();
    const min = Math.min(...anos);
    const max = Math.max(...anos);
    return min === max ? min.toString() : `${min} - ${max}`;
  })();

  // Get vehicle type icon and gradient
  const VehicleIcon = vehicleTypeIcons[intention.tipo] || Car;
  const gradient = vehicleTypeGradients[intention.tipo] || vehicleTypeGradients.CARRO;

  return (
    <Link href={`/intention/${intention.id}`}>
      <Card hoverable className="group h-full">
        {/* Vehicle Icon Area */}
        <div className="relative h-48 overflow-hidden">
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br flex items-center justify-center transition-transform duration-300 group-hover:scale-105",
              gradient
            )}
          >
            <VehicleIcon size={80} className="text-white/30" strokeWidth={1} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          
          {/* Vehicle Type Badge */}
          <Badge variant="default" className="absolute top-3 left-3 bg-white/90 text-foreground">
            {vehicleTypeLabels[intention.tipo]}
          </Badge>

          {/* Actions */}
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={handleSave}
              className={cn(
                "p-2 rounded-full backdrop-blur-sm transition-colors",
                saved 
                  ? "bg-primary text-white" 
                  : "bg-white/20 text-white hover:bg-white/30"
              )}
            >
              <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-colors"
            >
              <Share2 size={18} />
            </button>
          </div>

          {/* Price */}
          {intention.veiculo.precoMaximo && (
            <div className="absolute bottom-3 right-3">
              <span className="bg-white/90 backdrop-blur-sm text-foreground font-bold px-3 py-1 rounded-full text-sm">
                até {formatCurrency(intention.veiculo.precoMaximo)}
              </span>
            </div>
          )}
        </div>

        <CardContent className="space-y-3">
          {/* Title */}
          <div>
            <h3 className="font-bold text-lg text-foreground line-clamp-1">
              {intention.veiculo.marcaNome} {intention.veiculo.modeloNome}
            </h3>
            <p className="text-sm text-muted">
              {anosDisplay}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {intention.veiculo.cores.slice(0, 3).map((cor) => (
              <Badge key={cor} variant="outline" size="sm">
                {cor}
              </Badge>
            ))}
            {intention.veiculo.cores.length > 3 && (
              <Badge variant="outline" size="sm">
                +{intention.veiculo.cores.length - 3}
              </Badge>
            )}
          </div>

          {/* Location & Time */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <div>
                {intention.contato?.localizacao || intention.contato?.cidade ? (
                  <p className="text-sm font-medium text-foreground line-clamp-1">
                    {intention.contato.localizacao || [intention.contato.cidade, intention.contato.estado].filter(Boolean).join(", ")}
                  </p>
                ) : null}
                <p className="text-xs text-muted">
                  {formatRelativeTime(intention.criadoEm)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
