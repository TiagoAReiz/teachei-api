"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Eye, MessageCircle, Share2 } from "lucide-react";
import { Card, CardContent, Badge, Avatar } from "@/components/ui";
import { cn, formatCurrency, formatRelativeTime, vehicleTypeLabels } from "@/lib/utils";
import type { Anuncio } from "@/types";

interface IntentionCardProps {
  intention: Anuncio;
  onSave?: (id: string) => void;
  isSaved?: boolean;
}

export function IntentionCard({ intention, onSave, isSaved = false }: IntentionCardProps) {
  const [saved, setSaved] = useState(isSaved);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(!saved);
    onSave?.(intention.id);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      await navigator.share({
        title: `Procuro ${intention.veiculoInfo.modelo}`,
        text: `Confira esta intenção de compra no TeAchei`,
        url: `${window.location.origin}/intention/${intention.id}`,
      });
    } else {
      await navigator.clipboard.writeText(`${window.location.origin}/intention/${intention.id}`);
    }
  };

  // Generate a placeholder vehicle image URL
  const vehicleImage = `https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop`;

  return (
    <Link href={`/intention/${intention.id}`}>
      <Card hoverable className="group h-full">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundImage: `url(${vehicleImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Vehicle Type Badge */}
          <Badge variant="default" className="absolute top-3 left-3 bg-primary text-white">
            {vehicleTypeLabels[intention.veiculoInfo.tipoVeiculo]}
          </Badge>

          {/* Actions */}
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={handleSave}
              className={cn(
                "p-2 rounded-full backdrop-blur-sm transition-colors",
                saved 
                  ? "bg-error text-white" 
                  : "bg-white/20 text-white hover:bg-white/30"
              )}
            >
              <Heart size={18} fill={saved ? "currentColor" : "none"} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-colors"
            >
              <Share2 size={18} />
            </button>
          </div>

          {/* Price */}
          {intention.precoMaximo && (
            <div className="absolute bottom-3 right-3">
              <span className="bg-white/90 backdrop-blur-sm text-foreground font-bold px-3 py-1 rounded-full text-sm">
                até {formatCurrency(intention.precoMaximo)}
              </span>
            </div>
          )}
        </div>

        <CardContent className="space-y-3">
          {/* Title */}
          <div>
            <h3 className="font-bold text-lg text-foreground line-clamp-1">
              {intention.veiculoInfo.marca} {intention.veiculoInfo.modelo}
            </h3>
            <p className="text-sm text-muted">
              {intention.anoMinimo && intention.anoMaximo
                ? `${intention.anoMinimo} - ${intention.anoMaximo}`
                : intention.anoMinimo || intention.anoMaximo || "Qualquer ano"}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {intention.cores.slice(0, 3).map((cor) => (
              <Badge key={cor} variant="outline" size="sm">
                {cor}
              </Badge>
            ))}
            {intention.cores.length > 3 && (
              <Badge variant="outline" size="sm">
                +{intention.cores.length - 3}
              </Badge>
            )}
          </div>

          {/* User Info & Stats */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <Avatar
                src={intention.usuario?.avatarUrl}
                fallback={intention.usuario?.nome}
                size="sm"
              />
              <div>
                <p className="text-sm font-medium text-foreground line-clamp-1">
                  {intention.usuario?.nome || "Usuário"}
                </p>
                <p className="text-xs text-muted">
                  {formatRelativeTime(intention.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-muted">
              <span className="flex items-center gap-1 text-xs">
                <Eye size={14} />
                {intention.visualizacoes}
              </span>
              <span className="flex items-center gap-1 text-xs">
                <MessageCircle size={14} />
                {intention.propostas}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}



