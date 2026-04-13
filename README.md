# LEADS - API & Frontend

Sistema de gerenciamento de leads, grupos e campanhas com `Node.js`, `Express`, `TypeScript`, `Prisma ORM` e `PostgreSQL`. O backend e o frontend estatico sao servidos pela mesma aplicacao.

## Funcionalidades

- Cadastro, listagem, edicao e remocao de leads
- Cadastro e gerenciamento de grupos
- Associacao de leads a grupos
- Cadastro e gerenciamento de campanhas
- Associacao de leads a campanhas com status por campanha
- Dashboard web servido em `/`

## Tecnologias

- Backend: `Node.js`, `Express`, `TypeScript`
- Banco: `PostgreSQL`
- ORM: `Prisma`
- Frontend: `HTML`, `CSS`, `JavaScript`
- Validacao: `Zod`

## Variaveis de Ambiente

Copie o arquivo `.env.example` para `.env` e ajuste os valores:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"
PORT=3000
```

- `DATABASE_URL`: obrigatoria para conectar no PostgreSQL
- `PORT`: opcional; em deploy a plataforma normalmente injeta esse valor

## Desenvolvimento Local

1. Instale as dependencias:

```bash
npm install
```

2. Rode as migracoes em ambiente local:

```bash
npm run migrate:deploy
```

3. Inicie em modo desenvolvimento:

```bash
npm run dev
```

4. Acesse:

```text
http://localhost:3000
```

## Scripts

- `npm run dev`: inicia o servidor em modo desenvolvimento
- `npm run build`: gera o client do Prisma e compila o TypeScript
- `npm run start`: inicia a aplicacao compilada
- `npm run migrate:deploy`: aplica migracoes pendentes no banco
- `npm run start:prod`: aplica migracoes e inicia a aplicacao

## Deploy

### Checklist

- Configurar `DATABASE_URL`
- Rodar `npm install`
- Rodar `npm run build`
- Rodar `npm run migrate:deploy`

### Comandos Recomendados

Build command:

```bash
npm install && npm run build
```

Start command:

```bash
npm run start:prod
```

### Deploy na Vercel

Este projeto pode ser publicado na Vercel usando o `src/server.ts` como entrada principal do Express. O arquivo `src/serverless.ts` pode continuar sendo usado para provedores que exigem um handler serverless explicito, mas na Vercel a entrada principal recomendada e o proprio `Express`.

URL publica da aplicacao:

- [gestor-de-leads-type-s-prisma-orm.vercel.app](https://gestor-de-leads-type-s-prisma-orm.vercel.app/)

Arquivos usados:

- `src/server.ts`: entrada do Express na Vercel
- `vercel.json`: configuracao minima de build
- `public/`: arquivos estaticos servidos pela Vercel CDN

Passos:

1. Suba o projeto para um repositorio Git
2. Importe o repositorio na Vercel
3. Configure a variavel `DATABASE_URL`
4. Deixe o build command como:

```bash
npm run build
```

5. Nao configure start command; a Vercel executa a funcao automaticamente
6. Rode `npm run migrate:deploy` fora da Vercel quando precisar aplicar migracoes no banco

Observacoes importantes:

- A Vercel ignora `express.static()`; os arquivos da pasta `public/` sao servidos diretamente pela plataforma
- A rota `/` do Express redireciona para `/index.html`, garantindo que a interface abra corretamente na Vercel
- `PORT` nao precisa ser configurada na Vercel
- `NODE_ENV` e gerenciada pela propria Vercel
- Se voce usar Vercel Postgres, basta copiar a connection string para `DATABASE_URL`

### Variaveis de Ambiente na Vercel

- `DATABASE_URL`: obrigatoria, connection string do PostgreSQL usado pelo Prisma
- `PORT`: nao precisa configurar na Vercel

Exemplo:

```env
DATABASE_URL="postgresql://usuario:senha@host:5432/nome_do_banco?schema=public"
```

## Estrutura

- `src/`: codigo fonte da aplicacao
- `database/`: inicializacao do Prisma Client
- `prisma/`: schema e migracoes
- `public/`: frontend estatico

## Endpoints Principais

- `GET /api/leads`
- `POST /api/leads`
- `GET /api/groups`
- `POST /api/groups`
- `GET /api/campaigns`
- `POST /api/campaigns`
