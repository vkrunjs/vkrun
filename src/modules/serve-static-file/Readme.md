<div align="center">
  <img src="../../../logo.svg" width="200px" align="center" alt="Vkrun logo" />
  <h1 align="center">Vkrun - Serve Static File</h1>
  <br/>
  <p align="center">
    Serve Static File is a middleware module that enables serving static files from a directory based on incoming request paths.
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
- [Serve Static File Configuration](#serve-static-file-configuration)
- [Serve Static File Middleware Usage](#serve-static-file-middleware-usage)
- [Example Projects](#example-projects)

<h2 id="introduction">Introduction</h2>

The `serveStaticFile` middleware allows you to serve static files (like images, text files, or other assets) from a specified base directory, using the request's URL path to locate the file. It simplifies handling static assets in your Vkrun application by mapping requests to files in the file system.

<h2 id="quick-start">Quick Start</h2>

```ts
import v from 'vkrun'
import path from 'path'

const app = v.App()

// Define your base directory
const basePath = path.join(__dirname, 'static')

// Serve files under /static
app.get('/static/*', v.serveStaticFile(basePath))

app.server().listen(3000, () => {
  console.log('Server started on port 3000')
})
```

In this example, all requests to `/static/*` will be mapped to files in the `static` folder, with the remainder of the URL used to locate the file.

<h2 id="serve-static-file-configuration">Serve Static File Configuration</h2>

The `serveStaticFile` middleware can be configured by passing the base directory from which the static files will be served. The file paths in requests are used to locate corresponding files within this directory.

<h3>Default Behavior</h3>

- Files are served as-is based on their extension and - corresponding MIME type.
- If the file is found, it is returned with the correct - `Content-Type` header.
- If the file is not found, a `404 - File Not Found` response is returned.
- If there is an error in parsing the file path, a `404 - Error Parsing File` response is sent.

<h2 id="serve-static-file-middleware-usage">Serve Static File Middleware Usage</h2>

Here is an example usage with error handling and serving files dynamically based on request paths.

```ts
import v from 'vkrun'
import path from 'path'

const app = v.App()
// Directory where static files are located
const basePath = path.join(__dirname, 'public')

// Maps /static requests to the public folder
app.get('/static/*', v.serveStaticFile(basePath))

app.server().listen(3000, () => {
  console.log('Server running on port 3000')
})
```

In this example, requests to `/static/*` (e.g., `/static/image.png`) will serve the corresponding file from the `public` directory. If the file does not exist, a `404` error will be returned.

<h3>Handling MIME Types</h3>

The middleware uses the MIME type based on the file extension to set the appropriate `Content-Type` header. If the extension is not found in the predefined MIME types, it defaults to `application/octet-stream`.

```ts
app.get('/static/*', v.serveStaticFile(path.join(__dirname, 'static')))
```

The response will automatically include the correct `Content-Type` based on the file type, such as:

- `text/html` for HTML files
- `image/png` for PNG images
- `application/pdf` for PDF files

<h2 id="example-projects">Example projects</h2>

If you are looking for practical examples of how to use our framework in different scenarios, just click the link below:

[Example Projects](https://github.com/vkrunjs/vkrun/tree/main/examples/serve-static-file)

Feel free to browse the different designs and try out what best suits your needs. If you have any questions or suggestions about the examples, do not hesitate to contact us by opening a new Issue.