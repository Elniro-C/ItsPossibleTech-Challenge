import { Container } from 'typedi';
import LoggerInstance from './logger';

export default ({ mongoConnection, schemas, controllers, repos, services}: {
                    mongoConnection: any;
                    schemas: { name: string; schema: any }[],
                    controllers: {name: string; path: string }[],
                    repos: {name: string; path: string }[],
                    services: {name: string; path: string }[] }) => {
  try {
    Container.set('logger', LoggerInstance);

    schemas.forEach(m => {
      Container.set(m.name, m.schema);
    });
  
    repos.forEach(m => {
      let repoClass = require(m.path).default;
      let repoInstance = Container.get(repoClass);
      Container.set(m.name, repoInstance);
    });

    services.forEach(m => {
      let serviceClass = require(m.path).default;
      let serviceInstance = Container.get(serviceClass)
      Container.set(m.name, serviceInstance);
      });

    controllers.forEach(m => {
      let controllerClass = require(m.path).default;
      let controllerInstance = Container.get(controllerClass);
      Container.set(m.name, controllerInstance);
    });
  
    return;
  } catch (e) {
    LoggerInstance.error('Warning: Error on dependency injector loader: %o', e);
    throw e;
  }
};
