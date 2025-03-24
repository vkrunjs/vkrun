import { existsSync, promises } from "../../runtime";

export const removeLogsFolder = async (): Promise<void> => {
  if (existsSync("logs")) {
    await promises.rm("logs", { recursive: true });
  }
};
