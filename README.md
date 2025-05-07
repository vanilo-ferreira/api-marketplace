# Marketplace

## Back-end

### Api

Este projeto tem como objetivo o desenvolvimento de uma API para um Marketplace moderno, utilizando Node.js como ambiente de execução e Express.js como framework principal para construção da aplicação backend. A aplicação permitirá o cadastro de usuários, autenticação segura, gerenciamento de produtos.

#### Tecnologias e Dependências Utilizadas

- Node.js: Plataforma para construção do backend com JavaScript.
- Express: Framework web para Node.js, facilita a criação de rotas e middlewares.
- bcrypt: Para criptografar senhas dos usuários antes de armazená-las no banco de dados.
- cors: Middleware que permite o acesso à API por aplicações frontend hospedadas em domínios diferentes.
- dotenv: Gerenciador de variáveis de ambiente (como senhas e tokens) de forma segura e desacoplada.
- jsonwebtoken (JWT): Implementação de autenticação baseada em tokens, garantindo sessões seguras.
- pg: Cliente PostgreSQL para Node.js, utilizado para conexão e execução de queries no banco de dados.

### Banco de dados

Foi criado um Banco de Dados PostgreSQL chamado `marketplace` contendo as seguintes tabelas:

- usuarios
  - id
  - name
  - nome_loja
  - email
  - senha
- productos
  - id
  - usuario_id
  - nome
  - estoque
  - categoria
  - descricao
  - imagem

##### Observação

Devido a inatividade da aplicação, a primeira requisição no Bando de cados poderá demorar aproximadamente 1 minuto.

## Como rodar o projeto localmente

#### 1º. Pré-requisitos

- Verifique com: node -v e npm -v
- Se não tiver, instale pelo site oficial: https://nodejs.org

#### 2º. Configurar banco de dados PostgreSQL

```
CREATE DATABASE marketplace;

create table products (
  id serial primary key,
  name text not null,
  description text not null,
  price float not null,
  category_id integer not null,
  brand text not null,
  foreign key (category_id) references categories(id)
);

create table sales (
  id serial primary key,
  product_id integer not null,
  quantity integer not null,
  total_price float not null,
  date date not null,
  foreign key (product_id) references products(id)
);
```

#### 3º. Instalar dependências

`npm install`

#### 4º. Rodar o servidor

`npm run dev`

#### 5º. Acessar a API

URL da API: `http://localhost:8000`

## Endpoints

#### `POST` `/cadastro`

Essa é a rota que será utilizada para cadastrar um novo usuario no sistema.

Ela deverá:

- Validar se o e-mail informado já existe;
- Validar os campos obrigatórios:
  - nome
  - email
  - senha
  - nome_loja
- Criptografar a senha antes de salvar no banco de dados;
- Cadastrar o usuario no banco de dados.

Exemplo do body a ser enviado:

```
{
    "nome": "Fulano de Tal",
    "email": "fulano@email.com",
    "senha": "teste",
    "nome_loja": "Loja do Fulano"
}
```

#### `POST` `/login`

Essa é a rota que permite o usuario cadastrado realizar o login no sistema.

Ela deverá:

- Verificar se o e-mail existe;
- Validar e-mail e senha;
- Criar token de autenticação com id do usuário;
- Retornar um objeto com os dados do usuario (sem a senha) e o token criado.

Exemplo do body a ser enviado:

```
{
    "email": "fulano@email.com",
    "senha": "teste"
}
```

Exemplo de resposta da API:

