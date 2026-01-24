import { Request, Response, NextFunction } from 'express';
import { Service, Inject } from 'typedi';
import config from '../config';
import { ITaskDTO } from '../dto/ITaskDTO';
import ITaskService from '../services/IServices/ITaskService';
import ITaskController from './IControllers/ITaskController';

@Service()
export default class TaskController implements ITaskController {

  constructor(
    @Inject(config.services.task.name) private taskService: ITaskService
  ) {}

  async createTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const taskDTO: ITaskDTO = req.body;
      const result = await this.taskService.createTask(taskDTO);

      if (result.isFailure) {
        res.status(400).json({ error: result.error });
        return;
      }

      res.status(201).json(result.getValue());
    } catch (err: unknown) {
      next(err);
    }
  }

  async getTasks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.taskService.getTasks();

      if (result.isFailure) {
        res.status(400).json({ error: result.error });
        return;
      }

      res.status(200).json(result.getValue());
    } catch (err: unknown) {
      next(err);
    }
  }

  async getTaskById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      const result = await this.taskService.getTaskById(id);

      if (result.isFailure) {
        res.status(404).json({ error: result.error });
        return;
      }

      res.status(200).json(result.getValue());
    } catch (err: unknown) {
      next(err);
    }
  }

  async deleteTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      const result = await this.taskService.deleteTask(id);

      if (result.isFailure) {
        res.status(404).json({ error: result.error });
        return;
      }

      res.status(200).json(result.getValue());
    } catch (err: unknown) {
      next(err);
    }
  }

  async markTaskAsResolved(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      const result = await this.taskService.markTaskAsResolved(id);

      if (result.isFailure) {
        res.status(400).json({ error: result.error });
        return;
      }

      res.status(200).json(result.getValue());
    } catch (err: unknown) {
      next(err);
    }
  }
}
