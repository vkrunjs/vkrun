import { randomUUID } from "../../utils";
import { executeMiddleware } from "./execute-middleware";
import { Request, Response, Route } from "../../types";

export class RouterHandler {
  public async handleRequest(request: Request, response: Response, routes: Route[], globalMiddlewares: any[]): Promise<void> {
    const requestId = randomUUID();
    request.requestId = requestId;
    response.setHeader("Request-Id", requestId);

    const { url, method } = request;
    const [path] = String(url).split("?");
    const route = routes.find((route) => {
      return route.regex.test(path) && route.method === method;
    });

    if (route) {
      request.route = route;
      let handlerIndex = 0;

      const hasLocalParseData = route.handlers.some(
        (handler: any) =>
          handler &&
          typeof handler === "object" &&
          "handle" in handler &&
          typeof handler.handle === "function" &&
          handler.constructor.name === "ParseDataSetup",
      );

      const filteredGlobalMiddlewares = hasLocalParseData
        ? globalMiddlewares.filter(
            (mw) =>
              !(
                mw &&
                typeof mw === "object" &&
                "handle" in mw &&
                typeof mw.handle === "function" &&
                mw.constructor.name === "ParseDataSetup"
              ),
          )
        : globalMiddlewares;

      const handleHandlers = async (): Promise<void> => {
        if (route.handlers.length === 0) {
          response.setHeader("Content-Type", "text/plain");
          response.setHeader("Access-Control-Allow-Origin", "*");
          response.statusCode = 204;
          response.end();
        } else if (route.handlers.length === 1 && filteredGlobalMiddlewares.length === 0) {
          await route.handlers[handlerIndex](request, response);
        } else {
          const next = async (): Promise<void> => {
            if (handlerIndex < route.handlers.length) {
              const current: any = route.handlers[handlerIndex++];

              if (typeof current === "function") {
                await current(request, response, next);
              } else if (current && typeof current.handle === "function") {
                await current.handle(request, response, next);
              } else {
                throw new Error(`vkrun-router: invalid route handler at index ${handlerIndex - 1}`);
              }
            }
          };

          const handleMiddleware = async (index: number): Promise<void> => {
            const middleware = filteredGlobalMiddlewares[index];
            let nextMiddleware = next;
            if (index < filteredGlobalMiddlewares.length - 1) {
              nextMiddleware = async () => {
                await handleMiddleware(index + 1);
              };
            }

            await executeMiddleware(middleware, request, response, nextMiddleware);
          };

          if (filteredGlobalMiddlewares.length > 0) await handleMiddleware(0);
          else await next();
        }
      };

      await handleHandlers();
    } else {
      response.setHeader("Content-Type", "text/plain");
      response.setHeader("Access-Control-Allow-Origin", "*");
      response.statusCode = 404;
      response.end("Not Found");
    }
  }
}
