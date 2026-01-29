import config from '../config';
import swaggerJsdoc from 'swagger-jsdoc';


const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Swagger',
      version: '1.0.0',
      description: 'Operations and Execution Management API documentation',
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}${config.api.prefix}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string', format: 'email' },
            role: { type: 'string' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            error: { type: 'string' },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    './Application/api/routes/*.ts',
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
