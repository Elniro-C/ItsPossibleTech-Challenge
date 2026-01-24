import { Inject, Service } from "typedi";
import { Result } from "../core/Result";
import ITaskService from "./IServices/ITaskService";
import { ITaskRepo } from "./IRepos/ITaskRepo";
import { ITaskDTO } from "../dto/ITaskDTO";
import { Task } from "../domain/task";
import { TaskMap } from "../mappers/TaskMap";
import config from "../config";


@Service()
export default class TaskService implements ITaskService {

  constructor(
    @Inject(config.repos.task.name) private taskRepo: ITaskRepo
  ) {}


  async createTask(taskDTO: ITaskDTO): Promise<Result<ITaskDTO>> {
    try {
      const existingTask = await this.taskRepo.findById(taskDTO.id);
      if (existingTask) {
        return Result.fail<ITaskDTO>('Task with this ID already exists');
      }

      const newTaskOrError = Task.create({
        title: taskDTO.title
      });

      if (newTaskOrError.isFailure) {
        return Result.fail<ITaskDTO>(newTaskOrError.error);
      }

      const newTask = newTaskOrError.getValue();
      await this.taskRepo.save(newTask);

      return Result.ok<ITaskDTO>(TaskMap.toDTO(newTask));

    } catch (err: unknown) {
      return Result.fail<ITaskDTO>(`Failed to create task: ${getErrorMessage(err)}`);
    }
  }

  async getTasks(): Promise<Result<ITaskDTO[]>> {
    try {
      const tasks = await this.taskRepo.findAll();
      return Result.ok(tasks.map(task => TaskMap.toDTO(task)));
    } catch (err: unknown) {
      return Result.fail(`Failed to get tasks: ${getErrorMessage(err)}`);
    }
  }

  async getTaskById(taskId: string): Promise<Result<ITaskDTO>> {
    try {
      const task = await this.taskRepo.findById(taskId);
      if (!task) return Result.fail('Task not found');
      return Result.ok(TaskMap.toDTO(task));
    } catch (err: unknown) {
      return Result.fail(`Failed to get task by ID: ${getErrorMessage(err)}`);
    }
  }

  

  async deleteTask(taskId: string): Promise<Result<ITaskDTO>> {
    try {
      const task = await this.taskRepo.findById(taskId);
      if (!task) return Result.fail('Task not found');

      await this.taskRepo.delete(taskId);
      return Result.ok(TaskMap.toDTO(task));

    } catch (err: unknown) {
      return Result.fail(`Failed to delete task: ${getErrorMessage(err)}`);
    }
  }

  async markTaskAsResolved(taskId: string): Promise<Result<ITaskDTO>> {
    try {
      const task = await this.taskRepo.findById(taskId);
      if (!task) return Result.fail('Task not found');

      const result = task.markAsResolved();
      if (result.isFailure) return Result.fail(result.error);

      await this.taskRepo.save(task);
      return Result.ok(TaskMap.toDTO(task));

    } catch (err: unknown) {
      return Result.fail(`Failed to mark task as resolved: ${getErrorMessage(err)}`);
    }
  }
}

function getErrorMessage(err: unknown) {
  throw new Error("Function not implemented.");
}

