import { LogLevel } from "./logLevels";

export interface EndPointSumary {
  no: number;
  endPointName: string;
  endPointURL: string;
  responseStatus: string;
  processTime: number;
}

export interface LogCDR {
  sessionId: string;
  tid: string;
  identity: string;
  cmdName: string;
  resultCode: string;
  resultDesc: string;
  reqTimestamp: string;
  resTimestamp: string;
  usageTime: number;
  endPointSumary: EndPointSumary[];
}

export interface LogEDR {
  sessionId: string;
  tid: string;
  identity: string;
  cmdName: string;
  reqTimestamp: string;
  resultCode: string;
  resultDesc: string;
  resTimestamp: string;
  usageTime: number;
  body: string;
  responseObject: string;
  processTime: number;
  endTime: string;
  startTime: string;
  httpResponse: string;
}

export interface LogEDREndpoint {
  sessionId: string;
  tid: string;
  identity: string;
  cmdName: string;
  reqTimestamp: string;
  resultCode: string;
  resultDesc: string;
  resTimestamp: string;
  usageTime: number;
  responseObject: any;
  body: string;
  processTime: number;
  endTime: string;
  startTime: string;
  httpResponse: string;
}

export interface LogException {
  sessionId: string;
  tid: string;
  err: Error;
  stacktrace: string;
}
export interface LoggerConfig {
  applicationName: string;
  namespace: string;
  logLevel?: LogLevel;
  transports?: {
    console?: boolean;
    file?: {
      filename: string;
    };
  };
}
