import { IncomingMessage, ServerResponse } from "http";

export interface VkrunRouter {
  /**
   * @method get
   *
   * Defines a route that handles `GET` requests. This method registers a handler for incoming `GET` requests
   * to the specified path. It is used to retrieve data or perform read operations on the server.
   *
   * @param {string} path - The path for the route (e.g., `/users`).
   * @param {...any} handlers - The handler functions to be executed for the `GET` request.
   *
   * @see Router Methods Documentation](https://vkrunjs.com/router/router-methods)
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
   * @see Router Methods Documentation](https://vkrunjs.com/router/router-methods)
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
   * @see Router Methods Documentation](https://vkrunjs.com/router/router-methods)
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
   * @see Router Methods Documentation](https://vkrunjs.com/router/router-methods)
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
   * @see Router Methods Documentation](https://vkrunjs.com/router/router-methods)
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
   * @see Router Methods Documentation](https://vkrunjs.com/router/router-methods)
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
   * @see Router Methods Documentation](https://vkrunjs.com/router/router-methods)
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
  options: (path: string, ...handlers: any) => void;
}

/**
 * @interface Request
 *
 * Represents an HTTP request in the `vkrun` framework. Extends Node's `IncomingMessage` to include custom properties
 * for handling route data, request body, query parameters, and files. This object is used to manage the data passed
 * from the client to the server.
 *
 * **Custom Properties:**
 * - **`body`**: Contains the parsed body of the request. The format depends on the content type of the request (e.g., JSON, URL-encoded).
 * - **`params`**: Contains the route parameters extracted from the URL path (e.g., for `/users/:id`, the `id` will be available in `params`).
 * - **`query`**: Contains the query parameters from the URL (e.g., for `/search?q=test`, the `query` will contain `{ q: 'test' }`).
 * - **`files`**: Contains files sent with the request, either stored in memory or on disk, depending on the configuration.
 *
 * @param {T} [T] - A generic type for the request body, allowing the user to specify the shape of the request's body.
 *
 * @see Router Request Documentation](https://vkrunjs.com/router/handlers/router-request)
 *
 * @example
 * // Example usage of `Request` in route handler
 * const handler = (req: Request) => {
 *   console.log(req.body) // Access the parsed body of the request
 *   console.log(req.params.id) // Access route parameters
 *   console.log(req.query.search) // Access query parameters
 *   console.log(req.files) // Access uploaded files
 * }
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export interface Request<T = any> extends IncomingMessage {
  request: { handlers: any[]; params: Record<string, string> };
  requestId?: string;
  route?: Route;
  body: T extends { body: infer B } ? B : Record<string, string | number | boolean | Date> | JSON | string | undefined | any;
  params: T extends { params: infer P } ? P : Record<string, string | number | boolean | Date> | undefined;
  query: T extends { query: infer Q } ? Q : Record<string, string | number | boolean | Date> | undefined;
  session?: any;
  files: T extends { files: infer F } ? F : RouterFile[];
}

/**
 * @interface Response
 *
 * Represents an HTTP response in the `vkrun` framework. Extends Node's `ServerResponse` to include custom methods
 * for sending responses, setting cookies, and managing headers.
 *
 * **Custom Methods:**
 * - **`status()`**: Sets the HTTP status code for the response (e.g., `res.status(200)`).
 * - **`json()`**: Sends a JSON response with the provided data.
 * - **`send()`**: Sends data as a response, the format depends on the provided data.
 * - **`setCookie()`**: Sets a cookie on the response (with options like `httpOnly`, `secure`, etc.).
 * - **`clearCookie()`**: Clears a cookie from the response.
 *
 * **`_body`**: Contains the body data of the response before sending.
 *
 * @see Router Response Documentation](https://vkrunjs.com/router/handlers/router-response)
 *
 * @example
 * // Example usage of `Response` in a route handler
 * const handler = (req: Request, res: Response) => {
 *   res.status(200).send('Hello, World!') // Sending a plain text response
 *   res.json({ message: 'Hello, World!' }) // Sending a JSON response
 *   res.setCookie('token', 'abc123') // Setting a cookie
 *   res.clearCookie('token') // Clearing a cookie
 * }
 */
export type Response = ServerResponse & RouterCustomResponseMethods;

export interface RouterCustomResponseMethods {
  /**
   * @method status
   *
   * Sets the HTTP status code for the response. The status code informs the client about
   * the result of their request. This method allows you to set a custom HTTP status code
   * for the response before sending it.
   *
   * @param {number} statusCode - The HTTP status code to send in the response (e.g., 200, 404, 500).
   *
   * @returns {Response} - Returns the response object, allowing for method chaining.
   *
   * @example
   * // Example of setting a status code to 404 (Not Found)
   * const exampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
   *   res.status(404).send('Resource not found')
   * }
   */
  status: (status: number) => Omit<Response, "status">;

