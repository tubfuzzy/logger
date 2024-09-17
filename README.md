# Custom Logger

A flexible and configurable logging library for Node.js applications, built on top of [Winston](https://github.com/winstonjs/winston). This logger supports various log levels, multiple transports (console and file), and customizable log formats.

## Features

- Easy-to-use API for logging at different levels (Info, Error, etc.)
- Supports console and file transports
- Configurable log formats and destinations
- Detailed structured logging for tracking application activity

## Installation

To use the custom logger in your project, you can install it directly from a `.tgz` file or clone it into your project.

### Option 1: Install from `.tgz` File

1. Download or build the `.tgz` file for the custom logger.

2. Install the package from the `.tgz` file:

   ```bash
   npm install /path/to/custom-logger-1.0.0.tgz
   
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