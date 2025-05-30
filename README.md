# URL Shortener - Azure Functions

Este projeto é um encurtador de URLs implementado usando Azure Functions. Ele consiste em duas funções HTTP:
1. Uma função para criar URLs curtas
2. Uma função para redirecionar URLs curtas para as originais

## Requisitos

- Node.js (versão recomendada: 14.x ou superior)
- NPM (gerenciador de pacotes do Node.js)
- Azure Functions Core Tools (para execução local)

## Instalação

Para instalar as dependências do projeto, execute o seguinte comando na raiz do projeto:

```bash
npm install
```

## Compilação

Para compilar o projeto TypeScript, execute:

```bash
npm run build
```

Este comando compila os arquivos TypeScript para JavaScript na pasta `dist/`.

## Execução

Após a compilação, inicie as funções localmente com:

```bash
npm start
```

Ou alternativamente:

```bash
func start
```

As funções serão executadas localmente e estarão disponíveis para teste.

## Funções disponíveis

### 1. ShortenUrl

**Endpoint:** `POST /api/shorten`

Esta função recebe uma URL original e retorna uma versão encurtada.

**Uso:**
```json
{
  "url": "https://www.example.com/sua-url-longa-aqui"
}
```

**Resposta:**
```json
{
  "shortUrl": "http://localhost:7071/api/abcXYZ",
  "originalUrl": "https://www.example.com/sua-url-longa-aqui"
}
```

### 2. RedirectUrl

**Endpoint:** `GET /api/{shortId}`

Esta função recebe o ID curto gerado e redireciona o usuário para a URL original correspondente.

**Uso:**
Basta acessar a URL encurtada, por exemplo: `http://localhost:7071/api/abcXYZ`

**Resposta:**
- Redirecionamento 302 para a URL original se o shortId for válido
- Mensagem de erro 404 "URL não encontrada" se o shortId não existir

## Funcionamento

O sistema utiliza um arquivo `url-mapping.json` para armazenar as correspondências entre IDs curtos e URLs originais. Os IDs curtos são gerados aleatoriamente com 6 caracteres alfanuméricos.

## Desenvolvimento

O projeto é estruturado da seguinte forma:
- `ShortenUrl/`: Função para criar URLs curtas
- `RedirectUrl/`: Função para redirecionar URLs curtas para as originais
- `ShortenUrl/database.ts`: Implementação do armazenamento de mapeamento de URLs
