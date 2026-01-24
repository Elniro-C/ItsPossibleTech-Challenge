import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
  Logger.info('✌️ Connecting to Database...');
  
  const mongoConnection = await mongooseLoader();

  Logger.info('✌️ DB loaded and connected!');

  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const incidentTypeSchema = {
    name: 'incidentTypeSchema',
    schema: '../persistence/schemas/incidentTypeSchema',
  };

  const incidentSchema = {
    name: 'incidentSchema',
    schema: '../persistence/schemas/incidentSchema',
  };

  const complementaryTaskCategorySchema = {
    name: 'complementaryTaskCategorySchema',
    schema: '../persistence/schemas/complementaryTaskCategoriesShema',
  };

  const vesselVisitExecutionSchema = {
    name: 'vesselVisitExecutionSchema',
    schema: '../persistence/schemas/vesselVisitExecutionSchema',
  };

  const operationPlanSchema = {
    name: 'operationPlanSchema',
    schema: '../persistence/schemas/operationPlanSchema',
  };

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const incidentTypeController = {
    name: config.controllers.incidentType.name,
    path: config.controllers.incidentType.path
  }

  const incidentController = {
    name: config.controllers.incident.name,
    path: config.controllers.incident.path
  }

  const complementaryTaskCategoryController = {
    name: config.controllers.complementaryTaskCategory.name,
    path: config.controllers.complementaryTaskCategory.path
  }

  const vesselVisitExecutionController = {
    name: config.controllers.vesselVisitExecution.name,
    path: config.controllers.vesselVisitExecution.path
  }

  const port3DVisualizationController = {
    name: config.controllers.port3DVisualization.name,
    path: config.controllers.port3DVisualization.path
  }

  const operationPlanController = {
    name: config.controllers.operationPlan.name,
    path: config.controllers.operationPlan.path
  }

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const incidentTypeRepo = {
    name: config.repos.incidentType.name,
    path: config.repos.incidentType.path
  }

  const incidentRepo = {
    name: config.repos.incident.name,
    path: config.repos.incident.path
  }

  const complementaryTaskCategoryRepo = {
    name: config.repos.complementaryTaskCategory.name,
    path: config.repos.complementaryTaskCategory.path
  }

  const vesselVisitExecutionRepo = {
    name: config.repos.vesselVisitExecution.name,
    path: config.repos.vesselVisitExecution.path
  }

  const operationPlanRepo = {
    name: config.repos.operationPlan.name,
    path: config.repos.operationPlan.path
  }

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  const incidentTypeService = {
    name: config.services.incidentType.name,
    path: config.services.incidentType.path
  }

  const incidentService = {
    name: config.services.incident.name,
    path: config.services.incident.path
  }

  const complementaryTaskCategoryService = {
    name: config.services.complementaryTaskCategory.name,
    path: config.services.complementaryTaskCategory.path
  }

  const vesselVisitExecutionService = {
    name: config.services.vesselVisitExecution.name,
    path: config.services.vesselVisitExecution.path
  }

  const port3DVisualizationService = {
    name: config.services.port3DVisualization.name,
    path: config.services.port3DVisualization.path
  }

  const operationPlanService = {
    name: config.services.operationPlan.name,
    path: config.services.operationPlan.path
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      incidentTypeSchema,
      incidentSchema,
      complementaryTaskCategorySchema,
      vesselVisitExecutionSchema,
      operationPlanSchema
    ],
    controllers: [
      roleController,
      incidentTypeController,
      incidentController,
      complementaryTaskCategoryController,
      vesselVisitExecutionController,
      port3DVisualizationController,
      operationPlanController
    ],
    repos: [
      roleRepo,
      userRepo,
      incidentTypeRepo,
      incidentRepo,
      complementaryTaskCategoryRepo,
      vesselVisitExecutionRepo,
      operationPlanRepo
    ],
    services: [
      roleService,
      incidentTypeService,
      incidentService,
      complementaryTaskCategoryService,
      vesselVisitExecutionService,
      port3DVisualizationService,
      operationPlanService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
}
