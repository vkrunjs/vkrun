import { existsSync, resolve } from "../runtime";
import { LoadEnvOptions } from "../types";
import { LoadEnvError } from "../errors";
import { isArray, isString } from "../utils";
import { parseEnvFile } from "./helpers";

/**
 * Loads environment variables from `.env` files into `process.env` while providing type inference and validation.
 *
 * This function enhances the default behavior of environment variable management by:
 * - **Supporting multiple `.env` files** (e.g., `.env.test`, `.env.production`).
 * - **Automatically parsing values** such as booleans, numbers, arrays, and objects when assigned to a variable.
 * - **Providing schema validation** to enforce type correctness and avoid misconfigurations.
 * - **Allowing explicit type inference using `InferOut<typeof schemaName>` or `object`** for easier usage.
 *
 * ---
 *
 * ### 🔥 Important: Type Parsing Behavior
 *
 * - If you **call `loadEnv()` without assigning it to a variable**, it loads variables into `process.env`,
 *   but **everything remains a string** because `process.env` only stores strings.
 * - If you **assign `loadEnv()` to a variable**, it returns an **object with parsed values** based on the file contents.
 * - If a **schema is provided**, the returned values will be validated and typed accordingly.
 * - You can **explicitly type** the return value using `InferOut<typeof schemaName>` or `object`.
 *
 * ---
 *
 * @param {LoadEnvOptions & { schema?: S }} [options] - Optional configurations for loading environment variables.
 * @param {string | string[]} [options.path] - Path(s) to the `.env` file(s). If not provided, defaults to:
 *   - `.env.NODE_ENV` if `NODE_ENV` is set (e.g., `.env.test`, `.env.production`).
 *   - `.env` if `NODE_ENV` is not set.
 * @param {string} [options.encoding="utf8"] - File encoding.
 * @param {boolean} [options.override=true] - Whether to override existing `process.env` variables.
 * @param {boolean} [options.debug=false] - Enables logging for debugging.
 * @param {S} [options.schema] - Optional schema to validate and infer types for environment variables.
 *
 * @returns Object containing parsed environment variables.
 *
 * @throws {LoadEnvError} - If schema validation fails.
 *
 * ---
 *
 * ## 🔥 Key Takeaways:
 *
 * - If you **just call `loadEnv()`**, everything in `process.env` **remains a string**.
 * - If you **assign `loadEnv()` to a variable**, it **returns parsed values**.
 * - If you **use a schema**, `loadEnv()` **validates and strictly types the environment variables**.
 * - You can **pass `InferOut<typeof schemaName>` explicitly**, ensuring strong typing even without a schema.
 * - **Debug mode (`debug: true`) helps trace loaded variables and warnings**.
 *
 * ---
 *
 * ## 📌 Examples:
 *
 * ### 1️⃣ Using `loadEnv()` Without a Schema (Typed Manually):
 * ```ts
 * import { loadEnv } from "vkrun";
 *
 * const envs = loadEnv<{
 *   NAME: string;
 *   ENABLED: boolean;
 *   COUNT: number;
 * }>();
 *
 * console.log(envs.NAME); // string
 * console.log(envs.ENABLED); // boolean
 * console.log(envs.COUNT); // number
 * ```
 *
 * ---
 *
 * ### 2️⃣ Using `loadEnv()` With Schema (Automatic Type Inference):
 * ```ts
 * import { schema, loadEnv, InferOut } from "vkrun";
 *
 * const envSchema = schema().object({
 *   NAME: schema().string(),
 *   ENABLED: schema().boolean(),
 *   COUNT: schema().number(),
 *   SETTINGS: schema().object({
 *     key: schema().string(),
 *   }),
 * });
 *
 * const envs = loadEnv<InferOut<typeof envSchema>>({ schema: envSchema });
 *
 * console.log(envs.NAME); // string
 * console.log(envs.ENABLED); // boolean
 * console.log(envs.COUNT); // number
 * console.log(envs.SETTINGS.key); // string
 * ```
 */
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
