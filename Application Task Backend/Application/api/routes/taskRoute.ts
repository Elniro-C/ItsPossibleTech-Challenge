import { Router } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import config from "../../config";
import ITaskController from '../../controllers/IControllers/ITaskcontroller';
const route = Router();

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all Tasks
 *     tags:
 *       - Task
 *     responses:
 *       200:
 *         description: List of Tasks
 *   post:
 *     summary: Create Task
 *     tags:
 *       - Task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *             required:
 *               - title
 *     responses:
 *       201:
 *         description: Created
 *
 * /tasks/{id}:
 *   get:
 *     summary: Get Task by ID
 *     tags:
 *       - Task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task found
 *       404:
 *         description: Not found
 *   delete:
 *     summary: Delete Task
 *     tags:
 *       - Task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Not found
 *
 * /tasks/{id}/resolve:
 *   patch:
 *     summary: Mark Task as resolved
 *     tags:
 *       - Task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task marked as resolved
 *       404:
 *         description: Not found
 */

export default (app: Router) => {
  app.use('/tasks', route);

  const ctrl = Container.get(
    config.controllers.task.name
  ) as ITaskController;

  // CREATE
  route.post(
    '',
    celebrate({
      body: Joi.object({
        title: Joi.string().min(1).required(),
      }),
    }),
    (req, res, next) => ctrl.createTask(req, res, next)
  );

  // GET ALL
  route.get(
    '',
    (req, res, next) => ctrl.getTasks(req, res, next)
  );

  // GET BY ID
  route.get(
    '/:id',
    celebrate({
      params: Joi.object({
        id: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.getTaskById(req, res, next)
  );

  // DELETE
  route.delete(
    '/:id',
    celebrate({
      params: Joi.object({
        id: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.deleteTask(req, res, next)
  );

  // PATCH - MARK AS RESOLVED
  route.patch(
    '/:id/resolve',
    celebrate({
      params: Joi.object({
        id: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.markTaskAsResolved(req, res, next)
  );
};
