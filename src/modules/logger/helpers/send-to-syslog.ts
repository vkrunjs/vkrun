import { createSocket, Socket } from "../../runtime";
import { LoggerConfig, LoggerLogLevel } from "../../types";
import { isArray, isObject } from "../../utils";

export const sendToSyslog = (
  data: {
    level: LoggerLogLevel;
    date: string;
    message: string | object;
  },
  config: LoggerConfig,
): void => {
  const syslogConfig = config.syslog;
  if (!syslogConfig?.enabled) {
    return;
  }

  const syslogSeverityMap: Record<string, number> = {
    error: 3,
    warn: 4,
    info: 6,
    http: 6,
    verbose: 7,
    debug: 7,
    silly: 7,
  };

  const level = data.level;
  const severity = syslogSeverityMap[level];
  const facility = syslogConfig.facility;
  const PRI = facility * 8 + severity;
  const timestamp = new Date().toISOString();
  const hostname = syslogConfig.host || "localhost";
  const appName = syslogConfig.appName || "app";

  const syslogMessage = `<${PRI}>1 ${timestamp} ${hostname} ${appName} - - - ${isObject(data.message) || isArray(data.message) ? JSON.stringify(data.message) : String(data.message)}`;

  if (syslogConfig.protocol === "udp") {
    const client = createSocket("udp4");
    client.send(syslogMessage, syslogConfig.port, syslogConfig.host, (err) => {
      if (err) {
        console.error(`Syslog UDP error: ${err.message}`);
      }
      client.close();
    });
  } else if (syslogConfig.protocol === "tcp") {
    const client = new Socket();
    client.connect(syslogConfig.port, syslogConfig.host, () => {
      client.write(syslogMessage + "\n");
    });
    client.on("error", (err) => {
      console.error(`Syslog TCP error: ${err.message}`);
    });
    client.end();
  }
};
