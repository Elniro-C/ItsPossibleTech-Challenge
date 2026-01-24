import { AggregateRoot } from "../core/AggregateRoot";
import { UniqueEntityID } from "../core/UniqueEntityID";
import { Result } from "../core/Result";
import { Guard } from "../core/Guard";

export interface TaskProps {
  title: string;
  completed: boolean;
  deleted?: boolean;
}

export interface CreateTaskProps {
  title: string;
}

export class Task extends AggregateRoot<TaskProps> {

  private constructor(props: TaskProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get title(): string {
    return this.props.title;
  }

  get completed(): boolean {
    return this.props.completed;
  }

  get deleted(): boolean {
    return this.props.deleted ?? false;
  }

  static create(props: CreateTaskProps, id?: UniqueEntityID): Result<Task> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.title, argumentName: 'title' }
    ]);

    if (!guardResult.succeeded) {
      return Result.fail(guardResult.message);
    }

    if (props.title.trim().length === 0) {
      return Result.fail('Title must not be empty');
    }

    const task = new Task(
      {
        title: props.title,
        completed: false,
        deleted: false
      },
      id || new UniqueEntityID()
    );

    return Result.ok(task);
  }

  markAsResolved(): Result<void> {
    if (this.props.completed) {
      return Result.fail('Task already completed');
    }

    if (this.deleted) {
      return Result.fail('Cannot complete a deleted task');
    }

    this.props.completed = true;
    return Result.ok();
  }

  delete(): Result<void> {
    if (this.deleted) {
      return Result.fail('Task already deleted');
    }

    this.props.deleted = true;
    return Result.ok();
  }
}
