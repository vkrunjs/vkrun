<div align="center">
  <img src="../../../logo.svg" width="200px" align="center" alt="Vkrun logo" />
  <h1 align="center">Vkrun - Swagger Builder</h1>
  <br/>
  <p align="center">
    SwaggerBuilder is a powerful tool for dynamically generating Swagger OpenAPI documentation with flexible route visibility and multi-server support.
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
- [Creating Routes](#creating-routes)
  - [HTTP Methods](#http-methods)
- [Serving Multiple Swagger Instances](#serving-multiple-swagger-instances)
- [Visibility Keys](#visibility-keys)
- [Detailed Method Structure](#visibility-keys)
- [Example Projects](#detailed-method-structure)

<h2 id="introduction">Introduction</h2>

SwaggerBuilder is an extension of the Vkrun framework that facilitates the generation of Swagger-compliant API documentation with customizable visibility per route using visibilityKeys. This feature is ideal for applications requiring segmented API documentation views (e.g., public vs private documentation). You can also serve multiple Swagger instances on different ports, each with its own visibility.

<h2 id="quick-start">Quick Start</h2>

```ts
import v from 'vkrun'
import swaggerUiDist from 'swagger-ui-dist'
import { SwaggerBuilder } from './swagger'

const app = v.App()
app.parseData()
app.cors()

const swagger = new SwaggerBuilder(swaggerUiDist)

swagger.create({
  openapi: '3.0.0',
  info: {
    title: 'Complete API Documentation',
    version: '1.0.2',
    description: 'API routes including public and private.',
    contact: {
      name: 'Support Team',
      email: 'support@example.com'
    }
  },
  servers: [{
    url: 'http://localhost:3000',
    description: 'Development Server'
  }]
})

// Define a public route
swagger.route('/public').get({
  summary: 'Public Route',
  description: 'A route available without authentication.',
  responses: {
    200: {
      description: 'Successful response',
      content: {
        'application/json': {
          schema: {
            type: 'string'
          }
        }
      }
    }
  },
  visibilityKeys: ['public']
})

// Start serving the public Swagger documentation
swagger.listen(3001, ['public'], () => {
  console.log('Public Swagger UI running on port 3001')
})
```

<h2 id="creating-routes">Creating Routes</h2>

You can define routes dynamically in the Swagger documentation using the route method. The route method allows you to declare different HTTP methods (GET, POST, PUT, etc.) for specific paths.

<h3 id="http-methods">HTTP Methods</h3>

The following HTTP methods are supported within SwaggerBuilder:

- GET: For retrieving resources.
- POST: For creating new resources.
- PUT: For updating existing resources.
- PATCH: For partially updating resources.
- DELETE: For removing resources.
- HEAD: For retrieving resource headers.
- OPTIONS: For checking the allowed HTTP methods on a route.

<h3>Example - Defining a Route with Multiple Methods:</h3>

```ts
swagger.route('/products')
  .get({
    summary: 'Retrieve Products',
    description: 'Fetches a list of products available in the store.',
    responses: {
      200: {
        description: 'List of products',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: { type: 'object' }
            }
          }
        }
      }
    },
    visibilityKeys: ['public']
  })
  .post({
    summary: 'Create a Product',
    description: 'Adds a new product to the store.',
    requestBody: {
      description: 'Product object to be added',
      content: {
        'application/json': {
          schema: { type: 'object' }
        }
      }
    },
    responses: {
      201: {
        description: 'Product created successfully'
      }
    },
    visibilityKeys: ['private']
  })
```

<h3>Example - Adding a PATCH Method to Modify Resources:</h3>

```ts
swagger.route('/products/:id')
  .patch({
    summary: 'Modify Product',
    description: 'Partially updates the details of a specific product.',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'integer' },
        description: 'Product ID'
      }
    ],
    requestBody: {
      description: 'Fields to be updated',
      content: {
        'application/json': {
          schema: { type: 'object' }
        }
      }
    },
    responses: {
      200: {
        description: 'Product updated successfully'
      }
    },
    visibilityKeys: ['private']
  })
```

<h2 id="serving-multiple-swagger-instances">Serving Multiple Swagger Instances</h2>

One of the standout features of `SwaggerBuilder` is the ability to serve multiple Swagger instances on different ports, each displaying routes based on `visibilityKeys`. This allows you to create separate Swagger UIs for public, private, or other categorized routes.

<h3>Example - Serving Public and Private APIs:</h3>

```ts
// Serve public documentation on port 3001
swagger.listen(3001, ['public'], () => {
  console.log('Public Swagger UI running on port 3001')
})

// Serve private documentation on port 3002
swagger.listen(3002, ['private'], () => {
  console.log('Private Swagger UI running on port 3002')
})
```

<h2 id="visibility-keys">Visibility Keys</h2>

Visibility Keys are used to control which routes are displayed in a particular Swagger instance. Each route can be tagged with one or more `visibilityKeys`, and when starting the Swagger server, you specify which keys should be visible. Only routes that match the provided keys will be displayed.

<h3>Example:</h3>

```ts
swagger.route('/admin')
  .get({
    summary: 'Admin Dashboard',
    description: 'Restricted route for admins.',
    responses: {
      200: { description: 'Successful response' }
    },
    visibilityKeys: ['private']
  })

swagger.route('/users')
  .get({
    summary: 'List Users',
    description: 'Returns a list of users.',
    responses: {
      200: { description: 'Successful response' }
    },
    visibilityKeys: ['public', 'private']
  })
```

When you run the Swagger instances, the routes will be filtered according to the specified keys:

```ts
swagger.listen(3001, ['public'], () => {
  console.log('Public Swagger UI running on port 3001')
})

swagger.listen(3002, ['private'], () => {
  console.log('Private Swagger UI running on port 3002')
})
```

In the above example, `/users` is available in both public and private Swagger UIs, while `/admin` is only available in the private Swagger UI.

<h2 id="detailed-method-structure">Detailed Method Structure</h2>

<h3>swagger.create(config: SwaggerOpenAPIConfig)</h3>

The `create` method is used to initialize the Swagger documentation by passing an `OpenAPIConfig` object. This includes metadata such as title, version, and API contact information.

- openapi: Specifies the OpenAPI version, typically "3.0.0".
- info: Contains metadata such as title, description, - version, terms of service, contact information, and - license.
  - title: The title of the API.
  - version: The version of the API.
  - description (optional): A description of the API.
  - contact (optional): Contact details for the API - maintainer.
  - license (optional): Information about the API’s license.
- servers: A list of servers providing the API.

```ts
swagger.create({
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'API for managing products.',
    contact: { name: 'API Support', email: 'support@example.com' },
    license: { name: 'MIT', url: 'https://opensource.org/licenses/MIT' }
  },
  servers: [{ url: 'http://localhost:3000', description: 'Development Server' }]
})
```

<h3>swagger.route(path: string)</h3>

The route method defines an endpoint and returns a SwaggerRouteBuilder, which is used to add methods like get, post, etc. to the route.

Each HTTP method has the following structure:

- tags: Categorizes the route.
- summary: A short summary of the operation.
- description: Detailed information about the route.
- parameters: A list of parameters required by the - operation (e.g., path or query parameters).
- requestBody (optional): Defines the body content and - schema if the method expects data (typically for POST, - PUT, PATCH).
- responses: Describes possible responses, including the - schema for each status code.
- security (optional): Defines security requirements for - the operation (e.g., API keys, OAuth2).

```ts
swagger.route('/products/:id')
  .get({
    summary: 'Get Product',
    description: 'Fetch a product by its ID.',
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
    responses: { 200: { description: 'Product found', content: { 'application/json': { schema: { type: 'object' } } } } }
  })
  .put({
    summary: 'Update Product',
    description: 'Update an existing product.',
    requestBody: { content: { 'application/json': { schema: { type: 'object' } } } },
    responses: { 200: { description: 'Product updated' } }
  })
```

<h3>swagger.listen(port: number, visibilityKeys: string[], callback?: Function)</h3>

This method starts the Swagger UI server on the specified port, filtering the documentation based on the `visibilityKeys` provided. The `callback` function is called when the server is successfully started.

```ts
swagger.listen(3001, ['public'], () => {
  console.log('Public Swagger UI running on port 3001')
})
```

In this example, the Swagger UI will only show routes tagged with the visibility key 'public'.

<h2 id="example-projects">Example projects</h2>

If you are looking for practical examples of how to use our framework in different scenarios, just click the link below:

[Example Projects](https://github.com/vkrunjs/vkrun/tree/main/examples/swagger-builder)

Feel free to browse the different designs and try out what best suits your needs. If you have any questions or suggestions about the examples, do not hesitate to contact us by opening a new Issue.