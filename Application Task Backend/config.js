import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port : optional change to 4000 by JRT
   */
  port: parseInt(process.env.PORT, 10) || 4000, 

  /**
   * That long string from mlab
   */
  databaseURL: "mongodb://mongoadmin:3992fceb0f1c1e265a7f046c@vsgate-s1.dei.isep.ipp.pt:11015/oem?authSource=admin",
  databaseConnectionRetries: 5,
  databaseConnectionTimeoutMS : 100000,

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    role: {
      name: "RoleController",
      path: "../controllers/roleController"
    },
    incidentType: {
      name: "IncidentTypeController",
      path: "../controllers/incidentTypeController"
    },
    incident: {
      name: "IncidentController", 
      path: "../controllers/incidentController"
    },
    complementaryTaskCategory: {
      name: "ComplementaryTaskCategoryController",
      path: "../controllers/complementaryTaskCategoryController"
    },
    vesselVisitExecution: {
      name: "VesselVisitExecutionController",
      path: "../controllers/vesselVisitExecutionController"
    },
    port3DVisualization: {
      name: "Port3DVisualizationController",
      path: "../controllers/port3DVisualizationController"
    },
    operationPlan: {
      name: "OperationPlanController",
      path: "../controllers/operationPlanController"
    }
  },

  repos: {
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    },
    incidentType: {
      name: "IncidentTypeRepo",
      path: "../repos/IncidentTypeRepo"
    },
    incident: {
      name: "IncidentRepo",
      path: "../repos/incidentRepo"
    },
    complementaryTaskCategory: {
      name: "ComplementaryTaskCategoryRepo",
      path: "../repos/complementaryTaskCategoryRepo"
    },
    vesselVisitExecution: {
      name: "VesselVisitExecutionRepo",
      path: "../repos/vesselVisitExecutionRepo"
    },
    operationPlan: {
      name: "OperationPlanRepo",
      path: "../repos/operationPlanRepo"
    }
  },

  services: {
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },
    incidentType: {
      name: "IncidentTypeService",
      path: "../services/incidentTypeService"
    },
    incident: {
      name: "IncidentService",
      path: "../services/incidentService"
    },
    complementaryTaskCategory: {
      name: "ComplementaryTaskCategoryService",
      path: "../services/complementaryTaskCategoryService"
    },
    vesselVisitExecution: {
      name: "VesselVisitExecutionService",
      path: "../services/vesselVisitExecutionService"
    },
    port3DVisualization: {
      name: "Port3DVisualizationService",
      path: "../services/port3DVisualizationService"
    },
    operationPlan: {
      name: "OperationPlanService",
      path: "../services/operationPlanService"
    }
  },

  externalServices: {
    dddNetCore: {
      baseURL: 'http://localhost:5172'
    }
  },
};
