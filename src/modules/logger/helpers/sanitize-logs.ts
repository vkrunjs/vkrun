import { existsSync, readdirSync, rmSync, statSync, unlinkSync, join } from "../../runtime";
import { LoggerConfig } from "../../types";

export const sanitizeLogs = (config: LoggerConfig): void => {
  const logFolders = readdirSync(config.path);
  const currentDate = new Date();

  logFolders.forEach((folderName) => {
    if (isValidDateFolder(folderName)) {
      const folderDate = getDateFromFolderName(folderName, config);
      const daysToStoreLogs = config.daysToStoreLogs === 0 ? -1 : config.daysToStoreLogs;
      const expirationDate = new Date(currentDate.getTime() - daysToStoreLogs * 24 * 60 * 60 * 1000);
      expirationDate.setHours(0, 0, 0, 0);

      if (folderDate < expirationDate) {
        rmSync(join(config.path, folderName), { recursive: true });
      }
    } else {
      const filePath = join(config.path, folderName);
      if (existsSync(filePath)) {
        if (statSync(filePath).isFile()) {
          unlinkSync(filePath);
        } else {
          rmSync(filePath, { recursive: true });
        }
      }
    }
  });
};

const isValidDateFolder = (folderName: string): boolean => {
  const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
  return dateRegex.test(folderName);
};

const getDateFromFolderName = (folderName: string, config: LoggerConfig): Date => {
  let [month, day, year] = folderName.split("-").map(Number);
  if (config.dateType === "DD-MM-YYYY") {
    [day, month, year] = folderName.split("-").map(Number);
  }
  return new Date(year, month - 1, day);
};
