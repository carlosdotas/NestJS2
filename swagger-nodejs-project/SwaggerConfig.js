// SwaggerConfig.js
class SwaggerConfig {
    constructor(PORT) {
        this.swaggerDefinition = {
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
    }

    // Function to configure routes
    configureRoutes(routesData) {
        routesData.forEach(route => {
            const swaggerPath = route.path.replace(/:([a-zA-Z0-9_]+)/g, '{$1}');
            this.swaggerDefinition.paths[swaggerPath] = this.swaggerDefinition.paths[swaggerPath] || {};
            this.swaggerDefinition.paths[swaggerPath][route.method] = {
                tags: route.tags,
                summary: route.summary,
                description: route.description,
                responses: {
                    200: this.swaggerDefinition.components.responses.OK,
                    404: this.swaggerDefinition.components.responses.NotFound,
                    500: this.swaggerDefinition.components.responses.InternalServerError,
                },
            };
        });
    }

    // Function to get the Swagger definition
    getSwaggerDefinition() {
        return this.swaggerDefinition;
    }
}

// Exporting the class for external use
export default SwaggerConfig;