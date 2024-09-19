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
  reqTimestamp: string;
  resultCode: string;
  resultDesc: string;
  resTimestamp: string;
  usageTime: number;
  endPointSumary: EndPointSumary[];
  err: Error;
  stacktrace: string;
  processTime: number;
  endTime: string;
  startTime: string;
  responseObject: any;
  method: string;
  url: string;
  headers: string;
  queryString: string;
  routeParameters: string;
  body: string;
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
  endPointSumary: EndPointSumary[];
  err: Error;
  stacktrace: string;
  processTime: number;
  endTime: string;
  startTime: string;
  responseObject: string;
  method: string;
  url: string;
  headers: string;
  queryString: string;
  routeParameters: string;
  body: string;
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
  endPointSumary: EndPointSumary[];
  err: Error;
  stacktrace: string;
  processTime: number;
  endTime: string;
  startTime: string;
  responseObject: any;
  method: string;
  url: string;
  headers: string;
  queryString: string;
  routeParameters: string;
  body: string;
}

export interface LogException {
  sessionId: string;
  tid: string;
  identity: string;
  cmdName: string;
  reqTimestamp: string;
  resultCode: string;
  resultDesc: string;
  resTimestamp: string;
  usageTime: number;
  endPointSumary: EndPointSumary[];
  err: Error;
  stacktrace: string;
  processTime: number;
  endTime: string;
  startTime: string;
  responseObject: any;
  method: string;
  url: string;
  headers: string;
  queryString: string;
  routeParameters: string;
  body: string;
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
