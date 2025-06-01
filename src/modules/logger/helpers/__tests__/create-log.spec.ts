import { existsSync } from "../../../runtime";
import { Logger } from "../..";
import { getLog } from "../get-log";
import { removeLogsFolder } from "../remove-logs-folder";

describe("Create log", () => {
  beforeEach(async () => {
    await removeLogsFolder();
  });
  afterEach(async () => {
    await removeLogsFolder();
  });

  it("Should create a logs folder", async () => {
    const logger = Logger({ level: "error", daysToStoreLogs: 1 });

    try {
      throw new Error("Any Error");
    } catch (error) {
      logger.error(error);
    }

    const logFolderPath = "logs";
    const logFileExists = existsSync(logFolderPath);

    expect(logFileExists).toEqual(true);
  });

  it("Should create a log file", async () => {
    const logger = Logger({ level: "error", daysToStoreLogs: 1 });

    try {
      throw new Error("Any Error");
    } catch (error: any) {
      logger.error({ error: error.message });
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const hour = currentDate.getHours().toString().padStart(2, "0");
    const nextHour = (currentDate.getHours() + 1).toString().padStart(2, "0");

    const logFolderPath = `logs/${month}-${day}-${year}`;
    const logFileName = `${hour}00-${nextHour}00.log`;
    const logFilePath = `${logFolderPath}/${logFileName}`;
    const logFileExists = existsSync(logFilePath);

    expect(logFileExists).toEqual(true);
  });

  it("Should create a log level error", async () => {
    const logger = Logger({ level: "error", daysToStoreLogs: 1 });

    try {
      throw new Error("Any Error");
    } catch (error: any) {
      logger.error({ error: error.message });
    }

    const log = getLog("default", "log");
    const logEntry = `{"level":"error","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;

    expect(log.content[0]).toEqual(logEntry);
  });

  it("Should create a log level warn", async () => {
    const logger = Logger({ level: "warn", daysToStoreLogs: 1 });

    try {
      throw new Error("Any Error");
    } catch (error: any) {
      logger.warn({ error: error.message });
    }

    const log = getLog("default", "log");
    const logEntry = `{"level":"warn","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;

    expect(log.content[0]).toEqual(logEntry);
  });

  it("Should create a log level info", async () => {
    const logger = Logger({ level: "info", daysToStoreLogs: 1 });

    try {
      throw new Error("Any Error");
    } catch (error: any) {
      logger.info({ error: error.message });
    }

    const log = getLog("default", "log");
    const logEntry = `{"level":"info","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;

    expect(log.content[0]).toEqual(logEntry);
  });

  it("Should create a log level http", async () => {
    const logger = Logger({ level: "http", daysToStoreLogs: 1 });

    try {
      throw new Error("Any Error");
    } catch (error: any) {
      logger.http({ error: error.message });
    }

    const log = getLog("default", "log");
    const logEntry = `{"level":"http","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;

    expect(log.content[0]).toEqual(logEntry);
  });

  it("Should create a log level verbose", async () => {
    const logger = Logger({ level: "verbose", daysToStoreLogs: 1 });

    try {
      throw new Error("Any Error");
    } catch (error: any) {
      logger.verbose({ error: error.message });
    }

    const log = getLog("default", "log");
    const logEntry = `{"level":"verbose","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;

    expect(log.content[0]).toEqual(logEntry);
  });

  it("Should create a log level debug", async () => {
    const logger = Logger({ level: "debug", daysToStoreLogs: 1 });

    try {
      throw new Error("Any Error");
    } catch (error: any) {
      logger.debug({ error: error.message });
    }

    const log = getLog("default", "log");
    const logEntry = `{"level":"debug","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;

    expect(log.content[0]).toEqual(logEntry);
  });

  it("Should create a log level silly", async () => {
    const logger = Logger({ level: "silly", daysToStoreLogs: 1 });

    try {
      throw new Error("Any Error");
    } catch (error: any) {
      logger.silly({ error: error.message });
    }

    const log = getLog("default", "log");
    const logEntry = `{"level":"silly","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;

    expect(log.content[0]).toEqual(logEntry);
  });

  it("Should only create level error logs", async () => {
    const logger = Logger({ level: "error", daysToStoreLogs: 1 });

    logger.error({ error: "Any Error" });
    logger.warn({ error: "Any Error" });
    logger.info({ error: "Any Error" });
    logger.http({ error: "Any Error" });
    logger.verbose({ error: "Any Error" });
    logger.debug({ error: "Any Error" });
    logger.silly({ error: "Any Error" });

    const log = getLog("default", "log");
    const logEntry = `{"level":"error","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;

    expect(log.content[0]).toEqual(logEntry);
  });

  it("Should create logs only for level errors and warn", async () => {
    const logger = Logger({ level: "warn", daysToStoreLogs: 1, print: { enabled: true } });

    logger.error({ error: "Any Error" });
    logger.warn({ error: "Any Error" });
    logger.info({ error: "Any Error" });
    logger.http({ error: "Any Error" });
    logger.verbose({ error: "Any Error" });
    logger.debug({ error: "Any Error" });
    logger.silly({ error: "Any Error" });

    const log = getLog("default", "log");
    const logErrorEntry = `{"level":"error","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;
    const logWarnEntry = `{"level":"warn","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;

    expect(log.content[0]).toEqual(logErrorEntry);
    expect(log.content[1]).toEqual(logWarnEntry);
    expect(log.content[2]).toEqual(undefined);
    expect(log.content[3]).toEqual(undefined);
    expect(log.content[4]).toEqual(undefined);
    expect(log.content[5]).toEqual(undefined);
    expect(log.content[6]).toEqual(undefined);
  });

  it("Should create logs only for level errors, warn and info", async () => {
    const logger = Logger({ level: "info", daysToStoreLogs: 1 });

    logger.error({ error: "Any Error" });
    logger.warn({ error: "Any Error" });
    logger.info({ error: "Any Error" });
    logger.http({ error: "Any Error" });
    logger.verbose({ error: "Any Error" });
    logger.debug({ error: "Any Error" });
    logger.silly({ error: "Any Error" });

    const log = getLog("default", "log");
    const logErrorEntry = `{"level":"error","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;
    const logWarnEntry = `{"level":"warn","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;
    const logInfoEntry = `{"level":"info","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;

    expect(log.content[0]).toEqual(logErrorEntry);
    expect(log.content[1]).toEqual(logWarnEntry);
    expect(log.content[2]).toEqual(logInfoEntry);
    expect(log.content[3]).toEqual(undefined);
    expect(log.content[4]).toEqual(undefined);
    expect(log.content[5]).toEqual(undefined);
    expect(log.content[6]).toEqual(undefined);
  });

  it("Should create logs only for level errors, warn, info and http", async () => {
    const logger = Logger({ level: "http", daysToStoreLogs: 1 });

    logger.error({ error: "Any Error" });
    logger.warn({ error: "Any Error" });
    logger.info({ error: "Any Error" });
    logger.http({ error: "Any Error" });
    logger.verbose({ error: "Any Error" });
    logger.debug({ error: "Any Error" });
    logger.silly({ error: "Any Error" });

    const log = getLog("default", "log");
    const logErrorEntry = `{"level":"error","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;
    const logWarnEntry = `{"level":"warn","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;
    const logInfoEntry = `{"level":"info","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;
    const logHttpEntry = `{"level":"http","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;

    expect(log.content[0]).toEqual(logErrorEntry);
    expect(log.content[1]).toEqual(logWarnEntry);
    expect(log.content[2]).toEqual(logInfoEntry);
    expect(log.content[3]).toEqual(logHttpEntry);
    expect(log.content[4]).toEqual(undefined);
    expect(log.content[5]).toEqual(undefined);
    expect(log.content[6]).toEqual(undefined);
  });

  it("Should create logs only for level errors, warn, info, http and verbose", async () => {
    const logger = Logger({ level: "verbose", daysToStoreLogs: 1 });

    logger.error({ error: "Any Error" });
    logger.warn({ error: "Any Error" });
    logger.info({ error: "Any Error" });
    logger.http({ error: "Any Error" });
    logger.verbose({ error: "Any Error" });
    logger.debug({ error: "Any Error" });
    logger.silly({ error: "Any Error" });

    const log = getLog("default", "log");
    const logErrorEntry = `{"level":"error","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;
    const logWarnEntry = `{"level":"warn","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;
    const logInfoEntry = `{"level":"info","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;
    const logHttpEntry = `{"level":"http","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;
    const logVerboseEntry = `{"level":"verbose","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;

    expect(log.content[0]).toEqual(logErrorEntry);
    expect(log.content[1]).toEqual(logWarnEntry);
    expect(log.content[2]).toEqual(logInfoEntry);
    expect(log.content[3]).toEqual(logHttpEntry);
    expect(log.content[4]).toEqual(logVerboseEntry);
    expect(log.content[5]).toEqual(undefined);
    expect(log.content[6]).toEqual(undefined);
  });

  it("Should create logs only for level errors, warn, info, http, verbose and debug", async () => {
    const logger = Logger({ level: "debug", daysToStoreLogs: 1 });

    logger.error({ error: "Any Error" });
    logger.warn({ error: "Any Error" });
    logger.info({ error: "Any Error" });
    logger.http({ error: "Any Error" });
    logger.verbose({ error: "Any Error" });
    logger.debug({ error: "Any Error" });
    logger.silly({ error: "Any Error" });

    const log = getLog("default", "log");
    const logErrorEntry = `{"level":"error","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;
    const logWarnEntry = `{"level":"warn","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;
    const logInfoEntry = `{"level":"info","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;
    const logHttpEntry = `{"level":"http","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;
    const logVerboseEntry = `{"level":"verbose","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;
    const logDebugEntry = `{"level":"debug","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;

    expect(log.content[0]).toEqual(logErrorEntry);
    expect(log.content[1]).toEqual(logWarnEntry);
    expect(log.content[2]).toEqual(logInfoEntry);
    expect(log.content[3]).toEqual(logHttpEntry);
    expect(log.content[4]).toEqual(logVerboseEntry);
    expect(log.content[5]).toEqual(logDebugEntry);
    expect(log.content[6]).toEqual(undefined);
  });

  it("Should create all types of logs", async () => {
    const logger = Logger({ level: "silly", daysToStoreLogs: 1 });

    logger.error({ error: "Any Error" });
    logger.warn({ error: "Any Error" });
    logger.info({ error: "Any Error" });
    logger.http({ error: "Any Error" });
    logger.verbose({ error: "Any Error" });
    logger.debug({ error: "Any Error" });
    logger.silly({ error: "Any Error" });

    const log = getLog("default", "log");
    const logErrorEntry = `{"level":"error","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;
    const logWarnEntry = `{"level":"warn","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;
    const logInfoEntry = `{"level":"info","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;
    const logHttpEntry = `{"level":"http","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;
    const logVerboseEntry = `{"level":"verbose","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;
    const logDebugEntry = `{"level":"debug","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;
    const logSillyEntry = `{"level":"silly","date":"${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}","message":{"error":"Any Error"}}`;

    expect(log.content[0]).toEqual(logErrorEntry);
    expect(log.content[1]).toEqual(logWarnEntry);
    expect(log.content[2]).toEqual(logInfoEntry);
    expect(log.content[3]).toEqual(logHttpEntry);
    expect(log.content[4]).toEqual(logVerboseEntry);
    expect(log.content[5]).toEqual(logDebugEntry);
    expect(log.content[6]).toEqual(logSillyEntry);
  });

  it("Should create a log with a DD-MM-YYYY folder format", async () => {
    const logger = Logger({
      level: "error",
      daysToStoreLogs: 1,
      dateType: "DD-MM-YYYY",
    });

    logger.error("Any text");

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const hour = currentDate.getHours().toString().padStart(2, "0");
    const nextHour = (currentDate.getHours() + 1).toString().padStart(2, "0");

    const logFolderPath = `logs/${day}-${month}-${year}`;
    const logFileName = `${hour}00-${nextHour}00.log`;
    const logFilePath = `${logFolderPath}/${logFileName}`;
    const logFileExists = existsSync(logFilePath);

    expect(logFileExists).toEqual(true);
  });

  it("Should create a JSON log file", async () => {
    const logger = Logger({
      level: "silly",
      daysToStoreLogs: 1,
      extension: "json",
    });

    logger.error({ error: "Any Text" });
    logger.warn({ error: "Any Text" });

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const hour = currentDate.getHours().toString().padStart(2, "0");
    const nextHour = (currentDate.getHours() + 1).toString().padStart(2, "0");

    const logFolderPath = `logs/${month}-${day}-${year}`;
    const logFileName = `${hour}00-${nextHour}00.json`;
    const logFilePath = `${logFolderPath}/${logFileName}`;
    const logFileExists = existsSync(logFilePath);

    expect(logFileExists).toEqual(true);
  });

  it("Should create a log with indented JSON", async () => {
    const logger = Logger({
      level: "silly",
      daysToStoreLogs: 1,
      extension: "json",
      format: "indented",
    });

    logger.error({ error: "Any Text" });
    logger.warn({ error: "Any Text" });

    const log = getLog("indented", "json");

    expect(log.content).toEqual([
      {
        level: "error",
        date: `${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}`,
        message: { error: "Any Text" },
      },
      {
        level: "warn",
        date: `${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}`,
        message: { error: "Any Text" },
      },
    ]);
  });

  it("Should create a log with indented log", async () => {
    const logger = Logger({
      level: "silly",
      daysToStoreLogs: 1,
      extension: "log",
      format: "indented",
    });

    logger.error({ error: "Any Text" });

    const log = getLog("indented", "log");

    expect(log.content).toEqual({
      level: "error",
      date: `${log.month}/${log.day}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}`,
      message: { error: "Any Text" },
    });
  });

  it("Should create a log with date type DD/MM/YYYY", async () => {
    const logger = Logger({
      level: "silly",
      daysToStoreLogs: 1,
      extension: "log",
      format: "indented",
      dateType: "DD-MM-YYYY",
    });

    logger.error({ error: "Any Text" });

    const log = getLog("indented", "log", "DD-MM-YYYY");

    expect(log.content).toEqual({
      level: "error",
      date: `${log.day}/${log.month}/${log.year} ${log.hour}:${log.minutes}:${log.seconds}`,
      message: { error: "Any Text" },
    });
  });
});
