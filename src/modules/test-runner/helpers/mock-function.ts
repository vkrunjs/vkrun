export class MockFunction {
  // Use a private array but expose it with a public getter
  private _calls: any[] = [];
  public get calls() {
    return this._calls;
  }

  // Optionally store a default returnValue
  private returnValue?: any;

  // We'll store a custom implementation here if one is set
  private implementation?: (...args: any[]) => any;

  /**
   * Sets a simple return value.
   * @param value
   * @returns this for optional chaining
   */
  public mockReturnValue(value: any): this {
    this.returnValue = value;
    return this;
  }

  /**
   * Allows you to override the function's implementation.
   * @param fn
   * @returns this for optional chaining
   */
  public mockImplementation(fn: (...args: any[]) => any): this {
    this.implementation = fn;
    return this;
  }

  /**
   * The function used at runtime. Tracks calls, then delegates
   * either to `mockImplementation` if provided, or returns `returnValue`.
   */
  public fn(...args: any[]): any {
    this._calls.push(args);

    if (this.implementation) {
      return this.implementation(...args);
    }

    return this.returnValue;
  }

  /**
   * Check whether the function was called at least once.
   */
  public toHaveBeenCalled(): boolean {
    return this._calls.length > 0;
  }

  /**
   * Check whether the function was called with specific arguments.
   */
  public toHaveBeenCalledWith(...args: any[]): boolean {
    return this._calls.some((call) => JSON.stringify(call) === JSON.stringify(args));
  }
}
