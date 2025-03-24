import type { Server } from "http";
import type { ParseDataConfig } from "./parse-data-types";
import type { CorsSetOptions } from "./cors-types";
import type { RateLimitConfig } from "./rate-limit-types";
import type { NextFunction, Request, Response } from "./router-types";

export type AppCreateServer = Server;

export interface VkrunApp {
  /**
   * @method server
   *
   * Creates and starts the HTTP server for handling incoming requests.
   * This method leverages the `http.createServer` method from Node.js
   * to initialize a new server instance that will handle HTTP requests
   * and responses. The server is configured to use the routing and
   * middleware logic defined within the `AppSetup` class.
   *
   * @returns {AppCreateServer} - Returns an instance of the HTTP server.
   * The server is capable of handling incoming HTTP requests, routing them
   * through middleware and route handlers, and providing responses.
   *
   * @example
   * // Example usage of the server method
   * const app = App()
   *
   * app.server().listen(3000, () => {
   *   console.log("Server is running on port 3000")
   * })
   */
  server: () => AppCreateServer;

  /**
   * @method use
   *
   * Registers middleware to be applied globally or on specific routes. Middleware
   * can modify the request/response, log data, handle authentication, etc.
   *
   * - **Direct Middleware**: A function `(req, res, next)` executed for each request.
   * - **Middleware Factory**: A function returning an object with a `handle` method, useful for complex middleware like rate limiting.
   * - **Global Middleware**: Passed to `app.use()`, it applies to all routes, useful for tasks like logging or parsing.
   *
   * @param {Record<string, any> | ((req: Request, res: Response, next: NextFunction) => any)} middleware - Middleware to apply, either as a direct function or a factory returning an object with a `handle` method.
   *
   * @example
   * // Direct middleware
   * app.use((req, res, next) => { console.log(req.url); next(); })
   *
   * // Middleware with `handle` method
   * class Middleware {
   *   handle(req, res, next) {
   *     next() // Pass control to the next middleware
   *   }
   * }
   *
   * const middleware = new Middleware()
   * app.use(middleware) // Apply middleware globally
   *
   * // Applying middleware on specific routes using a router
   * const router = Router()
   * router.get('/route-name', controller)
   * app.use(router) // Applies the router with its own middleware
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  use: (middleware: Record<string, any> | ((req: Request, res: Response, next: NextFunction) => any)) => void;

  /**
   * @method close
   *
   * Closes the HTTP server and clears any active timers or intervals.
   * This method ensures that the server is properly shut down by calling `server.close()`
   * and cleaning up any active timers or intervals using `clearTimers()`.
   * It is especially useful in tests to ensure that no resources are left open, and no timers are running
   * after the server has been stopped, which could interfere with subsequent tests or processes.
   *
   * - **Server Shutdown**: Stops the server and prevents it from accepting new requests.
   * - **Timer Cleanup**: Clears any pending timers or intervals that were set during the server's operation.
   * - **Resource Cleanup**: Frees up resources used by the server and ensures no background processes are left running.
   *
   * @example
   * // Example usage of the close method in a test
   * const app = App()
   * const router = Router()
   *
   * router.get('/', (request, response) => {
   *   response.setHeader('Content-Type', 'text/plain')
   *   response.status(200).end('GET ok')
   * })
   *
   * app.use(router)
   *
   * await superRequest(app).get('/').then((response) => {
   *   expect(response.statusCode).toEqual(200)
   * })
   *
   * app.close() // Closes the server and cleans up resources after tests
   */
  close: () => void;

