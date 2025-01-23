import express from 'express';
import swaggerUi from 'swagger-ui-express';
import combinedRoutes from './routes/combinedRoutes.js';
import { userRoutesData, productRoutesData } from './routes/combinedRoutes.js';

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
  tags: [],
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

// Adicionar rotas de usuários e produtos ao Swagger
configureSwaggerRoutes(userRoutesData);
configureSwaggerRoutes(productRoutesData);

// Middleware para o Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

// Middleware para as rotas combinadas
app.use('/api', combinedRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
});
