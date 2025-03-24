import { existsSync, resolve } from "../runtime";
import { LoadEnvOptions } from "../types";
import { LoadEnvError } from "../errors";
import { isArray, isString } from "../utils";
import { parseEnvFile } from "./helpers";

export const loadEnv = <T = Record<string, any>>(options: LoadEnvOptions = {}): T => {
  const nodeEnv = process.env.NODE_ENV;
  const defaultEnvPath = nodeEnv ? `.env.${nodeEnv}` : ".env";
  const envPath = options.path ?? resolve(process.cwd(), defaultEnvPath);
  const encoding = options.encoding ?? "utf8";
  const override = options.override ?? true;
  const debug = options.debug ?? false;
  const schema = options.schema;
  let envs: any = {};

  if (isString(envPath)) {
    if (existsSync(envPath)) {
      envs = parseEnvFile(envPath, encoding, override, debug);
    } else if (debug) {
      console.warn(`loadEnv: file not found at ${envPath}`);
    }
  } else if (isArray(envPath)) {
    envPath.forEach((path) => {
      if (existsSync(path)) {
        envs = parseEnvFile(path, encoding, override, debug);
      } else if (debug) {
        console.warn(`loadEnv: file not found at ${path}`);
      }
    });
  }

  if (schema) {
    const validatedEnvVars = schema.test(envs, "envVars");

    if (!validatedEnvVars.passedAll) {
      throw new LoadEnvError(validatedEnvVars.errors[0].message);
    }
  }

  if (debug) {
    console.log("env variables loaded successfully!\n", JSON.stringify(envs, null, 2));
  }

  return envs;
};
