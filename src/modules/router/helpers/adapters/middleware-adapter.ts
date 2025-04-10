import { Middleware, NextFunction, Request, Response } from "../../../types";

export const middlewareAdapter = (middleware: Middleware): any => {
  return (request: Request, response: Response, next: NextFunction) => {
    middleware.handle(request, response, next);
  };
};
