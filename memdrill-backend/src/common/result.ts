export class Result<T> {
  private constructor(
    public readonly success: boolean,
    private readonly value?: T,
    public readonly error?: string,
  ) {}

  getValue(): T {
    if (!this.success) {
      throw new Error('Cannot get value from failed result');
    }
    return this.value!;
  }

  static ok<T>(value: T) {
    return new Result(true, value);
  }

  static fail<T>(error: string) {
    return new Result<T>(false, undefined, error);
  }
}
