import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../api/routes';
import config from '../config';
import swaggerSpec from './swagger';
import swaggerUi from 'swagger-ui-express';
import { errors as celebrateErrors } from 'celebrate';

export default ({ app }: { app: express.Application }) => {
  /**
   * @TODO Explain why they are here
   */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  
  app.enable('trust proxy');

  
  app.use(cors());

  
  app.use(require('method-override')());

  
  app.use(bodyParser.json());
  
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: 'Task APi Documentation',
    customCss: '.swagger-ui .topbar { display: none }',
  }));

  app.use(config.api.prefix, routes());

  app.use(celebrateErrors());

  app.use((req, res, next) => {
    const err = new Error('Not Found') as any;
    err.status = 404;
    next(err);
  });

  app.use((err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
