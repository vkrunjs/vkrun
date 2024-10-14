<div align="center">
  <img src="../../../logo.svg" width="200px" align="center" alt="Vkrun logo" />
  <h1 align="center">Vkrun - SuperRequest</h1>
  <br/>
  <p align="center">
    SuperRequest is a tool for simulating HTTP requests without the need to initialize a server listening on a port.
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
- [Supported Content-types](#supported-content-types)
  - [application/json](#application/json)
  - [application/x-www-form-urlencoded](#application/x-www-form-urlencoded)
  - [multipart/form-data](#multipart/form-data)
- [Supported protocols](#supported-protocols)
  - [Get](#get-protocol)
  - [Post](#post-protocol)
  - [Put](#put-protocol)
  - [Patch](#patch-protocol)
  - [Delete](#delete-protocol)
  - [Head](#head-protocol)
  - [Options](#options-protocol)
- [Example projects](#example-projects)

<h2 id="introduction">Introduction</h2>

SuperRequest is a powerful tool for simulating HTTP requests in Node.js applications without the need to initialize a server listening on a port. This makes it ideal for unit and integration testing, especially in scenarios where endpoint creation needs to be tested quickly and in isolation.

Basic Usage Example

In this example, we set up a simple application with a GET /hello route that responds with a message. We use superRequest to simulate the request and verify the response. To run this test, you will need to use a testing library such as Jest.

```ts
import v from 'vkrun'

describe('Basic example with superRequest', () => {
  it('Should respond with "Hello, World!" on GET /hello route', async () => {
    const app = v.App()

    // Define the GET /hello route
    app.get('/hello', (req: v.Request, res: v.Response) => {
      res.status(200).send('Hello, World!')
    })

    // Perform a GET request using superRequest
    await v.superRequest(app).get('/hello').then((response) => {
      // Validate the response
      expect(response.statusCode).toEqual(200)
      expect(response.data).toEqual('Hello, World!')
    })

    app.close() // closes all app processes
  })

  it('Should return 404 for a non-existent route', async () => {
    const app = v.App()

    // Define the GET /hello route
    app.get('/hello', (req: v.Request, res: v.Response) => {
      res.status(200).send('Hello, World!')
    })

    // Attempt to access a non-existent route: GET /not-found
    await v.superRequest(app).get('/not-found').catch((error) => {
      // Validate the error
      expect(error.response.statusCode).toEqual(404)
      expect(error.response.statusMessage).toEqual('Not Found')
    })

    app.close() // closes all app processes
  })
})
```

<h2 id="supported-content-types">Supported content-types</h2>

SuperRequest supports various content types in the request body, allowing a wide range of data formats:

<h2 id="application/json">application/json</h2>

Used to send data in JSON format. Ideal for RESTful APIs.

```ts
const app = v.App()

app.post('/json', (req: v.Request, res: v.Response) => {
  res.status(200).send(req.body)
})

describe('application/json', () => {
  it('Should send data in JSON format', async () => {
    const data = { name: 'John Doe', age: 30 }

    const response = await v.superRequest(app).post('/json', data, {
      headers: { 'Content-Type': 'application/json' }
    })

    expect(response.statusCode).toEqual(200)
    expect(response.data).toEqual(data)

    app.close() // closes all app processes
  })
})
```

<h2 id="application/x-www-form-urlencoded">application/x-www-form-urlencoded</h2>

Used to send form data in a URL-encoded string.

```ts
const app = v.App()

app.post('/form-url-encoded', (req: v.Request, res: v.Response) => {
  res.status(200).send(req.body)
})

describe('application/x-www-form-urlencoded', () => {
  it('Should send data in URL encoded format', async () => {
    const data = 'name=John+Doe&age=30'

    const response = await v.superRequest(app).post('/form-url-encoded', data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })

    expect(response.statusCode).toEqual(200)
    expect(response.data).toEqual({ name: 'John Doe', age: 30 })

    app.close() // closes all app processes
  })
})
```

<h2 id="multipart/form-data">multipart/form-data</h2>

Suitable for sending files and binary data.

```ts
import FormData from 'form-data'
import fs from 'fs'

const app = v.App()

app.post('/multipart', (req: v.Request, res: v.Response) => {
  res.status(200).send(req.files)
})

describe('multipart/form-data', () => {
  it('Should send files in multipart/form-data format', async () => {
    const data = new FormData()
    const filePath = 'path/to/file.txt'
    const fileContent = fs.readFileSync(filePath)

    data.append('file', fileContent, 'file.txt')

    const response = await v.superRequest(app).post('/multipart', data, {
      headers: data.getHeaders()
    })

    expect(response.statusCode).toEqual(200)
    expect(response.data[0].filename).toEqual('file.txt')

    app.close() // closes all app processes
  })
})
```

<h2 id="Supported protocols">supported Protocols</h2>

SuperRequest supports the main HTTP methods, allowing you to test all types of requests.

<h2 id="get-protocol">Get Protocol</h2>

Simulates a GET request to retrieve data.

```ts
const app = v.App()

app.get('/data', (req: v.Request, res: v.Response) => {
  res.status(200).send({ message: 'Hello, GET!' })
})

describe('Get protocol', () => {
  it('Should return data with GET', async () => {
    const response = await v.superRequest(app).get('/data')

    expect(response.statusCode).toEqual(200)
    expect(response.data).toEqual({ message: 'Hello, GET!' })

    app.close() // closes all app processes
  })
})
```

<h2 id="post-protocol">Post Protocol</h2>

Used to send data to the server.

```ts
const app = v.App()

app.post('/submit', (req: v.Request, res: v.Response) => {
  res.status(201).send(req.body)
})

describe('Post protocol', () => {
  it('Should send data with POST', async () => {
    const data = { title: 'New Post' }

    const response = await v.superRequest(app).post('/submit', data)

    expect(response.statusCode).toEqual(201)
    expect(response.data).toEqual(data)

    app.close() // closes all app processes
  })
})
```

<h2 id="put-protocol">Put Protocol</h2>

Used for data update.

```ts
const app = v.App()

app.put('/update', (req: v.Request, res: v.Response) => {
  res.status(200).send(req.body)
})

describe('Put protocol', () => {
  it('Should update data with PUT', async () => {
    const data = { id: 1, name: 'Updated Name' }

    const response = await v.superRequest(app).put('/update', data)

    expect(response.statusCode).toEqual(200)
    expect(response.data).toEqual(data)

    app.close() // closes all app processes
  })
})
```

<h2 id="patch-protocol">Patch Protocol</h2>

Used for partial data updates.

```ts
const app = v.App()

app.patch('/modify', (req: v.Request, res: v.Response) => {
  res.status(200).send(req.body)
})

describe('Patch protocol', () => {
  it('Should partially update with PATCH', async () => {
    const data = { name: 'Partially Updated' }

    const response = await v.superRequest(app).patch('/modify', data)

    expect(response.statusCode).toEqual(200)
    expect(response.data).toEqual(data)

    app.close() // closes all app processes
  })
})
```

<h2 id="delete-protocol">Delete Protocol</h2>

Simulates a DELETE request to remove a resource.

```ts
const app = v.App()

app.delete('/delete/:id', (req: v.Request, res: v.Response) => {
  res.status(200).send({ deletedId: req.params.id })
})

describe('Delete protocol', () => {
  it('Should delete resource with DELETE', async () => {
    const response = await v.superRequest(app).delete('/delete/1')

    expect(response.statusCode).toEqual(200)
    expect(response.data).toEqual({ deletedId: '1' })

    app.close() // closes all app processes
  })
})
```

<h2 id="head-protocol">Head Protocol</h2>

Used to retrieve only the headers of a response, without the body.

```ts
const app = v.App()

app.head('/info', (req: v.Request, res: v.Response) => {
  res.status(200).setHeader('X-Custom-Header', 'CustomValue').end()
})

describe('Head protocol', () => {
  it('Should return headers with HEAD', async () => {
    const response = await v.superRequest(app).head('/info')

    expect(response.statusCode).toEqual(200)
    expect(response.headers['x-custom-header']).toEqual('CustomValue')

    app.close() // closes all app processes
  })
})
```

<h2 id="options-protocol">Options Protocol</h2>

Allows checking the supported methods for a route.

```ts
const app = v.App()

app.options('/options', (req: v.Request, res: v.Response) => {
  res.setHeader('Allow', 'GET,POST,OPTIONS').status(204).end()
})

describe('Options protocol', () => {
  it('Should return supported methods with OPTIONS', async () => {
    const response = await v.superRequest(app).options('/options')

    expect(response.statusCode).toEqual(204)
    expect(response.headers.allow).toEqual('GET,POST,OPTIONS')

    app.close() // closes all app processes
  })
})
```

<h2 id="example-projects">Example projects</h2>

If you are looking for practical examples of how to use our framework in different scenarios, just click the link below:

[Example Projects](https://github.com/vkrunjs/vkrun/tree/main/examples/super-request)

Feel free to browse the different designs and try out what best suits your needs. If you have any questions or suggestions about the examples, do not hesitate to contact us by opening a new Issue.