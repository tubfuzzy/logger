## How to Use

### 1. Import and Configure

First, import the `Logger` and `LoggerConfig` from the package and configure it according to your needs.

```typescript
import { Logger, LoggerConfig } from 'custom-logger';

const config: LoggerConfig = {
  applicationName: 'MyApp',
  namespace: 'MyNamespace',
  transports: {
    console: true,
    file: {
      filename: 'logs/app.log',
    },
  },
};

const logger = new Logger(config);

logger.Info('User logged in successfully', {
  sessionId: 'abcd1234',
  tid: 'transaction-id',
  cmdName: 'Login',
  reqTimestamp: new Date().toISOString(),
});

logger.Exception({
  sessionId: 'abcd1234',
  err: new Error('Login failed'),
  stacktrace: 'Error stack trace here...',
});

logger.EDR({
  sessionId: 'abcd1234',
  tid: 'transaction-id',
  method: 'POST',
  url: '/api/login',
  headers: '{"Content-Type": "application/json"}',
  body: '{"username": "user"}',
  responseObject: '{"status": "success"}',
  startTime: '2024-01-01T00:00:00Z',
  endTime: '2024-01-01T00:01:00Z',
  processTime: 60000,
});

logger.CDR({
  sessionId: 'abcd1234',
  tid: 'transaction-id',
  cmdName: 'Login',
  reqTimestamp: '2024-01-01T00:00:00Z',
  resTimestamp: '2024-01-01T00:01:00Z',
  resultCode: '200',
  resultDesc: 'Success',
  usageTime: 1000,
  endPointSumary: 'summary',
});