import { routeExists } from "./helpers";
import { Route, VkrunRouter } from "../types";
import { compileRegex } from "../utils";

export class RouterSetup implements VkrunRouter {
  private readonly routes: Route[] = [];

  public get(path: string, ...handlers: any): void {
    routeExists(path, "GET", this.routes);
    this.routes.push({ path, method: "GET", handlers, regex: compileRegex(path) });
  }

  public head(path: string, ...handlers: any): void {
    routeExists(path, "HEAD", this.routes);
    this.routes.push({ path, method: "HEAD", handlers, regex: compileRegex(path) });
  }

  public post(path: string, ...handlers: any): void {
    routeExists(path, "POST", this.routes);
    this.routes.push({ path, method: "POST", handlers, regex: compileRegex(path) });
  }

  public put(path: string, ...handlers: any): void {
    routeExists(path, "PUT", this.routes);
    this.routes.push({ path, method: "PUT", handlers, regex: compileRegex(path) });
  }

  public patch(path: string, ...handlers: any): void {
    routeExists(path, "PATCH", this.routes);
    this.routes.push({ path, method: "PATCH", handlers, regex: compileRegex(path) });
  }

  public delete(path: string, ...handlers: any): void {
    routeExists(path, "DELETE", this.routes);
    this.routes.push({ path, method: "DELETE", handlers, regex: compileRegex(path) });
  }

  public options(path: string, ...handlers: any): void {
    routeExists(path, "OPTIONS", this.routes);
    this.routes.push({ path, method: "OPTIONS", handlers, regex: compileRegex(path) });
  }

  public _routes(): Route[] {
    return this.routes;
  }
}

/**
 * @function Router
 *
 * Creates and returns an instance of the `RouterSetup` class, which manages route definitions
 * and handlers for HTTP methods (GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS). The router allows you to
 * define multiple routes and associate them with specific HTTP methods and handler functions.
 *
 * You can use the `Router` instance to organize your application's routes and handle HTTP requests.
 * Once the router instance is created, it can be passed to the `app.use()` method to register the routes globally.
 *
 * **Usage Examples:**
 * - You can define routes using the methods `.get()`, `.post()`, `.put()`, `.delete()`, `.patch()`, `.head()`, and `.options()`.
 * - You can define route handlers that accept request (`req`) and response (`res`) objects, which are used to process HTTP requests and send responses.
 *
 * @returns {VkrunRouter} - Returns an instance of the `RouterSetup` class which provides the routing functionality.
 *
 * @see [Router Documentation](https://vkrunjs.com/router/introduction)
 *
 * @example
 * // Example usage of Router with GET method
 * const app = App()
 * const router = Router()
 *
 * // Define a route for GET requests to the root path
 * router.get('/', (_request: Request, response: Response) => {
 *   response.setHeader('Content-Type', 'text/plain')
 *   response.status(200).end('GET ok')
 * })
 *
 * app.use(router) // Register the router globally to handle the defined routes
 *
 * // Example usage of Router with POST method
 * router.post('/submit', (_request: Request, response: Response) => {
 *   response.setHeader('Content-Type', 'text/plain')
 *   response.status(200).end('POST submitted')
 * })
 *
 * // Start the server
 * const server = app.server()
 * server.listen(3000, () => {
 *   console.log('Server is running on port 3000')
 * })
 */
export const Router = (): VkrunRouter => new RouterSetup();
