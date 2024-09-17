import { LoggerConfig, LogParameters } from './logger.types';
export declare class Logger {
    private applicationName;
    private namespace;
    private logLevel;
    private winstonLogger;
    constructor(config: LoggerConfig);
    Info(logString?: string, params?: Partial<LogParameters>): this;
    Error(): this;
    private generateCDRLog;
    private generateEDRLog;
    private generateExceptionLog;
    EDR(logParameters: Partial<LogParameters>): this;
    CDR(logParameters: Partial<LogParameters>): this;
    Exception(logParameters: Partial<LogParameters>): this;
}
