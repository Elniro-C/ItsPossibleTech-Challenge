import { Request, Response, NextFunction } from 'express';

export default interface ITaskController {
  createTask(req: Request, res: Response, next: NextFunction): Promise<void>;
  getTasks(req: Request, res: Response, next: NextFunction): Promise<void>;
  getTaskById(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteTask(req: Request, res: Response, next: NextFunction): Promise<void>;
  markTaskAsResolved(req: Request, res: Response, next: NextFunction): Promise<void>;
}