  /**
   * @method error
   *
   * Registers an error-handling middleware to manage errors that occur during request processing.
   * This middleware is triggered whenever an error is thrown in the route handler or during middleware execution.
   * It provides a standardized way to respond to errors and ensure the application doesn't crash due to unhandled exceptions.
   *
   * - **Error Handling in Synchronous Routes**: When an error is thrown inside a synchronous route handler, the error handler
   *   middleware catches it and allows you to send a custom error response.
   *
   * - **Error Handling in Asynchronous Routes**: For asynchronous routes, errors must be manually caught using a try-catch
   *   block within the route handler, as the error middleware will not automatically capture exceptions thrown in asynchronous code.
   *
   * - **Custom Error Response**: You can define a custom response, such as setting a specific HTTP status code or message,
   *   based on the type of error encountered.
   *
   * @param {Function} errorHandler - The error-handling middleware function. This function is passed three arguments:
   *   - `error`: The captured error.
   *   - `request`: The request object.
   *   - `response`: The response object.
   *
   * @example
   * // Example of setting up an error handler globally
   * const app = App()
   *
   * // Define the error-handling middleware
   * const errorHandler = (error: any, req: v.Request, res: v.Response) => {
   *   console.error(error)
   *   res.status(500).send('Internal Server Error')
   * }
   *
   * app.error(errorHandler)
   *
   * // Synchronous route that throws an error
   * app.get('/example', (req: v.Request, res: v.Response) => {
   *   throw new Error('Something went wrong')
   * })
   *
   * // Asynchronous route with error handling inside the controller
   * app.get('/async-example', async (req: v.Request, res: v.Response) => {
   *   try {
   *     await someAsyncFunction()
   *     res.status(200).send('Success')
   *   } catch (error) {
   *     res.status(503).send('Service Unavailable')
   *   }
   * })
   *
   * app.server().listen(3000, () => {
   *   console.log('Server is running on port 3000')
   * })
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: (errorHandler: (error: any, request: Request, response: Response) => Promise<void> | void) => void;

  /**
   * @method parseData
   *
   * Configures the data parsing middleware for the application. This method automatically parses the incoming
   * request body based on the provided configuration, supporting various content types such as JSON, URL-encoded,
   * form-data, and query parameters. The parsed data is then available in the request object, allowing handlers
   * to access structured data from the body, query, and parameters.
   *
   * By default, all data parsing options are enabled (`true`), except for SQL escape protection (`escapeSQL`),
   * which is disabled (`false`) by default. This behavior ensures that most common use cases work out-of-the-box,
   * while still allowing for customized configurations when needed.
   *
   * **Data Parsing Features:**
   * - **URL-encoded Data**: Automatically parses incoming `application/x-www-form-urlencoded` data into an object.
   * - **JSON Data**: Automatically parses incoming JSON data into an object.
   * - **Query Parameters**: Automatically parses query parameters and makes them available on `request.query`.
   * - **Form-Data**: Supports parsing `multipart/form-data` data, such as file uploads, and stores it in `request.files`.
   * - **SQL Injection Protection**: Optionally escapes SQL-related strings to prevent SQL injection attacks (configurable).
   *
   * @param {Object} [config] - Configuration options for the parsing behavior.
   * @param {boolean} [config.urlencoded=true] - Whether to parse `application/x-www-form-urlencoded` data.
   * @param {boolean} [config.json=true] - Whether to parse `application/json` data.
   * @param {boolean} [config.query=true] - Whether to parse query parameters in the URL.
   * @param {boolean} [config.params=true] - Whether to parse URL parameters.
   * @param {boolean} [config.formData=true] - Whether to parse `multipart/form-data` (file uploads).
   * @param {boolean} [config.escapeSQL=false] - Whether to escape SQL strings for security purposes (default is `false`).
   *
   * @example
   * // Example of using parseData to parse query parameters, URL params, and JSON body
   * const app = App()
   * app.parseData() // Uses default configuration: parses query, params, body, and form-data
   *
   * const router = Router()
   * router.get('/user/:id', (req, res) => {
   *   // Access parsed params and query data
   *   const userId = req.params.id
   *   res.status(200).send(`User ID: ${userId}`)
   * })
   *
   * // Create and start the server
   * const server = app.server()
   * server.listen(3000, () => {
   *   console.log('Server is running on port 3000')
   * })
   */
  parseData: (config?: ParseDataConfig) => void;

  /**
   * @method cors
   *
   * Configures Cross-Origin Resource Sharing (CORS) for the application. This method allows you to specify
   * which origins are allowed to access the resources of your application. It also supports configuring HTTP
   * methods, headers, credentials, and other CORS-related settings.
   *
   * CORS is a security feature implemented by web browsers that restricts how resources on a web page can
   * be requested from another domain. This method provides the necessary headers to enable cross-origin requests
   * based on the configuration you specify.
   *
   * **CORS Configuration Options:**
   * - **origin**: Specifies which origins are allowed to access the resources. This can be a string (single origin),
   *   an array of strings (multiple origins), or a function that dynamically checks the origin.
   * - **methods**: Specifies the HTTP methods allowed for cross-origin requests (e.g., 'GET', 'POST', 'PUT', 'DELETE').
   * - **allowedHeaders**: Specifies which HTTP headers can be used during the actual request.
   * - **exposedHeaders**: Specifies which HTTP headers can be exposed to the browser.
   * - **credentials**: Indicates whether the response to the request can expose cookies and HTTP authentication.
   * - **preflightNext**: If set to `true`, the `OPTIONS` preflight request will be passed to the next middleware instead of
   *   automatically sending the response.
   * - **successStatus**: Sets the status code to send for preflight requests (default is `204`).
   * - **maxAge**: Specifies how long the results of a preflight request can be cached (in seconds).
   *
   * @param {CorsSetOptions} [options] - Configuration options for CORS.
   *
   * @example
   * // Example of enabling CORS with custom options
   * const app = App()
   * const corsOptions = {
   *   origin: 'http://localhost:3000',
   *   methods: 'GET,POST,PUT,DELETE',
   *   allowedHeaders: 'Content-Type, Authorization',
   *   exposedHeaders: 'X-Another-Custom-Header',
   *   credentials: true,
   *   preflightNext: false,
   *   successStatus: 204,
   *   maxAge: 3600
   * }
   * app.cors(corsOptions)
   *
   * app.get('/', (req, res) => {
   *   res.status(200).send('CORS is configured!')
   * })
   *
   * const server = app.server()
   *
   * server.listen(3000, () => {
   *   console.log('Server is running on port 3000')
   * })
   *
   * // Example of default CORS settings
   * app.cors() // Enables CORS with default settings allowing all origins and methods
   */
  cors: (options?: CorsSetOptions) => void;

