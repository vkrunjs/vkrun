<div align="center">
  <img src="../../../logo.svg" width="200px" align="center" alt="Vkrun logo" />
  <h1 align="center">Vkrun - Logger</h1>
  <br/>
  <p align="center">
    Logger is a Vkrun module for creating logs.
  </p>
</div>

<p align="center">
  <a href="https://github.com/jukerah" rel="nofollow"><img src="https://img.shields.io/badge/created%20by-Mario%20Elvio-blue.svg" alt="created by Mario Elvio"></a>
  <a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/badge/License%20-MIT-blue.svg" alt="License MIT"></a>
  <a href="https://www.npmjs.com/package/vkrun" rel="nofollow"><img src="https://img.shields.io/npm/dw/vkrun.svg?color=blue" alt="npm"></a>
  <a href="https://www.npmjs.com/package/vkrun" rel="nofollow"><img src="https://img.shields.io/github/stars/jukerah/vkrun" alt="stars"></a>
</p>

### Content
- [Vkrun](https://github.com/vkrunjs/vkrun)
- [Introduction](#introduction)
- [Quick Start](#quick-start)
- [Configuration Logger](#configuration-logger)
  - [Default setting](#default-setting)
  - [Log Levels](#log-levels)
- [Logger Middleware Usage](#logger-middleware-usage)

<h2 id="introduction">Introduction</h2>

The Logger was developed with the aim of providing a logging solution that is easy to use and configure. It is highly adaptable to the specific needs of your project, allowing you to customize the log format, log levels, and storage destinations.

<h2 id="quick-start">Quick Start</h2>

```ts
import v from 'vkrun'

const logger = v.Logger({ level: 'error' })

logger.info('This is an informational message.');
logger.error('An unexpected error has occurred.');
```

<h2 id="configuration-logger">Configuration Logger</h2>

The logger configuration allows customizing the logger's behavior according to your needs. All parameters are optional, and the logger has a default configuration when no parameters are provided.

Interface `SetConfigLogger`

```ts
interface SetConfigLogger {
  level?: 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly'
  format?: 'default' | 'indented'
  dateType?: 'DD-MM-YYYY' | 'MM-DD-YYYY'
  print?: {
    enabled?: boolean
    format?: 'default' | 'indented'
    colors?: {
      key?: 'red' | 'white' | 'blue' | 'yellow' | 'green' | 'purple'
      string?: 'red' | 'white' | 'blue' | 'yellow' | 'green' | 'purple'
      number?: 'red' | 'white' | 'blue' | 'yellow' | 'green' | 'purple'
      boolean?: 'red' | 'white' | 'blue' | 'yellow' | 'green' | 'purple'
    }
  }
  size?: number
  daysToStoreLogs?: number
  extension?: 'log' | 'txt' | 'json'
  path?: string
}
```

**format or print.format**

**`default`**: This option will produce log records on a single line, making them more compact and suitable for environments where space economy is important, such as consoles or log files with many records.

Example:

```log
{"level":"error","date":"03/29/2024 20:07:14","message":{"error":"Any Error"}}
```

**`indented`**: When selecting this option, log records will be formatted nicely for easy reading, with each field of the record on a separate line and with proper indentation. This makes the logs more readable, especially when examined manually or in debugging scenarios.

Example:

```log
{
  "level": "error",
  "date": "03/29/2024 20:07:14",
  "message": {
    "error": "Any Error"
  }
}
```

These settings allow adjusting various aspects of the logger's behavior, such as the log level, message format, colors of printed data, maximum size of log files, and the directory for storing log files.

```ts
import v from 'vkrun'

const logger = v.Logger({
  level: 'error',
  format: 'indented',
  dateType: 'MM-DD-YYYY',
  print: {
    enabled: true,
    format: 'indented',
    colors: {
      key: 'blue',
      string: 'yellow',
      number: 'green',
      boolean: 'purple'
    }
  },
  size: 5,
  daysToStoreLogs: 15,
  extension: 'json',
  path: 'logs'
})
```

<h2 id="default-setting">Default setting</h2>

```ts
{
  level: 'silly', // Minimum level of log messages to be recorded
  format: 'default', // Format of the logged messages
  dateType: 'MM-DD-YYYY', // Date format in the log messages
  // Log display settings
  print: {
    enabled: true, // Enables or disables printing of log messages
    format: 'default', // Format of log messages printed to the console
    // Custom colors for different data types in log messages
    colors: { 
      key: 'green',     // Color for object keys
      string: 'yellow', // Color for strings
      number: 'blue',   // Color for numbers
      boolean: 'purple' // Color for booleans
    }
  },
  size: 20 // Maximum size per log file in megabytes (one file is generated per hour)
  daysToStoreLogs: 7, // Number of days to retain stored log files
  extension: 'log', // Extension of log files
  path: 'logs' // Path where log files will be stored
}
```

<h2 id="log-levels">Log Levels</h2>

In logging, log levels are used to categorize log messages based on their severity or importance. Each log level represents a different level of urgency or criticality of the logged event. Below are the common log levels and their corresponding numerical values:

* `error (0)`: Represents critical errors that require immediate attention. These messages typically indicate severe failures or errors that may lead to application malfunction or downtime.

* `warn (1)`: Indicates potentially harmful situations or conditions that should be noted. These messages are less severe than errors but still warrant attention as they may indicate issues that need to be addressed.

* `info (2)`: Provides informational messages that highlight important events or milestones in the application's lifecycle. These messages are typically used to track the flow of execution or to convey significant updates.

* `http (3)`: Specifically used for logging HTTP requests and responses. This level is often used in web applications to monitor incoming and outgoing HTTP traffic.

* `verbose (4)`: Offers detailed, verbose output that includes additional information beyond regular informational messages. This level is useful for debugging and troubleshooting purposes, providing insights into the inner workings of the application.

* `debug (5)`: Designed for detailed debugging information, such as variable values, function calls, or program flow. Debug messages are useful for developers during the development and testing phases to diagnose issues and track program execution.

* **silly (6)**: Represents extremely low-priority or trivial messages. These messages are typically used for fine-grained debugging or for logging verbose, non-essential information.

By setting the log level, you can control which types of messages are recorded and which ones are ignored. For example, setting the log level to error will only capture critical errors, while setting it to debug will capture detailed debugging information. This allows developers to fine-tune logging output based on their specific needs and the desired level of detail.

<h2 id="logger-middleware-usage">Logger Middleware Usage</h2>

The logger middleware allows you to log information about each incoming HTTP request in your application. This can be particularly useful for monitoring and debugging purposes. Below is an example of how to use the logger middleware as a global middleware for all requests in your Vkrun application.

```ts
import v from 'vkrun'

const app = v.App()
const router = v.Router()
const logger = v.Logger({ level: 'debug' })

router.post('/', (_request: v.Request, response: v.Response) => {
  response.status(200).json({ result: 'ok' })
})

app.use(logger.middleware()) // Apply logger middleware globally
app.use(router)

app.server().listen(3000, () => {
  console.log('Vkrun started on port 3000')
})

// Now it will generate a log for each request received
await fetch('http://domain/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ key: "any value" })
})
```

This example demonstrates how to use the logger middleware as a global middleware in a Vkrun application. The middleware logs information about each HTTP request, including details such as the request URL, method, headers, request body, parameters, query, and response status code. This can be helpful for monitoring and debugging purposes, allowing you to track the flow of requests through your application and diagnose any issues that may arise.