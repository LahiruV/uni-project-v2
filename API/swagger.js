const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'EventEase API',
        description: 'Automatically generated Swagger documentation for EventEase'
    },
    host: 'localhost:3000',
    schemes: ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
