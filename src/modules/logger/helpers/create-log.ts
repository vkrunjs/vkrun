import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync, join } from "../../runtime";
import { colorizeJSON } from "./colorize-json";
import { sanitizeLogs } from "./sanitize-logs";
import { LoggerLog } from "../../types";
import { dateToString } from "../../utils";
import { sendToSyslog } from "./send-to-syslog";
import { safeSerialize } from "./safe-serialize";

export const createLog = (log: LoggerLog): void => {
  try {
    const logLevel = log.config.levels[log.level];
    const logLevelConfig = log.config.levels[log.config.level];

    if (logLevel > logLevelConfig) return;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const hour = currentDate.getHours().toString().padStart(2, "0");
    const nexHour = (currentDate.getHours() + 1).toString().padStart(2, "0");

    let folderName = `${month}-${day}-${year}`;
    if (log.config.dateType === "DD-MM-YYYY") {
      folderName = `${day}-${month}-${year}`;
    }

    const fileName = `${hour}00-${nexHour}00.${log.config.extension}`;

    if (!existsSync(log.config.path)) {
      mkdirSync(log.config.path, { recursive: true });
    }

    const logFolderPath = join(log.config.path, folderName);
    const logFilePath = join(logFolderPath, fileName);

    if (!existsSync(logFolderPath)) {
      mkdirSync(logFolderPath);
    }

    const getDateToString = (date: Date): string => {
      if (log.config.dateType === "DD-MM-YYYY") {
        return dateToString(currentDate, "DD/MM/YYYY HH:MM:SS");
      }
      return dateToString(currentDate, "MM/DD/YYYY HH:MM:SS");
    };

    const logData = {
      level: log.level,
      date: getDateToString(currentDate),
      message: safeSerialize(log.message),
    };

    sendToSyslog(logData, log.config);

    if (log.config.extension === "json") {
      let logs: any[] = [];

      if (existsSync(logFilePath)) {
        const fileContent = readFileSync(logFilePath, "utf-8");
        logs = JSON.parse(fileContent);
      }

      logs.push(logData);
      let formattedLogs;
      if (log.config.format === "indented") {
        formattedLogs = JSON.stringify(logs, null, 2);
      } else {
        formattedLogs = JSON.stringify(logs);
      }
      writeFileSync(logFilePath, formattedLogs);
    } else {
      if (!existsSync(logFilePath)) {
        writeFileSync(logFilePath, "");
      }

      let formattedLog;
      if (log.config.format === "indented") {
        formattedLog = JSON.stringify(logData, null, 2) + "\n";
      } else {
        formattedLog = JSON.stringify(logData) + "\n";
      }
      appendFileSync(logFilePath, formattedLog);
    }

    if (log.config.print.enabled) {
      const jsonString = log.config.print.format === "default" ? JSON.stringify(logData) : JSON.stringify(logData, null, 2);

      const coloredOutput = colorizeJSON(jsonString, log.config.colors, log.config.print.colors);

      try {
        console.log(coloredOutput);
      } catch (err) {
        try {
          console.log(jsonString);
        } catch {
          // ignore prints with error
        }
      }
    }

    sanitizeLogs(log.config);
  } catch (error: any) {
    console.error(
      JSON.stringify(
        {
          "vkrun-logger": "error occurred while inserting data into the log file!",
          error: error.message,
        },
        null,
        2,
      ),
    );
  }
};