  /**
   * @method rateLimit
   *
   * Configures rate limiting for the application to control the number of requests a client can make within
   * a specified time window. This helps protect your application from abuse and overuse by limiting the
   * frequency of requests.
   *
   * **Rate Limiting Configuration Options:**
   * - **windowMs**: The time window (in milliseconds) during which requests are counted. For example, to limit
   *   requests to 100 per 15 minutes, set `windowMs: 15 * 60 * 1000`.
   * - **limit**: The maximum number of requests allowed within the specified time window.
   * - **standardHeaders**: If `true`, includes standard rate limit headers (`x-ratelimit-limit`, `x-ratelimit-remaining`,
   *   `x-ratelimit-reset`). Default is `true`.
   * - **legacyHeaders**: If `true`, includes legacy rate limit headers (`x-ratelimit-limit-legacy`, `x-ratelimit-remaining-legacy`,
   *   `x-ratelimit-reset-legacy`). Default is `false`.
   * - **minToNotification**: Minimum number of requests exceeding the limit that should trigger a notification (optional).
   * - **notification**: A callback function that gets called when the rate limit is exceeded, providing information
   *   about the client’s access data and the exceeded requests.
   *
   * Rate limiting is automatically applied to all routes, and clients will receive a `429 Too Many Requests` status
   * if they exceed the limit.
   *
   * @param {RateLimitConfig} [config] - Configuration options for rate limiting.
   * @param {number} [config.windowMs=15 * 60 * 1000] - The time window (in milliseconds) for rate limiting.
   * @param {number} [config.limit=100] - The maximum number of requests allowed within the time window.
   * @param {boolean} [config.standardHeaders=true] - Whether to send standard rate limit headers.
   * @param {boolean} [config.legacyHeaders=false] - Whether to send legacy rate limit headers.
   * @param {number} [config.minToNotification=1] - Minimum number of requests before triggering a notification.
   * @param {Function} [config.notification] - A callback function to notify when the rate limit is exceeded.
   *
   * @example
   * // Example of setting up rate limiting with custom options
   * const app = App()
   * const rateLimitConfig = {
   *   windowMs: 15 * 60 * 1000,  // 15 minutes
   *   limit: 100,                // 100 requests per window
   *   standardHeaders: true,
   *   legacyHeaders: false,
   *   minToNotification: 1,
   *   notification: (accessData) => {
   *     console.log('Rate limit exceeded:', accessData)
   *   }
   * }
   * app.rateLimit(rateLimitConfig)
   *
   * app.get('/rate-limit', (req, res) => {
   *   res.status(200).send('rate limit')
   * })
   *
   * // Create and start the server
   * const server = app.server()
   * server.listen(3000, () => {
   *   console.log('Server is running on port 3000')
   * })
   *
   * // Example of using default rate limiting configuration
   * app.rateLimit() // Uses default configuration with a 15-minute window and 100 requests limit
   */
  rateLimit: (config?: RateLimitConfig) => void;

