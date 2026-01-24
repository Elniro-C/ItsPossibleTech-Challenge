import { Result } from "../../core/Result";
import { ITaskDTO } from "../../dto/ITaskDTO";

export default interface ITaskService {
  createTask(taskDTO: ITaskDTO): Promise<Result<ITaskDTO>>;
  getTasks(): Promise<Result<ITaskDTO[]>>;
  getTaskById(taskId: string): Promise<Result<ITaskDTO>>;
  deleteTask(taskId: string): Promise<Result<ITaskDTO>>;
  markTaskAsResolved(taskId: string): Promise<Result<ITaskDTO>>;
}
