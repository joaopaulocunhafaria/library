# Library Management System

Este é um projeto de gerenciamento de biblioteca composto por um backend desenvolvido com **NestJS** e um frontend desenvolvido com **Angular**.

## Estrutura do Projeto

 ### ├── library-backend
 ### └── library-frontend


---

## Requisitos

- **Node.js** (v16+ recomendado)
- **npm** (v8+ recomendado)
- **SQLite** (para armazenar dados no backend)

---

## Backend (NestJS)

### Passos para rodar o Backend

1. **Navegue até o diretório do backend:**

### Comandos para Backend

| Comando                    | Descrição                                                    |
|----------------------------|--------------------------------------------------------------|
| `npm install`              | Instala as dependências do backend                           |
| `npm run start`            | Inicia o servidor backend em modo de desenvolvimento         | 

### Comandos para Frontend

| Comando                    | Descrição                                                    |
|----------------------------|--------------------------------------------------------------|
| `npm install`              | Instala as dependências do frontend                          |
| `npm start`                | Inicia o servidor Angular em modo de desenvolvimento         |

Isso irá rodar o frontend na URL [http://localhost:4200](http://localhost:4200).

---

## Como Funciona

### Backend

#### Configuração do Banco de Dados SQLite e Arquivo `.env`

Para rodar o backend corretamente, é necessário configurar o banco de dados SQLite e criar o arquivo `.env`.

1. **Arquivo `.env`**: No diretório `library-backend`, crie um arquivo chamado `.env` com a seguinte variável de ambiente:
2. DATABASE_URL=sqlite:./db.sqlite


Isso configurará o NestJS para usar um banco de dados SQLite.

2. **Arquivo SQLite**: O banco de dados SQLite será armazenado em um arquivo chamado `db.sqlite` na raiz do diretório `library-backend`. O NestJS criará automaticamente este arquivo, caso não exista, ao rodar as migrações ou durante a execução do servidor.

O backend foi desenvolvido utilizando o framework NestJS e utiliza um banco de dados SQLite para armazenar os dados dos autores e livros.

#### Rotas principais:

- `GET /authors` - Retorna a lista de autores
- `GET /authors/:id` - Retorna os detalhes de um autor específico
- `POST /authors` - Cria um novo autor
- `PUT /authors/:id` - Atualiza os dados de um autor específico
- `DELETE /authors/:id` - Deleta um autor específico
- `GET /books` - Retorna a lista de livros
- `GET /books/:id` - Retorna os detalhes de um livro específico
- `POST /books` - Cria um novo livro
- `PUT /books/:id` - Atualiza os dados de um livro específico
- `DELETE /books/:id` - Deleta um livro específico

### Frontend

O frontend foi desenvolvido com Angular e oferece uma interface gráfica para gerenciar autores e livros.