  /**
   * @method get
   *
   * Defines a route that handles `GET` requests. This method registers a handler for incoming `GET` requests
   * to the specified path. It is used to retrieve data or perform read operations on the server.
   *
   * @param {string} path - The path for the route (e.g., `/users`).
   * @param {...any} handlers - The handler functions to be executed for the `GET` request.
   *
   * @example
   * // Example of a simple GET route
   * const app = App()
   * app.get('/hello', (req, res) => {
   *   res.status(200).send('Hello World')
   * })
   * const server = app.server()
   * server.listen(3000, () => {
   *   console.log('Server is running on port 3000')
   * })
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get: (path: string, ...handlers: any) => void;

  /**
   * @method head
   *
   * Defines a route that handles `HEAD` requests. This method registers a handler for incoming `HEAD` requests,
   * which are similar to `GET` requests but without the response body. It is typically used to retrieve metadata
   * (e.g., headers) without the actual content.
   *
   * @param {string} path - The path for the route (e.g., `/users`).
   * @param {...any} handlers - The handler functions to be executed for the `HEAD` request.
   *
   * @example
   * // Example of a simple HEAD route
   * const app = App()
   * app.head('/check', (req, res) => {
   *   res.status(200).send()
   * })
   * const server = app.server()
   * server.listen(3000, () => {
   *   console.log('Server is running on port 3000')
   * })
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  head: (path: string, ...handlers: any) => void;

  /**
   * @method post
   *
   * Defines a route that handles `POST` requests. This method registers a handler for incoming `POST` requests
   * to the specified path. It is used to send data to the server to create or update resources.
   *
   * @param {string} path - The path for the route (e.g., `/users`).
   * @param {...any} handlers - The handler functions to be executed for the `POST` request.
   *
   * @example
   * // Example of a simple POST route
   * const app = App()
   * app.post('/submit', (req, res) => {
   *   const data = req.body
   *   res.status(200).send(`Received data: ${JSON.stringify(data)}`)
   * })
   * const server = app.server()
   * server.listen(3000, () => {
   *   console.log('Server is running on port 3000')
   * })
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: (path: string, ...handlers: any) => void;

  /**
   * @method put
   *
   * Defines a route that handles `PUT` requests. This method registers a handler for incoming `PUT` requests
   * to the specified path. It is used to update an existing resource with new data.
   *
   * @param {string} path - The path for the route (e.g., `/users/:id`).
   * @param {...any} handlers - The handler functions to be executed for the `PUT` request.
   *
   * @example
   * // Example of a simple PUT route
   * const app = App()
   * app.put('/update/:id', (req, res) => {
   *   const updatedData = req.body
   *   const id = req.params.id
   *   res.status(200).send(`Updated data for ID: ${id}, New data: ${JSON.stringify(updatedData)}`)
   * })
   * const server = app.server()
   * server.listen(3000, () => {
   *   console.log('Server is running on port 3000')
   * })
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put: (path: string, ...handlers: any) => void;

  /**
   * @method patch
   *
   * Defines a route that handles `PATCH` requests. This method registers a handler for incoming `PATCH` requests
   * to the specified path. It is used to apply partial updates to an existing resource.
   *
   * @param {string} path - The path for the route (e.g., `/users/:id`).
   * @param {...any} handlers - The handler functions to be executed for the `PATCH` request.
   *
   * @example
   * // Example of a simple PATCH route
   * const app = App()
   * app.patch('/update-partial/:id', (req, res) => {
   *   const partialData = req.body
   *   const id = req.params.id
   *   res.status(200).send(`Partially updated data for ID: ${id}, Partial data: ${JSON.stringify(partialData)}`)
   * })
   * const server = app.server()
   * server.listen(3000, () => {
   *   console.log('Server is running on port 3000')
   * })
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  patch: (path: string, ...handlers: any) => void;

  /**
   * @method delete
   *
   * Defines a route that handles `DELETE` requests. This method registers a handler for incoming `DELETE` requests
   * to the specified path. It is used to delete a resource from the server.
   *
   * @param {string} path - The path for the route (e.g., `/users/:id`).
   * @param {...any} handlers - The handler functions to be executed for the `DELETE` request.
   *
   * @example
   * // Example of a simple DELETE route
   * const app = App()
   * app.delete('/delete/:id', (req, res) => {
   *   const id = req.params.id
   *   res.status(200).send(`Deleted resource with ID: ${id}`)
   * })
   * const server = app.server()
   * server.listen(3000, () => {
   *   console.log('Server is running on port 3000')
   * })
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete: (path: string, ...handlers: any) => void;

  /**
   * @method options
   *
   * Defines a route that handles `OPTIONS` requests. This method registers a handler for incoming `OPTIONS` requests,
   * which are typically used to retrieve the allowed HTTP methods for a particular resource.
   *
   * @param {string} path - The path for the route (e.g., `/users`).
   * @param {...any} handlers - The handler functions to be executed for the `OPTIONS` request.
   *
   * @example
   * // Example of a simple OPTIONS route
   * const app = App()
   * app.options('/options', (req, res) => {
   *   res.status(200).send('Allowed methods: GET, POST, PUT')
   * })
   * const server = app.server()
   * server.listen(3000, () => {
   *   console.log('Server is running on port 3000')
   * })
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: (path: string, ...handlers: any) => void;
}
