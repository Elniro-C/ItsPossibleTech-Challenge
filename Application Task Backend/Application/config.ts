export default {
  repos: {
    task: {
      name: 'TaskRepo',
      path: '../repos/taskRepo'
    }
  },
  services: {
    task: {
      name: 'TaskService',
      path: '../services/taskService'
    }
  },
  controllers: {
    task: {
      name: 'TaskController',
      path: '../controllers/taskController'
    }
  },
  api: {
    prefix: '/api'
  },
  logs: {
    level: 'info'
  },
  databaseURL: process.env.MONGODB_URI || 'mongodb://localhost:27017/tasks',
  databaseConnectionRetries: 5,
  databaseConnectionTimeoutMS: 10000
};
