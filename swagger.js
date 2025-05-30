const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'YelpCamp API',
            version: '1.0.0',
            description: 'A API documentation for campgrounds and reviews'
        },
        servers: [
            {
                url: 'http://localhost:4000'
            }
        ]
    },
    apis: ['./routers/*.js', './models/*.js'] // Path to the API docs
}

const swaggerSpec = swaggerJsDoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec,
}