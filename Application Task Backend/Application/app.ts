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

  app
    .listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
      Logger.info(`
        ################################################
        🛡️  Server listening on port: ${PORT} 🛡️
        ################################################
      `);
    })
    .on('error', (err) => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
