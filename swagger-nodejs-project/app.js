import express from 'express';
import swaggerUi from 'swagger-ui-express';
import SwaggerConfig from './SwaggerConfig.js';
import combinedRoutes from './routes/combinedRoutes.js';
import { userRoutesDatas } from './routes/usersRoutes.js';

import { userRoutesData, productRoutesData } from './routes/combinedRoutes.js';

const app = express();
const PORT = 3000;

// Create an instance of SwaggerConfig
const swaggerConfig = new SwaggerConfig(PORT);

// Configure routes for users and products in Swagger
swaggerConfig.configureRoutes(userRoutesData);
swaggerConfig.configureRoutes(productRoutesData);

// Middleware for Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig.getSwaggerDefinition()));

userRoutesDatas.forEach(route => {
  app[route.method](route.path, route.action);
})
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});