export class Spy<T extends Record<string, any>, K extends keyof T> {
  originalFunction: T[K];
  calls: any[] = [];
  overriddenImplementation?: (...args: any[]) => any;

  constructor(
    private object: T,
    private method: K,
  ) {
    // Store the original method
    this.originalFunction = object[method];

    // Replace it with a spy wrapper
    object[method] = ((...args: any[]) => {
      this.calls.push(args);

      // If the user provided a custom implementation,
      // call that instead of the original function
      if (this.overriddenImplementation) {
        return this.overriddenImplementation(...args);
      }

      // Otherwise call the original function
      return (this.originalFunction as Function).apply(object, args);
    }) as T[K];
  }

  // The method you can chain to override the original function
  public mockImplementation(fn: (...args: any[]) => any = () => {}): this {
    this.overriddenImplementation = fn;
    return this;
  }

  // Built-in assertions
  public toHaveBeenCalled(): void {
    if (this.calls.length === 0) {
      throw new Error(`Expected ${String(this.method)} to have been called.`);
    }
  }

  public toHaveBeenCalledWith(...expectedArgs: any[]): void {
    const matched = this.calls.some((callArgs) => JSON.stringify(callArgs) === JSON.stringify(expectedArgs));
    if (!matched) {
      throw new Error(`Expected ${String(this.method)} to be called with ${JSON.stringify(expectedArgs)}`);
    }
  }

  // Restore the original function
  public restore(): void {
    this.object[this.method] = this.originalFunction;
  }
}
