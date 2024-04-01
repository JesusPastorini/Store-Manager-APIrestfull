# 🚀 Projeto: Store Manager

## ℹ️ Sobre o Projeto

O projeto Store Manager foi uma aplicação de API RESTful desenvolvida para gerenciamento de vendas, permitindo operações CRUD de produtos e vendas. Foi construída seguindo a arquitetura em camadas e utilizando um banco de dados MySQL para persistência dos dados. O principal objetivo foi criar uma solução robusta e escalável para gestão de vendas em um ambiente de comércio.

## 🛠️ Tecnologias e Habilidades

- **Linguagens Utilizadas:** JavaScript (Node.js)
- **Frameworks e Bibliotecas:** Express.js, Mocha, Chai
- **Banco de Dados:** MySQL
- **Arquitetura:** Arquitetura em Camadas (MVC)
- **Testes:** Testes Unitários com Mocha e Chai
- **Validações:** Middleware do Express.js para validação de dados recebidos pela API
- **Persistência de Dados:** Interação com banco de dados MySQL para armazenamento e recuperação de informações

## 📋 Funcionalidades Implementadas

### 01 - Listagem de Produtos

- Desenvolvimento dos endpoints GET /products e GET /products/:id para listar produtos individualmente e em conjunto, respectivamente.
- Ordenação dos resultados pelo campo id.

### 02 - Listagem de Vendas

- Criação dos endpoints GET /sales e GET /sales/:id para listar vendas individualmente e em conjunto, respectivamente.
- Ordenação dos resultados pelo campo saleId e, em caso de empate, pelo campo productId.

### 03 - Cadastro de Produtos

- Implementação do endpoint POST /products para cadastrar novos produtos na base de dados.

### 04 - Validações de Cadastro de Produtos

- Adição de validações para garantir que dados inválidos enviados no corpo da requisição resultem em mensagens de erro apropriadas.

### 05 - Cadastro de Vendas

- Desenvolvimento do endpoint POST /sales para cadastrar vendas na base de dados, permitindo o registro de múltiplos produtos em uma única venda.

### 06 - Validações de Cadastro de Vendas

- Implementação de validações para assegurar que requisições com dados inválidos resultem em mensagens de erro adequadas.

### 07 - Atualização de Produtos

- Criação do endpoint PUT /products/:id para atualizar informações de produtos específicos com base no id fornecido.

### 08 - Deleção de Produtos

- Implementação do endpoint DELETE /products/:id para remover produtos específicos com base no id fornecido.

## ℹ️ Habilidades Demonstradas

- Interação com banco de dados relacional MySQL.
- Implementação de uma API RESTful seguindo a arquitetura em camadas.
- Desenvolvimento de validações para garantir a integridade dos dados recebidos pela API.
- Escrita de testes unitários utilizando o framework Mocha e a biblioteca Chai para garantir a funcionalidade dos endpoints.

