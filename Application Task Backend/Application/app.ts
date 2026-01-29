import 'dotenv/config';

import 'reflect-metadata';

const morgan = require('morgan');

import express from 'express';
import Logger from './loaders/logger';

async function startServer() {
  const app = express();

  app.use(morgan('dev'));

  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
      Logger.info(
        `[${req.method}] ${fullUrl} - Status: ${res.statusCode} - Tempo: ${duration}ms`
      );
    });
    next();
  });

  await require('./loaders').default({ expressApp: app });

  const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
;

  app.listen(PORT, () => {
  const baseUrl = `http://localhost:${PORT}`;
  const swaggerPath = '/swagger';

  Logger.info(`

 Server running at ${baseUrl}
 Swagger available at ${baseUrl}${swaggerPath}

  `);
});

}

startServer();
