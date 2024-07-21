const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Latch API Gateway',
    version: '1.0.0',
    description: 'API Gateway for Latch Microservices',
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT}`,
    },
  ],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./server.js'], // Path to the API docs
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  // Serve swagger docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
