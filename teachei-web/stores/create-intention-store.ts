import { create } from "zustand";
import type { TipoVeiculo } from "@/types";

interface CreateIntentionState {
  // Step 1: Category
  tipoVeiculo: TipoVeiculo | null;
  
  // Step 2: Vehicle
  marcaCodigo: string | null;
  marcaNome: string | null;
  modeloCodigo: string | null;
  modeloNome: string | null;
  
  // Step 3: Specs
  anoMinimo: number | null;
  anoMaximo: number | null;
  cores: string[];
  precoMinimo: number | null;
  precoMaximo: number | null;
  quilometragemMinima: number | null;
  quilometragemMaxima: number | null;
  opcionais: string[];
  observacoes: string;
  
  // Step 4: Location
  cidade: string;
  estado: string;
  
  // Actions
  setTipoVeiculo: (tipo: TipoVeiculo) => void;
  setMarca: (codigo: string, nome: string) => void;
  setModelo: (codigo: string, nome: string) => void;
  setAnos: (min: number | null, max: number | null) => void;
  setCores: (cores: string[]) => void;
  setPreco: (min: number | null, max: number | null) => void;
  setQuilometragem: (min: number | null, max: number | null) => void;
  setOpcionais: (opcionais: string[]) => void;
  setObservacoes: (obs: string) => void;
  setLocalizacao: (cidade: string, estado: string) => void;
  reset: () => void;
}

const initialState = {
  tipoVeiculo: null,
  marcaCodigo: null,
  marcaNome: null,
  modeloCodigo: null,
  modeloNome: null,
  anoMinimo: null,
  anoMaximo: null,
  cores: [],
  precoMinimo: null,
  precoMaximo: null,
  quilometragemMinima: null,
  quilometragemMaxima: null,
  opcionais: [] as string[],
  observacoes: "",
  cidade: "",
  estado: "",
};

export const useCreateIntentionStore = create<CreateIntentionState>((set) => ({
  ...initialState,
  
  setTipoVeiculo: (tipo) => set({ tipoVeiculo: tipo, marcaCodigo: null, marcaNome: null, modeloCodigo: null, modeloNome: null }),
  setMarca: (codigo, nome) => set({ marcaCodigo: codigo, marcaNome: nome, modeloCodigo: null, modeloNome: null }),
  setModelo: (codigo, nome) => set({ modeloCodigo: codigo, modeloNome: nome }),
  setAnos: (min, max) => set({ anoMinimo: min, anoMaximo: max }),
  setCores: (cores) => set({ cores }),
  setPreco: (min, max) => set({ precoMinimo: min, precoMaximo: max }),
  setQuilometragem: (min, max) => set({ quilometragemMinima: min, quilometragemMaxima: max }),
  setOpcionais: (opcionais) => set({ opcionais }),
  setObservacoes: (obs) => set({ observacoes: obs }),
  setLocalizacao: (cidade, estado) => set({ cidade, estado }),
  reset: () => set(initialState),
}));
