import { setCorsHeaders, validateOptions } from "./helpers";
import { isArray } from "../utils";
import { CorsOptions, NextFunction, Request, Response, CorsSetOptions, VkrunCors } from "../types";

export class CorsSetup implements VkrunCors {
  private readonly options: CorsOptions;

  constructor(options: CorsOptions) {
    this.options = options;
  }

  handle(request: Request, response: Response, next: NextFunction): void {
    setCorsHeaders(request, response, this.options);

    if (this.options.origin !== "*") {
      if (isArray(this.options.origin)) {
        const originHeader = this.options.origin.find((origin) => origin === request.headers.origin);
        if (!originHeader) {
          response.end();
          return;
        }
      } else if (this.options.origin !== request.headers.origin) {
        response.end();
        return;
      }
    }

    if (request.method === "OPTIONS") {
      if (this.options.preflightNext) next();
      else response.end();
    } else next();
  }
}

/**
 * @function cors
 *
 * Configures Cross-Origin Resource Sharing (CORS) for the application. This function allows you to specify
 * which origins are allowed to access the resources of your application, as well as configure other CORS-related settings.
 * It can handle preflight requests, method restrictions, headers, and more.
 *
 * CORS is a security feature implemented by browsers that restricts how resources on a web page can be requested
 * from another domain. This function provides the necessary headers to enable cross-origin requests based on the configuration.
 *
 * **CORS Configuration Options:**
 * - **origin**: Specifies which origins are allowed to access the resources. Can be a single string (for one origin),
 *   an array of strings (for multiple origins), or `'*'` to allow all origins.
 * - **methods**: Specifies the HTTP methods allowed for cross-origin requests (e.g., `'GET', 'POST', 'PUT', 'DELETE'`).
 * - **allowedHeaders**: Specifies which HTTP headers can be used during the actual request.
 * - **exposedHeaders**: Specifies which HTTP headers can be exposed to the browser.
 * - **credentials**: Indicates whether the response to the request can expose cookies and HTTP authentication.
 * - **preflightNext**: If set to `true`, the `OPTIONS` preflight request will be passed to the next middleware instead of
 *   automatically sending the response.
 * - **successStatus**: Sets the status code to send for preflight requests (default is `204`).
 * - **maxAge**: Specifies how long the results of a preflight request can be cached (in seconds).
 *
 * @param {CorsSetOptions} [options] - Configuration options for the CORS middleware. If no options are provided,
 * the middleware will use the default configuration, which allows all origins (`origin: '*'`) and allows all methods.
 *
 * @returns {VkrunCors} - An instance of the `VkrunCors` middleware that can be used in the application to handle CORS requests.
 *
 * @example
 * // Example of using `app.use(cors())` to apply default CORS settings
 * const app = App()
 *
 * // Applying default CORS settings globally to all routes
 * app.use(cors()) // Uses default configuration allowing all origins and methods
 *
 * // Example route using default CORS
 * app.get('/public', (req, res) => {
 *   res.status(200).send('This is a public endpoint with default CORS settings!')
 * })
 *
 * const server = app.server()
 * server.listen(3000, () => {
 *   console.log('Server with default CORS is running on port 3000')
 * })
 */
export const cors = (options?: CorsSetOptions): VkrunCors => {
  const defaultOptions: CorsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS",
    preflightNext: false,
    successStatus: 204,
  };
  const mergeOptions = Object.assign({}, defaultOptions, options);

  validateOptions(mergeOptions);
  return new CorsSetup(Object.assign({}, defaultOptions, mergeOptions));
};
