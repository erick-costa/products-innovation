# 🛍️ Innovation Products – Next.js

Aplicação desenvolvida com Next.js para autenticação e listagem de produtos, consumindo API externa com token Bearer.

<img width="600" alt="Captura de Tela 2026-05-01 às 17 19 50" src="https://github.com/user-attachments/assets/9763339a-47d2-4b97-bf5d-85db0aa5f40f" />


<img width="600" alt="Captura de Tela 2026-05-01 às 17 20 34" src="https://github.com/user-attachments/assets/1154d8d9-09fb-44db-8ece-2454c0bd9621" />

---

## 🚀 Tecnologias

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Zustand (estado global)
- React Query (cache e requisições)
- Radix UI (modal acessível)
- Docker

---

## ⚙️ Como rodar o projeto

### 🔧 Rodando localmente

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000

---

### 🐳 Rodando com Docker

```bash
docker build -t products-app .
docker run -p 3000:3000 products-app
```

Acesse: http://localhost:3000

---

## 🔐 Autenticação

- Login via API
- Token salvo e utilizado nas requisições
- Rotas protegidas com middleware

---

## 📦 Funcionalidades

- Login com tratamento de erro
- Listagem de produtos em grid responsivo
- Busca com debounce
- Ordenação por nome e preço
- Infinite scroll (simulado no client)
- Modal de produto acessível
- Favoritos com persistência (localStorage)
- Filtro de favoritos
- Loading (skeleton e estados de carregamento)

---

## ⚠️ Observações técnicas

- A API não possui paginação, então o infinite scroll foi implementado no client, carregando todos os dados inicialmente e exibindo incrementalmente.
- O estado global foi gerenciado com Zustand.

---

## 📊 Qualidade

- Código organizado e componentizado
- Separação de responsabilidades
- Acessibilidade básica aplicada

---

## 📌 Melhorias futuras

- Testes unitários e E2E
- Melhor tratamento de erros (retry/backoff)
- Skeleton mais refinado

---
