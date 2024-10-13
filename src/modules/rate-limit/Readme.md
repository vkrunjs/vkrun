<div align="center">
  <img src="../../../logo.svg" width="200px" align="center" alt="Vkrun logo" />
  <h1 align="center">Vkrun - Rate Limit</h1>
  <br/>
  <p align="center">
    Rate Limit is a middleware module used to control the number of requests a client can make to the server within a given time window.
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
- [Rate Limit Configuration](#rate-limit-configuration)
  - [Rate Limit Options](#rate-limit-options)
- [Rate Limit Middleware Usage](#rate-limit-middleware-usage)

<h2 id="introduction">Introduction</h2>

The Rate Limit middleware is designed to control the request rate from clients by limiting the number of requests that can be made within a specified time window. It is useful for protecting APIs against overuse or abuse by rate-limiting requests based on configurable parameters such as time window and request limit.

<h2 id="quick-start">Quick Start</h2>

```ts
import v from 'vkrun'

const app = v.App()
app.rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 }) // 100 requests per 15 minutes

app.get('/rate-limit', (request: v.Request, response: v.Response) => {
  response.status(200).send('Rate limit applied!')
})

app.server().listen(3000, () => {
  console.log('Server started on port 3000 with Rate Limit enabled')
})
```

<h2 id="rate-limit-configuration">Rate Limit Configuration</h2>

The Rate Limit middleware offers flexible configuration options to control request limits. By setting these options, you can define the duration of the time window, the maximum number of allowed requests, and additional headers to track rate limit usage.

<h3>Default Settings</h3>

```ts
{
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Sends standard rate limit headers
  legacyHeaders: false, // Disables legacy rate limit headers
  minToNotification: 0, // Minimum number of requests before triggering notifications
  notification: null // Optional notification callback on limit reach
}
```

<h2 id="rate-limit-options">Rate Limit Options</h2>

- windowMs: The duration of the time window in milliseconds.
- limit: The maximum number of requests allowed per IP address within the time window.
- standardHeaders: Whether to include the standardized rate limit headers (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset).
- legacyHeaders: Whether to include legacy headers (e.g., X-RateLimit-Limit-Legacy).
- minToNotification: Minimum number of requests before sending a notification when the limit is reached.
- notification: Callback function triggered when the rate limit is reached, providing access data.

<h2 id="rate-limit-middleware-usage">Rate Limit Middleware Usage</h2>

The Rate Limit middleware can be applied globally to all routes or to specific routes and controllers. Below are examples of how to use the Rate Limit middleware with various configurations.

<h3>Standard Headers</h3>

```ts
const app = v.App()
app.rateLimit({ windowMs: 10 * 60 * 1000, limit: 50 }) // 50 requests per 10 minutes

app.get('/example', (request: v.Request, response: v.Response) => {
  response.status(200).send('Standard rate limit headers applied!')
})
```

In this example, the middleware will automatically apply the standard headers:

- X-RateLimit-Limit: Maximum requests allowed
- X-RateLimit-Remaining: Remaining requests for the current window
- X-RateLimit-Reset: Time when the current window reset

<h3>Legacy Headers</h3>

To enable legacy headers alongside standard headers:

```ts
const app = v.App()
app.rateLimit({ windowMs: 10 * 60 * 1000, limit: 50, legacyHeaders: true })

app.get('/legacy', (request: v.Request, response: v.Response) => {
  response.status(200).send('Legacy and standard rate limit headers applied!')
})
```

The legacy headers follow the same naming pattern with -Legacy appended:

- X-RateLimit-Limit-Legacy
- X-RateLimit-Remaining-Legacy
- X-RateLimit-Reset-Legacy

<h3>Triggering Notifications</h3>

If you want to receive notifications when a rate limit is reached, define a notification callback:

```ts
const app = v.App()

const notifyOnLimitReached = (accessData) => {
  console.log('Rate limit reached:', accessData)
}

app.rateLimit({ windowMs: 60000, limit: 5, notification: notifyOnLimitReached })

app.get('/notify', (request: v.Request, response: v.Response) => {
  response.status(200).send('Notifications enabled on rate limit reach')
})
```

In this setup, when the rate limit is hit, the notifyOnLimitReached function is called with details about the request that triggered the limit, enabling custom handling such as logging or alerting.

<h3>Handling Exceeded Limits</h3>

When a client exceeds the request limit, they receive a 429 Too Many Requests response:

```ts
fetch('/rate-limit')
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error))
```

On the server-side, configure the rate limit response:

```ts
const app = v.App()
app.rateLimit({ windowMs: 5 * 60 * 1000, limit: 2 }) // 2 requests per 5 minutes

app.get('/limit', (request: v.Request, response: v.Response) => {
  response.status(200).send('Access allowed')
})

app.server().listen(3000, () => {
  console.log('Server with rate limit on route /limit')
})
```

After two requests, subsequent requests within the window will receive a 429 status with Too Many Requests in the response body, protecting your application from abuse and overuse.

By leveraging the Rate Limit middleware, you can effectively manage traffic to your server, enhance security, and prevent abuse, ensuring that your application remains performant under high request loads.