export interface CDRLog {
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
    custom: {
        endPointSumary: string;
    };
}
export interface EDRLog {
    systemTimestamp: string;
    logType: string;
    logLevel: string;
    namespace: string;
    applicationName: string;
    containerId: string;
    sessionId: string;
    tid: string;
    custom1: {
        requestObject: string;
        responseObject: string;
        activityLog: {
            startTime: string;
            endTime: string;
            processTime: number;
        };
    };
    custom2: any;
}
export interface ExceptionLog {
    systemTimestamp: string;
    logType: string;
    logLevel: string;
    namespace: string;
    applicationName: string;
    containerId: string;
    sessionId: string;
    tid: string;
    custom1: {
        exception: {
            type: string;
            message: string;
            source: string;
            stacktrace: string;
        };
    };
}
