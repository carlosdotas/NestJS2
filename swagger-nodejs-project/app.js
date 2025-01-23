import 'dotenv/config';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import SwaggerConfig from './SwaggerConfig.js';

import authRoutesDatas  from './routes/authRoutes.js'; 
import userRoutesDatas  from './routes/usersRoutes.js'; 
import productRoutesDatas from './routes/productsRoutes.js';

const router = express(); 
const PORT = 3000;

// Create an instance of SwaggerConfig
const swaggerConfig = new SwaggerConfig(PORT,router,express);

// Configure routes for users and products in Swagger

swaggerConfig.configureRoutes(authRoutesDatas);
swaggerConfig.configureRoutes(userRoutesDatas);
swaggerConfig.configureRoutes(productRoutesDatas);


// Middleware for Swagger
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig.getSwaggerDefinition()));

// Start the server
router.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});