import express from 'express';
import swaggerUi from 'swagger-ui-express';
import combinedRoutes from './routes/combinedRoutes.js';

const app = express();
const PORT = 3000;

// Códigos de resposta HTTP
const HTTP_OK = 200;
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;

// Swagger Configuration
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Swagger NodeJS Project',
    version: '1.0.0',
    description: 'API documentation gerada automaticamente com Swagger.',
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
      description: 'Servidor local',
    },
  ],
  tags: [
    { name: 'Usuários', description: 'Endpoints relacionados aos usuários' },
    { name: 'Produtos', description: 'Endpoints relacionados aos produtos' },
  ],
  paths: {},
  components: {
    responses: {
      InternalServerError: {
        description: 'Erro interno do servidor.',
      },
      NotFound: {
        description: 'Recurso não encontrado.',
      },
      OK: {
        description: 'Requisição bem-sucedida',
      },
    },
  },
};

// Função auxiliar para configurar rotas e Swagger
const configureSwaggerRoutes = (routesData) => {
  routesData.forEach(route => {
    const swaggerPath = route.path.replace(/:([a-zA-Z0-9_]+)/g, '{$1}');
    swaggerDefinition.paths[swaggerPath] = swaggerDefinition.paths[swaggerPath] || {};
    swaggerDefinition.paths[swaggerPath][route.method] = {
      tags: route.tags,
      summary: route.summary,
      description: route.description,
      responses: {
        [HTTP_OK]: swaggerDefinition.components.responses.OK,
        [HTTP_NOT_FOUND]: swaggerDefinition.components.responses.NotFound,
        [HTTP_INTERNAL_SERVER_ERROR]: swaggerDefinition.components.responses.InternalServerError,
      },
    };
  });
};

// Definir as rotas para Swagger
const userRoutesData = [
  { path: '/users', method: 'get', tags: ['Usuários'], summary: 'Lista todos os usuários', description: 'Retorna a lista de usuários cadastrados.' },
  { path: '/users', method: 'post', tags: ['Usuários'], summary: 'Cria um novo usuário', description: 'Cria um novo usuário com os dados fornecidos.' },
  { path: '/users/:id', method: 'get', tags: ['Usuários'], summary: 'Retorna um usuário específico', description: 'Retorna os detalhes de um usuário com base no ID fornecido.' },
  { path: '/users/:id', method: 'put', tags: ['Usuários'], summary: 'Atualiza um usuário', description: 'Atualiza os dados de um usuário existente.' },
  { path: '/users/:id', method: 'delete', tags: ['Usuários'], summary: 'Deleta um usuário específico', description: 'Deleta um usuário específico com base no ID fornecido.' },
];


const productRoutesData = [
  { path: '/products', method: 'get', tags: ['Produtos'], summary: 'Lista todos os produtos', description: 'Retorna a lista de produtos cadastrados.' },
  { path: '/products', method: 'post', tags: ['Produtos'], summary: 'Cria um novo produto', description: 'Cria um novo produto com os dados fornecidos.' },
  { path: '/products/:id', method: 'get', tags: ['Produtos'], summary: 'Retorna um produto específico', description: 'Retorna os detalhes de um produto com base no ID fornecido.' },
  { path: '/products/:id', method: 'put', tags: ['Produtos'], summary: 'Atualiza um produto', description: 'Atualiza os dados de um produto existente.' },
  { path: '/products/:id', method: 'delete', tags: ['Produtos'], summary: 'Deleta um produto específico', description: 'Deleta um produto específico com base no ID fornecido.' },
];


// Adicionar rotas de usuários e produtos ao Swagger
configureSwaggerRoutes(userRoutesData);
configureSwaggerRoutes(productRoutesData);

// Middleware para as rotas combinadas
app.use('/api', combinedRoutes);

// Middleware para o Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
});
