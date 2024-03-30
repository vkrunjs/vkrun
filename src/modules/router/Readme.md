<div align="center">
  <img src="../../../logo.svg" width="200px" align="center" alt="Vkrun logo" />
  <h1 align="center">Vkrun - Router</h1>
  <br/>
  <p align="center">
    Router is a Vkrun module for creating endpoints (URIs) of an application that respond to client requests.
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
- [Router methods](#router-methods)
- [Router paths](#router-paths)
- [Request parameters, query and body](#req-params-query-body)
- [Router handlers](#router-handlers)
- [Response methods](#response-methods)
- [Example projects](#example-projects)

<h2 id="introduction">Introduction</h2>

Router is a Vkrun module for creating endpoints (URIs) of an application that respond to client requests.

Routes are created using Router methods that correspond to HTTP methods; for example, router.get() to handle GET requests and router.post() for POST requests. After creating all the routes, it is necessary to inject the Router instance into the use method of the Vkrun app.

Routing methods specify a callback function to be called when the application receives a request to the specified HTTP route and method. Vkrun app listens for requests that match the specified routes and methods and, when there is a match, calls the specified callback function.

```ts
import v from 'vkrun'

const app = v.App()
const router = v.Router()

// When calling the route below it responds with the text hello world
router.get('/', (req: v.Request, res: v.Response) => {
  res.setHeader('Content-Type', 'text/plain')
  res.status(200).end('Hello World!')
})

app.use(router)

app.server().listen(3000, () => {
  console.log('Vkrun started on port 3000')
})
```

<h2 id="router-methods">Router methods</h2>

Um método do Router é derivado a partir de um dos métodos HTTP, e é anexado a uma instância da classe express.

```ts
import v from 'vkrun'

const app = v.App()
const router = v.Router()

router.get('/', (req: v.Request, res: v.Response) => {
  res.status(200).send('GET method route')
})

router.post('/', (req: v.Request, res: v.Response) => {
  res.status(200).send('POST method route')
})

router.put('/', (req: v.Request, res: v.Response) => {
  res.status(200).send('PUT method route')
})

router.patch('/', (req: v.Request, res: v.Response) => {
  res.status(200).send('PATCH method route')
})

router.delete('/', (req: v.Request, res: v.Response) => {
  res.status(200).send('DELETE method route')
})

router.options('/', (req: v.Request, res: v.Response) => {
  res.status(200).end('OPTIONS method route')
})

router.head('/', (req: v.Request, res: v.Response) => {
  res.status(200).end() // The HEAD method does not send data in the response body
})

app.use(router) // Injected all created routes

app.server().listen(3000, () => {
  console.log('Vkrun started on port 3000')
})
```

<h2 id="router-paths">Router paths</h2>

Route paths, in combination with a request method, define the endpoints at which requests can be made. Route paths can be strings or string patterns.

This route path will match requests to the root route, /.

```ts
router.get('/', (req: v.Request, res: v.Response) => {
  res.send('root')
})
```

This route path will match requests to /users.

```ts
router.get('/users', (req: v.Request, res: v.Response) => {
  res.send('users')
})
```

<h2 id="req-params-query-body">Request parameters, query and body</h2>

Router does not parse parameters, query url and request body.

The parseData module is responsible for doing all types of parsing of a route.

```ts
import { App, Router, parseData } from 'vkrun'

const app = App()
const router = Router()

router.get('/users', (req: v.Request, res: v.Response) => {
  res.send('users')
})

app.use(parseData) // use parseData before using routes
app.use(router)
```

Example parameters:

* path: /Mario/Elvio

```ts
import { App, Router, parseData } from 'vkrun'

const app = App()
const router = Router()

router.get('/:firstName/:lastName', (req: v.Request, res: v.Response) => {
  const { firstName, lastName } = req.params
  // firstName equal 'Mario'
  // lastName equal 'lastName'
  res.status(200).end()
})

app.use(parseData) // use parseData before using routes
app.use(router)
```

Example query:

* path: /query?firstName=Mario&lastName=Elvio

```ts
import { App, Router, parseData } from 'vkrun'

const app = App()
const router = Router()

router.get('/query', (req: v.Request, res: v.Response) => {
  const { firstName, lastName } = req.query
  // firstName equal 'Mario'
  // lastName equal 'lastName'
  res.status(200).end()
})

app.use(parseData) // use parseData before using routes
app.use(router)
```

Example body:

* request:

```ts
const data = { firstName: 'Mario', lastName: 'Elvio' }

await fetch('http://domain/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
```

* router:

```ts
import { App, Router, parseData } from 'vkrun'

const app = App()
const router = Router()

router.post('/', (req: v.Request, res: v.Response) => {
  const { firstName, lastName } = req.body
  // firstName equal 'Mario'
  // lastName equal 'lastName'
  res.status(200).end()
})

app.use(parseData) // use parseData before using routes
app.use(router)
```

See the [parseData documentation](../parse-data/Readme.md).

<h2 id="router-handlers">Route handlers</h2>

You can provide multiple callback functions that behave like middleware to handle a request. The only exception is that these callbacks might invoke next('route') to bypass the remaining route callbacks. You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there’s no reason to proceed with the current route.

Route handlers can be in the form of a function, an array of functions, or combinations of both, as shown in the following examples.

A single callback function can handle a route. For example:

```ts
app.get('/example-a', (req: v.Request, res: v.Response) => {
  res.send('example A!')
})
```

More than one callback function can handle a route (make sure you specify the next object). For example:

```ts
app.get('/example-b', 
  (req: v.Request, res: v.Response, next: v.NextFunction) => {
    console.log('the response will be sent by the next handler...')
    next()
  },
  (req: v.Request, res: v.Response) => {
    res.send('example B!')
  }
)
```

```ts
const middleware = (req: v.Request, res: v.Response, next: v.NextFunction) => {
  console.log('the response will be sent by the next handler...')
  next()
}

const controller = (req: v.Request, res: v.Response, next: v.NextFunction) => {
  res.send('example C!')
}

app.get('/example-c', middleware, controller)
```

<h2 id="response-methods">Response methods</h2>

Vkrun adds methods to [httpserverresponse](https://nodejs.org/api/http.html#class-httpserverresponse)

| Method                | Description                       |
|-----------------------|-----------------------------------|
| response.status()     | Add status code to response.      |
| response.setCookie()  | Add cookie to response.           |
| response.json()       | Send a JSON response.             |
| response.send()       | Send a response of various types. |

<h2 id="response-methods">response.status(status: number)</h2>

Sets the status code of the response.

Example:

```ts
response.status(200)
```

<h2 id="response-methods">response.setCookie(name: string, value: string, options?: CookieOptions)</h2>

Sets a cookie in the response header.

Parameters:
* name: string - The name of the cookie.
* value: string - The value of the cookie.
* options?: CookieOptions - (Optional) Additional options for the cookie.

```ts
interface CookieOptions {
  httpOnly?: boolean
  secure?: boolean
  expires?: string
  maxAge?: number
  path?: string
  sameSite?: 'Strict' | 'Lax' | 'None'
  domain?: string
  priority?: 'Low' | 'Medium' | 'High'
}
```

Example:

```ts
const cookieValue = 'cookie-value'
response.setCookie('cookie-name', cookieValue, {
  httpOnly: true,
  secure: true,
  expires: 'Wed, 09 Jun 2024 10:18:14 GMT',
  maxAge: 3600,
  path: '/',
  sameSite: 'Strict',
  domain: '.example.com',
  priority: 'Low'
})
```

<h2 id="response-methods">res.json(data: object)</h2>

Used to send data in the response.

```ts
response.json({ message: 'Hello, world!' })
```

<h2 id="response-methods">res.send(data: any)</h2>

Used to send data in the response.

### Parameters
- `data: any` - The data to be sent in the response. It can be of any type.

If the response already has a `Content-Type` header set, `res.send()` will directly end the response with the provided data. Otherwise, it will set the `Content-Type` header to `text/plain` and then end the response with the provided data.

example with content type: 

```ts
this.setHeader('Content-Type', 'application/json')
response.send({ message: 'Hello world!' })
// The body of the response will be '{"message":"Hello world!"}'
```

Example without content type: 

```ts
// Assuming the Content-Type header is not set
response.send({ message: 'Hello world!' });
// The response will have a Content-Type of 'text/plain'
// The body of the response will be '{ "message": "Hello world!" }'
```

<h2 id="example-projects">Example projects</h2>

If you are looking for practical examples of how to use our framework in different scenarios, just click the link below:

[Example Projects](https://github.com/vkrunjs/vkrun/tree/main/examples/router)

Feel free to browse the different designs and try out what best suits your needs. If you have any questions or suggestions about the examples, do not hesitate to contact us by opening a new Issue.