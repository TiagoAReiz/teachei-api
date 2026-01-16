<p align="center">
  <img src="https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java 21"/>
  <img src="https://img.shields.io/badge/Spring%20Boot-3.3-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" alt="Spring Boot"/>
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/Expo-54-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo"/>
  <img src="https://img.shields.io/badge/Azure-Container%20Apps-0078D4?style=for-the-badge&logo=microsoft-azure&logoColor=white" alt="Azure"/>
</p>

<h1 align="center">
  🚗 TeAchei
</h1>

<p align="center">
  <strong>O marketplace invertido de veículos do Brasil</strong>
</p>

<p align="center">
  <em>Onde compradores anunciam o que querem — e vendedores respondem com ofertas reais.</em>
</p>

<p align="center">
  <a href="#-o-problema">O Problema</a> •
  <a href="#-a-solução">A Solução</a> •
  <a href="#-stack-tecnológica">Stack</a> •
  <a href="#-arquitetura">Arquitetura</a> •
  <a href="#-início-rápido">Início Rápido</a> •
  <a href="#-deploy">Deploy</a>
</p>

---

## 🎯 O Problema

No mercado tradicional de veículos:

- **Compradores** são bombardeados com anúncios irrelevantes
- **Vendedores** gastam tempo e dinheiro sem saber se há demanda real
- Marketplaces lucram com volume, não com conversão

> *"Eu sei exatamente o carro que quero. Por que preciso ficar buscando em centenas de anúncios?"*

---

## 💡 A Solução

**TeAchei inverte a lógica do marketplace:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   🛒 MARKETPLACE TRADICIONAL        🔄 TEACHEI (INVERTIDO)         │
│   ─────────────────────────         ──────────────────────         │
│                                                                     │
│   Vendedor ──────► Anúncio          Comprador ──────► Intenção     │
│                       │                                   │        │
│                       ▼                                   ▼        │
│   Comprador busca e filtra          Vendedor encontra    │        │
│   dezenas de opções                 leads qualificados   │        │
│                       │                                   │        │
│                       ▼                                   ▼        │
│   Contato frio                      Contato direto       │        │
│   (sem garantia de interesse)       via WhatsApp         │        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Como funciona

1. **Comprador publica uma intenção** → "Procuro Honda Civic 2019-2021, preto ou prata, até R$110k"
2. **Vendedores encontram compradores qualificados** → Feed de intenções com filtros
3. **Contato direto via WhatsApp** → Negociação direta, sem intermediários

---

## 📱 Screenshots

<p align="center">
  <img src="teachei-mobile/TELAS/stitch_home_intentions_feed (1)/screen.png" alt="Feed de Intenções" width="280"/>
  &nbsp;&nbsp;&nbsp;
  <img src="teachei-mobile/TELAS/stitch_home_intentions_feed/screen.png" alt="Login" width="280"/>
</p>

---

## 🛠 Stack Tecnológica

### Backend — Java 21 + Spring Boot 3.3

| Camada | Tecnologia | Propósito |
|--------|------------|-----------|
| **Framework** | Spring Boot 3.3, Spring Security | API REST, Autenticação |
| **Arquitetura** | Hexagonal (Ports & Adapters) | Separação de domínio e infraestrutura |
| **Banco Relacional** | PostgreSQL 16 | Usuários, perfis, transações |
| **Banco NoSQL** | Azure Cosmos DB | Intenções de compra (schema flexível) |
| **Autenticação** | JWT (java-jwt) | Tokens stateless |
| **Resilência** | Resilience4j | Circuit breaker, retry, rate limiting |
| **Pagamentos** | Mercado Pago SDK | Processamento de pagamentos brasileiros |
| **Cache** | Caffeine | Cache em memória para FIPE API |
| **Mapeamento** | MapStruct + Lombok | DTOs e redução de boilerplate |

### Frontend Web — Next.js 16

| Tecnologia | Propósito |
|------------|-----------|
| **Framework** | Next.js 16 (App Router) | SSR, SEO otimizado |
| **Styling** | Tailwind CSS 4 | Design system responsivo |
| **State** | Zustand + React Query | Estado global e cache de requisições |
| **Forms** | React Hook Form + Zod | Validação tipada |
| **Icons** | Lucide React | Ícones modernos |

### Frontend Mobile — Expo 54 (React Native)

| Tecnologia | Propósito |
|------------|-----------|
| **Framework** | Expo 54, Expo Router | Roteamento file-based |
| **Styling** | NativeWind (Tailwind) | Estilos consistentes com web |
| **Navigation** | React Navigation 7 | Navegação nativa |
| **State** | Zustand + React Query | Sincronização de estado |
| **Fonts** | Plus Jakarta Sans | Tipografia moderna |