```
{
    "usuario": {
        "id": 1,
        "nome": "Fulano de Tal",
        "email": "fulano@email.com",
        "nome_loja": "Loja do Fulano"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

## ATENÇÃO: Todas as rotas abaixo deverão exigir o token do usuário logado. Portanto, para cada implementação será necessário validar o token informado.

#### `GET` `/perfil`

Essa é a rota que será chamada quando o usuario quiser obter os dados do seu próprio perfil.

Ela deverá:

- Consultar usuário no banco de dados pelo id contido no token informado;
- Retornar um objeto com as informações do usuário exceto a senha.

Exemplo de resposta da API:

```
{
    "id": 1,
    "nome": "Fulano de Tal",
    "email": "fulano@email.com",
    "nome_loja": "Loja do Fulano"
}
```

#### `PUT` `/perfil`

Essa é a rota que será chamada quando o usuário quiser salvar alterações no seu próprio perfil.

Ela deverá:

- Validar se o e-mail já existe no banco de dados, caso o email seja diferente do usuário atual;
  - Caso já exista um e-mail igual no banco de dados, a alteração não deve ser permitida (o campo de email deve ser sempre único de banco.de dados)
- Validar os campos obrigatórios:
  - nome
  - email
  - senha
  - nome_loja
- Atualizar os dados do usuário.

Exemplo do body a ser enviado:

```
{
    "nome": "Fulano de Tal",
    "email": "fulano@email.com",
    "senha": "teste",
    "nome_loja": "Loja do Fulano"
}
```

#### `GET` `/produtos`

Essa é a rota que será chamada quando o usuario logado quiser listar todos os seus produtos cadastrados.

Ela deverá:

- Listar todos os produtos do usuario logado e devolver no formato de `array` de produtos;
- Filtrar produtos por `categoria`.

Exemplo de resposta da API:

```
[
    {
        "id": 1,
        "usuario_id": 1,
        "nome": "Camisa preta",
        "estoque": 12,
        "categoria": "Camisa",
        "preco": 4990,
        "descricao": "Camisa de malha com acabamento fino.",
        "imagem": "https://bit.ly/3ctikxq"
    },
    {
        "id": 2,
        "usuario_id": 1,
        "nome": "Camisa azul",
        "estoque": 8,
        "categoria": "Camisa",
        "preco": 4490,
        "descricao": "Camisa de malha com acabamento fino.",
        "imagem": "https://bit.ly/3ctikxq"
    }
]
```

#### `GET` `/produtos/:id`

Essa é a rota que será chamada quando o usuario logado quiser obter um dos seus produtos cadastrados

Ela deverá:

- Buscar o produto no banco de dados pelo id informado na rota;
- Validar se o produto existe e se pertence ao usuário logado;
- Retornar um objeto com as informações do produto.

Exemplo de resposta da API

```
{
    "id": 2,
    "usuario_id": 1,
    "nome": "Camisa azul",
    "estoque": 8,
    "categoria": "Camisa",
    "preco": 4490,
    "descricao": "Camisa de malha com acabamento fino.",
    "imagem": "https://bit.ly/3ctikxq"
}
```

#### `POST` `/produtos`

Essa é a rota que será chamada quando o usuario quiser cadastrar um produto atrelado ao seu próprio cadastro

Ela deverá:

- Validar os campos obrigatórios:
  - nome
  - estoque
  - preco
  - descricao
- Cadastrar o produto no banco de dados para o id do usuario logado.

Exemplo do body a ser enviado:

```
{
    "nome": "Camisa amarela",
    "estoque": 20,
    "categoria": "Camisa",
    "preco": 5490,
    "descricao": "Camisa de malha com acabamento fino.",
    "imagem": "https://bit.ly/3ctikxq"
}
```

#### `PUT` `/produtos/:id`

Essa é a rota que será chamada quando o usuario logado quiser atualizar um dos seus produtos cadastrados.

Ela deverá:

- Buscar o produto no banco de dados pelo id informado na rota;
- Validar se o produto existe e se pertence ao usuário logado;
- Validar os campos obrigatórios:
  - nome
  - estoque
  - preco
  - descricao
- Atualizar o produto no banco de dados.

Exemplo do body a ser enviado:

```
{
    "nome": "Camisa amarela",
    "estoque": 20,
    "categoria": "Camisa",
    "preco": 5490,
    "descricao": "Camisa de malha com acabamento fino.",
    "imagem": "https://bit.ly/3ctikxq"
}
```

#### `DELETE` `/produtos/:id`

Essa é a rota que será chamada quando o usuario logado quiser excluir um dos seus produtos cadastrados

Ela deverá:

- Validar se o produto existe e se pertence ao usuário logado;
- Deletar o produto do banco de dados.