  /**
   * @method json
   *
   * Sends a JSON response. The `json` method converts a JavaScript object to JSON format
   * and sends it as the response. It also sets the `Content-Type` header to `application/json`.
   *
   * @param {object} data - The JavaScript object to send as a JSON response.
   *
   * @returns {Response} - Returns the response object, allowing for method chaining.
   *
   * @example
   * // Example of sending a JSON response
   * const exampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
   *   const responseData = { message: 'Hello, world!' }
   *   res.json(responseData) // Sends a JSON response
   * }
   */
  json: (data: object) => ServerResponse;

  /**
   * @method html
   *
   * Sends an HTML response using template literals. Useful for dynamically
   * generating HTML content.
   *
   * @param {TemplateStringsArray} strings - Template literal strings array.
   * @param {unknown[]} values - Template literal interpolated values.
   * @returns {ServerResponse} - The updated ServerResponse instance for chaining.
   *
   * @example
   * response.html`
   *   <html>
   *     <body>
   *       <h1>Hello, ${name}!</h1>
   *     </body>
   *   </html>
   * `;
   */
  html: (strings: TemplateStringsArray, ...values: unknown[]) => ServerResponse;

  /**
   * @method redirect
   *
   * Redirects the request to the specified URL. Makes an HTTP request to the target URL,
   * and forwards the response headers and body back to the client.
   *
   * **Important:** The URL must include the protocol (`http://` or `https://`) at the beginning.
   * Without the protocol, the method will not know whether to use HTTP or HTTPS for the request.
   *
   * @param {string} url - The fully qualified URL (must include `http://` or `https://`) to redirect the request to.
   * @returns {ServerResponse} - Returns the response object for chaining.
   *
   * @example
   * // Example of redirecting to an external domain
   * app.get('/google', (req, res) => {
   *   res.redirect('https://www.my-domain.com');
   * });
   *
   * @example
   * // Example of redirecting to an internal service
   * app.get('/service', (req, res) => {
   *   res.redirect('http://localhost:4000/api');
   * });
   */
  redirect: (url: string) => ServerResponse;

  /**
   * @method send
   *
   * Sends a response with the specified data. The `send` method can be used to send a variety of content,
   * including strings, objects, or buffers. If the data is an object, it will automatically be converted
   * to JSON.
   *
   * @param {any} data - The data to send in the response. It can be a string, object, or buffer.
   *
   * @returns {Response} - Returns the response object, allowing for method chaining.
   *
   * @example
   * // Example of sending a plain text response
   * const exampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
   *   res.send('Hello, world!') // Sends a plain text response
   * }
   */
  send: (data: any) => ServerResponse;

  /**
   * @method setCookie
   *
   * Sets a cookie in the response header, which will be sent to the client. This method allows the server
   * to send cookies, which are small pieces of data stored on the client’s browser. Cookies can be used for
   * purposes such as tracking sessions, storing preferences, and maintaining user authentication.
   *
   * **Cookie Configuration Options:**
   * - **httpOnly**: If set to `true`, the cookie is inaccessible to JavaScript's `Document.cookie` API. This helps
   *   protect against cross-site scripting (XSS) attacks by limiting the cookie's exposure.
   * - **secure**: If set to `true`, the cookie will only be sent over secure (HTTPS) connections. This ensures that the
   *   cookie is not exposed over insecure connections.
   * - **expires**: A string representing the expiration date of the cookie. If set, the cookie will be deleted after the
   *   specified date. This is often set in UTC format, such as `'Wed, 21 Oct 2015 07:28:00 GMT'`.
   * - **maxAge**: The maximum age of the cookie in seconds. For example, `maxAge: 3600` would set the cookie to expire in
   *   one hour. This is an alternative to `expires`.
   * - **path**: Specifies the URL path for which the cookie is valid. By default, the cookie is available to the entire domain.
   *   You can set it to a specific path, such as `/login`, to restrict the cookie's scope.
   * - **sameSite**: Controls whether the cookie should be sent with cross-origin requests:
   *   - `'Strict'`: The cookie is sent only for same-site requests (i.e., requests from the same domain).
   *   - `'Lax'`: The cookie is sent for same-site requests and some cross-site requests (e.g., top-level navigations).
   *   - `'None'`: The cookie is sent with all cross-origin requests. Requires the `secure` option to be `true`.
   * - **domain**: Specifies the domain for which the cookie is valid. By default, the cookie is only valid for the domain
   *   of the site that set it. This option allows the cookie to be shared across subdomains.
   * - **priority**: Specifies the cookie's priority for the browser to send it. Options include:
   *   - `'Low'`
   *   - `'Medium'`
   *   - `'High'`
   *
   * @param {string} name - The name of the cookie.
   * @param {string} value - The value to store in the cookie.
   * @param {object} [options] - Optional configuration options for the cookie.
   *
   * @returns {Response} - Returns the response object, allowing for method chaining.
   *
   * @example
   * // Example of setting a cookie with multiple options
   * const exampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
   *   res.setCookie('sessionId', 'abc123', {
   *     httpOnly: true,  // Prevents JavaScript access to the cookie
   *     secure: true,    // Ensures the cookie is sent over HTTPS only
   *     maxAge: 3600,    // Expires after 1 hour (3600 seconds)
   *     path: '/dashboard', // Cookie will only be available under /dashboard path
   *     sameSite: 'Strict',  // Cookie is sent only for same-site requests
   *     domain: 'example.com', // Cookie is available to the entire example.com domain
   *     priority: 'High'   // Set the priority for the cookie to be sent
   *   })
   * }
   */
  setCookie: (name: string, value: string, options?: RouterCookieOptions) => ServerResponse;

