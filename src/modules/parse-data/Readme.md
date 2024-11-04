<div align="center">
  <img src="../../../logo.svg" width="200px" align="center" alt="Vkrun logo" />
  <h1 align="center">Vkrun - Parse Data</h1>
  <br/>
  <p align="center">
    Parse Data is a middleware module used to convert the data from a request.
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
- [Data Conversion Process](#data-conversion-process)
- [Parse Data Configuration](#parse-data-configuration)
  - [Parse Data Options](#parse-data-options)
- [Parse Data Middleware Usage](#parse-data-middleware-usage)
  - [Parsing Query Parameters](#parsing-query-parameters)
  - [Parsing URL Parameters](#parsing-url-parameters)
  - [Parsing JSON Body](#parsing-json-body)
  - [Parsing URL-encoded Form Data](#parsing-url-encoded-form-data)
  - [Parsing Multipart Form Data with Files](#parsing-multipart-form-data-with-files)
  - [SQL Injection Prevention with escapeSQL](#sql-injection-prevention)
- [Example projects](#example-projects)

<h2 id="introduction">Introduction</h2>

The Parse Data middleware is designed to easily convert incoming request data in different formats. It supports parsing query parameters, URL params, JSON body, URL-encoded form data, and multipart form data. Additionally, it processes file uploads as in-memory files, allowing easy manipulation of files for further middleware processing.

<h2 id="quick-start">Quick Start</h2>

```ts
import v from 'vkrun'

const app = v.App()
app.parseData() // Apply Parse Data middleware

app.get('/example', (request: v.Request, response: v.Response) => {
  response.status(200).json({ message: 'Parse Data enabled!' })
})

app.server().listen(3000, () => {
  console.log('Server started on port 3000 with Parse Data enabled')
})
```

<h2 id="data-conversion-process">Data Conversion Process</h2>

The Parse Data middleware automatically converts string data into their respective JavaScript types, simplifying data handling and validation across your application. Here’s how it handles each data type:

- String to Number:
  - If the string represents a numeric value (e.g., "42", "3.14"), it is converted to a Number.
  - Strings starting with 0 are treated as strings (e.g., "0123" remains "0123"), preserving any intended formatting.

- String to Boolean:
  - If the string value is "true" or "false", it is converted to a Boolean. "true" becomes true (Boolean), and "false" becomes false (Boolean), making it convenient for boolean values sent as strings.

- String to Date:
  - If the string matches the format of a valid date (e.g., "2024-12-01T10:00:00.000Z"), it is automatically converted to a Date object.
  - This is especially useful for date fields, as it allows for direct date manipulations without requiring manual parsing.

- Unchanged Strings:
  - Any other string, or one that doesn’t match a number, boolean, or date format, is kept as a String (e.g., "123abc" or "hello").
  - This includes alphanumeric strings, special characters, or numeric-like strings starting with 0.

This conversion process applies to data received from query parameters, URL parameters, JSON body, URL-encoded form data, and multipart form data. By standardizing data types across requests, the middleware helps to reduce the amount of data parsing and validation logic needed in your application code.

<h2 id="parse-data-configuration">Parse Data Configuration</h2>

The Parse Data middleware is customizable with various options. These options allow you to specify which types of data to parse from incoming requests, as well as handle SQL escape functionality.

<h3>Default Setting</h3>

```ts
{
  urlencoded: true, // Enables parsing of URL-encoded form data
  params: true, // Enables parsing of URL parameters
  query: true, // Enables parsing of query parameters
  json: true, // Enables parsing of JSON body data
  formData: true, // Enables parsing of multipart/form-data (including file uploads)
  escapeSQL: false // Disables SQL escaping by default
}
```

<h2 id="parse-data-options">Parse Data Options</h2>

- urlencoded: Whether to parse URL-encoded form bodies.
- params: Whether to parse URL parameters.
- query: Whether to parse query parameters.
- json: Whether to parse JSON data from the request body.
- formData: Whether to parse multipart form data, including file uploads as in-memory files.
- escapeSQL: If set to true, all SQL-like strings in parsed data will be escaped to prevent SQL injection.

<h2 id="parse-data-middleware-usage">Parse Data Middleware Usage</h2>

The Parse Data middleware can be applied globally to all routes in your application or specifically to individual routers. Below are examples of how to configure and use the Parse Data middleware.

<h3 id="parsing-query-parameters">Parsing Query Parameters</h3>

Request:

```ts
fetch('/query?string=value&integer=123')
```

Server-side:

```ts
app.get('/query', (request: v.Request, response: v.Response) => {
  // Example URL: /query?string=value&integer=123
  // The query parameters are parsed and converted into a structured object:
  console.log(request.query) 
  // Output: { string: 'value', integer: 123 }
  // 'string' remains a string, and 'integer' is automatically converted to a number
  response.status(200).end()
})
```

<h3 id="parsing-url-parameters">Parsing URL Parameters</h3>

Request:

```ts
fetch('/params/1/example')
```

Server-side:

```ts
app.get('/params/:id/:name', (request: v.Request, response: v.Response) => {
  // Example URL: /params/1/example
  // The path segments after /params/ are parsed as route parameters:
  console.log(request.params)
  // Output: { id: 1, name: 'example' }
  // 'id' is converted to a number, and 'name' remains a string
  response.status(200).end()
})
```

<h3 id="parsing-json-body">Parsing JSON Body</h3>

Request:

```ts
fetch('/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ key: 'value', count: 10 })
})
```

Server-side:

```ts
app.post('/data', (request: v.Request, response: v.Response) => {
  // Example JSON body: { "key": "value", "count": 10 }
  // The JSON body is parsed and becomes a JavaScript object:
  console.log(request.body)
  // Output: { key: 'value', count: 10 }
  // 'key' is a string, and 'count' is automatically converted to a number
  response.status(200).end()
})
```

<h3 id="parsing-url-encoded-form-data">Parsing URL-encoded Form Data</h3>

Request:

```ts
fetch('/form', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: 'string=example&number=42'
})
```

Server-side:

```ts
app.post('/form', (request: v.Request, response: v.Response) => {
  // Example body: string=example&number=42
  // URL-encoded data is parsed into an object with keys and values:
  console.log(request.body)
  // Output: { string: 'example', number: 42 }
  // 'string' remains a string, and 'number' is automatically converted to a number
  response.status(200).end()
})
```

<h3 id="parsing-multipart-form-data-with-files">Parsing Multipart Form Data with Files</h3>

Request:

```ts
const formData = new FormData()
formData.append('username', 'john_doe')
formData.append('file', fileInput.files[0])  // Assuming fileInput is a file input element

fetch('/upload', {
  method: 'POST',
  body: formData
})
```

Server-side:

```ts
app.post('/upload', (request: v.Request, response: v.Response) => {
  // Example form data with files:
  // - Fields: { username: 'john_doe' }
  // - Files: file (with an image or document)
  console.log(request.body)
  // Output: { username: 'john_doe' }
  // Non-file fields are parsed normally and remain in `body`

  console.log(request.files)
  // Output: Array of file objects, each containing:
  // - fieldName: Field name specified in the form	
  // - filename: original filename, e.g., 'photo.jpg'
  // - buffer: the file data in memory
  // - mimetype: e.g., 'image/jpeg'
  // - size: file size in bytes
  // Useful for further processing, such as saving or validating the files
  response.status(200).end()
})
```

<h3 id="sql-injection-prevention">SQL Injection Prevention with `escapeSQL`</h3>

Setting `escapeSQL: true` automatically escapes any SQL-like strings in request data, neutralizing potentially harmful characters to prevent SQL injection.

Request:

```ts
fetch('/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ sql: 'SELECT * FROM users WHERE id = 1' })
})
```

Server-side:

```ts
const options = {
  escapeSQL: true
}
app.use(v.parseData(options))

app.post('/data', (request: v.Request, response: v.Response) => {
  // Example body: { sql: 'SELECT * FROM users WHERE id = 1' }
  console.log(request.body)
  // Output: { sql: "'SELECT * FROM users WHERE id = 1'" }
  // SQL keywords are escaped to prevent SQL injection attacks.
  // Here, quotes are added around SQL strings, effectively neutralizing dangerous characters
  response.status(200).end()
})
```

By configuring the Parse Data middleware with the right options, you can easily handle and process different types of request data, improving the flexibility and security of your application.

<h2 id="example-projects">Example projects</h2>

If you are looking for practical examples of how to use our framework in different scenarios, just click the link below:

[Example Projects](https://github.com/vkrunjs/vkrun/tree/main/examples/parse-data)

Feel free to browse the different designs and try out what best suits your needs. If you have any questions or suggestions about the examples, do not hesitate to contact us by opening a new Issue.