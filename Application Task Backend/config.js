import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  throw new Error("⚠️ Couldn't find .env file ⚠️");
}

export default {
  /**
   * Database configuration
   */
  databaseURL:"mongodb://mongoadmin:5d9ba8d38e4dbc7c5a1b35cf@vsgate-s1.dei.isep.ipp.pt:10245/ItsPossible?authSource=admin",
  databaseConnectionRetries: 5,
  databaseConnectionTimeoutMS: 100000,

  /**
   * Logger configuration
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configuration
   */
  api: {
    prefix: '/api',
  },

  /**
   * Controllers
   */
  controllers: {
    task: {
      name: "TaskController",
      path: "../controllers/taskController"
    }
  },

  /**
   * Repositories
   */
  repos: {
    task: {
      name: "TaskRepo",
      path: "../repos/taskRepo"
    }
  },

  /**
   * Services
   */
  services: {
    task: {
      name: "TaskService",
      path: "../services/taskService"
    }
  }
};