  /**
   * @method clearCookie
   *
   * Clears a cookie by setting its value to an empty string and its expiration date to a past date.
   * This method is used to remove a cookie from the client’s browser.
   *
   * @param {string} name - The name of the cookie to be cleared.
   *
   * @returns {Response} - Returns the response object, allowing for method chaining.
   *
   * @example
   * // Example of clearing a cookie
   * const exampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
   *   res.clearCookie('sessionId') // Clears the 'sessionId' cookie
   * }
   */
  clearCookie: (name: string) => ServerResponse;
}

export interface RouterCookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  expires?: string;
  maxAge?: string | number;
  path?: string;
  sameSite?: "Strict" | "Lax" | "None";
  domain?: string;
  priority?: "Low" | "Medium" | "High";
}

export interface RouterMemoryFile {
  fieldName: string;
  filename: string;
  extension: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export interface RouterStorageFile {
  fieldName: string;
  originalName: string;
  filename: string;
  extension: string;
  mimetype: string;
  size: number;
  destination: string;
  path: string;
}

export type RouterFile = RouterMemoryFile | RouterStorageFile;

export interface ErrorHandlerMiddleware {
  handle: (error: any, request: Request, response: Response) => any | Promise<any>;
}

export interface Middleware {
  handle: (request: Request, response: Response, next: NextFunction) => any | Promise<any>;
}

export interface Controller {
  handle: (request: Request, response: Response) => any | Promise<any>;
}

export type RouterSendParam = ((cb?: () => void) => void) &
  ((chunk: any, cb?: () => void) => void) &
  ((chunk: any, encoding: BufferEncoding, cb?: () => void) => void);

/**
 * @function NextFunction
 *
 * Represents a function used to pass control to the next middleware or route handler
 * in the stack. It is typically used in middleware to continue processing the request
 * or to finish the current request-response cycle. It does not receive parameters
 * unless it's used in an error-handling middleware.
 *
 * **Basic usage:**
 * - Calling `next()` without any arguments passes control to the next middleware or route handler.
 *
 * **Error Handling:**
 * - In case of an error, you should use a middleware specifically designed to handle errors,
 *   which takes an `error` parameter. This allows you to centralize error handling logic and
 *   prevents the need to handle errors in every middleware.
 *
 * @example
 * // Example of calling `next()` to pass control to the next middleware
 * const exampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
 *   console.log('Processing request...')
 *   next() // Continues to the next middleware or route handler
 * }
 *
 * // Example of using an error-handling middleware
 * const errorHandlingMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
 *   console.error('Error:', err)
 *   res.status(500).send('Internal Server Error') // Sends a custom error response
 * }
 */
export type NextFunction = () => void;

export type RouteHandler = (req: Request, res: Response, next?: any) => Promise<void> | void;

export type RouteMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";

export interface Route {
  path: string;
  method: RouteMethods;
  handlers: RouteHandler[];
  regex: RegExp;
}

export interface ResponseHttpStatus {
  statusCode: number;
  content: any;
}
