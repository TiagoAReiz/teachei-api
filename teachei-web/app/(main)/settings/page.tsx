"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Mail, Phone, Instagram, Facebook } from "lucide-react";
import { Button, Input, Card, CardContent } from "@/components/ui";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/components/ui/toast";

const profileSchema = z.object({
  nome: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  whatsapp: z.string()
    .regex(/^$|^\+?[1-9]\d{10,14}$/, "Use formato internacional: +5511999998888")
    .optional()
    .or(z.literal("")),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  bio: z.string().max(500, "Bio deve ter no máximo 500 caracteres").optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function SettingsPage() {
  const { user, updateProfile, isUpdatingProfile } = useAuth();
  const { success, error } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nome: "",
      whatsapp: "",
      cidade: "",
      estado: "",
      bio: "",
      instagram: "",
      facebook: "",
    },
  });

  // Re-initialize form when user data loads
  useEffect(() => {
    if (user) {
      reset({
        nome: user.nome || "",
        whatsapp: user.whatsapp || "",
        cidade: user.cidade || "",
        estado: user.estado || "",
        bio: user.bio || "",
        instagram: user.instagram || "",
        facebook: user.facebook || "",
      });
    }
  }, [user, reset]);

  const onSubmit = (data: ProfileFormData) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateProfile(data as any, {
      onSuccess: () => success("Perfil atualizado com sucesso!"),
      onError: (err) => error(err.message || "Erro ao atualizar perfil"),
    });
  };

  return (
    <div className="p-4 lg:p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">Configurações</h1>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Informações do Perfil</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register("nome")}
              label="Nome"
              placeholder="Seu nome completo"
              icon={<User size={20} />}
              error={errors.nome?.message}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                {...register("whatsapp")}
                label="WhatsApp"
                placeholder="+5511999998888"
                icon={<Phone size={20} />}
                error={errors.whatsapp?.message}
              />

              <div className="grid grid-cols-2 gap-2">
                <Input
                  {...register("cidade")}
                  label="Cidade"
                  placeholder="Sua cidade"
                  error={errors.cidade?.message}
                />
                <Input
                  {...register("estado")}
                  label="Estado"
                  placeholder="UF"
                  error={errors.estado?.message}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
              <textarea
                {...register("bio")}
                placeholder="Conte um pouco sobre você..."
                rows={4}
                className="w-full bg-surface border-0 ring-1 ring-border text-foreground placeholder:text-muted rounded-xl p-4 focus:ring-2 focus:ring-primary focus:bg-surface transition-all text-base resize-none"
              />
              {errors.bio && (
                <p className="mt-2 text-sm text-error">{errors.bio.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                {...register("instagram")}
                label="Instagram"
                placeholder="@seuusuario"
                icon={<Instagram size={20} />}
                error={errors.instagram?.message}
              />

              <Input
                {...register("facebook")}
                label="Facebook"
                placeholder="URL do perfil"
                icon={<Facebook size={20} />}
                error={errors.facebook?.message}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" isLoading={isUpdatingProfile}>
                Salvar alterações
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Account Section */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Conta</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-muted" />
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted">{user?.email}</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button variant="danger" className="w-full sm:w-auto">
                Excluir conta
              </Button>
              <p className="text-xs text-muted mt-2">
                Esta ação é irreversível e excluirá todos os seus dados.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