### Infraestrutura

| Serviço | Propósito |
|---------|-----------|
| **Azure Container Apps** | Backend containerizado (scale-to-zero) |
| **Azure Cosmos DB** | Banco NoSQL serverless |
| **Azure PostgreSQL** | Banco relacional gerenciado |
| **Vercel** | Frontend web (Next.js) |
| **Expo EAS** | Build e distribuição mobile |
| **GitHub Actions** | CI/CD automatizado |

---

## 🏗 Arquitetura

### Visão Geral

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENTS                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │ Mobile App   │  │   Web App    │  │  3rd Party   │              │
│  │ (Expo/RN)    │  │  (Next.js)   │  │   (Future)   │              │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘              │
└─────────┼─────────────────┼─────────────────┼───────────────────────┘
          │                 │                 │
          └────────────────►│◄────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    BACKEND (Spring Boot)                             │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    ADAPTERS (IN)                              │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │   │
│  │  │   Auth      │ │  Anuncio    │ │  Pagamento  │            │   │
│  │  │ Controller  │ │ Controller  │ │ Controller  │            │   │
│  │  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘            │   │
│  └─────────┼───────────────┼───────────────┼────────────────────┘   │
│            ▼               ▼               ▼                        │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                  APPLICATION (PORTS/USE CASES)               │   │
│  │  ┌─────────────────────────────────────────────────────┐    │   │
│  │  │ AutenticarUsuario │ CriarAnuncio │ ProcessarPagamento│    │   │
│  │  │ RegistrarUsuario  │ BuscarAnuncios│ GerenciarPerfil  │    │   │
│  │  └─────────────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│            │               │               │                        │
│            ▼               ▼               ▼                        │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                      DOMAIN                                   │   │
│  │  Usuario │ Perfil │ Anuncio │ VeiculoInfo │ Pagamento       │   │
│  └─────────────────────────────────────────────────────────────┘   │
│            │               │               │                        │
│            ▼               ▼               ▼                        │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    ADAPTERS (OUT)                             │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │   │
│  │  │PostgreSQL│ │ CosmosDB │ │ FIPE API │ │MercadoPago│        │   │
│  │  │ Adapter  │ │ Adapter  │ │ Adapter  │ │ Adapter  │        │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘        │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### Estrutura do Monorepo

```
TeAchei/
├── TeAchei/                  # 🔧 Backend (Java/Spring Boot)
│   ├── src/main/java/
│   │   └── com/teachei/api/
│   │       ├── adapter/      # Adaptadores de entrada e saída
│   │       │   ├── in/web/   # Controllers REST
│   │       │   └── out/      # Persistência e APIs externas
│   │       ├── application/  # Casos de uso e portas
│   │       ├── config/       # Configurações (Security, Cache, etc)
│   │       └── domain/       # Entidades e regras de negócio
│   ├── docker-compose.yml    # Dev environment
│   └── Dockerfile
│
├── teachei-web/              # 🌐 Frontend Web (Next.js)
│   ├── app/                  # App Router pages
│   ├── components/           # Componentes reutilizáveis
│   ├── hooks/                # Custom hooks
│   ├── lib/                  # Serviços e utilitários
│   └── stores/               # Estado global (Zustand)
│
├── teachei-mobile/           # 📱 App Mobile (Expo)
│   ├── app/                  # Expo Router pages
│   ├── components/           # Componentes nativos
│   ├── hooks/                # Custom hooks
│   ├── services/             # API clients
│   └── stores/               # Estado global
│
├── openspec/                 # 📋 Especificações (OpenSpec)
│   ├── project.md            # Contexto do projeto
│   ├── changes/              # Propostas de mudanças
│   └── specs/                # Especificações aprovadas
│
└── .github/workflows/        # 🚀 CI/CD Pipelines
    ├── backend-ci-cd.yml     # Build, test, deploy backend
    ├── web-ci-cd.yml         # Deploy web to Vercel
    └── mobile-ci.yml         # Build mobile with EAS
```

---

## 🚀 Início Rápido

### Pré-requisitos

- **Java 21** (com Maven)
- **Node.js 20+**
- **Docker & Docker Compose**
- **Azure CLI** (para Cosmos DB emulator)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/TeAchei.git
cd TeAchei
```

### 2. Inicie a infraestrutura local

```bash
cd TeAchei
docker-compose up -d
```

Isso inicia:
- **PostgreSQL** em `localhost:5432`
- **Cosmos DB Emulator** em `localhost:8081`
- **Azurite** (storage emulator) em `localhost:10000-10002`

### 3. Configure as variáveis de ambiente

```bash
cp TeAchei/env.example TeAchei/.env
# Edite o arquivo com suas configurações
```

### 4. Inicie o backend

```bash
cd TeAchei
./mvnw spring-boot:run
```

API disponível em `http://localhost:8080`

