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
const moment_timezone_1 = __importDefault(require("moment-timezone"));
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
            transports.push(new winston_1.default.transports.File({ filename: config.transports.file.filename }));
        }
        this.winstonLogger = winston_1.default.createLogger({
            level: 'info',
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
    generateCDRLog(params) {
        return {
            systemTimestamp: `${moment_timezone_1.default.tz('Asia/Bangkok').format('DD/MM/YYYY HH:mm:ss')}.${new Date().getMilliseconds()}`,
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
    generateEDRLog(params) {
        return {
            systemTimestamp: `${moment_timezone_1.default.tz('Asia/Bangkok').format('DD/MM/YYYY HH:mm:ss')}.${new Date().getMilliseconds()}`,
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
    generateExceptionLog(params) {
        return {
            systemTimestamp: `${moment_timezone_1.default
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
    EDR(logParameters) {
        const log = this.generateEDRLog(logParameters);
        this.winstonLogger.log('info', log);
        return this;
    }
    CDR(logParameters) {
        const log = this.generateCDRLog(logParameters);
        this.winstonLogger.log('info', log);
        return this;
    }
    Exception(logParameters) {
        const log = this.generateExceptionLog(logParameters);
        this.winstonLogger.log('error', log);
        return this;
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map