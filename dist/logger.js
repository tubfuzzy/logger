"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const logLevels_1 = require("./logLevels");
const os = __importStar(require("os"));
const winston_1 = __importDefault(require("winston"));
class Logger {
    constructor(config) {
        this.applicationName = config.applicationName;
        this.namespace = config.namespace;
        this.logLevel = config.logLevel || logLevels_1.LogLevel.INFO;
        const transports = [];
        if (config.transports?.console) {
            transports.push(new winston_1.default.transports.Console());
        }
        if (config.transports?.file) {
            transports.push(new winston_1.default.transports.File({
                filename: config.transports.file.filename,
            }));
        }
        this.winstonLogger = winston_1.default.createLogger({
            level: "info",
            format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
            transports: transports,
        });
    }
    Info(logString, params) {
        this.logLevel = logLevels_1.LogLevel.INFO;
        if (logString && params) {
            this.winstonLogger.info(logString, params);
        }
        return this;
    }
    Error() {
        this.logLevel = logLevels_1.LogLevel.ERROR;
        return this;
    }
    EDR(logParameters) {
        const log = this.generateEDRLog(logParameters);
        this.winstonLogger.log("info", log);
        return this;
    }
    EDREndpoint(logParameters) {
        const log = this.generateEDREndpointLog(logParameters);
        this.winstonLogger.log("info", log);
        return this;
    }
    CDR(logParameters) {
        const log = this.generateCDRLog(logParameters);
        this.winstonLogger.log("info", log);
        return this;
    }
    Exception(params) {
        const log = this.generateExceptionLog(params);
        this.winstonLogger.log("error", log);
        return this;
    }
    generateCDRLog(params) {
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
    generateEDRLog(params) {
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
    generateEDREndpointLog(params) {
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
    generateExceptionLog(params) {
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
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map