### 5. Inicie o frontend web

```bash
cd teachei-web
npm install
npm run dev
```

Web app disponível em `http://localhost:3000`

### 6. Inicie o app mobile

```bash
cd teachei-mobile
npm install
npx expo start
```

Escaneie o QR code com o app Expo Go.

---

## 📡 API Endpoints

### Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/api/auth/registrar` | Criar conta |
| `POST` | `/api/auth/login` | Autenticar |

### Intenções (Anúncios)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/anuncios` | Listar intenções (paginado) |
| `GET` | `/api/anuncios/{id}` | Detalhes de uma intenção |
| `POST` | `/api/anuncios` | Criar intenção* |
| `DELETE` | `/api/anuncios/{id}` | Remover intenção* |

### Veículos (FIPE)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/veiculos/marcas` | Listar marcas por tipo |
| `GET` | `/api/veiculos/modelos` | Listar modelos por marca |
| `GET` | `/api/veiculos/anos` | Listar anos por modelo |
| `GET` | `/api/veiculos/preco` | Consultar preço FIPE |

### Perfil

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/perfil` | Obter perfil atual* |
| `PUT` | `/api/perfil` | Atualizar perfil* |
| `GET` | `/api/perfil/{usuarioId}` | Perfil público |

### Pagamentos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/api/pagamentos/criar` | Criar preferência* |
| `POST` | `/api/pagamentos/webhook` | Webhook Mercado Pago |

*Requer autenticação (JWT)

---

## 🚢 Deploy

### Deploy Automatizado (CI/CD)

O projeto possui pipelines GitHub Actions configuradas:

| Workflow | Trigger | Destino |
|----------|---------|---------|
| `backend-ci-cd.yml` | Push em `main` (TeAchei/) | Azure Container Apps |
| `web-ci-cd.yml` | Push em `main` (teachei-web/) | Vercel |
| `mobile-ci.yml` | Push com `[release]` | EAS Build |

### Custos Azure (Estimativa)

| Serviço | SKU | Custo Mensal |
|---------|-----|--------------|
| Container Apps | Consumption | ~$0-20 |
| PostgreSQL | B1ms | ~$12 |
| Cosmos DB | Serverless | ~$0-10 |
| Container Registry | Basic | ~$5 |
| **Total** | | **~$20-50/mês** |

Para instruções detalhadas de deploy, consulte [DEPLOY.md](DEPLOY.md).

---

## 🧪 Testes

```bash
# Backend - Testes unitários
cd TeAchei
./mvnw test

# Frontend Web - Type check e lint
cd teachei-web
npm run lint

# Mobile - Type check
cd teachei-mobile
npx expo lint
```

---

## 📋 OpenSpec

Este projeto utiliza **OpenSpec** para gerenciamento de especificações e mudanças.

```bash
# Listar mudanças ativas
openspec list

# Listar especificações
openspec list --specs

# Validar uma proposta
openspec validate <change-id> --strict
```

Para mais detalhes, veja [openspec/AGENTS.md](openspec/AGENTS.md).

---

## 🗺 Roadmap

### MVP (Atual)
- [x] Autenticação JWT
- [x] CRUD de intenções de compra
- [x] Integração FIPE API
- [x] Integração Mercado Pago
- [x] App mobile (iOS/Android)
- [x] Web app (Next.js)
- [x] Deploy Azure + Vercel

### v1.1
- [ ] Notificações push
- [ ] Chat in-app
- [ ] Sistema de avaliações
- [ ] Busca geolocalizada

### Futuro
- [ ] Expansão: Imóveis
- [ ] Expansão: Eletrônicos
- [ ] Machine Learning: Match comprador-vendedor
- [ ] Marketplace B2B

---

## 🤝 Contribuindo

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Para mudanças significativas, crie uma proposta OpenSpec
4. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
5. Push para a branch (`git push origin feature/nova-funcionalidade`)
6. Abra um Pull Request

### Convenções de Commit

```
feat:     Nova funcionalidade
fix:      Correção de bug
refactor: Refatoração de código
docs:     Documentação
test:     Testes
chore:    Manutenção
```

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">
  <strong>TeAchei</strong> — Conectando compradores e vendedores de forma inteligente 🚗
</p>

<p align="center">
  Feito com ❤️ no Brasil
</p>
