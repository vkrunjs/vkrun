import { readFileSync } from "../../runtime";
import { parseValue } from "./parse-value";
import { interpolateValue } from "./interpolate-value";
import { sanitizeProcessEnv } from "./sanitize-process-env";

export const parseEnvFile = (
  filePath: string,
  encoding: BufferEncoding,
  override: boolean,
  debug: boolean,
): Record<string, any> => {
  const envContent = readFileSync(filePath, { encoding });
  const sanitizedEnv = sanitizeProcessEnv();
  const envs: Record<string, any> = {};

  envContent.split("\n").forEach((line, lineNumber) => {
    const cleanedLine = line.split("#")[0].trim();

    if (!cleanedLine) {
      if (debug) {
        console.warn(`loadEnv: ignoring empty or comment line at ${lineNumber + 1}`);
      }
      return;
    }

    const [key, value] = cleanedLine.split("=");

    if (key && value) {
      const trimmedKey = key.trim();
      let parsedValue = parseValue(value.trim());

      if (typeof parsedValue === "string") {
        parsedValue = interpolateValue(parsedValue, { ...sanitizedEnv, ...process.env });
      }

      if (!process.env[trimmedKey] || override) {
        process.env[trimmedKey] = parsedValue;
        envs[trimmedKey] = parsedValue;
      }
    } else if (debug) {
      console.warn(`loadEnv: ignoring invalid line at ${lineNumber + 1}: ${line}`);
    }
  });

  return envs;
};
