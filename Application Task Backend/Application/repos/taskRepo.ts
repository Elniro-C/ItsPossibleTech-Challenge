import { Service, Inject } from 'typedi';
import { Document, Model } from 'mongoose';
import { ITaskRepo } from '../services/IRepos/ITaskRepo';
import { ITaskPersistence } from '../dataschema/ITaskPersistence';
import { Task } from '../domain/task';
import { TaskMap } from '../mappers/TaskMap';

@Service()
export default class TaskRepo implements ITaskRepo {

  constructor(
    @Inject('taskSchema')
    private taskSchema: Model<ITaskPersistence & Document>
  ) {}

  async save(task: Task): Promise<Task> {
    const raw = TaskMap.toPersistence(task);

    try {
      const document = await this.taskSchema.findOne({ id: raw.id });

      if (document) {
        await this.taskSchema.updateOne({ id: raw.id }, raw);
      } else {
        await this.taskSchema.create(raw);
      }

      return TaskMap.toDomain(raw);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(`Failed to save task: ${message}`);
    }
  }

  async findById(id: string): Promise<Task | null> {
    try {
      const document = await this.taskSchema.findOne({ id });

      if (!document) {
        return null;
      }

      return TaskMap.toDomain(document);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(`Failed to find task by id: ${message}`);
    }
  }

  async findAll(): Promise<Task[]> {
    try {
      const documents = await this.taskSchema.find();
      return documents.map((doc) => TaskMap.toDomain(doc));
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
      throw new Error(`Failed to find all tasks: ${message}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.taskSchema.deleteOne({ id });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(`Failed to delete task: ${message}`);
    }
  }
}
