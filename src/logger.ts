import { LogLevel } from "./logLevels";
import * as os from "os";
import winston from "winston";
import {
  FormatLogCDR,
  FormatLogEDR,
  FormatLogEDREndpoint,
  FormatExceptionLog,
} from "./logInterfaces";
import {
  LogCDR,
  LogEDREndpoint,
  LogEDR,
  LogException,
  LoggerConfig,
} from "./logger.types";

export class Logger {
  private applicationName: string;
  private namespace: string;
  private logLevel: LogLevel;
  private winstonLogger: winston.Logger;

  constructor(config: LoggerConfig) {
    this.applicationName = config.applicationName;
    this.namespace = config.namespace;
    this.logLevel = config.logLevel || LogLevel.INFO;

    const transports: winston.transport[] = [];

    if (config.transports?.console) {
      transports.push(new winston.transports.Console());
    }

    if (config.transports?.file) {
      transports.push(
        new winston.transports.File({
          filename: config.transports.file.filename,
        })
      );
    }

    this.winstonLogger = winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: transports,
    });
  }

  Info(logString?: string, params?: any) {
    this.logLevel = LogLevel.INFO;
    if (logString && params) {
      this.winstonLogger.info(logString, params);
    }
    return this;
  }

  Error() {
    this.logLevel = LogLevel.ERROR;
    return this;
  }

  EDR(logParameters: LogEDR) {
    const log = this.generateEDRLog(logParameters);
    this.winstonLogger.log("info", log);
    return this;
  }

  EDREndpoint(logParameters: LogEDREndpoint) {
    const log = this.generateEDREndpointLog(logParameters);
    this.winstonLogger.log("info", log);
    return this;
  }

  CDR(logParameters: LogCDR) {
    const log = this.generateCDRLog(logParameters);
    this.winstonLogger.log("info", log);
    return this;
  }

  Exception(params: LogException) {
    const log = this.generateExceptionLog(params);
    this.winstonLogger.log("error", log);
    return this;
  }

  private generateCDRLog(params: LogCDR): FormatLogCDR {
    return {
      systemTimestamp: new Date().toISOString(),
      logType: "Detail",
      namespace: this.namespace,
      applicationName: this.applicationName,
      containerId: os.hostname(),
      sessionId: params.sessionId,
      tid: params.tid,
      identity: params.identity,
      cmdName: params.cmdName,
      resultCode: params.resultCode,
      resultDesc: params.resultDesc,
      reqTimestamp: params.reqTimestamp,
      resTimestamp: params.resTimestamp,
      usageTime: params.usageTime,
      custom: {
        endPointSummary: params.endPointSumary.map((summary) => ({
          no: summary.no,
          endPointName: summary.endPointName,
          endPointURL: summary.endPointURL,
          responseStatus: summary.responseStatus,
          processTime: summary.processTime,
        })),
      },
    };
  }

  private generateEDRLog(params: LogEDR): FormatLogEDR {
    return {
      systemTimestamp: new Date().toISOString(),
      logType: "Detail",
      logLevel: "INFO",
      namespace: this.namespace,
      applicationName: this.applicationName,
      containerId: os.hostname(),
      sessionId: params.sessionId,
      tid: params.tid,
      custom1: {
        httpResponse: params.httpResponse,
        requestObject: params.body,
        responseObject: params.responseObject,
        activityLog: {
          startTime: params.startTime,
          endTime: params.endTime,
          processTime: params.processTime,
        },
      },
      custom2: null,
    };
  }

  private generateEDREndpointLog(params: LogEDREndpoint): FormatLogEDREndpoint {
    return {
      systemTimestamp: new Date().toISOString(),
      logType: "Detail",
      logLevel: "INFO",
      namespace: this.namespace,
      applicationName: this.applicationName,
      containerId: os.hostname(),
      sessionId: params.sessionId,
      tid: params.tid,
      custom1: {
        endPointName: params.cmdName,
        httpResponse: params.httpResponse,
        requestObject: params.body,
        responseObject: params.responseObject,
        activityLog: {
          startTime: params.startTime,
          endTime: params.endTime,
          processTime: params.processTime,
        },
      },
      custom2: null,
    };
  }

  private generateExceptionLog(params: LogException): FormatExceptionLog {
    return {
      systemTimestamp: new Date().toISOString(),
      logType: "Detail",
      logLevel: "Error",
      namespace: this.namespace,
      applicationName: this.applicationName,
      containerId: os.hostname(),
      sessionId: params.sessionId,
      tid: params.tid,
      custom1: {
        exception: {
          type: "LogException",
          message: params.err?.toString() || "",
          source: this.applicationName,
          stacktrace: params.stacktrace || "",
        },
      },
    };
  }
}
