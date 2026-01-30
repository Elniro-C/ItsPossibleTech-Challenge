import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';
import express from 'express';

import config from '../config';
import taskschema from '../persistence/taskschema';

export default async ({ expressApp }: { expressApp: express.Application }) => {
  Logger.info('✌️ Connecting to Database...');
  
  const mongoConnection = await mongooseLoader();

  Logger.info('✌️ DB loaded and connected!');

  const userSchema = {
    name: 'taskSchema',
    schema: taskschema,
  };

  

  const taskController = {
    name: config.controllers.task.name,
    path: config.controllers.task.path
  };

  const taskRepo = {
    name: config.repos.task.name,
    path: config.repos.task.path
  };

  const taskService = {
    name: config.services.task.name,
    path: config.services.task.path
  };

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      {
        name: 'taskSchema',
        schema: taskschema
      }
    ],
    controllers: [
      taskController
    ],
    repos: [
      taskRepo
    ],
    services: [
      taskService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
}
