# LEADS - API & Frontend

Este é um sistema completo de gerenciamento de Leads, Grupos e Campanhas, desenvolvido com Node.js, Express, Prisma ORM e PostgreSQL. Inclui uma interface web para interação fácil com todas as funcionalidades.

## Funcionalidades

- **Gerenciamento de Leads**: Criação, listagem, atualização e remoção de leads.
- **Gerenciamento de Grupos**: Criação de grupos e associação de leads a grupos.
- **Gerenciamento de Campanhas**: Criação de campanhas, definição de datas e status.
- **Associação Leads-Campanhas**: Gerenciamento do status de leads dentro de campanhas (New, Contacted, Converted, etc.).
- **Dashboard Web**: Interface gráfica amigável para gerenciar todos os recursos.

## Tecnologias Utilizadas

- **Backend**: Node.js, Express, TypeScript
- **Banco de Dados**: PostgreSQL, Prisma ORM
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla), Bootstrap 5
- **Validação**: Zod

## Pré-requisitos

- Node.js (v14 ou superior)
- PostgreSQL
- Gerenciador de pacotes (npm ou yarn)

## Instalação e Configuração

1.  **Clone o repositório** (se aplicável).
2.  **Instale as dependências**:
    ```bash
    npm install
    ```
3.  **Configure o banco de dados**:
    -   Certifique-se de que o PostgreSQL está rodando.
    -   Verifique o arquivo `.env` e ajuste a `DATABASE_URL` se necessário.
    ```env
    DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"
    ```
4.  **Execute as migrações do Prisma**:
    ```bash
    npx prisma migrate dev
    ```

## Executando o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O servidor iniciará em `http://localhost:3000`.

## Acessando a Interface Web

Após iniciar o servidor, abra seu navegador e acesse:

**[http://localhost:3000](http://localhost:3000)**

Você verá o painel de controle onde poderá gerenciar seus leads, grupos e campanhas.

## Endpoints da API

A API está disponível em `/api`. Alguns exemplos:

-   `GET /api/leads`: Listar leads
-   `POST /api/leads`: Criar lead
-   `GET /api/groups`: Listar grupos
-   `GET /api/campaigns`: Listar campanhas

## Estrutura do Projeto

-   `src/`: Código fonte do backend
-   `prisma/`: Esquema do banco de dados e migrações
-   `public/`: Arquivos estáticos do frontend
