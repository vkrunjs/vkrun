import { RouterSetup } from "../router";
import { createServer } from "../runtime";
import { RouterHandler } from "../router/helpers/router-handler";
import { parseData } from "../parse-data";
import { cors, CorsSetup } from "../cors";
import { clearGlobalRateLimit, rateLimit } from "../rate-limit";
import { compileRegex } from "../utils";
import {
  AppCreateServer,
  ParseDataConfig,
  RateLimitConfig,
  Request,
  Response,
  Route,
  CorsSetOptions,
  VkrunApp,
  NextFunction,
} from "../types";

class AppSetup implements VkrunApp {
  private instance: "server" | "_reqWithoutServer" | "closed" | undefined;
  private routes: Route[] = [];
  private readonly routerHandler: RouterHandler;
  private readonly globalMiddlewares: any[];
  private createdServer: any;
  private errorHandler: ((error: any, request: Request, response: Response) => Promise<void> | void) | null;

  constructor() {
    this.instance = undefined;
    this.routerHandler = new RouterHandler();
    this.globalMiddlewares = [];
    this.errorHandler = null;
  }

  // Server Nodejs

  public server(): AppCreateServer {
    this.addRoutesOptionsWithCors();
    this.validateRoutes();

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.createdServer = createServer(async (request, response) => {
      this.instance = "server";
      request.url = decodeURIComponent(request.url ?? "");

      if (this.errorHandler) {
        try {
          await this.routerHandler.handleRequest(request as Request, response, this.routes, this.globalMiddlewares);
        } catch (error: any) {
          await this.errorHandler(error, request as Request, response);
        }
      } else {
        await this.routerHandler.handleRequest(request as Request, response, this.routes, this.globalMiddlewares);
      }
    });

    return this.createdServer;
  }

  public close(): void {
    if (this.instance === "server") this.createdServer.close();
    this.createdServer = null;
    clearGlobalRateLimit();
    this.instance = "closed";
  }

  // Method to simulate a request with superRequest

  public async _reqWithoutServer(request: Request, response: Response & { _ended: boolean }): Promise<Response> {
    this.instance = "_reqWithoutServer";
    const _request = request;
    _request.url = decodeURIComponent(_request.url ?? "");
    this.addRoutesOptionsWithCors();
    this.validateRoutes();

    if (this.errorHandler) {
      try {
        await this.routerHandler.handleRequest(_request, response, this.routes, this.globalMiddlewares);
      } catch (error: any) {
        await this.errorHandler(error, _request, response);
      }
    } else {
      await this.routerHandler.handleRequest(_request, response, this.routes, this.globalMiddlewares);
    }

    return await new Promise<Response>((resolve) => {
      const monitor = setInterval(() => {
        if (response._ended) {
          clearInterval(monitor);
          resolve(response);
        }
      }, 5);
    });
  }

  // Middleware management

  public use(middleware: Record<string, any> | ((request: Request, response: Response, next: NextFunction) => any)): void {
    if (middleware instanceof RouterSetup) {
      this.routes = [...this.routes, ...middleware._routes()];
    } else {
      this.globalMiddlewares.push(middleware);
    }
  }

  // Error Handler

  public error(errorHandler: (error: any, request: Request, response: Response) => Promise<void> | void): void {
    this.errorHandler = errorHandler;
  }

  // Parse data

  public parseData(config?: ParseDataConfig): void {
    this.globalMiddlewares.unshift(parseData(config));
    delete (this as any).parseData;
  }

  // Cors

  public cors(options?: CorsSetOptions): void {
    this.globalMiddlewares.unshift(cors(options));
    delete (this as any).cors;
  }

