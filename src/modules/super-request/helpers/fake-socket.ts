import { EventEmitter } from "events";

/**
 * A fully mocked Socket replacement for the Vkrun framework.
 * It never touches real network resources — only simulates events.
 */
export class FakeSocket extends EventEmitter {
  public destroyed = false;
  public remoteAddress = "127.0.0.1";
  public remotePort = 0;
  public localAddress = "127.0.0.1";
  public localPort = 0;
  public encrypted = false;

  constructor() {
    super();
  }

  write(_chunk?: any, _encoding?: string, callback?: (error?: Error | null) => void): boolean {
    if (callback) callback(null);
    this.emit("drain");
    return true;
  }

  end(_data?: any, _encoding?: string, callback?: () => void): void {
    if (callback) callback();
    this.emit("end");
    this.emit("finish");
    this.emit("close");
    this.destroyed = true;
  }

  destroy(): void {
    this.destroyed = true;
    this.emit("close");
  }

  pause(): this {
    this.emit("pause");
    return this;
  }

  resume(): this {
    this.emit("resume");
    return this;
  }

  setTimeout(): this {
    return this;
  }

  setNoDelay(): this {
    return this;
  }

  setKeepAlive(): this {
    return this;
  }
}
