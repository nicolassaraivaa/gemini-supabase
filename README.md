# Gemini Supabase – Plano de Aula com IA

Aplicação Next.js que utiliza **Supabase** para autenticação e banco de dados e a **IA Gemini** do Google para gerar planos de aula automaticamente, seguindo a **Base Nacional Comum Curricular (BNCC)** brasileira.

---

## 🔹 Tecnologias

- **Frontend**: Next.js 15, React 19, TailwindCSS, Radix UI, Lucide Icons  
- **Backend**: API Next.js + Prisma ORM  
- **Banco de Dados**: PostgreSQL via Supabase  
- **Autenticação**: Supabase Auth  
- **IA**: Google Gemini (gemini-2.5-flash)  
- **Gerenciamento de Estado**: React Query  
- **Validação de Formulários**: React Hook Form + Zod  
- **Estilização**: TailwindCSS + class-variance-authority  

---

## 🔹 Funcionalidades

1. **Autenticação**: Registro e login de usuários via Supabase Auth  
2. **Gerar planos de aula**:  
   - Usuário define tema, série, matéria, duração e recursos disponíveis  
   - IA Gemini gera plano de aula detalhado, com:
     - Introdução lúdica
     - Objetivo BNCC
     - Passo a passo da aula
     - Rubrica de avaliação  
3. **Armazenamento**: Plano salvo no banco (tabela `class_`) vinculado ao usuário  
4. **Interface responsiva**: Funciona bem em desktop e mobile

---

## 🛠️ Como rodar o projeto

1. Clone o repositório:
   ```bash
   gh repo clone nicolassaraivaa/gemini-supabase
   

2. Instale as dependências:
   ```bash
   npm install


3. Configure as variáveis de ambiente (.env):
   ```bash
   DATABASE_URL=
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   GEMINI_API_KEY=


4. Inicie o servidor:
   ```bash
   npm run dev

---

## 🔹 Banco de Dados

O banco de dados é **PostgreSQL** gerenciado pelo **Supabase**.  
A tabela principal do projeto é `class_` e foi criada utilizando **Prisma** a partir do schema `prisma/schema.prisma`.  

### Comandos para criar o banco via Prisma:

  ```bash
  # Instale as dependências do Prisma
  npm install prisma @prisma/client

  # Gere o client do Prisma
  npx prisma generate

  # Crie a tabela no banco usando migrate
  npx prisma migrate dev --name init

-- Adiciona a foreign key entre ClassPlans e Supabase Auth users
ALTER TABLE public.class_
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id)
REFERENCES auth.users(id)
ON DELETE CASCADE;
