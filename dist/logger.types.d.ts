import { LogLevel } from "./logLevels";
export interface LogParameters {
    sessionId: string;
    tid: string;
    identity: string;
    cmdName: string;
    reqTimestamp: string;
    resultCode: string;
    resultDesc: string;
    resTimestamp: string;
    usageTime: number;
    endPointSumary: string;
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
