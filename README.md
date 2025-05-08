# Desafio Técnico - Integração com API de CEP

Este projeto tem como objetivo integrar uma aplicação Node.js com a API ViaCEP para consultar informações de endereços a partir de um CEP.

## Tecnologias Utilizadas

- **Node.js** com **TypeScript**
- **Express** para construção da API
- **Sequelize** para ORM (integração com banco de dados PostgreSQL)
- **PostgreSQL** como banco de dados
- **Docker** para containerização

## Como Rodar o Projeto

### Pré-requisitos

Antes de começar, você precisa ter instalado na sua máquina:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

### Passo 1: Clonando o Repositório

Clone este repositório para sua máquina local:

```bash
git clone https://github.com/RafaelCamilloJorge/Desafio-Tecnico-Integracao-com-API-de-CEP.git
cd Desafio-Tecnico-Integracao-com-API-de-CEP
```

### Passo 2: Instalando as Dependências
```bash
npm install
```
Criar o arquivo .env utilizando como base o .env.exemple

### Passo 3: Rodando o Projeto com Docker
```bash
npm run start:dev
```

### Passo 4: Acessando a API
Exemplo de Requisição:

GET http://localhost:3000/api/cep/:cep

### Passo 5: Rodando Testes
```bash
npm test
```

### Estrutura do Projeto
├── src    
│ ├── controllers # Lógica de controle da API  
│ ├── services # Serviços de integração e manipulação de dados  
│ ├── repository # Camada de acesso ao banco de dados  
│ ├── models # Definição dos modelos de dados  
│ ├── routes # Rotas da API  
│ ├── config # Configurações do banco  
│ ├── tests # Testes Unitarios  
├── docker-compose.yml # Arquivo de configuração do Docker  
├── package.json # Dependências e scripts do projeto  
├── tsconfig.json # Configurações do TypeScript  
└── .gitignore # Arquivo de exclusão de arquivos do Git  