  private addRoutesOptionsWithCors(): void {
    const corsMiddleware = this.globalMiddlewares.find((middleware) => middleware instanceof CorsSetup);

    if (corsMiddleware) {
      const routeGroups = new Map<string, string[]>();

      this.routes.forEach((route) => {
        if (route.method !== "OPTIONS") {
          const existingMethods = routeGroups.get(route.path) ?? [];
          existingMethods.push(route.method);
          routeGroups.set(route.path, existingMethods);
        }
      });

      routeGroups.forEach((_methods, path) => {
        const optionsRouteExists = !!this.routes.find((route) => route.path === path && route.method === "OPTIONS");

        if (!optionsRouteExists) {
          const handlers: any[] = [() => null];
          this.routes.push({ path, method: "OPTIONS", handlers, regex: compileRegex(path) });
        }
      });
    }
  }

  // Rate limit

  public rateLimit(config?: RateLimitConfig): void {
    this.globalMiddlewares.push(rateLimit(config));
    delete (this as any).rateLimit;
  }

  // Routing

  public get(path: string, ...handlers: any): void {
    this.routes.push({ path, method: "GET", handlers, regex: compileRegex(path) });
  }

  public head(path: string, ...handlers: any): void {
    this.routes.push({ path, method: "HEAD", handlers, regex: compileRegex(path) });
  }

  public post(path: string, ...handlers: any): void {
    this.routes.push({ path, method: "POST", handlers, regex: compileRegex(path) });
  }

  public put(path: string, ...handlers: any): void {
    this.routes.push({ path, method: "PUT", handlers, regex: compileRegex(path) });
  }

  public patch(path: string, ...handlers: any): void {
    this.routes.push({ path, method: "PATCH", handlers, regex: compileRegex(path) });
  }

  public delete(path: string, ...handlers: any): void {
    this.routes.push({ path, method: "DELETE", handlers, regex: compileRegex(path) });
  }

  public options(path: string, ...handlers: any): void {
    this.routes.push({ path, method: "OPTIONS", handlers, regex: compileRegex(path) });
  }

  private validateRoutes(): void {
    const allRoutes = this.routes;
    const seen = new Map<string, string>();

    for (const route of allRoutes) {
      const key = `${route.method}:${route.path}`;
      if (seen.has(key)) {
        throw new Error(`vkrun-app: route duplicated for ${route.method} ${route.path}`);
      }
      seen.set(key, key);
    }
  }
}

/**
 * @function App
 *
 * Configures and sets up an application using the VkrunJS framework.
 * This function creates an instance of the `VkrunApp` interface, which provides methods for configuring
 * middleware, routing, CORS, rate limiting, data parsing, and creating a Node.js HTTP server instance.
 *
 * The returned `VkrunApp` instance allows you to:
 * - Set up middleware to handle requests and responses.
 * - Define routes with their corresponding handlers.
 * - Configure Cross-Origin Resource Sharing (CORS).
 * - Apply rate limiting to manage request rates.
 * - Parse incoming data (e.g., JSON, form data).
 * - Start and manage the Node.js HTTP server instance.
 *
 * @returns {VkrunApp} - An instance of `VkrunApp` with methods for application configuration,
 * including `server()`, `use()`, `error()`, `parseData()`, `cors()`, `rateLimit()`, and route handling.
 *
 * @example
 * // Example usage of the App function
 * const app = App() // Create a new VkrunJS app instance
 *
 * // Set up data parsing middleware (e.g., JSON parsing)
 * app.parseData()
 *
 * // Configure Cross-Origin Resource Sharing (CORS)
 * app.cors({ origin: "*", methods: ["GET", "POST"] })
 *
 * // Set up rate limiting
 * app.rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 })
 *
 * // Define a simple route handler
 * const controller = (req, res) => { res.status(200).send("Hello World") }
 * app.get("/hello", controller)
 *
 * // Example of applying global middleware using app.use()
 * app.use((req, res, next) => {
 *   console.log(`Request received for ${req.method} ${req.url}`);
 *   next(); // Pass control to the next handler
 * })
 *
 * // Create the HTTP server instance
 * const server = app.server() // Get the HTTP server instance
 *
 * // Start the server and begin accepting requests
 * server.listen(3000, () => {
 *   console.log("Server is running on port 3000")
 * })
 */
export const App = (): VkrunApp => {
  return new AppSetup();
};
