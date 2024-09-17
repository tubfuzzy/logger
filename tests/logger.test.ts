import { Logger } from '../src/logger'; // Adjust path to the Logger class
import { LoggerConfig } from '../src/logger.types';
import { LogLevel } from '../src/logLevels';
import winston from 'winston';

// Mocking the Winston module
jest.mock('winston', () => {
  const mFormat = {
    combine: jest.fn(),
    timestamp: jest.fn(),
    json: jest.fn(),
  };
  
  const mTransports = {
    Console: jest.fn(),
  };

  const mCreateLogger = {
    log: jest.fn(),
    info: jest.fn(),
    error: jest.fn(),
  };

  return {
    createLogger: jest.fn(() => mCreateLogger),
    format: mFormat,
    transports: mTransports,
  };
});

describe('Logger', () => {
  let logger: Logger;
  let winstonLogger: winston.Logger;

  beforeEach(() => {
    const config: LoggerConfig = {
        applicationName: 'TestApp',
        namespace: 'TestNamespace',
        transports: {
          console: true,
        },
      };
      
    logger = new Logger(config);
    winstonLogger = (winston.createLogger() as unknown) as winston.Logger;
  });

  it('should set log level to INFO when calling Info()', () => {
    logger.Info();
    expect(logger['logLevel']).toBe(LogLevel.INFO);
  });

  it('should log info with parameters using Winston', () => {
    const logString = 'Test log string';
    const params = { sessionId: '1234', tid: '5678' };

    logger.Info(logString, params);
    expect(winstonLogger.info).toHaveBeenCalledWith(logString, params);
  });

  it('should set log level to ERROR when calling Error()', () => {
    logger.Error();
    expect(logger['logLevel']).toBe(LogLevel.ERROR);
  });

  it('should generate and log EDR correctly', () => {
    const logParams = {
      sessionId: '1234',
      tid: '5678',
      method: 'GET',
      url: '/api/test',
      headers: '{}',
      queryString: '{}',
      routeParameters: '{}',
      body: '{}',
      responseObject: '{}',
      startTime: '2024-01-01T00:00:00Z',
      endTime: '2024-01-01T00:01:00Z',
      processTime: 60000,
    };
    logger.EDR(logParams);
    expect(winstonLogger.log).toHaveBeenCalledWith('info', expect.objectContaining({
      logType: 'Detail',
      logLevel: LogLevel.INFO,
    }));
  });

  it('should generate and log CDR correctly', () => {
    const logParams = {
      sessionId: '1234',
      tid: '5678',
      cmdName: 'TestCommand',
      reqTimestamp: '2024-01-01T00:00:00Z',
      resTimestamp: '2024-01-01T00:01:00Z',
      resultCode: '200',
      resultDesc: 'Success',
      usageTime: 1000,
      endPointSumary: 'summary',
    };

    logger.CDR(logParams);
    expect(winstonLogger.log).toHaveBeenCalledWith('info', expect.objectContaining({
      logType: 'Summary',
    }));
  });

  it('should generate and log Exception correctly', () => {
    const logParams = {
      sessionId: '1234',
      err: new Error('Test error'),
      stacktrace: 'Error stack trace',
    };

    logger.Exception(logParams);
    expect(winstonLogger.log).toHaveBeenCalledWith('error', expect.objectContaining({
      logType: 'Detail',
      logLevel: LogLevel.ERROR,
      custom1: expect.objectContaining({
        exception: expect.objectContaining({
          message: 'Error: Test error',
        }),
      }),
    }));
  });
});