export class Identifier<T> {
  private readonly _value: T;

  constructor(value: T) {
    this._value = value;
  }

  public equals(id?: Identifier<T>): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    return id.toValue() === this._value;
  }

  public toString(): string {
    return String(this._value);
  }

  public toValue(): T {
    return this._value;
  }
}
