export class LoadEnvError extends Error {
  constructor(message: string) {
    super(`failed to load env variables: ${message}`);
    this.name = "LoadEnv";
  }
}
