// Environment configuration
export const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  NODE_ENV: process.env.NODE_ENV || "development",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
} as const;

// API endpoints (aligned with backend /v1 prefix)
export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: "/v1/auth/login",
  AUTH_REGISTER: "/v1/auth/registrar",

  // Profile
  PROFILE: "/v1/perfil",
  PROFILE_BY_ID: (id: string) => `/v1/perfil/${id}`,

  // Intentions (Anuncios)
  INTENTIONS: "/v1/anuncios",
  INTENTION_BY_ID: (id: string) => `/v1/anuncios/${id}`,
  MY_INTENTIONS: "/v1/anuncios/meus",

  // Vehicles (FIPE)
  VEHICLE_BRANDS: (tipo: string) => `/v1/veiculos/${tipo}/marcas`,
  VEHICLE_MODELS: (tipo: string, marcaCodigo: string) =>
    `/v1/veiculos/${tipo}/marcas/${marcaCodigo}/modelos`,
  VEHICLE_YEARS: (tipo: string, marcaCodigo: string, modeloCodigo: string) =>
    `/v1/veiculos/${tipo}/marcas/${marcaCodigo}/modelos/${modeloCodigo}/anos`,
  VEHICLE_PRICE: (
    tipo: string,
    marcaCodigo: string,
    modeloCodigo: string,
    anoCodigo: string
  ) =>
    `/v1/veiculos/${tipo}/marcas/${marcaCodigo}/modelos/${modeloCodigo}/anos/${anoCodigo}/preco`,

  // Payments
  PAYMENT_PREFERENCE: (anuncioId: string) =>
    `/v1/pagamentos/preferencia/${anuncioId}`,
  PAYMENT_WEBHOOK: "/v1/pagamentos/webhook",
} as const;
