import {
  existsSync,
  readFileSync,
  appendFileSync,
  mkdirSync,
  writeFileSync,
  promises,
  readdirSync,
  rmSync,
  statSync,
  unlinkSync,
  chmodSync,
  createReadStream,
} from "fs";
import { join, resolve, basename, isAbsolute } from "path";
import { randomBytes, createCipheriv, createDecipheriv, randomUUID } from "crypto";
import { createSocket } from "dgram";
import { Socket } from "net";
import { parse } from "querystring";
import http, { ServerResponse, createServer, request, RequestOptions } from "http";
import https from "https";
import { RouterCookieOptions } from "../types";
import { isArray, isObject } from "../utils";

declare module "http" {
  interface ServerResponse {
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
    status: (status: number) => Omit<ServerResponse, "redirect">;

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
    _body: any;
  }
}

ServerResponse.prototype.status = function (status: number): Omit<ServerResponse, "redirect"> {
  this.statusCode = status;
  return this;
};

ServerResponse.prototype.json = function (body: object): ServerResponse {
  this.setHeader("Content-Type", "application/json");
  this.end(JSON.stringify(body));
  return this;
};

ServerResponse.prototype.html = function (strings: TemplateStringsArray, ...values: unknown[]): ServerResponse {
  const htmlContent = strings.reduce((acc, str, i) => {
    const value = values[i];
    const safeValue = typeof value === "string" ? value : String(value ?? "");
    return acc + str + safeValue;
  }, "");

  if (!this.hasHeader("Content-Type")) {
    this.setHeader("Content-Type", "text/html");
  }
  this.end(htmlContent);
  return this;
};

ServerResponse.prototype.redirect = function (url: string): ServerResponse {
  const requestModule = url.startsWith("https") ? https : http;

  const options = {
    method: this.req.method, // Usa o método da requisição original
    headers: this.req.headers,
  };

  const handleResponse = (externalRes: http.IncomingMessage): void => {
    // Copies the headers from the outer response to the original response
    Object.entries(externalRes.headers).forEach(([key, value]) => {
      if (value) {
        this.setHeader(key, value);
      }
    });

    // Wait for the external response body
    let data = "";
    externalRes.on("data", (chunk) => {
      data += chunk;
    });

    externalRes.on("end", () => {
      // Send the response to the original client
      this.statusCode = externalRes.statusCode ?? 302; // Default status for redirection
      this.end(data);
    });

    externalRes.on("error", (err) => {
      // Error handling during external response
      this.statusCode = 500;
      this.end(`Error while redirecting: ${err.message}`);
    });
  };

  const req = requestModule.request(url, options, handleResponse);

  req.on("error", (err) => {
    this.statusCode = 500;
    this.end(`Request error: ${err.message}`);
    return this;
  });

  // Adds the request body, if it exists
  if (this.req.body) {
    if (
      this.req.headers?.["content-type"].includes("application/json") &&
      (isObject(this.req.body) || isArray(this.req.body))
    ) {
      req.end(JSON.stringify(this.req.body));
    } else {
      req.end(this.req.body);
    }
  } else {
    req.end();
  }

  return this;
};

ServerResponse.prototype.send = function (body: any): ServerResponse {
  if (!this.hasHeader("Content-Type")) {
    this.setHeader("Content-Type", "text/plain");
  }
  this.end(body.toString());
  return this;
};

ServerResponse.prototype.setCookie = function (name: string, value: string, options: RouterCookieOptions = {}): ServerResponse {
  let cookie = `${name}=${value}`;
  if (options.httpOnly) cookie += "; HttpOnly";
  if (options.secure) cookie += "; Secure";
  if (options.maxAge) cookie += `; Max-Age=${options.maxAge}`;
  if (options.sameSite) cookie += `; SameSite=${options.sameSite}`;

  const existingCookies = this.getHeader("Set-Cookie") ?? [];
  this.setHeader("Set-Cookie", Array.isArray(existingCookies) ? [...existingCookies, cookie] : [cookie]);
  return this;
};

ServerResponse.prototype.clearCookie = function (name: string): ServerResponse {
  const expiredCookie = `${name}=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  const existingCookies = this.getHeader("Set-Cookie") ?? [];
  this.setHeader("Set-Cookie", Array.isArray(existingCookies) ? [...existingCookies, expiredCookie] : [expiredCookie]);
  return this;
};

export {
  http,
  https,
  request,
  RequestOptions,
  ServerResponse,
  createServer,
  createReadStream,
  existsSync,
  readFileSync,
  appendFileSync,
  writeFileSync,
  mkdirSync,
  resolve,
  join,
  promises,
  readdirSync,
  rmSync,
  statSync,
  unlinkSync,
  chmodSync,
  basename,
  isAbsolute,
  randomBytes,
  createCipheriv,
  createDecipheriv,
  createSocket,
  Socket,
  parse,
  randomUUID,
};
