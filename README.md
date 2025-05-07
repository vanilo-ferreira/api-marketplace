# SmartMart Solutions

## Back-end

### Api

A SmartMart Solutions é uma empresa varejista digital em expansão que atua com múltiplos produtos e categorias em um ambiente altamente competitivo. O time de operações comerciais busca um sistema interno para cadastro, visualização e análise de produtos e vendas, com um painel visual simples e eficiente para auxiliar na tomada de decisões.

O objetivo foi construir o primeiro protótipo funcional dessa aplicação, unindo a construção de APIs em Python e uma interface visual em React. O objetivo também é criar uma base sólida para visualização de dados de vendas e permitir a inserção de produtos manualmente ou via arquivos CSV, com filtros e edição.

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

## Requisitos obrigatórios

- [x] Um endpoint POST para inserir novos produtos;
- [x] Um endpoint GET para listar produtos, vendas, incluindo lucro;
- [x] Um endpoint GET para listar categoria;
- [x] Um endpoint POST para inserir produtos de um arquivo CSV;

### `deploy`

O deploy da aplicação foi realizado na plataforma [Render](https://render.com/).
E poderá ser acompanhado através do seguinte link: [API SmartMart Solutions](https://api-smartmark.onrender.com/).

O Bando de Dados PostgreSQL também está hospedado na Render.

##### Observação

Devido a inatividade da aplicação, a primeira requisição no Bando de cados poderá demorar aproximadamente 1 minuto.

## Como rodar o projeto localmente

#### 1º. Pré-requisitos

- Python 3.9+
- PostgreSQL rodando localmente

#### 2º. Configurar banco de dados PostgreSQL

```
psql -U postgres
CREATE DATABASE mydatabase;
CREATE USER user WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE mydatabase TO user;
```

Esses dados precisam bater com o .env do projeto:
`DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase`

#### 3º. Instalar dependências

`pip install -r requirements.txt`

#### 4º. Rodar o servidor FastAPI

`uvicorn app.main:app --reload`

#### 5º. Acessar a API

URL da API: `http://127.0.0.1:8000/`
Documentação interativa: `http://127.0.0.1:8000/docs`
ReDoc: `http://127.0.0.1:8000/redoc`

## Endpoints

#### `GET` `/categories/`

Essa é a rota que será utilizada para buscar todas as categorias no sistema.

Exemplo de resposta da API:

```
{
    "id": int,
    "name": "string"
}
```

#### `POST` `/categories/`

Essa é a rota que será utilizada para cadastrar uma nova categoria no sistema.

Exemplo do body a ser enviado:

```
{
    "name": "string"
}
```

Exemplo de resposta da API:

```
{
    "id": int,
    "name": "string",
}
```

#### `GET` `/products/`

Essa é a rota que permite o usuario buscar todas os produtos cadastrados.

Exemplo de resposta da API:

```
{
    "id": int,
    "name": "string",
    "description": "string",
    "price": float,
    "category_id": int,
    "brand": "string"
}
```

#### `POST` `/products/`

Essa é a rota que será utilizada para cadastrar novos produtos.

Exemplo do body a ser enviado:

```
{
    "name": "string",
    "description": "string",
    "price": int,
    "category_id": int,
    "brand": "string"
}
```

Exemplo de resposta da API:

```
{
    "id": int,
    "name": "string",
    "description": "string",
    "price": float,
    "category_id": int,
    "brand": "string",
}
```

#### `PATCH` `/products/:id`

Essa é a rota que será chamada quando o usuário quiser alterar o preço de um determinado produto.

Exemplo do body a ser enviado:

```
{
  "price": float
}
```

Exemplo de resposta da API:

```
{
    "id": int,
    "name": "string",
    "description": "string",
    "price": float,
    "category_id": int,
    "brand": "string",
}
```

#### `GET` `/sales/`

Essa é a rota que será chamada quando o usuario quiser buscar todas as vendas realizada.

Exemplo de resposta da API:

```
[
    {
    "id": int,
    "product_id": int,
    "quantity": int,
    "total_price": float,
    "date": "string"
  }
]
```

#### `POST` `/sales/`

Essa é a rota que será chamada quando o usuario quiser realizar uma venda.

Exemplo de resposta da API

```
{
    "product_id": int,
    "quantity": int,
    "total_price": float,
    "date": "string"
}
```

Exemplo de resposta da API:

```
[
    {
    "id": int,
    "product_id": int,
    "quantity": int,
    "total_price": float,
    "date": "string"
  }
]
```
