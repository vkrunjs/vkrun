<div align="center">
  <img src="../../../logo.svg" width="200px" align="center" alt="Vkrun logo" />
  <h1 align="center">Vkrun - Validate Route Data</h1>
  <br/>
  <p align="center">
    Validate Route Data is a middleware module used to ensure that the incoming request data meets specified validation criteria.
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
- [Validation Schema Configuration](#validation-schema-configuration)
  - [Validation Options](#validation-options)
- [Validate Route Data Middleware Usage](#validate-route-data-middleware-usage)
- [Example projects](#example-projects)

<h2 id="introduction">Introduction</h2>

The Validate Route Data middleware is designed to validate incoming request data based on predefined schemas. It checks for data integrity by ensuring that params, query, body, and files meet the expected structure and types. This is essential for building secure and robust APIs.

<h2 id="quick-start">Quick Start</h2>

```ts
import v from 'vkrun'

const app = v.App()
app.parseData() // Parsing incoming request data

// Define o esquema de validação para parâmetros, query e corpo da requisição
const schemaData = v.schema().object({
  params: v.schema().object({
    string: v.schema().string().email(),
    integer: v.schema().number().integer()
  }),
  query: v.schema().object({
    float: v.schema().number().float(),
    boolean: v.schema().boolean(),
    date: v.schema().date()
  }),
  files: v.schema().array().notRequired(),
  body: v.schema().object({
    string: v.schema().string().email(),
    integer: v.schema().number().integer(),
    float: v.schema().number().float(),
    boolean: v.schema().boolean(),
    date: v.schema().date()
  })
})

const controller = (request, response) => {
  response.status(200).send('Validation passed!')
}

// Configura a rota com o middleware de validação
app.post(
  '/params/:string/:integer/query',
  v.validateRouteData(schemaData), // Aplica a validação à rota específica
  controller
)

app.server().listen(3000, () => {
  console.log('Server started on port 3000 with Validation enabled')
})
```

request:

```ts
// Definindo a URL da requisição, incluindo parâmetros e query string
const path = 'http://localhost:3000/params/any@mail.com/123/query?float=1.56&boolean=true&date=2000-02-03T02:00:00.000Z'

// Corpo da requisição que será validado no middleware
const data = {
  string: 'any@mail.com',
  integer: 123,
  float: 1.56,
  boolean: true,
  date: '2000-02-03T02:00:00.000Z'
}

// Realizando a requisição POST com fetch
fetch(path, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Validation failed')
    }
    return response.text()
  })
  .then(data => {
    console.log(data) // Output esperado: "Validation passed!"
  })
  .catch(error => {
    console.error('Error:', error.message)
  })
```

<h2 id="validation-schema-configuration">Validation Schema Configuration</h2>

The Validate Route Data middleware is highly configurable, allowing you to define specific validation rules for different parts of the request. These parts include:

- params: Validates the route parameters, such as /example/:id.
- query: Validates the query string parameters, such as /example?key=value.
- body: Validates the body of the request for methods like POST, PUT, and PATCH.
- files: Optionally validates any uploaded files (e.g., multipart form data).

You can configure the schema to enforce specific data types and formats, like email, integer, float, boolean, or date.

<h3>Example Schema</h3>

```ts
const schemaData = v.schema().object({
  params: v.schema().object({
    string: v.schema().string().email(),
    integer: v.schema().number().integer()
  }),
  query: v.schema().object({
    float: v.schema().number().float(),
    boolean: v.schema().boolean(),
    date: v.schema().date()
  }),
  body: v.schema().object({
    string: v.schema().string().email(),
    integer: v.schema().number().integer(),
    float: v.schema().number().float(),
    boolean: v.schema().boolean(),
    date: v.schema().date()
  })
})
```

<h2 id="validation-options">Validation Options</h2>

Each validation category (params, query, body, and files) supports chaining for enhanced validation. Some examples include:

- string().email(): Ensures the string is a valid email format.
- number().integer(): Validates that the number is an integer.
- boolean(): Checks that the value is a boolean.
- date(): Validates that the value is a date format.

<h2 id="validate-route-data-middleware-usage">Validate Route Data Middleware Usage</h2>

The Validate Route Data middleware is best applied to individual routes where validation is required. Below are examples of how to configure and use this middleware in specific routes.

<h3>Basic Validation Example</h3>

```ts
const app = v.App()
app.parseData() // Ensure data is parsed before validation

const controller = (request: v.Request, response: v.Response) => {
  response.status(200).send('Validation passed!')
}

app.post(
  '/validate/:string/:integer',
  v.validateRouteData(schemaData), // Apply validation to this specific route
  controller
)
```

In this example, the middleware will validate the route params, query, and body according to the schemaData configuration for this specific route. If the incoming request data does not match the schema, a 400 Bad Request response will be returned with an error message.

Request Example:

```ts
fetch('http://localhost:3000/validate/any@mail.com/123?float=1.56&boolean=true&date=2000-02-03T02:00:00.000Z', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    string: 'any@mail.com',
    integer: 123,
    float: 1.56,
    boolean: true,
    date: '2000-02-03T02:00:00.000Z'
  })
})
  .then(response => response.text())
  .then(data => console.log(data)) // Output: "Validation passed!"
  .catch(error => console.error('Error:', error))
```

<h3>Handling Invalid Data</h3>

If the incoming request data does not match the schema, the middleware will automatically respond with a 400 Bad Request status, along with a detailed error message.

Example with Invalid Data:

```ts
const data = {
  string: 'invalid-email',
  integer: 123,
  float: 1.56,
  boolean: true,
  date: new Date('2000-02-03T02:00:00.000Z')
}

fetch('http://localhost:3000/validate/invalid-email/123?float=1.56&boolean=true&date=2000-02-03T02:00:00.000Z', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
  .catch(error => {
    console.log(error.response.data) // Output: "email invalid-email is invalid!"
  })
```

In this example, the invalid email format in params triggers a 400 Bad Request with a detailed error message, indicating the specific field and error type.

<h3>Complex Validation with Body and Query</h3>

The middleware can handle complex validation for both the body and query parameters simultaneously. Here's an example of how to configure a route with such validation:

```ts
app.post(
  '/complex/:string/:integer/query',
  v.validateRouteData(schemaData), // Specific route validation
  (request: v.Request, response: v.Response) => {
    response.status(200).json({
      params: request.params,
      query: request.query,
      body: request.body
    })
  }
)
```

When you send a request to this endpoint with valid data, the server will respond with a 200 OK status and the parsed request data. If any part of the request data (query, params, body) is invalid, a 400 Bad Request is returned with a specific error message.

<h3>Using Validation with File Data</h3>

You can also apply schema validation to uploaded files. The files field in the schema can be configured to enforce file-related validation rules, such as file types, size, and more.

```ts
const fileSchema = v.schema().array().notRequired()

const schemaDataWithFiles = v.schema().object({
  files: fileSchema
})

app.post(
  '/file-upload',
  v.validateRouteData(schemaDataWithFiles),
  (request: v.Request, response: v.Response) => {
    response.status(200).send('File validation passed!')
  }
)
```

By leveraging the Validate Route Data middleware on specific routes, you can ensure data integrity and enforce validation where needed, enhancing the security and reliability of your API.

<h2 id="example-projects">Example projects</h2>

If you are looking for practical examples of how to use our framework in different scenarios, just click the link below:

[Example Projects](https://github.com/vkrunjs/vkrun/tree/main/examples/validate-route-data)

Feel free to browse the different designs and try out what best suits your needs. If you have any questions or suggestions about the examples, do not hesitate to contact us by opening a new Issue.