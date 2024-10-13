<div align="center">
  <img src="../../../logo.svg" width="200px" align="center" alt="Vkrun logo" />
  <h1 align="center">Vkrun - CORS</h1>
  <br/>
  <p align="center">
    CORS is a middleware module used to enable CORS with various options.
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
- [CORS Configuration](#cors-configuration)
  - [Origin Options](#origin-options)
- [CORS Middleware Usage](#cors-middleware-usage)

<h2 id="introduction">Introduction</h2>

The CORS middleware provides an easy and configurable way to enable Cross-Origin Resource Sharing for your backend applications. You can configure allowed origins, methods, headers, and other CORS options to control how requests from different origins interact with your server.

<h2 id="quick-start">Quick Start</h2>

```ts
import v from 'vkrun'

const app = v.App()
app.cors() // Apply default CORS settings

app.get('/', (_request: v.Request, response: v.Response) => {
  response.status(200).send('Hello, CORS enabled!')
})

app.server().listen(3000, () => {
  console.log('Server started on port 3000 with CORS globally enabled')
})
```

<h2 id="cors-configuration">CORS Configuration</h2>

The CORS middleware is customizable through various options that allow you to define specific origins, methods, and headers that should be allowed. By setting these options, you can control the behavior of CORS in your application.

<h3>Default setting</h3>

```ts
{
  origin: '*', // Permits all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS', // Permits all common methods
  allowedHeaders: 'Content-Type, Authorization', // These headers are permitted by default
  exposedHeaders: '', // No headers are exposed by default
  credentials: false, // Credentials are not shared by default
  maxAge: 0, // No preflight cache duration
  preflightNext: false, // Does not pass control to the next handler on OPTIONS requests
  successStatus: 204 // Status code for successful preflight requests
}
```

<h2 id="origin-options">Origin Options</h2>

The origin option determines which origins are allowed to access your resources. It can be set to:

- '*': Allows all origins (default).
- String: Specifies a single origin.
- Array of Strings: Specifies multiple origins.

```ts
const app = v.App()
const corsOptions = {
  origin: ['http://localhost:3000', 'http://example.com'],
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true
}

app.cors(corsOptions)
```

This example allows requests from http://localhost:3000 and http://example.com, and allows only GET and POST methods.

<h2 id="cors-middleware-usage">CORS Middleware Usage</h2>
The CORS middleware can be applied globally to all routes in your application or specifically to individual routers. Below are a few examples of how to configure and use the CORS middleware.

<h3>Usage with Default Settings</h3>

```ts
import v from 'vkrun'

const app = v.App()
app.cors() // Apply global CORS with default settings

app.get('/', (_request: v.Request, response: v.Response) => {
  response.status(200).json({ message: 'CORS enabled by default' })
})

app.server().listen(3000, () => {
  console.log('Server with default CORS settings running on port 3000')
})
```

<h3>Usage with Custom Settings</h3>

```ts
import v from 'vkrun'

const app = v.App()
const customCorsOptions = {
  origin: 'http://my-allowed-origin.com',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type, Authorization',
  exposedHeaders: 'X-Custom-Header',
  credentials: true,
  maxAge: 3600
}

app.cors(customCorsOptions)

app.get('/', (_request: v.Request, response: v.Response) => {
  response.status(200).send('CORS configured with custom options')
})

app.server().listen(3000, () => {
  console.log('Server with custom CORS settings running on port 3000')
})
```

<h3>Options Request with Preflight Next</h3>

The CORS middleware also handles preflight requests, which are OPTIONS requests that browsers send to check if an actual request is allowed. When `preflightNext` is set to `true`, the OPTIONS request handling is passed to the next middleware, instead of being directly managed by the CORS middleware.

In this example, an OPTIONS request to `/route` will pass to the next middleware instead of being handled by the CORS middleware, because `preflightNext` is set to `true`.

```ts
const app = v.App()
const options = {
  origin: '*',
  methods: 'GET,HEAD,POST,DELETE',
  preflightNext: true
}

app.cors(options)

app.options('/route', (_request: v.Request, response: v.Response) => {
  response.status(200).send('Handled by custom OPTIONS route')
})

app.server().listen(3000, () => {
  console.log('Server with preflightNext enabled running on port 3000')
})
```

