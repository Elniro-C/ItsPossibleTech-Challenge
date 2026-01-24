import { UniqueEntityID } from '../core/UniqueEntityID';
import { Mapper } from '../core/Mapper';
import { Model } from 'mongoose';
import { Task } from '../domain/task';
import { ITaskPersistence } from '../dataschema/ITaskPersistence';
import { ITaskDTO } from '../dto/ITaskDTO';
import { Document } from 'mongodb';

export class TaskMap extends Mapper<Task> {

  static toDomain(raw: any | Model<ITaskPersistence & Document>): Task {
    const createResult = Task.create(
      {
        title: raw.title
      },
      new UniqueEntityID(raw.id)
    );

    if (createResult.isFailure) {
      throw new Error(createResult.error.toString());
    }

    const result = createResult.getValue();

    // estado vindo da persistência
    result.props.completed = raw.completed;

    return result;
  }

  static toDTO(task: Task): ITaskDTO {
    const dto: ITaskDTO = {
      id: task.id.toString(),
      title: task.props.title,
      completed: task.props.completed
    };

    return dto;
  }

  static toPersistence(task: Task): any {
    return {
      id: task.id.toString(),
      title: task.props.title,
      completed: task.props.completed
    };
  }
}
