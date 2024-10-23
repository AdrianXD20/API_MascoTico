const swaggerjsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'apiv.1',
            version: '1.0.0',
            description: 'API SHOW USERS',
            contact: {
                name: 'AlexGei',
            },
            servers: [
                {
                    url: 'https://alexyah064.github.io',
                },
                {
                    url: 'http://localhost:3000'
                }
            ]
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', 
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./routes/*.js']
}

const specs = swaggerjsdoc(options);

module.exports = specs;
