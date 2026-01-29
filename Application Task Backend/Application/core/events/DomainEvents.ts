import { IDomainEvent } from './IDomainEvent';

export class DomainEvents {
    private static aggregates: any[] = [];

    public static markAggregateForDispatch(aggregate: any): void {
      if (!this.aggregates.includes(aggregate)) {
        this.aggregates.push(aggregate);
      }
    }
  private static handlersMap: { [key: string]: Array<(event: IDomainEvent) => void> } = {};

  public static register(eventName: string, handler: (event: IDomainEvent) => void): void {
    if (!this.handlersMap[eventName]) {
      this.handlersMap[eventName] = [];
    }
    this.handlersMap[eventName].push(handler);
  }

  public static dispatch(event: IDomainEvent): void {
    const eventName = event.constructor.name;
    const handlers = this.handlersMap[eventName] || [];
    handlers.forEach(handler => handler(event));
  }
}
