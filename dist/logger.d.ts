import { LogCDR, LogEDREndpoint, LogEDR, LogException, LoggerConfig } from "./logger.types";
export declare class Logger {
    private applicationName;
    private namespace;
    private logLevel;
    private winstonLogger;
    constructor(config: LoggerConfig);
    Info(logString?: string, params?: any): this;
    Error(): this;
    EDR(logParameters: LogEDR): this;
    EDREndpoint(logParameters: LogEDREndpoint): this;
    CDR(logParameters: LogCDR): this;
    Exception(params: LogException): this;
    private generateCDRLog;
    private generateEDRLog;
    private generateEDREndpointLog;
    private generateExceptionLog;
}
