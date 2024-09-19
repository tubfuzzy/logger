export interface EndPointSummary {
    no: number;
    endPointName: string;
    endPointURL: string;
    responseStatus: string;
    processTime: number;
}
export interface Custom {
    endPointSummary: EndPointSummary[];
}
export interface FormatLogCDR {
    systemTimestamp: string;
    logType: string;
    namespace: string;
    applicationName: string;
    containerId: string;
    sessionId: string;
    tid: string;
    identity: string;
    cmdName: string;
    resultCode: string;
    resultDesc: string;
    reqTimestamp: string;
    resTimestamp: string;
    usageTime: number;
    custom: Custom;
}
export interface ActivityLog {
    startTime: string;
    endTime: string;
    processTime: number;
}
export interface Custom1 {
    httpResponse: string | null;
    requestObject: string;
    responseObject: string;
    activityLog: ActivityLog;
}
export interface FormatLogEDR {
    systemTimestamp: string;
    logType: string;
    logLevel: string;
    namespace: string;
    applicationName: string;
    containerId: string;
    sessionId: string;
    tid: string;
    custom1: Custom1;
    custom2: string | null;
}
interface Custom1WithEndpoint {
    endPointName: string;
    httpResponse: string | null;
    requestObject: string;
    responseObject: string;
    activityLog: ActivityLog;
}
export interface FormatLogEDREndpoint {
    systemTimestamp: string;
    logType: string;
    logLevel: string;
    namespace: string;
    applicationName: string;
    containerId: string;
    sessionId: string;
    tid: string;
    custom1: Custom1WithEndpoint;
    custom2: string | null;
}
export interface ExceptionDetails {
    type: string;
    message: string;
    source: string;
    stacktrace: string;
}
export interface Custom1WithException {
    exception: ExceptionDetails;
}
export interface FormatExceptionLog {
    systemTimestamp: string;
    logType: string;
    logLevel: string;
    namespace: string;
    applicationName: string;
    containerId: string;
    sessionId: string;
    tid: string;
    custom1: Custom1WithException;
}
export {};
