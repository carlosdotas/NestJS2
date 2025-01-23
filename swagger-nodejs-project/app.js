import express from 'express';
import swaggerUi from 'swagger-ui-express';
import SwaggerConfig from './SwaggerConfig.js';
import userRoutesDatas  from './routes/usersRoutes.js'; 
import productRoutesDatas from './routes/productsRoutes.js';


const router = express(); 
const PORT = 3000;


// Create an instance of SwaggerConfig
const swaggerConfig = new SwaggerConfig(PORT,router,express);

//app.use(express.json()); // Middleware para processar JSON no body

// Configure routes for users and products in Swagger
swaggerConfig.configureRoutes(userRoutesDatas,router);
swaggerConfig.configureRoutes(productRoutesDatas,router);

// Middleware for Swagger
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig.getSwaggerDefinition()));

// Start the server
router.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});