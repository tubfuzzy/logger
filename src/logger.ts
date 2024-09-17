import { LogLevel } from './logLevels';
import moment from 'moment-timezone';
import * as os from 'os';
import winston from 'winston';
import { CDRLog, EDRLog, ExceptionLog } from './logInterfaces';
import { LoggerConfig, LogParameters } from './logger.types';


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
      transports.push(new winston.transports.File({ filename: config.transports.file.filename }));
    }

    this.winstonLogger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: transports,
    });
  }

  Info(logString?: string, params?: Partial<LogParameters>) {
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

  private generateCDRLog(params: Partial<LogParameters>): CDRLog {
    return {
      systemTimestamp: `${moment.tz('Asia/Bangkok').format('DD/MM/YYYY HH:mm:ss')}.${new Date().getMilliseconds()}`,
      logType: 'Summary',
      namespace: this.namespace,
      applicationName: this.applicationName,
      containerId: os.hostname(),
      sessionId: params.sessionId || '',
      tid: params.tid || '',
      identity: params.identity || '',
      cmdName: params.cmdName || '',
      resultCode: params.resultCode || '',
      resultDesc: params.resultDesc || '',
      reqTimestamp: params.reqTimestamp || '',
      resTimestamp: params.resTimestamp || '',
      usageTime: params.usageTime || 0,
      custom: {
        endPointSumary: params.endPointSumary || '',
      },
    };
  }

  private generateEDRLog(params: Partial<LogParameters>): EDRLog {
    return {
      systemTimestamp: `${moment.tz('Asia/Bangkok').format('DD/MM/YYYY HH:mm:ss')}.${new Date().getMilliseconds()}`,
      logType: 'Detail',
      logLevel: this.logLevel,
      namespace: this.namespace,
      applicationName: this.applicationName,
      containerId: os.hostname(),
      sessionId: params.sessionId || '',
      tid: params.tid || '',
      custom1: {
        requestObject: JSON.stringify({
          method: params.method,
          url: params.url,
          headers: params.headers,
          queryString: params.queryString,
          routeParameters: params.routeParameters,
          body: params.body,
        }),
        responseObject: JSON.stringify(params.responseObject),
        activityLog: {
          startTime: params.startTime || '',
          endTime: params.endTime || '',
          processTime: params.processTime || 0,
        },
      },
      custom2: null,
    };
  }

  private generateExceptionLog(params: Partial<LogParameters>): ExceptionLog {
    return {
        systemTimestamp: `${moment
            .tz('Asia/Bangkok')
            .format('DD/MM/YYYY HH:mm:ss')}.${new Date().getMilliseconds()}`,
        logType: 'Detail',
        logLevel: 'error',
        namespace: this.namespace,
        applicationName: this.applicationName,
        containerId: os.hostname(),
        sessionId: params.sessionId || '',
        tid: params.tid || '',
        custom1: {
            exception: {
                type: 'LogException',
                message: params.err?.toString() || '',
                source: this.applicationName,
                stacktrace: params.stacktrace || '',
            },
        },
    };
  }

  EDR(logParameters: Partial<LogParameters>) {
    const log = this.generateEDRLog(logParameters);
    this.winstonLogger.log('info', log);
    return this;
  }

  CDR(logParameters: Partial<LogParameters>) {
    const log = this.generateCDRLog(logParameters);
    this.winstonLogger.log('info', log);
    return this;
  }

  Exception(logParameters: Partial<LogParameters>) {
    const log = this.generateExceptionLog(logParameters);
    this.winstonLogger.log('error', log);
    return this;
  }
}