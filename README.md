# 🔐 Projeto: Criptografia de César com Interface e Banco de Dados

Este projeto implementa a Cifra de César com autenticação de usuário, interface interativa (React) e persistência em banco de dados (PostgreSQL via Prisma). A proposta segue os requisitos de um trabalho prático acadêmico.

---

## 📌 Funcionalidades

- ✅ Tela de Login (validação de usuário e senha)
- ✅ Tela de Criptografar:
  - Campo para inserir a mensagem
  - Campo para o passo (número de casas)
  - Geração de hash exclusivo (chave única para descriptografar)
  - Armazenamento do hash, passo e status de uso
- ✅ Tela de Decriptografar:
  - Validação do hash
  - Descriptografia da mensagem
  - Marcação do hash como usado (uso único)

---

## 🛠️ Tecnologias Utilizadas

### 🔙 Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL (via Docker)

### 🎨 Frontend
- React (com Vite)
- Axios (para requisições)
- React Router DOM

---

## 🐳 Banco de Dados com Docker

Para iniciar o banco PostgreSQL com Docker:

```bash
docker-compose up -d
```

### Acesso padrão:
- Usuário: `admin`
- Senha: `admin123`
- Banco: `cripto`
- Porta: `5432`

---

## 🔧 Setup do Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/cripto-app.git
cd cripto-app
```

### 2. Configure o Backend

```bash
cd backend
npm install
cp .env.example .env
# Edite o .env se necessário
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

### 3. Configure o Frontend

```bash
cd ../frontend
npm install
npm run dev
```

---

## 📂 Estrutura de Pastas

```
cripto-app/
├── backend/
│   ├── prisma/
│   ├── src/
│   └── .env
├── frontend/
│   ├── src/
│   └── public/
├── docker-compose.yml
└── README.md
```

---

## ✍️ Autores

**Alexsander Ramos Ferreira**  
**Joel de Farias Alves Neto**  
Desenvolvedores de Software | FATEC Votorantim  
Contato: 

---

## 📜 Licença

Este projeto é apenas para fins acadêmicos.
