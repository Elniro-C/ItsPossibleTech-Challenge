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
  databaseURL:
    "mongodb://mongoadmin:3992fceb0f1c1e265a7f046c@vsgate-s1.dei.isep.ipp.pt:11015/oem?authSource=admin",
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
